import { useState, useMemo, lazy, Suspense } from 'react';
import { generateExpeditions } from './data/mockData';

const DashboardView = lazy(() => import('./views/DashboardView'));
const TableView = lazy(() => import('./views/TableView'));
const KanbanView = lazy(() => import('./views/KanbanView'));
const TrackingView = lazy(() => import('./views/TrackingView'));

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'table', label: 'Expediciones', icon: '📋' },
  { id: 'kanban', label: 'Kanban', icon: '🗂️' },
  { id: 'tracking', label: 'Tracking', icon: '📍' },
];

export default function App() {
  const [view, setView] = useState('dashboard');
  const [selectedExp, setSelectedExp] = useState(null);
  const expeditions = useMemo(() => generateExpeditions(80), []);

  const handleSelect = (exp) => {
    setSelectedExp(exp);
    setView('tracking');
  };

  const handleBack = () => {
    setView('table');
    setSelectedExp(null);
  };

  return (
    <div style={S.app}>
      {/* Sidebar */}
      <aside style={S.sidebar}>
        <div style={S.logoArea}>
          <span style={S.logo}>N<span style={S.logoAccent}>X</span></span>
          <div style={S.logoText}>
            <span style={S.logoTitle}>Nacex</span>
            <span style={S.logoSub}>Dashboard</span>
          </div>
        </div>

        <nav style={S.nav}>
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => setView(n.id)}
              style={{ ...S.navItem, ...(view === n.id ? S.navActive : {}) }}
            >
              <span style={S.navIcon}>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        <div style={S.sidebarFooter}>
          <div style={S.statMini}>
            <span style={S.statMiniLabel}>Expediciones</span>
            <span style={S.statMiniVal}>{expeditions.length}</span>
          </div>
          <div style={S.statMini}>
            <span style={S.statMiniLabel}>En tránsito</span>
            <span style={{ ...S.statMiniVal, color: 'var(--blue)' }}>
              {expeditions.filter(e => e.estado === 2 || e.estado === 3).length}
            </span>
          </div>
          <div style={S.version}>v1.0.0 · Mock data</div>
        </div>
      </aside>

      {/* Main */}
      <div style={S.main}>
        {/* Top bar */}
        <header style={S.topbar}>
          <div style={S.topLeft}>
            <h1 style={S.viewTitle}>
              {NAV.find(n => n.id === view)?.icon} {NAV.find(n => n.id === view)?.label}
            </h1>
          </div>
          <div style={S.topRight}>
            <span style={S.clock}>{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </header>

        {/* Content */}
        <div style={S.content}>
          <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>Cargando...</div>}>
            {view === 'dashboard' && <DashboardView expeditions={expeditions} />}
            {view === 'table' && <TableView expeditions={expeditions} onSelect={handleSelect} />}
            {view === 'kanban' && <KanbanView expeditions={expeditions} onSelect={handleSelect} />}
            {view === 'tracking' && <TrackingView expedition={selectedExp} onBack={handleBack} />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

const S = {
  app: { display: 'flex', height: '100vh', overflow: 'hidden' },
  // Sidebar
  sidebar: {
    width: 200, minWidth: 200, display: 'flex', flexDirection: 'column',
    background: 'var(--surface)', borderRight: '1px solid var(--border)',
  },
  logoArea: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '18px 16px',
    borderBottom: '1px solid var(--border)',
  },
  logo: {
    fontSize: 24, fontWeight: 900, background: 'var(--nacex)', color: '#fff',
    width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
    borderRadius: 8,
  },
  logoAccent: { fontSize: 18, fontWeight: 400, opacity: 0.8 },
  logoText: { display: 'flex', flexDirection: 'column' },
  logoTitle: { fontSize: 15, fontWeight: 800, letterSpacing: -0.3 },
  logoSub: { fontSize: 10, color: 'var(--text-secondary)', letterSpacing: 0.5, textTransform: 'uppercase' },
  nav: { flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 },
  navItem: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
    background: 'transparent', border: 'none', borderRadius: 'var(--radius-sm)',
    color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600, textAlign: 'left',
    width: '100%',
  },
  navActive: {
    background: 'var(--nacex-glow)', color: 'var(--nacex)',
    boxShadow: 'inset 3px 0 0 var(--nacex)',
  },
  navIcon: { fontSize: 16, width: 20, textAlign: 'center' },
  sidebarFooter: {
    padding: '12px 16px', borderTop: '1px solid var(--border)',
    display: 'flex', flexDirection: 'column', gap: 6,
  },
  statMini: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  statMiniLabel: { fontSize: 10, color: 'var(--text-secondary)' },
  statMiniVal: { fontSize: 14, fontWeight: 800, fontFamily: 'var(--mono)' },
  version: { fontSize: 9, color: 'var(--text-secondary)', textAlign: 'center', marginTop: 4, fontFamily: 'var(--mono)' },
  // Main
  main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  topbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0 20px', height: 50, borderBottom: '1px solid var(--border)',
    background: 'var(--bg-raised)', flexShrink: 0,
  },
  topLeft: { display: 'flex', alignItems: 'center', gap: 12 },
  topRight: { display: 'flex', alignItems: 'center', gap: 12 },
  viewTitle: { fontSize: 16, fontWeight: 700, margin: 0 },
  clock: { fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 },
  content: { flex: 1, overflow: 'hidden' },
};
