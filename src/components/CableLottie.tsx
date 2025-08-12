// Internal reproduction authorized by Ferme Solaire
import { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CableLottieProps {
  className?: string;
  pin?: boolean;
  endDistance?: string; // e.g. "+=160vh"
  ariaHidden?: boolean;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const CableLottie = ({ className = "", pin = true, endDistance = "+=160vh", ariaHidden = true }: CableLottieProps) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!containerRef.current || !wrapRef.current) return;

    // Respect reduced motion
    if (prefersReducedMotion()) {
      return;
    }

    const anim = lottie.loadAnimation({
      container: containerRef.current,
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

      // Smooth scrolling control: linear until 90%, then ease-out on final 10%
      const easeOut = gsap.parseEase("power2.out");

      const scrubObj = { p: 0 };
      const tween = gsap.to(scrubObj, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current!,
          start: "top top",
          end: endDistance,
          scrub: true,
          pin,
        },
        onUpdate: function (self) {
          const prog = (self as any).progress ?? ScrollTrigger.getById("cable-st")?.progress() ?? 0;
          let t = prog;
          if (t >= 0.9) {
            const last = (t - 0.9) / 0.1; // 0..1
            t = 0.9 + 0.1 * easeOut(last);
          }
          const frame = Math.min(total - 1, Math.max(0, Math.round(t * (total - 1))));
          anim.goToAndStop(frame, true);
        },
      });

      // GPU compositing for smoothness
      if (containerRef.current) {
        containerRef.current.style.willChange = "transform";
      }

      // Cleanup
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    };

    anim.addEventListener("DOMLoaded", onReady);
    anim.addEventListener("data_failed", () => {
      // Hide container if failed to load
      if (wrapRef.current) wrapRef.current.style.display = "none";
    });

    return () => {
      anim.removeEventListener("DOMLoaded", onReady as any);
      anim.destroy();
    };
  }, [endDistance, pin]);

  return (
    <div ref={wrapRef} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden={ariaHidden}>
      <div ref={containerRef} id="cable-lottie" className="w-full h-full" />
    </div>
  );
};

export default CableLottie;
