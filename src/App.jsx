import { useState, useEffect, useRef, useCallback } from 'react'

const interestCards = [
  { src: 'https://tishportfolio.netlify.app/IMG_1268.png', label: 'COMP SCI' },
  { src: 'https://tishportfolio.netlify.app/IMG_6116.png', label: 'BOOKS' },
  { src: 'https://tishportfolio.netlify.app/IMG_4615.jpg', label: 'CAFES' },
  { src: 'https://tishportfolio.netlify.app/IMG_0044.png', label: 'DATA' },
  { src: 'https://tishportfolio.netlify.app/IMG_1696.png', label: 'CONTENT' },
]

const foodPlates = [
  { src: 'https://tishportfolio.netlify.app/food1-nobg.png', label: 'Food 1', size: 'lg', tx: '385px', ty: '-62px', rot: '7deg', idx: 'R1' },
  { src: 'https://tishportfolio.netlify.app/food2-nobg.png', label: 'Food 2', size: 'sm', tx: '502px', ty: '-108px', rot: '-14deg', idx: 'R2' },
  { src: 'https://tishportfolio.netlify.app/food3-nobg.png', label: 'Food 3', size: 'lg', tx: '418px', ty: '-158px', rot: '19deg', idx: 'R3' },
  { src: 'https://tishportfolio.netlify.app/food4-nobg.png', label: 'Food 4', size: 'sm', tx: '495px', ty: '-210px', rot: '-6deg', idx: 'R4' },
  { src: 'https://tishportfolio.netlify.app/food6-nobg.png', label: 'Food 5', size: 'lg', tx: '400px', ty: '-260px', rot: '12deg', idx: 'R5' },
  { src: 'https://tishportfolio.netlify.app/food7-nobg.png', label: 'Food 6', size: 'sm', tx: '488px', ty: '-302px', rot: '-10deg', idx: 'R6' },
]

const polaroids = [
  { src: 'https://tishportfolio.netlify.app/IMG_3326.png', caption: 'Workout', rot: '-5deg', delay: '0s', position: 'center bottom' },
  { src: 'https://tishportfolio.netlify.app/IMG_5777.jpg', caption: 'Fit check', rot: '2deg', delay: '0.12s' },
  { src: 'https://tishportfolio.netlify.app/IMG_4391.jpg', caption: 'Lake nights', rot: '-2deg', delay: '0.24s' },
  { src: 'https://tishportfolio.netlify.app/FullSizeRender.jpg', caption: 'Golden hour', rot: '5deg', delay: '0.36s' },
]

