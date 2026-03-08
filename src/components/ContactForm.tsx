'use client'

import { useState, useTransition } from 'react'
import { submitContact } from '@/app/actions'

const INPUT_CLASS =
  'w-full bg-navy-950 border border-navy-700 focus:border-gold-600/60 focus:outline-none px-4 py-3 text-navy-100 font-sans text-sm placeholder:text-navy-600 transition-colors duration-200'

export default function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [result, setResult] = useState<{ success: boolean; error?: string } | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    startTransition(async () => {
      const res = await submitContact(data)
      setResult(res)
      if (res.success) {
        (e.target as HTMLFormElement).reset()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gold-700 font-sans text-[10px] tracking-[0.2em] uppercase mb-1.5">
            Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            required
            className={INPUT_CLASS}
          />
        </div>
        <div>
          <label className="block text-gold-700 font-sans text-[10px] tracking-[0.2em] uppercase mb-1.5">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            className={INPUT_CLASS}
          />
        </div>
      </div>

      <div>
        <label className="block text-gold-700 font-sans text-[10px] tracking-[0.2em] uppercase mb-1.5">
          Subject
        </label>
        <input
          name="subject"
          type="text"
          placeholder="What's this about?"
          required
          className={INPUT_CLASS}
        />
      </div>

      <div>
        <label className="block text-gold-700 font-sans text-[10px] tracking-[0.2em] uppercase mb-1.5">
          Message
        </label>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell me about your project or opportunity..."
          required
          className={`${INPUT_CLASS} resize-none`}
        />
      </div>

      {/* Feedback */}
      {result && (
        <div
          className={`px-4 py-3 font-sans text-sm border ${
            result.success
              ? 'border-gold-700/40 bg-gold-500/5 text-gold-400'
              : 'border-red-800/40 bg-red-900/10 text-red-400'
          }`}
        >
          {result.success
            ? 'Message sent — I\'ll get back to you soon.'
            : result.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center gap-3 px-10 py-4 bg-gold-500 text-navy-950 font-sans font-semibold text-xs tracking-[0.2em] uppercase hover:bg-gold-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isPending ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Message
          </>
        )}
      </button>
    </form>
  )
}
