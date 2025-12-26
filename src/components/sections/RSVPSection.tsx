import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { OrnateFrame, Divider } from "../OrnateFrame";
import { Phone, MessageCircle } from "lucide-react";

interface ContactGroup {
  title: string;
  contacts: { name: string; phone?: string }[];
}

interface RSVPSectionProps {
  rsvpContacts: ContactGroup[];
  specialRequests?: ContactGroup;
  compliments?: { title: string; names: string[] };
  awaitingEyes?: string[];
  maternal?: ContactGroup;
  firms?: { groomSide: string[]; brideSide: string[] };
  whatsappNumber?: string;
}

export const RSVPSection = ({
  rsvpContacts,
  specialRequests,
  compliments,
  awaitingEyes,
  maternal,
  firms,
  whatsappNumber,
}: RSVPSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-32 bg-gradient-to-b from-cream-dark via-cream to-ivory overflow-hidden"
    >
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-script text-5xl md:text-7xl text-magenta mb-4">
            We Look Forward to Seeing You
          </h2>
          <Divider className="max-w-xs mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <OrnateFrame className="bg-cream/80 backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-8">
              {/* RSVP Contacts */}
              {rsvpContacts.map((group, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <h3 className="font-heading text-lg text-gold font-semibold mb-4 uppercase tracking-wider">
                    {group.title}
                  </h3>
                  <div className="space-y-2">
                    {group.contacts.map((contact, cIndex) => (
                      <p key={cIndex} className="font-body text-brown">
                        {contact.name}
                        {contact.phone && (
                          <span className="text-brown-light"> - {contact.phone}</span>
                        )}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Special Requests */}
            {specialRequests && (
              <>
                <Divider className="my-8" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <h3 className="font-heading text-lg text-gold font-semibold mb-4 uppercase tracking-wider">
                    {specialRequests.title}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {specialRequests.contacts.map((contact, index) => (
                      <p key={index} className="font-body text-brown text-sm">
                        {contact.name}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {/* Compliments */}
            {compliments && (
              <>
                <Divider className="my-8" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <h3 className="font-heading text-lg text-gold font-semibold mb-4 uppercase tracking-wider">
                    {compliments.title}
                  </h3>
                  <div className="space-y-1">
                    {compliments.names.map((name, index) => (
                      <p key={index} className="font-body text-brown">
                        {name}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {/* Awaiting Eyes & Maternal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-2xl mx-auto">
              {awaitingEyes && awaitingEyes.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 }}
                  className="md:mr-auto md:max-w-md"
                >
                  <h3 className="font-heading text-lg text-gold font-semibold mb-4 uppercase tracking-wider text-center md:text-left">
                    Awaiting Eyes
                  </h3>
                  <p className="font-body text-brown text-center md:text-left text-sm">
                    {awaitingEyes.join(", ")}
                  </p>
                </motion.div>
              )}

              {maternal && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                  className="text-center md:text-right md:ml-auto md:max-w-[260px]"
                >
                  <h3 className="font-heading text-lg text-gold font-semibold mb-4 uppercase tracking-wider">
                    {maternal.title}
                  </h3>
                  <div className="space-y-1">
                    {maternal.contacts.map((contact, index) => (
                      <p key={index} className="font-body text-brown text-sm">
                        {contact.name}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Firms */}
            {firms && (
              <>
                <Divider className="my-8" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9 }}
                >
                  <h3 className="font-heading text-lg text-gold font-semibold mb-6 uppercase tracking-wider text-center">
                    Firms
                  </h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="font-body text-sm text-gold mb-3 uppercase tracking-wider">
                        Groom Side
                      </p>
                      <div className="space-y-1">
                        {firms.groomSide.map((firm, index) => (
                          <p key={index} className="font-body text-brown text-sm">
                            {firm}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-body text-sm text-gold mb-3 uppercase tracking-wider">
                        Bride Side
                      </p>
                      <div className="space-y-1">
                        {firms.brideSide.map((firm, index) => (
                          <p key={index} className="font-body text-brown text-sm">
                            {firm}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {/* WhatsApp RSVP */}
            {whatsappNumber && (
              <>
                <Divider className="my-8" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 }}
                  className="text-center"
                >
                  <p className="font-body text-brown-light mb-4">
                    Kindly confirm your presence
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-cream px-8 py-4 rounded-full font-body font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                    RSVP on WhatsApp
                  </a>
                </motion.div>
              </>
            )}
          </OrnateFrame>
        </motion.div>
      </div>
    </section>
  );
};

export default RSVPSection;
