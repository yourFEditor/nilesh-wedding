-- Create enum for event side
CREATE TYPE public.event_side AS ENUM ('groom', 'bride', 'both');

-- Create invitations table to store each wedding invitation
CREATE TABLE public.invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  groom_name TEXT NOT NULL DEFAULT 'Groom Name',
  bride_name TEXT NOT NULL DEFAULT 'Bride Name',
  groom_parents TEXT DEFAULT 'Groom Parents Names',
  bride_parents TEXT DEFAULT 'Bride Parents Names',
  wedding_date DATE,
  wedding_hashtag TEXT,
  whatsapp_groom TEXT,
  whatsapp_bride TEXT,
  custom_message TEXT,
  hero_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID REFERENCES public.invitations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  venue TEXT,
  address TEXT,
  map_link TEXT,
  description TEXT,
  side event_side NOT NULL DEFAULT 'both',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for invitations
CREATE POLICY "Users can view their own invitations"
ON public.invitations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own invitations"
ON public.invitations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own invitations"
ON public.invitations FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own invitations"
ON public.invitations FOR DELETE
USING (auth.uid() = user_id);

-- Public read access for shared invitations
CREATE POLICY "Anyone can view invitations by id"
ON public.invitations FOR SELECT
USING (true);

-- RLS Policies for events
CREATE POLICY "Users can manage events for their invitations"
ON public.events FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.invitations
    WHERE invitations.id = events.invitation_id
    AND invitations.user_id = auth.uid()
  )
);

-- Public read access for events
CREATE POLICY "Anyone can view events"
ON public.events FOR SELECT
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_invitations_updated_at
BEFORE UPDATE ON public.invitations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();