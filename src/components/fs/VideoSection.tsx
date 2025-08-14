const VideoSection = () => (
  <section className="mt-16 mb-16 relative hidden md:block z-50">
    <div className="container-xl">
      <div className="relative overflow-hidden rounded-xl border bg-card">
        <video
          className="w-full h-auto"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/assets/15261867-hd_1920_1080_24fps.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  </section>
);

export default VideoSection;
