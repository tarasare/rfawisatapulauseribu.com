const carouselImages = [
  "https://images.unsplash.com/photo-1584861321580-6cef90ba57c4",
  "https://images.unsplash.com/photo-1654023316125-0c3cbae6ed0b",
  "https://images.unsplash.com/photo-1608504412102-b9de20f1dce0",
  "https://images.unsplash.com/photo-1660151183106-f76cb5134fe3",
  "https://images.unsplash.com/photo-1694435603356-2ac8edb31846",
];

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const destinations = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1553512313-64af79fdfe9c",
    images: carouselImages,
    name: "Pulau Tidung",
    description:
      "Pulau populer dengan Jembatan Cinta yang ikonik dan berbagai aktivitas wisata air.",
    fullDescription:
      "Pulau Tidung merupakan salah satu destinasi favorit di Kepulauan Seribu. Daya tarik utamanya adalah Jembatan Cinta yang menghubungkan Tidung Besar dan Tidung Kecil. Wisatawan dapat menikmati bersepeda keliling pulau, snorkeling, serta berbagai permainan air yang seru.",
    highlights: [
      "Jembatan Cinta",
      "Snorkeling",
      "Bersepeda Keliling Pulau",
      "Water Sports",
    ],
    facilities: [
      "Homestay",
      "Penyewaan Sepeda",
      "Restoran Seafood",
      "Pemandu Wisata",
    ],
    bestTime: "April - Oktober",
    price: "Rp 450,000",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18",
    images: carouselImages,
    name: "Pulau Pari",
    description:
      "Pulau dengan pantai pasir putih terkenal yaitu Pantai Pasir Perawan.",
    fullDescription:
      "Pulau Pari terkenal dengan Pantai Pasir Perawan yang memiliki pasir putih halus dan air laut yang jernih. Pulau ini cocok untuk bersantai, snorkeling, dan menikmati pemandangan matahari terbenam.",
    highlights: [
      "Pantai Pasir Perawan",
      "Snorkeling",
      "Sunset View",
      "Wisata Mangrove",
    ],
    facilities: [
      "Penginapan",
      "Perahu Wisata",
      "Penyewaan Alat Snorkeling",
      "Warung Makan",
    ],
    bestTime: "Mei - September",
    price: "Rp 500,000",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1696770202164-e28a61c1b52b",
    images: carouselImages,
    name: "Pulau Pramuka",
    description:
      "Pusat administrasi Kepulauan Seribu dengan wisata edukasi penangkaran penyu.",
    fullDescription:
      "Pulau Pramuka merupakan pusat pemerintahan Kepulauan Seribu sekaligus destinasi wisata edukasi. Wisatawan dapat mengunjungi penangkaran penyu sisik, menikmati snorkeling, dan menjelajahi keindahan lautnya.",
    highlights: [
      "Penangkaran Penyu",
      "Snorkeling",
      "Diving",
      "Wisata Edukasi",
    ],
    facilities: [
      "Penginapan AC",
      "Penyewaan Snorkeling",
      "Restoran Seafood",
      "Masjid",
    ],
    bestTime: "April - Oktober",
    price: "Rp 500,000",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    images: carouselImages,
    name: "Pulau Harapan",
    description:
      "Pulau yang terkenal dengan island hopping dan snorkeling di banyak pulau kecil.",
    fullDescription:
      "Pulau Harapan merupakan titik awal terbaik untuk island hopping di Kepulauan Seribu. Wisatawan dapat mengunjungi pulau-pulau kecil seperti Pulau Dolphin, Pulau Perak, dan Pulau Bulat dengan pemandangan laut yang indah.",
    highlights: [
      "Island Hopping",
      "Snorkeling",
      "Sunrise View",
      "Fotografi Alam",
    ],
    facilities: [
      "Homestay",
      "Perahu Wisata",
      "Pemandu Lokal",
      "Warung Makan",
    ],
    bestTime: "April - Oktober",
    price: "Rp 550,000",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    images: carouselImages,
    name: "Pulau Bidadari",
    description:
      "Pulau resort yang dekat dengan Jakarta dengan nuansa sejarah dan pantai indah.",
    fullDescription:
      "Pulau Bidadari merupakan pulau resort yang dekat dari Marina Ancol. Pulau ini memiliki peninggalan sejarah berupa benteng Belanda serta pantai yang indah untuk bersantai.",
    highlights: [
      "Resort Island",
      "Benteng Belanda",
      "Pantai Pasir Putih",
      "Swimming Pool",
    ],
    facilities: [
      "Resort",
      "Restoran",
      "Kolam Renang",
      "Speedboat Transfer",
    ],
    bestTime: "Sepanjang Tahun",
    price: "Rp 900,000",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    images: carouselImages,
    name: "Pulau Putri",
    description:
      "Pulau resort terkenal dengan underwater aquarium dan glass bottom boat.",
    fullDescription:
      "Pulau Putri adalah salah satu pulau resort paling terkenal di Kepulauan Seribu. Daya tarik utamanya adalah underwater aquarium dan glass bottom boat untuk melihat terumbu karang tanpa harus menyelam.",
    highlights: [
      "Underwater Aquarium",
      "Glass Bottom Boat",
      "Snorkeling",
      "Sunset View",
    ],
    facilities: [
      "Resort",
      "Restoran",
      "Kolam Renang",
      "Speedboat Transfer",
    ],
    bestTime: "Sepanjang Tahun",
    price: "Rp 1,200,000",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
    images: carouselImages,
    name: "Pulau Ayer",
    description: "Pulau resort dengan konsep bungalow di atas laut yang unik.",
    fullDescription:
      "Pulau Ayer dikenal dengan bungalow yang dibangun di atas laut, mirip dengan resort di Maldives. Pulau ini cocok untuk liburan romantis atau staycation yang tenang.",
    highlights: [
      "Water Bungalow",
      "Sunset View",
      "Kayaking",
      "Private Beach",
    ],
    facilities: [
      "Resort",
      "Restaurant",
      "Kolam Renang",
      "Water Sport",
    ],
    bestTime: "Sepanjang Tahun",
    price: "Rp 1,500,000",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    images: carouselImages,
    name: "Pulau Sepa",
    description: "Pulau dengan pantai pasir putih panjang dan spot diving terbaik.",
    fullDescription:
      "Pulau Sepa terkenal sebagai salah satu spot diving terbaik di Kepulauan Seribu dengan pantai pasir putih yang panjang dan air laut yang sangat jernih.",
    highlights: ["Diving Spot", "Snorkeling", "Pantai Pasir Putih", "Sunset"],
    facilities: ["Resort", "Dive Center", "Restaurant", "Speedboat"],
    bestTime: "April - Oktober",
    price: "Rp 1,800,000",
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    images: carouselImages,
    name: "Pulau Pantara",
    description:
      "Pulau resort eksklusif dengan fasilitas lengkap dan suasana privat.",
    fullDescription:
      "Pulau Pantara merupakan pulau resort premium di Kepulauan Seribu dengan fasilitas lengkap dan suasana yang sangat privat.",
    highlights: ["Luxury Resort", "Snorkeling", "Private Beach", "Water Sports"],
    facilities: ["Resort", "Restaurant", "Water Sport", "Speedboat Transfer"],
    bestTime: "Sepanjang Tahun",
    price: "Rp 2,000,000",
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    images: carouselImages,
    name: "Pulau Macan",
    description: "Eco resort eksklusif dengan konsep ramah lingkungan dan privat.",
    fullDescription:
      "Pulau Macan adalah eco resort yang terkenal dengan konsep ramah lingkungan. Pulau ini cocok untuk wisatawan yang mencari ketenangan dan pengalaman liburan yang eksklusif.",
    highlights: ["Eco Resort", "Private Island", "Snorkeling", "Sunset View"],
    facilities: ["Eco Resort", "Restaurant", "Snorkeling Gear", "Kayak"],
    bestTime: "Sepanjang Tahun",
    price: "Rp 2,500,000",
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    images: carouselImages,
    name: "Custom Tours",
    description: "Paket wisata custom sesuai kebutuhan perjalanan Anda.",
    fullDescription:
      "Kami menyediakan paket wisata custom ke berbagai pulau di Kepulauan Seribu sesuai kebutuhan Anda, mulai dari trip keluarga, gathering perusahaan, hingga private trip.",
    highlights: [
      "Private Trip",
      "Corporate Gathering",
      "Island Hopping",
      "Custom Itinerary",
    ],
    facilities: [
      "Guide",
      "Transportasi Speedboat",
      "Dokumentasi",
      "Snorkeling Gear",
    ],
    bestTime: "Sepanjang Tahun",
    price: "Custom Price",
  },
];

const destinationsWithSlugs = destinations.map((destination) => ({
  ...destination,
  slug: slugify(destination.name),
}));

export { carouselImages, destinationsWithSlugs as destinations };
