import React from "react";

const MyActivityContent = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Activity</h2>
          <p className="text-gray-500">
            Track your group activities and gym visits
          </p>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-button transition-colors cursor-pointer whitespace-nowrap">
              <i className="fas fa-calendar-alt mr-2"></i>
              This Month
              <i className="fas fa-chevron-down ml-2 text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Gym Visit Activity
            </h3>
            <div id="activity-chart" className="w-full h-64"></div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-800">
                Recent Activity
              </h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer whitespace-nowrap">
                Export Data
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Activity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Group
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      June 13, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <i className="fas fa-ticket-alt text-green-600"></i>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Day Pass Created
                          </p>
                          <p className="text-xs text-gray-500">
                            For Friday, June 13
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Fitness Club
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      June 12, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <i className="fas fa-dumbbell text-blue-600"></i>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Gym Visit
                          </p>
                          <p className="text-xs text-gray-500">
                            1 hour 20 minutes
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Fitness Club
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      June 11, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <i className="fas fa-dollar-sign text-blue-600"></i>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Payment Processed
                          </p>
                          <p className="text-xs text-gray-500">
                            Yoga Studio Access - $60.00
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Yoga Studio
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      June 10, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <i className="fas fa-users text-purple-600"></i>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Group Joined
                          </p>
                          <p className="text-xs text-gray-500">
                            You joined Yoga Studio Access
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Yoga Studio
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      June 8, 2025
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                          <i className="fas fa-check-circle text-indigo-600"></i>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            Group Completed
                          </p>
                          <p className="text-xs text-gray-500">
                            Fitness Club reached its member goal
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Fitness Club
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Completed
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Activity Summary
            </h3>
            <div className="space-y-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">
                    Gym Visits This Month
                  </p>
                  <span className="text-xl font-bold text-indigo-600">8</span>
                </div>
                <div className="w-full bg-indigo-200 rounded-full h-1.5">
                  <div className="bg-indigo-600 h-1.5 rounded-full w-2/3"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  8 of 12 target visits
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">
                    Day Passes Created
                  </p>
                  <span className="text-xl font-bold text-green-600">5</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-1.5">
                  <div className="bg-green-600 h-1.5 rounded-full w-5/6"></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  5 of 6 available passes
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">
                    Active Groups
                  </p>
                  <span className="text-xl font-bold text-purple-600">2</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Fitness Club</span>
                  <span>Yoga Studio</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Upcoming Day Passes
            </h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">Fitness Club</p>
                    <p className="text-sm text-gray-500">Friday, June 13</p>
                  </div>
                  <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Today
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer whitespace-nowrap">
                    <i className="fas fa-wallet mr-1"></i>
                    Add to Wallet
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium cursor-pointer whitespace-nowrap">
                    <i className="fas fa-qrcode mr-1"></i>
                    View QR
                  </button>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">Fitness Club</p>
                    <p className="text-sm text-gray-500">Monday, June 16</p>
                  </div>
                  <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    In 3 days
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium cursor-pointer whitespace-nowrap">
                    <i className="fas fa-wallet mr-1"></i>
                    Add to Wallet
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium cursor-pointer whitespace-nowrap">
                    <i className="fas fa-qrcode mr-1"></i>
                    View QR
                  </button>
                </div>
              </div>

              <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-medium py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                <i className="fas fa-plus mr-2"></i>
                Create New Day Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivityContent;
