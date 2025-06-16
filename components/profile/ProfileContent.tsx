import React from "react";
import ProfileHeader from "./ProfileHeader";
import DashboardContent from "./DashboardContent";
import MyGroupsContent from "./MyGroupsContent";
import MyActivityContent from "./MyActivityContent";
import { useProfile } from "@/context/ProfileContext";

const ProfileContent = () => {
  const { activeTab } = useProfile();

  return (
    <>
      <ProfileHeader />
      {activeTab === "dashboard" && <DashboardContent />}

      {activeTab === "myGroups" && <MyGroupsContent />}

      {activeTab === "dayPasses" && <></>}
      {activeTab === "activity" && <MyActivityContent />}
      {activeTab === "settings" && <></>}
    </>
  );
};

export default ProfileContent;
