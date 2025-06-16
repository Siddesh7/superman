export type WalletData = {
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