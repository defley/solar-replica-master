// Internal reproduction authorized by Ferme Solaire
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface CableOptions {
  wrap: string; // container selector
  cable: string; // cable element selector
  tip: string; // tip element selector
  target: string; // target anchor selector
  pin?: boolean;
}

// Map scroll progress to cable translateY with a subtle ease-out near the end.
export function initCableAnimation({ wrap, cable, tip, target, pin = true }: CableOptions) {
  if (typeof window === "undefined") return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const wrapEl = document.querySelector<HTMLElement>(wrap);
  const cableEl = document.querySelector<HTMLElement>(cable);
  const tipEl = document.querySelector<HTMLElement>(tip);
  const targetEl = document.querySelector<HTMLElement>(target);

  if (!wrapEl || !cableEl || !tipEl || !targetEl) return;

  // Prepare elements for GPU compositing
  [cableEl, tipEl].forEach((el) => {
    el.style.willChange = "transform";
    el.style.transform = "translate3d(0,0,0)";
  });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: wrapEl,
      start: "top top",
      end: "+=120vh",
      scrub: true,
      pin,
    },
  });

  // Compute motion distance so the cable tip meets the target
  const getDelta = () => {
    const targetRect = targetEl.getBoundingClientRect();
    const tipRect = tipEl.getBoundingClientRect();
    // distance between tip bottom to target top within viewport + current scroll
    const delta = targetRect.top - tipRect.bottom + window.scrollY;
    return delta;
  };

  // Initial segment: follow scroll linearly
  tl.to(cableEl, { y: () => getDelta() * 0.92 }, 0);
  tl.to(tipEl, { y: () => getDelta() * 0.92 }, 0);

  // Final snap as we approach the target
  tl.to(
    [cableEl, tipEl],
    {
      y: () => getDelta(),
      ease: "power2.out",
      duration: 0.2,
    },
    ">-0.1"
  );

  // Resize handling for accuracy
  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener("resize", onResize, { passive: true });

  return () => {
    window.removeEventListener("resize", onResize);
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}
