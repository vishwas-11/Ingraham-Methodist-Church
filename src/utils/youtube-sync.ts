import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Pinned special event videos that must NEVER be pruned or deleted.
 */
export const PINNED_VIDEO_IDS = [
  'rpkZTkKgxIY', // Christmas Nativity Play - Ingraham Methodist Church
  'Y0PkEdIJ4rs', // Ingraham methodist church (Cantata Service) 2025
  'xTB8dUJVu-I', // मां की अहमियत - Worship Team
  '5sgD1SsmAEw', // Easter Play 2025 by Worship Team
];

/**
 * Prunes unpinned sermons so that total count in past_sermons table never exceeds 10.
 * The 4 special event pinned videos are NEVER deleted.
 */
export async function prunePastSermons() {
  try {
    const { data: allSermons, error } = await supabaseAdmin
      .from('past_sermons')
      .select('id, video_id, published_at')
      .order('published_at', { ascending: false });

    if (error || !allSermons) return;

    if (allSermons.length > 10) {
      const unpinned = allSermons.filter(s => !PINNED_VIDEO_IDS.includes(s.video_id));
      const pinned = allSermons.filter(s => PINNED_VIDEO_IDS.includes(s.video_id));

      const maxUnpinnedAllowed = Math.max(0, 10 - pinned.length);

      if (unpinned.length > maxUnpinnedAllowed) {
        const toDelete = unpinned.slice(maxUnpinnedAllowed);
        const idsToDelete = toDelete.map(s => s.id);

        if (idsToDelete.length > 0) {
          await supabaseAdmin
            .from('past_sermons')
            .delete()
            .in('id', idsToDelete);
          console.log(`[Auto-Prune] Pruned ${idsToDelete.length} old unpinned sermons from database.`);
        }
      }
    }
  } catch (err) {
    console.error('Error pruning old sermons:', err);
  }
}

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
 * Verifies live broadcast status directly with YouTube API.
 * If an active live broadcast is found, sets is_live = true.
 * Otherwise, sets is_live = false in Supabase.
 */
export async function checkLiveStatusFromYouTube() {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) return { isLive: false };

  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`;
    const ytRes = await fetch(searchUrl, { next: { revalidate: 0 } });
    const ytData = await ytRes.json();

    let isLive = false;
    let videoId: string | null = null;
    let title: string | null = null;
    let embedUrl: string | null = null;
    let thumbnailUrl: string | null = null;

    if (ytRes.ok && ytData.items && Array.isArray(ytData.items) && ytData.items.length > 0) {
      const activeStream = ytData.items[0];
      const foundId = activeStream.id?.videoId;

      if (foundId) {
        const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${foundId}&key=${YOUTUBE_API_KEY}`;
        const detailsRes = await fetch(detailsUrl, { next: { revalidate: 0 } });
        const detailsData = await detailsRes.json();

        if (detailsRes.ok && detailsData.items && detailsData.items.length > 0) {
          const video = detailsData.items[0];
          if (video.snippet?.liveBroadcastContent === 'live') {
            isLive = true;
            videoId = foundId;
            title = video.snippet.title;
            embedUrl = `https://www.youtube.com/embed/${foundId}?autoplay=1`;
            thumbnailUrl = video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.default?.url;
          }
        }
      }
    }

    // Update Supabase
    await supabaseAdmin
      .from('live_status')
      .update({
        is_live: isLive,
        platform: isLive ? 'youtube' : null,
        video_id: isLive ? videoId : null,
        embed_url: isLive ? embedUrl : null,
        title: isLive ? title : null,
        thumbnail_url: isLive ? thumbnailUrl : null,
        last_checked: new Date().toISOString(),
      })
      .eq('id', 1);

    return { isLive, videoId, title };
  } catch (err) {
    console.error('Error verifying live status from YouTube:', err);
    return { isLive: false };
  }
}

/**
 * Syncs the latest past sermons from YouTube API into Supabase with accurate live start dates,
 * and automatically prunes unpinned sermons to maintain a strict max capacity of 10 sermons.
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

    // Auto-prune old unpinned sermons to keep total DB records capped at 10
    await prunePastSermons();
  }

  return { count: pastSermons.length, sermons: pastSermons };
}
