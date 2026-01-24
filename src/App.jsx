import React, { useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
// import ParticleBackground from "./components/ParticleBackground";
import About from "./section/About";
import Contact from "./section/Contact";
import Experience from "./section/Experience";
import Footer from "./section/Footer";
import Home from "./section/Home";
import Project from "./section/Project";
import Skills from "./section/Skills";
import IntroAnimation from "./components/IntroAnimation";

// ✅ AI Chatbot Import
import AIChatBot from "./components/AIChatBot";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

      {introDone && (
        <div className="relative gradient text-white">
          <CustomCursor />
          {/* <ParticleBackground/> */}
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Project />
          <Experience />
          <Contact />
          <Footer />

          {/* ✅ AI ChatBot Added */}
          <AIChatBot />
        </div>
      )}
    </>
  );
}
