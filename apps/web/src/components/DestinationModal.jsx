import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  MapPin,
  Info,
} from "lucide-react";

const DestinationModal = ({ isOpen, onClose, destination }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!isOpen || !destination?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen, destination]);

  if (!destination) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % destination.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + destination.images.length) % destination.images.length,
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background rounded-xl shadow-2xl border-none">
        {/* Top Section: Carousel */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full group">
          {destination.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${destination.name} view ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                idx === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Dark overlay gradient for top header readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {destination.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section: Details */}
        <div className="p-6 md:p-8 max-h-[50vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              {destination.name}
            </DialogTitle>
            <DialogDescription className="text-lg text-primary font-semibold">
              Mulai dari {destination.price} / orang
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-2 flex items-center gap-2 text-foreground">
                <Info className="w-5 h-5 text-primary" />
                Deskripsi
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {destination.fullDescription || destination.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-foreground">
                  Aktivitas & Highlight
                </h4>
                <ul className="space-y-2">
                  {destination.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3 text-foreground">
                  Fasilitas
                </h4>
                <ul className="space-y-2">
                  {destination.facilities?.map((facility, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg flex items-start gap-3">
              <Calendar className="w-6 h-6 text-primary flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">
                  Waktu Terbaik untuk Berkunjung
                </h4>
                <p className="text-muted-foreground text-sm mt-1">
                  {destination.bestTime}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Tutup
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => {
                onClose();
                document
                  .getElementById("booking")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Pesan Sekarang
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DestinationModal;
