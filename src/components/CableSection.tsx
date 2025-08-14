'use client';

import { useEffect, useRef, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const CableSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cableWrapRef = useRef<HTMLDivElement | null>(null);
  const cableLottieRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current || !cableLottieRef.current || !cableWrapRef.current) return;

    // Respect reduced motion
    if (prefersReducedMotion()) {
      // Show all panels statically
      const panels = sectionRef.current.querySelectorAll('[data-panel]');
      panels.forEach(panel => {
        (panel as HTMLElement).style.opacity = '1';
        (panel as HTMLElement).style.transform = 'none';
      });
      if (cableWrapRef.current) cableWrapRef.current.style.display = 'none';
      return;
    }
    const anim = lottie.loadAnimation({
      container: cableLottieRef.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/assets/lottie/cable.json",
      rendererSettings: {
        progressiveLoad: true,
        preserveAspectRatio: "xMidYMid meet"
      }
    });
    animRef.current = anim;
    const onReady = () => {
      const total = Math.max(1, Math.floor(anim.getDuration(true)));
      const easeOut = gsap.parseEase("power2.out");
      const cssNumber = (name: string, fallback = 0) => {
        const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        const n = parseFloat(v);
        return Number.isFinite(n) ? n : fallback;
      };
      const endPct = cssNumber("--cable-end", 1000);
      // Mobile adaptation: reduce scroll distance for better mobile UX
      const finalEndPct = isMobile ? Math.min(endPct, 700) : endPct;
      const st = ScrollTrigger.create({
        trigger: "#cable-section",
        start: "top top",
        end: `+=${finalEndPct}%`,
        scrub: 0.8,
        pin: true,
        pinSpacing: true,
        onUpdate: self => {
          const p = self.progress;

          // 0–90% linear, 90–100% ease-out (same feel as original)
          const t = p < 0.9 ? p : 0.9 + 0.1 * easeOut((p - 0.9) / 0.1);
          const frame = Math.min(total - 1, Math.max(0, Math.round(t * (total - 1))));
          anim.goToAndStop(frame, true);
          const el = document.getElementById("cable-lottie");
          if (el) {
            el.style.transform = `translate(var(--cable-x),var(--cable-y)) scale(var(--cable-scale))`;
          }

          // Panel visibility avec transitions séquentielles fluides
          // Panel A: 0-30% (fade-in 0-3%, stable 3-25%, fade-out 25-30%)
          // Panel B: 35-65% (fade-in 35-38%, stable 38-60%, fade-out 60-65%)  
          // Panel C: 70-100% (fade-in 70-73%, stable 73-100%)
          const panels = sectionRef.current?.querySelectorAll('[data-panel]');
          panels?.forEach((panel, index) => {
            const element = panel as HTMLElement;
            let opacity = 0;
            const translateX = 12;

            if (index === 0) {
              // Panel A: 0-60% (étendu pour le bouton)
              if (p <= 0.05) {
                opacity = p / 0.05; // fade-in 0-5%
              } else if (p <= 0.55) {
                opacity = 1; // stable 5-55%
              } else if (p <= 0.60) {
                opacity = (0.60 - p) / 0.05; // fade-out 55-60%
              } else {
                opacity = 0;
              }
            } else if (index === 1) {
              // Panel B: 35-65% 
              if (p >= 0.35 && p <= 0.38) {
                opacity = (p - 0.35) / 0.03; // fade-in 35-38%
              } else if (p > 0.38 && p <= 0.60) {
                opacity = 1; // stable 38-60%
              } else if (p > 0.60 && p <= 0.65) {
                opacity = (0.65 - p) / 0.05; // fade-out 60-65%
              } else {
                opacity = 0;
              }
            } else if (index === 2) {
              // Panel C: 70-100%
              if (p >= 0.70 && p <= 0.73) {
                opacity = (p - 0.70) / 0.03; // fade-in 70-73%
              } else if (p > 0.73) {
                opacity = 1; // stable 73-100%
              } else {
                opacity = 0;
              }
            }
            element.style.opacity = String(Math.max(0, Math.min(1, opacity)));
            if (index <= 2) {
              const dir = index % 2 === 0 ? -1 : 1;
              if (opacity > 0) {
                element.style.transform = `translateX(${(1 - opacity) * translateX * dir}px)`;
              } else {
                element.style.transform = `translateX(${translateX * dir}px)`;
              }
            } else {
              element.style.transform = 'none';
            }
          });
        }
      });

      // GPU compositing for smoothness
      if (cableLottieRef.current) {
        cableLottieRef.current.style.willChange = "transform";
      }
      return () => {
        st.kill();
      };
    };
    anim.addEventListener("DOMLoaded", onReady);
    anim.addEventListener("data_failed", () => {
      if (cableWrapRef.current) cableWrapRef.current.style.display = "none";
    });
    return () => {
      anim.removeEventListener("DOMLoaded", onReady as any);
      anim.destroy();
    };
  }, [isMobile]);
  return <section ref={sectionRef} id="cable-section" className="relative min-h-[80vh] bg-background">
      {/* Cable Lottie Overlay - Behind content */}
      <div ref={cableWrapRef} id="cable-wrap" aria-hidden="true">
        <div ref={cableLottieRef} id="cable-lottie" />
      </div>

      {/* Content Panels */}
      <div className="relative z-20 min-h-screen">
        {/* Panel A */}
        <div data-panel="0" className="absolute inset-0 flex items-center transition-all duration-300 opacity-0 z-30">
          <div className="container-xl">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5">
                <div className="max-w-md">
                  <h3 className="text-2xl md:text-3xl font-display leading-tight">
                    Financez vos travaux grâce à votre toiture
                  </h3>
                  <p className="mt-4 text-foreground/80">
                    Accueillez une centrale solaire sur le toit de votre copropriété et percevez un loyer annuel de 2 500 € à 12 000 €, garanti pendant 30 ans, sans aucun investissement.
                  </p>
                  <button
                    onClick={() => {
                      console.log("Simuler loyer button clicked!");
                      const target = document.getElementById("simulateur-toiture");
                      console.log("Found target:", target);
                      if (target) {
                        console.log("Scrolling to simulator...");
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                      } else {
                        console.log("No target found, simulator not on page");
                      }
                    }}
                    className="relative z-50 mt-6 rounded-full h-11 px-6 bg-cta text-cta-foreground hover:bg-cta/90 inline-flex items-center justify-center font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta pointer-events-auto"
                    style={{ zIndex: 9999 }}
                  >
                    Simuler loyer
                  </button>
                </div>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <img src="/lovable-uploads/dabe97e5-856c-40db-858c-c69084db4e37.png" alt="Installation de panneaux solaires sur toit d'immeuble avec équipe technique" className="w-full h-auto rounded-xl" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

        {/* Panel B */}
        <div data-panel="1" className="absolute inset-0 flex items-center transition-all duration-300 opacity-0">
          <div className="container-xl">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6">
                <img src="/assets/cable/step-2.jpg" alt="Démarches administratives simplifiées" className="w-full h-auto rounded-xl border" loading="lazy" />
              </div>
              <div className="md:col-span-5 md:col-start-8">
                <div className="max-w-md">
                  <h3 className="text-2xl md:text-3xl font-display leading-tight">
                    Financez votre Plan Pluriannuel de Travaux
                  </h3>
                  <p className="mt-4 text-foreground/80">
                    Louez votre toiture et obtenez un versement unique de 30 000 à 50 000 €, selon la surface, pour réaliser vos travaux sans appel de fonds aux copropriétaires.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel C */}
        <div data-panel="2" className="absolute inset-0 flex items-center transition-all duration-300 opacity-0">
          <div className="container-xl">
            <div className="grid md:grid-cols-12 gap-1 items-center">
              <div className="md:col-span-5">
                <div className="max-w-md">
                  <h3 className="text-2xl md:text-3xl font-display leading-tight">Bénéficiez d’une centrale solaire sans aucun frais pour la copropriété.</h3>
                  <p className="mt-4 text-foreground/80">Grâce au modèle du tiers-investissement, nous prenons en charge 100 % de l’installation, de la maintenance et de l’exploitation, pendant toute la durée du contrat.
Vous percevez un loyer garanti ou un versement unique… et réduisez vos charges sans investir un centime.


                </p>
                </div>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <img src="/lovable-uploads/93c633ac-c794-41e9-8f28-e3759d487062.png" alt="Installation de panneaux solaires - Service transparent et conseiller dédié" className="w-full h-auto" loading="lazy" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>;
};
export default CableSection;