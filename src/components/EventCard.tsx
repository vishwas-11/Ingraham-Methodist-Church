import Link from 'next/link';
import { ChurchEvent, getResolvedEventStatus } from '@/data/events';

interface EventCardProps {
  event: ChurchEvent;
  buttonText?: string;
}

export default function EventCard({ event, buttonText = 'Discover More' }: EventCardProps) {
  const isYoutube = Boolean(event.youtubeUrl || event.image.includes('youtube.com'));
  const status = getResolvedEventStatus(event);

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

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-20 pointer-events-none">
          {status === 'live' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.85)] border border-red-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              LIVE NOW
            </span>
          ) : status === 'upcoming' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-[#CDAA63] text-[#1A0307] shadow-lg border border-[#FBF5B7]">
              <span className="w-2 h-2 rounded-full bg-[#1A0307] animate-pulse"></span>
              Upcoming
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-[#3B0B14]/90 text-[#F4E7D3] backdrop-blur-md shadow-lg border border-[#CDAA63]/40">
              <span className="w-2 h-2 rounded-full bg-[#CDAA63]"></span>
              Past Event
            </span>
          )}
        </div>
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

        {/* Action Button */}
        <Link
          href={`/events/${event.slug}`}
          className={`${
            status === 'live'
              ? 'bg-red-600 hover:bg-red-500 text-white border-red-400 shadow-[0_4px_16px_rgba(220,38,38,0.5)]'
              : 'bg-[#CDAA63] hover:bg-[#E5BF74] text-[#1A0307] border-[#F4E7D3]/20 shadow-[0_4px_14px_rgba(0,0,0,0.3)]'
          } px-6 py-2.5 rounded-full font-label-md text-[14px] font-bold transition-all duration-300 self-start inline-flex items-center gap-2 border group/btn`}
        >
          {status === 'live' ? 'Watch Live' : buttonText}{' '}
          <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform duration-300">
            {status === 'live' ? 'sensors' : 'arrow_forward'}
          </span>
        </Link>
      </div>
    </div>
  );
}
