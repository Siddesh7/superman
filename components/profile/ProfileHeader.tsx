import { useProfile } from "@/context/ProfileContext";
import { Link } from "lucide-react";
import React, { useState } from "react";

const ProfileHeader = () => {
  const { activeTab, setShowJoinGroupModal } = useProfile();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "myGroups" && "My Groups"}
            {activeTab === "dayPasses" && "Day Passes"}
            {activeTab === "activity" && "Activity"}
            {activeTab === "settings" && "Settings"}
          </h1>

          <p className="text-gray-500">
            {activeTab === "myGroups" &&
              "Manage your group memberships and contributions"}
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

          {/* <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="fas fa-bell text-xl"></i>
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </button> */}

          {showNotifications && (
            <div className="absolute right-8 mt-12 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm font-medium text-gray-800">
                    Gym Group: All members joined!
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Your group has reached its member limit. Funds have been
                    collected.
                  </p>
                  <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
                </div>
                <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm font-medium text-gray-800">
                    Day Pass Created
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Your day pass for Friday has been added to your Apple
                    Wallet.
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Yesterday</p>
                </div>
                <div className="p-4 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm font-medium text-gray-800">
                    Funds Returned
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    $45.20 has been returned to your wallet from the Yoga Group.
                  </p>
                  <p className="text-xs text-gray-400 mt-2">2 days ago</p>
                </div>
              </div>
              <div className="p-3 border-t border-gray-200 text-center">
                <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer whitespace-nowrap">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
