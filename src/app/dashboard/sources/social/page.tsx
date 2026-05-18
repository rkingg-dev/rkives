"use client";

import { motion } from "framer-motion";

export default function SocialPlatformsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Social Platforms</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border shadow-sm p-6"
      >
        <p className="text-sm text-muted-foreground">Connect your social media accounts to aggregate engagement data.</p>
      </motion.div>
    </div>
  );
}
