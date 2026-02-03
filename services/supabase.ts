
import { createClient } from '@supabase/supabase-js';

// Access variables from process.env (injected by vite.config.ts)
// We provide your keys as hardcoded fallbacks to ensure the app works immediately.
const supabaseUrl = process.env.SUPABASE_URL || 'https://kvvovcnnquwiigdubpap.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dm92Y25ucXV3aWlnZHVicGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMTAxMDQsImV4cCI6MjA4NTY4NjEwNH0.Ix2BAbMfmmqLtwXt96cZ9xlDFXzCskLvxYAn7xdG5-s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
