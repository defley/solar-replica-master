import { useEffect, useState } from "react";
import FSHeader from "@/components/fs/FSHeader";
import Footer from "@/components/fs/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
}

const Magazine = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous les articles");
  
  // Articles based on provided content
  const articles: Article[] = [
    {
      id: "1",
      title: "Pourquoi installer des panneaux solaires en copropriété ?",
      category: "Copropriété",
      author: "Hellio",
      date: "15/1/25",
      image: "/assets/cable/step-1.jpg",
      excerpt: "Modèle d'autoconsommation, charges réduites, valeur verte : découvrez tous les avantages du photovoltaïque en copropriété."
    },
    {
      id: "2", 
      title: "Peut-on installer des panneaux solaires en copropriété ?",
      category: "Copropriété",
      author: "Gre-enr", 
      date: "12/1/25",
      image: "/assets/cable/step-2.jpg",
      excerpt: "Guide étape-par-étape, simulateur, aides : tout ce qu'il faut savoir pour réussir votre projet."
    },
    {
      id: "3",
      title: "Location de toiture photovoltaïque : gagner de l'argent grâce à son toit",
      category: "Location de toiture",
      author: "SunVolt",
      date: "10/1/25", 
      image: "/assets/cable/step-3.jpg",
      excerpt: "Bail clé en main, revenus garantis, sans investissement : transformez votre toit en source de revenus."
    },
    {
      id: "4",
      title: "Tiers investissement photovoltaïque : Tout comprendre",
      category: "Financement",
      author: "Les Énergies Renouvelables",
      date: "8/1/25",
      image: "/assets/paysage-campagne-1.png",
      excerpt: "Le modèle contractuel du tiers-investisseur expliqué via bail emphytéotique et ses avantages."
    },
    {
      id: "5",
      title: "Louer la toiture de sa copropriété : quels avantages et comment faire",
      category: "Location de toiture",
      author: "Baticopro",
      date: "5/1/25",
      image: "/assets/paysage-campagne-2.png",
      excerpt: "Revenus passifs, contrats simples, maintenance incluse : le guide complet de la location de toiture."
    },
    {
      id: "6",
      title: "Panneaux solaires en copropriété : passer à l'autoconsommation",
      category: "Autoconsommation",
      author: "Opéra-Énergie",
      date: "3/1/25",
      image: "/assets/serre-solaire.png",
      excerpt: "Bénéfices, étapes, impact sur le DPE et plan travaux : votre guide vers l'autoconsommation."
    },
    {
      id: "7",
      title: "Article 24-II-k : vote pour panneaux photovoltaïques en copropriété",
      category: "Réglementation",
      author: "Cabinet Naudin",
      date: "1/1/25",
      image: "/assets/cable/final.jpg",
      excerpt: "Explication sur la majorité simple en AG, les formalités et la mise en conformité réglementaire."
    }
  ];

  const categories = [
    "Tous les articles",
    "Copropriété", 
    "Location de toiture",
    "Financement",
    "Autoconsommation",
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
                <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader className="space-y-3">
                    <Badge variant="secondary" className="w-fit">
                      {article.category}
                    </Badge>
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