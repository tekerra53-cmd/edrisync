import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import img1 from '../assests/img/service-img1.png';
import img2 from '../assests/img/service-img2.png';
import img3 from '../assests/img/service-img3.png';

// Same thin-line background design used by the process (Approach) section,
// tuned to read against the dark navy background.
function AbstractLines({ color, rotate = 0, opacity = 0.14 }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 320"
      preserveAspectRatio="xMidYMid slice"
      style={{ transform: `rotate(${rotate}deg)`, opacity }}
      aria-hidden="true"
    >
      <path d="M-40 40 C 60 -10, 140 110, 240 30 S 430 80, 470 10" fill="none" stroke={color} strokeWidth="0.75" />
      <path d="M-40 95 C 70 40, 150 170, 250 85 S 430 140, 470 60" fill="none" stroke={color} strokeWidth="0.75" />
      <path d="M-40 150 C 90 90, 170 230, 280 140 S 440 200, 480 110" fill="none" stroke={color} strokeWidth="1" />
      <path d="M-40 205 C 80 150, 160 280, 270 195 S 430 255, 470 175" fill="none" stroke={color} strokeWidth="0.75" />
      <path d="M-40 260 C 90 210, 170 320, 280 245 S 440 300, 480 220" fill="none" stroke={color} strokeWidth="0.75" />
      <path d="M-40 300 C 80 260, 160 360, 270 290 S 430 340, 470 270" fill="none" stroke={color} strokeWidth="0.75" />
      <circle cx="40" cy="40" r="34" fill="none" stroke={color} strokeWidth="0.75" />
      <circle cx="360" cy="280" r="48" fill="none" stroke={color} strokeWidth="0.75" />
      <circle cx="120" cy="190" r="22" fill="none" stroke={color} strokeWidth="0.75" />
      <circle cx="300" cy="80" r="14" fill="none" stroke={color} strokeWidth="0.75" />
      <circle cx="210" cy="160" r="2" fill={color} />
      <circle cx="90" cy="250" r="2" fill={color} />
      <circle cx="330" cy="160" r="2" fill={color} />
    </svg>
  );
}

const STICKY_TOP = 120;

const services = [
  {
    category: 'IT SOLUTIONS',
    title: 'Cloud Solutions & Digital Workspace',
    desc: 'Modern businesses need technology that is flexible, secure, and accessible from anywhere. We design and manage cloud environments that keep your teams connected and productive.',
    tags: ['Hosting', 'Cloud', 'Migration'],
    image: img1
  },
  {
    category: 'CODING',
    title: 'Digital Transformation and Automation',
    desc: 'We modernize the way you work by automating repetitive processes and integrating the systems your business relies on, freeing your team to focus on what matters.',
    tags: ['Framer', 'Automation', 'Integration'],
    image: img2
  },
  {
    category: 'DESIGNING',
    title: 'Web and Mobile UI/UX Designing',
    desc: 'Purposeful, engaging interfaces that connect your brand identity to meaningful user journeys across web and mobile platforms.',
    tags: ['Shopify', 'Web', 'Mobile'],
    image: img3
  }
];

export default function ServicesSection({ sectionRef: externalRef }) {
  const internalRef = useRef(null);
  const sectionRef = externalRef || internalRef;
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        // Subtle rise as each card (except the first) locks into its sticky slot
        if (i > 0) {
          gsap.fromTo(
            card,
            { y: 60 },
            {
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: `top ${STICKY_TOP}px`,
                scrub: true,
              },
            }
          );
        }

        // Previous card disappears (opacity 0) ONLY while this card slides up
        // and fully covers it. All cards lock into the SAME slot, so the next
        // card completely hides the previous — fade starts when the incoming
        // card reaches the previous card's bottom edge and ends when it locks in.
        const prev = cards[i - 1];
        if (prev) {
          const prevBottom = STICKY_TOP + prev.offsetHeight;
          gsap.fromTo(
            prev,
            { scale: 1, opacity: 1 },
            {
              scale: 0.97,
              opacity: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: `top ${prevBottom}px`,
                end: `top ${STICKY_TOP}px`,
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    // Recompute trigger positions once images/layout settle
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div style={{ position: 'relative', background: '#0a0e27', minHeight: '100vh' }}>
      {/* Thin-line background (same design as the process section) */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <AbstractLines color="#1053F3" rotate={0} opacity={0.12} />
        <AbstractLines color="#3b82f6" rotate={180} opacity={0.10} />
        <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,83,243,0.18), transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-140px', left: '-120px', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.14), transparent 70%)' }} />
      </div>

      {/* Hero Title */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '140px 20px 60px', color: 'white' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 300, margin: 0 }}>
          Digital Transformation & <span style={{ fontWeight: 700 }}>IT Solutions</span>
        </h1>
      </div>

      {/* Sticky Cards Container */}
      <div ref={sectionRef} style={{ position: 'relative', zIndex: 1, padding: '0 60px 200px' }}>
        {services.map((service, index) => (
          <div
            key={service.title}
            ref={el => cardsRef.current[index] = el}
            style={{
              position: 'sticky',
              top: STICKY_TOP,
              zIndex: 10 + index * 10,
              marginBottom: index === services.length - 1 ? '0' : '28px',
            }}
          >
            <div style={{
              background: 'white',
              borderRadius: '24px',
              overflow: 'hidden',
              display: 'flex',
              maxWidth: '1000px',
              margin: '0 auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              minHeight: '400px'
            }}>
              {/* Image Side */}
              <div style={{ width: '50%', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Content Side */}
              <div style={{ width: '50%', padding: '40px', position: 'relative' }}>
                {/* Category Tag */}
                <span style={{
                  display: 'inline-block',
                  background: '#f0f0f0',
                  color: '#666',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '16px'
                }}>
                  {service.category}
                </span>

                {/* Title */}
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#0a0e27',
                  margin: '0 0 16px 0',
                  lineHeight: 1.3
                }}>
                  {service.title}
                </h2>

                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: 1.6,
                  margin: '0 0 24px 0'
                }}>
                  {service.desc}
                </p>

                {/* Divider */}
                <div style={{ borderTop: '1px solid #eee', marginBottom: '20px' }}></div>

                {/* Bottom Tags */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  {service.tags.map(tag => (
                    <span key={tag} style={{
                      background: '#f5f5f5',
                      color: '#888',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
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
  );
}
