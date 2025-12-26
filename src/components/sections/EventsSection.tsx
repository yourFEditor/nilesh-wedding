import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Divider } from "../OrnateFrame";
import { Clock, ExternalLink } from "lucide-react";
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
  FilmReelSVG,
  CameraSVG,
  SpotlightSVG,
} from "../decorative/EventIllustrations";
import { EventDetailModal } from "./EventDetailModal";

// Import event images
import ganeshIdol from "@/assets/ganesh-idol.png";
import baanThali from "@/assets/baan-thali.png";
import sakdiRitual from "@/assets/sakdi-ritual.png";
import haldiCouple from "@/assets/haldi-couple.png";
import cocktailCouple from "@/assets/cocktail-couple.png";
import weddingCouple from "@/assets/wedding-couple.png";

// Map event themes to their images
const getEventImage = (title: string, eventNames: string[]) => {
  const combined = (title + " " + eventNames.join(" ")).toLowerCase();
  
  // Check sakdi FIRST since "Sakdi Vinayak" contains both sakdi and vinayak
  if (combined.includes("sakdi")) {
    return sakdiRitual;
  }
  if (combined.includes("ganesh") || combined.includes("sthabpna") || combined.includes("sthapana") || combined.includes("vinayak")) {
    return ganeshIdol;
  }
  if (combined.includes("baan") || combined.includes("ban")) {
    return baanThali;
  }
  if (combined.includes("haldi")) {
    return haldiCouple;
  }
  if (combined.includes("sangeet") || combined.includes("cocktail")) {
    return cocktailCouple;
  }
  if (combined.includes("lagan") || combined.includes("barat") || combined.includes("wedding") || combined.includes("panigrahan")) {
    return weddingCouple;
  }
  return null;
};

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
  mapLink?: string;
}

interface EventsSectionProps {
  days: EventDay[];
}

// Get event theme based on event name - Pastel theme with dark text for better contrast
const getEventTheme = (title: string, eventNames: string[]) => {
  const titleLower = title.toLowerCase();
  const eventsLower = eventNames.map(n => n.toLowerCase()).join(" ");
  const combined = titleLower + " " + eventsLower;

  if (combined.includes("haldi")) {
    return {
      theme: "haldi",
      primary: "#d97706",
      secondary: "#f59e0b",
      bg: "from-amber-50/80 via-yellow-50/60 to-orange-50/40",
      border: "border-amber-300/50",
      headerBg: "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500",
      textColor: "text-amber-900",
      iconColor: "#b45309",
      illustrations: ["marigold", "turmeric", "kalash"],
    };
  }
  if (combined.includes("mehndi") || combined.includes("mehendi")) {
    return {
      theme: "mehndi",
      primary: "#059669",
      secondary: "#10b981",
      bg: "from-emerald-50/80 via-green-50/60 to-teal-50/40",
      border: "border-emerald-300/50",
      headerBg: "bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-500",
      textColor: "text-emerald-900",
      iconColor: "#047857",
      illustrations: ["mehendi", "marigold", "kalash"],
    };
  }
  if (combined.includes("ganesh") || combined.includes("sthapana") || combined.includes("sthabpna") || combined.includes("vinayak") || combined.includes("sakdi")) {
    return {
      theme: "ganesh",
      primary: "#ea580c",
      secondary: "#f97316",
      bg: "from-orange-50/80 via-amber-50/60 to-yellow-50/40",
      border: "border-orange-300/50",
      headerBg: "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500",
      textColor: "text-orange-900",
      iconColor: "#c2410c",
      illustrations: ["ganesh", "kalash", "marigold"],
    };
  }
  if (combined.includes("baan") || combined.includes("ban")) {
    return {
      theme: "baan",
      primary: "#b45309",
      secondary: "#d97706",
      bg: "from-yellow-50/80 via-amber-50/60 to-orange-50/40",
      border: "border-yellow-300/50",
      headerBg: "bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-500",
      textColor: "text-yellow-900",
      iconColor: "#92400e",
      illustrations: ["turmeric", "kalash", "marigold"],
    };
  }
  if (combined.includes("sangeet") || combined.includes("music") || combined.includes("dance") || combined.includes("camera") || combined.includes("lights")) {
    return {
      theme: "sangeet",
      primary: "#2563eb",
      secondary: "#3b82f6",
      bg: "from-blue-50/80 via-indigo-50/60 to-violet-50/40",
      border: "border-blue-300/50",
      headerBg: "bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500",
      textColor: "text-blue-900",
      iconColor: "#1d4ed8",
      illustrations: ["filmreel", "camera", "spotlight", "music", "dholak"],
    };
  }
  if (combined.includes("barat") || combined.includes("nikasi") || combined.includes("lagan") || combined.includes("panigrahan") || combined.includes("wedding")) {
    return {
      theme: "barat",
      primary: "#be123c",
      secondary: "#e11d48",
      bg: "from-rose-50/80 via-pink-50/60 to-red-50/40",
      border: "border-rose-300/50",
      headerBg: "bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500",
      textColor: "text-rose-900",
      iconColor: "#9f1239",
      illustrations: ["horse", "kalash", "marigold", "dholak"],
    };
  }
  // Default - warm coral/traditional
  return {
    theme: "default",
    primary: "#c2410c",
    secondary: "#ea580c",
    bg: "from-orange-50/80 via-amber-50/60 to-yellow-50/40",
    border: "border-orange-300/50",
    headerBg: "bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500",
    textColor: "text-orange-900",
    iconColor: "#9a3412",
    illustrations: ["kalash", "marigold", "ganesh"],
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
    case "filmreel":
      return <FilmReelSVG className={className} color={color} />;
    case "camera":
      return <CameraSVG className={className} color={color} />;
    case "spotlight":
      return <SpotlightSVG className={className} color={color} />;
    default:
      return <MarigoldSVG className={className} color={color} />;
  }
};

