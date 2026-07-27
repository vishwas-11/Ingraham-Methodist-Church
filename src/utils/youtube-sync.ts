import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Auto-renews the YouTube PubSubHubbub subscription so webhooks never expire.
 */
export async function autoRenewYouTubeSubscription() {
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
  if (!CHANNEL_ID) return;

  const CALLBACK_URL = 'https://ingraham-methodist-church.vercel.app/api/webhooks/youtube';
  const TOPIC_URL = `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const HUB_URL = 'https://pubsubhubbub.appspot.com/subscribe';

  const formData = new URLSearchParams();
  formData.append('hub.callback', CALLBACK_URL);
  formData.append('hub.topic', TOPIC_URL);
  formData.append('hub.verify', 'async');
  formData.append('hub.mode', 'subscribe');

  try {
    const res = await fetch(HUB_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    if (res.ok) {
      console.log('[Auto-Renew] YouTube Webhook subscription renewed successfully.');
    }
  } catch (err) {
    console.error('[Auto-Renew] Failed to renew YouTube webhook subscription:', err);
  }
}

/**
 * Syncs the latest 10 past sermons from YouTube API into Supabase with accurate live start dates.
 */
export async function syncPastSermonsFromYouTube() {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) return { count: 0 };

  const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&maxResults=10&order=date&type=video&key=${YOUTUBE_API_KEY}`;
  const ytRes = await fetch(ytUrl, { next: { revalidate: 0 } });
  const ytData = await ytRes.json();

  if (!ytRes.ok || !ytData.items || !Array.isArray(ytData.items) || ytData.items.length === 0) {
    return { count: 0 };
  }

  const videoIds = ytData.items
    .map((item: Record<string, unknown>) => (item.id as Record<string, string>)?.videoId)
    .filter(Boolean);

  const videoDetailsMap: Record<string, { actualStartTime?: string; scheduledStartTime?: string }> = {};

  if (videoIds.length > 0) {
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoIds.join(',')}&key=${YOUTUBE_API_KEY}`;
    const detailsRes = await fetch(detailsUrl, { next: { revalidate: 0 } });
    const detailsData = await detailsRes.json();

    if (detailsRes.ok && detailsData.items && Array.isArray(detailsData.items)) {
      for (const vid of detailsData.items) {
        videoDetailsMap[vid.id] = {
          actualStartTime: vid.liveStreamingDetails?.actualStartTime,
          scheduledStartTime: vid.liveStreamingDetails?.scheduledStartTime,
        };
      }
    }
  }

  const pastSermons = ytData.items.map((item: Record<string, unknown>) => {
    const idObj = item.id as Record<string, string>;
    const videoId = idObj.videoId;
    const snippet = item.snippet as Record<string, unknown>;
    const thumbnails = snippet.thumbnails as Record<string, Record<string, string>>;
    const details = videoDetailsMap[videoId];

    const actualPublishedAt = details?.actualStartTime || details?.scheduledStartTime || (snippet.publishedAt as string);

    return {
      video_id: videoId,
      title: snippet.title,
      thumbnail_url: thumbnails.high?.url || thumbnails.default?.url,
      published_at: actualPublishedAt,
      video_url: `https://www.youtube.com/watch?v=${videoId}`,
    };
  });

  if (pastSermons.length > 0) {
    await supabaseAdmin
      .from('past_sermons')
      .upsert(pastSermons, { onConflict: 'video_id' });
  }

  return { count: pastSermons.length, sermons: pastSermons };
}
