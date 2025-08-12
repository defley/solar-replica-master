import { useEffect } from "react";
import FSHeader from "@/components/fs/FSHeader";
import Footer from "@/components/fs/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Users, Award } from "lucide-react";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact - Ferme Solaire";
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
                Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions sur les fermes solaires.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-16">
          <div className="container-xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              
              {/* Phone Contact */}
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-cta/10 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-8 h-8 text-cta" />
                  </div>
                  <CardTitle>Appelez-nous</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-4">
                    Un conseiller dédié vous rappelle sous 48h
                  </p>
                  <a 
                    href="tel:+33412280241"
                    className="text-2xl font-semibold text-cta hover:underline"
                  >
                    04 12 28 02 41
                  </a>
                  <p className="text-sm text-foreground/60 mt-2">
                    Du lundi au vendredi, 9h-18h
                  </p>
                </CardContent>
              </Card>

              {/* Email Contact */}
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-cta/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-cta" />
                  </div>
                  <CardTitle>Écrivez-nous</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-4">
                    Envoyez-nous vos questions par email
                  </p>
                  <a 
                    href="mailto:contact@fermesolaire.fr"
                    className="text-lg font-semibold text-cta hover:underline"
                  >
                    contact@fermesolaire.fr
                  </a>
                  <p className="text-sm text-foreground/60 mt-2">
                    Réponse sous 24h
                  </p>
                </CardContent>
              </Card>

              {/* Address */}
              <Card className="text-center md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto bg-cta/10 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-8 h-8 text-cta" />
                  </div>
                  <CardTitle>Notre siège</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 mb-4">
                    Basés à Aix-en-Provence
                  </p>
                  <p className="font-medium">
                    Aix-en-Provence<br />
                    Provence-Alpes-Côte d'Azur<br />
                    France
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Team Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display leading-tight mb-6">
                  Notre équipe indépendante
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-6">
                  Notre siège est situé à Aix-en-Provence et nos équipes sont réparties sur tout le territoire français. 
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
                  src="/assets/cable/step-3.jpg"
                  alt="Consultation"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Section */}
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

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Combien coûte votre service ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    Notre service est entièrement gratuit de A à Z. Aucun frais caché, 
                    aucun engagement financier de votre part.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quelle est la surface minimale requise ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    La surface minimale est de 1 hectare pour les projets au sol. 
                    Les projets sur toiture (hangar, serre) peuvent être plus petits.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Combien de temps dure un contrat ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    Les contrats de location durent généralement entre 20 et 40 ans, 
                    selon les modalités négociées.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dois-je investir de l'argent ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">
                    Non, aucun investissement n'est requis de votre part. Vous percevez 
                    uniquement un loyer pour la mise à disposition de votre terrain.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;