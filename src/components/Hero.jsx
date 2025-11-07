import Spline from '@splinetool/react-spline';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export default function Hero() {
  // Parallax cursor accents
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 15 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mx.set(x);
      my.set(y);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mx, my]);

  return (
    <section id="home" className="relative min-h-[92vh] pt-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/a6HhFsV3-DN9Z-yP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
      </div>

      {/* Floating accent orbs */}
      <motion.div
        className="absolute -right-10 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none"
        style={{ rotateX: rx, rotateY: ry }}
        animate={{ y: [0, -10, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[-3rem] bottom-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"
        style={{ rotateX: ry, rotateY: rx }}
        animate={{ y: [0, 10, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white"
            >
              Modern, interactive experiences that move with you
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-4 text-lg text-slate-300 max-w-xl"
            >
              I merge 3D, micro‑interactions, and clean design to craft interfaces that feel alive.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#projects" className="inline-flex items-center justify-center rounded-lg bg-white text-slate-900 px-5 py-3 font-medium shadow-lg shadow-white/10 hover:shadow-white/20 hover:-translate-y-0.5 transition-transform">
                View Projects
              </a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-lg border border-white/20 text-white px-5 py-3 font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-transform">
                Contact Me
              </a>
            </motion.div>

            {/* Animated tech chips */}
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {['React', 'Framer Motion', 'Three/Spline', 'Tailwind'].map((t) => (
                <motion.li
                  key={t}
                  variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}
                  className="text-xs text-cyan-300/90 bg-cyan-400/10 border border-cyan-400/20 px-2 py-1 rounded-md backdrop-blur"
                >
                  {t}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div className="hidden lg:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
