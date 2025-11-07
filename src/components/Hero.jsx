import Spline from '@splinetool/react-spline';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Rocket } from 'lucide-react';

function MagneticButton({ children, className = '', href = '#' }) {
  const [isHover, setIsHover] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(mx, { stiffness: 200, damping: 15, mass: 0.3 });
  const ty = useSpring(my, { stiffness: 200, damping: 15, mass: 0.3 });
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mx.set(x * 0.2);
    my.set(y * 0.2);
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
        animate={{ scale: isHover ? 1.02 : 1 }}
        transition={{ type: 'spring', stiffness: 250, damping: 15 }}
        className="inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}

export default function Hero() {
  // Cursor parallax for background glows
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 15 });

  // Cursor spotlight
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const sx = useSpring(cx, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(cy, { stiffness: 120, damping: 20, mass: 0.4 });

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
    <section id="home" className="relative min-h-[92vh] pt-24 overflow-hidden bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(124,58,237,0.25),transparent),radial-gradient(1000px_500px_at_80%_110%,rgba(56,189,248,0.2),transparent)] bg-slate-950">
      {/* 3D background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        {/* Vignette and grainy gradient overlays (non-blocking) */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
          <div className="absolute inset-0 mix-blend-overlay opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,#a78bfa_0%,transparent_40%),radial-gradient(circle_at_80%_30%,#38bdf8_0%,transparent_35%)]" />
        </div>
      </div>

      {/* Floating purple/blue glows with parallax */}
      <motion.div
        className="absolute -right-10 top-24 h-80 w-80 rounded-full bg-violet-500/25 blur-3xl pointer-events-none"
        style={{ rotateX: rx, rotateY: ry }}
        animate={{ y: [0, -14, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[-3rem] bottom-10 h-72 w-72 rounded-full bg-sky-500/25 blur-3xl pointer-events-none"
        style={{ rotateX: ry, rotateY: rx }}
        animate={{ y: [0, 14, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />

      {/* Cursor spotlight following the mouse (non-blocking) */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: sx, top: sy }}
        aria-hidden
      >
        <div className="h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18),rgba(56,189,248,0.05),transparent_70%)] blur-2xl" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-300 to-sky-300"
            >
              Futuristic interfaces that feel alive
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-4 text-lg text-slate-300 max-w-xl"
            >
              I blend interactive 3D, micro‑interactions, and a bold purple/blue palette to craft immersive, responsive experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MagneticButton
                href="#projects"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 text-white px-6 py-3 font-medium shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30"
              >
                <Rocket className="h-4 w-4" />
                <span>Explore Projects</span>
              </MagneticButton>

              <MagneticButton
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white px-6 py-3 font-medium backdrop-blur hover:bg-white/10"
              >
                <span>Contact Me</span>
              </MagneticButton>
            </motion.div>

            {/* Animated tech chips */}
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {['React', 'Framer Motion', 'Spline 3D', 'Tailwind'].map((t) => (
                <motion.li
                  key={t}
                  variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                  className="text-xs text-violet-200/90 bg-violet-400/10 border border-violet-400/20 px-2 py-1 rounded-md backdrop-blur"
                >
                  {t}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right column kept for layout balance on large screens */}
          <div className="hidden lg:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
