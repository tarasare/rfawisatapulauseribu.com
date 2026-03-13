import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import SeoHelmet from "@/components/SeoHelmet.jsx";
import Navbar from "@/components/Navbar.jsx";
import Breadcrumbs from "@/components/Breadcrumbs.jsx";
import Footer from "@/components/Footer.jsx";
import { Button } from "@/components/ui/button.jsx";
import { articles } from "@/data/articles.js";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const ArticlesListPage = () => {
  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  return (
    <>
      <SeoHelmet
        title="Artikel Wisata Pulau Seribu | RFA Wisata Pulau Seribu"
        description="Kumpulan artikel wisata Pulau Seribu: tips liburan, rekomendasi pulau, transportasi, kuliner, dan panduan hemat."
      />

      <Navbar />

      <section className="pt-28 pb-20 px-4 bg-background sm:pt-24 md:pt-20">
        <div className="max-w-7xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Artikel" },
            ]}
          />

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Artikel Wisata Pulau Seribu
              </h1>
              <p className="text-muted-foreground mt-2">
                Tips perjalanan, rekomendasi pulau, kuliner, dan panduan
                transportasi untuk liburan yang lebih terencana.
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sortedArticles.map((article) => (
              <article
                key={article.id}
                className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-border/50"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={`Ilustrasi ${article.title}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{formatDate(article.date)}</span>
                    <span>•</span>
                    <span>{article.readingTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-card-foreground">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <Link to={`/articles/${article.slug}`} className="block">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Baca Artikel
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ArticlesListPage;
