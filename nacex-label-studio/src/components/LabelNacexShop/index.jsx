import { useState, useCallback } from 'react';
import { DEFAULT_NACEXSHOP } from '../../constants/services';
import { generateZPLNacexShop } from '../../utils/zplGenerator';
import { Field, Row2, Hint, Separator, SectionTitle, Checkbox } from '../FormFields';
import LabelEditorWrapper from '../LabelEditorWrapper';
import BarcodeCanvas from '../BarcodeCanvas';

export default function LabelNacexShop() {
  const [data, setData] = useState(DEFAULT_NACEXSHOP);
  const [zoom, setZoom] = useState(100);
  const update = useCallback((f, v) => setData(p => ({ ...p, [f]: v })), []);
  const zpl = generateZPLNacexShop(data);

  return (
    <LabelEditorWrapper id="SHOP" title="NacexShop — Punto de Entrega" color="#2E7D32" zplCode={zpl} filename={`nacex-shop-${data.ref_cms}.zpl`}>
      <aside style={S.sidebar}>
        <div style={S.form}>
          <SectionTitle>Punto NacexShop</SectionTitle>
          <Field label="Nombre punto (alias)" value={data.alias} onChange={v => update('alias', v)} />
          <Field label="ID Punto" value={data.punto_id} onChange={v => update('punto_id', v)} />
          <Field label="Dirección punto" value={data.punto_direccion} onChange={v => update('punto_direccion', v)} />
          <Row2>
            <Field label="C.P. punto" value={data.punto_cp} onChange={v => update('punto_cp', v)} />
            <Field label="Ciudad punto" value={data.punto_ciudad} onChange={v => update('punto_ciudad', v)} />
          </Row2>
          <Field label="Horario" value={data.punto_horario} onChange={v => update('punto_horario', v)} />
          <Separator />
          <SectionTitle>Destinatario final</SectionTitle>
          <Field label="Nombre" value={data.client} onChange={v => update('client', v)} />
          <Row2>
            <Field label="Atención de" value={data.per_ent} onChange={v => update('per_ent', v)} />
            <Field label="Teléfono" value={data.phone} onChange={v => update('phone', v)} />
          </Row2>
          <Field label="Observaciones" value={data.obs} onChange={v => update('obs', v)} />
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
          <SectionTitle>Códigos</SectionTitle>
          <Field label="Barcode" value={data.barcode1} onChange={v => update('barcode1', v)} />
          <Field label="Barcode NX" value={data.barcode2} onChange={v => update('barcode2', v)} />
          <Row2>
            <Field label="Referencia" value={data.ref} onChange={v => update('ref', v)} />
            <Field label="Pedido" value={data.ref_cms} onChange={v => update('ref_cms', v)} />
          </Row2>
          <Field label="Abonado" value={data.abonado} onChange={v => update('abonado', v)} />
          <Separator />
          <SectionTitle>Zoom</SectionTitle>
          <input type="range" min={50} max={150} value={zoom} onChange={e => setZoom(+e.target.value)} style={{ width: '100%', accentColor: '#2E7D32' }} />
          <Hint>{zoom}%</Hint>
        </div>
      </aside>

      <main style={S.main}>
        <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
          <div style={S.label}>
            <div style={S.header}>
              <div style={S.logo}>NACEX</div>
              <div style={S.shopTag}>NACEXSHOP</div>
            </div>
            <div style={S.hr} />
            <div style={S.infoRow}>
              <span>Abonado: <b>{data.abonado}</b></span>
              <span>Fecha: <b>{data.fecha}</b></span>
            </div>
            <div style={S.hr} />

            {/* Punto de entrega */}
            <div style={S.puntoBox}>
              <div style={S.puntoHeader}>
                <span style={S.puntoIcon}>🏪</span>
                <span style={S.puntoLabel}>Punto NacexShop:</span>
              </div>
              <div style={S.puntoAlias}>{(data.alias || '').toUpperCase()}</div>
              <div style={S.puntoAddr}>{data.punto_direccion} — {data.punto_cp} {data.punto_ciudad}</div>
              <div style={S.puntoMeta}>
                <span>ID: {data.punto_id}</span>
                <span>{data.punto_horario}</span>
              </div>
            </div>
            <div style={S.hr} />

            {/* Destinatario final */}
            <div style={S.sectionTag}>DESTINATARIO FINAL:</div>
            <div style={S.destName}>{(data.client || '').substring(0, 25).toUpperCase()}</div>
            <div style={S.destLine}>Att: {data.per_ent} · Tel: {data.phone}</div>
            <div style={S.hr} />

            {/* Ruta */}
            <div style={S.routeRow}>
              <div style={{ ...S.routeBox, backgroundColor: data.color }}>
                <span style={S.routeText}>{data.route}</span>
              </div>
              <div style={S.routeInfo}>
                <div>Cod: <b>{data.code}</b> · País: <b>{data.pais}</b></div>
              </div>
            </div>

            {data.obs && <><div style={S.hr} /><div style={S.obsRow}>Obs: {data.obs}</div></>}
            <div style={S.hr} />

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
  shopTag: { fontSize: 14, fontWeight: 900, background: '#2E7D32', color: '#fff', padding: '4px 14px', borderRadius: 4, fontFamily: 'Helvetica, sans-serif' },
  hr: { height: 1.5, background: '#111', margin: '5px 0' },
  infoRow: { display: 'flex', justifyContent: 'space-between', fontSize: 9, padding: '2px 0', color: '#333' },
  puntoBox: { background: '#E8F5E9', border: '2px solid #66BB6A', borderRadius: 6, padding: '10px 12px', margin: '4px 0' },
  puntoHeader: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 },
  puntoIcon: { fontSize: 16 },
  puntoLabel: { fontSize: 10, fontWeight: 700, color: '#2E7D32', textTransform: 'uppercase' },
  puntoAlias: { fontSize: 18, fontWeight: 900, fontFamily: 'Helvetica, sans-serif', color: '#1B5E20', lineHeight: 1.2 },
  puntoAddr: { fontSize: 10, color: '#333', marginTop: 3 },
  puntoMeta: { display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#666', marginTop: 4 },
  sectionTag: { fontSize: 9, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 0.8 },
  destName: { fontSize: 15, fontWeight: 900, fontFamily: 'Helvetica, sans-serif', marginTop: 2 },
  destLine: { fontSize: 11, lineHeight: 1.5, color: '#222' },
  routeRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '5px 0' },
  routeBox: { width: 60, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  routeText: { color: '#fff', fontWeight: 900, fontSize: 15, fontFamily: 'Helvetica, sans-serif' },
  routeInfo: { fontSize: 10 },
  obsRow: { fontSize: 10, color: '#444', fontStyle: 'italic', padding: '3px 0' },
  bcArea: { display: 'flex', justifyContent: 'center', padding: '5px 0' },
  bcArea2: { display: 'flex', justifyContent: 'center', padding: '2px 0' },
  footer: { display: 'flex', justifyContent: 'space-between', fontSize: 8, color: '#555', padding: '3px 0' },
};
