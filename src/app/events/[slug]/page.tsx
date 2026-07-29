import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventBySlug, eventsData } from '@/data/events';

export async function generateStaticParams() {
  return eventsData.map((event) => ({
    slug: event.slug,
  }));
}

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: 'Event Not Found' };
  
  return {
    title: `${event.title} | Ingraham Methodist Church`,
    description: event.shortDescription,
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full -mt-[72px] pt-32 md:pt-36 pb-16 min-h-[420px] flex flex-col justify-end">
        <div className="absolute inset-0 z-0 bg-[#190808]">
          <div 
            className="bg-cover bg-center w-full h-full opacity-40 mix-blend-luminosity" 
            style={{ backgroundImage: `url('${event.image}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#190808] via-[#190808]/75 to-[#190808]/40 pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <Link href="/events" className="inline-flex items-center gap-2 text-[#CDAA63] font-mono text-xs tracking-wider uppercase hover:opacity-80 transition-opacity mb-6">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Events
          </Link>
          <div className="flex flex-col items-start w-full">
            <h1 className="font-display-lg text-[32px] md:text-[50px] leading-[1.15] text-[#F4E7D3] mb-4 drop-shadow-lg max-w-4xl">
              {event.title}
            </h1>
            <div className="font-mono text-xs text-[#CDAA63] tracking-wider uppercase font-semibold">
              {event.date}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="bg-[#F9F7F2] w-full pt-16 pb-24 px-margin-mobile md:px-margin-desktop text-primary">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter">
          
          {/* Left Column: Details & Information Notice */}
          <div className="lg:col-span-8">
            {event.isInfoPending ? (
              <div className="bg-white rounded-[20px] p-8 md:p-12 border border-[#EAE3D2] shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBF3DB] text-[#956400] font-mono text-xs font-semibold tracking-wider uppercase mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#956400]"></span>
                  Status Notice
                </div>
                <h2 className="font-display-md text-[28px] text-[#3B0B14] mb-4">
                  Event Overview
                </h2>
                <p className="font-body-lg text-[#4A0F1A] text-[18px] font-medium leading-relaxed mb-6">
                  Full information regarding this event will be published soon.
                </p>
                <p className="font-body-md text-on-surface-variant leading-relaxed mb-8">
                  {event.shortDescription}
                </p>

                {event.youtubeUrl && (
                  <div className="pt-6 border-t border-[#EAE3D2]">
                    <a
                      href={event.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-[#4A0F1A] text-[#F4E7D3] px-6 py-3.5 rounded-full font-label-md hover:bg-[#3B0B14] transition-all duration-300 shadow-md group"
                    >
                      <span className="material-symbols-outlined text-[20px] text-[#CDAA63] group-hover:scale-110 transition-transform">play_circle</span>
                      Watch Recording on YouTube
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-[20px] p-8 md:p-12 border border-[#EAE3D2] shadow-sm">
                <h2 className="font-headline-lg text-[32px] text-[#3B0B14] mb-6">About this Event</h2>
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
            )}
          </div>

          {/* Right Column: Sticky Sidebar Info */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-white rounded-[20px] p-8 shadow-sm border border-[#EAE3D2]">
              <h3 className="font-display-md text-[22px] text-[#3B0B14] mb-6 border-b border-[#EAE3D2] pb-4">Event Details</h3>
              
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#4A0F1A]/10 flex items-center justify-center shrink-0 text-[#4A0F1A]">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] text-[#8C6D46] uppercase tracking-wider mb-1">Date</span>
                    <span className="font-body-md font-medium text-primary">{event.date}</span>
                  </div>
                </li>
                
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#4A0F1A]/10 flex items-center justify-center shrink-0 text-[#4A0F1A]">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] text-[#8C6D46] uppercase tracking-wider mb-1">Time / Service</span>
                    <span className="font-body-md font-medium text-primary">{event.time}</span>
                  </div>
                </li>
                
                <li className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-[#4A0F1A]/10 flex items-center justify-center shrink-0 text-[#4A0F1A]">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] text-[#8C6D46] uppercase tracking-wider mb-1">Location</span>
                    <span className="font-body-md font-medium text-primary">{event.location}</span>
                  </div>
                </li>
              </ul>

              {event.youtubeUrl && (
                <div className="mt-8 pt-6 border-t border-[#EAE3D2]">
                  <a
                    href={event.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#4A0F1A] text-[#F4E7D3] py-3.5 rounded-full font-label-md hover:bg-[#3B0B14] transition-all duration-300 shadow-md inline-flex items-center justify-center gap-2 group text-center"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#CDAA63]">play_circle</span>
                    Watch Event Video
                  </a>
                </div>
              )}

              {event.status === 'upcoming' && (
                <div className="mt-8 pt-6 border-t border-[#EAE3D2]">
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
