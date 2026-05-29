import { useState, useEffect, useRef, useCallback } from 'react'
import img2131 from './Photo/IMG_2131.webp'
import img2657 from './Photo/IMG_2657.webp'
import img3003 from './Photo/IMG_3003.webp'
import img4669 from './Photo/IMG_4669.webp'
import img6591 from './Photo/IMG_6591.webp'

const photos = [img2131, img2657, img3003, img4669, img6591]
const photo = (i) => photos[i % photos.length]

const interestCards = [
  { src: photo(0), label: 'SOCIAL MEDIA' },
  { src: photo(1), label: 'BRAND STRATEGY' },
  { src: photo(2), label: 'META ADS' },
  { src: photo(3), label: 'CONTENT' },
  { src: photo(4), label: 'INFLUENCER' },
]

const brandPlates = [
  { src: photo(0), label: 'Skoda', size: 'lg', tx: '385px', ty: '-62px', rot: '7deg', idx: 'R1' },
  { src: photo(1), label: 'Nykaa Luxe', size: 'sm', tx: '502px', ty: '-108px', rot: '-14deg', idx: 'R2' },
  { src: photo(2), label: 'Meta Ads', size: 'lg', tx: '418px', ty: '-158px', rot: '19deg', idx: 'R3' },
  { src: photo(3), label: 'Google Ads', size: 'sm', tx: '495px', ty: '-210px', rot: '-6deg', idx: 'R4' },
  { src: photo(4), label: 'Scribbld', size: 'lg', tx: '400px', ty: '-260px', rot: '12deg', idx: 'R5' },
  { src: photo(0), label: 'Saatchi', size: 'sm', tx: '488px', ty: '-302px', rot: '-10deg', idx: 'R6' },
]

const polaroids = [
  { src: photo(0), caption: 'Agency life', rot: '-5deg', delay: '0s', position: 'center bottom' },
  { src: photo(1), caption: 'Nykaa Luxe', rot: '2deg', delay: '0.12s' },
  { src: photo(2), caption: 'Skoda campaigns', rot: '-2deg', delay: '0.24s' },
  { src: photo(3), caption: 'Surat, Gujarat', rot: '5deg', delay: '0.36s' },
]

