"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { page: "/", views: 12400, users: 8900, bounce: "32%" },
  { page: "/dashboard", views: 8200, users: 6100, bounce: "18%" },
  { page: "/pricing", views: 3400, users: 2800, bounce: "45%" },
  { page: "/docs", views: 2100, users: 1800, bounce: "22%" },
  { page: "/blog", views: 1800, users: 1500, bounce: "38%" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Google Analytics</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-border shadow-sm p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Top Pages</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f3f5" vertical={false} />
              <XAxis dataKey="page" tick={{ fontSize: 11, fill: "#7b8190" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#7b8190" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="views" fill="#111827" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
