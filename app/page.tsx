"use client";

import { LandingPage } from "@/components/homePage/LandingPage";
import { useIsPWA } from "@/hooks/useIsPWA";
import { useRouter } from "next/navigation";

export default function Home() {
  const isPWA = useIsPWA();
  const router = useRouter();

  if (isPWA) {
    router.push("/login");
  } else {
    return (
      <div className="min-h-screen  relative overflow-hidden">
        <LandingPage />
      </div>
    );
  }
}
