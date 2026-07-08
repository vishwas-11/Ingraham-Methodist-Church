import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventBySlug, eventsData } from '@/data/events';

export async function generateStaticParams() {
  return eventsData.map((event) => ({
    slug: event.slug,
  }));
}

interface EventPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: EventPageProps) {
  const event = getEventBySlug(params.slug);
  if (!event) return { title: 'Event Not Found' };
  
  return {
    title: `${event.title} | Ingraham Methodist Church`,
    description: event.shortDescription,
  };
}

export default function EventDetailPage({ params }: EventPageProps) {
  const event = getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] flex items-end pb-16 -mt-[72px]">
        <div className="absolute inset-0 z-0 bg-[#190808]">
          <div 
            className="bg-cover bg-center w-full h-full opacity-60 mix-blend-luminosity" 
            style={{ backgroundImage: `url('${event.image}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#190808] via-[#190808]/60 to-transparent pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <Link href="/events" className="inline-flex items-center gap-2 text-[#CDAA63] font-label-md hover:opacity-70 transition-opacity mb-8">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Events
          </Link>
          <div className="flex flex-col items-start w-full">
            <span className="bg-[#CDAA63] text-[#190808] px-3 py-1 rounded-full font-label-sm tracking-wider uppercase mb-4 shadow-sm">
              {event.status === 'upcoming' ? 'Upcoming Event' : 'Past Event'}
            </span>
            <h1 className="font-display-lg text-[40px] md:text-[64px] leading-[1.1] text-[#F4E7D3] mb-4 drop-shadow-lg max-w-4xl">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="bg-[#f3e7d3] w-full pt-16 pb-24 px-margin-mobile md:px-margin-desktop text-primary">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter">
          
          {/* Left Column: Details & Gallery */}
          <div className="lg:col-span-8">
            <h2 className="font-headline-lg text-[32px] mb-6">About this Event</h2>
            <div className="font-body-lg text-on-surface-variant leading-relaxed space-y-6">
              <p>{event.longDescription}</p>
            </div>

            {/* Gallery (If any) */}
            {event.gallery && event.gallery.length > 0 && (
              <div className="mt-16">
                <h3 className="font-headline-md text-[24px] mb-6">Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.gallery.map((imgUrl, idx) => (
                    <div key={idx} className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
                      <img src={imgUrl} alt={`${event.title} gallery image ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar Info */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-white rounded-2xl p-8 shadow-ambient border border-warm-brown/10">
              <h3 className="font-headline-md text-[22px] mb-6 border-b border-warm-brown/20 pb-4">Event Details</h3>
              
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-warm-brown/10 flex items-center justify-center shrink-0 text-warm-brown">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </div>
                  <div>
                    <span className="block font-label-md text-on-surface-variant text-sm mb-1">Date</span>
                    <span className="font-body-md font-medium">{event.date}</span>
                  </div>
                </li>
                
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-warm-brown/10 flex items-center justify-center shrink-0 text-warm-brown">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <span className="block font-label-md text-on-surface-variant text-sm mb-1">Time</span>
                    <span className="font-body-md font-medium">{event.time}</span>
                  </div>
                </li>
                
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-warm-brown/10 flex items-center justify-center shrink-0 text-warm-brown">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <span className="block font-label-md text-on-surface-variant text-sm mb-1">Location</span>
                    <span className="font-body-md font-medium">{event.location}</span>
                  </div>
                </li>
              </ul>

              {event.status === 'upcoming' && (
                <div className="mt-8 pt-6 border-t border-warm-brown/20">
                  <button className="w-full bg-primary text-white py-3.5 rounded-full font-label-md hover:bg-primary/90 transition-colors shadow-md">
                    Register / Get Involved
                  </button>
                  <p className="text-center font-body-sm text-on-surface-variant mt-3">
                    All are welcome. Registration is free.
                  </p>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </main>
    </>
  );
}