const workProjects = [
  { cat: 'Independent · Surat', title: 'Founder — Digital Marketing Consultant', period: 'Feb 2025 – Apr 2026' },
  { cat: 'Scribbld India', title: 'Brand Solutions Executive — Nykaa Luxe', period: 'Dec 2024 – Feb 2025' },
  { cat: 'Saatchi & Saatchi Propagate', title: 'Brand Associate — Skoda', period: 'Jul 2024 – Nov 2024' },
  { cat: 'Paid Media', title: 'Meta Ads — Reach & Conversions', period: 'Campaign performance' },
  { cat: 'Brand Building', title: 'Luxury & Automotive Strategy', period: 'End-to-end digital' },
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
        <span className="nav-name text-[11px] font-mono tracking-[3px] text-ink-soft uppercase opacity-0 animate-[fadeIn_0.8s_0.3s_forwards]">Khushali Bochiwal</span>
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
      <div
        id="bg-img6203"
        style={{ backgroundImage: `url(${photo(0)})` }}
      />

      {/* HERO */}
      <div
        className="hero min-h-screen relative overflow-hidden flex items-center justify-center"
        id="hero"
        style={{ backgroundImage: `url(${photo(1)})` }}
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

      {/* ABOUT */}
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
              <img src={photo(2)} alt="Khushali Bochiwal" className="w-full h-full object-cover object-[center_top] block" />
            </div>
          </div>

          {/* Row 2: What's in my world — 3-zone bag scene */}
          <div className="ab2-bag-section mb-24 max-md:mb-12">
            <div className="ab2-section-tag font-mono text-[9px] tracking-[4px] text-accent uppercase flex items-center gap-4 mb-[56px] after:content-[''] after:flex-1 after:h-[1px] after:bg-border">BRANDS & SKILLS</div>
            <div className="ab2-bag-scene" id="ab2BagScene">

              {/* Center: actual bag image */}
              <div className="ab2-bag-origin" onClick={fireScatter}>
                <img src={photo(3)} alt="Marketing toolkit" className="ab2-bag-img" />
              </div>

              {/* LEFT: Profile panel */}
              <div
                className={`ab2-bag-item ${isScatterPopped ? 'popped' : ''}`}
                style={{ '--tx': '-420px', '--ty': '-60px', '--rot': '-2deg' }}
                data-idx="L"
              >
                <div className="ab2-meas-panel" onClick={() => setIsMeasOpen(true)}>
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
                    <span className="ab2-meas-panel-val">khushali.bochiwal@gmail.com</span>
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
                  <div className="ab2-bag-card" onClick={() => setActiveCardIndex(i)}>
                    <img src={card.src} alt={card.label} />
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
                <img src={photo(0)} alt={workProjects[0].title} className="w-full h-full object-cover" />
              </div>
              <div className="work-card-overlay absolute inset-0 bg-linear-to-t from-[#081424]/72 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-82"></div>
              <div className="work-card-meta relative z-10 transition-all duration-300">
                <div className="work-card-cat font-mono text-[9px] tracking-[3px] text-[#7ec6e8] uppercase mb-[5px]">{workProjects[0].cat}</div>
                <div className="work-card-title font-serif text-[17px] text-warm-white font-normal">{workProjects[0].title}</div>
                <div className="work-card-period font-mono text-[8px] tracking-[2px] text-white/60 uppercase mt-1">{workProjects[0].period}</div>
              </div>
            </div>
            <div className="work-card wm-placeholder group relative overflow-hidden flex flex-col justify-end p-6 aspect-[16/9] max-md:min-h-[220px]">
              <div className="work-card-img absolute inset-0 flex items-center justify-center">
                <img src={photo(1)} alt={workProjects[1].title} className="w-full h-full object-cover object-center" />
              </div>
              <div className="work-card-overlay absolute inset-0 bg-linear-to-t from-[#081424]/72 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-82"></div>
              <div className="work-card-meta relative z-10 transition-all duration-300">
                <div className="work-card-cat font-mono text-[9px] tracking-[3px] text-[#7ec6e8] uppercase mb-[5px]">{workProjects[1].cat}</div>
                <div className="work-card-title font-serif text-[17px] text-warm-white font-normal">{workProjects[1].title}</div>
                <div className="work-card-period font-mono text-[8px] tracking-[2px] text-white/60 uppercase mt-1">{workProjects[1].period}</div>
              </div>
            </div>
          </div>
          <div className="wm-col narrow">
            <div className="work-card group relative overflow-hidden bg-cream flex flex-col justify-end p-6 aspect-[3/4] max-md:min-h-[220px]">
              <div className="work-card-img absolute inset-0 flex items-center justify-center">
                <img src={photo(2)} alt={workProjects[2].title} className="campus-city-img w-full h-full object-cover" />
              </div>
              <div className="work-card-overlay absolute inset-0 bg-linear-to-t from-[#081424]/72 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-82"></div>
              <div className="work-card-meta relative z-10 transition-all duration-300">
                <div className="work-card-cat font-mono text-[9px] tracking-[3px] text-[#7ec6e8] uppercase mb-[5px]">{workProjects[2].cat}</div>
                <div className="work-card-title font-serif text-[17px] text-warm-white font-normal">{workProjects[2].title}</div>
                <div className="work-card-period font-mono text-[8px] tracking-[2px] text-white/60 uppercase mt-1">{workProjects[2].period}</div>
              </div>
            </div>
            <div className="work-card group relative overflow-hidden bg-cream flex flex-col justify-end p-6 aspect-[3/4] max-md:min-h-[220px]">
              <div className="work-card-img absolute inset-0 flex items-center justify-center">
                <img src={photo(3)} alt={workProjects[3].title} className="w-full h-full object-cover object-center" />
              </div>
              <div className="work-card-overlay absolute inset-0 bg-linear-to-t from-[#081424]/72 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-82"></div>
              <div className="work-card-meta relative z-10 transition-all duration-300">
                <div className="work-card-cat font-mono text-[9px] tracking-[3px] text-[#7ec6e8] uppercase mb-[5px]">{workProjects[3].cat}</div>
                <div className="work-card-title font-serif text-[17px] text-warm-white font-normal">{workProjects[3].title}</div>
                <div className="work-card-period font-mono text-[8px] tracking-[2px] text-white/60 uppercase mt-1">{workProjects[3].period}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Masonry row 2 — equal 50 / 50 */}
        <div className="work-masonry reveal reveal-delay-1 max-md:flex-col max-md:gap-[14px]">
          <div className="wm-col equal">
            <div className="work-card group relative overflow-hidden bg-cream flex flex-col justify-end p-6 aspect-[3/4] max-md:min-h-[220px]">
              <div className="work-card-img absolute inset-0 flex items-center justify-center">
                <img src={photo(4)} alt={workProjects[4].title} className="w-full h-full object-cover object-center" />
              </div>
              <div className="work-card-overlay absolute inset-0 bg-linear-to-t from-[#081424]/72 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-82"></div>
              <div className="work-card-meta relative z-10 transition-all duration-300">
                <div className="work-card-cat font-mono text-[9px] tracking-[3px] text-[#7ec6e8] uppercase mb-[5px]">{workProjects[4].cat}</div>
                <div className="work-card-title font-serif text-[17px] text-warm-white font-normal">{workProjects[4].title}</div>
                <div className="work-card-period font-mono text-[8px] tracking-[2px] text-white/60 uppercase mt-1">{workProjects[4].period}</div>
              </div>
            </div>
          </div>
          <div className="wm-col equal">
            <div className="work-card group relative overflow-hidden bg-cream flex flex-col justify-end p-6 aspect-[4/3] max-md:min-h-[220px]">
              <div className="work-card-img absolute inset-0 flex items-center justify-center">
                <img src={photo(0)} alt="Khushali Bochiwal" className="w-full h-full object-cover object-[center_top]" />
              </div>
              <div className="work-card-overlay absolute inset-0 bg-linear-to-t from-[#081424]/72 to-transparent opacity-55 transition-opacity duration-300 group-hover:opacity-82"></div>
              <div className="work-card-meta relative z-10 transition-all duration-300">
                <div className="work-card-cat font-mono text-[9px] tracking-[3px] text-[#7ec6e8] uppercase mb-[5px]">Client Servicing</div>
                <div className="work-card-title font-serif text-[17px] text-warm-white font-normal">Agency & Independent Consulting</div>
                <div className="work-card-period font-mono text-[8px] tracking-[2px] text-white/60 uppercase mt-1">Scribbld · Saatchi · Propagate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <div className="quote-section reveal py-20 px-12 text-center border-t border-b border-border w-full max-md:py-14 max-md:px-7">
        <p className="big-quote font-serif text-[clamp(20px,2.5vw,34px)] max-md:text-[clamp(16px,4.5vw,24px)] font-normal italic leading-[1.55] max-w-[680px] mx-auto mb-5 text-ink-soft">
          " Building brand presence, driving engagement, and delivering <span className="text-accent">measurable</span> campaign outcomes."
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
            <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Social Media Marketing</div>
            <div className="offer-desc text-[12px] leading-[1.85] text-muted">End-to-end social management, reels, campaign calendars, and premium content for luxury and lifestyle brands.</div>
          </div>
          <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-[350ms] ease-out hover:bg-cream hover:-translate-y-[3px]">
            <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">02</div>
            <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Brand Strategy</div>
            <div className="offer-desc text-[12px] leading-[1.85] text-muted">Positioning, digital presence, and campaign planning — from store launches to full brand activations.</div>
          </div>
          <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-[350ms] ease-out hover:bg-cream hover:-translate-y-[3px]">
            <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">03</div>
            <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Paid Advertising</div>
            <div className="offer-desc text-[12px] leading-[1.85] text-muted">Meta Ads and Google Ads campaigns focused on reach, engagement, and conversions — optimized from insights.</div>
          </div>
          <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-[350ms] ease-out hover:bg-cream hover:-translate-y-[3px]">
            <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">04</div>
            <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Influencer Marketing</div>
            <div className="offer-desc text-[12px] leading-[1.85] text-muted">Creator partnerships and influencer-led campaigns aligned with brand goals and audience growth.</div>
          </div>
          <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-[350ms] ease-out hover:bg-cream hover:-translate-y-[3px]">
            <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">05</div>
            <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Client Servicing & PR</div>
            <div className="offer-desc text-[12px] leading-[1.85] text-muted">Client acquisition, onboarding, communication, and smooth campaign execution across agency environments.</div>
          </div>
          <div className="offer-cell bg-warm-white p-[36px_28px] transition-all duration-[350ms] ease-out hover:bg-cream hover:-translate-y-[3px]">
            <div className="offer-num font-serif text-[36px] color-border mb-[18px] leading-none text-border">06</div>
            <div className="offer-title text-[14px] font-medium text-ink mb-[10px] tracking-[0.2px]">Content Strategy</div>
            <div className="offer-desc text-[12px] leading-[1.85] text-muted">Content calendars, creative direction with teams, and performance-led storytelling for emerging brands.</div>
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
              <input className="form-input bg-transparent border-none border-b border-border py-[11px] font-body text-[13px] text-ink outline-none focus:border-accent placeholder:text-sand w-full" type="text" placeholder="First Last" />
            </div>
            <div className="form-row flex flex-col gap-[7px]">
              <label className="form-label font-mono text-[9px] tracking-[2px] text-muted uppercase">Email</label>
              <input className="form-input bg-transparent border-none border-b border-border py-[11px] font-body text-[13px] text-ink outline-none focus:border-accent placeholder:text-sand w-full" type="email" placeholder="you@agency.com" />
            </div>
            <div className="form-row flex flex-col gap-[7px]">
              <label className="form-label font-mono text-[9px] tracking-[2px] text-muted uppercase">What's this about</label>
              <input className="form-input bg-transparent border-none border-b border-border py-[11px] font-body text-[13px] text-ink outline-none focus:border-accent placeholder:text-sand w-full" type="text" placeholder="Social media / Paid ads / Brand strategy" />
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
        <span className="footer-name font-mono text-[16px] tracking-[3px] uppercase text-warm-white">Khushali Bochiwal</span>
        <span className="footer-copy font-mono text-[9px] tracking-[2px] text-[#2a4d6e] uppercase">© 2026 — All rights reserved</span>
        <div className="footer-socials flex gap-6 max-md:flex-wrap max-md:justify-center max-md:gap-4">
          <a href="mailto:khushali.bochiwal@gmail.com" className="footer-social font-mono text-[9px] tracking-[2px] text-[#2a4d6e] uppercase hover:text-accent transition-colors duration-200">Email</a>
          <a href="tel:+918469395052" className="footer-social font-mono text-[9px] tracking-[2px] text-[#2a4d6e] uppercase hover:text-accent transition-colors duration-200">Phone</a>
        </div>
      </footer>

      {/* PROFILE MODAL */}
      <div id="measModal" className={`meas-modal-overlay flex items-center justify-center transition-all duration-300 ${isMeasOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={(e) => { if (e.target === e.currentTarget) setIsMeasOpen(false) }}>
        <div className="meas-modal-card bg-white p-[44px_52px] max-md:p-[32px_28px] max-sm:p-[24px_18px] min-w-[340px] max-md:min-w-0 max-md:w-[calc(100vw-48px)] max-sm:w-[calc(100vw-32px)] max-md:max-h-[88dvh] max-md:overflow-y-auto shadow-[0_32px_80px_rgba(10,30,50,0.55),0_8px_24px_rgba(10,30,50,0.3)] animate-modalPop">
          <div className="ab2-meas-panel-title font-mono text-[10px] tracking-[3px] uppercase text-accent mb-5 pb-4 border-b border-border">Profile</div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border gap-4"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted shrink-0">Title</span><span className="ab2-meas-panel-val text-[14px] text-ink text-right">Digital Marketer · Brand Strategy</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">Location</span><span className="ab2-meas-panel-val text-[16px] text-ink">Surat, Gujarat, India</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border gap-4"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted shrink-0">Education</span><span className="ab2-meas-panel-val text-[14px] text-ink text-right">BBA — Bhagwan Mahavir College of Commerce, Surat</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border gap-4"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted shrink-0">Certification</span><span className="ab2-meas-panel-val text-[14px] text-ink text-right">Post Graduation in Digital Marketing — IIDE</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border gap-4"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted shrink-0">Tools</span><span className="ab2-meas-panel-val text-[14px] text-ink text-right">Meta Ads, Google Ads, Canva, Mailchimp, WordPress</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border gap-4"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted shrink-0">Skills</span><span className="ab2-meas-panel-val text-[14px] text-ink text-right">Social Media · PR · Influencer · Client Servicing</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">Email</span><span className="ab2-meas-panel-val text-[16px] text-ink">khushali.bochiwal@gmail.com</span></div>
          <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border:last-child border-b-none"><span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">Phone</span><span className="ab2-meas-panel-val text-[16px] text-ink">+91 8469395052</span></div>
        </div>
      </div>

      {/* FOOD PLATE INFINITE GALLERY OVERLAY */}
      <div id="foodGallery" className={`fg-overlay flex items-center justify-center transition-all duration-300 ${isFoodOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={(e) => { if (e.target === e.currentTarget || e.target.classList.contains('fg-overlay')) closeFoodGallery() }}>
        <div className="fg-track" id="fgTrack" ref={trackRef} onScroll={onFoodTrackScroll}>
          {/* Set 1: clone */}
          {brandPlates.map((plate, i) => (
            <div key={`food-clone1-${i}`} className={`fg-item ${activeFoodIdx === i ? 'fg-active' : ''}`} data-idx={String(i)}>
              <img src={plate.src} alt={plate.label} />
            </div>
          ))}
          {/* Set 2: original */}
          {brandPlates.map((plate, i) => (
            <div key={`food-orig-${i}`} className={`fg-item ${activeFoodIdx === i ? 'fg-active' : ''}`} data-idx={String(i)}>
              <img src={plate.src} alt={plate.label} />
            </div>
          ))}
          {/* Set 3: clone */}
          {brandPlates.map((plate, i) => (
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
