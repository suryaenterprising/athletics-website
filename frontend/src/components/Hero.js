import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const MARQUEE = [
  "🏆 Upcoming: Inter-IIT Sports Meet 2023 - Dec 15-22",
  "🎯 Registration Open: Annual Marathon - Nov 20",
  "🏅 Athletics Trials: Nov 5-7 at Main Ground",
  "🏃‍♂ New Record: 100m Dash - 10.8s by Rohan Sharma"
];

const HERO_SLIDES = [
  {
    img: 'logo.png',
    title: "Athletics Club IIT Indore",
    subtitle: "Where champions are made and records are broken",
    button: "Join Us Today",
    btnClass: "bg-blue-600 hover:bg-blue-700"
  },
  {
    img: 'bg2.heic',
    title: "Train Like a Champion",
    subtitle: "State-of-the-art facilities and expert coaching",
    button: "Our Programs",
    btnClass: "bg-red-600 hover:bg-red-700"
  },
  {
    img: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
    title: "Breaking Boundaries",
    subtitle: "Setting new standards in collegiate athletics",
    button: "View Records",
    btnClass: "bg-orange-600 hover:bg-orange-700"
  }
];

export default function Hero() {
  return (
    <section id="home" className="relative">
      {/* Marquee */}
      <div className="absolute top-20 left-0 w-full bg-blue-900/80 text-white py-2 z-10 overflow-hidden">
        <div className="marquee inline-block whitespace-nowrap">
          {MARQUEE.map((text, idx) => (
            <span className="inline-block mx-4" key={idx}>{text}</span>
          ))}
        </div>
      </div>

      {/* Swiper Carousel */}
      <div className="w-full">
        <Swiper
          loop={true}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="heroSwiper"
        >
          {HERO_SLIDES.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="relative min-h-[100vh] parallax flex items-center justify-center"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center w-full">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
                    {slide.subtitle}
                  </p>
                  <button
                    className={`${slide.btnClass} text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105`}
                  >
                    {slide.button}
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
