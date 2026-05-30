import React, { useEffect, useCallback } from 'react'

const InterestCardModal = ({ activeIndex, onClose, interestCards, onNav }) => {
  const cardModalNav = useCallback(
    (dir) => {
      onNav(dir)
    },
    [onNav]
  )

  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') cardModalNav(-1)
      if (e.key === 'ArrowRight') cardModalNav(1)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, onClose, cardModalNav])

  const isOpen = activeIndex !== null

  return (
    <div
      id="cardModal"
      className={`ic-overlay flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button className="ic-nav" onClick={() => cardModalNav(-1)}>
        &#8249;
      </button>
      <div className="ic-inner">
        <div className="ic-img-wrap">
          {isOpen && (
            <img
              id="cardModalImg"
              src={interestCards[activeIndex].src}
              alt={interestCards[activeIndex].label}
              className="transition-opacity duration-180"
            />
          )}
        </div>
        <span id="cardModalLbl" className="ic-lbl">
          {isOpen ? interestCards[activeIndex].label : ''}
        </span>
      </div>
      <button className="ic-nav" onClick={() => cardModalNav(1)}>
        &#8250;
      </button>
    </div>
  )
}

export default React.memo(InterestCardModal)
