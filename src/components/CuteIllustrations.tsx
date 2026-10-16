import React from 'react';

/**
 * Handcrafted vector illustrations for the cute characters shown across the chapters
 */

export const BearOnEnvelope: React.FC<{ className?: string }> = ({ className = "w-32 h-32" }) => (
  <svg viewBox="0 0 160 160" className={`overflow-visible ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Soft shadow */}
    <ellipse cx="80" cy="148" rx="45" ry="8" fill="rgba(0,0,0,0.06)" />
    
    {/* Left Ear */}
    <circle cx="50" cy="48" r="16" fill="#c68a4c" stroke="#875323" strokeWidth="3" />
    <circle cx="50" cy="48" r="9" fill="#f8b4d9" />
    
    {/* Right Ear */}
    <circle cx="110" cy="48" r="16" fill="#c68a4c" stroke="#875323" strokeWidth="3" />
    <circle cx="110" cy="48" r="9" fill="#f8b4d9" />
    
    {/* Bear Body */}
    <ellipse cx="80" cy="108" rx="36" ry="32" fill="#c68a4c" stroke="#875323" strokeWidth="3" />
    <ellipse cx="80" cy="112" rx="22" ry="18" fill="#f4d2a9" />

    {/* Feet */}
    <ellipse cx="60" cy="136" rx="14" ry="10" fill="#c68a4c" stroke="#875323" strokeWidth="3" />
    <ellipse cx="100" cy="136" rx="14" ry="10" fill="#c68a4c" stroke="#875323" strokeWidth="3" />

    {/* Bear Head */}
    <ellipse cx="80" cy="68" rx="38" ry="32" fill="#d99857" stroke="#875323" strokeWidth="3" />
    
    {/* Snout */}
    <ellipse cx="80" cy="76" rx="16" ry="12" fill="#fdeed9" />
    <ellipse cx="80" cy="72" rx="5" ry="3.5" fill="#542e0c" />
    <path d="M80 75.5V81M76 80Q80 84 84 80" stroke="#542e0c" strokeWidth="2.2" strokeLinecap="round" />

    {/* Eyes */}
    <circle cx="66" cy="64" r="4.5" fill="#2d1706" />
    <circle cx="64.5" cy="62.5" r="1.5" fill="#ffffff" />
    <circle cx="94" cy="64" r="4.5" fill="#2d1706" />
    <circle cx="92.5" cy="62.5" r="1.5" fill="#ffffff" />

    {/* Rosy Cheeks */}
    <ellipse cx="58" cy="74" rx="6" ry="4" fill="#fb7185" opacity="0.65" />
    <ellipse cx="102" cy="74" rx="6" ry="4" fill="#fb7185" opacity="0.65" />

    {/* Arms holding front */}
    <ellipse cx="62" cy="98" rx="10" ry="15" transform="rotate(25 62 98)" fill="#d99857" stroke="#875323" strokeWidth="3" />
    <ellipse cx="98" cy="98" rx="10" ry="15" transform="rotate(-25 98 98)" fill="#d99857" stroke="#875323" strokeWidth="3" />
  </svg>
);

export const BearWithHearts: React.FC<{ className?: string }> = ({ className = "w-28 h-28" }) => (
  <svg viewBox="0 0 160 160" className={`overflow-visible ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="148" rx="42" ry="7" fill="rgba(0,0,0,0.06)" />
    
    {/* Floating little hearts */}
    <path d="M36 30 C36 24 43 20 48 26 C53 20 60 24 60 30 C60 38 48 45 48 45 C48 45 36 38 36 30 Z" fill="#f43f5e" opacity="0.8" />
    <path d="M112 40 C112 35 118 32 122 36 C126 32 132 35 132 40 C132 46 122 52 122 52 C122 52 112 46 112 40 Z" fill="#fb7185" opacity="0.75" />

    {/* Ears */}
    <circle cx="52" cy="54" r="15" fill="#c68a4c" stroke="#875323" strokeWidth="3" />
    <circle cx="52" cy="54" r="8" fill="#fda4af" />
    <circle cx="108" cy="54" r="15" fill="#c68a4c" stroke="#875323" strokeWidth="3" />
    <circle cx="108" cy="54" r="8" fill="#fda4af" />

    {/* Body */}
    <ellipse cx="80" cy="114" rx="34" ry="28" fill="#c68a4c" stroke="#875323" strokeWidth="3" />
    <ellipse cx="80" cy="116" rx="20" ry="16" fill="#fdeed9" />

    {/* Head */}
    <ellipse cx="80" cy="76" rx="36" ry="30" fill="#d99857" stroke="#875323" strokeWidth="3" />
    <ellipse cx="80" cy="83" rx="15" ry="11" fill="#fdeed9" />
    <ellipse cx="80" cy="80" rx="4.5" ry="3" fill="#542e0c" />
    <path d="M80 83V87M76 86Q80 89 84 86" stroke="#542e0c" strokeWidth="2" strokeLinecap="round" />

    {/* Eyes happy closed curves */}
    <path d="M62 72Q67 67 72 72" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M88 72Q93 67 98 72" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />

    {/* Rosy cheeks */}
    <ellipse cx="60" cy="80" rx="6" ry="4" fill="#fb7185" opacity="0.7" />
    <ellipse cx="100" cy="80" rx="6" ry="4" fill="#fb7185" opacity="0.7" />

    {/* Little Paws holding a tiny heart */}
    <ellipse cx="65" cy="108" rx="8" ry="11" transform="rotate(20 65 108)" fill="#d99857" stroke="#875323" strokeWidth="2.5" />
    <ellipse cx="95" cy="108" rx="8" ry="11" transform="rotate(-20 95 108)" fill="#d99857" stroke="#875323" strokeWidth="2.5" />
    
    <path d="M72 108 C72 102 77 98 80 102 C83 98 88 102 88 108 C88 114 80 119 80 119 C80 119 72 114 72 108 Z" fill="#e11d48" />
  </svg>
);

export const PandaHoldingHeart: React.FC<{ className?: string }> = ({ className = "w-32 h-32" }) => (
  <svg viewBox="0 0 160 160" className={`overflow-visible ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="80" cy="148" rx="38" ry="7" fill="rgba(0,0,0,0.06)" />
    
    {/* White / pink-cheeked chibi bear / panda */}
    <circle cx="50" cy="46" r="14" fill="#334155" stroke="#1e293b" strokeWidth="2.5" />
    <circle cx="50" cy="46" r="7" fill="#cbd5e1" />
    <circle cx="110" cy="46" r="14" fill="#334155" stroke="#1e293b" strokeWidth="2.5" />
    <circle cx="110" cy="46" r="7" fill="#cbd5e1" />

    {/* Head */}
    <ellipse cx="80" cy="68" rx="36" ry="30" fill="#ffffff" stroke="#334155" strokeWidth="2.8" />
    
    {/* Dark Eye Patches */}
    <ellipse cx="66" cy="66" rx="8" ry="10" transform="rotate(-15 66 66)" fill="#334155" />
    <ellipse cx="94" cy="66" rx="8" ry="10" transform="rotate(15 94 66)" fill="#334155" />
    
    {/* Sparkle Eyes */}
    <circle cx="67" cy="65" r="3.5" fill="#ffffff" />
    <circle cx="68.5" cy="64" r="1.5" fill="#ffffff" />
    <circle cx="93" cy="65" r="3.5" fill="#ffffff" />
    <circle cx="94.5" cy="64" r="1.5" fill="#ffffff" />

    {/* Rosy Cheeks */}
    <ellipse cx="56" cy="74" rx="7" ry="4.5" fill="#fda4af" opacity="0.8" />
    <ellipse cx="104" cy="74" rx="7" ry="4.5" fill="#fda4af" opacity="0.8" />

    {/* Nose and mouth */}
    <ellipse cx="80" cy="72" rx="4" ry="2.8" fill="#1e293b" />
    <path d="M80 75V78M77 77Q80 80 83 77" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

    {/* Body */}
    <ellipse cx="80" cy="112" rx="28" ry="26" fill="#ffffff" stroke="#334155" strokeWidth="2.8" />
    
    {/* Big Pink Heart Held by Hands */}
    <path d="M60 98 C60 88 71 83 80 92 C89 83 100 88 100 98 C100 112 80 126 80 126 C80 126 60 112 60 98 Z" fill="#f43f5e" stroke="#be123c" strokeWidth="2" />
    <text x="80" y="106" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="sans-serif">I LOVE</text>
    <text x="80" y="115" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="700" fontFamily="sans-serif">YOU</text>

    {/* Little Paws hugging heart */}
    <circle cx="64" cy="102" r="7" fill="#334155" stroke="#1e293b" strokeWidth="2" />
    <circle cx="96" cy="102" r="7" fill="#334155" stroke="#1e293b" strokeWidth="2" />
  </svg>
);

export const BearBalloons: React.FC<{ className?: string }> = ({ className = "w-36 h-36" }) => (
  <svg viewBox="0 0 160 170" className={`overflow-visible ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Balloons behind */}
    <ellipse cx="50" cy="35" rx="14" ry="18" fill="#f472b6" opacity="0.9" />
    <path d="M50 53L76 88" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="2 2" />

    <ellipse cx="78" cy="24" rx="15" ry="19" fill="#fbbf24" opacity="0.9" />
    <path d="M78 43L78 88" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="2 2" />

    <ellipse cx="106" cy="36" rx="14" ry="18" fill="#60a5fa" opacity="0.9" />
    <path d="M106 54L80 88" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="2 2" />

    {/* Sparkles */}
    <path d="M30 20L32 25L37 27L32 29L30 34L28 29L23 27L28 25Z" fill="#f59e0b" />
    <path d="M128 22L130 26L134 27L130 28L128 32L126 28L122 27L126 26Z" fill="#ec4899" />

    {/* Bear Ears */}
    <circle cx="56" cy="72" r="13" fill="#c68a4c" stroke="#78350f" strokeWidth="2.5" />
    <circle cx="56" cy="72" r="6" fill="#fbcfe8" />
    <circle cx="104" cy="72" r="13" fill="#c68a4c" stroke="#78350f" strokeWidth="2.5" />
    <circle cx="104" cy="72" r="6" fill="#fbcfe8" />

    {/* Party Cone Hat */}
    <polygon points="80,44 70,70 90,70" fill="#ec4899" stroke="#be185d" strokeWidth="1.5" />
    <circle cx="80" cy="42" r="4" fill="#fbbf24" />

    {/* Head */}
    <ellipse cx="80" cy="88" rx="30" ry="25" fill="#d99857" stroke="#78350f" strokeWidth="2.5" />
    <ellipse cx="80" cy="94" rx="12" ry="9" fill="#fef3c7" />
    <ellipse cx="80" cy="92" rx="3.5" ry="2.5" fill="#451a03" />
    <path d="M80 94.5V97M77 96.5Q80 99 83 96.5" stroke="#451a03" strokeWidth="1.5" strokeLinecap="round" />

    {/* Happy Eyes */}
    <path d="M68 85Q72 81 76 85" stroke="#451a03" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M84 85Q88 81 92 85" stroke="#451a03" strokeWidth="2.2" strokeLinecap="round" />

    {/* Cheeks */}
    <ellipse cx="64" cy="92" rx="5" ry="3.5" fill="#f43f5e" opacity="0.75" />
    <ellipse cx="96" cy="92" rx="5" ry="3.5" fill="#f43f5e" opacity="0.75" />

    {/* Body */}
    <ellipse cx="80" cy="125" rx="26" ry="22" fill="#c68a4c" stroke="#78350f" strokeWidth="2.5" />
    <ellipse cx="80" cy="126" rx="16" ry="14" fill="#fef3c7" />

    {/* Little hands holding string */}
    <ellipse cx="68" cy="115" rx="6" ry="8" transform="rotate(30 68 115)" fill="#d99857" stroke="#78350f" strokeWidth="2" />
    <ellipse cx="92" cy="115" rx="6" ry="8" transform="rotate(-30 92 115)" fill="#d99857" stroke="#78350f" strokeWidth="2" />
  </svg>
);

export const BearInGiftBox: React.FC<{ isOpen: boolean; className?: string }> = ({ isOpen, className = "w-40 h-40" }) => (
  <svg viewBox="0 0 160 170" className={`overflow-visible transition-all duration-700 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <ellipse cx="80" cy="154" rx="46" ry="9" fill="rgba(0,0,0,0.08)" />

    {/* Bear popping out when open */}
    <g className={`transition-all duration-700 ease-out origin-bottom ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90'}`}>
      {/* Ears */}
      <circle cx="56" cy="52" r="12" fill="#ffffff" stroke="#334155" strokeWidth="2.2" />
      <circle cx="56" cy="52" r="6" fill="#fbcfe8" />
      <circle cx="104" cy="52" r="12" fill="#ffffff" stroke="#334155" strokeWidth="2.2" />
      <circle cx="104" cy="52" r="6" fill="#fbcfe8" />

      {/* Head */}
      <ellipse cx="80" cy="68" rx="30" ry="25" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />
      
      {/* Happy Eyes */}
      <circle cx="70" cy="66" r="3" fill="#1e293b" />
      <circle cx="71" cy="65" r="1" fill="#ffffff" />
      <circle cx="90" cy="66" r="3" fill="#1e293b" />
      <circle cx="91" cy="65" r="1" fill="#ffffff" />

      {/* Nose and mouth */}
      <ellipse cx="80" cy="71" rx="3.5" ry="2.2" fill="#1e293b" />
      <path d="M80 73V76M77 75Q80 78 83 75" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />

      {/* Rosy Cheeks */}
      <ellipse cx="64" cy="73" rx="5.5" ry="3.5" fill="#fda4af" />
      <ellipse cx="96" cy="73" rx="5.5" ry="3.5" fill="#fda4af" />

      {/* Red cozy sweater */}
      <path d="M60 88 Q80 92 100 88 L104 116 Q80 120 56 116 Z" fill="#e11d48" stroke="#9f1239" strokeWidth="2" />
      <circle cx="80" cy="98" r="3" fill="#ffffff" />
      <circle cx="80" cy="108" r="3" fill="#ffffff" />

      {/* Raised cheering hands */}
      <ellipse cx="50" cy="76" rx="6" ry="10" transform="rotate(-35 50 76)" fill="#ffffff" stroke="#334155" strokeWidth="2" />
      <ellipse cx="110" cy="76" rx="6" ry="10" transform="rotate(35 110 76)" fill="#ffffff" stroke="#334155" strokeWidth="2" />
    </g>

    {/* Gift Box Base */}
    <rect x="42" y="104" width="76" height="50" rx="6" fill="#be185d" stroke="#831843" strokeWidth="2.5" />
    {/* Vertical Gold Ribbon */}
    <rect x="74" y="104" width="12" height="50" fill="#facc15" />
    {/* Horizontal Gold Ribbon */}
    <rect x="42" y="124" width="76" height="10" fill="#facc15" />

    {/* Gift Box Lid */}
    <g className={`transition-all duration-700 ease-out origin-top ${isOpen ? '-translate-y-14 -rotate-12 scale-95 opacity-85' : 'translate-y-0 rotate-0 scale-100'}`}>
      <rect x="38" y="96" width="84" height="15" rx="4" fill="#9d174d" stroke="#701a75" strokeWidth="2.2" />
      <rect x="74" y="96" width="12" height="15" fill="#facc15" />
      
      {/* Big Golden Bow */}
      <path d="M72 96 C62 82 58 86 70 94 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
      <path d="M88 96 C98 82 102 86 90 94 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1.5" />
      <circle cx="80" cy="95" r="5" fill="#eab308" />
    </g>
  </svg>
);

export const BearThankYouHeart: React.FC<{ className?: string }> = ({ className = "w-44 h-44" }) => (
  <svg viewBox="0 0 180 180" className={`overflow-visible ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="90" cy="168" rx="50" ry="9" fill="rgba(0,0,0,0.06)" />
    
    {/* Little Sparkles around */}
    <path d="M35 50L37 54L41 55L37 56L35 60L33 56L29 55L33 54Z" fill="#f59e0b" />
    <path d="M145 42L147 46L151 47L147 48L145 52L143 48L139 47L143 46Z" fill="#ec4899" />
    <path d="M152 110 C152 106 156 104 159 107 C162 104 166 106 166 110 C166 114 159 118 159 118 C159 118 152 114 152 110 Z" fill="#f43f5e" />

    {/* Bear Ears */}
    <circle cx="64" cy="50" r="14" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />
    <circle cx="64" cy="50" r="7" fill="#fbcfe8" />
    <circle cx="116" cy="50" r="14" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />
    <circle cx="116" cy="50" r="7" fill="#fbcfe8" />

    {/* Bear Head */}
    <ellipse cx="90" cy="68" rx="36" ry="30" fill="#ffffff" stroke="#334155" strokeWidth="2.8" />
    
    {/* Happy closed arched eyes */}
    <path d="M72 66Q78 59 84 66" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M96 66Q102 59 108 66" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

    {/* Rosy blush cheeks */}
    <ellipse cx="68" cy="74" rx="8" ry="5" fill="#fda4af" opacity="0.8" />
    <ellipse cx="112" cy="74" rx="8" ry="5" fill="#fda4af" opacity="0.8" />

    {/* Nose & mouth */}
    <ellipse cx="90" cy="72" rx="4" ry="2.6" fill="#1e293b" />
    <path d="M90 75V78M87 77Q90 80 93 77" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

    {/* Giant Romantic Pink Heart Hugged in front */}
    <path d="M52 102 C52 78 80 75 90 92 C100 75 128 78 128 102 C128 126 90 152 90 152 C90 152 52 126 52 102 Z" fill="#fb7185" stroke="#e11d48" strokeWidth="3" />
    
    {/* "Thank You" typography on heart */}
    <text x="90" y="112" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="700" fontFamily="'Playfair Display', Georgia, serif">Thank</text>
    <text x="90" y="129" textAnchor="middle" fill="#ffffff" fontSize="15" fontWeight="700" fontFamily="'Playfair Display', Georgia, serif">You</text>

    {/* Bear Paws wrapping around heart */}
    <ellipse cx="58" cy="110" rx="9" ry="12" transform="rotate(35 58 110)" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />
    <ellipse cx="122" cy="110" rx="9" ry="12" transform="rotate(-35 122 110)" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />
  </svg>
);
