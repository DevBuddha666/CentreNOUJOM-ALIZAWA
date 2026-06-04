import { createClient } from '@supabase/supabase-js';

let client;

export function getSupabase() {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Variables manquantes: définissez PUBLIC_SUPABASE_URL et PUBLIC_SUPABASE_ANON_KEY (voir client/.env.example).'
    );
  }

  if (!client) {
    client = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }

  return client;
}
