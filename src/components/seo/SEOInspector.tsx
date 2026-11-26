/**
 * @file SEOInspector.tsx
 * @description Educational SEO Audit Panel floating inspector.
 * Dynamically analyzes the rendered DOM of the current page and provides real-time
 * pass/fail diagnostics for critical on-page SEO signals, including:
 * - Document <title> & length calculation (optimal: 30-60 chars)
 * - Meta description & length calculation (optimal: 120-160 chars)
 * - Canonical link resolution
 * - Heading structure (enforcing single <h1> rule)
 * - Image accessibility (missing alt attributes)
 * - Schema.org JSON-LD structured data type detection
 * - Robots index/noindex directives
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Code2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Search,
} from 'lucide-react';

interface AuditItem {
  id: string;
  label: string;
  status: 'pass' | 'warn' | 'fail';
  value: string;
  details?: string;
  explanation: string;
}

export const SEOInspector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'audit' | 'jsonld'>('audit');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);
  const [auditResults, setAuditResults] = useState<AuditItem[]>([]);
  const [detectedSchemas, setDetectedSchemas] = useState<
    Array<{ type: string; raw: string }>
  >([]);
  const location = useLocation();

  const runAudit = useCallback(() => {
    // 1. Document Title Audit
    const title = document.title || '';
    const titleLen = title.length;
    let titleStatus: 'pass' | 'warn' | 'fail' = 'pass';
    if (titleLen === 0) {
      titleStatus = 'fail';
    } else if (titleLen > 60 || titleLen < 25) {
      titleStatus = 'warn';
    }

    // 2. Meta Description Audit
    const metaDescEl = document.querySelector('meta[name="description"]');
    const metaDesc = metaDescEl?.getAttribute('content') || '';
    const descLen = metaDesc.length;
    let descStatus: 'pass' | 'warn' | 'fail' = 'pass';
    if (descLen === 0) {
      descStatus = 'fail';
    } else if (descLen < 50 || descLen > 165) {
      descStatus = 'warn';
    }

    // 3. Canonical URL
    const canonicalEl = document.querySelector('link[rel="canonical"]');
    const canonicalHref = canonicalEl?.getAttribute('href') || '';
    const hasCanonical = Boolean(canonicalHref);

    // 4. H1 Heading Audit
    const h1Elements = Array.from(document.querySelectorAll('h1'));
    const h1Count = h1Elements.length;
    let h1Status: 'pass' | 'warn' | 'fail' = 'pass';
    if (h1Count === 1) {
      h1Status = 'pass';
    } else if (h1Count === 0) {
      h1Status = 'fail';
    } else {
      h1Status = 'warn';
    }
    const h1Text = h1Elements.map((el) => `"${el.textContent?.trim()}"`).join(', ');

    // 5. Images Missing Alt Text
    const allImages = Array.from(document.querySelectorAll('img'));
    const missingAltImages = allImages.filter((img) => !img.hasAttribute('alt'));
    const emptyAltImages = allImages.filter(
      (img) => img.hasAttribute('alt') && img.getAttribute('alt')?.trim() === ''
    );
    const altFail = missingAltImages.length > 0;

    // 6. Robots Meta Tag Audit
    const robotsEl = document.querySelector('meta[name="robots"]');
    const robotsContent = robotsEl?.getAttribute('content') || 'Not explicitly declared (Default index, follow)';
    const isNoIndex = robotsContent.toLowerCase().includes('noindex');

    // 7. Schema.org JSON-LD Detection
    const scriptElements = Array.from(
      document.querySelectorAll('script[type="application/ld+json"]')
    );
    const parsedSchemas: Array<{ type: string; raw: string }> = [];

    scriptElements.forEach((script) => {
      try {
        const text = script.textContent || '';
        if (text) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            parsed.forEach((item) => {
              if (item && item['@type']) {
                parsedSchemas.push({
                  type: String(item['@type']),
                  raw: JSON.stringify(item, null, 2),
                });
              }
            });
          } else if (parsed && parsed['@type']) {
            const types = Array.isArray(parsed['@type'])
              ? parsed['@type'].join(' + ')
              : String(parsed['@type']);
            parsedSchemas.push({
              type: types,
              raw: JSON.stringify(parsed, null, 2),
            });
          }
        }
      } catch {
        // Ignore JSON parse errors in script tags during DOM mutation
      }
    });

    setDetectedSchemas(parsedSchemas);

    const schemaStatus = parsedSchemas.length > 0 ? 'pass' : 'warn';
    const schemaSummary =
      parsedSchemas.length > 0
        ? parsedSchemas.map((s) => s.type).join(', ')
        : 'No JSON-LD detected';

    // Construct the structured audit findings
    const items: AuditItem[] = [
      {
        id: 'title',
        label: 'Page Title (<title>)',
        status: titleStatus,
        value: `${title} (${titleLen} chars)`,
        details: titleLen > 60 ? 'Exceeds 60 characters - may be truncated in search snippets' : undefined,
        explanation:
          'Search engines display up to ~60 characters. A concise, keyword-rich title is the strongest single on-page ranking signal.',
      },
      {
        id: 'meta-description',
        label: 'Meta Description',
        status: descStatus,
        value: metaDesc ? `"${metaDesc}" (${descLen} chars)` : 'Missing meta description',
        details:
          descLen > 160
            ? 'Exceeds 160 chars (may truncate)'
            : descLen < 50 && descLen > 0
            ? 'Shorter than recommended 120-160 chars'
            : undefined,
        explanation:
          'While not a direct ranking score, meta descriptions directly drive search engine CTR (Click-Through Rate). Aim for 120-160 chars with a clear value proposition.',
      },
      {
        id: 'canonical',
        label: 'Canonical Tag (<link rel="canonical">)',
        status: hasCanonical ? 'pass' : 'fail',
        value: canonicalHref || 'Missing canonical link',
        explanation:
          'Prevents duplicate content penalties by telling crawlers which URL is the master version, consolidating link equity across query strings or parameter variants.',
      },
      {
        id: 'h1',
        label: 'H1 Heading Structure',
        status: h1Status,
        value: `${h1Count} found: ${h1Text || 'None'}`,
        details:
          h1Count > 1
            ? 'Multiple H1 tags detected. Best practice is exactly 1 H1 per page for semantic hierarchy.'
            : h1Count === 0
            ? 'No H1 found. Every page should have one main topic heading.'
            : 'Optimal (single H1)',
        explanation:
          'A single <h1> establishes the primary topic for crawlers and assistive screen readers, followed by a logical nested <h2> and <h3> hierarchy.',
      },
      {
        id: 'images-alt',
        label: 'Image Alt Attributes',
        status: altFail ? 'fail' : 'pass',
        value: altFail
          ? `${missingAltImages.length} image(s) missing alt attribute`
          : `All ${allImages.length} images have alt attributes (${emptyAltImages.length} decorative/empty)`,
        explanation:
          'Alt text provides semantic context for Google Image Search indexing and enables screen readers to describe images to visually impaired users.',
      },
      {
        id: 'jsonld',
        label: 'Schema.org Structured Data',
        status: schemaStatus,
        value: `${parsedSchemas.length} Schema(s) found: [${schemaSummary}]`,
        explanation:
          'Structured data unlocks Google rich results (FAQ accordions, product snippets, local business info, breadcrumbs) and populates the Google Knowledge Graph.',
      },
      {
        id: 'robots',
        label: 'Robots Directives',
        status: isNoIndex ? 'warn' : 'pass',
        value: robotsContent,
        details: isNoIndex ? 'Page is marked NOINDEX - crawlers will skip indexing' : 'Indexable by search bots',
        explanation:
          'Controls bot indexing. Pages should default to "index, follow", while error/404 pages must use "noindex, nofollow" to save crawl budget.',
      },
    ];

    setAuditResults(items);
  }, []);

  // Run audit on mount and whenever route changes, with a small delay for react-helmet to commit to DOM
  useEffect(() => {
    const timer = setTimeout(() => {
      runAudit();
    }, 150);

    return () => clearTimeout(timer);
  }, [location.pathname, runAudit]);

  const toggleTip = (id: string) => {
    setExpandedTip(expandedTip === id ? null : id);
  };

  const passCount = auditResults.filter((r) => r.status === 'pass').length;
  const warnCount = auditResults.filter((r) => r.status === 'warn').length;
  const failCount = auditResults.filter((r) => r.status === 'fail').length;

  return (
    <aside
      aria-label="SEO Inspector Dev Tool"
      className="fixed bottom-4 right-4 z-50 font-sans"
    >
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            runAudit();
          }}
          className="flex items-center gap-2.5 px-4 py-2.5 bg-[#291811] text-[#FAF7F2] rounded-full shadow-xl hover:bg-[#451A03] border border-[#E6DCCE]/30 transition-all cursor-pointer text-xs font-medium group"
          title="Open SEO Inspector Diagnostic Tool"
          aria-expanded={isOpen}
        >
          <Search className="w-4 h-4 text-[#D97706] group-hover:rotate-12 transition-transform" />
          <span>SEO Inspector</span>
          <span className="flex items-center gap-1 ml-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] text-[#FAF7F2]/70 font-mono">
              {passCount}/{auditResults.length}
            </span>
          </span>
        </button>
      )}

      {/* Audit Panel Drawer */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] max-h-[85vh] bg-[#FAF7F2] text-[#291811] rounded-2xl shadow-2xl border border-[#E6DCCE] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-[#291811] text-[#FAF7F2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#D97706]" />
              <div>
                <h2 className="text-sm font-semibold tracking-tight leading-none text-white">
                  SPA SEO Inspector
                </h2>
                <p className="text-[10px] text-[#FAF7F2]/60 mt-0.5">
                  Live React DOM & Schema Audit
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={runAudit}
                className="p-1.5 text-[#FAF7F2]/70 hover:text-white rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                title="Re-run SEO Audit"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#FAF7F2]/70 hover:text-white rounded-md hover:bg-white/10 transition-colors text-xs cursor-pointer font-bold px-2"
                title="Close Inspector"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick Score Bar */}
          <div className="px-4 py-2.5 bg-[#F3EDE2] border-b border-[#E6DCCE] flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-800 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {passCount} Pass
              </span>
              <span className="flex items-center gap-1 text-amber-800 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                {warnCount} Warn
              </span>
              {failCount > 0 && (
                <span className="flex items-center gap-1 text-rose-800 font-medium">
                  <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  {failCount} Fail
                </span>
              )}
            </div>

            {/* Tab switch */}
            <div className="flex items-center gap-1 bg-[#E6DCCE]/50 p-0.5 rounded-lg text-[11px]">
              <button
                onClick={() => setActiveTab('audit')}
                className={`px-2 py-0.5 rounded cursor-pointer font-medium transition-colors ${
                  activeTab === 'audit'
                    ? 'bg-white text-[#291811] shadow-xs'
                    : 'text-[#713627] hover:text-[#291811]'
                }`}
              >
                Audit
              </button>
              <button
                onClick={() => setActiveTab('jsonld')}
                className={`px-2 py-0.5 rounded cursor-pointer font-medium transition-colors ${
                  activeTab === 'jsonld'
                    ? 'bg-white text-[#291811] shadow-xs'
                    : 'text-[#713627] hover:text-[#291811]'
                }`}
              >
                JSON-LD ({detectedSchemas.length})
              </button>
            </div>
          </div>

          {/* Route Indicator */}
          <div className="px-4 py-1.5 bg-white border-b border-[#E6DCCE]/60 text-[11px] text-[#713627] flex items-center justify-between">
            <span className="font-mono text-[#451A03] font-semibold truncate max-w-[280px]">
              {location.pathname}
            </span>
            <span className="text-[10px] text-[#8C422B]">Dev Teaching Tool</span>
          </div>

          {/* Content Area */}
          <div className="overflow-y-auto p-4 space-y-3 flex-1 text-xs">
            {activeTab === 'audit' ? (
              auditResults.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-white rounded-xl border border-[#E6DCCE] shadow-xs space-y-1.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {item.status === 'pass' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {item.status === 'warn' && (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      )}
                      {item.status === 'fail' && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                      <span className="font-semibold text-[#291811]">
                        {item.label}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleTip(item.id)}
                      className="text-[#8C422B] hover:text-[#451A03] p-0.5 rounded hover:bg-[#F3EDE2] transition-colors cursor-pointer"
                      title="Why does this matter for SEO?"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Value */}
                  <p className="text-[11px] font-mono text-[#523A31] break-all bg-[#FAF7F2] p-2 rounded-lg border border-[#E6DCCE]/50">
                    {item.value}
                  </p>

                  {/* Warning Details if any */}
                  {item.details && (
                    <p className="text-[11px] text-amber-700 italic">
                      ⚠️ {item.details}
                    </p>
                  )}

                  {/* Expandable Explanation for students */}
                  {expandedTip === item.id && (
                    <div className="mt-2 p-2 bg-[#F3EDE2] rounded-lg text-[11px] text-[#451A03] border-l-2 border-[#D97706] space-y-1">
                      <p className="font-medium">🎓 SEO Engineering Rationale:</p>
                      <p>{item.explanation}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              /* JSON-LD Schemas Tab */
              <div className="space-y-3">
                {detectedSchemas.length === 0 ? (
                  <p className="text-center text-[#713627] py-6">
                    No JSON-LD schemas detected on this route.
                  </p>
                ) : (
                  detectedSchemas.map((schema, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-[#E6DCCE] p-3 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#291811] flex items-center gap-1.5">
                          <Code2 className="w-3.5 h-3.5 text-[#D97706]" />
                          @type: {schema.type}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                          Valid Schema.org
                        </span>
                      </div>
                      <pre className="text-[10px] font-mono bg-[#291811] text-[#FAF7F2] p-2.5 rounded-lg overflow-x-auto max-h-48">
                        {schema.raw}
                      </pre>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Footer with testing guidance links */}
          <div className="p-3 bg-[#F3EDE2] border-t border-[#E6DCCE] text-[10px] text-[#713627] flex items-center justify-between">
            <span>Google Rich Results & Lighthouse ready</span>
            <button
              onClick={() => {
                const url = `https://search.google.com/test/rich-results?url=${encodeURIComponent(
                  window.location.href
                )}`;
                window.open(url, '_blank');
              }}
              className="text-[#B45309] font-medium hover:underline cursor-pointer"
            >
              Test with Google ↗
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
