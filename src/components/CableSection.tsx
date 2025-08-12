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

      const endPct = cssNumber("--cable-end", 140);

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

          // micro-nudge only near the end (95–100%)
          const micro = p <= 0.95 ? 0 : (p - 0.95) / 0.05; // 0..1
          const dx = cssNumber("--cable-final-dx") * micro;
          const dy = cssNumber("--cable-final-dy") * micro;

          const el = document.getElementById("cable-lottie");
          if (el) {
            el.style.transform =
              `translate(var(--cable-x),var(--cable-y)) translate(${dx}px,${dy}px) scale(var(--cable-scale))`;
          }

          // Panel visibility based on scroll progress (A:0-0.33, B:0.33-0.66, C:0.66-0.95, Final:0.95-1)
          const panels = sectionRef.current?.querySelectorAll('[data-panel]');
          panels?.forEach((panel, index) => {
            const element = panel as HTMLElement;
            let opacity = 0;
            const translateX = 24;

            if (index === 0) {
              const vIn = Math.min(1, p / 0.1);
              const vOut = Math.max(0, (0.33 - p) / 0.1);
              opacity = p <= 0.1 ? vIn : (p <= 0.33 ? 1 : vOut);
            } else if (index === 1) {
              if (p >= 0.33 && p <= 0.66) {
                if (p <= 0.43) opacity = (p - 0.33) / 0.1;
                else if (p >= 0.56) opacity = Math.max(0, (0.66 - p) / 0.1);
                else opacity = 1;
              } else opacity = 0;
            } else if (index === 2) {
              if (p >= 0.66 && p <= 0.95) {
                if (p <= 0.76) opacity = (p - 0.66) / 0.1;
                else if (p >= 0.85) opacity = Math.max(0, (0.95 - p) / 0.1);
                else opacity = 1;
              } else opacity = 0;
            } else if (index === 3) {
              opacity = p >= 0.95 ? Math.min(1, (p - 0.95) / 0.05) : 0;
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
      className="relative min-h-[160vh] bg-background"
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
                    Gagnez jusqu'à 5500€ de loyer annuel par hectare
                  </h3>
                  <p className="mt-4 text-foreground/80">
                    dédié aux panneaux photovoltaïques. Grâce à notre connaissance du marché, nous vous guidons pour recevoir le meilleur loyer et la proposition la plus fiable.
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
                    Une démarche simple et sans aucune avance de frais
                  </h3>
                  <p className="mt-4 text-foreground/80">
                    Nous nous occupons de toutes les démarches administratives et financières et vous proposons l'offre la plus adaptée à vos besoins.
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
                    Un service clé en mains et 100% transparent
                  </h3>
                  <p className="mt-4 text-foreground/80">
                    Un conseiller dédié vous rappelle sous 48h (jours ouvrés) pour élaborer votre dossier et évaluer la faisabilité du projet. Vous pouvez aussi nous missionner pour négocier avec nos partenaires développeurs d'énergie renouvelable.
                  </p>
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

        {/* SOCKET (final illustration) */}
        <div 
          data-panel="3"
          className="absolute inset-0 transition-all duration-300 opacity-0"
        >
          <div id="socket-wrap" className="relative h-[64vh] md:h-[68vh] lg:h-[72vh] z-[10] flex items-center justify-end">
            <img
              id="socket-img"
              src="/lovable-uploads/73f0f72a-4082-4522-a2bc-d2de67c70b5c.png"
              alt="Panneaux solaires dans la campagne"
              className="relative right-[var(--socket-right)] max-w-[var(--socket-w)] h-auto object-contain pointer-events-none"
              loading="lazy"
            />
            {/* Point d'ancrage (centre du trou de prise) */}
            <div id="socket-anchor" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CableSection;