import { createClient } from '@/utils/supabase/server';
import SermonsClient from './SermonsClient';
import { syncPastSermonsFromYouTube, checkLiveStatusFromYouTube } from '@/utils/youtube-sync';

// Disable static rendering for this page to always fetch fresh initial data
export const dynamic = 'force-dynamic';

export default async function Sermons() {
  const supabase = await createClient();

  // Fetch initial live status
  let { data: liveStatus } = await supabase
    .from('live_status')
    .select('*')
    .eq('id', 1)
    .single();

  // Determine if we're in the church hours window (Sunday 9 AM–1 PM IST)
  const now = new Date();
  const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const isSunday = istTime.getDay() === 0;
  const hour = istTime.getHours();
  const isDuringChurchHours = isSunday && hour >= 9 && hour < 13;

  // During church hours: ALWAYS check YouTube for live streams (catches new streams even if DB says false)
  // Outside church hours: only verify if DB says live (prevents stuck "live" state)
  const shouldCheckYouTube = isDuringChurchHours || liveStatus?.is_live;

  if (shouldCheckYouTube) {
    try {
      const liveCheck = await checkLiveStatusFromYouTube();
      if (liveCheck.isLive && liveStatus) {
        // YouTube says live — update local state for SSR
        liveStatus.is_live = true;
        liveStatus.video_id = liveCheck.videoId ?? liveStatus.video_id;
        // Re-fetch full live_status from Supabase since checkLiveStatusFromYouTube updated it
        const { data: freshLiveStatus } = await supabase
          .from('live_status')
          .select('*')
          .eq('id', 1)
          .single();
        if (freshLiveStatus) {
          liveStatus = freshLiveStatus;
        }
      } else if (!liveCheck.isLive && liveStatus) {
        liveStatus.is_live = false;
      }
    } catch (e) {
      console.error('Failed to verify live status on load:', e);
    }
  }

  // Fetch past sermons (latest 10 max)
  let { data: pastSermons } = await supabase
    .from('past_sermons')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(10);

  // Auto-heal check: If pastSermons is empty or older than 6 days, auto-sync from YouTube
  const SIX_DAYS_MS = 6 * 24 * 60 * 60 * 1000;
  const isOutdated = !pastSermons || pastSermons.length === 0 || 
    (pastSermons[0]?.published_at && (Date.now() - new Date(pastSermons[0].published_at).getTime() > SIX_DAYS_MS));

  if (isOutdated) {
    try {
      await syncPastSermonsFromYouTube();
      const { data: freshSermons } = await supabase
        .from('past_sermons')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(10);
      if (freshSermons && freshSermons.length > 0) {
        pastSermons = freshSermons;
      }
    } catch (err) {
      console.error('Auto-heal sermon sync failed:', err);
    }
  }

  return (
    <SermonsClient 
      initialLiveStatus={liveStatus || null} 
      initialPastSermons={pastSermons || []} 
    />
  );
}
