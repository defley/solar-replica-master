const Footer = () => {
  return (
    <footer className="mt-24 border-t">
      <div className="container-xl py-10 text-sm text-foreground/70">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ferme Solaire — Tous droits réservés</p>
          <nav className="flex gap-6" aria-label="Liens de bas de page">
            <a href="#legal" className="hover:underline focus-ring">Mentions légales</a>
            <a href="#privacy" className="hover:underline focus-ring">Confidentialité</a>
            <a href="#contact" className="hover:underline focus-ring">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
