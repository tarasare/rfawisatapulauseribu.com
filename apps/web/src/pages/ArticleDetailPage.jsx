import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
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

const renderSection = (section, index) => {
  switch (section.type) {
    case "heading": {
      const Tag = section.level === 3 ? "h3" : "h2";
      return (
        <Tag
          key={index}
          className={
            section.level === 3
              ? "text-lg font-semibold text-foreground mt-6"
              : "text-2xl font-semibold text-foreground mt-8"
          }
        >
          {section.text}
        </Tag>
      );
    }
    case "paragraph":
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mt-3">
          {section.text}
        </p>
      );
    case "list": {
      const ListTag = section.ordered ? "ol" : "ul";
      return (
        <ListTag
          key={index}
          className={`mt-3 space-y-2 text-muted-foreground ${
            section.ordered ? "list-decimal pl-5" : "list-disc pl-5"
          }`}
        >
          {section.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ListTag>
      );
    }
    case "blockquote":
      return (
        <blockquote
          key={index}
          className="mt-4 border-l-4 border-primary/60 bg-muted/40 px-4 py-3 text-muted-foreground italic"
        >
          {section.text}
        </blockquote>
      );
    case "internalLink":
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mt-3">
          {section.textBefore}
          <Link to={section.linkHref} className="text-primary hover:underline">
            {section.linkText}
          </Link>
          {section.textAfter}
        </p>
      );
    case "cta":
      return (
        <div
          key={index}
          className="mt-6 rounded-lg border border-border/60 bg-background px-4 py-3 text-foreground font-medium"
        >
          {section.text}
        </div>
      );
    default:
      return null;
  }
};

const ArticleDetailPage = () => {
  const { slug } = useParams();

  const article = useMemo(
    () => articles.find((item) => item.slug === slug),
    [slug],
  );

  if (!article) {
    return (
      <>
        <SeoHelmet title="Artikel tidak ditemukan | RFA Wisata Pulau Seribu" />
        <Navbar />
        <section className="pt-24 pb-16 px-4 bg-background sm:pt-20 md:pt-24">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              Artikel tidak ditemukan
            </h1>
            <p className="text-muted-foreground">
              Silakan kembali ke daftar artikel untuk membaca artikel lainnya.
            </p>
            <Link to="/articles">
              <Button variant="outline">Kembali ke Artikel</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SeoHelmet title={`${article.title} | RFA Wisata Pulau Seribu`} description={article.description} />
      <Navbar />

      <section className="pt-24 pb-16 px-4 bg-background sm:pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Artikel", href: "/articles" },
              { label: article.title },
            ]}
          />

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {formatDate(article.date)} • {article.readingTime}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground">{article.excerpt}</p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-border/60 shadow-sm">
            <img
              src={article.image}
              alt={`Ilustrasi ${article.title}`}
              className="w-full h-72 md:h-96 object-cover"
              loading="lazy"
            />
          </div>

          <article className="mt-8">
            {article.sections.map((section, index) =>
              renderSection(section, index),
            )}
          </article>

          <div className="mt-10">
            <Link to="/articles">
              <Button variant="outline">Lihat Artikel Lainnya</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ArticleDetailPage;
