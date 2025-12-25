import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Divider } from "../OrnateFrame";
import { MapPin, Clock } from "lucide-react";
import {
  MarigoldSVG,
  MehendiHandSVG,
  GaneshSmallSVG,
  TurmericSVG,
  MusicNotesSVG,
  HorseSVG,
  DholakSVG,
  KalashSVG,
  FloatingDecoration,
} from "../decorative/EventIllustrations";

interface Event {
  name: string;
  date: string;
  time: string;
  venue?: string;
  address?: string;
  mapLink?: string;
  description?: string;
}

interface EventDay {
  title: string;
  subtitle?: string;
  date: string;
  events: Event[];
  venue?: string;
  address?: string;
}

interface EventsSectionProps {
  days: EventDay[];
}

// Get event theme based on event name
const getEventTheme = (title: string, eventNames: string[]) => {
  const titleLower = title.toLowerCase();
  const eventsLower = eventNames.map(n => n.toLowerCase()).join(" ");
  const combined = titleLower + " " + eventsLower;

  if (combined.includes("haldi")) {
    return {
      theme: "haldi",
      primary: "#eab308",
      secondary: "#facc15",
      bg: "from-yellow-50 via-yellow-100/50 to-amber-50",
      border: "border-yellow-400/40",
      headerBg: "from-yellow-400 to-amber-500",
      textColor: "text-amber-800",
      iconColor: "#ca8a04",
      illustrations: ["marigold", "turmeric"],
    };
  }
  if (combined.includes("mehndi") || combined.includes("mehendi")) {
    return {
      theme: "mehndi",
      primary: "#16a34a",
      secondary: "#22c55e",
      bg: "from-green-50 via-emerald-50/50 to-green-100",
      border: "border-green-400/40",
      headerBg: "from-green-500 to-emerald-600",
      textColor: "text-green-800",
      iconColor: "#15803d",
      illustrations: ["mehendi", "marigold"],
    };
  }
  if (combined.includes("ganesh") || combined.includes("sthapana") || combined.includes("sthabpna") || combined.includes("vinayak")) {
    return {
      theme: "ganesh",
      primary: "#ea580c",
      secondary: "#f97316",
      bg: "from-orange-50 via-orange-100/50 to-amber-50",
      border: "border-orange-400/40",
      headerBg: "from-orange-500 to-amber-600",
      textColor: "text-orange-800",
      iconColor: "#c2410c",
      illustrations: ["ganesh", "kalash"],
    };
  }
  if (combined.includes("baan") || combined.includes("ban")) {
    return {
      theme: "baan",
      primary: "#ca8a04",
      secondary: "#eab308",
      bg: "from-amber-50 via-yellow-50/50 to-orange-50",
      border: "border-amber-500/40",
      headerBg: "from-amber-500 to-yellow-600",
      textColor: "text-amber-900",
      iconColor: "#a16207",
      illustrations: ["turmeric", "kalash"],
    };
  }
  if (combined.includes("sangeet") || combined.includes("music") || combined.includes("dance")) {
    return {
      theme: "sangeet",
      primary: "#1e40af",
      secondary: "#3b82f6",
      bg: "from-blue-50 via-indigo-50/50 to-blue-100",
      border: "border-blue-400/40",
      headerBg: "from-blue-600 to-indigo-700",
      textColor: "text-blue-900",
      iconColor: "#1e3a8a",
      illustrations: ["music", "dholak"],
    };
  }
  if (combined.includes("barat") || combined.includes("nikasi") || combined.includes("lagan") || combined.includes("panigrahan") || combined.includes("wedding")) {
    return {
      theme: "barat",
      primary: "#9f1239",
      secondary: "#e11d48",
      bg: "from-rose-50 via-pink-50/50 to-rose-100",
      border: "border-rose-400/40",
      headerBg: "from-rose-600 to-pink-700",
      textColor: "text-rose-900",
      iconColor: "#881337",
      illustrations: ["horse", "kalash"],
    };
  }
  // Default - gold/traditional
  return {
    theme: "default",
    primary: "#b45309",
    secondary: "#f59e0b",
    bg: "from-cream via-ivory to-cream-dark",
    border: "border-gold/40",
    headerBg: "from-amber-600 to-yellow-700",
    textColor: "text-brown",
    iconColor: "#b45309",
    illustrations: ["kalash", "marigold"],
  };
};

// Render illustration based on type
const renderIllustration = (type: string, color: string, className: string) => {
  switch (type) {
    case "marigold":
      return <MarigoldSVG className={className} color={color} />;
    case "mehendi":
      return <MehendiHandSVG className={className} color={color} />;
    case "ganesh":
      return <GaneshSmallSVG className={className} color={color} />;
    case "turmeric":
      return <TurmericSVG className={className} color={color} />;
    case "music":
      return <MusicNotesSVG className={className} color={color} />;
    case "dholak":
      return <DholakSVG className={className} color={color} />;
    case "horse":
      return <HorseSVG className={className} color={color} />;
    case "kalash":
      return <KalashSVG className={className} color={color} />;
    default:
      return <MarigoldSVG className={className} color={color} />;
  }
};

