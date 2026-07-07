"use client";
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer 
      className="relative bg-[#4A0F1A] text-[#F4E7D3] pt-10 pb-6 z-10"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/leather.png')",
        backgroundRepeat: "repeat",
        backgroundBlendMode: "multiply",
        boxShadow: "inset 0 0 100px rgba(0,0,0,0.5), inset 0 20px 40px rgba(0,0,0,0.6)"
      }}
    >
      <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-8">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-6">
            <Link href="/" className="flex items-start gap-4 group w-fit">
              <img 
                alt="Methodist Cross Logo" 
                className="h-20 w-auto transition-opacity -mt-1" 
                style={{ filter: "brightness(0) invert(80%) sepia(30%) saturate(400%) hue-rotate(350deg) brightness(90%) drop-shadow(0 -1px 2px rgba(0,0,0,0.8))" }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQgaBuEezrne0JqAfJjRWX-saaXRZGm7lV-8oK6reDtcjlRBjaGHsJWv9nFFGlpkCH3TSBEX5KLxmTkrfrzUz4t-Wgz11ieLQ_Qz5G9UfifGIkp6xsPdsvJqT6uhSEGb_8wjr8S_w9Io2j_7cVGSl-nSK3wGvk_qglHM8AcCSajg8I-Xt8y9crZGAreuQAs1hbi_Q4YdKBPJAy8ZtHZJayib3D-QeHJRFWU7T3AgIOr78DgArPa-9LXwUmTRB8jAkItg" 
              />
              <div className="flex flex-col pt-1">
                <span 
                  className="font-display-lg text-[28px] sm:text-[32px] leading-none text-[#D9C7B3] tracking-wide" 
                  style={{ textShadow: '0 -1px 2px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.1)' }}
                >
                  Ingraham Shalom
                </span>
                <div className="flex items-center gap-3 mt-2 w-full opacity-70">
                  <div className="h-px flex-grow bg-black shadow-[0_1px_0_rgba(255,255,255,0.15)]"></div>
                  <span 
                    className="font-label-md text-[10px] tracking-[0.2em] uppercase text-[#D9C7B3]" 
                    style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.15)' }}
                  >
                    Methodist Church
                  </span>
                  <div className="h-px flex-grow bg-black shadow-[0_1px_0_rgba(255,255,255,0.15)]"></div>
                </div>
              </div>
            </Link>
            
            <p className="font-body-md text-[#D9C7B3]/80 text-[14px] max-w-[340px] leading-relaxed" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>
              A sanctuary for deep thought and spiritual renewal. Rooted in tradition, growing in grace, and serving our community with fierce love.
            </p>
            
            <div className="flex gap-4 mt-2">
              <a aria-label="Facebook" href="#" className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-[#D9C7B3]/60 hover:text-[#D9C7B3] transition-colors" style={{ boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.15)' }}>
                <span className="material-symbols-outlined text-[18px]" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>public</span>
              </a>
              <a aria-label="YouTube" href="#" className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-[#D9C7B3]/60 hover:text-[#D9C7B3] transition-colors" style={{ boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.15)' }}>
                <span className="material-symbols-outlined text-[18px]" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>play_circle</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 lg:col-span-3 flex flex-col gap-4">
            <h3 
              className="font-label-md text-[#D9C7B3] uppercase tracking-[0.2em] text-[13px] mb-1" 
              style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.15)' }}
            >
              Explore
            </h3>
            <Link href="/about" className="font-body-md text-[#D9C7B3]/80 text-[14px] hover:text-[#D9C7B3] transition-colors w-fit" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>About Us</Link>
            <Link href="/ministries" className="font-body-md text-[#D9C7B3]/80 text-[14px] hover:text-[#D9C7B3] transition-colors w-fit" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>Ministries</Link>
            <Link href="/sermons" className="font-body-md text-[#D9C7B3]/80 text-[14px] hover:text-[#D9C7B3] transition-colors w-fit" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>Sermons</Link>
            <Link href="/giving" className="font-body-md text-[#D9C7B3]/80 text-[14px] hover:text-[#D9C7B3] transition-colors w-fit" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>Give Online</Link>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-4">
            <h3 
              className="font-label-md text-[#D9C7B3] uppercase tracking-[0.2em] text-[13px] mb-1" 
              style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.15)' }}
            >
              Stay Connected
            </h3>
            <p className="font-body-md text-[#D9C7B3]/80 text-[14px] leading-relaxed" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>
              Join our mailing list for weekly reflections and community updates.
            </p>
            <form className="mt-2 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-[#1C0408]/80 border border-black/50 rounded-md px-4 py-3 font-body-md text-[#F4E7D3] text-[14px] placeholder:text-[#D9C7B3]/40 focus:outline-none focus:ring-1 focus:ring-[#C7A566]/50 transition-all w-full"
                style={{ boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.1)' }}
              />
              <button 
                type="submit" 
                className="bg-gradient-to-b from-[#C7A566] to-[#8C6D39] text-[#1C0408] font-label-md text-[14px] px-6 py-3 rounded-md transition-all whitespace-nowrap tracking-wide"
                style={{ 
                  textShadow: '0 1px 1px rgba(255,255,255,0.4)',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), 0 4px 6px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)',
                  border: '1px solid #4A3612'
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="h-px w-full bg-black shadow-[0_1px_0_rgba(255,255,255,0.15)] mb-6"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body-md text-[#D9C7B3]/50 text-[12px]" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>
            © {new Date().getFullYear()} Ingraham Methodist Church. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-body-md text-[#D9C7B3]/50 text-[12px] hover:text-[#D9C7B3] transition-colors" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>Privacy Policy</Link>
            <Link href="/terms" className="font-body-md text-[#D9C7B3]/50 text-[12px] hover:text-[#D9C7B3] transition-colors" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>Terms of Service</Link>
            <Link href="/contact" className="font-body-md text-[#D9C7B3]/50 text-[12px] hover:text-[#D9C7B3] transition-colors" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
