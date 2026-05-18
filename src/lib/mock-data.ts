// ─── KPIs ───────────────────────────────────────────
export const kpiData = [
  { label: "Active Clients", value: "12", change: "+2", positive: true },
  { label: "Websites", value: "28", change: "+3", positive: true },
  { label: "Open Tasks", value: "47", change: "+8", positive: false },
  { label: "Monthly Revenue", value: "\u20B184,500", change: "+12%", positive: true },
  { label: "Due This Week", value: "9", change: "-2", positive: true },
  { label: "Maintenance", value: "16", change: "+1", positive: false },
];

// ─── Chart ──────────────────────────────────────────
export const trendData = [
  { month: "Jul", tasksCompleted: 18, newTasks: 24, websiteUpdates: 12 },
  { month: "Jul 15", tasksCompleted: 22, newTasks: 19, websiteUpdates: 15 },
  { month: "Jul 22", tasksCompleted: 15, newTasks: 28, websiteUpdates: 10 },
  { month: "Jul 29", tasksCompleted: 28, newTasks: 22, websiteUpdates: 18 },
  { month: "Aug 5", tasksCompleted: 20, newTasks: 30, websiteUpdates: 14 },
  { month: "Aug 12", tasksCompleted: 32, newTasks: 25, websiteUpdates: 20 },
  { month: "Aug 19", tasksCompleted: 25, newTasks: 20, websiteUpdates: 16 },
  { month: "Aug 26", tasksCompleted: 35, newTasks: 28, websiteUpdates: 22 },
];

// ─── Clients ────────────────────────────────────────
export const clientData = [
  { id: "1", name: "Marcus Webb", company: "BrightPath Education", email: "marcus@brightpath.edu", phone: "+63 917 123 4567", address: "Makati City", websites: 2, monthlyFee: "\u20B112,000", status: "Active", avatar: "" },
  { id: "2", name: "Diana Reyes", company: "NovaTech Corp", email: "diana@novatech.ph", phone: "+63 918 234 5678", address: "BGC, Taguig", websites: 1, monthlyFee: "\u20B18,500", status: "Active", avatar: "" },
  { id: "3", name: "Jason Tan", company: "SkillBridge Academy", email: "jason@skillbridge.edu", phone: "+63 919 345 6789", address: "Quezon City", websites: 3, monthlyFee: "\u20B115,000", status: "Active", avatar: "" },
  { id: "4", name: "Rachel Lim", company: "Elevate Inc", email: "rachel@elevate.io", phone: "+63 920 456 7890", address: "Ortigas, Pasig", websites: 2, monthlyFee: "\u20B110,000", status: "Active", avatar: "" },
  { id: "5", name: "Dr. Kim Santos", company: "GreenLeaf Wellness", email: "kim@greenleaf.health", phone: "+63 921 567 8901", address: "Alabang, Muntinlupa", websites: 1, monthlyFee: "\u20B17,000", status: "Active", avatar: "" },
  { id: "6", name: "Andre Villanueva", company: "CloudSync Tech", email: "andre@cloudsync.dev", phone: "+63 922 678 9012", address: "Mandaluyong", websites: 4, monthlyFee: "\u20B118,000", status: "Active", avatar: "" },
  { id: "7", name: "Liza Mendoza", company: "Atlas Digital", email: "liza@atlasdigital.ph", phone: "+63 923 789 0123", address: "Makati City", websites: 2, monthlyFee: "\u20B16,000", status: "Active", avatar: "" },
  { id: "8", name: "Carlos Garcia", company: "Meridian Group", email: "carlos@meridian.ph", phone: "+63 924 890 1234", address: "Fort Bonifacio", websites: 3, monthlyFee: "\u20B114,000", status: "Active", avatar: "" },
  { id: "9", name: "Mia Cruz", company: "Harbor Co", email: "mia@harbor.co", phone: "+63 925 901 2345", address: "Las Pinas", websites: 2, monthlyFee: "\u20B19,000", status: "Active", avatar: "" },
  { id: "10", name: "Tom Aquino", company: "Pinnacle Studios", email: "tom@pinnacle.studio", phone: "+63 926 012 3456", address: "Parañaque", websites: 1, monthlyFee: "\u20B15,000", status: "Active", avatar: "" },
  { id: "11", name: "Jade Rivera", company: "Bluewave Media", email: "jade@bluewave.ph", phone: "+63 927 123 4567", address: "Pasay City", websites: 2, monthlyFee: "\u20B18,000", status: "Active", avatar: "" },
  { id: "12", name: "R King", company: "Personal", email: "rking@rkives.io", phone: "+63 900 000 0000", address: "Philippines", websites: 1, monthlyFee: "\u20B10", status: "Active", avatar: "" },
];

