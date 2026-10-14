-- Fix UUID type mismatches - Step 1: Drop RLS policies that depend on user_id columns

-- Drop policies on user_visits
DROP POLICY IF EXISTS "Users can manage their own visits" ON public.user_visits;

-- Drop policies on lookupfail  
DROP POLICY IF EXISTS "Users can create lookup failure records" ON public.lookupfail;
DROP POLICY IF EXISTS "Users can view their own lookup failures" ON public.lookupfail;

-- Drop policies on info_user_responses
DROP POLICY IF EXISTS "Users can manage their own responses" ON public.info_user_responses;
