
import { createClient } from '@supabase/supabase-js';

// Declare process for tsc since @types/node is not present
declare var process: {
  env: {
    SUPABASE_URL?: string;
    SUPABASE_ANON_KEY?: string;
  }
};

const supabaseUrl = process.env.SUPABASE_URL || 'https://kvvovcnnquwiigdubpap.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2dm92Y25ucXV3aWlnZHVicGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMTAxMDQsImV4cCI6MjA4NTY4NjEwNH0.Ix2BAbMfmmqLtwXt96cZ9xlDFXzCskLvxYAn7xdG5-s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
