import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";
import { Check } from "lucide-react";

import { destinations } from "@/data/destinations.js";

const DestinationsSection = () => {
  const featuredDestinations = destinations.slice(0, 3);

  return (
    <section className="pt-28 pb-20 px-4 bg-background sm:pt-24 md:pt-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
          Destinasi Populer
        </h2>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Lets Explore Our FUN.......
          <br />
          yuk Jelajai serunya
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination) => (
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

                <Link to={`/destinations/${destination.slug}`}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all">
                    Lihat Detail
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/destinations">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
              Lihat Semuanya
            </Button>
          </Link>
        </div>
      </div>


    </section>
  );
};

export default DestinationsSection;
