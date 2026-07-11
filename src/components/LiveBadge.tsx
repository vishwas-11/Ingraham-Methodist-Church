'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function LiveBadge() {
  const [isLive, setIsLive] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // Initial fetch
    const fetchStatus = async () => {
      const { data } = await supabase
        .from('live_status')
        .select('is_live')
        .eq('id', 1)
        .single();
        
      if (data) {
        setIsLive(data.is_live);
      }
    };
    fetchStatus();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('schema-db-changes-badge')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'live_status',
          filter: 'id=eq.1',
        },
        (payload) => {
          setIsLive((payload.new as any).is_live);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  if (!isLive) return null;

  return (
    <a href="/sermons" className="inline-flex items-center gap-2 bg-red-600/90 text-white px-4 py-1.5 rounded-full font-label-md hover:bg-red-500 transition-colors shadow-lg animate-pulse-glow cursor-pointer mb-6 border border-red-400">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
      </span>
      <span>WE'RE LIVE</span>
    </a>
  );
}
