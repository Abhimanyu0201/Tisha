import img2131 from '../Photo/IMG_2131.webp'
import img2657 from '../Photo/IMG_2657.webp'
import img3003 from '../Photo/IMG_3003.webp'
import img4669 from '../Photo/IMG_4669.webp'
import img6591 from '../Photo/IMG_6591.webp'

export const photos = [img2131, img2657, img3003, img4669, img6591]
export const photo = (i) => photos[i % photos.length]

export const interestCards = [
  { src: photo(0), label: 'SOCIAL MEDIA' },
  { src: photo(1), label: 'BRAND STRATEGY' },
  { src: photo(2), label: 'META ADS' },
  { src: photo(3), label: 'CONTENT' },
  { src: photo(4), label: 'INFLUENCER' },
]

export const brandPlates = [
  { src: photo(0), label: 'Skoda', size: 'lg', tx: '385px', ty: '-62px', rot: '7deg', idx: 'R1' },
  { src: photo(1), label: 'Nykaa Luxe', size: 'sm', tx: '502px', ty: '-108px', rot: '-14deg', idx: 'R2' },
  { src: photo(2), label: 'Meta Ads', size: 'lg', tx: '418px', ty: '-158px', rot: '19deg', idx: 'R3' },
  { src: photo(3), label: 'Google Ads', size: 'sm', tx: '495px', ty: '-210px', rot: '-6deg', idx: 'R4' },
  { src: photo(4), label: 'Scribbld', size: 'lg', tx: '400px', ty: '-260px', rot: '12deg', idx: 'R5' },
  { src: photo(0), label: 'Saatchi', size: 'sm', tx: '488px', ty: '-302px', rot: '-10deg', idx: 'R6' },
]

export const polaroids = [
  { src: photo(0), caption: 'Agency life', rot: '-5deg', delay: '0s', position: 'center bottom' },
  { src: photo(1), caption: 'Nykaa Luxe', rot: '2deg', delay: '0.12s' },
  { src: photo(2), caption: 'Skoda campaigns', rot: '-2deg', delay: '0.24s' },
  { src: photo(3), caption: 'Surat, Gujarat', rot: '5deg', delay: '0.36s' },
]

export const workProjects = [
  { cat: 'Independent · Surat', title: 'Founder — Digital Marketing Consultant', period: 'Feb 2025 – Apr 2026' },
  { cat: 'Scribbld India', title: 'Brand Solutions Executive — Nykaa Luxe', period: 'Dec 2024 – Feb 2025' },
  { cat: 'Saatchi & Saatchi Propagate', title: 'Brand Associate — Skoda', period: 'Jul 2024 – Nov 2024' },
  { cat: 'Paid Media', title: 'Meta Ads — Reach & Conversions', period: 'Campaign performance' },
  { cat: 'Brand Building', title: 'Luxury & Automotive Strategy', period: 'End-to-end digital' },
]
