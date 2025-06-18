"use client";

import { MainNav } from "@/components/main-nav";
import { siteConfig } from "@/config/site";
import { Button } from "./ui/button";
import { useRouter, usePathname } from "next/navigation";

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="glass profile-gradient sticky top-0 z-40 w-full border-b">
      <div className="px-4 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {pathname === "/" && (
              <Button onClick={() => router.push("/login")}>Launch App</Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