// ─── Websites ───────────────────────────────────────
export const websiteData = [
  { id: "1", clientId: "1", name: "BrightPath Academy", slug: "brightpath-academy", url: "https://brightpath.edu", loginUrl: "https://brightpath.edu/wp-admin", platform: "WordPress", projectType: "Full Build", scope: "Complete WordPress site with custom theme, LMS integration, and student portal.", hosting: "SiteGround", domain: "Namecheap", domainName: "brightpath.edu", domainExpiry: "2025-03-15", hostingExpiry: "2025-03-20", status: "Live", projectStart: "2024-01-10", deployDate: "2024-03-15", monthlyFee: 12000, isPortfolio: true, thumbnail: "", gallery: [], description: "Education platform with LMS", fullDescription: "Built a complete learning management system for BrightPath Academy featuring course enrollment, SCORM compatibility, progress tracking, and certificate generation.", techStack: ["WordPress", "LearnDash", "Custom Theme", "WooCommerce"], role: "Lead Developer", featuredOrder: 1, notes: "Client wants SCORM 1.2 compatibility." },
  { id: "2", clientId: "1", name: "BrightPath Portal", slug: "brightpath-portal", url: "https://portal.brightpath.edu", loginUrl: "https://vercel.com", platform: "Next.js", projectType: "Web App", scope: "Student portal for grade checking and enrollment.", hosting: "Vercel", domain: "Namecheap", domainName: "portal.brightpath.edu", domainExpiry: "2025-03-15", hostingExpiry: "2025-06-01", status: "Live", projectStart: "2024-04-01", deployDate: "2024-06-10", monthlyFee: 0, isPortfolio: false, thumbnail: "", gallery: [], description: "Student portal for BrightPath Academy", fullDescription: "React-based student portal with real-time grade viewing, enrollment management, and announcement system.", techStack: ["Next.js", "Supabase", "Tailwind"], role: "Full Stack Developer", featuredOrder: 0, notes: "API routes for grade system." },
  { id: "3", clientId: "2", name: "NovaTech Corporate", slug: "novatech-corporate", url: "https://novatech.ph", loginUrl: "https://novatech.ph/wp-admin", platform: "WordPress", projectType: "Full Build", scope: "Corporate website with service pages and contact forms.", hosting: "Cloudways", domain: "GoDaddy", domainName: "novatech.ph", domainExpiry: "2025-01-20", hostingExpiry: "2025-01-25", status: "Live", projectStart: "2023-11-01", deployDate: "2024-01-15", monthlyFee: 8500, isPortfolio: true, thumbnail: "", gallery: [], description: "Corporate tech company website", fullDescription: "Modern corporate website with animated hero sections, service showcases, team profiles, and integrated contact forms.", techStack: ["WordPress", "Elementor Pro", "Custom CSS"], role: "Lead Developer", featuredOrder: 3, notes: "" },
  { id: "4", clientId: "3", name: "SkillBridge Learning", slug: "skillbridge-learning", url: "https://skillbridge.edu", loginUrl: "https://skillbridge.edu/wp-admin", platform: "WordPress", projectType: "Full Build", scope: "Course catalog and enrollment platform.", hosting: "SiteGround", domain: "Namecheap", domainName: "skillbridge.edu", domainExpiry: "2025-02-10", hostingExpiry: "2025-02-15", status: "Live", projectStart: "2023-12-01", deployDate: "2024-02-10", monthlyFee: 15000, isPortfolio: true, thumbnail: "", gallery: [], description: "Online learning platform", fullDescription: "Multi-course learning platform with progress tracking, quizzes, certificates, and instructor dashboards.", techStack: ["WordPress", "LearnDash", "BuddyBoss"], role: "Lead Developer", featuredOrder: 2, notes: "4 modules per course structure." },
  { id: "5", clientId: "3", name: "SkillBridge LMS", slug: "skillbridge-lms", url: "https://lms.skillbridge.edu", loginUrl: "https://lms.skillbridge.edu/wp-admin", platform: "WordPress", projectType: "Integration", scope: "SCORM-compatible LMS for corporate training.", hosting: "SiteGround", domain: "Namecheap", domainName: "lms.skillbridge.edu", domainExpiry: "2025-02-10", hostingExpiry: "2025-02-15", status: "Live", projectStart: "2024-02-01", deployDate: "2024-04-15", monthlyFee: 0, isPortfolio: false, thumbnail: "", gallery: [], description: "SCORM LMS for corporate training", fullDescription: "Custom LMS with SCORM 1.2/2004 support, employee tracking, and reporting dashboards.", techStack: ["WordPress", "LearnDash", "SCORM Engine"], role: "Full Stack Developer", featuredOrder: 0, notes: "" },
  { id: "6", clientId: "4", name: "Elevate Studio", slug: "elevate-studio", url: "https://elevate.io", loginUrl: "https://vercel.com", platform: "Next.js", projectType: "Full Build", scope: "Course creation platform with Stripe integration.", hosting: "Vercel", domain: "Cloudflare", domainName: "elevate.io", domainExpiry: "2025-05-01", hostingExpiry: "2025-05-01", status: "Live", projectStart: "2024-02-15", deployDate: "2024-05-20", monthlyFee: 10000, isPortfolio: true, thumbnail: "", gallery: [], description: "Course creation platform", fullDescription: "Full-featured course platform with Stripe payments, video hosting, progress tracking, and instructor tools.", techStack: ["Next.js", "Supabase", "Stripe", "Tailwind"], role: "Full Stack Developer", featuredOrder: 4, notes: "Radix UI + Tailwind design system." },
  { id: "7", clientId: "5", name: "GreenLeaf Health", slug: "greenleaf-health", url: "https://greenleaf.health", loginUrl: "https://greenleaf.health/wp-admin", platform: "WordPress", projectType: "Full Build", scope: "Healthcare blog and service pages.", hosting: "Cloudways", domain: "Namecheap", domainName: "greenleaf.health", domainExpiry: "2025-04-10", hostingExpiry: "2025-04-15", status: "Live", projectStart: "2024-01-20", deployDate: "2024-04-10", monthlyFee: 7000, isPortfolio: true, thumbnail: "", gallery: [], description: "Healthcare wellness website", fullDescription: "Clean healthcare website with blog, service listings, appointment booking, and patient resources.", techStack: ["WordPress", "Custom Theme", "ACF"], role: "Lead Developer", featuredOrder: 5, notes: "Target local healthcare keywords." },
  { id: "8", clientId: "6", name: "CloudSync Pro", slug: "cloudsync-pro", url: "https://cloudsync.dev", loginUrl: "https://vercel.com", platform: "Next.js", projectType: "Full Build", scope: "SaaS dashboard with real-time sync.", hosting: "Vercel", domain: "Cloudflare", domainName: "cloudsync.dev", domainExpiry: "2025-09-01", hostingExpiry: "2025-09-01", status: "In Development", projectStart: "2024-06-01", deployDate: "2024-10-01", monthlyFee: 18000, isPortfolio: false, thumbnail: "", gallery: [], description: "SaaS file sync platform", fullDescription: "Real-time file synchronization platform with team workspaces, version control, and encrypted storage.", techStack: ["Next.js", "Supabase", "WebSockets", "Tailwind"], role: "Full Stack Developer", featuredOrder: 0, notes: "REST API with Next.js API routes." },
  { id: "9", clientId: "7", name: "Atlas Digital Group", slug: "atlas-digital", url: "https://atlasdigital.ph", loginUrl: "https://atlasdigital.ph/wp-admin", platform: "WordPress", projectType: "Redesign", scope: "Brand refresh and site redesign.", hosting: "SiteGround", domain: "GoDaddy", domainName: "atlasdigital.ph", domainExpiry: "2024-12-15", hostingExpiry: "2024-12-20", status: "Live", projectStart: "2023-10-01", deployDate: "2023-12-15", monthlyFee: 6000, isPortfolio: false, thumbnail: "", gallery: [], description: "Digital agency redesign", fullDescription: "Complete brand refresh including logo redesign, website overhaul, and new marketing collateral.", techStack: ["WordPress", "Elementor Pro", "ACF"], role: "Lead Developer", featuredOrder: 0, notes: "" },
  { id: "10", clientId: "8", name: "Meridian Consulting", slug: "meridian-consulting", url: "https://meridian.ph", loginUrl: "https://meridian.ph/wp-admin", platform: "WordPress", projectType: "Full Build", scope: "Consulting firm website with client portal.", hosting: "Cloudways", domain: "Namecheap", domainName: "meridian.ph", domainExpiry: "2025-06-01", hostingExpiry: "2025-06-05", status: "Live", projectStart: "2024-03-01", deployDate: "2024-06-01", monthlyFee: 14000, isPortfolio: true, thumbnail: "", gallery: [], description: "Consulting firm with client portal", fullDescription: "Professional consulting website with service pages, case studies, team profiles, and a secure client portal for document sharing.", techStack: ["WordPress", "Custom Theme", "Gravity Forms"], role: "Lead Developer", featuredOrder: 6, notes: "" },
  { id: "11", clientId: "9", name: "Harbor Digital", slug: "harbor-digital", url: "https://harbor.co", loginUrl: "https://vercel.com", platform: "Next.js", projectType: "Landing Page", scope: "Agency landing page.", hosting: "Vercel", domain: "Cloudflare", domainName: "harbor.co", domainExpiry: "2025-08-01", hostingExpiry: "2025-08-01", status: "In Development", projectStart: "2024-07-01", deployDate: "2024-09-15", monthlyFee: 9000, isPortfolio: false, thumbnail: "", gallery: [], description: "Digital agency landing page", fullDescription: "Minimal, high-converting landing page for a digital agency with service showcases and contact form.", techStack: ["Next.js", "Framer Motion", "Tailwind"], role: "Frontend Developer", featuredOrder: 0, notes: "" },
  { id: "12", clientId: "10", name: "Pinnacle Studios", slug: "pinnacle-studios", url: "https://pinnacle.studio", loginUrl: "https://webflow.com", platform: "Webflow", projectType: "Full Build", scope: "Portfolio site for a creative studio.", hosting: "Webflow", domain: "Namecheap", domainName: "pinnacle.studio", domainExpiry: "2025-07-01", hostingExpiry: "2025-07-01", status: "Live", projectStart: "2024-01-05", deployDate: "2024-03-01", monthlyFee: 5000, isPortfolio: false, thumbnail: "", gallery: [], description: "Creative studio portfolio", fullDescription: "Webflow-built portfolio with animations, project galleries, and a contact form.", techStack: ["Webflow", "GSAP", "Lottie"], role: "Designer & Developer", featuredOrder: 0, notes: "" },
  { id: "13", clientId: "11", name: "Bluewave Media", slug: "bluewave-media", url: "https://bluewave.ph", loginUrl: "https://bluewave.ph/wp-admin", platform: "WordPress", projectType: "Full Build", scope: "Media company website.", hosting: "SiteGround", domain: "Namecheap", domainName: "bluewave.ph", domainExpiry: "2025-04-20", hostingExpiry: "2025-04-25", status: "Live", projectStart: "2024-02-01", deployDate: "2024-04-20", monthlyFee: 8000, isPortfolio: true, thumbnail: "", gallery: [], description: "Media company website", fullDescription: "Dynamic media company site with portfolio galleries, team section, blog, and press kit download.", techStack: ["WordPress", "Elementor Pro", "Custom Post Types"], role: "Lead Developer", featuredOrder: 7, notes: "" },
  { id: "14", clientId: "12", name: "RK Portfolio", slug: "rk-portfolio", url: "https://rkingg.com", loginUrl: "https://vercel.com", platform: "Next.js", projectType: "Portfolio", scope: "Personal portfolio and case studies.", hosting: "Vercel", domain: "Cloudflare", domainName: "rkingg.com", domainExpiry: "2025-07-01", hostingExpiry: "2025-07-01", status: "Live", projectStart: "2024-06-01", deployDate: "2024-07-15", monthlyFee: 0, isPortfolio: true, thumbnail: "", gallery: [], description: "Personal developer portfolio", fullDescription: "Minimal portfolio showcasing selected works, case studies, and blog posts.", techStack: ["Next.js", "MDX", "Tailwind", "Framer Motion"], role: "Designer & Developer", featuredOrder: 0, notes: "" },
];

