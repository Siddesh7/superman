import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CdpClient } from "@coinbase/cdp-sdk";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: 'Unauthorized User' },
                { status: 401 }
            );
        }

        console.log("Session user email", session.user);

        const cdp = new CdpClient({
            apiKeyId: process.env.NEXT_PUBLIC_CDP_API_KEY_ID!,
            apiKeySecret: process.env.NEXT_PUBLIC_CDP_API_KEY_SECRET!,
            walletSecret: process.env.NEXT_PUBLIC_CDP_WALLET_SECRET!
        });

        // Create or retrieve account
        const account = await cdp.evm.getOrCreateAccount({
            name: session.user.id, // uniquely identifies user wallet
        });

        console.log("Account", account,);
        const balance = await account.listTokenBalances({
            network: 'base-sepolia'
        })

        console.log("balance", balance);

        return NextResponse.json({
            success: true,
            data: {
                account,
                balance
            }
        });

    } catch (error) {
        console.error('Error fetching wallet:', error);
        return NextResponse.json(
            { error: 'Failed to fetch wallet' },
            { status: 500 }
        );
    }
}
