/**
 * @file BlogPage.tsx
 * @description Educational blog index containing specialty coffee articles and brewing guides.
 * Features:
 * - Single authoritative <h1>
 * - Schema.org Blog / ItemList structured data
 * - Clean unboxed metadata with typographic separators (anti-slop rule)
 * - Semantic <article> cards with descriptive links
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { JsonLd } from '../components/seo/JsonLd';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BlurRevealImage } from '../components/common/BlurRevealImage';
import { BLOG_POSTS } from '../data/blogData';

export const BlogPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const tags = ['All', 'Brewing Guides', 'Origins & Terroir'];

  const filteredPosts =
    selectedTag === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedTag);

  // Schema.org Blog representation
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'BrewCraft Coffee Journal & Brewing Guides',
    description:
      'Guides and articles on South Indian specialty coffee brewing, estate terroirs, and roasting science.',
    url: 'https://brewcraftcoffee.in/blog',
    blogPost: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.publishDate,
      dateModified: post.modifiedDate,
      url: `https://brewcraftcoffee.in/blog/${post.slug}`,
      author: {
        '@type': 'Person',
        name: post.author.name,
      },
    })),
  };

  return (
    <>
      {/* 1. SEO Head Meta Tags (Page Title < 60 chars, Meta Description < 160 chars) */}
      <SEO
        title="Coffee Journal & Brewing Guides | BrewCraft Chennai"
        description="Master South Indian filter coffee decoctions, high-altitude estate terroirs, and pour-over calibration. Expert guides by licensed Q-Graders."
        path="/blog"
        image="/src/assets/images/blog_coffee_brewing_1792125505375.jpg"
        type="website"
      />

      {/* 2. Structured Data: Blog / ItemList */}
      <JsonLd schema={blogListSchema} />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Coffee Journal', path: '/blog' }]} />

      <main id="main-content" className="py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Page Heading */}
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309] block">
              Sensory Research & Education
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#291811]">
              Specialty Coffee Journal & Brewing Guides
            </h1>
            <p className="text-sm sm:text-base text-[#713627] leading-relaxed">
              Explore the thermodynamics of decoction extraction, shade-grown ecology across Tamil Nadu and Karnataka,
              and water chemistry calibration for home baristas.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F3EDE2] rounded-xl border border-[#E6DCCE] w-fit">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#451A03] text-white shadow-xs font-semibold'
                    : 'text-[#713627] hover:text-[#291811]'
                }`}
                aria-pressed={selectedTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Blog Articles Grid */}
          <section aria-label="Coffee guides articles" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl border border-[#E6DCCE] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="relative aspect-[16/10] bg-[#F3EDE2] overflow-hidden">
                    <BlurRevealImage
                      src={post.heroImage}
                      alt={post.imageAlt}
                      width={600}
                      height={375}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    {/* Unboxed Metadata (Zero-Pill Discipline) */}
                    <div className="flex items-center gap-2 text-xs text-[#713627]">
                      <span className="font-semibold text-[#B45309]">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#8C422B]" />
                        {post.readingTime}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#8C422B]">{post.publishDate}</span>
                    </div>

                    <h2 className="font-serif text-xl font-bold text-[#291811] leading-snug">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="hover:text-[#451A03] hover:underline transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-xs text-[#713627] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer with Author and Link */}
                <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#E6DCCE] flex items-center justify-between text-xs">
                  <span className="text-[#8C422B]">By {post.author.name}</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="font-semibold text-[#451A03] hover:text-[#B45309] flex items-center gap-1 hover:underline"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
};
