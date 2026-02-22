/**
 * Componentes de formulario reutilizables
 */

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  flex: 1,
};

const labelStyle = {
  fontSize: 11,
  fontWeight: 600,
  color: 'var(--muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.3px',
};

const inputStyle = {
  background: 'var(--card)',
  color: 'var(--text)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  padding: '7px 10px',
  fontSize: 13,
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
  fontFamily: 'inherit',
};

export function Field({ label, value, onChange, type = 'text', placeholder = '' }) {
  return (
    <label style={fieldStyle}>
      <span style={labelStyle}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          ...inputStyle,
          ...(type === 'color' ? { height: 36, padding: 2, cursor: 'pointer' } : {}),
        }}
      />
    </label>
  );
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <label style={fieldStyle}>
      <span style={labelStyle}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={inputStyle}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

export function Checkbox({ label, checked, onChange }) {
  return (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 13,
      color: 'var(--text)',
      cursor: 'pointer',
      padding: '4px 0',
    }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ accentColor: 'var(--nacex)', width: 16, height: 16 }}
      />
      <span>{label}</span>
    </label>
  );
}

export function SectionTitle({ children }) {
  return (
    <h4 style={{
      fontSize: 12,
      fontWeight: 700,
      color: 'var(--muted)',
      marginBottom: -4,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    }}>
      {children}
    </h4>
  );
}

export function Separator() {
  return <div style={{ height: 1, background: 'var(--border)', margin: '6px 0' }} />;
}

export function Hint({ children }) {
  return <p style={{ fontSize: 11, color: 'var(--muted)', fontStyle: 'italic', margin: 0 }}>{children}</p>;
}

export function Row2({ children }) {
  return <div style={{ display: 'flex', gap: 10 }}>{children}</div>;
}

export function Row3({ children }) {
  return <div style={{ display: 'flex', gap: 8 }}>{children}</div>;
}
