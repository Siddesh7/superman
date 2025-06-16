import { Group } from "@/types/groups";
import React from "react";
import MyGroupCard from "./MyGroupCard";

const MyGroupsContent = ({
  createdGroups,
  joinedGroups,
}: {
  createdGroups: Group[];
  joinedGroups: Group[];
}) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        {createdGroups.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Groups You Created
            </h2>
            <div className=" gap-6">
              {createdGroups.map((group) => (
                <MyGroupCard key={group.id} group={group} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        {joinedGroups.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Groups You Joined
            </h2>
            <div className="gap-6">
              {joinedGroups.map((group) => (
                <MyGroupCard key={group.id} group={group} />
              ))}
            </div>
          </div>
        )}
      </div>

      {createdGroups.length === 0 && joinedGroups.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Groups Found
            </h3>
            <p className="text-gray-600">
              You haven&apos;t created or joined any groups yet. Start by
              creating a new group or joining an existing one.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGroupsContent;
