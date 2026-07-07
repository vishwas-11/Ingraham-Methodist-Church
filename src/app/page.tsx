import Image from "next/image";
import Link from "next/link";
import VideoScrollBackground from "@/components/VideoScrollBackground";

export default function Home() {
  return (
    <>
      {/* Background Canvas for GSAP Video Scroll */}
      <VideoScrollBackground />

      {/* Minimalist Hero Section */}
      <section className="relative w-full min-h-screen -mt-[72px] flex flex-col justify-center px-margin-mobile md:px-margin-desktop z-10">
        
        {/* Left-Aligned Text Content (No Block/Box) */}
        <div className="relative z-10 max-w-2xl w-full mx-auto md:mx-0 md:ml-[5%] lg:ml-[10%] flex flex-col items-start text-left animate-fade-in-up mt-24">
          <h1 className="font-display-lg text-[40px] sm:text-[50px] md:text-[64px] lg:text-[72px] leading-[1.1] text-surface-bright mb-6 tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
            Beyond <span className="font-playfair italic font-normal text-surface-bright/90">silence,</span><br/> we <span className="font-bold">build</span> <span className="font-playfair italic font-normal text-surface-bright/90">the eternal.</span>
          </h1>
          
          <p className="font-body-md text-surface-bright/95 mb-8 text-[16px] leading-relaxed sm:text-[18px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            Building platforms for brilliant minds, fearless makers, and thoughtful souls. Through the noise, we craft digital havens for deep work and pure flows.
          </p>
          
          <Link href="/visit" className="bg-primary-container text-on-primary px-8 py-3.5 rounded-full font-label-md text-[14px] hover:bg-primary transition-all duration-300 shadow-ambient inline-flex items-center justify-center min-w-[160px] drop-shadow-md">
            Begin Journey
          </Link>
        </div>
      </section>

      {/* Demo Component 1: Philosophy / Intro */}
      <section className="relative w-full py-24 md:py-32 px-margin-mobile md:px-margin-desktop z-10">
        <div className="max-w-[1200px] mx-auto reveal-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="bg-black/40 p-8 md:p-12 rounded-[32px] border border-white/5 shadow-2xl">
              <h2 className="font-display-lg text-[32px] md:text-[48px] text-surface-bright mb-6 leading-tight drop-shadow-sm">
                A sanctuary for <br/> <span className="font-playfair italic font-normal text-surface-bright/80">deep thought.</span>
              </h2>
              <p className="font-body-md text-surface-bright/90 text-[16px] leading-relaxed mb-8 drop-shadow-sm">
                In a world optimized for speed, we optimize for depth. Our community gathers not to rush through the motions, but to sit with the questions that matter most. We believe that true clarity emerges only when we dare to step away from the noise.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-surface-bright font-label-md hover:opacity-70 transition-opacity border-b border-surface-bright/30 pb-1">
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
        <div className="max-w-[1200px] mx-auto reveal-on-scroll">
          <div className="flex justify-center w-full mb-16">
            <div className="text-center max-w-2xl bg-black/40 p-8 rounded-[32px] border border-white/5 shadow-2xl">
              <h2 className="font-display-lg text-[32px] md:text-[40px] text-surface-bright mb-4 drop-shadow-sm">Our Practices</h2>
              <p className="font-body-md text-surface-bright/90 drop-shadow-sm">Rhythms designed to ground you in the present and orient you toward the eternal.</p>
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
                  <span className="material-symbols-outlined text-surface-bright">{item.icon}</span>
                </div>
                <h3 className="font-display-lg text-[22px] text-surface-bright mb-3 drop-shadow-sm">{item.title}</h3>
                <p className="font-body-md text-surface-bright/80 text-[14px] leading-relaxed mb-6 flex-grow drop-shadow-sm">{item.desc}</p>
                <div className="mt-auto">
                  <span className="material-symbols-outlined text-surface-bright/50 group-hover:text-surface-bright transition-colors">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
