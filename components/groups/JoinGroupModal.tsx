import { useGlobalContext } from "@/context/GlobalContext";
import { useJoinGroup } from "@/lib/hooks/useJoinGroup";
import { Group } from "@/types/groups";
import { X } from "lucide-react";
import React from "react";

interface JoinGroupModalProps {
  group: Group;
}

const JoinGroupModal = ({ group }: JoinGroupModalProps) => {
  const { setShowJoinGroupModal } = useGlobalContext();
  const joinGroup = useJoinGroup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await joinGroup.mutateAsync({ group_id: group.id });
      setShowJoinGroupModal(false);
    } catch (error) {
      console.error("Failed to join group:", error);
      alert("Failed to join group. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in-up">
        <div className="flex items-center justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-800">Join Group</h3>
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
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                {group.name}
              </h4>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium w-24">Item:</span>
                  <span>{group.purchase_item}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium w-24">Target Amount:</span>
                  <span>${group.target_amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium w-24">Max Members:</span>
                  <span>{group.max_members}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium w-24">Your Share:</span>
                  <span>
                    $
                    {(group.target_amount / group.max_members).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                By joining this group, you agree to contribute your share of the
                target amount once all members have joined.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b space-x-3">
            <button
              type="button"
              onClick={() => setShowJoinGroupModal(false)}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={joinGroup.isPending}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {joinGroup.isPending ? "Joining..." : "Join Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinGroupModal;
