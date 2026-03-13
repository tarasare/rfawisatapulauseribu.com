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
  },
  {
    url: "https://images.unsplash.com/photo-1607927807664-de371067c3ab",
    alt: "Perahu kayu tradisional di pantai yang masih asli dengan pohon palem dan langit biru",
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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Galeri Foto
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Benamkan diri Anda dalam keindahan Pulau Seribu yang menakjubkan
          melalui koleksi foto pilihan kami
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
