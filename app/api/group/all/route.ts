import { supabaseClient } from "@/lib/supabase.client";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // 1. Get all groups
        const { data: groups, error: groupsError } = await supabaseClient
            .from("groups")
            .select("*");

        if (groupsError) {
            console.error("Database error:", groupsError);
            return NextResponse.json({ error: "Failed to fetch groups" }, { status: 500 });
        }

        // 2. For each group, count members
        const enrichedGroups = await Promise.all(
            (groups || []).map(async (group) => {
                const { count, error: countError } = await supabaseClient
                    .from("group_members")
                    .select("*", { count: "exact", head: true })
                    .eq("group_id", group.id);

                return {
                    ...group,
                    joinedCount: count ?? 0,
                };
            })
        );

        // 3. Return enriched group list
        return NextResponse.json(enrichedGroups);
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
