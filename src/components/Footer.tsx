import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary py-stack-lg transition-all duration-200 mt-stack-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* Brand / Copyright */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3">
            <img 
              alt="Methodist Cross Logo" 
              className="h-8 w-auto filter brightness-0 invert" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQgaBuEezrne0JqAfJjRWX-saaXRZGm7lV-8oK6reDtcjlRBjaGHsJWv9nFFGlpkCH3TSBEX5KLxmTkrfrzUz4t-Wgz11ieLQ_Qz5G9UfifGIkp6xsPdsvJqT6uhSEGb_8wjr8S_w9Io2j_7cVGSl-nSK3wGvk_qglHM8AcCSajg8I-Xt8y9crZGAreuQAs1hbi_Q4YdKBPJAy8ZtHZJayib3D-QeHJRFWU7T3AgIOr78DgArPa-9LXwUmTRB8jAkItg" 
            />
            <span className="font-display-lg text-headline-sm text-on-primary font-bold">
              Ingraham
            </span>
          </Link>
          <p className="font-body-md text-label-md text-on-primary/70 mt-4">
            © 2024 Ingraham Methodist Church.<br />All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3">
          <Link href="/privacy" className="font-body-md text-label-md text-on-primary/70 hover:text-on-primary transition-opacity">
            Privacy Policy
          </Link>
          <Link href="/terms" className="font-body-md text-label-md text-on-primary/70 hover:text-on-primary transition-opacity">
            Terms of Service
          </Link>
          <Link href="/contact" className="font-body-md text-label-md text-on-primary/70 hover:text-on-primary transition-opacity">
            Contact Us
          </Link>
          <Link href="/giving-faq" className="font-body-md text-label-md text-on-primary/70 hover:text-on-primary transition-opacity">
            Giving FAQ
          </Link>
        </div>

        {/* Social / Extra */}
        <div className="flex flex-col gap-4 items-start md:items-end">
          <button className="bg-on-primary/10 px-6 py-2 rounded-full font-label-md text-label-md hover:bg-on-primary/20 transition-colors">
            Subscribe to Newsletter
          </button>
          <div className="flex gap-4 mt-2">
            <a aria-label="Facebook" href="#" className="text-on-primary/70 hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a aria-label="YouTube" href="#" className="text-on-primary/70 hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined">play_circle</span>
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
