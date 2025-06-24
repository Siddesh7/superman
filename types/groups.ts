export type Group = {
    id: string;
    name: string;
    target_amount: number;
    joinedCount: number;
    max_members: number;
    status: 'pending' | 'funded' | 'expired';
    created_by: string;
    purchase_item: string;
    created_at: string;
    isUserJoined?: boolean;
    totalAmountCollected?: number;
    isTargetAchieved?: boolean;
    membership_id?: string;
}

export interface GymOptionTypes {
    id: string;
    name: string;
    monthlyPrice: number;
    yearlyPrice: number;
    features: string[];
    color: string;
    popular?: boolean;
}


export type CreateGroupFormData = {
    groupName: string;
    maxMembers: number;
    selectedGym: string;
    isYearly: boolean;
};

export interface SubmissionData extends CreateGroupFormData {
    totalCost: number;
    costPerPerson: number;
    monthlySavings: number;
    selectedGymData: GymOptionTypes | undefined;
    submittedAt: string;
}