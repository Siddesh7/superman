"use client";

import ProfileContent from "@/components/profile/ProfileContent";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { ActiveTabTypes } from "@/types/profile";
import React, { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabTypes>("dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showJoinGroupModal, setShowJoinGroupModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [groupName, setGroupName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [maxMembers, setMaxMembers] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the logic to create a group
    setShowCreateGroupModal(false);
    // Reset form
    setGroupName("");
    setTargetAmount("");
    setMaxMembers("");
  };

  const handleJoinGroup = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the logic to join a group
    setShowJoinGroupModal(false);
  };

  return (
    <div className=" bg-gray-50 flex">
      <ProfileSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="flex-1 ml-64">
        <main className="p-8">
          <ProfileContent setActiveTab={setActiveTab} activeTab={activeTab} />
        </main>
      </div>

      {/* Create Group Modal */}
      {showCreateGroupModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in-up">
            <div className="flex items-center justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-800">
                Create a New Group
              </h3>
              <button
                onClick={() => setShowCreateGroupModal(false)}
                className="text-gray-400 hover:text-gray-500 cursor-pointer whitespace-nowrap"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleCreateGroup}>
              <div className="p-6 space-y-6">
                <div>
                  <label
                    htmlFor="group-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Group Name
                  </label>
                  <input
                    type="text"
                    id="group-name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="e.g., Fitness Club Membership"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="target-amount"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Target Amount ($)
                  </label>
                  <input
                    type="text"
                    id="target-amount"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="e.g., 500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="max-members"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Maximum Members
                  </label>
                  <input
                    type="text"
                    id="max-members"
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="e.g., 5"
                    required
                  />
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Contribution Calculator
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Per Person:</span>
                    <span className="text-lg font-bold text-indigo-600">
                      $
                      {targetAmount && maxMembers
                        ? (
                            parseInt(targetAmount) / parseInt(maxMembers)
                          ).toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateGroupModal(false)}
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Group Modal */}
      {showJoinGroupModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in-up">
            <div className="flex items-center justify-between p-5 border-b rounded-t">
              <h3 className="text-xl font-semibold text-gray-800">
                Join a Group
              </h3>
              <button
                onClick={() => setShowJoinGroupModal(false)}
                className="text-gray-400 hover:text-gray-500 cursor-pointer whitespace-nowrap"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleJoinGroup}>
              <div className="p-6 space-y-6">
                <div>
                  <label
                    htmlFor="invite-link"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Paste Invite Link or Code
                  </label>
                  <input
                    type="text"
                    id="invite-link"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    placeholder="e.g., https://groupfund.app/join/abc123"
                    required
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    By joining a group, you agree to contribute your share of
                    the target amount once all members have joined.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b space-x-3">
                <button
                  type="button"
                  onClick={() => setShowJoinGroupModal(false)}
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap"
                >
                  Join Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
