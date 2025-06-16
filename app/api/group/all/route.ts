import { supabaseClient } from "@/lib/supabase.client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { data, error } = await supabaseClient
            .from('groups')
            .select('*');

        if (error) {
            console.error("Database error:", error);
            return NextResponse.json(
                { error: "Failed to fetch groups" },
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
