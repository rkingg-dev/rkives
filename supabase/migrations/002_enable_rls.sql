-- 002: Enable Row Level Security on all tables
-- Single-user app: authenticated users get full access

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE changelog_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE pastebin_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE wp_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Full access policies for authenticated users
CREATE POLICY "authenticated_full_access" ON users
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "authenticated_full_access" ON clients
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "authenticated_full_access" ON websites
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "authenticated_full_access" ON tasks
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "authenticated_full_access" ON website_credentials
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "authenticated_full_access" ON payments
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "authenticated_full_access" ON changelog_entries
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "authenticated_full_access" ON notes
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "authenticated_full_access" ON pastebin_entries
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "authenticated_full_access" ON wp_updates
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "authenticated_full_access" ON reports
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "authenticated_full_access" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Public read access for shared pastes
CREATE POLICY "public_read_shared_pastes" ON pastebin_entries
  FOR SELECT USING (is_public = true AND share_token IS NOT NULL);
