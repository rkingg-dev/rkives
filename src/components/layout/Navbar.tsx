"use client";

import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-8 py-3 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 bg-muted/50 border-transparent focus:border-border focus:bg-white h-9"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500" />
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 cursor-pointer" />
      </div>
    </header>
  );
}
