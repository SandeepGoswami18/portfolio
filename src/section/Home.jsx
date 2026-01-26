import React, { useMemo, useEffect, useState } from "react";
import ParticlesBackground from "../components/ParticleBackground";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

// ✅ REMOVE assets import (because assets folder deleted)
// import avator from "../assets/avator.png";

const socials = [
  { Icon: FaXTwitter, label: "X", href: "https://x.com/home" },
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sandeep-kumar-bharti-72a264320/",
  },
  { Icon: FaGithub, label: "Github", href: "https://github.com/SandeepGoswami18" },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 10px rgba(0,191,143,0.9)) drop-shadow(0 0 25px rgba(28,216,210,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

export default function Home() {
  const roles = useMemo(
    () => ["Web Developer", "DSA Problem Solving", "Frontend Developer"],
    []
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // ✅ typing effect (mobile safe)
  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
      else if (!deleting && subIndex === current.length)
        setTimeout(() => setDeleting(true), 1200);
      else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
      else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 60);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      id="home"
      className="h-screen w-full relative overflow-hidden bg-black"
    >
      <ParticlesBackground />

      {/* ✅ gradient blobs (responsive sizes like reference) */}
      <div className="absolute inset-0">
        <div
          className="absolute -top-32 -left-32 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-[500px] max-h-[500px]
          rounded-full
          bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2]
          opacity-30 sm:opacity-20 md:opacity-10 
          blur-[100px] sm:blur-[130px] md:blur-[150px]
          animate-pulse"
        />
        <div
          className="absolute bottom-0 right-0 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw] 
          max-w-[500px] max-h-[500px] 
          rounded-full 
          bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] 
          opacity-40 sm:opacity-30 
          blur-[100px] sm:blur-[130px] md:blur-[150px] 
          animate-pulse delay-500"
        />
      </div>

      {/* ✅ MAIN WRAPPER = GRID like reference */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2">
        
        {/* ✅ LEFT TEXT */}
        <motion.div
          className="flex flex-col justify-center h-full text-center lg:text-left"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">
            
            {/* ✅ typing role */}
            <motion.div className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]">
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle"
                style={{ height: "1em" }}
              />
            </motion.div>

            {/* ✅ heading */}
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]">
                Hello, I&apos;m
              </span>
              <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                Sandeep Kumar
              </span>
            </motion.h1>

            {/* ✅ description */}
            <motion.p className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
              I am a Web Developer focused on building modern, responsive, and
              high-performance web applications.
            </motion.p>

            {/* ✅ buttons (wrap added) */}
            <motion.div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <a
                href="#projects"
                className="px-6 py-3 rounded-full text-lg font-medium text-white 
                bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63]
                shadow-[0_0_25px_rgba(28,216,210,0.6)] hover:shadow-[0_0_40px_rgba(28,216,210,1)] hover:scale-105 transition-all"
              >
                View My Work
              </a>

              <a
                href="https://drive.google.com/file/d/1YmrRaMuAkddfUsquq6saOwXy5npkq-9U/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white 
                hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
              >
                Resume
              </a>
            </motion.div>

            {/* ✅ socials responsive */}
            <motion.div className="mt-10 flex gap-5 text-2xl sm:text-3xl justify-center lg:justify-start">
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ✅ RIGHT AVATAR (only desktop) */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "30px",
              width: "min(22vw, 430px)",
              height: "min(40vw, 760px)",
              borderRadius: "50%",
              filter: "blur(38px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg, #1CD8D2, #00bf8f, #302b63, #1CD8D2)",
            }}
          />

          <motion.img
            src={avator}
            alt="Sandeep Kumar"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{
              right: "0px",
              width: "min(45vw, 780px)",
              maxHeight: "90vh",
            }}
<<<<<<< HEAD
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
=======
          >
            {/* border ring */}
            <div className="absolute inset-0 rounded-full border border-[#ffb000]/40 shadow-[0_0_30px_rgba(255,176,0,0.25)]" />

            {/* ✅ avatar from PUBLIC */}
            <motion.img
              src="/avator.png"
              alt="Sandeep Kumar"
              className="w-[270px] h-[270px] rounded-full object-cover select-none"
              whileHover={{
                filter:
                  "drop-shadow(0 0 18px rgba(255,176,0,0.75)) drop-shadow(0 0 40px rgba(255,159,26,0.55))",
              }}
            />
          </motion.div>
>>>>>>> 12c0f15 (fixed images + deployed ready)
        </motion.div>
      </div>
    </section>
  );
}
