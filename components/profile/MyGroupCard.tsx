import { InfoIcon, Ticket } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

interface GroupMember {
  id: string;
  name: string;
  status: string;
  role: string;
}

interface GroupData {
  id: string;
  name: string;
  status: string;
  created_at: string;
  created_by: string;
  max_members: number;
  purchase_item: string;
  target_amount: number;
  members?: GroupMember[];
}

interface MyGroupCardProps {
  group: GroupData;
}

const MyGroupCard: React.FC<MyGroupCardProps> = ({ group }) => {
  const router = useRouter();

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
        return "bg-green-400 text-green-800";
      case "pending":
        return "bg-yellow-400 text-yellow-800";
      default:
        return "bg-gray-400 text-gray-800";
    }
  };

  const handleViewDetails = () => {
    router.push(`/groups/${group.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{group.purchase_item}</h3>
          <span
            className={`${getStatusColor(
              group.status
            )} text-xs font-medium px-2.5 py-0.5 rounded-full`}
          >
            {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
          </span>
        </div>
        <p className="text-indigo-100 text-sm">{group.name}</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Target Amount</p>
            <p className="font-semibold text-gray-800">
              {formatCurrency(group.target_amount)}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Created By</p>
            <p className="font-semibold text-gray-800 truncate">
              {group.created_by.slice(0, 6)}...
              {group.created_by.slice(-4)}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Start Date</p>
            <p className="font-semibold text-gray-800">
              {formatDate(group.created_at)}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Max members</p>
            <p className="font-semibold text-gray-800 truncate">
              {group.max_members}
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <button className="flex gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap">
            <Ticket />
            Get Day Pass
          </button>
          <button
            onClick={handleViewDetails}
            className="flex gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap"
          >
            <InfoIcon />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyGroupCard;
