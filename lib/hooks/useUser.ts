import { UserData } from "@/types/profile";
import { useQuery } from "@tanstack/react-query";

export function useUser(wallet_address?: string) {
    return useQuery({
        queryKey: ['user', wallet_address],
        queryFn: async () => {
            try {
                if (!wallet_address) return null;
                const response = await fetch(`/api/user?wallet_address=${wallet_address}`);
                if (!response.ok) return null;
                return response.json() as Promise<UserData>;
            } catch (error) {
                console.log("Error fetching user walletdata");
            }
        },
        enabled: !!wallet_address,
    });
} 