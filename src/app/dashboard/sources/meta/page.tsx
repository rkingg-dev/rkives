"use client";

import { motion } from "framer-motion";

export default function MetaAdsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Meta Ads</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border shadow-sm p-6"
      >
        <p className="text-sm text-muted-foreground">Connect your Meta Ads account to see Facebook and Instagram ad performance.</p>
      </motion.div>
    </div>
  );
}
