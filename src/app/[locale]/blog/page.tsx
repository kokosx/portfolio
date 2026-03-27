import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, NotebookText, Sparkles, Tag } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getAllPosts } from "@/lib/mdx";
import {
  absoluteUrl,
  getSiteUrl,
  localeName,
  localizedPath,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

function formatPostDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "pl" ? "pl-PL" : "en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isPolish = locale === "pl";
  const path = localizedPath(locale, "/blog");
  const title = isPolish
    ? "Blog | B.KOKOSZEWSKI"
    : "Blog | B.KOKOSZEWSKI";
  const description = isPolish
    ? "Artykuły o inżynierii oprogramowania, SEO technicznym, Next.js i skalowaniu produktów cyfrowych."
    : "Articles about software engineering, technical SEO, Next.js, and scaling digital products.";

  return {
    metadataBase: new URL(getSiteUrl()),
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: "/blog",
        pl: "/pl/blog",
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: localeName(locale),
      images: [
        {
          url: absoluteUrl("/image_dev.webp"),
          width: 1200,
          height: 630,
          alt: "B.KOKOSZEWSKI blog banner",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/image_dev.webp")],
    },
    keywords: [
      "software engineering blog",
      "next.js blog",
      "technical seo",
      "mdx",
      "web development",
      "fullstack",
    ],
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const featuredPost = posts[0];
  const spotlightTags = [...new Set(posts.flatMap((post) => post.meta.tags || []))].slice(0, 4);
  const copy =
    locale === "pl"
      ? {
          eyebrow: "Editorial / Engineering Notes",
          heading: "BLOG, KTÓRY WYGLĄDA JAK PRODUKT, NIE DODATEK.",
          intro:
            "Wpisy o architekturze, SEO technicznym i decyzjach frontendowych, które mają trzymać poziom tak samo jak sam produkt.",
          statPosts: "Wpisów",
          statTopics: "Główne tematy",
          statLocale: "Język",
          featured: "Wyróżniony wpis",
          latest: "Najnowsze wpisy",
          empty: "Brak wpisow do pokazania.",
          read: "Czytaj wpis",
          minutes: "min czytania",
        }
      : {
          eyebrow: "Editorial / Engineering Notes",
          heading: "A BLOG THAT LOOKS LIKE PART OF THE PRODUCT.",
          intro:
            "Writing on architecture, technical SEO, and frontend decisions that should carry the same standard as the shipped work.",
          statPosts: "Posts",
          statTopics: "Core topics",
          statLocale: "Language",
          featured: "Featured post",
          latest: "Latest writing",
          empty: "No posts published yet.",
          read: "Read post",
          minutes: "min read",
        };

  const pageUrl = absoluteUrl(localizedPath(locale, "/blog"));
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "pl" ? "Lista wpisów blogowych" : "Blog post list",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(localizedPath(locale, `/blog/${post.meta.slug}`)),
      name: post.meta.title,
      datePublished: post.meta.date,
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl(localizedPath(locale, "/")),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: pageUrl,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "pl" ? "Blog B.KOKOSZEWSKI" : "B.KOKOSZEWSKI Blog",
    description: SITE_DESCRIPTION,
    url: pageUrl,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
  };

  return (
    <div className="dark relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <section className="border-b-[6px] border-off-white">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <div className="blog-surface border-b-[6px] border-off-white px-6 py-14 md:px-10 md:py-16 lg:border-b-0 lg:border-r-[6px]">
              <p className="text-sm font-bold uppercase tracking-[0.4em] text-primary">
                {copy.eyebrow}
              </p>
              <h1 className="mt-6 max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] md:text-7xl xl:text-[5.75rem]">
                {copy.heading}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-off-white/82 md:text-xl">
                {copy.intro}
              </p>

              <div className="mt-12 grid gap-4 md:grid-cols-3">
                <div className="border-2 border-off-white/70 bg-black/35 p-4">
                  <p className="text-xs uppercase tracking-[0.32em] text-off-white/55">
                    {copy.statPosts}
                  </p>
                  <p className="mt-3 text-4xl font-black text-primary">{posts.length}</p>
                </div>
                <div className="border-2 border-off-white/70 bg-black/35 p-4">
                  <p className="text-xs uppercase tracking-[0.32em] text-off-white/55">
                    {copy.statTopics}
                  </p>
                  <p className="mt-3 text-2xl font-black uppercase text-off-white">
                    {spotlightTags.length || 1}
                  </p>
                </div>
                <div className="border-2 border-off-white/70 bg-black/35 p-4">
                  <p className="text-xs uppercase tracking-[0.32em] text-off-white/55">
                    {copy.statLocale}
                  </p>
                  <p className="mt-3 text-2xl font-black uppercase text-off-white">
                    {locale === "pl" ? "PL" : "EN"}
                  </p>
                </div>
              </div>
            </div>

            <div className="blog-surface px-6 py-8 md:px-10 md:py-10">
              {featuredPost ? (
                <article className="flex h-full flex-col border-2 border-off-white bg-black/45">
                  <div className="relative min-h-[260px] border-b-2 border-off-white">
                    <Image
                      src={featuredPost.meta.coverImage || "/image_dev.webp"}
                      alt={featuredPost.meta.title}
                      fill
                      className="object-cover grayscale brightness-[0.55] contrast-125"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-primary/15" />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 border border-primary bg-black/80 px-3 py-2 text-xs font-bold uppercase tracking-[0.28em] text-primary">
                      <Sparkles size={14} />
                      {copy.featured}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-off-white/62">
                      <span>{formatPostDate(featuredPost.meta.date, locale)}</span>
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      <span>{estimateReadingTime(featuredPost.content)} {copy.minutes}</span>
                    </div>
                    <h2 className="mt-5 text-3xl font-black leading-[0.95] tracking-[-0.05em] md:text-4xl">
                      {featuredPost.meta.title}
                    </h2>
                    <p className="mt-4 text-base leading-7 text-off-white/82">
                      {featuredPost.meta.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {(featuredPost.meta.tags || []).slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="border border-off-white/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-off-white/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={localizedPath(locale, `/blog/${featuredPost.meta.slug}`)}
                      className="mt-8 inline-flex items-center gap-2 self-start bg-primary px-5 py-3 text-sm font-black uppercase tracking-[0.24em] text-black transition-transform hover:-translate-y-0.5"
                    >
                      {copy.read}
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </article>
              ) : (
                <div className="flex h-full items-center justify-center border-2 border-dashed border-off-white/40 px-6 py-16 text-center text-lg text-off-white/70">
                  {copy.empty}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="flex flex-col gap-6 border-b-2 border-off-white pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-primary">
                {copy.latest}
              </p>
              <h2 className="mt-3 text-4xl font-black uppercase tracking-[-0.06em] md:text-6xl">
                {locale === "pl" ? "Wpisy" : "Posts"}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {spotlightTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 border border-off-white/25 px-3 py-2 text-xs font-bold uppercase tracking-[0.24em] text-off-white/72"
                >
                  <Tag size={14} className="text-primary" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {posts.map((post, index) => (
              <article
                key={post.meta.slug}
                className="blog-surface group relative flex min-h-[360px] flex-col border-2 border-off-white p-6 md:p-8"
              >
                <span className="pointer-events-none absolute right-5 top-2 text-7xl font-black tracking-[-0.08em] text-off-white/[0.05] md:text-8xl">
                  {(index + 1).toString().padStart(2, "0")}
                </span>

                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-off-white/58">
                  <span className="inline-flex items-center gap-2">
                    <NotebookText size={14} className="text-primary" />
                    {post.meta.category || "Engineering"}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  <span>{formatPostDate(post.meta.date, locale)}</span>
                </div>

                <h3 className="mt-6 max-w-[18ch] text-3xl font-black uppercase leading-[0.95] tracking-[-0.05em] md:text-5xl">
                  <Link
                    href={localizedPath(locale, `/blog/${post.meta.slug}`)}
                    className="transition-colors group-hover:text-primary"
                  >
                    {post.meta.title}
                  </Link>
                </h3>

                <p className="mt-5 max-w-2xl text-base leading-7 text-off-white/82 md:text-lg">
                  {post.meta.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {(post.meta.tags || []).slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="border border-off-white/25 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-off-white/72"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-6 pt-10">
                  <p className="text-sm uppercase tracking-[0.24em] text-off-white/54">
                    {estimateReadingTime(post.content)} {copy.minutes}
                  </p>
                  <Link
                    href={localizedPath(locale, `/blog/${post.meta.slug}`)}
                    className="inline-flex items-center gap-2 bg-off-white px-5 py-3 text-sm font-black uppercase tracking-[0.24em] text-black transition-all group-hover:bg-primary"
                  >
                    {copy.read}
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
    </div>
  );
}
