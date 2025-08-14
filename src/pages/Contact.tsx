import { useEffect } from "react";
import FSHeader from "@/components/fs/FSHeader";
import Footer from "@/components/fs/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Users, Award } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact - Copro Solaire";
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
                Contactez-nous
              </h1>
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions sur les solutions solaires pour copropriétés.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section - Centered */}
        <section className="py-16">
          <div className="container-xl">
            <div className="text-center max-w-4xl mx-auto">
              
              {/* Contact Info Cards */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                
                {/* Phone Contact */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-cta/10 rounded-full flex items-center justify-center mb-6">
                    <Phone className="w-8 h-8 text-cta" />
                  </div>
                  <h2 className="text-2xl font-display mb-4">Appelez-nous</h2>
                  <p className="text-foreground/70 mb-4">
                    Un conseiller dédié vous rappelle sous 48h
                  </p>
                  <a 
                    href="tel:+33782905669"
                    className="text-3xl font-bold text-cta hover:underline block mb-2"
                  >
                    07 82 90 56 69
                  </a>
                  <p className="text-foreground/60">
                    Du lundi au vendredi, 9h-18h
                  </p>
                </div>

                {/* Email Contact */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-cta/10 rounded-full flex items-center justify-center mb-6">
                    <Mail className="w-8 h-8 text-cta" />
                  </div>
                  <h2 className="text-2xl font-display mb-4">Écrivez-nous</h2>
                  <p className="text-foreground/70 mb-4">
                    Envoyez-nous vos questions par email
                  </p>
                  <a 
                    href="mailto:romain@claudinon.fr"
                    className="text-xl font-semibold text-cta hover:underline block mb-2"
                  >
                    romain@claudinon.fr
                  </a>
                  <p className="text-foreground/60">
                    Réponse sous 24h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-surface">
          <div className="container-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display leading-tight mb-4">
                Questions fréquentes
              </h2>
              <p className="text-foreground/80">
                Trouvez rapidement les réponses à vos questions les plus courantes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Le revenu généré peut-il financer notre Plan Pluriannuel de Travaux ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    Oui. Selon la surface disponible, vous pouvez opter pour un versement unique de 30 000 à 50 000 € ou un loyer annuel sur 30 ans. Ce budget peut couvrir une partie ou la totalité de votre PPT, sans appel de fonds aux copropriétaires.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quelle est la surface minimale pour installer une centrale solaire ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    En copropriété, il faut au moins 500 m² de toiture exploitable. Plus la surface est grande, plus la centrale est rentable et plus le revenu est important.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Qui finance l'installation et la mise en service ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    Tout est financé par un tiers investisseur. La copropriété ne débourse rien.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Combien de temps dure le contrat et que se passe-t-il à la fin ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    La durée standard est de 30 ans. À la fin, la centrale est donnée à la copropriété en état de marche. Conçue pour durer 40 ans, elle pourra encore produire de l'énergie.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/faq">Voir toutes les questions</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display leading-tight mb-6">
                  Notre équipe indépendante
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  Nos équipes sont réparties sur tout le territoire français. 
                  Nous travaillons avec des développeurs de centrales photovoltaïques reconnus en France et à l'international 
                  afin de vous assurer un projet fiable et le mieux adapté à vos besoins.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-cta" />
                    <span>Équipe d'experts dédiés</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-cta" />
                    <span>Partenaires sélectionnés pour leur fiabilité</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-cta" />
                    <span>Accompagnement personnalisé</span>
                  </div>
                </div>

                <Button asChild variant="cta" size="lg" className="rounded-full">
                  <Link to="/mondossier">Démarrer mon projet</Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/assets/adaptee-1.jpg"
                  alt="Notre équipe"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img 
                  src="/assets/adaptee-2.jpg"
                  alt="Expert terrain"
                  className="w-full h-48 object-cover rounded-lg mt-8"
                />
                <img 
                  src="/assets/adaptee-3.jpg"
                  alt="Installation solaire"
                  className="w-full h-48 object-cover rounded-lg -mt-8"
                />
                <img 
                  src="/assets/adaptee-1.jpg"
                  alt="Consultation"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;