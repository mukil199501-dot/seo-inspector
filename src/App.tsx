/**
 * @file App.tsx
 * @description Main Application Entry for BrewCraft Coffee Roasters.
 * Demonstrates:
 * - HelmetProvider from react-helmet-async for thread-safe SPA head metadata management
 * - React Router v6 with clean semantic paths
 * - Code-splitting & Performance: React.lazy + Suspense route lazy-loading
 * - Smooth scroll-to-top on route transitions
 * - Dev-mode floating SEO Inspector diagnostic tool
 */

import React, { Suspense, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SEOInspector } from './components/seo/SEOInspector';

// ----------------------------------------------------------------------------
// Core Web Vitals (CWV) Optimization: Route-level Code Splitting via React.lazy
// Reduces initial JavaScript bundle size, speeding up Largest Contentful Paint (LCP)
// and Interaction to Next Paint (INP).
// ----------------------------------------------------------------------------
const HomePage = React.lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage }))
);
const MenuPage = React.lazy(() =>
  import('./pages/MenuPage').then((m) => ({ default: m.MenuPage }))
);
const AboutPage = React.lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const BlogPage = React.lazy(() =>
  import('./pages/BlogPage').then((m) => ({ default: m.BlogPage }))
);
const BlogPostPage = React.lazy(() =>
  import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage }))
);
const ContactPage = React.lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const NotFoundPage = React.lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

/**
 * ScrollToTop helper component to reset viewport on route transition
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

/**
 * Accessible, lightweight loading skeleton for route suspense
 */
function PageFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4"
    >
      <div className="w-8 h-8 border-3 border-[#B45309] border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-mono text-[#713627]">
        Brewing page contents...
      </span>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#291811] selection:bg-[#E8D8C8] selection:text-[#451A03]">
          {/* Accessible Semantic Header */}
          <Header />

          {/* Lazy-Loaded Route Views */}
          <div className="flex-1">
            <Suspense fallback={<PageFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                {/* Fallback route for 404 Not Found handling with noindex */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </div>

          {/* Accessible Semantic Footer */}
          <Footer />

          {/* Dev Educational Tool: Interactive Floating SEO Inspector */}
          <SEOInspector />
        </div>
      </Router>
    </HelmetProvider>
  );
}
