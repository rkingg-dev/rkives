"use client";

import { motion } from "framer-motion";
import { Users, Heart, MessageCircle, Share2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const engagementData = [
  { day: "Mon", likes: 450, comments: 32, shares: 18 },
  { day: "Tue", likes: 520, comments: 45, shares: 22 },
  { day: "Wed", likes: 380, comments: 28, shares: 15 },
  { day: "Thu", likes: 610, comments: 52, shares: 30 },
  { day: "Fri", likes: 480, comments: 38, shares: 20 },
  { day: "Sat", likes: 720, comments: 65, shares: 42 },
  { day: "Sun", likes: 650, comments: 58, shares: 35 },
];

const platforms = [
  { name: "Instagram", followers: "135,145", change: "+16", engagement: "4.2%", posts: 24 },
  { name: "X (Twitter)", followers: "45,015", change: "+7", engagement: "2.8%", posts: 89 },
  { name: "LinkedIn", followers: "12,340", change: "+45", engagement: "3.1%", posts: 12 },
  { name: "TikTok", followers: "89,200", change: "+234", engagement: "6.5%", posts: 18 },
];

const topPosts = [
  { platform: "Instagram", content: "Product launch announcement", engagement: "2,340", date: "Aug 3" },
  { platform: "X", content: "Thread on analytics trends", engagement: "1,890", date: "Aug 2" },
  { platform: "LinkedIn", content: "Company milestone update", engagement: "956", date: "Aug 1" },
  { platform: "TikTok", content: "Behind the scenes video", engagement: "12,400", date: "Jul 30" },
];

const kpis = [
  { label: "Total Followers", value: "281K", change: "+302", icon: Users },
  { label: "Engagement Rate", value: "4.1%", change: "+0.3%", icon: Heart },
  { label: "Total Comments", value: "3,456", change: "+12%", icon: MessageCircle },
  { label: "Total Shares", value: "1,234", change: "+8%", icon: Share2 },
];

export default function SocialPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Social Media Dashboard</h2>

      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-border p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-foreground">{kpi.value}</span>
              <span className="text-xs font-medium text-emerald-500">{kpi.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-border shadow-sm p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Engagement Over Time</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f5" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#7b8190" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#7b8190" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="likes" fill="#111827" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-border shadow-sm p-5"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Platform Overview</h3>
          <div className="space-y-4">
            {platforms.map((p) => (
              <div key={p.name} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.posts} posts</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">{p.followers}</p>
                  <p className="text-xs text-emerald-500">{p.change}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">Top Performing Posts</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Platform</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Content</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Engagement</th>
              <th className="text-left px-5 py-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            {topPosts.map((post, i) => (
              <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3 text-foreground font-medium">{post.platform}</td>
                <td className="px-5 py-3 text-muted-foreground">{post.content}</td>
                <td className="px-5 py-3 text-foreground">{post.engagement}</td>
                <td className="px-5 py-3 text-muted-foreground">{post.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
