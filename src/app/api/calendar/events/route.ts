import { NextResponse } from 'next/server';
import { CalendarService } from '@/mastra/services/calendar.service';
import { createEventTool } from '@/mastra/tools/calendar.tool';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const force = searchParams.get('forceRefresh') === 'true';
    const events = await CalendarService.getEvents(undefined, force);
    return NextResponse.json({ data: events });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch calendar events' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, start, end, location, description } = body;
    
    const result = await createEventTool.execute({
      context: { title, start, end, location, description }
    } as any);
    
    // Force cache refresh after creating an event
    await CalendarService.refreshCache();
    
    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Failed to create event' }, { status: 500 });
  }
}
