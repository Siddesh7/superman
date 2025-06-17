import {
    AgentKit,
    cdpWalletActionProvider,
    ViemWalletProvider,
} from "@coinbase/agentkit";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "wagmi/chains";

let agentInstance: Awaited<ReturnType<typeof prepareAgentkit>> | null = null;

export async function createAgent(): Promise<AgentKit> {
    if (agentInstance) return agentInstance;

    try {
        const account = privateKeyToAccount(
            `0x${process.env.NEXT_PUBLIC_AGENT_WALLET_PRIVATE_KEY}`
        );

        const client = createWalletClient({
            account,
            chain: baseSepolia,
            transport: http(),
        }) as any; // Type assertion to resolve viem version conflict

        const walletProvider = new ViemWalletProvider(client);

        const agentkit = await AgentKit.from({
            walletProvider,
            actionProviders: [
                cdpWalletActionProvider({
                    apiKeyId: process.env.NEXT_PUBLIC_CDP_API_KEY_ID,
                    apiKeySecret: process.env.NEXT_PUBLIC_CDP_API_KEY_SECRET,
                }),
            ],
        });

        agentInstance = agentkit;
        return agentkit;
    } catch (error) {
        console.error("Error initializing agent:", error);
        throw new Error("Failed to initialize agent");
    }
}
