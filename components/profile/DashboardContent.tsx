import React from "react";
import MyGroupsContent from "./MyGroupsContent";
import { UserData } from "@/types/profile";

const DashboardContent = ({
  activeGroups,
  existingUser,
}: {
  activeGroups: number;
  existingUser: UserData;
}) => {
  return (
    <div>
      <div className="flex gap-6 my-8">
        <div className="bg-white flex-1 rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-800">Active Groups</h3>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {activeGroups} Groups
            </span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-users text-4xl text-indigo-500 mr-4"></i>
            <div>
              <p className="text-2xl font-bold text-gray-800">{activeGroups}</p>
              <p className="text-sm text-gray-500">
                Groups you&apos;re part of
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white flex-1 rounded-lg shadow-sm p-6 border border-gray-200">
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

      <div className=" gap-6">
        <div className="lg:col-span-2">
          <MyGroupsContent
            createdGroups={existingUser.createdGroups}
            joinedGroups={existingUser.joinedGroups}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
