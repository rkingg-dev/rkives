-- Seed data for RKives dashboard
-- Uses deterministic UUIDs for FK references

-- Users (replace the UUID with your actual auth.uid() after creating the auth user)
INSERT INTO users (id, first_name, last_name, nickname, email, phone, role, company_name, notes) VALUES
  ('00000000-0000-0000-0000-000000000001', 'R King', 'Garcia', 'R King', 'rking@rkives.io', '+63 900 000 0000', 'Owner', 'RKives', 'Dashboard owner');

-- Clients
INSERT INTO clients (id, name, company, email, phone, address) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Marcus Webb', 'BrightPath Education', 'marcus@brightpath.edu', '+63 917 123 4567', 'Makati City'),
  ('10000000-0000-0000-0000-000000000002', 'Diana Reyes', 'NovaTech Corp', 'diana@novatech.ph', '+63 918 234 5678', 'BGC, Taguig'),
  ('10000000-0000-0000-0000-000000000003', 'Jason Tan', 'SkillBridge Academy', 'jason@skillbridge.edu', '+63 919 345 6789', 'Quezon City'),
  ('10000000-0000-0000-0000-000000000004', 'Rachel Lim', 'Elevate Inc', 'rachel@elevate.io', '+63 920 456 7890', 'Ortigas, Pasig'),
  ('10000000-0000-0000-0000-000000000005', 'Dr. Kim Santos', 'GreenLeaf Wellness', 'kim@greenleaf.health', '+63 921 567 8901', 'Alabang, Muntinlupa'),
  ('10000000-0000-0000-0000-000000000006', 'Andre Villanueva', 'CloudSync Tech', 'andre@cloudsync.dev', '+63 922 678 9012', 'Mandaluyong'),
  ('10000000-0000-0000-0000-000000000007', 'Liza Mendoza', 'Atlas Digital', 'liza@atlasdigital.ph', '+63 923 789 0123', 'Makati City'),
  ('10000000-0000-0000-0000-000000000008', 'Carlos Garcia', 'Meridian Group', 'carlos@meridian.ph', '+63 924 890 1234', 'Fort Bonifacio'),
  ('10000000-0000-0000-0000-000000000009', 'Mia Cruz', 'Harbor Co', 'mia@harbor.co', '+63 925 901 2345', 'Las Pinas'),
  ('10000000-0000-0000-0000-000000000010', 'Tom Aquino', 'Pinnacle Studios', 'tom@pinnacle.studio', '+63 926 012 3456', 'Paranaque'),
  ('10000000-0000-0000-0000-000000000011', 'Jade Rivera', 'Bluewave Media', 'jade@bluewave.ph', '+63 927 123 4567', 'Pasay City'),
  ('10000000-0000-0000-0000-000000000012', 'R King', 'Personal', 'rking@rkives.io', '+63 900 000 0000', 'Philippines');

