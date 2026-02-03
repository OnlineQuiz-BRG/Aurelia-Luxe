
import { createClient } from '@supabase/supabase-js';

// Access variables from process.env (injected by vite.config.ts)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Aurelia Luxe: Supabase credentials are missing from the environment. " +
    "Please ensure SUPABASE_URL and SUPABASE_ANON_KEY are configured. " +
    "The application will fallback to local initial state for now."
  );
}

// Provide valid-format placeholders to prevent the 'supabaseUrl is required' crash
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);
