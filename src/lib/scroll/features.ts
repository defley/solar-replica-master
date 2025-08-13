import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initFeatureSteps(options?: {
  container?: string;    // ".fs-steps"
  step?: string;         // ".fs-step"
  pin?: boolean;         // default true
  vhPerStep?: number;    // default 180 (desktop)
  vhPerStepMobile?: number; // default 130
  snap?: boolean;        // default true
}) {
  if (typeof window === "undefined") return () => {};
  if (prefersReducedMotion()) return () => {};

  const {
    container = ".fs-steps",
    step = ".fs-step",
    pin = true,
    vhPerStep = 180,
    vhPerStepMobile = 130,
    snap = true,
  } = options || {};

  const root = document.querySelector(container) as HTMLElement | null;
  if (!root) return () => {};

  const steps = Array.from(document.querySelectorAll(step)) as HTMLElement[];
  if (!steps.length) return () => {};

  // Helper: compute total scroll distance
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const perStep = (isMobile ? vhPerStepMobile : vhPerStep);
  const endDistance = `+=${steps.length * perStep}vh`;

  // Initial state: hide all panels (fade-in on reveal)
  gsap.set(steps, { autoAlpha: 0, yPercent: 6 });

  // Timeline pinned sur toute la séquence
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: endDistance,
      pin,
      scrub: 1,            // scrub lent pour lisibilité
      snap: snap
        ? {
            snapTo: (value: number) => {
              // snaps to steps (0..1) en fractions égales
              const segs = steps.length - 1 || 1;
              return gsap.utils.snap(1 / segs, value);
            },
            duration: 0.4,
            ease: "power1.inOut",
          }
        : undefined,
    },
  });

  // Pour chaque step, réserver un "segment" de scroll long
  steps.forEach((panel, i) => {
    // Entrée du panneau i (fade/slide in)
    tl.to(panel, { autoAlpha: 1, yPercent: 0, duration: 0.4 });

    // Maintien à l'écran (dwell) — occupe ~perStep vh de scroll
    // On insère une "pause" via tween vide avec durée relative dans le timeline
    tl.to({}, { duration: 1 }); // segment "à vide" à scruber

    // Sortie du panneau i (sauf le dernier)
    if (i < steps.length - 1) {
      tl.to(panel, { autoAlpha: 0, yPercent: -4, duration: 0.35 });
    }
  });

  // Option: progress bar sticky (si .fs-progress existe)
  const progressEl = document.querySelector(".fs-progress") as HTMLElement | null;
  if (progressEl) {
    ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: endDistance,
      onUpdate: (self) => {
        progressEl.style.setProperty("--p", `${Math.round(self.progress * 100)}%`);
      },
    });
  }

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    ScrollTrigger.getAll().forEach(s => {
      if (s.trigger === root) s.kill();
    });
  };
}