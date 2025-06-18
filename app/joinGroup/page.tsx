"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Group } from "@/types/groups";
import {
  DollarSign,
  Users,
  Package,
  Calendar,
  Share2,
  ArrowLeft,
  UserPlus,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useJoinGroup } from "@/lib/hooks/useJoinGroup";
import { useSession, signIn } from "next-auth/react";
import { AgentWallet } from "@/config/wagmiConfig";
import { useAgentWallet } from "@/lib/hooks/useAgentWallet";

const JoinGroupPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [groupId, setGroupId] = useState("");
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Callback to refresh group data after successful join
  const handleJoinSuccess = async () => {
    if (groupId) {
      const response = await fetch(`/api/group/${groupId}`);
      const updatedGroup = await response.json();
      if (response.ok) {
        setGroup(updatedGroup);
      }
    }
    toast.success("Successfully joined the group!");
  };

  const joinGroup = useJoinGroup(handleJoinSuccess);
  const { data: agentWallet, isLoading } = useAgentWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/group/${groupId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to load group");
      }

      setGroup(data);
    } catch (error) {
      console.error("Failed to load group:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load group details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!session?.user) {
      const callbackUrl = `/joinGroup`;
      await signIn("google", { callbackUrl });
      return;
    }

    if (!group) {
      toast.error("No group selected");
      return;
    }

    if (!agentWallet?.account.address) {
      toast.error("Agent is inactive, please try again later");
      return;
    }

    try {
      await joinGroup.mutateAsync({
        group_id: groupId,
        recipientWallet: agentWallet.account.address,
        amount: (group.target_amount / group.max_members).toString(),
      });
    } catch (error) {
      console.error("Failed to join group:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to join group"
      );
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/groups/${groupId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Group link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link");
    }
  };

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

  return (
    <div className="min-h-screen glass profile-gradient py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8 glass group-gradient">
          <CardHeader>
            <CardTitle>Join a Group</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Enter Group ID"
                  value={groupId}
                  onChange={(e) => setGroupId(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Find Group"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <div className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
            <p className="text-gray-600">{error}</p>
          </div>
        )}

        {group && (
          <Card className="group-gradient">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  {group.name}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className={`${statusConfig[group.status].color} font-medium`}
                >
                  {statusConfig[group.status].label}
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

              <div className="flex gap-3 pt-4">
                {group.status === "pending" && !group.isUserJoined && (
                  <Button
                    onClick={handleJoin}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={joinGroup.isPending}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {joinGroup.isPending ? "Joining..." : "Join Group"}
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
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="flex-1"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Group
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JoinGroupPage;
