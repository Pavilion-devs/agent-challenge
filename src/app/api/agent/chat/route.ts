import { NextResponse } from 'next/server';
import { workspaceAgent } from '@/mastra/agents';

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Build conversation history
    const messages = [
      ...(Array.isArray(history) ? history.slice(-10) : []), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    const result = await workspaceAgent.generateVNext(messages, { format: 'aisdk' });

    return NextResponse.json({
      success: true,
      data: {
        text: result.text || '',
        toolCalls: result.toolCalls || []
      }
    });
  } catch (err: any) {
    console.error('Chat error:', err);
    return NextResponse.json({
      success: false,
      error: err?.message || 'Failed to process chat'
    }, { status: 500 });
  }
}

