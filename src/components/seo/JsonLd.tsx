/**
 * @file JsonLd.tsx
 * @description Injects Schema.org JSON-LD (JavaScript Object Notation for Linked Data)
 * structured data into the document <head> using react-helmet-async.
 *
 * ==============================================================================
 * SEO EDUCATIONAL GUIDE: WHY STRUCTURED DATA (JSON-LD) IS ESSENTIAL
 * ==============================================================================
 * 1. ZERO-CLICK & RICH RESULTS:
 *    - Search engines like Google transform standard blue links into rich cards,
 *      accordion FAQ drop-downs, star ratings, local knowledge graphs, and recipe
 *      cards when structured data is present.
 *
 * 2. ENTITY RESOLUTION & KNOWLEDGE GRAPH:
 *    - Helps Google understand the "entity" of your business: that BrewCraft is
 *      a physical LocalBusiness / CoffeeRoaster located in Chennai, India, with
 *      defined opening hours, phone number, and menu offerings.
 *
 * 3. FAQPage SCHEMA:
 *    - Visually surfaces expandable Q&A accordions directly in the search results,
 *      taking up substantial screen real estate and elevating organic CTR.
 *    - RULE: Questions and answers in the schema MUST also be visibly readable
 *      on the webpage for human visitors (violating this can cause manual penalties).
 *
 * 4. BreadcrumbList SCHEMA:
 *    - Displays clean visual navigation paths in Google SERPs (e.g.,
 *      brewcraftcoffee.in > Blog > Coffee Science) instead of raw ugly URLs.
 * ==============================================================================
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface JsonLdProps {
  /** The schema object conforming to schema.org specs */
  schema: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ schema }) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema, null, 2)}
      </script>
    </Helmet>
  );
};

// ----------------------------------------------------------------------------
// STRUCTURED DATA FACTORY HELPERS
// Standardized builders for common Schema.org types required by this application
// ----------------------------------------------------------------------------

export const createLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'CafeOrCoffeeShop'],
  '@id': 'https://brewcraftcoffee.in/#localbusiness',
  name: 'BrewCraft Coffee Roasters',
  alternateName: 'BrewCraft Chennai',
  image: 'https://brewcraftcoffee.in/src/assets/images/hero_coffee_roastery_1792125504489.jpg',
  description:
    'Artisanal specialty coffee roasters and brew bar in Chennai, India. Sourcing single-origin shade-grown Arabica from Shevaroys and Chikmagalur with micro-batch drum roasting.',
  url: 'https://brewcraftcoffee.in',
  telephone: '+91-44-2499-1890',
  priceRange: '₹₹',
  servesCuisine: ['Specialty Coffee', 'South Indian Filter Coffee', 'Artisanal Bakery'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '42/1 Eldams Road',
    addressLocality: 'Alwarpet, Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600018',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.0336,
    longitude: 80.252,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '07:00',
      closes: '22:00',
    },
  ],
  hasMap: 'https://maps.google.com/?q=13.0336,80.2520',
  sameAs: [
    'https://instagram.com/brewcraftroasters',
    'https://twitter.com/brewcraftcoffee',
  ],
});

export const createOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://brewcraftcoffee.in/#organization',
  name: 'BrewCraft Coffee Roasters',
  url: 'https://brewcraftcoffee.in',
  logo: 'https://brewcraftcoffee.in/favicon.svg',
  founder: {
    '@type': 'Person',
    name: 'Venkatesh Subramanian',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-44-2499-1890',
    contactType: 'Customer Service',
    areaServed: 'IN',
    availableLanguage: ['English', 'Tamil'],
  },
});

export interface FAQItemData {
  question: string;
  answer: string;
}

export const createFAQPageSchema = (faqs: FAQItemData[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export interface BreadcrumbItemData {
  name: string;
  url: string;
}

export const createBreadcrumbSchema = (breadcrumbs: BreadcrumbItemData[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url.startsWith('http')
      ? crumb.url
      : `https://brewcraftcoffee.in${crumb.url}`,
  })),
});
