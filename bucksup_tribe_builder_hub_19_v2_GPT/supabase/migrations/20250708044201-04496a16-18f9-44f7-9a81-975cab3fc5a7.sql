-- Create update function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create lookupfail table to track failed VIP lookups
CREATE TABLE public.lookupfail (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  original_lookup_parameter TEXT,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone_number TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.lookupfail ENABLE ROW LEVEL SECURITY;

-- Create policies for lookupfail access
CREATE POLICY "Users can view their own lookup failures" 
ON public.lookupfail 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create lookup failure records" 
ON public.lookupfail 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_lookupfail_updated_at
BEFORE UPDATE ON public.lookupfail
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
