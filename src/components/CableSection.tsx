import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, TrendingUp, Shield } from "lucide-react";

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
    // Version mobile optimisée - Design moderne et fluide
    return (
      <section className="py-8 bg-gradient-to-b from-background to-background/50">
        <div className="container-xl px-4 space-y-12">
          
          {/* Section Hero Mobile */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
              <TrendingUp className="w-4 h-4" />
              Solution 100% gratuite
            </div>
            <h2 className="text-3xl font-display font-bold leading-tight text-center">
              Financez vos travaux avec votre toiture
            </h2>
            <p className="text-foreground/70 text-center max-w-sm mx-auto leading-relaxed">
              Transformez votre toit en source de revenus garantis pendant 30 ans
            </p>
          </div>

          {/* Cards Mobile - Design moderne avec shadows */}
          <div className="space-y-8">
            
            {/* Card 1 - Revenus */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-display font-semibold leading-tight">
                    Loyer annuel garanti
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Percevez entre 2 500 € et 12 000 € par an pendant 30 ans, sans aucun investissement de votre part.
                  </p>
                  <div className="pt-2">
                    <Button
                      onClick={() => {
                        const target = document.getElementById("simulateur-toiture");
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      variant="cta"
                      size="sm"
                      className="rounded-full"
                    >
                      Simuler mon loyer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/30">
                <img 
                  src="/lovable-uploads/dabe97e5-856c-40db-858c-c69084db4e37.png" 
                  alt="Installation panneaux solaires" 
                  className="w-full h-40 object-cover rounded-xl" 
                  loading="lazy" 
                />
              </div>
            </div>

            {/* Card 2 - Financement */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-display font-semibold leading-tight">
                    Financement de vos travaux
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Versement unique de 30 000 à 50 000 € pour réaliser votre Plan Pluriannuel sans appel de fonds.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Sans apport
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Immédiat
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/30">
                <img 
                  src="/assets/cable/step-2.jpg" 
                  alt="Financement travaux" 
                  className="w-full h-40 object-cover rounded-xl" 
                  loading="lazy" 
                />
              </div>
            </div>

            {/* Card 3 - Service */}
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-display font-semibold leading-tight">
                    Service clé en main
                  </h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">
                    Installation, maintenance et exploitation 100% prises en charge pendant toute la durée du contrat.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="flex items-center gap-2 text-xs text-foreground/60">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      0% frais
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/60">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      30 ans garanti
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/30">
                <img 
                  src="/lovable-uploads/93c633ac-c794-41e9-8f28-e3759d487062.png" 
                  alt="Service transparent" 
                  className="w-full h-40 object-cover rounded-xl" 
                  loading="lazy" 
                />
              </div>
            </div>
          </div>

          {/* CTA Section Mobile */}
          <div className="text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-display font-semibold">
              Prêt à commencer ?
            </h3>
            <p className="text-sm text-foreground/70">
              Découvrez le potentiel de votre toiture en 2 minutes
            </p>
            <Button
              onClick={() => {
                const target = document.getElementById("simulateur-toiture");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              variant="cta"
              className="w-full rounded-full"
            >
              Simuler mon projet
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
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