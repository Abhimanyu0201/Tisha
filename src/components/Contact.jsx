import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="py-[100px] px-12 max-w-[1200px] mx-auto pb-[120px] max-md:py-[60px] max-md:px-6" style={{ paddingBottom: '120px' }}>
      <div className="section-label font-mono text-[9px] tracking-[4px] text-accent uppercase mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:h-px after:bg-border">Contact</div>
      <div className="contact-grid reveal grid grid-cols-2 gap-[80px] items-center max-md:grid-cols-1 max-md:gap-8">
        <div>
          <h2 className="contact-headline font-serif text-[clamp(32px,4.5vw,56px)] max-md:text-[clamp(30px,8vw,50px)] font-normal leading-[1.1] mb-5">
            Let's make<br />something <em className="italic text-accent">good.</em>
          </h2>
          <p className="contact-body text-[13px] leading-[1.95] text-muted mb-9">
            Digital Marketer · Social Media & Brand Strategy Specialist.
            Based in Surat, Gujarat — open to agency roles, brand consulting, and campaign collaborations.
            I respond to every message.
          </p>
          <div className="contact-links flex flex-col">
            <a href="mailto:khushali.bochiwal@gmail.com" className="contact-link flex items-center gap-4 text-ink-soft text-[13px] py-[14px] border-b border-border hover:text-accent transition-colors duration-200">
              <span className="contact-link-label font-mono text-[9px] tracking-[2px] text-muted uppercase min-width-[76px]">Email</span>
              khushali.bochiwal@gmail.com
            </a>
            <a href="tel:+918469395052" className="contact-link flex items-center gap-4 text-ink-soft text-[13px] py-[14px] border-b border-border hover:text-accent transition-colors duration-200">
              <span className="contact-link-label font-mono text-[9px] tracking-[2px] text-muted uppercase min-width-[76px]">Phone</span>
              +91 8469395052
            </a>
            <span className="contact-link flex items-center gap-4 text-ink-soft text-[13px] py-[14px] border-b border-border">
              <span className="contact-link-label font-mono text-[9px] tracking-[2px] text-muted uppercase min-width-[76px]">Location</span>
              Surat, Gujarat, India
            </span>
          </div>
        </div>
        <div className="contact-form-side reveal reveal-delay-1 flex flex-col gap-[18px]">
          <div className="form-row flex flex-col gap-[7px]">
            <label className="form-label font-mono text-[9px] tracking-[2px] text-muted uppercase">Your name</label>
            <input className="form-input bg-ink/4 border border-border/80 rounded-md p-3 font-body text-[13px] text-ink outline-none focus:border-accent focus:bg-cream/40 placeholder:text-muted/80 w-full transition-all duration-200" type="text" placeholder="First Last" />
          </div>
          <div className="form-row flex flex-col gap-[7px]">
            <label className="form-label font-mono text-[9px] tracking-[2px] text-muted uppercase">Email</label>
            <input className="form-input bg-ink/4 border border-border/80 rounded-md p-3 font-body text-[13px] text-ink outline-none focus:border-accent focus:bg-cream/40 placeholder:text-muted/80 w-full transition-all duration-200" type="email" placeholder="you@agency.com" />
          </div>
          <div className="form-row flex flex-col gap-[7px]">
            <label className="form-label font-mono text-[9px] tracking-[2px] text-muted uppercase">What's this about</label>
            <input className="form-input bg-ink/4 border border-border/80 rounded-md p-3 font-body text-[13px] text-ink outline-none focus:border-accent focus:bg-cream/40 placeholder:text-muted/80 w-full transition-all duration-200" type="text" placeholder="Social media / Paid ads / Brand strategy" />
          </div>
          <div className="form-row flex flex-col gap-[7px]">
            <label className="form-label font-mono text-[9px] tracking-[2px] text-muted uppercase">Tell me more</label>
            <textarea className="form-input form-textarea bg-ink/4 border border-border/80 rounded-md p-3 font-body text-[13px] text-ink outline-none focus:border-accent focus:bg-cream/40 placeholder:text-muted/80 w-full resize-none h-[88px] transition-all duration-200" placeholder="Tell me about the project..."></textarea>
          </div>
          <button className="btn-primary bg-ink text-warm-white py-[13px] px-[36px] font-mono text-[10px] tracking-[2px] uppercase border border-ink hover:bg-accent-mid hover:border-accent-mid transition-all duration-250 self-start border-none" onClick={() => alert('Connect to Formspree — formspree.io is free, takes 2 mins.')}>
            Send →
          </button>
        </div>
      </div>
    </section>
  )
}

export default React.memo(Contact)
