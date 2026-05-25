import { CALENDLY_URL } from '../constants'

export default function TwoLanes() {
  return (
    <section id="advisory" className="py-16 px-6 border-t border-[#1a1a26] bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6366f1] mb-4">
            Services
          </p>
          <h2
            className="font-semibold text-[#e8e8f0] tracking-tight"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
          >
            Find your starting point.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Lane 1 — Featured */}
          <div
            className="relative bg-[#0d0d16] rounded-2xl p-8 overflow-hidden"
            style={{ border: '1px solid rgba(99, 102, 241, 0.25)' }}
          >
            {/* Corner glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"
              style={{ background: 'rgba(99, 102, 241, 0.06)' }}
            />
            <div className="relative">
              <span
                className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6"
                style={{
                  color: '#818cf8',
                  background: 'rgba(99, 102, 241, 0.1)',
                  border: '1px solid rgba(99, 102, 241, 0.2)',
                }}
              >
                Custom build
              </span>
              <h3 className="text-xl font-semibold text-[#e8e8f0] tracking-tight mb-3">
                I need a system built.
              </h3>
              <p className="text-[#8888a8] leading-relaxed mb-8 text-[15px]">
                You're a finance leader or operator who knows exactly what's broken. I'll build the
                automation layer, the live dashboard, and the AI intelligence that makes your data
                work for you — deployed into your environment, never mine.
              </p>
              <a
                href={CALENDLY_URL}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#818cf8] hover:text-[#a5b4fc] transition-colors duration-150"
              >
                Start the conversation <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Lane 2 */}
          <div className="bg-[#0d0d16] border border-[#1e1e2e] rounded-2xl p-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#5a5a78] bg-[#13131c] border border-[#1e1e2e] rounded-full px-3 py-1 mb-6">
              AI advisory
            </span>
            <h3 className="text-xl font-semibold text-[#e8e8f0] tracking-tight mb-3">
              I need to understand where AI fits.
            </h3>
            <p className="text-[#8888a8] leading-relaxed mb-8 text-[15px]">
              You're a founder or operator who knows AI matters but hasn't had anyone map it to your
              actual business. One focused session. A clear roadmap you can act on — with or without
              me.
            </p>
            <a
              href="#advisory-session"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#a0a0b8] hover:text-[#e8e8f0] transition-colors duration-150"
            >
              See what's included <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
