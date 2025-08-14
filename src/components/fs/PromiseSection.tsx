import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Award, CheckCircle } from "lucide-react";

const PromiseSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background to-primary/5">
      <div className="container-xl">
        
        {/* Header modernisé */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Notre promesse</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Créer l'offre la plus
            </span>
            <br />
            <span className="text-primary">adaptée à vos besoins</span>
          </h2>
          
          <p className="text-xl text-foreground/70 leading-relaxed">
            Copro Solaire, le premier acteur à offrir aux copropriétés une solution solaire 
            <strong className="text-primary"> clé-en-main, 100% financée</strong>, sans aucun apport
          </p>
        </div>

        {/* Images grid modernisé */}
        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          {[
            { src: "/assets/adaptee-1.jpg", alt: "Panneaux solaires", title: "Installation moderne" },
            { src: "/assets/adaptee-2.jpg", alt: "Installateur de panneaux", title: "Équipe experte" },
            { src: "/assets/adaptee-3.jpg", alt: "Notre équipe examinant les dossiers", title: "Service personnalisé" }
          ].map((image, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500"
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-semibold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Avantages section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[
            { icon: CheckCircle, title: "Solution clé en main", desc: "De l'étude à l'exploitation" },
            { icon: Users, title: "Accompagnement dédié", desc: "Expert attitré à votre projet" },
            { icon: Award, title: "Garantie 30 ans", desc: "Revenus assurés et maintenus" }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:bg-card/80 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-foreground/70">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA modernisé */}
        <div className="mt-16 text-center space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              asChild 
              variant="cta" 
              size="lg" 
              className="rounded-2xl hover:scale-105 transition-transform duration-200"
            >
              <Link to="/mondossier">
                <ArrowRight className="w-5 h-5 mr-2" />
                Déposer mon dossier
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="rounded-2xl hover:scale-105 transition-transform duration-200"
            >
              <Link to="/comment-ca-marche">
                Voir Comment ça marche
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-foreground/60">
            🚀 Traitement prioritaire • Étude gratuite • Réponse garantie sous 48h
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromiseSection;