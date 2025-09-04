import { useEffect } from "react";
import FSHeader from "@/components/fs/FSHeader";
import Footer from "@/components/fs/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, CheckCircle, TrendingUp, Calculator, Zap } from "lucide-react";

const BlogCoproSolaire = () => {
  useEffect(() => {
    document.title = "Copro Solaire : comment les copropriétés financent leurs travaux grâce au photovoltaïque | Blog";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Découvrez comment les copropriétés utilisent le photovoltaïque pour financer leurs travaux. Guide complet sur les solutions solaires collectives et l\'autoconsommation.');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const relatedArticles = [
    {
      title: "Autoconsommation collective : le guide complet pour les copropriétés",
      excerpt: "Tout savoir sur l'autoconsommation collective en copropriété : avantages, fonctionnement, tarifs...",
      link: "/magazine"
    },
    {
      title: "Financement des travaux de copropriété : les nouvelles solutions",
      excerpt: "Découvrez les alternatives innovantes pour financer vos travaux sans appel de fonds...",
      link: "/magazine"
    },
    {
      title: "DPE et valorisation immobilière : l'impact du solaire",
      excerpt: "Comment une installation solaire améliore le diagnostic de performance énergétique...",
      link: "/magazine"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <FSHeader />
      
      <main className="flex-1">
        {/* Article Header */}
        <article className="py-16">
          <div className="container-xl max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-foreground/60 mb-8">
              <Link to="/" className="hover:text-foreground">Accueil</Link>
              <span>/</span>
              <Link to="/magazine" className="hover:text-foreground">Blog</Link>
              <span>/</span>
              <span>Copro Solaire travaux</span>
            </nav>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime="2024-01-15">15 janvier 2024</time>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Équipe Copro Solaire</span>
              </div>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                Financement
              </span>
            </div>

            {/* Article Title */}
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-display leading-tight mb-6" title="Copro Solaire financement travaux photovoltaïque">
                Copro Solaire : comment les copropriétés financent leurs travaux grâce au photovoltaïque ?
              </h1>
              <p className="text-xl text-foreground/70 leading-relaxed">
                Face à l'augmentation des coûts de rénovation, les copropriétés découvrent une solution 
                innovante : utiliser leur toit pour générer des revenus. Découvrez comment le 
                <strong> photovoltaïque en copropriété</strong> révolutionne le financement des travaux.
              </p>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              
              <h2 className="text-3xl font-semibold mb-6" title="Défis financement copropriété">
                Le défi du financement des travaux en copropriété
              </h2>
              
              <p className="text-lg leading-relaxed mb-6">
                Les copropriétés font face à des défis financiers croissants. Entre l'obligation de rénovation 
                énergétique, l'augmentation des coûts des matériaux et les travaux d'entretien, les charges 
                peuvent rapidement devenir un fardeau pour les copropriétaires.
              </p>

              <p className="text-lg leading-relaxed mb-8">
                C'est dans ce contexte que <strong>Copro Solaire</strong> propose une approche révolutionnaire : 
                transformer le toit de la copropriété en source de revenus grâce à une 
                <strong> installation photovoltaïque</strong> entièrement financée par un tiers investisseur.
              </p>

              <h2 className="text-3xl font-semibold mb-6">
                La solution photovoltaïque : un modèle économique gagnant-gagnant
              </h2>

              <h3 className="text-2xl font-semibold mb-4" title="Fonctionnement copropriété photovoltaïque">
                Comment fonctionne la copropriété photovoltaïque ?
              </h3>

              <p className="text-lg leading-relaxed mb-6">
                Le principe est simple mais efficace : un investisseur spécialisé finance l'intégralité 
                de l'<strong>installation photovoltaïque copropriété</strong>, puis verse à la copropriété 
                un loyer pour l'usage du toit. Ce revenu peut être utilisé immédiatement pour financer 
                des travaux ou constituer une réserve pour les projets futurs.
              </p>

              <div className="bg-surface p-6 rounded-lg my-8">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Les avantages concrets
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Aucun investissement</strong> : 100% du financement pris en charge</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Revenus immédiats</strong> : Loyer versé dès la mise en service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Maintenance incluse</strong> : Aucun coût d'entretien pendant 30 ans</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span><strong>Électricité moins chère</strong> : Autoconsommation à tarif préférentiel</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                Deux options de financement adaptées à vos besoins
              </h3>

              <p className="text-lg leading-relaxed mb-6">
                La <strong>solution solaire collective</strong> proposée par Copro Solaire offre une 
                flexibilité unique avec deux modalités de paiement :
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-surface p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    <h4 className="text-xl font-semibold">Loyer annuel</h4>
                  </div>
                  <p className="text-foreground/70 mb-4">
                    Revenus réguliers sur 30 ans pour réduire les charges courantes 
                    et financer progressivement vos travaux.
                  </p>
                  <ul className="text-sm space-y-2 text-foreground/70">
                    <li>• Trésorerie régulière</li>
                    <li>• Planification budgétaire facilitée</li>
                    <li>• Réduction des charges</li>
                  </ul>
                </div>

                <div className="bg-surface p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <h4 className="text-xl font-semibold">Versement unique</h4>
                  </div>
                  <p className="text-foreground/70 mb-4">
                    Capital immédiat de 30 000 à 50 000 € pour financer 
                    rapidement vos gros travaux de rénovation.
                  </p>
                  <ul className="text-sm space-y-2 text-foreground/70">
                    <li>• Financement immédiat</li>
                    <li>• Gros travaux possibles</li>
                    <li>• Pas d'appel de fonds</li>
                  </ul>
                </div>
              </div>

              <h2 className="text-3xl font-semibold mb-6">
                L'autoconsommation collective : un avantage supplémentaire
              </h2>

              <p className="text-lg leading-relaxed mb-6">
                Au-delà du financement des travaux, l'<strong>installation solaire collective</strong> 
                permet aux copropriétaires de bénéficier d'une électricité verte à prix réduit. 
                L'autoconsommation collective offre un tarif préférentiel de 15 centimes/kWh, 
                fixe pendant 30 ans.
              </p>

              <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg my-8">
                <div className="flex items-start gap-4">
                  <Zap className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-semibold mb-2 text-primary">
                      Exemple concret d'économies
                    </h4>
                    <p className="text-foreground/80 leading-relaxed">
                      Pour une copropriété de 50 logements avec une installation de 100 kWc, 
                      les économies sur la facture d'électricité peuvent atteindre 15 000 € par an, 
                      soit 300 € d'économie moyenne par logement.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-3xl font-semibold mb-6">
                Les étapes pour mettre en place votre projet
              </h2>

              <h3 className="text-2xl font-semibold mb-4">
                1. Évaluation de la faisabilité
              </h3>

              <p className="text-lg leading-relaxed mb-6">
                La première étape consiste à évaluer le potentiel de votre toiture. Pour être éligible 
                à une <strong>centrale photovoltaïque copropriété</strong>, votre immeuble doit disposer 
                d'au moins 500 m² de surface exploitable en bon état.
              </p>

              <h3 className="text-2xl font-semibold mb-4">
                2. Présentation en assemblée générale
              </h3>

              <p className="text-lg leading-relaxed mb-6">
                Une fois la faisabilité confirmée, nous préparons un dossier complet pour votre 
                assemblée générale. Le vote se fait à la majorité simple quand le projet s'inscrit 
                dans une démarche de rénovation énergétique.
              </p>

              <h3 className="text-2xl font-semibold mb-4">
                3. Démarches administratives et installation
              </h3>

              <p className="text-lg leading-relaxed mb-6">
                Nous nous occupons de toutes les démarches administratives : permis, raccordement, 
                autorisations. L'installation physique ne dure qu'une semaine environ.
              </p>

              <h2 className="text-3xl font-semibold mb-6">
                Impact sur la valorisation immobilière
              </h2>

              <p className="text-lg leading-relaxed mb-6">
                Un immeuble équipé d'une <strong>installation photovoltaïque</strong> bénéficie 
                d'une image moderne et responsable. Cette amélioration du diagnostic de performance 
                énergétique (DPE) peut avoir un impact positif sur la valeur du patrimoine immobilier.
              </p>

              <p className="text-lg leading-relaxed mb-8">
                De plus en plus d'acquéreurs sont sensibles aux questions environnementales et 
                aux charges réduites, ce qui fait de la <strong>copropriété solaire</strong> 
                un atout concurrentiel sur le marché immobilier.
              </p>

              <h2 className="text-3xl font-semibold mb-6">
                Conclusion : l'avenir du financement en copropriété
              </h2>

              <p className="text-lg leading-relaxed mb-6">
                La solution <strong>Copro Solaire</strong> représente une évolution majeure dans 
                la gestion financière des copropriétés. En transformant une contrainte (l'entretien 
                du toit) en opportunité (source de revenus), elle ouvre de nouvelles perspectives 
                pour le financement des travaux.
              </p>

              <p className="text-lg leading-relaxed mb-8">
                Cette approche innovante de la <strong>copropriété photovoltaïque</strong> permet 
                aux syndics et aux copropriétaires de disposer d'une solution concrète pour faire 
                face aux défis financiers actuels, tout en contribuant à la transition énergétique.
              </p>

            </div>

            {/* CTA Section */}
            <div className="bg-surface p-8 rounded-lg my-12 text-center">
              <h3 className="text-2xl font-semibold mb-4">
                Votre copropriété peut-elle bénéficier de cette solution ?
              </h3>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Découvrez en quelques minutes le potentiel de revenus de votre toiture et 
                les possibilités de financement pour vos travaux.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="cta" size="lg" className="rounded-full px-8">
                  <Link to="/simulateur-projet">
                    <Calculator className="w-5 h-5 mr-2" />
                    Faire ma simulation gratuite
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                  <Link to="/contact">Parler à un expert</Link>
                </Button>
              </div>
            </div>

            {/* Author Info */}
            <div className="border-t pt-8 mt-12">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Équipe Copro Solaire</h4>
                  <p className="text-foreground/70 leading-relaxed">
                    Nos experts en énergie solaire et financement de copropriété partagent 
                    leur expertise pour vous aider à mieux comprendre les enjeux et opportunités 
                    du photovoltaïque en copropriété.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="py-16 bg-surface">
          <div className="container-xl">
            <h2 className="text-3xl font-display text-center mb-12">
              Articles recommandés
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedArticles.map((article, index) => (
                <article key={index} className="bg-background rounded-lg overflow-hidden border hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-3 leading-tight">
                      <Link to={article.link} className="hover:text-primary transition-colors">
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>
                    <Link 
                      to={article.link}
                      className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
                    >
                      Lire l'article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogCoproSolaire;