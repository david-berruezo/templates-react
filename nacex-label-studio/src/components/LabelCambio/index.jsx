import { useState, useCallback } from 'react';
import { DEFAULT_CAMBIO, SERVICIOS } from '../../constants/services';
import { generateZPLCambio } from '../../utils/zplGenerator';
import { Field, SelectField, Row2, Hint, Separator, SectionTitle } from '../FormFields';
import LabelEditorWrapper from '../LabelEditorWrapper';
import BarcodeCanvas from '../BarcodeCanvas';

export default function LabelCambio() {
  const [data, setData] = useState(DEFAULT_CAMBIO);
  const [zoom, setZoom] = useState(100);
  const update = useCallback((f, v) => setData(p => ({ ...p, [f]: v })), []);
  const svc = SERVICIOS[data.servicio] || {};
  const zpl = generateZPLCambio(data);

  return (
    <LabelEditorWrapper id="CAMBIO" title="Etiqueta de Cambio" color="#E65100" zplCode={zpl} filename={`nacex-cambio-${data.ref_cms}.zpl`}>
      <aside style={S.sidebar}>
        <div style={S.form}>
          <SectionTitle>Datos del cambio</SectionTitle>
          <Field label="Motivo del cambio" value={data.motivo_cambio} onChange={v => update('motivo_cambio', v)} />
          <Field label="Artículo original" value={data.articulo_original} onChange={v => update('articulo_original', v)} />
          <Field label="Artículo nuevo" value={data.articulo_nuevo} onChange={v => update('articulo_nuevo', v)} />
          <Field label="Observaciones" value={data.obs} onChange={v => update('obs', v)} />
          <Separator />
          <SectionTitle>Destinatario</SectionTitle>
          <Field label="Nombre / Empresa" value={data.client} onChange={v => update('client', v)} />
          <Field label="Dirección" value={data.address} onChange={v => update('address', v)} />
          <Row2>
            <Field label="C.P." value={data.postcode} onChange={v => update('postcode', v)} />
            <Field label="Ciudad" value={data.city_ent} onChange={v => update('city_ent', v)} />
          </Row2>
          <Row2>
            <Field label="Atención de" value={data.per_ent} onChange={v => update('per_ent', v)} />
            <Field label="Teléfono" value={data.phone} onChange={v => update('phone', v)} />
          </Row2>
          <Separator />
          <SectionTitle>Ruta y servicio</SectionTitle>
          <Row2>
            <Field label="Ruta" value={data.route} onChange={v => update('route', v)} />
            <Field label="Color" value={data.color} onChange={v => update('color', v)} type="color" />
          </Row2>
          <Row2>
            <Field label="Código" value={data.code} onChange={v => update('code', v)} />
            <Field label="País" value={data.pais} onChange={v => update('pais', v)} />
          </Row2>
          <SelectField label="Servicio" value={data.servicio} onChange={v => update('servicio', v)}
            options={Object.entries(SERVICIOS).map(([k, s]) => ({ value: k, label: `${s.nombre_etiqueta} (${k})` }))} />
          <Separator />
          <SectionTitle>Códigos</SectionTitle>
          <Field label="Barcode expedición" value={data.barcode1} onChange={v => update('barcode1', v)} />
          <Field label="Barcode NX" value={data.barcode2} onChange={v => update('barcode2', v)} />
          <Row2>
            <Field label="Referencia" value={data.ref} onChange={v => update('ref', v)} />
            <Field label="Pedido" value={data.ref_cms} onChange={v => update('ref_cms', v)} />
          </Row2>
          <Field label="Abonado" value={data.abonado} onChange={v => update('abonado', v)} />
          <Separator />
          <SectionTitle>Zoom</SectionTitle>
          <input type="range" min={50} max={150} value={zoom} onChange={e => setZoom(+e.target.value)} style={{ width: '100%', accentColor: '#E65100' }} />
          <Hint>{zoom}%</Hint>
        </div>
      </aside>

      <main style={S.main}>
        <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
          <div style={S.label}>
            <div style={S.header}>
              <div style={S.logo}>NACEX</div>
              <div style={S.cambioTag}>CAMBIO</div>
            </div>
            <div style={S.hr} />
            <div style={S.infoRow}>
              <span>Abonado: <b>{data.abonado}</b></span>
              <span>Fecha: <b>{data.fecha}</b></span>
            </div>
            <div style={S.infoRow}><span>Servicio: <b>{svc.nombre_etiqueta}</b></span></div>
            <div style={S.hr} />

            <div style={S.destName}>{(data.client || '').substring(0, 25).toUpperCase()}</div>
            <div style={S.destLine}>{data.address}</div>
            <div style={S.destLine}>{data.postcode} {(data.city_ent || '').toUpperCase()}</div>
            <div style={S.destLine}>Att: {data.per_ent} · Tel: {data.phone}</div>
            <div style={S.hr} />

            <div style={S.routeRow}>
              <div style={{ ...S.routeBox, backgroundColor: data.color }}>
                <span style={S.routeText}>{data.route}</span>
              </div>
              <div style={S.routeInfo}>
                <div>Cod: <b>{data.code}</b> · País: <b>{data.pais}</b></div>
              </div>
            </div>
            <div style={S.hr} />

            {/* Cambio section */}
            <div style={S.cambioSection}>
              <div style={S.cambioTitle}>🔄 DATOS DEL CAMBIO</div>
              <div style={S.cambioField}><b>Motivo:</b> {data.motivo_cambio}</div>
              <div style={S.cambioField}><b>Original:</b> {data.articulo_original}</div>
              <div style={S.cambioField}><b>Nuevo:</b> {data.articulo_nuevo}</div>
            </div>
            <div style={S.hr} />

            {data.obs && <><div style={S.obsRow}>Obs: {data.obs}</div><div style={S.hr} /></>}

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
  cambioTag: { fontSize: 18, fontWeight: 900, background: '#E65100', color: '#fff', padding: '4px 16px', borderRadius: 4, fontFamily: 'Helvetica, sans-serif' },
  hr: { height: 1.5, background: '#111', margin: '5px 0' },
  infoRow: { display: 'flex', justifyContent: 'space-between', fontSize: 9, padding: '2px 0', color: '#333' },
  destName: { fontSize: 14, fontWeight: 900, fontFamily: 'Helvetica, sans-serif', marginTop: 4 },
  destLine: { fontSize: 11, lineHeight: 1.5, color: '#222' },
  routeRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '5px 0' },
  routeBox: { width: 60, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  routeText: { color: '#fff', fontWeight: 900, fontSize: 15, fontFamily: 'Helvetica, sans-serif' },
  routeInfo: { fontSize: 10 },
  cambioSection: { background: '#FFF3E0', border: '1px solid #FFB74D', borderRadius: 4, padding: '8px 10px', margin: '3px 0' },
  cambioTitle: { fontSize: 10, fontWeight: 800, color: '#E65100', marginBottom: 4 },
  cambioField: { fontSize: 10, lineHeight: 1.6 },
  obsRow: { fontSize: 10, color: '#444', fontStyle: 'italic', padding: '3px 0' },
  bcArea: { display: 'flex', justifyContent: 'center', padding: '5px 0' },
  bcArea2: { display: 'flex', justifyContent: 'center', padding: '2px 0' },
  footer: { display: 'flex', justifyContent: 'space-between', fontSize: 8, color: '#555', padding: '3px 0' },
};
