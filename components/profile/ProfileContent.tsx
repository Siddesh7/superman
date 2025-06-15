import React, { FC } from "react";
import ProfileHeader from "./ProfileHeader";
import { ActiveTabTypes } from "@/types/profile";
import DashboardContent from "./DashboardContent";
import MyGroupsContent from "./MyGroupsContent";
import MyActivityContent from "./MyActivityContent";

type ProfileContentProps = {
  activeTab: ActiveTabTypes;
  setActiveTab: (activeTab: ActiveTabTypes) => void;
};

const ProfileContent: FC<ProfileContentProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <>
      <ProfileHeader activeTab={activeTab} />
      {activeTab === "dashboard" && (
        <DashboardContent activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {activeTab === "myGroups" && (
        <MyGroupsContent activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {activeTab === "dayPasses" && <></>}
      {activeTab === "activity" && <MyActivityContent />}
      {activeTab === "settings" && <></>}
    </>
  );
};

export default ProfileContent;
