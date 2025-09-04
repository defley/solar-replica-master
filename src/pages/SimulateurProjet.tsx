import { useEffect } from "react";
import FSHeader from "@/components/fs/FSHeader";
import Footer from "@/components/fs/Footer";
import ContactWizard from "@/components/ContactWizard";

const SimulateurProjet = () => {
  useEffect(() => {
    document.title = "Simulateur Copro Solaire - Projet photovoltaïque copropriété | Financement travaux";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Simulez votre projet Copro Solaire : installation photovoltaïque copropriété, revenus garantis, financement travaux. Autoconsommation collective gratuite.');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <FSHeader />
      <main className="pt-20 pb-16">
        <ContactWizard />
      </main>
      <Footer />
    </div>
  );
};

export default SimulateurProjet;