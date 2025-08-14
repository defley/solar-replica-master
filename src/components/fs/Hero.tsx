// Internal reproduction authorized by Copro Solaire
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Shield, CheckCircle } from "lucide-react";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="top" className="relative pt-10 lg:pt-20 pb-16 overflow-hidden">
      {/* Background moderne avec gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,hsl(var(--primary)/0.1),transparent_50%)]"></div>
      
      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Contenu texte optimisé */}
          <div className="space-y-8">
            {/* Badge moderniste */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-500/10 to-primary/10 rounded-full border border-green-500/20">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700 dark:text-green-300">Solution 100% gratuite</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl leading-[1.1] font-bold font-display">
                <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Hébergez une
                </span>
                <br />
                <span className="text-primary">centrale solaire</span>
                <br />
                <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  sur votre toit
                </span>
              </h1>
              
              <h2 className="text-xl sm:text-2xl text-primary/80 font-semibold mb-4">
                Louez votre toit et percevez une rente
              </h2>
              
              <p className="text-lg text-foreground/70 max-w-[42ch] leading-relaxed">
                Nous finançons à 100 % l'installation de panneaux solaires sur le toit de votre copropriété et, en plus, nous vous versons un loyer garanti pendant 30 ans, que vous pouvez utiliser pour financer vos travaux de rénovation.
              </p>
            </div>

            {/* CTA section moderne */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => {
                    const target = document.getElementById("simulateur-toiture");
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                  variant="cta" 
                  size="lg" 
                  className="rounded-2xl hover:scale-105 transition-transform duration-200"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Simuler mon projet
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-2xl hover:scale-105 transition-transform duration-200"
                  onClick={() => window.open('tel:+33782905669')}
                >
                  📞 07 82 90 56 69
                </Button>
              </div>

              {/* Value props modernes */}
              <div className="flex flex-wrap gap-6 text-sm">
              {[
                { icon: CheckCircle, text: "Gratuit de A à Z", color: "text-green-600" },
                { icon: TrendingUp, text: "30 ans garantis", color: "text-purple-600" }
              ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-foreground/70">
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section vidéo modernisée */}
          <div className="relative">
            <div className="relative group">
              {/* Container avec effets modernes */}
              <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500">
                <video 
                  className="w-full h-auto select-none"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  controls={false}
                  width="1200"
                  height="900"
                >
                  <source src="/assets/social_u3382912938_Make_a_picture_with_the_same_style_of_a_residenti_f4f30469-fe54-4a42-b91a-809b5d4c75c9_2.mp4" type="video/mp4" />
                  <p>Votre navigateur ne supporte pas les vidéos HTML5.</p>
                </video>
              </div>

              {/* Éléments décoratifs flottants */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;