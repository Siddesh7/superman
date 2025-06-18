import { InfoIcon, Ticket } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useCreateDayPass } from "@/lib/hooks/useCreateDayPass";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Group } from "@/types/groups";
import DayPassModal from "@/components/groups/DayPassModal";
import { DayPass } from "@/types/dayPasses";

interface MyGroupCardProps {
  group: Group;
}

const MyGroupCard: React.FC<MyGroupCardProps> = ({ group }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const createDayPass = useCreateDayPass();
  const [showDayPassModal, setShowDayPassModal] = useState(false);
  const [dayPassData, setDayPassData] = useState<DayPass | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-400 dark:bg-green-500 text-green-800 dark:text-green-100";
      case "pending":
        return "bg-yellow-400 dark:bg-yellow-500 text-yellow-800 dark:text-yellow-100";
      default:
        return "bg-gray-400 dark:bg-gray-500 text-gray-800 dark:text-gray-100";
    }
  };

  const handleViewDetails = () => {
    router.push(`/groups/${group.id}`);
  };

  const handleGetDayPass = async () => {
    if (!session?.user?.id) {
      toast.error("Please sign in to get a day pass");
      return;
    }

    if (!group.membership_id) {
      toast.error("No membership available for this group");
      return;
    }

    try {
      const result = await createDayPass.mutateAsync({
        userSessionId: session.user.id,
        membershipId: group.membership_id, // Using the actual membership_id from the group
      });

      toast.success("Day pass created successfully!");
      console.log("Day pass created:", result.dayPass);
      console.log("Payment response:", result.paymentResponse);

      // Store the day pass data and show the modal
      setDayPassData(result.dayPass);
      setShowDayPassModal(true);
    } catch (error) {
      console.error("Failed to create day pass:", error);
      toast.error("Failed to create day pass. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 p-3 sm:p-4 text-white">
          <div className="flex justify-between  sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
            <div>
              <h3 className="font-semibold text-base sm:text-lg">
                {group.purchase_item}
              </h3>
              <p className="text-blue-100 dark:text-blue-200 text-xs sm:text-sm">
                {group.name}
              </p>
            </div>
            <span
              className={`${getStatusColor(
                group.status
              )} text-xs font-medium px-2.5 py-0.5 rounded-full self-start sm:self-auto`}
            >
              {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-2.5 sm:p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Target Amount
              </p>
              <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                {formatCurrency(group.target_amount)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-2.5 sm:p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Created By
              </p>
              <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base truncate">
                {group.created_by.slice(0, 6)}...
                {group.created_by.slice(-4)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-2.5 sm:p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Start Date
              </p>
              <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                {formatDate(group.created_at)}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-2.5 sm:p-3 rounded-lg">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Max members
              </p>
              <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base truncate">
                {group.max_members}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between">
            {group.membership_id && (
              <Button
                onClick={handleGetDayPass}
                disabled={createDayPass.isPending}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white px-4 py-2.5 rounded-button transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base"
              >
                <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                {createDayPass.isPending ? "Creating..." : "Get Day Pass"}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleViewDetails}
              className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 px-4 py-2.5 rounded-button transition-colors cursor-pointer whitespace-nowrap text-sm sm:text-base"
            >
              <InfoIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              View Details
            </Button>
          </div>
        </div>
      </div>

      {showDayPassModal && dayPassData && (
        <DayPassModal
          isOpen={showDayPassModal}
          onClose={() => setShowDayPassModal(false)}
          dayPass={dayPassData}
        />
      )}
    </>
  );
};

export default MyGroupCard;
