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
    return <section className="py-8 bg-gradient-to-b from-background to-background/50">
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
                    <Button onClick={() => {
                    const target = document.getElementById("simulateur-toiture");
                    if (target) {
                      target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                      });
                    }
                  }} variant="cta" size="sm" className="rounded-full">
                      Simuler mon loyer
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/30">
                <img src="/lovable-uploads/dabe97e5-856c-40db-858c-c69084db4e37.png" alt="Installation panneaux solaires" className="w-full h-40 object-cover rounded-xl" loading="lazy" />
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
                <img src="/assets/cable/step-2.jpg" alt="Financement travaux" className="w-full h-40 object-cover rounded-xl" loading="lazy" />
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
                <img src="/lovable-uploads/93c633ac-c794-41e9-8f28-e3759d487062.png" alt="Service transparent" className="w-full h-40 object-cover rounded-xl" loading="lazy" />
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
            <Button onClick={() => {
            const target = document.getElementById("simulateur-toiture");
            if (target) {
              target.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });
            }
          }} variant="cta" className="w-full rounded-full">
              Simuler mon projet
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
        </div>
      </section>;
  }

  // Version desktop optimisée - Design moderne avec micro-interactions et hiérarchie visuelle
  return <section className="relative py-20 bg-gradient-to-b from-background via-background/95 to-background overflow-hidden">
      {/* Background pattern subtil */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,hsl(var(--muted))_1px,transparent_1px),linear-gradient(-45deg,hsl(var(--muted))_1px,transparent_1px)] bg-[length:60px_60px] opacity-30"></div>
      
      <div className="container-xl relative z-10">
        
        {/* Header section avec hiérarchie visuelle claire */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-primary">Solution 100% gratuite et garantie</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-display font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Transformez votre toiture en<br />
            <span className="text-primary">source de revenus</span>
          </h2>
          
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">Une solution innovante qui finance vos travaux grâce à l’énergie solaire, sans aucun coût pour vous.</p>
        </div>

        {/* Grid système moderne avec cards avancées */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1 - Revenus avec animation hover sophistiquée */}
          <div className="group relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 transition-all duration-500 hover:border-primary/30 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
            {/* Effet de brillance au hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold leading-tight group-hover:text-primary transition-colors duration-300">
                  Loyer annuel garanti
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Percevez entre <strong className="text-green-600">2 500 € et 12 000 €</strong> par an pendant 30 ans, sans aucun investissement.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-foreground/60">Revenus garantis pendant 30 ans</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-foreground/60">Aucun risque financier</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={() => {
              const target = document.getElementById("simulateur-toiture");
              if (target) {
                target.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                });
              }
            }} variant="cta" className="w-full rounded-2xl group-hover:scale-105 transition-transform duration-200">
                <TrendingUp className="w-4 h-4 mr-2" />
                Simuler mon loyer
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border/30">
              <img src="/lovable-uploads/dabe97e5-856c-40db-858c-c69084db4e37.png" alt="Installation panneaux solaires" className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
          </div>

          {/* Card 2 - Financement avec design sophistiqué */}
          <div className="group relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 transition-all duration-500 hover:border-blue-500/30 hover:bg-card/80 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold leading-tight group-hover:text-blue-600 transition-colors duration-300">Optez pour un versement unique</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Pour financer votre Plan Pluriannuel de Travaux, vous pouvez choisir un versement unique de <strong className="text-blue-600">30 000 à 50 000 €</strong> plutôt qu'un loyer annuel.
                </p>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-3 text-center">
                    <div className="text-sm font-semibold text-blue-700 dark:text-blue-300">0% apport</div>
                    <div className="text-xs text-blue-600/70">requis</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-xl p-3 text-center">
                    <div className="text-sm font-semibold text-green-700 dark:text-green-300">Immédiat</div>
                    <div className="text-xs text-green-600/70">disponible</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border/30">
              <img src="/assets/cable/step-2.jpg" alt="Financement travaux" className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
          </div>

          {/* Card 3 - Service avec design premium */}
          <div className="group relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 transition-all duration-500 hover:border-purple-500/30 hover:bg-card/80 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold leading-tight group-hover:text-purple-600 transition-colors duration-300">
                  Service tout compris
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Installation, maintenance et exploitation <strong className="text-purple-600">100% prises en charge</strong> pendant 30 ans.
                </p>
                
                <div className="space-y-2">
                  {['Installation complète', 'Maintenance 30 ans', 'Exploitation garantie'].map((item, index) => <div key={index} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-foreground/70">{item}</span>
                    </div>)}
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border/30">
              <img src="/lovable-uploads/93c633ac-c794-41e9-8f28-e3759d487062.png" alt="Service transparent" className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
          </div>
        </div>

        {/* CTA Section finale avec design moderne */}
        <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-12 border border-primary/20 text-center overflow-hidden">
          {/* Pattern de fond subtil */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]"></div>
          
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <h3 className="text-3xl font-display font-bold">
              Prêt à valoriser votre toiture ?
            </h3>
            <p className="text-lg text-foreground/70">
              Découvrez en 2 minutes le potentiel de revenus de votre copropriété
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => {
              const target = document.getElementById("simulateur-toiture");
              if (target) {
                target.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                });
              }
            }} variant="cta" size="lg" className="rounded-2xl hover:scale-105 transition-transform duration-200">
                <TrendingUp className="w-5 h-5 mr-2" />
                Simuler mon projet
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl hover:scale-105 transition-transform duration-200" onClick={() => {
              const target = document.getElementById("contact");
              if (target) {
                target.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                });
              }
            }}>
                <Shield className="w-5 h-5 mr-2" />
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
        
      </div>
    </section>;
};
export default CableSection;