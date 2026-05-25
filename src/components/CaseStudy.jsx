const stats = [
  { value: '3 min', label: 'After', note: 'per run' },
  { value: '90 min', label: 'Before', note: 'per run' },
  { value: '2 days', label: 'Build time', note: 'brief to production' },
]

export default function CaseStudy() {
  return (
    <section id="case-study" className="py-16 px-6 border-t border-[#1a1a26] bg-[#0d0d14]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Copy */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6366f1] mb-4">
              Case study
            </p>
            <h2
              className="font-semibold text-[#e8e8f0] tracking-tight leading-tight mb-6"
              style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
            >
              Built for a Life Sciences recruiting firm — in 2 days.
            </h2>
            <div className="space-y-4 text-[#8888a8] leading-relaxed text-[15px]">
              <p>
                Their core workflow: open LinkedIn Recruiter, manually pull candidate profiles, look
                up contact info in ZoomInfo one by one, copy everything into their ATS. For 10–15
                candidates, that was 45–90 minutes every single run.
              </p>
              <p>
                We replaced it with a fully automated AI pipeline — candidate scoring, contact
                enrichment, ATS record creation — triggered by pasting a list of LinkedIn URLs.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 divide-x divide-[#1a1a26] border border-[#1a1a26] rounded-2xl overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="p-6 md:p-8 text-center bg-[#0d0d14]">
                <div
                  className="font-bold text-[#e8e8f0] tracking-tight mb-1"
                  style={{ fontSize: 'clamp(24px, 3vw, 40px)', lineHeight: 1.1 }}
                >
                  {s.value}
                </div>
                <div className="text-xs font-semibold text-[#6366f1] mb-1 uppercase tracking-wide">
                  {s.label}
                </div>
                <div className="text-xs text-[#3a3a58]">{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
