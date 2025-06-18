import { GYM_API_URL } from "@/lib/constants";
import { CdpClient } from "@coinbase/cdp-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const membershipId = searchParams.get("membershipId");
  const userSessionId = searchParams.get("userSessionId");

  if (!membershipId || !userSessionId) {
    return NextResponse.json(
      {
        status: "error",
        message: "membershipId parameter is required",
      },
      { status: 400 }
    );
  }

  const cdp = new CdpClient({
    apiKeyId: process.env.NEXT_PUBLIC_CDP_API_KEY_ID!,
    apiKeySecret: process.env.NEXT_PUBLIC_CDP_API_KEY_SECRET!,
    walletSecret: process.env.NEXT_PUBLIC_CDP_WALLET_SECRET!,
  });
  const account = await cdp.evm.getOrCreateAccount({
    name: userSessionId!,
  });

  const dayPasses = await fetch(
    `${GYM_API_URL}/memberships/${membershipId}/wallet/${account.address}/day-passes`,
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
