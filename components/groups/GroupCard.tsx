import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Users, Package, Share2 } from "lucide-react";
import { Group } from "@/types/groups";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";

interface GroupCardProps {
  group: Group;
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

export function GroupCard({ group }: GroupCardProps) {
  const statusStyle = statusConfig[group.status];
  const { setShowJoinGroupModal, setSelectedGroup } = useGlobalContext();
  const router = useRouter();

  const handleJoinClick = () => {
    setSelectedGroup(group);
    setShowJoinGroupModal(true);
  };

  const handleViewDetails = () => {
    router.push(`/groups/${group.id}`);
  };

  const handleShareClick = async () => {
    const shareUrl = `${window.location.origin}/groups/${group.id}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Group link copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link");
    }
  };

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-0 shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-200 truncate">
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
      <CardContent className="space-y-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <Package className="w-4 h-4 mr-2 text-gray-400" />
          <span className="truncate">{group.purchase_item}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-sm">
            <DollarSign className="w-4 h-4 mr-2 text-green-500" />
            <div>
              <p className="text-gray-500">Target</p>
              <p className="font-semibold text-gray-900 dark:text-gray-300">
                ${group.target_amount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-2 text-blue-500" />
            <div>
              <p className="text-gray-500">Members</p>
              <p className="font-semibold text-gray-900 dark:text-gray-300">
                {group.joinedCount} /{group.max_members}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center text-xs text-gray-500 pt-2 border-t">
          <Calendar className="w-3 h-3 mr-1" />
          <span>Created {new Date(group.created_at).toLocaleDateString()}</span>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
          {group.status === "pending" && (
            <>
              <Button
                onClick={handleJoinClick}
                size="sm"
                className="flex-1 bg-blue-600 hover:bg-blue-700 dark:text-white"
              >
                Join Group
              </Button>
              <Button
                onClick={handleShareClick}
                size="sm"
                variant="outline"
                className="hover:bg-gray-50"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
