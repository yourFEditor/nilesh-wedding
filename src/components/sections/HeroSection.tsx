import { motion } from "framer-motion";
import { GaneshIcon, Divider } from "../OrnateFrame";

interface HeroSectionProps {
  groomName: string;
  brideName: string;
  weddingDate: string;
  tagline?: string;
}

export const HeroSection = ({
  groomName,
  brideName,
  weddingDate,
  tagline = "A Beginning of Forever",
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cream via-ivory to-cream-dark">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L30 60M0 30L60 30M15 15L45 45M45 15L15 45' stroke='%23C5A355' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-20 text-center px-6 py-20">
        {/* Ganesh Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <GaneshIcon className="w-24 h-24 md:w-32 md:h-32" />
        </motion.div>

        {/* Sanskrit Shloka */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-heading text-lg md:text-xl text-brown-light mb-2"
        >
          ॥ श्री गणेशाय नमः ॥
        </motion.p>

        <Divider className="max-w-xs mx-auto mb-8" />

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-heading text-xl md:text-2xl tracking-[0.3em] text-gold-dark uppercase mb-8"
        >
          {tagline}
        </motion.h2>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-8"
        >
          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-magenta mb-4 text-shadow-gold">
            {groomName}
          </h1>
          <p className="font-heading text-2xl md:text-3xl text-gold tracking-[0.5em] my-4">
            WEDS
          </p>
          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-magenta text-shadow-gold">
            {brideName}
          </h1>
        </motion.div>

        <Divider className="max-w-xs mx-auto mb-8" />

        {/* Wedding Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <p className="font-heading text-xl md:text-2xl text-brown font-semibold">
            {weddingDate}
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gold"
          >
            <span className="font-body text-sm tracking-wider">Scroll</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
