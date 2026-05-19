-- 001: Create all tables for RKives dashboard

-- Users
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  nickname text NOT NULL DEFAULT '',
  email text UNIQUE NOT NULL,
  phone text NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT '',
  company_name text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Clients
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  avatar_url text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Websites
CREATE TABLE IF NOT EXISTS websites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  url text NOT NULL DEFAULT '',
  login_url text NOT NULL DEFAULT '',
  platform text NOT NULL DEFAULT '',
  project_type text NOT NULL DEFAULT '',
  scope text NOT NULL DEFAULT '',
  hosting_provider text NOT NULL DEFAULT '',
  domain_provider text NOT NULL DEFAULT '',
  domain_name text NOT NULL DEFAULT '',
  domain_expiry date,
  hosting_expiry date,
  status text NOT NULL DEFAULT 'Live',
  project_start date,
  deploy_date date,
  monthly_maintenance_fee numeric NOT NULL DEFAULT 0,
  is_portfolio boolean NOT NULL DEFAULT false,
  thumbnail_url text NOT NULL DEFAULT '',
  gallery_urls text[] NOT NULL DEFAULT '{}',
  description text NOT NULL DEFAULT '',
  full_description text NOT NULL DEFAULT '',
  tech_stack text[] NOT NULL DEFAULT '{}',
  role text NOT NULL DEFAULT '',
  featured_order int NOT NULL DEFAULT 0,
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid REFERENCES websites(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'To Do'
    CHECK (status IN ('To Do', 'In Progress', 'Waiting', 'On Hold', 'Done')),
  priority text NOT NULL DEFAULT 'Medium'
    CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
  task_type text NOT NULL DEFAULT '',
  is_recurring boolean NOT NULL DEFAULT false,
  recurrence_interval text,
  assigned_to text NOT NULL DEFAULT '',
  due_date date,
  completed_at timestamptz,
  attachment_url text,
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Website Credentials
CREATE TABLE IF NOT EXISTS website_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid REFERENCES websites(id) ON DELETE CASCADE,
  label text NOT NULL,
  url text NOT NULL DEFAULT '',
  username text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  password_value text NOT NULL DEFAULT '',
  totp_secret text,
  is_internal boolean NOT NULL DEFAULT true,
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Payments
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  website_id uuid REFERENCES websites(id) ON DELETE SET NULL,
  amount numeric NOT NULL,
  currency text NOT NULL DEFAULT 'PHP',
  payment_type text NOT NULL DEFAULT '',
  method text NOT NULL DEFAULT '',
  reference_number text NOT NULL DEFAULT '',
  receipt_url text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'Pending',
  billing_period text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Changelog Entries
CREATE TABLE IF NOT EXISTS changelog_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid REFERENCES websites(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL DEFAULT '',
  version text,
  entry_type text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Notes
CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL DEFAULT '',
  thumbnail_url text NOT NULL DEFAULT '',
  is_public boolean NOT NULL DEFAULT false,
  tags text[] NOT NULL DEFAULT '{}',
  website_id uuid REFERENCES websites(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Pastebin Entries
CREATE TABLE IF NOT EXISTS pastebin_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL DEFAULT '',
  language text NOT NULL DEFAULT 'text',
  is_public boolean NOT NULL DEFAULT false,
  share_token text UNIQUE,
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- WP Updates
CREATE TABLE IF NOT EXISTS wp_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id uuid REFERENCES websites(id) ON DELETE CASCADE,
  item_type text NOT NULL,
  item_name text NOT NULL,
  current_version text NOT NULL DEFAULT '',
  latest_version text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT '',
  last_checked timestamptz NOT NULL DEFAULT now(),
  auto_update boolean NOT NULL DEFAULT false,
  notes text NOT NULL DEFAULT ''
);

-- Reports
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
  report_type text NOT NULL DEFAULT '',
  date text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  website_id uuid REFERENCES websites(id) ON DELETE SET NULL,
  project_type text NOT NULL DEFAULT '',
  progress int NOT NULL DEFAULT 0
    CHECK (progress >= 0 AND progress <= 100),
  deadline text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'Planning',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_websites_client_id ON websites(client_id);
CREATE INDEX IF NOT EXISTS idx_tasks_website_id ON tasks(website_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_payments_client_id ON payments(client_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_website_credentials_website_id ON website_credentials(website_id);
CREATE INDEX IF NOT EXISTS idx_changelog_entries_website_id ON changelog_entries(website_id);
CREATE INDEX IF NOT EXISTS idx_wp_updates_website_id ON wp_updates(website_id);
CREATE INDEX IF NOT EXISTS idx_notes_tags ON notes USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_pastebin_share_token ON pastebin_entries(share_token);
CREATE INDEX IF NOT EXISTS idx_projects_website_id ON projects(website_id);
CREATE INDEX IF NOT EXISTS idx_reports_client_id ON reports(client_id);
