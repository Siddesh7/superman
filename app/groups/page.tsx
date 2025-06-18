"use client";

import CreateGroupModal from "@/components/groups/CreateGroupModal";
import GroupsComponent from "@/components/groups/GroupsComponent";
import { useGlobalContext } from "@/context/GlobalContext";
import React from "react";

const GroupsPage = () => {
  const { showCreateGroupModal } = useGlobalContext();
  return (
    <div>
      <GroupsComponent />

      {/* Create Group Modal */}
      {showCreateGroupModal && <CreateGroupModal />}
    </div>
  );
};

export default GroupsPage;
