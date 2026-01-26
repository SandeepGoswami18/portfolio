// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaYoutube,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";

const socials = [
  { Icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/feed/you" },
  { Icon: FaXTwitter, label: "X", href: "https://x.com/KumarSande66389" },
  {
    Icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sandeep-kumar-bharti-72a264320/",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/sandeep.goswami_18/?hl=en",
  },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/SandeepGoswami18" },
];

const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 10px rgba(255,176,0,0.9)) drop-shadow(0 0 25px rgba(255,159,26,0.75))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black">
      {/* ✅ GOLD BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(255,176,0,0.22),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(255,211,106,0.18),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-10 py-14 sm:py-16 md:py-20 flex flex-col items-center text-center space-y-6"
      >
        {/* ✅ Name / Branding (Mobile Fixed ✅) */}
        <div className="w-full">
          <h1
            className="
              font-bangers font-semibold leading-none text-white text-center select-none
              break-words whitespace-normal
            "
            style={{
              fontSize: "clamp(1.8rem, 6vw, 5.5rem)", // ✅ better mobile scaling
              letterSpacing: "0.02em",
              lineHeight: 1,
              paddingLeft: "3vw",
              paddingRight: "3vw",
              textShadow: "0 2px 18px rgba(0,0,0,0.45)",
            }}
          >
            Sandeep Kumar Bharti
          </h1>
        </div>

        {/* ✅ GOLD underline */}
        <div className="h-[3px] w-20 sm:w-24 md:w-32 rounded-full bg-gradient-to-r from-[#ffb000] via-[#ff9f1a] to-[#ffd36a]" />

        {/* ✅ Social Icons (Responsive ✅) */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 text-2xl sm:text-3xl">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              variants={glowVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-gray-300 hover:text-[#ffb000] transition-colors duration-200"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        {/* ✅ Quote */}
        <p className="text-gray-300 italic max-w-xl text-sm sm:text-base px-2">
          “Success is when preparation meets opportunity.”
        </p>

        {/* ✅ Copyright */}
        <p className="text-xs text-gray-400 px-2">
          © {new Date().getFullYear()} Sandeep Kumar. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
