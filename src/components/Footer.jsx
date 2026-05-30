import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-ink py-11 px-6 md:px-12 flex justify-between items-center max-md:flex-col max-md:gap-5 max-md:text-center">
      <span className="footer-name font-mono text-[16px] tracking-[3px] uppercase text-warm-white">Khushali Bochiwal</span>
      <span className="footer-copy font-mono text-[9px] tracking-[2px] text-[#2a4d6e] uppercase">© 2026 — All rights reserved</span>
      <div className="footer-socials flex gap-6 max-md:flex-wrap max-md:justify-center max-md:gap-4">
        <a href="mailto:khushali.bochiwal@gmail.com" className="footer-social font-mono text-[9px] tracking-[2px] text-[#2a4d6e] uppercase hover:text-accent transition-colors duration-200">Email</a>
        <a href="tel:+918469395052" className="footer-social font-mono text-[9px] tracking-[2px] text-[#2a4d6e] uppercase hover:text-accent transition-colors duration-200">Phone</a>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
