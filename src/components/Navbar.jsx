import React from 'react'

const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-6 px-6 md:px-12 backdrop-blur-[2px] bg-linear-to-b from-[#091e2d]/25 to-transparent">
        <span className="nav-name text-[11px] font-mono tracking-[3px] text-ink-soft uppercase opacity-0 animate-[fadeIn_0.8s_0.3s_forwards]">
          Khushali Bochiwal
        </span>
        <div
          className={`nav-links flex gap-8 max-md:fixed max-md:top-0 max-md:w-[min(72vw,280px)] max-md:h-dvh max-md:bg-warm-white max-md:flex-col max-md:justify-center max-md:items-start max-md:py-16 max-md:px-10 max-md:gap-9 max-md:transition-all max-md:duration-380 max-md:ease-out max-md:z-150 max-md:shadow-[-14px_0_48px_rgba(0,0,0,0.15)] ${
            isMobileMenuOpen ? 'max-md:right-0' : 'max-md:-right-full'
          }`}
          id="navLinks"
        >
          <a
            href="#about"
            className="font-mono text-[10px] tracking-[2px] text-muted uppercase hover:text-accent max-md:text-[13px] max-md:tracking-[3px] max-md:text-ink max-md:font-medium max-md:opacity-100 max-md:animate-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#skills"
            className="font-mono text-[10px] tracking-[2px] text-muted uppercase hover:text-accent max-md:text-[13px] max-md:tracking-[3px] max-md:text-ink max-md:font-medium max-md:opacity-100 max-md:animate-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Skills
          </a>
          <a
            href="#work"
            className="font-mono text-[10px] tracking-[2px] text-muted uppercase hover:text-accent max-md:text-[13px] max-md:tracking-[3px] max-md:text-ink max-md:font-medium max-md:opacity-100 max-md:animate-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Work
          </a>
          <a
            href="#services"
            className="font-mono text-[10px] tracking-[2px] text-muted uppercase hover:text-accent max-md:text-[13px] max-md:tracking-[3px] max-md:text-ink max-md:font-medium max-md:opacity-100 max-md:animate-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            What I Do
          </a>
          <a
            href="#contact"
            className="font-mono text-[10px] tracking-[2px] text-muted uppercase hover:text-accent max-md:text-[13px] max-md:tracking-[3px] max-md:text-ink max-md:font-medium max-md:opacity-100 max-md:animate-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
        <button
          className="nav-hamburger flex md:hidden flex-col gap-[5px] cursor-pointer bg-none border-none p-[6px_4px] z-200"
          id="navHamburger"
          aria-label="Menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span
            className={`w-[22px] h-[1.5px] transition-all duration-300 ${
              isMobileMenuOpen ? 'bg-ink rotate-45 translate-y-[6.5px]' : 'bg-white'
            }`}
          ></span>
          <span
            className={`w-[22px] h-[1.5px] transition-all duration-200 ${
              isMobileMenuOpen ? 'bg-ink opacity-0' : 'bg-white'
            }`}
          ></span>
          <span
            className={`w-[22px] h-[1.5px] transition-all duration-300 ${
              isMobileMenuOpen ? 'bg-ink -rotate-45 translate-y-[-6.5px]' : 'bg-white'
            }`}
          ></span>
        </button>
      </nav>
      <div
        className={`nav-backdrop fixed inset-0 z-140 bg-black/48 transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
        id="navBackdrop"
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
    </>
  )
}

export default React.memo(Navbar)
