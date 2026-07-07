import Image from 'next/image';

export default function Sermons() {
  return (
    <>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop animate-fade-in-up">
        {/* Page Header */}
        <div className="text-center mb-stack-lg mt-stack-md">
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary-container mb-unit">Sermon Archive</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Explore past teachings and find spiritual nourishment. Watch, listen, or read our weekly messages.
          </p>
        </div>

        {/* Featured Sermon Banner */}
        <section className="mb-stack-lg bg-surface-container-low rounded-xl overflow-hidden shadow-ambient border border-warm-brown/30 relative">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <img 
                className="absolute inset-0 w-full h-full object-cover" 
                alt="Video production setup inside a historic church sanctuary" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbRrxkljqN2Gb4EXBKNh14i-ZEsx6QyN09OceFJXcw6iBmITbhIUAgP1xZxTJfBDd82FW-vVysV-Bd70gZFrMy4NTg9t2Q_mpZMTkm0dBoZMe_J2ipv3ZctBj0TYAm_5znM5fz-ZUyZnBEH4E78QWCb_fxEpVMhJrlSHnUveHhRBTQt05XmFICXi0HSLCwhbHYCnaSFM4Zzwy2E0T8COexE46qnl5o2PKtEqID1ETeAaeCV-BgKUy9"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 to-transparent flex items-center justify-center">
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-4 transition-all duration-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl">play_arrow</span>
                </button>
              </div>
            </div>
            <div className="p-stack-md md:p-stack-lg flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-stack-sm">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-md text-xs uppercase tracking-wider">Latest Sermon</span>
                <span className="text-on-surface-variant font-caption">October 29, 2023</span>
              </div>
              <h2 className="font-headline-md text-primary-container mb-unit">The Wisdom of Silence</h2>
              <p className="font-body-md text-on-surface-variant mb-stack-md">
                Pastor Sarah Jenkins explores the contemplative practice of silence in a noisy world, drawing from the Book of Kings and the tradition of the desert monastics.
              </p>
              <div className="flex gap-4 items-center">
                <button className="bg-primary-container text-on-primary px-6 py-2 rounded-lg font-label-md hover:opacity-90 transition-opacity">Watch Now</button>
                <button className="text-primary-container hover:text-primary transition-colors flex items-center gap-1 font-label-md">
                  <span className="material-symbols-outlined text-lg">headphones</span>
                  Listen
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="mb-stack-lg border-y border-warm-brown/30 py-stack-sm flex flex-col md:flex-row gap-4 justify-between items-center bg-surface-container-low/50 px-4 rounded-lg reveal-on-scroll">
          <div className="relative w-full md:w-1/3">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input 
              className="w-full bg-transparent border border-warm-brown/30 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container font-body-md text-on-surface placeholder:text-on-surface-variant" 
              placeholder="Search sermons..." 
              type="text"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <select className="bg-transparent border border-warm-brown/30 rounded-lg py-2 px-4 font-label-md text-on-surface focus:outline-none focus:border-primary-container">
              <option value="">All Series</option>
              <option value="galatians">Galatians</option>
              <option value="psalms">Psalms</option>
            </select>
            <select className="bg-transparent border border-warm-brown/30 rounded-lg py-2 px-4 font-label-md text-on-surface focus:outline-none focus:border-primary-container">
              <option value="">All Speakers</option>
              <option value="jenkins">Pastor Jenkins</option>
              <option value="smith">Rev. Smith</option>
            </select>
            <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary-container font-label-md px-2">
              <span className="material-symbols-outlined text-sm">filter_list</span> Filters
            </button>
          </div>
        </section>

        {/* Sermon Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-stack-lg reveal-on-scroll">
          {/* Card 1 */}
          <article className="bg-secondary-fixed/30 rounded-xl overflow-hidden border border-warm-brown/30 hover:shadow-ambient transition-all duration-300 flex flex-col">
            <div className="relative h-48">
              <img 
                className="w-full h-full object-cover" 
                alt="A warm, sunlit stained glass window" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChDAvwXt22ck4RV9M2abaM4W-uyj_viG-Asxgt9id9ldrPchID-tOu7GSy8XL3hjQbeISUY6BQXhpYtrRp7yrPwLpPYLMALzjgGbNwrw81s9JEbvtMdLr9dBPMpxOpSg4jJKu9dhE8LJ5_0iBKcKYf30Jn5M_zaVD-xvRus7RaNcNJpV3xVQEO1DD9K_47o3rg8vr1rFcsF__bCkxoZaRWmW1u4yTo9280yIgX-Cz_9oinvOymzruA"
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white font-caption px-2 py-1 rounded">45:12</div>
            </div>
            <div className="p-stack-sm flex flex-col flex-grow">
              <p className="font-caption text-on-surface-variant mb-1">October 22, 2023 • Foundations Series</p>
              <h3 className="font-headline-sm text-primary-container mb-2">Building on the Rock</h3>
              <p className="font-body-md text-on-surface-variant line-clamp-2 mb-4 flex-grow">
                An examination of the Sermon on the Mount and how to build a resilient faith.
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-warm-brown/30 mt-auto">
                <span className="font-label-md text-on-surface">Pastor Sarah Jenkins</span>
                <div className="flex gap-2">
                  <button className="text-on-surface-variant hover:text-primary-container transition-colors" title="Play Video">
                    <span className="material-symbols-outlined">play_circle</span>
                  </button>
                  <button className="text-on-surface-variant hover:text-primary-container transition-colors" title="Listen Audio">
                    <span className="material-symbols-outlined">headphones</span>
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-secondary-fixed/30 rounded-xl overflow-hidden border border-warm-brown/30 hover:shadow-ambient transition-all duration-300 flex flex-col">
            <div className="relative h-48">
              <img 
                className="w-full h-full object-cover" 
                alt="Close up of hands holding a worn leather-bound Bible" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvlzO7es-E65qvfpFUp-4ByqHXopi5QI1Pc3Lg2g0JYHMyEfSIEpvBw3yC7G1FM6XWShGXurWAzIKAuOJFBTZXmEBPjnwD5AYMb3ZD61-1nZDlErcB6PL68V-YIlg5bq_ZN7WY6KZdOFEZJC7MZSpV4RBTBX4N_IC_ZkfN1MV1VDFjie-NP5v3aQ43eHk_D9ja3SSbUhh-i0AMpLQYbprLowv77n1geWtwHykH0q9aneVEB85gHCjk"
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white font-caption px-2 py-1 rounded">38:45</div>
            </div>
            <div className="p-stack-sm flex flex-col flex-grow">
              <p className="font-caption text-on-surface-variant mb-1">October 15, 2023 • Standalone</p>
              <h3 className="font-headline-sm text-primary-container mb-2">Grace in the Margins</h3>
              <p className="font-body-md text-on-surface-variant line-clamp-2 mb-4 flex-grow">
                Discovering God's presence in the overlooked and unexpected places of our lives.
              </p>
              <div className="flex justify-between items-center pt-4 border-t border-warm-brown/30 mt-auto">
                <span className="font-label-md text-on-surface">Rev. Thomas Smith</span>
                <div className="flex gap-2">
                  <button className="text-on-surface-variant hover:text-primary-container transition-colors" title="Play Video">
                    <span className="material-symbols-outlined">play_circle</span>
                  </button>
                  <button className="text-on-surface-variant hover:text-primary-container transition-colors" title="Listen Audio">
                    <span className="material-symbols-outlined">headphones</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </>
  );
}
