import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, FileCheck, Landmark, Settings } from 'lucide-react';
import serviceImageCloud from '../assests/img/service-img1.png';
import serviceImageFlow from '../assests/img/service-img2.png';
import serviceImageAutomation from '../assests/img/service-img3.png';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    category: 'CYBERSECURITY',
    title: 'Cybersecurity',
    desc: 'From threat assessment to incident response, we build security into every layer of your business, connecting people, processes, and technology to reduce risk and protect what matters most.',
    tags: ['Assessment', 'Architecture', 'Microsoft Security'],
    imageColor: '#061153',
    visual: 'security',
    icon: Shield,
  },
  {
    category: 'GRC & COMPLIANCE',
    title: 'GRC & Compliance',
    desc: 'Governance, risk, and compliance frameworks that align your technology posture with regulatory requirements and business objectives, turning compliance into a competitive advantage.',
    tags: ['IT Governance', 'Risk Assessment', 'Audit Readiness'],
    imageColor: '#1053F3',
    image: serviceImageFlow,
    icon: FileCheck,
  },
  {
    category: 'MICROSOFT ENABLEMENT',
    title: 'Microsoft & Digital Workplace',
    desc: 'We maximize your Microsoft investments, including M365, Azure, Defender, and identity, to create secure, collaborative digital workplaces that empower your team to work smarter.',
    tags: ['Microsoft 365', 'Azure', 'Identity & Access'],
    imageColor: '#007dc1',
    image: serviceImageCloud,
    icon: Landmark,
  },
  {
    category: 'DIGITAL TRANSFORMATION',
    title: 'Digital Transformation',
    desc: 'Moving your business from paper to digital to automated to measurable, we optimize processes, automate workflows, and integrate systems that scale with your growth.',
    tags: ['Process Automation', 'Workflow', 'Systems Integration'],
    imageColor: '#6b2cf5',
    image: serviceImageAutomation,
    imagePosition: 'center top',
    icon: Settings,
  },
];

