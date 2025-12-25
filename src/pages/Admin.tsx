import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { LogOut, Plus, Trash2, Save, Calendar, Clock, MapPin } from "lucide-react";
import { User, Session } from "@supabase/supabase-js";

type EventSide = "groom" | "bride" | "both";

interface Event {
  id?: string;
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  map_link: string;
  side: EventSide;
  display_order: number;
}

interface Invitation {
  id?: string;
  groom_name: string;
  bride_name: string;
  groom_parents: string;
  bride_parents: string;
  wedding_date: string;
  wedding_hashtag: string;
  whatsapp_groom: string;
  whatsapp_bride: string;
  custom_message: string;
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const [invitation, setInvitation] = useState<Invitation>({
    groom_name: "Neelesh",
    bride_name: "Ayushi",
    groom_parents: "Mr. & Mrs. Sharma",
    bride_parents: "Mr. & Mrs. Gupta",
    wedding_date: "2026-02-05",
    wedding_hashtag: "#NeeleshWedsAyushi",
    whatsapp_groom: "",
    whatsapp_bride: "",
    custom_message: "",
  });

  const [events, setEvents] = useState<Event[]>([
    {
      name: "Ganesh Sthapana",
      date: "2026-01-31",
      time: "9:00 am",
      venue: "At Residence",
      address: "A-21, Sudama Marg, Vijay Vadi, Path No. 6, Sikar Road, Jaipur",
      map_link: "",
      side: "both",
      display_order: 0,
    },
  ]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      loadInvitation();
    }
  }, [user]);

  const loadInvitation = async () => {
    const { data: invitations } = await supabase
      .from("invitations")
      .select("*")
      .eq("user_id", user?.id)
      .limit(1);

    if (invitations && invitations.length > 0) {
      const inv = invitations[0];
      setInvitation({
        id: inv.id,
        groom_name: inv.groom_name,
        bride_name: inv.bride_name,
        groom_parents: inv.groom_parents || "",
        bride_parents: inv.bride_parents || "",
        wedding_date: inv.wedding_date || "",
        wedding_hashtag: inv.wedding_hashtag || "",
        whatsapp_groom: inv.whatsapp_groom || "",
        whatsapp_bride: inv.whatsapp_bride || "",
        custom_message: inv.custom_message || "",
      });

      // Load events
      const { data: eventsData } = await supabase
        .from("events")
        .select("*")
        .eq("invitation_id", inv.id)
        .order("display_order");

      if (eventsData && eventsData.length > 0) {
        setEvents(
          eventsData.map((e) => ({
            id: e.id,
            name: e.name,
            date: e.date,
            time: e.time,
            venue: e.venue || "",
            address: e.address || "",
            map_link: e.map_link || "",
            side: e.side as EventSide,
            display_order: e.display_order || 0,
          }))
        );
      }
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    try {
      let invitationId = invitation.id;

      if (invitationId) {
        // Update existing invitation
        const { error } = await supabase
          .from("invitations")
          .update({
            groom_name: invitation.groom_name,
            bride_name: invitation.bride_name,
            groom_parents: invitation.groom_parents,
            bride_parents: invitation.bride_parents,
            wedding_date: invitation.wedding_date,
            wedding_hashtag: invitation.wedding_hashtag,
            whatsapp_groom: invitation.whatsapp_groom,
            whatsapp_bride: invitation.whatsapp_bride,
            custom_message: invitation.custom_message,
          })
          .eq("id", invitationId);

        if (error) throw error;
      } else {
        // Create new invitation
        const { data, error } = await supabase
          .from("invitations")
          .insert({
            user_id: user.id,
            groom_name: invitation.groom_name,
            bride_name: invitation.bride_name,
            groom_parents: invitation.groom_parents,
            bride_parents: invitation.bride_parents,
            wedding_date: invitation.wedding_date,
            wedding_hashtag: invitation.wedding_hashtag,
            whatsapp_groom: invitation.whatsapp_groom,
            whatsapp_bride: invitation.whatsapp_bride,
            custom_message: invitation.custom_message,
          })
          .select()
          .single();

        if (error) throw error;
        invitationId = data.id;
        setInvitation((prev) => ({ ...prev, id: invitationId }));
      }

      // Handle events
      // Delete existing events and recreate
      await supabase.from("events").delete().eq("invitation_id", invitationId);

      const eventsToInsert = events.map((event, index) => ({
        invitation_id: invitationId,
        name: event.name,
        date: event.date,
        time: event.time,
        venue: event.venue,
        address: event.address,
        map_link: event.map_link,
        side: event.side,
        display_order: index,
      }));

      const { error: eventsError } = await supabase
        .from("events")
        .insert(eventsToInsert);

      if (eventsError) throw eventsError;

      toast.success("Invitation saved successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const addEvent = () => {
    setEvents([
      ...events,
      {
        name: "New Event",
        date: "",
        time: "",
        venue: "",
        address: "",
        map_link: "",
        side: "both",
        display_order: events.length,
      },
    ]);
  };

  const removeEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index));
  };

  const updateEvent = (index: number, field: keyof Event, value: string) => {
    const updated = [...events];
    (updated[index] as any)[field] = value;
    setEvents(updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream via-ivory to-cream-dark flex items-center justify-center">
        <div className="text-magenta font-heading text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-ivory to-cream-dark">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gold/20 sticky top-0 z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-script text-2xl text-magenta">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-gold to-amber-600 hover:from-gold/90 hover:to-amber-600/90 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button variant="outline" onClick={handleLogout} className="border-magenta text-magenta">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Couple Details */}
        <section className="bg-white/90 rounded-xl p-6 shadow-lg border border-gold/20 mb-8">
          <h2 className="font-script text-2xl text-magenta mb-6">Couple Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-brown font-heading">Groom Name</Label>
              <Input
                value={invitation.groom_name}
                onChange={(e) => setInvitation({ ...invitation, groom_name: e.target.value })}
                className="border-gold/30"
              />
            </div>
            <div>
              <Label className="text-brown font-heading">Bride Name</Label>
              <Input
                value={invitation.bride_name}
                onChange={(e) => setInvitation({ ...invitation, bride_name: e.target.value })}
                className="border-gold/30"
              />
            </div>
            <div>
              <Label className="text-brown font-heading">Groom's Parents</Label>
              <Input
                value={invitation.groom_parents}
                onChange={(e) => setInvitation({ ...invitation, groom_parents: e.target.value })}
                className="border-gold/30"
              />
            </div>
            <div>
              <Label className="text-brown font-heading">Bride's Parents</Label>
              <Input
                value={invitation.bride_parents}
                onChange={(e) => setInvitation({ ...invitation, bride_parents: e.target.value })}
                className="border-gold/30"
              />
            </div>
            <div>
              <Label className="text-brown font-heading">Wedding Date</Label>
              <Input
                type="date"
                value={invitation.wedding_date}
                onChange={(e) => setInvitation({ ...invitation, wedding_date: e.target.value })}
                className="border-gold/30"
              />
            </div>
            <div>
              <Label className="text-brown font-heading">Wedding Hashtag</Label>
              <Input
                value={invitation.wedding_hashtag}
                onChange={(e) => setInvitation({ ...invitation, wedding_hashtag: e.target.value })}
                className="border-gold/30"
                placeholder="#NeeleshWedsAyushi"
              />
            </div>
            <div>
              <Label className="text-brown font-heading">WhatsApp (Groom Side)</Label>
              <Input
                value={invitation.whatsapp_groom}
                onChange={(e) => setInvitation({ ...invitation, whatsapp_groom: e.target.value })}
                className="border-gold/30"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div>
              <Label className="text-brown font-heading">WhatsApp (Bride Side)</Label>
              <Input
                value={invitation.whatsapp_bride}
                onChange={(e) => setInvitation({ ...invitation, whatsapp_bride: e.target.value })}
                className="border-gold/30"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-brown font-heading">Custom Message</Label>
              <Textarea
                value={invitation.custom_message}
                onChange={(e) => setInvitation({ ...invitation, custom_message: e.target.value })}
                className="border-gold/30"
                placeholder="A personal message for your guests..."
                rows={3}
              />
            </div>
          </div>
        </section>

        {/* Events */}
        <section className="bg-white/90 rounded-xl p-6 shadow-lg border border-gold/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-script text-2xl text-magenta">Events</h2>
            <Button onClick={addEvent} className="bg-magenta hover:bg-magenta/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>

          <div className="space-y-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="border border-gold/30 rounded-lg p-4 bg-cream/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg text-brown">
                    Event {index + 1}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEvent(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-brown/80 text-sm">Event Name</Label>
                    <Input
                      value={event.name}
                      onChange={(e) => updateEvent(index, "name", e.target.value)}
                      className="border-gold/20"
                    />
                  </div>
                  <div>
                    <Label className="text-brown/80 text-sm">Side</Label>
                    <Select
                      value={event.side}
                      onValueChange={(value) => updateEvent(index, "side", value)}
                    >
                      <SelectTrigger className="border-gold/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="groom">Groom Side</SelectItem>
                        <SelectItem value="bride">Bride Side</SelectItem>
                        <SelectItem value="both">Both Sides</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-brown/80 text-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Date
                    </Label>
                    <Input
                      type="date"
                      value={event.date}
                      onChange={(e) => updateEvent(index, "date", e.target.value)}
                      className="border-gold/20"
                    />
                  </div>
                  <div>
                    <Label className="text-brown/80 text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Time
                    </Label>
                    <Input
                      value={event.time}
                      onChange={(e) => updateEvent(index, "time", e.target.value)}
                      className="border-gold/20"
                      placeholder="9:00 am"
                    />
                  </div>
                  <div>
                    <Label className="text-brown/80 text-sm">Venue Name</Label>
                    <Input
                      value={event.venue}
                      onChange={(e) => updateEvent(index, "venue", e.target.value)}
                      className="border-gold/20"
                      placeholder="At Residence"
                    />
                  </div>
                  <div>
                    <Label className="text-brown/80 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Address
                    </Label>
                    <Input
                      value={event.address}
                      onChange={(e) => updateEvent(index, "address", e.target.value)}
                      className="border-gold/20"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-brown/80 text-sm">Google Maps Link</Label>
                    <Input
                      value={event.map_link}
                      onChange={(e) => updateEvent(index, "map_link", e.target.value)}
                      className="border-gold/20"
                      placeholder="https://maps.google.com/?q=..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Preview Link */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-gold text-gold hover:bg-gold/10"
          >
            Preview Invitation
          </Button>
        </div>
      </div>
    </div>
  );
}
