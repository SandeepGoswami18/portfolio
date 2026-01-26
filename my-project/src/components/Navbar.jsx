import { useEffect, useState, useRef } from "react";
import OverlayMenu from "./OverlayMenu";
import Logo from "../assets/Logo.png";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forcevisible, setforcevisible] = useState(false);

  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  // ✅ Portfolio Sections
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const homeSection = document.querySelector("#home");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setforcevisible(true);
          setVisible(true);
        } else {
          setforcevisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (homeSection) observer.observe(homeSection);

    return () => {
      if (homeSection) observer.unobserve(homeSection);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (forcevisible) {
        setVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);

        if (timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
          setVisible(false);
        }, 3000);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [forcevisible]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* ✅ LeetCode style strip */}
        <div className="w-full bg-[#1f1f1f]/95 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-5 lg:px-10 h-[64px] flex items-center justify-between">
            {/* ✅ LEFT LOGO */}
            <div className="flex items-center gap-2">
              <img src={Logo} alt="logo" className="w-8 h-8" />
              <h1 className="hidden sm:block font-medium text-[18px] tracking-wide
text-transparent bg-clip-text bg-gradient-to-r from-[#ffb000] via-[#ffd36a] to-[#fff1c1]">
  Sandeep
</h1>

            </div>

            {/* ✅ CENTER MENU (Desktop) */}
            <div className="hidden lg:flex items-center gap-8 text-gray-300 font-medium">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="hover:text-white transition duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* ✅ RIGHT SIDE */}
            <div className="flex items-center gap-4">
              {/* ✅ Reach Out button (gold LeetCode style) */}
              <a
                href="#contact"
                className="hidden lg:block px-4 py-2 rounded-full text-black font-semibold
                bg-gradient-to-r from-[#ffb000] via-[#ff9f1a] to-[#ffd36a]
                hover:opacity-90 transition"
              >
                Reach Out
              </a>

              {/* ✅ Mobile Menu Icon */}
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden text-white text-3xl"
                aria-label="Open Menu"
              >
                <FiMenu />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ Overlay Menu (Mobile) */}
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
