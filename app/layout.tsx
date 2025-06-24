import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import Provider from "./Providers";
import { Toaster } from "@/components/ui/sonner";
import BottomNavWrapper from "@/components/BottomNavWrapper";
import ChatTerminal from "@/components/ChatTerminal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Superman - Gym Management",
  description: "Gym membership management application",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["gym", "fitness", "membership", "workout", "health"],
  authors: [{ name: "Superman Team" }],
  icons: [
    { rel: "apple-touch-icon", url: "/icon-192x192.png" },
    { rel: "icon", url: "/icon-192x192.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Superman" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1 lg:pb-0 pb-16">{children}</div>
            <BottomNavWrapper />
            <div className="hidden lg:block">
              <ChatTerminal />
            </div>
          </div>
          <TailwindIndicator />
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
