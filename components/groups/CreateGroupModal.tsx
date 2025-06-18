import { useCreateGroup } from "@/lib/hooks/useCreateGroup";
import { useWallet } from "@/lib/hooks/useWallet";
import { X } from "lucide-react";
import React from "react";
import { useSession } from "next-auth/react";
import { useGlobalContext } from "@/context/GlobalContext";
import { toast } from "sonner";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const CreateGroupModal = () => {
  const { setShowCreateGroupModal } = useGlobalContext();
  const { data: session } = useSession();
  const createGroup = useCreateGroup();
  const { data: walletData } = useWallet(session?.user?.id);

  const [groupName, setGroupName] = React.useState("");
  const [targetAmount, setTargetAmount] = React.useState("");
  const [maxMembers, setMaxMembers] = React.useState("");
  const [purchaseItem, setPurchaseItem] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      toast.error("Please sign in to create a group");
      return;
    }

    if (!walletData?.account?.address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      const obj = {
        name: groupName,
        target_amount: parseFloat(targetAmount),
        max_members: parseInt(maxMembers),
        created_by: walletData.account.address,
        purchase_item: purchaseItem,
      };
      console.log("obj", obj);

      await createGroup.mutateAsync({
        name: groupName,
        target_amount: parseFloat(targetAmount),
        max_members: parseInt(maxMembers),
        created_by: walletData.account.address,
        purchase_item: purchaseItem,
      });

      setShowCreateGroupModal(false);
      // Reset form
      setGroupName("");
      setTargetAmount("");
      setMaxMembers("");
      setPurchaseItem("");

      toast.success("Group created successfully!");
    } catch (error: any) {
      console.error("Failed to create group:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative glass profile-gradient rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in-up">
        <div className="flex items-center justify-between p-5 border-b dark:border-gray-700 rounded-t">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Create a New Group
          </h3>
          <button
            onClick={() => setShowCreateGroupModal(false)}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 cursor-pointer whitespace-nowrap"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <label
                htmlFor="group-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Group Name
              </label>
              <Input
                type="text"
                id="group-name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="e.g., Fitness Club Membership"
                required
              />
            </div>

            <div>
              <label
                htmlFor="target-amount"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Target Amount ($)
              </label>
              <Input
                type="number"
                id="target-amount"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="e.g., 500"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label
                htmlFor="max-members"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Maximum Members
              </label>
              <Input
                type="number"
                id="max-members"
                value={maxMembers}
                onChange={(e) => setMaxMembers(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="e.g., 5"
                required
              />
            </div>

            <div>
              <label
                htmlFor="purchase-item"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Purchase Membership
              </label>
              <Select
                value={purchaseItem}
                onValueChange={setPurchaseItem}
                required
              >
                <SelectTrigger className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select a gym membership" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cult Fit Membership">
                    Cult Fit Membership
                  </SelectItem>
                  <SelectItem value="Anytime Fitness Membership">
                    Anytime Fitness Membership
                  </SelectItem>
                  <SelectItem value="Gold's Gym">Gold&apos;s Gym</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Contribution Calculator
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Per Person:
                </span>
                <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  $
                  {targetAmount && maxMembers
                    ? (parseFloat(targetAmount) / parseInt(maxMembers)).toFixed(
                        2
                      )
                    : "0.00"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end p-6 border-t border-gray-200 dark:border-gray-700 rounded-b space-x-3">
            <button
              type="button"
              onClick={() => setShowCreateGroupModal(false)}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createGroup.isPending}
              className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createGroup.isPending ? "Creating..." : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
