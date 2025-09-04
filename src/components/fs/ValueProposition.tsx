import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Star, Phone, ArrowRight } from "lucide-react";

const ValueProposition = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background/50 to-background">
      <div className="container-xl">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          {/* Header modernisé */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight" title="Copro Solaire - Valorisation toiture copropriété solaire">
              <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Valorisez votre toit au profit de la
              </span>
              <br />
              <span className="text-primary">transition écologique</span>
            </h2>
            
            <p className="text-xl text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              Investissez dans un avenir durable en hébergeant une centrale solaire et générez des revenus garantis pour votre copropriété
            </p>
          </div>

          {/* Benefits modernisés avec animations */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {[
              { icon: CheckCircle, text: "Gratuit de A à Z", color: "text-green-600", bg: "bg-green-100 dark:bg-green-950/30" },
              { icon: CheckCircle, text: "Sans engagement", color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-950/30" }
            ].map((benefit, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-3 px-4 py-3 ${benefit.bg} rounded-2xl hover:scale-105 transition-transform duration-200`}
              >
                <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                <span className="font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* CTA section modernisée */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                variant="cta" 
                size="lg" 
                className="rounded-2xl hover:scale-105 transition-transform duration-200"
              >
                <Link to="/mondossier">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Héberger une centrale solaire
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-2xl hover:scale-105 transition-transform duration-200"
                onClick={() => window.open('tel:+33782905669')}
              >
                <Phone className="w-5 h-5 mr-2" />
                07.82.90.56.69
              </Button>
            </div>
            
            <p className="text-sm text-foreground/60">
              ✨ Consultation gratuite • Réponse sous 24h • Expert dédié
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;