import { useState, useCallback } from 'react';
import { DEFAULT_INTERNACIONAL, SERVICIOS, PORTES } from '../../constants/services';
import { generateZPLInternacional } from '../../utils/zplGenerator';
import { Field, SelectField, Row2, Row3, Hint, Separator, SectionTitle } from '../FormFields';
import LabelEditorWrapper from '../LabelEditorWrapper';
import BarcodeCanvas from '../BarcodeCanvas';

const INT_SERVICES = Object.fromEntries(
  Object.entries(SERVICIOS).filter(([, s]) => s.tipo === 'internacional')
);

export default function LabelInternacional() {
  const [data, setData] = useState(DEFAULT_INTERNACIONAL);
  const [zoom, setZoom] = useState(100);
  const update = useCallback((f, v) => setData(p => ({ ...p, [f]: v })), []);
  const svc = SERVICIOS[data.servicio] || {};
  const zpl = generateZPLInternacional(data);

  return (
    <LabelEditorWrapper id="INT" title="Internacional — Europa" color="#283593" zplCode={zpl} filename={`nacex-int-${data.ref_cms}.zpl`}>
      <aside style={S.sidebar}>
        <div style={S.form}>
          <SectionTitle>Servicio internacional</SectionTitle>
          <SelectField label="Servicio" value={data.servicio} onChange={v => update('servicio', v)}
            options={Object.entries(INT_SERVICES).map(([k, s]) => ({ value: k, label: `${s.nombre} (${k})` }))} />
          <Hint>{svc.delay}</Hint>
          <Separator />
          <SectionTitle>Remitente</SectionTitle>
          <Field label="Nombre" value={data.remitente} onChange={v => update('remitente', v)} />
          <Field label="Dirección" value={data.dir_rec} onChange={v => update('dir_rec', v)} />
          <Row2>
            <Field label="C.P." value={data.cp_rec} onChange={v => update('cp_rec', v)} />
            <Field label="Ciudad" value={data.pob_rec} onChange={v => update('pob_rec', v)} />
          </Row2>
          <Separator />
          <SectionTitle>Destinatario</SectionTitle>
          <Field label="Nombre" value={data.client} onChange={v => update('client', v)} />
          <Field label="Dirección" value={data.address} onChange={v => update('address', v)} />
          <Row2>
            <Field label="C.P." value={data.postcode} onChange={v => update('postcode', v)} />
            <Field label="Ciudad" value={data.city_ent} onChange={v => update('city_ent', v)} />
          </Row2>
          <Row2>
            <Field label="País destino" value={data.pais} onChange={v => update('pais', v)} />
            <Field label="Teléfono" value={data.phone} onChange={v => update('phone', v)} />
          </Row2>
          <Field label="Atención de" value={data.per_ent} onChange={v => update('per_ent', v)} />
          <Separator />
          <SectionTitle>Datos aduaneros</SectionTitle>
          <Field label="Contenido" value={data.contenido} onChange={v => update('contenido', v)} />
          <Row2>
            <Field label="Valor declarado (€)" value={data.valor_declarado} onChange={v => update('valor_declarado', v)} />
            <Field label="HS Code" value={data.hs_code} onChange={v => update('hs_code', v)} />
          </Row2>
          <Row2>
            <Field label="Peso (kg)" value={data.peso} onChange={v => update('peso', v)} />
            <Field label="Nº artículos" value={data.num_articulos} onChange={v => update('num_articulos', v)} />
          </Row2>
          <Row2>
            <Field label="Bultos" value={data.bultos} onChange={v => update('bultos', v)} type="number" />
            <SelectField label="Portes" value={data.portes} onChange={v => update('portes', v)}
              options={Object.entries(PORTES).map(([k, v]) => ({ value: k, label: `${k}-${v}` }))} />
          </Row2>
          <Field label="Observaciones" value={data.obs} onChange={v => update('obs', v)} />
          <Separator />
          <SectionTitle>Ruta</SectionTitle>
          <Row2>
            <Field label="Ruta" value={data.route} onChange={v => update('route', v)} />
            <Field label="Color" value={data.color} onChange={v => update('color', v)} type="color" />
          </Row2>
          <Field label="Código" value={data.code} onChange={v => update('code', v)} />
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
          <input type="range" min={50} max={150} value={zoom} onChange={e => setZoom(+e.target.value)} style={{ width: '100%', accentColor: '#283593' }} />
          <Hint>{zoom}%</Hint>
        </div>
      </aside>

      <main style={S.main}>
        <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
          <div style={S.label}>
            <div style={S.header}>
              <div style={S.logo}>NACEX</div>
              <div style={S.intTag}>INTERNACIONAL</div>
            </div>
            <div style={S.hr} />
            <div style={S.infoRow}>
              <span>Abonado: <b>{data.abonado}</b></span>
              <span>Fecha: <b>{data.fecha}</b></span>
            </div>
            <div style={S.infoRow}>
              <span>Servicio: <b>{svc.nombre_etiqueta}</b> ({data.servicio})</span>
              <span>{svc.delay}</span>
            </div>
            <div style={S.hr} />

            {/* Remitente */}
            <div style={S.sectionTag}>REMITENTE:</div>
            <div style={S.personName}>{(data.remitente || '').substring(0, 30)}</div>
            <div style={S.personLine}>{data.dir_rec}</div>
            <div style={S.personLine}>{data.cp_rec} {(data.pob_rec || '').toUpperCase()} — SPAIN</div>
            <div style={S.hr} />

            {/* Destinatario */}
            <div style={S.sectionTag}>DESTINATARIO:</div>
            <div style={S.destName}>{(data.client || '').substring(0, 25).toUpperCase()}</div>
            <div style={S.destLine}>{data.address}</div>
            <div style={S.destLine}>{data.postcode} {(data.city_ent || '').toUpperCase()} — <b>{data.pais}</b></div>
            <div style={S.destLine}>Att: {data.per_ent} · Tel: {data.phone}</div>
            <div style={S.hr} />

            {/* Ruta */}
            <div style={S.routeRow}>
              <div style={{ ...S.routeBox, backgroundColor: data.color }}>
                <span style={S.routeText}>{data.route}</span>
              </div>
              <div style={S.routeInfo}>
                <div>Cod: <b>{data.code}</b></div>
                <div>País destino: <b>{data.pais}</b></div>
              </div>
            </div>
            <div style={S.hr} />

            {/* Aduanas */}
            <div style={S.aduanaBox}>
              <div style={S.aduanaTitle}>🌍 DATOS ADUANEROS</div>
              <div style={S.aduanaGrid}>
                <span>Contenido: <b>{data.contenido}</b></span>
                <span>Valor: <b>{data.valor_declarado}€</b></span>
              </div>
              <div style={S.aduanaGrid}>
                <span>HS Code: <b>{data.hs_code || '—'}</b></span>
                <span>Peso: <b>{data.peso} kg</b></span>
                <span>Arts: <b>{data.num_articulos}</b></span>
              </div>
              <div style={S.aduanaGrid}>
                <span>Bultos: <b>{data.bultos}/{data.totalBultos}</b></span>
                <span>Portes: <b>{PORTES[data.portes]}</b></span>
              </div>
            </div>

            {data.obs && <><div style={S.hr} /><div style={S.obsRow}>Obs: {data.obs}</div></>}
            <div style={S.hr} />

            <div style={S.bcArea}><BarcodeCanvas value={data.barcode1} height={55} fontSize={10} /></div>
            <div style={S.bcArea2}><BarcodeCanvas value={data.barcode2} height={30} fontSize={9} /></div>
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
  label: { width: 384, minHeight: 580, background: '#fff', color: '#111', fontFamily: "'Courier New', monospace", fontSize: 11, padding: 16, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  logo: { fontSize: 28, fontWeight: 900, fontFamily: 'Helvetica, sans-serif', letterSpacing: -1 },
  intTag: { fontSize: 13, fontWeight: 900, background: '#283593', color: '#fff', padding: '4px 14px', borderRadius: 4, fontFamily: 'Helvetica, sans-serif' },
  hr: { height: 1.5, background: '#111', margin: '5px 0' },
  infoRow: { display: 'flex', justifyContent: 'space-between', fontSize: 9, padding: '2px 0', color: '#333' },
  sectionTag: { fontSize: 9, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 0.8 },
  personName: { fontSize: 12, fontWeight: 800, fontFamily: 'Helvetica, sans-serif', marginTop: 2 },
  personLine: { fontSize: 10, lineHeight: 1.5, color: '#333' },
  destName: { fontSize: 15, fontWeight: 900, fontFamily: 'Helvetica, sans-serif', marginTop: 2 },
  destLine: { fontSize: 11, lineHeight: 1.5, color: '#222' },
  routeRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '5px 0' },
  routeBox: { width: 65, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  routeText: { color: '#fff', fontWeight: 900, fontSize: 14, fontFamily: 'Helvetica, sans-serif' },
  routeInfo: { fontSize: 10, lineHeight: 1.6 },
  aduanaBox: { background: '#E8EAF6', border: '2px solid #7986CB', borderRadius: 6, padding: '10px 12px', margin: '3px 0' },
  aduanaTitle: { fontSize: 11, fontWeight: 800, color: '#283593', marginBottom: 5 },
  aduanaGrid: { display: 'flex', justifyContent: 'space-between', fontSize: 10, flexWrap: 'wrap', gap: 4, lineHeight: 1.7 },
  obsRow: { fontSize: 10, color: '#444', fontStyle: 'italic', padding: '3px 0' },
  bcArea: { display: 'flex', justifyContent: 'center', padding: '4px 0' },
  bcArea2: { display: 'flex', justifyContent: 'center', padding: '2px 0' },
  footer: { display: 'flex', justifyContent: 'space-between', fontSize: 8, color: '#555', padding: '3px 0' },
};
