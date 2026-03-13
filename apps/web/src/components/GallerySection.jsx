import React, { useState } from "react";
import ImageLightbox from "./ImageLightbox.jsx";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1600688222644-2222724d8373",
    alt: "Beautiful beach sunset at Pulau Seribu dengan langit keemasan memantul di air yang tenang",
  },
  {
    url: "https://images.unsplash.com/photo-1695632646657-2ca8100fd6ee",
    alt: "Air laut berwarna pirus sebening kristal dan pantai pasir putih di surga pulau tropis",
  },
  {
    url: "https://images.unsplash.com/photo-1628458246336-f507db339ce2",
    alt: "Terumbu karang yang semarak dan kehidupan laut berwarna-warni di bawah air di Pulau Seribu",
  }
];

const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="py-20 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Title moved into the relative container below so the photobook overlay can be aligned with the single title */}

        {/* Place title and small photobook promo together so overlay aligns with title */}
        <div className="relative">
          <div className="flex items-center justify-center relative">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Galeri Foto
              </h2>
              <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
                Benamkan diri Anda dalam keindahan Pulau Seribu yang menakjubkan
                melalui koleksi foto pilihan kami
              </p>
            </div>

            {/* Photobook album-style overlay aligned exactly with the section title (desktop only)
                - No surrounding card, uses a blurred oval image behind album photos
                - Uses precise top-1/2 centering so overlay is perfectly vertically aligned with the section title */}
            <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 items-center pointer-events-none">
              <div className="relative w-44 h-24 flex items-center justify-end">
                {/* blurred oval background image (clipped to oval) */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-36 h-20 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80"
                    alt="photobook blurred"
                    className="w-full h-full object-cover filter blur-lg scale-110 brightness-95"
                  />
                </div>

                {/* back (rotated) album image */}
                <img
                  src="https://images.unsplash.com/photo-1526178613284-8e1b60e6b9b6?auto=format&fit=crop&w=1200&q=80"
                  alt="PhotoBook spread"
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-28 h-20 object-cover rounded-md shadow-md -rotate-6 z-10"
                />

                {/* front (cover) album image, slightly rotated and overlapping */}
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80"
                  alt="PhotoBook cover"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-28 h-20 object-cover rounded-md shadow-lg rotate-6 z-20"
                />
              </div>

              <div className="ml-3 text-right pointer-events-auto">
                <div className="text-sm font-semibold text-foreground">Free PhotoBook</div>
                <div className="text-xs text-muted-foreground">(untuk setiap peserta)</div>
              </div>
            </div>
          </div>

          {/* Gallery grid (full width); overlay above will sit to the right of the title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                onClick={() => openLightbox(index)}
                className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-border/50 bg-card"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                      Lihat Foto
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* For small screens show a subtle inline promo above the gallery */}
          <div className="lg:hidden mt-6">
            <div className="mx-auto max-w-md p-3 bg-card border border-border/50 rounded-lg flex items-center gap-3">
              <div className="w-16 h-12 overflow-hidden rounded-sm flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1526178613284-8e1b60e6b9b6?auto=format&fit=crop&w=800&q=60"
                  alt="Free PhotoBook"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm">
                <div className="font-semibold text-foreground">Free PhotoBook</div>
                <div className="text-xs text-muted-foreground">(untuk setiap peserta)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={galleryImages}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </section>
  );
};

export default GallerySection;
