import React from "react";
import ProfileHeader from "./ProfileHeader";
import DashboardContent from "./DashboardContent";
import { useProfile } from "@/context/ProfileContext";
import { UserData } from "@/types/profile";
import { Group } from "@/types/groups";
import MyWalletContent from "./MyWalletContent";
import { WalletData } from "@/types/wallet";
import DayPassesContent from "./DayPassesContent";

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
  const { activeTab } = useProfile();

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

      {activeTab === "myWallet" && <MyWalletContent walletData={walletData} />}
      {activeTab === "dayPasses" && <DayPassesContent />}
    </>
  );
};

export default ProfileContent;
