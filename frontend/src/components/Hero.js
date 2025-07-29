import React, { useEffect, useState } from "react";

export default function Hero() {
  const images = ["/logo.png", "/logo1.png", "/logo.png", "/logo1.png"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="hero" style={{ backgroundImage: `url(${images[index]})` }}>
      <div className="overlay">
        <h1 className="hero-title">Welcome to IIT Indore Athletics Club</h1>
        <p className="hero-subtitle">
          Dedicated to nurturing champions and promoting physical excellence through competitive sports and fitness activities.
        </p>
      </div>

      <style>{`
        .hero {
          height: 90vh;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: background-image 1s ease-in-out;
        }

        .overlay {
          background: rgba(0, 0, 0, 0.6);
          padding: 40px;
          border-radius: 12px;
          animation: fadeUp 1.5s ease-out both;
        }

        .hero-title {
          font-size: 3em;
          color: #00ffcc;
          font-weight: bold;
          margin-bottom: 15px;
          animation: fadeUp 2s ease-out both;
        }

        .hero-subtitle {
          font-size: 1.3em;
          color: #ffffff;
          max-width: 800px;
          margin: 0 auto;
          animation: fadeUp 2.4s ease-out both;
        }

        @keyframes fadeUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2em;
          }
          .hero-subtitle {
            font-size: 1em;
          }
        }
      `}</style>
    </section>
  );
}
