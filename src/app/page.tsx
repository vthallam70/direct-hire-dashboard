import Nav from '@/components/Nav'
import ScrollObserver from '@/components/ScrollObserver'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import LiveDemo from '@/components/LiveDemo'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'
import Faq from '@/components/Faq'
import Cta from '@/components/Cta'
import Footer from '@/components/Footer'

export default function Page() {
  return (
    <>
      <ScrollObserver />
      <Nav />
      <Hero />
      <Features />
      <LiveDemo />
      <Pricing />
      <Testimonials />
      <Faq />
      <Cta />
      <Footer />
    </>
  )
}
