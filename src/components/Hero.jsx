import { CALENDLY_URL } from '../constants'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#0a0a0f]">
      {/* Radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: 'rgba(99, 102, 241, 0.07)' }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 100%)',
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Tag pill */}
        <div className="inline-flex items-center gap-2 border border-[#1e1e2e] rounded-full px-4 py-1.5 mb-10 bg-[#13131c]">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#6366f1] flex-shrink-0"
            style={{ boxShadow: '0 0 6px rgba(99, 102, 241, 0.9)' }}
          />
          <span className="text-xs font-medium text-[#a0a0b8] tracking-wide">
            Financial intelligence &amp; AI systems
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-semibold text-[#e8e8f0] mb-6"
          style={{
            fontSize: 'clamp(40px, 6vw, 68px)',
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
          }}
        >
          Your business runs on data.
          <span className="block" style={{ color: '#7878a0' }}>
            It shouldn't take a team
          </span>
          <span className="block text-[#e8e8f0]">to act on it.</span>
        </h1>

        {/* Subhead */}
        <p className="text-lg text-[#8888a8] max-w-2xl mx-auto mb-10 leading-relaxed">
          I build custom financial intelligence systems and AI-powered workflows — deployed directly
          into your environment, owned by you, built around how your business actually works.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="w-full sm:w-auto border border-[#252535] bg-[#13131c] hover:bg-[#1a1a26] text-[#e8e8f0] px-6 py-3 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer">
            Watch the demo
          </button>
          <a
            href={CALENDLY_URL}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#6366f1] hover:bg-[#5254cc] text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-150"
          >
            Book a discovery call
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
