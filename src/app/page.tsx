import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import ProjectsGrid from '@/components/ProjectsGrid'
import Certifications from '@/components/Certifications'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main>
        {/* ── Hero ── */}
        <Hero />

        {/* ── About ── */}
        <About />

        {/* ── Skills ── */}
        <Skills />

        {/* ── Projects ── */}
        <ProjectsGrid />

        {/* ── Certifications ── */}
        <Certifications />

        {/* ── Contact ── */}
        <section id="contact" className="py-24 bg-navy-900 border-t border-navy-800">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-gold-600 text-[10px] font-sans tracking-[0.35em] uppercase mb-4">
                05 / Contact
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-gold-300 font-semibold mb-4">
                Get In Touch
              </h2>
              <div className="gold-rule mx-auto mb-8" />
              <p className="text-navy-200 font-sans text-base md:text-lg leading-relaxed">
                Open to opportunities in full-stack development, mobile engineering, and systems
                integration. Whether it&apos;s a technical discussion or a project proposal —
                let&apos;s connect.
              </p>
            </div>

            {/* Contact form */}
            <div className="bg-navy-950 border border-navy-700 p-8 mb-8">
              <ContactForm />
            </div>

            {/* Alternative links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:joshuamanuel@example.com"
                className="inline-flex items-center gap-3 px-8 py-3 border border-gold-600 text-gold-400 font-sans font-semibold text-xs tracking-[0.2em] uppercase hover:bg-gold-500/8 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Directly
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3 border border-gold-600 text-gold-400 font-sans font-semibold text-xs tracking-[0.2em] uppercase hover:bg-gold-500/8 transition-all duration-200"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
