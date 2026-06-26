const problems = [
  {
    number: '01',
    text: 'Your finance team spends 80% of their time pulling data and 20% thinking about it. It should be the other way around.',
  },
  {
    number: '02',
    text: "You're making decisions on last month's numbers because nobody has built the system that makes this week's numbers visible.",
  },
  {
    number: '03',
    text: "You're paying for SaaS tools that do 80% of what you need — and manually bridging the other 20% every single week.",
  },
  {
    number: '04',
    text: "You know AI could help. You just don't know where to start — or who to trust to build it.",
  },
]

export default function Problem() {
  return (
    <section id="problem" className="py-16 px-6 border-t border-[#1a1a26] bg-[#0d0d14]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <h2
            className="font-semibold text-[#e8e8f0] tracking-tight leading-tight"
            style={{ fontSize: 'clamp(28px, 3.5vw, 40px)' }}
          >
            Most businesses are flying blind — and they know it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a1a26]">
          {problems.map((p) => (
            <div
              key={p.number}
              className="relative bg-[#0a0a0f] p-8 group hover:bg-[#0d0d14] transition-colors duration-200"
            >
              <span
                className="text-[80px] font-bold leading-none absolute top-4 right-6 select-none pointer-events-none transition-colors duration-200"
                style={{ color: '#161624' }}
              >
                {p.number}
              </span>
              <p className="text-[#a0a0b8] leading-relaxed relative z-10 max-w-sm text-[15px]">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
