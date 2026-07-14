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

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center -mt-[72px] bg-[#4A0F1A] overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f3e7d3] to-transparent z-10"></div>
        
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto mt-16">
          <div className="flex flex-col items-center mb-6 w-full">
            <span className="text-[#CDAA63] font-label-md tracking-[0.2em] uppercase text-[12px] md:text-[13px] mb-3" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>Teachings & Series</span>
            <div className="h-px w-32 bg-[rgba(205,170,99,0.35)]"></div>
          </div>
          <h1 className="font-display-lg text-[48px] md:text-[72px] leading-[1.05] text-[#F4E7D3] mb-6 animate-fade-in-up" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
            Sermon Archive
          </h1>
          <p className="font-body-lg text-[#D9C7B3] max-w-2xl mx-auto animate-smooth-render" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
            Explore past teachings and find spiritual nourishment. Watch, listen, or read our weekly messages.
          </p>
        </div>
      </section>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop animate-fade-in-up mt-stack-lg">
        
        {/* Live Status Banner / Embed */}
        {liveStatus?.is_live && liveStatus.embed_url && (
          <section className="mb-stack-lg border-2 border-red-500 rounded-xl overflow-hidden shadow-ambient relative animate-pulse-glow">
            <div className="bg-red-600 text-white text-center py-2 font-headline-sm flex items-center justify-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              We're Live — {liveStatus.title || 'Sunday Service'}
            </div>
            <div className="w-full aspect-video bg-black relative">
              <iframe
                src={liveStatus.embed_url}
                className="w-full h-full absolute inset-0"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </section>
        )}

        {!liveStatus?.is_live && (
          <div className="mb-stack-lg bg-surface-container-low border border-warm-brown/20 rounded-xl p-6 text-center shadow-ambient">
            <span className="material-symbols-outlined text-4xl text-[#CDAA63] mb-3 opacity-80">event</span>
            <h3 className="font-headline-sm text-primary-container mb-2">We are currently not live.</h3>
            <p className="font-body-md text-on-surface-variant">
              Stay tuned for next Sunday in order to get the next live stream! In the meantime, catch up on our latest sermons below.
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-gutter mb-stack-lg animate-fade-in-up">
          {/* Facebook Feed Plugin */}
          <div className="w-full lg:w-[340px] shrink-0 mx-auto lg:mx-0 flex justify-center">
            <div className="bg-white rounded-xl overflow-hidden shadow-ambient border border-warm-brown/30 w-[340px] h-[500px]">
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
          {!liveStatus?.is_live && pastSermons.length > 0 ? (
            <section className="flex-1 bg-surface-container-low rounded-xl overflow-hidden shadow-ambient border border-warm-brown/30 relative flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="relative h-64 md:h-full">
                  <img 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt={pastSermons[0].title}
                    src={pastSermons[0].thumbnail_url}
                  />
                  <a href={pastSermons[0].video_url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent flex items-center justify-center group">
                    <button className="bg-white/20 group-hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-4 transition-all duration-300 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl">play_arrow</span>
                    </button>
                  </a>
                </div>
                <div className="p-stack-md md:p-stack-lg flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 mb-stack-sm">
                    <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-md text-xs uppercase tracking-wider">Latest Sermon</span>
                    <span className="text-on-surface-variant font-caption">{formatDate(pastSermons[0].published_at)}</span>
                  </div>
                  <h2 className="font-headline-md text-primary-container mb-unit">{pastSermons[0].title}</h2>
                  <div className="flex gap-4 items-center mt-stack-md">
                    <a href={pastSermons[0].video_url} target="_blank" rel="noopener noreferrer" className="bg-primary-container text-on-primary px-6 py-2 rounded-lg font-label-md hover:opacity-90 transition-opacity">
                      Watch Video
                    </a>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-surface-container-low border border-warm-brown/20 rounded-xl p-8 text-center shadow-ambient">
               <div>
                 <span className="material-symbols-outlined text-4xl text-[#CDAA63] mb-3 opacity-80">history_edu</span>
                 <h3 className="font-headline-sm text-primary-container mb-2">No YouTube Sermons Yet</h3>
                 <p className="font-body-md text-on-surface-variant">
                   Our latest sermons will appear here once they are uploaded.
                 </p>
               </div>
            </div>
          )}
        </div>

        {/* Sermon Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter pb-24 md:pb-32 reveal-on-scroll">
          {(!liveStatus?.is_live ? pastSermons.slice(1) : pastSermons).map((sermon) => (
            <article key={sermon.id} className="bg-secondary-fixed/30 rounded-xl overflow-hidden border border-warm-brown/30 hover:shadow-ambient transition-all duration-300 flex flex-col">
              <div className="relative h-48 group cursor-pointer" onClick={() => window.open(sermon.video_url, '_blank')}>
                <img 
                  className="w-full h-full object-cover" 
                  alt={sermon.title}
                  src={sermon.thumbnail_url}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-stack-sm flex flex-col flex-grow">
                <p className="font-caption text-on-surface-variant mb-1">{formatDate(sermon.published_at)}</p>
                <h3 className="font-headline-sm text-primary-container mb-2 line-clamp-2" title={sermon.title}>{sermon.title}</h3>
                <div className="flex justify-between items-center pt-4 border-t border-warm-brown/30 mt-auto">
                  <a href={sermon.video_url} target="_blank" rel="noopener noreferrer" className="text-primary-container hover:text-primary transition-colors flex items-center gap-1 font-label-md">
                    <span className="material-symbols-outlined text-sm">play_circle</span>
                    Watch
                  </a>
                </div>
              </div>
            </article>
          ))}
          
          {pastSermons.length === 0 && (
             <div className="col-span-full py-16 text-center flex flex-col items-center">
               <span className="material-symbols-outlined text-4xl text-[#CDAA63] mb-4 opacity-70">history_edu</span>
               <h3 className="font-headline-md text-primary-container mb-2">No Past Sermons Available</h3>
               <p className="font-body-md text-on-surface-variant max-w-md">
                 Stay tuned for soul-fulfilling sermons every Sunday. We can&apos;t wait to share our next message with you!
               </p>
             </div>
          )}
        </section>
      </div>
    </>
  );
}
