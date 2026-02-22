import { useState, useCallback } from 'react';
import { DEFAULT_840 } from '../../constants/services';
import { generateZPL840 } from '../../utils/zplGenerator';
import LabelForm from './LabelForm';
import LabelPreview from './LabelPreview';

export default function Label840() {
  const [data, setData] = useState(DEFAULT_840);
  const [showZpl, setShowZpl] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [copied, setCopied] = useState(false);

  const update = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const zplCode = generateZPL840(data);

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
    a.download = `nacex-840-${data.ref_cms || 'label'}.zpl`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printLabel = () => {
    const w = window.open('', '_blank', 'width=500,height=700');
    w.document.write(`
      <html><head><title>Etiqueta Nacex 840</title>
      <style>body{margin:0;display:flex;justify-content:center;padding:20px;} @media print{body{padding:0;}}</style>
      </head><body>
      <div id="label"></div>
      <script>window.onload=function(){window.print();}<\/script>
      </body></html>
    `);
    w.document.close();
  };

  return (
    <div style={styles.wrapper}>
      {/* ═══ TOOLBAR ═══ */}
      <div style={styles.toolbar}>
        <div style={styles.toolbarLeft}>
          <span style={styles.badge840}>840</span>
          <span style={styles.toolbarTitle}>Etiqueta Estándar</span>
        </div>
        <div style={styles.toolbarRight}>
          <button style={styles.btnGhost} onClick={() => setShowZpl(!showZpl)}>
            {showZpl ? '◀ Preview' : 'ZPL ▸'}
          </button>
          <button style={styles.btnGhost} onClick={copyZpl}>
            {copied ? '✓ Copiado' : '📋 Copiar ZPL'}
          </button>
          <button style={styles.btnAccent} onClick={downloadZpl}>
            ⬇ Descargar .zpl
          </button>
        </div>
      </div>

      <div style={styles.layout}>
        {/* Form */}
        <LabelForm data={data} update={update} zoom={zoom} setZoom={setZoom} />

        {/* Preview / ZPL */}
        <main style={styles.main}>
          {!showZpl ? (
            <div style={styles.previewWrap}>
              <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
                <LabelPreview data={data} />
              </div>
            </div>
          ) : (
            <div style={styles.zplWrap}>
              <div style={styles.zplHeader}>
                <span style={styles.zplTitle}>Código ZPL generado</span>
                <span style={styles.zplChars}>{zplCode.length} caracteres</span>
              </div>
              <pre style={styles.zplCode}>{zplCode}</pre>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
    height: 44,
    background: 'var(--surface)',
    borderBottom: '1px solid var(--border)',
    flexShrink: 0,
  },
  toolbarLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  toolbarRight: { display: 'flex', alignItems: 'center', gap: 6 },
  toolbarTitle: { fontSize: 13, fontWeight: 600, color: 'var(--text)' },
  badge840: {
    fontSize: 11,
    fontWeight: 800,
    background: 'var(--nacex)',
    color: 'white',
    padding: '2px 8px',
    borderRadius: 4,
    letterSpacing: 1,
  },
  btnGhost: {
    padding: '5px 12px',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    background: 'transparent',
    color: 'var(--muted)',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  btnAccent: {
    padding: '5px 12px',
    borderRadius: 'var(--radius-sm)',
    border: 'none',
    background: 'var(--nacex)',
    color: 'white',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  layout: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    overflow: 'auto',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 24,
    background: 'repeating-conic-gradient(#0f0f13 0% 25%, #141418 0% 50%) 50% / 20px 20px',
  },
  previewWrap: { display: 'flex', justifyContent: 'center' },
  zplWrap: { flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 800, width: '100%' },
  zplHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  zplTitle: { fontSize: 16, fontWeight: 700 },
  zplChars: { fontSize: 11, color: 'var(--muted)' },
  zplCode: {
    flex: 1,
    background: 'var(--card)',
    color: '#a6e3a1',
    padding: 16,
    borderRadius: 'var(--radius)',
    fontSize: 12,
    fontFamily: 'var(--mono)',
    overflow: 'auto',
    lineHeight: 1.6,
    border: '1px solid var(--border)',
    whiteSpace: 'pre-wrap',
    margin: 0,
  },
};
