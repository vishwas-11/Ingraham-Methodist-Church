import Link from 'next/link';
import { ChurchEvent } from '@/data/events';

interface EventCardProps {
  event: ChurchEvent;
  buttonText?: string;
}

export default function EventCard({ event, buttonText = 'View Details' }: EventCardProps) {
  const isYoutube = Boolean(event.youtubeUrl || event.image.includes('youtube.com'));

  return (
    <div className="bg-[#190808] rounded-[24px] border border-white/10 shadow-xl overflow-hidden hover:border-[#CDAA63]/40 transition-all duration-300 flex flex-col group relative">
      {/* Top Image Section with Overlaid Date & Title */}
      <Link href={`/events/${event.slug}`} className="relative aspect-[16/10] w-full overflow-hidden block bg-[#190808]">
        <img
          src={event.image}
          alt={event.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isYoutube ? 'scale-[1.34] group-hover:scale-[1.41]' : 'scale-100 group-hover:scale-105'
          }`}
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#190808] via-[#190808]/70 to-transparent pointer-events-none"></div>

        {/* Play Icon Badge for Video Events */}
        {event.youtubeUrl && (
          <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[#CDAA63] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-xl">play_arrow</span>
          </div>
        )}

        {/* Overlaid Metadata & Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="text-[#CDAA63] font-label-md text-[13px] md:text-[14px] mb-2 flex items-center gap-2 drop-shadow-md">
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>{event.date}</span>
            {event.time && event.time !== 'Special Service' && event.time !== 'Cantata Service' && event.time !== 'Easter Service' && (
              <span>• {event.time}</span>
            )}
          </div>
          <h3 className="font-display-lg text-[22px] md:text-[26px] text-[#F4E7D3] leading-tight drop-shadow-md line-clamp-2">
            {event.title}
          </h3>
        </div>
      </Link>

      {/* Bottom Content Area */}
      <div className="p-6 pt-2 flex flex-col flex-grow bg-[#190808]">
        <p className="font-body-md text-[#D9C7B3] text-[15px] leading-relaxed mb-6 flex-grow line-clamp-3">
          {event.shortDescription}
        </p>

        <Link
          href={`/events/${event.slug}`}
          className="bg-[#CDAA63] text-[#190808] px-6 py-2.5 rounded-full font-label-md text-[14px] font-medium hover:bg-[#E5BF74] transition-colors self-start inline-flex items-center gap-2 shadow-md"
        >
          {buttonText} <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
