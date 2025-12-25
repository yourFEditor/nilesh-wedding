import { motion } from "framer-motion";

// Marigold Flower for Haldi
export const MarigoldSVG = ({ className = "w-12 h-12", color = "#f59e0b" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 60 60" className={className}>
    <defs>
      <linearGradient id="marigoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#ca8a04" />
      </linearGradient>
    </defs>
    {[...Array(12)].map((_, i) => (
      <ellipse
        key={i}
        cx="30"
        cy="15"
        rx="6"
        ry="12"
        fill="url(#marigoldGrad)"
        transform={`rotate(${i * 30} 30 30)`}
        opacity={0.9}
      />
    ))}
    <circle cx="30" cy="30" r="8" fill={color} />
    <circle cx="30" cy="30" r="4" fill="#fbbf24" />
  </svg>
);

// Mehendi Hand for Mehndi
export const MehendiHandSVG = ({ className = "w-16 h-16", color = "#16a34a" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 80 100" className={className}>
    <defs>
      <linearGradient id="mehendiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#15803d" />
      </linearGradient>
    </defs>
    {/* Palm */}
    <path
      d="M25 85 Q15 75 18 60 L20 40 Q22 35 28 35 L52 35 Q58 35 60 40 L62 60 Q65 75 55 85 Z"
      fill="none"
      stroke="url(#mehendiGrad)"
      strokeWidth="2"
    />
    {/* Fingers */}
    <path d="M28 35 L26 15 Q27 10 32 12 L34 35" fill="none" stroke="url(#mehendiGrad)" strokeWidth="1.5" />
    <path d="M36 35 L35 8 Q36 3 41 5 L43 35" fill="none" stroke="url(#mehendiGrad)" strokeWidth="1.5" />
    <path d="M45 35 L45 10 Q46 5 51 7 L52 35" fill="none" stroke="url(#mehendiGrad)" strokeWidth="1.5" />
    <path d="M54 35 L56 18 Q57 13 62 16 L58 35" fill="none" stroke="url(#mehendiGrad)" strokeWidth="1.5" />
    {/* Decorative patterns */}
    <circle cx="40" cy="55" r="8" fill="none" stroke="url(#mehendiGrad)" strokeWidth="1" />
    <circle cx="40" cy="55" r="4" fill={color} opacity="0.5" />
    <path d="M30 65 Q40 70 50 65" fill="none" stroke="url(#mehendiGrad)" strokeWidth="1" />
    <path d="M32 72 Q40 76 48 72" fill="none" stroke="url(#mehendiGrad)" strokeWidth="1" />
    {/* Paisley motif */}
    <path d="M38 45 Q42 40 46 45 Q45 50 40 48 Z" fill={color} opacity="0.6" />
  </svg>
);

// Ganesh Icon for Ganesh Sthapana
export const GaneshSmallSVG = ({ className = "w-14 h-14", color = "#ea580c" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 60 60" className={className}>
    <defs>
      <linearGradient id="ganeshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#c2410c" />
      </linearGradient>
    </defs>
    {/* Head */}
    <circle cx="30" cy="22" r="14" fill="none" stroke="url(#ganeshGrad)" strokeWidth="2" />
    {/* Trunk */}
    <path d="M24 28 Q18 35 22 42 Q24 44 26 42 Q24 38 28 32" fill="none" stroke="url(#ganeshGrad)" strokeWidth="2" />
    {/* Ears */}
    <ellipse cx="16" cy="20" rx="6" ry="10" fill="none" stroke="url(#ganeshGrad)" strokeWidth="1.5" />
    <ellipse cx="44" cy="20" rx="6" ry="10" fill="none" stroke="url(#ganeshGrad)" strokeWidth="1.5" />
    {/* Crown */}
    <path d="M22 10 L26 4 L30 8 L34 4 L38 10" fill="none" stroke="url(#ganeshGrad)" strokeWidth="1.5" />
    {/* Body */}
    <ellipse cx="30" cy="48" rx="12" ry="8" fill="none" stroke="url(#ganeshGrad)" strokeWidth="2" />
    {/* Third eye */}
    <circle cx="30" cy="16" r="2" fill={color} />
  </svg>
);

// Turmeric/Baan Symbol
export const TurmericSVG = ({ className = "w-12 h-12", color = "#ca8a04" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 50 60" className={className}>
    <defs>
      <linearGradient id="turmericGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#a16207" />
      </linearGradient>
    </defs>
    {/* Turmeric root shape */}
    <path
      d="M25 5 Q30 15 28 25 Q32 30 30 40 Q35 45 32 55 Q25 58 20 55 Q15 45 22 40 Q18 30 22 25 Q18 15 25 5"
      fill="url(#turmericGrad)"
      opacity="0.8"
    />
    {/* Decorative rings */}
    <ellipse cx="25" cy="18" rx="6" ry="3" fill="none" stroke="#fbbf24" strokeWidth="1" />
    <ellipse cx="26" cy="35" rx="5" ry="2.5" fill="none" stroke="#fbbf24" strokeWidth="1" />
    {/* Leaves */}
    <path d="M28 8 Q35 5 32 12" fill="none" stroke="#22c55e" strokeWidth="1.5" />
    <path d="M22 8 Q15 5 18 12" fill="none" stroke="#22c55e" strokeWidth="1.5" />
  </svg>
);

// Music Notes for Sangeet
export const MusicNotesSVG = ({ className = "w-14 h-14", color = "#1e40af" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 70 70" className={className}>
    <defs>
      <linearGradient id="musicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>
    {/* First note */}
    <ellipse cx="18" cy="50" rx="8" ry="6" fill="url(#musicGrad)" transform="rotate(-20 18 50)" />
    <path d="M24 48 L24 18" stroke="url(#musicGrad)" strokeWidth="2" />
    <path d="M24 18 Q30 15 32 20 Q34 25 30 28" fill="url(#musicGrad)" />
    {/* Second note */}
    <ellipse cx="48" cy="45" rx="7" ry="5" fill="url(#musicGrad)" transform="rotate(-20 48 45)" />
    <path d="M53 43 L53 15" stroke="url(#musicGrad)" strokeWidth="2" />
    {/* Connecting beam */}
    <path d="M24 18 L53 15" stroke="url(#musicGrad)" strokeWidth="3" />
    <path d="M24 24 L53 21" stroke="url(#musicGrad)" strokeWidth="2" />
    {/* Stars around */}
    <circle cx="12" cy="25" r="2" fill={color} opacity="0.6" />
    <circle cx="60" cy="30" r="1.5" fill={color} opacity="0.6" />
    <circle cx="35" cy="10" r="2" fill={color} opacity="0.6" />
  </svg>
);

// Horse for Barat
export const HorseSVG = ({ className = "w-20 h-16", color = "#9f1239" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 100 80" className={className}>
    <defs>
      <linearGradient id="horseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>
      <linearGradient id="horseGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fcd34d" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    {/* Body */}
    <ellipse cx="50" cy="45" rx="25" ry="15" fill="none" stroke="url(#horseGrad)" strokeWidth="2" />
    {/* Neck */}
    <path d="M30 40 Q20 30 25 20" fill="none" stroke="url(#horseGrad)" strokeWidth="2" />
    {/* Head */}
    <ellipse cx="22" cy="18" rx="8" ry="6" fill="none" stroke="url(#horseGrad)" strokeWidth="2" transform="rotate(-20 22 18)" />
    {/* Ears */}
    <path d="M18 12 L16 6 L20 10" fill="url(#horseGrad)" />
    <path d="M24 10 L26 4 L22 8" fill="url(#horseGrad)" />
    {/* Mane */}
    <path d="M28 22 Q35 18 32 28 Q38 25 35 32" fill="none" stroke="url(#horseGrad)" strokeWidth="1.5" />
    {/* Legs */}
    <path d="M35 58 L32 75" stroke="url(#horseGrad)" strokeWidth="2" />
    <path d="M45 58 L43 75" stroke="url(#horseGrad)" strokeWidth="2" />
    <path d="M55 58 L57 75" stroke="url(#horseGrad)" strokeWidth="2" />
    <path d="M65 58 L68 75" stroke="url(#horseGrad)" strokeWidth="2" />
    {/* Tail */}
    <path d="M75 42 Q85 38 88 48 Q90 55 82 52" fill="none" stroke="url(#horseGrad)" strokeWidth="2" />
    {/* Decorative saddle */}
    <path d="M40 35 Q50 30 60 35 Q55 40 45 40 Z" fill="url(#horseGold)" opacity="0.7" />
    {/* Eye */}
    <circle cx="18" cy="16" r="1.5" fill={color} />
  </svg>
);

// Dholak for Sangeet
export const DholakSVG = ({ className = "w-16 h-12", color = "#1e40af" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 80 50" className={className}>
    <defs>
      <linearGradient id="dholakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a16207" />
        <stop offset="100%" stopColor="#713f12" />
      </linearGradient>
      <linearGradient id="dholakAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color} />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>
    {/* Drum body */}
    <ellipse cx="40" cy="25" rx="30" ry="18" fill="url(#dholakGrad)" />
    {/* Left head */}
    <ellipse cx="12" cy="25" rx="8" ry="18" fill="none" stroke="#fbbf24" strokeWidth="2" />
    <ellipse cx="12" cy="25" rx="5" ry="12" fill="none" stroke="#fbbf24" strokeWidth="1" />
    {/* Right head */}
    <ellipse cx="68" cy="25" rx="8" ry="18" fill="none" stroke="#fbbf24" strokeWidth="2" />
    <ellipse cx="68" cy="25" rx="5" ry="12" fill="none" stroke="#fbbf24" strokeWidth="1" />
    {/* Decorative bands */}
    <path d="M25 10 L25 40" stroke="url(#dholakAccent)" strokeWidth="2" />
    <path d="M40 8 L40 42" stroke="url(#dholakAccent)" strokeWidth="2" />
    <path d="M55 10 L55 40" stroke="url(#dholakAccent)" strokeWidth="2" />
    {/* Rope pattern */}
    <path d="M15 15 Q28 25 15 35" fill="none" stroke="#f59e0b" strokeWidth="1" />
    <path d="M65 15 Q52 25 65 35" fill="none" stroke="#f59e0b" strokeWidth="1" />
  </svg>
);

// Kalash for religious ceremonies
export const KalashSVG = ({ className = "w-12 h-14", color = "#ea580c" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 50 60" className={className}>
    <defs>
      <linearGradient id="kalashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fcd34d" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <linearGradient id="coconutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#92400e" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>
    </defs>
    {/* Coconut on top */}
    <ellipse cx="25" cy="12" rx="8" ry="7" fill="url(#coconutGrad)" />
    {/* Mango leaves */}
    <path d="M17 18 Q10 10 15 5" fill="none" stroke="#22c55e" strokeWidth="2" />
    <path d="M33 18 Q40 10 35 5" fill="none" stroke="#22c55e" strokeWidth="2" />
    <path d="M25 20 L25 8" fill="none" stroke="#22c55e" strokeWidth="1.5" />
    {/* Kalash pot */}
    <path
      d="M15 22 Q10 22 12 35 Q10 50 18 55 L32 55 Q40 50 38 35 Q40 22 35 22 Z"
      fill="url(#kalashGrad)"
    />
    {/* Decorative band */}
    <ellipse cx="25" cy="22" rx="10" ry="3" fill="none" stroke={color} strokeWidth="1.5" />
    <ellipse cx="25" cy="40" rx="8" ry="2" fill="none" stroke={color} strokeWidth="1" />
    {/* Base */}
    <ellipse cx="25" cy="55" rx="8" ry="3" fill="url(#kalashGrad)" />
  </svg>
);

// Animated floating decoration wrapper
export const FloatingDecoration = ({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    animate={{
      y: [0, -8, 0],
      rotate: [-2, 2, -2],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

export default {
  MarigoldSVG,
  MehendiHandSVG,
  GaneshSmallSVG,
  TurmericSVG,
  MusicNotesSVG,
  HorseSVG,
  DholakSVG,
  KalashSVG,
  FloatingDecoration,
};
