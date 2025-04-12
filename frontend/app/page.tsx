import CTA from '@/components/cta'
import Faqs from '@/components/faqs'
import Features from '@/components/features'
import Footer from '@/components/footer'
import Hero from '@/components/hero'
import Navbar from '@/components/navbar'
import React from 'react'

const page = () => {
  return (
    <main>
      <Navbar />
      <div>
        <Hero />
        <CTA />
        <Features />
        <Faqs />
        <Footer />
      </div>
    </main>
  )
}

export default page