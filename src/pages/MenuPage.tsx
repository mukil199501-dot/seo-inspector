/**
 * @file MenuPage.tsx
 * @description Menu and retail coffee catalog page for BrewCraft Coffee Roasters.
 * Features:
 * - Single authoritative <h1>
 * - Schema.org ItemList with nested Product structured data
 * - Interactive category filtering (Whole Bean, Traditional Filter, Cold Brew, Brew Bar)
 * - Accessible product cards with price in tabular numerals, origin, and tasting notes
 * - Visual & JSON-LD BreadcrumbList
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check, Coffee, Sparkles } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { JsonLd } from '../components/seo/JsonLd';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { MENU_ITEMS, MenuItem } from '../data/menuData';

export const MenuPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cartNotice, setCartNotice] = useState<string | null>(null);

  const categories = ['All', 'Whole Bean', 'Traditional Filter', 'Cold Brew', 'Brew Bar'];

  const filteredItems =
    selectedCategory === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  // Schema.org ItemList with nested Product entries
  // Crucial for e-commerce and retail rich snippets in search results
  const menuStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'BrewCraft Coffee Roasters Menu & Beans',
    description:
      'Curated South Indian specialty coffee beans, traditional filter blends, and cold brew bottles.',
    numberOfItems: MENU_ITEMS.length,
    itemListElement: MENU_ITEMS.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: item.name,
        sku: item.sku,
        description: item.description,
        image: 'https://brewcraftcoffee.in/src/assets/images/menu_specialty_filter_coffee_1792125504272.jpg',
        brand: {
          '@type': 'Brand',
          name: 'BrewCraft Coffee Roasters',
        },
        offers: {
          '@type': 'Offer',
          price: item.price,
          priceCurrency: item.currency,
          availability: item.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          url: `https://brewcraftcoffee.in/menu#${item.id}`,
        },
      },
    })),
  };

  const handleOrder = (item: MenuItem) => {
    setCartNotice(`Added "${item.name}" to your roast order queue.`);
    setTimeout(() => {
      setCartNotice(null);
    }, 3500);
  };

  return (
    <>
      {/* 1. SEO Head Meta Tags (Page Title < 60 chars, Meta Description < 160 chars) */}
      <SEO
        title="Specialty Coffee Menu & Beans | BrewCraft Coimbatore"
        description="Browse single-origin Indian coffees, traditional filter blends, and cold brews roasted in Chennai. Order whole beans with doorstep dispatch across India."
        path="/menu"
        image="/src/assets/images/menu_specialty_filter_coffee_1792125504272.jpg"
        type="website"
      />

      {/* 2. Structured Data: ItemList / Product */}
      <JsonLd schema={menuStructuredData} />

      {/* Breadcrumb Navigation */}
      <Breadcrumbs items={[{ name: 'Menu & Beans', path: '/menu' }]} />

      <main id="main-content" className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header Title Section */}
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B45309] block">
              Roastery Store & Tasting Bar
            </span>

            {/* Exactly one H1 per page for semantic search clarity */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#291811]">
              Specialty Coffee Menu & Single-Origin Beans
            </h1>

            <p className="text-sm sm:text-base text-[#713627] leading-relaxed">
              Every bag is micro-roasted in small 6kg batches at our Chennai roastery.
              Shipped within 48 hours of roasting to guarantee peak aromatic bloom and sweet extraction.
            </p>
          </div>

          {/* Interactive Category Filter Controls (Clean segmented controls per frontend constitution) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F3EDE2] rounded-xl border border-[#E6DCCE] overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#451A03] text-white shadow-xs font-semibold'
                    : 'text-[#713627] hover:text-[#291811] hover:bg-white/50'
                }`}
                aria-pressed={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Toast Notice */}
          {cartNotice && (
            <div className="p-3 bg-[#451A03] text-white rounded-xl shadow-lg flex items-center justify-between text-xs animate-in fade-in">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                {cartNotice}
              </span>
              <span className="text-[11px] text-[#FAF7F2]/75">Dispatch: Tuesdays & Fridays</span>
            </div>
          )}

          {/* Product Items Grid */}
          <section aria-label="Coffee products list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className="bg-white rounded-2xl border border-[#E6DCCE] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  {/* Category & Weight unboxed metadata */}
                  <div className="flex items-center justify-between text-xs text-[#713627]">
                    <span className="font-semibold text-[#B45309]">{item.category}</span>
                    <span className="font-mono text-[#8C422B]">{item.weightOrVolume}</span>
                  </div>

                  <h2 className="font-serif text-xl font-bold text-[#291811]">
                    {item.name}
                  </h2>

                  <p className="text-xs text-[#713627] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {/* Terroir & Processing Details */}
                  <div className="space-y-1.5 pt-2 border-t border-[#E6DCCE] text-xs text-[#523A31]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#8C422B]">Estate Origin:</span>
                      <span className="font-medium text-[#291811] text-right">{item.origin}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8C422B]">Elevation:</span>
                      <span className="font-mono text-[#291811]">{item.elevation}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#8C422B]">Roast Profile:</span>
                      <span className="font-medium text-[#291811]">{item.roastLevel}</span>
                    </div>
                  </div>

                  {/* Tasting Notes */}
                  <div className="pt-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#8C422B] block mb-1">
                      Tasting Notes
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-xs text-[#291811]">
                      {item.tastingNotes.map((note, idx) => (
                        <span key={note}>
                          {note}
                          {idx < item.tastingNotes.length - 1 && (
                            <span className="text-[#B45309] ml-1.5">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Purchase Bar */}
                <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#E6DCCE] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-[#8C422B] block">Price per pack</span>
                    <span className="font-mono text-lg font-bold text-[#291811] tabular-nums">
                      ₹{item.price}
                    </span>
                  </div>
                  <button
                    onClick={() => handleOrder(item)}
                    className="px-4 py-2.5 text-xs font-semibold text-white bg-[#451A03] hover:bg-[#291811] rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Select Roast</span>
                  </button>
                </div>
              </article>
            ))}
          </section>

          {/* Contextual Internal Link Banner to Brewing Journal */}
          <section className="p-8 bg-[#F3EDE2] rounded-2xl border border-[#E6DCCE] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B45309]">
                <Coffee className="w-4 h-4" />
                <span>Brewing Technique Guides</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#291811]">
                Unsure which grind size to choose for your coffee gear?
              </h2>
              <p className="text-xs sm:text-sm text-[#713627] max-w-xl">
                Read our in-depth brew guides for brass filter decoctions, Hario V60 grind calibration, and water TDS mineral optimization.
              </p>
            </div>
            <Link
              to="/blog/art-of-south-indian-filter-coffee"
              className="px-5 py-3 text-xs font-semibold text-white bg-[#451A03] hover:bg-[#291811] rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              Read Decoction Guide
            </Link>
          </section>
        </div>
      </main>
    </>
  );
};
