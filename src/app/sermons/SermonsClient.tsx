'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import YouTubePlayer from '@/components/YouTubePlayer';
import SermonCard from '@/components/SermonCard';

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
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('en-US', {
      timeZone: 'Asia/Kolkata',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isCurrentlyLive = () => {
    return Boolean(liveStatus?.is_live && liveStatus?.embed_url);
  };

  return (
    <div
      className="relative w-full min-h-screen"
      style={{
        backgroundImage: "url('/paper_background.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
      }}
    >
      {/* Hero Section */}
      <section className="relative w-full h-[614px] min-h-[400px] flex items-center justify-center -mt-[72px]">
        {/* 
          Hero Background Photo & Burgundy Container:
          Extends 200px below hero bounds (-bottom-36 to -bottom-48)
          and uses a linear mask-image gradient to dissolve smoothly into transparent.
          Reveals the root paper_background.png seamlessly with zero horizontal seam.
        */}
        <div
          className="absolute inset-x-0 top-0 -bottom-36 md:-bottom-48 z-0 bg-[#4A0F1A] pointer-events-none"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.1) 90%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.1) 90%, transparent 100%)',
          }}
        >
          <div 
            className="bg-cover bg-center w-full h-full opacity-40 mix-blend-luminosity" 
            style={{ backgroundImage: "url('/sermons_demo.jpeg')" }}
          ></div>
          <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)]"></div>
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto mt-24">
          <div className="flex flex-col items-center mb-6 w-full">
            <span className="text-[#CDAA63] font-label-md tracking-[0.2em] uppercase text-[12px] md:text-[13px] mb-3" style={{ textShadow: '0 2px 14px rgba(0,0,0,0.7)' }}>Teachings & Series</span>
            <div className="h-px w-32 bg-[rgba(205,170,99,0.35)]"></div>
          </div>
          <h1 className="font-display-lg text-[48px] md:text-[72px] leading-[1.05] font-bold text-[#F4E7D3] mb-6 animate-fade-in-up" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}>
            Sermon Archive
          </h1>
          <p className="font-body-lg text-[#F4E7D3] font-medium max-w-2xl mx-auto animate-smooth-render" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.85)' }}>
            Explore past teachings and find spiritual nourishment. Watch, listen, or read our weekly messages.
          </p>
        </div>
      </section>

      {/* Main Page Body Section on Parchment Background */}
      <section className="relative w-full pt-12 pb-28 overflow-hidden z-10">
        {/* Background Layer: Soft Light Vignette + Bottom Burgundy Wave + Metallic Gold Border */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Diffused Soft Light & Antique Vignette spanning full page */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-[#E9DAC6]/30"></div>

          {/* Sweeping Deep Burgundy Wave + Glowing Metallic Gold Strip at Bottom */}
          <svg
            className="absolute bottom-0 left-0 w-full h-[400px] md:h-[460px] lg:h-[500px]"
            viewBox="0 0 1440 600"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Metallic Gold Gradient */}
              <linearGradient id="goldMetallicStripSermons" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B38728" />
                <stop offset="20%" stopColor="#FBF5B7" />
                <stop offset="50%" stopColor="#DAA520" />
                <stop offset="80%" stopColor="#FBF5B7" />
                <stop offset="100%" stopColor="#AA771C" />
              </linearGradient>

              {/* Soft Gold Glow Filter */}
              <filter id="goldGlowEffectSermons" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Deep Burgundy Wave Fill */}
            <path
              d="M 0 350 C 350 480, 850 260, 1440 380 L 1440 600 L 0 600 Z"
              fill="#3B0B14"
            />

            {/* Glowing Ambient Outer Gold Aura */}
            <path
              d="M 0 350 C 350 480, 850 260, 1440 380"
              fill="none"
              stroke="#FBF5B7"
              strokeWidth="14"
              opacity="0.45"
              filter="url(#goldGlowEffectSermons)"
            />

            {/* Prominent Glowing Golden Metallic Strip following exact top curve */}
            <path
              d="M 0 350 C 350 480, 850 260, 1440 380"
              fill="none"
              stroke="url(#goldMetallicStripSermons)"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Content Elements Layer */}
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop animate-fade-in-up">
          
          {/* Live Status Banner / Embed */}
        {isCurrentlyLive() && liveStatus?.embed_url && (
          <section className="mb-stack-lg border-2 border-[#CDAA63] rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(59,11,20,0.3)] relative animate-pulse-glow group bg-[#3B0B14]">
            <div className="bg-gradient-to-r from-[#4A0F1A] via-[#6B1426] to-[#4A0F1A] border-b border-white/10 text-[#F4E7D3] text-center py-3 font-headline-sm flex items-center justify-center gap-3 uppercase tracking-wider text-sm shadow-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
              </span>
              We're Live — {liveStatus.title || 'Sunday Service'}
            </div>
            <div className="w-full aspect-video bg-black relative">
              <iframe
                src={liveStatus.embed_url}
                className="w-full h-full absolute inset-0 mix-blend-screen opacity-95 group-hover:opacity-100 transition-opacity duration-700"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </section>
        )}

        {!isCurrentlyLive() && pastSermons.length > 0 && (
          <section className="mb-stack-lg animate-fade-in-up">
            <YouTubePlayer
              videoId={pastSermons[0].video_id || pastSermons[0].video_url}
              title={pastSermons[0].title}
              publishedAt={pastSermons[0].published_at}
              customThumbnail={pastSermons[0].thumbnail_url}
              offlineStatusText="OFFLINE • CATCH UP ON OUR LATEST SERVICE"
            />
          </section>
        )}

        {!isCurrentlyLive() && pastSermons.length === 0 && (
          <div className="mb-stack-lg flex items-center justify-center luminous-sermon-card p-10 text-center relative overflow-hidden">
            <div className="flex flex-col items-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-[#3B0B14]/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-[#CDAA63]">history_edu</span>
              </div>
              <h3 className="font-serif text-[22px] font-bold text-[#3B0B14] mb-2">No YouTube Sermons Available Yet</h3>
              <p className="font-sans text-[#5C4A38] text-[15px] max-w-md mx-auto">
                Our latest sermons will appear here once they are uploaded to YouTube.
              </p>
            </div>
          </div>
        )}

        {/* Luminous Motion Design Styles */}
        <style>{`
          .luminous-sermon-card {
            position: relative;
            background: linear-gradient(185deg, #FFFDF9 0%, #FAF6F0 60%, #F5ECDD 100%);
            border-radius: 1.25rem;
            box-shadow: 
              0 0 0 1px rgba(229, 216, 199, 0.9),
              0 8px 24px -4px rgba(59, 11, 20, 0.09);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .luminous-sermon-card:hover {
            transform: translateY(-6px);
            box-shadow: 
              0 0 0 1px rgba(205, 170, 99, 0.6),
              0 22px 48px -6px rgba(59, 11, 20, 0.22);
          }

          .luminous-slit-bar {
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, rgba(205, 170, 99, 0.2) 20%, rgba(205, 170, 99, 0.85) 50%, rgba(205, 170, 99, 0.2) 80%, transparent 100%);
            opacity: 0.4;
            transition: opacity 0.4s ease, filter 0.4s ease;
          }

          .luminous-sermon-card:hover .luminous-slit-bar {
            opacity: 1;
            filter: drop-shadow(0 0 8px rgba(205, 170, 99, 0.9));
          }

          .luminous-capsule-btn {
            background: linear-gradient(135deg, #3B0B14 0%, #2A050B 100%);
            border: 1px solid rgba(205, 170, 99, 0.4);
            box-shadow: 
              inset 0 1px 1px 0 rgba(255, 255, 255, 0.25),
              0 4px 14px rgba(59, 11, 20, 0.25);
            transition: all 0.35s ease;
          }

          .luminous-sermon-card:hover .luminous-capsule-btn {
            background: linear-gradient(135deg, #4A0F1A 0%, #3B0B14 100%);
            border-color: rgba(205, 170, 99, 0.85);
            box-shadow: 
              inset 0 1px 2px 0 rgba(255, 255, 255, 0.45),
              0 0 16px rgba(205, 170, 99, 0.4);
          }
        `}</style>

        {/* Sermon Grid Cards - Deep Burgundy Glassmorphic Design */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-12 reveal-on-scroll">
          {(!isCurrentlyLive() ? pastSermons.slice(1) : pastSermons).map((sermon) => (
            <SermonCard
              key={sermon.id}
              id={sermon.id}
              videoId={sermon.video_id}
              title={sermon.title}
              thumbnailUrl={sermon.thumbnail_url}
              publishedAt={sermon.published_at}
              videoUrl={sermon.video_url}
            />
          ))}
          
          {pastSermons.length === 0 && (
             <div className="col-span-full py-20 text-center flex flex-col items-center luminous-sermon-card border-dashed">
               <div className="w-16 h-16 rounded-full bg-[#3B0B14]/10 flex items-center justify-center mb-4">
                 <span className="material-symbols-outlined text-3xl text-[#CDAA63]">history_edu</span>
               </div>
               <h3 className="font-serif text-[22px] font-bold text-[#3B0B14] mb-2">No Past Sermons Available</h3>
               <p className="font-sans text-[#5C4A38] text-[15px] max-w-md">
                 Stay tuned for soul-fulfilling sermons every Sunday. We can't wait to share our next message with you!
               </p>
             </div>
          )}
        </section>
      </div>
      </section>
    </div>
  );
}
