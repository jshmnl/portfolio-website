'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { projects } from '@/lib/data/projects'

export default function ProjectsGrid() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={ref} className="relative py-32 bg-navy-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className={`mb-8 reveal ${visible ? 'visible' : ''}`}>
          <p className="text-gold-600 text-[10px] font-sans tracking-[0.35em] uppercase mb-3">03 / Projects</p>
          <h2 className="font-serif text-4xl md:text-5xl text-gold-300 font-semibold">Case Studies</h2>
          <div className="gold-rule" />
        </div>
        <p
          className={`text-navy-300 font-sans text-base max-w-2xl mb-16 reveal ${visible ? 'visible' : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          Production systems built for real institutional use — from government treasury offices to academic legal research.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`group relative bg-navy-950 border border-navy-700 hover:border-gold-700/40 transition-all duration-500 hover:shadow-gold overflow-hidden flex flex-col reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12 + 0.2}s` }}
            >
              {/* Gold top stripe */}
              <div className="h-[3px] bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700 flex-shrink-0" />

              {/* Screenshot preview */}
              <div className="relative w-full h-48 bg-navy-800 overflow-hidden flex-shrink-0">
                <Image
                  src={project.heroScreenshot}
                  alt={`${project.title} screenshot`}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                {/* Context badge overlaid on screenshot */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-sans text-gold-400 bg-navy-950/80 border border-gold-700/40 px-2 py-0.5 tracking-[0.2em] uppercase backdrop-blur-sm">
                    {project.context}
                  </span>
                </div>
              </div>

              <div className="p-7 flex flex-col flex-1">
                {/* Title */}
                <h3 className="font-serif text-xl text-gold-300 font-semibold mb-2 leading-snug group-hover:text-gold-200 transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Role */}
                <p className="text-navy-300 font-sans text-sm mb-5">{project.role}</p>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-sans text-gold-600 border border-gold-700/35 px-2 py-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 5 && (
                    <span className="text-[11px] font-sans text-navy-400 border border-navy-700 px-2 py-0.5">
                      +{project.stack.length - 5}
                    </span>
                  )}
                </div>

                {/* CTA indicator */}
                <div className="mt-auto flex items-center gap-2 text-sm font-sans font-medium text-gold-500 group-hover:text-gold-300 transition-colors duration-200">
                  View Case Study
                  <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </div>

              {/* Bottom-right decorative */}
              <div className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-gold-600/5 translate-x-6 translate-y-6 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
