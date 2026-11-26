/**
 * @file Header.tsx
 * @description Accessible semantic header with responsive navigation,
 * WCAG AA skip-to-content link, and strict top bar design contract compliance.
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Coffee } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu & Beans', path: '/menu' },
    { name: 'Our Heritage', path: '/about' },
    { name: 'Coffee Journal', path: '/blog' },
    { name: 'Roastery & Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DCCE] transition-colors">
      {/* 1. Skip-to-Content Link for Keyboard Accessibility (WCAG 2.1 Success Criterion 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#451A03] focus:text-[#FAF7F2] focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav Links) - Zone 3 (Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[#291811] hover:text-[#451A03] transition-colors whitespace-nowrap shrink-0 group"
          aria-label="BrewCraft Coffee Roasters homepage"
        >
          <div className="w-9 h-9 rounded-xl bg-[#451A03] text-[#FAF7F2] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
            <Coffee className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#291811]">
            BrewCraft
          </span>
        </Link>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#713627]"
        >
          {navLinks.map((link) => {
            const isActive =
              link.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-[#291811] font-semibold'
                    : 'text-[#713627] hover:text-[#291811]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.name}
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#B45309] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            to="/menu"
            className="px-4 py-2 text-xs font-semibold text-white bg-[#451A03] hover:bg-[#291811] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
          >
            Explore Coffees
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#451A03] rounded-lg hover:bg-[#F3EDE2] transition-colors focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E6DCCE] px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#F3EDE2] text-[#451A03] font-semibold'
                      : 'text-[#713627] hover:bg-[#F3EDE2]/60'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-[#E6DCCE]">
            <Link
              to="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-[#451A03] rounded-lg shadow-sm"
            >
              Explore Coffees & Beans
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
