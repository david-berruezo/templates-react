import { useState } from 'react';
import { LABEL_TYPES } from './constants/services';
import Label840 from './components/Label840';

export default function App() {
  const [activeLabel, setActiveLabel] = useState('840');
  const [showNav, setShowNav] = useState(false);

  return (
    <div style={styles.app}>
      {/* ═══ HEADER ═══ */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <button style={styles.menuBtn} onClick={() => setShowNav(!showNav)}>
            {showNav ? '✕' : '☰'}
          </button>
          <span style={styles.logo}>
            NACEX<span style={styles.logoAccent}>Label</span>
            <span style={styles.logoSub}>Studio</span>
          </span>
        </div>
        <div style={styles.headerCenter}>
          {LABEL_TYPES.filter(l => l.status === 'ready').map(l => (
            <button
              key={l.id}
              onClick={() => { setActiveLabel(l.id); setShowNav(false); }}
              style={{
                ...styles.navPill,
                ...(activeLabel === l.id ? styles.navPillActive : {}),
              }}
            >
              <span>{l.icon}</span> {l.name}
            </button>
          ))}
        </div>
        <div style={styles.headerRight}>
          <span style={styles.version}>v1.0.0</span>
        </div>
      </header>

      {/* ═══ SIDEBAR NAV (mobile / expanded) ═══ */}
      {showNav && (
        <div style={styles.navOverlay} onClick={() => setShowNav(false)}>
          <nav style={styles.navPanel} onClick={(e) => e.stopPropagation()}>
            <div style={styles.navTitle}>Plantillas</div>
            {LABEL_TYPES.map(l => (
              <button
                key={l.id}
                onClick={() => { setActiveLabel(l.id); setShowNav(false); }}
                disabled={l.status !== 'ready'}
                style={{
                  ...styles.navItem,
                  ...(activeLabel === l.id ? styles.navItemActive : {}),
                  ...(l.status !== 'ready' ? styles.navItemDisabled : {}),
                }}
              >
                <span style={styles.navIcon}>{l.icon}</span>
                <div style={styles.navItemText}>
                  <span style={styles.navItemName}>{l.name}</span>
                  <span style={styles.navItemDesc}>{l.desc}</span>
                </div>
                {l.status !== 'ready' && (
                  <span style={styles.soonBadge}>Próximamente</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* ═══ CONTENT ═══ */}
      <div style={styles.content}>
        {activeLabel === '840' && <Label840 />}

        {activeLabel !== '840' && (
          <div style={styles.placeholder}>
            <div style={styles.placeholderIcon}>
              {LABEL_TYPES.find(l => l.id === activeLabel)?.icon || '🏷️'}
            </div>
            <h2 style={styles.placeholderTitle}>
              {LABEL_TYPES.find(l => l.id === activeLabel)?.name || 'Etiqueta'}
            </h2>
            <p style={styles.placeholderDesc}>
              Esta plantilla estará disponible próximamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  app: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    height: 48,
    background: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
    flexShrink: 0,
    zIndex: 100,
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  headerCenter: { display: 'flex', gap: 4 },
  headerRight: { display: 'flex', alignItems: 'center' },
  menuBtn: {
    background: 'transparent',
    border: '1px solid var(--border)',
    color: 'var(--muted)',
    fontSize: 16,
    cursor: 'pointer',
    width: 32,
    height: 32,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'inherit',
  },
  logo: {
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: -0.5,
    color: 'var(--text)',
    userSelect: 'none',
  },
  logoAccent: { color: 'var(--nacex)' },
  logoSub: {
    fontSize: 11,
    fontWeight: 400,
    color: 'var(--muted)',
    marginLeft: 4,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  version: { fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--mono)' },
  navPill: {
    padding: '4px 12px',
    borderRadius: 20,
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--muted)',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontFamily: 'inherit',
  },
  navPillActive: {
    background: 'var(--nacex)',
    color: 'white',
    borderColor: 'var(--nacex)',
  },
  navOverlay: {
    position: 'fixed',
    inset: 0,
    top: 48,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 90,
    backdropFilter: 'blur(4px)',
  },
  navPanel: {
    width: 300,
    height: '100%',
    background: 'var(--surface)',
    borderRight: '1px solid var(--border)',
    padding: 16,
    overflowY: 'auto',
  },
  navTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: 'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    padding: '10px 12px',
    background: 'transparent',
    border: '1px solid transparent',
    borderRadius: 8,
    cursor: 'pointer',
    marginBottom: 4,
    fontFamily: 'inherit',
    textAlign: 'left',
    color: 'var(--text)',
  },
  navItemActive: {
    background: 'rgba(255, 80, 0, 0.1)',
    borderColor: 'var(--nacex)',
  },
  navItemDisabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
  },
  navIcon: { fontSize: 22 },
  navItemText: { flex: 1, display: 'flex', flexDirection: 'column' },
  navItemName: { fontSize: 13, fontWeight: 600 },
  navItemDesc: { fontSize: 11, color: 'var(--muted)' },
  soonBadge: {
    fontSize: 9,
    fontWeight: 700,
    background: 'var(--card)',
    color: 'var(--muted)',
    padding: '2px 8px',
    borderRadius: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 12,
  },
  placeholderIcon: { fontSize: 64 },
  placeholderTitle: { fontSize: 22, fontWeight: 700, margin: 0 },
  placeholderDesc: { fontSize: 14, color: 'var(--muted)', margin: 0 },
};
