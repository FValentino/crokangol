import React from "react"

export function CandyMascotLeft({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} fill="none">
      <ellipse cx="60" cy="150" rx="35" ry="6" fill="#E8457B" opacity="0.15" />
      <path d="M35 25 L28 8 L40 15 L52 8 L45 25Z" fill="#E8457B" />
      <path d="M85 25 L78 8 L90 15 L102 8 L95 25Z" fill="#E8457B" />
      <rect x="25" y="25" width="70" height="100" rx="30" fill="#FFF8F2" />
      <rect x="52" y="25" width="16" height="100" rx="8" fill="white" opacity="0.15" />
      <rect x="25" y="48" width="70" height="8" rx="4" fill="#E8457B" />
      <rect x="25" y="66" width="70" height="8" rx="4" fill="#FFD23F" />
      <rect x="25" y="84" width="70" height="8" rx="4" fill="#E8457B" />
      <rect x="25" y="102" width="70" height="8" rx="4" fill="#FFD23F" />
      <path d="M35 125 L28 145 L40 135 L52 145 L45 125Z" fill="#E8457B" />
      <path d="M85 125 L78 145 L90 135 L102 145 L95 125Z" fill="#E8457B" />
      <circle cx="40" cy="58" r="4.5" fill="#333" />
      <circle cx="80" cy="58" r="4.5" fill="#333" />
      <circle cx="38.5" cy="56" r="1.5" fill="white" />
      <circle cx="78.5" cy="56" r="1.5" fill="white" />
      <path d="M47 72 Q60 84 73 72" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="32" cy="68" rx="7" ry="4" fill="#F7D7E6" opacity="0.7" />
      <ellipse cx="88" cy="68" rx="7" ry="4" fill="#F7D7E6" opacity="0.7" />
      <path d="M20 65 Q10 58 8 50" stroke="#333" strokeWidth="3" strokeLinecap="round" />
      <circle cx="8" cy="50" r="3.5" fill="#E8457B" />
      <path d="M100 65 Q110 58 112 50" stroke="#333" strokeWidth="3" strokeLinecap="round" />
      <circle cx="112" cy="50" r="3.5" fill="#E8457B" />
    </svg>
  )
}

export function CandyMascotRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} fill="none">
      <ellipse cx="60" cy="150" rx="35" ry="6" fill="#FFD23F" opacity="0.2" />
      <path d="M35 25 L28 8 L40 15 L52 8 L45 25Z" fill="#FFD23F" />
      <path d="M85 25 L78 8 L90 15 L102 8 L95 25Z" fill="#FFD23F" />
      <rect x="25" y="25" width="70" height="100" rx="30" fill="#FFF8F2" />
      <rect x="52" y="25" width="16" height="100" rx="8" fill="white" opacity="0.15" />
      <rect x="25" y="48" width="70" height="8" rx="4" fill="#FFD23F" />
      <rect x="25" y="66" width="70" height="8" rx="4" fill="#E8457B" />
      <rect x="25" y="84" width="70" height="8" rx="4" fill="#FFD23F" />
      <rect x="25" y="102" width="70" height="8" rx="4" fill="#E8457B" />
      <path d="M35 125 L28 145 L40 135 L52 145 L45 125Z" fill="#FFD23F" />
      <path d="M85 125 L78 145 L90 135 L102 145 L95 125Z" fill="#FFD23F" />
      <circle cx="40" cy="58" r="4.5" fill="#333" />
      <circle cx="80" cy="58" r="4.5" fill="#333" />
      <circle cx="38.5" cy="56" r="1.5" fill="white" />
      <circle cx="78.5" cy="56" r="1.5" fill="white" />
      <path d="M47 72 Q60 84 73 72" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="32" cy="68" rx="7" ry="4" fill="#F7D7E6" opacity="0.7" />
      <ellipse cx="88" cy="68" rx="7" ry="4" fill="#F7D7E6" opacity="0.7" />
      <path d="M20 65 Q10 58 8 50" stroke="#333" strokeWidth="3" strokeLinecap="round" />
      <circle cx="8" cy="50" r="3.5" fill="#FFD23F" />
      <path d="M100 65 Q110 58 112 50" stroke="#333" strokeWidth="3" strokeLinecap="round" />
      <circle cx="112" cy="50" r="3.5" fill="#FFD23F" />
    </svg>
  )
}

export function LollipopSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 110" className={className} fill="none">
      <ellipse cx="20" cy="100" rx="6" ry="3" fill="#E8457B" opacity="0.15" />
      <rect x="18" y="52" width="4" height="48" rx="2" fill="#E8C42E" />
      <rect x="19" y="52" width="2" height="48" rx="1" fill="white" opacity="0.15" />
      <circle cx="20" cy="30" r="22" fill="#E8457B" />
      <circle cx="20" cy="30" r="22" fill="url(#lollipopShine)" opacity="0.3" />
      <circle cx="12" cy="22" r="5" fill="#FFD23F" />
      <circle cx="28" cy="20" r="4" fill="#FFF8F2" />
      <circle cx="14" cy="38" r="4" fill="#FFD23F" />
      <circle cx="26" cy="40" r="3.5" fill="#FFF8F2" />
      <circle cx="20" cy="28" r="2" fill="#FFD23F" />
      <defs>
        <radialGradient id="lollipopShine" cx="30%" cy="25%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
