"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export default function GSAPInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in-up animation for hero text (on load/route change)
    const fadeElements = gsap.utils.toArray('.animate-fade-in-up');
    if (fadeElements.length > 0) {
      gsap.fromTo(fadeElements, 
        { y: 50, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.1
        }
      );
    }

    // Smooth render with blur and slight scale for special text
    const smoothRenderElements = gsap.utils.toArray('.animate-smooth-render');
    if (smoothRenderElements.length > 0) {
      gsap.fromTo(smoothRenderElements, 
        { y: 20, opacity: 0, filter: 'blur(8px)' }, 
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.8,
          ease: "power2.out",
          delay: 0.4
        }
      );
    }

    // Page level fade-in for smooth transitions
    // This targets the main content wrapper if we want a global fade, but
    // standard elements have reveal-on-scroll.
    
    // Reveal-on-scroll animation
    gsap.utils.toArray('.reveal-on-scroll').forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 30, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      // Clean up triggers on route change to prevent memory leaks and duplication
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [pathname]);

  return null;
}
