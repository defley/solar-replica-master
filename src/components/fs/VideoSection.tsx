const VideoSection = () => {
  return (
    <section className="mt-14">
      <div className="container-xl">
        <div className="relative overflow-hidden rounded-xl border bg-card">
          <video
            className="w-full h-auto"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/assets/hero-video-poster.jpeg"
          >
            <source src="/assets/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
