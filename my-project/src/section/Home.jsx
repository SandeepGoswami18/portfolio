import React, { useMemo, useEffect, useState } from "react";
import ParticlesBackground from "../components/ParticleBackground";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import avator from "../assets/avator.png";

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
      "drop-shadow(0 0 10px rgba(255,176,0,0.9)) drop-shadow(0 0 25px rgba(255,159,26,0.8))",
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

  // ✅ typing effect
  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
      else if (!deleting && subIndex === current.length)
        setTimeout(() => setDeleting(true), 1000);
      else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
      else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 35 : 55);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      id="home"
      className="h-screen w-full relative overflow-hidden bg-black pt-24 lg:pt-28"
    >
      <ParticlesBackground />

      {/* ✅ GOLD gradient blobs */}
      <div className="absolute inset-0">
        <div
          className="absolute -top-32 -left-32 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-[480px] max-h-[480px]
          rounded-full
          bg-gradient-to-r from-[#ffb000] via-[#ffd36a] to-[#fff1c1]
          opacity-25 sm:opacity-20 md:opacity-10
          blur-[90px] sm:blur-[115px] md:blur-[135px]
          animate-pulse"
        />

        <div
          className="absolute bottom-0 right-0 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw] 
          max-w-[480px] max-h-[480px] 
          rounded-full 
          bg-gradient-to-r from-[#fff1c1] via-[#ffd36a] to-[#ffb000]
          opacity-35 sm:opacity-28
          blur-[90px] sm:blur-[115px] md:blur-[135px]
          animate-pulse delay-500"
        />
      </div>

      {/* ✅ MAIN WRAPPER */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2">
        {/* ✅ LEFT TEXT */}
        <motion.div
          className="flex flex-col justify-center h-full text-center lg:text-left"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-full lg:pr-20 mx-auto max-w-[46rem]">
            {/* ✅ typing role (compact) */}
            <motion.div className="mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white tracking-wide min-h-[1.6em]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb000] via-[#ffd36a] to-[#fff1c1] drop-shadow-[0_0_10px_rgba(255,176,0,0.45)]">
                {roles[index].substring(0, subIndex)}
              </span>

              <span
                className="inline-block w-[2px] ml-2 bg-[#ffb000] animate-pulse align-middle rounded-full"
                style={{ height: "1em" }}
              />
            </motion.div>

            {/* ✅ heading */}
            <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffb000] via-[#ffd36a] to-[#fff1c1]">
                Hello, I&apos;m
              </span>
              <br />
              <span className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl lg:whitespace-nowrap">
                Sandeep Kumar
              </span>
            </motion.h1>

            {/* ✅ description */}
            <motion.p className="mt-4 text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              I am a Web Developer focused on building modern, responsive, and
              high-performance web applications.
            </motion.p>

            {/* ✅ buttons */}
            <motion.div className="mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-full text-base font-semibold text-black
                bg-gradient-to-r from-[#ffb000] via-[#ff9f1a] to-[#ffd36a]
                shadow-[0_0_20px_rgba(255,176,0,0.5)] 
                hover:shadow-[0_0_35px_rgba(255,176,0,0.9)] 
                hover:scale-105 transition-all"
              >
                View My Work
              </a>

              <a
                href="https://drive.google.com/file/d/1YmrRaMuAkddfUsquq6saOwXy5npkq-9U/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full text-base font-semibold text-black bg-white 
                hover:bg-gray-200 shadow-md hover:scale-105 transition-all"
              >
                Resume
              </a>
            </motion.div>

            {/* ✅ socials */}
            <motion.div className="mt-7 flex gap-4 text-xl sm:text-2xl justify-center lg:justify-start">
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
                  className="text-gray-300 hover:text-[#ffb000] transition-colors"
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ✅ RIGHT AVATAR + HOVER EFFECT ✅ */}
        <motion.div
          className="relative hidden lg:flex items-center justify-center"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          {/* glow behind image */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: "340px",
              height: "340px",
              filter: "blur(40px)",
              opacity: 0.35,
              background:
                "radial-gradient(circle, rgba(255,176,0,0.35), rgba(0,0,0,0) 70%)",
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ✅ Image Hover Wrapper */}
          <motion.div
            className="relative cursor-pointer rounded-full p-[6px]"
            whileHover={{
              scale: 1.05,
              rotate: 1,
              y: -6,
              transition: { type: "spring", stiffness: 250, damping: 14 },
            }}
          >
            {/* border ring */}
            <div className="absolute inset-0 rounded-full border border-[#ffb000]/40 shadow-[0_0_30px_rgba(255,176,0,0.25)]" />

            {/* avatar */}
            <motion.img
              src={avator}
              alt="Sandeep Kumar"
              className="w-[270px] h-[270px] rounded-full object-cover select-none"
              whileHover={{
                filter:
                  "drop-shadow(0 0 18px rgba(255,176,0,0.75)) drop-shadow(0 0 40px rgba(255,159,26,0.55))",
              }}
              //motiondiv
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
