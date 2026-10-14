-- Fix UUID type mismatches - Step 3: Recreate RLS policies with text user_id

-- Recreate policies for user_visits
CREATE POLICY "Users can manage their own visits" 
ON public.user_visits 
FOR ALL 
USING ((auth.uid()::text = user_id) OR (user_id IS NULL));

-- Recreate policies for lookupfail
CREATE POLICY "Users can create lookup failure records" 
ON public.lookupfail 
FOR INSERT 
WITH CHECK ((auth.uid()::text = user_id) OR (user_id IS NULL));

CREATE POLICY "Users can view their own lookup failures" 
ON public.lookupfail 
FOR SELECT 
USING ((auth.uid()::text = user_id) OR (user_id IS NULL));

-- Recreate policies for info_user_responses
CREATE POLICY "Users can manage their own responses" 
ON public.info_user_responses 
FOR ALL 
USING (auth.uid()::text = user_id);

-- Recreate policy for user_responses (references user_visits.user_id)
CREATE POLICY "Users can manage their own responses" 
ON public.user_responses 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM user_visits 
  WHERE user_visits.id = user_responses.user_visit_id 
  AND ((user_visits.user_id = auth.uid()::text) OR (user_visits.user_id IS NULL))
));
