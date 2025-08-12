const LandscapeBanner = () => {
  return (
    <section className="py-6">
      <div className="container-xl">
        <figure className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img src="/assets/paysage-campagne-1.png" alt="Panneaux solaires dans la campagne" className="w-full h-auto rounded-lg border" loading="lazy" />
          <img src="/assets/paysage-campagne-2.png" alt="Paysage campagne avec panneaux solaires" className="w-full h-auto rounded-lg border" loading="lazy" />
        </figure>
      </div>
    </section>
  );
};

export default LandscapeBanner;
