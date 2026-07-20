import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY!;

// Server-only client — full access, bypasses RLS.
// NEVER import this file in a "use client" component.
export const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey);