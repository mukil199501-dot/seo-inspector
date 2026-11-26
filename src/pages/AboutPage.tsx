/**
 * @file AboutPage.tsx
 * @description Heritage, sourcing philosophy, and team profile for BrewCraft Coffee Roasters.
 * Demonstrates:
 * - Single authoritative <h1>
 * - E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) signaling
 * - Organization & LocalBusiness Schema.org structured data
 * - Internal links to menu and contact pages
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, ShieldCheck, Heart, Leaf, MapPin } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { JsonLd, createOrganizationSchema } from '../components/seo/JsonLd';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BlurRevealImage } from '../components/common/BlurRevealImage';

export const AboutPage: React.FC = () => {
  return (
    <>
      {/* 1. SEO Head Meta Tags (Page Title < 60 chars, Meta Description < 160 chars) */}
      <SEO
        title="Our Heritage & Sourcing | BrewCraft Coffee Chennai"
        description="Learn how BrewCraft sources single-origin shade-grown coffees across South India. Direct trade partnerships with farmers in Shevaroys and Chikmagalur."
        path="/about"
        image="/src/assets/images/craft_roasting_process_1792125504464.jpg"
        type="website"
      />

      {/* 2. Structured Data: Organization */}
      <JsonLd schema={createOrganizationSchema()} />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Our Heritage', path: '/about' }]} />

      <main id="main-content" className="py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header Block */}
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309] block">
              Ethical Sourcing & Terroir Mastery
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#291811] text-balance">
              Preserving south Indian Agroforestry Through Specialty Coffee
            </h1>
            <p className="text-base sm:text-lg text-[#713627] leading-relaxed">
              Founded in Chennai with a singular purpose: to prove that Indian shade-grown coffees
              stand shoulder to shoulder with the finest Ethiopian, Kenyan, and Colombian origins.
            </p>
          </div>

          {/* Sourcing Pillar Cards */}
          <section aria-label="Core Sourcing Principles" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl border border-[#E6DCCE] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F3EDE2] text-[#451A03] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#B45309]" />
              </div>
              <h2 className="font-serif text-xl font-bold text-[#291811]">
                100% Shade-Grown Canopies
              </h2>
              <p className="text-xs text-[#713627] leading-relaxed">
                All our partner estates preserve a three-tier rainforest canopy of silver oak, fig, and rosewood.
                This provides sanctuary for over 60 bird species while shielding delicate coffee cherries from heat stress.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E6DCCE] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F3EDE2] text-[#451A03] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#B45309]" />
              </div>
              <h2 className="font-serif text-xl font-bold text-[#291811]">
                Direct-Trade Premiums
              </h2>
              <p className="text-xs text-[#713627] leading-relaxed">
                We purchase directly from estate managers in Yercaud and Chikmagalur, paying 45% above the
                Commodity Coffee (C-Market) floor price directly to growers, ensuring long-term farm sustainability.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E6DCCE] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F3EDE2] text-[#451A03] flex items-center justify-center">
                <Award className="w-5 h-5 text-[#B45309]" />
              </div>
              <h2 className="font-serif text-xl font-bold text-[#291811]">
                Q-Grader Batch Testing
              </h2>
              <p className="text-xs text-[#713627] leading-relaxed">
                Every microlot is rigorously cupped and scored using the Specialty Coffee Association (SCA) 100-point protocol.
                Only lots scoring 84 points or higher earn the BrewCraft roastery mark.
              </p>
            </div>
          </section>

          {/* Deep Story Section Split */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309] block">
                The Heritage Journey
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#291811]">
                From Seven Sufi Seeds to Chennai’s Modern Brew Bar
              </h2>
              <p className="text-sm text-[#713627] leading-relaxed">
                The story of Indian coffee began in 1670 when Baba Budan strapped seven fertile coffee seeds
                to his chest during his pilgrimage from Yemen, planting them on the foggy slopes of Chandragiri Hills.
                For centuries, South India mastered coffee cultivation beneath lush jungle trees.
              </p>
              <p className="text-sm text-[#713627] leading-relaxed">
                However, for decades the global commodity market blended Indian coffee into generic Italian espresso bases.
                BrewCraft was founded to liberate these distinct estates—giving single-origin recognition to the bright citrus notes
                of the Shevaroys and the spiced chocolate profile of the Baba Budangiri hills.
              </p>
              <div className="pt-2">
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#451A03] hover:bg-[#291811] px-5 py-3 rounded-xl transition-colors"
                >
                  <span>Explore Our Single-Origin Microlots</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#E6DCCE] shadow-lg aspect-[4/3]">
                <BlurRevealImage
                  src="/src/assets/images/craft_roasting_process_1792125504464.jpg"
                  alt="Craft roasting process with cooling tray and Arabica beans at BrewCraft coffee roasters"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Master Roaster Profile (E-E-A-T Signal for Search Engines) */}
          <section className="p-8 lg:p-12 bg-[#F3EDE2] rounded-2xl border border-[#E6DCCE] space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B45309]">
              <Heart className="w-4 h-4" />
              <span>Sensory Leadership</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              <div className="space-y-2 md:col-span-2">
                <h2 className="font-serif text-2xl font-bold text-[#291811]">
                  Venkatesh Subramanian · Founder & Head of Roasting
                </h2>
                <p className="text-xs text-[#8C422B] font-medium">
                  Licensed Q-Arabica Grader (CQI) · Member of the Specialty Coffee Association of India
                </p>
                <p className="text-sm text-[#713627] leading-relaxed pt-2">
                  "Growing up in Mylapore, the rhythmic splash of brass dabarah coffee was the soundtrack to my mornings.
                  After training in specialty sensory analysis and green coffee grading, I realized that South Indian filter coffee
                  was not outdated—it was waiting for specialty-grade beans roasted with the same scientific precision applied to the world’s top pour-overs."
                </p>
              </div>
              <div className="p-5 bg-white rounded-xl border border-[#E6DCCE] space-y-3 text-xs">
                <span className="font-semibold text-[#291811] block">Roastery Facility</span>
                <p className="text-[#713627]">
                  Equipped with a 6kg Giesen drum roaster, automated moisture analyzers, and precision spectrophotometer roast color analyzers.
                </p>
                <Link
                  to="/contact"
                  className="text-[#B45309] font-medium hover:underline block pt-1"
                >
                  Book a public cupping session →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};
