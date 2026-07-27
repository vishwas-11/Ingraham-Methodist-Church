import { createClient } from '@/utils/supabase/server';
import SermonsClient from './SermonsClient';
import { syncPastSermonsFromYouTube } from '@/utils/youtube-sync';

// Disable static rendering for this page to always fetch fresh initial data
export const dynamic = 'force-dynamic';

export default async function Sermons() {
  const supabase = await createClient();

  // Fetch initial live status
  const { data: liveStatus } = await supabase
    .from('live_status')
    .select('*')
    .eq('id', 1)
    .single();

  // Fetch past sermons (latest first)
  let { data: pastSermons } = await supabase
    .from('past_sermons')
    .select('*')
    .order('published_at', { ascending: false });

  // Auto-heal check: If pastSermons is empty or older than 6 days, auto-sync from YouTube in background
  const SIX_DAYS_MS = 6 * 24 * 60 * 60 * 1000;
  const isOutdated = !pastSermons || pastSermons.length === 0 || 
    (pastSermons[0]?.published_at && (Date.now() - new Date(pastSermons[0].published_at).getTime() > SIX_DAYS_MS));

  if (isOutdated) {
    try {
      await syncPastSermonsFromYouTube();
      const { data: freshSermons } = await supabase
        .from('past_sermons')
        .select('*')
        .order('published_at', { ascending: false });
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
