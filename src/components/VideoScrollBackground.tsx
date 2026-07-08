"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger, making sure this runs only on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(true); // Default to true or a safe state to prevent flash

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile(); // Check on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip heavy canvas animation on mobile

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const frameCount = 230;
    // Helper to pad the index to 3 digits (e.g. 1 -> "001")
    const currentFrame = (index: number) =>
      `/new-hero/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

    const images: HTMLImageElement[] = [];
    const scrollObj = { frame: 0 };

    // Preload all frames
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // Function to draw the active frame onto the canvas
    const render = () => {
      // Round to nearest integer to get correct array index
      const frameIndex = Math.round(scrollObj.frame);
      const img = images[frameIndex];

      if (!img || !img.complete) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.width;
      const ih = img.height;

      // Simulate object-fit: cover
      const scale = Math.max(cw / iw, ch / ih);
      const x = (cw / 2) - (iw / 2) * scale;
      const y = (ch / 2) - (ih / 2) * scale;

      context.clearRect(0, 0, cw, ch);
      context.drawImage(img, x, y, iw * scale, ih * scale);
    };

    // Render the very first frame once it loads
    images[0].onload = render;

    // Handle canvas resizing
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    // Set initial size
    handleResize();
    window.addEventListener('resize', handleResize);

    // Setup GSAP ScrollTrigger to scrub through the frames based on absolute scroll position
    const tl = gsap.to(scrollObj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max", // Scans the entire scroll height of the page
        scrub: 0.5, // 0.5 second smoothing for the scrub
      },
      onUpdate: render
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [isMobile]);

  return (
    <>
      {isMobile ? (
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-black">
          <img
            src="/ingraham_logo_5.png"
            alt="Ingraham Logo Background"
            className="w-full h-full object-cover object-[70%_center] brightness-[0.65]"
          />
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
      )}
    </>
  );
}
