import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import TwoLanes from './components/TwoLanes'
import Platform from './components/Platform'
import ClaritySession from './components/ClaritySession'
import CaseStudy from './components/CaseStudy'
import WhyMe from './components/WhyMe'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-[#0a0a0f] min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <TwoLanes />
        <Platform />
        <ClaritySession />
        <CaseStudy />
        <WhyMe />
        <Footer />
      </main>
    </div>
  )
}
