import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArrowLeft, CalendarDays, Globe2, Layers3, Tag } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getAllPosts, getPostBySlug, type PostMeta } from "@/lib/mdx";
import {
  absoluteUrl,
  getSiteUrl,
  localeName,
  localizedPath,
  SITE_NAME,
} from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
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

export function generateStaticParams() {
  return ["en", "pl"].flatMap((locale) =>
    getAllPosts(locale).map((post) => ({ locale, slug: post.meta.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const canonical = localizedPath(locale, `/blog/${post.meta.slug}`);
  const image = post.meta.coverImage || "/image_dev.webp";

  return {
    metadataBase: new URL(getSiteUrl()),
    title: `${post.meta.title} | ${SITE_NAME}`,
    description: post.meta.description,
    alternates: {
      canonical,
      languages: {
        en: `/blog/${post.meta.slug}`,
        pl: `/pl/blog/${post.meta.slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: post.meta.title,
      description: post.meta.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: localeName(locale),
      publishedTime: post.meta.date,
      modifiedTime: post.meta.updatedAt || post.meta.date,
      tags: post.meta.tags,
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: post.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
      images: [absoluteUrl(image)],
    },
    keywords: post.meta.keywords,
  };
}

function buildSchemas(meta: PostMeta, locale: string) {
  const postUrl = absoluteUrl(localizedPath(locale, `/blog/${meta.slug}`));
  const websiteUrl = absoluteUrl(localizedPath(locale, "/"));
  const imageUrl = absoluteUrl(meta.coverImage || "/image_dev.webp");

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (meta.faqs || []).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.updatedAt || meta.date,
    inLanguage: locale,
    image: [imageUrl],
    articleSection: meta.category,
    keywords: meta.keywords?.join(", "),
    author: {
      "@type": "Person",
      name: meta.author || "Bartosz Kokoszewski",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/next.svg"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    url: postUrl,
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: websiteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: absoluteUrl(localizedPath(locale, "/blog")),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: meta.title,
        item: postUrl,
      },
    ],
  };

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: meta.title,
    description: meta.description,
    url: postUrl,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
    about: {
      "@type": "Thing",
      name: meta.category || "Software engineering",
    },
  };

  return { faqPage, article, breadcrumbs, webpage };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const { content } = await compileMDX({
    source: post.content,
    options: { parseFrontmatter: false },
  });

  const schemas = buildSchemas(post.meta, locale);
  const formattedDate = formatPostDate(post.meta.date, locale);
  const updatedDate = formatPostDate(post.meta.updatedAt || post.meta.date, locale);
  const readTime = estimateReadingTime(post.content);
  const copy =
    locale === "pl"
      ? {
          back: "Powrót do bloga",
          minutes: "min czytania",
          published: "Publikacja",
          updated: "Aktualizacja",
          section: "Sekcja",
          topics: "Tagi",
          faq: "Najczęstsze pytania",
          faqIntro:
            "Ta sekcja jest widoczna na stronie i jednocześnie zasila dane schema FAQPage.",
          localeLabel: "Język",
        }
      : {
          back: "Back to blog",
          minutes: "min read",
          published: "Published",
          updated: "Updated",
          section: "Section",
          topics: "Topics",
          faq: "Frequently asked questions",
          faqIntro:
            "This section is rendered on the page and also powers the FAQPage structured data.",
          localeLabel: "Locale",
        };

  return (
    <div className="dark relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <section className="border-b-[6px] border-off-white">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
            <div className="blog-surface border-b-[6px] border-off-white px-6 py-12 md:px-10 md:py-16 lg:border-b-0 lg:border-r-[6px]">
              <Link
                href={localizedPath(locale, "/blog")}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.32em] text-off-white/62 transition-colors hover:text-primary"
              >
                <ArrowLeft size={15} />
                {copy.back}
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="border border-primary px-3 py-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  {post.meta.category || "Engineering"}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-off-white/55">
                  {formattedDate}
                </span>
                <span className="h-1 w-1 rounded-full bg-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-off-white/55">
                  {readTime} {copy.minutes}
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.07em] md:text-7xl xl:text-[5.25rem]">
                {post.meta.title}
              </h1>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-off-white/82 md:text-2xl md:leading-10">
                {post.meta.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-2">
                {(post.meta.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="border border-off-white/28 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-off-white/74"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="blog-surface flex items-stretch px-6 py-8 md:px-10 md:py-10">
              <div className="relative min-h-[320px] w-full border-2 border-off-white bg-black/50">
                <Image
                  src={post.meta.coverImage || "/image_dev.webp"}
                  alt={post.meta.title}
                  fill
                  className="object-cover grayscale brightness-[0.5] contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-primary/10" />
                <div className="absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-2">
                  <div className="border border-off-white/35 bg-black/80 p-4 backdrop-blur-sm">
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-off-white/52">
                      {copy.published}
                    </p>
                    <p className="mt-2 text-lg font-black text-off-white">{formattedDate}</p>
                  </div>
                  <div className="border border-primary/55 bg-black/80 p-4 backdrop-blur-sm">
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary/80">
                      {copy.updated}
                    </p>
                    <p className="mt-2 text-lg font-black text-primary">{updatedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 md:px-10 md:py-20 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="blog-surface border-2 border-off-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-off-white/52">
                {copy.published}
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-lg font-black text-off-white">
                <CalendarDays size={18} className="text-primary" />
                {formattedDate}
              </p>
            </div>

            <div className="blog-surface border-2 border-off-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-off-white/52">
                {copy.section}
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-lg font-black text-off-white">
                <Layers3 size={18} className="text-primary" />
                {post.meta.category || "Engineering"}
              </p>
            </div>

            <div className="blog-surface border-2 border-off-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-off-white/52">
                {copy.localeLabel}
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-lg font-black text-off-white">
                <Globe2 size={18} className="text-primary" />
                {locale === "pl" ? "PL / Polski" : "EN / English"}
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.24em] text-off-white/55">
                {readTime} {copy.minutes}
              </p>
            </div>

            {(post.meta.tags || []).length > 0 ? (
              <div className="blog-surface border-2 border-off-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-off-white/52">
                  {copy.topics}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(post.meta.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 border border-off-white/25 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-off-white/74"
                    >
                      <Tag size={13} className="text-primary" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>

          <div className="space-y-8">
            <article className="blog-surface border-2 border-off-white px-6 py-8 md:px-10 md:py-10">
              <div className="blog-prose">{content}</div>
            </article>

            {post.meta.faqs && post.meta.faqs.length > 0 ? (
              <section className="blog-surface border-2 border-off-white px-6 py-8 md:px-10 md:py-10">
                <div className="max-w-3xl">
                  <p className="text-sm font-bold uppercase tracking-[0.34em] text-primary">
                    FAQ
                  </p>
                  <h2 className="mt-3 text-4xl font-black uppercase leading-[0.95] tracking-[-0.06em] md:text-5xl">
                    {copy.faq}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-off-white/72">
                    {copy.faqIntro}
                  </p>
                </div>

                <div className="mt-10 grid gap-4">
                  {post.meta.faqs.map((faq, index) => (
                    <div
                      key={faq.question}
                      className="border-2 border-off-white bg-black/35 p-5 md:p-6"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="max-w-3xl">
                          <p className="text-xs font-bold uppercase tracking-[0.3em] text-off-white/48">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <h3 className="mt-3 text-xl font-black leading-tight text-off-white md:text-2xl">
                            {faq.question}
                          </h3>
                        </div>
                        <div className="h-px w-full bg-off-white/15 md:hidden" />
                        <p className="max-w-2xl text-base leading-8 text-off-white/80">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.webpage) }}
      />
    </div>
  );
}
