"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";

export default function BottomNavWrapper() {
  const { data: session } = useSession();
  const pathname = usePathname();

  if (!session) return null;

  // Don't show bottom navigation on the home page
  if (pathname === "/") return null;

  return (
    <div className="lg:hidden">
      <BottomNav />
    </div>
  );
}
