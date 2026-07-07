import Image from "next/image";
import Link from "next/link";
import VideoScrollBackground from "@/components/VideoScrollBackground";

export default function Home() {
  return (
    <>
      {/* Background Canvas for GSAP Video Scroll */}
      <VideoScrollBackground />

      {/* Minimalist Hero Section */}
      <section className="relative w-full min-h-screen -mt-[72px] flex flex-col justify-center px-margin-mobile md:px-0 z-10">
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)] pointer-events-none z-0"></div>

        {/* Left-Aligned Text Content */}
        <div className="relative z-10 max-w-[540px] w-full mx-auto md:mx-0 md:ml-[110px] flex flex-col items-start text-left animate-fade-in-up mt-24 px-4 md:px-0">
          
          <div className="flex items-center gap-3 md:gap-4 mb-8 opacity-90 max-w-full">
            <span className="w-[30px] md:w-[60px] shrink-0 h-px bg-gradient-to-l from-[#CDAA63]/60 to-transparent"></span>
            <span 
              className="text-[#CDAA63] font-label-md tracking-[0.25em] md:tracking-[0.3em] uppercase text-[12px] md:text-[14px] font-medium whitespace-nowrap" 
              style={{ textShadow: '0 2px 12px rgba(0,0,0,.4), 0 0 20px rgba(205,170,99,0.2)' }}
            >
              Welcome Home
            </span>
            <span className="w-[30px] md:w-[60px] shrink-0 h-px bg-gradient-to-r from-[#CDAA63]/60 to-transparent"></span>
          </div>

          <h1 className="font-display-lg text-[48px] sm:text-[56px] md:text-[72px] lg:text-[80px] leading-[1.05] text-[#F4E7D3] mb-6 tracking-tight" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
            Beyond <span className="font-playfair italic font-normal text-[#F4E7D3]/90">silence,</span><br /> we build <br className="hidden md:block" /><span className="font-playfair italic font-normal text-[#F4E7D3]/90">the eternal.</span>
          </h1>

          <div className="h-px w-full max-w-[400px] bg-[rgba(205,170,99,0.35)] mb-8"></div>

          <p className="font-body-md text-[#D9C7B3] mb-10 text-[16px] leading-relaxed sm:text-[18px]" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
            Building platforms for brilliant minds, fearless makers,<br className="hidden md:block" /> and thoughtful souls.<br />
            Through the noise, we craft digital havens for<br className="hidden md:block" /> deep work and pure flows.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="bg-[#651A2D] text-[#F4E7D3] px-8 py-3.5 rounded-full font-label-md text-[14px] hover:bg-[#7A2338] transition-all duration-300 inline-flex items-center justify-center min-w-[160px] border border-transparent">
              Discover <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
            </Link>
            <Link href="/sermons" className="bg-transparent border border-[rgba(205,170,99,0.35)] text-[#D9C7B3] px-8 py-3.5 rounded-full font-label-md text-[14px] hover:bg-[rgba(205,170,99,0.05)] transition-all duration-300 inline-flex items-center justify-center min-w-[160px]">
              <span className="material-symbols-outlined mr-2 text-[18px]">play_circle</span> Watch Sermons
            </Link>
          </div>
        </div>
      </section>

      {/* Demo Component 1: Philosophy / Intro */}
      <section className="relative w-full py-24 md:py-32 px-margin-mobile md:px-margin-desktop z-10">
        <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)] pointer-events-none z-0"></div>
        <div className="max-w-[1200px] mx-auto reveal-on-scroll relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="bg-black/40 p-8 md:p-12 rounded-[32px] border border-white/5 shadow-2xl">
              <h2 className="font-display-lg text-[32px] md:text-[48px] text-[#F4E7D3] mb-6 leading-tight drop-shadow-sm" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
                A sanctuary for <br /> <span className="font-playfair italic font-normal text-[#F4E7D3]/80">deep thought.</span>
              </h2>
              <p className="font-body-md text-[#D9C7B3] text-[16px] leading-relaxed mb-8 drop-shadow-sm" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
                In a world optimized for speed, we optimize for depth. Our community gathers not to rush through the motions, but to sit with the questions that matter most. We believe that true clarity emerges only when we dare to step away from the noise.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-[#CDAA63] font-label-md hover:opacity-70 transition-opacity border-b border-[#CDAA63]/30 pb-1">
                Explore our philosophy <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden shadow-ambient">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV-UE0krJrh54dNNb42Z22zFUo4D2GilN7qkEHwsM-Eba9EMtTtkkdiw5W59rBuT3yd_4mOnE5K5rQA8Q25KYtd9vfbaFtBbUoQvuZRhrhceVXQaXpgCV9vPLvaoPS61XjoeeDud1UyxrjOdK10zlfsDZXlYx-KLI42RBVwfN8HMaWmoDg1eoil3Q-r1_zcD-yXC4Xe0IpeJugrtJiZ0harRojlT8LEFkHf30nYXRkLPY0OXvp6hO8"
                alt="Sanctuary interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Demo Component 2: Rhythms & Practices */}
      <section className="relative w-full py-24 px-margin-mobile md:px-margin-desktop z-10">
        <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)] pointer-events-none z-0"></div>
        <div className="max-w-[1200px] mx-auto reveal-on-scroll relative z-10">
          <div className="flex justify-center w-full mb-16">
            <div className="text-center max-w-2xl bg-black/40 p-8 rounded-[32px] border border-white/5 shadow-2xl">
              <h2 className="font-display-lg text-[32px] md:text-[40px] text-[#F4E7D3] mb-4 drop-shadow-sm" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>Our Practices</h2>
              <p className="font-body-md text-[#D9C7B3] drop-shadow-sm" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>Rhythms designed to ground you in the present and orient you toward the eternal.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: "church", title: "Sunday Liturgy", desc: "A time-honored rhythm of worship, reflection, and communion." },
              { icon: "self_improvement", title: "Contemplative Prayer", desc: "Guided silence to quiet the mind and listen closely to what matters." },
              { icon: "menu_book", title: "Theological Study", desc: "Rigorous exploration of sacred texts, history, and traditions." }
            ].map((item, i) => (
              <div key={i} className="bg-black/40 rounded-[24px] p-8 border border-white/5 shadow-2xl flex flex-col items-start hover:bg-black/50 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 border border-white/10">
                  <span className="material-symbols-outlined text-[#CDAA63]">{item.icon}</span>
                </div>
                <h3 className="font-display-lg text-[22px] text-[#F4E7D3] mb-3 drop-shadow-sm" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>{item.title}</h3>
                <p className="font-body-md text-[#D9C7B3] text-[14px] leading-relaxed mb-6 flex-grow drop-shadow-sm" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>{item.desc}</p>
                <div className="mt-auto">
                  <span className="material-symbols-outlined text-[#CDAA63]/50 group-hover:text-[#CDAA63] transition-colors">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
