"use client";

import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Copy, Loader2, LogOut } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { copyToClipboard, formatWalletAddress } from "@/lib/utils";
import { AddFunds } from "./AddFunds";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/lib/hooks/useUser";
import { useWallet } from "@/lib/hooks/useWallet";
import { useCreateUser } from "@/lib/hooks/useCreateUser";

interface OnboardingStep {
  title: string;
  description: string;
  status: "pending" | "loading" | "completed" | "error";
}

const ConnectWallet = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([
    {
      title: "Connecting Wallet",
      description: "Setting up your Coinbase CDP wallet...",
      status: "pending",
    },
    {
      title: "Creating Account",
      description: "Setting up your account...",
      status: "pending",
    },
  ]);

  const {
    data: walletData,
    isLoading: isWalletLoading,
    error: walletError,
    refetch: refetchWallet,
  } = useWallet(session?.user?.id);

  console.log("WalletData", walletData);

  const {
    data: existingUser,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useUser(walletData?.account.address);

  const createUserMutation = useCreateUser();

  const onboard = async () => {
    if (!session || !walletData?.account?.address || isUserLoading) return;

    setShowOnboarding(true);
    setOnboardingSteps((steps) =>
      steps.map((s, i) => (i === 0 ? { ...s, status: "loading" } : s))
    );

    try {
      setOnboardingSteps((steps) =>
        steps.map((s, i) => (i === 0 ? { ...s, status: "completed" } : s))
      );

      setOnboardingSteps((steps) =>
        steps.map((s, i) => (i === 1 ? { ...s, status: "loading" } : s))
      );

      if (!existingUser) {
        await createUserMutation.mutateAsync({
          userId: session.user.id,
          walletAddress: walletData.account.address,
          email: session.user?.email,
          name: session.user?.name,
        });
      }

      await refetchUser();

      setOnboardingSteps((steps) =>
        steps.map((s, i) => (i === 1 ? { ...s, status: "completed" } : s))
      );

      toast.success("User onboarded successfully");
    } catch (err) {
      console.error("Onboarding failed", err);
      toast.error("Failed to onboard user");
      setOnboardingSteps((steps) =>
        steps.map((s, i) => (i === 1 ? { ...s, status: "error" } : s))
      );
    }
  };

  useEffect(() => {
    onboard();
  }, [session, walletData?.account?.address, isUserLoading]);

  const handleDisconnect = async () => {
    try {
      await signOut({ callbackUrl: window.location.href });
      queryClient.clear();
    } catch {
      toast.error("Failed to disconnect");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="text-center p-4">
        <Button
          onClick={() =>
            signIn("google", { callbackUrl: window.location.href })
          }
          className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
        >
          <FcGoogle />
          Sign in with Google
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        {isWalletLoading && (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Connecting wallet...</span>
          </div>
        )}

        {walletError && (
          <div className="p-3 bg-red-50 text-red-600 rounded-md">
            {walletError instanceof Error
              ? walletError.message
              : "Failed to fetch wallet"}
          </div>
        )}

        {walletData && (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg px-4 py-2 bg-blue-600 text-white cursor-pointer">
              {formatWalletAddress(walletData.account.address)}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => copyToClipboard(walletData.account.address)}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Address
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Dialog>
                  <DialogTrigger onClick={(e) => e.stopPropagation()}>
                    Add Funds
                  </DialogTrigger>
                  <DialogContent>
                    <AddFunds address={walletData.account.address} />
                  </DialogContent>
                </Dialog>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDisconnect}
                className="text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {!walletData && !walletError && !isWalletLoading && (
          <div className="text-center text-gray-500">
            No wallet data available
          </div>
        )}

        {/* Onboarding Modal */}
        <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
          <DialogContent className="sm:max-w-md">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                {!existingUser
                  ? "Welcome! Creating your account"
                  : "Setting up your account"}
              </h2>
              {onboardingSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {step.status === "loading" && (
                      <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                    )}
                    {step.status === "completed" && (
                      <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                    {step.status === "error" && (
                      <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                        <svg
                          className="h-3 w-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    )}
                    {step.status === "pending" && (
                      <div className="h-5 w-5 rounded-full bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="text-sm text-gray-500">{step.description}</p>
                    {step.status === "error" &&
                      index === onboardingSteps.length - 1 && (
                        <Button size="sm" className="mt-2" onClick={onboard}>
                          Retry
                        </Button>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ConnectWallet;
