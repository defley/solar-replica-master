import FSHeader from "@/components/fs/FSHeader";
import Hero from "@/components/fs/Hero";
import VideoSection from "@/components/fs/VideoSection";
import Footer from "@/components/fs/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <FSHeader />
      <Hero />
      <VideoSection />
      <Footer />
    </main>
  );
};

export default Index;
