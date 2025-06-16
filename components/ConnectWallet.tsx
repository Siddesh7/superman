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
  retry?: () => Promise<void>;
}

const ConnectWallet = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const {
    data: walletData,
    isLoading: isWalletLoading,
    error: walletError,
    refetch: refetchWallet,
  } = useWallet(session?.user?.id);

  const { data: existingUser, isLoading: isUserLoading } = useUser(
    walletData?.account.address
  );

  const createUserMutation = useCreateUser();

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingSteps, setOnboardingSteps] = useState<OnboardingStep[]>([
    {
      title: "Connecting Wallet",
      description: "Setting up your Coinbase CDP wallet...",
      status: "pending",
      retry: () => retryStep(0),
    },
    {
      title: "Creating Account",
      description: "Setting up your account...",
      status: "pending",
      retry: () => retryStep(1),
    },
  ]);

  // Effect to handle the onboarding flow
  useEffect(() => {
    if (session?.user && !isUserLoading) {
      if (!existingUser) {
        setShowOnboarding(true);
        // If we have wallet data but no user, trigger user creation
        if (walletData && !createUserMutation.isPending) {
          retryStep(1);
        }
      } else {
        setShowOnboarding(false); // Close modal if user exists
        toast.success("Profile connected successfully!");
      }
    }
  }, [
    session,
    existingUser,
    isUserLoading,
    walletData,
    createUserMutation.isPending,
  ]);

  const retryStep = async (stepIndex: number) => {
    try {
      setOnboardingSteps((prev) =>
        prev.map((step, index) =>
          index === stepIndex ? { ...step, status: "loading" } : step
        )
      );

      if (stepIndex === 0) {
        // Step 1: Fetch wallet
        await refetchWallet();
      } else if (stepIndex === 1) {
        if (!walletData) {
          throw new Error("Failed to fetch wallet data");
        }

        if (!session?.user?.id) {
          throw new Error("User ID is required");
        }

        // Create user with wallet data
        await createUserMutation.mutateAsync({
          userId: session.user.id,
          name: session.user.name || undefined,
          email: session.user.email || undefined,
          walletAddress: walletData.account.address,
          profilePicUrl: session.user.image || undefined,
        });

        // Update step status
        setOnboardingSteps((prev) =>
          prev.map((step, index) =>
            index === 1 ? { ...step, status: "completed" } : step
          )
        );

        // Close modal and show success message
        setShowOnboarding(false);
        toast.success("Profile connected successfully!");
      }
    } catch (error) {
      console.error("Error in step:", stepIndex, error);
      setOnboardingSteps((prev) =>
        prev.map((step, index) =>
          index === stepIndex ? { ...step, status: "error" } : step
        )
      );
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleDisconnect = async () => {
    try {
      await signOut({ callbackUrl: window.location.href });
      queryClient.clear(); // Clear all queries on disconnect
    } catch {
      toast.error("Failed to disconnect");
    }
  };

  // Update steps based on current state
  const updatedSteps = onboardingSteps.map((step, index) => {
    if (index === 0) {
      if (isWalletLoading) {
        return { ...step, status: "loading" };
      }
      if (walletError) {
        return { ...step, status: "error" };
      }
      if (walletData) {
        return { ...step, status: "completed" };
      }
    }
    if (index === 1) {
      if (existingUser) {
        return { ...step, status: "completed" };
      }
      if (walletData && !existingUser && !createUserMutation.isPending) {
        return {
          ...step,
          status: "loading",
          description: "Creating your new account...",
        };
      }
    }
    return step;
  });

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
              {updatedSteps.map((step, index) => (
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
                    {step.status === "error" && step.retry && (
                      <Button
                        variant="default"
                        size="lg"
                        onClick={() => step.retry?.()}
                        className="mt-4 text-sm font-medium"
                      >
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
