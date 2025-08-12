import { useEffect } from "react";
import FSHeader from "@/components/fs/FSHeader";
import Footer from "@/components/fs/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, FileText, Target, Zap, Star } from "lucide-react";

const CommentCaMarche = () => {
  useEffect(() => {
    document.title = "Comment ça marche - Ferme Solaire";
  }, []);

  const steps = [
    {
      number: "1",
      title: "Je remplis le formulaire en 5 minutes chrono",
      description: "En quelques clics, je repère mon terrain, je sélectionne mes parcelles et je renseigne certains éléments clefs sur l'histoire du site. Ils permettront aux équipes d'avoir une première idée de mon projet et m'orienter au mieux.",
      image: "/assets/cable/step-1.jpg",
      icon: <FileText className="w-8 h-8 text-cta" />
    },
    {
      number: "2", 
      title: "Un conseiller dédié me rappelle sous 48h",
      description: "Il me posera les questions nécessaires pour valider l'éligibilité de mon terrain et évaluer mon loyer potentiel. Je profite de cet appel pour lui partager mes interrogations au sujet du photovoltaïque - il est là pour ça !",
      image: "/assets/cable/step-2.jpg",
      icon: <Phone className="w-8 h-8 text-cta" />
    },
    {
      number: "3",
      title: "Je reçois jusqu'à 3 propositions de producteurs d'énergie",
      description: "Si mon terrain est éligible je reçois jusqu'à 3 propositions de producteurs d'énergie renouvelables pour la construction de la centrale photovoltaïque. Tous partenaires de Ferme Solaire, ils ont été sélectionnés pour leur fiabilité et leur renommée en France et à l'international.",
      image: "/assets/cable/step-3.jpg",
      icon: <Target className="w-8 h-8 text-cta" />
    },
    {
      number: "4",
      title: "Je choisis l'offre la plus adaptée à mes besoins",
      description: "Le développeur de la centrale prend le relais et se charge de toutes les démarches administratives et financières. Autre possibilité : Ferme Solaire reste à mes côtés pour m'aiguiller et négocier la solution la plus pertinente. Totale indépendance ou relais de confiance : je fais mon choix !",
      image: "/assets/paysage-campagne-1.png",
      icon: <CheckCircle className="w-8 h-8 text-cta" />
    },
    {
      number: "5",
      title: "La centrale est mise en route : je commence à toucher mon loyer !",
      description: "Une fois le développement du projet abouti et la centrale construite, l'exploitation peut démarrer. Je perçois alors un loyer pendant 20 à 40 ans, en fonction des modalités de mon contrat.",
      image: "/assets/serre-solaire.png",
      icon: <Zap className="w-8 h-8 text-cta" />
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
                Un service simple et 100% gratuit
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Découvrez notre processus en 5 étapes pour transformer votre terrain en source de revenus durables.
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
              <p className="text-sm italic text-foreground/70 mb-2">Hébergez une ferme solaire</p>
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
                    href="tel:+33412280241" 
                    className="text-cta hover:underline font-medium"
                  >
                    04.12.28.02.41
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
              src="/assets/serre-solaire.png"
              alt="Installation de panneaux solaires"
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