import { useEffect, useRef } from "react";
import Background from "./components/Background";
import Hero from "./components/Hero";
import ProjectSection from "./components/ProjectSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MobileSkills from "./components/MobileSkills";

export default function App() {
  useEffect(() => {
    document.title = "SKY/dev.";
  }, []);

  // Create section references
  const projectRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div className="w-full min-h-screen bg-black relative overflow-hidden">
      <Navbar
        refs={{
          projects: projectRef,
          about: aboutRef,
          contact: contactRef,
        }}
      />
      <MobileSkills />
      <Background />
      <main className="relative z-10">
        <Hero />
        <div ref={projectRef}>
          <ProjectSection />
        </div>
        <div ref={aboutRef}>
          <AboutSection />
        </div>
        <div ref={contactRef}>
          <ContactSection />
        </div>
        <Footer />
      </main>
    </div>
  );
}
