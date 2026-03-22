import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const colors = {
  bg: '#08080a',
  surface: '#111114',
  accent: '#f5a623',
  accentOrange: '#f76b1c',
  text: '#f5f5f0',
  textMuted: 'rgba(245, 245, 240, 0.4)',
  border: 'rgba(245, 166, 35, 0.15)',
  borderLight: 'rgba(245, 166, 35, 0.1)',
};

const gradientGold = 'linear-gradient(135deg, #f5a623 0%, #f76b1c 100%)';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const sectionStyle = {
  maxWidth: 1100,
  margin: '0 auto',
  padding: '0 24px',
};

const sectionTitle = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 700,
  color: colors.text,
  lineHeight: 1.15,
  fontSize: 'clamp(28px, 4vw, 40px)',
  textAlign: 'center',
  marginBottom: 56,
  marginTop: 0,
};

const cardBase = {
  background: colors.surface,
  borderRadius: 16,
  border: `1px solid ${colors.border}`,
};

const btnGold = {
  background: gradientGold,
  color: '#000000',
  fontWeight: 700,
  borderRadius: 12,
  border: 'none',
  cursor: 'pointer',
  fontFamily: "'Outfit', system-ui, sans-serif",
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
};

const btnOutline = {
  background: 'transparent',
  color: colors.text,
  fontWeight: 600,
  borderRadius: 12,
  border: `1px solid ${colors.border}`,
  cursor: 'pointer',
  fontFamily: "'Outfit', system-ui, sans-serif",
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'border-color 0.2s ease',
};

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.accent}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transition: 'transform 0.3s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ─── FAQ Accordion Item ─── */
function FaqItem({ question, answer, open, onClick }) {
  return (
    <div
      style={{
        ...cardBase,
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <div
        style={{
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: colors.text }}>{question}</span>
        <ChevronIcon open={open} />
      </div>
      <div
        style={{
          maxHeight: open ? 200 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <p style={{ margin: 0, padding: '0 24px 20px', fontSize: 14, lineHeight: 1.7, color: colors.textMuted }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

/* ─── DATA ─── */

const channels = [
  {
    name: 'Idealista / Fotocasa',
    desc: 'Descripción optimizada para portales inmobiliarios',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 4l9 5.5" />
        <path d="M19 13v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    desc: 'Caption con hashtags y emojis para máximo engagement',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill={colors.accent} stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Email',
    desc: 'Email profesional listo para enviar a tu cartera',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 6l10 7 10-7" />
      </svg>
    ),
  },
  {
    name: 'English',
    desc: 'Versión en inglés para compradores internacionales',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

const steps = [
  {
    num: '01',
    title: 'Rellena los datos',
    desc: 'Tipo, metros, zona, precio y puntos fuertes',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Dale a generar',
    desc: '4 contenidos optimizados en 10 segundos',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Copia y publica',
    desc: 'Listo para Idealista, Instagram, email y más',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: 'Laura Martínez',
    agency: 'Fincas Martínez',
    city: 'Barcelona',
    initials: 'LM',
    text: 'Antes tardaba casi una hora en redactar los textos de un piso nuevo. Ahora lo tengo todo en segundos y puedo dedicar ese tiempo a captar más propiedades.',
  },
  {
    name: 'Carlos Ruiz',
    agency: 'Inmobiliaria Costa Sol',
    city: 'Málaga',
    initials: 'CR',
    text: 'El contenido para Instagram me ha cambiado el juego. Mis publicaciones ahora consiguen el doble de interacciones y recibo más consultas directas.',
  },
  {
    name: 'Marta Soler',
    agency: 'Grupo Habitat',
    city: 'Valencia',
    initials: 'MS',
    text: 'La versión en inglés es brutal para los clientes extranjeros. Ya no necesito traductora. Lo que genera InnoPilot suena completamente natural.',
  },
];

const faqs = [
  {
    q: '¿Necesito conocimientos técnicos?',
    a: 'No, para nada. Si sabes rellenar un formulario, sabes usar InnoPilot. Introduces los datos del piso, pulsas un botón y el contenido se genera solo.',
  },
  {
    q: '¿Funciona para cualquier tipo de propiedad?',
    a: 'Sí. Pisos, casas, áticos, dúplex, estudios, chalets, locales comerciales... InnoPilot se adapta al tipo de propiedad y genera contenido específico para cada uno.',
  },
  {
    q: '¿El contenido generado es único?',
    a: 'Sí, cada generación es completamente única. Nunca verás dos textos iguales aunque metas los mismos datos, porque se adapta al contexto y puntos fuertes de cada propiedad.',
  },
  {
    q: '¿Puedo cancelar cuando quiera?',
    a: 'Por supuesto. No hay permanencia ni compromiso. Puedes cancelar tu suscripción en cualquier momento y seguirás teniendo acceso hasta el final del período pagado.',
  },
  {
    q: '¿En qué idiomas genera contenido?',
    a: 'Actualmente genera en español (para portales, Instagram y email) y en inglés (para compradores internacionales). Estamos trabajando en añadir francés, alemán y holandés próximamente.',
  },
];

const plans = [
  {
    name: 'Starter',
    price: '0',
    period: '/mes',
    features: ['5 generaciones/mes', '4 canales', 'Copiar y pegar'],
    cta: 'Empezar gratis',
    highlighted: false,
    link: '/app',
  },
  {
    name: 'Pro',
    price: '19',
    period: '/mes',
    badge: 'Popular',
    features: ['100 generaciones/mes', '4 canales', 'Historial de generaciones', 'Tonos personalizados', 'Soporte prioritario'],
    cta: 'Empezar con Pro',
    highlighted: true,
    link: '/app',
  },
  {
    name: 'Agency',
    price: '49',
    period: '/mes',
    features: ['Generaciones ilimitadas', '4 canales', 'Historial completo', 'Multi-usuario (hasta 5)', 'API access', 'Soporte dedicado'],
    cta: 'Contactar',
    highlighted: false,
    link: null,
  },
];

/* ─── COMPONENT ─── */

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: "'Outfit', system-ui, sans-serif", color: colors.text }}>

      {/* ─── NAVBAR ─── */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(8, 8, 10, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: `1px solid ${colors.borderLight}`,
        }}
      >
        <div
          style={{
            ...sectionStyle,
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
            <span style={{ color: colors.text }}>Inno</span>
            <span style={{ color: '#f0a500' }}>Pilot</span>
          </Link>
          <Link
            to="/app"
            style={{
              ...btnGold,
              fontSize: 14,
              padding: '10px 22px',
            }}
          >
            Probar gratis
          </Link>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ paddingTop: 140, paddingBottom: 120 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{
            ...sectionStyle,
            maxWidth: 800,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
          }}
        >
          <motion.h1
            variants={fadeInUp}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              color: colors.text,
              lineHeight: 1.15,
              fontSize: 'clamp(32px, 5vw, 52px)',
              margin: 0,
              maxWidth: 700,
            }}
          >
            De piso captado a publicado en 10 segundos
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            style={{
              color: colors.textMuted,
              fontSize: 'clamp(16px, 2vw, 18px)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 600,
            }}
          >
            Genera descripciones para Idealista, posts para Instagram, emails y versión en inglés. Todo con un click.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link
              to="/app"
              style={{
                ...btnGold,
                fontSize: 17,
                padding: '0 36px',
                height: 56,
                letterSpacing: '-0.01em',
                boxShadow: '0 4px 24px rgba(245, 166, 35, 0.25)',
              }}
            >
              Empezar gratis &rarr;
            </Link>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            style={{
              color: colors.textMuted,
              fontSize: 13,
              margin: 0,
            }}
          >
            Sin tarjeta de crédito &middot; 5 generaciones gratis
          </motion.p>
        </motion.div>
      </section>

      {/* ─── 4 CANALES ─── */}
      <section style={{ paddingBottom: 120 }}>
        <div style={sectionStyle}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            style={sectionTitle}
          >
            4 canales en una sola generación
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 20,
            }}
            className="channels-grid"
          >
            {channels.map((ch) => (
              <motion.div
                key={ch.name}
                variants={fadeInUp}
                style={{
                  ...cardBase,
                  padding: '28px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: 'rgba(245, 166, 35, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {ch.icon}
                </div>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: colors.text }}>{ch.name}</h3>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: colors.textMuted }}>{ch.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CÓMO FUNCIONA ─── */}
      <section style={{ paddingBottom: 120 }}>
        <div style={sectionStyle}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            style={sectionTitle}
          >
            Cómo funciona
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
            }}
            className="steps-grid"
          >
            {steps.map(({ num, title, desc, icon }) => (
              <motion.div
                key={num}
                variants={fadeInUp}
                style={{
                  ...cardBase,
                  padding: '24px',
                  borderTop: `2px solid ${colors.accent}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: colors.accent,
                      background: 'rgba(245, 166, 35, 0.1)',
                      padding: '5px 12px',
                      borderRadius: 8,
                    }}
                  >
                    {num}
                  </span>
                  {icon}
                </div>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: colors.text }}>{title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: colors.textMuted }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── ANTES / DESPUÉS ─── */}
      <section style={{ paddingBottom: 120 }}>
        <div style={sectionStyle}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            style={sectionTitle}
          >
            El cambio es brutal
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 20,
              maxWidth: 800,
              margin: '0 auto',
            }}
            className="comparison-grid"
          >
            {/* ANTES */}
            <motion.div
              variants={fadeInUp}
              style={{
                ...cardBase,
                padding: 28,
                borderTop: '2px solid rgba(239, 68, 68, 0.5)',
                background: 'rgba(239, 68, 68, 0.03)',
              }}
            >
              <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                Sin InnoPilot
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  '45 min escribiendo cada piso',
                  'Copiar y pegar entre portales',
                  'Descripciones genéricas',
                  'Sin versión en inglés',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'rgba(245, 245, 240, 0.55)' }}>
                    <CrossIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* DESPUÉS */}
            <motion.div
              variants={fadeInUp}
              style={{
                ...cardBase,
                padding: 28,
                borderTop: `2px solid ${colors.accent}`,
                background: 'rgba(245, 166, 35, 0.03)',
              }}
            >
              <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 700, color: colors.accent, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                Con InnoPilot
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  '10 segundos por piso',
                  '4 canales de golpe',
                  'Contenido personalizado',
                  'Inglés automático',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: colors.text }}>
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIOS ─── */}
      <section style={{ paddingBottom: 120 }}>
        <div style={sectionStyle}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            style={sectionTitle}
          >
            Lo que dicen los agentes
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
            }}
            className="testimonials-grid"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                style={{
                  ...cardBase,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'rgba(245, 245, 240, 0.6)', fontStyle: 'italic', flex: 1 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'rgba(245, 166, 35, 0.12)',
                      border: `1px solid ${colors.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                      color: colors.accent,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: colors.textMuted }}>{t.agency} · {t.city}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section style={{ paddingBottom: 120 }}>
        <div style={sectionStyle}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            style={sectionTitle}
          >
            Planes simples, sin sorpresas
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
              maxWidth: 960,
              margin: '0 auto',
              alignItems: 'stretch',
            }}
            className="pricing-grid"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                style={{
                  ...cardBase,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                  position: 'relative',
                  ...(plan.highlighted
                    ? {
                        border: `1.5px solid ${colors.accent}`,
                        boxShadow: '0 0 40px rgba(245, 166, 35, 0.12), 0 0 80px rgba(245, 166, 35, 0.06)',
                      }
                    : {}),
                }}
              >
                {plan.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: gradientGold,
                      color: '#000000',
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '5px 16px',
                      borderRadius: 999,
                    }}
                  >
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 600, color: colors.textMuted }}>
                    {plan.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 44, fontWeight: 700, color: colors.text, lineHeight: 1 }}>{plan.price}&euro;</span>
                    <span style={{ fontSize: 15, color: colors.textMuted }}>{plan.period}</span>
                  </div>
                </div>

                <div style={{ height: 1, background: colors.border }} />

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                  {plan.features.map((feat) => (
                    <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: colors.text }}>
                      <CheckIcon />
                      {feat}
                    </li>
                  ))}
                </ul>

                {plan.link ? (
                  <Link
                    to={plan.link}
                    style={{
                      ...(plan.highlighted ? btnGold : btnOutline),
                      width: '100%',
                      height: 48,
                      fontSize: 15,
                      ...(plan.highlighted ? { boxShadow: '0 4px 20px rgba(245, 166, 35, 0.2)' } : {}),
                    }}
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <a
                    href="mailto:hello@innopilot.com"
                    style={{
                      ...btnOutline,
                      width: '100%',
                      height: 48,
                      fontSize: 15,
                    }}
                  >
                    {plan.cta}
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section style={{ paddingBottom: 120 }}>
        <div style={{ ...sectionStyle, maxWidth: 720 }}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            style={sectionTitle}
          >
            Preguntas frecuentes
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <FaqItem
                  question={faq.q}
                  answer={faq.a}
                  open={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ paddingBottom: 120 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          style={{
            ...sectionStyle,
            maxWidth: 700,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <motion.h2
            variants={fadeInUp}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              color: colors.text,
              lineHeight: 1.15,
              fontSize: 'clamp(28px, 4vw, 42px)',
              margin: 0,
            }}
          >
            Deja de perder tiempo escribiendo
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            style={{
              color: colors.textMuted,
              fontSize: 'clamp(16px, 2vw, 18px)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 500,
            }}
          >
            Únete a los agentes que ya generan contenido en segundos
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Link
              to="/app"
              style={{
                ...btnGold,
                fontSize: 17,
                padding: '0 36px',
                height: 56,
                boxShadow: '0 4px 24px rgba(245, 166, 35, 0.25)',
              }}
            >
              Empezar gratis &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: '0 24px 48px' }}>
        <div style={sectionStyle}>
          <div
            style={{
              height: 1,
              background: gradientGold,
              opacity: 0.3,
              marginBottom: 32,
            }}
          />
          <p style={{ textAlign: 'center', fontSize: 13, color: colors.textMuted, margin: 0 }}>
            <span style={{ color: colors.text, fontWeight: 500 }}>Inno</span>
            <span style={{ color: '#f0a500', fontWeight: 500 }}>Pilot</span>
            {' '}v1.0 &middot; Built by @alanteixido
          </p>
        </div>
      </footer>

      {/* ─── RESPONSIVE OVERRIDES ─── */}
      <style>{`
        @media (max-width: 768px) {
          .channels-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .comparison-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
