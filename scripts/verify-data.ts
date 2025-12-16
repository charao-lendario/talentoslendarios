
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase credentials in environment variables.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
    console.log("🔍 Checking connection to:", supabaseUrl);

    // Check Jobs
    const { data: jobs, error: jobsError } = await supabase.from('jobs').select('count');
    if (jobsError) {
        console.error("❌ Error fetching jobs:", jobsError.message);
    } else {
        console.log(`✅ Jobs found: ${jobs.length} (or count query result)`);
        console.log("Jobs data sample:", jobs);
    }

    // Check Talents
    const { data: talents, error: talentsError } = await supabase.from('talents').select('*');
    if (talentsError) {
        console.error("❌ Error fetching talents:", talentsError.message);
    } else {
        console.log(`✅ Talents found: ${talents.length}`);
    }
}

verify();
