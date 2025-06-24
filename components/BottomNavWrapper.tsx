"use client";

import { useSession } from "next-auth/react";
import BottomNav from "./BottomNav";

export default function BottomNavWrapper() {
  const { data: session, status } = useSession();

  if (status === "loading" || status === "unauthenticated") return null;
  if (status === "authenticated" && session) return <BottomNav />;
}
