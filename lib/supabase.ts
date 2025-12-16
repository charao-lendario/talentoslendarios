import { createClient } from '@supabase/supabase-js';

// NOTE: Vite replaces these statically at build time. 
// Do NOT use dynamic access like env[key] or it will fail in production.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_URL : "") || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : "") || "";

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
            select: async () => ({
                data: null,
                error: { message: "Database not configured. Check your .env file or Vercel Environment Variables. URL or KEY is missing." }
            }),
            insert: async () => ({ data: null, error: { message: "Database not configured (missing env vars)" } }),
            update: async () => ({ data: null, error: { message: "Database not configured (missing env vars)" } }),
            delete: async () => ({ data: null, error: { message: "Database not configured (missing env vars)" } }),
            upsert: async () => ({ data: null, error: { message: "Database not configured (missing env vars)" } }),
        })
    } as any;
}

export const supabase = supabaseInstance;
