'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// ── Count-up hook ──────────────────────────────────────────────
function useCountUp(target: number, enabled: boolean, duration = 1000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!enabled) return
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, enabled, duration])
  return count
}

// ── Stat counter sub-component ─────────────────────────────────
function StatCounter({
  numericValue,
  suffix,
  label,
  enabled,
}: {
  numericValue: number
  suffix: string
  label: string
  enabled: boolean
}) {
  const count = useCountUp(numericValue, enabled)
  return (
    <div className="border-t border-gold-700/30 pt-4">
      <p className="font-serif text-3xl font-bold text-gold-400">
        {count}{suffix}
      </p>
      <p className="text-navy-300 text-xs font-sans mt-1 leading-tight">{label}</p>
    </div>
  )
}

const STATS = [
  { numericValue: 2,  suffix: '',  label: 'Production Projects' },
  { numericValue: 3,  suffix: '',  label: 'Certifications'      },
  { numericValue: 30, suffix: '+', label: 'Technologies'        },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.18 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="relative py-32 bg-navy-900 overflow-hidden">
      <div className="absolute -top-32 right-0 w-80 h-80 bg-gold-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-0 w-96 h-96 bg-gold-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className={`mb-20 reveal ${visible ? 'visible' : ''}`}>
          <p className="text-gold-600 text-[10px] font-sans tracking-[0.35em] uppercase mb-3">01 / About</p>
          <h2 className="font-serif text-4xl md:text-5xl text-gold-300 font-semibold">The Background</h2>
          <div className="gold-rule" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Photo */}
          <div className={`reveal delay-200 ${visible ? 'visible' : ''}`}>
            <div className="relative mx-auto lg:mx-0 w-80 h-80 md:w-96 md:h-96">
              <div className="absolute -bottom-3 -right-3 w-full h-full bg-gold-500/6 border border-gold-700/25" />
              <div className="absolute -top-3 -left-3 w-full h-full border border-gold-700/25" />
              <div className="relative w-full h-full bg-navy-800 border border-navy-600 overflow-hidden">
                <div className="absolute top-2 left-2  w-5 h-5 border-l-2 border-t-2 border-gold-500 z-10" />
                <div className="absolute top-2 right-2 w-5 h-5 border-r-2 border-t-2 border-gold-500 z-10" />
                <div className="absolute bottom-2 left-2  w-5 h-5 border-l-2 border-b-2 border-gold-500 z-10" />
                <div className="absolute bottom-2 right-2 w-5 h-5 border-r-2 border-b-2 border-gold-500 z-10" />
                <Image
                  src="/profile.jpg"
                  alt="Joshua Manuel"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 320px, 384px"
                  priority
                />
              </div>
            </div>
            <div className="mt-8 text-center lg:text-left">
              <p className="font-serif text-gold-400 text-2xl font-semibold">Joshua Manuel</p>
              <p className="text-navy-300 font-sans text-sm mt-1">Full-Stack Developer · Pasay City, Philippines</p>
              <div className="mt-4 inline-flex items-center gap-2 border border-gold-700/40 bg-gold-500/5 px-3 py-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                <span className="text-gold-600 font-sans text-xs tracking-wide">Available for opportunities</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className={`reveal delay-300 ${visible ? 'visible' : ''}`}>
            <p className="font-serif text-xl md:text-2xl text-gold-200 mb-6 leading-relaxed">
              Building reliable applications that solve practical business problems.
            </p>

            <div className="space-y-4 text-navy-200 font-sans leading-relaxed text-[15px]">
              <p>
                I am a full-stack engineer dedicated to creating scalable web and mobile solutions
                that bridge the gap between complex data and user-centric design. With a professional
                foundation in database administration, I specialize in architecting production-ready
                applications that solve real-world organizational challenges through stable and
                efficient code.
              </p>
              <p>
                At the{' '}
                <span className="text-gold-400 font-medium">
                  Bureau of Treasury – Domestic Debt Management
                </span>{' '}
                (OJT), I designed and built a government-grade procurement monitoring system —
                architecting the PostgreSQL schema, implementing role-based access control, and
                delivering a compliance-grade audit trail.
              </p>
              <p>
                My thesis produced a{' '}
                <span className="text-gold-400 font-medium">
                  Philippine labor law case research platform
                </span>{' '}
                — a custom rule-based machine learning engine with 14 weighted legal signals and a
                normalized confidence scoring system that makes professional-grade case assessment
                accessible to anyone.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {STATS.map(({ numericValue, suffix, label }) => (
                <StatCounter
                  key={label}
                  numericValue={numericValue}
                  suffix={suffix}
                  label={label}
                  enabled={visible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
