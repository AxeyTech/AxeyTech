"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { FileText, ArrowUpRight } from "lucide-react";

/* ================== ANIMATION ================== */

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 90, rotate: 3, scale: 0.94 },
  show: {
    opacity: 1,
    x: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/* ================== COMPONENT ================== */

export default function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollToPortfolio = () => {
    const el = document.getElementById("portfolio");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="px-5 sm:px-8 md:pl-[120px] md:pr-[60px] py-16 md:py-24 flex items-center overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-14">
          {/* LEFT CONTENT */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className="w-full md:max-w-[620px]"
          >
            {/* TAG */}
            <motion.div variants={fadeUp} className="mb-4">
              <span className="font-mono text-xs text-[#a08080] tracking-[0.2em] inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
                ABOUT ME
              </span>
            </motion.div>

            {/* NAME */}
            <motion.div variants={fadeUp} className="mb-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] red-gradient-text">
                <div>Akshay</div>
                <div>Sharma</div>
              </h2>
            </motion.div>

            {/* BIO TEXT */}
            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base text-white/75 leading-relaxed border-l-2 border-[#dc2626] pl-4 mb-6 text-justify"
            >
              Driven by curiosity and fueled by code. I view software engineering not just as writing syntax, but as the craft of turning raw ideas into fast, intuitive, and visually engaging digital realities. I spend my time breaking down complex concepts, architecting systems from the ground up, and diving deep into both interactive frontends and robust backend logic. Obsessed with detail, consistency, and clean execution — always bringing a relentless hunger to build software that truly stands out.
            </motion.p>

            {/* QUOTE PILL */}
            <motion.div
              variants={fadeUp}
              className="rounded-xl border border-[rgba(220,38,38,0.2)] bg-[rgba(220,38,38,0.04)] px-4 py-3 text-xs sm:text-sm italic text-white/70 border-l-4 border-l-[#dc2626] mb-8 inline-block max-w-lg shadow-[0_0_20px_rgba(220,38,38,0.05)]"
            >
              “Creativity, detail, and curiosity — crafting digital experiences that truly stand out.”
            </motion.div>

            {/* ACTIONS */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3.5">
              {/* DOWNLOAD CV */}
              <a
                href="/AKSHAY_SHARMA_CV.pdf"
                download="AKSHAY_SHARMA_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-semibold shadow-[0_0_25px_rgba(220,38,38,0.35)] hover:shadow-[0_0_35px_rgba(220,38,38,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <FileText size={15} />
                <span>Download CV</span>
              </a>

              {/* VIEW PROJECTS */}
              <button
                onClick={scrollToPortfolio}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[rgba(220,38,38,0.08)] hover:bg-[rgba(220,38,38,0.18)] border border-[rgba(220,38,38,0.3)] hover:border-[#dc2626] text-[#ef4444] hover:text-white text-sm font-semibold transition-all duration-300 cursor-pointer active:scale-[0.98]"
              >
                <ArrowUpRight size={15} />
                <span>View Projects</span>
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT PROFILE PHOTO — SLIDES IN FROM RIGHT ON SCROLL WITH BALANCED LEFT MARGIN */}
          <div className="w-full md:w-auto flex justify-center shrink-0 md:mr-12 lg:mr-20">
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              style={{ willChange: "transform, opacity" }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="p-1 rounded-full bg-gradient-to-tr from-[#dc2626] via-transparent to-[#dc2626] shadow-[0_0_40px_rgba(220,38,38,0.25),0_0_80px_rgba(220,38,38,0.08)] hover:shadow-[0_0_55px_rgba(220,38,38,0.45)] transition-shadow duration-500"
              >
                <div className="p-2 rounded-full bg-[#050000]">
                  <img
                    src="/assets/profile.jpg"
                    alt="Akshay Sharma"
                    className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover block shadow-inner"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
