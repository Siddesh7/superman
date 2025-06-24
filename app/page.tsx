"use client";

import { useSession } from "next-auth/react";
import { LandingPage } from "@/components/homePage/LandingPage";
import { LoadingSection } from "@/components/reusables/LoadingSection";

export default function Home() {
  const { status } = useSession();

  if (status === "loading") return <LoadingSection />;

  return <LandingPage />;
}
