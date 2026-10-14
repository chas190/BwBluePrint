-- Fix UUID type mismatches - Step 1.5: Drop foreign key constraints

-- Drop foreign key constraints that reference auth.users
ALTER TABLE public.user_visits 
DROP CONSTRAINT IF EXISTS user_visits_user_id_fkey;

ALTER TABLE public.lookupfail
DROP CONSTRAINT IF EXISTS lookupfail_user_id_fkey;

ALTER TABLE public.info_user_responses
DROP CONSTRAINT IF EXISTS info_user_responses_user_id_fkey;
