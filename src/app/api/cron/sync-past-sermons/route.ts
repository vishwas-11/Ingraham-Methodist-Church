import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/utils/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return NextResponse.json({ error: 'Missing YouTube credentials' }, { status: 500 });
  }

  // The uploads playlist ID is typically the channel ID with 'UC' replaced by 'UU'
  const uploadsPlaylistId = process.env.YOUTUBE_UPLOADS_PLAYLIST_ID || channelId.replace(/^UC/, 'UU');

  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${uploadsPlaylistId}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      console.error('YouTube API error:', data);
      return NextResponse.json({ error: 'Failed to fetch from YouTube' }, { status: res.status });
    }

    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ success: true, message: 'No videos found' });
    }

    const sermonsToInsert = data.items.map((item: any) => {
      const snippet = item.snippet;
      return {
        video_id: snippet.resourceId.videoId,
        title: snippet.title,
        // use maxres if available, fallback to high
        thumbnail_url: snippet.thumbnails?.maxres?.url || snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
        published_at: snippet.publishedAt,
        video_url: `https://www.youtube.com/watch?v=${snippet.resourceId.videoId}`,
      };
    });

    // Upsert into Supabase
    const { error } = await supabaseAdmin
      .from('past_sermons')
      .upsert(sermonsToInsert, { onConflict: 'video_id' });

    if (error) {
      console.error('Supabase upsert error:', error);
      return NextResponse.json({ error: 'Failed to save sermons to database' }, { status: 500 });
    }

    // Optionally: delete old sermons to keep the table small, but upsert limits it inherently if we don't care about old rows.
    // If we want exactly the latest 12, we could delete where not in this list. But keeping historical is fine.

    return NextResponse.json({
      success: true,
      count: sermonsToInsert.length,
    });
  } catch (error: any) {
    console.error('Sync sermons error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
