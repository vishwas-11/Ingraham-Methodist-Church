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
            <Link href="/" className="flex items-start gap-3 sm:gap-4 group w-fit">
              <div
                className="relative h-16 sm:h-20 w-[42px] sm:w-[52px] shrink-0 -mt-1 transition-transform group-hover:scale-[1.02] duration-300"
                style={{
                  filter: 'drop-shadow(-1px 0px 1px rgba(0,0,0,0.6)) drop-shadow(0px 2px 3px rgba(0,0,0,0.85)) drop-shadow(0px 6px 8px rgba(0,0,0,0.4))'
                }}
              >
                {/* Invisible img to establish intrinsic dimensions */}
                <img
                  alt="Methodist Cross Logo"
                  className="h-full w-auto opacity-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQgaBuEezrne0JqAfJjRWX-saaXRZGm7lV-8oK6reDtcjlRBjaGHsJWv9nFFGlpkCH3TSBEX5KLxmTkrfrzUz4t-Wgz11ieLQ_Qz5G9UfifGIkp6xsPdsvJqT6uhSEGb_8wjr8S_w9Io2j_7cVGSl-nSK3wGvk_qglHM8AcCSajg8I-Xt8y9crZGAreuQAs1hbi_Q4YdKBPJAy8ZtHZJayib3D-QeHJRFWU7T3AgIOr78DgArPa-9LXwUmTRB8jAkItg"
                />
                {/* Masked gradient for 3D metallic effect */}
                <div
                  className="absolute inset-0"
                  style={{
                    WebkitMaskImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQgaBuEezrne0JqAfJjRWX-saaXRZGm7lV-8oK6reDtcjlRBjaGHsJWv9nFFGlpkCH3TSBEX5KLxmTkrfrzUz4t-Wgz11ieLQ_Qz5G9UfifGIkp6xsPdsvJqT6uhSEGb_8wjr8S_w9Io2j_7cVGSl-nSK3wGvk_qglHM8AcCSajg8I-Xt8y9crZGAreuQAs1hbi_Q4YdKBPJAy8ZtHZJayib3D-QeHJRFWU7T3AgIOr78DgArPa-9LXwUmTRB8jAkItg')",
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "left top",
                    maskImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQgaBuEezrne0JqAfJjRWX-saaXRZGm7lV-8oK6reDtcjlRBjaGHsJWv9nFFGlpkCH3TSBEX5KLxmTkrfrzUz4t-Wgz11ieLQ_Qz5G9UfifGIkp6xsPdsvJqT6uhSEGb_8wjr8S_w9Io2j_7cVGSl-nSK3wGvk_qglHM8AcCSajg8I-Xt8y9crZGAreuQAs1hbi_Q4YdKBPJAy8ZtHZJayib3D-QeHJRFWU7T3AgIOr78DgArPa-9LXwUmTRB8jAkItg')",
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "left top",
                    background: "linear-gradient(135deg, #FFF0C7 0%, #D5B581 22%, #825A20 48%, #D4B272 75%, #4A2B07 100%)",
                  }}
                />
              </div>
              <div className="flex flex-col pt-1 w-full">
                <span
                  className="font-display-lg text-[22px] min-[400px]:text-[26px] sm:text-[32px] leading-none text-[#D9C7B3] tracking-wide whitespace-nowrap"
                  style={{ textShadow: '0 -1px 2px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.1)' }}
                >
                  Ingraham Shalom
                </span>
                <div className="flex items-center gap-3 mt-2 w-full opacity-70">
                  <div className="h-px flex-grow bg-black shadow-[0_1px_0_rgba(255,255,255,0.15)]"></div>
                  <span
                    className="font-label-md text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#D9C7B3] whitespace-nowrap"
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

          {/* Location */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-4">
            <h3
              className="font-label-md text-[#D9C7B3] uppercase tracking-[0.2em] text-[13px] mb-1"
              style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.9), 0 1px 1px rgba(255,255,255,0.15)' }}
            >
              Visit Us
            </h3>
            <a 
              href="https://www.google.com/maps/place/Ingraham+Methodist+Church/@28.6740581,77.4496228,17z/data=!3m1!4b1!4m6!3m5!1s0x390cf1941ca224ed:0x80c0b9fb5f294587!8m2!3d28.6740581!4d77.4521977!16s%2Fg%2F1vr3bk5j?entry=ttu&g_ep=EgoyMDI2MDYyOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 hover:opacity-100 opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-[#C7A566] text-[20px] mt-0.5 shrink-0" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>location_on</span>
              <p className="font-body-md text-[#D9C7B3]/80 text-[14px] leading-relaxed group-hover:text-[#D9C7B3] transition-colors" style={{ textShadow: '0 -1px 1px rgba(0,0,0,0.8)' }}>
                <strong className="font-label-md text-[#F4E7D3] tracking-wide font-normal">Ingraham Methodist Church</strong><br />
                MFF2+JVG, Hapur Rd, Sector 11, Raj Kunj,<br />
                Raj Nagar, Ghaziabad, Uttar Pradesh 201002
              </p>
            </a>
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
