import { CALENDLY_URL } from '../constants'

const included = [
  'Plain-English breakdown of where AI can move the needle in your business.',
  'Top 3 opportunities ranked by impact and feasibility.',
  '90-day action plan with specific tools and sequencing.',
  'Honest assessment of what you can execute yourself vs. what needs a builder.',
  'Written roadmap document — yours to keep and act on immediately.',
]

export default function ClaritySession() {
  return (
    <section id="advisory-session" className="py-16 px-6 border-t border-[#1a1a26] bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6366f1] mb-4">
            AI advisory
          </p>
          <h2
            className="font-semibold text-[#e8e8f0] tracking-tight mb-3"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
          >
            The AI clarity session.
          </h2>
          <p className="text-2xl font-semibold text-[#e8e8f0] mb-1">
            $750{' '}
            <span className="text-sm font-normal text-[#5a5a78]">fixed</span>
          </p>
          <p className="text-sm text-[#5a5a78] mb-10">90-minute working session</p>

          <ul className="space-y-4 mb-10">
            {included.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                  style={{
                    background: 'rgba(99, 102, 241, 0.1)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    style={{ color: '#6366f1' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-[#a0a0b8] leading-relaxed text-[15px]">{item}</span>
              </li>
            ))}
          </ul>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#6366f1] hover:bg-[#5254cc] text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors duration-150"
          >
            Book the clarity session
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
