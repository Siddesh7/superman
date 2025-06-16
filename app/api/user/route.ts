import { supabaseClient } from '@/lib/supabase.client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { id, name, email, wallet_address, profile_pic_url } = data;

    const { data: user, error } = await supabaseClient.from('users').insert({
        id,
        name,
        email,
        wallet_address,
        profile_pic_url
    }).select().single();

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(user);
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const wallet_address = searchParams.get('wallet_address');

        const { data: user, error: userError } = await supabaseClient
            .from('users')
            .select('*')
            .eq("wallet_address", wallet_address)
            .single();

        if (userError || !user) {
            return NextResponse.json({ error: userError?.message || "User not found" }, { status: 500 });
        }

        const { data: createdGroups = [], error: createdError } = await supabaseClient
            .from("groups")
            .select("*")
            .eq("created_by", wallet_address);

        if (createdError) {
            return NextResponse.json({ error: createdError.message }, { status: 500 });
        }

        const { data: joinedMemberships = [], error: joinedError } = await supabaseClient
            .from("group_members")
            .select("group_id, groups(*)")
            .eq("user_id", user.id);

        if (joinedError) {
            return NextResponse.json({ error: joinedError.message }, { status: 500 });
        }

        const joinedGroups = joinedMemberships && joinedMemberships
            .filter((entry) => entry.groups !== null)
            .map((entry) => entry.groups);

        return NextResponse.json({
            user,
            createdGroups,
            joinedGroups
        });
    } catch (error) {
        console.error("Profile fetch failed:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });

    }

}
