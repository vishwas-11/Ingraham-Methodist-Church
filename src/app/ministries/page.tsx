import Image from 'next/image';

export default function Ministries() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center -mt-[72px] bg-[#4A0F1A] overflow-hidden">
        <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f3e7d3] to-transparent z-10"></div>
        
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto mt-16">
          <div className="flex flex-col items-center mb-6 w-full">
            <span className="text-[#CDAA63] font-label-md tracking-[0.2em] uppercase text-[12px] md:text-[13px] mb-3" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>Get Involved</span>
            <div className="h-px w-32 bg-[rgba(205,170,99,0.35)]"></div>
          </div>
          <h1 className="font-display-lg text-[48px] md:text-[72px] leading-[1.05] text-[#F4E7D3] mb-6 animate-fade-in-up" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
            Our Ministries
          </h1>
          <p className="font-body-lg text-[#D9C7B3] max-w-2xl mx-auto animate-smooth-render" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
            Find your place in our community. We offer a variety of ministries designed to foster spiritual growth, fellowship, and service for all ages.
          </p>
        </div>
      </section>

      <main className="flex-grow flex flex-col items-center w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-24 md:pb-32 animate-fade-in-up mt-stack-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter w-full">
        
        {/* Ministry Card: Youth */}
        <article className="bg-secondary-fixed text-on-surface rounded-2xl p-stack-md flex flex-col justify-between shadow-ambient hover:-translate-y-1 transition-transform duration-300 border border-secondary/20 reveal-on-scroll delay-100">
          <div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-stack-sm text-primary-container">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <h3 className="font-headline-sm text-primary-container mb-unit">Youth Ministry</h3>
            <p className="font-body-md text-on-surface-variant mb-stack-sm">
              A vibrant community for middle and high school students to explore their faith, ask tough questions, and build lasting friendships in a safe environment.
            </p>
          </div>
          <button className="self-start text-primary-container font-label-md hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-1 group">
            Get Involved <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </article>

        {/* Ministry Card: Women's Fellowship */}
        <article className="bg-secondary-fixed text-on-surface rounded-2xl p-stack-md flex flex-col justify-between shadow-ambient hover:-translate-y-1 transition-transform duration-300 border border-secondary/20 reveal-on-scroll delay-200">
          <div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-stack-sm text-primary-container">
              <span className="material-symbols-outlined">diversity_1</span>
            </div>
            <h3 className="font-headline-sm text-primary-container mb-unit">Women's Fellowship</h3>
            <p className="font-body-md text-on-surface-variant mb-stack-sm">
              Connecting women of all generations through Bible study, retreats, and local outreach, fostering deep spiritual roots and mutual support.
            </p>
          </div>
          <button className="self-start text-primary-container font-label-md hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-1 group">
            Get Involved <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </article>

        {/* Ministry Card: Sunday School */}
        <article className="bg-secondary-fixed text-on-surface rounded-2xl p-stack-md flex flex-col justify-between shadow-ambient hover:-translate-y-1 transition-transform duration-300 border border-secondary/20 reveal-on-scroll delay-300">
          <div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-stack-sm text-primary-container">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
            <h3 className="font-headline-sm text-primary-container mb-unit">Sunday School</h3>
            <p className="font-body-md text-on-surface-variant mb-stack-sm">
              Foundational biblical education for children and adults, occurring every Sunday morning before our main worship service.
            </p>
          </div>
          <button className="self-start text-primary-container font-label-md hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-1 group">
            Get Involved <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </article>

        {/* Ministry Card: Music Ministry */}
        <article className="bg-secondary-fixed text-on-surface rounded-2xl p-stack-md flex flex-col justify-between shadow-ambient hover:-translate-y-1 transition-transform duration-300 border border-secondary/20 lg:col-span-2 reveal-on-scroll">
          <div className="flex flex-col md:flex-row gap-stack-md h-full">
            <div className="md:w-1/2 rounded-xl overflow-hidden min-h-[200px] bg-surface-container-high relative">
              <div 
                className="absolute inset-0 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMtuXp0CBq7dAypOwwYKP7hw1VWgKH6zbZPKqNJTOGIn5MG7owfwqVT1ZKFjYQl3i0KHiq-wZHEv4nC-IwIBqSkWf7VQjxGrsnBJahOZT67jvoR358IhTrtyDJtpYzT8-34f8XSPgv43O6VxsqHUBO0tBbUmOxQ8YceBADOmJfpnuN9xsfshtMbUiQeD3igiPJ5azN17VhnsplYV3e-a833ZfIvjBdrBhBAE-QzU8ZibDdvXtpJSGM')" }}
              ></div>
            </div>
            <div className="md:w-1/2 flex flex-col justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-stack-sm text-primary-container">
                <span className="material-symbols-outlined">music_note</span>
              </div>
              <h3 className="font-headline-sm text-primary-container mb-unit">Music &amp; Worship Arts</h3>
              <p className="font-body-md text-on-surface-variant mb-stack-sm">
                Lead the congregation in praise through our Chancel Choir, Handbell Ensemble, or contemporary worship band. We welcome all skill levels.
              </p>
              <button className="self-start text-primary-container font-label-md hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-1 group mt-auto">
                Get Involved <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </article>

        {/* Ministry Card: Local Outreach */}
        <article className="bg-secondary-fixed text-on-surface rounded-2xl p-stack-md flex flex-col justify-between shadow-ambient hover:-translate-y-1 transition-transform duration-300 border border-secondary/20 reveal-on-scroll delay-100">
          <div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-stack-sm text-primary-container">
              <span className="material-symbols-outlined">volunteer_activism</span>
            </div>
            <h3 className="font-headline-sm text-primary-container mb-unit">Local Outreach</h3>
            <p className="font-body-md text-on-surface-variant mb-stack-sm">
              Serving our immediate community through the food pantry, homeless shelter partnerships, and neighborhood renewal projects.
            </p>
          </div>
          <button className="self-start text-primary-container font-label-md hover:underline decoration-2 underline-offset-4 transition-all flex items-center gap-1 group">
            Get Involved <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </article>
      </div>
      </main>
    </>
  );
}
