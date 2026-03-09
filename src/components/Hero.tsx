'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useKBar } from 'kbar'
import InteractiveGrid from './InteractiveGrid'
import MagneticButton from './MagneticButton'

// ── Framer Motion variants ─────────────────────────────────────
const CONTAINER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.10 } },
}
const ITEM = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
}
const UNDERLINE = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.85 } },
}
const SCROLL_FADE = {
  hidden: { opacity: 0 },
  show: { opacity: 0.5, transition: { delay: 1.6, duration: 0.8 } },
}

const ROLES = [
  'Full-Stack Engineer',
  'Web Developer',
  'Mobile Developer',
  'Backend Architect',
  'Database Engineer',
] as const

// ── Component ──────────────────────────────────────────────────
export default function Hero() {
  const { query } = useKBar()
  const [isMac, setIsMac] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().includes('MAC'))
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy-950"
    >
      {/* Interactive dot-grid background */}
      <InteractiveGrid />

      {/* Radial vignette — darkens edges, clear center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_0%,rgba(6,14,30,0.72)_100%)] pointer-events-none" />

      {/* Corner brackets */}
      <div className="absolute top-[72px] left-6  w-14 h-14 border-l-2 border-t-2 border-gold-700/25 hidden sm:block pointer-events-none" />
      <div className="absolute top-[72px] right-6 w-14 h-14 border-r-2 border-t-2 border-gold-700/25 hidden sm:block pointer-events-none" />
      <div className="absolute bottom-14   left-6  w-14 h-14 border-l-2 border-b-2 border-gold-700/25 hidden sm:block pointer-events-none" />
      <div className="absolute bottom-14   right-6 w-14 h-14 border-r-2 border-b-2 border-gold-700/25 hidden sm:block pointer-events-none" />

      {/* ── Staggered content ─────────────────────────────── */}
      <motion.div
        variants={CONTAINER}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full"
      >
        {/* Eye-brow */}
        <motion.p variants={ITEM} className="text-gold-600 text-xs font-sans font-medium tracking-[0.38em] uppercase mb-8">
          Full-Stack Developer · Pasay City, Philippines
        </motion.p>

        {/* Name + animated underline */}
        <motion.div variants={ITEM} className="inline-block mb-6">
          <h1 className="font-serif font-bold text-gold-300 text-[clamp(3rem,10vw,6.5rem)] leading-none tracking-tight">
            Joshua Manuel
          </h1>
          <motion.div
            variants={UNDERLINE}
            className="mt-3 h-[3px] rounded-full bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700 origin-left"
          />
        </motion.div>

        {/* Cycling role — auto-animates every 2.6s */}
        <motion.div variants={ITEM} className="flex items-center justify-center gap-4 mt-2 mb-5">
          {/* Left rule */}
          <span className="hidden sm:block w-12 h-px bg-gradient-to-r from-transparent to-gold-700/50" />

          {/* Fixed-height window so layout never shifts */}
          <div className="relative flex items-center justify-center h-10 md:h-12 overflow-hidden min-w-[260px] md:min-w-[320px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={ROLES[roleIndex]}
                initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                exit={{    opacity: 0, y: -22, filter: 'blur(6px)' }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="absolute font-serif text-2xl md:text-3xl text-gold-300 font-semibold tracking-wide select-none"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Right rule */}
          <span className="hidden sm:block w-12 h-px bg-gradient-to-l from-transparent to-gold-700/50" />
        </motion.div>

        {/* Tagline */}
        <motion.p variants={ITEM} className="font-sans text-navy-300 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          Full-stack developer specializing in web and mobile systems, with experience leading
          development and delivering production-ready solutions.
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div variants={ITEM} className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <MagneticButton href="#projects" variant="filled">
            View Projects
          </MagneticButton>
          <MagneticButton href="/resume.pdf" variant="outlined" target="_blank" rel="noopener noreferrer">
            Download Résumé
          </MagneticButton>
        </motion.div>

        {/* ⌘K hint */}
        <motion.div variants={ITEM} className="mt-10 flex items-center justify-center">
          <button
            onClick={() => query.toggle()}
            className="flex items-center gap-2 text-navy-500 hover:text-gold-600 text-xs font-sans transition-colors duration-200 group"
            aria-label="Open command palette"
          >
            <span className="flex items-center gap-1 border border-navy-700 group-hover:border-gold-700/50 px-2 py-1 transition-colors duration-200">
              <span className="font-mono text-[11px]">{isMac ? '⌘' : 'Ctrl'}</span>
              <span className="font-mono text-[11px]">K</span>
            </span>
            <span className="tracking-wider">Command Palette</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        variants={SCROLL_FADE}
        initial="hidden"
        animate="show"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 pointer-events-none"
      >
        <span className="text-gold-700 text-[10px] font-sans tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-gold-600/70 to-transparent" />
      </motion.div>
    </section>
  )
}
