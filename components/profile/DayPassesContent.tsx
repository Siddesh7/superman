import React from "react";
import { useDayPasses } from "@/lib/hooks/useDayPasses";
import { UserData } from "@/types/profile";
import { DayPass } from "@/types/dayPasses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface DayPassesContentProps {
  existingUser: UserData;
}

const DayPassesContent: React.FC<DayPassesContentProps> = ({
  existingUser,
}) => {
  const { data: session, status } = useSession();

  const allGroups = [...existingUser.joinedGroups];
  const groupsWithMembership = allGroups.filter((group) => group.membership_id);

  // Create a component to display day passes for a specific membership
  const DayPassesForMembership = ({
    membershipId,
    groupName,
  }: {
    membershipId: string;
    groupName: string;
  }) => {
    const {
      data: dayPasses,
      isLoading,
      error,
    } = useDayPasses({
      membershipId,
      userSessionId: session?.user?.id || "",
    });

    if (isLoading) {
      return (
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg">{groupName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (error) {
      return (
        <Card className="h-full border-red-200">
          <CardHeader>
            <CardTitle className="text-lg text-red-600">{groupName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">
              Error loading day passes: {error.message}
            </p>
          </CardContent>
        </Card>
      );
    }

    const passes = dayPasses?.dayPasses || [];

    return (
      <Card className="glass profile-gradient h-full">
        <CardHeader>
          <CardTitle className="text-lg">{groupName}</CardTitle>
          <p className="text-sm text-gray-500">Membership ID: {membershipId}</p>
        </CardHeader>
        <CardContent>
          {passes.length === 0 ? (
            <p className="text-gray-500">
              No day passes found for this membership.
            </p>
          ) : (
            <div className="space-y-3 flex flex-col  gap-8 md:gap-12 md:flex-row">
              {passes.map((dayPass: DayPass) => (
                <div
                  key={dayPass.passId}
                  className="border bg-background flex-1 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">
                        Pass #{dayPass.passId.slice(-8)}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Created:{" "}
                        {new Date(dayPass.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={dayPass.isUsed ? "secondary" : "default"}>
                      {dayPass.isUsed ? "Used" : "Active"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Issued:</span>
                      <p>{new Date(dayPass.issuedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Valid Until:</span>
                      <p>{new Date(dayPass.validUntil).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {dayPass.isUsed && dayPass.usedAt && (
                    <div className="mt-2 text-sm">
                      <span className="text-gray-500">Used on:</span>
                      <p>{new Date(dayPass.usedAt).toLocaleDateString()}</p>
                    </div>
                  )}

                  {!dayPass.isUsed && (
                    <div className="mt-3">
                      <Image
                        src={dayPass.qrCode}
                        alt="QR Code"
                        className="w-24 h-24 mx-auto border rounded"
                        width={96}
                        height={96}
                      />
                      <p className="text-xs text-center text-gray-500 mt-1">
                        Scan to use
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (status === "loading") {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100 mx-auto"></div>
        <p className="text-gray-500 mt-2">Loading session...</p>
      </div>
    );
  }

  if (!session?.user?.id) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Please sign in to view day passes.</p>
      </div>
    );
  }

  if (groupsWithMembership.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No memberships found. Join or create a group to get day passes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-12">
      <div className="gap-6">
        {groupsWithMembership.map((group, id) => (
          <DayPassesForMembership
            key={id}
            membershipId={group.membership_id!}
            groupName={group.name}
          />
        ))}
      </div>
    </div>
  );
};

export default DayPassesContent;
