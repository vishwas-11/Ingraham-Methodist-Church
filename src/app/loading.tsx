import React from "react";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading page"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-[#130306]/80 backdrop-blur-md"
    >
      {/* Ambient sanctuary glow spot */}
      <div className="absolute w-[360px] h-[360px] rounded-full bg-[#CDAA63]/10 blur-[100px] pointer-events-none" />

      {/* Sacred Royal Sanctuary Card */}
      <div className="relative flex flex-col items-center justify-center px-10 py-9 md:px-14 md:py-11 rounded-3xl bg-[rgba(24,5,9,0.94)] border border-[#CDAA63]/30 shadow-[0_28px_70px_rgba(0,0,0,0.75),inset_0_1px_2px_rgba(255,255,255,0.1)] overflow-hidden min-w-[300px] md:min-w-[360px]">
        {/* Top subtle golden hairline highlight */}
        <div className="absolute top-0 left-1/6 right-1/6 h-[1.5px] bg-gradient-to-r from-transparent via-[#CDAA63]/70 to-transparent" />

        {/* Sacred Cross & Flame Medallion */}
        <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#CDAA63]/25 animate-ping opacity-20" style={{ animationDuration: "3s" }} />
          <div className="absolute -inset-1 rounded-full border border-[#CDAA63]/30 animate-pulse" style={{ animationDuration: "2.4s" }} />

          <img
            src="/Methodist_logo (2).png"
            alt="Methodist Cross & Flame"
            className="h-12 w-auto object-contain drop-shadow-[0_2px_12px_rgba(205,170,99,0.45)] relative z-10 brightness-[1.08]"
          />
        </div>

        {/* Royal Classical Church Name */}
        <h2 
          className="font-playfair text-[26px] md:text-[30px] font-normal tracking-[0.03em] leading-none text-center bg-gradient-to-r from-[#E5BF74] via-[#FFF8E6] to-[#CDAA63] bg-clip-text text-transparent"
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.7))" }}
        >
          Ingraham Shalom
        </h2>

        {/* Classical Roman Sub-Insignia Rule */}
        <div className="flex items-center justify-center w-full max-w-[240px] mt-2 mb-3">
          <div className="flex-grow border-t h-px min-w-[12px] border-[#CDAA63]/40"></div>
          <span className="px-3 text-[7.5px] md:text-[8.5px] uppercase tracking-[0.26em] font-label-md text-[#CDAA63]/90 font-medium whitespace-nowrap">
            METHODIST CHURCH
          </span>
          <div className="flex-grow border-t h-px min-w-[12px] border-[#CDAA63]/40"></div>
        </div>

        {/* Meaningful Sacred Phrase in Classical Playfair Italic */}
        <div className="mt-1 flex items-center justify-center gap-2.5">
          <span className="text-[#CDAA63]/60 text-[9px]">✦</span>
          <p className="font-playfair italic text-[16px] md:text-[18px] font-normal tracking-[0.03em] text-[#F4E7D3]/95 text-center drop-shadow-sm">
            Grace &amp; Peace
          </p>
          <span className="text-[#CDAA63]/60 text-[9px]">✦</span>
        </div>

        {/* Minimal Progress Hairline */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/50 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-[#CDAA63] to-transparent w-full animate-church-shimmer" />
        </div>
      </div>
    </div>
  );
}
