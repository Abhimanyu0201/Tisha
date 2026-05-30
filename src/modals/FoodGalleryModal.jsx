import React, { useState, useEffect, useRef } from 'react'

const FoodGalleryModal = ({ isOpen, onClose, startIdx, brandPlates }) => {
  const [activeFoodIdx, setActiveFoodIdx] = useState(0)
  const trackRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'

    const track = trackRef.current
    if (!track) return

    const all = Array.from(track.querySelectorAll('.fg-item'))
    const origCount = brandPlates.length
    const target = all[origCount + startIdx]

    if (target) {
      const timer = setTimeout(() => {
        track.scrollLeft = target.offsetLeft - (track.offsetWidth / 2 - target.offsetWidth / 2)
        setActiveFoodIdx(startIdx)
      }, 50)
      return () => clearTimeout(timer)
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, startIdx, brandPlates.length])

  // Clean up body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const onFoodTrackScroll = () => {
    const track = trackRef.current
    if (!track) return

    const all = Array.from(track.querySelectorAll('.fg-item'))
    const origCount = brandPlates.length
    const cx = track.scrollLeft + track.offsetWidth / 2

    let closest = 0
    let minDist = Infinity
    all.forEach((el, i) => {
      const d = Math.abs((el.offsetLeft + el.offsetWidth / 2) - cx)
      if (d < minDist) {
        minDist = d
        closest = i
      }
    })

    const setWidth = all[origCount].offsetLeft - all[0].offsetLeft
    let display = closest

    if (closest < origCount) {
      track.scrollLeft += setWidth
      display = closest + origCount
    } else if (closest >= origCount * 2) {
      track.scrollLeft -= setWidth
      display = closest - origCount
    }

    const activeIdx = parseInt(all[display].getAttribute('data-idx') || '0')
    setActiveFoodIdx(activeIdx)
  }

  return (
    <div
      id="foodGallery"
      className={`fg-overlay flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget || e.target.classList.contains('fg-overlay')) {
          onClose()
        }
      }}
    >
      <div className="fg-track" id="fgTrack" ref={trackRef} onScroll={onFoodTrackScroll}>
        {/* Set 1: clone */}
        {brandPlates.map((plate, i) => (
          <div
            key={`food-clone1-${i}`}
            className={`fg-item ${activeFoodIdx === i ? 'fg-active' : ''}`}
            data-idx={String(i)}
          >
            <img src={plate.src} alt={plate.label} loading="lazy" />
          </div>
        ))}
        {/* Set 2: original */}
        {brandPlates.map((plate, i) => (
          <div
            key={`food-orig-${i}`}
            className={`fg-item ${activeFoodIdx === i ? 'fg-active' : ''}`}
            data-idx={String(i)}
          >
            <img src={plate.src} alt={plate.label} loading="lazy" />
          </div>
        ))}
        {/* Set 3: clone */}
        {brandPlates.map((plate, i) => (
          <div
            key={`food-clone2-${i}`}
            className={`fg-item ${activeFoodIdx === i ? 'fg-active' : ''}`}
            data-idx={String(i)}
          >
            <img src={plate.src} alt={plate.label} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(FoodGalleryModal)
