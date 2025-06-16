"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useJoinGroup } from "@/lib/hooks/useJoinGroup";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function GroupDetailsPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const { data: session } = useSession();
  const joinGroup = useJoinGroup();
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await fetch(`/api/group/${resolvedParams.groupId}`);
        if (!response.ok) {
          throw new Error("Group not found");
        }
        const data = await response.json();
        setGroup(data);
      } catch (error) {
        console.error("Failed to load group:", error);
        setError("Failed to load group details");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [resolvedParams.groupId]);

  const handleJoin = async () => {
    if (!session?.user) {
      router.push("/auth/signin");
      return;
    }

    try {
      await joinGroup.mutateAsync({ group_id: resolvedParams.groupId });
      toast.success("Successfully joined the group!");
      router.push("/groups");
    } catch (error) {
      console.error("Failed to join group:", error);
      toast.error("Failed to join group");
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading group details...</p>
        </div>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-gray-600">{error || "Group not found"}</p>
          <Button
            onClick={() => router.push("/groups")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 -ml-4"
          onClick={() => router.push("/groups")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Groups
        </Button>

        <div className="grid gap-6">
          <Card>
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
                <span className="text-lg">{group.purchase_item}</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-3 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Target Amount</p>
                      <p className="font-semibold text-lg text-gray-900">
                        ${group.target_amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-3 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Max Members</p>
                      <p className="font-semibold text-lg text-gray-900">
                        {group.joinedCount} / {group.max_members}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Created</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(group.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-3 text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-500">Created By</p>
                      <p className="font-semibold text-gray-900 font-mono text-sm">
                        {group.created_by.slice(0, 6)}...
                        {group.created_by.slice(-4)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                {group.status === "pending" && (
                  <Button
                    onClick={handleJoin}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={joinGroup.isPending}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {joinGroup.isPending ? "Joining..." : "Join Group"}
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
        </div>
      </div>
    </div>
  );
}
