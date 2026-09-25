import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, ArrowRight, Send, Mail, User, MessageSquare, Building, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { isBusinessEmail, sanitizePhone, sanitizeText } from '../utils/security';

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      name: sanitizeText(form.name, 100),
      organisation: sanitizeText(form.organisation, 160),
      email: form.email.trim().toLowerCase(),
      phone: sanitizePhone(form.phone),
      serviceArea: form.serviceArea,
      challenge: sanitizeText(form.challenge, 2000),
      contactMethod: form.contactMethod,
    };
    if (!payload.name || !payload.organisation || !payload.challenge || !isBusinessEmail(payload.email)) {
      setError('Please provide valid contact details and a brief description of your challenge.');
      return;
    }
    setSubmitting(true);

    if (supabase) {
      const { error: insertError } = await supabase.from('consultation_requests').insert({
        name: payload.name,
        organisation: payload.organisation,
        email: payload.email,
        phone: payload.phone || null,
        service_area: payload.serviceArea,
        challenge: payload.challenge,
        contact_method: payload.contactMethod,
      });

      if (insertError) {
        setError('We could not send your request. Please try again or contact us directly.');
        setSubmitting(false);
        return;
      }
    } else {
      setError('The consultation form is not connected yet. Please contact us directly while setup is completed.');
      setSubmitting(false);
      return;
    }

    setSent(true);
    setSubmitting(false);
  };

  const fieldBase =
    'w-full bg-white/5 border border-white/15 text-white text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors placeholder-gray-400 focus:border-[#B1B6CE]';

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ backgroundColor: '#ffffff', color: '#000741' }}
    >
      {/* Background gradient mesh + grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 18% 40%, rgba(177,182,206,0.06) 0%, transparent 60%), radial-gradient(ellipse at 82% 60%, rgba(168,213,186,0.08) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(4,7,32,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(4,7,32,0.06) 1px, transparent 1px)',
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
                <p className="text-xs uppercase tracking-[0.28em] font-semibold mb-5" style={{ color: '#087fd1' }}>
              Request a Consultation
            </p>
            <h2 className="text-[#000741] font-light leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Talk to EDRISYNC
              <br />
              about your challenge.
            </h2>
            <p className="text-[#53647B] mt-5 text-base leading-relaxed max-w-md">
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
              <a
                href="tel:+15551234567"
                className="flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-all duration-200 min-h-[52px]"
                style={{ color: '#000741', border: '1.5px solid rgba(4,7,32,0.28)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(4,7,32,0.06)')}
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
            style={{ color: '#53647B' }}
          >
            {[
              'No sales pitch, just an honest conversation',
              'Integrated approach across all 4 service areas',
              'Response within 2 business hours',
            ].map((text) => (
              <div key={text} className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 shrink-0" style={{ color: '#087fd1' }} />
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
                style={{ background: 'linear-gradient(135deg, #B1B6CE, #B1B6CE)' }}
              >
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold" style={{ color: '#000741' }}>Request received!</h3>
              <p className="text-gray-500 text-sm mt-2">
                Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}. We'll reach out within 2 business hours to schedule your consultation.
              </p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', organisation: '', email: '', phone: '', serviceArea: '', challenge: '', contactMethod: 'email' }); }}
                className="mt-6 text-sm font-semibold"
                style={{ color: '#087fd1' }}
              >
                Send another →
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: '#087fd1' }}
                >
                  <Send className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold leading-tight" style={{ color: '#087fd1' }}>
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
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Full name"
                      className="w-full border border-gray-200 text-[#000741] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors placeholder:text-slate-500 focus:border-[#087fd1]"
                    />
                  </div>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
                    <input
                      type="text"
                      required
                      maxLength={160}
                      value={form.organisation}
                      onChange={(e) => setForm({ ...form, organisation: e.target.value })}
                      placeholder="Organisation"
                      className="w-full border border-gray-200 text-[#000741] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors placeholder:text-slate-500 focus:border-[#087fd1]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Business email"
                      className="w-full border border-gray-200 text-[#000741] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors placeholder:text-slate-500 focus:border-[#087fd1]"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
                    <input
                      type="tel"
                      maxLength={40}
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Phone number"
                      className="w-full border border-gray-200 text-[#000741] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors placeholder:text-slate-500 focus:border-[#087fd1]"
                    />
                  </div>
                </div>

                <div className="relative">
                  <ShieldCheck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#64748B' }} />
                  <select
                    required
                    value={form.serviceArea}
                    onChange={(e) => setForm({ ...form, serviceArea: e.target.value })}
                    className="w-full border border-gray-200 text-[#000741] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors appearance-none focus:border-[#087fd1]"
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
                  <MessageSquare className="w-4 h-4 absolute left-3.5 top-4" style={{ color: '#64748B' }} />
                  <textarea
                    rows={4}
                    required
                    maxLength={2000}
                    value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    placeholder="What business challenge are you trying to solve?"
                    className="w-full border border-gray-200 text-[#000741] text-sm pl-11 pr-4 py-3 rounded-xl outline-none transition-colors resize-none placeholder:text-slate-500 focus:border-[#087fd1]"
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
                      style={{ accentColor: '#087fd1' }}
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
                      style={{ accentColor: '#087fd1' }}
                    />
                    Phone
                  </label>
                </div>

                <p className="text-xs leading-5 text-gray-500">By sending this request, you agree to our <a href="/privacy-policy" className="underline hover:text-[#087fd1]">Privacy Policy</a>.</p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 w-full text-white rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-200"
                  style={{ background: '#087fd1' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Sending...' : 'Request a Consultation'}
                </button>
                {error && <p role="alert" className="text-center text-sm text-red-600">{error}</p>}
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
