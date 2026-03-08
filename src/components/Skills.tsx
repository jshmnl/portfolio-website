'use client'

import { useEffect, useRef, useState } from 'react'

// ── Devicon-style SVG paths (inline, no external CDN) ──────────
const CATEGORIES = [
  {
    label: 'Web & Backend',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v4c0 1.657 4.03 3 9 3s9-1.343 9-3V5" />
        <path d="M3 9v4c0 1.657 4.03 3 9 3s9-1.343 9-3V9" />
        <path d="M3 13v4c0 1.657 4.03 3 9 3s9-1.343 9-3V13" />
      </svg>
    ),
    skills: [
      { name: 'Laravel', level: 'Expert' },
      { name: 'PHP 8.2', level: 'Expert' },
      { name: 'PostgreSQL', level: 'Expert' },
      { name: 'Eloquent ORM', level: 'Expert' },
      { name: 'Prisma ORM', level: 'Proficient' },
      { name: 'MySQL', level: 'Proficient' },
      { name: 'REST APIs', level: 'Expert' },
    ],
  },
  {
    label: 'Frontend',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <polyline points="16,18 22,12 16,6" />
        <polyline points="8,6 2,12 8,18" />
      </svg>
    ),
    skills: [
      { name: 'Next.js 15', level: 'Expert' },
      { name: 'React', level: 'Expert' },
      { name: 'TypeScript', level: 'Proficient' },
      { name: 'Tailwind CSS', level: 'Expert' },
      { name: 'Alpine.js', level: 'Proficient' },
      { name: 'Blade / Vite', level: 'Expert' },
      { name: 'Chart.js', level: 'Proficient' },
    ],
  },
  {
    label: 'Mobile',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth={2} strokeLinecap="round" />
      </svg>
    ),
    skills: [
      { name: 'React Native', level: 'Proficient' },
      { name: 'Expo', level: 'Proficient' },
      { name: 'iOS & Android', level: 'Proficient' },
      { name: 'Mobile UI/UX', level: 'Proficient' },
      { name: 'Push Notifications', level: 'Familiar' },
      { name: 'Deep Linking', level: 'Familiar' },
    ],
  },
  {
    label: 'DevOps & Tools',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <polyline points="9,10 12,7 15,10" />
        <line x1="12" y1="7" x2="12" y2="13" />
        <polyline points="8,21 12,17 16,21" />
      </svg>
    ),
    skills: [
      { name: 'Git & GitHub', level: 'Expert' },
      { name: 'Docker', level: 'Proficient' },
      { name: 'Laravel Sail', level: 'Expert' },
      { name: 'Vite', level: 'Expert' },
      { name: 'Bash / Shell', level: 'Proficient' },
      { name: 'Postman', level: 'Expert' },
    ],
  },
  {
    label: 'AI & Integration',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="3" />
        <circle cx="4"  cy="6"  r="2" />
        <circle cx="20" cy="6"  r="2" />
        <circle cx="4"  cy="18" r="2" />
        <circle cx="20" cy="18" r="2" />
        <line x1="6"  y1="7"  x2="10" y2="11" />
        <line x1="18" y1="7"  x2="14" y2="11" />
        <line x1="6"  y1="17" x2="10" y2="13" />
        <line x1="18" y1="17" x2="14" y2="13" />
      </svg>
    ),
    skills: [
      { name: 'Z.AI API', level: 'Proficient' },
      { name: 'PDF Processing', level: 'Proficient' },
      { name: 'DOMPDF', level: 'Proficient' },
      { name: 'JWT Auth', level: 'Expert' },
      { name: 'Rule-based ML', level: 'Proficient' },
    ],
  },
  {
    label: 'Design & Tooling',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
      </svg>
    ),
    skills: [
      { name: 'Figma', level: 'Proficient' },
      { name: 'Adobe Photoshop', level: 'Proficient' },
      { name: 'Illustrator', level: 'Proficient' },
      { name: 'VS Code', level: 'Expert' },
      { name: 'Responsive Design', level: 'Expert' },
      { name: 'UI/UX Principles', level: 'Proficient' },
    ],
  },
]

const LEVEL_COLOR: Record<string, string> = {
  Expert:    'text-gold-400 border-gold-600/60 bg-gold-500/10 font-medium',
  Proficient:'text-gold-700 border-gold-800/40',
  Familiar:  'text-navy-500 border-navy-700/50',
}

export default function Skills() {
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
    <section id="skills" ref={ref} className="relative py-32 bg-navy-950 overflow-hidden">
      <div className="absolute inset-0 circuit-bg opacity-60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className={`mb-20 text-center reveal ${visible ? 'visible' : ''}`}>
          <p className="text-gold-600 text-[10px] font-sans tracking-[0.35em] uppercase mb-3">02 / Skills</p>
          <h2 className="font-serif text-4xl md:text-5xl text-gold-300 font-semibold">Tech Stack</h2>
          <div className="gold-rule mx-auto" />
          <p className="mt-5 text-navy-300 font-sans text-sm max-w-lg mx-auto">
            Skill levels are self-assessed:{' '}
            <span className="text-gold-400 bg-gold-500/10 border border-gold-600/60 px-1.5 py-0.5 text-[11px]">Expert</span>{' '}
            = shipped to production,{' '}
            <span className="text-gold-700">Proficient</span> = built projects with,{' '}
            <span className="text-navy-500">Familiar</span> = actively learning.
          </p>
        </div>

        {/* Grid — 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.label}
              className={`group relative bg-navy-900 border border-navy-700 hover:border-gold-700/50 p-6 transition-all duration-500 hover:shadow-gold-xs reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.07 + 0.1}s` }}
            >
              {/* Gold top accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-600/50 to-transparent" />

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="text-gold-500 group-hover:text-gold-400 transition-colors duration-300 flex-shrink-0">
                  {cat.icon}
                </div>
                <h3 className="font-serif text-sm text-gold-300 font-semibold tracking-wide">{cat.label}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`text-[11px] font-sans border px-2 py-0.5 transition-colors duration-300 ${LEVEL_COLOR[skill.level]}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
