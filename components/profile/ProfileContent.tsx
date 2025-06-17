import React from "react";
import ProfileHeader from "./ProfileHeader";
import DashboardContent from "./DashboardContent";
import { UserData } from "@/types/profile";
import { Group } from "@/types/groups";
import MyWalletContent from "./MyWalletContent";
import { WalletData } from "@/types/wallet";
import DayPassesContent from "./DayPassesContent";
import { useGlobalContext } from "@/context/GlobalContext";
import GroupsCreatedContent from "./GroupsCreatedContent";
import LogoutContent from "./LogoutContent";

const isGroupActive = (group: Group): boolean => {
  return group.status === "pending" || group.status === "funded";
};

const getActiveGroups = (groups: Group[]): Group[] => {
  return groups.filter(isGroupActive);
};

const ProfileContent = ({
  existingUser,
  walletData,
}: {
  existingUser: UserData;
  walletData: WalletData;
}) => {
  const { activeTab } = useGlobalContext();

  const activeGroupsList = getActiveGroups(existingUser.joinedGroups);

  return (
    <>
      <ProfileHeader />
      {activeTab === "dashboard" && (
        <DashboardContent
          existingUser={existingUser}
          activeGroups={activeGroupsList.length}
        />
      )}

      {activeTab === "myGroups" && (
        <GroupsCreatedContent createdGroups={existingUser.createdGroups} />
      )}
      {activeTab === "myWallet" && <MyWalletContent walletData={walletData} />}
      {activeTab === "dayPasses" && <DayPassesContent />}
      {activeTab === "logout" && <LogoutContent />}
    </>
  );
};

export default ProfileContent;
