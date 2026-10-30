'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface EventGalleryViewerProps {
  images: string[];
  eventTitle: string;
}

export default function EventGalleryViewer({ images, eventTitle }: EventGalleryViewerProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const isOpen = selectedIdx !== null;
  const currentImage = selectedIdx !== null ? images[selectedIdx] : null;

  const handleClose = useCallback(() => {
    setSelectedIdx(null);
    setZoomLevel(1);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! + 1) % images.length);
    setZoomLevel(1);
  }, [selectedIdx, images.length]);

  const handlePrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! - 1 + images.length) % images.length);
    setZoomLevel(1);
  }, [selectedIdx, images.length]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.75));
  };

  const handleToggleZoom = () => {
    setZoomLevel((prev) => (prev > 1.1 ? 1 : 1.75));
  };

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut();
      } else if (e.key === '0' || e.key === 'r') {
        setZoomLevel(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose, handleNext, handlePrev]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Gallery Cards Grid (Trigger Previews) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            onClick={() => {
              setSelectedIdx(idx);
              setZoomLevel(1);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedIdx(idx);
                setZoomLevel(1);
              }
            }}
            aria-label={`Enlarge ${eventTitle} banner ${idx + 1}`}
            className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-[#EAE3D2] hover:border-[#CDAA63] hover:shadow-[0_12px_32px_rgba(59,11,20,0.18)] transition-all duration-300 group relative cursor-pointer bg-[#1A0307] focus:outline-none focus:ring-2 focus:ring-[#CDAA63]"
          >
            {/* Thumbnail Image */}
            <img
              src={imgUrl}
              alt={`${eventTitle} banner ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Hover Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0307]/90 via-[#3B0B14]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
              {/* Center Enlarge Callout Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B0B14]/95 backdrop-blur-md border border-[#CDAA63] text-[#F4E7D3] shadow-[0_4px_16px_rgba(0,0,0,0.5)] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                <span className="material-symbols-outlined text-[19px] text-[#CDAA63]">zoom_in</span>
                <span className="font-mono text-xs font-bold tracking-wider uppercase">
                  Click to Enlarge &amp; Read
                </span>
              </div>

              {/* Bottom Image Counter / Label */}
              <div className="absolute bottom-3 inset-x-0 text-center font-mono text-[11px] text-[#E5BF74] tracking-widest uppercase opacity-90">
                {images.length > 1 ? `Poster ${idx + 1} of ${images.length}` : 'Event Poster & Details'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dedicated Fullscreen / Lightbox Modal Viewer */}
      {isOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#110205]/95 backdrop-blur-xl animate-fade-in text-[#F4E7D3]"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged Event Image Viewer"
        >
          {/* Top Control Bar */}
          <div
            className="w-full px-4 md:px-8 py-3.5 bg-gradient-to-r from-[#2A050B] via-[#3B0B14] to-[#2A050B] border-b border-[#CDAA63]/30 flex items-center justify-between gap-4 z-20 shrink-0 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title / Counter */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-[#CDAA63] text-xl hidden sm:inline select-none">✝</span>
              <div className="min-w-0">
                <h4 className="font-serif font-bold text-sm md:text-base text-[#F4E7D3] truncate drop-shadow-sm max-w-xs sm:max-w-md md:max-w-xl">
                  {eventTitle}
                </h4>
                <div className="font-mono text-[11px] text-[#CDAA63] uppercase tracking-wider">
                  {images.length > 1 ? `Image ${selectedIdx! + 1} of ${images.length}` : 'Official Event Banner'}
                </div>
              </div>
            </div>

            {/* Right Action Tools */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Zoom Out Button */}
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.75}
                className="w-9 h-9 rounded-full bg-[#1A0307]/80 hover:bg-[#3B0B14] border border-[#CDAA63]/40 text-[#F4E7D3] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200"
                aria-label="Zoom out"
                title="Zoom out (-)"
              >
                <span className="material-symbols-outlined text-[19px]">zoom_out</span>
              </button>

              {/* Zoom Percentage Toggle */}
              <button
                type="button"
                onClick={handleToggleZoom}
                className="px-2.5 h-9 rounded-full bg-[#1A0307]/80 hover:bg-[#3B0B14] border border-[#CDAA63]/40 text-[#CDAA63] font-mono text-xs font-bold flex items-center justify-center transition-all duration-200 min-w-[58px]"
                aria-label="Toggle zoom level"
                title="Click to toggle fit / zoom (100% / 175%)"
              >
                {Math.round(zoomLevel * 100)}%
              </button>

              {/* Zoom In Button */}
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="w-9 h-9 rounded-full bg-[#1A0307]/80 hover:bg-[#3B0B14] border border-[#CDAA63]/40 text-[#F4E7D3] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200"
                aria-label="Zoom in"
                title="Zoom in (+)"
              >
                <span className="material-symbols-outlined text-[19px]">zoom_in</span>
              </button>

              {/* Reset Zoom Button */}
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="w-9 h-9 rounded-full bg-[#1A0307]/80 hover:bg-[#3B0B14] border border-[#CDAA63]/40 text-[#F4E7D3] flex items-center justify-center transition-all duration-200"
                aria-label="Reset zoom to fit screen"
                title="Reset zoom (0)"
              >
                <span className="material-symbols-outlined text-[19px]">fit_screen</span>
              </button>

              <div className="h-5 w-px bg-[#CDAA63]/30 mx-1"></div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-[#3B0B14] hover:bg-red-900 border border-[#CDAA63]/70 text-[#F4E7D3] flex items-center justify-center transition-all duration-200 shadow-md group"
                aria-label="Close viewer"
                title="Close viewer (Esc)"
              >
                <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                  close
                </span>
              </button>
            </div>
          </div>

          {/* Central Image Viewing Area */}
          <div className="flex-1 w-full overflow-auto flex items-center justify-center relative p-3 sm:p-6 md:p-8 select-none">
            {/* Previous Arrow Button (Multi-image) */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#3B0B14]/90 hover:bg-[#5A1220] border border-[#CDAA63] text-[#F4E7D3] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all duration-200 hover:scale-105"
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined text-2xl">chevron_left</span>
              </button>
            )}

            {/* Poster / Banner Image Container */}
            <div
              className="relative max-h-full max-w-full flex items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${zoomLevel})`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleZoom();
              }}
            >
              <img
                src={currentImage}
                alt={`${eventTitle} full poster`}
                className={`max-h-[82vh] max-w-[92vw] md:max-w-[85vw] object-contain rounded-xl shadow-[0_16px_50px_rgba(0,0,0,0.7)] border-2 border-[#CDAA63]/40 ${
                  zoomLevel > 1.1 ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
              />
            </div>

            {/* Next Arrow Button (Multi-image) */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#3B0B14]/90 hover:bg-[#5A1220] border border-[#CDAA63] text-[#F4E7D3] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.6)] transition-all duration-200 hover:scale-105"
                aria-label="Next image"
              >
                <span className="material-symbols-outlined text-2xl">chevron_right</span>
              </button>
            )}
          </div>

          {/* Bottom Footer Helper Info */}
          <div
            className="w-full py-2.5 px-4 bg-[#190508]/90 border-t border-[#CDAA63]/20 text-center font-mono text-[11px] text-[#CDAA63]/80 z-20 shrink-0 flex items-center justify-center gap-4 flex-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Tip: Click poster or use zoom buttons to enlarge text</span>
            <span className="hidden sm:inline opacity-40">•</span>
            <span className="hidden sm:inline">Use Arrow keys for navigation</span>
            <span className="opacity-40">•</span>
            <span>Press Esc to close</span>
          </div>
        </div>
      )}
    </>
  );
}
