import { useQuery } from "@tanstack/react-query";

export type AgentWalletData = {
    account: {
        address: string;
    };
};

export function useAgentWallet() {
    return useQuery({
        queryKey: ['agentWallet'],
        queryFn: async () => {
            const response = await fetch("/api/fetchAgentWallet");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch agent wallet");
            }

            if (!data.data) {
                throw new Error("No agent wallet data received from API");
            }

            console.log("agent wallet data", data);
            return data.data as AgentWalletData;
        },
    });
} 