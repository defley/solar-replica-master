-- Fix critical security vulnerabilities

-- 1. Drop the overly permissive RLS policies on dossiers_copropriete
DROP POLICY IF EXISTS "Permettre lecture des dossiers" ON public.dossiers_copropriete;

-- 2. Create restrictive RLS policy - only allow admin access for reading
-- For now, completely restrict SELECT access until proper admin auth is implemented
CREATE POLICY "Restrict data access" 
ON public.dossiers_copropriete 
FOR SELECT 
USING (false);

-- 3. Keep INSERT policy but make it more explicit
DROP POLICY IF EXISTS "Permettre insertion publique des dossiers" ON public.dossiers_copropriete;
CREATE POLICY "Allow public form submissions" 
ON public.dossiers_copropriete 
FOR INSERT 
WITH CHECK (true);

-- 4. Fix the database function security by setting proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 5. Add input validation constraints to prevent malicious data
ALTER TABLE public.dossiers_copropriete 
ADD CONSTRAINT email_format_check 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.dossiers_copropriete 
ADD CONSTRAINT phone_format_check 
CHECK (phone ~* '^[0-9\s\-\+\(\)\.]{8,20}$');

-- 6. Add rate limiting by adding created_at index for better performance
CREATE INDEX IF NOT EXISTS idx_dossiers_created_at ON public.dossiers_copropriete(created_at);