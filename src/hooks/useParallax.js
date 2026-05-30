import { useEffect } from 'react'

/**
 * Custom hook to apply parallax translateY transform to elements on scroll.
 * @param {string} selector - The CSS selector for target elements.
 * @param {number} speed - Parallax speed multiplier.
 */
export function useParallax(selector, speed = 0.04) {
  useEffect(() => {
    let active = true
    let animationFrameId = null
    
    const onParallax = () => {
      if (!active) return
      const elements = document.querySelectorAll(selector)
      const winH = window.innerHeight
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        // Only calculate if element is roughly in viewport
        if (rect.top < winH + 100 && rect.bottom > -100) {
          const mid = rect.top + rect.height / 2
          const off = (mid - winH / 2) * speed
          el.style.transform = `translateY(${off}px)`
        }
      })
    }

    const onScrollHandler = () => {
      if (window.innerWidth <= 768) return
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(onParallax)
    }

    window.addEventListener('scroll', onScrollHandler, { passive: true })
    onScrollHandler()

    return () => {
      active = false
      window.removeEventListener('scroll', onScrollHandler)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [selector, speed])
}
