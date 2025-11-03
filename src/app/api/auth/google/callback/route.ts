import { NextResponse } from 'next/server';
import { getTokensFromCode } from '@/mastra/auth/google-auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/auth/callback?error=no_code', process.env.FRONTEND_URL || 'http://localhost:3000'));
  }

  try {
    const tokens = await getTokensFromCode(code);

    // For local dev, just redirect back to dashboard.
    const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';
    const url = new URL('/dashboard?auth=success', frontend);

    return NextResponse.redirect(url);
  } catch (err: any) {
    const frontend = process.env.FRONTEND_URL || 'http://localhost:3000';
    return NextResponse.redirect(new URL(`/auth/callback?error=${encodeURIComponent(err?.message || 'oauth_error')}`, frontend));
  }
}
