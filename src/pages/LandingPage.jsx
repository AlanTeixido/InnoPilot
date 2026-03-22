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

/* ──────────────────────────── ICONS (inline SVG) ──────────────────────────── */

function ClipboardIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}

function SparklesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function ChannelsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function ToneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function AiIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4v1a1 1 0 0 0 1 1h1a4 4 0 0 1 0 8h-1a1 1 0 0 0-1 1v1a4 4 0 0 1-8 0v-1a1 1 0 0 0-1-1H6a4 4 0 0 1 0-8h1a1 1 0 0 0 1-1V6a4 4 0 0 1 4-4z" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ──────────────────────────── SHARED STYLES ──────────────────────────── */

const sectionTitle = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontWeight: 700,
  color: colors.text,
  lineHeight: 1.15,
};

const cardBase = {
  background: colors.surface,
  borderRadius: 16,
  border: `1px solid ${colors.border}`,
};

const btnGold = {
  background: gradientGold,
  color: '#08080a',
  fontWeight: 600,
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

/* ──────────────────────────── COMPONENT ──────────────────────────── */

export default function LandingPage() {
  const steps = [
    { num: '01', title: 'Rellena los datos', desc: 'Tipo de piso, metros, zona, precio y puntos fuertes', Icon: ClipboardIcon },
    { num: '02', title: 'Dale a generar', desc: 'La IA crea 4 contenidos optimizados en 10 segundos', Icon: SparklesIcon },
    { num: '03', title: 'Copia y publica', desc: 'Listo para Idealista, Instagram, email y más', Icon: RocketIcon },
  ];

  const features = [
    { title: '4 canales a la vez', desc: 'Idealista, Instagram, Email y versión en inglés en una sola generación', Icon: ChannelsIcon },
    { title: 'Tono personalizable', desc: 'Profesional, cercano, premium, emocional o directo. Tú eliges', Icon: ToneIcon },
    { title: 'Listo para copiar', desc: 'Cada contenido con botón de copiar. De InnoPilot a publicado en 2 clicks', Icon: CopyIcon },
    { title: 'IA de última generación', desc: 'Powered by Claude de Anthropic. Textos naturales que convierten', Icon: AiIcon },
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
            maxWidth: 1200,
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
            <span style={{ color: colors.text }}>Inno</span>
            <span style={{ color: colors.accent }}>Pilot</span>
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
      <section style={{ paddingTop: 140, paddingBottom: 100 }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{
            maxWidth: 800,
            margin: '0 auto',
            padding: '0 24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
          }}
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              borderRadius: 999,
              border: `1px solid ${colors.border}`,
              background: 'rgba(245, 166, 35, 0.06)',
              fontSize: 13,
              color: colors.accent,
              fontWeight: 500,
            }}
          >
            <span>&#10022;</span> Powered by Claude AI
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            style={{
              ...sectionTitle,
              fontSize: 'clamp(32px, 5vw, 52px)',
              margin: 0,
              maxWidth: 700,
            }}
          >
            De piso captado a publicado en 10 segundos
          </motion.h1>

          {/* Subtitle */}
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

          {/* CTA */}
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

          {/* Sub-CTA text */}
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

      {/* ─── HOW IT WORKS ─── */}
      <section style={{ padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            style={{
              ...sectionTitle,
              fontSize: 'clamp(28px, 4vw, 40px)',
              textAlign: 'center',
              marginBottom: 60,
            }}
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
            }}
          >
            {steps.map(({ num, title, desc, Icon }) => (
              <motion.div
                key={num}
                variants={fadeInUp}
                style={{
                  ...cardBase,
                  padding: 32,
                  borderTop: `2px solid ${colors.accent}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: colors.accent,
                      background: 'rgba(245, 166, 35, 0.1)',
                      padding: '6px 14px',
                      borderRadius: 8,
                    }}
                  >
                    {num}
                  </span>
                  <Icon />
                </div>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: colors.text }}>{title}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: colors.textMuted }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{ padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            style={{
              ...sectionTitle,
              fontSize: 'clamp(28px, 4vw, 40px)',
              textAlign: 'center',
              marginBottom: 60,
            }}
          >
            Todo lo que necesitas
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
              maxWidth: 900,
              margin: '0 auto',
            }}
          >
            {features.map(({ title, desc, Icon }) => (
              <motion.div
                key={title}
                variants={fadeInUp}
                style={{
                  ...cardBase,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: 'rgba(245, 166, 35, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon />
                </div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: colors.text }}>{title}</h3>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: colors.textMuted }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section style={{ padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            style={{
              ...sectionTitle,
              fontSize: 'clamp(28px, 4vw, 40px)',
              textAlign: 'center',
              marginBottom: 60,
            }}
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 24,
              maxWidth: 960,
              margin: '0 auto',
              alignItems: 'stretch',
            }}
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeInUp}
                style={{
                  ...cardBase,
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                  position: 'relative',
                  ...(plan.highlighted
                    ? {
                        border: `1.5px solid ${colors.accent}`,
                        boxShadow: `0 0 40px rgba(245, 166, 35, 0.12), 0 0 80px rgba(245, 166, 35, 0.06)`,
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
                      color: '#08080a',
                      fontSize: 12,
                      fontWeight: 700,
                      padding: '5px 16px',
                      borderRadius: 999,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: colors.textMuted, marginBottom: 12 }}>
                    {plan.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontSize: 48, fontWeight: 700, color: colors.text, lineHeight: 1 }}>{plan.price}&#8364;</span>
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

      {/* ─── FINAL CTA ─── */}
      <section style={{ padding: '80px 24px 100px' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          style={{
            maxWidth: 700,
            margin: '0 auto',
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
              ...sectionTitle,
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
              Probar InnoPilot gratis &rarr;
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ padding: '0 24px 48px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Golden gradient divider */}
          <div
            style={{
              height: 1,
              background: gradientGold,
              opacity: 0.3,
              marginBottom: 32,
            }}
          />

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
              fontSize: 13,
              color: colors.textMuted,
            }}
          >
            <span>
              <span style={{ color: colors.text, fontWeight: 500 }}>Inno</span>
              <span style={{ color: colors.accent, fontWeight: 500 }}>Pilot</span>
              {' '}v1.0 &middot; Built by @alanteixido
            </span>
            <span>Powered by Claude API &middot; Anthropic</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
