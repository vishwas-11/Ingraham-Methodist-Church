import Link from 'next/link';
import { ChurchEvent } from '@/data/events';

interface EventCardProps {
  event: ChurchEvent;
  buttonText?: string;
}

export default function EventCard({ event, buttonText = 'Discover More' }: EventCardProps) {
  const isYoutube = Boolean(event.youtubeUrl || event.image.includes('youtube.com'));

  return (
    <div className="bg-gradient-to-b from-[#3B0B14] via-[#2A050B] to-[#1A0307] rounded-[28px] border-2 border-[#CDAA63]/70 hover:border-[#CDAA63] shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_14px_40px_rgba(74,15,26,0.45)] transition-all duration-300 flex flex-col group relative p-4 overflow-hidden">
      {/* Top Media Section */}
      <Link href={`/events/${event.slug}`} className="relative aspect-[4/3] w-full rounded-[20px] overflow-hidden block bg-[#1A0307] border border-[#CDAA63]/20 shadow-inner">
        <img
          src={event.image}
          alt={event.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isYoutube ? 'scale-[1.34] group-hover:scale-[1.41]' : 'scale-100 group-hover:scale-105'
          }`}
        />
        {/* Soft Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
      </Link>

      {/* Bottom Content Section */}
      <div className="pt-2 px-2 pb-2 flex flex-col flex-grow relative">
        {/* Smooth Warm Gold Ribbon Date Badge */}
        <div className="self-center -mt-6 mb-4 z-30 relative whitespace-nowrap">
          <div className="px-5 py-1.5 bg-gradient-to-r from-[#E5BF74] via-[#CDAA63] to-[#E5BF74] border border-[#8C6D46]/60 text-[#1A0307] rounded-full font-mono text-[12px] font-bold flex items-center gap-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.4)]">
            <span className="material-symbols-outlined text-[15px] text-[#1A0307]">calendar_month</span>
            <span>{event.date}</span>
          </div>
        </div>

        {/* Event Title in Large White/Gold Elegant Serif Font */}
        <h3 className="font-playfair text-[20px] font-bold text-[#F4E7D3] leading-[1.3] mb-3 group-hover:text-[#CDAA63] transition-colors line-clamp-2 drop-shadow-sm">
          <Link href={`/events/${event.slug}`}>{event.title}</Link>
        </h3>

        {/* Description in Clean Warm Sans-Serif Font */}
        <p className="font-sans text-[#E0D5C1] text-[14px] leading-relaxed mb-6 flex-grow line-clamp-3">
          {event.shortDescription}
        </p>

        {/* Smooth Antique Gold Pill Button */}
        <Link
          href={`/events/${event.slug}`}
          className="bg-[#CDAA63] hover:bg-[#E5BF74] text-[#1A0307] px-6 py-2.5 rounded-full font-label-md text-[14px] font-bold shadow-[0_4px_14px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_20px_rgba(205,170,99,0.3)] transition-all duration-300 self-start inline-flex items-center gap-2 border border-[#F4E7D3]/20 group/btn"
        >
          {buttonText} <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform duration-300">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
