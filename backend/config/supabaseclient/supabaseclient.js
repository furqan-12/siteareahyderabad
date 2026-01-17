import 'dotenv/config'; // ✅ This line loads your .env file
import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv"
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
// Use service role key for backend operations (bypasses RLS)
// If SUPABASE_SERVICE_ROLE_KEY is not set, fallback to SUPABASE_KEY
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY

if (!supabaseKey) {
  console.error("⚠️ Warning: SUPABASE_KEY or SUPABASE_SERVICE_ROLE_KEY not found in environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export default supabase;
