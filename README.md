# RKives

A personal workflow dashboard for freelance web developers. Manage clients, websites, tasks, payments, credentials, and more — all in one place.

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![Supabase](https://img.shields.io/badge/Supabase-2.45-3ecf8e?logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06b6d4?logo=tailwindcss)

## Features

### 17 Dashboard Pages

| Page | Description |
|------|-------------|
| **Overview** | KPI tiles with revenue goal tracking, revenue trend chart, 6-tab tasks table, sidebar with calendar, cash flow, payments, projects, invoices, website health, scratchpad |
| **Clients** | Client management with contact info, website count, CRUD operations |
| **Websites** | Website tracking with platform, hosting, domain expiry, monthly fees |
| **Projects** | Project cards with progress bars, deadlines, and status tracking |
| **Tasks** | Filterable task table with status/priority/type filters, bulk actions, recurring tasks |
| **Calendar** | Full month grid with events derived from task due dates |
| **WordPress** | WP update tracker with Core/Plugin/Theme filters, critical update alerts |
| **Passwords** | Credential vault with show/hide toggle, copy button, 2FA status |
| **Payments** | Payment tracking with receipt-based workflow (Pending → Verified → Paid) |
| **Finance** | Revenue/expense charts, client MRR (computed from real data), savings goals |
| **Changelog** | Site-specific changelog with version/type badges, timeline layout |
| **Notes** | Searchable note cards with tags, public/private visibility |
| **Pastebin** | Code snippet sharing with language badges, public share links |
| **Reports** | Report generation and download tracking |
| **Invoice** | Invoice detail view with line items, activity timeline |
| **Settings** | Profile, workspace, integrations, billing, notifications tabs |

### Authentication & Security

- Email/password login via Supabase Auth
- Middleware route protection — unauthenticated users redirected to `/login`
- Row Level Security (RLS) on all tables
- Session persistence across page refreshes

### CRUD Operations

Every entity supports full Create, Read, Update, Delete:

- **Forms** — react-hook-form + zod validation on all 10 form types
- **Edit** — pre-filled form modals/drawers for editing existing records
- **Delete** — confirmation dialogs before deletion
- **Toast notifications** — success/error feedback via sonner

### Search & Navigation

- **Global search** — debounced search bar in navbar, searches across clients, websites, tasks, notes
- **Command palette** — `Cmd+K` / `Ctrl+K` to search and jump to any page
- **Real notifications** — tasks due soon, expiring domains, pending payments

### Dashboard Widgets

- **KPI tiles** — active clients, websites, open tasks, monthly revenue (with goal progress bar), overdue count (red alert), maintenance alerts
- **Revenue trend** — area chart showing monthly revenue and profit from real payments data, with trend percentage badge
- **Tasks table** — 6 tabs: Task Overview, Overdue & Due Soon (with count badge), Project Timeline, Maintenance, Revenue, Portfolio
- **Cash flow** — sidebar widget showing income, expenses, net, and savings rate
- **Pending payments** — pending/verified/outstanding payment summary with peso amounts
- **Active projects** — compact project list with progress bars and deadline sorting
- **Invoice pipeline** — stacked bar showing Draft → Sent → Pending → Verified → Paid distribution
- **Website health** — domain/hosting expiry alerts, WordPress updates pending, stale changelogs
- **Quick notes** — localStorage scratchpad that persists across sessions
- **Quick actions** — add task, payment, or note from dashboard via modal
- **Mini calendar** — month view with task due date dots, links to full calendar
- **Recurring tasks** — suggests tasks due again based on recurrence intervals
- **Recent activity** — merged timeline of latest tasks and payments

### Dashboard Intelligence

- **KPI computation** — all metrics computed from real Supabase data
- **Revenue goal** — progress bar toward monthly revenue target (₱100k default)
- **Overdue alerts** — red KPI badge + dedicated table tab for overdue tasks
- **Bulk actions** — select multiple tasks, batch update status or delete

### File Uploads

- Receipt uploads for payments via Supabase Storage
- Thumbnail uploads for notes
- Image preview with remove functionality

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS, Framer Motion |
| Components | Radix UI primitives (shadcn/ui pattern) |
| Charts | Recharts |
| Forms | react-hook-form + zod |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Icons | Lucide React |
| Animations | Framer Motion |
| Command Palette | cmdk |
| Toasts | sonner |
| Dates | date-fns |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── notifications/route.ts    # Real-time notification data
│   │   ├── pastebin/[token]/route.ts # Public paste sharing
│   │   └── search/route.ts           # Global search endpoint
│   ├── dashboard/
│   │   ├── calendar/page.tsx
│   │   ├── changelog/page.tsx
│   │   ├── clients/page.tsx
│   │   ├── finance/page.tsx
│   │   ├── invoice/page.tsx
│   │   ├── layout.tsx                # Dashboard shell with sidebar + navbar
│   │   ├── notes/page.tsx
│   │   ├── page.tsx                  # Overview with KPIs, charts, activity
│   │   ├── passwords/page.tsx
│   │   ├── pastebin/page.tsx
│   │   ├── payments/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── tasks/page.tsx
│   │   ├── websites/page.tsx
│   │   └── wordpress/page.tsx
│   ├── layout.tsx                    # Root layout with AuthProvider + Toaster
│   ├── login/page.tsx                # Supabase Auth login form
│   └── page.tsx                      # Redirect to /dashboard
├── components/
│   ├── dashboard/
│   │   ├── ActiveProjects.tsx        # Sidebar: active projects with progress bars
│   │   ├── CashFlowWidget.tsx        # Sidebar: income/expenses/savings rate
│   │   ├── InvoicePipeline.tsx       # Sidebar: payment status pipeline
│   │   ├── KpiTabs.tsx               # KPI tiles with revenue goal + overdue alert
│   │   ├── MiniCalendar.tsx          # Calendar widget with task events
│   │   ├── PendingPayments.tsx       # Sidebar: pending/verified/outstanding
│   │   ├── QuickActions.tsx          # Quick add task/payment/note buttons
│   │   ├── QuickNotes.tsx            # Sidebar: localStorage scratchpad
│   │   ├── TasksTable.tsx            # 6-tab table (Overview, Overdue, Timeline, etc.)
│   │   ├── TrendsChart.tsx           # Revenue area chart from real data
│   │   ├── WebsiteHealth.tsx         # Sidebar: expiry alerts + WP updates
│   │   └── WorkspaceWidgets.tsx      # Portfolio + maintenance widgets
│   ├── forms/
│   │   ├── CalendarEventForm.tsx
│   │   ├── ChangelogForm.tsx
│   │   ├── ClientForm.tsx
│   │   ├── CredentialForm.tsx
│   │   ├── NoteForm.tsx
│   │   ├── PastebinForm.tsx
│   │   ├── PaymentForm.tsx
│   │   ├── ProjectForm.tsx
│   │   ├── TaskForm.tsx
│   │   └── WebsiteForm.tsx
│   ├── layout/
│   │   ├── CommandPalette.tsx        # Cmd+K command palette
│   │   ├── Navbar.tsx                # Search, notifications, profile
│   │   ├── Sidebar.tsx               # Collapsible sidebar navigation
│   │   ├── SidebarContext.tsx         # Sidebar state management
│   │   └── ThemeToggle.tsx           # Dark/light mode toggle
│   └── ui/
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── drawer.tsx
│       ├── error-state.tsx
│       ├── file-upload.tsx
│       ├── input.tsx
│       ├── loading-skeleton.tsx
│       ├── modal.tsx
│       ├── pagination.tsx
│       ├── progress-ring.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       └── separator.tsx
├── hooks/
│   ├── use-supabase-mutation.ts      # Insert/update/delete operations
│   └── use-supabase-query.ts         # Data fetching with loading/error
├── lib/
│   ├── auth-context.tsx              # AuthProvider + useAuth hook
│   ├── finance-data.ts               # Static finance visualization data
│   ├── mock-data.ts                  # Legacy mock data (kept for reference)
│   ├── supabase.ts                   # Supabase client initialization
│   ├── utils.ts                      # cn() utility for className merging
│   └── supabase/
│       ├── auth.ts                   # signIn, signOut, getSession
│       ├── server.ts                 # Server-side client (service role)
│       └── types.ts                  # Database types with Insert/Update
│   └── validations/
│       ├── calendar.ts
│       ├── changelog.ts
│       ├── clients.ts
│       ├── credentials.ts
│       ├── notes.ts
│       ├── pastebin.ts
│       ├── payments.ts
│       ├── projects.ts
│       ├── tasks.ts
│       └── websites.ts
└── middleware.ts                      # Route protection

supabase/
├── migrations/
│   ├── 001_create_tables.sql         # 12 tables with constraints + indexes
│   ├── 002_enable_rls.sql            # Row Level Security policies
│   └── 003_updated_at_triggers.sql   # Auto-update updated_at columns
└── seed.sql                          # Seed data for all tables
```

## Database Schema

12 tables with foreign key relationships:

```
clients ──< websites ──< tasks
                  ├──< website_credentials
                  ├──< changelog_entries
                  ├──< wp_updates
                  ├──< notes
                  └──< projects

clients ──< payments ──< websites (nullable)
clients ──< reports

users (standalone — linked to auth.users)
pastebin_entries (standalone)
```

### Tables

| Table | Key Fields | Description |
|-------|-----------|-------------|
| `users` | id, first_name, last_name, email, role, company_name | Dashboard owner profile |
| `clients` | id, name, company, email, phone, address | Client contacts |
| `websites` | id, client_id, name, slug, url, platform, monthly_maintenance_fee, is_portfolio | Website management |
| `tasks` | id, website_id, title, status, priority, task_type, due_date, is_recurring | Task tracking |
| `website_credentials` | id, website_id, label, url, username, password_value, totp_secret | Credential vault |
| `payments` | id, client_id, website_id, amount, method, status, receipt_url | Payment tracking |
| `changelog_entries` | id, website_id, title, content, version, entry_type | Site changelogs |
| `notes` | id, title, slug, content, tags[], is_public | Notes & documentation |
| `pastebin_entries` | id, title, content, language, share_token, is_public | Code snippets |
| `wp_updates` | id, website_id, item_type, item_name, current_version, latest_version | WordPress updates |
| `reports` | id, title, client_id, report_type, date, status | Report tracking |
| `projects` | id, name, website_id, project_type, progress, deadline | Project management |

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- A [Supabase](https://supabase.com) project

### 1. Clone and install

```bash
git clone https://github.com/rkingg-dev/rkives.git
cd rkives
pnpm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration files in order:
   - `supabase/migrations/001_create_tables.sql`
   - `supabase/migrations/002_enable_rls.sql`
   - `supabase/migrations/003_updated_at_triggers.sql`
3. Run `supabase/seed.sql` to populate with sample data
4. Go to **Authentication > Users** and create your user account
5. Copy the user's UUID and update the `users` table seed entry, or insert manually:
   ```sql
   INSERT INTO users (id, first_name, last_name, nickname, email, role, company_name)
   VALUES ('<your-auth-uid>', 'Your Name', 'Last Name', 'Nickname', 'you@email.com', 'Owner', 'Your Company');
   ```
6. (Optional) Create a Storage bucket called `uploads` for file uploads

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these values in your Supabase project under **Settings > API**.

### 4. Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). You'll be redirected to `/login` to sign in.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+K` / `Ctrl+K` | Open command palette |
| Click theme toggle | Switch dark/light mode |

## Architecture Decisions

### Client-side data fetching

All dashboard pages are client components (`"use client"`) to preserve framer-motion animations and interactive state. Data is fetched via `useSupabaseQuery` hooks that wrap Supabase queries with loading/error states.

### Single-user RLS

Since this is a personal dashboard, RLS policies are simple: `auth.role() = 'authenticated'` grants full access. The middleware handles the actual access control by redirecting unauthenticated users.

### Form pattern

All forms follow the same pattern:
- react-hook-form with zodResolver for validation
- Controller wrappers for the custom Select component
- useSupabaseMutation for insert/update operations
- Toast notifications on success/error
- Programmatic modal close after submission

### Finance data

The finance page uses a hybrid approach:
- **Client MRR** — computed from real `websites` + `clients` data
- **Revenue/expenses/savings** — kept as static visualization data (would need dedicated tables for full CRUD)

## Deployment

### Vercel (recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy

### Other platforms

The app is a standard Next.js 15 application. It can be deployed to any platform that supports Node.js:
- Railway
- Render
- DigitalOcean App Platform
- Self-hosted with `pnpm build && pnpm start`

## License

Private project — not licensed for public use.
