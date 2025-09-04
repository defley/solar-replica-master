import { useEffect } from "react";
import FSHeader from "@/components/fs/FSHeader";
import Footer from "@/components/fs/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, TrendingUp, Shield, Zap, Calculator, Users } from "lucide-react";

const CoproSolaire = () => {
  useEffect(() => {
    document.title = "Copro Solaire | Centrale photovoltaïque pour copropriété 100% financée";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez Copro Solaire, la solution solaire pour copropriété : installation photovoltaïque clé-en-main, financement total, revenus garantis 30 ans.');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const advantages = [
    {
      icon: CheckCircle,
      title: "Installation 100% financée",
      description: "Aucun coût pour la copropriété, financement complet par un tiers investisseur"
    },
    {
      icon: TrendingUp,
      title: "Revenus garantis 30 ans",
      description: "Loyer annuel ou versement unique pour financer vos travaux de rénovation"
    },
    {
      icon: Shield,
      title: "Maintenance incluse",
      description: "Assurance et maintenance 100% prises en charge par l'exploitant"
    },
    {
      icon: Zap,
      title: "Électricité moins chère",
      description: "Tarif préférentiel à 15 cts/kWh pour l'autoconsommation collective"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Étude de faisabilité",
      description: "Analyse de votre toiture et estimation du potentiel photovoltaïque"
    },
    {
      number: 2,
      title: "Présentation en AG",
      description: "Présentation du projet en assemblée générale de copropriété"
    },
    {
      number: 3,
      title: "Démarches administratives",
      description: "Obtention des autorisations et permis nécessaires"
    },
    {
      number: 4,
      title: "Installation",
      description: "Installation de la centrale photovoltaïque en 1 semaine"
    },
    {
      number: 5,
      title: "Mise en service",
      description: "Raccordement et début de production d'électricité verte"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <FSHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background/95 to-primary/5">
          <div className="container-xl">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-6" title="Copro Solaire - Solution photovoltaïque pour les copropriétés">
                Copro Solaire : solution photovoltaïque pour les copropriétés
              </h1>
              <p className="text-xl md:text-2xl text-primary/80 font-semibold mb-6">
                Installation solaire clé-en-main pour votre copropriété
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8 max-w-3xl mx-auto">
                <strong>Coprosolaire (ou Copro Solaire)</strong> est la solution clé-en-main qui permet aux copropriétés 
                d'installer une centrale photovoltaïque sur leur toit sans aucun investissement. Nous finançons 100% 
                de l'installation et vous versons un revenu garanti pendant 30 ans pour financer vos travaux de rénovation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button asChild variant="cta" size="lg" className="rounded-full px-8">
                  <Link to="/simulateur-projet">
                    <Calculator className="w-5 h-5 mr-2" />
                    Simuler mon projet solaire en copropriété
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link to="/contact">Découvrir Copro Solaire</Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm text-foreground/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Installation photovoltaïque gratuite</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Financement 100% assuré</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Revenus garantis 30 ans</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Copro Solaire Section */}
        <section className="py-16">
          <div className="container-xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display text-center mb-12" title="Solution copro solaire pour copropriété">
                Qu'est-ce que Copro Solaire ?
              </h2>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  <strong>Copro Solaire</strong> est une solution innovante qui permet aux <strong>copropriétés</strong> 
                  d'accéder gratuitement à l'énergie solaire. Notre concept révolutionnaire transforme votre toit 
                  en source de revenus tout en contribuant à la transition énergétique.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Contrairement aux installations photovoltaïques traditionnelles, notre modèle de 
                  <strong> copropriété solaire</strong> ne nécessite aucun investissement de votre part. 
                  Nous prenons en charge l'intégralité du financement, de l'installation à la maintenance, 
                  sur une période de 30 ans.
                </p>
                
                <h3 className="text-2xl font-semibold mb-4" title="Avantages installation photovoltaïque copropriété">
                  Les avantages de l'installation photovoltaïque en copropriété
                </h3>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Financement 100% assuré</strong> : Aucun coût d'installation pour la copropriété</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Revenus garantis</strong> : Loyer annuel ou versement unique pour financer vos travaux</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Autoconsommation collective</strong> : Électricité verte à tarif préférentiel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Valorisation immobilière</strong> : Amélioration du DPE et de l'attractivité</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Maintenance incluse</strong> : Aucun souci technique pendant 30 ans</span>
                  </li>
                </ul>
                
                <h3 className="text-2xl font-semibold mb-4">
                  Comment fonctionne notre solution solaire collective ?
                </h3>
                
                <p className="text-lg leading-relaxed mb-6">
                  Notre modèle de <strong>solution solaire collective</strong> repose sur un partenariat 
                  gagnant-gagnant. Nous installons et exploitons une centrale photovoltaïque sur votre toit, 
                  puis nous vous reversons une partie des revenus générés sous forme de loyer ou de versement unique.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Cette approche permet aux copropriétaires de bénéficier de l'énergie solaire sans les contraintes 
                  financières et techniques habituelles. L'<strong>installation photovoltaïque copropriété</strong> 
                  devient ainsi accessible à tous, quel que soit le budget disponible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Grid */}
        <section className="py-16 bg-surface">
          <div className="container-xl">
            <h2 className="text-3xl md:text-4xl font-display text-center mb-12">
              Pourquoi choisir notre solution Copro Solaire ?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {advantages.map((advantage, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto bg-cta/10 rounded-full flex items-center justify-center mb-4">
                    <advantage.icon className="w-8 h-8 text-cta" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{advantage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16">
          <div className="container-xl">
            <h2 className="text-3xl md:text-4xl font-display text-center mb-12">
              Comment mettre en place votre projet solaire en copropriété ?
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex gap-6 items-start">
                    <div className="bg-cta text-primary rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-surface">
          <div className="container-xl">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display mb-8">
                Votre copropriété est-elle éligible ?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-green-600">500m²</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Surface minimale</h3>
                  <p className="text-foreground/70">Toiture exploitable d'au moins 500 m²</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Accord copropriétaires</h3>
                  <p className="text-foreground/70">Vote favorable en assemblée générale</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">État de la toiture</h3>
                  <p className="text-foreground/70">Toiture en bon état structural</p>
                </div>
              </div>
              
              <Button asChild variant="cta" size="lg" className="rounded-full px-8">
                <Link to="/simulateur-projet">Vérifier l'éligibilité de ma copropriété</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display leading-tight mb-6">
                Prêt à transformer votre copropriété avec le solaire ?
              </h2>
              <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                Rejoignez les centaines de copropriétés qui ont déjà choisi notre solution 
                Copro Solaire pour financer leurs travaux et réduire leurs charges.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="cta" size="lg" className="rounded-full px-8">
                  <Link to="/simulateur-projet">
                    <Calculator className="w-5 h-5 mr-2" />
                    Commencer ma simulation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link to="/contact">Être rappelé par un expert</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CoproSolaire;