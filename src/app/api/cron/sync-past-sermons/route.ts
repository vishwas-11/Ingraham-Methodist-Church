import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: Request) {
  try {
    // Verify cron secret
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

    // Fetch past sermons from YouTube
    const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=10&order=date&type=video&key=${YOUTUBE_API_KEY}`;
    const ytRes = await fetch(ytUrl, { next: { revalidate: 0 } });
    const ytData = await ytRes.json();

    const pastSermons: Record<string, unknown>[] = [];

    if (ytRes.ok && ytData.items && ytData.items.length > 0) {
      ytData.items.forEach((item: Record<string, unknown>) => {
        const snippet = (item as any).snippet;
        pastSermons.push({
          video_id: snippet.resourceId?.videoId || (item as any).id?.videoId,
          title: snippet.title,
          thumbnail_url: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
          published_at: snippet.publishedAt,
          video_url: `https://www.youtube.com/watch?v=${snippet.resourceId?.videoId || (item as any).id?.videoId}`,
        });
      });
    }

    console.log(`Fetched ${pastSermons.length} past sermons from YouTube`);

    if (pastSermons.length > 0) {
      const { error: pastError } = await supabaseAdmin
        .from('past_sermons')
        .upsert(pastSermons, { onConflict: 'video_id' });

      if (pastError) {
        throw new Error(`Supabase upsert error: ${pastError.message}`);
      }
    }

    return NextResponse.json({ success: true, count: pastSermons.length });
  } catch (error: unknown) {
    console.error('Sync sermons trigger error:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
