import { GYM_API_URL } from "@/lib/constants";
import { CdpClient } from "@coinbase/cdp-sdk";
import { wrapFetchWithPayment, decodeXPaymentResponse } from "x402-fetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userSessionId, membershipId } = await request.json();
  if (!userSessionId || !membershipId) {
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
      name: userSessionId,
    });
    const fetchWithPayment = wrapFetchWithPayment(fetch, account as any);

    const response = await fetchWithPayment(
      `${GYM_API_URL}/generate-day-pass`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          membershipId,
        }),
      }
    );

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

    return NextResponse.json({
      paymentResponse,
      dayPass: res?.dayPass,
    });
  } catch (error) {
    console.error("Error purchasing membership:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
