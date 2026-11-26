/**
 * @file NotFoundPage.tsx
 * @description Custom 404 Not Found Page for BrewCraft Coffee Roasters.
 *
 * ==============================================================================
 * SEO EDUCATIONAL GUIDE: WHY 404 PAGES IN A REACT SPA REQUIRE noindex
 * ==============================================================================
 * In a traditional server-rendered site, a missing page returns an HTTP 404 status header.
 * However, in a client-side routed SPA, the web server (e.g. Vite dev or Nginx fallback)
 * serves index.html with an HTTP 200 OK status code for all unmatched routes.
 *
 * If a search engine crawler visits a broken or nonexistent link and encounters an
 * HTTP 200 without a noindex tag, Google classifies this as a "Soft 404".
 * Soft 404s pollute search indices, waste crawl budget, and can dilute domain authority.
 *
 * Therefore, injecting <meta name="robots" content="noindex, nofollow" /> via our
 * <SEO /> component on client-rendered 404 routes is a critical safeguard.
 * ==============================================================================
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Coffee, ArrowLeft } from 'lucide-react';
import { SEO } from '../components/seo/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      {/* Critical SEO Directive: noIndex={true} issues <meta name="robots" content="noindex, nofollow" /> */}
      <SEO
        title="Page Not Found | BrewCraft Coffee Roasters"
        description="The requested page could not be found on BrewCraft Coffee Roasters. Return to our Chennai roastery home or explore fresh coffees."
        path="/404"
        noIndex={true}
      />

      <Breadcrumbs items={[{ name: 'Page Not Found', path: '/404' }]} />

      <main id="main-content" className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="w-16 h-16 rounded-2xl bg-[#F3EDE2] text-[#451A03] flex items-center justify-center mx-auto border border-[#E6DCCE]">
            <Coffee className="w-8 h-8 text-[#B45309]" />
          </div>

          <div className="space-y-3">
            <span className="font-mono text-sm font-semibold text-[#B45309] uppercase tracking-wider block">
              HTTP 404 · Missing Route
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#291811]">
              This Cup is Empty
            </h1>
            <p className="text-sm sm:text-base text-[#713627] max-w-xl mx-auto leading-relaxed">
              The page you are looking for may have been moved, renamed, or steeped too long.
              Use the links below to return to our coffee catalog or brewing guides.
            </p>
          </div>

          {/* Educational Callout Box */}
          <div className="p-4 sm:p-6 bg-[#F3EDE2] rounded-2xl border border-[#E6DCCE] text-left text-xs space-y-2 text-[#451A03]">
            <span className="font-semibold block text-[#291811]">
              🎓 SEO Architecture Note: Soft 404 Prevention
            </span>
            <p className="text-[#713627] leading-relaxed">
              Because this is a client-side Single-Page Application, the web server serves index.html with an HTTP 200 code.
              To prevent search bots from indexing this broken URL as duplicate thin content, our{' '}
              <code className="bg-white px-1.5 py-0.5 rounded border border-[#E6DCCE] font-mono text-[11px]">
                &lt;SEO noIndex=&#123;true&#125; /&gt;
              </code>{' '}
              component automatically injects a{' '}
              <code className="bg-white px-1.5 py-0.5 rounded border border-[#E6DCCE] font-mono text-[11px]">
                noindex, nofollow
              </code>{' '}
              robots directive into the document head.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 text-xs font-semibold text-white bg-[#451A03] hover:bg-[#291811] rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Return to Roastery Home</span>
            </Link>

            <Link
              to="/menu"
              className="px-6 py-3 text-xs font-semibold text-[#451A03] bg-white hover:bg-[#F3EDE2] border border-[#E6DCCE] rounded-xl transition-colors flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#B45309]" />
              <span>Browse Coffee Catalog</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};
