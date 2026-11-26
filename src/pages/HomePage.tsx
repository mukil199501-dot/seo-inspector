/**
 * @file HomePage.tsx
 * @description Home page for BrewCraft Coffee Roasters.
 * Features:
 * - Single authoritative <h1> with contextual local keywords (Chennai, Specialty Coffee, South Indian Roasters)
 * - Organization and LocalBusiness Schema.org JSON-LD structured data
 * - High-priority hero image with fetchpriority="high" and explicit width/height for zero CLS
 * - Accessible sectioning with h2/h3 hierarchy and internal contextual links
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, MapPin, Award, Check, Sparkles, Coffee } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { JsonLd } from '../components/seo/JsonLd';
import { createOrganizationSchema, createLocalBusinessSchema } from '../components/seo/schema';
import { MENU_ITEMS } from '../data/menuData';
import { BlurRevealImage } from '../components/common/BlurRevealImage';

export const HomePage: React.FC = () => {
  const featuredCoffees = MENU_ITEMS.slice(0, 3);

  return (
    <>
      {/* 1. SEO Head Meta Tags (Page Title < 60 chars, Meta Description < 160 chars) */}
      <SEO
        title="BrewCraft Coffee Roasters | Chennai Artisanal Roastery"
        description="Experience specialty South Indian coffee in Chennai. Micro-roasted single-origin beans, traditional brass filter coffee, and ethically sourced estate coffees."
        path="/"
        image="/src/assets/images/hero_coffee_roastery_1792125504489.jpg"
        type="website"
      />

      {/* 2. Structured Data: Organization and LocalBusiness / CoffeeShop */}
      <JsonLd
        schema={[createOrganizationSchema(), createLocalBusinessSchema()]}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#E6DCCE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text Column (Left) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B45309]">
                <MapPin className="w-3.5 h-3.5" />
                <span>Alwarpet, Chennai · Micro-Batch Roastery</span>
              </div>

              {/* Single authoritative H1 tag for the entire page */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#291811] text-balance leading-tight">
                Artisanal Coffee Roasters in Chennai, Sourced from South Indian High-Altitude Estates
              </h1>

              <p className="text-base sm:text-lg text-[#713627] leading-relaxed max-w-2xl">
                We bridge four generations of Tamil coffee heritage with modern specialty roasting.
                From shade-grown estates in the Shevaroy Hills and Chikmagalur to small-batch drum roasts in our Alwarpet brew bar.
              </p>

              {/* Primary Call to Action buttons with descriptive link text */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/menu"
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-[#451A03] hover:bg-[#291811] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Explore Fresh Roasted Beans</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/about"
                  className="px-6 py-3.5 text-sm font-semibold text-[#451A03] bg-[#F3EDE2] hover:bg-[#E6DCCE] rounded-xl transition-colors border border-[#E6DCCE]"
                >
                  Our Sourcing Philosophy
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-[#E6DCCE] flex flex-wrap items-center gap-6 text-xs text-[#713627]">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" /> 100% Shade-Grown Arabica
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" /> Roasted Fresh Weekly in Chennai
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" /> Direct-Trade Estate Partnerships
                </span>
              </div>
            </div>

            {/* Hero Image Column (Right) */}
            {/* Core Web Vitals Optimization: explicit width/height to avoid CLS, fetchpriority="high" */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E6DCCE] bg-[#F3EDE2] aspect-[16/10] lg:aspect-auto lg:h-[480px]">
                <BlurRevealImage
                  src="/src/assets/images/hero_coffee_roastery_1792125504489.jpg"
                  alt="Artisanal BrewCraft coffee roastery and brew bar in Alwarpet Chennai, with barista pouring single origin pour-over"
                  width={800}
                  height={500}
                  fetchPriority="high"
                  className="hero-image-zoom w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white text-xs font-medium backdrop-blur-xs">
                    Live Roastery & Tasting Room · Eldams Road, Alwarpet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Single Origin & Specialty Blends Section */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309] block mb-2">
                Curated Roasts
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#291811]">
                Signature South Indian Estate Coffees
              </h2>
            </div>
            <Link
              to="/menu"
              className="text-sm font-semibold text-[#B45309] hover:text-[#451A03] hover:underline flex items-center gap-1.5 self-start md:self-auto"
            >
              <span>View full seasonal catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCoffees.map((coffee) => (
              <article
                key={coffee.id}
                className="bg-white rounded-2xl border border-[#E6DCCE] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="p-6 flex-1 space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#713627]">
                    <span className="font-medium text-[#B45309]">{coffee.category}</span>
                    <span>{coffee.elevation} elevation</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#291811]">
                    {coffee.name}
                  </h3>

                  <p className="text-xs text-[#713627] leading-relaxed">
                    {coffee.description}
                  </p>

                  <div className="pt-2 border-t border-[#E6DCCE]">
                    <span className="text-[11px] uppercase tracking-wider text-[#8C422B] block mb-1">
                      Tasting Notes
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-xs text-[#291811]">
                      {coffee.tastingNotes.map((note, idx) => (
                        <span key={note}>
                          {note}
                          {idx < coffee.tastingNotes.length - 1 && (
                            <span className="text-[#B45309] ml-1.5">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#E6DCCE] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#713627] block">Price</span>
                    <span className="font-mono text-base font-bold text-[#291811] tabular-nums">
                      ₹{coffee.price}
                    </span>
                  </div>
                  <Link
                    to="/menu"
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#451A03] hover:bg-[#291811] rounded-lg transition-colors"
                  >
                    Order Beans
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing & Terroir Story Split Section */}
      <section className="py-16 lg:py-24 bg-[#F3EDE2] border-y border-[#E6DCCE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-[#E6DCCE] shadow-lg aspect-[4/3]">
                <BlurRevealImage
                  src="/src/assets/images/craft_roasting_process_1792125504464.jpg"
                  alt="Head coffee roaster inspecting fresh roasted Arabica coffee beans in cooling drum at Chennai roastery"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309] block">
                The Roaster’s Craft
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#291811] text-balance">
                Precision Drum Roasting Tailored to South Indian Water & Climate
              </h2>
              <p className="text-sm sm:text-base text-[#713627] leading-relaxed">
                Coffee behaves differently in the tropical heat and humidity of Chennai.
                We customize thermodynamic roast curves on our cast-iron drum roaster to ensure our
                Arabica retains sparkling floral acidity while developing the heavy mouthfeel demanded by
                traditional brass filter decoction.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white rounded-xl border border-[#E6DCCE] space-y-1">
                  <span className="font-mono text-sm font-bold text-[#B45309] block">100% Traceable</span>
                  <p className="text-xs text-[#713627]">
                    Every bag carries the estate name, elevation, harvest month, and farmer partnership details.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-[#E6DCCE] space-y-1">
                  <span className="font-mono text-sm font-bold text-[#B45309] block">Zero Artificial Additives</span>
                  <p className="text-xs text-[#713627]">
                    Only high-altitude Arabica beans and natural slow-roasted chicory roots, zero flavorings.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#451A03] hover:text-[#B45309] hover:underline"
                >
                  <span>Read our full terroir story and farm transparency reports</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty Filter Coffee Featurette */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309] block">
                Chennai Filter Coffee Reimagined
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#291811]">
                Decoction Science: The Meter-Coffee Ritual Elevated
              </h2>
              <p className="text-sm sm:text-base text-[#713627] leading-relaxed">
                We believe South Indian filter coffee is one of the world’s most sophisticated brewing methods.
                By using single-origin Arabica from Yercaud alongside certified Jamnagar roasted chicory,
                we produce a decoction that delivers velvet crema, dark jaggery sweetness, andzero chalky bitterness.
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-[#713627]">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>Slow 15-minute gravity percolation through perforated solid brass chambers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>A2 farm-fresh cow milk or certified oat milk steamed to 62°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D97706] shrink-0" />
                  <span>Served in hand-beaten brass dabarah and tumbler sets in Alwarpet</span>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  to="/blog/art-of-south-indian-filter-coffee"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#451A03] hover:bg-[#291811] px-5 py-3 rounded-xl transition-colors"
                >
                  <span>Read Decoction Brewing Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[#E6DCCE] shadow-lg aspect-[4/3]">
                <BlurRevealImage
                  src="/src/assets/images/menu_specialty_filter_coffee_1792125504272.jpg"
                  alt="Artisanal South Indian filter coffee in traditional brass dabarah and tumbler next to pour over brewer"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Callout on Technical SEO */}
      <section className="py-12 bg-[#291811] text-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D97706]">
                <Coffee className="w-4 h-4" />
                <span>SEO Architecture Showcase</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Learn How This React App Ranks in Search Engines
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/75 max-w-2xl">
                Open the floating <strong>SEO Inspector</strong> at the bottom right to see real-time diagnostics
                for title tags, meta descriptions, canonical URLs, image alt attributes, and JSON-LD structured schemas.
              </p>
            </div>
            <Link
              to="/blog"
              className="px-5 py-2.5 text-xs font-semibold text-[#291811] bg-[#FAF7F2] hover:bg-white rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Browse Coffee Journal
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
