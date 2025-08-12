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
      const endDistance = isMobile ? "+=120%" : "+=160%";
      
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

            // Panel visibility based on scroll progress - 3 panels only
            const panels = sectionRef.current?.querySelectorAll('[data-panel]');
            panels?.forEach((panel, index) => {
              const element = panel as HTMLElement;
              let opacity = 0;
              let translateX = 24;

              if (index === 0) { // Panel A: 0-40%
                opacity = prog <= 0.4 ? Math.min(1, prog / 0.1) : Math.max(0, (0.4 - prog) / 0.1);
              } else if (index === 1) { // Panel B: 30-70%
                opacity = prog >= 0.3 && prog <= 0.7 ? 
                  (prog >= 0.3 && prog <= 0.4 ? (prog - 0.3) / 0.1 : 
                   prog >= 0.6 ? Math.max(0, (0.7 - prog) / 0.1) : 1) : 0;
              } else if (index === 2) { // Panel C: 60-100%
                opacity = prog >= 0.6 ? Math.min(1, (prog - 0.6) / 0.1) : 0;
              }

              element.style.opacity = String(Math.max(0, Math.min(1, opacity)));
              
              if (opacity > 0) {
                element.style.transform = `translateX(${(1 - opacity) * translateX * (index % 2 === 0 ? -1 : 1)}px)`;
              } else {
                element.style.transform = `translateX(${translateX * (index % 2 === 0 ? -1 : 1)}px)`;
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

        {/* Background final image */}
        <div className="absolute inset-0 flex items-end justify-center">
          <img 
            id="solar-target"
            src="/lovable-uploads/25985e9f-57f1-4a11-a166-d1d648f094e6.png" 
            alt="Illustration de ferme solaire avec panneaux et paysage rural"
            className="w-full h-auto max-h-[60vh] object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default CableSection;