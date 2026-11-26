/**
 * @file Footer.tsx
 * @description Semantic footer (<footer role="contentinfo">) containing
 * NAP (Name, Address, Phone) consistency for Local SEO, accessible navigational links,
 * and references to technical SEO discovery files (robots.txt, sitemap.xml, llms.txt).
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Clock, Mail, FileCode, Bot, Compass } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#291811] text-[#FAF7F2] border-t border-[#451A03] mt-24">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & NAP (Name, Address, Phone) for Local SEO */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#451A03] flex items-center justify-center">
                <Coffee className="w-4 h-4 text-[#B45309]" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#FAF7F2]">
                BrewCraft Roasters
              </span>
            </div>

            <p className="text-xs text-[#FAF7F2]/75 leading-relaxed">
              Artisanal specialty coffee roastery based in Alwarpet, Chennai.
              Direct-trade single-origin shade-grown coffees roasted fresh weekly.
            </p>

            {/* Structured Local Business NAP Details */}
            <div className="space-y-2 text-xs text-[#FAF7F2]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <span>42/1 Eldams Road, Alwarpet, Chennai, TN 600018</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D97706] shrink-0" />
                <a
                  href="tel:+914424991890"
                  className="hover:text-white hover:underline transition-colors"
                >
                  +91 44 2499 1890
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>Mon – Sun: 07:00 AM – 10:00 PM IST</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D97706] shrink-0" />
                <a
                  href="mailto:hello@brewcraftcoffee.in"
                  className="hover:text-white hover:underline transition-colors"
                >
                  hello@brewcraftcoffee.in
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (Descriptive Anchor Texts) */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-[#D97706]">
              Explore Roastery
            </h2>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li>
                <Link
                  to="/"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Home & Roastery Overview
                </Link>
              </li>
              <li>
                <Link
                  to="/menu"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Specialty Coffee Menu & Whole Beans
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Our Heritage & Sustainable Sourcing
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Coffee Brewing Journal & Science
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Visit Brew Bar & Cupping Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Articles (Internal Linking Equity) */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-[#D97706]">
              Coffee Guides
            </h2>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/80">
              <li>
                <Link
                  to="/blog/art-of-south-indian-filter-coffee"
                  className="hover:text-white hover:underline transition-colors block line-clamp-2"
                >
                  The Art of South Indian Filter Coffee: Decoction Science
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/single-origin-estates-shevaroys-chikmagalur"
                  className="hover:text-white hover:underline transition-colors block line-clamp-2"
                >
                  Single-Origin Estates: Shevaroys vs Chikmagalur Terroir
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/home-pourover-water-temperature-grind-guide"
                  className="hover:text-white hover:underline transition-colors block line-clamp-2"
                >
                  Mastering Home Pour-Over: Water & Grind Calibration
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Technical SEO & AI Crawlability Discovery Files */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-[#D97706]">
              Technical SEO Files
            </h2>
            <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
              Demonstrating search engine and AI crawler discovery standards in a
              React SPA:
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#FAF7F2]/85 hover:text-white hover:underline transition-colors"
                >
                  <FileCode className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>robots.txt (Crawler Directives)</span>
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#FAF7F2]/85 hover:text-white hover:underline transition-colors"
                >
                  <Compass className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>sitemap.xml (All Canonical URLs)</span>
                </a>
              </li>
              <li>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#FAF7F2]/85 hover:text-white hover:underline transition-colors"
                >
                  <Bot className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>llms.txt (AEO / LLM Crawler Summary)</span>
                </a>
              </li>
              <li>
                <a
                  href="/manifest.webmanifest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#FAF7F2]/85 hover:text-white hover:underline transition-colors"
                >
                  <FileCode className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>manifest.webmanifest (PWA Specification)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accessibility notice */}
        <div className="mt-12 pt-8 border-t border-[#451A03] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <p>© {new Date().getFullYear()} BrewCraft Coffee Roasters Private Limited. Chennai, Tamil Nadu.</p>
          <p className="text-right">
            Built as a benchmark showcase for SPA Technical SEO & Core Web Vitals.
          </p>
        </div>
      </div>
    </footer>
  );
};