-- Websites
INSERT INTO websites (id, client_id, name, slug, url, login_url, platform, project_type, scope, hosting_provider, domain_provider, domain_name, domain_expiry, hosting_expiry, status, project_start, deploy_date, monthly_maintenance_fee, is_portfolio, description, full_description, tech_stack, role, featured_order, notes) VALUES
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'BrightPath Academy', 'brightpath-academy', 'https://brightpath.edu', 'https://brightpath.edu/wp-admin', 'WordPress', 'Full Build', 'Complete WordPress site with custom theme, LMS integration, and student portal.', 'SiteGround', 'Namecheap', 'brightpath.edu', '2025-03-15', '2025-03-20', 'Live', '2024-01-10', '2024-03-15', 12000, true, 'Education platform with LMS', 'Built a complete learning management system for BrightPath Academy featuring course enrollment, SCORM compatibility, progress tracking, and certificate generation.', ARRAY['WordPress', 'LearnDash', 'Custom Theme', 'WooCommerce'], 'Lead Developer', 1, 'Client wants SCORM 1.2 compatibility.'),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'BrightPath Portal', 'brightpath-portal', 'https://portal.brightpath.edu', 'https://vercel.com', 'Next.js', 'Web App', 'Student portal for grade checking and enrollment.', 'Vercel', 'Namecheap', 'portal.brightpath.edu', '2025-03-15', '2025-06-01', 'Live', '2024-04-01', '2024-06-10', 0, false, 'Student portal for BrightPath Academy', 'React-based student portal with real-time grade viewing, enrollment management, and announcement system.', ARRAY['Next.js', 'Supabase', 'Tailwind'], 'Full Stack Developer', 0, 'API routes for grade system.'),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000002', 'NovaTech Corporate', 'novatech-corporate', 'https://novatech.ph', 'https://novatech.ph/wp-admin', 'WordPress', 'Full Build', 'Corporate website with service pages and contact forms.', 'Cloudways', 'GoDaddy', 'novatech.ph', '2025-01-20', '2025-01-25', 'Live', '2023-11-01', '2024-01-15', 8500, true, 'Corporate tech company website', 'Modern corporate website with animated hero sections, service showcases, team profiles, and integrated contact forms.', ARRAY['WordPress', 'Elementor Pro', 'Custom CSS'], 'Lead Developer', 3, ''),
  ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000003', 'SkillBridge Learning', 'skillbridge-learning', 'https://skillbridge.edu', 'https://skillbridge.edu/wp-admin', 'WordPress', 'Full Build', 'Course catalog and enrollment platform.', 'SiteGround', 'Namecheap', 'skillbridge.edu', '2025-02-10', '2025-02-15', 'Live', '2023-12-01', '2024-02-10', 15000, true, 'Online learning platform', 'Multi-course learning platform with progress tracking, quizzes, certificates, and instructor dashboards.', ARRAY['WordPress', 'LearnDash', 'BuddyBoss'], 'Lead Developer', 2, '4 modules per course structure.'),
  ('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000003', 'SkillBridge LMS', 'skillbridge-lms', 'https://lms.skillbridge.edu', 'https://lms.skillbridge.edu/wp-admin', 'WordPress', 'Integration', 'SCORM-compatible LMS for corporate training.', 'SiteGround', 'Namecheap', 'lms.skillbridge.edu', '2025-02-10', '2025-02-15', 'Live', '2024-02-01', '2024-04-15', 0, false, 'SCORM LMS for corporate training', 'Custom LMS with SCORM 1.2/2004 support, employee tracking, and reporting dashboards.', ARRAY['WordPress', 'LearnDash', 'SCORM Engine'], 'Full Stack Developer', 0, ''),
  ('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000004', 'Elevate Studio', 'elevate-studio', 'https://elevate.io', 'https://vercel.com', 'Next.js', 'Full Build', 'Course creation platform with Stripe integration.', 'Vercel', 'Cloudflare', 'elevate.io', '2025-05-01', '2025-05-01', 'Live', '2024-02-15', '2024-05-20', 10000, true, 'Course creation platform', 'Full-featured course platform with Stripe payments, video hosting, progress tracking, and instructor tools.', ARRAY['Next.js', 'Supabase', 'Stripe', 'Tailwind'], 'Full Stack Developer', 4, 'Radix UI + Tailwind design system.'),
  ('20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000005', 'GreenLeaf Health', 'greenleaf-health', 'https://greenleaf.health', 'https://greenleaf.health/wp-admin', 'WordPress', 'Full Build', 'Healthcare blog and service pages.', 'Cloudways', 'Namecheap', 'greenleaf.health', '2025-04-10', '2025-04-15', 'Live', '2024-01-20', '2024-04-10', 7000, true, 'Healthcare wellness website', 'Clean healthcare website with blog, service listings, appointment booking, and patient resources.', ARRAY['WordPress', 'Custom Theme', 'ACF'], 'Lead Developer', 5, 'Target local healthcare keywords.'),
  ('20000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000006', 'CloudSync Pro', 'cloudsync-pro', 'https://cloudsync.dev', 'https://vercel.com', 'Next.js', 'Full Build', 'SaaS dashboard with real-time sync.', 'Vercel', 'Cloudflare', 'cloudsync.dev', '2025-09-01', '2025-09-01', 'In Development', '2024-06-01', '2024-10-01', 18000, false, 'SaaS file sync platform', 'Real-time file synchronization platform with team workspaces, version control, and encrypted storage.', ARRAY['Next.js', 'Supabase', 'WebSockets', 'Tailwind'], 'Full Stack Developer', 0, 'REST API with Next.js API routes.'),
  ('20000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000007', 'Atlas Digital Group', 'atlas-digital', 'https://atlasdigital.ph', 'https://atlasdigital.ph/wp-admin', 'WordPress', 'Redesign', 'Brand refresh and site redesign.', 'SiteGround', 'GoDaddy', 'atlasdigital.ph', '2024-12-15', '2024-12-20', 'Live', '2023-10-01', '2023-12-15', 6000, false, 'Digital agency redesign', 'Complete brand refresh including logo redesign, website overhaul, and new marketing collateral.', ARRAY['WordPress', 'Elementor Pro', 'ACF'], 'Lead Developer', 0, ''),
  ('20000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000008', 'Meridian Consulting', 'meridian-consulting', 'https://meridian.ph', 'https://meridian.ph/wp-admin', 'WordPress', 'Full Build', 'Consulting firm website with client portal.', 'Cloudways', 'Namecheap', 'meridian.ph', '2025-06-01', '2025-06-05', 'Live', '2024-03-01', '2024-06-01', 14000, true, 'Consulting firm with client portal', 'Professional consulting website with service pages, case studies, team profiles, and a secure client portal for document sharing.', ARRAY['WordPress', 'Custom Theme', 'Gravity Forms'], 'Lead Developer', 6, ''),
  ('20000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000009', 'Harbor Digital', 'harbor-digital', 'https://harbor.co', 'https://vercel.com', 'Next.js', 'Landing Page', 'Agency landing page.', 'Vercel', 'Cloudflare', 'harbor.co', '2025-08-01', '2025-08-01', 'In Development', '2024-07-01', '2024-09-15', 9000, false, 'Digital agency landing page', 'Minimal, high-converting landing page for a digital agency with service showcases and contact form.', ARRAY['Next.js', 'Framer Motion', 'Tailwind'], 'Frontend Developer', 0, ''),
  ('20000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000010', 'Pinnacle Studios', 'pinnacle-studios', 'https://pinnacle.studio', 'https://webflow.com', 'Webflow', 'Full Build', 'Portfolio site for a creative studio.', 'Webflow', 'Namecheap', 'pinnacle.studio', '2025-07-01', '2025-07-01', 'Live', '2024-01-05', '2024-03-01', 5000, false, 'Creative studio portfolio', 'Webflow-built portfolio with animations, project galleries, and a contact form.', ARRAY['Webflow', 'GSAP', 'Lottie'], 'Designer & Developer', 0, ''),
  ('20000000-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000011', 'Bluewave Media', 'bluewave-media', 'https://bluewave.ph', 'https://bluewave.ph/wp-admin', 'WordPress', 'Full Build', 'Media company website.', 'SiteGround', 'Namecheap', 'bluewave.ph', '2025-04-20', '2025-04-25', 'Live', '2024-02-01', '2024-04-20', 8000, true, 'Media company website', 'Dynamic media company site with portfolio galleries, team section, blog, and press kit download.', ARRAY['WordPress', 'Elementor Pro', 'Custom Post Types'], 'Lead Developer', 7, ''),
  ('20000000-0000-0000-0000-000000000014', '10000000-0000-0000-0000-000000000012', 'RK Portfolio', 'rk-portfolio', 'https://rkingg.com', 'https://vercel.com', 'Next.js', 'Portfolio', 'Personal portfolio and case studies.', 'Vercel', 'Cloudflare', 'rkingg.com', '2025-07-01', '2025-07-01', 'Live', '2024-06-01', '2024-07-15', 0, true, 'Personal developer portfolio', 'Minimal portfolio showcasing selected works, case studies, and blog posts.', ARRAY['Next.js', 'MDX', 'Tailwind', 'Framer Motion'], 'Designer & Developer', 0, '');

