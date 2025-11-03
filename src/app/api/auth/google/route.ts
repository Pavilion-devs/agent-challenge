import { NextResponse } from 'next/server';
import { getAuthUrl } from '@/mastra/auth/google-auth';

export async function GET() {
  try {
    const url = getAuthUrl();
    return NextResponse.redirect(url);
  } catch (err: any) {
    return new NextResponse(`Failed to initiate Google OAuth: ${err?.message || 'unknown error'}`, { status: 500 });
  }
}
