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

      const scrubObj = { p: 0 };
      const endDistance = isMobile ? "+=110%" : "+=140%";
      
      const tween = gsap.to(scrubObj, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: "top top",
          end: endDistance,
          scrub: true,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const prog = self.progress;
            
            // Cable animation with ease-out at 90%
            let t = prog;
            if (t >= 0.9) {
              const last = (t - 0.9) / 0.1;
              t = 0.9 + 0.1 * easeOut(last);
            }
            const frame = Math.min(total - 1, Math.max(0, Math.round(t * (total - 1))));
            anim.goToAndStop(frame, true);

            // Panel visibility based on scroll progress (A:0-0.33, B:0.33-0.66, C:0.66-0.95, Final:0.95-1)
            const panels = sectionRef.current?.querySelectorAll('[data-panel]');
            panels?.forEach((panel, index) => {
              const element = panel as HTMLElement;
              let opacity = 0;
              const translateX = 24;

              if (index === 0) {
                const vIn = Math.min(1, prog / 0.1);
                const vOut = Math.max(0, (0.33 - prog) / 0.1);
                opacity = prog <= 0.1 ? vIn : (prog <= 0.33 ? 1 : vOut);
              } else if (index === 1) {
                if (prog >= 0.33 && prog <= 0.66) {
                  if (prog <= 0.43) opacity = (prog - 0.33) / 0.1;
                  else if (prog >= 0.56) opacity = Math.max(0, (0.66 - prog) / 0.1);
                  else opacity = 1;
                } else opacity = 0;
              } else if (index === 2) {
                if (prog >= 0.66 && prog <= 0.95) {
                  if (prog <= 0.76) opacity = (prog - 0.66) / 0.1;
                  else if (prog >= 0.85) opacity = Math.max(0, (0.95 - prog) / 0.1);
                  else opacity = 1;
                } else opacity = 0;
              } else if (index === 3) {
                opacity = prog >= 0.95 ? Math.min(1, (prog - 0.95) / 0.05) : 0;
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
        },
      });

      // GPU compositing for smoothness
      if (cableLottieRef.current) {
        cableLottieRef.current.style.willChange = "transform";
      }

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
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
        className="absolute inset-0 pointer-events-none overflow-hidden z-5"
        aria-hidden="true"
      >
        <div 
          ref={cableLottieRef}
          id="cable-lottie" 
          className="w-full h-full"
          style={{ transform: 'translateX(25%)' }}
        />
      </div>

      {/* Content Panels */}
      <div className="relative z-10 min-h-screen">
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

        {/* Final Panel - appears only at the end */}
        <div 
          data-panel="3"
          className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0"
        >
          <div className="w-full h-full">
            <img 
              id="solar-target"
              src="/lovable-uploads/25985e9f-57f1-4a11-a166-d1d648f094e6.png" 
              alt="Illustration finale de ferme solaire"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CableSection;