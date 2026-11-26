/**
 * @file Breadcrumbs.tsx
 * @description Accessible semantic breadcrumb navigation component.
 * Simultaneously renders visual HTML navigation (<nav aria-label="Breadcrumb">)
 * and generates the Schema.org BreadcrumbList JSON-LD structured data.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { JsonLd, createBreadcrumbSchema } from '../seo/JsonLd';

export interface Crumb {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  // Always ensure Home is the root breadcrumb
  const fullCrumbs: Crumb[] = [{ name: 'Home', path: '/' }, ...items];

  const schemaCrumbs = fullCrumbs.map((crumb) => ({
    name: crumb.name,
    url: crumb.path,
  }));

  return (
    <>
      {/* 1. Schema.org BreadcrumbList for Search Results Breadcrumb Hierarchy */}
      <JsonLd schema={createBreadcrumbSchema(schemaCrumbs)} />

      {/* 2. Visual Semantic HTML Breadcrumbs with WCAG AA compliance */}
      <nav
        aria-label="Breadcrumb"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-[#713627]"
      >
        <ol className="flex items-center flex-wrap gap-1.5 list-none m-0 p-0">
          {fullCrumbs.map((crumb, idx) => {
            const isLast = idx === fullCrumbs.length - 1;

            return (
              <li key={crumb.path} className="flex items-center gap-1.5">
                {idx > 0 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-[#B45309]/50 shrink-0"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className="font-medium text-[#291811] truncate max-w-[240px]"
                    aria-current="page"
                  >
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="hover:text-[#451A03] hover:underline transition-colors underline-offset-4"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
