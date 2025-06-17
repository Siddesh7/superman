"use client";

import { useSession } from "next-auth/react";
import BottomNav from "./BottomNav";

export default function BottomNavWrapper() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="lg:hidden">
      <BottomNav />
    </div>
  );
}
