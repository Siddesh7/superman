import { AgentRequest, AgentResponse } from "@/app/types/api";
import { NextResponse } from "next/server";
import { createAgent } from "./create-agent";
import { Message, generateId, generateText } from "ai";

// CORS headers - allow multiple origins
const getAllowedOrigins = () => {
  return [
    "http://localhost:3000",
    "http://localhost:3002",
    "https://superman-gymgather.vercel.app",
    "https://supermanai-agent.vercel.app",
  ];
};

const getCorsHeaders = (origin?: string) => {
  const allowedOrigins = getAllowedOrigins();
  const allowedOrigin =
    origin && allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
};

const messages: Message[] = [];

/**
 * Handles incoming POST requests to interact with the AgentKit-powered AI agent.
 * This function processes user messages and streams responses from the agent.
 *
 * @function POST
 * @param {Request & { json: () => Promise<AgentRequest> }} req - The incoming request object containing the user message.
 * @returns {Promise<NextResponse<AgentResponse>>} JSON response containing the AI-generated reply or an error message.
 *
 * @description Sends a single message to the agent and returns the agents' final response.
 *
 * @example
 * const response = await fetch("/api/agent", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ userMessage: input }),
 * });
 */
export async function POST(
  req: Request & { json: () => Promise<AgentRequest> }
): Promise<NextResponse<AgentResponse>> {
  const origin = req.headers.get("origin") || undefined;
  const corsHeaders = getCorsHeaders(origin);

  try {
    // 1️. Extract user message from the request body
    const { userMessage } = await req.json();

    // 2. Get the agent
    const agent = await createAgent();

    // 3.Start streaming the agent's response
    messages.push({ id: generateId(), role: "user", content: userMessage });
    const { text, toolResults } = await generateText({
      ...agent,
      messages,
    });

    // 4. Add the agent's response to the messages
    messages.push({ id: generateId(), role: "assistant", content: text });

    // 5. Extract QR code from tool results if available
    let qrCode: string | undefined = undefined;
    if (toolResults && Array.isArray(toolResults)) {
      for (const result of toolResults) {
        try {
          const toolResult = result as any;
          if (toolResult && toolResult.result && toolResult.result.qrCode) {
            qrCode = toolResult.result.qrCode;
            break;
          }
        } catch (e) {
          // Skip if result doesn't have expected structure
          continue;
        }
      }
    }

    // 6️. Return the final response
    return NextResponse.json(
      { response: text, qrCode },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "I'm sorry, I encountered an issue processing your message. Please try again later.",
      },
      { headers: corsHeaders }
    );
  }
}

// Handle preflight OPTIONS request
export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin") || undefined;
  const corsHeaders = getCorsHeaders(origin);
  return new Response(null, { status: 200, headers: corsHeaders });
}
