-- Créer la table pour stocker les dossiers de copropriété
CREATE TABLE public.dossiers_copropriete (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  address TEXT NOT NULL,
  coordinates TEXT,
  role TEXT NOT NULL,
  syndic_name TEXT,
  syndic_contact TEXT,
  roof_type TEXT NOT NULL,
  roof_covering TEXT NOT NULL,
  exploitable_surface TEXT NOT NULL,
  roof_access TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  full_address TEXT,
  company TEXT,
  message TEXT,
  status TEXT DEFAULT 'nouveau',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Activer Row Level Security
ALTER TABLE public.dossiers_copropriete ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre l'insertion publique (formulaire public)
CREATE POLICY "Permettre insertion publique des dossiers" 
ON public.dossiers_copropriete 
FOR INSERT 
WITH CHECK (true);

-- Créer une politique pour permettre la lecture pour les administrateurs seulement
-- (pour l'instant, nous laissons ouvert car pas d'auth)
CREATE POLICY "Permettre lecture des dossiers" 
ON public.dossiers_copropriete 
FOR SELECT 
USING (true);

-- Créer la fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer le trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_dossiers_copropriete_updated_at
BEFORE UPDATE ON public.dossiers_copropriete
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();