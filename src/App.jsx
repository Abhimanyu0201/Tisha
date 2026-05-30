import React, { useState, useCallback, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Work from './components/Work'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Hooks
import { useIntersectionObserver } from './hooks/useIntersectionObserver'
import { useParallax } from './hooks/useParallax'

// Data
import { interestCards, brandPlates } from './data/portfolioData'

// Lazy load Modals for performance optimization
const ProfileModal = React.lazy(() => import('./modals/ProfileModal'))
const FoodGalleryModal = React.lazy(() => import('./modals/FoodGalleryModal'))
const InterestCardModal = React.lazy(() => import('./modals/InterestCardModal'))

function App() {
  const [isScatterPopped, setIsScatterPopped] = useState(false)
  const [isMeasOpen, setIsMeasOpen] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(null)
  const [isFoodOpen, setIsFoodOpen] = useState(false)
  const [foodStartIdx, setFoodStartIdx] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Scroll reveal Intersection Observer applied globally
  useIntersectionObserver({
    selector: '.reveal',
    className: 'visible',
    threshold: 0.07
  })

  // Parallax headings on scroll applied globally
  useParallax('.about-headline, .work-intro, .contact-headline', 0.04)

  // Interest Card Modal Navigation callback
  const cardModalNav = useCallback((dir) => {
    setActiveCardIndex((prev) => {
      if (prev === null) return null
      return (prev + interestCards.length + dir) % interestCards.length
    })
  }, [])

  // Food Gallery actions
  const openFoodGallery = useCallback((idx) => {
    setFoodStartIdx(idx)
    setIsFoodOpen(true)
  }, [])

  const closeFoodGallery = useCallback(() => {
    setIsFoodOpen(false)
  }, [])

  // Scatter Popping trigger
  const fireScatter = useCallback(() => {
    setIsScatterPopped(true)
  }, [])

  return (
    <>
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <Hero />

      <About
        isScatterPopped={isScatterPopped}
        fireScatter={fireScatter}
        setActiveCardIndex={setActiveCardIndex}
        setIsMeasOpen={setIsMeasOpen}
        openFoodGallery={openFoodGallery}
      />

      <Skills />

      <Work />

      <Services />

      <Contact />

      <Footer />

      {/* Lazy loaded modals wrapped in Suspense for bundle size optimization */}
      <Suspense fallback={null}>
        <ProfileModal
          isOpen={isMeasOpen}
          onClose={() => setIsMeasOpen(false)}
        />

        <FoodGalleryModal
          isOpen={isFoodOpen}
          onClose={closeFoodGallery}
          startIdx={foodStartIdx}
          brandPlates={brandPlates}
        />

        <InterestCardModal
          activeIndex={activeCardIndex}
          onClose={() => setActiveCardIndex(null)}
          interestCards={interestCards}
          onNav={cardModalNav}
        />
      </Suspense>
    </>
  )
}

export default App
