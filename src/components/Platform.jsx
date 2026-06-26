const features = [
  {
    title: 'Automated reporting',
    body: 'Budget vs. actual, variance analysis, period normalization — runs itself. No more manual pulls.',
  },
  {
    title: 'Live dashboards',
    body: 'React-built executive dashboards connected to your data in real time. Drill down to any level.',
  },
  {
    title: 'AI commentary',
    body: 'Material variances explained automatically. Your CFO gets answers, not raw numbers.',
  },
  {
    title: 'Deployed into your environment',
    body: "Code lives on your infrastructure. I never touch your data. That's the architecture by design.",
  },
]

export default function Platform() {
  return (
    <section id="platform" className="py-16 px-6 border-t border-[#1a1a26] bg-[#0d0d14]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6366f1] mb-4">
            The platform
          </p>
          <h2
            className="font-semibold text-[#e8e8f0] tracking-tight leading-tight mb-5"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
          >
            Live financial intelligence — built for your business.
          </h2>
          <p className="text-[#8888a8] leading-relaxed text-[15px]">
            Not a generic dashboard. A custom-built financial intelligence system that ingests your
            data, automates your reporting, and surfaces AI-generated insight — live, auditable, and
            owned by you.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a26]">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-[#0a0a0f] p-6 hover:bg-[#0d0d14] transition-colors duration-200"
            >
              <h3 className="text-sm font-semibold text-[#e8e8f0] mb-2">{f.title}</h3>
              <p className="text-xs text-[#5a5a78] leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
