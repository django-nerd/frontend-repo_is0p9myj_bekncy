import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Interactive Showcase',
    description: 'A 3D-enhanced product gallery with smooth motion and real-time lighting.',
    tags: ['React', 'Three.js', 'Framer Motion'],
    link: '#',
    repo: '#',
  },
  {
    title: 'Realtime Dashboard',
    description: 'Clean, responsive analytics dashboard with streaming data and micro-interactions.',
    tags: ['Vite', 'Tailwind', 'WebSockets'],
    link: '#',
    repo: '#',
  },
  {
    title: 'AI Portfolio Generator',
    description: 'Tool that turns prompts into elegant portfolio sections with accessible design.',
    tags: ['FastAPI', 'MongoDB', 'OpenAI'],
    link: '#',
    repo: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(40%_60%_at_70%_10%,rgba(56,189,248,0.15),transparent_60%),radial-gradient(30%_40%_at_20%_80%,rgba(59,130,246,0.12),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Selected Work</h2>
          <p className="mt-3 text-slate-400">A few projects that highlight my approach to craft, interactivity, and clarity.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-xl border border-white/10 bg-white/5 p-5 hover:border-white/20 hover:bg-white/10 transition"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <div className="flex items-center gap-2">
                  <a href={p.repo} className="p-2 rounded-md hover:bg-white/10" aria-label="GitHub">
                    <Github className="h-4 w-4 text-white/70" />
                  </a>
                  <a href={p.link} className="p-2 rounded-md hover:bg-white/10" aria-label="Live">
                    <ExternalLink className="h-4 w-4 text-white/70" />
                  </a>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-300">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs text-sky-300/90 bg-sky-400/10 border border-sky-400/20 px-2 py-1 rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
