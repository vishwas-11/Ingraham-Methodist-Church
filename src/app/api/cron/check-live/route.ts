import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { checkLiveStatusFromYouTube, autoRenewYouTubeSubscription } from '@/utils/youtube-sync';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET(request: Request) {
  try {
    // 1. Verify cron secret (skip auth for client-side polling calls that don't include a secret)
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret') || request.headers.get('Authorization')?.split('Bearer ')[1];
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && secret !== cronSecret && process.env.NODE_ENV === 'production') {
      // Allow unauthenticated calls only during church hours (Sunday 9 AM–1 PM IST)
      const now = new Date();
      const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const isSunday = istTime.getDay() === 0;
      const hour = istTime.getHours();
      const isDuringChurchHours = isSunday && hour >= 9 && hour < 13;

      if (!isDuringChurchHours) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
    }

    // 2. Smart pause: if Supabase already says live, skip the YouTube API call to save quota
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    const { data: currentStatus } = await supabaseAdmin
      .from('live_status')
      .select('is_live')
      .eq('id', 1)
      .single();

    if (currentStatus?.is_live) {
      return NextResponse.json({ success: true, isLive: true, skipped: true });
    }

    // 3. Check live status directly with YouTube API
    const result = await checkLiveStatusFromYouTube();

    // 4. Auto-renew YouTube Webhook subscription
    await autoRenewYouTubeSubscription();

    return NextResponse.json({ success: true, isLive: result.isLive, videoId: result.videoId });
  } catch (error: unknown) {
    console.error('Check live error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
