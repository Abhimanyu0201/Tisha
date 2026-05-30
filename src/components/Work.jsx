import React from 'react'
import { photo, workProjects } from '../data/portfolioData'

const Work = () => {
  return (
    <>
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
                <img src={photo(0)} alt={workProjects[0].title} loading="lazy" className="w-full h-full object-cover" />
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
                <img src={photo(1)} alt={workProjects[1].title} loading="lazy" className="w-full h-full object-cover object-center" />
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
                <img src={photo(2)} alt={workProjects[2].title} loading="lazy" className="campus-city-img w-full h-full object-cover" />
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
                <img src={photo(3)} alt={workProjects[3].title} loading="lazy" className="w-full h-full object-cover object-center" />
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
                <img src={photo(4)} alt={workProjects[4].title} loading="lazy" className="w-full h-full object-cover object-center" />
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
                <img src={photo(0)} alt="Khushali Bochiwal" loading="lazy" className="w-full h-full object-cover object-[center_top]" />
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
    </>
  )
}

export default React.memo(Work)
