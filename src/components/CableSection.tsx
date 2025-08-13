'use client';
import { useEffect, useRef, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        preserveAspectRatio: "xMidYMid meet",
      },
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

      const endPct = cssNumber("--cable-end", 1600);

      const st = ScrollTrigger.create({
        trigger: "#cable-section",
        start: "top top",
        end: `+=${endPct}%`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const p = self.progress;

          // 0–90% linear, 90–100% ease-out (same feel as original)
          const t = p < 0.9 ? p : 0.9 + 0.1 * easeOut((p - 0.9) / 0.1);
          const frame = Math.min(total - 1, Math.max(0, Math.round(t * (total - 1))));
          anim.goToAndStop(frame, true);

          const el = document.getElementById("cable-lottie");
          if (el) {
            el.style.transform = `translate(var(--cable-x),var(--cable-y)) scale(var(--cable-scale))`;
          }

          // Panel visibility with extended comfortable reading times
          // Panel A: 0-40% (fade-in 0-5%, stable 5-35%, fade-out 35-40%)
          // Panel B: 25-75% (fade-in 25-30%, stable 30-70%, fade-out 70-75%)
          // Panel C: 60-100% (fade-in 60-65%, stable 65-100%)
          const panels = sectionRef.current?.querySelectorAll('[data-panel]');
          panels?.forEach((panel, index) => {
            const element = panel as HTMLElement;
            let opacity = 0;
            const translateX = 24;

            if (index === 0) {
              // Panel A: 0-40%
              if (p <= 0.05) {
                opacity = p / 0.05; // fade-in 0-5%
              } else if (p <= 0.35) {
                opacity = 1; // stable 5-35%
              } else if (p <= 0.40) {
                opacity = (0.40 - p) / 0.05; // fade-out 35-40%
              } else {
                opacity = 0;
              }
            } else if (index === 1) {
              // Panel B: 25-75%
              if (p >= 0.25 && p <= 0.30) {
                opacity = (p - 0.25) / 0.05; // fade-in 25-30%
              } else if (p > 0.30 && p <= 0.70) {
                opacity = 1; // stable 30-70%
              } else if (p > 0.70 && p <= 0.75) {
                opacity = (0.75 - p) / 0.05; // fade-out 70-75%
              } else {
                opacity = 0;
              }
            } else if (index === 2) {
              // Panel C: 60-100%
              if (p >= 0.60 && p <= 0.65) {
                opacity = (p - 0.60) / 0.05; // fade-in 60-65%
              } else if (p > 0.65) {
                opacity = 1; // stable 65-100%
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

  return (
    <section 
      ref={sectionRef}
      id="cable-section" 
      className="relative min-h-[80vh] bg-background"
    >
      {/* Cable Lottie Overlay - Behind content */}
      <div 
        ref={cableWrapRef}
        id="cable-wrap" 
        aria-hidden="true"
      >
        <div 
          ref={cableLottieRef}
          id="cable-lottie"
        />
      </div>

      {/* Content Panels */}
      <div className="relative z-20 min-h-screen">
        {/* Panel A */}
        <div 
          data-panel="0"
          className="absolute inset-0 flex items-center transition-all duration-300 opacity-0"
        >
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
                  <Button asChild variant="cta" className="mt-6 rounded-full h-11 px-6">
                    <a href="#simulator">Simuler son loyer annuel</a>
                  </Button>
                </div>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <img 
                  src="/assets/cable/step-1.jpg" 
                  alt="Panneaux solaires dans un champ agricole"
                  className="w-full h-auto rounded-xl border"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Panel B */}
        <div 
          data-panel="1"
          className="absolute inset-0 flex items-center transition-all duration-300 opacity-0"
        >
          <div className="container-xl">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6">
                <img 
                  src="/assets/cable/step-2.jpg" 
                  alt="Démarches administratives simplifiées"
                  className="w-full h-auto rounded-xl border"
                  loading="lazy"
                />
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
        <div 
          data-panel="2"
          className="absolute inset-0 flex items-center transition-all duration-300 opacity-0"
        >
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
                  <Button asChild variant="cta" className="mt-6 rounded-full h-11 px-6">
                    <a href="#simulateur-toiture">Accéder au simulateur</a>
                  </Button>
                </div>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <img 
                  src="/assets/cable/step-3.jpg" 
                  alt="Service transparent et conseiller dédié"
                  className="w-full h-auto rounded-xl border"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CableSection;