import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Phone, ArrowRight, Send, Mail, User, MessageSquare } from 'lucide-react';

export default function CTASection({ sectionRef }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const fieldBase =
    'w-full bg-white/5 border border-white/15 text-white text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-400 focus:border-[#007dc1]';

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ backgroundColor: '#061153', color: '#e2e8f0' }}
    >
      {/* Background gradient mesh + grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 18% 40%, rgba(107,44,245,0.12) 0%, transparent 60%), radial-gradient(ellipse at 82% 60%, rgba(0,125,193,0.16) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(177,182,206,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(177,182,206,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left — pitch */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.28em] font-semibold mb-5" style={{ color: '#7fd0ff' }}>
              Get started
            </p>
            <h2 className="text-white font-light leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Ready to stop worrying
              <br />
              about IT?
            </h2>
            <p className="text-[#cbd5e1] mt-5 text-base leading-relaxed max-w-md">
              Schedule a free infrastructure assessment. No obligation, no sales pressure — just an honest conversation about what's working and what isn't.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 mt-9"
          >
            <button
              className="flex items-center justify-center gap-2 text-white rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-200 min-h-[52px]"
              style={{ background: 'linear-gradient(135deg, #1053F3, #007dc1)' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <Calendar className="w-4 h-4" />
              Schedule assessment
            </button>
            <a
              href="tel:+15551234567"
              className="flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-200 min-h-[52px]"
              style={{ color: '#ffffff', border: '1.5px solid rgba(255,255,255,0.45)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Phone className="w-4 h-4" />
              Call us: (555) 123-4567
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col gap-3 mt-9 text-sm"
            style={{ color: '#cbd5e1' }}
          >
            {[
              'Response within 2 business hours',
              'No commitment required',
              '15+ years of expertise',
            ].map((text) => (
              <div key={text} className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#7fd0ff' }} />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — contact form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-white rounded-3xl p-7 sm:p-9 shadow-2xl"
        >
          {sent ? (
            <div className="text-center py-10">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'linear-gradient(135deg, #1053F3, #007dc1)' }}
              >
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#061153' }}>Message sent!</h3>
              <p className="text-gray-500 text-sm mt-2">
                Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}. We'll be in touch within 2 business hours.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                className="mt-6 text-sm font-semibold"
                style={{ color: '#007dc1' }}
              >
                Send another →
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #1053F3, #007dc1)' }}
                >
                  <Send className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-tight" style={{ color: '#061153' }}>
                    Send us a message
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5">
                    We'll get back within 2 business hours.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#007dc1' }} />
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      className="w-full border border-gray-200 text-[#061153] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-400 focus:border-[#007dc1]"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#007dc1' }} />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Work email"
                      className="w-full border border-gray-200 text-[#061153] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-400 focus:border-[#007dc1]"
                    />
                  </div>
                </div>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3.5 top-4" style={{ color: '#007dc1' }} />
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Briefly describe what you need…"
                    className="w-full border border-gray-200 text-[#061153] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors resize-none placeholder-gray-400 focus:border-[#007dc1]"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full text-white rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #1053F3, #007dc1)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <Send className="w-4 h-4" />
                  Send message
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
