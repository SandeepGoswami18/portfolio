import React from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";

// Importing project images (desktop & mobile versions)
import img1 from "../assets/img1.JPG";
import img2 from "../assets/img2.JPG";
import img3 from "../assets/img3.JPG";
import photo1 from "../assets/photo1.JPG";
import photo2 from "../assets/photo2.PNG";
import photo3 from "../assets/photo3.png";

const MH3 = motion.h3;

// 🔹 Custom Hook: Detects if screen size matches "mobile"
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener?.("change", handler) || mql.addListener(handler);

    setIsMobile(mql.matches);
    return () =>
      mql.removeEventListener?.("change", handler) || mql.removeListener(handler);
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();

  // 🔹 List of project objects
  const projects = React.useMemo(
    () => [
      {
        title: "Music Studio",
        bgColor: "#2A0B1E",
        image: isMobile ? photo1 : img1,
      },
      {
        title: "E-commerce",
        bgColor: "#3884d3",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Simple Portfolio",
        bgColor: "#dc9317",
        image: isMobile ? photo3 : img3,
      },
    ],
    [isMobile]
  );

  const sceneRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // 🔹 Update activeIndex as user scrolls
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = thresholds.findIndex((t) => v <= t);
      setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, thresholds]);

  const activeProject = projects[activeIndex];

  // ✅ Button click handler (does nothing)
  const handleViewProject = (e) => {
    e.preventDefault();
    // nothing happens ✅
  };

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      {/* Sticky container keeps content fixed while scrolling */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        {/* ✅ Section Title (My Work) */}
        <h2
          className="text-4xl sm:text-5xl font-extrabold text-center 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-[#ffb000] via-[#ff9f1a] to-[#ffd36a]"
        >
          My Work
        </h2>

        {/* Main Project Display Area */}
        <div
          className={`relative w-full flex-1 flex items-center justify-center ${
            isMobile ? "-mt-4" : ""
          }`}
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx
                  ? "opacity-100 z-20"
                  : "opacity-0 z-0 sm:z-10"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              {/* ✅ Animate project title when switching */}
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <MH3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center 
                      text-[clamp(1.6rem,4.6vw,3.5rem)] 
                      sm:absolute sm:-top-20 sm:left-[35%] lg:left-[-5%]
                      sm:mb-0 font-bangers italic font-semibold
                      bg-clip-text text-transparent 
                      bg-gradient-to-r from-white via-white to-[#ffb000]
                      drop-shadow-[0_0_14px_rgba(0,0,0,0.55)]
                      ${isMobile ? "-mt-20" : ""}`}
                    style={{
                      zIndex: 5,
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >
                    {project.title}
                  </MH3>
                )}
              </AnimatePresence>

              {/* ✅ Project Image Wrapper */}
              <div
                className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
                  isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
                } h-[62vh] sm:h-[66vh]`}
                style={{ zIndex: 10, transition: "box-shadow 250ms ease" }}
              >
                {/* ✅ Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />

                {/* ✅ Subtle gradient overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    zIndex: 11,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ✅ View Project Button (Soon) */}
        <div className={`absolute ${isMobile ? "bottom-20" : "bottom-10"}`}>
          <button
            onClick={handleViewProject}
            className="
              inline-block px-6 py-3 font-semibold rounded-lg 
              bg-white/80 text-black cursor-not-allowed opacity-80 
              hover:bg-white/80 transition-all
            "
            aria-label={`View ${activeProject?.title}`}
          >
            View Project (Soon)
          </button>
        </div>
      </div>
    </section>
  );
}
