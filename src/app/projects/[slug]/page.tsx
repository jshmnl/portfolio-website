import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { getProjectBySlug, projects } from '@/lib/data/projects'

/* ── Static params ─────────────────────────────────────────── */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

/* ── Metadata ──────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Not Found' }
  return {
    title: `${project.title} | Joshua Manuel`,
    description: project.problem.slice(0, 155),
  }
}

/* ── Page ──────────────────────────────────────────────────── */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-navy-950">

        {/* ── Hero banner ─────────────────────────────────── */}
        <section className="relative pt-36 pb-20 bg-navy-900 border-b border-navy-800 circuit-bg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900 to-navy-900 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            {/* Back */}
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-400 font-sans text-xs tracking-[0.18em] uppercase transition-colors mb-12 group"
            >
              <span className="transform transition-transform duration-150 group-hover:-translate-x-1">←</span>
              Back to Projects
            </Link>
            <p className="text-gold-600 text-[10px] font-sans tracking-[0.35em] uppercase mb-4">{project.context}</p>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-gold-300 font-bold mb-5 max-w-4xl leading-tight">
              {project.title}
            </h1>
            <div className="w-20 h-[3px] bg-gradient-to-r from-gold-700 to-gold-400 mb-6" />
            <p className="text-navy-200 font-sans text-base mb-10">{project.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-sans text-gold-500 border border-gold-700/50 px-3 py-1 bg-navy-800/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Body ────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-[1fr_280px] gap-16">

            {/* ── Content ──────────────────────────────────── */}
            <div className="space-y-20 min-w-0">

              {/* 01 — The Problem */}
              <div>
                <SectionHeading number="01" title="The Problem" />
                <div className="mt-6 pl-5 border-l-2 border-gold-600">
                  <p className="text-navy-200 font-sans text-base md:text-lg leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              </div>

              {/* 02 — The Architecture */}
              <div>
                <SectionHeading number="02" title="The Architecture" />
                <p className="mt-6 text-navy-200 font-sans text-base leading-relaxed mb-8">
                  {project.architectureDescription}
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {project.stack.map((tech) => (
                    <div
                      key={tech}
                      className="bg-navy-900 border border-navy-700 px-4 py-3 flex items-center gap-3"
                    >
                      <div className="w-1.5 h-1.5 bg-gold-500 flex-shrink-0" />
                      <span className="text-navy-100 font-sans text-sm font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 03 — Key Features */}
              <div>
                <SectionHeading number="03" title="Key Features" />
                <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.features.map((feat, i) => (
                    <div
                      key={i}
                      className="bg-navy-900 border border-navy-700 hover:border-gold-700/40 p-5 transition-colors duration-300"
                    >
                      <div className="w-7 h-7 border border-gold-700/40 flex items-center justify-center text-gold-500 text-[11px] font-serif font-bold mb-4">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p className="text-navy-200 font-sans text-sm leading-relaxed">{feat}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 04 — Screenshots */}
              {project.screenshots.length > 0 && (
                <div>
                  <SectionHeading number="04" title="UI Screenshots" />
                  <div className="mt-8 grid sm:grid-cols-2 gap-4">
                    {project.screenshots.map((shot, i) => (
                      <div key={i} className="group bg-navy-900 border border-navy-700 hover:border-gold-700/30 overflow-hidden transition-colors duration-300">
                        <div className="relative w-full aspect-video bg-navy-800 overflow-hidden">
                          <Image
                            src={shot.src}
                            alt={shot.caption}
                            fill
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                        <p className="px-4 py-3 text-navy-400 font-sans text-[12px] leading-snug border-t border-navy-700/60">
                          {shot.caption}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 05 — The Outcome */}
              <div>
                <SectionHeading number={project.screenshots.length > 0 ? '05' : '04'} title="The Outcome" />
                <div className="mt-6 relative bg-navy-900 border border-gold-700/25 p-8 overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-gold-700 via-gold-400 to-gold-700" />
                  <div className="absolute top-3 right-4 text-gold-700/15 font-serif text-8xl font-bold leading-none select-none pointer-events-none">
                    ❝
                  </div>
                  <p className="text-navy-100 font-sans text-base md:text-lg leading-relaxed relative z-10">
                    {project.outcome}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Sidebar ───────────────────────────────────── */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-5">
                <div className="bg-navy-900 border border-navy-700 overflow-hidden">
                  <div className="border-b border-navy-700 px-5 py-4">
                    <h3 className="font-serif text-gold-400 font-semibold text-xs tracking-[0.2em] uppercase">
                      Project Details
                    </h3>
                  </div>
                  <div className="p-5 divide-y divide-navy-800">
                    <SidebarRow label="Developer"  value="Joshua Manuel" />
                    <SidebarRow label="Year"       value={String(project.year)} />
                    <SidebarRow label="Type"       value={project.context} />
                    <SidebarRow label="Role"       value={project.role} />
                  </div>
                </div>
                <Link
                  href="/#projects"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-gold-700/50 text-gold-500 hover:bg-gold-500/8 hover:border-gold-500 font-sans text-xs tracking-[0.18em] uppercase transition-all duration-200"
                >
                  ← All Projects
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

/* ── Sub-components ─────────────────────────────────────────── */
function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-sans text-gold-700/50 text-[10px] tracking-[0.2em]">{number}</span>
      <h2 className="font-serif text-2xl md:text-3xl text-gold-300 font-semibold">{title}</h2>
    </div>
  )
}

function SidebarRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <p className="text-gold-700 font-sans text-[10px] tracking-[0.2em] uppercase mb-1">{label}</p>
      <p className="text-navy-100 font-sans text-sm font-medium leading-snug">{value}</p>
    </div>
  )
}
