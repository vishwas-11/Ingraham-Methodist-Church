import Link from 'next/link';
import { getUpcomingEvents, getPastEvents } from '@/data/events';

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
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop animate-fade-in-up mt-stack-lg mb-stack-xl">
        
        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-headline-lg text-[32px] text-primary">Upcoming Events</h2>
              <div className="h-px flex-grow bg-primary/20"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-primary text-white rounded-[24px] border border-primary/10 shadow-ambient overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 pointer-events-none z-10"></div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden z-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow relative z-20 -mt-32">
                    <div className="text-[#CDAA63] font-label-md text-sm mb-3 flex items-center gap-2 drop-shadow-md">
                      <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                      {event.date} • {event.time}
                    </div>
                    <h3 className="font-display-lg text-[28px] text-[#F4E7D3] mb-4 drop-shadow-md">
                      <Link href={`/events/${event.slug}`} className="hover:text-[#CDAA63] transition-colors">{event.title}</Link>
                    </h3>
                    <p className="font-body-md text-[#D9C7B3] text-[15px] leading-relaxed mb-6 flex-grow drop-shadow-md">
                      {event.shortDescription}
                    </p>
                    <Link href={`/events/${event.slug}`} className="bg-[#CDAA63] text-[#190808] px-6 py-2.5 rounded-full font-label-md text-[14px] hover:bg-white transition-colors self-start inline-flex items-center gap-2 shadow-lg">
                      View Details <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display-md text-[28px] text-[#4A0F1A]">Past Events</h2>
              <div className="h-px flex-grow bg-[#4A0F1A]/20"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`} className="bg-[#190808] rounded-[20px] border border-warm-brown/20 hover:border-[#CDAA63]/50 shadow-lg overflow-hidden hover:bg-[#2a0e0e] transition-all duration-300 group flex flex-col relative">
                  <div className="aspect-[3/2] w-full overflow-hidden relative z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#190808] via-transparent to-transparent opacity-90 pointer-events-none z-10"></div>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 sepia-[30%] group-hover:sepia-0"
                    />
                    <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md border border-white/10 text-[#F4E7D3] text-xs px-3 py-1.5 rounded-full font-label-sm z-20 shadow-lg">
                      {event.date}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow relative z-20">
                    <h3 className="font-display-md text-[20px] text-[#F4E7D3] mb-3 group-hover:text-[#CDAA63] transition-colors">{event.title}</h3>
                    <p className="font-body-sm text-[#D9C7B3] leading-relaxed line-clamp-3">
                      {event.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </>
  );
}
