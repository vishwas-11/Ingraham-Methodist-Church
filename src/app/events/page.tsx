import Link from 'next/link';
import { getUpcomingEvents, getPastEvents } from '@/data/events';
import EventCard from '@/components/EventCard';

export const metadata = {
  title: 'Events | Ingraham Methodist Church',
  description: 'Join our upcoming events and fellowship gatherings at Ingraham Methodist Church.',
};

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[614px] min-h-[400px] flex items-center justify-center -mt-[72px]">
        <div className="absolute inset-0 z-0 bg-[#4A0F1A]">
          <div
            className="bg-cover bg-center w-full h-full opacity-40 mix-blend-luminosity"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1_pjniqL-arApjXUBGHweyH7WHsNExebhQoD7MOS_Nldvop6GkwrgAc_Pu7mubOzoJbCD4cO4WEiTy7GEDCj2MI0QnszfKIFob88S_zDE2qz6h7xj0PfNOoSQET75KGICTCSEBkOMuPI-GsNpnGeRS6WONqR1qD94kvvACbfLwD8hdAzeYJBeT_xa0EVO1JkBjbrtRgzu6s42ACZ25YvrJzTEqHZWVIS8jsnRFSetwM3u-pXssgt3')" }}
          ></div>
          <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f3e7d3] to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto mt-24">
          <div className="flex flex-col items-center mb-6 w-full">
            <span className="text-[#CDAA63] font-label-md tracking-[0.2em] uppercase text-[12px] md:text-[13px] mb-3" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>Fellowship & Gathering</span>
            <div className="h-px w-32 bg-[rgba(205,170,99,0.35)]"></div>
          </div>
          <h1 className="font-display-lg text-[48px] md:text-[72px] leading-[1.05] text-[#F4E7D3] mb-6 animate-fade-in-up" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
            Our Gatherings & Events
          </h1>
          <p className="font-body-lg text-[#D9C7B3] max-w-2xl mx-auto animate-smooth-render" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
            Explore our calendar of upcoming activities, and look back at the moments that have shaped our community.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop animate-fade-in-up mt-stack-lg mb-16">
        
        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-12">
            {/* Header: UPCOMING EVENTS Title in Classic Old-Styled Serif & Clean Decorative Flourish Divider */}
            <div className="text-center mb-14 flex flex-col items-center">
              <h2 className="font-serif text-[38px] md:text-[56px] font-bold tracking-[0.18em] text-[#3B0B14] uppercase leading-none drop-shadow-sm">
                UPCOMING EVENTS
              </h2>
              {/* Centered Decorative Horizontal Divider Line with Central Diamond Flourish */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="h-[1.5px] w-20 md:w-32 bg-gradient-to-r from-transparent via-[#3B0B14]/40 to-[#3B0B14]/80"></div>
                <div className="flex items-center gap-1.5 text-[#3B0B14]">
                  <span className="w-1 h-1 rounded-full bg-[#3B0B14]"></span>
                  <span className="w-2.5 h-2.5 rotate-45 bg-[#3B0B14]"></span>
                  <span className="w-1 h-1 rounded-full bg-[#3B0B14]"></span>
                </div>
                <div className="h-[1.5px] w-20 md:w-32 bg-gradient-to-l from-transparent via-[#3B0B14]/40 to-[#3B0B14]/80"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} buttonText="View Details" />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Golden Cross Separator between Upcoming Events and Past Events */}
      <div className="w-full flex items-center justify-center my-12 py-2">
        <div className="flex items-center gap-3 max-w-[800px] w-full px-margin-mobile md:px-margin-desktop">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#CDAA63]/50 to-[#CDAA63]"></div>
          <div className="w-1.5 h-1.5 rotate-45 bg-[#CDAA63]"></div>
          <div className="text-[#CDAA63] text-2xl font-bold px-2 select-none leading-none drop-shadow-sm">✝</div>
          <div className="w-1.5 h-1.5 rotate-45 bg-[#CDAA63]"></div>
          <div className="h-px flex-1 bg-gradient-to-r from-[#CDAA63] via-[#CDAA63]/50 to-transparent"></div>
        </div>
      </div>

      {/* Full-bleed Past Events Section with Warm Antique Parchment & Glowing Golden Metallic Wave Border */}
      {pastEvents.length > 0 && (
        <section className="relative w-full pt-16 pb-28 bg-[#F6EEDA] overflow-hidden">
          {/* Background Layer: Antique Parchment + Soft Diffused Light + Sweeping Burgundy Wave + Glowing Gold Metallic Strip */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Diffused Soft Light & Antique Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/50 via-[#F6EEDA]/70 to-[#E9DAC6]/90"></div>

            {/* Subtle Parchment Paper Grain Texture */}
            <div 
              className="absolute inset-0 opacity-25 mix-blend-multiply" 
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")` }}
            ></div>

            {/* Sweeping Deep Burgundy Wave + Glowing Metallic Gold Strip */}
            <svg
              className="absolute bottom-0 left-0 w-full h-[75%]"
              viewBox="0 0 1440 600"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Metallic Gold Gradient */}
                <linearGradient id="goldMetallicStrip" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B38728" />
                  <stop offset="20%" stopColor="#FBF5B7" />
                  <stop offset="50%" stopColor="#DAA520" />
                  <stop offset="80%" stopColor="#FBF5B7" />
                  <stop offset="100%" stopColor="#AA771C" />
                </linearGradient>

                {/* Soft Gold Glow Filter */}
                <filter id="goldGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Deep Burgundy Wave Fill */}
              <path
                d="M 0 280 C 350 480, 850 200, 1440 340 L 1440 600 L 0 600 Z"
                fill="#3B0B14"
              />

              {/* Glowing Ambient Outer Gold Aura */}
              <path
                d="M 0 280 C 350 480, 850 200, 1440 340"
                fill="none"
                stroke="#FBF5B7"
                strokeWidth="14"
                opacity="0.45"
                filter="url(#goldGlowEffect)"
              />

              {/* Prominent Glowing Golden Metallic Strip following exact top curve */}
              <path
                d="M 0 280 C 350 480, 850 200, 1440 340"
                fill="none"
                stroke="url(#goldMetallicStrip)"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            {/* Section Header: PAST EVENTS Title in Classic Old-Styled Serif & Clean Decorative Flourish Divider */}
            <div className="text-center mb-16 flex flex-col items-center">
              <h2 className="font-serif text-[42px] md:text-[64px] font-bold tracking-[0.18em] text-[#3B0B14] uppercase leading-none drop-shadow-sm">
                PAST EVENTS
              </h2>
              {/* Centered Decorative Horizontal Divider Line with Central Diamond Flourish */}
              <div className="flex items-center justify-center gap-3 mt-5">
                <div className="h-[1.5px] w-20 md:w-32 bg-gradient-to-r from-transparent via-[#3B0B14]/40 to-[#3B0B14]/80"></div>
                <div className="flex items-center gap-1.5 text-[#3B0B14]">
                  <span className="w-1 h-1 rounded-full bg-[#3B0B14]"></span>
                  <span className="w-2.5 h-2.5 rotate-45 bg-[#3B0B14]"></span>
                  <span className="w-1 h-1 rounded-full bg-[#3B0B14]"></span>
                </div>
                <div className="h-[1.5px] w-20 md:w-32 bg-gradient-to-l from-transparent via-[#3B0B14]/40 to-[#3B0B14]/80"></div>
              </div>
            </div>

            {/* 3 Bento Event Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-[1240px] mx-auto">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} buttonText="Discover More" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
