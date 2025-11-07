import Spline from '@splinetool/react-spline';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Rocket, Github } from 'lucide-react';

function MagneticButton({ children, className = '', href = '#' }) {
  const [isHover, setIsHover] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(mx, { stiffness: 240, damping: 18, mass: 0.35 });
  const ty = useSpring(my, { stiffness: 240, damping: 18, mass: 0.35 });
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mx.set(x * 0.35);
    my.set(y * 0.35);
  };

  const handleLeave = () => {
    setIsHover(false);
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseEnter={() => setIsHover(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: tx, y: ty }}
      className={className}
    >
      <motion.span
        animate={{ scale: isHover ? 1.06 : 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 16 }}
        className="inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}

export default function Hero() {
  // Cursor-driven parallax for background glows and content tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [-14, 14]), { stiffness: 90, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), { stiffness: 90, damping: 16 });

  // Cursor spotlight
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const sx = useSpring(cx, { stiffness: 140, damping: 22, mass: 0.45 });
  const sy = useSpring(cy, { stiffness: 140, damping: 22, mass: 0.45 });

  useEffect(() => {
    const handleMove = (e) => {
      const xNorm = e.clientX / window.innerWidth - 0.5;
      const yNorm = e.clientY / window.innerHeight - 0.5;
      mx.set(xNorm);
      my.set(yNorm);
      cx.set(e.clientX);
      cy.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mx, my, cx, cy]);

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-24 overflow-hidden bg-slate-950"
    >
      {/* 3D interactive background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        {/* Grain + color wash overlays (non-blocking) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {/* Deep vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
          {/* Purple/blue energy wash */}
          <div className="absolute inset-0 mix-blend-overlay opacity-20 bg-[radial-gradient(900px_600px_at_20%_10%,#8b5cf6_10%,transparent_60%),radial-gradient(900px_600px_at_80%_90%,#38bdf8_10%,transparent_60%)]" />
          {/* Subtle grain */}
          <div className="absolute inset-0 opacity-[0.07] mix-blend-soft-light bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05)_0,rgba(255,255,255,0.05)_2px,transparent_2px,transparent_4px)]" />
        </div>
      </div>

      {/* Dynamic glows with parallax */}
      <motion.div
        className="absolute -right-10 top-20 h-[26rem] w-[26rem] rounded-full bg-violet-500/30 blur-3xl pointer-events-none"
        style={{ rotateX: rx, rotateY: ry }}
        animate={{ y: [0, -18, 0], scale: [1, 1.07, 1] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[-3rem] bottom-8 h-96 w-96 rounded-full bg-sky-500/30 blur-3xl pointer-events-none"
        style={{ rotateX: ry, rotateY: rx }}
        animate={{ y: [0, 18, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 10.5, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
      />

      {/* Cursor spotlight following the mouse (non-blocking) */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: sx, top: sy }}
        aria-hidden
      >
        <div className="h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),rgba(56,189,248,0.08),transparent_70%)] blur-2xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Bolder content block with slight tilt */}
          <motion.div
            style={{ rotateX: useTransform(my, [-0.5, 0.5], [6, -6]), rotateY: useTransform(mx, [-0.5, 0.5], [-6, 6]) }}
            className="relative"
          >
            {/* Glow frame */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-violet-600/50 via-fuchsia-500/40 to-sky-500/50 blur-2xl opacity-60" aria-hidden />
            <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-[2.5rem] sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-violet-200 via-fuchsia-200 to-sky-200 drop-shadow-[0_6px_24px_rgba(139,92,246,0.35)]">
                  Bold. Futuristic. Interactive.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.05 }}
                className="mt-4 text-lg sm:text-xl text-slate-200/90"
              >
                I craft high‑impact digital experiences blending 3D, motion, and a vibrant purple/blue aesthetic.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.12 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <MagneticButton
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-sky-500 text-white px-6 py-3 font-semibold shadow-[0_10px_30px_rgba(139,92,246,0.35)] hover:shadow-[0_14px_40px_rgba(56,189,248,0.35)]"
                >
                  <Rocket className="h-4 w-4" />
                  <span>Explore Projects</span>
                </MagneticButton>

                <MagneticButton
                  href="https://github.com" // replace with your profile
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white px-6 py-3 font-medium backdrop-blur hover:bg-white/15"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </MagneticButton>

                <MagneticButton
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl border border-violet-400/30 text-violet-100 px-6 py-3 font-medium bg-gradient-to-b from-transparent to-violet-500/10 hover:to-violet-500/20"
                >
                  <span>Contact Me</span>
                </MagneticButton>
              </motion.div>

              {/* Tech chips */}
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
                className="mt-8 flex flex-wrap gap-2"
              >
                {['React', 'Framer Motion', 'Spline 3D', 'Tailwind', 'Open Source'].map((t) => (
                  <motion.li
                    key={t}
                    variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                    className="text-xs text-violet-100/90 bg-violet-400/10 border border-violet-300/20 px-2 py-1 rounded-md backdrop-blur"
                  >
                    {t}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* Spacer column to balance layout on large screens */}
          <div className="hidden lg:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
