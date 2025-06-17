import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CdpClient } from "@coinbase/cdp-sdk";

// Token constants
const TOKENS = {
    ETH: {
        contractAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
    },
    USDC: {
        contractAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 6
    },
    CBBTC: {
        contractAddress: '0xcbB7C0006F23900c38EB856149F799620fcb8A4a',
        name: 'Coinbase Wrapped BTC',
        symbol: 'CBBTC',
        decimals: 18
    },
    EURC: {
        contractAddress: '0x808456652fdb597867f38412077A9182bf77359F',
        name: 'EURC Coin',
        symbol: 'EURC',
        decimals: 6
    }
} as const;

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized User' },
                { status: 401 }
            );
        }

        const cdp = new CdpClient({
            apiKeyId: process.env.NEXT_PUBLIC_CDP_API_KEY_ID!,
            apiKeySecret: process.env.NEXT_PUBLIC_CDP_API_KEY_SECRET!,
            walletSecret: process.env.NEXT_PUBLIC_CDP_WALLET_SECRET!
        });

        // Create or retrieve account
        const account = await cdp.evm.getOrCreateAccount({
            name: session.user.id, // uniquely identifies user wallet
        });

        const { balances } = await account.listTokenBalances({
            network: 'base-sepolia',
        });

        if (!balances || balances.length === 0) {
            return NextResponse.json({
                success: true,
                data: {
                    accountAddress: account.address,
                    balance: 0,
                },
            });
        }

        // Serialize and format balances
        const formattedBalances = balances.map(({ token, amount }) => {
            // Find matching token from constants
            const tokenInfo = Object.values(TOKENS).find(
                t => t.contractAddress.toLowerCase() === token.contractAddress.toLowerCase()
            );

            return {
                symbol: tokenInfo?.symbol || 'UNKNOWN',
                name: tokenInfo?.name || 'Unknown Token',
                contractAddress: token.contractAddress,
                network: token.network,
                amount: amount.amount.toString(),
                humanReadable: (Number(amount.amount) / 10 ** amount.decimals).toFixed(4),
                decimals: amount.decimals,
            };
        });

        return NextResponse.json({
            success: true,
            data: {
                account: account,
                balances: formattedBalances,
            },
        });

    } catch (error) {
        console.error('Error fetching wallet:', error);
        return NextResponse.json(
            { error: 'Failed to fetch wallet' },
            { status: 500 }
        );
    }
}
