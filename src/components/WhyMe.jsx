const proofPoints = [
  { value: '$100M+', label: 'ARR tracked monthly' },
  { value: '7', label: 'departments live on automation I deployed' },
  { value: '$120M', label: 'monthly revenue through models I manage' },
  { value: '2 days', label: 'from brief to deployed production AI pipeline' },
]

export default function WhyMe() {
  return (
    <section className="py-16 px-6 border-t border-[#1a1a26] bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Copy */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6366f1] mb-4">
              Why me
            </p>
            <h2
              className="font-semibold text-[#e8e8f0] tracking-tight leading-tight mb-8"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
            >
              He builds what he advises.
            </h2>
            <div className="space-y-5 text-[#8888a8] leading-relaxed text-[15px]">
              <p>
                I've spent 7+ years inside a scaling media company building the financial
                intelligence infrastructure from the ground up — not as a consultant, but as the
                person responsible for the numbers.
              </p>
              <p>
                The platform I offer clients is the same system I built in production — live across
                7 departments, used by the CFO for executive reporting, tracking $100M+ in recurring
                revenue monthly. I'm currently working directly with the President and CFO to define
                the top 5 metrics across every department and streamline how financial intelligence
                reaches the executive team.
              </p>
              <p>
                I know what a CFO actually needs to see. I know what breaks at scale. And I know how
                to build the system that makes it work — because I built it for real, not in a
                sandbox.
              </p>
              <p>
                I work with leaders who are eager to understand what they're building — not just
                consume it. If you want a vendor, I'm not the right fit. If you want a thinking
                partner who builds, let's talk.
              </p>
            </div>
          </div>

          {/* Proof points */}
          <div className="grid grid-cols-2 gap-px bg-[#1a1a26] rounded-2xl overflow-hidden self-start">
            {proofPoints.map((p) => (
              <div
                key={p.value}
                className="bg-[#0d0d14] p-7 hover:bg-[#101019] transition-colors duration-200"
              >
                <div className="text-2xl font-bold text-[#e8e8f0] tracking-tight mb-1.5">
                  {p.value}
                </div>
                <div className="text-xs text-[#5a5a78] leading-snug">{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
