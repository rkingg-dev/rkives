export interface User {
  id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  email: string;
  phone: string;
  role: string;
  company_name: string;
  notes: string;
  created_at: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  avatar_url: string;
  notes: string;
  created_at: string;
}

export interface Website {
  id: string;
  client_id: string;
  name: string;
  slug: string;
  url: string;
  login_url: string;
  platform: string;
  project_type: string;
  scope: string;
  hosting_provider: string;
  domain_provider: string;
  domain_name: string;
  domain_expiry: string;
  hosting_expiry: string;
  status: string;
  project_start: string;
  deploy_date: string;
  monthly_maintenance_fee: number;
  is_portfolio: boolean;
  thumbnail_url: string;
  gallery_urls: string[];
  description: string;
  full_description: string;
  tech_stack: string[];
  role: string;
  featured_order: number;
  notes: string;
  created_at: string;
}

export interface Task {
  id: string;
  website_id: string | null;
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Waiting" | "On Hold" | "Done";
  priority: "Low" | "Medium" | "High" | "Urgent";
  task_type: string;
  is_recurring: boolean;
  recurrence_interval: string | null;
  assigned_to: string;
  due_date: string;
  completed_at: string | null;
  attachment_url: string | null;
  notes: string;
  created_at: string;
}

export interface WebsiteCredential {
  id: string;
  website_id: string;
  label: string;
  url: string;
  username: string;
  email: string;
  password_value: string;
  totp_secret: string | null;
  is_internal: boolean;
  notes: string;
  created_at: string;
}

export interface Payment {
  id: string;
  client_id: string;
  website_id: string | null;
  amount: number;
  currency: string;
  payment_type: string;
  method: string;
  reference_number: string;
  receipt_url: string;
  status: string;
  billing_period: string;
  notes: string;
  paid_at: string | null;
  created_at: string;
}

export interface ChangelogEntry {
  id: string;
  website_id: string;
  title: string;
  content: string;
  version: string | null;
  entry_type: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

export interface Note {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail_url: string;
  is_public: boolean;
  tags: string[];
  website_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface PastebinEntry {
  id: string;
  title: string;
  content: string;
  language: string;
  is_public: boolean;
  share_token: string | null;
  expires_at: string | null;
  created_at: string;
}

export interface WpUpdate {
  id: string;
  website_id: string;
  item_type: string;
  item_name: string;
  current_version: string;
  latest_version: string;
  status: string;
  last_checked: string;
  auto_update: boolean;
  notes: string;
}

export interface Report {
  id: string;
  title: string;
  client_id: string;
  report_type: string;
  date: string;
  status: string;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  website_id: string;
  project_type: string;
  progress: number;
  deadline: string;
  status: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, "id" | "created_at">;
        Update: Partial<Omit<User, "id" | "created_at">>;
      };
      clients: {
        Row: Client;
        Insert: Omit<Client, "id" | "created_at">;
        Update: Partial<Omit<Client, "id" | "created_at">>;
      };
      websites: {
        Row: Website;
        Insert: Omit<Website, "id" | "created_at">;
        Update: Partial<Omit<Website, "id" | "created_at">>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, "id" | "created_at">;
        Update: Partial<Omit<Task, "id" | "created_at">>;
      };
      website_credentials: {
        Row: WebsiteCredential;
        Insert: Omit<WebsiteCredential, "id" | "created_at">;
        Update: Partial<Omit<WebsiteCredential, "id" | "created_at">>;
      };
      payments: {
        Row: Payment;
        Insert: Omit<Payment, "id" | "created_at">;
        Update: Partial<Omit<Payment, "id" | "created_at">>;
      };
      changelog_entries: {
        Row: ChangelogEntry;
        Insert: Omit<ChangelogEntry, "id" | "created_at">;
        Update: Partial<Omit<ChangelogEntry, "id" | "created_at">>;
      };
      notes: {
        Row: Note;
        Insert: Omit<Note, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Note, "id" | "created_at">>;
      };
      pastebin_entries: {
        Row: PastebinEntry;
        Insert: Omit<PastebinEntry, "id" | "created_at">;
        Update: Partial<Omit<PastebinEntry, "id" | "created_at">>;
      };
      wp_updates: {
        Row: WpUpdate;
        Insert: Omit<WpUpdate, "id">;
        Update: Partial<Omit<WpUpdate, "id">>;
      };
      reports: {
        Row: Report;
        Insert: Omit<Report, "id" | "created_at">;
        Update: Partial<Omit<Report, "id" | "created_at">>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at">;
        Update: Partial<Omit<Project, "id" | "created_at">>;
      };
    };
  };
}

// Utility types for Supabase operations
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Inserts<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type Updates<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

