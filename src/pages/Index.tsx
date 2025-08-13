import FSHeader from "@/components/fs/FSHeader";
import Hero from "@/components/fs/Hero";
import VideoSection from "@/components/fs/VideoSection";
import CableSection from "@/components/CableSection";
import ValueProposition from "@/components/fs/ValueProposition";
import GainSection from "@/components/fs/GainSection";
import TransparencySection from "@/components/fs/TransparencySection";
import LandscapeBanner from "@/components/fs/LandscapeBanner";
import PromiseSection from "@/components/fs/PromiseSection";
import Simulator from "@/components/fs/Simulator";
import SimulateurToiture from "@/components/fs/SimulateurToiture";
import Footer from "@/components/fs/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <FSHeader />
      <Hero />
      <VideoSection />
      <CableSection />
      <SimulateurToiture />
      <ValueProposition />
      <GainSection />
      <TransparencySection />
      <LandscapeBanner />
      <PromiseSection />
      <Simulator />
      <Footer />
    </main>
  );
};

export default Index;
