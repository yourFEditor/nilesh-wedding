import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FloatingDiyaProps {
  delay?: number;
  size?: "sm" | "md" | "lg";
  left?: string;
  top?: string;
}

const FloatingDiya = ({ delay = 0, size = "md", left = "10%", top = "20%" }: FloatingDiyaProps) => {
  // Check if mobile (window width < 768px)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const sizeConfig = {
    sm: { width: isMobile ? 20 : 35, height: isMobile ? 26 : 45, glow: 25, flame: 12 },
    md: { width: isMobile ? 28 : 50, height: isMobile ? 36 : 65, glow: 40, flame: 18 },
    lg: { width: isMobile ? 38 : 70, height: isMobile ? 49 : 90, glow: 55, flame: 24 },
  };

  const config = sizeConfig[size];

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top }}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: [0.6, 1, 0.6],
        y: [0, -25, -10, -35, 0],
        x: [0, 8, -4, 6, 0],
      }}
      transition={{
        duration: 7 + delay,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      <svg width={config.width} height={config.height} viewBox="0 0 50 65">
        <defs>
          <linearGradient id={`diyaGold-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <radialGradient id={`flameGlow-${delay}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`flame-${delay}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fef3c7" />
          </linearGradient>
        </defs>
        {/* Glow effect */}
        <motion.ellipse
          cx="25"
          cy="18"
          rx="20"
          ry="18"
          fill={`url(#flameGlow-${delay})`}
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
        {/* Flame */}
        <motion.path
          d="M25 5 Q22 15 20 22 Q25 28 30 22 Q28 15 25 5"
          fill={`url(#flame-${delay})`}
          animate={{
            d: [
              "M25 5 Q22 15 20 22 Q25 28 30 22 Q28 15 25 5",
              "M25 3 Q21 14 19 22 Q25 29 31 22 Q29 14 25 3",
              "M25 5 Q22 15 20 22 Q25 28 30 22 Q28 15 25 5",
            ],
          }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
        {/* Diya bowl */}
        <ellipse cx="25" cy="40" rx="18" ry="8" fill={`url(#diyaGold-${delay})`} />
        <path
          d="M7 40 Q7 55 25 55 Q43 55 43 40"
          fill={`url(#diyaGold-${delay})`}
        />
        {/* Decorative rim */}
        <ellipse cx="25" cy="40" rx="18" ry="8" fill="none" stroke="#fcd34d" strokeWidth="1" />
        {/* Base */}
        <ellipse cx="25" cy="58" rx="10" ry="4" fill={`url(#diyaGold-${delay})`} />
      </svg>
    </motion.div>
  );
};

interface FloatingLotusProps {
  delay?: number;
  size?: "sm" | "md" | "lg";
  left?: string;
  top?: string;
}

const FloatingLotus = ({ delay = 0, size = "md", left = "10%", top = "20%" }: FloatingLotusProps) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  const sizeConfig = {
    sm: isMobile ? 24 : 40,
    md: isMobile ? 36 : 60,
    lg: isMobile ? 50 : 85,
  };

  const actualSize = sizeConfig[size];

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0.4, 0.8, 0.4],
        y: [0, -20, -8, -28, 0],
        rotate: [0, 5, -3, 4, 0],
      }}
      transition={{
        duration: 9 + delay,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      <svg width={actualSize} height={actualSize * 0.8} viewBox="0 0 100 80">
        <defs>
          <linearGradient id={`lotusGrad-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#be185d" />
          </linearGradient>
        </defs>
        {/* Back petals */}
        <ellipse cx="30" cy="50" rx="12" ry="28" fill={`url(#lotusGrad-${delay})`} opacity="0.5" transform="rotate(-30 30 50)" />
        <ellipse cx="70" cy="50" rx="12" ry="28" fill={`url(#lotusGrad-${delay})`} opacity="0.5" transform="rotate(30 70 50)" />
        {/* Middle petals */}
        <ellipse cx="38" cy="45" rx="10" ry="30" fill={`url(#lotusGrad-${delay})`} opacity="0.7" transform="rotate(-15 38 45)" />
        <ellipse cx="62" cy="45" rx="10" ry="30" fill={`url(#lotusGrad-${delay})`} opacity="0.7" transform="rotate(15 62 45)" />
        {/* Center petal */}
        <ellipse cx="50" cy="40" rx="10" ry="32" fill={`url(#lotusGrad-${delay})`} />
        {/* Golden center */}
        <circle cx="50" cy="55" r="8" fill="#fbbf24" />
        <circle cx="50" cy="55" r="4" fill="#fcd34d" />
      </svg>
    </motion.div>
  );
};

interface GoldenSparkleProps {
  count?: number;
}

const GoldenSparkle = ({ count = 30 }: GoldenSparkleProps) => {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 2,
    size: 3 + Math.random() * 5,
  }));

  return (
    <>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.3, 0.5],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 10 10" className="w-full h-full">
            <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" fill="#fcd34d" />
          </svg>
        </motion.div>
      ))}
    </>
  );
};

