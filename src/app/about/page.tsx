export default function About() {
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
          Extends 200px below the hero bounds (-bottom-36 to -bottom-48)
          and uses a linear mask-image gradient to dissolve smoothly into transparent.
          Since paper_background.png is the background of the root page container,
          the photograph naturally dissolves directly into the parchment paper with ZERO horizontal seam.
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
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto mt-24">
          <div className="flex flex-col items-center mb-6 w-full">
            <span className="text-[#CDAA63] font-label-md tracking-[0.2em] uppercase text-[12px] md:text-[13px] mb-3" style={{ textShadow: '0 2px 14px rgba(0,0,0,0.7)' }}>A Legacy of Faith</span>
            <div className="h-px w-32 bg-[rgba(205,170,99,0.35)]"></div>
          </div>
          <h1 className="font-display-lg text-[48px] md:text-[72px] leading-[1.05] font-bold text-[#F4E7D3] mb-6 animate-fade-in-up" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}>
            Our Heritage & Hope
          </h1>
          <p className="font-body-lg text-[#F4E7D3] font-medium max-w-2xl mx-auto animate-smooth-render" style={{ textShadow: '0 2px 16px rgba(0,0,0,0.85)' }}>
            Rooted in tradition, growing in grace. Discover the story of Ingraham Methodist Church.
          </p>
        </div>
      </section>

      {/* Our History - Editorial Layout */}
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 order-2 md:order-1 relative reveal-on-scroll">
            <div className="absolute -inset-4 bg-[#4A0F1A]/8 rounded-2xl transform -rotate-2 z-0"></div>
            <img 
              className="relative z-10 rounded-2xl object-cover w-full h-auto shadow-ambient grayscale-[15%] sepia-[15%]" 
              alt="A close-up, high-quality image of an open, ancient leather-bound Bible" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVEha5nJSRF7L6Gd1MQTHv9kFIPmgcgon9l4u6VDrxemG7Ac8KYtgWr2iHf3CzZiZc9KJCSCCWSkD2W-5BzJZD3fYRiIGIwtQkx8jBtSLCFLHhHT2AJQYHPb5F7kqVFi7ftov4Uu0sMCtEfAF_PiijMCiAWcOezH17qRFt7yNySiAqlDlMh_-cpt6Z7tvSKCbjZ6b5s1yP4drnQ27207WLpo8Jp8cRHxmhGNyL-kZcyamP3h6qfWmm"
            />
          </div>
          <div className="md:col-span-6 md:col-start-7 order-1 md:order-2 reveal-on-scroll delay-100">
            <span className="font-label-md text-label-md text-[#7A451A] uppercase tracking-wider mb-2 block">
              A Legacy of Faith
            </span>
            <h2 className="font-headline-md text-headline-md text-[#3B0B14] mb-stack-sm">
              A Century of Worship and Witness
            </h2>
            <div className="w-12 h-1 bg-[#4A0F1A]/30 mb-stack-sm"></div>
            <p className="font-body-lg text-body-lg text-[#2A1E17] mb-4 leading-relaxed">
              Founded in the heart of our community over a hundred years ago, Ingraham Methodist began as a small gathering of faithful families in a simple wooden chapel. Today, while our walls have expanded, our core remains the same: a sanctuary for seekers, a hospital for the hurting, and a home for all.
            </p>
            <p className="font-body-md text-body-md text-[#3D2E24]/80 leading-relaxed">
              Our history is written not just in ledgers, but in the lives transformed by grace. From generation to generation, we have strived to blend the rich liturgy of our Methodist heritage with a modern, compassionate response to the needs of our city.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Bento Cards (semi-transparent) */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-[#4A0F1A]/[0.04] backdrop-blur-[1px] rounded-2xl my-stack-lg border border-[#8B6A4F]/15 reveal-on-scroll relative z-10">
        <div className="text-center mb-stack-lg">
          <h2 className="font-headline-md text-headline-md text-[#3B0B14]">Our Calling</h2>
          <p className="font-body-md text-body-md text-[#3D2E24] mt-2">The compass that guides our community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Mission Card */}
          <div className="bg-[#C7B8A6]/30 backdrop-blur-[2px] p-8 rounded-2xl shadow-ambient relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border border-[#8B6A4F]/10">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
              <span className="material-symbols-outlined text-[#4A0F1A]" style={{ fontSize: '120px' }}>explore</span>
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#4A0F1A]/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[#4A0F1A]">favorite</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#3B0B14] mb-4">Our Mission</h3>
              <p className="font-body-lg text-body-lg text-[#2A1E17] leading-relaxed">
                To love God authentically, love our neighbors fiercely, and make disciples of Jesus Christ for the transformation of the world. We are committed to living out the Gospel through active service and genuine relationships.
              </p>
            </div>
          </div>
          {/* Vision Card */}
          <div className="bg-[#F3E7D3]/40 backdrop-blur-[2px] border border-[#8B6A4F]/15 p-8 rounded-2xl shadow-ambient relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
              <span className="material-symbols-outlined text-[#3D2E24]" style={{ fontSize: '120px' }}>visibility</span>
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#8B6A4F]/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[#7A451A]">public</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#3B0B14] mb-4">Our Vision</h3>
              <p className="font-body-lg text-body-lg text-[#2A1E17] leading-relaxed">
                To be a beacon of hope and a catalyst for renewal in our city. We envision a diverse, multi-generational church where every individual is known, valued, and empowered to use their gifts for the Kingdom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Minimalist List */}
      <section className="pt-stack-lg pb-24 md:pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-4 reveal-on-scroll">
            <h2 className="font-headline-md text-headline-md text-[#3B0B14] sticky top-[100px]">Core Values</h2>
            <p className="font-body-md text-body-md text-[#3D2E24] mt-2 mb-8">The principles that anchor our faith and practice.</p>
          </div>
          <div className="md:col-span-8 flex flex-col gap-6">
            <div className="flex gap-4 p-6 bg-white/20 backdrop-blur-[2px] rounded-xl border border-[#8B6A4F]/15 hover:border-[#4A0F1A]/30 transition-colors duration-300 reveal-on-scroll delay-100">
              <div className="mt-1">
                <span className="material-symbols-outlined text-[#7A451A]">menu_book</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-[#3B0B14] text-[20px] mb-2">Scriptural Integrity</h4>
                <p className="font-body-md text-body-md text-[#2A1E17]">We anchor our lives and teachings in the truth of God&apos;s Word, seeking wisdom and understanding through thoughtful study.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white/20 backdrop-blur-[2px] rounded-xl border border-[#8B6A4F]/15 hover:border-[#4A0F1A]/30 transition-colors duration-300 reveal-on-scroll delay-200">
              <div className="mt-1">
                <span className="material-symbols-outlined text-[#7A451A]">diversity_1</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-[#3B0B14] text-[20px] mb-2">Authentic Community</h4>
                <p className="font-body-md text-body-md text-[#2A1E17]">We believe life is meant to be shared. We foster genuine relationships where people are known, loved, and supported.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white/20 backdrop-blur-[2px] rounded-xl border border-[#8B6A4F]/15 hover:border-[#4A0F1A]/30 transition-colors duration-300 reveal-on-scroll delay-300">
              <div className="mt-1">
                <span className="material-symbols-outlined text-[#7A451A]">volunteer_activism</span>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-[#3B0B14] text-[20px] mb-2">Compassionate Service</h4>
                <p className="font-body-md text-body-md text-[#2A1E17]">Following Christ&apos;s example, we actively serve our neighbors, locally and globally, advocating for justice and peace.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
