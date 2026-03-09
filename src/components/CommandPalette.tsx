'use client'

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
  type Action,
} from 'kbar'

// ── Actions ────────────────────────────────────────────────────
const ACTIONS: Action[] = [
  // ── Navigation ──
  {
    id: 'nav-home',
    name: 'Home',
    section: 'Navigate',
    keywords: 'home top start',
    perform: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  },
  {
    id: 'nav-about',
    name: 'About',
    section: 'Navigate',
    keywords: 'about background bio',
    perform: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    id: 'nav-skills',
    name: 'Tech Stack & Skills',
    section: 'Navigate',
    keywords: 'skills stack tech',
    perform: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    id: 'nav-projects',
    name: 'Projects',
    section: 'Navigate',
    keywords: 'projects work case studies',
    perform: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    id: 'nav-certs',
    name: 'Certifications',
    section: 'Navigate',
    keywords: 'certifications credentials',
    perform: () => document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    id: 'nav-contact',
    name: 'Contact',
    section: 'Navigate',
    keywords: 'contact email hire',
    perform: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
  },
  // ── Projects ──
  {
    id: 'proj-btr',
    name: 'View — Procurement Monitoring System',
    section: 'Projects',
    keywords: 'btr procurement monitoring government',
    perform: () => { window.location.href = '/projects/project-monitoring-system' },
  },
  {
    id: 'proj-thesis',
    name: 'View — Labor Law Case Analyzer',
    section: 'Projects',
    keywords: 'thesis labor law machine learning prediction',
    perform: () => { window.location.href = '/projects/labor-law-case-analyzer' },
  },
  // ── Actions ──
  {
    id: 'act-resume',
    name: 'Download Résumé',
    section: 'Actions',
    keywords: 'resume cv download',
    perform: () => window.open('/resume.pdf', '_blank'),
  },
  {
    id: 'act-email',
    name: 'Send Email',
    section: 'Actions',
    keywords: 'email contact hire',
    perform: () => { window.location.href = 'mailto:joshuamanuel052204@gmail.com' },
  },
]

// ── Results renderer ───────────────────────────────────────────
function PaletteResults() {
  const { results } = useMatches()

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          // Section header
          <div className="px-4 pt-3 pb-1.5 text-[10px] font-sans text-gold-700 tracking-[0.28em] uppercase border-t border-navy-800 first:border-0">
            {item}
          </div>
        ) : (
          // Action row
          <div
            className={`mx-2 px-3 py-2.5 flex items-center gap-3 cursor-pointer rounded-sm transition-all duration-100 ${
              active
                ? 'bg-gold-500/12 border-l-2 border-gold-500 pl-[10px]'
                : 'border-l-2 border-transparent'
            }`}
          >
            <span className={`font-sans text-sm leading-none ${active ? 'text-gold-300' : 'text-navy-200'}`}>
              {item.name}
            </span>
            {item.shortcut?.length ? (
              <span className="ml-auto flex gap-1">
                {item.shortcut.map((k) => (
                  <kbd
                    key={k}
                    className="text-[10px] font-mono text-gold-700 bg-navy-800 border border-navy-700 px-1.5 py-0.5"
                  >
                    {k}
                  </kbd>
                ))}
              </span>
            ) : null}
          </div>
        )
      }
    />
  )
}

// ── Provider + Portal (wrap entire app) ───────────────────────
export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  return (
    <KBarProvider actions={ACTIONS}>
      {/* Portal — rendered at document root */}
      <KBarPortal>
        <KBarPositioner className="z-[200] fixed inset-0 flex items-start justify-center pt-[18vh] px-4 bg-navy-950/75 backdrop-blur-sm">
          <KBarAnimator className="w-full max-w-lg bg-navy-900 border border-gold-700/30 shadow-[0_0_60px_rgba(0,0,0,0.6),0_0_24px_rgba(212,175,55,0.08)] overflow-hidden">

            {/* Top stripe */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

            {/* Search bar */}
            <div className="flex items-center gap-3 px-4 border-b border-navy-800">
              <svg className="w-4 h-4 text-gold-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <KBarSearch
                defaultPlaceholder="Search commands, navigate, open projects…"
                className="flex-1 py-4 bg-transparent text-navy-100 font-sans text-sm placeholder-navy-500 outline-none"
              />
              <kbd className="hidden sm:block text-[10px] font-mono text-navy-500 bg-navy-800 border border-navy-700 px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[320px] overflow-y-auto py-2">
              <PaletteResults />
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-navy-800 flex items-center gap-5 bg-navy-950/40">
              <span className="text-[10px] font-sans text-navy-500 flex items-center gap-1">
                <kbd className="font-mono bg-navy-800 border border-navy-700 px-1 py-0.5">↑↓</kbd>
                navigate
              </span>
              <span className="text-[10px] font-sans text-navy-500 flex items-center gap-1">
                <kbd className="font-mono bg-navy-800 border border-navy-700 px-1 py-0.5">↵</kbd>
                open
              </span>
              <span className="ml-auto font-serif text-[11px] text-gold-700/60 tracking-wide">
                Joshua Manuel
              </span>
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>

      {children}
    </KBarProvider>
  )
}
