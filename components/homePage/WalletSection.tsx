import { Check } from "lucide-react";
import Image from "next/image";
import React from "react";

const WalletSection = () => {
  return (
    <div className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <Image
              src="https://readdy.ai/api/search-image?query=A%20sleek%20digital%20wallet%20interface%20with%20a%20gym%20membership%20card%20and%20QR%20code%20for%20day%20passes%2C%20showing%20transaction%20history%20and%20fund%20management%2C%20with%20a%20clean%20minimalist%20design%20on%20a%20soft%20gradient%20background%2C%20highly%20detailed%203D%20rendering&width=600&height=400&seq=2&orientation=landscape"
              alt="Digital wallet with day pass"
              className="rounded-lg w-full object-cover"
              height={400}
              width={400}
            />
          </div>
          <div className="lg:w-1/2 lg:pl-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Smart Wallet Technology
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center mt-1">
                  <Check size={18} />
                </div>
                <p className="ml-3 text-lg text-gray-600 dark:text-gray-300">
                  Automated fund collection and management
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center mt-1">
                  <Check size={18} />
                </div>
                <p className="ml-3 text-lg text-gray-600 dark:text-gray-300">
                  Secure CDP wallet integration with Google login
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center mt-1">
                  <Check size={18} />
                </div>
                <p className="ml-3 text-lg text-gray-600 dark:text-gray-300">
                  Digital day passes with Apple Wallet integration
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 dark:bg-indigo-600 flex items-center justify-center mt-1">
                  <Check size={18} />
                </div>
                <p className="ml-3 text-lg text-gray-600 dark:text-gray-300">
                  Fair fund distribution based on actual usage
                </p>
              </div>
            </div>
            <button
              // onClick={handleLogin}
              className="mt-8 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-6 py-3 rounded-button text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg cursor-pointer whitespace-nowrap"
            >
              <i className="fas fa-wallet mr-2"></i>
              Create Your Wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletSection;
