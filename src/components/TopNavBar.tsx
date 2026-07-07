"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TopNavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-colors duration-500 py-4 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-outline-variant/20' 
          : 'bg-transparent border-b border-transparent'
      }`} 
      id="top-nav"
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <img 
            src="/Methodist_logo (2).png" 
            alt="Methodist Logo" 
            className={`h-8 w-auto object-contain transition-opacity duration-300 ${scrolled ? 'opacity-90' : 'opacity-100'}`} 
          />
          <span className={`font-display-lg-mobile md:text-[28px] font-normal tracking-tight transition-colors duration-300 ${scrolled ? 'text-on-surface' : 'text-surface'}`}>
            Ingraham<span className="align-super text-[10px] ml-1 opacity-50">®</span>
          </span>
        </Link>

        {/* Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className={`transition-colors duration-300 font-label-md text-[13px] tracking-wide ${scrolled ? 'text-on-surface-variant hover:text-on-surface' : 'text-surface/80 hover:text-surface'}`}>
            Home
          </Link>
          <Link href="/about" className={`transition-colors duration-300 font-label-md text-[13px] tracking-wide ${scrolled ? 'text-on-surface-variant hover:text-on-surface' : 'text-surface/80 hover:text-surface'}`}>
            About
          </Link>
          <Link href="/sermons" className={`transition-colors duration-300 font-label-md text-[13px] tracking-wide ${scrolled ? 'text-on-surface-variant hover:text-on-surface' : 'text-surface/80 hover:text-surface'}`}>
            Sermons
          </Link>
          <Link href="/ministries" className={`transition-colors duration-300 font-label-md text-[13px] tracking-wide ${scrolled ? 'text-on-surface-variant hover:text-on-surface' : 'text-surface/80 hover:text-surface'}`}>
            Ministries
          </Link>
          <Link href="/events" className={`transition-colors duration-300 font-label-md text-[13px] tracking-wide ${scrolled ? 'text-on-surface-variant hover:text-on-surface' : 'text-surface/80 hover:text-surface'}`}>
            Events
          </Link>
          <Link href="/contact" className={`transition-colors duration-300 font-label-md text-[13px] tracking-wide ${scrolled ? 'text-on-surface-variant hover:text-on-surface' : 'text-surface/80 hover:text-surface'}`}>
            Reach Us
          </Link>
        </nav>

        {/* Trailing Action */}
        <div className="flex items-center gap-4">
          <Link href="/giving" className={`hidden md:inline-flex bg-primary-container text-on-primary px-6 py-2.5 rounded-full font-label-md text-[13px] tracking-wide hover:bg-primary transition-all duration-300 shadow-ambient ${!scrolled && 'border border-surface/20'}`}>
            Begin Journey
          </Link>
          {/* Mobile Menu Button */}
          <button aria-label="Menu" className={`md:hidden p-2 hover:opacity-70 transition-opacity ${scrolled ? 'text-on-surface' : 'text-surface'}`}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
