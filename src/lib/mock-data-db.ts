// Mock data in snake_case format matching Supabase schema
// Used as fallback when Supabase is not configured

import { clientData, websiteData, taskData, credentialData, paymentData, changelogData, notesData, pastebinData, wpUpdateData, reportData, projectData } from "./mock-data";

// Helper to generate deterministic UUIDs
function makeId(prefix: string, index: number) {
  return `${"0".repeat(8)}-0000-0000-0000-${String(index + 1).padStart(12, "0")}`;
}

function generateId() {
  return Math.random().toString(36).slice(2, 15);
}

export const mockClients = clientData.map((c, i) => ({
  id: makeId("client", i),
  name: c.name,
  company: c.company,
  email: c.email,
  phone: c.phone,
  address: c.address,
  avatar_url: c.avatar || "",
  notes: "",
  created_at: new Date(Date.now() - i * 86400000 * 30).toISOString(),
  updated_at: new Date(Date.now() - i * 86400000 * 15).toISOString(),
}));

// Map old client IDs to new UUIDs
const clientIdMap = new Map<string, string>();
clientData.forEach((c, i) => clientIdMap.set(c.id, makeId("client", i)));

export const mockWebsites = websiteData.map((w, i) => ({
  id: makeId("website", i),
  client_id: clientIdMap.get(w.clientId) || null,
  name: w.name,
  slug: w.slug,
  url: w.url,
  login_url: w.loginUrl,
  platform: w.platform,
  project_type: w.projectType,
  scope: w.scope,
  hosting_provider: w.hosting,
  domain_provider: w.domain,
  domain_name: w.domainName,
  domain_expiry: w.domainExpiry,
  hosting_expiry: w.hostingExpiry,
  status: w.status,
  project_start: w.projectStart,
  deploy_date: w.deployDate,
  monthly_maintenance_fee: w.monthlyFee,
  is_portfolio: w.isPortfolio,
  thumbnail_url: w.thumbnail,
  gallery_urls: w.gallery,
  description: w.description,
  full_description: w.fullDescription,
  tech_stack: w.techStack,
  role: w.role,
  featured_order: w.featuredOrder,
  notes: w.notes,
  created_at: new Date(Date.now() - i * 86400000 * 20).toISOString(),
  updated_at: new Date(Date.now() - i * 86400000 * 10).toISOString(),
}));

const websiteIdMap = new Map<string, string>();
websiteData.forEach((w, i) => websiteIdMap.set(w.id, makeId("website", i)));

export const mockTasks = taskData.map((t, i) => ({
  id: makeId("task", i),
  website_id: t.websiteId ? websiteIdMap.get(t.websiteId) || null : null,
  title: t.title,
  description: t.description,
  status: t.status,
  priority: t.priority,
  task_type: t.type,
  is_recurring: t.isRecurring,
  recurrence_interval: null,
  assigned_to: t.assignedTo,
  due_date: t.dueDate,
  completed_at: t.status === "Done" ? new Date().toISOString() : null,
  attachment_url: null,
  notes: "",
  created_at: t.createdAt,
  updated_at: new Date().toISOString(),
}));

export const mockCredentials = credentialData.map((c, i) => ({
  id: makeId("cred", i),
  website_id: websiteIdMap.get(c.websiteId) || null,
  label: c.label,
  url: c.url,
  username: c.username,
  email: c.email,
  password_value: c.password,
  totp_secret: c.totp || null,
  is_internal: c.isInternal,
  notes: "",
  created_at: new Date(Date.now() - i * 86400000 * 15).toISOString(),
}));

export const mockPayments = paymentData.map((p, i) => ({
  id: makeId("payment", i),
  client_id: clientIdMap.get(p.clientId) || null,
  website_id: p.websiteId ? websiteIdMap.get(p.websiteId) || null : null,
  amount: p.amount,
  currency: p.currency,
  payment_type: p.type,
  method: p.method,
  reference_number: p.referenceNumber,
  receipt_url: p.receiptUrl || "",
  status: p.status,
  billing_period: p.billingPeriod,
  notes: p.notes || "",
  paid_at: p.paidAt || null,
  created_at: new Date(Date.now() - i * 86400000 * 5).toISOString(),
}));

export const mockChangelog = changelogData.map((c, i) => ({
  id: makeId("changelog", i),
  website_id: websiteIdMap.get(c.websiteId) || null,
  title: c.title,
  content: c.content,
  version: c.version || null,
  entry_type: c.type,
  is_published: c.isPublished,
  published_at: c.publishedAt || null,
  created_at: new Date(Date.now() - i * 86400000 * 10).toISOString(),
}));

export const mockNotes = notesData.map((n, i) => ({
  id: makeId("note", i),
  title: n.title,
  slug: n.slug,
  content: n.content,
  thumbnail_url: n.thumbnail,
  is_public: n.isPublic,
  tags: n.tags,
  website_id: n.websiteId ? websiteIdMap.get(n.websiteId) || null : null,
  created_at: new Date(Date.now() - i * 86400000 * 7).toISOString(),
  updated_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
}));

export const mockPastebin = pastebinData.map((p, i) => ({
  id: makeId("paste", i),
  title: p.title,
  content: p.content,
  language: p.language,
  is_public: p.isPublic,
  share_token: p.shareToken || null,
  expires_at: p.expiresAt || null,
  created_at: new Date(Date.now() - i * 86400000 * 12).toISOString(),
}));

export const mockWpUpdates = wpUpdateData.map((w, i) => ({
  id: makeId("wpupdate", i),
  website_id: websiteIdMap.get(w.websiteId) || null,
  item_type: w.itemType,
  item_name: w.itemName,
  current_version: w.currentVersion,
  latest_version: w.latestVersion,
  status: w.status,
  last_checked: w.lastChecked,
  auto_update: w.autoUpdate,
  notes: "",
}));

export const mockReports = reportData.map((r, i) => ({
  id: makeId("report", i),
  title: r.title,
  client_id: null,
  report_type: r.type,
  date: r.date,
  status: r.status,
  created_at: new Date(Date.now() - i * 86400000 * 20).toISOString(),
}));

export const mockProjects = projectData.map((p, i) => ({
  id: makeId("project", i),
  name: p.name,
  website_id: websiteIdMap.get(p.websiteId) || null,
  project_type: p.type,
  progress: p.progress,
  deadline: p.deadline,
  status: p.status,
  created_at: new Date(Date.now() - i * 86400000 * 15).toISOString(),
  updated_at: new Date(Date.now() - i * 86400000 * 7).toISOString(),
}));

export const mockUsers = [
  {
    id: generateId(),
    first_name: "R King",
    last_name: "Garcia",
    nickname: "R King",
    email: "rking@rkives.io",
    phone: "+63 900 000 0000",
    role: "Owner",
    company_name: "RKives",
    notes: "Dashboard owner",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: new Date().toISOString(),
  },
];

// Map table names to mock data
export const mockDataMap: Record<string, unknown[]> = {
  clients: mockClients,
  websites: mockWebsites,
  tasks: mockTasks,
  website_credentials: mockCredentials,
  payments: mockPayments,
  changelog_entries: mockChangelog,
  notes: mockNotes,
  pastebin_entries: mockPastebin,
  wp_updates: mockWpUpdates,
  reports: mockReports,
  projects: mockProjects,
  users: mockUsers,
};
