-- Fix UUID type mismatches for Clerk user IDs
-- Phase 1: Fix user_visits table
ALTER TABLE public.user_visits 
ALTER COLUMN user_id TYPE text;

-- Phase 2: Fix lookupfail table  
ALTER TABLE public.lookupfail
ALTER COLUMN user_id TYPE text;

-- Phase 3: Fix info_user_responses table
ALTER TABLE public.info_user_responses
ALTER COLUMN user_id TYPE text;

-- Update RLS policies to ensure they work properly with text user IDs
-- (These should already work since they use auth.uid() which returns text)
