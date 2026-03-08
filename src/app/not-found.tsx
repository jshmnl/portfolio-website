import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-navy-950 circuit-bg flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-serif text-8xl font-bold gold-text mb-6">404</p>
        <h1 className="font-serif text-2xl text-gold-300 mb-3">Page Not Found</h1>
        <p className="text-navy-300 font-sans text-sm mb-10">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 border border-gold-600 text-gold-400 font-sans text-xs tracking-[0.18em] uppercase hover:bg-gold-500/8 transition-all duration-200"
        >
          ← Back to Portfolio
        </Link>
      </div>
    </main>
  )
}