-- Tasks
INSERT INTO tasks (id, website_id, title, description, status, priority, task_type, is_recurring, assigned_to, due_date, created_at) VALUES
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Fix accessibility issues', 'Run Lighthouse audit and fix all WCAG 2.1 AA violations on the main pages.', 'In Progress', 'High', 'Bug', false, 'R King', '2024-08-08', '2024-08-01'),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000005', 'Upload SCORM package', 'Client sent SCORM 1.2 package for the new compliance training module.', 'To Do', 'Medium', 'Content', false, 'R King', '2024-08-10', '2024-08-02'),
  ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000006', 'Update course landing page', 'New hero copy and pricing section from client.', 'In Progress', 'High', 'Content', false, 'R King', '2024-08-06', '2024-08-03'),
  ('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000003', 'Connect subdomain', 'Client wants to point portal.novatech.ph to the new Vercel deployment.', 'Waiting', 'Low', 'Maintenance', false, 'R King', '2024-08-12', '2024-08-03'),
  ('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000007', 'Optimize blog thumbnails', 'Resize and compress all blog post featured images to improve Core Web Vitals.', 'In Progress', 'Medium', 'Maintenance', false, 'R King', '2024-08-08', '2024-08-03'),
  ('30000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000008', 'Add pricing modal', 'Build a responsive pricing modal with monthly/yearly toggle and Stripe checkout integration.', 'To Do', 'High', 'Feature', false, 'R King', '2024-08-15', '2024-08-03'),
  ('30000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000009', 'Review DNS records', 'Client reported email delivery issues. Check MX, SPF, DKIM records.', 'Done', 'Low', 'Maintenance', false, 'R King', '2024-08-05', '2024-08-02'),
  ('30000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000014', 'Publish case study', 'Write up the BrightPath Academy case study for the portfolio.', 'On Hold', 'Medium', 'Content', false, 'R King', '2024-08-20', '2024-08-02'),
  ('30000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000008', 'Set up CI/CD pipeline', 'Configure GitHub Actions for automated testing and Vercel preview deployments.', 'To Do', 'Medium', 'Feature', false, 'R King', '2024-08-18', '2024-08-04'),
  ('30000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000002', 'Migrate to App Router', 'Convert pages/ to app/ directory. Update all API routes and middleware.', 'In Progress', 'High', 'Feature', false, 'R King', '2024-08-25', '2024-08-01'),
  ('30000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000010', 'Implement auth flow', 'Add NextAuth.js with email magic link and Google OAuth.', 'To Do', 'High', 'Feature', false, 'R King', '2024-08-22', '2024-08-04'),
  ('30000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000008', 'Write API documentation', 'Document all REST endpoints with request/response examples.', 'Waiting', 'Low', 'Content', false, 'R King', '2024-08-30', '2024-08-04'),
  ('30000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000004', 'Fix mobile nav bug', 'Hamburger menu doesn''t close on link click on iOS Safari.', 'In Progress', 'High', 'Bug', false, 'R King', '2024-08-06', '2024-08-05'),
  ('30000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000007', 'Optimize image loading', 'Implement lazy loading and WebP fallback for all blog images.', 'Done', 'Medium', 'Maintenance', false, 'R King', '2024-08-04', '2024-08-01'),
  ('30000000-0000-0000-0000-000000000015', '20000000-0000-0000-0000-000000000011', 'Deploy staging environment', 'Set up Vercel preview branch for client review before production.', 'To Do', 'Medium', 'Maintenance', false, 'R King', '2024-08-12', '2024-08-05'),
  ('30000000-0000-0000-0000-000000000016', '20000000-0000-0000-0000-000000000008', 'Configure Supabase RLS', 'Set up row-level security policies for multi-tenant data isolation.', 'In Progress', 'High', 'Feature', false, 'R King', '2024-08-14', '2024-08-04'),
  ('30000000-0000-0000-0000-000000000017', '20000000-0000-0000-0000-000000000006', 'Create email templates', 'Transactional emails: welcome, password reset, course completion.', 'To Do', 'Low', 'Feature', false, 'R King', '2024-08-20', '2024-08-05'),
  ('30000000-0000-0000-0000-000000000018', '20000000-0000-0000-0000-000000000001', 'Setup analytics tracking', 'Install GA4, configure events for enrollment and course completion.', 'Done', 'Medium', 'Maintenance', false, 'R King', '2024-08-03', '2024-08-01'),
  ('30000000-0000-0000-0000-000000000019', NULL, 'Update portfolio site', 'Add new case studies and refresh the homepage.', 'To Do', 'Medium', 'Personal', false, 'R King', '2024-08-30', '2024-08-05'),
  ('30000000-0000-0000-0000-000000000020', NULL, 'Review monthly invoices', 'Send out August invoices to all clients.', 'To Do', 'High', 'Personal', true, 'R King', '2024-08-01', '2024-08-01');

