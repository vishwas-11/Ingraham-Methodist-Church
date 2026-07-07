"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GSAPInitializer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in-up animation for hero text (on load, no scroll trigger)
    gsap.utils.toArray('.animate-fade-in-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { y: 50, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.2 // slight delay for smooth entry
        }
      );
    });


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

  }, []);

  return null;
}
