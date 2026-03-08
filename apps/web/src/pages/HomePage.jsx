import React from "react";
import { Helmet } from "react-helmet";
import HeroSection from "@/components/HeroSection.jsx";
import DestinationsSection from "@/components/DestinationsSection.jsx";
import GallerySection from "@/components/GallerySection.jsx";
import TestimonialsSection from "@/components/TestimonialsSection.jsx";
import ContactForm from "@/components/ContactForm.jsx";
import { Toaster } from "@/components/ui/toaster.jsx";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>
          RFA Wisata Pulau Seribu - Discover Paradise Islands | Island Tours &
          Adventures
        </title>
        <meta
          name="description"
          content="Explore the breathtaking beauty of Pulau Seribu with RFA Wisata. Book your island adventure today and experience crystal clear waters, pristine beaches, and unforgettable memories. Best island tour packages in Indonesia."
        />
      </Helmet>

      <div className="min-h-screen">
        <HeroSection />
        <DestinationsSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactForm />

        {/* Footer */}
        <footer className="bg-foreground text-background py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  RFA Wisata Pulau Seribu
                </h3>
                <p className="text-background/80">
                  Your trusted partner for unforgettable island adventures in
                  the beautiful Thousand Islands of Indonesia.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-background/80">
                  <li>
                    <a
                      href="#booking"
                      className="hover:text-background transition-colors"
                    >
                      Book Now
                    </a>
                  </li>
                  <li>
                    <span className="cursor-pointer hover:text-background transition-colors">
                      Destinations
                    </span>
                  </li>
                  <li>
                    <span className="cursor-pointer hover:text-background transition-colors">
                      Gallery
                    </span>
                  </li>
                  <li>
                    <span className="cursor-pointer hover:text-background transition-colors">
                      Testimonials
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-2 text-background/80">
                  <li>Email: info@rfawisata.com</li>
                  <li>Phone: +62 812 3456 7890</li>
                  <li>WhatsApp: +62 812 3456 7890</li>
                  <li>Jakarta, Indonesia</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-background/20 pt-8 text-center text-background/80">
              <p>
                &copy; {new Date().getFullYear()} RFA Wisata Pulau Seribu. All
                rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <Toaster />
    </>
  );
};

export default HomePage;
