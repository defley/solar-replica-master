import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const nav = [{
  label: "Comment ça marche ?",
  href: "/comment-ca-marche",
  isRoute: true
}, {
  label: "Questions & Réponses",
  href: "/faq",
  isRoute: true
}, {
  label: "Articles",
  href: "/magazine",
  isRoute: true
}, {
  label: "Contact",
  href: "/contact",
  isRoute: true
}];
const FSHeader = () => {
  return <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <div className="container-xl h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center focus-ring" aria-label="Copro Solaire – Accueil">
          <img 
            src="/lovable-uploads/f4563c34-b3c7-4d3a-8b51-60524e92f75d.png" 
            alt="Copro Solaire - Logo soleil" 
            className="h-10 w-10"
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
          {nav.map(n => n.isRoute ? <Link key={n.href} to={n.href} className="text-sm text-foreground/80 hover:text-foreground focus-ring">
                {n.label}
              </Link> : <a key={n.href} href={n.href} className="text-sm text-foreground/80 hover:text-foreground focus-ring">
                {n.label}
              </a>)}
        </nav>
        <div className="flex items-center gap-4">
          <a href="tel:+33782905669" className="hidden md:inline text-sm text-foreground/80 focus-ring" aria-label="Appeler le 07 82 90 56 69">07 82 90 56 69</a>
          <Link to="/mondossier">
            <Button variant="cta" className="rounded-full px-5 h-11">
              Déposer mon dossier
            </Button>
          </Link>
        </div>
      </div>
    </header>;
};
export default FSHeader;