const priceTableBase = [
  { group: "20-100", standard: 340000, lengkap: 370000 },
  { group: "15-19", standard: 345000, lengkap: 375000 },
  { group: "10-14", standard: 370000, lengkap: 400000 },
  { group: "9", standard: 380000, lengkap: 410000 },
  { group: "8", standard: 395000, lengkap: 425000 },
  { group: "7", standard: 415000, lengkap: 445000 },
  { group: "6", standard: 435000, lengkap: 465000 },
  { group: "5", standard: 475000, lengkap: 505000 },
  { group: "4", standard: 525000, lengkap: 555000 },
  { group: "3", standard: 685000, lengkap: 715000 },
  { group: "2", standard: 795000, lengkap: 825000 },
];

const packages = [
  {
    id: "one-day",
    name: "Paket 1D Trip (One Day Trip)",
    destinations: ["Pulau Tidung", "Pulau Pari", "Pulau Pramuka"],
    price: "Rp 350.000 / orang",
    tier: 0,
    hasPricing: true,
    sections: [
      {
        title: "Include",
        items: [
          "Speedboat PP dari Marina Ancol / Kaliadem",
          "Guide lokal",
          "Makan siang",
          "Snorkeling trip",
          "Alat snorkeling",
          "Dokumentasi underwater",
          "Island hopping",
          "Asuransi wisata",
        ],
      },
      {
        title: "Itinerary",
        items: [
          "07:00 – Berkumpul di dermaga",
          "08:00 – Berangkat menuju pulau",
          "09:30 – Tiba di pulau",
          "10:00 – Snorkeling trip",
          "12:30 – Makan siang",
          "14:00 – Island hopping",
          "16:00 – Kembali ke Jakarta",
        ],
      },
    ],
  },
  {
    id: "two-day",
    name: "Paket 2D1N (2 Hari 1 Malam)",
    destinations: ["Pulau Tidung", "Pulau Pari", "Pulau Harapan"],
    price: "Rp 650.000 / orang",
    tier: 1,
    hasPricing: true,
    sections: [
      {
        title: "Include",
        items: [
          "Transportasi kapal PP",
          "Homestay AC",
          "3x makan",
          "BBQ dinner",
          "Snorkeling trip",
          "Alat snorkeling",
          "Dokumentasi underwater",
          "Sepeda keliling pulau",
          "Tour guide",
        ],
      },
      {
        title: "Hari 1",
        items: [
          "07:00 – Berkumpul di dermaga",
          "08:00 – Berangkat ke pulau",
          "10:00 – Check in homestay",
          "12:00 – Makan siang",
          "14:00 – Snorkeling trip",
          "17:30 – Sunset view",
          "19:00 – BBQ dinner",
        ],
      },
      {
        title: "Hari 2",
        items: [
          "06:30 – Sunrise",
          "07:30 – Sarapan",
          "09:00 – Keliling pulau / foto spot",
          "11:30 – Kembali ke Jakarta",
        ],
      },
    ],
  },
  {
    id: "resort-2d1n",
    name: "Paket Resort 2D1N",
    destinations: ["Pulau Putri", "Pulau Ayer", "Pulau Bidadari"],
    price: "Rp 1.200.000 / orang",
    tier: 2,
    hasPricing: true,
    sections: [
      {
        title: "Include",
        items: [
          "Speedboat PP Marina Ancol",
          "Resort room",
          "3x makan",
          "Snorkeling",
          "Glass bottom boat",
          "Kolam renang",
          "Beach activity",
        ],
      },
      {
        title: "Fasilitas",
        items: [
          "Private beach",
          "Swimming pool",
          "Restaurant",
          "Water sport",
        ],
      },
    ],
  },
  {
    id: "premium",
    name: "Paket Premium Island",
    destinations: ["Pulau Macan", "Pulau Pantara", "Pulau Sepa"],
    price: "Rp 2.500.000 / orang",
    tier: 3,
    hasPricing: true,
    sections: [
      {
        title: "Include",
        items: [
          "Speedboat transfer",
          "Eco resort / luxury cottage",
          "Full board meals",
          "Snorkeling gear",
          "Kayak",
          "Beach activity",
        ],
      },
      {
        title: "Cocok untuk",
        items: [
          "Honeymoon",
          "Private trip",
          "Healing trip",
          "Exclusive vacation",
        ],
      },
    ],
  },
  {
    id: "custom",
    name: "Custom Trip Kepulauan Seribu",
    destinations: ["Custom Tours"],
    price: "Hubungi kami untuk itinerary custom",
    tier: null,
    hasPricing: false,
    sections: [
      {
        title: "Tersedia untuk",
        items: [
          "Company gathering",
          "Family trip",
          "Honeymoon",
          "Island hopping private",
          "Open trip",
        ],
      },
    ],
  },
];

export { packages, priceTableBase };
