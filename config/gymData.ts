import { GymOptionTypes } from "@/types/groups";

export const gymOptions: GymOptionTypes[] = [
    {
        id: 'golds',
        name: "Gold's Gym",
        monthlyPrice: 49.99,
        yearlyPrice: 499.99,
        features: ['Premium Equipment', 'Group Classes', '24/7 Access', 'Personal Training'],
        color: 'from-yellow-400 to-orange-500',
        popular: true
    },
    {
        id: 'anytime',
        name: 'Anytime Fitness',
        monthlyPrice: 44.99,
        yearlyPrice: 449.99,
        features: ['24/7 Access', 'Global Network', 'Personal Training', 'Mobile App'],
        color: 'from-purple-500 to-pink-500'
    },
    {
        id: 'cultfit',
        name: 'Cult Fit',
        monthlyPrice: 39.99,
        yearlyPrice: 399.99,
        features: ['Fitness Classes', 'Mental Health', 'Nutrition Plans', 'Community'],
        color: 'from-red-500 to-pink-500'
    }
];