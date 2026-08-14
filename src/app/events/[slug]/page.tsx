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
    <div
      className="relative w-full min-h-screen"
      style={{
        backgroundImage: "url('/paper_background.png')",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
        backgroundPosition: "top center",
      }}
    >
      {/* Hero Section */}
      <section className="relative w-full -mt-[72px] pt-32 md:pt-36 pb-20 min-h-[420px] flex flex-col justify-end">
        <div
          className="absolute inset-x-0 top-0 -bottom-28 md:-bottom-36 z-0 bg-[#3B0B14] pointer-events-none"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.15) 92%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.15) 92%, transparent 100%)',
          }}
        >
          <div 
            className="bg-cover bg-center w-full h-full opacity-40 mix-blend-luminosity" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1_pjniqL-arApjXUBGHweyH7WHsNExebhQoD7MOS_Nldvop6GkwrgAc_Pu7mubOzoJbCD4cO4WEiTy7GEDCj2MI0QnszfKIFob88S_zDE2qz6h7xj0PfNOoSQET75KGICTCSEBkOMuPI-GsNpnGeRS6WONqR1qD94kvvACbfLwD8hdAzeYJBeT_xa0EVO1JkBjbrtRgzu6s42ACZ25YvrJzTEqHZWVIS8jsnRFSetwM3u-pXssgt3')" }}
          ></div>
          <div className="absolute inset-0 bg-[rgba(25,8,8,0.45)]"></div>
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
      <main className="relative w-full pt-16 pb-24 px-margin-mobile md:px-margin-desktop text-primary">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter">
          
          {/* Left Column: Details & Information Notice */}
          <div className="lg:col-span-8">
            {event.isInfoPending ? (
              <div className="bg-white rounded-[24px] p-8 md:p-12 border border-[#EAE3D2] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBF3DB] text-[#956400] font-mono text-xs font-semibold tracking-wider uppercase mb-6 border border-[#E5BF74]/40">
                  <span className="w-2 h-2 rounded-full bg-[#956400]"></span>
                  Status Notice
                </div>
                <h2 className="font-display-md text-[28px] md:text-[34px] text-[#3B0B14] mb-4 font-bold">
                  Event Overview
                </h2>
                <p className="font-body-lg text-[#4A0F1A] text-[18px] font-medium leading-relaxed mb-6">
                  Full information regarding this event will be published soon.
                </p>
                <p className="font-body-md text-[#5A4533] leading-relaxed mb-8">
                  {event.shortDescription}
                </p>

                {event.youtubeUrl && (
                  <div className="pt-6 border-t border-[#EAE3D2]">
                    <a
                      href={event.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-[#3B0B14] text-[#F4E7D3] px-7 py-3.5 rounded-full font-label-md hover:bg-[#5A1220] transition-all duration-300 shadow-md group border border-[#CDAA63]/30"
                    >
                      <span className="material-symbols-outlined text-[20px] text-[#CDAA63] group-hover:scale-110 transition-transform">play_circle</span>
                      Watch Recording on YouTube
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-[24px] p-8 md:p-12 border border-[#EAE3D2] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-px bg-[#CDAA63]"></span>
                  <span className="font-mono text-[12px] tracking-[0.2em] text-[#8C6D46] uppercase font-semibold">Gathering Overview</span>
                </div>
                <h2 className="font-display-md text-[32px] md:text-[40px] text-[#3B0B14] mb-8 font-bold leading-tight">About this Event</h2>
                <div className="font-body-lg text-[#3C2D20] leading-relaxed space-y-6 text-[17px] md:text-[18px]">
                  <p>{event.longDescription}</p>
                </div>

                {/* Gallery (If any) */}
                {event.gallery && event.gallery.length > 0 && (
                  <div className="mt-16 pt-10 border-t border-[#EAE3D2]/80">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="material-symbols-outlined text-[#CDAA63] text-2xl">photo_library</span>
                      <h3 className="font-serif font-bold text-[24px] text-[#3B0B14]">Event Gallery & Banner</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {event.gallery.map((imgUrl, idx) => (
                        <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#EAE3D2] group relative">
                          <img src={imgUrl} alt={`${event.title} banner image ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Sleeker Sticky Sidebar Info */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 bg-white rounded-[24px] p-8 shadow-[0_12px_40px_rgba(59,11,20,0.06)] border border-[#EAE3D2] relative overflow-hidden">
              {/* Subtle Decorative Top Accent Line */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#3B0B14] via-[#CDAA63] to-[#3B0B14]"></div>
              
              <div className="flex items-center justify-between border-b border-[#EAE3D2] pb-5 mb-7">
                <h3 className="font-serif font-bold text-[24px] text-[#3B0B14]">Event Details</h3>
                <span className="text-[#CDAA63] text-xl">✝</span>
              </div>
              
              <ul className="space-y-6">
                {/* Date Row */}
                <li className="flex gap-4 items-start group">
                  <div className="w-11 h-11 rounded-2xl bg-[#3B0B14]/[0.06] border border-[#3B0B14]/10 flex items-center justify-center shrink-0 text-[#3B0B14] group-hover:bg-[#3B0B14] group-hover:text-[#F4E7D3] transition-colors duration-300 shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">calendar_today</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] text-[#8C6D46] uppercase tracking-widest font-semibold mb-1">Date</span>
                    <span className="font-body-md font-bold text-[#190808] text-[16px]">{event.date}</span>
                  </div>
                </li>
                
                {/* Time Row */}
                <li className="flex gap-4 items-start group">
                  <div className="w-11 h-11 rounded-2xl bg-[#3B0B14]/[0.06] border border-[#3B0B14]/10 flex items-center justify-center shrink-0 text-[#3B0B14] group-hover:bg-[#3B0B14] group-hover:text-[#F4E7D3] transition-colors duration-300 shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">schedule</span>
                  </div>
                  <div>
                    <span className="block font-mono text-[11px] text-[#8C6D46] uppercase tracking-widest font-semibold mb-1">Time</span>
                    <span className="font-body-md font-bold text-[#190808] text-[16px]">{event.time}</span>
                  </div>
                </li>
                
                {/* Location Row with Sleek Formatting & Google Maps Link */}
                <li className="flex gap-4 items-start group">
                  <div className="w-11 h-11 rounded-2xl bg-[#3B0B14]/[0.06] border border-[#3B0B14]/10 flex items-center justify-center shrink-0 text-[#3B0B14] group-hover:bg-[#3B0B14] group-hover:text-[#F4E7D3] transition-colors duration-300 shadow-sm">
                    <span className="material-symbols-outlined text-[22px]">location_on</span>
                  </div>
                  <div className="flex-1">
                    <span className="block font-mono text-[11px] text-[#8C6D46] uppercase tracking-widest font-semibold mb-1">Location</span>
                    <div className="font-body-md font-medium text-[#190808] text-[15px] leading-relaxed">
                      <p className="font-bold text-[#3B0B14]">Ingraham Methodist Church</p>
                      <p className="text-[14px] text-[#4A3B2C] mt-0.5">MFF2+JVG, Hapur Rd, Sector 11, Raj Kunj, Raj Nagar, Ghaziabad, Uttar Pradesh 201002</p>
                    </div>
                    
                    {/* Get Directions Link */}
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Ingraham+Methodist+Church+MFF2%2BJVG+Hapur+Rd+Sector+11+Raj+Kunj+Raj+Nagar+Ghaziabad+Uttar+Pradesh+201002"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-[13px] font-bold text-[#3B0B14] hover:text-[#7A1528] bg-[#3B0B14]/5 hover:bg-[#3B0B14]/10 px-3.5 py-1.5 rounded-full border border-[#3B0B14]/15 transition-all duration-200"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#CDAA63]">map</span>
                      Get Directions on Maps
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>
                </li>
              </ul>

              {/* Warm Invitation Callout Box */}
              <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-[#3B0B14]/[0.05] via-[#CDAA63]/[0.08] to-[#3B0B14]/[0.03] border border-[#CDAA63]/35 shadow-inner">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[20px] text-[#3B0B14]">favorite</span>
                  <span className="font-serif font-bold text-[16px] text-[#3B0B14]">Warm Invitation</span>
                </div>
                <p className="font-body-sm text-[14px] text-[#4A0F1A] font-medium leading-relaxed">
                  We warmly invite you, your family, and friends to celebrate with us in person at our sanctuary, or tune in online!
                </p>
              </div>

              {/* Primary Action Button: Watch Online / View Sermons */}
              <div className="mt-6">
                <Link
                  href="/sermons"
                  className="w-full bg-[#3B0B14] hover:bg-[#5A1220] text-[#F4E7D3] py-4 px-6 rounded-full font-label-md hover:shadow-xl transition-all duration-300 border border-[#CDAA63]/40 inline-flex items-center justify-center gap-2.5 group text-center shadow-md active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#CDAA63] group-hover:scale-110 transition-transform">
                    play_circle
                  </span>
                  <span className="font-bold tracking-wide text-[15px]">Watch Online / View Sermons</span>
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}

