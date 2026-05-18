"use client";

import { instagramData, xData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";

function InstagramWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl border border-border shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" />
          <span className="text-sm font-semibold text-foreground">Instagram</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">7D</span>
          <button className="p-1 rounded-md hover:bg-muted transition-colors">
            <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Followers</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-foreground">{instagramData.followers}</span>
            <span className="text-xs font-medium text-emerald-500">{instagramData.followersChange}</span>
          </div>
        </div>

        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Interactions</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-foreground">{instagramData.interactions}</span>
            <span className="text-xs font-medium text-emerald-500">{instagramData.interactionsChange}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div>
            <p className="text-[11px] text-muted-foreground">Likes</p>
            <p className="text-sm font-semibold text-foreground">{instagramData.likes}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Comments</p>
            <p className="text-sm font-semibold text-foreground">{instagramData.comments}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Saves</p>
            <p className="text-sm font-semibold text-foreground">{instagramData.saves}</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Shares</p>
            <p className="text-sm font-semibold text-foreground">{instagramData.shares}</p>
          </div>
        </div>
      </div>

      {/* Top Posts */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-3">Top Posts</p>
        <div className="flex gap-2">
          {instagramData.topPosts.map((post, i) => (
            <div key={i} className="flex-1">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 mb-1.5" />
              <p className="text-[10px] text-muted-foreground text-center">{post.date}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function XWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl border border-border shadow-sm p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">X.com</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">7D</span>
          <button className="p-1 rounded-md hover:bg-muted transition-colors">
            <MoreHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Followers</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-foreground">{xData.followers}</span>
            <span className="text-xs font-medium text-emerald-500">{xData.followersChange}</span>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={xData.barData} barCategoryGap="30%">
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {xData.barData.map((_, index) => (
                  <Cell key={index} fill={index === 3 ? "#111827" : "#e5e7eb"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div>
            <p className="text-[11px] text-muted-foreground">Impressions</p>
            <div className="flex items-baseline gap-1">
              <p className="text-sm font-semibold text-foreground">{xData.impressions}</p>
              <span className="text-[10px] font-medium text-red-500">{xData.impressionsChange}</span>
            </div>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Engagement Rate</p>
            <div className="flex items-baseline gap-1">
              <p className="text-sm font-semibold text-foreground">{xData.engagementRate}</p>
              <span className="text-[10px] font-medium text-emerald-500">{xData.engagementChange}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SocialWidgets() {
  return (
    <div className="w-[280px] space-y-4 shrink-0">
      <InstagramWidget />
      <XWidget />
    </div>
  );
}
