import { GymOptionTypes } from "@/types/groups";

export const gymOptions: GymOptionTypes[] = [
  {
    id: "golds",
    name: "Gold's Gym",
    monthlyPrice: 1.99,
    yearlyPrice: 9.99,
    features: [
      "Premium Equipment",
      "Group Classes",
      "24/7 Access",
      "Personal Training",
    ],
    color: "from-yellow-400 to-orange-500",
    popular: true,
  },
  {
    id: "anytime",
    name: "Anytime Fitness",
    monthlyPrice: 1.99,
    yearlyPrice: 9.99,
    features: [
      "24/7 Access",
      "Global Network",
      "Personal Training",
      "Mobile App",
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "cultfit",
    name: "Cult Fit",
    monthlyPrice: 1.99,
    yearlyPrice: 9.99,
    features: [
      "Fitness Classes",
      "Mental Health",
      "Nutrition Plans",
      "Community",
    ],
    color: "from-red-500 to-pink-500",
  },
];
