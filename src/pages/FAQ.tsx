import { useEffect } from "react";
import FSHeader from "@/components/fs/FSHeader";
import Footer from "@/components/fs/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Phone, Mail } from "lucide-react";

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ Panneaux solaires copropriété - Questions financement travaux | Copro Solaire";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Questions fréquentes sur les panneaux solaires en copropriété, financement travaux solaire, autoconsommation collective. Réponses d\'experts.');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const faqs = [
    {
      id: "faq1",
      question: "Le revenu généré peut-il financer notre Plan Pluriannuel de Travaux ?",
      answer: "Oui. Selon la surface disponible, vous pouvez opter pour un versement unique de 30 000 à 50 000 € ou un loyer annuel sur 30 ans. Ce budget peut couvrir une partie ou la totalité de votre PPT, sans appel de fonds aux copropriétaires."
    },
    {
      id: "faq2",
      question: "Peut-on choisir entre un paiement unique ou un loyer annuel ?",
      answer: "Oui. Vous avez le choix entre un versement immédiat pour financer des travaux rapidement ou un revenu annuel régulier pour réduire les charges sur le long terme."
    },
    {
      id: "faq3",
      question: "Le syndic peut-il facturer des frais pour le suivi du projet ?",
      answer: "Si le syndic facture des honoraires spécifiques pour le suivi des travaux, ces frais peuvent être pris en charge par le revenu généré par la centrale, afin de ne pas alourdir vos charges."
    },
    {
      id: "faq4",
      question: "Quelle est la surface minimale pour installer une centrale solaire ?",
      answer: "En copropriété, il faut au moins 500 m² de toiture exploitable. Plus la surface est grande, plus la centrale est rentable et plus le revenu est important."
    },
    {
      id: "faq5",
      question: "Le coût de l'électricité produite est-il avantageux ?",
      answer: "Oui. Si la surface est suffisante pour alimenter une partie des logements, le prix de l'électricité peut être fixé à 15 centimes/kWh pendant 30 ans, bien en dessous des prix du marché."
    },
    {
      id: "faq6",
      question: "Qui prend en charge les assurances ?",
      answer: "Toutes les assurances liées à la centrale (responsabilité civile, dégâts, perte d'exploitation) sont prises en charge par l'exploitant. La copropriété n'a aucun coût ni risque."
    },
    {
      id: "faq7",
      question: "Que se passe-t-il en cas de panne ou de problème technique ?",
      answer: "La maintenance est 100 % assurée par l'exploitant, sans frais pour la copropriété. Les interventions sont prévues dans le contrat."
    },
    {
      id: "faq8",
      question: "Comment lancer le projet dans notre copropriété ?",
      answer: "Contactez-nous, échangez entre copropriétaires et parlez-en à votre syndic pour qu'il l'inscrive à l'ordre du jour de la prochaine Assemblée Générale. Pour toutes les autres démarches administratives et techniques, nous nous occupons de tout et fournissons un dossier complet pour faciliter le vote."
    },
    {
      id: "faq9",
      question: "Quel vote est nécessaire en Assemblée Générale ?",
      answer: "Lorsque le projet est lié à une rénovation énergétique ou à l'amélioration du DPE, il est voté à la majorité des présents en A.G (article 24-II-k de la loi du 10 juillet 1965)."
    },
    {
      id: "faq10",
      question: "Qui finance l'installation et la mise en service ?",
      answer: "Tout est financé par un tiers investisseur. La copropriété ne débourse rien."
    },
    {
      id: "faq11",
      question: "Combien de temps dure le contrat et que se passe-t-il à la fin ?",
      answer: "La durée standard est de 30 ans. À la fin, la centrale est donnée à la copropriété en état de marche. Conçue pour durer 40 ans, elle pourra encore produire de l'énergie, et la copropriété pourra en faire l'usage qu'elle souhaite."
    },
    {
      id: "faq12",
      question: "Combien de temps durent les travaux d'installation ?",
      answer: "L'installation de la centrale solaire dure environ 1 semaine. Cependant, le dossier complet (de la prise de contact au lancement effectif de la centrale) prend environ 1 an à être traité, incluant toutes les démarches administratives et autorisations nécessaires."
    },
    {
      id: "faq13",
      question: "Est-ce que cela augmente la valeur de notre immeuble ?",
      answer: "Oui. Un immeuble équipé de panneaux solaires est perçu comme plus moderne, économe et respectueux de l'environnement, ce qui peut améliorer sa valeur et son attractivité."
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
              <div className="w-16 h-16 mx-auto bg-cta/10 rounded-full flex items-center justify-center mb-6">
                <HelpCircle className="w-8 h-8 text-cta" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-6">
                FAQ – Centrale solaire en copropriété
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Trouvez toutes les réponses à vos questions sur les centrales solaires en copropriété, 
                le financement et les démarches administratives.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container-xl max-w-4xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id}
                  className="bg-surface border border-border rounded-lg px-6 data-[state=open]:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6 [&[data-state=open]>svg]:rotate-180">
                    <div className="flex items-start gap-4">
                      <div className="bg-cta text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-lg font-medium leading-relaxed">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-0">
                    <div className="ml-12 text-foreground/80 leading-relaxed">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-surface">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display leading-tight mb-6">
                Vous ne trouvez pas la réponse à votre question ?
              </h2>
              <p className="text-foreground/80 mb-8 leading-relaxed">
                Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions personnalisées.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cta/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-cta" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-foreground/60">Appelez-nous</p>
                    <a 
                      href="tel:+33782905669"
                      className="text-lg font-semibold text-cta hover:underline"
                    >
                      07 82 90 56 69
                    </a>
                  </div>
                </div>
                
                <div className="hidden sm:block w-px h-12 bg-border"></div>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-cta/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-cta" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-foreground/60">Écrivez-nous</p>
                    <a 
                      href="mailto:romain@claudinon.fr"
                      className="text-lg font-semibold text-cta hover:underline"
                    >
                      romain@claudinon.fr
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button asChild variant="cta" size="lg" className="rounded-full px-8">
                  <Link to="/mondossier">Déposer mon dossier</Link>
                </Button>
                <p className="text-sm text-foreground/60 mt-4">
                  Ou commencez directement votre demande en ligne - c'est gratuit et sans engagement
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;