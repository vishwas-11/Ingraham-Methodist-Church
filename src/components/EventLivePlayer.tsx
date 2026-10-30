'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export interface LiveStatusData {
  id?: number;
  is_live: boolean;
  platform: string | null;
  video_id: string | null;
  embed_url: string | null;
  title: string | null;
  thumbnail_url: string | null;
}

interface EventLivePlayerProps {
  initialLiveStatus: LiveStatusData | null;
  eventSlug: string;
}

export default function EventLivePlayer({
  initialLiveStatus,
  eventSlug,
}: EventLivePlayerProps) {
  const [liveStatus, setLiveStatus] = useState<LiveStatusData | null>(initialLiveStatus);
  const supabase = createClient();

  useEffect(() => {
    // Initial client fetch
    const fetchStatus = async () => {
      try {
        const { data } = await supabase
          .from('live_status')
          .select('*')
          .eq('id', 1)
          .single();
        if (data) {
          setLiveStatus(data as LiveStatusData);
        }
      } catch (err) {
        console.error('Failed to fetch event live status:', err);
      }
    };
    fetchStatus();

    // Subscribe to realtime live_status changes
    const channel = supabase
      .channel(`live-status-event-${eventSlug}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'live_status',
          filter: 'id=eq.1',
        },
        (payload) => {
          setLiveStatus(payload.new as LiveStatusData);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, eventSlug]);

  const isLive = Boolean(liveStatus?.is_live && liveStatus?.embed_url);

  if (!isLive) return null;

  return (
    <div className="mb-10 rounded-[24px] overflow-hidden border-2 border-[#CDAA63] shadow-[0_12px_40px_rgba(59,11,20,0.35)] bg-[#1A0307]">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-[#3B0B14] via-[#6B1426] to-[#3B0B14] text-[#F4E7D3] px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-[#CDAA63]/30">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.9)]"></span>
          </span>
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-white bg-red-600/90 px-2.5 py-0.5 rounded-full border border-red-400/40">
            WE&apos;RE LIVE
          </span>
          <span className="font-serif font-bold text-sm md:text-base text-[#F4E7D3] line-clamp-1">
            {liveStatus?.title || 'Live Broadcast in Progress'}
          </span>
        </div>
        <Link
          href="/sermons"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#CDAA63] hover:text-[#FFF8E6] transition-colors"
        >
          Watch on Sermons Platform
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>

      {/* 16:9 Video Embed */}
      <div className="w-full aspect-video bg-black relative">
        <iframe
          src={liveStatus!.embed_url!}
          className="w-full h-full absolute inset-0"
          title={liveStatus?.title || 'Live Stream'}
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  );
}
