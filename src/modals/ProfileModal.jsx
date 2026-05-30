import React from 'react'

const ProfileModal = ({ isOpen, onClose }) => {
  return (
    <div
      id="measModal"
      className={`meas-modal-overlay flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="meas-modal-card bg-white p-[44px_52px] max-md:p-[32px_28px] max-sm:p-[24px_18px] min-w-[340px] max-md:min-w-0 max-md:w-[calc(100vw-48px)] max-sm:w-[calc(100vw-32px)] max-md:max-h-[88dvh] max-md:overflow-y-auto shadow-[0_32px_80px_rgba(10,30,50,0.55),0_8px_24px_rgba(10,30,50,0.3)] animate-modalPop">
        <div className="ab2-meas-panel-title font-mono text-[10px] tracking-[3px] uppercase text-accent mb-5 pb-4 border-b border-border">
          Profile
        </div>
        <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border gap-4">
          <span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted shrink-0">
            Title
          </span>
          <span className="ab2-meas-panel-val text-[14px] text-ink text-right">
            Digital Marketer · Brand Strategy
          </span>
        </div>
        <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border">
          <span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">
            Location
          </span>
          <span className="ab2-meas-panel-val text-[16px] text-ink">
            Surat, Gujarat, India
          </span>
        </div>
        <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border gap-4">
          <span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted shrink-0">
            Education
          </span>
          <span className="ab2-meas-panel-val text-[14px] text-ink text-right">
            BBA — Bhagwan Mahavir College of Commerce, Surat
          </span>
        </div>
        <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border gap-4">
          <span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted shrink-0">
            Certification
          </span>
          <span className="ab2-meas-panel-val text-[14px] text-ink text-right">
            Post Graduation in Digital Marketing — IIDE
          </span>
        </div>
        <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border gap-4">
          <span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted shrink-0">
            Tools
          </span>
          <span className="ab2-meas-panel-val text-[14px] text-ink text-right">
            Meta Ads, Google Ads, Canva, Mailchimp, WordPress
          </span>
        </div>
        <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border gap-4">
          <span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted shrink-0">
            Skills
          </span>
          <span className="ab2-meas-panel-val text-[14px] text-ink text-right">
            Social Media · PR · Influencer · Client Servicing
          </span>
        </div>
        <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border">
          <span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">
            Email
          </span>
          <span className="ab2-meas-panel-val text-[16px] text-ink">
            khushali.bochiwal@gmail.com
          </span>
        </div>
        <div className="ab2-meas-panel-row flex justify-between items-center py-[13px] border-b border-border:last-child border-b-none">
          <span className="ab2-meas-panel-key font-mono text-[9px] tracking-[2px] uppercase text-muted">
            Phone
          </span>
          <span className="ab2-meas-panel-val text-[16px] text-ink">
            +91 8469395052
          </span>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ProfileModal)
