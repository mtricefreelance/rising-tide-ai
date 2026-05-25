import { CALENDLY_URL } from '../constants'

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a26] bg-[#0a0a0f]/90 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-[#e8e8f0] font-semibold text-[15px] tracking-tight flex-shrink-0">
          Rising Tide AI
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#platform" className="text-sm text-[#a0a0b8] hover:text-[#e8e8f0] transition-colors duration-150">
            What we build
          </a>
          <a href="#advisory" className="text-sm text-[#a0a0b8] hover:text-[#e8e8f0] transition-colors duration-150">
            Advisory
          </a>
          <a href="#case-study" className="text-sm text-[#a0a0b8] hover:text-[#e8e8f0] transition-colors duration-150">
            Case study
          </a>
          <a
            href={CALENDLY_URL}
            className="text-sm bg-[#6366f1] hover:bg-[#5254cc] text-white px-4 py-2 rounded-md font-medium transition-colors duration-150"
          >
            Book a call
          </a>
        </div>

        <a
          href={CALENDLY_URL}
          className="md:hidden text-sm bg-[#6366f1] text-white px-4 py-2 rounded-md font-medium"
        >
          Book a call
        </a>
      </div>
    </nav>
  )
}
