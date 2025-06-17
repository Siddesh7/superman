import { authOptions } from '@/lib/auth';
import { CdpClient } from '@coinbase/cdp-sdk';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { parseUnits } from 'viem';
import { z } from 'zod';

export async function POST(request: Request) {
    try {
        // Parse and validate the request body
        const { recipientWallet, amount } = await request.json();

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

        const { transactionHash } = await account.transfer({
            to: recipientWallet,
            amount: parseUnits(amount, 6),
            token: 'usdc',
            network: "base-sepolia"
        })

        return NextResponse.json(
            {
                success: true,
                message: 'Transfer successful',
                data: {
                    transactionHash,
                }
            },
            { status: 200 }
        );

    } catch (error) {
        // Handle validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid request data',
                    errors: error.errors
                },
                { status: 400 }
            );
        }

        // Handle other errors
        console.error('Transfer error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
