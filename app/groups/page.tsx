"use client";

import CreateGroupModal from "@/components/groups/CreateGroupModal";
import GroupsComponent from "@/components/groups/GroupsComponent";
import JoinGroupModal from "@/components/groups/JoinGroupModal";
import { useGlobalContext } from "@/context/GlobalContext";
import React from "react";

const GroupsPage = () => {
  const { showCreateGroupModal, showJoinGroupModal, selectedGroup } =
    useGlobalContext();

  return (
    <div>
      <GroupsComponent />

      {/* Create Group Modal */}
      {showCreateGroupModal && <CreateGroupModal />}

      {/* Join Group Modal */}
      {showJoinGroupModal && selectedGroup && (
        <JoinGroupModal group={selectedGroup} />
      )}
    </div>
  );
};

export default GroupsPage;
