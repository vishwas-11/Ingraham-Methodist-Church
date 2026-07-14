import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio'; // We'll use cheerio to parse XML easily

// Initialize Supabase admin client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: Request) {
  // YouTube sends a GET request to verify the subscription
  const url = new URL(request.url);
  const challenge = url.searchParams.get('hub.challenge');
  const mode = url.searchParams.get('hub.mode');

  if (mode === 'subscribe' || mode === 'unsubscribe') {
    if (challenge) {
      console.log(`YouTube Webhook ${mode} successful.`);
      return new NextResponse(challenge, { status: 200, headers: { 'Content-Type': 'text/plain' } });
    }
  }

  return new NextResponse('Invalid Request', { status: 400 });
}

export async function POST(request: Request) {
  try {
    // YouTube sends the feed as XML
    const xmlData = await request.text();
    const $ = cheerio.load(xmlData, { xmlMode: true });

    // The feed contains an <entry> tag with the video details
    const entry = $('entry');
    if (!entry.length) {
      // This might be a deleted video ping or empty feed
      return new NextResponse('No entry found', { status: 200 });
    }

    const videoId = entry.find('yt\\:videoId').text();
    const title = entry.find('title').text();

    if (!videoId) {
      return new NextResponse('No video ID found', { status: 200 });
    }

    console.log(`Received YouTube Webhook for video ID: ${videoId} - ${title}`);

    // Fetch precise video details from YouTube API (costs 1 quota unit)
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    if (!YOUTUBE_API_KEY) {
      throw new Error('Missing YOUTUBE_API_KEY');
    }

    const ytUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
    const ytRes = await fetch(ytUrl, { next: { revalidate: 0 } });
    const ytData = await ytRes.json();

    if (ytRes.ok && ytData.items && ytData.items.length > 0) {
      const video = ytData.items[0];
      const snippet = video.snippet;

      const isLive = snippet.liveBroadcastContent === 'live';
      const isUpcoming = snippet.liveBroadcastContent === 'upcoming';
      
      const thumbnailUrl = snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url;
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      // 1. Update Live Status if it's currently live
      if (isLive) {
        await supabaseAdmin
          .from('live_status')
          .update({
            is_live: true,
            platform: 'youtube',
            video_id: videoId,
            embed_url: embedUrl,
            title: snippet.title,
            thumbnail_url: thumbnailUrl,
            last_checked: new Date().toISOString(),
          })
          .eq('id', 1);
        console.log(`Live stream detected! Updated live_status.`);
      } else {
        // If we get a ping and it's not live, it means a stream ended or a VOD was uploaded
        // Ensure live_status is set to false if this video was previously marked as live
        const { data: currentLive } = await supabaseAdmin.from('live_status').select('video_id, is_live').eq('id', 1).single();
        if (currentLive?.is_live && currentLive.video_id === videoId) {
          await supabaseAdmin.from('live_status').update({ is_live: false }).eq('id', 1);
          console.log(`Stream ended. Updated live_status to false.`);
        }
      }

      // 2. Add to Past Sermons if it's NOT upcoming (i.e. it's live or completed)
      if (!isUpcoming) {
        await supabaseAdmin
          .from('past_sermons')
          .upsert({
            video_id: videoId,
            title: snippet.title,
            thumbnail_url: thumbnailUrl,
            published_at: snippet.publishedAt,
            video_url: videoUrl,
          }, { onConflict: 'video_id' });
        console.log(`Upserted ${videoId} to past_sermons.`);
      }
    }

    return new NextResponse('Webhook Processed', { status: 200 });
  } catch (error: unknown) {
    console.error('YouTube Webhook Error:', error);
    return new NextResponse(`Webhook Error: ${(error as Error).message}`, { status: 500 });
  }
}