function App() {
  const [isScatterPopped, setIsScatterPopped] = useState(false)
  const [isMeasOpen, setIsMeasOpen] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(null)
  const [isFoodOpen, setIsFoodOpen] = useState(false)
  const [foodStartIdx, setFoodStartIdx] = useState(0)
  const [activeFoodIdx, setActiveFoodIdx] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const trackRef = useRef(null)

  // Interest Card Modal Nav
  const cardModalNav = useCallback((dir) => {
    setActiveCardIndex((prev) => {
      if (prev === null) return null
      return (prev + interestCards.length + dir) % interestCards.length
    })
  }, [])

  // Keyboard navigation for card modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeCardIndex === null) return
      if (e.key === 'Escape') setActiveCardIndex(null)
      if (e.key === 'ArrowLeft') cardModalNav(-1)
      if (e.key === 'ArrowRight') cardModalNav(1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeCardIndex, cardModalNav])

  // Scroll reveal Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      });
    }, { threshold: 0.07 })

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Polaroid Slide-in Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ab2-vis')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.2 })

    document.querySelectorAll('.ab2-polaroid').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Parallax headings requestAnimationFrame loop
  useEffect(() => {
    let active = true
    const onParallax = () => {
      if (!active) return
      const slowEls = document.querySelectorAll('.about-headline, .work-intro, .contact-headline')
      slowEls.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const mid = rect.top + rect.height / 2
        const off = (mid - window.innerHeight / 2) * 0.04
        el.style.transform = `translateY(${off}px)`
      })
    }

    const loop = () => {
      onParallax()
      if (active) requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)

    return () => {
      active = false
    }
  }, [])

  // Scroll logic for rising frames and fixed background fade
  useEffect(() => {
    const heroEl = document.getElementById('hero')
    const bgImg = document.getElementById('bg-img6203')
    const frameCols = document.querySelectorAll('.hero-frame-col')

    const onScroll = () => {
      const scrollY = window.scrollY
      const heroH = heroEl ? heroEl.offsetHeight : window.innerHeight

      if (scrollY <= heroH * 1.1) {
        frameCols.forEach((col) => {
          const speed = parseFloat(col.getAttribute('data-speed') || '0.4')
          col.style.transform = `translateY(${-scrollY * speed}px)`
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

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Food plate gallery infinite scrolling setup
  useEffect(() => {
    if (!isFoodOpen) return
    document.body.style.overflow = 'hidden'

    const track = trackRef.current
    if (!track) return

    const all = Array.from(track.querySelectorAll('.fg-item'))
    const origCount = 6
    const target = all[origCount + foodStartIdx]

    if (target) {
      setTimeout(() => {
        track.scrollLeft = target.offsetLeft - (track.offsetWidth / 2 - target.offsetWidth / 2)
        setActiveFoodIdx(foodStartIdx)
      }, 50)
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isFoodOpen, foodStartIdx])

  const onFoodTrackScroll = () => {
    const track = trackRef.current
    if (!track) return

    const all = Array.from(track.querySelectorAll('.fg-item'))
    const origCount = 6
    const cx = track.scrollLeft + track.offsetWidth / 2

    let closest = 0
    let minDist = Infinity
    all.forEach((el, i) => {
      const d = Math.abs((el.offsetLeft + el.offsetWidth / 2) - cx)
      if (d < minDist) {
        minDist = d;
        closest = i;
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

  const openFoodGallery = (idx) => {
    setFoodStartIdx(idx)
    setIsFoodOpen(true)
  }

  const closeFoodGallery = () => {
    setIsFoodOpen(false)
  }

  // Trigger scatter popping
  const fireScatter = () => {
    setIsScatterPopped(true)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-6 px-6 md:px-12 backdrop-blur-[2px] bg-linear-to-b from-[#091e2d]/25 to-transparent">
        <span className="nav-name text-[11px] font-mono tracking-[3px] text-ink-soft uppercase opacity-0 animate-[fadeIn_0.8s_0.3s_forwards]">Tisha Bando</span>
        <div className={`nav-links flex gap-8 max-md:fixed max-md:top-0 max-md:w-[min(72vw,280px)] max-md:h-dvh max-md:bg-ink max-md:flex-col max-md:justify-center max-md:items-start max-md:py-16 max-md:px-10 max-md:gap-9 max-md:transition-all max-md:duration-[380ms] max-md:ease-out max-md:z-[150] max-md:shadow-[-14px_0_48px_rgba(0,0,0,0.5)] ${isMobileMenuOpen ? 'max-md:right-0' : 'max-md:right-[-100%]'}`} id="navLinks">
          <a href="#about" className="font-mono text-[10px] tracking-[2px] text-muted uppercase hover:text-accent max-md:text-[13px] max-md:tracking-[3px] max-md:text-white/72 max-md:opacity-100 max-md:animate-none" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#work" className="font-mono text-[10px] tracking-[2px] text-muted uppercase hover:text-accent max-md:text-[13px] max-md:tracking-[3px] max-md:text-white/72 max-md:opacity-100 max-md:animate-none" onClick={() => setIsMobileMenuOpen(false)}>Work</a>
          <a href="#services" className="font-mono text-[10px] tracking-[2px] text-muted uppercase hover:text-accent max-md:text-[13px] max-md:tracking-[3px] max-md:text-white/72 max-md:opacity-100 max-md:animate-none" onClick={() => setIsMobileMenuOpen(false)}>What I Do</a>
          <a href="#contact" className="font-mono text-[10px] tracking-[2px] text-muted uppercase hover:text-accent max-md:text-[13px] max-md:tracking-[3px] max-md:text-white/72 max-md:opacity-100 max-md:animate-none" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
        <button
          className="nav-hamburger flex md:hidden flex-col gap-[5px] cursor-pointer bg-none border-none p-[6px_4px] z-[200] max-md:flex"
          id="navHamburger"
          aria-label="Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`w-[22px] h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}></span>
          <span className={`w-[22px] h-[1.5px] bg-white transition-all duration-200 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-[22px] h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}></span>
        </button>
      </nav>
      <div className={`nav-backdrop fixed inset-0 z-[140] bg-black/48 transition-all duration-300 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navBackdrop" onClick={() => setIsMobileMenuOpen(false)}></div>

      {/* Hero background image */}
      <div id="bg-img6203"></div>

      {/* HERO */}
      <div className="hero min-h-screen relative overflow-hidden flex items-center justify-center" id="hero">
        {/* Rising photo frames */}
        <div className="hero-frames">
          <div className="hero-frame-col" data-speed="0.28" style={{ left: '1%', top: '6vh', width: '13vw', zIndex: 1 }}>
            <div className="hero-frame"><img src="https://tishportfolio.netlify.app/IMG_1533.jpg" alt="" /></div>
            <div className="hero-frame"><img src="https://tishportfolio.netlify.app/IMG_3871.png" alt="" /></div>
          </div>
          <div className="hero-frame-col" data-speed="0.52" style={{ left: '16%', top: '44vh', width: '10vw', zIndex: 3 }}>
            <div className="hero-frame"><img src="https://tishportfolio.netlify.app/IMG_4098.png" alt="" /></div>
          </div>
          <div className="hero-frame-col" data-speed="0.44" style={{ right: '15%', top: '26vh', width: '10vw', zIndex: 3 }}>
            <div className="hero-frame"><img src="https://tishportfolio.netlify.app/IMG_5727.png" alt="" /></div>
          </div>
          <div className="hero-frame-col" data-speed="0.22" style={{ right: '1%', top: '10vh', width: '13vw', zIndex: 1 }}>
            <div className="hero-frame"><img src="https://tishportfolio.netlify.app/FullSizeRender.jpg" alt="" /></div>
            <div className="hero-frame"><img src="https://tishportfolio.netlify.app/IMG_5695.jpg" alt="" /></div>
          </div>
          <div className="hero-frame-col" data-speed="0.82" style={{ left: '7%', top: '78vh', width: '11vw', zIndex: 1 }}>
            <div className="hero-frame"><img src="https://tishportfolio.netlify.app/IMG_4391.jpg" alt="" /></div>
          </div>
          <div className="hero-frame-col" data-speed="0.72" style={{ right: '7%', top: '72vh', width: '11vw', zIndex: 1 }}>
            <div className="hero-frame"><img src="https://tishportfolio.netlify.app/IMG_5128.png" alt="" /></div>
          </div>
        </div>

        {/* Centered text content */}
        <div className="hero-content relative z-10 flex flex-col items-center text-center px-5 pointer-events-auto">
          <div className="hero-tag text-[9px] font-mono tracking-[4px] text-white/60 uppercase mb-5 opacity-0 animate-[slideUp_0.7s_0.3s_forwards]">Portfolio — 2026</div>
          <p className="hero-greeting text-[11px] font-mono tracking-[5px] text-white/75 uppercase mb-[2px] opacity-0 animate-[slideUp_0.7s_0.35s_forwards]">Hi, I'm</p>
          <h1 className="hero-name font-display font-bold italic text-[clamp(110px,17vw,218px)] max-md:text-[clamp(72px,18vw,120px)] max-sm:text-[clamp(62px,20vw,96px)] leading-[0.84] tracking-[-4px] max-md:tracking-[-2px] mb-[26px] text-white opacity-0 animate-[slideUp_1.1s_0.1s_forwards] drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">Tisha</h1>
          <div className="hero-sub text-[10px] font-mono tracking-[3px] text-white/80 uppercase mb-7 leading-[1.9] opacity-0 animate-[slideUp_0.7s_0.5s_forwards]">Creator &nbsp;·&nbsp; Model &nbsp;·&nbsp; CS Student &nbsp;·&nbsp; 21</div>
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
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Aspiring Model</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Content Creator</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">CS at Queen's University</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Bangalore & Kingston</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Open to Collabs</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Aspiring Model</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Content Creator</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">CS at Queen's University</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Bangalore & Kingston</span>
          <span className="marquee-dot text-accent">✦</span>
          <span className="marquee-item font-mono text-[10px] tracking-[3px] text-[#3a607a] uppercase">Open to Collabs</span>
          <span className="marquee-dot text-accent">✦</span>
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="about-wrapper py-[100px] px-12 max-w-[1200px] mx-auto pb-10 max-md:py-[60px] max-md:px-6">
        <div className="section-label font-mono text-[9px] tracking-[4px] text-accent uppercase mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">About</div>

        <div id="about-b">
          {/* Row 1: Statement + side photo */}
          <div className="ab2-intro reveal grid grid-cols-[1fr_340px] gap-[60px] items-center mb-20 max-md:grid-cols-1">
            <div className="ab2-statement">
              <h2 className="ab2-headline font-serif text-[clamp(40px,5.8vw,82px)] max-md:text-[clamp(26px,7.5vw,44px)] font-normal leading-none tracking-[-1.5px] max-md:tracking-[-0.5px] mb-6">
                I've always chased the <em className="italic text-accent">next thing.</em>
              </h2>
              <p className="ab2-lead text-[14px] max-md:text-[13px] leading-[2] max-md:leading-[1.9] text-ink-soft max-w-[480px]">
                Change doesn't scare me - it's kind of the only thing I know.
                I'm the girl who figures it out while she goes — and somehow it always works.
              </p>
            </div>
            <div className="ab2-side-photo w-[340px] h-[440px] overflow-hidden shadow-[0_20px_60px_rgba(10,30,50,0.32),0_4px_16px_rgba(10,30,50,0.14)] max-md:hidden">
              <img src="https://tishportfolio.netlify.app/IMG_7628.jpg" alt="Tisha Bando" className="w-full h-full object-cover object-[center_top] block" />
            </div>
          </div>

          {/* Row 2: What's in my world — 3-zone bag scene */}
          <div className="ab2-bag-section mb-24 max-md:mb-12">
            <div className="ab2-section-tag font-mono text-[9px] tracking-[4px] text-accent uppercase flex items-center gap-4 mb-[56px] after:content-[''] after:flex-1 after:h-[1px] after:bg-border">WHAT'S IN MY WORLD</div>
            <div className="ab2-bag-scene" id="ab2BagScene">

              {/* Center: actual bag image */}
              <div className="ab2-bag-origin" onClick={fireScatter}>
                <img src="https://tishportfolio.netlify.app/bag-nobg.png" alt="bag" className="ab2-bag-img" />
              </div>

              {/* LEFT: Measurements panel */}
              <div
                className={`ab2-bag-item ${isScatterPopped ? 'popped' : ''}`}
                style={{ '--tx': '-420px', '--ty': '-60px', '--rot': '-2deg' }}
                data-idx="L"
              >
                <div className="ab2-meas-panel" onClick={() => setIsMeasOpen(true)}>
                  <div className="ab2-meas-panel-title">Measurements</div>
                  <div className="ab2-meas-panel-row">
                    <span className="ab2-meas-panel-key">Height</span>
                    <span className="ab2-meas-panel-val">5'0"</span>
                  </div>
                  <div className="ab2-meas-panel-row">
                    <span className="ab2-meas-panel-key">Age</span>
                    <span className="ab2-meas-panel-val">21</span>
                  </div>
                  <div className="ab2-meas-panel-row">
                    <span className="ab2-meas-panel-key">Size</span>
                    <span className="ab2-meas-panel-val">S – M</span>
                  </div>
                  <div className="ab2-meas-panel-row">
                    <span className="ab2-meas-panel-key">Shoe</span>
                    <span className="ab2-meas-panel-val">5 UK / 7 US</span>
                  </div>
                  <div className="ab2-meas-panel-row">
                    <span className="ab2-meas-panel-key">Eyes</span>
                    <span className="ab2-meas-panel-val">Russet Brown</span>
                  </div>
                  <div className="ab2-meas-panel-row">
                    <span className="ab2-meas-panel-key">Hair</span>
                    <span className="ab2-meas-panel-val">Black</span>
                  </div>
                  <div className="ab2-meas-panel-row">
                    <span className="ab2-meas-panel-key">Bust</span>
                    <span className="ab2-meas-panel-val">34"</span>
                  </div>
                  <div className="ab2-meas-panel-row">
                    <span className="ab2-meas-panel-key">Waist</span>
                    <span className="ab2-meas-panel-val">27"</span>
                  </div>
                  <div className="ab2-meas-panel-row">
                    <span className="ab2-meas-panel-key">Hips</span>
                    <span className="ab2-meas-panel-val">35"</span>
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
                  <div className="ab2-bag-card" onClick={() => setActiveCardIndex(i)}>
                    <img src={card.src} alt={card.label} />
                  </div>
                  <span className="ab2-bag-lbl">{card.label}</span>
                </div>
              ))}

              {/* RIGHT: Food plates */}
              {foodPlates.map((plate, i) => (
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
                    onClick={() => openFoodGallery(i)}
                  >
                    <img src={plate.src} alt={plate.label} />
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Row 4: Polaroid gallery */}
          <div className="ab2-polaroid-section mb-5">
            <div className="ab2-section-tag font-mono text-[9px] tracking-[4px] text-accent uppercase flex items-center gap-4 mb-11 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">A PEEK AT MY LIFE</div>
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
                  <img src={p.src} alt={p.caption} style={{ objectPosition: p.position || 'center' }} />
                  <span className="ab2-pol-cap">{p.caption}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="py-10 px-12 max-w-[1200px] mx-auto max-md:px-6">
        <div className="section-label font-mono text-[9px] tracking-[4px] text-accent uppercase mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">Work & Portfolio</div>
        <h2 className="work-intro reveal font-serif text-[clamp(26px,2.8vw,40px)] font-normal leading-[1.2] max-w-[560px] mb-[12px] max-md:mb-[52px]">
          The <em className="italic text-accent">work</em>
        </h2>

        {/* Masonry row 1 — left col wider */}
        <div className="work-masonry reveal max-md:flex-col max-md:gap-[14px]">
          <div className="wm-col wide">
            <div className="work-card group relative overflow-hidden bg-cream flex flex-col justify-end p-6 aspect-[2/3] max-md:min-h-[220px]">
              <div className="work-card-img absolute inset-0 flex items-center justify-center">
                <img src="https://tishportfolio.netlify.app/IMG_2580.JPG" alt="Tisha Bando portrait" className="w-full h-full object-cover" />
              </div>
              <div className="work-card-overlay absolute inset-0 bg-linear-to-t from-[#081424]/72 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-82"></div>
              <div className="work-card-meta relative z-10 transition-all duration-300">
                <div className="work-card-cat font-mono text-[9px] tracking-[3px] text-[#7ec6e8] uppercase mb-[5px]">Commercial / Editorial</div>
                <div className="work-card-title font-serif text-[17px] text-warm-white font-normal">Portrait — Night Life</div>
              </div>
            </div>
            <div className="work-card wm-placeholder group relative overflow-hidden flex flex-col justify-end p-6 aspect-[16/9] max-md:min-h-[220px]">
              <div className="work-card-img absolute inset-0 flex items-center justify-center">
                <img src="https://tishportfolio.netlify.app/IMG_1234.jpg" alt="Tisha Bando fashion" className="w-full h-full object-cover object-center" />
              </div>
              <div className="work-card-overlay absolute inset-0 bg-linear-to-t from-[#081424]/72 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-82"></div>
              <div className="work-card-meta relative z-10 transition-all duration-300">
                <div className="work-card-cat font-mono text-[9px] tracking-[3px] text-[#7ec6e8] uppercase mb-[5px]">Hydrangeas</div>
                <div className="work-card-title font-serif text-[17px] text-warm-white font-normal">My Favourite Flowers</div>
              </div>
            </div>
          </div>
          <div className="wm-col narrow">
            <div className="work-card group relative overflow-hidden bg-cream flex flex-col justify-end p-6 aspect-[3/4] max-md:min-h-[220px]">
              <div className="work-card-img absolute inset-0 flex items-center justify-center">
                <img src="https://tishportfolio.netlify.app/IMG_5215.jpg" alt="Tisha Bando fashion" className="campus-city-img w-full h-full object-cover" />
              </div>
              <div className="work-card-overlay absolute inset-0 bg-linear-to-t from-[#081424]/72 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-82"></div>
              <div className="work-card-meta relative z-10 transition-all duration-300">
                <div className="work-card-cat font-mono text-[9px] tracking-[3px] text-[#7ec6e8] uppercase mb-[5px]">Lifestyle</div>
                <div className="work-card-title font-serif text-[17px] text-warm-white font-normal">Everyday — Kingston, ON</div>
              </div>
            </div>
            <div className="work-card group relative overflow-hidden bg-cream flex flex-col justify-end p-6 aspect-[3/4] max-md:min-h-[220px]">
              <div className="work-card-img absolute inset-0 flex items-center justify-center">
                <img src="https://tishportfolio.netlify.app/IMG_5777.jpg" alt="Tisha Bando street style" className="w-full h-full object-cover object-center" />
              </div>
              <div className="work-card-overlay absolute inset-0 bg-linear-to-t from-[#081424]/72 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-82"></div>
              <div className="work-card-meta relative z-10 transition-all duration-300">
                <div className="work-card-cat font-mono text-[9px] tracking-[3px] text-[#7ec6e8] uppercase mb-[5px]">Fashion</div>
                <div className="work-card-title font-serif text-[17px] text-warm-white font-normal">Brown on Brown on Brown</div>
              </div>
            </div>
          </div>
        </div>

        {/* Masonry row 2 — equal 50 / 50 */}
        <div className="work-masonry reveal reveal-delay-1 max-md:flex-col max-md:gap-[14px]">
          <div className="wm-col equal">
            <div className="work-card group relative overflow-hidden bg-cream flex flex-col justify-end p-6 aspect-[3/4] max-md:min-h-[220px]">
              <div className="work-card-img absolute inset-0 flex items-center justify-center">
                <img src="https://tishportfolio.netlify.app/IMG_2751.jpg" alt="Tisha Bando candid" className="w-full h-full object-cover object-center" />
              </div>
              <div className="work-card-overlay absolute inset-0 bg-linear-to-t from-[#081424]/72 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-82"></div>
              <div className="work-card-meta relative z-10 transition-all duration-300">
                <div className="work-card-cat font-mono text-[9px] tracking-[3px] text-[#7ec6e8] uppercase mb-[5px]">Candid</div>
                <div className="work-card-title font-serif text-[17px] text-warm-white font-normal">Unscripted</div>
              </div>
            </div>
          </div>
          <div className="wm-col equal">
            <div className="work-card group relative overflow-hidden bg-cream flex flex-col justify-end p-6 aspect-[4/3] max-md:min-h-[220px]">
              <div className="work-card-img absolute inset-0 flex items-center justify-center">
                <img src="https://tishportfolio.netlify.app/IMG_0585.jpg" alt="Tisha Bando content" className="w-full h-full object-cover object-[center_top]" />
              </div>
              <div className="work-card-overlay absolute inset-0 bg-linear-to-t from-[#081424]/72 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-82"></div>
              <div className="work-card-meta relative z-10 transition-all duration-300">
                <div className="work-card-cat font-mono text-[9px] tracking-[3px] text-[#7ec6e8] uppercase mb-[5px]">Content</div>
                <div className="work-card-title font-serif text-[17px] text-warm-white font-normal">Shades & a Lip</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <div className="quote-section reveal py-20 px-12 text-center border-t border-b border-border w-full max-md:py-14 max-md:px-7">
        <p className="big-quote font-serif text-[clamp(20px,2.5vw,34px)] max-md:text-[clamp(16px,4.5vw,24px)] font-normal italic leading-[1.55] max-w-[680px] mx-auto mb-5 text-ink-soft">
          " I have <span className="text-accent">a way of being</span> that people remember."
        </p>
      </div>

      {/* SERVICES */}
      <section id="services" className="py-[100px] px-12 max-w-[1200px] mx-auto max-md:py-[60px] max-md:px-6">
        <div className="section-label font-mono text-[9px] tracking-[4px] text-accent uppercase mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">What I Offer</div>
        <h2 className="about-headline reveal font-serif text-[clamp(26px,2.8vw,40px)] font-normal leading-[1.2] mb-7">
          What I bring to the <em className="italic text-accent">table.</em>
        </h2>
        <div className="offers-grid reveal reveal-delay-1 grid grid-cols-3 gap-[1px] bg-border border border-border mt-[52px] max-md:grid-cols-1 max-md:gap-4">
          <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-[350ms] ease-out hover:bg-cream hover:-translate-y-[3px]">
            <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">01</div>
            <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Commercial Modelling</div>
            <div className="offer-desc text-[12px] leading-[1.85] text-muted">Brand campaigns, product shoots, lifestyle and e-commerce imagery. Real-person energy, relatable face.</div>
          </div>
          <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-[350ms] ease-out hover:bg-cream hover:-translate-y-[3px]">
            <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">02</div>
            <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Editorial & Print</div>
            <div className="offer-desc text-[12px] leading-[1.85] text-muted">Lookbooks, catalogue work, fashion editorial. Open to test shoots with photographers building their portfolios.</div>
          </div>
          <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-[350ms] ease-out hover:bg-cream hover:-translate-y-[3px]">
            <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">03</div>
            <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Jewellery & Detail Work</div>
            <div className="offer-desc text-[12px] leading-[1.85] text-muted">Jewellery campaigns, hand modelling, close-up and detail shots. Comfortable with product-forward and accessory-led work.</div>
          </div>
          <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-[350ms] ease-out hover:bg-cream hover:-translate-y-[3px]">
            <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">04</div>
            <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Content Creation</div>
            <div className="offer-desc text-[12px] leading-[1.85] text-muted">On-camera content for brands and campaigns. Natural delivery, comfortable in front of the lens, platform-native formats.</div>
          </div>
          <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-[350ms] ease-out hover:bg-cream hover:-translate-y-[3px]">
            <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">05</div>
            <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Availability</div>
            <div className="offer-desc text-[12px] leading-[1.85] text-muted">Kingston and Toronto year-round. Bangalore May–September. Open to travel. English, Hindi, Bengali.</div>
          </div>
          <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-[350ms] ease-out hover:bg-cream hover:-translate-y-[3px]">
            <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">06</div>
            <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Open To</div>
            <div className="offer-desc text-[12px] leading-[1.85] text-muted">New faces work, student rates, testing with photographers and emerging designers. Just reach out.</div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-[100px] px-12 max-w-[1200px] mx-auto pb-[120px] max-md:py-[60px] max-md:px-6" style={{ paddingBottom: '120px' }}>
        <div className="section-label font-mono text-[9px] tracking-[4px] text-accent uppercase mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">Contact</div>
        <div className="contact-grid reveal grid grid-cols-2 gap-[80px] items-center max-md:grid-cols-1 max-md:gap-8">
          <div>
            <h2 className="contact-headline font-serif text-[clamp(32px,4.5vw,56px)] max-md:text-[clamp(30px,8vw,50px)] font-normal leading-[1.1] mb-5">
              Let's make<br />something <em className="italic text-accent">good.</em>
            </h2>
            <p className="contact-body text-[13px] leading-[1.95] text-muted mb-9">
              Available for shoots, campaigns, collabs, and creative projects.
              Based in Kingston and Toronto — Bangalore May to September.
              I respond to every message.
            </p>
            <div className="contact-links flex flex-col">
              <a href="mailto:tishab740@gmail.com" className="contact-link flex items-center gap-4 text-ink-soft text-[13px] py-[14px] border-b border-border hover:text-accent transition-colors duration-200">
                <span className="contact-link-label font-mono text-[9px] tracking-[2px] text-muted uppercase min-width-[76px]">Email</span>
                tishab740@gmail.com
              </a>
              <a href="https://instagram.com/tisha_189" className="contact-link flex items-center gap-4 text-ink-soft text-[13px] py-[14px] border-b border-border hover:text-accent transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <span className="contact-link-label font-mono text-[9px] tracking-[2px] text-muted uppercase min-width-[76px]">Instagram</span>
                @tisha_189
              </a>
              <a href="https://tiktok.com/@tisha_189" className="contact-link flex items-center gap-4 text-ink-soft text-[13px] py-[14px] border-b border-border hover:text-accent transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <span className="contact-link-label font-mono text-[9px] tracking-[2px] text-muted uppercase min-width-[76px]">TikTok</span>
                @tisha_189
              </a>
              <a href="https://www.linkedin.com/in/tisha-bandyopadhyay" className="contact-link flex items-center gap-4 text-ink-soft text-[13px] py-[14px] border-b border-border hover:text-accent transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                <span className="contact-link-label font-mono text-[9px] tracking-[2px] text-muted uppercase min-width-[76px]">LinkedIn</span>
                linkedin.com/in/tisha-bandyopadhyay
              </a>
            </div>
          </div>
          <div className="contact-form-side reveal reveal-delay-1 flex flex-col gap-[18px]">
            <div className="form-row flex flex-col gap-[7px]">
              <label className="form-label font-mono text-[9px] tracking-[2px] text-muted uppercase">Your name</label>
              <input className="form-input bg-transparent border-none border-b border-border py-[11px] font-body text-[13px] text-ink outline-none focus:border-accent placeholder:text-sand w-full" type="text" placeholder="First Last" />
            </div>
            <div className="form-row flex flex-col gap-[7px]">
              <label className="form-label font-mono text-[9px] tracking-[2px] text-muted uppercase">Email</label>
              <input className="form-input bg-transparent border-none border-b border-border py-[11px] font-body text-[13px] text-ink outline-none focus:border-accent placeholder:text-sand w-full" type="email" placeholder="you@agency.com" />
            </div>
            <div className="form-row flex flex-col gap-[7px]">
              <label className="form-label font-mono text-[9px] tracking-[2px] text-muted uppercase">What's this about</label>
              <input className="form-input bg-transparent border-none border-b border-border py-[11px] font-body text-[13px] text-ink outline-none focus:border-accent placeholder:text-sand w-full" type="text" placeholder="Shoot / Campaign / Test / etc." />
            </div>
            <div className="form-row flex flex-col gap-[7px]">
              <label className="form-label font-mono text-[9px] tracking-[2px] text-muted uppercase">Tell me more</label>
              <textarea className="form-input form-textarea bg-transparent border-none border-b border-border py-[11px] font-body text-[13px] text-ink outline-none focus:border-accent placeholder:text-sand w-full resize-none h-[72px]" placeholder="Tell me about the project..."></textarea>
            </div>
            <button className="btn-primary bg-ink text-warm-white py-[13px] px-[36px] font-mono text-[10px] tracking-[2px] uppercase border border-ink hover:bg-accent-mid hover:border-accent-mid transition-all duration-250 self-start border-none" onClick={() => alert('Connect to Formspree — formspree.io is free, takes 2 mins.')}>
              Send →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink py-11 px-6 md:px-12 flex justify-between items-center max-md:flex-col max-md:gap-5 max-md:text-center">
        <span className="footer-name font-mono text-[16px] tracking-[3px] uppercase text-warm-white">Tisha Bando</span>
        <span className="footer-copy font-mono text-[9px] tracking-[2px] text-[#2a4d6e] uppercase">© 2026 — All rights reserved</span>
        <div className="footer-socials flex gap-6 max-md:flex-wrap max-md:justify-center max-md:gap-4">
          <a href="https://instagram.com/tisha_189" className="footer-social font-mono text-[9px] tracking-[2px] text-[#2a4d6e] uppercase hover:text-accent transition-colors duration-200" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://tiktok.com/@tisha_189" className="footer-social font-mono text-[9px] tracking-[2px] text-[#2a4d6e] uppercase hover:text-accent transition-colors duration-200" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://www.linkedin.com/in/tisha-bandyopadhyay" className="footer-social font-mono text-[9px] tracking-[2px] text-[#2a4d6e] uppercase hover:text-accent transition-colors duration-200" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:tishab740@gmail.com" className="footer-social font-mono text-[9px] tracking-[2px] text-[#2a4d6e] uppercase hover:text-accent transition-colors duration-200">Email</a>
        </div>
      </footer>

      {/* MEASUREMENTS MODAL */}
      <div id="measModal" className={`meas-modal-overlay flex items-center justify-center transition-all duration-300 ${isMeasOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={(e) => { if (e.target === e.currentTarget) setIsMeasOpen(false) }}>
        <div className="meas-modal-card bg-white p-[44px_52px] max-md:p-[32px_28px] max-sm:p-[24px_18px] min-w-[340px] max-md:min-w-0 max-md:w-[calc(100vw-48px)] max-sm:w-[calc(100vw-32px)] max-md:max-h-[88dvh] max-md:overflow-y-auto shadow-[0_32px_80px_rgba(10,30,50,0.55),0_8px_24px_rgba(10,30,50,0.3)] animate-modalPop">
          <div className="ab2-meas-panel-title font-mono text-[10px] tracking-[3px] uppercase text-accent mb-5 pb-4 border-b border-border">Measurements</div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">Height</span><span className="ab2-meas-panel-val text-[16px] text-ink">5'0"</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">Age</span><span className="ab2-meas-panel-val text-[16px] text-ink">21</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">Size</span><span className="ab2-meas-panel-val text-[16px] text-ink">S – M</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">Shoe</span><span className="ab2-meas-panel-val text-[16px] text-ink">5 US / 7 UK</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">Eyes</span><span className="ab2-meas-panel-val text-[16px] text-ink">Russet Brown</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">Hair</span><span className="ab2-meas-panel-val text-[16px] text-ink">Black</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">Bust</span><span className="ab2-meas-panel-val text-[16px] text-ink">34"</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">Waist</span><span className="ab2-meas-panel-val text-[16px] text-ink">27"</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border:last-child border-b-none"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">Hips</span><span className="ab2-meas-panel-val text-[16px] text-ink">35"</span></div>
        </div>
      </div>

      {/* FOOD PLATE INFINITE GALLERY OVERLAY */}
      <div id="foodGallery" className={`fg-overlay flex items-center justify-center transition-all duration-300 ${isFoodOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={(e) => { if (e.target === e.currentTarget || e.target.classList.contains('fg-overlay')) closeFoodGallery() }}>
        <div className="fg-track" id="fgTrack" ref={trackRef} onScroll={onFoodTrackScroll}>
          {/* Set 1: clone */}
          {foodPlates.map((plate, i) => (
            <div key={`food-clone1-${i}`} className={`fg-item ${activeFoodIdx === i ? 'fg-active' : ''}`} data-idx={String(i)}>
              <img src={plate.src} alt={plate.label} />
            </div>
          ))}
          {/* Set 2: original */}
          {foodPlates.map((plate, i) => (
            <div key={`food-orig-${i}`} className={`fg-item ${activeFoodIdx === i ? 'fg-active' : ''}`} data-idx={String(i)}>
              <img src={plate.src} alt={plate.label} />
            </div>
          ))}
          {/* Set 3: clone */}
          {foodPlates.map((plate, i) => (
            <div key={`food-clone2-${i}`} className={`fg-item ${activeFoodIdx === i ? 'fg-active' : ''}`} data-idx={String(i)}>
              <img src={plate.src} alt={plate.label} />
            </div>
          ))}
        </div>
      </div>

      {/* INTEREST CARD MODAL */}
      <div id="cardModal" className={`ic-overlay flex items-center justify-center transition-all duration-300 ${activeCardIndex !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={(e) => { if (e.target === e.currentTarget) setActiveCardIndex(null) }}>
        <button className="ic-nav" onClick={() => cardModalNav(-1)}>&#8249;</button>
        <div className="ic-inner">
          <div className="ic-img-wrap">
            {activeCardIndex !== null && (
              <img id="cardModalImg" src={interestCards[activeCardIndex].src} alt={interestCards[activeCardIndex].label} className="transition-opacity duration-[180ms]" />
            )}
          </div>
          <span id="cardModalLbl" className="ic-lbl">{activeCardIndex !== null ? interestCards[activeCardIndex].label : ''}</span>
        </div>
        <button className="ic-nav" onClick={() => cardModalNav(1)}>&#8250;</button>
      </div>
    </>
  )
}

export default App
