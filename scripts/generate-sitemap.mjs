/**
 * @file generate-sitemap.mjs
 * @description Node.js script to dynamically generate a valid XML sitemap
 * based on all static routes and dynamic blog articles.
 *
 * SEO RATIONALE:
 * Search engines (Googlebot, Bingbot, Yandex) use XML sitemaps as a primary discovery
 * roadmap for crawling websites. In dynamic SPA and blog setups, automated sitemap
 * generation prevents orphaned URLs and ensures new articles are indexed promptly.
 *
 * Usage: node scripts/generate-sitemap.mjs
 */

import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOMAIN = 'https://brewcraftcoffee.in';
const TODAY = new Date().toISOString().split('T')[0];

// Core static routes with their crawl frequency and priority weighting
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/menu', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

// Dynamic blog posts - in production this might query a CMS or database
const blogSlugs = [
  'art-of-south-indian-filter-coffee',
  'single-origin-estates-shevaroys-chikmagalur',
  'home-pourover-water-temperature-grind-guide',
];

const blogRoutes = blogSlugs.map((slug) => ({
  path: `/blog/${slug}`,
  priority: '0.7',
  changefreq: 'monthly',
}));

const allUrls = [...staticRoutes, ...blogRoutes];

const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated automatically by scripts/generate-sitemap.mjs on ${new Date().toISOString()} -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${DOMAIN}${item.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const targetPath = resolve(__dirname, '../public/sitemap.xml');
const targetDir = dirname(targetPath);

if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

writeFileSync(targetPath, xmlContent, 'utf-8');
console.log(`✅ Successfully generated sitemap with ${allUrls.length} URLs at: ${targetPath}`);
