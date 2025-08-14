import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-24 border-t">
      <div className="container-xl py-10 text-sm text-foreground/70">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Copro Solaire — Tous droits réservés</p>
          <nav className="flex gap-6" aria-label="Liens de bas de page">
            <Link to="/mentions-legales" className="hover:underline focus-ring">Mentions légales</Link>
            <Link to="/magazine" className="hover:underline focus-ring">Articles</Link>
            <Link to="/contact" className="hover:underline focus-ring">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
