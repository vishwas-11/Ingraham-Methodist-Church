"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination, Navigation } from "swiper/modules";
import EventCard from "@/components/EventCard";
import { ChurchEvent } from "@/data/events";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface UpcomingEventsCarouselProps {
  events: ChurchEvent[];
}

export default function UpcomingEventsCarousel({ events }: UpcomingEventsCarouselProps) {
  const css = `
  .Skiper49_Swiper {
    width: 100%;
    padding-top: 20px !important;
    padding-bottom: 50px !important;
  }
  
  .Skiper49_Swiper .swiper-slide {
    width: 320px;
    transition: transform 0.4s ease;
  }

  @media (min-width: 768px) {
    .Skiper49_Swiper .swiper-slide {
      width: 400px;
    }
  }

  .Skiper49_Swiper .swiper-pagination-bullet {
    background-color: #CDAA63 !important;
    opacity: 0.5;
  }

  .Skiper49_Swiper .swiper-pagination-bullet-active {
    background-color: #CDAA63 !important;
    opacity: 1;
    width: 24px;
    border-radius: 6px;
  }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-[1240px] mx-auto px-2"
    >
      <style>{css}</style>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        initialSlide={0}
        slidesPerView="auto"
        loop={events.length > 1}
        autoplay={events.length > 1 ? {
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        } : false}
        coverflowEffect={{
          rotate: 35,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        className="Skiper49_Swiper"
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <EventCard event={event} buttonText="Discover More" />
          </SwiperSlide>
        ))}

        {/* Custom Navigation Controls */}
        {events.length > 1 && (
          <div className="hidden md:flex items-center justify-between absolute top-1/2 -translate-y-1/2 -left-2 -right-2 z-30 pointer-events-none">
            <button aria-label="Previous Slide" className="swiper-button-prev-custom pointer-events-auto w-11 h-11 rounded-full bg-[#3B0B14]/90 backdrop-blur-md border border-[#CDAA63]/40 text-[#F4E7D3] flex items-center justify-center shadow-lg hover:bg-[#5A1220] transition-colors">
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>
            <button aria-label="Next Slide" className="swiper-button-next-custom pointer-events-auto w-11 h-11 rounded-full bg-[#3B0B14]/90 backdrop-blur-md border border-[#CDAA63]/40 text-[#F4E7D3] flex items-center justify-center shadow-lg hover:bg-[#5A1220] transition-colors">
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
}
