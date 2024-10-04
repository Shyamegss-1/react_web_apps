import Blog from "./sections/Blog";
import CallToAction from "./sections/CallToAction";
import Features from "./sections/Features";
import HeroSection from "./sections/HeroSection";
import Stats from "./sections/Stats";
import Testimonials from "./sections/Testimonials";

const Index = () => {
  return (
    <div>
      <main className="space-y-40 mb-40">
        <HeroSection />
        <Features />
        <Stats />
        <Testimonials />
        <CallToAction />
        <Blog />
      </main>
    </div>
  );
};

export default Index;
