'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, ExternalLink, VolumeX } from 'lucide-react';
import { extractYouTubeId } from './YouTubePlayer';

export interface SermonCardProps {
  id: string;
  videoId: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  videoUrl: string;
}

export default function SermonCard({
  videoId,
  title,
  thumbnailUrl,
  publishedAt,
  videoUrl,
}: SermonCardProps) {
  const cleanVideoId = extractYouTubeId(videoId || videoUrl);
  const defaultThumb = thumbnailUrl || (cleanVideoId ? `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg` : '');

  const [imgSrc, setImgSrc] = useState<string>(defaultThumb);
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (thumbnailUrl) {
      setImgSrc(thumbnailUrl);
    } else if (cleanVideoId) {
      setImgSrc(`https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`);
    }
  }, [thumbnailUrl, cleanVideoId]);

  const handleImageError = () => {
    if (cleanVideoId && imgSrc.includes('maxresdefault')) {
      setImgSrc(`https://img.youtube.com/vi/${cleanVideoId}/hqdefault.jpg`);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    // 300ms hover delay to load preview iframe without flickering on quick cursor movement
    hoverTimerRef.current = setTimeout(() => {
      setShowPreview(true);
    }, 320);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowPreview(false);
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleCardClick = () => {
    if (videoUrl) {
      window.open(videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return '';
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        timeZone: 'Asia/Kolkata',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  const previewIframeUrl = cleanVideoId
    ? `https://www.youtube.com/embed/${cleanVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${cleanVideoId}&disablekb=1&modestbranding=1&playsinline=1`
    : '';

  return (
    <article
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col p-1.5 rounded-[1.5rem] bg-gradient-to-b from-[#4A0F1A]/90 via-[#2A050B]/95 to-[#1A0307] border border-[#CDAA63]/60 hover:border-[#CDAA63] shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:shadow-[0_25px_60px_rgba(205,170,99,0.4)] hover:-translate-y-2 cursor-pointer z-10 transition-all duration-500"
    >
      {/* Double-Bezel Inner Core */}
      <div className="rounded-[calc(1.5rem-0.375rem)] overflow-hidden bg-gradient-to-b from-[#3B0B14] via-[#2A050B] to-[#1A0307] flex flex-col h-full border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] relative">
        {/* 16:9 Aspect Ratio Media Container */}
        <div className="relative aspect-[16/9] w-full bg-[#1A0307] overflow-hidden">
          {/* Silent Video Preview on Hover */}
          {showPreview && previewIframeUrl ? (
            <iframe
              src={previewIframeUrl}
              className="w-full h-full border-0 absolute inset-0 z-20 pointer-events-none scale-105 transition-transform duration-500"
              allow="autoplay; encrypted-media; picture-in-picture"
              title={`Preview of ${title}`}
            ></iframe>
          ) : (
            <>
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt={title}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0307] via-[#1A0307]/30 to-black/20 group-hover:via-[#1A0307]/45 transition-colors duration-500"></div>

              {/* Glowing Play Badge */}
              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-all duration-500">
                <div className="w-12 h-12 rounded-full bg-[#3B0B14]/90 backdrop-blur-md border border-[#CDAA63]/70 text-[#F4E7D3] flex items-center justify-center shadow-[0_0_20px_rgba(205,170,99,0.4),0_4px_16px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_35px_rgba(205,170,99,0.85)] group-hover:border-[#CDAA63] transition-all duration-500">
                  <Play className="w-5 h-5 fill-[#CDAA63] text-[#CDAA63] translate-x-[1px]" />
                </div>
              </div>
            </>
          )}

          {/* Date Badge Pill (Top Left) */}
          <div className="absolute top-3 left-3 z-30">
            <span className="px-3 py-1 bg-[#1A0307]/85 backdrop-blur-md border border-[#CDAA63]/40 text-[#F4E7D3] rounded-full font-mono text-[11px] font-bold shadow-md">
              {formatDate(publishedAt)}
            </span>
          </div>

          {/* Previewing Indicator Pill (Top Right on Hover) */}
          {showPreview && (
            <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 bg-[#3B0B14]/90 backdrop-blur-md border border-[#CDAA63]/60 text-[#CDAA63] rounded-full font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg animate-pulse">
              <VolumeX className="w-3 h-3 text-[#CDAA63]" />
              <span>Muted Preview</span>
            </div>
          )}
        </div>

        {/* Card Content Section */}
        <div className="p-5 md:p-6 flex flex-col flex-grow relative z-10 justify-between">
          <div>
            <h3
              className="font-serif text-[17px] md:text-[19px] font-bold text-[#F4E7D3] mb-4 line-clamp-2 leading-snug group-hover:text-[#FBF5B7] transition-colors"
              title={title}
            >
              {title}
            </h3>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#CDAA63]/20 mt-auto">
            <span className="px-4 py-2 rounded-xl bg-[#2A050B] border border-[#CDAA63]/40 group-hover:border-[#CDAA63] text-[#F4E7D3] group-hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-sm">
              <Play className="w-3.5 h-3.5 fill-[#CDAA63] text-[#CDAA63]" />
              <span>Watch Sermon</span>
              <ExternalLink className="w-3 h-3 text-[#CDAA63]/80 group-hover:translate-x-0.5 transition-transform" />
            </span>
            <span className="text-[#CDAA63]/80 font-mono text-[11px] font-semibold">YouTube</span>
          </div>
        </div>
      </div>
    </article>
  );
}
