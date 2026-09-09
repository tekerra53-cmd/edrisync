import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Phone, ArrowRight, Send, Mail, User, MessageSquare, Building, ShieldCheck } from 'lucide-react';

export default function CTASection({ sectionRef }) {
  const [form, setForm] = useState({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    serviceArea: '',
    challenge: '',
    contactMethod: 'email',
  });
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
      style={{ backgroundColor: '#ffffff', color: '#061153' }}
    >
      {/* Background gradient mesh + grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 18% 40%, rgba(16,83,243,0.06) 0%, transparent 60%), radial-gradient(ellipse at 82% 60%, rgba(0,125,193,0.08) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(6,17,83,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(6,17,83,0.06) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Left: pitch */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
                <p className="text-xs uppercase tracking-[0.28em] font-semibold mb-5" style={{ color: '#7fd0ff' }}>
              Request a Consultation
            </p>
            <h2 className="text-[#061153] font-light leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Talk to EDRISYNC
              <br />
              about your challenge.
            </h2>
            <p className="text-[#334155] mt-5 text-base leading-relaxed max-w-md">
              Share your business problem and we'll put together a no-obligation conversation, connecting cybersecurity, GRC, Microsoft enablement, and digital transformation into one coordinated plan.
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
                style={{ color: '#061153', border: '1.5px solid rgba(6,17,83,0.28)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(6,17,83,0.06)')}
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
            style={{ color: '#334155' }}
          >
            {[
              'No sales pitch, just an honest conversation',
              'Integrated approach across all 4 service areas',
              'Response within 2 business hours',
            ].map((text) => (
              <div key={text} className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#7fd0ff' }} />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: contact form */}
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
              <h3 className="text-xl font-bold" style={{ color: '#061153' }}>Request received!</h3>
              <p className="text-gray-500 text-sm mt-2">
                Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}. We'll reach out within 2 business hours to schedule your consultation.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', organisation: '', email: '', phone: '', serviceArea: '', challenge: '', contactMethod: 'email' }); }}
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
                    Request a Consultation
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Tell us what you're trying to solve. We'll put together a coordinated plan.
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
                    <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#007dc1' }} />
                    <input
                      type="text"
                      required
                      value={form.organisation}
                      onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                      placeholder="Organisation"
                      className="w-full border border-gray-200 text-[#061153] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-400 focus:border-[#007dc1]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#007dc1' }} />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Business email"
                      className="w-full border border-gray-200 text-[#061153] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-400 focus:border-[#007dc1]"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#007dc1' }} />
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Phone number"
                      className="w-full border border-gray-200 text-[#061153] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-400 focus:border-[#007dc1]"
                    />
                  </div>
                </div>

                <div className="relative">
                  <ShieldCheck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#007dc1' }} />
                  <select
                    required
                    value={form.serviceArea}
                    onChange={(e) => setForm({ ...form, serviceArea: e.target.value })}
                    className="w-full border border-gray-200 text-[#061153] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors appearance-none placeholder-gray-400 focus:border-[#007dc1]"
                  >
                    <option value="">Select a service area</option>
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="grc">GRC & Compliance</option>
                    <option value="microsoft">Microsoft & Digital Workplace</option>
                    <option value="digital-transformation">Digital Transformation</option>
                    <option value="general">Not sure, let's talk</option>
                  </select>
                </div>

                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3.5 top-4" style={{ color: '#007dc1' }} />
                  <textarea
                    rows={4}
                    required
                    value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    placeholder="What business challenge are you trying to solve?"
                    className="w-full border border-gray-200 text-[#061153] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors resize-none placeholder-gray-400 focus:border-[#007dc1]"
                  />
                </div>

                <div className="flex gap-4 pt-2">
                  <span className="text-xs text-gray-500 pt-1">Preferred contact:</span>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={form.contactMethod === 'email'}
                      onChange={(e) => setForm({ ...form, contactMethod: e.target.value })}
                      className="w-4 h-4"
                      style={{ accentColor: '#007dc1' }}
                    />
                    Email
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={form.contactMethod === 'phone'}
                      onChange={(e) => setForm({ ...form, contactMethod: e.target.value })}
                      className="w-4 h-4"
                      style={{ accentColor: '#007dc1' }}
                    />
                    Phone
                  </label>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full text-white rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200"
                  style={{ background: 'linear-gradient(135deg, #1053F3, #007dc1)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <Send className="w-4 h-4" />
                  Request a Consultation
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
