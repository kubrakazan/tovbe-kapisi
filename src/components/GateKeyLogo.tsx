import React from 'react';

interface GateKeyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const GateKeyLogo: React.FC<GateKeyLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div
      id="gate-key-logo"
      className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 border-2 border-amber-400/80 shadow-md ${sizeClasses[size]} ${className}`}
      title="Tövbe Kapısı"
    >
      {/* Classic, clear, elegant arched double-door gate (Kapı) - No eye or esoteric symbols */}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-1.5"
      >
        <defs>
          <linearGradient id="gateGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="doorWoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* Base Step / Threshold (Eşik) */}
        <rect
          x="6"
          y="54"
          width="52"
          height="4"
          rx="1.5"
          fill="url(#gateGoldGrad)"
        />

        {/* Outer Arched Doorframe (Kemerli Kapı Çerçevesi) */}
        <path
          d="M12 54 V26 C12 15 20 8 32 8 C44 8 52 15 52 26 V54"
          stroke="url(#gateGoldGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner Door Fill Area */}
        <path
          d="M14 54 V26 C14 16.5 21.5 10 32 10 C42.5 10 50 16.5 50 26 V54 Z"
          fill="url(#doorWoodGrad)"
        />

        {/* Vertical Center Door Seam (İki Kanat Ayrımı) */}
        <line
          x1="32"
          y1="10"
          x2="32"
          y2="54"
          stroke="url(#gateGoldGrad)"
          strokeWidth="2"
        />

        {/* Left Door Panel Insets */}
        <rect
          x="17"
          y="27"
          width="11"
          height="10"
          rx="1.5"
          stroke="url(#gateGoldGrad)"
          strokeWidth="1.2"
          strokeOpacity="0.75"
        />
        <rect
          x="17"
          y="41"
          width="11"
          height="10"
          rx="1.5"
          stroke="url(#gateGoldGrad)"
          strokeWidth="1.2"
          strokeOpacity="0.75"
        />

        {/* Right Door Panel Insets */}
        <rect
          x="36"
          y="27"
          width="11"
          height="10"
          rx="1.5"
          stroke="url(#gateGoldGrad)"
          strokeWidth="1.2"
          strokeOpacity="0.75"
        />
        <rect
          x="36"
          y="41"
          width="11"
          height="10"
          rx="1.5"
          stroke="url(#gateGoldGrad)"
          strokeWidth="1.2"
          strokeOpacity="0.75"
        />

        {/* Door Handles (Kapı Kulpları / Tokmakları) */}
        <circle
          cx="28"
          cy="38"
          r="1.8"
          fill="url(#gateGoldGrad)"
        />
        <circle
          cx="36"
          cy="38"
          r="1.8"
          fill="url(#gateGoldGrad)"
        />

        {/* Top Keystone Accent (Kemer Kilit Taşı) */}
        <polygon
          points="29,6 35,6 34,10 30,10"
          fill="url(#gateGoldGrad)"
        />
      </svg>
    </div>
  );
};
