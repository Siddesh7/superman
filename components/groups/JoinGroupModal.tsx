import { useProfile } from "@/context/ProfileContext";
import React from "react";

const JoinGroupModal = () => {
  const { setShowJoinGroupModal } = useProfile();
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-fade-in-up">
        <div className="flex items-center justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-800">Join a Group</h3>
          <button
            onClick={() => setShowJoinGroupModal(false)}
            className="text-gray-400 hover:text-gray-500 cursor-pointer whitespace-nowrap"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <form>
          <div className="p-6 space-y-6">
            <div>
              <label
                htmlFor="invite-link"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Paste Invite Link or Code
              </label>
              <input
                type="text"
                id="invite-link"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="e.g., https://groupfund.app/join/abc123"
                required
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                By joining a group, you agree to contribute your share of the
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
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap"
            >
              Join Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinGroupModal;