// ─── Tasks ──────────────────────────────────────────
export const taskData = [
  { id: "1", websiteId: "1", title: "Fix accessibility issues", description: "Run Lighthouse audit and fix all WCAG 2.1 AA violations on the main pages.", status: "In Progress", priority: "High", type: "Bug", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-08", createdAt: "2024-08-01" },
  { id: "2", websiteId: "5", title: "Upload SCORM package", description: "Client sent SCORM 1.2 package for the new compliance training module.", status: "To Do", priority: "Medium", type: "Content", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-10", createdAt: "2024-08-02" },
  { id: "3", websiteId: "6", title: "Update course landing page", description: "New hero copy and pricing section from client.", status: "In Progress", priority: "High", type: "Content", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-06", createdAt: "2024-08-03" },
  { id: "4", websiteId: "3", title: "Connect subdomain", description: "Client wants to point portal.novatech.ph to the new Vercel deployment.", status: "Waiting", priority: "Low", type: "Maintenance", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-12", createdAt: "2024-08-03" },
  { id: "5", websiteId: "7", title: "Optimize blog thumbnails", description: "Resize and compress all blog post featured images to improve Core Web Vitals. Target under 200KB per image. Use WebP format.", status: "In Progress", priority: "Medium", type: "Maintenance", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-08", createdAt: "2024-08-03" },
  { id: "6", websiteId: "8", title: "Add pricing modal", description: "Build a responsive pricing modal with monthly/yearly toggle and Stripe checkout integration.", status: "To Do", priority: "High", type: "Feature", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-15", createdAt: "2024-08-03" },
  { id: "7", websiteId: "9", title: "Review DNS records", description: "Client reported email delivery issues. Check MX, SPF, DKIM records.", status: "Done", priority: "Low", type: "Maintenance", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-05", createdAt: "2024-08-02" },
  { id: "8", websiteId: "14", title: "Publish case study", description: "Write up the BrightPath Academy case study for the portfolio.", status: "On Hold", priority: "Medium", type: "Content", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-20", createdAt: "2024-08-02" },
  { id: "9", websiteId: "8", title: "Set up CI/CD pipeline", description: "Configure GitHub Actions for automated testing and Vercel preview deployments.", status: "To Do", priority: "Medium", type: "Feature", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-18", createdAt: "2024-08-04" },
  { id: "10", websiteId: "2", title: "Migrate to App Router", description: "Convert pages/ to app/ directory. Update all API routes and middleware.", status: "In Progress", priority: "High", type: "Feature", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-25", createdAt: "2024-08-01" },
  { id: "11", websiteId: "10", title: "Implement auth flow", description: "Add NextAuth.js with email magic link and Google OAuth.", status: "To Do", priority: "High", type: "Feature", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-22", createdAt: "2024-08-04" },
  { id: "12", websiteId: "8", title: "Write API documentation", description: "Document all REST endpoints with request/response examples.", status: "Waiting", priority: "Low", type: "Content", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-30", createdAt: "2024-08-04" },
  { id: "13", websiteId: "4", title: "Fix mobile nav bug", description: "Hamburger menu doesn't close on link click on iOS Safari.", status: "In Progress", priority: "High", type: "Bug", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-06", createdAt: "2024-08-05" },
  { id: "14", websiteId: "7", title: "Optimize image loading", description: "Implement lazy loading and WebP fallback for all blog images.", status: "Done", priority: "Medium", type: "Maintenance", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-04", createdAt: "2024-08-01" },
  { id: "15", websiteId: "11", title: "Deploy staging environment", description: "Set up Vercel preview branch for client review before production.", status: "To Do", priority: "Medium", type: "Maintenance", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-12", createdAt: "2024-08-05" },
  { id: "16", websiteId: "8", title: "Configure Supabase RLS", description: "Set up row-level security policies for multi-tenant data isolation.", status: "In Progress", priority: "High", type: "Feature", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-14", createdAt: "2024-08-04" },
  { id: "17", websiteId: "6", title: "Create email templates", description: "Transactional emails: welcome, password reset, course completion.", status: "To Do", priority: "Low", type: "Feature", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-20", createdAt: "2024-08-05" },
  { id: "18", websiteId: "1", title: "Setup analytics tracking", description: "Install GA4, configure events for enrollment and course completion.", status: "Done", priority: "Medium", type: "Maintenance", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-03", createdAt: "2024-08-01" },
  { id: "19", websiteId: null, title: "Update portfolio site", description: "Add new case studies and refresh the homepage.", status: "To Do", priority: "Medium", type: "Personal", isRecurring: false, assignedTo: "R King", dueDate: "2024-08-30", createdAt: "2024-08-05" },
  { id: "20", websiteId: null, title: "Review monthly invoices", description: "Send out August invoices to all clients.", status: "To Do", priority: "High", type: "Personal", isRecurring: true, assignedTo: "R King", dueDate: "2024-08-01", createdAt: "2024-08-01" },
];

// ─── Passwords ──────────────────────────────────────
export const credentialData = [
  { id: "1", websiteId: "1", label: "WordPress Admin", url: "https://brightpath.edu/wp-admin", username: "admin", email: "rking@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: null, isInternal: true },
  { id: "2", websiteId: "1", label: "SiteGround", url: "https://tools.siteground.com", username: "rking", email: "rking@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: null, isInternal: true },
  { id: "3", websiteId: "1", label: "Namecheap", url: "https://www.namecheap.com", username: "rking", email: "rking@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: null, isInternal: true },
  { id: "4", websiteId: "3", label: "WordPress Admin", url: "https://novatech.ph/wp-admin", username: "dev_admin", email: "dev@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: null, isInternal: true },
  { id: "5", websiteId: "4", label: "WordPress Admin", url: "https://skillbridge.edu/wp-admin", username: "admin", email: "rking@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: null, isInternal: true },
  { id: "6", websiteId: "6", label: "Vercel", url: "https://vercel.com/dashboard", username: "rking", email: "rking@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: "JBSWY3DPEHPK3PXP", isInternal: true },
  { id: "7", websiteId: "6", label: "Supabase", url: "https://supabase.com/dashboard", username: "rking", email: "rking@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: null, isInternal: true },
  { id: "8", websiteId: "6", label: "Stripe", url: "https://dashboard.stripe.com", username: "rking@rkives.io", email: "rking@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: "JBSWY3DPEHPK3PXP", isInternal: true },
  { id: "9", websiteId: "7", label: "WordPress Admin", url: "https://greenleaf.health/wp-admin", username: "dev_admin", email: "dev@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: null, isInternal: true },
  { id: "10", websiteId: "8", label: "Vercel", url: "https://vercel.com/dashboard", username: "rking", email: "rking@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: null, isInternal: true },
  { id: "11", websiteId: "9", label: "WordPress Admin", url: "https://atlasdigital.ph/wp-admin", username: "admin", email: "rking@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: null, isInternal: true },
  { id: "12", websiteId: "13", label: "WordPress Admin", url: "https://bluewave.ph/wp-admin", username: "admin", email: "rking@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: null, isInternal: true },
  { id: "13", websiteId: "14", label: "Vercel", url: "https://vercel.com/dashboard", username: "rking", email: "rking@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: null, isInternal: true },
  { id: "14", websiteId: "14", label: "Cloudflare", url: "https://dash.cloudflare.com", username: "rking", email: "rking@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: null, isInternal: true },
  { id: "15", websiteId: "14", label: "GitHub", url: "https://github.com", username: "rkingg-dev", email: "rking@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", totp: "JBSWY3DPEHPK3PXP", isInternal: true },
];

// ─── Payments ───────────────────────────────────────
export const paymentData = [
  { id: "1", clientId: "1", websiteId: "1", amount: 12000, currency: "PHP", type: "Monthly Maintenance", method: "GCash", referenceNumber: "GC-20240801-001", receiptUrl: "", status: "Verified", billingPeriod: "Aug 2024", notes: "", paidAt: "2024-08-01" },
  { id: "2", clientId: "2", websiteId: "3", amount: 8500, currency: "PHP", type: "Monthly Maintenance", method: "Bank Transfer", referenceNumber: "BDO-20240802-002", receiptUrl: "", status: "Verified", billingPeriod: "Aug 2024", notes: "BDO Transfer", paidAt: "2024-08-02" },
  { id: "3", clientId: "3", websiteId: "4", amount: 15000, currency: "PHP", type: "Monthly Maintenance", method: "GCash", referenceNumber: "GC-20240801-003", receiptUrl: "", status: "Verified", billingPeriod: "Aug 2024", notes: "", paidAt: "2024-08-01" },
  { id: "4", clientId: "4", websiteId: "6", amount: 10000, currency: "PHP", type: "Monthly Maintenance", method: "GCash", referenceNumber: "GC-20240803-004", receiptUrl: "", status: "Verified", billingPeriod: "Aug 2024", notes: "", paidAt: "2024-08-03" },
  { id: "5", clientId: "5", websiteId: "7", amount: 7000, currency: "PHP", type: "Monthly Maintenance", method: "Bank Transfer", referenceNumber: "BPI-20240802-005", receiptUrl: "", status: "Verified", billingPeriod: "Aug 2024", notes: "BPI Transfer", paidAt: "2024-08-02" },
  { id: "6", clientId: "6", websiteId: "8", amount: 18000, currency: "PHP", type: "Monthly Maintenance", method: "GCash", referenceNumber: "GC-20240801-006", receiptUrl: "", status: "Verified", billingPeriod: "Aug 2024", notes: "", paidAt: "2024-08-01" },
  { id: "7", clientId: "7", websiteId: "9", amount: 6000, currency: "PHP", type: "Monthly Maintenance", method: "GCash", referenceNumber: "GC-20240803-007", receiptUrl: "", status: "Verified", billingPeriod: "Aug 2024", notes: "", paidAt: "2024-08-03" },
  { id: "8", clientId: "8", websiteId: "10", amount: 14000, currency: "PHP", type: "Monthly Maintenance", method: "Bank Transfer", referenceNumber: "MB-20240804-008", receiptUrl: "", status: "Verified", billingPeriod: "Aug 2024", notes: "Metrobank", paidAt: "2024-08-04" },
  { id: "9", clientId: "9", websiteId: "11", amount: 9000, currency: "PHP", type: "Monthly Maintenance", method: "GCash", referenceNumber: "GC-20240802-009", receiptUrl: "", status: "Pending", billingPeriod: "Aug 2024", notes: "Waiting for receipt", paidAt: null },
  { id: "10", clientId: "10", websiteId: "12", amount: 5000, currency: "PHP", type: "Monthly Maintenance", method: "GCash", referenceNumber: "GC-20240801-010", receiptUrl: "", status: "Verified", billingPeriod: "Aug 2024", notes: "", paidAt: "2024-08-01" },
  { id: "11", clientId: "11", websiteId: "13", amount: 8000, currency: "PHP", type: "Monthly Maintenance", method: "Bank Transfer", referenceNumber: "UB-20240803-011", receiptUrl: "", status: "Verified", billingPeriod: "Aug 2024", notes: "UnionBank", paidAt: "2024-08-03" },
  { id: "12", clientId: "1", websiteId: "1", amount: 5500, currency: "PHP", type: "Hosting", method: "GCash", referenceNumber: "GC-20240715-012", receiptUrl: "", status: "Verified", billingPeriod: "Mar 2024 - Mar 2025", notes: "SiteGround annual", paidAt: "2024-07-15" },
];

// ─── Changelog ──────────────────────────────────────
export const changelogData = [
  { id: "1", websiteId: "1", title: "v1.4.0 — Accessibility Update", content: "Fixed 23 WCAG 2.1 AA violations. Added skip navigation links, improved color contrast, and added alt text to all images.", version: "1.4.0", type: "Update", isPublished: true, publishedAt: "2024-08-05" },
  { id: "2", websiteId: "1", title: "v1.3.2 — Bug Fix", content: "Fixed course enrollment redirect loop on iOS Safari. Updated session handling middleware.", version: "1.3.2", type: "Fix", isPublished: true, publishedAt: "2024-07-28" },
  { id: "3", websiteId: "6", title: "v2.1.0 — Pricing Modal", content: "Added responsive pricing modal with monthly/yearly toggle. Integrated Stripe Checkout for subscription management.", version: "2.1.0", type: "Feature", isPublished: true, publishedAt: "2024-08-01" },
  { id: "4", websiteId: "6", title: "v2.0.1 — Security Patch", content: "Patched XSS vulnerability in comment forms. Updated all dependencies to latest versions.", version: "2.0.1", type: "Security", isPublished: true, publishedAt: "2024-07-20" },
  { id: "5", websiteId: "8", title: "v0.3.0 — Auth System", content: "Implemented NextAuth.js with email magic links and Google OAuth. Added session management and protected routes.", version: "0.3.0", type: "Feature", isPublished: false, publishedAt: null },
  { id: "6", websiteId: "4", title: "v3.2.0 — Course Structure", content: "Restructured course modules to support 4-part format. Added progress persistence across sessions.", version: "3.2.0", type: "Update", isPublished: true, publishedAt: "2024-07-15" },
  { id: "7", websiteId: "7", title: "v1.1.0 — Image Optimization", content: "Implemented WebP conversion and lazy loading for all blog images. Improved LCP from 3.2s to 1.8s.", version: "1.1.0", type: "Maintenance", isPublished: true, publishedAt: "2024-08-03" },
  { id: "8", websiteId: "10", title: "v1.0.0 — Initial Launch", content: "Launched consulting website with service pages, team profiles, case studies, and contact forms.", version: "1.0.0", type: "Update", isPublished: true, publishedAt: "2024-06-01" },
];

// ─── Notes ──────────────────────────────────────────
export const notesData = [
  { id: "1", title: "BrightPath — SCORM Integration Notes", slug: "brightpath-scorm-notes", content: "Client wants SCORM 1.2 compatibility. Test with Moodle and Canvas LMS. Package should include completion tracking and quiz results.", thumbnail: "", isPublic: false, tags: ["scorm", "lms", "wordpress"], websiteId: "1", createdAt: "2024-08-03" },
  { id: "2", title: "SkillBridge — Course Structure", slug: "skillbridge-course-structure", content: "4 modules per course. Each module has video + quiz + reflection. Use LearnDash groups for cohort management. Certificate auto-generate on completion.", thumbnail: "", isPublic: false, tags: [" learndash", "course-design"], websiteId: "4", createdAt: "2024-08-02" },
  { id: "3", title: "Elevate — Design System", slug: "elevate-design-system", content: "Use Radix UI + Tailwind. Color palette: indigo primary, warm grays. Inter font. Component library in /components/ui.", thumbnail: "", isPublic: true, tags: ["design", "tailwind", "radix"], websiteId: "6", createdAt: "2024-08-01" },
  { id: "4", title: "GreenLeaf — SEO Strategy", slug: "greenleaf-seo-strategy", content: "Target local keywords: healthcare training, wellness programs. Blog 2x/week. Internal linking strategy. Schema markup for local business.", thumbnail: "", isPublic: false, tags: ["seo", "content"], websiteId: "7", createdAt: "2024-07-30" },
  { id: "5", title: "CloudSync — API Architecture", slug: "cloudsync-api-architecture", content: "REST API with Next.js API routes. Supabase for DB. Auth via NextAuth. Real-time via WebSockets. Rate limiting on public endpoints.", thumbnail: "", isPublic: false, tags: ["api", "supabase", "architecture"], websiteId: "8", createdAt: "2024-07-28" },
  { id: "6", title: "Hosting Comparison 2024", slug: "hosting-comparison-2024", content: "SiteGround: Best for WordPress, good support. Cloudways: Flexible, pay-as-you-go. Vercel: Best for Next.js, generous free tier. Cloudflare: Cheap domains, good DNS.", thumbnail: "", isPublic: true, tags: ["hosting", "comparison"], websiteId: null, createdAt: "2024-07-15" },
  { id: "7", title: "RK Portfolio v2 Ideas", slug: "rk-portfolio-v2-ideas", content: "Case studies with before/after. Interactive demos. Blog with MDX. Dark mode. Animated page transitions. RSS feed.", thumbnail: "", isPublic: false, tags: ["portfolio", "ideas"], websiteId: "14", createdAt: "2024-07-10" },
  { id: "8", title: "Supabase RLS Patterns", slug: "supabase-rls-patterns", content: "Multi-tenant: use org_id in JWT claims. Read policies: auth.uid() = user_id OR org_id in user_orgs. Write policies: check role column.", thumbnail: "", isPublic: true, tags: ["supabase", "security", "tutorial"], websiteId: null, createdAt: "2024-07-05" },
];

// ─── Pastebin ───────────────────────────────────────
export const pastebinData = [
  { id: "1", title: "Supabase RLS Policy", content: "CREATE POLICY \"users_org_read\" ON websites\n  FOR SELECT USING (\n    auth.uid() IN (\n      SELECT user_id FROM website_users WHERE website_id = id\n    )\n  );", language: "sql", isPublic: true, shareToken: "supa-rls-01", expiresAt: null, createdAt: "2024-08-04" },
  { id: "2", title: "Next.js Middleware Auth", content: "import { NextResponse } from 'next/server'\nimport type { NextRequest } from 'next/server'\n\nexport function middleware(request: NextRequest) {\n  const token = request.cookies.get('sb-access-token')\n  if (!token) return NextResponse.redirect(new URL('/login', request.url))\n  return NextResponse.next()\n}", language: "typescript", isPublic: true, shareToken: "next-auth-01", expiresAt: null, createdAt: "2024-08-03" },
  { id: "3", title: "WCAG Contrast Checker", content: "function getContrastRatio(hex1: string, hex2: string): number {\n  const l1 = getLuminance(hex1)\n  const l2 = getLuminance(hex2)\n  const lighter = Math.max(l1, l2)\n  const darker = Math.min(l1, l2)\n  return (lighter + 0.05) / (darker + 0.05)\n}", language: "typescript", isPublic: false, shareToken: null, expiresAt: null, createdAt: "2024-08-01" },
  { id: "4", title: "SCORM Package Loader", content: "// SCORM 1.2 API wrapper\nconst scormAPI = {\n  Initialize: () => window.API?.LMSInitialize(''),\n  GetValue: (key: string) => window.API?.LMSGetValue(key),\n  SetValue: (key: string, val: string) => window.API?.LMSSetValue(key, val),\n  Commit: () => window.API?.LMSCommit(''),\n  Terminate: () => window.API?.LMSFinish(''),\n}", language: "typescript", isPublic: true, shareToken: "scorm-01", expiresAt: null, createdAt: "2024-07-28" },
];

// ─── WordPress Updates ──────────────────────────────
export const wpUpdateData = [
  { id: "1", websiteId: "1", itemType: "Core", itemName: "WordPress", currentVersion: "6.5.4", latestVersion: "6.6.1", status: "Update Available", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "2", websiteId: "1", itemType: "Plugin", itemName: "WooCommerce", currentVersion: "8.9.3", latestVersion: "9.1.0", status: "Update Available", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "3", websiteId: "1", itemType: "Plugin", itemName: "LearnDash LMS", currentVersion: "4.15.1", latestVersion: "4.15.1", status: "Up-to-date", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "4", websiteId: "1", itemType: "Plugin", itemName: "Elementor", currentVersion: "3.21.0", latestVersion: "3.23.1", status: "Update Available", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "5", websiteId: "1", itemType: "Theme", itemName: "Flavor Developer", currentVersion: "2.4.0", latestVersion: "2.4.0", status: "Up-to-date", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "6", websiteId: "3", itemType: "Core", itemName: "WordPress", currentVersion: "6.5.4", latestVersion: "6.6.1", status: "Update Available", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "7", websiteId: "3", itemType: "Plugin", itemName: "Elementor Pro", currentVersion: "3.21.0", latestVersion: "3.23.1", status: "Update Available", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "8", websiteId: "3", itemType: "Plugin", itemName: "WPForms", currentVersion: "1.8.9", latestVersion: "1.8.9", status: "Up-to-date", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "9", websiteId: "4", itemType: "Core", itemName: "WordPress", currentVersion: "6.6.1", latestVersion: "6.6.1", status: "Up-to-date", lastChecked: "2024-08-05", autoUpdate: true },
  { id: "10", websiteId: "4", itemType: "Plugin", itemName: "LearnDash LMS", currentVersion: "4.15.1", latestVersion: "4.15.1", status: "Up-to-date", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "11", websiteId: "4", itemType: "Plugin", itemName: "BuddyBoss", currentVersion: "2.5.0", latestVersion: "2.6.1", status: "Update Available", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "12", websiteId: "7", itemType: "Core", itemName: "WordPress", currentVersion: "6.4.3", latestVersion: "6.6.1", status: "Critical", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "13", websiteId: "7", itemType: "Plugin", itemName: "Yoast SEO", currentVersion: "22.8", latestVersion: "23.1", status: "Update Available", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "14", websiteId: "7", itemType: "Plugin", itemName: "Advanced Custom Fields", currentVersion: "6.2.7", latestVersion: "6.3.0", status: "Update Available", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "15", websiteId: "9", itemType: "Core", itemName: "WordPress", currentVersion: "6.5.4", latestVersion: "6.6.1", status: "Update Available", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "16", websiteId: "9", itemType: "Plugin", itemName: "Elementor Pro", currentVersion: "3.21.0", latestVersion: "3.23.1", status: "Update Available", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "17", websiteId: "13", itemType: "Core", itemName: "WordPress", currentVersion: "6.5.4", latestVersion: "6.6.1", status: "Update Available", lastChecked: "2024-08-05", autoUpdate: false },
  { id: "18", websiteId: "13", itemType: "Plugin", itemName: "Elementor", currentVersion: "3.21.0", latestVersion: "3.23.1", status: "Update Available", lastChecked: "2024-08-05", autoUpdate: false },
];

// ─── Reports ────────────────────────────────────────
export const reportData = [
  { id: "1", title: "BrightPath — Monthly Report", client: "BrightPath Education", type: "Client Report", date: "Aug 1, 2024", status: "Ready" },
  { id: "2", title: "SkillBridge — Course Progress", client: "SkillBridge Academy", type: "Client Report", date: "Aug 1, 2024", status: "Ready" },
  { id: "3", title: "Maintenance Log — July", client: "All Clients", type: "Maintenance", date: "Jul 31, 2024", status: "Ready" },
  { id: "4", title: "Task Summary — Week 31", client: "All Clients", type: "Task Report", date: "Jul 28, 2024", status: "Ready" },
  { id: "5", title: "Elevate — Project Status", client: "Elevate Inc", type: "Client Report", date: "Jul 25, 2024", status: "Ready" },
  { id: "6", title: "CloudSync — Sprint Review", client: "CloudSync Tech", type: "Client Report", date: "Jul 20, 2024", status: "Ready" },
];

// ─── Projects ───────────────────────────────────────
export const projectData = [
  { id: "1", name: "BrightPath Portal Redesign", websiteId: "2", type: "Web App", progress: 65, deadline: "Sep 2024", status: "In Progress" },
  { id: "2", name: "SkillBridge SCORM Integration", websiteId: "5", type: "Integration", progress: 30, deadline: "Aug 2024", status: "In Progress" },
  { id: "3", name: "Elevate Course Platform", websiteId: "6", type: "Full Build", progress: 80, deadline: "Aug 2024", status: "In Progress" },
  { id: "4", name: "CloudSync MVP", websiteId: "8", type: "Full Build", progress: 45, deadline: "Oct 2024", status: "In Progress" },
  { id: "5", name: "GreenLeaf Blog Optimization", websiteId: "7", type: "SEO", progress: 90, deadline: "Aug 2024", status: "In Progress" },
  { id: "6", name: "Harbor Digital Landing", websiteId: "11", type: "Landing Page", progress: 15, deadline: "Sep 2024", status: "In Progress" },
  { id: "7", name: "Meridian Client Portal", websiteId: "10", type: "Web App", progress: 40, deadline: "Nov 2024", status: "In Progress" },
  { id: "8", name: "RK Portfolio v2", websiteId: "14", type: "Portfolio", progress: 20, deadline: "Sep 2024", status: "Planning" },
];

// ─── Portfolio ──────────────────────────────────────
export const portfolioData = {
  selectedWorks: 8,
  publishedCaseStudies: 3,
  draftCaseStudies: 5,
  topProjects: [
    { name: "BrightPath Academy", type: "Education", image: "" },
    { name: "SkillBridge Learning", type: "LMS", image: "" },
    { name: "Elevate Studio", type: "Course Platform", image: "" },
    { name: "GreenLeaf Health", type: "Healthcare", image: "" },
  ],
};

// ─── Maintenance ────────────────────────────────────
export const maintenanceData = {
  renewalsThisMonth: 6,
  hostingRenewals: 3,
  domainRenewals: 3,
  barData: [
    { month: "May", value: 4 },
    { month: "Jun", value: 7 },
    { month: "Jul", value: 5 },
    { month: "Aug", value: 6 },
    { month: "Sep", value: 3 },
  ],
};
