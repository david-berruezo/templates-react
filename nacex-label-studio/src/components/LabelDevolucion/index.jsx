import { useState, useCallback } from 'react';
import { DEFAULT_DEVOLUCION } from '../../constants/services';
import { generateZPLDevolucion } from '../../utils/zplGenerator';
import { Field, Row2, Hint, Separator, SectionTitle } from '../FormFields';
import LabelEditorWrapper from '../LabelEditorWrapper';
import BarcodeCanvas from '../BarcodeCanvas';

export default function LabelDevolucion() {
  const [data, setData] = useState(DEFAULT_DEVOLUCION);
  const [zoom, setZoom] = useState(100);
  const update = useCallback((f, v) => setData(p => ({ ...p, [f]: v })), []);
  const zpl = generateZPLDevolucion(data);

  return (
    <LabelEditorWrapper id="DEV" title="Etiqueta de Devolución" color="#1565C0" zplCode={zpl} filename={`nacex-devolucion-${data.ref_cms}.zpl`}>
      <aside style={S.sidebar}>
        <div style={S.form}>
          <SectionTitle>Motivo devolución</SectionTitle>
          <Field label="Motivo" value={data.motivo_devolucion} onChange={v => update('motivo_devolucion', v)} />
          <Field label="Observaciones" value={data.obs} onChange={v => update('obs', v)} />
          <Separator />
          <SectionTitle>Remitente (cliente que devuelve)</SectionTitle>
          <Field label="Nombre" value={data.remitente} onChange={v => update('remitente', v)} />
          <Field label="Dirección" value={data.dir_rec} onChange={v => update('dir_rec', v)} />
          <Row2>
            <Field label="C.P." value={data.cp_rec} onChange={v => update('cp_rec', v)} />
            <Field label="Ciudad" value={data.pob_rec} onChange={v => update('pob_rec', v)} />
          </Row2>
          <Field label="Teléfono" value={data.tel_rec} onChange={v => update('tel_rec', v)} />
          <Separator />
          <SectionTitle>Destino (almacén)</SectionTitle>
          <Field label="Nombre almacén" value={data.client} onChange={v => update('client', v)} />
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
          <SectionTitle>Códigos</SectionTitle>
          <Field label="Barcode devolución" value={data.barcode1} onChange={v => update('barcode1', v)} />
          <Hint>Formato: RET + barcode expedición original</Hint>
          <Field label="Barcode NX" value={data.barcode2} onChange={v => update('barcode2', v)} />
          <Row2>
            <Field label="Referencia" value={data.ref} onChange={v => update('ref', v)} />
            <Field label="Pedido" value={data.ref_cms} onChange={v => update('ref_cms', v)} />
          </Row2>
          <Field label="Abonado" value={data.abonado} onChange={v => update('abonado', v)} />
          <Separator />
          <SectionTitle>Zoom</SectionTitle>
          <input type="range" min={50} max={150} value={zoom} onChange={e => setZoom(+e.target.value)} style={{ width: '100%', accentColor: '#1565C0' }} />
          <Hint>{zoom}%</Hint>
        </div>
      </aside>

      <main style={S.main}>
        <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
          <div style={S.label}>
            <div style={S.header}>
              <div style={S.logo}>NACEX</div>
              <div style={S.devTag}>DEVOLUCIÓN</div>
            </div>
            <div style={S.hr} />
            <div style={S.infoRow}>
              <span>Abonado: <b>{data.abonado}</b></span>
              <span>Fecha: <b>{data.fecha}</b></span>
            </div>
            <div style={S.hr} />

            {/* Remitente */}
            <div style={S.sectionTag}>REMITENTE (Cliente):</div>
            <div style={S.personName}>{(data.remitente || '').toUpperCase()}</div>
            <div style={S.personLine}>{data.dir_rec}</div>
            <div style={S.personLine}>{data.cp_rec} {(data.pob_rec || '').toUpperCase()}</div>
            <div style={S.hr} />

            {/* Destino */}
            <div style={S.sectionTag}>DESTINO (Almacén):</div>
            <div style={S.destName}>{(data.client || '').substring(0, 25).toUpperCase()}</div>
            <div style={S.personLine}>{data.address}</div>
            <div style={S.personLine}>{data.postcode} {(data.city_ent || '').toUpperCase()}</div>
            <div style={S.personLine}>Att: {data.per_ent}</div>
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
            <div style={S.hr} />

            {/* Motivo */}
            <div style={S.motivoBox}>
              <div style={S.motivoTitle}>↩️ MOTIVO DEVOLUCIÓN</div>
              <div style={S.motivoText}>{data.motivo_devolucion}</div>
            </div>

            {data.obs && <div style={S.obsRow}>Obs: {data.obs}</div>}
            <div style={S.hr} />

            <div style={S.bcArea}><BarcodeCanvas value={data.barcode1} height={60} fontSize={10} /></div>
            <div style={S.bcArea2}><BarcodeCanvas value={data.barcode2} height={32} fontSize={9} /></div>
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
  devTag: { fontSize: 16, fontWeight: 900, background: '#1565C0', color: '#fff', padding: '4px 14px', borderRadius: 4, fontFamily: 'Helvetica, sans-serif' },
  hr: { height: 1.5, background: '#111', margin: '5px 0' },
  infoRow: { display: 'flex', justifyContent: 'space-between', fontSize: 9, padding: '2px 0', color: '#333' },
  sectionTag: { fontSize: 9, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 0.8 },
  personName: { fontSize: 13, fontWeight: 800, fontFamily: 'Helvetica, sans-serif', marginTop: 2 },
  personLine: { fontSize: 10, lineHeight: 1.5, color: '#333' },
  destName: { fontSize: 15, fontWeight: 900, fontFamily: 'Helvetica, sans-serif', marginTop: 2 },
  routeRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '5px 0' },
  routeBox: { width: 60, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  routeText: { color: '#fff', fontWeight: 900, fontSize: 15, fontFamily: 'Helvetica, sans-serif' },
  routeInfo: { fontSize: 10 },
  motivoBox: { background: '#E3F2FD', border: '1px solid #90CAF9', borderRadius: 4, padding: '8px 10px', margin: '3px 0' },
  motivoTitle: { fontSize: 10, fontWeight: 800, color: '#1565C0', marginBottom: 3 },
  motivoText: { fontSize: 11, fontWeight: 600 },
  obsRow: { fontSize: 10, color: '#444', fontStyle: 'italic', padding: '3px 0' },
  bcArea: { display: 'flex', justifyContent: 'center', padding: '4px 0' },
  bcArea2: { display: 'flex', justifyContent: 'center', padding: '2px 0' },
  footer: { display: 'flex', justifyContent: 'space-between', fontSize: 8, color: '#555', padding: '3px 0' },
};
