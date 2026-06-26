import { CALENDLY_URL } from '../constants'

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a26] bg-[#0d0d14]">
      {/* CTA block */}
      <div className="relative py-32 px-6 overflow-hidden">
        {/* Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px] pointer-events-none"
          style={{ background: 'rgba(99, 102, 241, 0.06)' }}
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2
            className="font-semibold text-[#e8e8f0] tracking-tight mb-4"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1 }}
          >
            Your data is already there. Let's make it work.
          </h2>
          <p className="text-[#8888a8] mb-10 leading-relaxed max-w-sm mx-auto text-[15px]">
            Book a 30-minute discovery call. No pitch deck. Just a direct conversation about your
            business and whether I can help.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#6366f1] hover:bg-[#5254cc] text-white px-8 py-4 rounded-lg font-medium transition-colors duration-150"
          >
            Book a discovery call
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-[#1a1a26] py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="font-medium text-[#5a5a78]">Rising Tide AI LLC</span>
          <div className="flex items-center gap-5 text-[#3a3a58]">
            <span>risingtideai.ai</span>
            <a
              href="mailto:mike@risingtideai.ai"
              className="hover:text-[#a0a0b8] transition-colors duration-150"
            >
              mike@risingtideai.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
