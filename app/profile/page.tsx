"use client";

import ProfileContent from "@/components/profile/ProfileContent";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { useUser } from "@/lib/hooks/useUser";
import { useWallet } from "@/lib/hooks/useWallet";
import { useSession, signIn } from "next-auth/react";
import React from "react";

const ProfilePageContent = () => {
  const { data: session, status } = useSession();
  const { data: walletData, isLoading: isLoadingWalletData } = useWallet(
    session?.user?.id
  );
  const { data: existingUser, isLoading: isUserLoading } = useUser(
    walletData?.account.address
  );

  const isLoading = isLoadingWalletData || isUserLoading;

  if (status === "loading" || isLoading) {
    return <LoadingSection />;
  }

  if (!session) {
    return <NoSession />;
  }

  return (
    <div className="bg-gray-50 flex">
      <ProfileSidebar
        name={session.user.name}
        image={session.user.image}
        email={session.user.email}
        walletData={walletData}
      />
      <div className="flex-1 ml-64">
        <main className="p-8">
          {walletData && existingUser && (
            <ProfileContent
              existingUser={existingUser}
              walletData={walletData}
            />
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

const LoadingSection = () => {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
};

const NoSession = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-2xl font-semibold mb-4">
        Please sign in to view your profile
      </h2>
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
};
