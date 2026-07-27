import { NextResponse } from 'next/server';
import { syncPastSermonsFromYouTube, autoRenewYouTubeSubscription } from '@/utils/youtube-sync';

export async function GET(request: Request) {
  try {
    // Verify cron secret
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret') || request.headers.get('Authorization')?.split('Bearer ')[1];
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && secret !== cronSecret && process.env.NODE_ENV === 'production') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // 1. Sync latest past sermons with actual start dates
    const result = await syncPastSermonsFromYouTube();

    // 2. Auto-renew YouTube PubSubHubbub subscription so webhooks never expire
    await autoRenewYouTubeSubscription();

    return NextResponse.json({ success: true, count: result.count });
  } catch (error: unknown) {
    console.error('Sync sermons trigger error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
