import { supabaseClient } from "@/lib/supabase.client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ groupId: string }> }
) {
  try {
    const { groupId } = await params;

    // Get the current user session
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const { data: group, error: groupError } = await supabaseClient
      .from("groups")
      .select("*")
      .eq("id", groupId)
      .single();

    if (groupError) {
      console.error("Database error:", groupError);
      return NextResponse.json(
        { error: "Failed to fetch group" },
        { status: 500 }
      );
    }

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
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

    // Step 3: Calculate total amount collected from all members
    const { data: members, error: membersError } = await supabaseClient
      .from("group_members")
      .select("payment_amount")
      .eq("group_id", group.id)
      .eq("has_paid", true);

    if (membersError) {
      console.error("Members error:", membersError);
      return NextResponse.json(
        { error: "Failed to fetch member payments" },
        { status: 500 }
      );
    }

    // Calculate total amount collected
    const totalAmountCollected = members?.reduce((sum, member) => {
      return sum + parseFloat(member.payment_amount || "0");
    }, 0) || 0;

    // Check if target amount has been achieved
    const isTargetAchieved = totalAmountCollected >= group.target_amount;

    // Step 4: Check if current user has already joined (only if user is authenticated)
    let isUserJoined = false;
    if (userId) {
      const { data: userMembership, error: membershipError } = await supabaseClient
        .from("group_members")
        .select("*")
        .eq("group_id", group.id)
        .eq("user_id", userId)
        .single();

      if (!membershipError && userMembership) {
        isUserJoined = true;
      }
    }

    return NextResponse.json({
      ...group,
      joinedCount: count,
      isUserJoined,
      totalAmountCollected,
      isTargetAchieved,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
