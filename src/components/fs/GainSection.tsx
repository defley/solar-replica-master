const GainSection = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container-xl">
        <div className="rounded-xl bg-gradient-to-b from-background to-muted/30 p-8 md:p-10 border">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h3 className="text-2xl md:text-3xl font-display">Gagnez jusqu'à 5500€ de loyer annuel par hectare</h3>
              <p className="mt-3 text-foreground/80">dédié aux panneaux photovoltaïques. Grâce à notre connaissance du marché, nous vous guidons pour recevoir le meilleur loyer et la proposition la plus fiable.</p>
            </div>
            <div className="md:text-right">
              <a href="#simulateur" className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-primary text-primary-foreground font-medium focus-ring">
                Simuler son loyer annuel
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GainSection;
