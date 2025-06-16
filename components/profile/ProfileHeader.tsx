import { useProfile } from "@/context/ProfileContext";
import { Link } from "lucide-react";
import React from "react";

const ProfileHeader = () => {
  const { activeTab, setShowJoinGroupModal } = useProfile();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "myWallet" && "My Wallet"}
            {activeTab === "dayPasses" && "Day Passes"}
          </h1>

          <p className="text-gray-500">
            {activeTab === "myWallet" && "Manage your wallet"}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowJoinGroupModal(true)}
            className="flex gap-2 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap"
          >
            <Link />
            Join via Link
          </button>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