// Generate Google Maps link from address
const getMapLink = (address: string, mapLink?: string) => {
  if (mapLink) return mapLink;
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
};

// Themed Rajasthani Arch Header Component
const RajasthaniArchHeader = ({ 
  title, 
  headerBg,
  isSingleEvent,
}: { 
  title: string; 
  headerBg: string;
  isSingleEvent?: boolean;
}) => (
  <div className="relative">
    {/* Decorative arch with filled background */}
    <svg viewBox="0 0 400 80" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`archGrad-${title.replace(/\s/g, '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" />
        </linearGradient>
      </defs>
      {/* Arch outline */}
      <path
        d="M0 80 L0 50 Q0 25 25 25 L130 25 Q160 25 175 12 Q188 2 200 2 Q212 2 225 12 Q240 25 270 25 L375 25 Q400 25 400 50 L400 80"
        className="stroke-current fill-none opacity-40"
        strokeWidth="2"
      />
      {/* Inner arch detail */}
      <path
        d="M10 80 L10 52 Q10 32 32 32 L135 32 Q163 32 178 18 Q190 8 200 8 Q210 8 222 18 Q237 32 265 32 L368 32 Q390 32 390 52 L390 80"
        className="stroke-current fill-none opacity-20"
        strokeWidth="1"
      />
      {/* Top kalash ornament */}
      <circle cx="200" cy="8" r="5" className="fill-current opacity-60" />
      <path d="M195 8 L200 2 L205 8" className="fill-current opacity-60" />
      {/* Side decorative dots */}
      <circle cx="60" cy="40" r="3" className="fill-current opacity-30" />
      <circle cx="340" cy="40" r="3" className="fill-current opacity-30" />
      {/* Corner decorative curves */}
      <path d="M8 75 Q8 55 28 55" className="stroke-current fill-none opacity-25" strokeWidth="1.5" />
      <path d="M392 75 Q392 55 372 55" className="stroke-current fill-none opacity-25" strokeWidth="1.5" />
    </svg>
    
    {/* Title content positioned in header bar */}
    <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 ${headerBg} mx-4 sm:mx-8 py-2 px-4 rounded-full shadow-lg`}>
      <h3 className={`font-script ${isSingleEvent ? 'text-lg sm:text-xl md:text-2xl' : 'text-xl sm:text-2xl md:text-3xl'} text-white text-center text-shadow-heading leading-tight drop-shadow-lg`}>
        {title}
      </h3>
    </div>
  </div>
);

