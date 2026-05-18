export const kpiData = [
  { label: "Traffic", value: "982", change: "+5%", positive: true },
  { label: "ROI", value: "+15%", change: "+3%", positive: true },
  { label: "Conversions", value: "473", change: "+9%", positive: true },
  { label: "Expenses", value: "$884", change: "-2%", positive: false },
  { label: "CTR", value: "2.5%", change: "-0.2%", positive: false },
  { label: "CPA", value: "$5.41", change: "-$0.34", positive: false },
];

export const trendData = [
  { month: "Jul", traffic: 1800, roi: 400, conversions: 200 },
  { month: "Jul 15", traffic: 2200, roi: 520, conversions: 380 },
  { month: "Jul 22", traffic: 1900, roi: 480, conversions: 320 },
  { month: "Jul 29", traffic: 2400, roi: 600, conversions: 420 },
  { month: "Aug 5", traffic: 2100, roi: 550, conversions: 350 },
  { month: "Aug 12", traffic: 2600, roi: 650, conversions: 450 },
  { month: "Aug 19", traffic: 2300, roi: 580, conversions: 380 },
  { month: "Aug 26", traffic: 2800, roi: 700, conversions: 500 },
];

export const leadData = [
  {
    id: "1",
    date: "Today, 14:12",
    company: "",
    email: "contact@helpdesk.com",
    link: "#",
    quality: "NEEDS REVIEW",
    country: "USA",
    expanded: false,
  },
  {
    id: "2",
    date: "Today, 8:34",
    company: "Innovate.co",
    email: "s.chen@innovate.co",
    link: "#",
    quality: "NEEDS REVIEW",
    country: "Canada",
    expanded: false,
  },
  {
    id: "3",
    date: "Aug 4, 17:57",
    company: "Webmail",
    email: "maria@webmail.net",
    link: "#",
    quality: "GOOD",
    country: "Germany",
    expanded: false,
  },
  {
    id: "4",
    date: "Aug 4, 13:40",
    company: "",
    email: "john.doe@startup.org",
    link: "#",
    quality: "GOOD",
    country: "Australia",
    expanded: false,
  },
  {
    id: "5",
    date: "Aug 3, 10:22",
    company: "Designhub",
    email: "contact@designhub.io",
    link: "#",
    quality: "NEEDS REVIEW",
    country: "UK",
    expanded: true,
    details: {
      servicesRequired: ["GOOGLE ADS", "META ADS"],
      referralSource: "Google Ads (Branded Sale Campaign)",
      potentialRevenue: "$1,500 (Estimated)",
      leadScore: 85,
      note: "Aug 3, 15:17",
    },
  },
  {
    id: "6",
    date: "Aug 3, 9:01",
    company: "Proton",
    email: "a.kowalski@proton.me",
    link: "#",
    quality: "NEUTRAL",
    country: "Japan",
    expanded: false,
  },
  {
    id: "7",
    date: "Aug 2, 20:32",
    company: "",
    email: "assistance@service.me",
    link: "#",
    quality: "NEUTRAL",
    country: "",
    expanded: false,
  },
];

export const instagramData = {
  followers: "135,145",
  followersChange: "+16",
  interactions: "1,356",
  interactionsChange: "+7",
  likes: 697,
  comments: 22,
  saves: 566,
  shares: 71,
  topPosts: [
    { date: "Jul. 30", image: "" },
    { date: "Aug. 1", image: "" },
    { date: "Jul. 31", image: "" },
    { date: "Aug. 3", image: "" },
  ],
};

export const xData = {
  followers: "45,015",
  followersChange: "+7",
  impressions: "933",
  impressionsChange: "-57%",
  engagementRate: "15.8%",
  engagementChange: "+92%",
  barData: [
    { day: "27", value: 40 },
    { day: "28", value: 65 },
    { day: "29", value: 45 },
    { day: "30", value: 80 },
    { day: "31", value: 55 },
  ],
};

export const sidebarItems = [
  { label: "Realtime Overview", icon: "activity", active: true },
  { label: "SEO", icon: "search" },
  { label: "Paid Ads", icon: "target" },
  { label: "Social Media", icon: "share2" },
];

export const dataSourceItems = [
  { label: "Google Analytics" },
  { label: "Google Ads" },
  { label: "Meta Ads" },
  { label: "Social Platforms" },
];

export const bottomNavItems = [
  { label: "Reports", icon: "fileText" },
  { label: "Settings", icon: "settings" },
];
