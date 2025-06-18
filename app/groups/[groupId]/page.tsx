"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Group } from "@/types/groups";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  Package,
  Calendar,
  Share2,
  ArrowLeft,
  UserPlus,
  CheckCircle,
  ShoppingCart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useGlobalContext } from "@/context/GlobalContext";
import JoinGroupModal from "@/components/groups/JoinGroupModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useWallet } from "@/lib/hooks/useWallet";
import { useBuyGymMembership } from "@/lib/hooks/useBuyGymMembership";
import { useAgentWallet } from "@/lib/hooks/useAgentWallet";

export default function GroupDetailsPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const {
    showJoinGroupModal,
    selectedGroup,
    setShowJoinGroupModal,
    setSelectedGroup,
  } = useGlobalContext();

  // Get wallet data for the user
  const { data: walletData } = useWallet(session?.user?.id);

  // Buy gym membership hook
  const buyMembership = useBuyGymMembership();

  const { data: agentWallet, isLoading } = useAgentWallet();

  // Fetch group data using React Query
  const {
    data: group,
    isLoading: loading,
    error: queryError,
    refetch: refetchGroup,
  } = useQuery({
    queryKey: ["group", resolvedParams.groupId],
    queryFn: async () => {
      const response = await fetch(`/api/group/${resolvedParams.groupId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to load group");
      }

      return data as Group;
    },
    retry: 1,
  });

  // Handle query errors
  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
    }
  }, [queryError]);

  const handleJoinClick = () => {
    if (group) {
      setSelectedGroup(group);
      setShowJoinGroupModal(true);
    }
  };

  // Callback to refetch group data after successful join
  const handleJoinSuccess = () => {
    refetchGroup();
    toast.success("Successfully joined the group!");
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/groups/${resolvedParams.groupId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Group link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link");
    }
  };

  const handlePurchaseMembership = async () => {
    if (!agentWallet?.account.address) {
      toast.error("Agent is inactive");
      return;
    }

    if (!walletData?.account?.address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!group) {
      toast.error("Group data not available");
      return;
    }

    try {
      const result = await buyMembership.mutateAsync({
        buyerAddresses: [walletData.account.address],
        startDate: new Date().toISOString().split("T")[0], // Today's date
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        purchasedBy: agentWallet.account.address,
      });

      toast.success("Membership purchased successfully!");
      console.log("Membership purchase result:", result);

      // Optionally refetch group data or redirect
      refetchGroup();
    } catch (error) {
      console.error("Failed to purchase membership:", error);
      toast.error("Failed to purchase membership. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading group details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error || "Group not found"}</p>
          <Button
            onClick={() => router.push("/groups")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Back to Groups
          </Button>
        </div>
      </div>
    );
  }

  const statusConfig = {
    pending: {
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      label: "Pending",
    },
    funded: {
      color: "bg-green-100 text-green-800 border-green-200",
      label: "Funded",
    },
    expired: {
      color: "bg-red-100 text-red-800 border-red-200",
      label: "Expired",
    },
  };

  const statusStyle = statusConfig[group.status];

  return (
    <div className="min-h-screen profile-gradient py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="outline"
          className="mb-6 -ml-4"
          onClick={() => router.push("/groups")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Groups
        </Button>

        <div className="grid gap-6">
          <Card className="group-gradient">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  {group.name}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className={`${statusStyle.color} font-medium`}
                >
                  {statusStyle.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center text-sm text-gray-600">
                <Package className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-lg dark:text-gray-300">
                  {group.purchase_item}
                </span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-3 text-green-500" />
                    <div>
                      <p className="text-sm dark:text-gray-400">
                        Target Amount
                      </p>
                      <p className="font-semibold text-lg dark:text-gray-300">
                        ${group.target_amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-3 text-blue-500" />
                    <div>
                      <p className="text-sm dark:text-gray-400">Members</p>
                      <p className="font-semibold text-lg dark:text-gray-300">
                        {group.joinedCount} / {group.max_members}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-3 text-emerald-500" />
                    <div>
                      <p className="text-sm dark:text-gray-400">
                        Amount Collected
                      </p>
                      <p className="font-semibold text-lg dark:text-gray-300">
                        ${(group.totalAmountCollected || 0).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-purple-500" />
                    <div>
                      <p className="text-sm dark:text-gray-400">Created</p>
                      <p className="font-semibold dark:text-gray-300">
                        {new Date(group.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-3 text-indigo-500" />
                    <div>
                      <p className="text-sm dark:text-gray-400">Created By</p>
                      <p className="font-semibold dark:text-gray-300 font-mono text-sm">
                        {group.created_by.slice(0, 6)}...
                        {group.created_by.slice(-4)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Funding Progress
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round(
                      ((group.totalAmountCollected || 0) /
                        group.target_amount) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        ((group.totalAmountCollected || 0) /
                          group.target_amount) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ${(group.totalAmountCollected || 0).toLocaleString()}{" "}
                    collected
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ${group.target_amount.toLocaleString()} goal
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                {group.status === "pending" && !group.isUserJoined && (
                  <Button
                    onClick={handleJoinClick}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Join Group
                  </Button>
                )}
                {group.status === "pending" && group.isUserJoined && (
                  <Button
                    disabled
                    className="flex-1 bg-green-600 text-white cursor-not-allowed"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Already Joined
                  </Button>
                )}
                {group.isTargetAchieved && group.status === "pending" ? (
                  <Button
                    onClick={handlePurchaseMembership}
                    disabled={buyMembership.isPending}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {buyMembership.isPending
                      ? "Purchasing..."
                      : "Purchase Membership"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    className="flex-1"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Group
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showJoinGroupModal && selectedGroup && (
        <JoinGroupModal
          group={selectedGroup}
          onJoinSuccess={handleJoinSuccess}
        />
      )}
    </div>
  );
}
