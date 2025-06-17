import { AgentKit, ViemWalletProvider } from "@coinbase/agentkit";
import { createWalletClient, Hex, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

// Define basic types
interface WalletProvider {
    client: ReturnType<typeof createWalletClient>;
    account: ReturnType<typeof privateKeyToAccount>;
}

interface Agent {
    walletProvider: WalletProvider;
}

export const prepareAgentkit = async (): Promise<AgentKit> => {
    try {
        let privateKey = process.env.NEXT_PUBLIC_AGENT_WALLET_PRIVATE_KEY as Hex;
        const account = privateKeyToAccount(`0x${privateKey}`);
        const networkId = process.env.NEXT_PUBLIC_NETWORK_ID as string;
        console.log("Account", account);

        const client = createWalletClient({
            account,
            chain: baseSepolia,
            transport: http(),
        });

        const walletProvider = new ViemWalletProvider(client);

        const agentkit = await AgentKit.from({
            walletProvider,
        });

        return agentkit
    } catch (error) {
        console.error("Error initializing agent:", error);
        throw new Error("Failed to initialize agent");
    }
};