// Themed Rajasthani Arch Header Component
const RajasthaniArchHeader = ({ 
  title, 
  subtitle,
  gradientColors,
  textColor,
}: { 
  title: string; 
  subtitle?: string;
  gradientColors: string;
  textColor: string;
}) => (
  <div className="relative">
    <svg viewBox="0 0 400 100" className="w-full h-auto" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`archHeaderGold-${title.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" className={gradientColors} />
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" />
        </linearGradient>
      </defs>
      {/* Main arch outline */}
      <path
        d="M0 100 L0 70 Q0 35 35 35 L100 35 Q120 35 135 20 Q160 0 200 0 Q240 0 265 20 Q280 35 300 35 L365 35 Q400 35 400 70 L400 100"
        className={`fill-current ${gradientColors} opacity-20`}
      />
      <path
        d="M0 100 L0 70 Q0 35 35 35 L100 35 Q120 35 135 20 Q160 0 200 0 Q240 0 265 20 Q280 35 300 35 L365 35 Q400 35 400 70 L400 100"
        className={`stroke-current ${gradientColors} fill-none`}
        strokeWidth="3"
      />
      {/* Inner arch detail */}
      <path
        d="M20 100 L20 75 Q20 50 50 50 L110 50 Q130 50 145 35 Q165 15 200 15 Q235 15 255 35 Q270 50 290 50 L350 50 Q380 50 380 75 L380 100"
        className={`stroke-current ${gradientColors} fill-none opacity-50`}
        strokeWidth="1.5"
      />
      {/* Top ornament - Kalash */}
      <circle cx="200" cy="12" r="8" className={`fill-current ${gradientColors}`} />
      <path d="M192 12 L200 2 L208 12" className={`fill-current ${gradientColors}`} />
      {/* Side lotus buds */}
      <ellipse cx="100" cy="45" rx="6" ry="10" className={`fill-current ${gradientColors} opacity-60`} />
      <ellipse cx="300" cy="45" rx="6" ry="10" className={`fill-current ${gradientColors} opacity-60`} />
      {/* Corner decorations */}
      <circle cx="30" cy="55" r="4" className={`fill-current ${gradientColors} opacity-40`} />
      <circle cx="370" cy="55" r="4" className={`fill-current ${gradientColors} opacity-40`} />
      {/* Side hanging elements */}
      <path d="M50 35 L50 25 M55 35 L55 28 M60 35 L60 25" className={`stroke-current ${gradientColors}`} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M340 35 L340 25 M345 35 L345 28 M350 35 L350 25" className={`stroke-current ${gradientColors}`} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center pt-4 md:pt-6 px-2">
      <h3 className={`font-script text-2xl sm:text-3xl md:text-4xl ${textColor} text-glow-gold text-center leading-tight`}>
        {title}
      </h3>
      {subtitle && (
        <p className={`font-body text-[10px] sm:text-xs md:text-sm ${textColor} opacity-80 text-center max-w-[200px] sm:max-w-xs mt-1 px-2 leading-tight`}>
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

export const EventsSection = ({ days }: EventsSectionProps) => {
  return (
    <section className="relative py-12 md:py-20 lg:py-32 bg-gradient-to-b from-ivory via-cream to-cream-dark overflow-hidden">
      {/* Background decorative pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23C5A355' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='20' stroke='%23C5A355' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-16 relative z-10 px-4"
      >
        <h2 className="font-script text-4xl sm:text-5xl md:text-7xl text-magenta text-glow-magenta mb-4">
          Wedding Events
        </h2>
        <Divider className="max-w-xs mx-auto" />
      </motion.div>

      <div className="container max-w-4xl mx-auto px-3 sm:px-4 relative z-10">
        <div className="space-y-8 md:space-y-12">
          {days.map((day, dayIndex) => (
            <EventDayCard key={dayIndex} day={day} index={dayIndex} />
          ))}
        </div>
      </div>
    </section>
  );
};

const EventDayCard = ({ day, index }: { day: EventDay; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const eventNames = day.events.map(e => e.name);
  const theme = getEventTheme(day.title, eventNames);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* Floating illustrations - Left */}
      <div className="absolute -left-2 sm:-left-4 md:-left-12 top-1/4 opacity-40 hidden sm:block">
        <FloatingDecoration delay={0}>
          {renderIllustration(theme.illustrations[0], theme.primary, "w-10 h-10 md:w-16 md:h-16")}
        </FloatingDecoration>
      </div>
      
      {/* Floating illustrations - Right */}
      <div className="absolute -right-2 sm:-right-4 md:-right-12 top-1/3 opacity-40 hidden sm:block">
        <FloatingDecoration delay={0.5}>
          {renderIllustration(theme.illustrations[1], theme.secondary, "w-8 h-8 md:w-14 md:h-14")}
        </FloatingDecoration>
      </div>

      {/* Card with themed styling */}
      <div className={`relative bg-gradient-to-br ${theme.bg} backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border-2 ${theme.border}`}>
        {/* Ornate corner decorations */}
        <div className="absolute top-0 left-0 w-12 h-12 md:w-16 md:h-16">
          <svg viewBox="0 0 60 60" className={`w-full h-full ${theme.textColor} opacity-50`}>
            <path d="M0 0 L0 40 Q0 0 40 0 Z" fill="currentColor" opacity="0.2" />
            <path d="M0 0 Q30 30 0 60 M0 0 Q30 30 60 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 rotate-90">
          <svg viewBox="0 0 60 60" className={`w-full h-full ${theme.textColor} opacity-50`}>
            <path d="M0 0 L0 40 Q0 0 40 0 Z" fill="currentColor" opacity="0.2" />
            <path d="M0 0 Q30 30 0 60 M0 0 Q30 30 60 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 -rotate-90">
          <svg viewBox="0 0 60 60" className={`w-full h-full ${theme.textColor} opacity-50`}>
            <path d="M0 0 L0 40 Q0 0 40 0 Z" fill="currentColor" opacity="0.2" />
            <path d="M0 0 Q30 30 0 60 M0 0 Q30 30 60 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 rotate-180">
          <svg viewBox="0 0 60 60" className={`w-full h-full ${theme.textColor} opacity-50`}>
            <path d="M0 0 L0 40 Q0 0 40 0 Z" fill="currentColor" opacity="0.2" />
            <path d="M0 0 Q30 30 0 60 M0 0 Q30 30 60 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>

        {/* Mobile corner illustrations */}
        <div className="absolute top-2 right-2 opacity-30 sm:hidden">
          {renderIllustration(theme.illustrations[0], theme.primary, "w-8 h-8")}
        </div>

        {/* Arch Header with theme color */}
        <div className={theme.textColor}>
          <RajasthaniArchHeader 
            title={day.title} 
            subtitle={day.subtitle} 
            gradientColors={theme.textColor}
            textColor={theme.textColor}
          />
        </div>

        {/* Date */}
        <div className={`bg-gradient-to-r from-transparent via-current/10 to-transparent px-4 sm:px-6 py-2 sm:py-3 text-center ${theme.textColor}`}>
          <p className="font-heading text-lg sm:text-xl md:text-2xl font-semibold text-shadow-heading">
            {day.date}
          </p>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center px-4 sm:px-8">
          <div className={`flex-1 h-px bg-gradient-to-r from-transparent via-current to-transparent ${theme.textColor} opacity-30`} />
          <svg viewBox="0 0 30 15" className={`w-6 h-3 sm:w-8 sm:h-4 mx-2 ${theme.textColor}`}>
            <path d="M0 7.5 L10 7.5 M20 7.5 L30 7.5" stroke="currentColor" strokeWidth="1" />
            <circle cx="15" cy="7.5" r="3" fill="currentColor" />
          </svg>
          <div className={`flex-1 h-px bg-gradient-to-r from-transparent via-current to-transparent ${theme.textColor} opacity-30`} />
        </div>

        {/* Events */}
        <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
          {day.events.map((event, eventIndex) => (
            <motion.div
              key={eventIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + eventIndex * 0.1 }}
              className={`flex items-center justify-between py-2 sm:py-3 border-b ${theme.border} last:border-0`}
            >
              <div className="flex-1 min-w-0">
                <h4 className={`font-heading text-base sm:text-lg ${theme.textColor} font-semibold text-shadow-heading truncate`}>
                  {event.name}
                </h4>
                {event.description && (
                  <p className="font-body text-xs sm:text-sm opacity-70 mt-1 line-clamp-2">
                    {event.description}
                  </p>
                )}
              </div>
              <div className={`flex items-center gap-1 sm:gap-2 ${theme.textColor} ml-2 flex-shrink-0`}>
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-body text-sm sm:text-base font-medium whitespace-nowrap">{event.time}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Venue */}
        {(day.venue || day.address) && (
          <div className={`bg-gradient-to-r from-transparent via-current/5 to-transparent px-4 sm:px-6 py-3 sm:py-4 border-t ${theme.border} ${theme.textColor}`}>
            <div className="flex items-start gap-2 sm:gap-3 justify-center text-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="font-body text-[10px] sm:text-xs uppercase tracking-widest opacity-70 mb-1">
                  Venue
                </p>
                {day.venue && (
                  <p className="font-heading text-base sm:text-lg font-semibold text-shadow-heading">
                    {day.venue}
                  </p>
                )}
                {day.address && (
                  <p className="font-body text-xs sm:text-sm opacity-80 break-words">
                    {day.address}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom illustration bar for mobile */}
        <div className="flex justify-center gap-4 py-2 sm:hidden opacity-30">
          {renderIllustration(theme.illustrations[0], theme.primary, "w-6 h-6")}
          {renderIllustration(theme.illustrations[1], theme.secondary, "w-6 h-6")}
        </div>
      </div>
    </motion.div>
  );
};

export default EventsSection;
