const VideoSection = () => {
  return (
    <section className="mt-14">
      <div className="container-xl">
        <div className="relative overflow-hidden rounded-xl border bg-card">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/4VJQzXbu7rY?autoplay=1&loop=1&mute=1&playlist=4VJQzXbu7rY&controls=0&showinfo=0&rel=0&modestbranding=1"
              title="Ferme Solaire Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
