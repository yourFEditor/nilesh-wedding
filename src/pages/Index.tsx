import { FloatingElements } from "@/components/FloatingElements";
import { HeroSection } from "@/components/sections/HeroSection";
import { InvitationSection } from "@/components/sections/InvitationSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { RSVPSection } from "@/components/sections/RSVPSection";
import { LotusSVG, PeacockSVG } from "@/components/decorative/RajasthaniElements";
import { motion } from "framer-motion";

// Wedding Data - Edit these details
const weddingData = {
  // Couple Details
  groomName: "Neelesh",
  brideName: "Ayushi",
  weddingDate: "Friday, 6th February 2026",
  tagline: "A Beginning of Forever",

  // Family Details
  grandparents: {
    title: "With the blessings of",
    name: "Smt. Chandrakala & Sh. Hari Shankar Agarwal",
  },
  groomParents: {
    title: "Parents of the Groom",
    name: "Smt. Anita & Sh. Jitendra Agarwal",
  },
  groomParentRelation: "Grand Son",
  brideParents: {
    title: "D/o",
    name: "Smt. Hansa & Sh. Anil Ji Goyal",
  },
  nimantrak: ["Hari Sankar Agarwal", "Jitendra Agarwal"],
  address: "A-21, Sudama Marg, Vijay Vadi, Path No. 6, Sikar Road, Jaipur",
  phone: "9828023034",

  // Events
  eventDays: [
    {
      title: "Ganesh Sthapana",
      date: "Saturday, 31st January 2026",
      venue: "At Residence",
      address: "A-21, Sudama Marg, Vijay Vadi, Path No. 6, Sikar Road, Jaipur",
      mapLink: "https://maps.google.com/?q=A-21,+Sudama+Marg,+Vijay+Vadi,+Path+No.+6,+Sikar+Road,+Jaipur",
      events: [
        { name: "Ganesh Sthapana", time: "9:00 am", date: "", description: "" },
      ],
    },
    {
      title: "Baan",
      date: "Monday, 2nd February 2026",
      venue: "At Residence",
      address: "A-21, Sudama Marg, Vijay Vadi, Path No. 6, Sikar Road, Jaipur",
      mapLink: "https://maps.google.com/?q=A-21,+Sudama+Marg,+Vijay+Vadi,+Path+No.+6,+Sikar+Road,+Jaipur",
      events: [
        { name: "Baan", time: "10:15 am", date: "", description: "" },
      ],
    },
    {
      title: "Sakdi Vinayak",
      date: "Wednesday, 4th February 2026",
      venue: "At Residence",
      address: "A-21, Sudama Marg, Vijay Vadi, Path No. 6, Sikar Road, Jaipur",
      mapLink: "https://maps.google.com/?q=A-21,+Sudama+Marg,+Vijay+Vadi,+Path+No.+6,+Sikar+Road,+Jaipur",
      events: [
        { name: "Sakdi Vinayak", time: "11:15 am", date: "", description: "" },
      ],
    },
    {
      title: "Haldi Ceremony",
      subtitle: "Come together as we playfully apply Haldi and bless our couple in the colors of purity!",
      date: "Thursday, 5th February 2026",
      venue: "Idanta",
      address: "Green Triveni, Grand Sikar Road Behind, Ashiana Greens, Jaipur-302048",
      mapLink: "https://maps.google.com/?q=Green+Triveni,+Grand+Sikar+Road+Behind,+Ashiana+Greens,+Jaipur-302048",
      events: [
        { name: "Haldi", time: "11:00 am", date: "", description: "" },
        { name: "Lunch", time: "1:00 pm", date: "", description: "" },
        { name: "Tilak", time: "5:15 pm", date: "", description: "" },
      ],
    },
    {
      title: "Lights, Camera, Sangeet",
      subtitle: "Step into a Bollywood Blockbuster Night where music, camera, dance and filmy-style celebrations light up the stage!",
      date: "Thursday, 5th February 2026",
      venue: "Idanta",
      address: "Green Triveni, Grand Sikar Road Behind, Ashiana Greens, Jaipur-302048",
      mapLink: "https://maps.google.com/?q=Green+Triveni,+Grand+Sikar+Road+Behind,+Ashiana+Greens,+Jaipur-302048",
      events: [
        { name: "Sangeet Ceremony", time: "7:00 pm", date: "", description: "" },
      ],
    },
    {
      title: "Lagan-Laagi-Re",
      subtitle: "Witness the sacred exchange of Vows as the couple seal their union in love and commitment!",
      date: "Friday, 6th February 2026",
      venue: "Idanta",
      address: "Green Triveni, Grand Sikar Road Behind, Ashiana Greens, Jaipur-302048",
      mapLink: "https://maps.google.com/?q=Green+Triveni,+Grand+Sikar+Road+Behind,+Ashiana+Greens,+Jaipur-302048",
      events: [
        { name: "Bhaat", time: "11:00 am", date: "", description: "" },
        { name: "Lunch", time: "1:00 pm", date: "", description: "" },
        { name: "Nikasi", time: "6:15 pm", date: "", description: "" },
        { name: "Dinner", time: "8:00 pm", date: "", description: "" },
        { name: "Panigrahan Sanskar", time: "Midnight", date: "", description: "" },
      ],
    },
  ],

  // RSVP Section
  rsvpContacts: [
    {
      title: "RSVP",
      contacts: [
        { name: "Krishna Kumar- Manisha" },
        { name: "Ashish- Ashtha" },
        { name: "Arvind- Sonia" },
        { name: "Amrit- Meena" },
        { name: "Manohar" },
      ],
    },
    {
      title: "Special Request",
      contacts: [
        { name: "Kanchan- Ajit Ji Goyal" },
        { name: "Mamta- Rajesh Ji Agarwal" },
        { name: "Shashi- Sushil Ji Agarwal" },
        { name: "Archna- Sanjay Ji Agarwal" },
        { name: "Mukul- Ravi Ji Agarwal" },
      ],
    },
    {
      title: "With Best Compliments From",
      contacts: [
        { name: "Mohan Lal & Kiran" },
        { name: "All Shobharam Ji Ka Parivar" },
      ],
    },
  ],
  compliments: {
    title: "Warm Regards",
    names: ["Raj Kumar- Gita"],
  },
  awaitingEyes: [
    "Tanmay", "Bhavya", "Rudra", "Kavya", "Mukund", "Lakshit", "Nimit",
    "Harsh", "Riya", "Hardik", "Aditi",
  ],
  maternal: {
    title: "Maternal",
    contacts: [
      { name: "Arun- Meenu" },
      { name: "Amit- Ritu" },
    ],
  },
  firms: {
    groomSide: [
      "Shri Govind Associates",
      "Vijay Distributors",
      "Shri Govind Marketing",
      "Shri Govind Traders",
      "Shri Lokesh Enterprises",
      "Agarwal Exim",
    ],
    brideSide: [
      "Shree Ram Medical & General Store",
      "Toshit Distributors",
      "Toshit Surgical & Pharmaceuticals",
      "G Pharma",
      "Gats Biotech Pvt. Ltd.",
    ],
  },
  whatsappNumber: "919828023034",
};

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Floating Diyas with Parallax - Hero only */}
      <FloatingElements variant="mixed" intensity="heavy" heroOnly={true} />

      {/* Hero Section */}
      <HeroSection
        groomName={weddingData.groomName}
        brideName={weddingData.brideName}
        weddingDate={weddingData.weddingDate}
        tagline={weddingData.tagline}
      />

      {/* Main Invitation */}
      <InvitationSection
        grandparents={weddingData.grandparents}
        groomParents={weddingData.groomParents}
        groomName={weddingData.groomName}
        groomParentRelation={weddingData.groomParentRelation}
        brideName={weddingData.brideName}
        brideParents={weddingData.brideParents}
        weddingDate={weddingData.weddingDate}
        nimantrak={weddingData.nimantrak}
        address={weddingData.address}
        phone={weddingData.phone}
      />

      {/* Events Timeline */}
      <EventsSection days={weddingData.eventDays} />

      {/* RSVP & Contacts */}
      <RSVPSection
        rsvpContacts={weddingData.rsvpContacts}
        compliments={weddingData.compliments}
        awaitingEyes={weddingData.awaitingEyes}
        maternal={weddingData.maternal}
        firms={weddingData.firms}
        whatsappNumber={weddingData.whatsappNumber}
      />

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-ivory to-cream-dark py-16 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute left-8 bottom-8 opacity-40">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <LotusSVG className="w-16 h-16" />
          </motion.div>
        </div>
        <div className="absolute right-8 bottom-8 opacity-40">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          >
            <LotusSVG className="w-16 h-16" />
          </motion.div>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-4 opacity-30">
          <PeacockSVG className="w-24 h-24" />
        </div>

        <div className="text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script text-5xl md:text-6xl text-magenta mb-2"
          >
            {weddingData.groomName} & {weddingData.brideName}
          </motion.p>
          <p className="font-body text-sm text-brown-light mb-4">
            {weddingData.weddingDate}
          </p>
          <div className="mt-6 text-gold font-heading text-xl tracking-widest">
            ॥ शुभ विवाह ॥
          </div>
          <p className="mt-8 font-body text-xs text-brown-light/60">
            Made with love
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;