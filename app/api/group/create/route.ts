import { supabaseClient } from "@/lib/supabase.client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, target_amount, max_members, created_by, purchase_item } = await req.json();

        // Input validation
        if (!name || !target_amount || !max_members || !created_by || !purchase_item) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (typeof target_amount !== 'number' || target_amount <= 0) {
            return NextResponse.json(
                { error: "Target amount must be a positive number" },
                { status: 400 }
            );
        }

        if (typeof max_members !== 'number' || max_members <= 0) {
            return NextResponse.json(
                { error: "Max members must be a positive number" },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseClient.from('groups').insert({
            name,
            target_amount,
            max_members,
            created_by,
            purchase_item
        }).select().single();

        if (error) {
            console.error("Database error:", error);
            return NextResponse.json(
                { error: "Failed to create group" },
                { status: 500 }
            );
        }

        return NextResponse.json(data);


    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
