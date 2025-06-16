import { supabaseClient } from "@/lib/supabase.client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { groupId: string } }
) {
    try {
        const { data: group, error: groupError } = await supabaseClient
            .from("groups")
            .select("*")
            .eq("id", params.groupId)
            .single();

        if (groupError) {
            console.error("Database error:", groupError);
            return NextResponse.json(
                { error: "Failed to fetch group" },
                { status: 500 }
            );
        }

        if (!group) {
            return NextResponse.json(
                { error: "Group not found" },
                { status: 404 }
            );
        }
        // Step 2: Count the number of joined members
        const { count, error: countError } = await supabaseClient
            .from("group_members")
            .select("*", { count: "exact", head: true })
            .eq("group_id", group.id);

        if (countError) {
            console.error("Count error:", countError);
            return NextResponse.json(
                { error: "Failed to fetch member count" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            ...group,
            joinedCount: count,
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
} 