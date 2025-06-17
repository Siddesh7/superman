import { NextResponse } from 'next/server';
import { createAgent } from './create-agent';

export async function POST(request: Request) {
    try {
        // 1️. Extract user message from the request body
        const { userMessage } = await request.json();

        // Process the request
        // Add your business logic here

        const agent = await createAgent();

        // Return success response
        return NextResponse.json(
            {
                success: true,
                data: {
                    message: 'Request processed successfully',
                    agent: agent
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Invalid request data',
                details: error,
            },
            { status: 400 }
        );
    }
}
