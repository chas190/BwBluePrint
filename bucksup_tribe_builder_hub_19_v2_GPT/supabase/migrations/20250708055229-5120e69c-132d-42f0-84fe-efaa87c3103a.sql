-- Fix UUID type mismatches - Step 2: Alter column types from uuid to text

-- Fix user_visits table
ALTER TABLE public.user_visits 
ALTER COLUMN user_id TYPE text;

-- Fix lookupfail table  
ALTER TABLE public.lookupfail
ALTER COLUMN user_id TYPE text;

-- Fix info_user_responses table
ALTER TABLE public.info_user_responses
ALTER COLUMN user_id TYPE text;
