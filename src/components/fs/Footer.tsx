import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-24 border-t">
      <div className="container-xl py-10 text-sm text-foreground/70">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Copro Solaire — Tous droits réservés</p>
          <nav className="flex flex-wrap gap-6" aria-label="Liens de bas de page">
            <Link to="/copro-solaire" className="hover:underline focus-ring" title="Solutions Copro Solaire">Copro Solaire</Link>
            <Link to="/blog/copro-solaire-avantages" className="hover:underline focus-ring" title="Blog copropriété solaire">Blog</Link>
            <Link to="/magazine" className="hover:underline focus-ring">Articles</Link>
            <Link to="/contact" className="hover:underline focus-ring">Contact</Link>
            <Link to="/mentions-legales" className="hover:underline focus-ring">Mentions légales</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
