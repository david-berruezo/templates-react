import { ESTADOS } from '../data/constants';

export function StatusBadge({ estado, size = 'sm' }) {
  const e = ESTADOS[estado] || { name: '?', color: 'var(--text-secondary)', bg: 'var(--card)', icon: '?' };
  const isSm = size === 'sm';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: isSm ? 4 : 6,
      padding: isSm ? '2px 8px' : '4px 12px',
      borderRadius: 20, fontSize: isSm ? 11 : 13, fontWeight: 700,
      color: e.color, background: e.bg, whiteSpace: 'nowrap',
    }}>
      <span>{e.icon}</span> {e.name}
    </span>
  );
}

export function StatCard({ label, value, sub, color = 'var(--nacex)', icon }) {
  return (
    <div style={{
      background: 'var(--card)', borderRadius: 'var(--radius)', padding: '18px 20px',
      border: '1px solid var(--border)', flex: 1, minWidth: 150,
      borderLeft: `3px solid ${color}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</span>
        {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Buscar...' }) {
  return (
    <div style={{ position: 'relative' }}>
      <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: 'var(--text-secondary)' }}>🔍</span>
      <input
        value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{
          background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', padding: '8px 10px 8px 32px', fontSize: 13,
          width: '100%', outline: 'none', transition: 'border-color 0.15s',
        }}
      />
    </div>
  );
}

export function FilterSelect({ value, onChange, options, placeholder }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)', padding: '8px 10px', fontSize: 12, outline: 'none',
      minWidth: 130,
    }}>
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export function Btn({ children, onClick, variant = 'ghost', color, style: extra }) {
  const base = {
    padding: '7px 14px', borderRadius: 'var(--radius-sm)', fontSize: 12, fontWeight: 600,
    display: 'inline-flex', alignItems: 'center', gap: 5, border: 'none',
  };
  const variants = {
    ghost: { ...base, background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border)' },
    primary: { ...base, background: color || 'var(--nacex)', color: '#fff' },
    soft: { ...base, background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--border)' },
  };
  return <button onClick={onClick} style={{ ...variants[variant], ...extra }}>{children}</button>;
}
