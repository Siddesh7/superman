import { Group } from "@/types/groups";
import React from "react";
import MyGroupCard from "./MyGroupCard";

const MyGroupsContent = ({ joinedGroups }: { joinedGroups: Group[] }) => {
  return (
    <div className="space-y-8">
      {joinedGroups.length > 0 && (
        <div className="glass profile-gradient rounded-lg shadow-sm p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">
            Groups You Joined
          </h2>
          <div className="gap-6 flex flex-col">
            {joinedGroups.map((group) => (
              <MyGroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}

      {joinedGroups.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Groups Found
            </h3>
            <p className="text-gray-600">
              You haven&apos;t joined any groups yet. Start by exploring groups
              in Groups section.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGroupsContent;
