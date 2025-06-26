import { useGlobalContext } from "@/context/GlobalContext";
import { Link } from "lucide-react";
import React from "react";

const ProfileHeader = () => {
  const { activeTab, setShowJoinGroupModal } = useGlobalContext();

  return (
    <header className=" border-b border-border sticky top-0 z-10">
      <div className="flex items-center justify-between px-8 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "myGroups" && "Groups Created"}
            {activeTab === "myWallet" && "My Wallet"}
            {activeTab === "dayPasses" && "Day Passes"}
            {activeTab === "logout" && "Log Out"}
          </h1>

          <p className="text-muted-foreground">
            {activeTab === "myWallet" && "Manage your wallet"}
          </p>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
