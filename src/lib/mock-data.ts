export const kpiData = [
  { label: "Active Clients", value: "12", change: "+2", positive: true },
  { label: "Websites", value: "28", change: "+3", positive: true },
  { label: "Open Tasks", value: "47", change: "+8", positive: false },
  { label: "Monthly Revenue", value: "\u20B184,500", change: "+12%", positive: true },
  { label: "Due This Week", value: "9", change: "-2", positive: true },
  { label: "Maintenance", value: "16", change: "+1", positive: false },
];

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

export const taskData = [
  {
    id: "1",
    date: "Today, 14:12",
    website: "BrightPath Academy",
    task: "Fix accessibility issues",
    assignedTo: "R King",
    status: "In Progress",
    priority: "High",
    expanded: false,
  },
  {
    id: "2",
    date: "Today, 10:30",
    website: "SkillBridge Learning",
    task: "Upload SCORM package",
    assignedTo: "R King",
    status: "To Do",
    priority: "Medium",
    expanded: false,
  },
  {
    id: "3",
    date: "Aug 4, 17:57",
    website: "Elevate Studio",
    task: "Update course landing page",
    assignedTo: "R King",
    status: "In Progress",
    priority: "High",
    expanded: false,
  },
  {
    id: "4",
    date: "Aug 4, 13:40",
    website: "NovaTech Solutions",
    task: "Connect subdomain",
    assignedTo: "R King",
    status: "Waiting",
    priority: "Low",
    expanded: false,
  },
  {
    id: "5",
    date: "Aug 3, 10:22",
    website: "GreenLeaf Health",
    task: "Optimize blog thumbnails",
    assignedTo: "R King",
    status: "In Progress",
    priority: "Medium",
    expanded: true,
    details: {
      description: "Resize and compress all blog post featured images to improve Core Web Vitals scores. Target under 200KB per image.",
      client: "GreenLeaf Health",
      url: "https://greenleafhealth.demo",
      dueDate: "Aug 8, 2024",
      attachments: ["thumbnail-specs.pdf", "current-images.zip"],
      notes: "Use WebP format. Client wants to keep the existing color palette.",
    },
  },
  {
    id: "6",
    date: "Aug 3, 9:01",
    website: "CloudSync Pro",
    task: "Add pricing modal",
    assignedTo: "R King",
    status: "To Do",
    priority: "High",
    expanded: false,
  },
  {
    id: "7",
    date: "Aug 2, 20:32",
    website: "Atlas Digital Group",
    task: "Review DNS records",
    assignedTo: "R King",
    status: "Done",
    priority: "Low",
    expanded: false,
  },
  {
    id: "8",
    date: "Aug 2, 11:54",
    website: "RK Portfolio",
    task: "Publish case study",
    assignedTo: "R King",
    status: "On Hold",
    priority: "Medium",
    expanded: false,
  },
];

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

export const clientData = [
  { id: "1", name: "BrightPath Academy", company: "BrightPath Education", email: "info@brightpath.demo", websites: 2, monthlyFee: "\u20B112,000", status: "Active" },
  { id: "2", name: "NovaTech Solutions", company: "NovaTech Corp", email: "contact@novatech.demo", websites: 1, monthlyFee: "\u20B18,500", status: "Active" },
  { id: "3", name: "SkillBridge Learning", company: "SkillBridge Academy", email: "admin@skillbridge.demo", websites: 3, monthlyFee: "\u20B115,000", status: "Active" },
  { id: "4", name: "Elevate Studio", company: "Elevate Inc", email: "hello@elevate.demo", websites: 2, monthlyFee: "\u20B110,000", status: "Active" },
  { id: "5", name: "GreenLeaf Health", company: "GreenLeaf", email: "info@greenleaf.demo", websites: 1, monthlyFee: "\u20B17,000", status: "Active" },
  { id: "6", name: "CloudSync Pro", company: "CloudSync Tech", email: "team@cloudsync.demo", websites: 4, monthlyFee: "\u20B118,000", status: "Active" },
  { id: "7", name: "Atlas Digital Group", company: "Atlas Digital", email: "info@atlasdigital.demo", websites: 2, monthlyFee: "\u20B16,000", status: "Active" },
  { id: "8", name: "RK Portfolio", company: "Personal", email: "rking@rkives.io", websites: 1, monthlyFee: "\u20B10", status: "Active" },
];

