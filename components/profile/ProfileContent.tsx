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
  mobileSection,
}: {
  existingUser: UserData;
  walletData: WalletData;
  mobileSection?: string | null;
}) => {
  const { activeTab } = useGlobalContext();

  const activeGroupsList = getActiveGroups(existingUser.joinedGroups);

  const tab = mobileSection ?? activeTab;

  return (
    <div>
      <ProfileHeader />
      {tab === "dashboard" && (
        <DashboardContent
          existingUser={existingUser}
          activeGroups={activeGroupsList.length}
        />
      )}

      {tab === "myGroups" && (
        <GroupsCreatedContent createdGroups={existingUser.createdGroups} />
      )}
      {tab === "myWallet" && <MyWalletContent walletData={walletData} />}
      {tab === "dayPasses" && <DayPassesContent />}
      {tab === "logout" && <LogoutContent />}
    </div>
  );
};

export default ProfileContent;
