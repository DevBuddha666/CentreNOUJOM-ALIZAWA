# Security Guidelines

## Environment Variables

### Public Keys (Safe to include in `.env.example`)
- `PUBLIC_SUPABASE_URL` - Supabase project URL
- `PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key (public)

These are prefixed with `PUBLIC_` in Vite and are intended for client-side use.

### Private Keys (NEVER commit)
- Supabase service role keys
- Database credentials
- API tokens and secrets
- Admin credentials

## Setup Instructions for Contributors

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp client/.env.example client/.env.local
   ```

2. Update with your actual credentials:
   ```bash
   # Get these from your Supabase dashboard
   PUBLIC_SUPABASE_URL=your_url_here
   PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```

3. **IMPORTANT**: Never commit `.env.local` or any `.env` file

## CI/CD Environment Variables

For Vercel deployment, set these in project settings → Environment Variables:
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

## Supabase Credentials

The public anon key is safe to expose as it has limited permissions. Supabase's RLS (Row Level Security) policies protect your data.

For more info: https://supabase.com/docs/guides/api/api-keys
