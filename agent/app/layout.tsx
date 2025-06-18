import type { Metadata } from "next";
import "./globals.css";

/**
 * Metadata for the page
 */
export const metadata: Metadata = {
  title: "Superman AI",
  description:
    "AI-powered assistant with onchain capabilities and smart integrations",
};

/**
 * Root layout for the page
 *
 * @param {object} props - The props for the root layout
 * @param {React.ReactNode} props.children - The children for the root layout
 * @returns {React.ReactNode} The root layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
        {/* Main container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="py-6 px-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <h1 className="text-3xl font-bold text-white tracking-wide">
                  Superman <span className="text-blue-400">AI</span>
                </h1>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow flex items-center justify-center px-4 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="py-6 text-center text-white/60">
            <p className="text-sm">Powered by AI • Built for the future</p>
            <p className="text-xs mt-2 opacity-75">
              © {new Date().getFullYear()} Superman AI. All rights reserved.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
