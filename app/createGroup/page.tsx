"use client";

import React, { useEffect, useState } from "react";
import { useCreateGroup } from "@/lib/hooks/useCreateGroup";
import { useWallet } from "@/lib/hooks/useWallet";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Users } from "lucide-react";
import { gymOptions } from "@/config/gymData";
import { CreateGroupFormData, SubmissionData } from "@/types/groups";
import CreateGroupForm from "@/components/createGroup/CreateGroupForm";
import CostSummary from "@/components/createGroup/CostSummary";

const CreateGroupPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const createGroup = useCreateGroup();
  const { data: walletData } = useWallet(session?.user?.id);

  const [formData, setFormData] = useState<CreateGroupFormData>({
    groupName: "",
    maxMembers: 2,
    selectedGym: "",
    isYearly: false,
  });

  const [totalCost, setTotalCost] = useState(0);
  const [costPerPerson, setCostPerPerson] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (formData.selectedGym && formData.maxMembers > 0) {
      const selectedGymData = gymOptions.find(
        (gym) => gym.name === formData.selectedGym
      );
      if (selectedGymData) {
        const price = formData.isYearly
          ? selectedGymData.yearlyPrice
          : selectedGymData.monthlyPrice;
        const total = price * formData.maxMembers;
        const perPerson = price;

        setTotalCost(total);
        setCostPerPerson(perPerson);

        if (formData.isYearly) {
          const yearlyTotal = selectedGymData.yearlyPrice * formData.maxMembers;
          const monthlyEquivalent =
            selectedGymData.monthlyPrice * 12 * formData.maxMembers;
          setMonthlySavings(monthlyEquivalent - yearlyTotal);
        } else {
          setMonthlySavings(0);
        }
      }
    }
  }, [formData]);

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Reset submit status when form changes
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setSubmitMessage("");
    }
  };

  const handleMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 1 && value <= 50) {
      handleInputChange("maxMembers", value);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.groupName.trim()) {
      setSubmitMessage("Please enter a group name");
      return false;
    }
    if (!formData.selectedGym) {
      setSubmitMessage("Please select a gym");
      return false;
    }
    if (formData.maxMembers < 1 || formData.maxMembers > 50) {
      setSubmitMessage("Please enter a valid number of members (1-50)");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      toast.error("Please sign in to create a group");
      return;
    }

    if (!walletData?.account?.address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!validateForm()) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    const selectedGymData = gymOptions.find(
      (gym) => gym.name === formData.selectedGym
    );

    const submissionData: SubmissionData = {
      ...formData,
      totalCost,
      costPerPerson,
      monthlySavings,
      selectedGymData,
      submittedAt: new Date().toISOString(),
    };

    console.log("Submitted Data:", submissionData);

    try {
      const result = await createGroup.mutateAsync({
        name: submissionData.groupName,
        target_amount: parseFloat(submissionData.totalCost.toString()),
        max_members: parseInt(submissionData.maxMembers.toString()),
        created_by: walletData.account.address,
        purchase_item: submissionData.selectedGym,
      });

      console.log("result >>>", result);

      setSubmitStatus("success");
      setSubmitMessage(
        `Group "${formData.groupName}" created successfully!
        }`
      );

      toast.success("Group created successfully!");

      // Reset form
      setTotalCost(0);
      setCostPerPerson(0);
      setMonthlySavings(0);
      setIsSubmitting(false);
      setSubmitStatus("idle");
      router.push("/groups");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");

      if (error instanceof TypeError && error.message.includes("fetch")) {
        setSubmitStatus("success");
        setSubmitMessage(
          `Group "${formData.groupName}" created successfully! (Demo mode - no actual API)`
        );
        console.log("Demo Submission Data:", submissionData);
      } else {
        setSubmitMessage("Failed to create group. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedGymData = gymOptions.find(
    (gym) => gym.name === formData.selectedGym
  );
  const isFormValid: boolean =
    formData.groupName.trim() !== "" &&
    formData.selectedGym !== "" &&
    formData.maxMembers >= 1;

  return (
    <div className=" bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 pt-8 pb-28 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/25">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Create Your Gym Group
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Start a fitness journey together! Create a group membership and
            split the costs with your workout buddies.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Form Section */}
          <CreateGroupForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleMembersChange={handleMembersChange}
          />

          <CostSummary
            formData={formData}
            selectedGymData={selectedGymData}
            totalCost={totalCost}
            costPerPerson={costPerPerson}
            monthlySavings={monthlySavings}
            submitStatus={submitStatus}
            submitMessage={submitMessage}
            handleSubmit={handleSubmit}
            isFormValid={isFormValid}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateGroupPage;
