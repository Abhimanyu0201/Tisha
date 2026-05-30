import React from 'react'

const Services = () => {
  return (
    <section id="services" className="py-[100px] px-12 max-w-[1200px] mx-auto max-md:py-[60px] max-md:px-6">
      <div className="section-label font-mono text-[9px] tracking-[4px] text-accent uppercase mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:h-px after:bg-border">What I Offer</div>
      <h2 className="about-headline reveal font-serif text-[clamp(26px,2.8vw,40px)] font-normal leading-[1.2] mb-7">
        What I bring to the <em className="italic text-accent">table.</em>
      </h2>
      <div className="offers-grid reveal reveal-delay-1 grid grid-cols-3 gap-px bg-border border border-border mt-[52px] max-md:grid-cols-1 max-md:gap-4">
        <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-350 ease-out hover:bg-cream hover:translate-y-[-3px]">
          <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">01</div>
          <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Social Media Marketing</div>
          <div className="offer-desc text-[12px] leading-[1.85] text-muted">End-to-end social management, reels, campaign calendars, and premium content for luxury and lifestyle brands.</div>
        </div>
        <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-350 ease-out hover:bg-cream hover:translate-y-[-3px]">
          <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">02</div>
          <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Brand Strategy</div>
          <div className="offer-desc text-[12px] leading-[1.85] text-muted">Positioning, digital presence, and campaign planning — from store launches to full brand activations.</div>
        </div>
        <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-350 ease-out hover:bg-cream hover:translate-y-[-3px]">
          <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">03</div>
          <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Paid Advertising</div>
          <div className="offer-desc text-[12px] leading-[1.85] text-muted">Meta Ads and Google Ads campaigns focused on reach, engagement, and conversions — optimized from insights.</div>
        </div>
        <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-350 ease-out hover:bg-cream hover:translate-y-[-3px]">
          <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">04</div>
          <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Influencer Marketing</div>
          <div className="offer-desc text-[12px] leading-[1.85] text-muted">Creator partnerships and influencer-led campaigns aligned with brand goals and audience growth.</div>
        </div>
        <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-350 ease-out hover:bg-cream hover:translate-y-[-3px]">
          <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">05</div>
          <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Client Servicing & PR</div>
          <div className="offer-desc text-[12px] leading-[1.85] text-muted">Client acquisition, onboarding, communication, and smooth campaign execution across agency environments.</div>
        </div>
        <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-350 ease-out hover:bg-cream hover:translate-y-[-3px]">
          <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">06</div>
          <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Content Strategy</div>
          <div className="offer-desc text-[12px] leading-[1.85] text-muted">Content calendars, creative direction with teams, and performance-led storytelling for emerging brands.</div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(Services)
