import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
const isConfigured = !!supabaseUrl && !!supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL';

// Export a flag to easily switch between Supabase and Mock Data
export const USE_MOCK_DATA = !isConfigured;

if (USE_MOCK_DATA) {
  console.info('Using Mock Data: Supabase is not configured or deactivated.');
}

export const supabase = createClient(
  supabaseUrl || 'https://missing-config.supabase.co',
  supabaseAnonKey || 'missing-key'
);

export { isConfigured };

