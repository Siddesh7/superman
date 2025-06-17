export type WalletData = {
    account: {
        address: string;
    };
    balances: Array<{
        symbol: string;
        name: string;
        contractAddress: `0x${string}`;
        network: "base" | "base-sepolia";
        amount: string;
        humanReadable: string;
        decimals: number;
    }>;
}