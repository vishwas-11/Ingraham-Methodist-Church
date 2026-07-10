import Image from "next/image";
import Link from "next/link";
import VideoScrollBackground from "@/components/VideoScrollBackground";
import Footer from "@/components/Footer";
import DailyVerseClient from "@/components/DailyVerseClient";
import { getUpcomingEvents } from "@/data/events";
async function getDailyVerse() {
  try {
    // Generate a date string based on IST (Asia/Kolkata) to force a new fetch at midnight IST
    const istDate = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const res = await fetch(`https://labs.bible.org/api/?passage=votd&type=json&_bust=${istDate}`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0];
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const dailyVerse = await getDailyVerse() || {
    bookname: "John",
    chapter: "1",
    verse: "5",
    text: "The light shines in the darkness, and the darkness has not overcome it."
  };

  return (
    <>
      {/* Background Canvas for GSAP Video Scroll */}
      <VideoScrollBackground />

      {/* Minimalist Hero Section */}
      <section className="relative w-full min-h-screen -mt-[72px] flex flex-col justify-center px-margin-mobile md:px-0 z-10">
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)] pointer-events-none z-0"></div>

        {/* Left-Aligned Text Content */}
        <div className="relative z-10 max-w-[540px] w-full mx-auto md:mx-0 md:ml-[110px] flex flex-col items-start text-left animate-fade-in-up mt-16 md:mt-20 px-4 md:px-0">
          
          <div className="flex items-center gap-3 md:gap-4 mb-5 max-w-full opacity-95">
            <span className="w-[30px] md:w-[60px] shrink-0 h-px bg-gradient-to-l from-[#CDAA63] via-[#CDAA63]/50 to-transparent"></span>
            <span 
              className="font-label-md tracking-[0.25em] md:tracking-[0.3em] uppercase text-[12px] md:text-[14px] font-medium whitespace-nowrap bg-gradient-to-r from-[#CDAA63] via-[#F4E7D3] to-[#CDAA63] bg-clip-text text-transparent" 
              style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }}
            >
              Welcome Home
            </span>
            <span className="w-[30px] md:w-[60px] shrink-0 h-px bg-gradient-to-r from-[#CDAA63] via-[#CDAA63]/50 to-transparent"></span>
          </div>

          <h1 className="font-display-lg text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] leading-[1.05] text-[#F4E7D3] mb-4 tracking-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
            Beyond <span className="font-playfair italic font-normal text-[#F4E7D3]/90">silence,</span><br /> we build <br className="hidden md:block" /><span className="font-playfair italic font-normal text-[#F4E7D3]/90">the eternal.</span>
          </h1>

          <div className="h-px w-full max-w-[400px] bg-[rgba(205,170,99,0.35)] mb-5"></div>

          {/* Daily Verse Section */}
          <DailyVerseClient initialVerse={dailyVerse} />

          <div className="flex flex-wrap items-center gap-4">
            <Link 
              href="/about" 
              className="group relative overflow-hidden bg-[#3B0B14] px-8 py-3.5 rounded-full transition-all duration-300 inline-flex items-center justify-center min-w-[160px] border border-[#5C1120]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_14px_rgba(0,0,0,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_6px_20px_rgba(0,0,0,0.4)] hover:border-[#731528]/80 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              {/* Subtle Depth Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] to-transparent pointer-events-none rounded-full"></div>

              {/* Realistic Subtle Grain (No heavy contrast) */}
              <div 
                className="absolute inset-0 mix-blend-overlay opacity-[0.25] pointer-events-none rounded-full" 
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
              ></div>
              
              {/* Text with Refined Gold Polish */}
              <div className="relative z-10 flex items-center justify-center gap-2.5">
                <span className="font-playfair font-bold tracking-[0.06em] text-[16px] bg-gradient-to-r from-[#E8D6C0] via-[#FFF8E6] to-[#E8D6C0] bg-[length:200%_auto] group-hover:bg-[position:100%_center] bg-clip-text text-transparent transition-all duration-700 ease-out drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]">
                  Discover
                </span>
                
                {/* Elegant Custom Arrow */}
                <svg className="w-[18px] h-[18px] text-[#F0D58C] drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] group-hover:translate-x-1 transition-transform duration-500 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
            <Link href="/sermons" className="bg-transparent border border-[rgba(205,170,99,0.35)] text-[#D9C7B3] px-8 py-3.5 rounded-full font-label-md text-[14px] hover:bg-[rgba(205,170,99,0.05)] transition-all duration-300 inline-flex items-center justify-center min-w-[160px]">
              <span className="material-symbols-outlined mr-2 text-[18px]">play_circle</span> Watch Sermons
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Component 1: Upcoming Events */}
      <section className="relative w-full py-24 md:py-32 px-margin-mobile md:px-margin-desktop z-10">
        <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)] pointer-events-none z-0"></div>
        <div className="max-w-[1200px] mx-auto reveal-on-scroll relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="font-display-lg text-[32px] md:text-[48px] text-[#F4E7D3] leading-tight drop-shadow-sm" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
                Upcoming <span className="font-playfair italic font-normal text-[#F4E7D3]/80">Events</span>
              </h2>
              <p className="font-body-md text-[#D9C7B3] text-[16px] mt-4 max-w-xl">
                Join us in our upcoming gatherings. Experience deep fellowship, spiritual growth, and community.
              </p>
            </div>
            <Link href="/events" className="inline-flex items-center gap-2 text-[#CDAA63] font-label-md hover:opacity-70 transition-opacity border-b border-[#CDAA63]/30 pb-1 shrink-0">
              Browse all events <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-[900px] mx-auto">
            {getUpcomingEvents().slice(0, 2).map((event) => (
              <div key={event.id} className="bg-black/30 backdrop-blur-md rounded-[24px] border border-white/10 shadow-2xl overflow-hidden hover:bg-black/40 transition-colors duration-300 flex flex-col group">
                <Link href={`/events/${event.slug}`} className="relative aspect-[16/9] w-full overflow-hidden block">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="text-[#CDAA63] font-label-md text-sm mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                    {event.date} • {event.time}
                  </div>
                  <h3 className="font-display-lg text-[22px] md:text-[24px] text-[#F4E7D3] mb-4">
                    <Link href={`/events/${event.slug}`} className="hover:text-[#CDAA63] transition-colors">{event.title}</Link>
                  </h3>
                  <p className="font-body-md text-[#D9C7B3] text-[15px] leading-relaxed mb-6 flex-grow">
                    {event.shortDescription}
                  </p>
                  <Link href={`/events/${event.slug}`} className="bg-white/5 border border-white/10 text-[#F4E7D3] px-6 py-2.5 rounded-full font-label-md text-[13px] hover:bg-white/10 transition-colors self-start inline-flex items-center gap-2">
                    Learn More <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Website Navigation Features Section */}
      <section className="relative w-full py-24 px-margin-mobile md:px-margin-desktop z-10 border-t border-[#CDAA63]/10">
        <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)] pointer-events-none z-0"></div>
        <div className="max-w-[1200px] mx-auto reveal-on-scroll relative z-10">
          <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-display-lg text-[32px] md:text-[48px] text-[#F4E7D3] leading-tight drop-shadow-sm mb-4" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
                Explore <span className="font-playfair italic font-normal text-[#F4E7D3]/80">Ingraham</span>
              </h2>
              <p className="font-body-md text-[#D9C7B3] text-[16px] max-w-xl">
                Navigate through our website to listen to past messages, connect with our community, and learn about our rich history.
              </p>
            </div>
          </div>

          <div className="flex flex-col border-t border-white/10">
            {[
              { title: "Sermons & Messages", desc: "Listen to past teachings and find spiritual nourishment for your daily walk.", href: "/sermons", number: "01" },
              { title: "Ministries & Small Groups", desc: "Connect with others, grow in faith, and serve the community together.", href: "/ministries", number: "02" },
              { title: "About Us & Our History", desc: "Learn about our roots, our beliefs, and the vision that guides us forward.", href: "/about", number: "03" }
            ].map((item, i) => (
              <Link 
                key={i} 
                href={item.href}
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-14 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-500 overflow-hidden"
              >
                {/* Subtle hover background sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#CDAA63]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out -translate-x-full group-hover:translate-x-0 pointer-events-none"></div>

                {/* Number */}
                <div className="text-[#CDAA63]/30 font-label-md text-xl md:text-2xl mb-4 md:mb-0 md:w-32 group-hover:text-[#CDAA63] transition-colors duration-500 font-light tracking-wider relative z-10">
                  {item.number}
                </div>
                
                {/* Text Content */}
                <div className="flex-grow pr-8 relative z-10">
                  <h3 className="font-display-lg text-[28px] md:text-[40px] text-[#F4E7D3] mb-3 group-hover:translate-x-4 group-hover:text-white transition-all duration-500 ease-out">
                    {item.title}
                  </h3>
                  <p className="font-body-md text-[#D9C7B3] text-[16px] md:text-[18px] max-w-2xl group-hover:translate-x-4 transition-transform duration-500 delay-75 ease-out">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out z-10">
                  <div className="w-14 h-14 rounded-full border border-[#CDAA63]/50 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:bg-[#CDAA63] group-hover:border-[#CDAA63]">
                    <span className="material-symbols-outlined text-[#CDAA63] group-hover:text-black transition-colors text-2xl">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
