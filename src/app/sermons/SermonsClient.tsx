'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type LiveStatus = {
  is_live: boolean;
  platform: string | null;
  video_id: string | null;
  embed_url: string | null;
  title: string | null;
  thumbnail_url: string | null;
  last_checked?: string | null;
};

type PastSermon = {
  id: string;
  video_id: string;
  title: string;
  thumbnail_url: string;
  published_at: string;
  video_url: string;
};

export default function SermonsClient({
  initialLiveStatus,
  initialPastSermons,
}: {
  initialLiveStatus: LiveStatus | null;
  initialPastSermons: PastSermon[];
}) {
  const [liveStatus, setLiveStatus] = useState<LiveStatus | null>(initialLiveStatus);
  const [pastSermons, setPastSermons] = useState<PastSermon[]>(initialPastSermons);
  const supabase = createClient();

  useEffect(() => {
    // Subscribe to live_status changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'live_status',
          filter: 'id=eq.1',
        },
        (payload) => {
          setLiveStatus(payload.new as LiveStatus);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isCurrentlyLive = () => {
    if (!liveStatus?.is_live) return false;
    if (liveStatus.last_checked) {
      const hoursSinceCheck = (Date.now() - new Date(liveStatus.last_checked).getTime()) / (1000 * 60 * 60);
      return hoursSinceCheck < 4;
    }
    return true;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center -mt-[72px] bg-[#4A0F1A] overflow-hidden">
        {/* Subtle Spatial Glows on top of Maroon */}
        <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)] pointer-events-none"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[#CDAA63]/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f3e7d3] to-transparent z-10 pointer-events-none"></div>
        
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto mt-16">
          <div className="flex flex-col items-center mb-6 w-full">
            <span className="text-[#CDAA63] font-label-md tracking-[0.2em] uppercase text-[12px] md:text-[13px] mb-3" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>Teachings & Series</span>
            <div className="h-px w-32 bg-[rgba(205,170,99,0.35)]"></div>
          </div>
          <h1 className="font-display-lg text-[48px] md:text-[72px] leading-[1.05] text-[#F4E7D3] mb-6 animate-fade-in-up" style={{ textShadow: '0 4px 16px rgba(0,0,0,.3)' }}>
            Sermon Archive
          </h1>
          <p className="font-body-lg text-[#D9C7B3] max-w-2xl mx-auto animate-smooth-render" style={{ textShadow: '0 2px 8px rgba(0,0,0,.3)' }}>
            Explore past teachings and find spiritual nourishment. Watch, listen, or read our weekly messages.
          </p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop animate-fade-in-up mt-stack-lg pb-32">
        
        {/* Live Status Banner / Embed */}
        {isCurrentlyLive() && liveStatus?.embed_url && (
          <section className="mb-stack-lg border border-red-500/30 rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(220,38,38,0.15)] relative animate-pulse-glow group bg-[#3B0B14]">
            <div className="bg-gradient-to-r from-red-900/60 via-red-600/80 to-red-900/60 backdrop-blur-md border-b border-white/10 text-white text-center py-2.5 font-headline-sm flex items-center justify-center gap-3 uppercase tracking-wider text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              </span>
              We're Live — {liveStatus.title || 'Sunday Service'}
            </div>
            <div className="w-full aspect-video bg-black relative">
              <iframe
                src={liveStatus.embed_url}
                className="w-full h-full absolute inset-0 mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </section>
        )}

        {!isCurrentlyLive() && (
          <div className="mb-stack-lg bg-surface-container-low/80 backdrop-blur-xl border border-warm-brown/20 rounded-2xl p-8 text-center shadow-ambient relative overflow-hidden flex flex-col items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-10 pointer-events-none"></div>
            <div className="w-16 h-16 rounded-full bg-warm-brown/10 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-3xl text-[#CDAA63]">event</span>
            </div>
            <h3 className="font-headline-sm text-primary-container mb-2">We are currently not live.</h3>
            <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
              Stay tuned for next Sunday in order to get the next live stream! In the meantime, catch up on our latest sermons below.
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-gutter mb-stack-lg animate-fade-in-up">
          {/* Facebook Feed Plugin */}
          <div className="w-full lg:w-[340px] shrink-0 mx-auto lg:mx-0 flex justify-center">
            <div className="bg-surface-container-low/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-ambient border border-warm-brown/30 w-[340px] h-[500px]">
              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fingraham.methodist&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="340"
                height="500"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </div>

          {/* Latest YouTube Sermon */}
          {!isCurrentlyLive() && pastSermons.length > 0 ? (
            <section className="flex-1 bg-surface-container-low/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-ambient border border-warm-brown/30 relative flex flex-col group hover:shadow-[0_16px_48px_rgba(74,15,26,0.1)] transition-shadow duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-10 pointer-events-none"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="relative h-64 md:h-full overflow-hidden">
                  <img 
                    className="absolute inset-0 w-full h-full object-cover scale-[1.02] group-hover:scale-100 transition-transform duration-700 ease-out" 
                    alt={pastSermons[0].title}
                    src={pastSermons[0].thumbnail_url}
                  />
                  <a href={pastSermons[0].video_url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-500">
                      <span className="material-symbols-outlined text-4xl translate-x-[2px]">play_arrow</span>
                    </button>
                  </a>
                </div>
                <div className="p-stack-md md:p-stack-lg flex flex-col justify-center h-full relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#4A0F1A]/10 border border-[#4A0F1A]/20 text-[#4A0F1A] px-3 py-1 rounded-full font-label-md text-[10px] md:text-xs uppercase tracking-[0.15em] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]">Latest Sermon</span>
                    <span className="text-on-surface-variant font-mono text-[11px] md:text-xs tracking-wider">{formatDate(pastSermons[0].published_at)}</span>
                  </div>
                  <h2 className="font-headline-md text-primary-container mb-6 group-hover:text-[#4A0F1A] transition-colors">{pastSermons[0].title}</h2>
                  <div className="flex gap-4 items-center mt-auto">
                    <a href={pastSermons[0].video_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#4A0F1A] text-[#F4E7D3] px-6 py-3 rounded-xl font-label-md hover:bg-[#3B0B14] transition-colors shadow-[0_4px_16px_rgba(74,15,26,0.3)] hover:shadow-[0_8px_24px_rgba(74,15,26,0.4)]">
                      Watch Video
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-surface-container-low/80 backdrop-blur-xl border border-warm-brown/20 rounded-2xl p-8 text-center shadow-ambient relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-10 pointer-events-none"></div>
               <div className="flex flex-col items-center relative z-10">
                 <div className="w-16 h-16 rounded-full bg-warm-brown/10 flex items-center justify-center mb-4">
                   <span className="material-symbols-outlined text-3xl text-[#CDAA63]">history_edu</span>
                 </div>
                 <h3 className="font-headline-sm text-primary-container mb-2">No YouTube Sermons Yet</h3>
                 <p className="font-body-md text-on-surface-variant max-w-md mx-auto">
                   Our latest sermons will appear here once they are uploaded.
                 </p>
               </div>
            </div>
          )}
        </div>

        {/* Sermon Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter pb-12 reveal-on-scroll">
          {(!isCurrentlyLive() ? pastSermons.slice(1) : pastSermons).map((sermon) => (
            <article key={sermon.id} className="bg-surface-container-low/60 backdrop-blur-lg rounded-2xl overflow-hidden border border-warm-brown/20 hover:border-warm-brown/40 hover:shadow-[0_12px_40px_rgba(74,15,26,0.12)] transition-all duration-500 flex flex-col group hover:-translate-y-1 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-[0.05] pointer-events-none z-0"></div>
              <div className="relative aspect-[16/9] w-full group cursor-pointer overflow-hidden z-10" onClick={() => window.open(sermon.video_url, '_blank')}>
                <img 
                  className="w-full h-full object-cover scale-[1.02] group-hover:scale-100 transition-transform duration-700 ease-out" 
                  alt={sermon.title}
                  src={sermon.thumbnail_url}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <span className="material-symbols-outlined text-2xl translate-x-[1px]">play_arrow</span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow relative z-10">
                <p className="font-mono text-[10px] text-on-surface-variant/70 uppercase tracking-widest mb-2">{formatDate(sermon.published_at)}</p>
                <h3 className="font-headline-sm text-primary-container mb-4 line-clamp-2 leading-tight group-hover:text-[#4A0F1A] transition-colors" title={sermon.title}>{sermon.title}</h3>
                <div className="flex justify-between items-center pt-4 border-t border-warm-brown/20 mt-auto">
                  <a href={sermon.video_url} target="_blank" rel="noopener noreferrer" className="text-primary-container hover:text-[#4A0F1A] transition-colors flex items-center gap-1.5 font-label-md text-sm uppercase tracking-wide">
                    <span className="material-symbols-outlined text-lg">play_circle</span>
                    Watch
                  </a>
                </div>
              </div>
            </article>
          ))}
          
          {pastSermons.length === 0 && (
             <div className="col-span-full py-20 text-center flex flex-col items-center bg-surface-container-low/40 border border-warm-brown/20 border-dashed rounded-3xl">
               <div className="w-16 h-16 rounded-full bg-warm-brown/10 flex items-center justify-center mb-4">
                 <span className="material-symbols-outlined text-3xl text-[#CDAA63]/70">history_edu</span>
               </div>
               <h3 className="font-headline-md text-primary-container mb-2">No Past Sermons Available</h3>
               <p className="font-body-md text-on-surface-variant max-w-md">
                 Stay tuned for soul-fulfilling sermons every Sunday. We can't wait to share our next message with you!
               </p>
             </div>
          )}
        </section>
      </div>
    </>
  );
}
