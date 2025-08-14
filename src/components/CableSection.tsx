import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CableSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    // Version mobile/tablette simplifiée - pas d'animation
    return (
      <section className="py-16 bg-background">
        <div className="container-xl space-y-16">
          {/* Panel A - Mobile */}
          <div className="text-center space-y-6">
            <img 
              src="/lovable-uploads/dabe97e5-856c-40db-858c-c69084db4e37.png" 
              alt="Installation de panneaux solaires sur toit d'immeuble avec équipe technique" 
              className="w-full max-w-md mx-auto h-auto rounded-xl" 
              loading="lazy" 
            />
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-display leading-tight">
                Financez vos travaux grâce à votre toiture
              </h3>
              <p className="mt-4 text-foreground/80">
                Accueillez une centrale solaire sur le toit de votre copropriété et percevez un loyer annuel de 2 500 € à 12 000 €, garanti pendant 30 ans, sans aucun investissement.
              </p>
              <Button
                onClick={() => {
                  const target = document.getElementById("simulateur-toiture");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                variant="cta"
                className="mt-6 rounded-full h-11 px-6"
              >
                Simuler mon loyer
              </Button>
            </div>
          </div>

          {/* Panel B - Mobile */}
          <div className="text-center space-y-6">
            <img 
              src="/assets/cable/step-2.jpg" 
              alt="Démarches administratives simplifiées" 
              className="w-full max-w-md mx-auto h-auto rounded-xl border" 
              loading="lazy" 
            />
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-display leading-tight">
                Financez votre Plan Pluriannuel de Travaux
              </h3>
              <p className="mt-4 text-foreground/80">
                Louez votre toiture et obtenez un versement unique de 30 000 à 50 000 €, selon la surface, pour réaliser vos travaux sans appel de fonds aux copropriétaires.
              </p>
            </div>
          </div>

          {/* Panel C - Mobile */}
          <div className="text-center space-y-6">
            <img 
              src="/lovable-uploads/93c633ac-c794-41e9-8f28-e3759d487062.png" 
              alt="Installation de panneaux solaires - Service transparent et conseiller dédié" 
              className="w-full max-w-md mx-auto h-auto" 
              loading="lazy" 
            />
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-display leading-tight">
                Bénéficiez d'une centrale solaire sans aucun frais pour la copropriété.
              </h3>
              <p className="mt-4 text-foreground/80">
                Grâce au modèle du tiers-investissement, nous prenons en charge 100 % de l'installation, de la maintenance et de l'exploitation, pendant toute la durée du contrat. Vous percevez un loyer garanti ou un versement unique… et réduisez vos charges sans investir un centime.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Version desktop avec animation (code existant simplifié pour éviter les conflits)
  return (
    <section className="relative min-h-[80vh] bg-background">
      <div className="container-xl py-20">
        <div className="text-center max-w-4xl mx-auto space-y-16">
          {/* Panel A - Desktop */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h3 className="text-3xl font-display leading-tight">
                Financez vos travaux grâce à votre toiture
              </h3>
              <p className="mt-4 text-foreground/80">
                Accueillez une centrale solaire sur le toit de votre copropriété et percevez un loyer annuel de 2 500 € à 12 000 €, garanti pendant 30 ans, sans aucun investissement.
              </p>
              <Button
                onClick={() => {
                  const target = document.getElementById("simulateur-toiture");
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                variant="cta"
                className="mt-6 rounded-full h-11 px-6"
              >
                Simuler mon loyer
              </Button>
            </div>
            <img 
              src="/lovable-uploads/dabe97e5-856c-40db-858c-c69084db4e37.png" 
              alt="Installation de panneaux solaires sur toit d'immeuble avec équipe technique" 
              className="w-full h-auto rounded-xl" 
              loading="lazy" 
            />
          </div>

          {/* Panel B - Desktop */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img 
              src="/assets/cable/step-2.jpg" 
              alt="Démarches administratives simplifiées" 
              className="w-full h-auto rounded-xl border order-2 md:order-1" 
              loading="lazy" 
            />
            <div className="text-left order-1 md:order-2">
              <h3 className="text-3xl font-display leading-tight">
                Financez votre Plan Pluriannuel de Travaux
              </h3>
              <p className="mt-4 text-foreground/80">
                Louez votre toiture et obtenez un versement unique de 30 000 à 50 000 €, selon la surface, pour réaliser vos travaux sans appel de fonds aux copropriétaires.
              </p>
            </div>
          </div>

          {/* Panel C - Desktop */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h3 className="text-3xl font-display leading-tight">
                Bénéficiez d'une centrale solaire sans aucun frais pour la copropriété.
              </h3>
              <p className="mt-4 text-foreground/80">
                Grâce au modèle du tiers-investissement, nous prenons en charge 100 % de l'installation, de la maintenance et de l'exploitation, pendant toute la durée du contrat. Vous percevez un loyer garanti ou un versement unique… et réduisez vos charges sans investir un centime.
              </p>
            </div>
            <img 
              src="/lovable-uploads/93c633ac-c794-41e9-8f28-e3759d487062.png" 
              alt="Installation de panneaux solaires - Service transparent et conseiller dédié" 
              className="w-full h-auto" 
              loading="lazy" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CableSection;