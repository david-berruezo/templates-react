import { useState, useCallback } from 'react';
import { DEFAULT_841, SERVICIOS, PORTES } from '../../constants/services';
import { generateZPL841 } from '../../utils/zplGenerator';
import { Field, SelectField, Row2, Hint, Separator, SectionTitle } from '../FormFields';
import LabelEditorWrapper from '../LabelEditorWrapper';
import BarcodeCanvas from '../BarcodeCanvas';

export default function Label841() {
  const [data, setData] = useState(DEFAULT_841);
  const [zoom, setZoom] = useState(100);
  const update = useCallback((f, v) => setData(p => ({ ...p, [f]: v })), []);
  const svc = SERVICIOS[data.servicio] || {};
  const zpl = generateZPL841(data);

  return (
    <LabelEditorWrapper id="841" title="Diana — Bulto Extra" color="#9C27B0" zplCode={zpl} filename={`nacex-841-${data.ref_cms}.zpl`}>
      {/* FORM */}
      <aside style={S.sidebar}>
        <div style={S.form}>
          <SectionTitle>Expedición original</SectionTitle>
          <Field label="Barcode original (840)" value={data.barcode1_original} onChange={v => update('barcode1_original', v)} />
          <Hint>Código de la expedición principal 840</Hint>
          <Separator />
          <SectionTitle>Bulto</SectionTitle>
          <Row2>
            <Field label="Bulto actual" value={data.bultoActual} onChange={v => update('bultoActual', v)} type="number" />
            <Field label="Total bultos" value={data.totalBultos} onChange={v => update('totalBultos', v)} type="number" />
          </Row2>
          <Field label="Barcode 841" value={data.barcode1} onChange={v => update('barcode1', v)} />
          <Hint>Formato: 841 + nº bulto + agencia + expedición</Hint>
          <Field label="Barcode NX" value={data.barcode2} onChange={v => update('barcode2', v)} />
          <Separator />
          <SectionTitle>Destinatario</SectionTitle>
          <Field label="Nombre / Empresa" value={data.client} onChange={v => update('client', v)} />
          <Field label="Dirección" value={data.address} onChange={v => update('address', v)} />
          <Row2>
            <Field label="C.P." value={data.postcode} onChange={v => update('postcode', v)} />
            <Field label="Ciudad" value={data.city_ent} onChange={v => update('city_ent', v)} />
          </Row2>
          <Field label="Atención de" value={data.per_ent} onChange={v => update('per_ent', v)} />
          <Separator />
          <SectionTitle>Ruta</SectionTitle>
          <Row2>
            <Field label="Ruta" value={data.route} onChange={v => update('route', v)} />
            <Field label="Color" value={data.color} onChange={v => update('color', v)} type="color" />
          </Row2>
          <Row2>
            <Field label="Código" value={data.code} onChange={v => update('code', v)} />
            <Field label="País" value={data.pais} onChange={v => update('pais', v)} />
          </Row2>
          <Separator />
          <Row2>
            <SelectField label="Servicio" value={data.servicio} onChange={v => update('servicio', v)}
              options={Object.entries(SERVICIOS).map(([k, s]) => ({ value: k, label: `${s.nombre_etiqueta} (${k})` }))} />
            <Field label="Abonado" value={data.abonado} onChange={v => update('abonado', v)} />
          </Row2>
          <Row2>
            <Field label="Referencia" value={data.ref} onChange={v => update('ref', v)} />
            <Field label="Pedido" value={data.ref_cms} onChange={v => update('ref_cms', v)} />
          </Row2>
          <Separator />
          <SectionTitle>Zoom</SectionTitle>
          <input type="range" min={50} max={150} value={zoom} onChange={e => setZoom(+e.target.value)} style={{ width: '100%', accentColor: '#9C27B0' }} />
          <Hint>{zoom}%</Hint>
        </div>
      </aside>

      {/* PREVIEW */}
      <main style={S.main}>
        <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
          <div style={S.label}>
            {/* Header */}
            <div style={S.header}>
              <div style={S.logo}>NACEX</div>
              <div style={S.typeBadge}>841 — BULTO EXTRA</div>
            </div>
            <div style={S.hr} />

            <div style={S.infoRow}>
              <span>Abonado: <b>{data.abonado}</b></span>
              <span>Fecha: <b>{data.fecha}</b></span>
            </div>
            <div style={S.infoRow}>
              <span>Servicio: <b>{svc.nombre_etiqueta}</b> ({data.servicio})</span>
            </div>
            <div style={S.hr} />

            {/* Bulto destacado */}
            <div style={S.bultoBox}>
              <div style={S.bultoLabel}>BULTO</div>
              <div style={S.bultoNum}>{data.bultoActual} <span style={S.bultoOf}>de</span> {data.totalBultos}</div>
            </div>
            <div style={S.hr} />

            {/* Destinatario */}
            <div style={S.destName}>{(data.client || '').substring(0, 25).toUpperCase()}</div>
            <div style={S.destLine}>{data.address}</div>
            <div style={S.destLine}>{data.postcode} {(data.city_ent || '').toUpperCase()}</div>
            <div style={S.destLine}>Att: {data.per_ent}</div>
            <div style={S.hr} />

            {/* Ruta */}
            <div style={S.routeRow}>
              <div style={{ ...S.routeBox, backgroundColor: data.color }}>
                <span style={S.routeText}>{data.route}</span>
              </div>
              <div style={S.routeInfo}>
                <div>Cod: <b>{data.code}</b></div>
                <div>País: <b>{data.pais}</b></div>
              </div>
            </div>
            <div style={S.hr} />

            {/* Exp original */}
            <div style={S.expOriginal}>Exp. original: <b>{data.barcode1_original}</b></div>
            <div style={S.hr} />

            {/* Barcodes */}
            <div style={S.bcArea}><BarcodeCanvas value={data.barcode1} height={65} fontSize={11} /></div>
            <div style={S.bcArea2}><BarcodeCanvas value={data.barcode2} height={35} fontSize={9} /></div>
            <div style={S.hr} />

            <div style={S.footer}>
              <span>Ref: {data.ref}</span>
              <span>Pedido: #{data.ref_cms}</span>
            </div>
          </div>
        </div>
      </main>
    </LabelEditorWrapper>
  );
}

