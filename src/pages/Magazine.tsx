import { useEffect, useState } from "react";
import FSHeader from "@/components/fs/FSHeader";
import Footer from "@/components/fs/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

// Import images
import coproprietePanneaux1 from "@/assets/copropriete-panneaux-1.jpg";
import coproprietePanneaux2 from "@/assets/copropriete-panneaux-2.jpg";
import locationToiture1 from "@/assets/location-toiture-1.jpg";
import locationToiture2 from "@/assets/location-toiture-2.jpg";
import financementSolaire from "@/assets/financement-solaire.jpg";
import autoconsommation from "@/assets/autoconsommation.jpg";
import reglementationSolaire from "@/assets/reglementation-solaire.jpg";

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  url: string;
}

const Magazine = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous les articles");
  
  // Articles based on provided content
  const articles: Article[] = [
    {
      id: "1",
      title: "Autoconsommation photovoltaïque en copropriété",
      category: "Autoconsommation",
      author: "ARC Copro",
      date: "15/1/25",
      image: autoconsommation,
      excerpt: "Explication claire des modèles d'autoconsommation (individuelle sans revente, avec revente, collective) ainsi que la notion de Personne Morale Organisatrice (PMO).",
      url: "https://arc-copro.fr/documentation/lautoconsommation-photovoltaique-en-copropriete"
    },
    {
      id: "2", 
      title: "Tiers-investisseur (panneau solaire)",
      category: "Financement",
      author: "Optima Énergie", 
      date: "12/1/25",
      image: financementSolaire,
      excerpt: "Présente le modèle où un investisseur finance une toiture rénovée équipée de panneaux solaires en échange d'un droit d'exploitation.",
      url: "https://www.optima-energie.fr/sobriete-energetique/installation-panneau-solaire/tiers-investisseur-panneau-solaire/"
    },
    {
      id: "3",
      title: "Autoconsommation collective : monitoring en temps réel via compteur Linky",
      category: "Autoconsommation",
      author: "ArXiv",
      date: "10/1/25", 
      image: coproprietePanneaux1,
      excerpt: "Article académique (en anglais) décrivant une infrastructure open-source de suivi en temps réel pour l'autoconsommation collective via compteurs Linky.",
      url: "https://arxiv.org/abs/2507.22891"
    },
    {
      id: "4",
      title: "Autoconsommation et logement social : des opportunités à saisir",
      category: "Autoconsommation",
      author: "Seban & Associés",
      date: "8/1/25",
      image: locationToiture1,
      excerpt: "Analyse juridique du cadre permettant aux bailleurs sociaux d'installer et mutualiser une production solaire pour alimenter logements et parties communes.",
      url: "https://www.seban-associes.avocat.fr/autoconsommation-et-logement-social-des-opportunites-a-saisir/"
    },
    {
      id: "5",
      title: "Mission sur les freins et leviers du développement des petits projets photovoltaïques",
      category: "Réglementation",
      author: "Ministère de l'Économie",
      date: "5/1/25",
      image: reglementationSolaire,
      excerpt: "Rapport institutionnel montrant l'essor massif de l'autoconsommation chez les petits producteurs (passant de 3 000 à 160 000 installations entre 2015 et 2022).",
      url: "https://www.economie.gouv.fr/files/files/directions_services/cge/media-document/Developpement-photovoltaiques.pdf"
    },
    {
      id: "6",
      title: "Article 24-II-k : vote pour panneaux photovoltaïques en copropriété",
      category: "Réglementation",
      author: "Cabinet Naudin",
      date: "3/1/25",
      image: coproprietePanneaux2,
      excerpt: "Explication sur la majorité simple en AG, les formalités et la mise en conformité réglementaire.",
      url: "https://www.cabinetnaudin.com/details-la%2Bpose%2Bde%2Bpanneaux%2Bphotovoltaiques%2Ben%2Bcopropriete%2Bvotee%2Ba%2Bl%2Barticle%2B24%2Bde%2Bla%2Bloi%2Bdu%2B10%2Bjuillet%2B1965-343.html?utm_source=chatgpt.com"
    },
    {
      id: "7",
      title: "Des panneaux solaires collectifs pour une énergie partagée – l'exemple de Rochebelle",
      category: "Autoconsommation",
      author: "EDF ENR",
      date: "2/1/25",
      image: locationToiture2,
      excerpt: "Projet pilote dans le logement social : 600 m² de panneaux sur les toits, alimentation de 100 logements, réduction de facture de 100 €/an par logement.",
      url: "https://www.edf.fr/collectivites/engager-votre-transition-energetique/references-et-realisations/l-autoconsommation-collective-pour-reduire-sa-facture-electrique-l-exemple-de-rochebelle"
    },
    {
      id: "8",
      title: "Tout savoir sur la consommation collective",
      category: "Autoconsommation",
      author: "Enedis",
      date: "1/1/25",
      image: autoconsommation,
      excerpt: "Guide pratique détaillant les atouts de l'autoconsommation collective : économies, engagement local, cadre réglementaire (notamment linky), clips pédagogiques à télécharger.",
      url: "https://www.enedis.fr/tout-savoir-sur-lautoconsommation-collective"
    }
  ];

  const categories = [
    "Tous les articles",
    "Autoconsommation",
    "Financement",
    "Réglementation"
  ];

  const filteredArticles = selectedCategory === "Tous les articles" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  useEffect(() => {
    document.title = "Magazine - Copro Solaire";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <FSHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-surface">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-6">
                Magazine
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Retrouvez ici nos articles et dossiers autour des enjeux du photovoltaïque et des centrales solaires.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 border-b">
          <div className="container-xl">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "cta" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container-xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <a 
                  key={article.id} 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img 
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="w-fit">
                          {article.category}
                        </Badge>
                        <ExternalLink className="h-4 w-4 text-foreground/60 group-hover:text-primary transition-colors" />
                      </div>
                      <h3 className="text-xl font-display leading-tight group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-foreground/70 mb-4 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-foreground/60">
                        <span>Par {article.author}</span>
                        <span>{article.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-surface">
          <div className="container-xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display leading-tight mb-4">
                Restez informé des dernières actualités
              </h2>
              <p className="text-foreground/80 mb-8">
                Recevez nos articles et analyses directement dans votre boîte mail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 rounded-full border border-border bg-background focus:outline-none focus:ring-2 focus:ring-cta"
                />
                <Button variant="cta" className="rounded-full px-6">
                  S'abonner
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

export default Magazine;