// Ornate corner decoration SVG
const OrnateCorner = ({ className, rotate = 0 }: { className: string; rotate?: number }) => (
  <svg viewBox="0 0 80 80" className={className} style={{ transform: `rotate(${rotate}deg)` }}>
    <defs>
      <linearGradient id="cornerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    <path d="M0 0 L0 50 Q0 0 50 0 Z" fill="url(#cornerGrad)" opacity="0.3" />
    <path d="M0 0 Q25 25 0 50" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
    <path d="M0 0 Q25 25 50 0" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.5" />
    <path d="M5 30 Q15 20 25 30" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
    <path d="M30 5 Q20 15 30 25" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
  </svg>
);

// Decorative side pattern
const SidePattern = ({ className, flip = false }: { className: string; flip?: boolean }) => (
  <svg viewBox="0 0 20 100" className={className} style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
    <path d="M10 0 L10 100" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.4" />
    <circle cx="10" cy="30" r="2" fill="currentColor" opacity="0.3" />
    <circle cx="10" cy="50" r="3" fill="currentColor" opacity="0.4" />
    <circle cx="10" cy="70" r="2" fill="currentColor" opacity="0.3" />
    <circle cx="10" cy="90" r="3" fill="currentColor" opacity="0.4" />
    <path d="M5 20 Q10 15 15 20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
    <path d="M5 40 Q10 35 15 40" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
    <path d="M5 60 Q10 55 15 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
    <path d="M5 80 Q10 75 15 80" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3" />
  </svg>
);

export const EventsSection = ({ days }: EventsSectionProps) => {
  return (
    <section className="relative py-12 md:py-20 lg:py-32 bg-gradient-to-b from-ivory via-cream to-cream-dark overflow-hidden">
      {/* Background decorative pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23C5A355' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='20' stroke='%23C5A355' stroke-width='0.5' fill='none'/%3E%3Cpath d='M50 10 L50 90 M10 50 L90 50' stroke='%23C5A355' stroke-width='0.3' /%3E%3C/svg%3E")`,
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      {/* Floating corner decorations */}
      <div className="absolute top-10 left-10 opacity-20 hidden lg:block">
        <FloatingDecoration delay={0}>
          <KalashSVG className="w-16 h-16" color="#C5A355" />
        </FloatingDecoration>
      </div>
      <div className="absolute top-10 right-10 opacity-20 hidden lg:block">
        <FloatingDecoration delay={1}>
          <MarigoldSVG className="w-14 h-14" color="#C5A355" />
        </FloatingDecoration>
      </div>
      <div className="absolute bottom-10 left-10 opacity-20 hidden lg:block">
        <FloatingDecoration delay={0.5}>
          <GaneshSmallSVG className="w-16 h-16" color="#C5A355" />
        </FloatingDecoration>
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 hidden lg:block">
        <FloatingDecoration delay={1.5}>
          <DholakSVG className="w-14 h-14" color="#C5A355" />
        </FloatingDecoration>
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

      <div className="container max-w-6xl mx-auto px-3 sm:px-4 relative z-10">
        {/* Responsive grid; when last row has a single card, let it span full width to avoid empty space */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {days.map((day, dayIndex) => {
            const total = days.length;
            const isLast = dayIndex === total - 1;

            const isSingleEvent = day.events.length === 1;
            // First 3 cards (index 0-2) are pre-events, last 3 (index 3-5) are main events
            const isMainEvent = dayIndex >= 3;
            const isLargeCard = day.events.length > 2 || Boolean(day.subtitle);

            const mdSingleLast = total % 2 === 1 && isLast;
            const lgSingleLast = total % 3 === 1 && isLast;

            const spanClass = [
              mdSingleLast ? "md:col-span-2 md:max-w-2xl md:mx-auto" : "",
              lgSingleLast ? "lg:col-span-3 lg:max-w-4xl lg:mx-auto" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <EventDayCard
                key={dayIndex}
                day={day}
                index={dayIndex}
                isSingleEvent={isSingleEvent}
                isLargeCard={isLargeCard}
                isMainEvent={isMainEvent}
                layoutClass={spanClass}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const EventDayCard = ({
  day,
  index,
  isSingleEvent = false,
  isLargeCard = false,
  isMainEvent = false,
  layoutClass = "",
}: {
  day: EventDay;
  index: number;
  isSingleEvent?: boolean;
  isLargeCard?: boolean;
  isMainEvent?: boolean;
  layoutClass?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eventNames = day.events.map((e) => e.name);
  const theme = getEventTheme(day.title, eventNames);
  const eventImage = getEventImage(day.title, eventNames);

  // Height classes: Main events have equal fixed height on desktop based on largest card
  const heightClass = isMainEvent
    ? 'min-h-[380px] sm:min-h-[400px] md:h-[480px]' // Main events - fixed height matching largest card (Lagan Laagi Re)
    : 'min-h-[320px] sm:min-h-[340px] md:min-h-[360px]'; // Pre-events - increased to fit images

  // Main events get neon glow effect
  const neonGlowStyle = isMainEvent
    ? {
        boxShadow: `
          0 0 15px ${theme.primary}60,
          0 0 30px ${theme.primary}40,
          0 0 45px ${theme.primary}20,
          0 10px 40px -10px ${theme.primary}50
        `,
      }
    : {};

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative w-full ${layoutClass}`}
    >
      {/* Card with themed styling */}
      <div
        onClick={() => setIsModalOpen(true)}
        className={`relative bg-gradient-to-br ${theme.bg} backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border-2 ${theme.border} flex flex-col cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ${heightClass} ${isMainEvent ? 'ring-2 ring-offset-2 ring-offset-transparent' : ''}`}
        style={neonGlowStyle}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L30 55 M5 30 L55 30' stroke='%23${theme.primary.replace(
                "#",
                ""
              )}' stroke-width='0.5' opacity='0.5'/%3E%3Ccircle cx='30' cy='30' r='20' stroke='%23${theme.primary.replace(
                "#",
                ""
              )}' stroke-width='0.3' fill='none'/%3E%3Ccircle cx='30' cy='30' r='10' stroke='%23${theme.primary.replace(
                "#",
                ""
              )}' stroke-width='0.3' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Ornate corner decorations */}
        <OrnateCorner
          className={`absolute top-0 left-0 w-12 h-12 ${theme.textColor}`}
          rotate={0}
        />
        <OrnateCorner
          className={`absolute top-0 right-0 w-12 h-12 ${theme.textColor}`}
          rotate={90}
        />
        <OrnateCorner
          className={`absolute bottom-0 left-0 w-12 h-12 ${theme.textColor}`}
          rotate={-90}
        />
        <OrnateCorner
          className={`absolute bottom-0 right-0 w-12 h-12 ${theme.textColor}`}
          rotate={180}
        />

        {/* Side patterns */}
        <SidePattern
          className={`absolute left-0 top-1/4 h-1/2 w-4 ${theme.textColor}`}
        />
        <SidePattern
          className={`absolute right-0 top-1/4 h-1/2 w-4 ${theme.textColor}`}
          flip
        />

        {/* Event Image - positioned below header */}
        {eventImage && (
          <div className="flex items-center justify-center flex-1 z-10">
            <img 
              src={eventImage} 
              alt={day.title}
              className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain drop-shadow-lg"
            />
          </div>
        )}

        {/* Floating illustrations in card corners - only show if no image */}
        {!eventImage && (
          <>
            <div className="absolute top-14 right-3 opacity-25">
              {renderIllustration(theme.illustrations[0], theme.primary, "w-8 h-8")}
            </div>
            <div className="absolute bottom-16 left-3 opacity-25">
              {renderIllustration(
                theme.illustrations[1] || theme.illustrations[0],
                theme.secondary,
                "w-6 h-6"
              )}
            </div>
            {theme.illustrations[2] && (
              <div className="absolute bottom-16 right-3 opacity-20">
                {renderIllustration(
                  theme.illustrations[2],
                  theme.primary,
                  "w-6 h-6"
                )}
              </div>
            )}
          </>
        )}

        {/* Arch Header with theme color */}
        <div className={theme.textColor}>
          <RajasthaniArchHeader
            title={day.title}
            headerBg={theme.headerBg}
            isSingleEvent={isSingleEvent}
          />
        </div>

        {/* Date */}
        <div className={`px-4 py-1.5 text-center ${theme.textColor}`}>
          <p className="font-heading text-base sm:text-lg md:text-xl font-semibold text-shadow-heading">
            {day.date}
          </p>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center px-6">
          <div
            className={`flex-1 h-px bg-gradient-to-r from-transparent via-current to-transparent ${theme.textColor} opacity-30`}
          />
          <svg viewBox="0 0 30 15" className={`w-6 h-3 mx-2 ${theme.textColor}`}>
            <path
              d="M0 7.5 L8 7.5 M22 7.5 L30 7.5"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="15" cy="7.5" r="3" fill="currentColor" />
            <circle
              cx="15"
              cy="7.5"
              r="5"
              stroke="currentColor"
              fill="none"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </svg>
          <div
            className={`flex-1 h-px bg-gradient-to-r from-transparent via-current to-transparent ${theme.textColor} opacity-30`}
          />
        </div>

        {/* Events - centered content with compact spacing */}
        <div className="px-3 py-2 flex-1 flex flex-col justify-center">
          {isSingleEvent ? (
            <div className="flex items-center justify-center">
              <div className={`flex items-center gap-2 ${theme.textColor}`}>
                <Clock className="w-5 h-5" />
                <span className="font-heading text-xl sm:text-2xl font-semibold">
                  {day.events[0].time}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {day.events.map((event, eventIndex) => (
                <motion.div
                  key={eventIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + eventIndex * 0.1 }}
                  className={`flex items-center justify-between py-1.5 border-b ${theme.border} last:border-0`}
                >
                  <h4
                    className={`font-heading text-sm sm:text-base md:text-lg ${theme.textColor} font-semibold truncate`}
                  >
                    {event.name}
                  </h4>
                  <div
                    className={`flex items-center gap-1.5 ${theme.textColor} ml-2 flex-shrink-0`}
                  >
                    <Clock className="w-4 h-4" />
                    <span className="font-body text-sm sm:text-base font-medium whitespace-nowrap">
                      {event.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Venue with Google Maps link - always at bottom */}
        {(day.venue || day.address) && (
          <div
            className={`mt-auto bg-gradient-to-r from-transparent via-current/5 to-transparent px-3 py-2 border-t ${theme.border} ${theme.textColor}`}
          >
            <a
              href={getMapLink(day.address || day.venue || "", day.mapLink)}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:opacity-80 transition-opacity cursor-pointer group"
            >
              <div className="text-center">
                <p className="font-body text-[9px] uppercase tracking-widest opacity-70 mb-0.5 flex items-center justify-center gap-1">
                  Venue
                  <ExternalLink className="w-2 h-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                </p>
                {day.venue && (
                  <p className="font-heading text-lg sm:text-xl md:text-2xl font-bold group-hover:underline line-clamp-1">
                    {day.venue}
                  </p>
                )}
                {day.address && (
                  <p className="font-body text-[10px] opacity-80 break-words group-hover:underline leading-tight line-clamp-1">
                    {day.address}
                  </p>
                )}
              </div>
            </a>
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      <EventDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        day={day}
        theme={theme}
      />
    </motion.div>
  );
};

