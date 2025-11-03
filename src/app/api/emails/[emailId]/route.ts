import { NextResponse } from 'next/server';
import { EmailService } from '@/mastra/services/email.service';

export async function GET(
  req: Request,
  context: { params: Promise<{ emailId: string }> }
) {
  try {
    const params = await context.params;
    const email = await EmailService.getEmailById(params.emailId);
    return NextResponse.json({ data: email });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Email not found' }, { status: 404 });
  }
}

