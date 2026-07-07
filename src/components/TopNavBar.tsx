"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNavBar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const useDarkText = scrolled;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Sermons', href: '/sermons' },
    { name: 'Ministries', href: '/ministries' },
    { name: 'Events', href: '/events' },
    { name: 'Reach Us', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-outline-variant/20 py-4'
          : 'bg-transparent border-b border-transparent py-4 md:pt-[36px] md:pb-6'
        }`}
      id="top-nav"
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-[110px] max-w-[1600px] mx-auto">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img
            src="/Methodist_logo (2).png"
            alt="Methodist Logo"
            className={`h-[44px] md:h-[48px] -mt-[6px] md:-mt-[8px] w-auto object-contain transition-opacity duration-300 ${scrolled ? 'opacity-90' : 'opacity-100'}`}
          />
          <div className="flex flex-col justify-center">
            <span className={`font-display-lg-mobile md:text-[26px] font-normal tracking-tight transition-colors duration-300 leading-none ${useDarkText ? 'text-on-surface' : 'text-surface'}`}>
              Ingraham Shalom
            </span>
            <div className="flex items-center w-full mt-0">
              <div className={`flex-grow border-t h-px min-w-[8px] ${useDarkText ? 'border-on-surface/40' : 'border-surface/40'}`}></div>
              <span className={`px-1.5 md:px-2 text-[6.5px] md:text-[8px] uppercase tracking-[0.15em] md:tracking-[0.2em] font-label-md transition-colors duration-300 ${useDarkText ? 'text-on-surface/80' : 'text-surface/80'} whitespace-nowrap`}>
                METHODIST CHURCH
              </span>
              <div className={`flex-grow border-t h-px min-w-[8px] ${useDarkText ? 'border-on-surface/40' : 'border-surface/40'}`}></div>
            </div>
          </div>
        </Link>

        {/* Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <div key={link.name} className="relative py-1 flex flex-col items-center">
                <Link 
                  href={link.href} 
                  className={`transition-colors duration-300 font-label-md text-[13px] tracking-wide ${
                    useDarkText 
                      ? isActive ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface' 
                      : isActive ? 'text-surface' : 'text-surface/80 hover:text-surface'
                  }`}
                >
                  {link.name}
                </Link>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#CDAA63] to-transparent opacity-80"></span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Trailing Action */}
        <div className="flex items-center gap-4">
          <Link href="/giving" className={`hidden md:inline-flex bg-primary-container text-on-primary px-6 py-2.5 rounded-full font-label-md text-[13px] tracking-wide hover:bg-primary transition-all duration-300 shadow-ambient ${!scrolled && 'border border-surface/20'}`}>
            Support Our Mission
          </Link>
          {/* Mobile Menu Button */}
          <button
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 hover:opacity-70 transition-opacity z-50 ${isMobileMenuOpen || useDarkText ? 'text-on-surface' : 'text-surface'}`}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-background shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col pt-24 px-6 gap-6 h-full overflow-y-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={`font-headline-sm text-[20px] transition-colors flex flex-col items-start ${
                  isActive ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="relative">
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-8 h-[2px] bg-[#CDAA63] opacity-80 rounded-full"></span>
                  )}
                </span>
              </Link>
            );
          })}
          <Link href="/giving" onClick={() => setIsMobileMenuOpen(false)} className="mt-4 bg-primary-container text-on-primary px-6 py-3 rounded-full font-label-md text-center hover:bg-primary transition-all shadow-ambient">
            Support Our Mission
          </Link>
        </div>
      </div>
    </header>
  );
}
