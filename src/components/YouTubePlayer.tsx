'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Maximize2, Radio } from 'lucide-react';

export interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  publishedAt?: string;
  customThumbnail?: string;
  offlineStatusText?: string;
  defaultExpanded?: boolean;
  className?: string;
}

export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId.trim())) {
    return urlOrId.trim();
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|live\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = urlOrId.match(regExp);
  return (match && match[2] && match[2].length === 11) ? match[2] : urlOrId;
}

export default function YouTubePlayer({
  videoId,
  title = 'Latest Sunday Sermon',
  publishedAt,
  customThumbnail,
  offlineStatusText = 'OFFLINE • CATCH UP ON OUR LATEST SERVICE',
  defaultExpanded = false,
  className = '',
}: YouTubePlayerProps) {
  const [isModalOpen, setIsModalOpen] = useState(defaultExpanded);
  const [isInlinePlaying, setIsInlinePlaying] = useState(false);
  const cleanVideoId = extractYouTubeId(videoId);

  const defaultThumbnail = customThumbnail || (cleanVideoId ? `https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg` : '');
  const [imgSrc, setImgSrc] = useState<string>(defaultThumbnail);

  useEffect(() => {
    if (customThumbnail) {
      setImgSrc(customThumbnail);
    } else if (cleanVideoId) {
      setImgSrc(`https://img.youtube.com/vi/${cleanVideoId}/maxresdefault.jpg`);
    }
  }, [customThumbnail, cleanVideoId]);

  const handleImageError = () => {
    // Fallback if maxresdefault doesn't exist for this video
    if (cleanVideoId && imgSrc.includes('maxresdefault')) {
      setImgSrc(`https://img.youtube.com/vi/${cleanVideoId}/hqdefault.jpg`);
    }
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleOpenModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsModalOpen(true);
  };

  // Keyboard shortcut: ESC to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, handleCloseModal]);

  const embedUrl = cleanVideoId
    ? `https://www.youtube.com/embed/${cleanVideoId}?autoplay=1&rel=0&modestbranding=1`
    : '';

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

  return (
    <>
      {/* Outer Widescreen Video Card */}
      <div
        className={`w-full rounded-2xl overflow-hidden border border-[#CDAA63]/40 bg-[#3B0B14] shadow-[0_16px_40px_rgba(59,11,20,0.25)] relative transition-all duration-500 hover:border-[#CDAA63]/80 ${className}`}
      >
        {/* Integrated Top Offline Status Bar */}
        <div className="bg-gradient-to-r from-[#2A050B] via-[#4A0F1A] to-[#2A050B] border-b border-[#CDAA63]/30 px-5 py-3 flex items-center justify-between gap-3 text-[#F4E7D3]">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CDAA63] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#CDAA63] shadow-[0_0_8px_rgba(205,170,99,0.9)]"></span>
            </span>
            <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.18em] font-bold text-[#F4E7D3]">
              {offlineStatusText}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#CDAA63]/90 font-mono">
            <Radio className="w-3.5 h-3.5 text-[#CDAA63] animate-pulse" />
            <span>YouTube Stream Archive</span>
          </div>
        </div>

        {/* Video Thumbnail / Widescreen Container (16:9 Aspect Ratio) */}
        <div className="relative aspect-[16/9] w-full bg-[#1A0307] overflow-hidden group">
          {isInlinePlaying ? (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0 absolute inset-0 z-20"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={title}
            ></iframe>
          ) : (
            <>
              {/* Background Thumbnail Image with subtle hover zoom */}
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt={title}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              )}

              {/* Gradient Scrim for Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0307] via-[#1A0307]/40 to-black/30 group-hover:via-[#1A0307]/50 transition-colors duration-500"></div>

              {/* Top Controls Bar inside video (Expand Button) */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleOpenModal(e)}
                  title="Expand to Fullscreen Modal"
                  className="p-2.5 rounded-full bg-[#1A0307]/75 backdrop-blur-md border border-[#CDAA63]/40 text-[#F4E7D3] hover:text-white hover:bg-[#3B0B14] hover:border-[#CDAA63] transition-all duration-300 shadow-lg group/btn cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4 text-[#CDAA63] group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>

              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsInlinePlaying(true);
                  }}
                  aria-label={`Play ${title}`}
                  className="pointer-events-auto cursor-pointer w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#3B0B14]/90 backdrop-blur-md border-2 border-[#CDAA63] text-[#F4E7D3] flex items-center justify-center shadow-[0_0_30px_rgba(205,170,99,0.5),0_8px_32px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_45px_rgba(205,170,99,0.85)] transition-all duration-500 group/play"
                >
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 text-[#F4E7D3] fill-[#CDAA63] translate-x-[2px] transition-transform duration-300 group-hover/play:scale-110" />
                </motion.button>
              </div>

              {/* Bottom Information Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#3B0B14]/90 backdrop-blur-sm text-[#F4E7D3] px-3 py-1 rounded-full font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border border-[#CDAA63]/40 shadow-sm">
                      Latest Stream
                    </span>
                    {publishedAt && (
                      <span className="text-[#CDAA63] font-mono text-xs font-semibold drop-shadow">
                        {formatDate(publishedAt)}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#F4E7D3] leading-snug drop-shadow-md">
                    {title}
                  </h2>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsInlinePlaying(true);
                    }}
                    className="cursor-pointer px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3B0B14] to-[#4A0F1A] border border-[#CDAA63]/60 text-[#F4E7D3] font-mono text-xs font-bold uppercase tracking-wider hover:border-[#CDAA63] hover:shadow-[0_0_20px_rgba(205,170,99,0.4)] transition-all duration-300 flex items-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#CDAA63] text-[#CDAA63]" />
                    <span>Watch Inline</span>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleOpenModal(e)}
                    className="cursor-pointer px-5 py-2.5 rounded-xl bg-[#CDAA63] text-[#3B0B14] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FBF5B7] shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Full Modal</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Expandable Fullscreen Modal View */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl aspect-[16/9] rounded-2xl overflow-hidden border-2 border-[#CDAA63]/70 bg-black shadow-[0_0_80px_rgba(59,11,20,0.9)]"
            >
              {/* Modal Top Header Bar */}
              <div className="absolute top-0 inset-x-0 z-30 bg-gradient-to-b from-black/90 via-black/50 to-transparent p-4 sm:p-6 flex items-center justify-between">
                <div className="flex items-center gap-3 pr-8">
                  <span className="bg-[#3B0B14] text-[#F4E7D3] px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border border-[#CDAA63]/50">
                    Ingraham Church Stream
                  </span>
                  <h3 className="font-serif text-sm sm:text-lg font-bold text-[#F4E7D3] line-clamp-1">
                    {title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  aria-label="Close modal"
                  className="cursor-pointer p-2.5 rounded-full bg-[#3B0B14]/90 border border-[#CDAA63]/60 text-[#F4E7D3] hover:bg-[#CDAA63] hover:text-[#3B0B14] transition-colors duration-300 shadow-xl shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Actual Embedded YouTube Iframe */}
              <iframe
                src={embedUrl}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={title}
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
