"use client";

import {
  Users,
  PlusCircle,
  Link as LinkIcon,
  User,
  MessageCircle,
  Home,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Users, label: "Groups", href: "/groups" },
    { icon: PlusCircle, label: "Create", href: "/createGroup" },
    { icon: MessageCircle, label: "Chat", href: "/chat" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isCenter = index === 2; // Chat is the third item (index 2)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full
                  ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  }
                  ${isCenter ? "relative -top-4" : ""}`}
              >
                <div
                  className={`${
                    isCenter
                      ? "bg-blue-600 dark:bg-blue-500 rounded-full p-3 shadow-lg"
                      : ""
                  }`}
                >
                  <Icon
                    className={`${isCenter ? "w-8 h-8" : "w-6 h-6"} ${
                      isCenter ? "text-white" : ""
                    }`}
                  />
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
