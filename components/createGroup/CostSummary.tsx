import { CreateGroupFormData, GymOptionTypes } from "@/types/groups";
import {
  AlertCircle,
  CheckCircle,
  CreditCard,
  Loader2,
  Send,
} from "lucide-react";
import React, { FC } from "react";

type CostSummaryProps = {
  formData: CreateGroupFormData;
  selectedGymData: GymOptionTypes | undefined;
  totalCost: number;
  costPerPerson: number;
  monthlySavings: number;
  submitStatus: "idle" | "success" | "error";
  submitMessage: string;
  handleSubmit: () => Promise<void>;
  isFormValid: boolean;
  isSubmitting: boolean;
};

const CostSummary: FC<CostSummaryProps> = ({
  formData,
  selectedGymData,
  totalCost,
  costPerPerson,
  monthlySavings,
  submitStatus,
  submitMessage,
  handleSubmit,
  isFormValid,
  isSubmitting,
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl shadow-2xl shadow-black/20 p-8">
          <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
            <CreditCard className="w-6 h-6 mr-3 text-blue-400" />
            Cost Summary
          </h2>

          {formData.selectedGym &&
          selectedGymData &&
          formData.maxMembers > 0 ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-500/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl p-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-white mb-2">
                    {selectedGymData.name}
                  </h3>
                  <div className="text-3xl font-bold text-blue-400 mb-1">
                    ${totalCost.toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-300">
                    Total {formData.isYearly ? "yearly" : "monthly"} cost
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Per person</span>
                  <span className="font-semibold text-white">
                    ${costPerPerson.toFixed(2)}/
                    {formData.isYearly ? "year" : "month"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-700">
                  <span className="text-gray-300">Group members</span>
                  <span className="font-semibold text-white">
                    {formData.maxMembers}
                  </span>
                </div>

                {formData.isYearly && monthlySavings > 0 && (
                  <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-300 font-medium">
                        Yearly Savings
                      </span>
                      <span className="text-emerald-300 font-bold">
                        ${monthlySavings.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-emerald-400 mt-1">
                      vs. monthly billing
                    </p>
                  </div>
                )}
              </div>

              {/* Submit Status Messages */}
              {submitStatus !== "idle" && (
                <div
                  className={`p-4 rounded-xl border ${
                    submitStatus === "success"
                      ? "bg-emerald-500/20 border-emerald-500/30"
                      : "bg-red-500/20 border-red-500/30"
                  }`}
                >
                  <div className="flex items-center">
                    {submitStatus === "success" ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
                    )}
                    <p
                      className={`text-sm font-medium ${
                        submitStatus === "success"
                          ? "text-emerald-300"
                          : "text-red-300"
                      }`}
                    >
                      {submitMessage}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!isFormValid || isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Group...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Create Group
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-400">
                {!formData.selectedGym
                  ? "Select a gym to see pricing details"
                  : "Enter valid member count"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CostSummary;
