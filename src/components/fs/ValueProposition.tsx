const CheckIcon = () => <svg width="14" height="11" viewBox="0 0 14 11" aria-hidden>
    <g fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeLinecap="square">
      <polyline points="9.679 0 3.025 6.862 0 3.743" />
    </g>
  </svg>;
const StarIcon = () => <svg width="17" height="16" viewBox="0 0 17 16" aria-hidden>
    <path fill="hsl(var(--accent))" d="M7.567.352c.146-.468.813-.468.959 0l1.543 4.965a.55.55 0 0 0 .517.351h5.043c.479 0 .686.606.305.896l-4.122 3.133a.55.55 0 0 0-.177.559l1.564 5.036c.144.464-.433.83-.821.536L8.35 12.759a.62.62 0 0 0-.61 0L3.713 15.82c-.388.294-.965-.072-.821-.536l1.563-5.036a.55.55 0 0 0-.177-.543L.198 6.563c-.381-.29-.174-.896.305-.896h5.043a.55.55 0 0 0 .517-.351L7.567.352Z" />
  </svg>;
const ValueProposition = () => {
  return <section className="py-16 md:py-24">
      <div className="container-xs text-center">
        <h2 className="text-3xl md:text-4xl font-display leading-tight">Valorisez votre toit au profit de la transition écologique.</h2>
        <p className="paragraph-xl text-grey mt-3">Investissez dans un avenir durable<br /> en hébergeant une centrale solaire.</p>

        <div className="mt-4 flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2"><CheckIcon /> <span>Gratuit de A à Z</span></div>
          <div className="flex items-center gap-2"><CheckIcon /> <span>Sans engagement</span></div>
          <div className="flex items-center gap-2"><StarIcon /> <span>Trustpilot</span></div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <a href="/mondossier" className="rounded-full h-11 px-5 inline-flex items-center justify-center bg-primary text-primary-foreground font-medium focus-ring">
            Héberger une centrale solaire
          </a>
          <a href="tel:+33782905669" className="text-sm text-foreground/80 hover:underline focus-ring rounded-md">
            ou appelez-nous au 07.82.90.56.69
          </a>
        </div>
      </div>
    </section>;
};
export default ValueProposition;