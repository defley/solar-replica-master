import { useEffect } from "react";
import FSHeader from "@/components/fs/FSHeader";
import Footer from "@/components/fs/Footer";

const MentionsLegales = () => {
  useEffect(() => {
    document.title = "Mentions Légales - Copro Solaire";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <FSHeader />
      
      <main className="flex-1 py-16">
        <div className="container-xl max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display leading-tight mb-8">
            Mentions Légales
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            
            <section>
              <h2 className="text-2xl font-display mb-4">Éditeur du site</h2>
              <div className="bg-surface p-6 rounded-lg">
                <p><strong>Copro Solaire</strong></p>
                <p>Société par Actions Simplifiée</p>
                <p>Capital social : [montant] €</p>
                <p>Siège social : France</p>
                <p>RCS : [numéro]</p>
                <p>Numéro TVA intracommunautaire : FR[numéro]</p>
                <p>Téléphone : 07 82 90 56 69</p>
                <p>Email : romain@claudinon.fr</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-4">Directeur de la publication</h2>
              <p>Le directeur de la publication du site www.coprosolaire.fr est le représentant légal de la société Copro Solaire.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-4">Hébergement</h2>
              <div className="bg-surface p-6 rounded-lg">
                <p>Le site www.coprosolaire.fr est hébergé par :</p>
                <p><strong>[Nom de l'hébergeur]</strong></p>
                <p>[Adresse de l'hébergeur]</p>
                <p>Téléphone : [numéro]</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-4">Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu du site www.coprosolaire.fr (textes, images, vidéos, etc.) est protégé par le droit d'auteur. 
                Toute reproduction, même partielle, est interdite sans autorisation préalable écrite de Copro Solaire.
              </p>
              <p>
                Les marques et logos présents sur le site sont déposés et protégés. Leur utilisation sans autorisation constitue 
                une contrefaçon sanctionnée par les articles L. 335-2 et suivants du Code de la propriété intellectuelle.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-4">Protection des données personnelles</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, 
                vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles.
              </p>
              <p>
                Pour exercer ces droits, vous pouvez nous contacter à l'adresse : romain@claudinon.fr ou par courrier 
                à notre siège social.
              </p>
              <p>
                Les données collectées via notre formulaire de contact sont utilisées uniquement dans le cadre de votre demande 
                et ne sont pas transmises à des tiers sans votre consentement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-4">Cookies</h2>
              <p>
                Le site www.coprosolaire.fr utilise des cookies pour améliorer votre expérience de navigation et réaliser 
                des statistiques de visite. Vous pouvez paramétrer l'utilisation des cookies dans votre navigateur.
              </p>
              <p>
                Les cookies analytiques nous permettent de comprendre comment les visiteurs interagissent avec notre site 
                afin de l'améliorer continuellement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-4">Responsabilité</h2>
              <p>
                Copro Solaire s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site, 
                mais ne peut garantir leur exhaustivité ou leur absence d'erreur.
              </p>
              <p>
                L'utilisateur utilise les informations du site sous sa propre responsabilité. Copro Solaire ne saurait 
                être tenue responsable des dommages directs ou indirects résultant de l'utilisation du site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-4">Liens externes</h2>
              <p>
                Le site peut contenir des liens vers d'autres sites web. Copro Solaire n'exerce aucun contrôle sur ces sites 
                et n'est pas responsable de leur contenu ou de leurs pratiques en matière de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-4">Droit applicable</h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. Tout litige relatif à l'utilisation du site 
                sera de la compétence exclusive des tribunaux français.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display mb-4">Contact</h2>
              <div className="bg-surface p-6 rounded-lg">
                <p>Pour toute question concernant ces mentions légales, vous pouvez nous contacter :</p>
                <ul className="list-disc list-inside mt-4 space-y-2">
                  <li>Par téléphone : 07 82 90 56 69</li>
                  <li>Par email : romain@claudinon.fr</li>
                  <li>Par courrier : Copro Solaire, France</li>
                </ul>
              </div>
            </section>

            <div className="text-sm text-foreground/60 mt-12 pt-8 border-t">
              <p>Dernière mise à jour : Janvier 2024</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MentionsLegales;