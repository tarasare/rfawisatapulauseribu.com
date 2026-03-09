import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button.jsx";

const heroImages = [
  {
    src: new URL("../../assets/hero_slider/slide_1.jpeg", import.meta.url).href,
    alt: "Hero slider 1",
  },
  {
    src: new URL("../../assets/hero_slider/slide_2.jpeg", import.meta.url).href,
    alt: "Hero slider 2",
  },
  {
    src: new URL("../../assets/hero_slider/slide_3.jpeg", import.meta.url).href,
    alt: "Hero slider 3",
  },
  {
    src: new URL("../../assets/hero_slider/slide_4.jpeg", import.meta.url).href,
    alt: "Hero slider 4",
  },
  {
    src: new URL("../../assets/hero_slider/slide_5.jpeg", import.meta.url).href,
    alt: "Hero slider 5",
  },
  {
    src: new URL("../../assets/hero_slider/slide_6.jpeg", import.meta.url).href,
    alt: "Hero slider 6",
  },
];

const HeroSection = () => {
  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };



  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [heroImages.length]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="absolute top-6 left-6 z-20 hidden md:flex">
        <div className="inline-flex items-center gap-2 rounded-md bg-white/90 text-foreground px-3 py-2 shadow">
          <div className="h-7 w-7 rounded-full bg-foreground text-white text-xs font-bold flex items-center justify-center">
            RFA
          </div>
          <span className="text-sm font-semibold">RFA group</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-4 sm:pt-24 md:pt-32">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="order-1">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20">
              <img
                src={heroImages[activeIndex].src}
                alt={heroImages[activeIndex].alt}
                className="w-full h-64 sm:h-72 md:h-80 object-cover"
              />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 md:hidden">
                <div className="inline-flex items-center gap-2 rounded-md bg-white/90 text-foreground px-3 py-2 shadow">
                  <div className="h-7 w-7 rounded-full bg-foreground text-white text-xs font-bold flex items-center justify-center">
                    RFA
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">RFA group</span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-white/80 text-sm">
            </div>
          </div>

          <div className="order-2 text-white text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Discover The Paradise at Pulau Seribu
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto md:mx-0"
            >
              Embark on an unforgettable island adventure. Crystal clear waters,
              pristine beaches, and breathtaking sunsets await you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 sm:mt-0"
            >
              <Button
                size="lg"
                onClick={scrollToBooking}
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 mx-auto md:mx-0"
              >
                Book Your Adventure Now
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
