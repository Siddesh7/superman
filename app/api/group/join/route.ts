import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseClient } from '@/lib/supabase.client';
import { CdpClient } from '@coinbase/cdp-sdk';
import { createPublicClient, http, parseUnits } from 'viem';
import { baseSepolia } from 'viem/chains';

export async function POST(req: NextRequest) {
    try {

        // getting session from google (next-auth)
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.id;
        const { group_id, recipientWallet, amount } = await req.json();

        // 1. Check if already a member
        const { data: existing, error: checkError } = await supabaseClient
            .from("group_members")
            .select("*")
            .eq("group_id", group_id)
            .eq("user_id", userId)
            .single();

        if (existing) {
            return NextResponse.json({ error: "You have already joined this group." }, { status: 400 });
        }

        // 2. Transfer funds using CDP wallet
        const cdp = new CdpClient({
            apiKeyId: process.env.NEXT_PUBLIC_CDP_API_KEY_ID!,
            apiKeySecret: process.env.NEXT_PUBLIC_CDP_API_KEY_SECRET!,
            walletSecret: process.env.NEXT_PUBLIC_CDP_WALLET_SECRET!
        });

        const account = await cdp.evm.getOrCreateAccount({
            name: session.user.id,
        });

        const { transactionHash } = await account.transfer({
            to: recipientWallet,
            amount: parseUnits(amount, 6),
            token: 'usdc',
            network: 'base-sepolia'
        });

        // 3. Wait for transaction confirmation
        const publicClient = createPublicClient({
            chain: baseSepolia,
            transport: http()
        });

        const receipt = await publicClient.waitForTransactionReceipt({
            hash: transactionHash
        });

        if (receipt.status !== 'success') {
            return NextResponse.json({ error: 'Transaction failed on-chain.' }, { status: 500 });
        }

        // 3. Update group_members table
        const { data: groupMember, error: insertError } = await supabaseClient
            .from('group_members')
            .insert({
                group_id,
                user_id: userId,
                payment_amount: amount,
                has_paid: true
            })
            .select()
            .single();

        if (insertError) {
            return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        // 4. Log transaction
        await supabaseClient.from('transactions').insert({
            user_id: userId,
            group_id,
            amount,
            txn_hash: transactionHash
        });

        return NextResponse.json({ message: 'Group joined successfully', groupMember });
    } catch (error) {
        console.error("Join Group Error:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });

    }
}
