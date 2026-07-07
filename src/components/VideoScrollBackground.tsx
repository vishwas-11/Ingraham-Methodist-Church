"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger, making sure this runs only on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const frameCount = 251;
    // Helper to pad the index to 3 digits (e.g. 1 -> "001")
    const currentFrame = (index: number) => 
      `/hero/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

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
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
