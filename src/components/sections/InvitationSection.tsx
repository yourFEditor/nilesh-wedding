import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { OrnateFrame, GaneshIcon, Divider } from "../OrnateFrame";

interface FamilyMember {
  title: string;
  name: string;
}

interface InvitationSectionProps {
  grandparents?: FamilyMember;
  groomParents: FamilyMember;
  groomName: string;
  groomParentRelation: string;
  brideName: string;
  brideParents: FamilyMember;
  weddingDate: string;
  nimantrak?: string[];
  address?: string;
  phone?: string;
}

export const InvitationSection = ({
  grandparents,
  groomParents,
  groomName,
  groomParentRelation,
  brideName,
  brideParents,
  weddingDate,
  nimantrak,
  address,
  phone,
}: InvitationSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-32 bg-gradient-to-b from-cream-dark via-cream to-ivory overflow-hidden"
    >
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <OrnateFrame className="bg-cream/80 backdrop-blur-sm">
            {/* Ganesh at top */}
            <div className="flex justify-center -mt-16 mb-6">
              <div className="bg-cream rounded-full p-4 border-2 border-gold">
                <GaneshIcon className="w-16 h-16" />
              </div>
            </div>

            {/* Shri Ganeshay Namah */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-center font-heading text-lg text-gold mb-4"
            >
              ॥ श्री गणेशाय नमः ॥
            </motion.p>

            {/* Grandparents */}
            {grandparents && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="text-center mb-6"
              >
                <p className="font-heading text-xl md:text-2xl text-brown font-semibold">
                  {grandparents.name}
                </p>
                <p className="font-body text-sm text-brown-light">
                  {grandparents.title}
                </p>
              </motion.div>
            )}

            <Divider />

            {/* Parents of Groom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="text-center mb-6"
            >
              <p className="font-heading text-lg md:text-xl text-brown">
                {groomParents.name}
              </p>
              <p className="font-body text-sm text-brown-light mt-1">
                {groomParents.title}
              </p>
            </motion.div>

            {/* Invitation text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="text-center font-body text-brown-light mb-6"
            >
              Request the honour of your presence at the marriage of their {groomParentRelation}
            </motion.p>

            {/* Groom Name */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="text-center font-script text-5xl md:text-7xl text-magenta mb-4"
            >
              {groomName}
            </motion.h2>

            {/* With */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="text-center font-script text-3xl text-gold mb-4"
            >
              with
            </motion.p>

            {/* Bride Name */}
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="text-center font-script text-5xl md:text-7xl text-magenta mb-4"
            >
              {brideName}
            </motion.h2>

            {/* Bride's Parents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              className="text-center mb-6"
            >
              <p className="font-body text-sm text-brown-light">
                {brideParents.title}
              </p>
              <p className="font-heading text-lg md:text-xl text-brown">
                {brideParents.name}
              </p>
            </motion.div>

            <Divider />

            {/* Wedding Date */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.1 }}
              className="text-center mb-6"
            >
              <p className="font-body text-sm text-gold uppercase tracking-wider mb-1">on</p>
              <p className="font-heading text-2xl md:text-3xl text-magenta font-semibold">
                {weddingDate}
              </p>
            </motion.div>

            <Divider />

            {/* Nimantrak */}
            {nimantrak && nimantrak.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="text-center mt-6"
              >
                <p className="font-body text-xs uppercase tracking-widest text-gold mb-2">
                  Nimantrak
                </p>
                {nimantrak.map((name, index) => (
                  <p key={index} className="font-heading text-lg text-brown">
                    {name}
                  </p>
                ))}
              </motion.div>
            )}

            {/* Address & Phone */}
            {(address || phone) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.3 }}
                className="text-center mt-6"
              >
                {address && (
                  <p className="font-body text-sm text-brown-light">
                    {address}
                  </p>
                )}
                {phone && (
                  <p className="font-body text-sm text-magenta mt-1">
                    Mob: {phone}
                  </p>
                )}
              </motion.div>
            )}
          </OrnateFrame>
        </motion.div>
      </div>
    </section>
  );
};

export default InvitationSection;
