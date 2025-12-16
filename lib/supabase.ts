import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("ERRO CRÍTICO: Variáveis do Supabase não encontradas.");
    console.error("Verifique se .env.local contém VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.");
}

// Inicializa o cliente normalmente se as credenciais existirem.
// Caso contrário, fornece um objeto mock para evitar crashes imediatos, retornando erros descritivos.
const supabaseInstance = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            select: async () => ({ data: null, error: { message: "Supabase não configurado. Verifique o console." } }),
            insert: async () => ({ data: null, error: { message: "Supabase não configurado. Verifique o console." } }),
            update: async () => ({ data: null, error: { message: "Supabase não configurado. Verifique o console." } }),
            delete: async () => ({ data: null, error: { message: "Supabase não configurado. Verifique o console." } }),
            upsert: async () => ({ data: null, error: { message: "Supabase não configurado. Verifique o console." } }),
        }),
        auth: {
            getSession: async () => ({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signOut: async () => ({ error: null }),
        },
    } as any;

export const supabase = supabaseInstance;
