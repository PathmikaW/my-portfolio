"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center py-4 px-6 border-b">
      <h1 className="text-lg font-bold">Pathmika</h1>

      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost">Home</Button>
        </Link>
        <Link href="/projects">
          <Button variant="ghost">Projects</Button>
        </Link>
        <Link href="/contact">
          <Button variant="ghost">Contact</Button>
        </Link>

        {/* Toggle Buttons */}
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </nav>
  );
}
