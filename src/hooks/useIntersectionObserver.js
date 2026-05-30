import { useEffect } from 'react'

/**
 * Custom hook to apply a CSS class when elements matching a selector enter the viewport.
 * @param {string} selector - The CSS selector for target elements.
 * @param {string} className - The CSS class to apply when intersecting.
 * @param {number} threshold - Intersection observer threshold (0 to 1).
 * @param {boolean} triggerOnce - Whether to unobserve after first intersection.
 */
export function useIntersectionObserver({
  selector,
  className,
  threshold = 0.1,
  triggerOnce = false
}) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className)
          if (triggerOnce) {
            observer.unobserve(entry.target)
          }
        }
      })
    }, { threshold })

    const elements = document.querySelectorAll(selector)
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [selector, className, threshold, triggerOnce])
}
