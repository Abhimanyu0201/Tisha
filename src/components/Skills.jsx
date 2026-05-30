import React from 'react'

const Skills = () => {
  return (
    <section id="skills" className="py-[100px] px-12 max-w-[1200px] mx-auto pb-10 max-md:py-[60px] max-md:px-6">
      <div className="section-label font-mono text-[9px] tracking-[4px] text-accent uppercase mb-12 flex items-center gap-4 after:content-[''] after:flex-1 after:h-[1px] after:bg-border">Skills</div>
      <h2 className="reveal font-serif text-[clamp(26px,2.8vw,40px)] font-normal leading-[1.2] mb-7">
        My expertise & <em className="italic text-accent">toolkit.</em>
      </h2>
      
      <div className="reveal grid grid-cols-3 gap-8 mt-12 max-lg:grid-cols-1">
        {/* Core Skills */}
        <div className="bg-warm-white p-8 border border-border/60 hover:border-accent/40 transition-all duration-300 rounded-lg">
          <h3 className="font-mono text-[11px] tracking-[3px] text-accent uppercase mb-6 pb-2 border-b border-border/40">Core Skills</h3>
          <ul className="flex flex-col gap-4">
            {[
              "Social Media Marketing",
              "Brand Strategy",
              "Influencer Marketing",
              "Client Servicing",
              "Public Relations"
            ].map((skill, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                <span className="text-[13px] text-ink font-body font-light tracking-[0.2px]">{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div className="bg-warm-white p-8 border border-border/60 hover:border-accent/40 transition-all duration-300 rounded-lg">
          <h3 className="font-mono text-[11px] tracking-[3px] text-accent uppercase mb-6 pb-2 border-b border-border/40">Tools</h3>
          <div className="flex flex-wrap gap-2.5">
            {[
              "Meta Ads Manager",
              "Google Ads",
              "Mailchimp",
              "Canva",
              "WordPress",
              "Microsoft Office"
            ].map((tool, index) => (
              <span key={index} className="px-3.5 py-1.5 bg-cream text-ink-soft rounded-full text-[11px] font-mono tracking-[0.5px] border border-border/20 hover:bg-accent-soft hover:text-accent-mid transition-all duration-200">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-warm-white p-8 border border-border/60 hover:border-accent/40 transition-all duration-300 rounded-lg">
          <h3 className="font-mono text-[11px] tracking-[3px] text-accent uppercase mb-6 pb-2 border-b border-border/40">Soft Skills</h3>
          <ul className="flex flex-col gap-4">
            {[
              "Communication",
              "Time Management",
              "Problem Solving",
              "Teamwork",
              "Leadership"
            ].map((soft, index) => (
              <li key={index} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-ink font-body font-light">{soft}</span>
                </div>
                <div className="w-full h-1 bg-border/40 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${85 + (index * 3) % 15}%` }}></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default React.memo(Skills)