interface FloatingElementsProps {
  variant?: "diyas" | "lotus" | "mixed";
  intensity?: "light" | "medium" | "heavy";
  heroOnly?: boolean;
}

export const FloatingElements = ({ variant = "mixed", intensity = "heavy", heroOnly = true }: FloatingElementsProps) => {
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 0.3], [0, -250]);
  const y3 = useTransform(scrollYProgress, [0, 0.3], [0, -80]); // Slower parallax for front layer
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const counts = {
    light: { diyas: 6, lotus: 4, sparkles: 20 },
    medium: { diyas: 10, lotus: 7, sparkles: 35 },
    heavy: { diyas: 14, lotus: 10, sparkles: 50 },
  };

  const config = counts[intensity];

  const diyaPositions = [
    { left: "3%", top: "8%", size: "lg" as const, delay: 0 },
    { left: "92%", top: "5%", size: "lg" as const, delay: 0.5 },
    { left: "12%", top: "25%", size: "md" as const, delay: 1 },
    { left: "85%", top: "22%", size: "md" as const, delay: 1.5 },
    { left: "6%", top: "45%", size: "sm" as const, delay: 2 },
    { left: "88%", top: "40%", size: "sm" as const, delay: 0.8 },
    { left: "20%", top: "12%", size: "md" as const, delay: 1.2 },
    { left: "78%", top: "15%", size: "md" as const, delay: 0.3 },
    { left: "35%", top: "8%", size: "sm" as const, delay: 1.8 },
    { left: "62%", top: "10%", size: "sm" as const, delay: 2.2 },
    { left: "48%", top: "3%", size: "lg" as const, delay: 0.6 },
    { left: "15%", top: "55%", size: "sm" as const, delay: 1.4 },
    { left: "82%", top: "52%", size: "sm" as const, delay: 0.9 },
    { left: "28%", top: "35%", size: "md" as const, delay: 2.5 },
  ];

  const lotusPositions = [
    { left: "8%", top: "15%", size: "md" as const, delay: 0 },
    { left: "90%", top: "18%", size: "lg" as const, delay: 1 },
    { left: "18%", top: "40%", size: "sm" as const, delay: 2 },
    { left: "80%", top: "35%", size: "md" as const, delay: 1.5 },
    { left: "5%", top: "60%", size: "lg" as const, delay: 0.5 },
    { left: "93%", top: "55%", size: "sm" as const, delay: 2.5 },
    { left: "40%", top: "5%", size: "sm" as const, delay: 3 },
    { left: "58%", top: "8%", size: "md" as const, delay: 0.8 },
    { left: "25%", top: "20%", size: "lg" as const, delay: 1.8 },
    { left: "72%", top: "28%", size: "sm" as const, delay: 2.8 },
  ];

  // Front layer - bigger, slower diyas
  const frontDiyaPositions = [
    { left: "5%", top: "20%", delay: 0.3 },
    { left: "90%", top: "15%", delay: 1.2 },
    { left: "15%", top: "50%", delay: 2.1 },
    { left: "85%", top: "45%", delay: 0.7 },
    { left: "50%", top: "10%", delay: 1.8 },
    { left: "30%", top: "30%", delay: 2.5 },
    { left: "70%", top: "35%", delay: 0.4 },
  ];

  return (
    <motion.div
      style={{ opacity: heroOnly ? opacity : 1 }}
      className="fixed inset-0 overflow-hidden pointer-events-none z-20"
    >
      {/* Parallax layer 1 - Slow moving diyas */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {(variant === "diyas" || variant === "mixed") &&
          diyaPositions.slice(0, Math.ceil(config.diyas / 2)).map((pos, i) => (
            <FloatingDiya key={`diya-1-${i}`} {...pos} />
          ))}
      </motion.div>

      {/* Parallax layer 2 - Medium moving lotus */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {(variant === "lotus" || variant === "mixed") &&
          lotusPositions.slice(0, config.lotus).map((pos, i) => (
            <FloatingLotus key={`lotus-${i}`} {...pos} />
          ))}
      </motion.div>

      {/* Parallax layer 3 - Fast moving diyas and sparkles */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {(variant === "diyas" || variant === "mixed") &&
          diyaPositions.slice(Math.ceil(config.diyas / 2), config.diyas).map((pos, i) => (
            <FloatingDiya key={`diya-2-${i}`} {...pos} />
          ))}
        <GoldenSparkle count={config.sparkles} />
      </motion.div>

      {/* Parallax layer 4 - Front layer with bigger, slower diyas */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        {(variant === "diyas" || variant === "mixed") &&
          frontDiyaPositions.map((pos, i) => (
            <motion.div
              key={`front-diya-${i}`}
              className="absolute pointer-events-none"
              style={{ left: pos.left, top: pos.top }}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: [0.5, 0.85, 0.5],
                y: [0, -15, -5, -20, 0],
                x: [0, 5, -3, 4, 0],
              }}
              transition={{
                duration: 12 + pos.delay,
                repeat: Infinity,
                delay: pos.delay,
                ease: "easeInOut",
              }}
            >
              <svg width={typeof window !== 'undefined' && window.innerWidth < 768 ? 55 : 100} height={typeof window !== 'undefined' && window.innerWidth < 768 ? 72 : 130} viewBox="0 0 50 65">
                <defs>
                  <linearGradient id={`diyaGoldFront-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fcd34d" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                  <radialGradient id={`flameGlowFront-${i}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#f97316" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id={`flameFront-${i}`} x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="50%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#fef3c7" />
                  </linearGradient>
                </defs>
                <motion.ellipse
                  cx="25"
                  cy="18"
                  rx="20"
                  ry="18"
                  fill={`url(#flameGlowFront-${i})`}
                  animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.path
                  d="M25 5 Q22 15 20 22 Q25 28 30 22 Q28 15 25 5"
                  fill={`url(#flameFront-${i})`}
                  animate={{
                    d: [
                      "M25 5 Q22 15 20 22 Q25 28 30 22 Q28 15 25 5",
                      "M25 3 Q21 14 19 22 Q25 29 31 22 Q29 14 25 3",
                      "M25 5 Q22 15 20 22 Q25 28 30 22 Q28 15 25 5",
                    ],
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
                <ellipse cx="25" cy="40" rx="18" ry="8" fill={`url(#diyaGoldFront-${i})`} />
                <path d="M7 40 Q7 55 25 55 Q43 55 43 40" fill={`url(#diyaGoldFront-${i})`} />
                <ellipse cx="25" cy="40" rx="18" ry="8" fill="none" stroke="#fcd34d" strokeWidth="1" />
                <ellipse cx="25" cy="58" rx="10" ry="4" fill={`url(#diyaGoldFront-${i})`} />
              </svg>
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
};

export default FloatingElements;
