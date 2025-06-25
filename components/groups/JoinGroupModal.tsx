import { useGlobalContext } from "@/context/GlobalContext";
import { useJoinGroup } from "@/lib/hooks/useJoinGroup";
import { useWallet } from "@/lib/hooks/useWallet";
import { Group } from "@/types/groups";
import { X } from "lucide-react";
import React from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { AgentWallet } from "@/config/wagmiConfig";
import { useAgentWallet } from "@/lib/hooks/useAgentWallet";

interface JoinGroupModalProps {
  group: Group;
  onJoinSuccess?: () => void;
}

const JoinGroupModal = ({ group, onJoinSuccess }: JoinGroupModalProps) => {
  const { setShowJoinGroupModal } = useGlobalContext();
  const { data: session } = useSession();
  const joinGroup = useJoinGroup(onJoinSuccess);
  const { data: agentWallet, isLoading, error } = useAgentWallet();
  const { data: walletData, isLoading: isWalletLoading } = useWallet(
    session?.user?.id
  );

  const usersShare = group.target_amount / group.max_members;

  // Get USDC balance
  const getUSDCBalance = () => {
    if (!walletData?.balances) return 0;
    const usdcBalance = walletData.balances.find(
      (balance) => balance.symbol === "USDC"
    );
    return usdcBalance ? parseFloat(usdcBalance.humanReadable) : 0;
  };

  const usdcBalance = getUSDCBalance();
  const hasSufficientBalance = usdcBalance >= usersShare;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user has already joined
    if (group.isUserJoined) {
      toast.error("You have already joined this group!");
      setShowJoinGroupModal(false);
      return;
    }

    if (!agentWallet?.account.address) {
      toast.error("Agent is inactive, please try again later.");
      setShowJoinGroupModal(false);
      return;
    }

    // Check if user has sufficient balance
    if (!hasSufficientBalance) {
      toast.error(
        `Insufficient USDC balance. You need $${usersShare.toLocaleString()} but have $${usdcBalance.toLocaleString()}. Please add more funds to your wallet.`
      );
      return;
    }

    try {
      await joinGroup.mutateAsync({
        group_id: group.id,
        recipientWallet: agentWallet.account.address,
        amount: usersShare.toString(),
      });
      console.log("Join Group", joinGroup);

      toast.success("Group Joined Successfully");
      setShowJoinGroupModal(false);
    } catch (error) {
      console.error("Failed to join group:", error);
      toast.error("Failed to join group. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative glass profile-gradient rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in-up">
        <div className="flex items-center justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-300">Join Group</h3>
          <button
            onClick={() => setShowJoinGroupModal(false)}
            className="text-gray-400 hover:text-gray-500 cursor-pointer whitespace-nowrap"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-200 mb-2">
                {group.name}
              </h4>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="font-medium w-36">Item:</span>
                  <span>{group.purchase_item}</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="font-medium w-36">Target Amount:</span>
                  <span>${group.target_amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="font-medium w-36">Max Members:</span>
                  <span>{group.max_members}</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="font-medium w-36">Your Share:</span>
                  <span>${usersShare.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="font-medium w-36">Your USDC Balance:</span>
                  <span
                    className={
                      hasSufficientBalance ? "text-green-400" : "text-red-400"
                    }
                  >
                    ${usdcBalance.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {!hasSufficientBalance && !isWalletLoading && (
              <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-lg">
                <p className="text-sm text-red-400">
                  Insufficient USDC balance. You need $
                  {usersShare.toLocaleString()} but have $
                  {usdcBalance.toLocaleString()}. Please add more funds to your
                  wallet before joining this group.
                </p>
              </div>
            )}

            <div
              className="glass group-gradient p-4 rounded-lg"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <p className="text-sm text-gray-400">
                By joining this group, you agree to contribute your share of the
                target amount once all members have joined.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b space-x-3">
            <Button
              size="lg"
              type="button"
              onClick={() => setShowJoinGroupModal(false)}
              className="bg-white flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap"
            >
              Cancel
            </Button>
            <Button
              size="lg"
              type="submit"
              disabled={
                joinGroup.isPending || isWalletLoading || !hasSufficientBalance
              }
              className="bg-indigo-600 flex-1 hover:bg-indigo-700 text-white px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {joinGroup.isPending ? "Joining..." : "Join Group"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinGroupModal;
