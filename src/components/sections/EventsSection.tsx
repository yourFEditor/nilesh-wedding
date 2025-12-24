import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Divider } from "../OrnateFrame";
import { MapPin, Clock } from "lucide-react";

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

// Rajasthani Arch Header Component
const RajasthaniArchHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="relative">
    <svg viewBox="0 0 400 100" className="w-full h-auto" preserveAspectRatio="none">
      <defs>
        <linearGradient id="archHeaderGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="30%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="archHeaderFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#b45309" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {/* Main arch outline */}
      <path
        d="M0 100 L0 70 Q0 35 35 35 L100 35 Q120 35 135 20 Q160 0 200 0 Q240 0 265 20 Q280 35 300 35 L365 35 Q400 35 400 70 L400 100"
        fill="url(#archHeaderFill)"
        stroke="url(#archHeaderGold)"
        strokeWidth="3"
      />
      {/* Inner arch detail */}
      <path
        d="M20 100 L20 75 Q20 50 50 50 L110 50 Q130 50 145 35 Q165 15 200 15 Q235 15 255 35 Q270 50 290 50 L350 50 Q380 50 380 75 L380 100"
        fill="none"
        stroke="url(#archHeaderGold)"
        strokeWidth="1.5"
        opacity="0.5"
      />
      {/* Top ornament - Kalash */}
      <circle cx="200" cy="12" r="8" fill="url(#archHeaderGold)" />
      <path d="M192 12 L200 2 L208 12" fill="url(#archHeaderGold)" />
      {/* Side lotus buds */}
      <ellipse cx="100" cy="45" rx="6" ry="10" fill="url(#archHeaderGold)" opacity="0.6" />
      <ellipse cx="300" cy="45" rx="6" ry="10" fill="url(#archHeaderGold)" opacity="0.6" />
      {/* Corner decorations */}
      <circle cx="30" cy="55" r="4" fill="url(#archHeaderGold)" opacity="0.4" />
      <circle cx="370" cy="55" r="4" fill="url(#archHeaderGold)" opacity="0.4" />
      {/* Side hanging elements */}
      <path d="M50 35 L50 25 M55 35 L55 28 M60 35 L60 25" stroke="url(#archHeaderGold)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M340 35 L340 25 M345 35 L345 28 M350 35 L350 25" stroke="url(#archHeaderGold)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
      <h3 className="font-script text-3xl md:text-4xl text-magenta drop-shadow-lg">
        {title}
      </h3>
      {subtitle && (
        <p className="font-body text-xs md:text-sm text-brown text-center max-w-xs mt-1 px-4">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

export const EventsSection = ({ days }: EventsSectionProps) => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-ivory via-cream to-cream-dark overflow-hidden">
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
        className="text-center mb-16 relative z-10"
      >
        <h2 className="font-script text-5xl md:text-7xl text-magenta mb-4">
          Wedding Events
        </h2>
        <Divider className="max-w-xs mx-auto" />
      </motion.div>

      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        <div className="space-y-12">
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* Card with ornate border */}
      <div className="relative bg-cream/95 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl border-2 border-gold/30">
        {/* Ornate corner decorations */}
        <div className="absolute top-0 left-0 w-16 h-16">
          <svg viewBox="0 0 60 60" className="w-full h-full text-gold opacity-50">
            <path d="M0 0 L0 40 Q0 0 40 0 Z" fill="currentColor" opacity="0.2" />
            <path d="M0 0 Q30 30 0 60 M0 0 Q30 30 60 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-16 h-16 rotate-90">
          <svg viewBox="0 0 60 60" className="w-full h-full text-gold opacity-50">
            <path d="M0 0 L0 40 Q0 0 40 0 Z" fill="currentColor" opacity="0.2" />
            <path d="M0 0 Q30 30 0 60 M0 0 Q30 30 60 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 -rotate-90">
          <svg viewBox="0 0 60 60" className="w-full h-full text-gold opacity-50">
            <path d="M0 0 L0 40 Q0 0 40 0 Z" fill="currentColor" opacity="0.2" />
            <path d="M0 0 Q30 30 0 60 M0 0 Q30 30 60 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 rotate-180">
          <svg viewBox="0 0 60 60" className="w-full h-full text-gold opacity-50">
            <path d="M0 0 L0 40 Q0 0 40 0 Z" fill="currentColor" opacity="0.2" />
            <path d="M0 0 Q30 30 0 60 M0 0 Q30 30 60 0" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          </svg>
        </div>

        {/* Arch Header */}
        <RajasthaniArchHeader title={day.title} subtitle={day.subtitle} />

        {/* Date */}
        <div className="bg-gradient-to-r from-transparent via-gold/10 to-transparent px-6 py-3 text-center">
          <p className="font-heading text-xl md:text-2xl text-magenta font-semibold">
            {day.date}
          </p>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center px-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <svg viewBox="0 0 30 15" className="w-8 h-4 mx-2 text-gold">
            <path d="M0 7.5 L10 7.5 M20 7.5 L30 7.5" stroke="currentColor" strokeWidth="1" />
            <circle cx="15" cy="7.5" r="3" fill="currentColor" />
          </svg>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        {/* Events */}
        <div className="p-6 space-y-3">
          {day.events.map((event, eventIndex) => (
            <motion.div
              key={eventIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + eventIndex * 0.1 }}
              className="flex items-center justify-between py-3 border-b border-gold/20 last:border-0"
            >
              <div className="flex-1">
                <h4 className="font-heading text-lg text-brown font-semibold">
                  {event.name}
                </h4>
                {event.description && (
                  <p className="font-body text-sm text-brown-light mt-1">
                    {event.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 text-gold">
                <Clock className="w-4 h-4" />
                <span className="font-body text-brown font-medium">{event.time}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Venue */}
        {(day.venue || day.address) && (
          <div className="bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 px-6 py-4 border-t border-gold/20">
            <div className="flex items-start gap-3 justify-center text-center">
              <MapPin className="w-5 h-5 text-magenta flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-gold mb-1">
                  Venue
                </p>
                {day.venue && (
                  <p className="font-heading text-lg text-brown font-semibold">
                    {day.venue}
                  </p>
                )}
                {day.address && (
                  <p className="font-body text-sm text-brown-light">
                    {day.address}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EventsSection;
