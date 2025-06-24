import { gymOptions } from "@/config/gymData";
import { CreateGroupFormData } from "@/types/groups";
import { Calendar, Check, Clock, MapPin, Star, Users } from "lucide-react";
import React, { FC } from "react";

type CreateGroupFormProps = {
  formData: CreateGroupFormData;
  handleInputChange: (
    field: keyof CreateGroupFormData,
    value: string | number | boolean
  ) => void;
  handleMembersChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CreateGroupForm: FC<CreateGroupFormProps> = ({
  formData,
  handleInputChange,
  handleMembersChange,
}) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl shadow-black/20 p-8">
        <div className="space-y-8">
          {/* Group Details */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3 text-blue-400" />
              Group Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Group Name
                </label>
                <input
                  type="text"
                  value={formData.groupName}
                  onChange={(e) =>
                    handleInputChange("groupName", e.target.value)
                  }
                  placeholder="Enter your group name..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Maximum Members
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.maxMembers}
                    onChange={handleMembersChange}
                    placeholder="Enter number of members..."
                    className="w-full px-4 py-3 pr-12 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-white placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Enter between 1-50 members for your group
                </p>
              </div>
            </div>
          </div>

          {/* Billing Period */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <Calendar className="w-6 h-6 mr-3 text-blue-400" />
              Billing Period
            </h2>

            <div className="relative bg-gray-700/50 rounded-2xl p-2 border border-gray-600/50">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => handleInputChange("isYearly", false)}
                  className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    !formData.isYearly
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "text-gray-300 hover:text-white hover:bg-gray-600/50"
                  }`}
                >
                  <Clock className="w-4 h-4 inline mr-2" />
                  Monthly
                </button>
                <button
                  onClick={() => handleInputChange("isYearly", true)}
                  className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    formData.isYearly
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "text-gray-300 hover:text-white hover:bg-gray-600/50"
                  }`}
                >
                  <Star className="w-4 h-4 inline mr-2" />
                  Yearly
                  {formData.isYearly && (
                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                      Save
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Gym Selection */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-blue-400" />
              Choose Your Gym
            </h2>

            <div className="grid md:grid-cols-1 gap-4">
              {gymOptions.map((gym) => (
                <div
                  key={gym.id}
                  onClick={() => handleInputChange("selectedGym", gym.name)}
                  className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                    formData.selectedGym === gym.name
                      ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                      : "border-gray-600 bg-gray-700/30 hover:border-gray-500 hover:bg-gray-700/50 hover:shadow-lg"
                  }`}
                >
                  {gym.popular && (
                    <div className="absolute -top-3 left-6">
                      <span className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        POPULAR
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gym.color} flex items-center justify-center mr-4 shadow-lg`}
                        >
                          <div className="w-6 h-6 bg-white rounded-full"></div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {gym.name}
                          </h3>
                          <p className="text-sm text-gray-300">
                            $
                            {formData.isYearly
                              ? gym.yearlyPrice
                              : gym.monthlyPrice}
                            <span className="text-gray-400">
                              /{formData.isYearly ? "year" : "month"} per person
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {gym.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center text-sm text-gray-300"
                          >
                            <Check className="w-4 h-4 mr-2 text-emerald-400" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.selectedGym === gym.name
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-500"
                      }`}
                    >
                      {formData.selectedGym === gym.name && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupForm;
