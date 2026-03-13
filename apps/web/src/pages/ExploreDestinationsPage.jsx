import React, { useMemo, useState } from "react";
import SeoHelmet from "@/components/SeoHelmet.jsx";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar.jsx";
import Breadcrumbs from "@/components/Breadcrumbs.jsx";
import Footer from "@/components/Footer.jsx";

import { destinations } from "@/data/destinations.js";

const ExploreDestinationsPage = () => {
  const [query, setQuery] = useState("");
  const [activityFilter, setActivityFilter] = useState("Semua Aktivitas");

  const activityOptions = useMemo(() => {
    const set = new Set();
    destinations.forEach((destination) => {
      destination.highlights.forEach((item) => set.add(item));
    });
    return ["Semua Aktivitas", ...Array.from(set).sort()];
  }, []);

  const filteredDestinations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return destinations.filter((destination) => {
      const matchesQuery =
        !normalizedQuery ||
        destination.name.toLowerCase().includes(normalizedQuery) ||
        destination.description.toLowerCase().includes(normalizedQuery);
      const matchesActivity =
        activityFilter === "Semua Aktivitas" ||
        destination.highlights.includes(activityFilter);

      return matchesQuery && matchesActivity;
    });
  }, [query, activityFilter]);



  return (
    <>
      <SeoHelmet title="Explore Destinations | RFA Wisata Pulau Seribu" />

      <Navbar />

      <section className="pt-28 pb-20 px-4 bg-background sm:pt-24 md:pt-20">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Explore" },
            ]}
          />
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Explore Destinations
              </h1>
              <p className="text-muted-foreground mt-2">
                Temukan pulau favoritmu dengan filter aktivitas dan pencarian.
              </p>
            </div>

            <Link to="/" className="self-start md:self-auto">
              <Button variant="outline">Kembali ke Beranda</Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_260px] mb-8">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari destinasi..."
              className="bg-background"
            />
            <select
              value={activityFilter}
              onChange={(event) => setActivityFilter(event.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {activityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Menampilkan {filteredDestinations.length} dari {destinations.length}{" "}
            destinasi
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination) => (
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
                      {destination.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
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

                  <Link
                    to={`/destinations/${destination.slug}`}
                    className="w-full"
                  >
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all">
                      Lihat Detail
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>


      </section>

      <Footer />
    </>
  );
};

export default ExploreDestinationsPage;
