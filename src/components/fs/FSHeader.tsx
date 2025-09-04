import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b">
      <div className="container-xl h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-tight focus-ring" aria-label="Copro Solaire – Accueil">
          copro solaire
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
          {nav.map(n => n.isRoute ? (
            <Link key={n.href} to={n.href} className="text-sm text-foreground/80 hover:text-foreground focus-ring">
              {n.label}
            </Link>
          ) : (
            <a key={n.href} href={n.href} className="text-sm text-foreground/80 hover:text-foreground focus-ring">
              {n.label}
            </a>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <a href="tel:+33782905669" className="hidden md:inline text-sm text-foreground/80 focus-ring" aria-label="Appeler le 07 82 90 56 69">07 82 90 56 69</a>
          
          <Link to="/mondossier" className="hidden sm:block">
            <Button variant="cta" className="rounded-full px-5 h-11">
              Déposer mon dossier
            </Button>
          </Link>
          
          {/* Mobile Menu Trigger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-6" aria-label="Navigation mobile">
                {nav.map(n => n.isRoute ? (
                  <Link 
                    key={n.href} 
                    to={n.href} 
                    className="text-lg text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {n.label}
                  </Link>
                ) : (
                  <a 
                    key={n.href} 
                    href={n.href} 
                    className="text-lg text-foreground hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {n.label}
                  </a>
                ))}
                
                <div className="border-t pt-6 space-y-4">
                  <a href="tel:+33782905669" className="block text-lg text-foreground/80 hover:text-primary transition-colors">
                    📞 07 82 90 56 69
                  </a>
                  <Link to="/mondossier" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="cta" className="w-full rounded-full h-11">
                      Déposer mon dossier
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default FSHeader;