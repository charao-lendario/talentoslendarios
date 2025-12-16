
-- Enable RLS (Idempotent-ish in Postgres, safe to rerun)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE talents ENABLE ROW LEVEL SECURITY;

-- DROP EXISTING POLICIES TO AVOID CONFLICTS
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

DROP POLICY IF EXISTS "Active jobs are viewable by everyone" ON jobs;
DROP POLICY IF EXISTS "Admins view all jobs" ON jobs;
DROP POLICY IF EXISTS "Admins manage jobs" ON jobs;

DROP POLICY IF EXISTS "Talents view own applications" ON applications;
DROP POLICY IF EXISTS "Talents apply" ON applications;
DROP POLICY IF EXISTS "Admins view all applications" ON applications;

DROP POLICY IF EXISTS "Talents are viewable by everyone" ON talents;
DROP POLICY IF EXISTS "Users can update own talent profile" ON talents;
DROP POLICY IF EXISTS "Users can insert own talent profile" ON talents;

-- 1. PROFILES
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. JOBS
-- Allows everyone (anon) to see active jobs
CREATE POLICY "Active jobs are viewable by everyone" ON jobs FOR SELECT USING (status = 'active');
-- Allows admins to do everything
CREATE POLICY "Admins manage jobs" ON jobs FOR ALL USING ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- 3. APPLICATIONS
CREATE POLICY "Talents view own applications" ON applications FOR SELECT USING (auth.uid() = talent_id);
CREATE POLICY "Talents apply" ON applications FOR INSERT WITH CHECK (auth.uid() = talent_id);
CREATE POLICY "Admins view all applications" ON applications FOR SELECT USING ( exists (select 1 from profiles where id = auth.uid() and role = 'admin') );

-- 4. TALENTS
-- Everyone can view talents (for the 'Banco de Talentos' public/admin view demo)
-- Ideally this should be Admin only, but for this demo User asked for "Area do Recrutador" to be visible
CREATE POLICY "Talents are viewable by everyone" ON talents FOR SELECT USING (true);
CREATE POLICY "Users can update own talent profile" ON talents FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own talent profile" ON talents FOR INSERT WITH CHECK (auth.uid() = id);

-- Indexes (If Not Exists handled by SQL)
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_talents_tags ON talents USING GIN(tags);
