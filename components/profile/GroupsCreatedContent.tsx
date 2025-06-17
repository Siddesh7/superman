import { Group } from "@/types/groups";
import React from "react";
import MyGroupCard from "./MyGroupCard";

const GroupsCreatedContent = ({
  createdGroups,
}: {
  createdGroups: Group[];
}) => {
  return (
    <div className="my-8">
      {createdGroups.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
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
  );
};

export default GroupsCreatedContent;
