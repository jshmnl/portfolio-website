'use client'

import { useEffect, useRef } from 'react'

const GRID    = 44        // spacing between dots
const RADIUS  = 220       // mouse influence radius (px)
const BASE_A  = 0.07      // base dot opacity
const PEAK_A  = 0.55      // dot opacity at cursor centre
const BASE_R  = 1.0       // base dot radius
const PEAK_R  = 2.8       // dot radius at cursor centre

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef  = useRef({ x: -9999, y: -9999 })
  const rafRef    = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const { x: mx, y: my } = mouseRef.current

      for (let cx = GRID; cx < canvas.width; cx += GRID) {
        for (let cy = GRID; cy < canvas.height; cy += GRID) {
          const dist  = Math.hypot(cx - mx, cy - my)
          const t     = Math.max(0, 1 - dist / RADIUS)
          const alpha = BASE_A + t * (PEAK_A - BASE_A)
          const r     = BASE_R + t * (PEAK_R - BASE_R)

          ctx.beginPath()
          ctx.arc(cx, cy, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(212,175,55,${alpha.toFixed(3)})`
          ctx.fill()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
