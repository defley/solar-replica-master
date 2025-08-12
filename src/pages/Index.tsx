import FSHeader from "@/components/fs/FSHeader";
import Hero from "@/components/fs/Hero";
import VideoSection from "@/components/fs/VideoSection";
import Simulator from "@/components/fs/Simulator";
import Footer from "@/components/fs/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <FSHeader />
      <Hero />
      <VideoSection />
      <Simulator />
      <Footer />
    </main>
  );
};

export default Index;
