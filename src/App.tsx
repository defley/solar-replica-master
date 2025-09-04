import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Magazine from "./pages/Magazine";
import MonDossier from "./pages/MonDossier";
import CommentCaMarche from "./pages/CommentCaMarche";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import FAQ from "./pages/FAQ";
import SimulateurProjet from "./pages/SimulateurProjet";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/mondossier" element={<MonDossier />} />
          <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/simulateur-projet" element={<SimulateurProjet />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
