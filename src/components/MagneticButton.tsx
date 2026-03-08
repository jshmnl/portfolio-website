'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  href: string
  variant: 'filled' | 'outlined'
  children: React.ReactNode
  target?: string
  rel?: string
}

export default function MagneticButton({ href, variant, children, target, rel }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x    = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.6 })
  const y    = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.6 })

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    rawX.set((e.clientX - (r.left + r.width  / 2)) * 0.28)
    rawY.set((e.clientY - (r.top  + r.height / 2)) * 0.28)
  }

  const onLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const base =
    'relative inline-flex items-center justify-center px-9 py-3.5 font-sans font-semibold text-xs tracking-[0.18em] uppercase select-none overflow-hidden'

  const styles =
    variant === 'filled'
      ? `${base} bg-gold-500 text-navy-950 hover:bg-gold-400`
      : `${base} border border-gold-600 text-gold-400 hover:bg-gold-500/8 hover:border-gold-400`

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={styles}
    >
      {children}
    </motion.a>
  )
}
