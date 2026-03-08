'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useKBar } from 'kbar'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '/#about',           label: 'About'    },
  { href: '/#skills',          label: 'Skills'   },
  { href: '/#projects',        label: 'Projects' },
  { href: '/#certifications',  label: 'Certs'    },
  { href: '/#contact',         label: 'Contact'  },
]

export default function Navigation() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [active,    setActive]    = useState('')
  const pathname = usePathname()
  const { query } = useKBar()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)

      const ids = ['about', 'skills', 'projects', 'certifications', 'contact']
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) {
          const { top, bottom } = el.getBoundingClientRect()
          if (top <= 120 && bottom > 120) { setActive(id); return }
        }
      }
      setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isHome = pathname === '/'

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-navy-900/96 backdrop-blur-md border-b border-gold-700/15 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Home">
          <div className="w-9 h-9 border border-gold-600/70 flex items-center justify-center text-gold-400 font-serif font-bold text-sm group-hover:border-gold-400 group-hover:bg-gold-500/8 transition-all duration-200">
            JM
          </div>
          <span className="font-serif text-gold-300 text-base tracking-wide hidden sm:block">
            Joshua Manuel
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => {
            const id = href.replace('/#', '')
            const isActive = active === id
            return (
              <a
                key={label}
                href={href}
                className={`relative text-xs font-sans font-medium tracking-[0.18em] uppercase transition-colors duration-200 group ${
                  isActive ? 'text-gold-400' : 'text-navy-300 hover:text-gold-300'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-gold-500 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            )
          })}
        </div>

        {/* ⌘K trigger */}
        <button
          onClick={() => query.toggle()}
          className="hidden md:flex items-center gap-1.5 text-navy-400 hover:text-gold-500 border border-navy-700 hover:border-gold-700/50 px-2.5 py-1.5 transition-all duration-200 group"
          aria-label="Open command palette"
        >
          <span className="font-mono text-[10px]">⌘</span>
          <span className="font-mono text-[10px]">K</span>
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-gold-500 p-2 hover:text-gold-300 transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-navy-900/98 backdrop-blur-md border-t border-gold-700/15 overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-navy-200 hover:text-gold-400 transition-colors py-1.5"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
