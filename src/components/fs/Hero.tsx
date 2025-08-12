import { useEffect } from "react";
import { initCableAnimation } from "@/lib/scroll/cable";

const Hero = () => {
  useEffect(() => {
    const cleanup = initCableAnimation({
      wrap: "#cable-wrap",
      cable: "#cable-image",
      tip: "#cable-tip",
      target: "#solar-target",
      pin: true,
    });
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, []);

  return (
    <section id="top" className="relative pt-10 lg:pt-20">
      <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl sm:text-6xl xl:text-7xl leading-[0.95] font-bold font-display">
            Hébergez
            <br />
            une
            <br />
            ferme
            <br />
            solaire
          </h1>
          <p className="mt-6 text-foreground/80 max-w-[36ch]">
            et touchez une rente de 1 000€ à 5500€/an par hectare sur 40 ans, sans aucun investissement
          </p>
        </div>
        <div className="relative">
          <img
            src="/assets/home-hero.png"
            alt="Illustration panneaux photovoltaïques et troupeau"
            className="w-full h-auto select-none"
            loading="eager"
            width={1200}
            height={900}
          />
          {/* Cable animation overlay */}
          <div id="cable-wrap" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              id="cable-image"
              className="absolute left-[10%] top-[-120%] w-1 bg-foreground rounded-full"
              style={{ height: "300vh" }}
              aria-hidden
            />
            <div
              id="cable-tip"
              className="absolute left-[9.5%] top-0 w-3 h-3 rounded-full bg-foreground"
              aria-hidden
            />
          </div>
        </div>
      </div>

      {/* Value props row */}
      <div className="container-lg mt-8" aria-hidden>
        <div className="flex flex-wrap gap-6 text-sm text-foreground/80">
          <div className="flex items-center gap-2">
            <svg width="16" height="12" viewBox="0 0 14 11" aria-hidden>
              <g fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="square">
                <polyline points="9.68 0 3.02 6.86 0 3.74" />
              </g>
            </svg>
            <span>Gratuit de A à Z</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="16" height="12" viewBox="0 0 14 11" aria-hidden>
              <g fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="square">
                <polyline points="9.68 0 3.02 6.86 0 3.74" />
              </g>
            </svg>
            <span>Sans engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="17" height="16" viewBox="0 0 17 16" aria-hidden>
              <path fill="hsl(var(--accent))" d="M7.57.35c.15-.47.82-.47.97 0l1.54 4.97c.07.21.26.35.48.35h5.04c.48 0 .68.6.3.9l-4.12 3.13c-.17.13-.24.35-.18.56l1.56 5.04c.14.46-.43.83-.82.53L8.35 12.76a.62.62 0 0 0-.61 0L3.71 15.82c-.39.3-.96-.07-.82-.53l1.56-5.04a.62.62 0 0 0-.18-.54L.2 6.56c-.38-.3-.17-.9.32-.9h5.04c.22 0 .41-.14.48-.35L7.57.35z" />
            </svg>
            <span>Trustpilot</span>
          </div>
        </div>
      </div>

      {/* Invisible target for cable snapping */}
      <div id="solar-target" className="absolute left-[10%] bottom-[-120px] w-6 h-2 bg-transparent" aria-hidden />
    </section>
  );
};

export default Hero;
