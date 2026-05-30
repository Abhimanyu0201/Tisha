import React, { useEffect } from 'react'
import { photo } from '../data/portfolioData'

const Hero = () => {
  useEffect(() => {
    const heroEl = document.getElementById('hero')
    const bgImg = document.getElementById('bg-img6203')
    const frameCols = Array.from(document.querySelectorAll('.hero-frame-col')).map(col => ({
      el: col,
      speed: parseFloat(col.getAttribute('data-speed') || '0.4')
    }))

    let animationFrameId = null

    const onScroll = () => {
      const scrollY = window.scrollY
      const heroH = heroEl ? heroEl.offsetHeight : window.innerHeight

      const isMobile = window.innerWidth <= 1024
      if (!isMobile && scrollY <= heroH * 1.1) {
        frameCols.forEach(({ el, speed }) => {
          el.style.transform = `translateY(${-scrollY * speed}px)`
        })
      }

      if (heroEl) {
        const fade = Math.max(0, Math.min(1, scrollY / (heroH * 0.42)))
        heroEl.style.setProperty('--hero-fade', fade.toString())
      }

      if (bgImg) {
        const it = Math.max(0, Math.min(1, (scrollY - heroH * 0.28) / (heroH * 0.52)))
        bgImg.style.opacity = it.toString()
      }
    }

    const onScrollHandler = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(onScroll)
    }

    window.addEventListener('scroll', onScrollHandler, { passive: true })
    onScrollHandler()

    return () => {
      window.removeEventListener('scroll', onScrollHandler)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      {/* Hero background image */}
      <div
        id="bg-img6203"
        style={{ backgroundImage: `url(${photo(5)})` }}
      />

      <div
        className="hero min-h-screen relative overflow-hidden flex items-center justify-center"
        id="hero"
        style={{ backgroundImage: `url(${photo(5)})` }}
      >
        {/* Rising photo frames */}
        <div className="hero-frames">
          <div className="hero-frame-col" data-speed="0.28" style={{ left: '1%', top: '6vh', width: '13vw', zIndex: 1 }}>
            <div className="hero-frame"><img src={photo(0)} alt="" /></div>
            <div className="hero-frame"><img src={photo(1)} alt="" /></div>
          </div>
          <div className="hero-frame-col" data-speed="0.52" style={{ left: '16%', top: '44vh', width: '10vw', zIndex: 3 }}>
            <div className="hero-frame"><img src={photo(2)} alt="" /></div>
          </div>
          <div className="hero-frame-col" data-speed="0.44" style={{ right: '15%', top: '26vh', width: '10vw', zIndex: 3 }}>
            <div className="hero-frame"><img src={photo(3)} alt="" /></div>
          </div>
          <div className="hero-frame-col" data-speed="0.22" style={{ right: '1%', top: '10vh', width: '13vw', zIndex: 1 }}>
            <div className="hero-frame"><img src={photo(4)} alt="" /></div>
            <div className="hero-frame"><img src={photo(0)} alt="" /></div>
          </div>
          <div className="hero-frame-col" data-speed="0.82" style={{ left: '7%', top: '78vh', width: '11vw', zIndex: 1 }}>
            <div className="hero-frame"><img src={photo(1)} alt="" /></div>
          </div>
          <div className="hero-frame-col" data-speed="0.72" style={{ right: '7%', top: '72vh', width: '11vw', zIndex: 1 }}>
            <div className="hero-frame"><img src={photo(2)} alt="" /></div>
          </div>
        </div>

        {/* Centered text content */}
        <div className="hero-content relative z-10 flex flex-col items-center text-center px-5 pointer-events-auto">
          <div className="hero-tag text-[9px] font-mono tracking-[4px] text-white/60 uppercase mb-5 opacity-0 animate-[slideUp_0.7s_0.3s_forwards]">Portfolio — 2026</div>
          <p className="hero-greeting text-[11px] font-mono tracking-[5px] text-white/75 uppercase mb-[2px] opacity-0 animate-[slideUp_0.7s_0.35s_forwards]">Hi, I'm</p>
          <h1 className="hero-name font-display font-bold italic text-[clamp(72px,14vw,180px)] max-md:text-[clamp(52px,16vw,100px)] max-sm:text-[clamp(44px,18vw,80px)] leading-[0.84] tracking-[-4px] max-md:tracking-[-2px] mb-[26px] text-white opacity-0 animate-[slideUp_1.1s_0.1s_forwards] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Khushali</h1>
          <div className="hero-sub text-[10px] font-mono tracking-[3px] text-white/80 uppercase mb-7 leading-[1.9] opacity-0 animate-[slideUp_0.7s_0.5s_forwards]">Digital Marketer &nbsp;·&nbsp; Social Media &nbsp;·&nbsp; Brand Strategy &nbsp;·&nbsp; Surat</div>
          <div className="hero-cta flex gap-4 items-center max-sm:flex-col opacity-0 animate-[slideUp_0.7s_0.8s_forwards]">
            <a href="#work" className="btn-primary bg-ink text-warm-white py-[13px] px-[30px] font-mono text-[10px] tracking-[2px] uppercase border border-ink hover:bg-accent-mid hover:border-accent-mid transition-all duration-250">View Work</a>
            <a href="#contact" className="btn-ghost text-white/85 font-mono text-[10px] tracking-[2px] uppercase border-b border-white/40 pb-[2px] hover:text-white hover:border-white transition-all duration-200">Let's Talk →</a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint absolute bottom-9 left-[60px] flex flex-col items-center gap-2 font-mono text-[9px] tracking-[3px] text-muted uppercase opacity-0 animate-[fadeIn_1s_1.4s_forwards] z-10 max-sm:hidden">
          <span>Scroll</span>
          <div className="scroll-line scroll-line-animated w-[1px] h-11 bg-linear-to-b from-accent to-transparent"></div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="marquee-wrap bg-ink py-4 overflow-hidden whitespace-nowrap">
        <div className="marquee-inner">
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Digital Marketer</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Social Media Marketing</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Skoda & Nykaa Luxe</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Surat, Gujarat</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Open to Collabs</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Digital Marketer</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Social Media Marketing</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Skoda & Nykaa Luxe</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Surat, Gujarat</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Open to Collabs</span>
          <span className="marquee-dot text-accent">✦</span>
        </div>
      </div>
    </>
  )
}

export default React.memo(Hero)
