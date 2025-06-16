import React from "react";
import { useProfile } from "@/context/ProfileContext";
import { useSession } from "next-auth/react";
import Image from "next/image";

const ProfileSidebar = () => {
  const { activeTab, setActiveTab } = useProfile();
  const { data: session } = useSession();

  const truncateEmail = (email: string) => {
    if (!email) return "Not signed in";
    const [username, domain] = email.split("@");
    if (username.length > 10) {
      return `${username.substring(0, 10)}...@${domain}`;
    }
    return email;
  };

  console.log("Session", session);

  return (
    <div className="w-64 bg-white shadow-lg fixed h-full z-10 backdrop-blur-md bg-white/90">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <i className="fas fa-users-gear text-indigo-600 text-2xl mr-2"></i>
          <span className="font-bold text-xl text-indigo-600">GroupFund</span>
        </div>

        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="rounded-full"
                  height={40}
                  width={40}
                />
              ) : (
                <i className="fas fa-user text-indigo-600"></i>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-800">
                {session?.user?.name || "User"}
              </p>
              <p className="text-sm text-gray-500">
                {truncateEmail(session?.user?.email || "")}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
            <p className="text-sm font-medium mb-1">Wallet Balance</p>
            <p className="text-2xl font-bold">$245.00</p>
          </div>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === "dashboard"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            } cursor-pointer whitespace-nowrap`}
          >
            <i
              className={`fas fa-th-large mr-3 ${
                activeTab === "dashboard" ? "text-indigo-600" : "text-gray-400"
              }`}
            ></i>
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("myGroups")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === "myGroups"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            } cursor-pointer whitespace-nowrap`}
          >
            <i
              className={`fas fa-users mr-3 ${
                activeTab === "myGroups" ? "text-indigo-600" : "text-gray-400"
              }`}
            ></i>
            My Groups
          </button>

          <button
            onClick={() => setActiveTab("dayPasses")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === "dayPasses"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            } cursor-pointer whitespace-nowrap`}
          >
            <i
              className={`fas fa-ticket-alt mr-3 ${
                activeTab === "dayPasses" ? "text-indigo-600" : "text-gray-400"
              }`}
            ></i>
            Day Passes
          </button>

          <button
            onClick={() => setActiveTab("activity")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === "activity"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            } cursor-pointer whitespace-nowrap`}
          >
            <i
              className={`fas fa-chart-line mr-3 ${
                activeTab === "activity" ? "text-indigo-600" : "text-gray-400"
              }`}
            ></i>
            Activity
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === "settings"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            } cursor-pointer whitespace-nowrap`}
          >
            <i
              className={`fas fa-cog mr-3 ${
                activeTab === "settings" ? "text-indigo-600" : "text-gray-400"
              }`}
            ></i>
            Settings
          </button>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <button className="flex items-center justify-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
          <i className="fas fa-sign-out-alt mr-3 text-gray-400"></i>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
