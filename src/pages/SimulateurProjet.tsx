import { useEffect } from "react";
import FSHeader from "@/components/fs/FSHeader";
import Footer from "@/components/fs/Footer";
import ContactWizard from "@/components/ContactWizard";

const SimulateurProjet = () => {
  useEffect(() => {
    document.title = "Simulateur de projet - Copro Solaire";
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