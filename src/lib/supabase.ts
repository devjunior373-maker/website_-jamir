import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isConfigured = !!supabaseUrl && !!supabaseAnonKey;

if (!isConfigured) {
  console.error(
    'Supabase environment variables are missing! ' +
    'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your project settings.'
  );
}

// Use a fallback URL to prevent createClient from throwing an error at module load time
// but specify that it is not configured.
export const supabase = createClient(
  supabaseUrl || 'https://missing-config.supabase.co',
  supabaseAnonKey || 'missing-config'
);

export { isConfigured };
