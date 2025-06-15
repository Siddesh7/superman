import { ActiveTabTypes } from "@/types/profile";
import React, { FC } from "react";

type DashboardContentProps = {
  activeTab: ActiveTabTypes;
  setActiveTab: (activeTab: ActiveTabTypes) => void;
};

const DashboardContent: FC<DashboardContentProps> = ({ setActiveTab }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Active Groups</h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              2 Groups
            </span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-users text-4xl text-indigo-500 mr-4"></i>
            <div>
              <p className="text-2xl font-bold text-gray-800">2</p>
              <p className="text-sm text-gray-500">Groups you're part of</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Total Contributed
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              This Month
            </span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-dollar-sign text-4xl text-green-500 mr-4"></i>
            <div>
              <p className="text-2xl font-bold text-gray-800">$180.00</p>
              <p className="text-sm text-gray-500">Across all groups</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              Day Passes Used
            </h3>
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              This Month
            </span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-ticket-alt text-4xl text-purple-500 mr-4"></i>
            <div>
              <p className="text-2xl font-bold text-gray-800">8</p>
              <p className="text-sm text-gray-500">Passes used this month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-800">My Groups</h3>
              <button
                onClick={() => setActiveTab("myGroups")}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer whitespace-nowrap"
              >
                View All
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-lg border border-indigo-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Fitness Club Membership
                    </h4>
                    <p className="text-sm text-gray-500">Premium Gym Access</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Active
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Members</span>
                    <span className="font-medium text-gray-800">
                      5/5 Joined
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Target Amount</span>
                    <span className="font-medium text-gray-800">$500.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Your Contribution</span>
                    <span className="font-medium text-gray-800">$100.00</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center text-white text-xs border-2 border-white">
                      JD
                    </div>
                    <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center text-white text-xs border-2 border-white">
                      AS
                    </div>
                    <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-white text-xs border-2 border-white">
                      MK
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-white text-xs border-2 border-white">
                      RL
                    </div>
                    <div className="w-8 h-8 rounded-full bg-green-300 flex items-center justify-center text-white text-xs border-2 border-white">
                      TW
                    </div>
                  </div>

                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer whitespace-nowrap">
                    <i className="fas fa-ticket-alt mr-1"></i>
                    Get Day Pass
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-lg border border-blue-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Yoga Studio Access
                    </h4>
                    <p className="text-sm text-gray-500">
                      Monthly Unlimited Classes
                    </p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Forming
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Members</span>
                    <span className="font-medium text-gray-800">
                      3/6 Joined
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full w-1/2"></div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Target Amount</span>
                    <span className="font-medium text-gray-800">$360.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Your Contribution</span>
                    <span className="font-medium text-gray-800">$60.00</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center text-white text-xs border-2 border-white">
                      JD
                    </div>
                    <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-white text-xs border-2 border-white">
                      MK
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-white text-xs border-2 border-white">
                      RL
                    </div>
                  </div>

                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer whitespace-nowrap">
                    <i className="fas fa-share-alt mr-1"></i>
                    Share Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-800">
                Recent Activity
              </h3>
              <button
                onClick={() => setActiveTab("activity")}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer whitespace-nowrap"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-ticket-alt text-green-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Day Pass Created
                  </p>
                  <p className="text-xs text-gray-500">
                    Fitness Club - Friday, June 13
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Today, 9:30 AM</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-dollar-sign text-blue-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Payment Processed
                  </p>
                  <p className="text-xs text-gray-500">
                    Yoga Studio Access - $60.00
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Yesterday, 2:15 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-users text-purple-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Group Joined
                  </p>
                  <p className="text-xs text-gray-500">
                    You joined Yoga Studio Access
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    June 10, 11:45 AM
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <i className="fas fa-check-circle text-indigo-600"></i>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Group Completed
                  </p>
                  <p className="text-xs text-gray-500">
                    Fitness Club reached its member goal
                  </p>
                  <p className="text-xs text-gray-400 mt-1">June 8, 4:20 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
