import React from 'react';

export default function MagicLampIcon({ className = 'h-14 w-14' }) {
  return (
    <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Lâmpada mágica">
      <defs>
        <linearGradient id="lampGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="213" rx="70" ry="16" fill="#c7d2fe" opacity="0.45" />
      <path d="M66 188c14 18 49 25 90 16 13-3 24-8 32-15-20 2-45-3-64-15-23-14-34-31-58-33 8 13 7 29 0 47z" fill="url(#lampGold)" stroke="#92400e" strokeWidth="5" />
      <path d="M52 151c-6 4-21 9-29 6 8-9 16-15 28-16 17-3 35 7 56 20 18 11 40 17 59 16 20-2 35-10 43-22 3 14-3 30-15 41-15 13-33 20-55 22-42 4-79-7-97-31-8-11-6-27 10-36z" fill="url(#lampGold)" stroke="#92400e" strokeWidth="6" strokeLinejoin="round" />
      <path d="M196 144c8-6 13-13 13-20 0-9-7-15-17-15-8 0-15 5-18 12 8-4 16-2 18 3 2 5-1 11-8 16l12 4z" fill="url(#lampGold)" stroke="#92400e" strokeWidth="5" />
      <ellipse cx="107" cy="159" rx="30" ry="8" fill="#fff" opacity="0.3" />
      <path d="M116 86c22 0 40 11 40 24s-18 24-40 24-40-11-40-24 18-24 40-24z" fill="url(#lampGold)" stroke="#92400e" strokeWidth="6" />
      <circle cx="116" cy="108" r="9" fill="#fef3c7" stroke="#92400e" strokeWidth="4" />
      <path d="M107 79h18l-3-14h-12l-3 14z" fill="url(#lampGold)" stroke="#92400e" strokeWidth="5" />
      <ellipse cx="116" cy="60" rx="11" ry="7" fill="#facc15" stroke="#92400e" strokeWidth="5" />
    </svg>
  );
}
