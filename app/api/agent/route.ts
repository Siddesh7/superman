import { NextResponse } from "next/server";
// import { createAgent } from "./create-agent";
import { AgentKit } from "@coinbase/agentkit";
import { createAgent } from "./create-agent";

export type AgentRequest = { userMessage: string };

export type AgentResponse = {
    response?: string;
    error?: string;
    status?: string;
    agentInstance?: AgentKit;
};

export async function GET(

): Promise<NextResponse<AgentResponse>> {
    try {
        // 2. Get the agent
        const agentInstance = await createAgent();

        // 3. Process the user message with the agent
        // TODO: Implement actual message processing with agentInstance
        const response = `Received message:`;

        return NextResponse.json({
            status: "success",
            response,
            agentInstance
        });

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({
            error:
                error instanceof Error
                    ? error.message
                    : "I'm sorry, I encountered an issue processing your message. Please try again later.",
        });
    }
}
