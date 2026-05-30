import React from 'react'
import { photo, interestCards, brandPlates } from '../data/portfolioData'

const BagScene = ({
  isScatterPopped,
  fireScatter,
  closeScatter,
  setActiveCardIndex,
  setIsMeasOpen,
  openFoodGallery
}) => {
  const handleKeyDown = (action) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  return (
    <>
      {/* Desktop Bag Scene */}
      <div 
        className="ab2-bag-scene max-lg:hidden" 
        id="ab2BagScene"
        onMouseLeave={closeScatter}
      >
        {/* Center: actual bag image */}
        <div
          className="ab2-bag-origin"
          role="button"
          tabIndex={0}
          onMouseEnter={fireScatter}
          onClick={fireScatter}
          onKeyDown={handleKeyDown(fireScatter)}
          aria-label="Reveal marketing toolkit items"
        >
          <img src={photo(3)} alt="Marketing toolkit" loading="lazy" className="ab2-bag-img" />
        </div>

        {/* LEFT: Profile panel */}
        <div
          className={`ab2-bag-item ${isScatterPopped ? 'popped' : ''}`}
          style={{ '--tx': '-420px', '--ty': '-60px', '--rot': '-2deg' }}
          data-idx="L"
        >
          <div
            className="ab2-meas-panel"
            role="button"
            tabIndex={isScatterPopped ? 0 : -1}
            onClick={() => setIsMeasOpen(true)}
            onKeyDown={handleKeyDown(() => setIsMeasOpen(true))}
            aria-label="View detailed profile modal"
          >
            <div className="ab2-meas-panel-title">Profile</div>
            <div className="ab2-meas-panel-row">
              <span className="ab2-meas-panel-key">Location</span>
              <span className="ab2-meas-panel-val">Surat, Gujarat</span>
            </div>
            <div className="ab2-meas-panel-row">
              <span className="ab2-meas-panel-key">Education</span>
              <span className="ab2-meas-panel-val">BBA</span>
            </div>
            <div className="ab2-meas-panel-row">
              <span className="ab2-meas-panel-key">College</span>
              <span className="ab2-meas-panel-val">BMCC, Surat</span>
            </div>
            <div className="ab2-meas-panel-row">
              <span className="ab2-meas-panel-key">Certification</span>
              <span className="ab2-meas-panel-val">IIDE — Digital Marketing</span>
            </div>
            <div className="ab2-meas-panel-row">
              <span className="ab2-meas-panel-key">Tools</span>
              <span className="ab2-meas-panel-val">Meta & Google Ads</span>
            </div>
            <div className="ab2-meas-panel-row">
              <span className="ab2-meas-panel-key">Also</span>
              <span className="ab2-meas-panel-val">Canva, Mailchimp</span>
            </div>
            <div className="ab2-meas-panel-row">
              <span className="ab2-meas-panel-key">Focus</span>
              <span className="ab2-meas-panel-val">Luxury & Auto</span>
            </div>
            <div className="ab2-meas-panel-row">
              <span className="ab2-meas-panel-key">Email</span>
              <span className="ab2-meas-panel-val text-[11px] truncate max-w-[120px]">khushali.bochiwal@gmail.com</span>
            </div>
            <div className="ab2-meas-panel-row">
              <span className="ab2-meas-panel-key">Phone</span>
              <span className="ab2-meas-panel-val">+91 8469395052</span>
            </div>
          </div>
        </div>

        {/* TOP: Interest cards */}
        {interestCards.map((card, i) => (
          <div
            key={`interest-${i}`}
            className={`ab2-bag-item ${isScatterPopped ? 'popped' : ''}`}
            style={{
              '--tx': `${-230 + i * 115}px`,
              '--ty': `${-268 + (i === 1 || i === 3 ? -42 : i === 2 ? -57 : 0)}px`,
              '--rot': `${-10 + i * 5}deg`,
            }}
            data-idx={String(i)}
          >
            <div
              className="ab2-bag-card"
              role="button"
              tabIndex={isScatterPopped ? 0 : -1}
              onClick={() => setActiveCardIndex(i)}
              onKeyDown={handleKeyDown(() => setActiveCardIndex(i))}
              aria-label={`View interest card for ${card.label}`}
            >
              <img src={card.src} alt={card.label} loading="lazy" />
            </div>
            <span className="ab2-bag-lbl">{card.label}</span>
          </div>
        ))}

        {/* RIGHT: Brand plates */}
        {brandPlates.map((plate, i) => (
          <div
            key={`food-${i}`}
            className={`ab2-bag-item ${isScatterPopped ? 'popped' : ''}`}
            style={{
              '--tx': plate.tx,
              '--ty': plate.ty,
              '--rot': plate.rot,
            }}
            data-idx={plate.idx}
          >
            <div
              className={`ab2-food-circle ${plate.size === 'sm' ? 'ab2-food-circle--sm' : ''}`}
              role="button"
              tabIndex={isScatterPopped ? 0 : -1}
              onClick={() => openFoodGallery(i)}
              onKeyDown={handleKeyDown(() => openFoodGallery(i))}
              aria-label={`View brand activation gallery for ${plate.label}`}
            >
              <img src={plate.src} alt={plate.label} loading="lazy" />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile/Tablet Fallback Layout */}
      <div className="hidden max-lg:flex flex-col gap-6">
        {/* Profile Card */}
        <div className="bg-warm-white p-6 border border-border/80 rounded-lg shadow-sm">
          <div className="font-mono text-[10px] tracking-[3px] uppercase text-accent mb-4 pb-2 border-b border-border/40">Profile Overview</div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 max-sm:grid-cols-1">
            <div className="flex flex-col gap-0.5"><span className="font-mono text-[8px] tracking-[2px] uppercase text-muted">Location</span><span className="text-[13px] text-ink font-body font-light">Surat, Gujarat, India</span></div>
            <div className="flex flex-col gap-0.5"><span className="font-mono text-[8px] tracking-[2px] uppercase text-muted">Education</span><span className="text-[13px] text-ink font-body font-light">BBA — Bhagwan Mahavir College</span></div>
            <div className="flex flex-col gap-0.5"><span className="font-mono text-[8px] tracking-[2px] uppercase text-muted">Certification</span><span className="text-[13px] text-ink font-body font-light">Post Grad in Digital Marketing — IIDE</span></div>
            <div className="flex flex-col gap-0.5"><span className="font-mono text-[8px] tracking-[2px] uppercase text-muted">Tools</span><span className="text-[13px] text-ink font-body font-light">Meta Ads, Google Ads, Canva</span></div>
            <div className="flex flex-col gap-0.5"><span className="font-mono text-[8px] tracking-[2px] uppercase text-muted">Email</span><a href="mailto:khushali.bochiwal@gmail.com" className="text-[13px] text-accent hover:underline font-body font-light">khushali.bochiwal@gmail.com</a></div>
            <div className="flex flex-col gap-0.5"><span className="font-mono text-[8px] tracking-[2px] uppercase text-muted">Phone</span><a href="tel:+918469395052" className="text-[13px] text-accent hover:underline font-body font-light">+91 8469395052</a></div>
          </div>
        </div>

        {/* Brands & Interests Grid */}
        <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
          {/* Interests */}
          <div className="bg-warm-white p-6 border border-border/80 rounded-lg shadow-sm">
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-accent mb-4 pb-2 border-b border-border/40">Services & Focus</div>
            <div className="grid grid-cols-3 gap-3">
              {interestCards.map((card, i) => (
                <div
                  key={`mob-interest-${i}`}
                  className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform duration-200"
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveCardIndex(i)}
                  onKeyDown={handleKeyDown(() => setActiveCardIndex(i))}
                  aria-label={`View interest card for ${card.label}`}
                >
                  <div className="w-16 h-16 rounded overflow-hidden border border-ink shadow-sm">
                    <img src={card.src} alt={card.label} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-mono text-[7px] tracking-[0.5px] uppercase text-ink-soft text-center leading-tight">{card.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="bg-warm-white p-6 border border-border/80 rounded-lg shadow-sm">
            <div className="font-mono text-[10px] tracking-[3px] uppercase text-accent mb-4 pb-2 border-b border-border/40">Brand Activations</div>
            <div className="grid grid-cols-3 gap-3">
              {brandPlates.map((plate, i) => (
                <div
                  key={`mob-brand-${i}`}
                  className="flex flex-col items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform duration-200"
                  role="button"
                  tabIndex={0}
                  onClick={() => openFoodGallery(i)}
                  onKeyDown={handleKeyDown(() => openFoodGallery(i))}
                  aria-label={`View brand activation gallery for ${plate.label}`}
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-ink shadow-sm">
                    <img src={plate.src} alt={plate.label} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-mono text-[7px] tracking-[0.5px] uppercase text-ink-soft text-center leading-tight">{plate.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(BagScene)
