import { useEffect } from "react";
import FSHeader from "@/components/fs/FSHeader";
import Footer from "@/components/fs/Footer";
import ContactWizard from "@/components/ContactWizard";

const SimulateurProjet = () => {
  useEffect(() => {
    document.title = "Simulateur panneaux solaires copropriété - Financement travaux | Copro Solaire";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Simulez votre projet de panneaux solaires en copropriété. Calculez le financement de vos travaux. Autoconsommation collective gratuite.');
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