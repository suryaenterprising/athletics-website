import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const initialMarquee = [
  "🏆 Upcoming: Inter-IIT Sports Meet 2023 - Dec 15-22",
  "🎯 Registration Open: Annual Marathon - Nov 20",
  "🏅 Athletics Trials: Nov 5-7 at Main Ground",
  "🏃‍♂ New Record: 100m Dash - 10.8s by Rohan Sharma"
];

const initialHeroSlides = [
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
    img: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: "Breaking Boundaries",
    subtitle: "Setting new standards in collegiate athletics",
    button: "View Records",
    btnClass: "bg-orange-600 hover:bg-orange-700"
  }
];

export default function Hero({ adminView = false }) {
  const [marquee, setMarquee] = useState(initialMarquee);
  const [heroSlides, setHeroSlides] = useState(initialHeroSlides);

  const [editingMarqueeIndex, setEditingMarqueeIndex] = useState(null);
  const [editingSlideIndex, setEditingSlideIndex] = useState(null);
  const [marqueeEditText, setMarqueeEditText] = useState("");
  const [slideEditData, setSlideEditData] = useState({
    img: "",
    title: "",
    subtitle: "",
    button: "",
    btnClass: ""
  });

  // Marquee Handlers
  const startEditMarquee = (index) => {
    setEditingMarqueeIndex(index);
    setMarqueeEditText(marquee[index]);
  };

  const saveMarquee = () => {
    if (!marqueeEditText.trim()) {
      alert("Marquee text cannot be empty");
      return;
    }
    const updated = [...marquee];
    updated[editingMarqueeIndex] = marqueeEditText;
    setMarquee(updated);
    setEditingMarqueeIndex(null);
    // TODO: Save to backend when ready
  };

  const cancelEditMarquee = () => setEditingMarqueeIndex(null);

  const deleteMarquee = (index) => {
    if (window.confirm("Delete this marquee text?")) {
      setMarquee((prev) => prev.filter((_, i) => i !== index));
      // TODO: Delete from backend when ready
    }
  };

  const addMarquee = () => {
    const newText = "New marquee text";
    setMarquee((prev) => [...prev, newText]);
    setEditingMarqueeIndex(marquee.length);
    setMarqueeEditText(newText);
  };

  // Hero Slide Handlers
  const startEditSlide = (index) => {
    setEditingSlideIndex(index);
    setSlideEditData({ ...heroSlides[index] });
  };

  const saveSlide = () => {
    if (!slideEditData.title.trim() || !slideEditData.subtitle.trim() || !slideEditData.button.trim()) {
      alert("Title, Subtitle and Button text cannot be empty");
      return;
    }
    const updated = [...heroSlides];
    updated[editingSlideIndex] = slideEditData;
    setHeroSlides(updated);
    setEditingSlideIndex(null);
    // TODO: Save to backend when ready
  };

  const cancelEditSlide = () => setEditingSlideIndex(null);

  const deleteSlide = (index) => {
    if (window.confirm("Delete this hero slide?")) {
      setHeroSlides((prev) => prev.filter((_, i) => i !== index));
      // TODO: Delete from backend when ready
    }
  };

  const addSlide = () => {
    const newSlide = {
      img: "",
      title: "New Title",
      subtitle: "New Subtitle",
      button: "Button Text",
      btnClass: "bg-blue-600 hover:bg-blue-700"
    };
    setHeroSlides((prev) => [...prev, newSlide]);
    setEditingSlideIndex(heroSlides.length);
    setSlideEditData(newSlide);
  };

  return (
    <section id="home" className="relative">
      {/* Marquee */}
      <div className="absolute top-20 left-0 w-full bg-blue-900/80 text-white py-2 z-10 overflow-hidden">
        <div className="marquee flex items-center justify-center space-x-6 whitespace-nowrap">
          {marquee.map((text, idx) => (
            <span key={idx} className="inline-flex items-center mx-4">
              {editingMarqueeIndex === idx ? (
                <>
                  <input
                    type="text"
                    value={marqueeEditText}
                    onChange={(e) => setMarqueeEditText(e.target.value)}
                    className="px-2 py-1 rounded text-black"
                  />
                  <button
                    onClick={saveMarquee}
                    className="ml-2 bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditMarquee}
                    className="ml-1 bg-gray-400 hover:bg-gray-500 px-2 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{text}</span>
                  {adminView && (
                    <>
                      <button
                        onClick={() => startEditMarquee(idx)}
                        className="ml-2 bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded text-sm"
                        title="Edit"
                      >
                        ✏
                      </button>
                      <button
                        onClick={() => deleteMarquee(idx)}
                        className="ml-1 bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-sm"
                        title="Delete"
                      >
                        🗑
                      </button>
                    </>
                  )}
                </>
              )}
            </span>
          ))}
          {adminView && (
            <button
              onClick={addMarquee}
              className="ml-4 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
            >
              + Add
            </button>
          )}
        </div>
      </div>

      {/* Swiper Carousel */}
      <div className="w-full min-h-screen">
        <Swiper
          loop={true}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="heroSwiper"
        >
          {heroSlides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div
                className="relative min-h-screen parallax flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                  {editingSlideIndex === idx ? (
                    <div className="bg-white/90 p-6 rounded-lg">
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={slideEditData.img}
                        onChange={(e) => setSlideEditData(prev => ({ ...prev, img: e.target.value }))}
                        className="mb-3 w-full px-3 py-2 border rounded text-black"
                      />
                      <input
                        type="text"
                        placeholder="Title"
                        value={slideEditData.title}
                        onChange={(e) => setSlideEditData(prev => ({ ...prev, title: e.target.value }))}
                        className="mb-3 w-full px-3 py-2 border rounded text-black"
                      />
                      <input
                        type="text"
                        placeholder="Subtitle"
                        value={slideEditData.subtitle}
                        onChange={(e) => setSlideEditData(prev => ({ ...prev, subtitle: e.target.value }))}
                        className="mb-3 w-full px-3 py-2 border rounded text-black"
                      />
                      <input
                        type="text"
                        placeholder="Button Text"
                        value={slideEditData.button}
                        onChange={(e) => setSlideEditData(prev => ({ ...prev, button: e.target.value }))}
                        className="mb-3 w-full px-3 py-2 border rounded text-black"
                      />
                      <input
                        type="text"
                        placeholder="Button Classes (Tailwind)"
                        value={slideEditData.btnClass}
                        onChange={(e) => setSlideEditData(prev => ({ ...prev, btnClass: e.target.value }))}
                        className="mb-4 w-full px-3 py-2 border rounded text-black"
                      />
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={saveSlide}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditSlide}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
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
                      {adminView && (
                        <div className="mt-6 space-x-4">
                          <button
                            onClick={() => startEditSlide(idx)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                          >
                            Edit Slide
                          </button>
                          <button
                            onClick={() => deleteSlide(idx)}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                          >
                            Delete Slide
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {adminView && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
            <button
              onClick={addSlide}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded shadow-lg"
            >
              + Add New Slide
            </button>
          </div>
        )}
      </div>
    </section>
  );
}