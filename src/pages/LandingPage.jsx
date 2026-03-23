import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import logo from '../assets/logo1.png';

const colors = {
  bg: '#08080a',
  surface: '#111114',
  surfaceHover: '#161619',
  accent: '#f5a623',
  accentOrange: '#f76b1c',
  text: '#f5f5f0',
  textSoft: 'rgba(245, 245, 240, 0.7)',
  textMuted: 'rgba(245, 245, 240, 0.4)',
  textFaint: 'rgba(245, 245, 240, 0.2)',
  border: 'rgba(245, 166, 35, 0.12)',
  borderLight: 'rgba(245, 166, 35, 0.08)',
};

const gradientGold = 'linear-gradient(135deg, #f5a623 0%, #f76b1c 100%)';

const spring = { type: 'spring', stiffness: 100, damping: 20 };
const springSnappy = { type: 'spring', stiffness: 300, damping: 30 };

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { ...spring } },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { ...spring } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const staggerSlow = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const sectionStyle = {
  maxWidth: 1120,
  margin: '0 auto',
  padding: '0 24px',
};

const sectionTitle = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 700,
  color: colors.text,
  lineHeight: 1.1,
  fontSize: 'clamp(28px, 4vw, 44px)',
  letterSpacing: '-0.02em',
  margin: 0,
};

const sectionLabel = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '3px',
  textTransform: 'uppercase',
  color: colors.accent,
  marginBottom: 16,
};

const cardBase = {
  background: colors.surface,
  borderRadius: 18,
  border: `1px solid ${colors.border}`,
};

const btnGold = {
  background: gradientGold,
  color: '#0a0a0a',
  fontWeight: 700,
  borderRadius: 14,
  border: 'none',
  cursor: 'pointer',
  fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
};

