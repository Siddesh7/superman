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
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const { data: user, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(user);
}
