import { NextResponse } from 'next/server';
import { EmailService } from '@/mastra/services/email.service';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit') || '10');
    const force = searchParams.get('forceRefresh') === 'true';
    const emails = await EmailService.getUnreadEmails(undefined, force);
    return NextResponse.json({ data: emails.slice(0, Math.max(0, limit)) });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch emails' }, { status: 500 });
  }
}
