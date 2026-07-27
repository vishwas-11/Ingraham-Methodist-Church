import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { autoRenewYouTubeSubscription } from '@/utils/youtube-sync';

// Initialize Supabase admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: Request) {
  try {
    // 1. Verify cron secret
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret') || request.headers.get('Authorization')?.split('Bearer ')[1];
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && secret !== cronSecret && process.env.NODE_ENV === 'production') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

    if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
      return NextResponse.json({ error: 'Missing YouTube API credentials' }, { status: 500 });
    }

    // Check YouTube for live streams
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`;
    const ytRes = await fetch(searchUrl, { next: { revalidate: 0 } });
    const ytData = await ytRes.json();

    let isLive = false;
    let platform = null;
    let videoId = null;
    let embedUrl = null;
    let title = null;
    let thumbnailUrl = null;

    if (ytRes.ok && ytData.items && ytData.items.length > 0) {
      const activeStream = ytData.items[0];
      isLive = true;
      platform = 'youtube';
      videoId = activeStream.id.videoId;
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      title = activeStream.snippet.title;
      thumbnailUrl = activeStream.snippet.thumbnails?.high?.url || activeStream.snippet.thumbnails?.default?.url;

      // Fetch video details for accurate stream start date
      try {
        const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
        const detailsRes = await fetch(detailsUrl, { next: { revalidate: 0 } });
        const detailsData = await detailsRes.json();
        let publishedAt = activeStream.snippet.publishedAt;

        if (detailsRes.ok && detailsData.items && detailsData.items.length > 0) {
          const liveDetails = detailsData.items[0].liveStreamingDetails;
          publishedAt = liveDetails?.actualStartTime || liveDetails?.scheduledStartTime || publishedAt;
        }

        await supabaseAdmin
          .from('past_sermons')
          .upsert({
            video_id: videoId,
            title,
            thumbnail_url: thumbnailUrl,
            published_at: publishedAt,
            video_url: `https://www.youtube.com/watch?v=${videoId}`,
          }, { onConflict: 'video_id' });
      } catch (err) {
        console.error('Failed to sync live stream into past_sermons:', err);
      }
    }

    console.log('YouTube Live Status:', isLive ? `Live: ${title}` : 'Offline');

    // Update Supabase
    const { error: dbError } = await supabaseAdmin
      .from('live_status')
      .update({
        is_live: isLive,
        platform,
        video_id: videoId,
        embed_url: embedUrl,
        title,
        thumbnail_url: thumbnailUrl,
        last_checked: new Date().toISOString(),
      })
      .eq('id', 1);

    if (dbError) {
      throw new Error(`Supabase update error: ${dbError.message}`);
    }

    // Auto-renew YouTube Webhook subscription
    await autoRenewYouTubeSubscription();

    return NextResponse.json({ success: true, isLive, platform });
  } catch (error: unknown) {
    console.error('Check live error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
