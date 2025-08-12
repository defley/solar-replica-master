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
    document.title = "Questions & Réponses - Ferme Solaire";
  }, []);

  const faqs = [
    {
      id: "faq1",
      question: "Combien coûte votre service ?",
      answer: "Notre service est entièrement gratuit de A à Z. Nous ne facturons aucun frais pour l'étude de votre terrain, la mise en relation avec les développeurs ou l'accompagnement dans votre projet. Notre rémunération provient des développeurs partenaires, ce qui garantit notre totale indépendance et la gratuité de nos services pour vous."
    },
    {
      id: "faq2", 
      question: "Quelle est la surface minimale requise pour installer des panneaux solaires ?",
      answer: "Pour les projets au sol, la surface minimale est généralement de 1 hectare (10 000 m²). Cette taille permet une rentabilité optimale de l'installation. Pour les projets sur toiture (hangars agricoles, serres, ombrières de parking), les surfaces peuvent être plus petites, à partir de 500 m² selon les configurations."
    },
    {
      id: "faq3",
      question: "Combien puis-je gagner en louant mon terrain ?",
      answer: "Le loyer varie entre 1 000€ et 5 500€ par hectare et par an, selon plusieurs critères : l'exposition solaire de votre terrain, sa proximité avec un poste électrique, la topographie, l'accessibilité et la réglementation locale. Nos experts évaluent gratuitement le potentiel de votre terrain pour vous donner une estimation précise."
    },
    {
      id: "faq4",
      question: "Combien de temps dure un contrat de location ?",
      answer: "Les contrats de bail emphytéotique durent généralement entre 20 et 40 ans. Cette durée permet d'amortir l'investissement important que représente une centrale photovoltaïque. À l'issue du contrat, plusieurs options sont possibles : renouvellement, rachat des installations par le propriétaire, ou démantèlement et remise en état du terrain."
    },
    {
      id: "faq5",
      question: "Dois-je investir de l'argent pour installer des panneaux solaires ?",
      answer: "Non, aucun investissement financier n'est requis de votre part. Le développeur prend en charge l'intégralité des coûts : études techniques et administratives, financement, construction, exploitation et maintenance. Vous percevez uniquement un loyer annuel fixe ou indexé selon les termes du contrat."
    },
    {
      id: "faq6",
      question: "Que devient mon terrain pendant la location ?",
      answer: "Votre terrain reste votre propriété. Les panneaux solaires sont installés sur des structures qui n'abîment pas le sol. Un couloir de circulation est maintenu entre les rangées de panneaux, et une partie du terrain peut souvent continuer à être exploitée (pâturage ovin par exemple). À la fin du contrat, le terrain vous est rendu dans son état initial."
    },
    {
      id: "faq7",
      question: "Quels sont les critères d'éligibilité de mon terrain ?",
      answer: "Plusieurs critères sont évalués : une surface d'au moins 1 hectare, une bonne exposition au soleil (idéalement orienté sud), un terrain relativement plat, un accès routier, la proximité d'un poste électrique, et l'absence de contraintes environnementales majeures. Nos experts analysent tous ces éléments gratuitement lors de l'étude de faisabilité."
    },
    {
      id: "faq8",
      question: "Combien de temps faut-il pour finaliser un projet ?",
      answer: "Le délai total varie entre 3 et 7 ans selon la complexité du projet. Cela inclut : l'étude de faisabilité (2-6 mois), l'obtention des autorisations administratives (1-3 ans), le financement et la construction (1-2 ans). Une fois la centrale en fonctionnement, vous commencez à percevoir votre loyer annuel."
    },
    {
      id: "faq9",
      question: "Puis-je annuler ma demande à tout moment ?",
      answer: "Oui, vous pouvez vous désengager à tout moment avant la signature du bail. Notre service est sans engagement jusqu'à la signature du contrat définitif. Même après avoir reçu des propositions, vous êtes libre de ne pas donner suite ou de négocier les conditions qui vous conviennent le mieux."
    },
    {
      id: "faq10",
      question: "Les panneaux solaires ont-ils un impact sur l'environnement ?",
      answer: "Les panneaux solaires ont un impact environnemental très positif. Une centrale photovoltaïque produit une énergie propre et renouvelable qui évite l'émission de milliers de tonnes de CO2 par an. Les installations sont réversibles et les panneaux sont recyclables à plus de 95%. De plus, la biodiversité peut être préservée voire améliorée sous et autour des panneaux."
    },
    {
      id: "faq11",
      question: "Que se passe-t-il en cas de problème avec l'installation ?",
      answer: "Le développeur est responsable de la maintenance et du bon fonctionnement de l'installation pendant toute la durée du contrat. Il souscrit également une assurance responsabilité civile qui vous couvre en cas de dommages. En cas de défaillance technique, le développeur prend en charge les réparations sans impact sur votre loyer."
    },
    {
      id: "faq12",
      question: "Comment Ferme Solaire sélectionne ses partenaires développeurs ?",
      answer: "Nous travaillons uniquement avec des développeurs reconnus pour leur solidité financière, leur expertise technique et leur respect des engagements. Tous nos partenaires sont des acteurs établis du marché français et international, avec des références vérifiées et des garanties bancaires solides pour sécuriser vos revenus sur le long terme."
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
                Questions & Réponses
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Trouvez toutes les réponses à vos questions sur les fermes solaires, 
                la location de terrain et notre processus d'accompagnement.
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
                      href="tel:+33412280241"
                      className="text-lg font-semibold text-cta hover:underline"
                    >
                      04 12 28 02 41
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
                      href="mailto:contact@fermesolaire.fr"
                      className="text-lg font-semibold text-cta hover:underline"
                    >
                      contact@fermesolaire.fr
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