-- Create questions table with group functionality
CREATE TABLE public.info_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_text TEXT NOT NULL,
  statement_text TEXT,
  image_url TEXT,
  question_order INTEGER NOT NULL DEFAULT 1,
  group_id TEXT NOT NULL DEFAULT 'default',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create question options table
CREATE TABLE public.info_q_options (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES public.info_questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  option_order INTEGER NOT NULL DEFAULT 1,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create icons table linked to options
CREATE TABLE public.info_icons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  option_id UUID NOT NULL REFERENCES public.info_q_options(id) ON DELETE CASCADE,
  icon_name TEXT NOT NULL,
  icon_url TEXT,
  icon_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create images table linked to options
CREATE TABLE public.info_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  option_id UUID NOT NULL REFERENCES public.info_q_options(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  image_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user responses table linked to profiles
CREATE TABLE public.info_user_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES public.info_questions(id) ON DELETE CASCADE,
  selected_option_id UUID REFERENCES public.info_q_options(id) ON DELETE SET NULL,
  is_correct BOOLEAN,
  answered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  group_id TEXT NOT NULL
);

-- Create question responses table for success/failure messages
CREATE TABLE public.info_question_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID NOT NULL REFERENCES public.info_questions(id) ON DELETE CASCADE,
  is_success_response BOOLEAN NOT NULL DEFAULT true,
  response_text TEXT NOT NULL,
  response_icon_id UUID REFERENCES public.info_icons(id) ON DELETE SET NULL,
  response_image_id UUID REFERENCES public.info_images(id) ON DELETE SET NULL,
  next_question_id UUID REFERENCES public.info_questions(id) ON DELETE SET NULL,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create group completion options table
CREATE TABLE public.info_group_options (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id TEXT NOT NULL,
  option_text TEXT NOT NULL,
  option_order INTEGER NOT NULL DEFAULT 1,
  next_group_id TEXT,
  icon_id UUID REFERENCES public.info_icons(id) ON DELETE SET NULL,
  image_id UUID REFERENCES public.info_images(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.info_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.info_q_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.info_icons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.info_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.info_user_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.info_question_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.info_group_options ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for questions (public read)
CREATE POLICY "Anyone can read questions" ON public.info_questions FOR SELECT USING (true);

-- Create RLS policies for options (public read)
CREATE POLICY "Anyone can read options" ON public.info_q_options FOR SELECT USING (true);

-- Create RLS policies for icons (public read)
CREATE POLICY "Anyone can read icons" ON public.info_icons FOR SELECT USING (true);

-- Create RLS policies for images (public read)
CREATE POLICY "Anyone can read images" ON public.info_images FOR SELECT USING (true);

-- Create RLS policies for question responses (public read)
CREATE POLICY "Anyone can read question responses" ON public.info_question_responses FOR SELECT USING (true);

-- Create RLS policies for group options (public read)
CREATE POLICY "Anyone can read group options" ON public.info_group_options FOR SELECT USING (true);

-- Create RLS policies for user responses (users can manage their own)
CREATE POLICY "Users can manage their own responses" ON public.info_user_responses 
  FOR ALL USING (auth.uid() = user_id);

-- Create updated_at trigger for questions
CREATE TRIGGER update_info_questions_updated_at
  BEFORE UPDATE ON public.info_questions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_info_questions_group_order ON public.info_questions(group_id, question_order);
CREATE INDEX idx_info_q_options_question ON public.info_q_options(question_id, option_order);
CREATE INDEX idx_info_icons_option ON public.info_icons(option_id, icon_order);
CREATE INDEX idx_info_images_option ON public.info_images(option_id, image_order);
CREATE INDEX idx_info_user_responses_user ON public.info_user_responses(user_id, group_id);
CREATE INDEX idx_info_question_responses_question ON public.info_question_responses(question_id);
CREATE INDEX idx_info_group_options_group ON public.info_group_options(group_id, option_order);
