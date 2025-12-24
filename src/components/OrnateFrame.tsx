import { ReactNode } from "react";

interface OrnateFrameProps {
  children: ReactNode;
  className?: string;
}

export const OrnateFrame = ({ children, className = "" }: OrnateFrameProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Main border */}
      <div className="absolute inset-0 border-[3px] border-gold rounded-sm" />
      
      {/* Inner decorative border */}
      <div className="absolute inset-2 border border-gold/40 rounded-sm" />
      
      {/* Corner ornaments */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />
      
      {/* Content */}
      <div className="relative p-8 md:p-12">
        {children}
      </div>
    </div>
  );
};

interface CornerOrnamentProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const CornerOrnament = ({ position }: CornerOrnamentProps) => {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 rotate-90",
    "bottom-left": "bottom-0 left-0 -rotate-90",
    "bottom-right": "bottom-0 right-0 rotate-180",
  };

  return (
    <div className={`absolute w-16 h-16 ${positionClasses[position]}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full text-gold">
        <path
          d="M0,0 L0,30 Q0,0 30,0 Z"
          fill="currentColor"
          opacity="0.3"
        />
        <path
          d="M0,0 C0,40 40,0 0,0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M5,20 Q20,20 20,5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.5" />
        {/* Decorative flourish */}
        <path
          d="M25,2 Q35,8 40,2 Q45,8 55,2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
        <path
          d="M2,25 Q8,35 2,40 Q8,45 2,55"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    </div>
  );
};

export const Divider = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center gap-4 py-4 ${className}`}>
      <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-gold" />
      <svg viewBox="0 0 40 20" className="w-10 h-5 text-gold">
        <path
          d="M0,10 L15,10 M25,10 L40,10"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M17,5 Q20,0 23,5 Q26,10 23,15 Q20,20 17,15 Q14,10 17,5"
          fill="currentColor"
          opacity="0.6"
        />
        <circle cx="20" cy="10" r="2" fill="currentColor" />
      </svg>
      <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-gold" />
    </div>
  );
};

export const GaneshIcon = ({ className = "w-20 h-20" }: { className?: string }) => {
  return (
    <div className={`${className} text-gold`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Simplified Ganesh silhouette */}
        <circle cx="50" cy="35" r="25" fill="currentColor" opacity="0.2" />
        <ellipse cx="50" cy="70" rx="20" ry="15" fill="currentColor" opacity="0.2" />
        {/* Head outline */}
        <circle cx="50" cy="35" r="22" fill="none" stroke="currentColor" strokeWidth="2" />
        {/* Trunk */}
        <path
          d="M50,45 Q45,55 40,65 Q38,70 42,72"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Ears */}
        <ellipse cx="28" cy="35" rx="8" ry="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="72" cy="35" rx="8" ry="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* Crown */}
        <path
          d="M35,18 L40,8 L45,15 L50,5 L55,15 L60,8 L65,18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Eyes */}
        <circle cx="42" cy="32" r="3" fill="currentColor" />
        <circle cx="58" cy="32" r="3" fill="currentColor" />
        {/* Third eye mark */}
        <circle cx="50" cy="25" r="2" fill="currentColor" opacity="0.6" />
      </svg>
    </div>
  );
};

export default OrnateFrame;
