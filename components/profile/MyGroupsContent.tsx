import React, { useState } from "react";

const MyGroupsContent = () => {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Fitness Club Membership</h3>
            <span className="bg-green-400 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <p className="text-indigo-100 text-sm">Premium Gym Access</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Members</span>
              <span className="font-medium text-gray-800">5/5 Joined</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Target Amount</p>
              <p className="font-semibold text-gray-800">$500.00</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Your Contribution</p>
              <p className="font-semibold text-gray-800">$100.00</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Start Date</p>
              <p className="font-semibold text-gray-800">June 1, 2025</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">End Date</p>
              <p className="font-semibold text-gray-800">July 1, 2025</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Group Members
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center text-white text-xs mr-3">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      John Doe (You)
                    </p>
                    <p className="text-xs text-gray-500">Group Creator</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Paid
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center text-white text-xs mr-3">
                    AS
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Alice Smith
                    </p>
                    <p className="text-xs text-gray-500">Member</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Paid
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-white text-xs mr-3">
                    MK
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Mike Kelly
                    </p>
                    <p className="text-xs text-gray-500">Member</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Paid
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-white text-xs mr-3">
                    RL
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Rachel Lee
                    </p>
                    <p className="text-xs text-gray-500">Member</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Paid
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center text-white text-xs mr-3">
                    TW
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Tom Wilson
                    </p>
                    <p className="text-xs text-gray-500">Member</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Paid
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap">
              <i className="fas fa-ticket-alt mr-2"></i>
              Get Day Pass
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap">
              <i className="fas fa-info-circle mr-2"></i>
              View Details
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 text-white">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg">Yoga Studio Access</h3>
            <span className="bg-yellow-400 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Forming
            </span>
          </div>
          <p className="text-blue-100 text-sm">Monthly Unlimited Classes</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Members</span>
              <span className="font-medium text-gray-800">3/6 Joined</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full w-1/2"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Target Amount</p>
              <p className="font-semibold text-gray-800">$360.00</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Your Contribution</p>
              <p className="font-semibold text-gray-800">$60.00</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Needed Members</p>
              <p className="font-semibold text-gray-800">3 more needed</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <p className="font-semibold text-gray-800">Awaiting members</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Group Members
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center text-white text-xs mr-3">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      John Doe (You)
                    </p>
                    <p className="text-xs text-gray-500">Member</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Paid
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-white text-xs mr-3">
                    MK
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Mike Kelly
                    </p>
                    <p className="text-xs text-gray-500">Group Creator</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Paid
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-white text-xs mr-3">
                    RL
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Rachel Lee
                    </p>
                    <p className="text-xs text-gray-500">Member</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Paid
                </span>
              </div>

              <div className="flex items-center justify-between opacity-50">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs mr-3">
                    <i className="fas fa-user-plus text-xs"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Awaiting Member
                    </p>
                    <p className="text-xs text-gray-500">Not joined yet</p>
                  </div>
                </div>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                  Pending
                </span>
              </div>

              <div className="flex items-center justify-between opacity-50">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs mr-3">
                    <i className="fas fa-user-plus text-xs"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Awaiting Member
                    </p>
                    <p className="text-xs text-gray-500">Not joined yet</p>
                  </div>
                </div>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                  Pending
                </span>
              </div>

              <div className="flex items-center justify-between opacity-50">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white text-xs mr-3">
                    <i className="fas fa-user-plus text-xs"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Awaiting Member
                    </p>
                    <p className="text-xs text-gray-500">Not joined yet</p>
                  </div>
                </div>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                  Pending
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => {
                copyToClipboard(
                  "https://groupfund.app/join/yoga-studio-123456"
                );
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="fas fa-share-alt mr-2"></i>
              {copySuccess ? copySuccess : "Share Invite Link"}
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap">
              <i className="fas fa-info-circle mr-2"></i>
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyGroupsContent;
