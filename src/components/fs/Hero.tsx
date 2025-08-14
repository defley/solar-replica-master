// Internal reproduction authorized by Copro Solaire
import CableLottie from "@/components/CableLottie";

const Hero = () => (
  <section id="top" className="relative pt-10 lg:pt-20">
    <CableLottie />
    <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-5xl sm:text-6xl xl:text-7xl leading-[0.95] font-bold font-display">
          Hébergez
          <br />
          une
          <br />
          centrale
          <br />
          solaire
        </h1>
        <p className="mt-6 text-foreground/80 max-w-[36ch]">
          Accueillez une centrale solaire sur le toit de votre copropriété et financez vos travaux grâce à un loyer annuel de 2 500 € à 12 000 €, en fonction de la surface, garanti pendant 30 ans, sans aucun investissement.
        </p>
      </div>
      <div className="relative lg:scale-110 xl:scale-125 z-10">
        <video 
          className="w-full h-auto select-none rounded-lg"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/assets/hero-video-poster.jpeg"
          controls={false}
          width="1200"
          height="900"
        >
          <source src="/assets/social_u3382912938_Make_a_picture_with_the_same_style_of_a_residenti_f4f30469-fe54-4a42-b91a-809b5d4c75c9_2.mp4" type="video/mp4" />
          <p>Votre navigateur ne supporte pas les vidéos HTML5. <a href="/assets/social_u3382912938_Make_a_picture_with_the_same_style_of_a_residenti_f4f30469-fe54-4a42-b91a-809b5d4c75c9_2.mp4">Télécharger la vidéo</a>.</p>
        </video>
      </div>
    </div>

    {/* Value props row */}
    <div className="container-xl mt-8" aria-hidden>
      <div className="flex flex-wrap gap-6 text-sm text-foreground/80">
        <div className="flex items-center gap-2">
          <svg width="16" height="12" viewBox="0 0 14 11" aria-hidden>
            <g fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="square">
              <polyline points="9.68 0 3.02 6.86 0 3.74" />
            </g>
          </svg>
          <span>Gratuit de A à Z</span>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;