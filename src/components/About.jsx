import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 p-1"
          >
            <div className="rounded-xl bg-slate-900 p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cyan-300" />
                Craft & Philosophy
              </h3>
              <p className="mt-3 text-slate-300">
                I create interfaces that balance utility and delight. My work blends motion, clarity,
                and thoughtful details to help products feel effortless and expressive.
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-300">
                <li>Design Systems</li>
                <li>3D & Motion</li>
                <li>Frontend Architecture</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
            <p className="text-slate-300">
              I’m a frontend engineer and designer focused on building interactive, high-performance web
              experiences. I love crafting smooth animations, responsive layouts, and intuitive flows.
            </p>
            <p className="text-slate-300">
              Outside of work, I explore generative art and emerging UI patterns, and I share learnings
              with the community through writing and live demos.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
