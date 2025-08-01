import { GYM_API_URL } from "@/lib/constants";
import { CdpClient } from "@coinbase/cdp-sdk";
import { wrapFetchWithPayment, decodeXPaymentResponse } from "x402-fetch";
import { NextRequest, NextResponse } from "next/server";
import { supabaseClient } from "@/lib/supabase.client";

export async function POST(request: NextRequest) {
  const { buyerAddresses, startDate, endDate, purchasedBy, group_id } =
    await request.json();
  if (!buyerAddresses || !startDate || !endDate || !purchasedBy) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const cdp = new CdpClient({
      apiKeyId: process.env.NEXT_PUBLIC_CDP_API_KEY_ID!,
      apiKeySecret: process.env.NEXT_PUBLIC_CDP_API_KEY_SECRET!,
      walletSecret: process.env.NEXT_PUBLIC_CDP_WALLET_SECRET!,
    });
    const account = await cdp.evm.getOrCreateAccount({
      name: process.env.AGENT_SESSION_ID!,
    });

    const fetchWithPayment = wrapFetchWithPayment(fetch, account as any);

    const response = await fetchWithPayment(`${GYM_API_URL}/buy-membership`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyerAddresses,
        startDate,
        endDate,
        purchasedBy,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to purchase membership" },
        { status: response.status }
      );
    }
    const paymentResponse = decodeXPaymentResponse(
      response.headers.get("x-payment-response")!
    );
    const res = await response.json();

    if (!res?.membership?.membershipId) {
      return NextResponse.json(
        { error: "Failed to purchase membership" },
        { status: response.status }
      );
    }

    const groupResponse = await supabaseClient
      .from("groups")
      .update({
        status: "fulfilment",
        membership_id: res.membership.membershipId,
      })
      .eq("id", group_id);

    console.log("groupResponse", groupResponse);

    return NextResponse.json({
      paymentResponse,
      membershipId: res?.membership?.membershipId,
    });
  } catch (error) {
    console.error("Error purchasing membership:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
