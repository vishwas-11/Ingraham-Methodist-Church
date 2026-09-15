"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export default function GSAPInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context | null = null;

    const runAnimations = () => {
      if (ctx) {
        ctx.revert();
      }

      ctx = gsap.context(() => {
        // Fade-in-up animation for hero text (on load/route change)
        const fadeElements = gsap.utils.toArray('.animate-fade-in-up');
        if (fadeElements.length > 0) {
          gsap.fromTo(fadeElements, 
            { y: 35, opacity: 0 }, 
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.1,
              clearProps: "opacity,transform"
            }
          );
        }

        // Smooth render with blur and slight scale for special text
        const smoothRenderElements = gsap.utils.toArray('.animate-smooth-render');
        if (smoothRenderElements.length > 0) {
          gsap.fromTo(smoothRenderElements, 
            { y: 15, opacity: 0, filter: 'blur(6px)' }, 
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 1.2,
              ease: "power2.out",
              clearProps: "opacity,transform,filter"
            }
          );
        }

        // Reveal-on-scroll animation
        gsap.utils.toArray('.reveal-on-scroll').forEach((el: any) => {
          gsap.fromTo(el, 
            { y: 30, opacity: 0 }, 
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        // Staggered reveal for lists
        gsap.utils.toArray('.reveal-stagger-parent').forEach((parent: any) => {
          const children = parent.querySelectorAll('.reveal-stagger-child');
          if (children.length > 0) {
            gsap.fromTo(children,
              { y: 35, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1.0,
                ease: "power2.out",
                stagger: 0.12,
                scrollTrigger: {
                  trigger: parent,
                  start: "top 88%",
                  toggleActions: "play none none reverse"
                }
              }
            );
          }
        });

        ScrollTrigger.refresh();
      });
    };

    // Run on mount / route change
    const t1 = setTimeout(runAnimations, 60);
    // Secondary pass when async Server Components (e.g., /sermons after Supabase query) resolve & mount
    const t2 = setTimeout(runAnimations, 600);
    const t3 = setTimeout(runAnimations, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (ctx) {
        ctx.revert();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [pathname]);

  return null;
}
