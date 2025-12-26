import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Share2, MessageCircle, Link, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { OrnateFrame } from "@/components/OrnateFrame";
import { LotusSVG } from "@/components/decorative/RajasthaniElements";

// Same event data as Index
const eventDays = [
  {
    id: "ganesh",
    title: "Ganesh Sthapana",
    date: "Saturday, 31st January 2026",
  },
  {
    id: "baan",
    title: "Baan",
    date: "Monday, 2nd February 2026",
  },
  {
    id: "sakdi",
    title: "Sakdi Vinayak",
    date: "Wednesday, 4th February 2026",
  },
  {
    id: "haldi",
    title: "Haldi Ceremony",
    date: "Thursday, 5th February 2026",
  },
  {
    id: "sangeet",
    title: "Lights, Camera, Sangeet",
    date: "Thursday, 5th February 2026",
  },
  {
    id: "lagan",
    title: "Lagan-Laagi-Re",
    date: "Friday, 6th February 2026",
  },
];

const Share = () => {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const baseUrl = window.location.origin;

  const generatedLink = useMemo(() => {
    if (selectedEvents.length === 0 || selectedEvents.length === eventDays.length) {
      return baseUrl;
    }
    const eventsParam = selectedEvents.join(",");
    return `${baseUrl}?events=${eventsParam}`;
  }, [selectedEvents, baseUrl]);

  const handleToggleEvent = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEvents.length === eventDays.length) {
      setSelectedEvents([]);
    } else {
      setSelectedEvents(eventDays.map((e) => e.id));
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "The invitation link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please manually copy the link.",
        variant: "destructive",
      });
    }
  };

  const handleWhatsAppShare = () => {
    const message = encodeURIComponent(
      `✨ You're Invited! ✨\n\nJoin us for the wedding celebration of Neelesh & Ayushi!\n\n🔗 ${generatedLink}`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleOpenLink = () => {
    window.open(generatedLink, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-ivory to-cream-dark py-8 px-4">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 opacity-20">
          <LotusSVG className="w-24 h-24 text-gold" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <LotusSVG className="w-24 h-24 text-gold" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-script text-4xl md:text-5xl text-magenta mb-2">
            Share Invitation
          </h1>
          <p className="font-body text-brown-light text-sm">
            Select events to include in your personalized invitation link
          </p>
        </motion.div>

        {/* Event Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <OrnateFrame className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg text-gold uppercase tracking-wider">
                Select Events
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
                className="text-magenta hover:text-magenta/80 font-heading text-sm"
              >
                {selectedEvents.length === eventDays.length ? "Deselect All" : "Select All"}
              </Button>
            </div>

            <div className="space-y-3">
              {eventDays.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedEvents.includes(event.id)
                      ? "border-gold bg-gold/10"
                      : "border-gold/20 hover:border-gold/40 bg-cream/50"
                  }`}
                  onClick={() => handleToggleEvent(event.id)}
                >
                  <Checkbox
                    checked={selectedEvents.includes(event.id)}
                    onCheckedChange={() => handleToggleEvent(event.id)}
                    className="border-gold data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                  />
                  <div className="flex-1">
                    <h3 className="font-heading text-base text-brown font-semibold">
                      {event.title}
                    </h3>
                    <p className="font-body text-sm text-brown-light">{event.date}</p>
                  </div>
                  {selectedEvents.includes(event.id) && (
                    <Check className="w-5 h-5 text-gold" />
                  )}
                </motion.div>
              ))}
            </div>
          </OrnateFrame>
        </motion.div>

        {/* Generated Link Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <OrnateFrame className="p-6">
            <h2 className="font-heading text-lg text-gold uppercase tracking-wider mb-4">
              Generated Link
            </h2>

            <div className="bg-cream-dark/50 rounded-lg p-4 border border-gold/20 mb-4">
              <div className="flex items-center gap-2">
                <Link className="w-4 h-4 text-gold flex-shrink-0" />
                <p className="font-body text-sm text-brown break-all flex-1">
                  {generatedLink}
                </p>
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="font-body text-xs text-brown-light">
                {selectedEvents.length === 0
                  ? "All events will be shown (no filter applied)"
                  : selectedEvents.length === eventDays.length
                  ? "All events selected - full invitation link"
                  : `${selectedEvents.length} event${selectedEvents.length > 1 ? "s" : ""} selected`}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleCopyLink}
                className="flex-1 bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-white font-heading"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>

              <Button
                onClick={handleWhatsAppShare}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-heading"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Share on WhatsApp
              </Button>
            </div>

            {/* Preview Button */}
            <Button
              variant="outline"
              onClick={handleOpenLink}
              className="w-full mt-3 border-gold/40 text-gold hover:bg-gold/10 font-heading"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Preview Invitation
            </Button>
          </OrnateFrame>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <a
            href="/"
            className="font-body text-sm text-gold hover:text-gold-dark underline"
          >
            ← Back to Invitation
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Share;
