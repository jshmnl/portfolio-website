'use client'

import { useEffect, useRef, useState } from 'react'
import { certifications } from '@/lib/data/certifications'

// ── Category icons ──────────────────────────────────────────────
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  programming: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <polyline points="16,18 22,12 16,6" />
      <polyline points="8,6 2,12 8,18" />
    </svg>
  ),
  design: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
    </svg>
  ),
  computing: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
}

export default function Certifications() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="certifications" ref={ref} className="relative py-24 bg-navy-950 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-gold-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className={`mb-20 reveal ${visible ? 'visible' : ''}`}>
          <p className="text-gold-600 text-[10px] font-sans tracking-[0.35em] uppercase mb-3">04 / Certifications</p>
          <h2 className="font-serif text-4xl md:text-5xl text-gold-300 font-semibold">Credentials</h2>
          <div className="gold-rule" />
        </div>

        {/* Cert cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <div
              key={cert.id}
              className={`group relative bg-navy-900 border border-navy-700 hover:border-gold-700/40 overflow-hidden transition-all duration-500 hover:shadow-gold-xs reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1 + 0.1}s` }}
            >
              {/* Top stripe */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-600/40 to-transparent" />

              <div className="p-6">
                {/* Icon + issuer row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 border border-gold-700/40 bg-gold-500/5 flex items-center justify-center text-gold-500 group-hover:text-gold-400 group-hover:border-gold-600/60 transition-colors duration-300">
                    {CATEGORY_ICONS[cert.category]}
                  </div>
                  <span className="text-[10px] font-sans text-gold-600 border border-gold-700/30 px-2 py-0.5 tracking-wide">
                    {cert.issuerShort}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-base text-gold-300 font-semibold leading-snug mb-2">
                  {cert.title}
                </h3>

                {/* Date */}
                <p className="text-[11px] font-sans text-navy-400 mb-4">{cert.date}</p>

                {/* Description */}
                <p className="text-navy-300 font-sans text-[13px] leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
