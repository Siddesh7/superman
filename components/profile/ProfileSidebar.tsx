import React, { FC } from "react";
import Image from "next/image";
import { MdSpaceDashboard } from "react-icons/md";
import { IoQrCodeOutline } from "react-icons/io5";
import { FaWallet } from "react-icons/fa6";

import { MdLogout } from "react-icons/md";
import { useGlobalContext } from "@/context/GlobalContext";
import { FaUserGroup } from "react-icons/fa6";
import { WalletData } from "@/types/wallet";

type ProfileSidebarProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  walletData?: WalletData;
};

const ProfileSidebar: FC<ProfileSidebarProps> = ({
  image,
  name,
  email,
  walletData,
}) => {
  const { activeTab, setActiveTab } = useGlobalContext();

  const getUSDCBalance = () => {
    if (!walletData?.balances) return "0.000";

    const usdcBalance = walletData.balances.find(
      (balance) => balance.symbol === "USDC"
    );

    if (!usdcBalance) return "0.000";
    return Number(usdcBalance.humanReadable).toFixed(3);
  };

  const truncateEmail = (email: string) => {
    if (!email) return "Not signed in";
    const [username, domain] = email.split("@");
    if (username.length > 10) {
      return `${username.substring(0, 10)}...@${domain}`;
    }
    return email;
  };

  return (
    <div className="w-64 bg-white shadow-lg fixed h-full z-10 backdrop-blur-md bg-white/90">
      <div className="p-6">
        <div className="my-8">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              {image ? (
                <Image
                  src={image}
                  alt={name || "User"}
                  className="rounded-full"
                  height={40}
                  width={40}
                />
              ) : (
                <i className="fas fa-user text-indigo-600"></i>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-800">{name || "User"}</p>
              <p className="text-sm text-gray-500">
                {truncateEmail(email || "")}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
            <p className="text-sm font-medium mb-1">USDC Balance</p>
            <p className="text-2xl font-bold">${getUSDCBalance()}</p>
          </div>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex gap-2 items-center w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === "dashboard"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            } cursor-pointer whitespace-nowrap`}
          >
            <MdSpaceDashboard />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab("myGroups")}
            className={`flex gap-2 items-center w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === "myGroups"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            } cursor-pointer whitespace-nowrap`}
          >
            <FaUserGroup />
            Groups Created
          </button>

          <button
            onClick={() => setActiveTab("myWallet")}
            className={`flex gap-2 items-center w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === "myWallet"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            } cursor-pointer whitespace-nowrap`}
          >
            <FaWallet />
            My Wallet
          </button>

          <button
            onClick={() => setActiveTab("dayPasses")}
            className={`flex gap-2 g items-center w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === "dayPasses"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            } cursor-pointer whitespace-nowrap`}
          >
            <IoQrCodeOutline />
            Day Passes
          </button>

          <button
            // onClick={() => signOut()}
            onClick={() => setActiveTab("logout")}
            className={`flex gap-2 items-center w-full px-4 py-3 rounded-lg transition-colors ${
              activeTab === "logout"
                ? "bg-indigo-50 text-indigo-600"
                : "text-gray-600 hover:bg-gray-100"
            } cursor-pointer whitespace-nowrap`}
          >
            <MdLogout />
            Logout
          </button>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <button className="flex items-center justify-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
          <i className="fas fa-sign-out-alt mr-3 text-gray-400"></i>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
