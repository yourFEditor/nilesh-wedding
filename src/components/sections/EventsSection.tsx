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

export const EventsSection = ({ days }: EventsSectionProps) => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-ivory via-cream to-cream-dark overflow-hidden">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-script text-5xl md:text-7xl text-magenta mb-4">
          Wedding Events
        </h2>
        <Divider className="max-w-xs mx-auto" />
      </motion.div>

      <div className="container max-w-4xl mx-auto px-4">
        <div className="space-y-16">
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
      {/* Card */}
      <div className="bg-cream/90 backdrop-blur-sm border-2 border-gold rounded-lg overflow-hidden shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-gold-dark via-gold to-gold-dark px-6 py-4">
          <h3 className="font-script text-3xl md:text-4xl text-cream text-center">
            {day.title}
          </h3>
          {day.subtitle && (
            <p className="font-body text-sm text-cream/80 text-center mt-1">
              {day.subtitle}
            </p>
          )}
        </div>

        {/* Date */}
        <div className="bg-gold/10 px-6 py-3 text-center border-b border-gold/30">
          <p className="font-heading text-xl md:text-2xl text-magenta font-semibold">
            {day.date}
          </p>
        </div>

        {/* Events */}
        <div className="p-6 space-y-4">
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
                <span className="font-body text-brown">{event.time}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Venue */}
        {(day.venue || day.address) && (
          <div className="bg-gold/5 px-6 py-4 border-t border-gold/30">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-magenta flex-shrink-0 mt-1" />
              <div>
                <p className="font-body text-xs uppercase tracking-wider text-gold mb-1">
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
