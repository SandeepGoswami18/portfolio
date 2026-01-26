import { motion } from "framer-motion";
import p from "../assets/p.jpg";

export default function About() {
  const stats = [
    { label: "Experience", value: "6+ month" },
    { label: "Speciality", value: "DSA Problem Solving" },
    { label: "Focus", value: "Algorithm/Patterns" },
  ];

  // ✅ Gold glows (LeetCode vibe)
  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-25 blur-[120px]",
    "bottom-0 -right-10 w-[420px] h-[420px] opacity-20 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-15 blur-[100px]",
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden pt-24"
    >
      {/* ✅ GOLD BLOBS */}
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r from-[#ffb000] via-[#ffd36a] to-[#fff1c1] animate-pulse ${c}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-16 flex flex-col gap-12">
        {/* ✅ MAIN CARD */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* ✅ Profile Pic Card */}
          <motion.div
            className="
              relative w-[160px] h-[160px] md:w-[200px] md:h-[200px]
              rounded-2xl overflow-hidden shadow-2xl
              bg-gradient-to-r from-[#ffb000]/10 via-[#ffd36a]/10 to-[#fff1c1]/10
              border border-[#ffb000]/30 cursor-pointer
              hover:shadow-[0_0_35px_rgba(255,176,0,0.25)]
              transition
            "
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
              damping: 18,
            }}
            viewport={{ once: true }}
          >
            <img
              src={p}
              alt="profile"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* ✅ Soft gold overlay for premium look */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
          </motion.div>

          {/* ✅ Text */}
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffb000] via-[#ffd36a] to-[#fff1c1] drop-shadow-[0_0_14px_rgba(255,176,0,0.25)]">
              Sandeep Kumar Bharti
            </h2>

            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">
              DSA Problem Solver
            </p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              I'm Sandeep Kumar, a passionate web developer and DSA enthusiast. I
              love crafting beautiful and functional web applications while solving
              complex problems through data structures and algorithms.
            </p>

            {/* ✅ Stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto md:mx-0">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  className="
                    rounded-xl border border-yellow-400/15 bg-white/5
                    px-4 py-3 text-center
                    hover:border-yellow-400/35
                    hover:shadow-[0_0_22px_rgba(255,176,0,0.12)]
                    transition
                  "
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold text-white">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ✅ Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="
                  inline-flex items-center justify-center rounded-lg
                  px-5 py-3 font-semibold text-black
                  bg-gradient-to-r from-[#ffb000] via-[#ff9f1a] to-[#ffd36a]
                  shadow-[0_0_18px_rgba(255,176,0,0.35)]
                  hover:shadow-[0_0_30px_rgba(255,176,0,0.65)]
                  hover:scale-[1.02]
                  transition
                "
              >
                View Projects
              </a>

              <a
                href="#contact"
                className="
                  inline-flex items-center justify-center rounded-lg
                  border border-yellow-400/25 text-white px-5 py-3
                  hover:bg-yellow-400/10
                  transition
                "
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>

        {/* ✅ About Info */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            About Me
          </h3>

          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
            I'm Sandeep Kumar, a passionate web developer and DSA enthusiast. I love
            crafting beautiful and functional web applications while solving complex
            problems through data structures and algorithms.
          </p>

          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            I love turning ideas into scalable, efficient solutions.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
