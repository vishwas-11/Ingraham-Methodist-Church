"use client";

import React, { useState } from "react";

interface TimeCapsuleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TimeCapsuleModal({ isOpen, onClose }: TimeCapsuleModalProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
      <div 
        className="relative w-full max-w-2xl bg-[#F4E7D3] border-2 border-[#8B6A4F]/40 rounded-2xl shadow-2xl p-6 md:p-8 text-[#1F1F1F] overflow-hidden"
        style={{
          backgroundImage: "url('/paper_background.png')",
          backgroundRepeat: "repeat",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#4A0F1A] hover:bg-[#4A0F1A]/10 p-2 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <span className="font-label-md text-xs uppercase tracking-[0.2em] text-[#CDAA63] block mb-1">
            Archival Interactive Artifact
          </span>
          <h3 className="font-headline-md text-2xl md:text-3xl text-[#3B0B14] font-serif font-bold">
            The Cornerstone Time Capsule
          </h3>
          <p className="font-body-md text-sm text-[#5D4129] max-w-lg mx-auto mt-1">
            Sealed behind the chapel cornerstone during construction (approx. 1962–1963)
          </p>
        </div>

        {/* Cornerstone Box Illustration & Reveal Area */}
        <div className="bg-[#4A0F1A]/[0.05] border border-[#8B6A4F]/20 rounded-xl p-6 text-center relative mb-6">
          <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56 mb-4 flex items-center justify-center">
            <img
              src="/images/about/time_capsule_cornerstone_sketch.png"
              alt="Cornerstone and Time Capsule Box"
              className={`w-full h-full object-contain transition-all duration-700 ${
                isRevealed ? "scale-105 filter drop-shadow-md" : "hover:scale-102"
              }`}
            />
            {!isRevealed && (
              <div className="absolute inset-0 bg-[#4A0F1A]/20 backdrop-blur-[2px] rounded-lg flex flex-col items-center justify-center p-4 text-white text-center">
                <span className="material-symbols-outlined text-4xl mb-2 text-[#CDAA63]">lock</span>
                <p className="font-serif text-sm font-semibold mb-3">Time Capsule Box Sealed</p>
                <button
                  onClick={() => setIsRevealed(true)}
                  className="bg-[#4A0F1A] text-[#F4E7D3] px-4 py-2 rounded-lg font-label-md text-xs uppercase tracking-wider font-bold shadow-md hover:bg-[#3B0B14] transition-all"
                >
                  Click to Unseal Box
                </button>
              </div>
            )}
          </div>

          {/* Revealed Contents */}
          {isRevealed && (
            <div className="animate-fade-in-up space-y-4 text-left border-t border-[#8B6A4F]/20 pt-4 mt-2">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg font-bold text-[#3B0B14] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#CDAA63]">inventory_2</span>
                  Time Capsule Contents Revealed
                </h4>
                <span className="text-xs bg-[#CDAA63]/20 text-[#5D4129] px-2.5 py-1 rounded-full font-bold">
                  Historical Record
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white/60 p-3 rounded-lg border border-[#8B6A4F]/20">
                  <span className="material-symbols-outlined text-[#4A0F1A] text-2xl mb-1">menu_book</span>
                  <h5 className="font-bold text-xs text-[#3B0B14] mb-1">An Open Holy Bible</h5>
                  <p className="text-[11px] text-[#5D4129] leading-tight">
                    Placed open inside the metal box as the spiritual foundation.
                  </p>
                </div>
                <div className="bg-white/60 p-3 rounded-lg border border-[#8B6A4F]/20">
                  <span className="material-symbols-outlined text-[#4A0F1A] text-2xl mb-1">newspaper</span>
                  <h5 className="font-bold text-xs text-[#3B0B14] mb-1">That Day&apos;s Newspaper</h5>
                  <p className="text-[11px] text-[#5D4129] leading-tight">
                    Preserving the date, news, and world context of the cornerstone ceremony.
                  </p>
                </div>
                <div className="bg-white/60 p-3 rounded-lg border border-[#8B6A4F]/20">
                  <span className="material-symbols-outlined text-[#4A0F1A] text-2xl mb-1">badge</span>
                  <h5 className="font-bold text-xs text-[#3B0B14] mb-1">Contributor Roll</h5>
                  <p className="text-[11px] text-[#5D4129] leading-tight">
                    Handwritten list of staff, hostel boys, children, and builders who helped.
                  </p>
                </div>
              </div>

              <blockquote className="italic text-xs text-[#4A0F1A] border-l-2 border-[#CDAA63] pl-3 py-1 font-serif">
                &ldquo;All this we did as we were told that a time capsule box will be placed behind the corner stone... It was a very proud moment for all of us.&rdquo; — V. Patterson
              </blockquote>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between text-xs text-[#5D4129]">
          <span>Source: Oral History of V. Patterson</span>
          {isRevealed && (
            <button
              onClick={() => setIsRevealed(false)}
              className="text-[#4A0F1A] underline hover:text-[#3B0B14] font-medium"
            >
              Reseal Box
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
