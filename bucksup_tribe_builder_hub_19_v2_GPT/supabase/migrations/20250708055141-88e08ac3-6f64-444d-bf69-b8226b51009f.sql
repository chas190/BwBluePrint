-- Fix UUID type mismatches - Drop remaining policies that reference user_id

-- Drop policy on user_responses (this one was missed)
DROP POLICY IF EXISTS "Users can manage their own responses" ON public.user_responses;
