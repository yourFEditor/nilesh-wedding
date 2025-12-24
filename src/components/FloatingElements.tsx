import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface FloatingDiyaProps {
  delay?: number;
  size?: "sm" | "md" | "lg";
  left?: string;
  top?: string;
}

const FloatingDiya = ({ delay = 0, size = "md", left = "10%", top = "20%" }: FloatingDiyaProps) => {
  const sizeClasses = {
    sm: "w-8 h-10",
    md: "w-12 h-14",
    lg: "w-16 h-20",
  };

  const glowSizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: [0.4, 0.8, 0.4],
        y: [0, -30, -15, -40, 0],
        x: [0, 10, -5, 8, 0],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      {/* Diya/Lamp body */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Flame glow */}
        <div 
          className={`absolute -top-2 left-1/2 -translate-x-1/2 ${glowSizes[size]} rounded-full bg-gradient-radial from-amber-400/80 via-orange-500/40 to-transparent blur-sm animate-glow`}
        />
        {/* Flame */}
        <motion.div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-4"
          animate={{ 
            scaleY: [1, 1.2, 0.9, 1.1, 1],
            scaleX: [1, 0.9, 1.1, 0.95, 1],
          }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <div className="w-full h-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full" />
        </motion.div>
        {/* Diya bowl */}
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-b from-amber-600 to-amber-800 rounded-b-full" 
          style={{
            clipPath: "ellipse(50% 80% at 50% 100%)"
          }}
        />
        {/* Gold rim */}
        <div className="absolute bottom-[45%] w-full h-[3px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
      </div>
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
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <motion.div
      className={`absolute pointer-events-none ${sizeClasses[size]}`}
      style={{ left, top }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        y: [0, -20, -10, -25, 0],
        rotate: [0, 5, -3, 4, 0],
      }}
      transition={{
        duration: 10 + delay,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    >
      {/* Simplified lotus SVG */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id={`lotus-gradient-${delay}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f9a8d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#be185d" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Center petal */}
        <ellipse cx="50" cy="45" rx="12" ry="30" fill={`url(#lotus-gradient-${delay})`} />
        {/* Left petals */}
        <ellipse cx="35" cy="50" rx="10" ry="25" fill={`url(#lotus-gradient-${delay})`} transform="rotate(-20 35 50)" />
        <ellipse cx="25" cy="55" rx="8" ry="20" fill={`url(#lotus-gradient-${delay})`} transform="rotate(-40 25 55)" />
        {/* Right petals */}
        <ellipse cx="65" cy="50" rx="10" ry="25" fill={`url(#lotus-gradient-${delay})`} transform="rotate(20 65 50)" />
        <ellipse cx="75" cy="55" rx="8" ry="20" fill={`url(#lotus-gradient-${delay})`} transform="rotate(40 75 55)" />
        {/* Golden center */}
        <circle cx="50" cy="60" r="8" fill="#fbbf24" opacity="0.8" />
      </svg>
    </motion.div>
  );
};

interface GoldenSparkleProps {
  count?: number;
}

const GoldenSparkle = ({ count = 20 }: GoldenSparkleProps) => {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3,
    size: 2 + Math.random() * 4,
  }));

  return (
    <>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute pointer-events-none rounded-full bg-gradient-to-br from-yellow-300 to-amber-500"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

interface FloatingElementsProps {
  variant?: "diyas" | "lotus" | "mixed";
  intensity?: "light" | "medium" | "heavy";
}

export const FloatingElements = ({ variant = "mixed", intensity = "medium" }: FloatingElementsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const counts = {
    light: { diyas: 4, lotus: 3, sparkles: 15 },
    medium: { diyas: 8, lotus: 6, sparkles: 25 },
    heavy: { diyas: 12, lotus: 10, sparkles: 40 },
  };

  const config = counts[intensity];

  const diyaPositions = [
    { left: "5%", top: "15%", size: "lg" as const, delay: 0 },
    { left: "85%", top: "10%", size: "md" as const, delay: 1 },
    { left: "15%", top: "45%", size: "sm" as const, delay: 2 },
    { left: "90%", top: "35%", size: "lg" as const, delay: 0.5 },
    { left: "8%", top: "70%", size: "md" as const, delay: 1.5 },
    { left: "80%", top: "60%", size: "sm" as const, delay: 2.5 },
    { left: "25%", top: "25%", size: "sm" as const, delay: 3 },
    { left: "70%", top: "80%", size: "md" as const, delay: 0.8 },
    { left: "50%", top: "5%", size: "lg" as const, delay: 1.2 },
    { left: "35%", top: "85%", size: "sm" as const, delay: 2.2 },
    { left: "60%", top: "40%", size: "sm" as const, delay: 3.5 },
    { left: "3%", top: "90%", size: "md" as const, delay: 0.3 },
  ];

  const lotusPositions = [
    { left: "10%", top: "20%", size: "md" as const, delay: 0 },
    { left: "88%", top: "25%", size: "lg" as const, delay: 1 },
    { left: "20%", top: "60%", size: "sm" as const, delay: 2 },
    { left: "75%", top: "50%", size: "md" as const, delay: 1.5 },
    { left: "5%", top: "80%", size: "lg" as const, delay: 0.5 },
    { left: "92%", top: "75%", size: "sm" as const, delay: 2.5 },
    { left: "40%", top: "10%", size: "sm" as const, delay: 3 },
    { left: "55%", top: "90%", size: "md" as const, delay: 0.8 },
    { left: "30%", top: "40%", size: "lg" as const, delay: 1.8 },
    { left: "65%", top: "15%", size: "sm" as const, delay: 2.8 },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {/* Parallax layer 1 - Slow */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {(variant === "diyas" || variant === "mixed") &&
          diyaPositions.slice(0, Math.ceil(config.diyas / 2)).map((pos, i) => (
            <FloatingDiya key={`diya-1-${i}`} {...pos} />
          ))}
      </motion.div>

      {/* Parallax layer 2 - Medium */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {(variant === "lotus" || variant === "mixed") &&
          lotusPositions.slice(0, config.lotus).map((pos, i) => (
            <FloatingLotus key={`lotus-${i}`} {...pos} />
          ))}
      </motion.div>

      {/* Parallax layer 3 - Fast */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        {(variant === "diyas" || variant === "mixed") &&
          diyaPositions.slice(Math.ceil(config.diyas / 2), config.diyas).map((pos, i) => (
            <FloatingDiya key={`diya-2-${i}`} {...pos} />
          ))}
        <GoldenSparkle count={config.sparkles} />
      </motion.div>
    </div>
  );
};

export default FloatingElements;