const S = {
  sidebar: { width: 340, minWidth: 340, borderRight: '1px solid var(--border)', background: 'var(--surface)', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  form: { flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 },
  main: { flex: 1, overflow: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 24, background: 'repeating-conic-gradient(#0f0f13 0% 25%, #141418 0% 50%) 50% / 20px 20px' },
  label: { width: 384, minHeight: 540, background: '#fff', color: '#111', fontFamily: "'Courier New', monospace", fontSize: 11, padding: 16, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  logo: { fontSize: 28, fontWeight: 900, fontFamily: 'Helvetica, sans-serif', letterSpacing: -1 },
  typeBadge: { fontSize: 11, fontWeight: 800, background: '#9C27B0', color: '#fff', padding: '3px 10px', borderRadius: 4 },
  hr: { height: 1.5, background: '#111', margin: '5px 0' },
  infoRow: { display: 'flex', justifyContent: 'space-between', fontSize: 9, padding: '2px 0', color: '#333' },
  bultoBox: { textAlign: 'center', padding: '10px 0', background: '#f3e5f5', borderRadius: 4, margin: '4px 0' },
  bultoLabel: { fontSize: 10, fontWeight: 700, color: '#9C27B0', textTransform: 'uppercase', letterSpacing: 2 },
  bultoNum: { fontSize: 36, fontWeight: 900, fontFamily: 'Helvetica, sans-serif', color: '#4A148C', lineHeight: 1 },
  bultoOf: { fontSize: 16, fontWeight: 400, color: '#9C27B0' },
  destName: { fontSize: 15, fontWeight: 900, fontFamily: 'Helvetica, sans-serif', marginTop: 4 },
  destLine: { fontSize: 11, lineHeight: 1.5, color: '#222' },
  routeRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' },
  routeBox: { width: 65, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  routeText: { color: '#fff', fontWeight: 900, fontSize: 16, fontFamily: 'Helvetica, sans-serif' },
  routeInfo: { fontSize: 10, lineHeight: 1.6 },
  expOriginal: { fontSize: 10, color: '#555', padding: '3px 0' },
  bcArea: { display: 'flex', justifyContent: 'center', padding: '5px 0' },
  bcArea2: { display: 'flex', justifyContent: 'center', padding: '2px 0' },
  footer: { display: 'flex', justifyContent: 'space-between', fontSize: 8, color: '#555', padding: '3px 0' },
};
