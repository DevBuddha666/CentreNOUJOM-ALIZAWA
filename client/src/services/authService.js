import { getSupabase } from '../lib/supabaseClient';

export function userHasAdminRole(user) {
  if (!user) return false;
  const ok = (v) => typeof v === 'string' && v.trim().toLowerCase() === 'admin';
  return ok(user.app_metadata?.role) || ok(user.user_metadata?.role);
}

function mapUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    role: userHasAdminRole(user) ? 'admin' : 'user'
  };
}

export function getLoginErrorMessage(error) {
  if (!error) return 'E-mail ou mot de passe incorrect.';
  const code = String(error.code || '');
  const msg = String(error.message || '').toLowerCase();

  if (code === 'email_not_confirmed' || msg.includes('email not confirmed')) {
    return 'Confirmez d’abord votre e-mail (lien envoyé par Supabase), ou désactivez « Confirm email » dans Authentication → Providers → Email.';
  }
  if (
    code === 'invalid_credentials' ||
    msg.includes('invalid login credentials') ||
    msg.includes('invalid credentials')
  ) {
    return 'E-mail ou mot de passe incorrect.';
  }
  if (code === 'NO_SESSION' || msg.includes('session absente')) {
    return 'Aucune session après connexion : confirmez l’e-mail du compte ou vérifiez Authentication → Providers → Email dans Supabase.';
  }
  if (msg.includes('failed to fetch') || msg.includes('network')) {
    return 'Connexion impossible (réseau ou URL Supabase). Vérifiez PUBLIC_SUPABASE_URL dans .env et votre connexion.';
  }
  if (error.message) return error.message;
  return 'Connexion impossible. Réessayez ou vérifiez la console du navigateur.';
}

const authService = {
  login: async (email, password) => {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) throw error;
    if (!data.session?.access_token) {
      const err = new Error('Session absente après connexion (e-mail non confirmé ou politique projet).');
      err.code = 'NO_SESSION';
      throw err;
    }

    return {
      data: {
        user: mapUser(data.user),
        token: data.session.access_token
      }
    };
  },

  logout: async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
  },

  getProfile: async () => {
    const supabase = getSupabase();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (!user) {
      const err = new Error('Non connecté');
      err.code = 'UNAUTHORIZED';
      throw err;
    }
    return { data: mapUser(user) };
  },

  changePassword: async (_currentPassword, newPassword) => {
    const supabase = getSupabase();
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return { success: true };
  }
};

export default authService;
