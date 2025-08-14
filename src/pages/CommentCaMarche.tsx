
import { useEffect } from "react";
import FSHeader from "@/components/fs/FSHeader";
import Footer from "@/components/fs/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, FileText, Target, Zap, Star } from "lucide-react";

const CommentCaMarche = () => {
  useEffect(() => {
    document.title = "Comment ça marche - Copro Solaire";
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const steps = [
    {
      number: "1",
      title: "Je remplis le formulaire en 5 minutes (5 min)",
      description: "En quelques clics, je localise mon immeuble, indique la surface disponible sur le toit (minimum 500 m²) et précise quelques informations utiles. Ces éléments permettront à Copro Solaire d'évaluer rapidement le potentiel du projet.",
      image: "/lovable-uploads/formulaire-etape-1.png",
      icon: <FileText className="w-8 h-8 text-cta" />
    },
    {
      number: "2", 
      title: "Un conseiller dédié me rappelle sous 48 h (2 jours)",
      description: "Il vérifie l'éligibilité de ma copropriété, calcule le loyer ou le financement possible (paiement unique ou annuel) et répond à toutes mes questions, y compris sur le modèle tiers-investisseur.",
      image: "/lovable-uploads/conseiller-etape-2.png",
      icon: <Phone className="w-8 h-8 text-cta" />
    },
    {
      number: "3",
      title: "Prise de contact avec le syndic et présentation aux copropriétaires (2 à 4 semaines)",
      description: "Nous contactons le syndic pour expliquer la démarche et organiser, si nécessaire, une réunion d'information avec les copropriétaires. Objectif : répondre à toutes les interrogations et présenter les bénéfices concrets du projet.",
      image: "/lovable-uploads/presentation-syndic-etape-3.png",
      icon: <Target className="w-8 h-8 text-cta" />
    },
    {
      number: "4",
      title: "Présentation et vote en Assemblée Générale (1 à 3 mois, selon date de l'AG)",
      description: "Nous fournissons un dossier complet prêt à être intégré à l'ordre du jour. Le projet se vote à la majorité des présents (24-II-K), car il est lié à l'amélioration énergétique et au DPE.",
      image: "/lovable-uploads/assemblee-generale-etape-4.png",
      icon: <CheckCircle className="w-8 h-8 text-cta" />
    },
    {
      number: "5",
      title: "Installation et financement (9 à 10 mois, incluant démarches administratives)",
      description: "Une fois voté, le partenaire investisseur finance 100 % de l'installation et prend en charge toutes les démarches administratives (urbanisme, raccordement, contrats, assurances). Durée des travaux sur site : environ 1 semaine seulement, sans gêner la vie de l'immeuble.",
      image: "/lovable-uploads/installation-panneaux-etape-5.png",
      icon: <Zap className="w-8 h-8 text-cta" />
    },
    {
      number: "6",
      title: "Mise en service et revenus (à partir du 12ᵉ mois)",
      description: "La centrale démarre et la copropriété perçoit soit un loyer annuel garanti pendant 30 ans, soit un paiement unique (30 000 € à 50 000 € selon la surface). En fin de contrat, la centrale est cédée gratuitement à la copropriété, en état de marche, avec une durée de vie estimée à 40 ans.",
      image: "/lovable-uploads/revenus-solaires-etape-6.png",
      icon: <Star className="w-8 h-8 text-cta" />
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <FSHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-surface">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm italic text-foreground/70 mb-2">Comment ça marche</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-6">
                Un service clé en main et 100 % gratuit pour votre copropriété
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Découvrez notre processus en 6 étapes simples pour financer vos travaux grâce à une centrale solaire en toiture.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 md:py-24">
          <div className="container-xl">
            <div className="space-y-16">
              {steps.map((step, index) => (
                <Card key={step.number} className="overflow-hidden border-0 shadow-lg">
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <img 
                        src={step.image}
                        alt={step.title}
                        className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
                      />
                      <div className="absolute -top-4 -left-4 bg-cta rounded-full w-16 h-16 flex items-center justify-center font-display text-2xl font-bold text-primary">
                        {step.number}
                      </div>
                    </div>
                    
                    <CardContent className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <div className="flex items-start gap-4 mb-6">
                        {step.icon}
                        <div>
                          <h3 className="text-2xl md:text-3xl font-display leading-tight mb-4">
                            {step.title}
                          </h3>
                          <p className="text-foreground/80 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-surface">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-sm italic text-foreground/70 mb-2">Hébergez une centrale solaire</p>
              <h2 className="text-3xl md:text-4xl font-display leading-tight mb-6">
                Déposez votre demande en moins de 5 minutes
              </h2>
              
              <div className="flex items-center justify-center gap-8 mb-8 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Gratuit de A à Z</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Sans engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-cta" />
                  <span>Trustpilot</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild variant="cta" size="lg" className="rounded-full px-8">
                  <Link to="/mondossier">Déposer mon dossier</Link>
                </Button>
                <p className="text-sm text-foreground/60">
                  ou appelez-nous au{" "}
                  <a 
                    href="tel:+33782905669" 
                    className="text-cta hover:underline font-medium"
                  >
                    07.82.90.56.69
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Image */}
        <section className="py-16 bg-background">
          <div className="container-xl text-center">
            <img 
              src="/lovable-uploads/projet-termine-final.png"
              alt="Installation de panneaux solaires sur copropriété terminée"
              className="w-full max-w-2xl mx-auto h-auto"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CommentCaMarche;
