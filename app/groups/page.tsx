"use client";

import CreateGroupModal from "@/components/groups/CreateGroupModal";
import GroupsComponent from "@/components/groups/GroupsComponent";
import JoinGroupModal from "@/components/groups/JoinGroupModal";
import { useProfile } from "@/context/ProfileContext";
import React from "react";

const GroupsPage = () => {
  const { showCreateGroupModal, showJoinGroupModal } = useProfile();

  return (
    <div>
      <GroupsComponent />

      {/* Create Group Modal */}
      {showCreateGroupModal && <CreateGroupModal />}

      {/* Join Group Modal */}
      {showJoinGroupModal && <JoinGroupModal />}
    </div>
  );
};

export default GroupsPage;
