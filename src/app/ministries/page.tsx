import Image from 'next/image';

export default function Ministries() {
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
      <section className="relative w-full h-[614px] min-h-[400px] flex items-center justify-center -mt-[72px]">
        {/* 
          Hero Background Photo & Burgundy Container:
          Extends 200px below hero bounds (-bottom-36 to -bottom-48)
          and uses a linear mask-image gradient to dissolve smoothly into transparent.
          Reveals the root paper_background.png seamlessly with zero horizontal seam.
        */}
        <div
          className="absolute inset-x-0 top-0 -bottom-36 md:-bottom-48 z-0 bg-[#4A0F1A] pointer-events-none"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.1) 90%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 45%, rgba(0,0,0,0.8) 60%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.1) 90%, transparent 100%)',
          }}
        >
          <div 
            className="bg-cover bg-center w-full h-full opacity-40 mix-blend-luminosity" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1_pjniqL-arApjXUBGHweyH7WHsNExebhQoD7MOS_Nldvop6GkwrgAc_Pu7mubOzoJbCD4cO4WEiTy7GEDCj2MI0QnszfKIFob88S_zDE2qz6h7xj0PfNOoSQET75KGICTCSEBkOMuPI-GsNpnGeRS6WONqR1qD94kvvACbfLwD8hdAzeYJBeT_xa0EVO1JkBjbrtRgzu6s42ACZ25YvrJzTEqHZWVIS8jsnRFSetwM3u-pXssgt3')" }}
          ></div>
          <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)]"></div>
        </div>

        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto mt-24">
          <div className="flex flex-col items-center mb-6 w-full">
            <span className="text-[#CDAA63] font-label-md tracking-[0.2em] uppercase text-[12px] md:text-[13px] mb-3" style={{ textShadow: '0 2px 14px rgba(0,0,0,0.7)' }}>Get Involved</span>
            <div className="h-px w-32 bg-[rgba(205,170,99,0.35)]"></div>
          </div>
          <h1 className="font-display-lg text-[48px] md:text-[72px] leading-[1.05] font-bold text-[#F4E7D3] mb-6 animate-fade-in-up" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}>
            Our Ministries
          </h1>
          <p className="font-body-lg text-[#F4E7D3] font-medium max-w-2xl mx-auto animate-smooth-render" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.85)' }}>
            Find your place in our community. We offer a variety of ministries designed to foster spiritual growth, fellowship, and service for all ages.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="relative z-10 flex-grow flex flex-col items-center w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-12 pb-24 md:pb-32 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter w-full">
          
          {/* Ministry Card: Youth */}
          <article className="bg-[#FFFDF9] text-on-surface rounded-2xl p-stack-md flex flex-col justify-between shadow-[0_8px_30px_rgba(59,11,20,0.08)] hover:-translate-y-1 transition-transform duration-300 border border-[#E5D8C7] reveal-on-scroll delay-100">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#3B0B14]/10 flex items-center justify-center mb-stack-sm text-[#4A0F1A]">
                <span className="material-symbols-outlined">groups</span>
              </div>
              <h3 className="font-headline-sm text-[#3B0B14] mb-unit">Youth Ministry</h3>
              <p className="font-body-md text-[#5C4A38] mb-stack-sm leading-relaxed">
                A vibrant community for middle and high school students to explore their faith, ask tough questions, and build lasting friendships in a safe environment.
              </p>
            </div>
            <button className="self-start text-[#7A451A] font-label-md hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-1 group">
              Get Involved <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </article>

          {/* Ministry Card: Women's Fellowship */}
          <article className="bg-[#FFFDF9] text-on-surface rounded-2xl p-stack-md flex flex-col justify-between shadow-[0_8px_30px_rgba(59,11,20,0.08)] hover:-translate-y-1 transition-transform duration-300 border border-[#E5D8C7] reveal-on-scroll delay-200">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#3B0B14]/10 flex items-center justify-center mb-stack-sm text-[#4A0F1A]">
                <span className="material-symbols-outlined">diversity_1</span>
              </div>
              <h3 className="font-headline-sm text-[#3B0B14] mb-unit">Women's Fellowship</h3>
              <p className="font-body-md text-[#5C4A38] mb-stack-sm leading-relaxed">
                Connecting women of all generations through Bible study, retreats, and local outreach, fostering deep spiritual roots and mutual support.
              </p>
            </div>
            <button className="self-start text-[#7A451A] font-label-md hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-1 group">
              Get Involved <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </article>

          {/* Ministry Card: Sunday School */}
          <article className="bg-[#FFFDF9] text-on-surface rounded-2xl p-stack-md flex flex-col justify-between shadow-[0_8px_30px_rgba(59,11,20,0.08)] hover:-translate-y-1 transition-transform duration-300 border border-[#E5D8C7] reveal-on-scroll delay-300">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#3B0B14]/10 flex items-center justify-center mb-stack-sm text-[#4A0F1A]">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <h3 className="font-headline-sm text-[#3B0B14] mb-unit">Sunday School</h3>
              <p className="font-body-md text-[#5C4A38] mb-stack-sm leading-relaxed">
                Foundational biblical education for children and adults, occurring every Sunday morning before our main worship service.
              </p>
            </div>
            <button className="self-start text-[#7A451A] font-label-md hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-1 group">
              Get Involved <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </article>

          {/* Ministry Card: Music Ministry */}
          <article className="bg-[#FFFDF9] text-on-surface rounded-2xl p-stack-md flex flex-col justify-between shadow-[0_8px_30px_rgba(59,11,20,0.08)] hover:-translate-y-1 transition-transform duration-300 border border-[#E5D8C7] lg:col-span-2 reveal-on-scroll">
            <div className="flex flex-col md:flex-row gap-stack-md h-full">
              <div className="md:w-1/2 rounded-xl overflow-hidden min-h-[200px] bg-surface-container-high relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMtuXp0CBq7dAypOwwYKP7hw1VWgKH6zbZPKqNJTOGIn5MG7owfwqVT1ZKFjYQl3i0KHiq-wZHEv4nC-IwIBqSkWf7VQjxGrsnBJahOZT67jvoR358IhTrtyDJtpYzT8-34f8XSPgv43O6VxsqHUBO0tBbUmOxQ8YceBADOmJfpnuN9xsfshtMbUiQeD3igiPJ5azN17VhnsplYV3e-a833ZfIvjBdrBhBAE-QzU8ZibDdvXtpJSGM')" }}
                ></div>
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <div className="w-12 h-12 rounded-full bg-[#3B0B14]/10 flex items-center justify-center mb-stack-sm text-[#4A0F1A]">
                  <span className="material-symbols-outlined">music_note</span>
                </div>
                <h3 className="font-headline-sm text-[#3B0B14] mb-unit">Music &amp; Worship Arts</h3>
                <p className="font-body-md text-[#5C4A38] mb-stack-sm leading-relaxed">
                  Lead the congregation in praise through our Chancel Choir, Handbell Ensemble, or contemporary worship band. We welcome all skill levels.
                </p>
                <button className="self-start text-[#7A451A] font-label-md hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-1 group mt-auto">
                  Get Involved <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
          </article>

          {/* Ministry Card: Local Outreach */}
          <article className="bg-[#FFFDF9] text-on-surface rounded-2xl p-stack-md flex flex-col justify-between shadow-[0_8px_30px_rgba(59,11,20,0.08)] hover:-translate-y-1 transition-transform duration-300 border border-[#E5D8C7] reveal-on-scroll delay-100">
            <div>
              <div className="w-12 h-12 rounded-full bg-[#3B0B14]/10 flex items-center justify-center mb-stack-sm text-[#4A0F1A]">
                <span className="material-symbols-outlined">volunteer_activism</span>
              </div>
              <h3 className="font-headline-sm text-[#3B0B14] mb-unit">Local Outreach</h3>
              <p className="font-body-md text-[#5C4A38] mb-stack-sm leading-relaxed">
                Serving our immediate community through the food pantry, homeless shelter partnerships, and neighborhood renewal projects.
              </p>
            </div>
            <button className="self-start text-[#7A451A] font-label-md hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-1 group">
              Get Involved <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </article>
        </div>
      </main>
    </div>
  );
}
