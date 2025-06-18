import { useMutation } from "@tanstack/react-query";

interface BuyGymMembershipParams {
    buyerAddresses: string[];
    startDate: string;
    endDate: string;
    purchasedBy: string;
    group_id: string;
}

interface GymMembershipResponse {
    // The response structure from decodeXPaymentResponse
    // Common payment response fields
    success?: boolean;
    transactionId?: string;
    amount?: string;
    currency?: string;
    status?: string;
    error?: string;
}

export function useBuyGymMembership() {
    return useMutation({
        mutationFn: async (params: BuyGymMembershipParams) => {
            const response = await fetch("/api/x402/gym/buy/membership", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to purchase gym membership");
            }

            return response.json() as Promise<GymMembershipResponse>;
        },
    });
} 