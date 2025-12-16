
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let supabaseInstance;

try {
    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn("Supabase credentials missing! Requests will fail.");
    }
    // Attempt to create client. If url is empty/invalid, this might throw.
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} catch (error) {
    console.error("Failed to initialize Supabase:", error);
    // Fallback dummy client to prevent "White Screen of Death"
    supabaseInstance = {
        from: () => ({
            select: async () => ({ data: null, error: { message: "Database not configured (missing env vars)" } }),
            insert: async () => ({ data: null, error: { message: "Database not configured (missing env vars)" } }),
            update: async () => ({ data: null, error: { message: "Database not configured (missing env vars)" } }),
            delete: async () => ({ data: null, error: { message: "Database not configured (missing env vars)" } }),
            upsert: async () => ({ data: null, error: { message: "Database not configured (missing env vars)" } }),
        })
    } as any;
}

export const supabase = supabaseInstance;
