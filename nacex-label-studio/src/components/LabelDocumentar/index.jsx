import { useState, useCallback } from 'react';
import { DEFAULT_DOCUMENTAR, SERVICIOS, ENVASES, PORTES } from '../../constants/services';
import { generateZPLDocumentar } from '../../utils/zplGenerator';
import { Field, SelectField, Row2, Row3, Hint, Separator, SectionTitle } from '../FormFields';
import LabelEditorWrapper from '../LabelEditorWrapper';
import BarcodeCanvas from '../BarcodeCanvas';

export default function LabelDocumentar() {
  const [data, setData] = useState(DEFAULT_DOCUMENTAR);
  const [zoom, setZoom] = useState(100);
  const update = useCallback((f, v) => setData(p => ({ ...p, [f]: v })), []);
  const svc = SERVICIOS[data.servicio] || {};
  const zpl = generateZPLDocumentar(data);

  return (
    <LabelEditorWrapper id="DOC" title="Documentar Envío" color="#00897B" zplCode={zpl} filename={`nacex-doc-${data.ref_cms}.zpl`}>
      <aside style={S.sidebar}>
        <div style={S.form}>
          <SectionTitle>Expedición</SectionTitle>
          <Row2>
            <Field label="Cod. expedición" value={data.cod_expedicion} onChange={v => update('cod_expedicion', v)} />
            <Field label="Estado" value={data.estado_expedicion} onChange={v => update('estado_expedicion', v)} />
          </Row2>
          <SelectField label="Servicio" value={data.servicio} onChange={v => update('servicio', v)}
            options={Object.entries(SERVICIOS).map(([k, s]) => ({ value: k, label: `${s.nombre_etiqueta} (${k})` }))} />
          <Separator />
          <SectionTitle>Datos del envío</SectionTitle>
          <Field label="Contenido" value={data.contenido_doc} onChange={v => update('contenido_doc', v)} />
          <Row3>
            <Field label="Peso (kg)" value={data.peso} onChange={v => update('peso', v)} />
            <Field label="Largo (cm)" value={data.largo} onChange={v => update('largo', v)} />
            <Field label="Ancho" value={data.ancho} onChange={v => update('ancho', v)} />
          </Row3>
          <Row3>
            <Field label="Alto (cm)" value={data.alto} onChange={v => update('alto', v)} />
            <SelectField label="Envase" value={data.envase} onChange={v => update('envase', v)}
              options={Object.entries(ENVASES).map(([k, v]) => ({ value: k, label: v }))} />
            <SelectField label="Portes" value={data.portes} onChange={v => update('portes', v)}
              options={Object.entries(PORTES).map(([k, v]) => ({ value: k, label: `${k}-${v}` }))} />
          </Row3>
          <Field label="Bultos" value={data.bultos} onChange={v => update('bultos', v)} type="number" />
          <Field label="Observaciones" value={data.obs} onChange={v => update('obs', v)} />
          <Separator />
          <SectionTitle>Destinatario</SectionTitle>
          <Field label="Nombre" value={data.client} onChange={v => update('client', v)} />
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
          <SectionTitle>Ruta y códigos</SectionTitle>
          <Row2>
            <Field label="Ruta" value={data.route} onChange={v => update('route', v)} />
            <Field label="Color" value={data.color} onChange={v => update('color', v)} type="color" />
          </Row2>
          <Row2>
            <Field label="Código" value={data.code} onChange={v => update('code', v)} />
            <Field label="País" value={data.pais} onChange={v => update('pais', v)} />
          </Row2>
          <Field label="Barcode" value={data.barcode1} onChange={v => update('barcode1', v)} />
          <Field label="Barcode NX" value={data.barcode2} onChange={v => update('barcode2', v)} />
          <Row2>
            <Field label="Referencia" value={data.ref} onChange={v => update('ref', v)} />
            <Field label="Pedido" value={data.ref_cms} onChange={v => update('ref_cms', v)} />
          </Row2>
          <Field label="Abonado" value={data.abonado} onChange={v => update('abonado', v)} />
          <Separator />
          <SectionTitle>Zoom</SectionTitle>
          <input type="range" min={50} max={150} value={zoom} onChange={e => setZoom(+e.target.value)} style={{ width: '100%', accentColor: '#00897B' }} />
          <Hint>{zoom}%</Hint>
        </div>
      </aside>

      <main style={S.main}>
        <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
          <div style={S.label}>
            <div style={S.header}>
              <div style={S.logo}>NACEX</div>
              <div style={S.docTag}>DOCUMENTAR ENVÍO</div>
            </div>
            <div style={S.hr} />
            <div style={S.infoRow}>
              <span>Abonado: <b>{data.abonado}</b></span>
              <span>Fecha: <b>{data.fecha}</b></span>
            </div>
            <div style={S.infoRow}>
              <span>Servicio: <b>{svc.nombre_etiqueta}</b></span>
              <span>Exp: <b>{data.cod_expedicion}</b></span>
            </div>
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

            {/* Datos documentación */}
            <div style={S.docSection}>
              <div style={S.docTitle}>📄 DATOS DEL ENVÍO</div>
              <div style={S.docGrid}>
                <span>Peso: <b>{data.peso} kg</b></span>
                <span>Medidas: <b>{data.largo}×{data.ancho}×{data.alto} cm</b></span>
              </div>
              <div style={S.docField}>Contenido: <b>{data.contenido_doc}</b></div>
              <div style={S.docGrid}>
                <span>Bultos: <b>{data.bultos}/{data.totalBultos}</b></span>
                <span>Portes: <b>{PORTES[data.portes]}</b></span>
                <span>Envase: <b>{ENVASES[data.envase]}</b></span>
              </div>
              <div style={S.docStatus}>Estado: <b>{data.estado_expedicion}</b></div>
            </div>

            {data.obs && <><div style={S.hr} /><div style={S.obsRow}>Obs: {data.obs}</div></>}
            <div style={S.hr} />

            <div style={S.bcArea}><BarcodeCanvas value={data.barcode1} height={60} fontSize={10} /></div>
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
  label: { width: 384, minHeight: 540, background: '#fff', color: '#111', fontFamily: "'Courier New', monospace", fontSize: 11, padding: 16, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.6)' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  logo: { fontSize: 28, fontWeight: 900, fontFamily: 'Helvetica, sans-serif', letterSpacing: -1 },
  docTag: { fontSize: 11, fontWeight: 800, background: '#00897B', color: '#fff', padding: '4px 10px', borderRadius: 4 },
  hr: { height: 1.5, background: '#111', margin: '5px 0' },
  infoRow: { display: 'flex', justifyContent: 'space-between', fontSize: 9, padding: '2px 0', color: '#333' },
  destName: { fontSize: 14, fontWeight: 900, fontFamily: 'Helvetica, sans-serif', marginTop: 3 },
  destLine: { fontSize: 10, lineHeight: 1.5, color: '#222' },
  routeRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '5px 0' },
  routeBox: { width: 60, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  routeText: { color: '#fff', fontWeight: 900, fontSize: 15, fontFamily: 'Helvetica, sans-serif' },
  routeInfo: { fontSize: 10 },
  docSection: { background: '#E0F2F1', border: '1px solid #80CBC4', borderRadius: 4, padding: '8px 10px', margin: '3px 0' },
  docTitle: { fontSize: 10, fontWeight: 800, color: '#00695C', marginBottom: 4 },
  docGrid: { display: 'flex', justifyContent: 'space-between', fontSize: 10, flexWrap: 'wrap', gap: 4, lineHeight: 1.6 },
  docField: { fontSize: 10, lineHeight: 1.6 },
  docStatus: { fontSize: 10, marginTop: 3, padding: '2px 6px', background: '#B2DFDB', borderRadius: 3, display: 'inline-block' },
  obsRow: { fontSize: 10, color: '#444', fontStyle: 'italic', padding: '3px 0' },
  bcArea: { display: 'flex', justifyContent: 'center', padding: '4px 0' },
  bcArea2: { display: 'flex', justifyContent: 'center', padding: '2px 0' },
  footer: { display: 'flex', justifyContent: 'space-between', fontSize: 8, color: '#555', padding: '3px 0' },
};
