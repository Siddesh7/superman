import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FaucetResponse {
    success: boolean;
    data: {
        account: {
            address: string;
        };
    };
}

export function useRequestFaucet() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (): Promise<FaucetResponse> => {
            const response = await fetch("/api/requestFaucet", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to request faucet");
            }

            return data;
        },
        onSuccess: () => {
            // Invalidate wallet queries to refresh wallet data after faucet request
            queryClient.invalidateQueries({ queryKey: ['wallet'] });
            queryClient.invalidateQueries({ queryKey: ['agentWallet'] });
        },
        onError: (error) => {
            console.error("Faucet request failed:", error);
        },
    });
} 