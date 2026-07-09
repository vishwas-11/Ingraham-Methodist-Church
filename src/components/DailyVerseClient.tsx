'use client';

import { useEffect, useState } from 'react';
import TextType from './TextType';

interface VerseData {
  bookname: string;
  chapter: string;
  verse: string;
  text: string;
}

export default function DailyVerseClient({ initialVerse }: { initialVerse: VerseData }) {
  const [dailyVerse, setDailyVerse] = useState<VerseData>(initialVerse);

  useEffect(() => {
    async function fetchVerse() {
      try {
        const istDate = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
        const res = await fetch(`https://labs.bible.org/api/?passage=votd&type=json&_bust=${istDate}`);
        if (!res.ok) return;
        const data = await res.json();
        setDailyVerse(data[0]);
      } catch (error) {
        console.error("Failed to fetch daily verse client-side:", error);
      }
    }
    
    fetchVerse();
  }, []);

  return (
    <div className="mb-6 pl-5 md:pl-6 border-l-2 border-[#CDAA63]/30 bg-[#CDAA63]/[0.02] py-2 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
      <span className="block font-label-md tracking-[0.2em] uppercase text-[11px] text-[#CDAA63] mb-2">Daily Verse</span>
      <blockquote className="font-playfair italic text-[#F4E7D3]/95 text-[18px] md:text-[20px] leading-relaxed mb-2 drop-shadow-sm min-h-[88px]">
        <TextType 
          key={dailyVerse.text}
          as="span"
          text={`"${dailyVerse.text.replace(/<[^>]*>?/gm, '').trim()}"`}
          typingSpeed={20}
          initialDelay={800}
          loop={false}
          showCursor={true}
          cursorCharacter="|"
          cursorClassName="text-[#CDAA63]/50 font-inter font-light"
        />
      </blockquote>
      <cite className="font-label-md text-[13px] text-[#D9C7B3] tracking-wide not-italic uppercase opacity-80">
        — {dailyVerse.bookname} {dailyVerse.chapter}:{dailyVerse.verse}
      </cite>
    </div>
  );
}
