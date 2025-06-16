import { useQuery } from "@tanstack/react-query";

export interface WalletData {
    account: {
        address: string;
    };
    balance: {
        network: string;
        tokens: Array<{
            symbol: string;
            balance: string;
        }>;
    };
}

export function useWallet(userId?: string) {
    return useQuery({
        queryKey: ['wallet', userId],
        queryFn: async () => {
            const response = await fetch("/api/fetchWallet");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch wallet");
            }

            if (!data.data) {
                throw new Error("No wallet data received from API");
            }

            return data.data as WalletData;
        },
        enabled: !!userId,
    });
} 