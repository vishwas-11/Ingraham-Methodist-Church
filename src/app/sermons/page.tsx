import { createClient } from '@/utils/supabase/server';
import SermonsClient from './SermonsClient';

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
  const { data: pastSermons } = await supabase
    .from('past_sermons')
    .select('*')
    .order('published_at', { ascending: false });

  return (
    <SermonsClient 
      initialLiveStatus={liveStatus || null} 
      initialPastSermons={pastSermons || []} 
    />
  );
}
