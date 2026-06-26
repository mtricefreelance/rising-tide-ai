import { useEffect, useRef } from 'react'
import { CALENDLY_URL } from '../constants'

export default function Hero() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const waterlineRef = useRef(null)
  const waterlineTextRef = useRef(null)
  const scrollCueRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    const waterlineEl = waterlineRef.current
    const waterlineText = waterlineTextRef.current
    const scrollCue = scrollCueRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const SEA = {
      hue: 195,
      chroma: 1,
      density: 0.72,
      motion: !reduceMotion,
      waveHeight: 1.0,
      tideRange: 0.35,
    }

    let W = 0, H = 0, dpr = 1
    let cols = 0, rows = 0
    const CELL = 22
    let grid = []
    let scrollP = 0
    let animId = null

    function teal(l, c, a) {
      return `oklch(${l} ${(c * SEA.chroma).toFixed(3)} ${SEA.hue} / ${a})`
    }

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = section.offsetWidth
      H = section.offsetHeight
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      cols = Math.ceil(W / CELL) + 1
      rows = Math.ceil(H / CELL) + 1
      grid = new Array(cols * rows)
      for (let i = 0; i < grid.length; i++) {
        grid[i] = {
          ch: Math.random() < 0.5 ? '0' : '1',
          phase: Math.random() * Math.PI * 2,
          on: Math.random() < 0.94,
          flip: 0.002 + Math.random() * 0.01,
        }
      }
    }

    function surfaceY(x, t, waterLevel) {
      const a1 = 11 * SEA.waveHeight, a2 = 6 * SEA.waveHeight, a3 = 3 * SEA.waveHeight
      return waterLevel
        - a1 * Math.sin(x * 0.0042 + t * 0.45)
        - a2 * Math.sin(x * 0.011  - t * 0.7)
        - a3 * Math.sin(x * 0.024  + t * 1.1)
    }

    function drawBoat(t, waterLevel) {
      const bx = W * 0.72
      const y = surfaceY(bx, t, waterLevel)
      const dy = surfaceY(bx + 8, t, waterLevel) - surfaceY(bx - 8, t, waterLevel)
      const ang = Math.atan2(dy, 16) * 0.85
      const s = Math.max(0.82, Math.min(1.25, W / 1400))

      ctx.save()
      ctx.translate(bx, y)
      ctx.rotate(ang)
      ctx.scale(s, s)

      ctx.strokeStyle = 'rgba(243,246,255,0.85)'
      ctx.lineWidth = 1.4
      ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(0, -40); ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, -39); ctx.lineTo(0, -7); ctx.lineTo(20, -11)
      ctx.closePath()
      ctx.fillStyle = teal(0.82, 0.12, 0.92)
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(0, -36); ctx.lineTo(0, -9); ctx.lineTo(-14, -12)
      ctx.closePath()
      ctx.fillStyle = 'oklch(0.72 0.125 278 / 0.78)'
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(-22, -4)
      ctx.lineTo(22, -4)
      ctx.lineTo(13, 7)
      ctx.lineTo(-15, 7)
      ctx.closePath()
      ctx.fillStyle = 'rgba(243,246,255,0.94)'
      ctx.fill()

      ctx.restore()

      ctx.save()
      const g = ctx.createRadialGradient(bx, y - 18, 2, bx, y - 18, 70)
      g.addColorStop(0, teal(0.8, 0.12, 0.16))
      g.addColorStop(1, teal(0.8, 0.12, 0))
      ctx.fillStyle = g
      ctx.fillRect(bx - 80, y - 90, 160, 130)
      ctx.restore()
    }

    let t = 0, last = performance.now()

    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000); last = now
      if (SEA.motion) t += dt

      const waterLevel = H * (0.82 - SEA.tideRange * scrollP)

      ctx.clearRect(0, 0, W, H)
      ctx.font = '13px "Space Mono", monospace'

      for (let cx = 0; cx < cols; cx++) {
        const px = cx * CELL + CELL / 2
        const colWave = SEA.motion ? 4 * Math.sin(px * 0.01 + t * 0.6) : 0
        for (let cy = 0; cy < rows; cy++) {
          const idx = cx * rows + cy
          const cell = grid[idx]
          if (!cell.on) continue

          const py = cy * CELL + CELL / 2 + colWave
          if (SEA.motion && Math.random() < cell.flip) cell.ch = cell.ch === '0' ? '1' : '0'

          const submerged = py > surfaceY(px, t, waterLevel)
          const flick = SEA.motion ? 0.5 + 0.5 * Math.sin(t * 1.6 + cell.phase) : 0.6

          if (submerged) {
            const depth = Math.min(1, (py - waterLevel) / (H * 0.4))
            const a = (0.34 + 0.42 * flick) * (1 - depth * 0.45)
            ctx.fillStyle = teal(0.78, 0.115, a)
          } else {
            const a = 0.07 + 0.12 * flick
            ctx.fillStyle = `oklch(0.74 0.05 250 / ${a})`
          }
          ctx.fillText(cell.ch, px, py)
        }
      }

      ctx.beginPath()
      ctx.moveTo(0, H)
      ctx.lineTo(0, surfaceY(0, t, waterLevel))
      const step = 14
      for (let x = 0; x <= W; x += step) ctx.lineTo(x, surfaceY(x, t, waterLevel))
      ctx.lineTo(W, H)
      ctx.closePath()
      const wg = ctx.createLinearGradient(0, waterLevel - 30, 0, H)
      wg.addColorStop(0, teal(0.62, 0.11, 0.05))
      wg.addColorStop(0.5, teal(0.5, 0.10, 0.10))
      wg.addColorStop(1, 'oklch(0.30 0.06 250 / 0.34)')
      ctx.fillStyle = wg
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(0, surfaceY(0, t, waterLevel))
      for (let x = 0; x <= W; x += step) ctx.lineTo(x, surfaceY(x, t, waterLevel))
      ctx.strokeStyle = teal(0.86, 0.12, 0.55)
      ctx.lineWidth = 1.4
      ctx.shadowColor = teal(0.85, 0.12, 0.6)
      ctx.shadowBlur = 14
      ctx.stroke()
      ctx.shadowBlur = 0

      drawBoat(t, waterLevel)

      animId = requestAnimationFrame(frame)
    }

    function easeInOut(x) { return x < 0.5 ? 4*x*x*x : 1 - Math.pow(-2*x+2,3)/2 }

    function onScroll() {
      const rect = section.getBoundingClientRect()
      // progress: 0 when section top is at viewport top, 1 when section bottom is at viewport top
      const sectionH = section.offsetHeight
      const raw = Math.min(1, Math.max(0, -rect.top / (sectionH * 0.6)))
      scrollP = easeInOut(raw)

      const wl = H * (0.90 - SEA.tideRange * scrollP)
      if (waterlineEl) { waterlineEl.style.top = (wl - 44) + 'px'; waterlineEl.style.right = 'clamp(22px, 4.4vw, 64px)'; }

      const rowCount = (3.2 + raw * 41.5).toFixed(1)
      if (waterlineText) waterlineText.textContent = `TIDE +${rowCount}M ROWS · LIVE`

      if (scrollCue) scrollCue.style.opacity = raw > 0.04 ? 0 : 1
    }

    function onResize() { build(); onScroll() }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    build()
    onScroll()
    animId = requestAnimationFrame(frame)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  const mono = '"Space Mono", monospace'
  const ink = '#f3f6ff'
  const muted = 'rgba(221,230,248,0.60)'
  const faint = 'rgba(221,230,248,0.34)'
  const accent = 'oklch(0.78 0.169 258)'
  const tealColor = 'oklch(0.80 0.115 195)'

  const btnPrimary = {
    fontFamily: mono,
    fontSize: 14,
    letterSpacing: '0.04em',
    border: '1px solid rgba(45,212,191,0.45)',
    color: ink,
    background: 'linear-gradient(180deg, color-mix(in oklch, oklch(0.80 0.115 195) 22%, transparent), rgba(45,212,191,0.04))',
    padding: '13px 22px',
    borderRadius: 7,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 9,
    whiteSpace: 'nowrap',
  }

  const dot = {
    width: 6, height: 6, borderRadius: '50%',
    background: tealColor,
    boxShadow: `0 0 10px ${tealColor}`,
    display: 'inline-block',
    flexShrink: 0,
  }

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
        background: `
          radial-gradient(120% 90% at 78% 8%, rgba(99,102,241,0.10), transparent 55%),
          radial-gradient(140% 100% at 20% 100%, rgba(45,212,191,0.085), transparent 60%),
          linear-gradient(180deg, #05070f 0%, #03040a 100%)
        `,
        fontFamily: '"Space Grotesk", system-ui, sans-serif',
        color: ink,
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, display: 'block' }}
      />

      {/* vignette */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(110% 75% at 28% 34%, rgba(3,4,10,0.78), transparent 58%),
            linear-gradient(180deg, rgba(3,4,10,0.55) 0%, transparent 26%)
          `,
        }}
      />

      {/* hero content */}
      <div
        style={{
          position: 'absolute',
          zIndex: 20,
          top: 'clamp(90px, 14vh, 140px)',
          left: 'clamp(22px, 4.4vw, 64px)',
          right: 'clamp(22px, 4.4vw, 64px)',
          maxWidth: 940,
        }}
      >
        {/* eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          fontFamily: mono, fontSize: 16, letterSpacing: '0.26em',
          textTransform: 'uppercase', color: accent, marginBottom: 30,
        }}>
          <span style={{ width: 26, height: 1, background: `linear-gradient(90deg, ${accent}, transparent)`, display: 'inline-block' }} />
          Autonomous financial intelligence
        </div>

        <h1 style={{
          fontWeight: 500,
          fontSize: 'clamp(28px, 4vw, 58px)',
          lineHeight: 1.04,
          letterSpacing: '-0.022em',
          maxWidth: '16ch',
          margin: 0,
        }}>
          <span style={{ color: 'rgba(221,230,248,0.75)', fontWeight: 500 }}>Your business runs on&nbsp;data.</span>
          <span style={{ color: ink, fontWeight: 600, display: 'block', marginTop: '0.12em' }}>
            It shouldn't take a team to{' '}
            <em style={{ fontStyle: 'normal', color: accent }}>act</em>
            {' '}on&nbsp;it.
          </span>
        </h1>

        <p style={{
          marginTop: 30, maxWidth: '50ch',
          fontSize: 'clamp(15.5px, 1.35vw, 19px)', lineHeight: 1.6,
          color: muted, fontWeight: 400,
        }}>
          Rising Tide builds AI systems that read your financial data the moment it lands —
          surfacing the decision, not the dashboard. Built for finance leaders who need the
          signal without staffing for it.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 40, flexWrap: 'wrap' }}>
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" style={btnPrimary}>
            <span style={dot} />
            Book a discovery call
          </a>
          <button
            style={{
              fontFamily: mono, fontSize: 14, letterSpacing: '0.04em',
              border: 'none', background: 'none', padding: '11px 4px',
              color: ink, cursor: 'pointer',
            }}
          >
            See the approach <span style={{ color: tealColor }}>→</span>
          </button>
        </div>

      </div>


      {/* waterline readout */}
      <div
        ref={waterlineRef}
        style={{
          position: 'absolute',
          zIndex: 25,
          right: 'clamp(22px, 4.4vw, 64px)',
          display: 'flex',
          alignItems: 'center',
          gap: 11,
          fontFamily: mono,
          fontSize: 11.5,
          letterSpacing: '0.08em',
          color: accent,
          textTransform: 'uppercase',
          pointerEvents: 'none',
          textShadow: '0 0 18px rgba(5,7,15,0.9)',
        }}
      >
        <span style={{
          width: 7, height: 7, borderRadius: '50%',
          background: accent, boxShadow: `0 0 12px ${accent}`,
          display: 'inline-block',
          animation: 'hero-blip 2.4s ease-in-out infinite',
        }} />
        <span ref={waterlineTextRef}>TIDE +0.0M ROWS · LIVE</span>
      </div>

      {/* scroll cue */}
      <div
        ref={scrollCueRef}
        style={{
          position: 'absolute',
          zIndex: 25,
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 9,
          fontFamily: mono,
          fontSize: 10.5,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: faint,
          transition: 'opacity .4s ease',
        }}
      >
        <span>Scroll · the tide rises</span>
        <span className="hero-scroll-rail" style={{ width: 1, height: 34, background: `linear-gradient(180deg, ${faint}, transparent)`, position: 'relative', overflow: 'hidden' }} />
      </div>

      <style>{`
        @keyframes hero-blip {
          0%, 100% { opacity: 0.35; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes hero-drop {
          0% { transform: translateY(0); }
          100% { transform: translateY(46px); }
        }
        .hero-scroll-rail::after {
          content: "";
          position: absolute;
          top: -12px;
          left: 0;
          width: 1px;
          height: 12px;
          background: oklch(0.80 0.115 195);
          animation: hero-drop 2.2s cubic-bezier(.7,0,.3,1) infinite;
        }
      `}</style>
    </section>
  )
}
