import { ApifyClient } from 'apify-client';
import { createClient } from '@supabase/supabase-js';
import * as cheerio from 'cheerio';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function manualSync() {
  console.log('Starting manual sync...');
  const apifyToken = process.env.APIFY_API_TOKEN;
  let fbBaseUrl = process.env.FACEBOOK_PAGE_USERNAME || 'https://www.facebook.com/ingraham.methodist';

  const client = new ApifyClient({ token: apifyToken });

  console.log(`Running Apify Actor for ${fbBaseUrl}...`);
  let run;
  try {
    run = await client.actor('apify/facebook-posts-scraper').call({
      startUrls: [{ url: fbBaseUrl }],
      resultsLimit: 5,
    });
  } catch (e) {
    console.error('Apify call failed:', e);
    return;
  }

  console.log('Actor finished. Fetching dataset...', run.defaultDatasetId);
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  
  let isLive = false;
  let liveVideoId: string | null = null;
  let liveTitle: string | null = null;
  let liveEmbedUrl: string | null = null;
  let platform: string | null = null;
  let liveThumbnailUrl: string | null = null;

  const pastSermons: any[] = [];

  if (items && items.length > 0) {
    for (const rawItem of items as Record<string, unknown>[]) {
      const item = rawItem as any;
      const isVideo = item.video || item.videoUrl || item.type === 'video' || item.url?.includes('/videos/');
      
      if (!isVideo) continue;
      
      const text = item.text || item.title || '';
      const currentlyLive = text.toLowerCase().includes('is live') || item.isLive === true;
      
      const match = item.url?.match(/\/videos\/(\d+)/);
      const videoId = match ? match[1] : null;

      if (currentlyLive && !isLive) {
        isLive = true;
        platform = 'facebook';
        liveVideoId = videoId;
        liveTitle = text.substring(0, 50) + (text.length > 50 ? '...' : '');
        if (videoId) {
          liveEmbedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(item.url)}&show_text=false`;
        }
      } else if (pastSermons.length < 2 && videoId) {
        pastSermons.push({
          video_id: videoId,
          title: text.substring(0, 80) + (text.length > 80 ? '...' : ''),
          thumbnail_url: item.imageUrl || item.thumbnail || 'https://images.unsplash.com/photo-1438283173091-5dbf5c5a3206?q=80&w=1000',
          published_at: item.time || item.date || new Date().toISOString(),
          video_url: item.url,
        });
      }
    }
  }

  // Fallbacks omitted for brevity, focusing on Facebook
  
  console.log('Facebook Live?', isLive);
  console.log('Facebook Past Sermons:', pastSermons);

  console.log('Updating Supabase...');
  const { error: liveError } = await supabaseAdmin
    .from('live_status')
    .update({
      is_live: isLive,
      platform,
      video_id: liveVideoId,
      embed_url: liveEmbedUrl,
      title: liveTitle,
      thumbnail_url: liveThumbnailUrl,
      last_checked: new Date().toISOString(),
    })
    .eq('id', 1);

  if (liveError) console.error('Live status error:', liveError);

  if (pastSermons.length > 0) {
    const { error: pastError } = await supabaseAdmin
      .from('past_sermons')
      .upsert(pastSermons, { onConflict: 'video_id' });
    if (pastError) console.error('Past sermons error:', pastError);
  }

  console.log('Done!');
}

manualSync().catch(console.error);
