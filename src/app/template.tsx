"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // A smooth, dark dissolve effect that is easy on the eyes
    if (overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 1 },
        { opacity: 0, duration: 0.6, ease: "power2.inOut" }
      );
    }
  }, [pathname]);

  return (
    <>
      <div 
        ref={overlayRef} 
        className="fixed inset-0 z-[9999] bg-[#4A0F1A] pointer-events-none"
      />
      <div className="w-full">
        {children}
      </div>
    </>
  );
}