-- Website Credentials
INSERT INTO website_credentials (id, website_id, label, url, username, email, password_value, totp_secret, is_internal) VALUES
  ('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'WordPress Admin', 'https://brightpath.edu/wp-admin', 'admin', 'rking@rkives.io', '••••••••', NULL, true),
  ('40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'SiteGround', 'https://tools.siteground.com', 'rking', 'rking@rkives.io', '••••••••', NULL, true),
  ('40000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 'Namecheap', 'https://www.namecheap.com', 'rking', 'rking@rkives.io', '••••••••', NULL, true),
  ('40000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000003', 'WordPress Admin', 'https://novatech.ph/wp-admin', 'dev_admin', 'dev@rkives.io', '••••••••', NULL, true),
  ('40000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000004', 'WordPress Admin', 'https://skillbridge.edu/wp-admin', 'admin', 'rking@rkives.io', '••••••••', NULL, true),
  ('40000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000006', 'Vercel', 'https://vercel.com/dashboard', 'rking', 'rking@rkives.io', '••••••••', 'JBSWY3DPEHPK3PXP', true),
  ('40000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000006', 'Supabase', 'https://supabase.com/dashboard', 'rking', 'rking@rkives.io', '••••••••', NULL, true),
  ('40000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000006', 'Stripe', 'https://dashboard.stripe.com', 'rking@rkives.io', 'rking@rkives.io', '••••••••', 'JBSWY3DPEHPK3PXP', true),
  ('40000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000007', 'WordPress Admin', 'https://greenleaf.health/wp-admin', 'dev_admin', 'dev@rkives.io', '••••••••', NULL, true),
  ('40000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000008', 'Vercel', 'https://vercel.com/dashboard', 'rking', 'rking@rkives.io', '••••••••', NULL, true),
  ('40000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000009', 'WordPress Admin', 'https://atlasdigital.ph/wp-admin', 'admin', 'rking@rkives.io', '••••••••', NULL, true),
  ('40000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000013', 'WordPress Admin', 'https://bluewave.ph/wp-admin', 'admin', 'rking@rkives.io', '••••••••', NULL, true),
  ('40000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000014', 'Vercel', 'https://vercel.com/dashboard', 'rking', 'rking@rkives.io', '••••••••', NULL, true),
  ('40000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000014', 'Cloudflare', 'https://dash.cloudflare.com', 'rking', 'rking@rkives.io', '••••••••', NULL, true),
  ('40000000-0000-0000-0000-000000000015', '20000000-0000-0000-0000-000000000014', 'GitHub', 'https://github.com', 'rkingg-dev', 'rking@rkives.io', '••••••••', 'JBSWY3DPEHPK3PXP', true);

-- Payments
INSERT INTO payments (id, client_id, website_id, amount, currency, payment_type, method, reference_number, receipt_url, status, billing_period, notes, paid_at) VALUES
  ('50000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 12000, 'PHP', 'Monthly Maintenance', 'GCash', 'GC-20240801-001', '', 'Verified', 'Aug 2024', '', '2024-08-01'),
  ('50000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000003', 8500, 'PHP', 'Monthly Maintenance', 'Bank Transfer', 'BDO-20240802-002', '', 'Verified', 'Aug 2024', 'BDO Transfer', '2024-08-02'),
  ('50000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000004', 15000, 'PHP', 'Monthly Maintenance', 'GCash', 'GC-20240801-003', '', 'Verified', 'Aug 2024', '', '2024-08-01'),
  ('50000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000006', 10000, 'PHP', 'Monthly Maintenance', 'GCash', 'GC-20240803-004', '', 'Verified', 'Aug 2024', '', '2024-08-03'),
  ('50000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000007', 7000, 'PHP', 'Monthly Maintenance', 'Bank Transfer', 'BPI-20240802-005', '', 'Verified', 'Aug 2024', 'BPI Transfer', '2024-08-02'),
  ('50000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000008', 18000, 'PHP', 'Monthly Maintenance', 'GCash', 'GC-20240801-006', '', 'Verified', 'Aug 2024', '', '2024-08-01'),
  ('50000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000009', 6000, 'PHP', 'Monthly Maintenance', 'GCash', 'GC-20240803-007', '', 'Verified', 'Aug 2024', '', '2024-08-03'),
  ('50000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000010', 14000, 'PHP', 'Monthly Maintenance', 'Bank Transfer', 'MB-20240804-008', '', 'Verified', 'Aug 2024', 'Metrobank', '2024-08-04'),
  ('50000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000011', 9000, 'PHP', 'Monthly Maintenance', 'GCash', 'GC-20240802-009', '', 'Pending', 'Aug 2024', 'Waiting for receipt', NULL),
  ('50000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000012', 5000, 'PHP', 'Monthly Maintenance', 'GCash', 'GC-20240801-010', '', 'Verified', 'Aug 2024', '', '2024-08-01'),
  ('50000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000013', 8000, 'PHP', 'Monthly Maintenance', 'Bank Transfer', 'UB-20240803-011', '', 'Verified', 'Aug 2024', 'UnionBank', '2024-08-03'),
  ('50000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 5500, 'PHP', 'Hosting', 'GCash', 'GC-20240715-012', '', 'Verified', 'Mar 2024 - Mar 2025', 'SiteGround annual', '2024-07-15');

-- Changelog Entries
INSERT INTO changelog_entries (id, website_id, title, content, version, entry_type, is_published, published_at) VALUES
  ('60000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'v1.4.0 — Accessibility Update', 'Fixed 23 WCAG 2.1 AA violations. Added skip navigation links, improved color contrast, and added alt text to all images.', '1.4.0', 'Update', true, '2024-08-05'),
  ('60000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'v1.3.2 — Bug Fix', 'Fixed course enrollment redirect loop on iOS Safari. Updated session handling middleware.', '1.3.2', 'Fix', true, '2024-07-28'),
  ('60000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000006', 'v2.1.0 — Pricing Modal', 'Added responsive pricing modal with monthly/yearly toggle. Integrated Stripe Checkout for subscription management.', '2.1.0', 'Feature', true, '2024-08-01'),
  ('60000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000006', 'v2.0.1 — Security Patch', 'Patched XSS vulnerability in comment forms. Updated all dependencies to latest versions.', '2.0.1', 'Security', true, '2024-07-20'),
  ('60000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000008', 'v0.3.0 — Auth System', 'Implemented NextAuth.js with email magic links and Google OAuth. Added session management and protected routes.', '0.3.0', 'Feature', false, NULL),
  ('60000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000004', 'v3.2.0 — Course Structure', 'Restructured course modules to support 4-part format. Added progress persistence across sessions.', '3.2.0', 'Update', true, '2024-07-15'),
  ('60000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000007', 'v1.1.0 — Image Optimization', 'Implemented WebP conversion and lazy loading for all blog images. Improved LCP from 3.2s to 1.8s.', '1.1.0', 'Maintenance', true, '2024-08-03'),
  ('60000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000010', 'v1.0.0 — Initial Launch', 'Launched consulting website with service pages, team profiles, case studies, and contact forms.', '1.0.0', 'Update', true, '2024-06-01');

-- Notes
INSERT INTO notes (id, title, slug, content, is_public, tags, website_id) VALUES
  ('70000000-0000-0000-0000-000000000001', 'BrightPath — SCORM Integration Notes', 'brightpath-scorm-notes', 'Client wants SCORM 1.2 compatibility. Test with Moodle and Canvas LMS. Package should include completion tracking and quiz results.', false, ARRAY['scorm', 'lms', 'wordpress'], '20000000-0000-0000-0000-000000000001'),
  ('70000000-0000-0000-0000-000000000002', 'SkillBridge — Course Structure', 'skillbridge-course-structure', '4 modules per course. Each module has video + quiz + reflection. Use LearnDash groups for cohort management. Certificate auto-generate on completion.', false, ARRAY['learndash', 'course-design'], '20000000-0000-0000-0000-000000000004'),
  ('70000000-0000-0000-0000-000000000003', 'Elevate — Design System', 'elevate-design-system', 'Use Radix UI + Tailwind. Color palette: indigo primary, warm grays. Inter font. Component library in /components/ui.', true, ARRAY['design', 'tailwind', 'radix'], '20000000-0000-0000-0000-000000000006'),
  ('70000000-0000-0000-0000-000000000004', 'GreenLeaf — SEO Strategy', 'greenleaf-seo-strategy', 'Target local keywords: healthcare training, wellness programs. Blog 2x/week. Internal linking strategy. Schema markup for local business.', false, ARRAY['seo', 'content'], '20000000-0000-0000-0000-000000000007'),
  ('70000000-0000-0000-0000-000000000005', 'CloudSync — API Architecture', 'cloudsync-api-architecture', 'REST API with Next.js API routes. Supabase for DB. Auth via NextAuth. Real-time via WebSockets. Rate limiting on public endpoints.', false, ARRAY['api', 'supabase', 'architecture'], '20000000-0000-0000-0000-000000000008'),
  ('70000000-0000-0000-0000-000000000006', 'Hosting Comparison 2024', 'hosting-comparison-2024', 'SiteGround: Best for WordPress, good support. Cloudways: Flexible, pay-as-you-go. Vercel: Best for Next.js, generous free tier. Cloudflare: Cheap domains, good DNS.', true, ARRAY['hosting', 'comparison'], NULL),
  ('70000000-0000-0000-0000-000000000007', 'RK Portfolio v2 Ideas', 'rk-portfolio-v2-ideas', 'Case studies with before/after. Interactive demos. Blog with MDX. Dark mode. Animated page transitions. RSS feed.', false, ARRAY['portfolio', 'ideas'], '20000000-0000-0000-0000-000000000014'),
  ('70000000-0000-0000-0000-000000000008', 'Supabase RLS Patterns', 'supabase-rls-patterns', 'Multi-tenant: use org_id in JWT claims. Read policies: auth.uid() = user_id OR org_id in user_orgs. Write policies: check role column.', true, ARRAY['supabase', 'security', 'tutorial'], NULL);

-- Pastebin Entries
INSERT INTO pastebin_entries (id, title, content, language, is_public, share_token) VALUES
  ('80000000-0000-0000-0000-000000000001', 'Supabase RLS Policy', 'CREATE POLICY "users_org_read" ON websites
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM website_users WHERE website_id = id
    )
  );', 'sql', true, 'supa-rls-01'),
  ('80000000-0000-0000-0000-000000000002', 'Next.js Middleware Auth', 'import { NextResponse } from ''next/server''
import type { NextRequest } from ''next/server''

export function middleware(request: NextRequest) {
  const token = request.cookies.get(''sb-access-token'')
  if (!token) return NextResponse.redirect(new URL(''/login'', request.url))
  return NextResponse.next()
}', 'typescript', true, 'next-auth-01'),
  ('80000000-0000-0000-0000-000000000003', 'WCAG Contrast Checker', 'function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1)
  const l2 = getLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}', 'typescript', false, NULL),
  ('80000000-0000-0000-0000-000000000004', 'SCORM Package Loader', '// SCORM 1.2 API wrapper
const scormAPI = {
  Initialize: () => window.API?.LMSInitialize(''''),
  GetValue: (key: string) => window.API?.LMSGetValue(key),
  SetValue: (key: string, val: string) => window.API?.LMSSetValue(key, val),
  Commit: () => window.API?.LMSCommit(''''),
  Terminate: () => window.API?.LMSFinish(''''),
}', 'typescript', true, 'scorm-01');

-- WP Updates
INSERT INTO wp_updates (id, website_id, item_type, item_name, current_version, latest_version, status, auto_update) VALUES
  ('90000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Core', 'WordPress', '6.5.4', '6.6.1', 'Update Available', false),
  ('90000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'Plugin', 'WooCommerce', '8.9.3', '9.1.0', 'Update Available', false),
  ('90000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 'Plugin', 'LearnDash LMS', '4.15.1', '4.15.1', 'Up-to-date', false),
  ('90000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', 'Plugin', 'Elementor', '3.21.0', '3.23.1', 'Update Available', false),
  ('90000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000001', 'Theme', 'Flavor Developer', '2.4.0', '2.4.0', 'Up-to-date', false),
  ('90000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000003', 'Core', 'WordPress', '6.5.4', '6.6.1', 'Update Available', false),
  ('90000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000003', 'Plugin', 'Elementor Pro', '3.21.0', '3.23.1', 'Update Available', false),
  ('90000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000003', 'Plugin', 'WPForms', '1.8.9', '1.8.9', 'Up-to-date', false),
  ('90000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000004', 'Core', 'WordPress', '6.6.1', '6.6.1', 'Up-to-date', true),
  ('90000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000004', 'Plugin', 'LearnDash LMS', '4.15.1', '4.15.1', 'Up-to-date', false),
  ('90000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000004', 'Plugin', 'BuddyBoss', '2.5.0', '2.6.1', 'Update Available', false),
  ('90000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000007', 'Core', 'WordPress', '6.4.3', '6.6.1', 'Critical', false),
  ('90000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000007', 'Plugin', 'Yoast SEO', '22.8', '23.1', 'Update Available', false),
  ('90000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000007', 'Plugin', 'Advanced Custom Fields', '6.2.7', '6.3.0', 'Update Available', false),
  ('90000000-0000-0000-0000-000000000015', '20000000-0000-0000-0000-000000000009', 'Core', 'WordPress', '6.5.4', '6.6.1', 'Update Available', false),
  ('90000000-0000-0000-0000-000000000016', '20000000-0000-0000-0000-000000000009', 'Plugin', 'Elementor Pro', '3.21.0', '3.23.1', 'Update Available', false),
  ('90000000-0000-0000-0000-000000000017', '20000000-0000-0000-0000-000000000013', 'Core', 'WordPress', '6.5.4', '6.6.1', 'Update Available', false),
  ('90000000-0000-0000-0000-000000000018', '20000000-0000-0000-0000-000000000013', 'Plugin', 'Elementor', '3.21.0', '3.23.1', 'Update Available', false);

-- Reports
INSERT INTO reports (id, title, client_id, report_type, date, status) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'BrightPath — Monthly Report', '10000000-0000-0000-0000-000000000001', 'Client Report', 'Aug 1, 2024', 'Ready'),
  ('a0000000-0000-0000-0000-000000000002', 'SkillBridge — Course Progress', '10000000-0000-0000-0000-000000000003', 'Client Report', 'Aug 1, 2024', 'Ready'),
  ('a0000000-0000-0000-0000-000000000003', 'Maintenance Log — July', NULL, 'Maintenance', 'Jul 31, 2024', 'Ready'),
  ('a0000000-0000-0000-0000-000000000004', 'Task Summary — Week 31', NULL, 'Task Report', 'Jul 28, 2024', 'Ready'),
  ('a0000000-0000-0000-0000-000000000005', 'Elevate — Project Status', '10000000-0000-0000-0000-000000000004', 'Client Report', 'Jul 25, 2024', 'Ready'),
  ('a0000000-0000-0000-0000-000000000006', 'CloudSync — Sprint Review', '10000000-0000-0000-0000-000000000006', 'Client Report', 'Jul 20, 2024', 'Ready');

-- Projects
INSERT INTO projects (id, name, website_id, project_type, progress, deadline, status) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'BrightPath Portal Redesign', '20000000-0000-0000-0000-000000000002', 'Web App', 65, 'Sep 2024', 'In Progress'),
  ('b0000000-0000-0000-0000-000000000002', 'SkillBridge SCORM Integration', '20000000-0000-0000-0000-000000000005', 'Integration', 30, 'Aug 2024', 'In Progress'),
  ('b0000000-0000-0000-0000-000000000003', 'Elevate Course Platform', '20000000-0000-0000-0000-000000000006', 'Full Build', 80, 'Aug 2024', 'In Progress'),
  ('b0000000-0000-0000-0000-000000000004', 'CloudSync MVP', '20000000-0000-0000-0000-000000000008', 'Full Build', 45, 'Oct 2024', 'In Progress'),
  ('b0000000-0000-0000-0000-000000000005', 'GreenLeaf Blog Optimization', '20000000-0000-0000-0000-000000000007', 'SEO', 90, 'Aug 2024', 'In Progress'),
  ('b0000000-0000-0000-0000-000000000006', 'Harbor Digital Landing', '20000000-0000-0000-0000-000000000011', 'Landing Page', 15, 'Sep 2024', 'In Progress'),
  ('b0000000-0000-0000-0000-000000000007', 'Meridian Client Portal', '20000000-0000-0000-0000-000000000010', 'Web App', 40, 'Nov 2024', 'In Progress'),
  ('b0000000-0000-0000-0000-000000000008', 'RK Portfolio v2', '20000000-0000-0000-0000-000000000014', 'Portfolio', 20, 'Sep 2024', 'Planning');
