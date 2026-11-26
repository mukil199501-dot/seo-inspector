/**
 * @file SEO.tsx
 * @description Centralized, reusable SEO Head Component utilizing react-helmet-async.
 *
 * ==============================================================================
 * SEO EDUCATIONAL GUIDE: WHY EACH TAG IS CRITICAL IN A REACT SINGLE-PAGE APP (SPA)
 * ==============================================================================
 * 1. <title> TAG:
 *    - The single most influential on-page SEO ranking signal.
 *    - Best practice: Keep under 60 characters so Google and mobile SERPs do not
 *      truncate it with an ellipsis (...).
 *    - Structure: Include target keyword + brand name (e.g., "Menu & Beans | BrewCraft").
 *
 * 2. <meta name="description">:
 *    - Not a direct Google ranking factor, but drives Click-Through Rate (CTR).
 *    - Best practice: 120–160 characters. Provide a concise, persuasive summary
 *      with a clear value proposition.
 *
 * 3. <link rel="canonical">:
 *    - CRITICAL for SPAs to prevent duplicate content penalties.
 *    - Canonicalizes URLs that might have query strings (e.g., ?utm_source, ?sort=asc)
 *      or different trailing slashes to a single authoritative canonical version.
 *
 * 4. OPEN GRAPH & TWITTER TAGS (og:title, og:description, og:image, og:url, og:type):
 *    - Dictates how social scrapers (WhatsApp, Slack, iMessage, Twitter/X, LinkedIn)
 *      render preview cards when links are shared.
 *    - Increases organic social referral traffic through high-fidelity visual cards.
 *
 * 5. <meta name="robots" content="noindex, nofollow">:
 *    - Instructs search engine crawlers NOT to index specific utility pages (such as
 *      custom 404 pages, admin screens, or internal dev tools) to preserve crawl budget
 *      and prevent "thin/broken content" penalties.
 * ==============================================================================
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  /** Page specific title. Will be formatted with brand suffix if needed. Under 60 chars. */
  title: string;
  /** Compelling page summary for SERP snippets. Under 160 chars. */
  description: string;
  /** Relative route path starting with '/' (e.g., '/menu', '/blog/sample') */
  path: string;
  /** Absolute or relative image URL for social preview cards. Fallback provided. */
  image?: string;
  /** Open Graph type: 'website' for generic pages, 'article' for blog posts */
  type?: 'website' | 'article' | 'product';
  /** If true, issues <meta name="robots" content="noindex, nofollow"> (e.g. for 404) */
  noIndex?: boolean;
}

const SITE_URL = 'https://brewcraftcoffee.in';
const BRAND_NAME = 'BrewCraft Coffee Roasters';
const DEFAULT_IMAGE = '/src/assets/images/hero_coffee_roastery_1792125504489.jpg';

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  noIndex = false,
}) => {
  // Normalize canonical URL
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;

  // Ensure title includes brand if not already present, while keeping length concise
  const formattedTitle = title.includes(BRAND_NAME)
    ? title
    : `${title} | ${BRAND_NAME}`;

  // Resolve absolute image URL for external social crawlers
  const ogImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* 1. Primary Page Title (Rendered in browser tab and search results) */}
      <title>{formattedTitle}</title>

      {/* 2. Primary Meta Description (SERP Snippet copy) */}
      <meta name="description" content={description} />

      {/* 3. Canonical Link (Consolidates link equity and avoids duplicate indexing) */}
      <link rel="canonical" href={canonicalUrl} />

      {/* 4. Crawler Indexing Directives */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* 5. Open Graph Meta Tags (Facebook, WhatsApp, LinkedIn, Discord) */}
      <meta property="og:site_name" content={BRAND_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:alt" content={formattedTitle} />
      <meta property="og:locale" content="en_IN" />

      {/* 6. Twitter Card Tags (X Platform) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={formattedTitle} />

      {/* 7. Geo and Language Targeting for Local Business (Chennai, India) */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Chennai" />
      <meta name="geo.position" content="13.0336;80.2520" />
      <meta name="ICBM" content="13.0336, 80.2520" />
    </Helmet>
  );
};