export const websiteData = [
  { id: "1", name: "BrightPath Academy", url: "https://brightpath.demo", platform: "WordPress", hosting: "SiteGround", domain: "Namecheap", status: "Live", launchDate: "Mar 2024", hostingRenewal: "Mar 2025", domainRenewal: "Mar 2025", isPortfolio: true },
  { id: "2", name: "BrightPath Portal", url: "https://portal.brightpath.demo", platform: "Next.js", hosting: "Vercel", domain: "Namecheap", status: "Live", launchDate: "Jun 2024", hostingRenewal: "Jun 2025", domainRenewal: "Mar 2025", isPortfolio: false },
  { id: "3", name: "NovaTech Corporate", url: "https://novatech.demo", platform: "WordPress", hosting: "Cloudways", domain: "GoDaddy", status: "Live", launchDate: "Jan 2024", hostingRenewal: "Jan 2025", domainRenewal: "Jan 2025", isPortfolio: false },
  { id: "4", name: "SkillBridge Learning", url: "https://skillbridge.demo", platform: "WordPress", hosting: "SiteGround", domain: "Namecheap", status: "Live", launchDate: "Feb 2024", hostingRenewal: "Feb 2025", domainRenewal: "Feb 2025", isPortfolio: true },
  { id: "5", name: "SkillBridge LMS", url: "https://lms.skillbridge.demo", platform: "LearnDash", hosting: "SiteGround", domain: "Namecheap", status: "Live", launchDate: "Apr 2024", hostingRenewal: "Feb 2025", domainRenewal: "Feb 2025", isPortfolio: false },
  { id: "6", name: "Elevate Studio", url: "https://elevate.demo", platform: "Next.js", hosting: "Vercel", domain: "Cloudflare", status: "Live", launchDate: "May 2024", hostingRenewal: "May 2025", domainRenewal: "May 2025", isPortfolio: true },
  { id: "7", name: "GreenLeaf Health", url: "https://greenleaf.demo", platform: "WordPress", hosting: "Cloudways", domain: "Namecheap", status: "Live", launchDate: "Apr 2024", hostingRenewal: "Apr 2025", domainRenewal: "Apr 2025", isPortfolio: true },
  { id: "8", name: "CloudSync Pro", url: "https://cloudsync.demo", platform: "Next.js", hosting: "Vercel", domain: "Cloudflare", status: "In Development", launchDate: "Sep 2024", hostingRenewal: "Sep 2025", domainRenewal: "Sep 2025", isPortfolio: false },
  { id: "9", name: "Atlas Digital Group", url: "https://atlasdigital.demo", platform: "WordPress", hosting: "SiteGround", domain: "GoDaddy", status: "Live", launchDate: "Dec 2023", hostingRenewal: "Dec 2024", domainRenewal: "Dec 2024", isPortfolio: false },
  { id: "10", name: "RK Portfolio", url: "https://rkives.io", platform: "Next.js", hosting: "Vercel", domain: "Cloudflare", status: "Live", launchDate: "Jul 2024", hostingRenewal: "Jul 2025", domainRenewal: "Jul 2025", isPortfolio: true },
];

