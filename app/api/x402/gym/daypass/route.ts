import { GYM_API_URL } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const membershipId = searchParams.get("membershipId");
  const walletAddress = searchParams.get("walletAddress");

  if (!membershipId || !walletAddress) {
    return NextResponse.json(
      {
        status: "error",
        message: "membershipId parameter is required",
      },
      { status: 400 }
    );
  }

  const dayPasses = await fetch(
    `${GYM_API_URL}/memberships/${membershipId}/wallet/${walletAddress}/day-passes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const dayPassesData = await dayPasses.json();

  return NextResponse.json({
    status: "success",
    message: "Day pass fetched successfully",
    dayPasses: dayPassesData,
  });
}
