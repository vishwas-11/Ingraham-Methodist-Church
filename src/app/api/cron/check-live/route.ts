import { NextResponse } from 'next/server';
import { checkLiveStatusFromYouTube, autoRenewYouTubeSubscription } from '@/utils/youtube-sync';

export async function GET(request: Request) {
  try {
    // 1. Verify cron secret
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret') || request.headers.get('Authorization')?.split('Bearer ')[1];
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && secret !== cronSecret && process.env.NODE_ENV === 'production') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // 2. Check live status directly with YouTube API
    const result = await checkLiveStatusFromYouTube();

    // 3. Auto-renew YouTube Webhook subscription
    await autoRenewYouTubeSubscription();

    return NextResponse.json({ success: true, isLive: result.isLive, videoId: result.videoId });
  } catch (error: unknown) {
    console.error('Check live error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
