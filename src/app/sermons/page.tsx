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

  // Verification check: If DB says live, verify with YouTube API to prevent stuck "live" state
  if (liveStatus?.is_live) {
    try {
      const liveCheck = await checkLiveStatusFromYouTube();
      if (!liveCheck.isLive && liveStatus) {
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