export default function ServicesSection({ sectionRef, onServices, onServiceDetail }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 767);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 767);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (isMobile) return undefined;

    const cards = gsap.utils.toArray('.service-card');
    const ctx = gsap.context(() => {
      // Only the first card is visible; the rest are hidden below the viewport.
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 130,
          autoAlpha: i === 0 ? 1 : 0,
          zIndex: 10 + i * 10,
        });
      });

      const HOLD = 0.6;  // reading time per card
      const SWAP = 1;    // slide-up duration

      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 12%',
          end: `+=${cards.length * 55}%`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        }
      });

      tl.to({}, { duration: HOLD });

      for (let i = 1; i < cards.length; i++) {
        tl.set(cards[i], { zIndex: 10 + i * 10 }, `swap${i}`);
        tl.to(cards[i], {
          autoAlpha: 1,
          yPercent: 0,
          duration: SWAP,
        }, `swap${i}`);

        tl.to({}, { duration: HOLD }, `swap${i}+=${SWAP}`);

        tl.to(cards[i - 1], {
          autoAlpha: 0,
          duration: 0.4,
          ease: 'power2.out',
        }, `swap${i}+=${SWAP}`);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile, sectionRef]);

  return (
    <div className="services-section" style={{ background: 'var(--edri-nav-blue)' }}>
      {/* Hero Title */}
      <div className="services-title" style={{ textAlign: 'center', padding: '48px 20px 20px', color: 'white' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 300, margin: 0 }}>
          Our Services
        </h1>
      </div>

      {/* Pinned Section */}
      <div className="services-pin" ref={sectionRef} style={isMobile ? { position: 'relative', height: 'auto' } : { position: 'relative', height: '500px' }}>
        <div className="services-pin-inner" style={isMobile ? {
          position: 'relative',
          width: '100%',
          height: 'auto',
          display: 'block',
          alignItems: 'unset',
          justifyContent: 'unset'
        } : {
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {services.map((service, index) => (
            <div
              key={service.title}
              className="service-card"
              role="link"
              tabIndex={0}
              aria-label={`Open ${service.title} service page`}
              onClick={() => onServiceDetail?.(service.title)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onServiceDetail?.(service.title);
                }
              }}
              style={isMobile ? {
                position: 'relative',
                width: '100%',
                maxWidth: '1040px',
                height: 'auto',
                zIndex: 10 + index * 10,
                padding: '0',
                cursor: 'pointer',
                margin: '0 auto 16px'
              } : {
                position: 'absolute',
                inset: 0,
                margin: 'auto',
                width: '100%',
                maxWidth: '1040px',
                height: 'fit-content',
                zIndex: 10 + index * 10,
                padding: '0 20px',
                cursor: 'pointer'
              }}
            >
              <div className="service-card-layout" style={isMobile ? {
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
                height: 'auto',
                minHeight: 'auto',
                cursor: 'pointer',
              } : {
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
                height: '360px',
                cursor: 'pointer',
              }}>
                {/* Service image */}
                <div className="service-card-image" style={isMobile ? {
                  width: '100%',
                  height: '260px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: service.imageColor,
                  flexShrink: 0,
                } : {
                  width: '45%',
                  position: 'relative',
                  overflow: 'hidden',
                  background: service.imageColor,
                  flexShrink: 0,
                }}>
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={`${service.title} service`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: service.imagePosition || 'center',
                        display: 'block',
                      }}
                    />
                  ) : (
                    <div
                      aria-label="Abstract cybersecurity network visual"
                      role="img"
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'radial-gradient(circle at center, #1b5fa8 0%, #0b245e 32%, #061153 72%)',
                      }}
                    >
                      <div style={{
                        width: '122px',
                        height: '122px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(139,211,255,0.65)',
                        borderRadius: '50%',
                        boxShadow: '0 0 0 22px rgba(104,197,255,0.08), 0 0 55px rgba(104,197,255,0.42)',
                      }}>
                        <service.icon className="h-12 w-12 text-[#8bd3ff]" strokeWidth={1.3} />
                      </div>
                    </div>
                  )}

                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(135deg, ${service.imageColor}55, transparent 60%), linear-gradient(to top, ${service.imageColor}cc, transparent 55%)`,
                  }}></div>

                  <div style={{
                    position: 'absolute',
                    left: '24px',
                    bottom: '22px',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}>
                    {service.category}
                  </div>
                </div>

                {/* Content Side */}
                <div className="service-card-content" style={isMobile ? { width: '100%', padding: '26px 22px', position: 'relative' } : { width: '55%', padding: '36px 40px', position: 'relative' }}>
                  <span style={{
                    display: 'inline-block',
                    background: '#f0f0f0',
                    color: '#666',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    marginBottom: '14px'
                  }}>
                    {service.category}
                  </span>

                  <h2 style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#0a0e27',
                    margin: '0 0 12px 0',
                    lineHeight: 1.3
                  }}>
                    {service.title}
                  </h2>

                  <p style={{
                    fontSize: '13px',
                    color: '#666',
                    lineHeight: 1.6,
                    margin: '0 0 20px 0'
                  }}>
                    {service.desc}
                  </p>

                   <a href="#"
                     onClick={(e) => { e.preventDefault(); e.stopPropagation(); onServiceDetail?.(service.title); }}
                     style={{
                     color: '#2563eb',
                     textDecoration: 'none',
                     fontSize: '13px',
                     fontWeight: 600,
                     display: 'inline-flex',
                     alignItems: 'center',
                     gap: '6px',
                     marginBottom: '24px',
                     padding: '4px 0'
                   }}>
                     Learn More <span className="learn-more-arrow" aria-hidden="true">→</span>
                  </a>

                  <div style={{ borderTop: '1px solid #eee', marginBottom: '18px' }}></div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {service.tags.map(tag => (
                      <span key={tag} style={{
                        background: '#f5f5f5',
                        color: '#888',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 500
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
