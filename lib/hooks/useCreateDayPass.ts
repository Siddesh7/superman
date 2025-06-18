import { useMutation } from "@tanstack/react-query";

interface CreateDayPassParams {
    userSessionId: string;
    membershipId: string;
}

interface DayPassResponse {
    paymentResponse: {
        success?: boolean;
        transactionId?: string;
        amount?: string;
        currency?: string;
        status?: string;
        error?: string;
    };
    dayPass: {
        passId: string;
        membershipId: string;
        qrCode: string;
        issuedDate: string;
        validUntil: string;
        isUsed: boolean;
        usedAt?: string;
        createdAt: string;
        requestIp?: string;
    };
}

export function useCreateDayPass() {
    return useMutation({
        mutationFn: async (params: CreateDayPassParams) => {
            const response = await fetch("/api/x402/gym/daypass/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || "Failed to create day pass");
            }

            return response.json() as Promise<DayPassResponse>;
        },
    });
} 