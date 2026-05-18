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

export interface Website {
  id: string;
  client_id: string;
  website_name: string;
  website_url: string;
  website_login_url: string;
  platform: string;
  hosting_provider: string;
  domain_provider: string;
  project_type: string;
  website_status: string;
  launch_date: string;
  hosting_renewal_date: string;
  domain_renewal_date: string;
  maintenance_plan: string;
  monthly_fee: number;
  notes: string;
  is_selected_work: boolean;
  portfolio_slug: string;
  portfolio_title: string;
  portfolio_thumbnail_url: string;
  portfolio_gallery_urls: string[];
  portfolio_short_description: string;
  portfolio_full_description: string;
  portfolio_role: string;
  portfolio_stack: string[];
  portfolio_live_url: string;
  portfolio_case_study_date: string;
  portfolio_featured_order: number;
  created_at: string;
}

export interface Task {
  id: string;
  website_id: string;
  assigned_to: string;
  created_by: string;
  task_title: string;
  task_description: string;
  status: "To Do" | "In Progress" | "Waiting" | "On Hold" | "Done";
  priority: "Low" | "Medium" | "High";
  task_type: string;
  due_date: string;
  completed_at: string;
  attachment_url: string;
  notes: string;
  created_at: string;
}

export interface TaskComment {
  id: string;
  task_id: string;
  user_id: string;
  comment: string;
  is_internal: boolean;
  created_at: string;
}

export interface WebsiteCredential {
  id: string;
  website_id: string;
  credential_type: string;
  label: string;
  login_url: string;
  username: string;
  email: string;
  password_value: string;
  is_internal: boolean;
  notes: string;
  created_at: string;
}

export interface WebsiteUser {
  id: string;
  website_id: string;
  user_id: string;
  access_role: string;
  is_primary_contact: boolean;
  created_at: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
  created_at: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  website_id: string;
  is_private: boolean;
  created_by: string;
  created_at: string;
}

export interface Report {
  id: string;
  title: string;
  client_id: string;
  report_type: string;
  file_url: string;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: { Row: User };
      websites: { Row: Website };
      tasks: { Row: Task };
      task_comments: { Row: TaskComment };
      website_credentials: { Row: WebsiteCredential };
      website_users: { Row: WebsiteUser };
      clients: { Row: Client };
      notes: { Row: Note };
      reports: { Row: Report };
    };
  };
}
