import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

const initial = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [status, setStatus] = useState({ loading: false, success: null, error: null, info: null });

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null, info: null });
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Submission failed');
      setStatus({ loading: false, success: 'Message sent successfully.', error: null, info: data });
      setValues(initial);
    } catch (err) {
      setStatus({ loading: false, success: null, error: err.message, info: null });
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Let’s build something great
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-3 text-slate-300"
          >
            Send a message and it will also email me directly.
          </motion.p>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <div className="md:col-span-1">
            <label className="block text-sm text-slate-300 mb-2">Name</label>
            <input name="name" required value={values.name} onChange={onChange} placeholder="Your name" className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40" />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm text-slate-300 mb-2">Email</label>
            <input type="email" name="email" required value={values.email} onChange={onChange} placeholder="you@example.com" className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300 mb-2">Subject</label>
            <input name="subject" value={values.subject} onChange={onChange} placeholder="How can I help?" className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300 mb-2">Message</label>
            <textarea name="message" required value={values.message} onChange={onChange} rows="5" placeholder="Tell me about your project..." className="w-full rounded-lg bg-slate-900/60 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/40" />
          </div>
          <div className="md:col-span-2 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              I’ll reply within 24 hours. Your info is kept private.
            </div>
            <button
              type="submit"
              disabled={status.loading}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-white px-6 py-3 font-medium shadow-lg hover:shadow-xl transition disabled:opacity-60"
            >
              {status.loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> Sending
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5" /> Send message
                </>
              )}
            </button>
          </div>

          {status.success && (
            <div className="md:col-span-2 flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" /> {status.success}
            </div>
          )}
          {status.error && (
            <div className="md:col-span-2 flex items-center gap-2 text-amber-400">
              <AlertTriangle className="h-5 w-5" /> {status.error}
            </div>
          )}
          {status.info && (
            <pre className="md:col-span-2 mt-2 text-xs text-slate-400 whitespace-pre-wrap">{JSON.stringify(status.info, null, 2)}</pre>
          )}
        </motion.form>
      </div>
    </section>
  );
}
