import { QrCode, Users, Wallet } from "lucide-react";
import React from "react";

const WorkSection = () => {
  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform makes it easy to create and manage group funds for
            shared goals like gym memberships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Users className="text-blue-600 dark:text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 text-center">
              Create a Group
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Set a target amount and maximum number of members for your group
              fund.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/50 dark:to-pink-900/50 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Wallet className="text-blue-600 dark:text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 text-center">
              Pool Funds
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Members contribute equally to reach the target amount through
              secure CDP wallets.
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-indigo-50 dark:from-pink-900/50 dark:to-indigo-900/50 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-800 rounded-full flex items-center justify-center mb-6 mx-auto">
              <QrCode className="text-blue-600 dark:text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 text-center">
              Use Day Passes
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Generate day passes for the gym that go straight to your Apple
              Wallet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkSection;
