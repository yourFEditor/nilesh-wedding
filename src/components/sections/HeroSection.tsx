import { motion } from "framer-motion";
import { GaneshIcon, Divider } from "../OrnateFrame";
import { ElephantSVG, LotusSVG, FloatingStars } from "../decorative/RajasthaniElements";

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
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0L40 80M0 40L80 40M20 20L60 60M60 20L20 60' stroke='%23C5A355' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='40' cy='40' r='15' stroke='%23C5A355' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating Stars */}
      <FloatingStars />

      {/* Left Decorative Border - Hidden on mobile */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 md:w-32 hidden sm:flex flex-col items-center justify-between py-10 opacity-60">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <LotusSVG className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex-1 w-px bg-gradient-to-b from-gold via-gold/50 to-gold my-4"
        />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <ElephantSVG className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex-1 w-px bg-gradient-to-b from-gold via-gold/50 to-gold my-4"
        />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.7 }}
        >
          <LotusSVG className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
        </motion.div>
      </div>

      {/* Right Decorative Border - Hidden on mobile */}
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 md:w-32 hidden sm:flex flex-col items-center justify-between py-10 opacity-60">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <LotusSVG className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex-1 w-px bg-gradient-to-b from-gold via-gold/50 to-gold my-4"
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <ElephantSVG className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28" flip />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex-1 w-px bg-gradient-to-b from-gold via-gold/50 to-gold my-4"
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.7 }}
        >
          <LotusSVG className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
        </motion.div>
      </div>

      <div className="relative z-20 text-center px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-4xl mx-auto">
        {/* Ganesh Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-4 sm:mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-gold/20 to-transparent rounded-full scale-150" />
            <GaneshIcon className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 relative" />
          </div>
        </motion.div>

        {/* Sanskrit Shloka */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-heading text-base sm:text-lg md:text-xl text-brown-light text-shadow-heading mb-2"
        >
          ॥ श्री गणेशाय नमः ॥
        </motion.p>

        <Divider className="max-w-[200px] sm:max-w-xs mx-auto mb-6 sm:mb-8" />

        {/* Tagline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="font-heading text-sm sm:text-lg md:text-2xl tracking-[0.15em] sm:tracking-[0.3em] text-gold-dark text-glow-gold uppercase mb-6 sm:mb-8"
        >
          {tagline}
        </motion.h2>

        {/* Couple Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="font-script text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-magenta text-glow-magenta mb-2 sm:mb-4">
            {groomName}
          </h1>
          <p className="font-heading text-xl sm:text-2xl md:text-3xl text-gold text-glow-gold tracking-[0.3em] sm:tracking-[0.5em] my-2 sm:my-4">
            WEDS
          </p>
          <h1 className="font-script text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-magenta text-glow-magenta">
            {brideName}
          </h1>
        </motion.div>

        <Divider className="max-w-[200px] sm:max-w-xs mx-auto mb-6 sm:mb-8" />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="font-heading text-xs sm:text-base md:text-xl text-gold-dark text-glow-gold tracking-wider sm:tracking-widest uppercase mb-4 sm:mb-6 px-2"
        >
          A Union of Two Souls • A Bond Between Two Families
        </motion.p>

        {/* Wedding Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center"
        >
          <p className="font-heading text-lg sm:text-xl md:text-2xl text-brown text-shadow-heading font-semibold">
            {weddingDate}
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
