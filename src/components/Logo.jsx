'use client';

import React from 'react';

export default function Logo({ className = "h-8 w-auto" }) {
  return (
    <svg className={className} viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(10, 8)">
        {/* Loom warp & weft interlocking diamond motif */}
        <path d="M22 2 L42 22 L22 42 L2 22 Z" stroke="#181716" strokeWidth="1.5" fill="none"/>
        <path d="M22 8 L36 22 L22 36 L8 22 Z" stroke="#C5A880" strokeWidth="1.2" fill="none"/>
        <circle cx="22" cy="22" r="3.5" fill="#181716"/>
        <line x1="22" y1="2" x2="22" y2="42" stroke="#181716" strokeWidth="0.75" strokeDasharray="2 2"/>
        <line x1="2" y1="22" x2="42" y2="22" stroke="#181716" strokeWidth="0.75" strokeDasharray="2 2"/>
      </g>
      <text x="64" y="32" fontFamily="'Playfair Display', serif" fontSize="21" fontWeight="600" letterSpacing="0.18em" fill="#181716">TANABANA</text>
      <text x="65" y="45" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="8.5" fontWeight="500" letterSpacing="0.32em" fill="#8C827A">FABRICS • LAHORE</text>
    </svg>
  );
}
