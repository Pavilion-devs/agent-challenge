import { NextResponse } from 'next/server';
import { workspaceAgent } from '@/mastra/agents';

export async function POST() {
  try {
    const result = await workspaceAgent.generateVNext([
      { role: 'user', content: 'Generate my daily summary from calendar, emails, and tasks.' }
    ], { format: 'aisdk' });

    return NextResponse.json({ data: { text: result.text || '' } });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to generate summary' }, { status: 500 });
  }
}
