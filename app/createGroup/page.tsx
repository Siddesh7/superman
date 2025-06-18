"use client";

import React from "react";
import { useCreateGroup } from "@/lib/hooks/useCreateGroup";
import { useWallet } from "@/lib/hooks/useWallet";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const CreateGroupPage = () => {
  const router = useRouter();
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
      await createGroup.mutateAsync({
        name: groupName,
        target_amount: parseFloat(targetAmount),
        max_members: parseInt(maxMembers),
        created_by: walletData.account.address,
        purchase_item: purchaseItem,
      });

      // Reset form
      setGroupName("");
      setTargetAmount("");
      setMaxMembers("");
      setPurchaseItem("");

      toast.success("Group created successfully!");

      // Redirect to groups page
      router.push("/groups");
    } catch (error) {
      console.error("Failed to create group:", error);
      toast.error("Failed to create group. Please try again.");
    }
  };

  return (
    <div className="min-h-screen profile-gradient py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create a New Group
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Fill in the details below to create a new group for collaborative
              purchases.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                <div className="grid gap-6">
                  <div>
                    <label
                      htmlFor="group-name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Group Name
                    </label>
                    <input
                      type="text"
                      id="group-name"
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                    <input
                      type="number"
                      id="target-amount"
                      value={targetAmount}
                      onChange={(e) => setTargetAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
                    <input
                      type="number"
                      id="max-members"
                      value={maxMembers}
                      onChange={(e) => setMaxMembers(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      placeholder="e.g., 5"
                      required
                      min="2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="purchase-item"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Purchase Item
                    </label>
                    <input
                      type="text"
                      id="purchase-item"
                      value={purchaseItem}
                      onChange={(e) => setPurchaseItem(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      placeholder="e.g., Gym Membership"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3">
                  Contribution Calculator
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    Per Person:
                  </span>
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    $
                    {targetAmount && maxMembers
                      ? (
                          parseFloat(targetAmount) / parseInt(maxMembers)
                        ).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button
                type="submit"
                disabled={createGroup.isPending}
                className="w-full py-3 text-base font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
              >
                {createGroup.isPending ? "Creating..." : "Create Group"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPage;
