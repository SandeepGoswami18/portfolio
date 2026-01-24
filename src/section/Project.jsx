import { useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

import img1 from "../assets/img1.JPG";
import img2 from "../assets/img2.JPG";
import img3 from "../assets/img3.JPG";

import photo1 from "../assets/img1.JPG";
import photo2 from "../assets/photo2.PNG";
import photo3 from "../assets/photo3.png";

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        link: "https://www.music.studio/",
        bgColor: "#1a3c34",
        image: isMobile ? photo1 : img1,
      },
      {
        link: "https://simple-ecommerce.com/",
        bgColor: "#1e3a5f",
        image: isMobile ? photo2 : img2,
      },
      {
        link: "https://sandeepgoswami18.github.io/Portfolio/",
        bgColor: "#b45309",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile]
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = useMemo(
    () => projects.map((_, i) => (i + 1) / projects.length),
    [projects]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    const safeIdx = idx === -1 ? thresholds.length - 1 : idx;
    setActiveIndex(safeIdx);
  });

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center relative">
        {/* Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: projects[activeIndex].bgColor,
            transition: "background-color 600ms ease",
          }}
        />

        {/* My Work */}
        <div className="absolute top-8 z-30 text-center">
          <h2 className="text-xl md:text-2xl font-semibold tracking-wide">
            My Work
          </h2>
        </div>

        {/* Projects */}
        <div className="relative w-full h-full flex items-center justify-center">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className={`absolute flex flex-col items-center transition-all duration-700 ease-in-out ${
                activeIndex === idx
                  ? "opacity-100 scale-100 z-30"
                  : "opacity-0 scale-95 z-10"
              }`}
            >
              {/* IMAGE CARD */}
              <div
                className="
                  relative
                  w-[88vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw]
                  max-w-6xl
                  rounded-3xl
                  overflow-hidden
                  bg-black/20
                  shadow-2xl
                  p-6 md:p-8
                "
              >
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mt-2 md:mt-4">
                  <img
                    src={project.image}
                    alt="Project"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent/30 to-transparent rounded-2xl" />
                </div>
              </div>

              {/* View Project Button */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-8 md:mt-10
                  inline-flex items-center justify-center
                  px-10 py-4 md:px-12 md:py-5
                  text-lg md:text-xl font-bold
                  bg-white text-black
                  rounded-xl shadow-xl
                  transition-all duration-300
                  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl
                "
              >
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
