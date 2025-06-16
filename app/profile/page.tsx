"use client";

import ProfileContent from "@/components/profile/ProfileContent";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { useUser } from "@/lib/hooks/useUser";
import { useWallet } from "@/lib/hooks/useWallet";
import { useSession } from "next-auth/react";
import React from "react";

const LoadingSection = () => {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
};

const ProfilePageContent = () => {
  const { data: session } = useSession();

  const { data: walletData, isLoading: isLoadingWalletData } = useWallet(
    session?.user?.id
  );

  const { data: existingUser, isLoading: isUserLoading } = useUser(
    walletData?.account.address
  );

  const isLoading = isLoadingWalletData || isUserLoading;

  return (
    <div className="bg-gray-50 flex">
      <ProfileSidebar
        name={session?.user.name}
        image={session?.user.image}
        email={session?.user.email}
      />
      <div className="flex-1 ml-64">
        <main className="p-8">
          {isLoading ? (
            <LoadingSection />
          ) : (
            walletData &&
            existingUser && (
              <ProfileContent
                existingUser={existingUser}
                walletData={walletData}
              />
            )
          )}
        </main>
      </div>
    </div>
  );
};

const Page = () => {
  return <ProfilePageContent />;
};

export default Page;
