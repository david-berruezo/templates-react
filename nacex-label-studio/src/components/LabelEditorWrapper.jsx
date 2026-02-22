import { useState } from 'react';

/**
 * Wrapper genérico para todos los editores de etiquetas.
 * Proporciona: toolbar con ZPL/copiar/descargar, layout form+preview, vista ZPL.
 */
export default function LabelEditorWrapper({ id, title, color = 'var(--nacex)', children, zplCode, filename }) {
  const [showZpl, setShowZpl] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyZpl = () => {
    navigator.clipboard.writeText(zplCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadZpl = () => {
    const blob = new Blob([zplCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `nacex-${id}.zpl`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={S.wrapper}>
      <div style={S.toolbar}>
        <div style={S.toolbarLeft}>
          <span style={{ ...S.badge, background: color }}>{id}</span>
          <span style={S.title}>{title}</span>
        </div>
        <div style={S.toolbarRight}>
          <button style={S.btnGhost} onClick={() => setShowZpl(!showZpl)}>
            {showZpl ? '◀ Preview' : 'ZPL ▸'}
          </button>
          <button style={S.btnGhost} onClick={copyZpl}>
            {copied ? '✓ Copiado' : '📋 Copiar ZPL'}
          </button>
          <button style={{ ...S.btnAccent, background: color }} onClick={downloadZpl}>
            ⬇ Descargar .zpl
          </button>
        </div>
      </div>
      <div style={S.layout}>
        {!showZpl ? (
          children
        ) : (
          <>
            {/* Keep sidebar but show ZPL in main */}
            {Array.isArray(children) ? children[0] : null}
            <main style={S.main}>
              <div style={S.zplWrap}>
                <div style={S.zplHeader}>
                  <span style={S.zplTitle}>Código ZPL generado</span>
                  <span style={S.zplChars}>{zplCode.length} caracteres</span>
                </div>
                <pre style={S.zplCode}>{zplCode}</pre>
              </div>
            </main>
          </>
        )}
      </div>
    </div>
  );
}

const S = {
  wrapper: { display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' },
  toolbar: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 16px', height: 44, background: 'var(--surface)',
    borderBottom: '1px solid var(--border)', flexShrink: 0,
  },
  toolbarLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  toolbarRight: { display: 'flex', alignItems: 'center', gap: 6 },
  title: { fontSize: 13, fontWeight: 600 },
  badge: {
    fontSize: 11, fontWeight: 800, color: 'white',
    padding: '2px 8px', borderRadius: 4, letterSpacing: 1,
  },
  btnGhost: {
    padding: '5px 12px', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)', background: 'transparent',
    color: 'var(--muted)', fontSize: 12, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'inherit',
  },
  btnAccent: {
    padding: '5px 12px', borderRadius: 'var(--radius-sm)',
    border: 'none', color: 'white', fontSize: 12, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'inherit',
  },
  layout: { display: 'flex', flex: 1, overflow: 'hidden' },
  main: {
    flex: 1, overflow: 'auto', display: 'flex',
    alignItems: 'flex-start', justifyContent: 'center', padding: 24,
    background: 'repeating-conic-gradient(#0f0f13 0% 25%, #141418 0% 50%) 50% / 20px 20px',
  },
  zplWrap: { flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 800, width: '100%' },
  zplHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  zplTitle: { fontSize: 16, fontWeight: 700 },
  zplChars: { fontSize: 11, color: 'var(--muted)' },
  zplCode: {
    flex: 1, background: 'var(--card)', color: '#a6e3a1', padding: 16,
    borderRadius: 'var(--radius)', fontSize: 12, fontFamily: 'var(--mono)',
    overflow: 'auto', lineHeight: 1.6, border: '1px solid var(--border)',
    whiteSpace: 'pre-wrap', margin: 0,
  },
};
