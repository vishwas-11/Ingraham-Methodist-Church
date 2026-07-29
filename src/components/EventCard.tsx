import Link from 'next/link';
import { ChurchEvent } from '@/data/events';

interface EventCardProps {
  event: ChurchEvent;
  buttonText?: string;
}

export default function EventCard({ event, buttonText = 'Discover More' }: EventCardProps) {
  const isYoutube = Boolean(event.youtubeUrl || event.image.includes('youtube.com'));

  return (
    <div className="bg-gradient-to-b from-[#3B0B14] via-[#2A050B] to-[#1A0307] rounded-[28px] border-2 border-[#CDAA63] shadow-[0_0_20px_rgba(205,170,99,0.25),0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 flex flex-col group relative p-4">
      {/* Top Media Section */}
      <Link href={`/events/${event.slug}`} className="relative aspect-[4/3] w-full rounded-[20px] overflow-hidden block bg-[#1A0307]">
        <img
          src={event.image}
          alt={event.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isYoutube ? 'scale-[1.34] group-hover:scale-[1.41]' : 'scale-100 group-hover:scale-105'
          }`}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
      </Link>

      {/* Bottom Content Section */}
      <div className="pt-2 px-2 pb-2 flex flex-col flex-grow relative">
        {/* Stylized Gold Ribbon Date Badge - Positioned cleanly in front without clipping */}
        <div className="self-center -mt-6 mb-4 z-30 relative whitespace-nowrap">
          <div className="px-5 py-1.5 bg-gradient-to-r from-[#E5BF74] via-[#CDAA63] to-[#E5BF74] border border-[#8C6D46] text-[#2A050B] rounded-full font-mono text-[12px] font-bold flex items-center gap-1.5 shadow-[0_4px_14px_rgba(0,0,0,0.45)]">
            <span className="material-symbols-outlined text-[15px] text-[#2A050B]">calendar_month</span>
            <span>{event.date}</span>
          </div>
        </div>

        {/* Event Title in Large White Elegant Serif Font */}
        <h3 className="font-playfair text-[20px] font-bold text-[#F4E7D3] leading-[1.3] mb-3 group-hover:text-[#CDAA63] transition-colors line-clamp-2">
          <Link href={`/events/${event.slug}`}>{event.title}</Link>
        </h3>

        {/* Description in Clean White/Warm Sans-Serif Font */}
        <p className="font-sans text-[#E0D5C1] text-[14px] leading-relaxed mb-6 flex-grow line-clamp-3">
          {event.shortDescription}
        </p>

        {/* Large Rounded Pill-Shaped Gold Button */}
        <Link
          href={`/events/${event.slug}`}
          className="bg-[#CDAA63] text-[#1A0307] px-6 py-2.5 rounded-full font-label-md text-[14px] font-bold hover:bg-[#E5BF74] transition-all self-start inline-flex items-center gap-2 shadow-lg"
        >
          {buttonText} <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
