"use client";

import React, { useState } from "react";
import Link from "next/link";
import { churchHistoryEvents, SourceType } from "@/data/church-history";
import { chapelSymbolsData } from "@/data/chapel-symbols";
import { pattersonAccountData } from "@/data/patterson-history";
import { pastorInChargeData, pastorateCommitteeData, ministryLeadersData } from "@/data/church-leadership";
import TimeCapsuleModal from "@/components/TimeCapsuleModal";
import MemoryShareModal from "@/components/MemoryShareModal";

export default function AboutPage() {
  const [isTimeCapsuleOpen, setIsTimeCapsuleOpen] = useState(false);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<SourceType | "all">("all");

  const filteredEvents = selectedSourceFilter === "all"
    ? churchHistoryEvents
    : churchHistoryEvents.filter(e => e.sourceType === selectedSourceFilter);

  return (
    <div
      className="relative w-full min-h-screen text-[#1F1F1F] -mt-[72px]"
      style={{
        backgroundImage: "url('/paper_background.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
      }}
    >
      {/* Modals */}
      <TimeCapsuleModal isOpen={isTimeCapsuleOpen} onClose={() => setIsTimeCapsuleOpen(false)} />
      <MemoryShareModal isOpen={isMemoryModalOpen} onClose={() => setIsMemoryModalOpen(false)} />

      {/* ==========================================
          SECTION 1: HERO — "A LIVING LEGACY"
         ========================================== */}
      <section className="relative w-full min-h-[640px] flex items-center justify-center pt-32 md:pt-36 pb-16 px-margin-mobile md:px-margin-desktop">
        {/* Deep Burgundy & Parchment Dissolve Background */}
        <div
          className="absolute inset-x-0 top-0 -bottom-36 md:-bottom-48 z-0 bg-[#4A0F1A] pointer-events-none"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.85) 70%, rgba(0,0,0,0.3) 88%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 55%, rgba(0,0,0,0.85) 70%, rgba(0,0,0,0.3) 88%, transparent 100%)',
          }}
        >
          {/* Subtle Archival Pencil Hero Sketch Background Overlay */}
          <div
            className="bg-cover bg-center w-full h-full opacity-35 mix-blend-luminosity transform scale-105"
            style={{ backgroundImage: "url('/images/about/hero_archival_sketch.png')" }}
          ></div>
          <div className="absolute inset-0 bg-[rgba(25,8,8,0.45)]"></div>
        </div>

        {/* Hero Content Box */}
        <div className="relative z-10 text-center max-w-4xl mx-auto mt-12 animate-fade-in-up">
          <div className="flex flex-col items-center mb-6 w-full">
            <span className="text-[#CDAA63] font-label-md tracking-[0.25em] uppercase text-xs md:text-sm font-semibold mb-3 drop-shadow">
              A Legacy of Faith &bull; A Community of Service &bull; A Story Still Being Written
            </span>
            <div className="h-px w-36 bg-[rgba(205,170,99,0.4)]"></div>
          </div>

          <h1 className="font-display-lg text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] font-bold text-[#F4E7D3] font-serif mb-6 drop-shadow-lg">
            Ingraham Shalom Methodist Church
          </h1>

          <div className="inline-flex items-center gap-2 bg-[#CDAA63]/20 border border-[#CDAA63]/30 px-4 py-1.5 rounded-full text-[#F4E7D3] font-label-md text-xs tracking-widest uppercase mb-8 backdrop-blur-sm">
            <span className="material-symbols-outlined text-sm text-[#CDAA63]">location_on</span>
            Ghaziabad, India
          </div>

          {/* Pencil Illustration Frame in Hero */}
          <div className="max-w-xl mx-auto rounded-2xl overflow-hidden border border-[#8B6A4F]/30 shadow-2xl bg-[#F4E7D3]/10 backdrop-blur-sm p-3">
            <img
              src="/images/about/hero_archival_sketch.png"
              alt="Archival Pencil Sketch of Ingraham Chapel"
              className="w-full h-64 md:h-72 object-cover rounded-xl filter contrast-105"
            />
            <p className="font-serif italic text-xs text-[#F4E7D3]/80 mt-2">
              Archival Sketch: Ingraham Sanctuary &amp; Campus Sanctuary Grounds
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: OUR STORY
         ========================================== */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 order-2 md:order-1 relative reveal-on-scroll">
            <div className="absolute -inset-3 bg-[#4A0F1A]/10 rounded-2xl transform -rotate-1 z-0"></div>
            <div className="relative z-10 rounded-2xl overflow-hidden border-2 border-[#8B6A4F]/30 shadow-ambient bg-[#F4E7D3] p-4">
              <img
                className="rounded-xl object-cover w-full h-auto"
                alt="Early Chapel Sketch"
                src="/images/about/early_chapel_sketch.png"
              />
              <div className="mt-3 text-center">
                <span className="font-serif italic text-xs text-[#5D4129]">
                  Architectural memory of the original right-wing campus chapel
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7 order-1 md:order-2 reveal-on-scroll delay-100">
            <span className="font-label-md text-xs uppercase tracking-widest text-[#7A451A] font-bold mb-2 block">
              Living Heritage
            </span>
            <h2 className="font-headline-md text-3xl md:text-4xl text-[#3B0B14] font-serif font-bold mb-4">
              Our Story Through the Years
            </h2>
            <div className="w-16 h-1 bg-[#4A0F1A]/40 mb-6"></div>

            <p className="font-body-lg text-base md:text-lg text-[#2A1E17] mb-4 leading-relaxed font-serif">
              The story of Ingraham Shalom Methodist Church is a testament to faith, sacrifice, and community service. What began as a vision for a dedicated campus sanctuary within the Ingraham Institute has grown into a vibrant, full-fledged parish church serving families across Ghaziabad.
            </p>
            <p className="font-body-md text-sm md:text-base text-[#3D2E24]/90 leading-relaxed mb-6">
              From children carrying earth on ponies during construction to an internationally recognized choir singing at Vigyan Bhavan, our legacy is rooted in active Christian fellowship and worship.
            </p>

            <div className="p-4 rounded-xl bg-[#4A0F1A]/[0.05] border-l-4 border-[#4A0F1A] text-xs text-[#5D4129]">
              <span className="font-bold text-[#3B0B14] block mb-1">Archival Integrity Notice</span>
              Historical accounts featured on this page preserve original firsthand memories recorded by campus witness V. Patterson (events approx. 1961–1966).
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: HISTORICAL TIMELINE
         ========================================== */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-label-md text-xs uppercase tracking-[0.2em] text-[#7A451A] font-bold block mb-2">
            Chronicle of Faith
          </span>
          <h2 className="font-headline-md text-3xl md:text-4xl text-[#3B0B14] font-serif font-bold mb-3">
            Historical Milestones
          </h2>
          <p className="font-body-md text-sm text-[#5D4129]">
            Explore the foundational moments that built our sanctuary and community.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <button
              onClick={() => setSelectedSourceFilter("all")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${selectedSourceFilter === "all"
                  ? "bg-[#4A0F1A] text-[#F4E7D3]"
                  : "bg-white/50 text-[#5D4129] hover:bg-[#4A0F1A]/10"
                }`}
            >
              All Events
            </button>
            <button
              onClick={() => setSelectedSourceFilter("oral-history")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${selectedSourceFilter === "oral-history"
                  ? "bg-[#4A0F1A] text-[#F4E7D3]"
                  : "bg-white/50 text-[#5D4129] hover:bg-[#4A0F1A]/10"
                }`}
            >
              Oral History (V. Patterson)
            </button>
            <button
              onClick={() => setSelectedSourceFilter("church-record")}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${selectedSourceFilter === "church-record"
                  ? "bg-[#4A0F1A] text-[#F4E7D3]"
                  : "bg-white/50 text-[#5D4129] hover:bg-[#4A0F1A]/10"
                }`}
            >
              Church Status Milestone
            </button>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Spine Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#8B6A4F]/20 via-[#4A0F1A]/40 to-[#8B6A4F]/20 -translate-x-1/2"></div>

          {/* Mobile Spine Line */}
          <div className="md:hidden absolute left-4 top-4 bottom-4 w-0.5 bg-[#4A0F1A]/30"></div>

          <div className="space-y-12 md:space-y-16">
            {filteredEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={event.id}
                  className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""
                    }`}
                >
                  {/* Timeline Point Indicator */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-[#F4E7D3] border-4 border-[#4A0F1A] shadow-md flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#CDAA63]"></div>
                  </div>

                  {/* Content Card */}
                  <div className="ml-12 md:ml-0 w-full md:w-[45%] p-2">
                    <div className="bg-white/60 backdrop-blur-sm border border-[#8B6A4F]/25 rounded-2xl p-6 shadow-ambient hover:shadow-lg transition-all duration-300 group">

                      {/* Period Badge & Source Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="bg-[#4A0F1A] text-[#F4E7D3] px-3 py-1 rounded-full text-xs font-bold font-serif">
                          {event.period}
                        </span>
                        <span className="text-[11px] uppercase tracking-wider text-[#7A451A] font-semibold bg-[#CDAA63]/20 px-2.5 py-0.5 rounded-full">
                          {event.sourceType === "oral-history" ? "Firsthand Memory" : "Church Milestone"}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#3B0B14] mb-2 group-hover:text-[#7A451A] transition-colors">
                        {event.title}
                      </h3>

                      <p className="font-body-md text-sm text-[#2A1E17] mb-4 leading-relaxed font-serif">
                        {event.shortDescription}
                      </p>

                      {/* Archival Illustration */}
                      {event.illustration && (
                        <div className="mb-4 rounded-xl overflow-hidden border border-[#8B6A4F]/20 bg-[#F4E7D3]/60 p-2">
                          <img
                            src={event.illustration}
                            alt={event.title}
                            className="w-full h-44 object-cover rounded-lg grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                      )}

                      <p className="text-xs text-[#3D2E24]/80 leading-relaxed mb-4">
                        {event.detailedDescription}
                      </p>

                      {/* Quote snippet if present */}
                      {event.quote && (
                        <div className="italic text-xs text-[#4A0F1A] border-l-2 border-[#CDAA63] pl-3 py-1 font-serif bg-[#4A0F1A]/[0.03] rounded-r-lg mb-4">
                          &ldquo;{event.quote}&rdquo;
                        </div>
                      )}

                      {/* People involved tags */}
                      {event.people && event.people.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#8B6A4F]/15 text-[11px] text-[#5D4129]">
                          <span className="font-bold uppercase tracking-wider">People:</span>
                          {event.people.map((person, pIdx) => (
                            <span key={pIdx} className="bg-[#4A0F1A]/5 px-2 py-0.5 rounded text-[#3B0B14]">
                              {person}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Special Interactive Trigger for Time Capsule */}
                      {event.isInteractiveTimeCapsule && (
                        <div className="mt-4 pt-3 border-t border-[#8B6A4F]/20 text-center">
                          <button
                            onClick={() => setIsTimeCapsuleOpen(true)}
                            className="inline-flex items-center gap-2 bg-[#4A0F1A] text-[#F4E7D3] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#3B0B14] transition-all shadow-sm"
                          >
                            <span className="material-symbols-outlined text-sm text-[#CDAA63]">lock_open</span>
                            Interactive: Unseal Time Capsule
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 4: CHAPEL SYMBOLS
         ========================================== */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-[#4A0F1A]/[0.04] backdrop-blur-[1px] rounded-3xl my-12 border border-[#8B6A4F]/20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-label-md text-xs uppercase tracking-[0.2em] text-[#7A451A] font-bold block mb-2">
            Sacred Craft & Architecture
          </span>
          <h2 className="font-headline-md text-3xl md:text-4xl text-[#3B0B14] font-serif font-bold mb-3">
            The Symbols Within Our Chapel
          </h2>
          <p className="font-body-md text-sm text-[#5D4129]">
            Architectural features incorporated by Architect Mr. King, as remembered by V. Patterson.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8">
          {chapelSymbolsData.map((symbol) => (
            <div
              key={symbol.id}
              className="bg-white/70 backdrop-blur-sm border border-[#8B6A4F]/20 rounded-2xl p-5 shadow-ambient hover:-translate-y-1 hover:border-[#4A0F1A]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-44 rounded-xl overflow-hidden border border-[#8B6A4F]/15 mb-4 bg-[#F4E7D3]">
                  <img
                    src={symbol.illustration}
                    alt={symbol.name}
                    className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#CDAA63] block mb-1">
                  {symbol.subtitle}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#3B0B14] mb-2">
                  {symbol.name}
                </h3>
                <p className="text-xs text-[#2A1E17] leading-relaxed mb-3">
                  {symbol.description}
                </p>
              </div>

              <div className="bg-[#4A0F1A]/[0.04] p-3 rounded-lg border-l-2 border-[#4A0F1A] text-[11px] text-[#5D4129]">
                <strong className="text-[#3B0B14] block mb-0.5">Historical Meaning:</strong>
                {symbol.historicalMeaning}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 5: A STORY TOLD FROM MEMORY — V. PATTERSON
         ========================================== */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto relative z-10">
        <div className="bg-[#F4E7D3] border-2 border-[#8B6A4F]/30 rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden">
          {/* Archival Parchment Texture Header */}
          <div className="text-center mb-10 pb-8 border-b border-[#8B6A4F]/30">
            <span className="font-label-md text-xs uppercase tracking-[0.25em] text-[#CDAA63] font-bold block mb-2">
              Primary Historical Document
            </span>
            <h2 className="font-headline-md text-3xl sm:text-4xl text-[#3B0B14] font-serif font-bold mb-2">
              History of Ingraham Methodist Church
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-[#7A451A]">
              By V. Patterson
            </p>
            <div className="mt-4 inline-block bg-[#4A0F1A]/10 text-[#4A0F1A] px-4 py-1 rounded-full text-xs font-semibold">
              {pattersonAccountData.subtitle} &bull; Approx. {pattersonAccountData.approximatePeriod}
            </div>
          </div>

          {/* Long-Form Verbatim Reading Column */}
          <div className="space-y-8 text-[#1F1F1F]">
            {pattersonAccountData.paragraphs.map((p, idx) => (
              <div key={p.id} className="relative">
                {p.sectionTitle && (
                  <h3 className="font-serif text-lg font-bold text-[#4A0F1A] mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#CDAA63]"></span>
                    {p.sectionTitle}
                  </h3>
                )}

                <p className="font-serif text-base sm:text-lg leading-relaxed text-[#2A1E17]">
                  {idx === 0 ? (
                    <span className="float-left text-5xl font-serif font-bold text-[#4A0F1A] pr-3 leading-none">
                      T
                    </span>
                  ) : null}
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          {/* Verbatim Integrity Seal */}
          <div className="mt-12 pt-8 border-t border-[#8B6A4F]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5D4129]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#CDAA63]">verified</span>
              <span>Preserved verbatim from Patterson manuscript without alteration.</span>
            </div>
            <span className="italic font-serif">Recorded period: 1961–1966</span>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 6: TRANSITION BANNER
         ========================================== */}
      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center relative z-10">
        <div className="bg-[#4A0F1A] text-[#F4E7D3] rounded-2xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#CDAA63]/30">
          <div className="text-left">
            <span className="text-[#CDAA63] text-xs font-bold uppercase tracking-widest block mb-1">
              The Continuity of Mission
            </span>
            <h3 className="font-serif text-2xl font-bold">
              The Story We Inherited &rarr; The People Who Carry It Forward
            </h3>
          </div>
          <div className="h-px md:h-12 w-full md:w-px bg-[#CDAA63]/30"></div>
          <p className="font-serif italic text-sm text-[#F4E7D3]/90 max-w-md text-left">
            Faith is passed from generation to generation. Today, our pastor, committee, and ministry leaders continue the mission begun over six decades ago.
          </p>
        </div>
      </section>

      {/* ==========================================
          SECTION 7: CURRENT CHURCH LEADERSHIP & PASTOR-IN-CHARGE
         ========================================== */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-label-md text-xs uppercase tracking-[0.2em] text-[#7A451A] font-bold block mb-2">
            Present Day Servant Leadership
          </span>
          <h2 className="font-headline-md text-3xl md:text-4xl text-[#3B0B14] font-serif font-bold mb-3">
            The People Who Serve Our Church
          </h2>
          <p className="font-body-md text-sm text-[#5D4129]">
            Meeting those who guide worship, spiritual growth, and community care.
          </p>
        </div>

        {/* Featured Profile: Pastor-in-Charge */}
        <div className="bg-white/70 backdrop-blur-sm border-2 border-[#4A0F1A]/30 rounded-3xl p-8 md:p-10 shadow-2xl mb-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Picture Placeholder */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-56 h-64 rounded-2xl bg-[#4A0F1A]/10 border-2 border-dashed border-[#8B6A4F]/40 flex flex-col items-center justify-center p-4 text-center">
                <span className="material-symbols-outlined text-5xl text-[#4A0F1A] mb-2">person</span>
                <span className="font-serif font-bold text-sm text-[#3B0B14]">Pastor Photo</span>
                <span className="text-[11px] text-[#7A451A] bg-[#CDAA63]/20 px-2.5 py-1 rounded-full mt-2 font-semibold">
                  [Photo Under Development]
                </span>
              </div>
            </div>

            {/* Bio & Pastoral Message */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div>
                <span className="bg-[#4A0F1A] text-[#F4E7D3] px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase font-serif">
                  {pastorInChargeData.role}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B0B14] mt-2">
                  {pastorInChargeData.name}
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-[#F4E7D3]/60 border border-[#8B6A4F]/20">
                <p className="font-serif italic text-sm text-[#2A1E17] leading-relaxed">
                  &ldquo;{pastorInChargeData.messagePlaceholder}&rdquo;
                </p>
              </div>

              <p className="text-xs text-[#5D4129]">
                {pastorInChargeData.bioPlaceholder}
              </p>
            </div>
          </div>
        </div>

        {/* Pastorate Committee Section */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl font-bold text-[#3B0B14] text-center mb-8">
            Pastorate Committee
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastorateCommitteeData.map((member) => (
              <div
                key={member.id}
                className="bg-white/60 backdrop-blur-sm border border-[#8B6A4F]/20 rounded-2xl p-6 text-center shadow-ambient hover:border-[#4A0F1A]/30 transition-all"
              >
                {/* Photo Placeholder */}
                <div className="w-24 h-24 rounded-full bg-[#4A0F1A]/10 border border-dashed border-[#8B6A4F]/40 mx-auto mb-4 flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-[#4A0F1A]">account_circle</span>
                  <span className="text-[9px] font-bold text-[#7A451A]">[Under Dev]</span>
                </div>

                <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-wider block mb-1">
                  {member.role}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#3B0B14] mb-2">
                  {member.name}
                </h4>
                <p className="text-xs text-[#5D4129] italic mb-2">
                  {member.messagePlaceholder}
                </p>
                <p className="text-[11px] text-[#3D2E24]/70">
                  {member.bioPlaceholder}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            SECTION 8: MINISTRY LEADERS
           ========================================== */}
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#3B0B14] text-center mb-8">
            Leaders of Our Church Family
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministryLeadersData.map((leader) => (
              <div
                key={leader.id}
                className="bg-white/60 backdrop-blur-sm border border-[#8B6A4F]/20 rounded-2xl p-6 text-center shadow-ambient hover:border-[#4A0F1A]/30 transition-all"
              >
                <div className="w-24 h-24 rounded-full bg-[#4A0F1A]/10 border border-dashed border-[#8B6A4F]/40 mx-auto mb-4 flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-[#4A0F1A]">groups</span>
                  <span className="text-[9px] font-bold text-[#7A451A]">[Under Dev]</span>
                </div>

                <span className="text-xs font-bold text-[#CDAA63] uppercase tracking-wider block mb-1">
                  {leader.role}
                </span>
                <h4 className="font-serif text-lg font-bold text-[#3B0B14] mb-2">
                  {leader.name}
                </h4>
                <p className="text-xs text-[#5D4129] italic mb-2">
                  {leader.messagePlaceholder}
                </p>
                <p className="text-[11px] text-[#3D2E24]/70">
                  {leader.bioPlaceholder}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 9: OUR MINISTRIES CTA
         ========================================== */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        <div className="bg-[#F4E7D3] border-2 border-[#8B6A4F]/30 rounded-3xl p-8 sm:p-12 text-center shadow-xl">
          <span className="font-label-md text-xs uppercase tracking-[0.2em] text-[#CDAA63] font-bold block mb-2">
            Serving Through Ministry
          </span>
          <h2 className="font-headline-md text-3xl font-serif font-bold text-[#3B0B14] mb-4">
            Living Out Faith Together
          </h2>
          <p className="font-body-lg text-base text-[#2A1E17] max-w-2xl mx-auto mb-8 font-serif leading-relaxed">
            Our church&apos;s ministries bring together children, youth, families, and the wider congregation through worship, fellowship, and compassionate community service.
          </p>

          <Link
            href="/ministries"
            className="inline-flex items-center gap-3 bg-[#4A0F1A] text-[#F4E7D3] px-8 py-4 rounded-xl font-label-md text-sm font-bold uppercase tracking-wider hover:bg-[#3B0B14] transition-all shadow-lg hover:shadow-xl group"
          >
            <span>Explore Our Ministries</span>
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* ==========================================
          SECTION 10: THE STORY CONTINUES
         ========================================== */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        <div className="bg-[#4A0F1A] text-[#F4E7D3] rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl relative overflow-hidden border border-[#CDAA63]/30">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-7 space-y-6 text-left">
              <span className="text-[#CDAA63] font-label-md text-xs uppercase tracking-[0.25em] font-bold block">
                Past &bull; Present &bull; Future
              </span>
              <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight">
                The Story Continues
              </h2>
              <p className="font-body-lg text-base sm:text-lg text-[#F4E7D3]/90 font-serif leading-relaxed">
                The story of Ingraham Shalom Methodist Church is not simply a historical record frozen in time. It continues today through every prayer offered, every hymn sung, and every act of service performed by our congregation.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => setIsMemoryModalOpen(true)}
                  className="bg-[#CDAA63] text-[#3B0B14] px-6 py-3.5 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-[#F4E7D3] transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">edit_note</span>
                  Share a Memory
                </button>
                <Link
                  href="/contact"
                  className="border border-[#F4E7D3]/40 text-[#F4E7D3] px-6 py-3.5 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold hover:bg-white/10 transition-all"
                >
                  Visit Our Sanctuary
                </Link>
              </div>
            </div>

            {/* Concluding Illustration */}
            <div className="md:col-span-5">
              <div className="rounded-2xl overflow-hidden border-2 border-[#CDAA63]/40 shadow-2xl p-2 bg-[#F4E7D3]/10 backdrop-blur-sm">
                <img
                  src="/images/about/story_continues_sketch.png"
                  alt="The Story Continues Sketch"
                  className="w-full h-64 md:h-72 object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
