"use client";

import React, { useEffect, useState } from "react";
import { usePageLoader } from "@/context/LoadingContext";

export default function ChurchPageLoader() {
  const { isLoading, loadingMessage } = usePageLoader();
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      setShouldRender(true);
      // Small frame delay so CSS transition kicks in reliably
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 16);
    } else {
      setIsVisible(false);
      // Wait for exit fade transition before unmounting
      timer = setTimeout(() => {
        setShouldRender(false);
      }, 400);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <aside
      aria-label="Loading indicator"
      aria-live="polite"
      aria-busy={isLoading}
      role="status"
      className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
        isVisible
          ? "opacity-100 backdrop-blur-md pointer-events-auto bg-[#130306]/80"
          : "opacity-0 backdrop-blur-none pointer-events-none bg-[#130306]/0"
      }`}
    >
      {/* Ambient sanctuary glow spot */}
      <div 
        className="absolute w-[360px] h-[360px] rounded-full bg-[#CDAA63]/10 blur-[100px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: isVisible ? "scale(1)" : "scale(0.8)",
        }}
      />

      {/* Sacred Royal Sanctuary Card */}
      <div
        className={`relative flex flex-col items-center justify-center px-10 py-9 md:px-14 md:py-11 rounded-3xl bg-[rgba(24,5,9,0.94)] border border-[#CDAA63]/30 shadow-[0_28px_70px_rgba(0,0,0,0.75),inset_0_1px_2px_rgba(255,255,255,0.1)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden min-w-[300px] md:min-w-[360px] ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-3"
        }`}
      >
        {/* Top subtle golden hairline highlight */}
        <div className="absolute top-0 left-1/6 right-1/6 h-[1.5px] bg-gradient-to-r from-transparent via-[#CDAA63]/70 to-transparent" />

        {/* Sacred Cross & Flame Medallion */}
        <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
          {/* Pulsing Luminous Halo Rings */}
          <div className="absolute inset-0 rounded-full border border-[#CDAA63]/25 animate-ping opacity-20" style={{ animationDuration: "3s" }} />
          <div className="absolute -inset-1 rounded-full border border-[#CDAA63]/30 animate-pulse" style={{ animationDuration: "2.4s" }} />

          {/* Official Methodist Cross & Flame Logo */}
          <img
            src="/Methodist_logo (2).png"
            alt="Methodist Cross & Flame"
            className="h-12 w-auto object-contain drop-shadow-[0_2px_12px_rgba(205,170,99,0.45)] relative z-10 brightness-[1.08]"
          />
        </div>

        {/* Royal Classical Church Name in exact Hero Playfair Typography */}
        <h2 
          className="font-playfair text-[28px] md:text-[32px] font-normal tracking-tight leading-none text-center text-[#F4E7D3]"
          style={{ 
            fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
            textShadow: '0 2px 14px rgba(0,0,0,0.85)' 
          }}
        >
          Ingraham <span className="italic font-normal text-[#F4E7D3]/90">Shalom</span>
        </h2>

        {/* Classical Roman Sub-Insignia Rule */}
        <div className="flex items-center justify-center w-full max-w-[240px] mt-2.5 mb-3.5">
          <div className="flex-grow border-t h-px min-w-[12px] border-[#CDAA63]/40"></div>
          <span className="px-3 text-[8px] md:text-[9px] uppercase tracking-[0.28em] font-label-md text-[#CDAA63] font-semibold whitespace-nowrap">
            METHODIST CHURCH
          </span>
          <div className="flex-grow border-t h-px min-w-[12px] border-[#CDAA63]/40"></div>
        </div>

        {/* Meaningful Sacred Phrase in Classical Playfair Italic */}
        <div className="mt-1 flex items-center justify-center gap-2.5">
          <span className="text-[#CDAA63]/60 text-[9px]">✦</span>
          <p 
            className="font-playfair italic text-[16px] md:text-[18px] font-normal tracking-[0.02em] text-[#F4E7D3]/95 text-center drop-shadow-sm"
            style={{ 
              fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
              textShadow: '0 1px 6px rgba(0,0,0,0.7)'
            }}
          >
            {loadingMessage}
          </p>
          <span className="text-[#CDAA63]/60 text-[9px]">✦</span>
        </div>

        {/* Minimal Progress Hairline */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/50 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-[#CDAA63] to-transparent w-full animate-church-shimmer" />
        </div>
      </div>
    </aside>
  );
}