const btnOutline = {
  background: 'transparent',
  color: colors.text,
  fontWeight: 600,
  borderRadius: 14,
  border: `1px solid ${colors.border}`,
  cursor: 'pointer',
  fontFamily: "'Cabinet Grotesk', system-ui, sans-serif",
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
};

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(239, 68, 68, 0.7)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
      style={{ transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function FaqItem({ question, answer, open, onClick }) {
  return (
    <motion.div
      style={{
        ...cardBase,
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={onClick}
      whileHover={{ borderColor: 'rgba(245, 166, 35, 0.25)' }}
      transition={springSnappy}
    >
      <div
        style={{
          padding: '22px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: colors.text, lineHeight: 1.4 }}>{question}</span>
        <ChevronIcon open={open} />
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ ...spring, opacity: { duration: 0.2 } }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{ margin: 0, padding: '0 28px 22px', fontSize: 14, lineHeight: 1.75, color: colors.textMuted }}>
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── DATA ─── */

const channels = [
  {
    name: 'Idealista / Fotocasa',
    desc: 'Descripcion optimizada para portales inmobiliarios con las keywords que posicionan',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 4l9 5.5" />
        <path d="M19 13v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-6" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    desc: 'Caption con hashtags estrategicos para maximo engagement en tu feed',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill={colors.accent} stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Email Marketing',
    desc: 'Email profesional con subject line listo para enviar a tu cartera de clientes',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 6l10 7 10-7" />
      </svg>
    ),
  },
  {
    name: 'English Version',
    desc: 'Traduccion nativa para compradores internacionales, no Google Translate',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
    desc: 'Tipo, metros, zona, precio y los puntos fuertes que quieras destacar',
  },
  {
    num: '02',
    title: 'Dale a generar',
    desc: '4 textos optimizados para cada canal en menos de 10 segundos',
  },
  {
    num: '03',
    title: 'Copia y publica',
    desc: 'Pega directamente en Idealista, Instagram, tu email o donde necesites',
  },
];

const testimonials = [
  {
    name: 'Laura Martinez',
    agency: 'Fincas Martinez',
    city: 'Barcelona',
    initials: 'LM',
    text: 'Antes tardaba casi una hora en redactar los textos de un piso nuevo. Ahora lo tengo todo en segundos y puedo dedicar ese tiempo a captar mas propiedades.',
  },
  {
    name: 'Carlos Ruiz',
    agency: 'Inmobiliaria Costa Sol',
    city: 'Malaga',
    initials: 'CR',
    text: 'El contenido para Instagram me ha cambiado el juego. Mis publicaciones ahora consiguen el doble de interacciones y recibo mas consultas directas.',
  },
  {
    name: 'Marta Soler',
    agency: 'Grupo Habitat',
    city: 'Valencia',
    initials: 'MS',
    text: 'La version en ingles es brutal para los clientes extranjeros. Ya no necesito traductora. Lo que genera InnoPilot suena completamente natural.',
  },
];

const faqs = [
  {
    q: 'Necesito conocimientos tecnicos?',
    a: 'No, para nada. Si sabes rellenar un formulario, sabes usar InnoPilot. Introduces los datos del piso, pulsas un boton y el contenido se genera solo.',
  },
  {
    q: 'Funciona para cualquier tipo de propiedad?',
    a: 'Si. Pisos, casas, aticos, duplex, estudios, chalets, locales comerciales... InnoPilot se adapta al tipo de propiedad y genera contenido especifico para cada uno.',
  },
  {
    q: 'El contenido generado es unico?',
    a: 'Si, cada generacion es completamente unica. Nunca veras dos textos iguales aunque metas los mismos datos, porque se adapta al contexto y puntos fuertes de cada propiedad.',
  },
  {
    q: 'Puedo cancelar cuando quiera?',
    a: 'Por supuesto. No hay permanencia ni compromiso. Puedes cancelar tu suscripcion en cualquier momento y seguiras teniendo acceso hasta el final del periodo pagado.',
  },
  {
    q: 'En que idiomas genera contenido?',
    a: 'Actualmente genera en espanol (para portales, Instagram y email) y en ingles (para compradores internacionales). Estamos trabajando en anadir frances, aleman y holandes proximamente.',
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

const stats = [
  { value: '10s', label: 'por generacion' },
  { value: '4', label: 'canales a la vez' },
  { value: '2x', label: 'mas engagement' },
];

/* ─── COMPONENT ─── */

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const { scrollYProgress } = useScroll();
  const navBg = useTransform(scrollYProgress, [0, 0.05], ['rgba(8, 8, 10, 0)', 'rgba(8, 8, 10, 0.88)']);
  const navBorder = useTransform(scrollYProgress, [0, 0.05], ['rgba(245, 166, 35, 0)', 'rgba(245, 166, 35, 0.08)']);

  return (
    <div style={{ background: colors.bg, minHeight: '100vh', fontFamily: "'Cabinet Grotesk', system-ui, sans-serif", color: colors.text }}>

      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* ─── NAVBAR ─── */}
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: navBg,
          backdropFilter: 'blur(24px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.2)',
          borderBottom: '1px solid',
          borderColor: navBorder,
        }}
      >
        <div
          style={{
            ...sectionStyle,
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={logo} alt="InnoPilot" style={{ height: 30, width: 30, borderRadius: 7 }} />
            <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.03em' }}>
              <span style={{ color: colors.text }}>Inno</span>
              <span className="gradient-text">Pilot</span>
            </span>
          </Link>
          <Link
            to="/app"
            style={{
              ...btnGold,
              fontSize: 13,
              padding: '10px 24px',
              fontWeight: 700,
            }}
          >
            Probar gratis
          </Link>
        </div>
      </motion.nav>

      {/* ─── HERO ─── */}
      <section style={{ paddingTop: 160, paddingBottom: 140, position: 'relative', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div className="hero-glow" style={{ top: '-200px', left: '50%', transform: 'translateX(-50%)' }} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerSlow}
          style={{
            ...sectionStyle,
            maxWidth: 820,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px 6px 8px',
              borderRadius: 999,
              border: `1px solid ${colors.border}`,
              background: 'rgba(245, 166, 35, 0.04)',
              fontSize: 13,
              fontWeight: 600,
              color: colors.textSoft,
            }}
          >
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)',
            }} />
            Marketing inmobiliario con IA
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 700,
              color: colors.text,
              lineHeight: 1.08,
              fontSize: 'clamp(36px, 5.5vw, 60px)',
              margin: 0,
              maxWidth: 750,
              letterSpacing: '-0.03em',
            }}
          >
            De piso captado a{' '}
            <span style={{ fontStyle: 'italic', color: colors.accent }}>publicado</span>
            {' '}en 10 segundos
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            style={{
              color: colors.textMuted,
              fontSize: 'clamp(16px, 2vw, 19px)',
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 560,
              fontWeight: 400,
            }}
          >
            Genera descripciones para Idealista, posts para Instagram, emails profesionales y version en ingles. Todo con un click.
          </motion.p>

          <motion.div variants={fadeInUp} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              to="/app"
              style={{
                ...btnGold,
                fontSize: 16,
                padding: '0 36px',
                height: 56,
                letterSpacing: '-0.01em',
                boxShadow: '0 4px 24px rgba(245, 166, 35, 0.25), 0 0 60px rgba(245, 166, 35, 0.08)',
              }}
            >
              Empezar gratis
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            style={{
              color: colors.textFaint,
              fontSize: 13,
              margin: 0,
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            Sin tarjeta de credito &middot; 5 generaciones gratis
          </motion.p>

          {/* Stats bar */}
          <motion.div
            variants={fadeInUp}
            style={{
              display: 'flex',
              gap: 1,
              marginTop: 24,
              borderRadius: 16,
              overflow: 'hidden',
              border: `1px solid ${colors.border}`,
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '20px 36px',
                  textAlign: 'center',
                  background: colors.surface,
                  borderRight: i < stats.length - 1 ? `1px solid ${colors.border}` : 'none',
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800, color: colors.accent, lineHeight: 1, letterSpacing: '-0.03em' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 6, fontWeight: 500, letterSpacing: '0.02em' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── 4 CANALES ─── */}
      <section style={{ paddingBottom: 140 }}>
        <div style={sectionStyle}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <motion.p variants={fadeInUp} style={sectionLabel}>Canales</motion.p>
            <motion.h2 variants={fadeInUp} style={sectionTitle}>
              4 canales, una sola generacion
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1.2fr',
              gap: 16,
            }}
            className="channels-grid"
          >
            {channels.map((ch, i) => (
              <motion.div
                key={ch.name}
                variants={fadeInScale}
                className="card-shine"
                whileHover={{ y: -4, borderColor: 'rgba(245, 166, 35, 0.3)' }}
                transition={springSnappy}
                style={{
                  ...cardBase,
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  ...(i === 0 || i === 3 ? { borderTop: `2px solid rgba(245, 166, 35, 0.3)` } : {}),
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: 'rgba(245, 166, 35, 0.06)',
                    border: `1px solid ${colors.borderLight}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {ch.icon}
                </div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: colors.text, letterSpacing: '-0.01em' }}>{ch.name}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: colors.textMuted }}>{ch.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA ─── */}
      <section style={{ paddingBottom: 140 }}>
        <div style={sectionStyle}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <motion.p variants={fadeInUp} style={sectionLabel}>Proceso</motion.p>
            <motion.h2 variants={fadeInUp} style={sectionTitle}>
              Tres pasos. Diez segundos.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
              position: 'relative',
            }}
            className="steps-grid"
          >
            {steps.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                variants={fadeInUp}
                className="card-shine"
                whileHover={{ y: -4 }}
                transition={springSnappy}
                style={{
                  ...cardBase,
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  position: 'relative',
                }}
              >
                {/* Step number as large watermark */}
                <span style={{
                  position: 'absolute',
                  top: 16,
                  right: 20,
                  fontSize: 64,
                  fontWeight: 800,
                  color: 'rgba(245, 166, 35, 0.04)',
                  lineHeight: 1,
                  letterSpacing: '-0.05em',
                  fontFamily: "'Cabinet Grotesk', system-ui",
                }}>
                  {num}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: colors.accent,
                    background: 'rgba(245, 166, 35, 0.08)',
                    padding: '5px 14px',
                    borderRadius: 8,
                    alignSelf: 'flex-start',
                    letterSpacing: '1.5px',
                  }}
                >
                  PASO {num}
                </span>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: colors.text, letterSpacing: '-0.02em' }}>{title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: colors.textMuted }}>{desc}</p>
                {i < steps.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    right: -12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(245, 166, 35, 0.2)',
                    zIndex: 2,
                    display: 'none',
                  }} className="step-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── ANTES / DESPUES ─── */}
      <section style={{ paddingBottom: 140 }}>
        <div style={sectionStyle}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <motion.p variants={fadeInUp} style={sectionLabel}>Comparativa</motion.p>
            <motion.h2 variants={fadeInUp} style={sectionTitle}>
              El cambio es <span style={{ fontStyle: 'italic' }}>brutal</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: '0.9fr 1.1fr',
              gap: 16,
              maxWidth: 820,
              margin: '0 auto',
            }}
            className="comparison-grid"
          >
            {/* ANTES */}
            <motion.div
              variants={fadeInUp}
              style={{
                ...cardBase,
                padding: '32px 28px',
                borderTop: '2px solid rgba(239, 68, 68, 0.4)',
                background: 'rgba(239, 68, 68, 0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'rgba(239, 68, 68, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><path d="M15 9l-6 6M9 9l6 6" />
                  </svg>
                </div>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'rgba(239, 68, 68, 0.7)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                  Sin InnoPilot
                </h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  '45 min escribiendo cada piso',
                  'Copiar y pegar entre portales',
                  'Descripciones genericas y repetitivas',
                  'Sin version en ingles',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: 'rgba(245, 245, 240, 0.45)', lineHeight: 1.5 }}>
                    <span style={{ marginTop: 2, flexShrink: 0 }}><CrossIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* DESPUES */}
            <motion.div
              variants={fadeInUp}
              style={{
                ...cardBase,
                padding: '32px 28px',
                borderTop: `2px solid ${colors.accent}`,
                background: 'rgba(245, 166, 35, 0.02)',
                boxShadow: '0 0 60px rgba(245, 166, 35, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'rgba(245, 166, 35, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round">
                    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
                  </svg>
                </div>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: colors.accent, textTransform: 'uppercase', letterSpacing: '2px' }}>
                  Con InnoPilot
                </h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
                {[
                  '10 segundos por piso, no 45 minutos',
                  '4 canales generados a la vez',
                  'Contenido personalizado y unico',
                  'Ingles nativo automatico',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: colors.text, lineHeight: 1.5 }}>
                    <span style={{ marginTop: 2, flexShrink: 0 }}><CheckIcon /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIOS ─── */}
      <section style={{ paddingBottom: 140 }}>
        <div style={sectionStyle}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <motion.p variants={fadeInUp} style={sectionLabel}>Testimonios</motion.p>
            <motion.h2 variants={fadeInUp} style={sectionTitle}>
              Lo que dicen los agentes
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr 1fr',
              gap: 16,
            }}
            className="testimonials-grid"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                className="card-shine"
                whileHover={{ y: -3 }}
                transition={springSnappy}
                style={{
                  ...cardBase,
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  ...(i === 0 ? { marginTop: 0 } : i === 1 ? { marginTop: 24 } : { marginTop: 8 }),
                }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: 2 }}>
                  {[...Array(5)].map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill={colors.accent} stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                    </svg>
                  ))}
                </div>

                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: 'rgba(245, 245, 240, 0.55)', flex: 1 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 4, borderTop: `1px solid ${colors.borderLight}` }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: 'rgba(245, 166, 35, 0.08)',
                      border: `1px solid ${colors.borderLight}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 800,
                      color: colors.accent,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: colors.text }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: colors.textMuted }}>{t.agency} &middot; {t.city}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section style={{ paddingBottom: 140 }}>
        <div style={sectionStyle}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <motion.p variants={fadeInUp} style={sectionLabel}>Precios</motion.p>
            <motion.h2 variants={fadeInUp} style={sectionTitle}>
              Planes simples, sin sorpresas
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
              maxWidth: 980,
              margin: '0 auto',
              alignItems: 'stretch',
            }}
            className="pricing-grid"
          >
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                whileHover={!plan.highlighted ? { y: -4 } : {}}
                transition={springSnappy}
                style={{
                  ...cardBase,
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                  position: 'relative',
                  ...(plan.highlighted
                    ? {
                        border: `1.5px solid ${colors.accent}`,
                        boxShadow: '0 0 60px rgba(245, 166, 35, 0.08), 0 0 120px rgba(245, 166, 35, 0.04)',
                        transform: 'scale(1.03)',
                        zIndex: 2,
                      }
                    : {}),
                }}
              >
                {plan.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -13,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: gradientGold,
                      color: '#0a0a0a',
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '5px 18px',
                      borderRadius: 999,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 style={{ margin: '0 0 14px', fontSize: 16, fontWeight: 600, color: colors.textMuted, letterSpacing: '0.02em' }}>
                    {plan.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 48, fontWeight: 800, color: colors.text, lineHeight: 1, letterSpacing: '-0.04em' }}>{plan.price}</span>
                    <span style={{ fontSize: 20, fontWeight: 700, color: colors.text, lineHeight: 1 }}>&euro;</span>
                    <span style={{ fontSize: 14, color: colors.textMuted, marginLeft: 2 }}>{plan.period}</span>
                  </div>
                </div>

                <div style={{ height: 1, background: colors.border }} />

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
                  {plan.features.map((feat) => (
                    <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: colors.textSoft }}>
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
                      height: 50,
                      fontSize: 15,
                      fontWeight: 700,
                      ...(plan.highlighted ? { boxShadow: '0 4px 24px rgba(245, 166, 35, 0.2)' } : {}),
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
                      height: 50,
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
      <section style={{ paddingBottom: 140 }}>
        <div style={{ ...sectionStyle, maxWidth: 680 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <motion.p variants={fadeInUp} style={sectionLabel}>FAQ</motion.p>
            <motion.h2 variants={fadeInUp} style={sectionTitle}>
              Preguntas frecuentes
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
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
      <section style={{ paddingBottom: 140 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          style={{
            ...sectionStyle,
            maxWidth: 720,
            textAlign: 'center',
          }}
        >
          <motion.div
            variants={fadeInUp}
            style={{
              ...cardBase,
              padding: '56px 40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 28,
              background: 'linear-gradient(180deg, rgba(245, 166, 35, 0.04) 0%, rgba(8, 8, 10, 0) 100%)',
              borderTop: `2px solid rgba(245, 166, 35, 0.3)`,
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                color: colors.text,
                lineHeight: 1.1,
                fontSize: 'clamp(26px, 3.5vw, 38px)',
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Deja de perder tiempo{' '}
              <span style={{ fontStyle: 'italic', color: colors.accent }}>escribiendo</span>
            </h2>

            <p
              style={{
                color: colors.textMuted,
                fontSize: 'clamp(15px, 1.8vw, 17px)',
                lineHeight: 1.7,
                margin: 0,
                maxWidth: 440,
              }}
            >
              Unete a los agentes que ya generan contenido profesional en segundos
            </p>

            <Link
              to="/app"
              style={{
                ...btnGold,
                fontSize: 16,
                padding: '0 40px',
                height: 56,
                boxShadow: '0 4px 24px rgba(245, 166, 35, 0.25), 0 0 60px rgba(245, 166, 35, 0.08)',
              }}
            >
              Empezar gratis
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
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
              background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)`,
              marginBottom: 32,
            }}
          />
          <div style={{ textAlign: 'center', fontSize: 13, color: colors.textFaint, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <img src={logo} alt="" style={{ height: 18, width: 18, borderRadius: 4, opacity: 0.6 }} />
            <span>
              <span style={{ color: colors.textMuted, fontWeight: 500 }}>Inno</span>
              <span style={{ color: 'rgba(245, 166, 35, 0.5)', fontWeight: 500 }}>Pilot</span>
              {' '}v1.0 &middot; Built by @alanteixido
            </span>
          </div>
        </div>
      </footer>

      {/* ─── RESPONSIVE OVERRIDES ─── */}
      <style>{`
        @media (max-width: 768px) {
          .channels-grid { grid-template-columns: 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .comparison-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid > * { margin-top: 0 !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .pricing-grid > *:nth-child(2) { transform: none !important; }
        }
        @media (max-width: 480px) {
          .channels-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
