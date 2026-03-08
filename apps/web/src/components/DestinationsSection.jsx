import React, { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Check } from "lucide-react";
import DestinationModal from "./DestinationModal.jsx";

const carouselImages = [
  "https://images.unsplash.com/photo-1584861321580-6cef90ba57c4",
  "https://images.unsplash.com/photo-1654023316125-0c3cbae6ed0b",
  "https://images.unsplash.com/photo-1608504412102-b9de20f1dce0",
  "https://images.unsplash.com/photo-1660151183106-f76cb5134fe3",
  "https://images.unsplash.com/photo-1694435603356-2ac8edb31846",
];

const destinations = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1696770202164-e28a61c1b52b",
    images: carouselImages,
    name: "Pulau Pramuka",
    description:
      "Pusat administrasi Kepulauan Seribu, sempurna untuk petualangan snorkeling dan menyelam dengan kehidupan laut yang semarak.",
    fullDescription:
      "Pulau Pramuka adalah pusat pemerintahan Kabupaten Administratif Kepulauan Seribu. Pulau ini menawarkan perpaduan sempurna antara fasilitas modern dan keindahan alam yang masih terjaga. Pengunjung dapat menikmati penangkaran penyu sisik, snorkeling di perairan jernih, dan menikmati hidangan laut segar di pinggir pantai.",
    highlights: [
      "Snorkeling",
      "Diving",
      "Konservasi Penyu Sisik",
      "Wisata Edukasi",
    ],
    facilities: [
      "Penginapan AC",
      "Penyewaan Alat Snorkeling",
      "Pusat Kesehatan",
      "Restoran Seafood",
      "Masjid",
    ],
    bestTime:
      "April hingga Oktober saat musim kemarau untuk visibilitas air terbaik.",
    price: "Rp 500,000",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1553512313-64af79fdfe9c",
    images: carouselImages,
    name: "Pulau Tidung",
    description:
      "Terkenal dengan jembatan ikoniknya yang menghubungkan dua pulau, ideal untuk bersepeda, berenang, dan olahraga air yang menarik.",
    fullDescription:
      "Pulau Tidung adalah salah satu destinasi paling populer di Kepulauan Seribu. Ikon utamanya adalah Jembatan Cinta yang menghubungkan Pulau Tidung Besar dan Tidung Kecil. Tempat ini sangat cocok untuk liburan keluarga, bersepeda mengelilingi pulau, dan menikmati berbagai wahana water sports.",
    highlights: [
      "Jembatan Cinta",
      "Bersepeda Keliling Pulau",
      "Water Sports (Banana Boat, Donut Boat)",
      "Sunset Viewing",
    ],
    facilities: [
      "Homestay Nyaman",
      "Penyewaan Sepeda",
      "Warung Makan",
      "Pemandu Wisata Lokal",
      "Area BBQ",
    ],
    bestTime: "Mei hingga September untuk cuaca cerah dan ombak yang tenang.",
    price: "Rp 450,000",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18",
    images: carouselImages,
    name: "Pulau Pari",
    description:
      "Surga pulau yang damai dengan pantai pasir putih bersih dan terumbu karang yang menakjubkan untuk dijelajahi.",
    fullDescription:
      "Pulau Pari menawarkan ketenangan dengan pesona Pantai Pasir Perawan yang sangat terkenal. Air lautnya yang dangkal dan tenang membuatnya sangat aman untuk anak-anak bermain. Pulau ini juga memiliki spot snorkeling yang indah dengan terumbu karang yang masih sangat terawat.",
    highlights: [
      "Pantai Pasir Perawan",
      "Snorkeling Terumbu Karang",
      "Fotografi Alam",
      "Wisata Mangrove",
    ],
    facilities: [
      "Penginapan Tepi Pantai",
      "Perahu Jelajah",
      "Penyewaan Alat Snorkeling",
      "Area Berkemah",
      "Pusat Informasi",
    ],
    bestTime:
      "Juni hingga Agustus untuk menikmati sunrise dan sunset yang sempurna.",
    price: "Rp 550,000",
  },
];

const DestinationsSection = () => {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Destinasi Populer
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Jelajahi destinasi pulau pilihan kami, masing-masing menawarkan
          pengalaman unik dan kenangan tak terlupakan
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group border border-border/50"
            >
              <div className="overflow-hidden h-64 relative">
                <img
                  src={destination.image}
                  alt={`${destination.name} - Destinasi pulau tropis yang indah`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-card-foreground">
                  {destination.name}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                  {destination.description}
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-2 text-card-foreground">
                    Highlight:
                  </h4>
                  <ul className="space-y-2">
                    {destination.highlights
                      .slice(0, 3)
                      .map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">
                            {highlight}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Mulai dari</p>
                    <p className="text-2xl font-bold text-primary">
                      {destination.price}
                    </p>
                    <p className="text-xs text-muted-foreground">per orang</p>
                  </div>
                </div>

                <Button
                  onClick={() => handleViewDetails(destination)}
                  className="w-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Lihat Detail
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DestinationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        destination={selectedDestination}
      />
    </section>
  );
};

export default DestinationsSection;
