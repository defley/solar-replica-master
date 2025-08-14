import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const PromiseSection = () => {
  return <section className="py-20 md:py-24">
      <div className="container-xl">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm italic text-foreground/70">Notre promesse :</p>
          <h2 className="mt-1 text-3xl md:text-4xl font-display leading-tight">Créer  <br className="md:hidden" /> l'offre la plus adaptée à vos besoins</h2>
          <p className="mt-4 text-foreground/80">Copro Solaire, le premier acteur à offrir aux copropriétés une solution solaire clé-en-main, 100 % financée, sans aucun apport</p>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          <img src="/assets/adaptee-1.jpg" alt="Panneaux solaires" className="w-full h-auto rounded-lg border" loading="lazy" />
          <img src="/assets/adaptee-2.jpg" alt="Installateur de panneaux" className="w-full h-auto rounded-lg border" loading="lazy" />
          <img src="/assets/adaptee-3.jpg" alt="Notre équipe examinant les dossiers" className="w-full h-auto rounded-lg border" loading="lazy" />
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="cta" className="rounded-full h-11 px-5">
            <Link to="/mondossier">Déposer mon dossier</Link>
          </Button>
          <Link to="/comment-ca-marche" className="text-foreground/80 hover:underline focus-ring rounded-md">Voir Comment ça marche</Link>
        </div>
      </div>
    </section>;
};
export default PromiseSection;