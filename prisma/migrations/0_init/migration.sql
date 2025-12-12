-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES
-- Everyone can read profiles (needed for rendering UI)
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
-- Users can only update their own profile
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. JOBS
-- Everyone can view ACTIVE jobs
CREATE POLICY "Active jobs are viewable by everyone" ON jobs FOR SELECT USING (status = 'active');
-- Admins can view ALL jobs (including drafts)
CREATE POLICY "Admins view all jobs" ON jobs FOR SELECT USING ( exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
-- Only Admins can insert/update jobs
CREATE POLICY "Admins manage jobs" ON jobs FOR ALL USING ( exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 3. APPLICATIONS
-- Talents can see their own applications
CREATE POLICY "Talents view own applications" ON applications FOR SELECT USING (auth.uid() = talent_id);
-- Talents can create applications
CREATE POLICY "Talents apply" ON applications FOR INSERT WITH CHECK (auth.uid() = talent_id);
-- Admins can view ALL applications
CREATE POLICY "Admins view all applications" ON applications FOR SELECT USING ( exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Indexes (Prisma handles some via @@index, but specific GIN indexes can be here)
CREATE INDEX IF NOT EXISTS idx_talents_tags ON talents USING GIN(tags);
