import { NextResponse } from 'next/server';
import { TaskService } from '@/mastra/services/task.service';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const priority = searchParams.get('priority') || undefined;
    const tasks = await TaskService.getTasks(undefined, { status, priority });
    return NextResponse.json({ data: tasks });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const task = await TaskService.createTask(body);
    return NextResponse.json({ success: true, data: task });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Failed to create task' }, { status: 500 });
  }
}
