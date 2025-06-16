import { WalletData } from "@/types/wallet";
import { useQuery } from "@tanstack/react-query";

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

            console.log("wallet data", data);
            return data.data as WalletData;
        },
        enabled: !!userId,
    });
} 