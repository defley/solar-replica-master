const TransparencySection = () => {
  return (
    <section className="py-10 md:py-20">
      <div className="container-xl">
        <div className="grid md:grid-cols-2 gap-10">
          <article>
            <h3 className="text-2xl font-display">Une démarche simple et sans aucune avance de frais</h3>
            <p className="mt-3 text-foreground/80">Nous nous occupons de toutes les démarches administratives et financières et vous proposons l’offre la plus adaptée à vos besoins.</p>
          </article>
          <article>
            <h3 className="text-2xl font-display">Un service clé en mains et 100% transparent</h3>
            <p className="mt-3 text-foreground/80">Un conseiller dédié vous rappelle sous 48h (jours ouvrés) pour élaborer votre dossier et évaluer la faisabilité du projet. Vous pouvez aussi nous missionner pour négocier avec nos partenaires développeurs d'énergie renouvelable.</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;
