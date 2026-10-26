"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import App from "@/components/band/App";
import TextType from "@/components/band/TextType";

const skills = ["React.js", "Next.js", "Node.js", "TypeScript", "Tailwind"];

type HeroProps = {
  showApp: boolean;
};

export default function Hero({ showApp }: HeroProps) {
  const [startAnim, setStartAnim] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const heroPlayed = sessionStorage.getItem("heroPlayed");
    if (heroPlayed === "true") { setStartAnim(true); return; }
    const delay = 3600;
    const textTimer = setTimeout(() => setStartAnim(true), delay);
    const appTimer = setTimeout(() => sessionStorage.setItem("heroPlayed", "true"), delay + 1500);
    return () => { clearTimeout(textTimer); clearTimeout(appTimer); };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full min-h-screen min-h-[100dvh] px-6 pt-[104px] pb-16 md:py-0 md:pl-[120px] md:pr-[60px] flex flex-col justify-center items-start overflow-hidden scroll-mt-24"
    >
      {/* 3D Card layer — stays mounted once initialized so physics does NOT re-trigger on scroll */}
      <div style={{ position: "absolute", inset: 0, zIndex: 40, pointerEvents: showApp ? "auto" : "none" }}>
        {showApp && <App inView={inView} />}
      </div>

      {/* Red glow orb behind hero text — Pure hardware-accelerated CSS compositor */}
      <div
        className="animate-hero-glow"
        style={{
          position: "absolute",
          left: "-10%",
          top: "20%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(220,38,38,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* TEXT CONTENT */}
      <div
        className="my-auto w-full md:max-w-[650px] relative z-10"
      >
        {/* Main heading with red gradient */}
        <div>
          <motion.h1
            initial={false}
            animate={startAnim ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="red-gradient-text"
            style={{
              fontSize: "clamp(34px, 7vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              marginBottom: 0,
            }}
          >
            Full-Stack
          </motion.h1>

          <motion.h1
            initial={false}
            animate={startAnim ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0, x: -80, rotate: -4 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(34px, 7vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "var(--text-primary)",
              letterSpacing: "-0.04em",
              marginBottom: 8,
            }}
          >
            Software Engineer
          </motion.h1>

          {/* Red accent line */}
          <motion.div
            initial={false}
            animate={startAnim ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 80,
              height: 3,
              background: "linear-gradient(90deg, #dc2626, transparent)",
              borderRadius: 999,
              marginBottom: 20,
              transformOrigin: "left",
            }}
          />
        </div>

        {/* Typing status */}
        <motion.div
          initial={false}
          animate={startAnim ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{ marginBottom: 16 }}
        >
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 15,
            color: "#dc2626",
            letterSpacing: "0.1em",
          }}>
            <TextType
              text={["Software Engineer", "Junior Web Dev", "Second Year", "Happy coding!"]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor
              cursorCharacter="_"
              deletingSpeed={50}
              cursorBlinkDuration={0.5}
            />
          </span>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={false}
          animate={startAnim ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.96 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ marginBottom: 28, width: "100%", maxWidth: 480 }}
        >
          <p style={{
            fontSize: 14,
            color: "var(--text-secondary)",
            lineHeight: 1.9,
            letterSpacing: "0.01em",
          }}>
            Passion meets design in creating interactive, responsive, and visually engaging web experiences. Every project is built to feel intuitive, fast, and secure — turning ideas into journeys that users enjoy exploring.
          </p>
        </motion.div>

        {/* Skill tags with red glass */}
        <motion.div
          initial="hidden"
          animate={startAnim ? "visible" : "hidden"}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.7 } } }}
          style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}
        >
          {skills.map((skill) => (
            <motion.span
              key={skill}
              variants={{ hidden: { opacity: 0, y: 25, scale: 0.85 }, visible: { opacity: 1, y: 0, scale: 1 } }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: "#dc2626",
                border: "1px solid rgba(220,38,38,0.2)",
                borderRadius: 999,
                padding: "6px 14px",
                backgroundColor: "rgba(220,38,38,0.06)",
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* Footer hints */}
        <motion.div
          initial={false}
          animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#dc2626" }}>↗</span> Aspiring Software Engineer | Learning & Building with Technology
          </span>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#dc2626" }}>↓</span> explore my work below
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator — GPU compositor bounce */}
      <motion.div
        initial={false}
        animate={startAnim ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-4 md:bottom-9 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <div
          className="animate-indicator-bounce"
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        >
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            Scroll
          </span>
          <span style={{ fontSize: 14, color: "#dc2626" }}>↓</span>
        </div>
      </motion.div>
    </section>
  );
}
