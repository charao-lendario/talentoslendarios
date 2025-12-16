import { createClient } from '@supabase/supabase-js';

// Safe environment variable retrieval
const getEnvVar = (viteKey: string, nextKey: string) => {
    // 1. Try Vite import.meta.env
    try {
        if (import.meta && import.meta.env && import.meta.env[viteKey]) {
            return import.meta.env[viteKey];
        }
    } catch (e) { /* ignore */ }

    // 2. Try Node process.env (safely)
    try {
        if (typeof process !== 'undefined' && process.env && process.env[nextKey]) {
            return process.env[nextKey];
        }
    } catch (e) { /* ignore */ }

    return "";
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY');

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
