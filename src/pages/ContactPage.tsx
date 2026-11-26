/**
 * @file ContactPage.tsx
 * @description Contact, tasting room visits, and cupping reservation page.
 * Features:
 * - Single authoritative <h1>
 * - LocalBusiness / CafeOrCoffeeShop Schema.org structured data
 * - FAQPage Schema.org structured data (with 3 matching visibly rendered FAQs)
 * - Accessible contact form with live confirmation
 * - Visual & Schema BreadcrumbList
 */

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Calendar,
} from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import {
  JsonLd,
  createLocalBusinessSchema,
  createFAQPageSchema,
} from '../components/seo/JsonLd';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BlurRevealImage } from '../components/common/BlurRevealImage';

export const ContactPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Cupping Session',
    message: '',
  });

  const contactFaqs = [
    {
      question: 'Is valet or customer parking available at the Alwarpet roastery?',
      answer:
        'Yes, we provide dedicated valet parking for brew bar guests directly in front of our Eldams Road location from 07:30 AM to 09:30 PM daily.',
    },
    {
      question: 'How fresh are the coffee beans purchased at the roastery counter?',
      answer:
        'All whole bean bags available in our cafe are roasted within 48 to 72 hours of your visit. Every package includes the exact roast date, master roaster initials, and bean batch number.',
    },
    {
      question: 'How can I register for weekend public coffee cuppings and sensory classes?',
      answer:
        'We host guided sensory cuppings every Saturday at 11:00 AM. You can reserve your spot using the form on this page or by telephoning our barista desk at +91 44 2499 1890.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* 1. SEO Head Meta Tags (Page Title < 60 chars, Meta Description < 160 chars) */}
      <SEO
        title="Visit Roastery & Cafe | BrewCraft Alwarpet Chennai"
        description="Visit BrewCraft Coffee Roasters in Alwarpet, Chennai. Experience pour-overs, reserve public cuppings, and buy fresh roasted single-origin Indian coffees."
        path="/contact"
        image="/src/assets/images/hero_coffee_roastery_1792125504489.jpg"
        type="website"
      />

      {/* 2. Structured Data: LocalBusiness + FAQPage (with 3 matching visible FAQs) */}
      <JsonLd
        schema={[
          createLocalBusinessSchema(),
          createFAQPageSchema(contactFaqs),
        ]}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Contact & Roastery', path: '/contact' }]} />

      <main id="main-content" className="py-8 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="relative -mx-4 sm:mx-0 overflow-hidden rounded-none sm:rounded-2xl border-[8px] border-[#451A03] shadow-2xl aspect-[16/10] sm:aspect-[2/1]">
            <BlurRevealImage
              src="/src/assets/images/hero_coffee_roastery_1792125504489.jpg"
              alt="BrewCraft roastery and coffee bar in Alwarpet, Chennai"
              width={800}
              height={500}
              fetchPriority="high"
              className="contact-image-zoom w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-amber-900/20 mix-blend-multiply"
            />
          </div>

          {/* Header Block */}
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309] block">
              Alwarpet Brew Bar & Tasting Room
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#291811]">
              Visit BrewCraft Roastery & Brew Bar in Chennai
            </h1>
            <p className="text-sm sm:text-base text-[#713627] leading-relaxed">
              Step into our working micro-roastery on Eldams Road. Smell beans roasting in our cast-iron drum,
              taste freshly extracted decoction flights, and discuss grind sizes with our resident Q-Graders.
            </p>
          </div>

          {/* Details & Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: NAP & Hours */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E6DCCE] shadow-xs space-y-6">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#291811]">
                  Roastery Location & Hours
                </h2>

                <div className="space-y-4 text-xs sm:text-sm text-[#713627]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#291811] font-semibold">
                        BrewCraft Roastery & Brew Bar
                      </strong>
                      <span>42/1 Eldams Road, Alwarpet</span>
                      <br />
                      <span>Chennai, Tamil Nadu 600018, India</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#291811] font-semibold">
                        Brew Bar & Retail Hours
                      </strong>
                      <span>Monday – Sunday: 07:00 AM – 10:00 PM IST</span>
                      <br />
                      <span className="text-[#8C422B] text-xs">
                        Roasting Batches: Daily 08:00 AM – 12:00 PM
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#B45309] shrink-0" />
                    <div>
                      <strong className="block text-[#291811] font-semibold">
                        Barista Desk
                      </strong>
                      <a
                        href="tel:+914424991890"
                        className="hover:text-[#451A03] hover:underline"
                      >
                        +91 44 2499 1890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#B45309] shrink-0" />
                    <div>
                      <strong className="block text-[#291811] font-semibold">
                        Inquiries & Wholesale
                      </strong>
                      <a
                        href="mailto:hello@brewcraftcoffee.in"
                        className="hover:text-[#451A03] hover:underline"
                      >
                        hello@brewcraftcoffee.in
                      </a>
                    </div>
                  </div>
                </div>

                {/* Simulated Visual Map Anchor */}
                <div className="p-4 bg-[#F3EDE2] rounded-xl border border-[#E6DCCE] text-xs text-[#523A31] space-y-2">
                  <div className="flex items-center justify-between font-semibold text-[#291811]">
                    <span>Alwarpet Heritage Quarter</span>
                    <span className="text-emerald-700">Open Now</span>
                  </div>
                  <p>
                    Near CP Ramaswamy Road intersection. Walking distance from Alwarpet signal.
                  </p>
                  <a
                    href="https://maps.google.com/?q=13.0336,80.2520"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block font-semibold text-[#B45309] hover:underline pt-1"
                  >
                    Open in Google Maps ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Reservation / Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E6DCCE] shadow-xs space-y-6">
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#291811]">
                    Cupping Session & Table Inquiries
                  </h2>
                  <p className="text-xs sm:text-sm text-[#713627] mt-1">
                    Book a Saturday public cupping flight or message our roasting team.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-center">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                    <h3 className="font-serif text-lg font-bold text-emerald-950">
                      Message Received
                    </h3>
                    <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                      Thank you, {formData.name}. Our head barista will confirm your reservation or inquiry via email within 2 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 text-xs font-semibold text-emerald-900 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label
                          htmlFor="name"
                          className="text-xs font-semibold text-[#291811]"
                        >
                          Full Name *
                        </label>
                        <input
                          id="name"
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="e.g. Meera Raman"
                          className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E6DCCE] rounded-xl focus:bg-white text-[#291811]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          className="text-xs font-semibold text-[#291811]"
                        >
                          Email Address *
                        </label>
                        <input
                          id="email"
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="meera@example.com"
                          className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E6DCCE] rounded-xl focus:bg-white text-[#291811]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label
                          htmlFor="phone"
                          className="text-xs font-semibold text-[#291811]"
                        >
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+91 98400 12345"
                          className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E6DCCE] rounded-xl focus:bg-white text-[#291811]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label
                          htmlFor="inquiryType"
                          className="text-xs font-semibold text-[#291811]"
                        >
                          Inquiry Type
                        </label>
                        <select
                          id="inquiryType"
                          value={formData.inquiryType}
                          onChange={(e) =>
                            setFormData({ ...formData, inquiryType: e.target.value })
                          }
                          className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E6DCCE] rounded-xl focus:bg-white text-[#291811]"
                        >
                          <option>Cupping Session (Sat 11 AM)</option>
                          <option>Cafe Table Reservation</option>
                          <option>Whole Bean Wholesale</option>
                          <option>General Inquiries</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="message"
                        className="text-xs font-semibold text-[#291811]"
                      >
                        Message / Special Requests
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about the number of guests or specific coffee roast origins you are interested in..."
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF7F2] border border-[#E6DCCE] rounded-xl focus:bg-white text-[#291811]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 text-xs font-semibold text-white bg-[#451A03] hover:bg-[#291811] rounded-xl shadow-xs transition-colors cursor-pointer"
                    >
                      Submit Reservation Request
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Visibly Rendered FAQs (Synchronized with FAQPage JSON-LD Schema) */}
          <section
            aria-label="Frequently Asked Questions"
            className="pt-8 border-t border-[#E6DCCE] space-y-6"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309] block">
                Visitor Information
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#291811]">
                Frequently Asked Questions for Roastery Visitors
              </h2>
              <p className="text-xs text-[#713627]">
                These questions match the Google FAQPage JSON-LD schema embedded in the document head.
              </p>
            </div>

            <div className="space-y-3 max-w-4xl">
              {contactFaqs.map((faq, index) => {
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
        </div>
      </main>
    </>
  );
};