export const credentialData = [
  { id: "1", website: "BrightPath Academy", type: "WordPress Admin", loginUrl: "https://brightpath.demo/wp-admin", username: "admin", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", isInternal: true },
  { id: "2", website: "BrightPath Academy", type: "SiteGround", loginUrl: "https://tools.siteground.com", username: "dev@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", isInternal: true },
  { id: "3", website: "NovaTech Corporate", type: "WordPress Admin", loginUrl: "https://novatech.demo/wp-admin", username: "dev_admin", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", isInternal: true },
  { id: "4", website: "SkillBridge Learning", type: "WordPress Admin", loginUrl: "https://skillbridge.demo/wp-admin", username: "admin", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", isInternal: true },
  { id: "5", website: "Elevate Studio", type: "Vercel", loginUrl: "https://vercel.com/dashboard", username: "dev@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", isInternal: true },
  { id: "6", website: "GreenLeaf Health", type: "WordPress Admin", loginUrl: "https://greenleaf.demo/wp-admin", username: "dev_admin", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", isInternal: true },
  { id: "7", website: "CloudSync Pro", type: "Vercel", loginUrl: "https://vercel.com/dashboard", username: "dev@rkives.io", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", isInternal: true },
  { id: "8", website: "Atlas Digital Group", type: "WordPress Admin", loginUrl: "https://atlasdigital.demo/wp-admin", username: "admin", password: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", isInternal: true },
];

export const notesData = [
  { id: "1", title: "BrightPath Academy - SCORM Integration Notes", content: "Client wants SCORM 1.2 compatibility. Test with Moodle and Canvas LMS.", website: "BrightPath Academy", isPrivate: true, date: "Aug 3, 2024" },
  { id: "2", title: "SkillBridge Learning - Course Structure", content: "4 modules per course. Each module has video + quiz + reflection. Use LearnDash groups.", website: "SkillBridge Learning", isPrivate: true, date: "Aug 2, 2024" },
  { id: "3", title: "Elevate Studio - Design System", content: "Use Radix UI + Tailwind. Color palette: indigo primary, warm grays. Inter font.", website: "Elevate Studio", isPrivate: false, date: "Aug 1, 2024" },
  { id: "4", title: "GreenLeaf Health - SEO Strategy", content: "Target local keywords: healthcare training, wellness programs. Blog 2x/week.", website: "GreenLeaf Health", isPrivate: true, date: "Jul 30, 2024" },
  { id: "5", title: "CloudSync Pro - API Architecture", content: "REST API with Next.js API routes. Supabase for DB. Auth via NextAuth.", website: "CloudSync Pro", isPrivate: true, date: "Jul 28, 2024" },
];

export const reportData = [
  { id: "1", title: "BrightPath Academy - Monthly Report", client: "BrightPath Academy", type: "Client Report", date: "Aug 1, 2024", status: "Ready" },
  { id: "2", title: "SkillBridge Learning - Course Progress", client: "SkillBridge Learning", type: "Client Report", date: "Aug 1, 2024", status: "Ready" },
  { id: "3", title: "Maintenance Log - July", client: "All Clients", type: "Maintenance", date: "Jul 31, 2024", status: "Ready" },
  { id: "4", title: "Task Summary - Week 31", client: "All Clients", type: "Task Report", date: "Jul 28, 2024", status: "Ready" },
  { id: "5", title: "Elevate Studio - Project Status", client: "Elevate Studio", type: "Client Report", date: "Jul 25, 2024", status: "Ready" },
];

export const projectData = [
  { id: "1", name: "BrightPath Portal Redesign", website: "BrightPath Portal", type: "Web App", progress: 65, deadline: "Sep 2024", status: "In Progress" },
  { id: "2", name: "SkillBridge SCORM Integration", website: "SkillBridge LMS", type: "Integration", progress: 30, deadline: "Aug 2024", status: "In Progress" },
  { id: "3", name: "Elevate Course Platform", website: "Elevate Studio", type: "Full Build", progress: 80, deadline: "Aug 2024", status: "In Progress" },
  { id: "4", name: "CloudSync MVP", website: "CloudSync Pro", type: "Full Build", progress: 45, deadline: "Oct 2024", status: "In Progress" },
  { id: "5", name: "GreenLeaf Blog Optimization", website: "GreenLeaf Health", type: "SEO", progress: 90, deadline: "Aug 2024", status: "In Progress" },
  { id: "6", name: "RK Portfolio v2", website: "RK Portfolio", type: "Portfolio", progress: 20, deadline: "Sep 2024", status: "Planning" },
];
