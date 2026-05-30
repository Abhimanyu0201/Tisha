import React from 'react'
import { photo, polaroids } from '../data/portfolioData'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import BagScene from './BagScene'

const About = ({
  isScatterPopped,
  fireScatter,
  setActiveCardIndex,
  setIsMeasOpen,
  openFoodGallery
}) => {
  // Polaroid slide-in transition observer
  useIntersectionObserver({
    selector: '.ab2-polaroid',
    className: 'ab2-vis',
    threshold: 0.2,
    triggerOnce: true
  })

  return (
    <section id="about" className="about-wrapper py-[100px] px-12 max-w-[1200px] mx-auto pb-10 max-md:py-[60px] max-md:px-6">
      <div className="section-label font-mono text-[9px] tracking-[4px] text-accent uppercase mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">About</div>

      <div id="about-b">
        {/* Row 1: Statement + side photo */}
        <div className="ab2-intro reveal grid grid-cols-[1fr_340px] gap-[60px] items-center mb-20 max-md:grid-cols-1">
          <div className="ab2-statement">
            <h2 className="ab2-headline font-serif text-[clamp(40px,5.8vw,82px)] max-md:text-[clamp(26px,7.5vw,44px)] font-normal leading-none tracking-[-1.5px] max-md:tracking-[-0.5px] mb-6">
              I build brands that <em className="italic text-accent">perform.</em>
            </h2>
            <p className="ab2-lead text-[14px] max-md:text-[13px] leading-[2] max-md:leading-[1.9] text-ink-soft max-w-[480px]">
              Digital marketer with hands-on experience managing luxury and automotive brands including Skoda and Nykaa Luxe.
              Skilled in high-performance social media campaigns, content strategy, and paid advertising — with a strong focus on engagement and measurable outcomes.
            </p>
          </div>
          <div className="ab2-side-photo w-[340px] h-[440px] overflow-hidden shadow-[0_20px_60px_rgba(10,30,50,0.32),0_4px_16px_rgba(10,30,50,0.14)] max-md:hidden">
            <img src={photo(2)} alt="Khushali Bochiwal" loading="lazy" className="w-full h-full object-cover object-[center_top] block" />
          </div>
        </div>

        {/* Row 2: What's in my world — 3-zone bag scene */}
        <div className="ab2-bag-section mb-24 max-md:mb-12">
          <div className="ab2-section-tag font-mono text-[9px] tracking-[4px] text-accent uppercase flex items-center gap-4 mb-[56px] after:content-[''] after:flex-1 after:h-[1px] after:bg-border">BRANDS & PROFILE</div>
          
          <BagScene
            isScatterPopped={isScatterPopped}
            fireScatter={fireScatter}
            setActiveCardIndex={setActiveCardIndex}
            setIsMeasOpen={setIsMeasOpen}
            openFoodGallery={openFoodGallery}
          />
        </div>

        {/* Row 4: Polaroid gallery */}
        <div className="ab2-polaroid-section mb-5">
          <div className="ab2-section-tag font-mono text-[9px] tracking-[4px] text-accent uppercase flex items-center gap-4 mb-11 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">CAMPAIGN HIGHLIGHTS</div>
          <div className="ab2-polaroid-row flex gap-6 items-start max-md:grid max-md:grid-cols-2 max-md:gap-[14px]">
            {polaroids.map((p, i) => (
              <div
                key={`polaroid-${i}`}
                className="ab2-polaroid"
                style={{
                  '--pol-rot': p.rot,
                  '--pol-delay': p.delay,
                }}
              >
                <img src={p.src} alt={p.caption} loading="lazy" style={{ objectPosition: p.position || 'center' }} />
                <span className="ab2-pol-cap">{p.caption}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(About)
