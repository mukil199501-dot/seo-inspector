/**
 * @file BlogPostPage.tsx
 * @description Dynamic single article page with advanced technical SEO:
 * - Schema.org Article structured data (headline, author Person, publisher, datePublished)
 * - Schema.org FAQPage structured data (3 FAQs visibly rendered on page)
 * - Semantic HTML (<article>, single <h1>, <h2> subsections)
 * - Contextual internal links to products on /menu
 * - Related posts section for crawl depth and page equity distribution
 */

import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Share2,
  Check,
} from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { JsonLd, createFAQPageSchema } from '../components/seo/JsonLd';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BlurRevealImage } from '../components/common/BlurRevealImage';
import { BLOG_POSTS } from '../data/blogData';
import { MENU_ITEMS } from '../data/menuData';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  // Related Menu Products for Internal Linking
  const relatedProducts = MENU_ITEMS.filter((item) =>
    post.relatedMenuIds.includes(item.id)
  );

  // Related Articles for Internal Linking
  const relatedArticles = BLOG_POSTS.filter((p) =>
    post.relatedPostSlugs.includes(p.slug)
  );

  // Schema.org Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://brewcraftcoffee.in/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.metaDescription,
    image: `https://brewcraftcoffee.in${post.heroImage}`,
    datePublished: post.publishDate,
    dateModified: post.modifiedDate,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      description: post.author.bio,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BrewCraft Coffee Roasters',
      logo: {
        '@type': 'ImageObject',
        url: 'https://brewcraftcoffee.in/favicon.svg',
      },
    },
  };

  // Schema.org FAQPage structured data
  // Google requires that any question and answer declared in FAQPage JSON-LD
  // must also be visibly rendered on the page.
  const faqSchema = createFAQPageSchema(post.faqs);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.metaDescription,
          url: window.location.href,
        });
      } catch {
        // Share cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <>
      {/* 1. Per-page meta tags using react-helmet-async */}
      <SEO
        title={post.title}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        image={post.heroImage}
        type="article"
      />

      {/* 2. Structured Data: Article + FAQPage (with 3 matching visible FAQs) */}
      <JsonLd schema={[articleSchema, faqSchema]} />

      {/* 3. Accessible Breadcrumbs with schema sync */}
      <Breadcrumbs
        items={[
          { name: 'Coffee Journal', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <main id="main-content" className="py-8 lg:py-14">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Article Header */}
          <header className="space-y-6">
            {/* Zero-Pill Unboxed Metadata */}
            <div className="flex items-center flex-wrap gap-2 text-xs text-[#713627]">
              <span className="font-semibold text-[#B45309]">{post.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#8C422B]" />
                <time dateTime={post.publishDate}>{post.publishDate}</time>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8C422B]" />
                <span>{post.readingTime}</span>
              </span>
            </div>

            {/* Exactly one H1 tag per page */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#291811] text-balance leading-tight">
              {post.title}
            </h1>

            {/* Author Byline & Social Share */}
            <div className="flex items-center justify-between py-4 border-y border-[#E6DCCE]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#451A03] text-white flex items-center justify-center font-serif text-sm font-bold">
                  {post.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <span className="text-sm font-semibold text-[#291811] block">
                    {post.author.name}
                  </span>
                  <span className="text-xs text-[#8C422B]">{post.author.role}</span>
                </div>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#451A03] bg-[#F3EDE2] hover:bg-[#E6DCCE] rounded-lg border border-[#E6DCCE] transition-colors cursor-pointer"
                title="Share this article"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Link copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </header>

          {/* Featured Hero Image */}
          <div className="relative rounded-2xl overflow-hidden border border-[#E6DCCE] shadow-lg aspect-[16/9] bg-[#F3EDE2]">
            <BlurRevealImage
              src={post.heroImage}
              alt={post.imageAlt}
              width={896}
              height={504}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Excerpt */}
          <p className="text-base sm:text-lg text-[#451A03] font-medium leading-relaxed italic border-l-2 border-[#D97706] pl-4">
            {post.excerpt}
          </p>

          {/* Main Article Body Sections */}
          <div className="space-y-8 text-sm sm:text-base text-[#291811] leading-relaxed">
            {post.content.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#291811]">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-[#523A31]">
                    {p}
                  </p>
                ))}
                {sec.calloutText && (
                  <div className="p-4 bg-[#F3EDE2] rounded-xl border border-[#E6DCCE] text-xs sm:text-sm text-[#451A03] font-medium">
                    💡 {sec.calloutText}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Contextual Internal Links: Related Beans on Menu */}
          {relatedProducts.length > 0 && (
            <section
              aria-label="Featured coffees mentioned in article"
              className="p-6 sm:p-8 bg-[#F3EDE2] rounded-2xl border border-[#E6DCCE] space-y-4 my-10"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B45309]">
                <ShoppingBag className="w-4 h-4" />
                <span>Featured Coffees Mentioned in this Guide</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#291811]">
                Taste the Terroir Discussed Above
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {relatedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 bg-white rounded-xl border border-[#E6DCCE] flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] text-[#B45309] font-medium uppercase">
                        {prod.category}
                      </span>
                      <h3 className="font-serif text-base font-bold text-[#291811] mt-0.5">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-[#713627] mt-1 line-clamp-2">
                        {prod.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-[#E6DCCE] flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#291811]">
                        ₹{prod.price}
                      </span>
                      <Link
                        to={`/menu#${prod.id}`}
                        className="text-xs font-semibold text-[#451A03] hover:text-[#B45309] hover:underline"
                      >
                        Order Beans →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Visibly Rendered FAQs (Mandatory to mirror FAQPage Schema) */}
          <section
            aria-label="Frequently Asked Questions"
            className="pt-8 border-t border-[#E6DCCE] space-y-6"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309] block">
                Educational FAQ
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#291811]">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-[#713627]">
                These questions match the Google FAQPage JSON-LD schema embedded in the document head.
              </p>
            </div>

            <div className="space-y-3">
              {post.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-[#E6DCCE] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-[#291811] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#B45309] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8C422B] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#523A31] leading-relaxed border-t border-[#E6DCCE]/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Author Bio Section (E-E-A-T Signaling) */}
          <section className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#E6DCCE] flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#451A03] text-white flex items-center justify-center font-serif text-base font-bold shrink-0">
              {post.author.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div className="space-y-1 text-xs">
              <h3 className="font-semibold text-sm text-[#291811]">
                About {post.author.name}
              </h3>
              <p className="text-[#8C422B] font-medium">{post.author.role}</p>
              <p className="text-[#713627] leading-relaxed pt-1">{post.author.bio}</p>
            </div>
          </section>

          {/* Related Articles Section (Internal Linking Equity) */}
          {relatedArticles.length > 0 && (
            <section
              aria-label="Related coffee articles"
              className="pt-10 border-t border-[#E6DCCE] space-y-6"
            >
              <h2 className="font-serif text-2xl font-bold text-[#291811]">
                Related Specialty Guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    to={`/blog/${rel.slug}`}
                    className="p-5 bg-white rounded-2xl border border-[#E6DCCE] shadow-xs hover:shadow-md transition-all group block"
                  >
                    <span className="text-[11px] text-[#B45309] font-semibold uppercase">
                      {rel.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-[#291811] mt-1 group-hover:text-[#451A03] group-hover:underline">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-[#713627] mt-2 line-clamp-2">
                      {rel.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#451A03] mt-3 group-hover:translate-x-1 transition-transform">
                      Read guide <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </>
  );
};
