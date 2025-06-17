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
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 my-4 sm:my-8">
        <div className="glass profile-gradient  bg-card flex-1 rounded-lg shadow-sm p-4 sm:p-6 border border-border">
          <div className="flex sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4">
            <h3 className="text-base sm:text-lg font-medium text-foreground">
              Active Groups
            </h3>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full w-fit">
              {activeGroups} Groups
            </span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-users text-3xl sm:text-4xl text-primary mr-3 sm:mr-4"></i>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-foreground">
                {activeGroups}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Groups you&apos;re part of
              </p>
            </div>
          </div>
        </div>

        <div className="glass profile-gradient flex-1 rounded-lg shadow-sm p-4 sm:p-6 border border-border">
          <div className="flex sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4">
            <h3 className="text-base sm:text-lg font-medium text-foreground">
              Day Passes Used
            </h3>
            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 text-xs font-medium px-2.5 py-0.5 rounded-full w-fit">
              This Month
            </span>
          </div>
          <div className="flex items-center">
            <i className="fas fa-ticket-alt text-3xl sm:text-4xl text-primary mr-3 sm:mr-4"></i>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-foreground">8</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Passes used this month
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <MyGroupsContent joinedGroups={existingUser.joinedGroups} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
