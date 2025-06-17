import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseClient } from '@/lib/supabase.client';

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const groupId = searchParams.get('group_id');

    if (!groupId) {
        return NextResponse.json({ error: 'Group ID is required' }, { status: 400 });
    }

    const { data, error } = await supabaseClient
        .from('group_members')
        .select('*, users:user_id(*)')
        .eq('group_id', groupId);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { group_id } = await req.json();

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

    const { data, error } = await supabaseClient.from('group_members').insert({
        group_id,
        user_id: userId,
        payment_amount: 0,
        has_paid: false
    }).select().single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
