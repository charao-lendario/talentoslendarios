-- RLS Policies and Indexes
-- Run this AFTER creating the tables (e.g. via Prisma)

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 1. PROFILES
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 2. JOBS
CREATE POLICY "Active jobs are viewable by everyone" ON jobs FOR SELECT USING (status = 'active');
CREATE POLICY "Admins view all jobs" ON jobs FOR SELECT USING ( exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
CREATE POLICY "Admins manage jobs" ON jobs FOR ALL USING ( exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 3. APPLICATIONS
CREATE POLICY "Talents view own applications" ON applications FOR SELECT USING (auth.uid() = talent_id);
CREATE POLICY "Talents apply" ON applications FOR INSERT WITH CHECK (auth.uid() = talent_id);
CREATE POLICY "Admins view all applications" ON applications FOR SELECT USING ( exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 4. TALENTS
ALTER TABLE talents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Talents are viewable by everyone" ON talents FOR SELECT USING (true);
CREATE POLICY "Users can update own talent profile" ON talents FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own talent profile" ON talents FOR INSERT WITH CHECK (auth.uid() = id);


-- Indexes
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_talents_tags ON talents USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_applications_job ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_talent ON applications(talent_id);
