import React from "react";
import SeoHelmet from "@/components/SeoHelmet.jsx";
import HeroSection from "@/components/HeroSection.jsx";
import DestinationsSection from "@/components/DestinationsSection.jsx";
import GallerySection from "@/components/GallerySection.jsx";
import TestimonialsSection from "@/components/TestimonialsSection.jsx";
import ContactForm from "@/components/ContactForm.jsx";
import FloatingWhatsappWidget from "@/components/FloatingWhatsappWidget.jsx";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import { Toaster } from "@/components/ui/toaster.jsx";

const HomePage = () => {
  return (
    <>
      <SeoHelmet title="RFA Wisata Pulau Seribu - Discover Paradise Islands | Island Tours & Adventures" />

      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
        <DestinationsSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactForm />

        <FloatingWhatsappWidget />

        <Footer />
      </div>

      <Toaster />
    </>
  );
};

export default HomePage;
