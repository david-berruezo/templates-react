import BarcodeCanvas from '../BarcodeCanvas';
import { SERVICIOS, ENVASES, PORTES } from '../../constants/services';

export default function LabelPreview({ data }) {
  const svc = SERVICIOS[data.servicio] || {};
  const isInt = svc.tipo === 'internacional';
  const isShop = svc.tipo === 'nacexshop';
  const envName = ENVASES[data.envase] || 'PAQ';
  const portName = PORTES[data.portes] || 'Origen';

  return (
    <div style={S.label}>
      {/* ── Header ── */}
      <div style={S.header}>
        <div style={S.logo}>NACEX</div>
        <div style={S.svcBadge}>
          <span style={S.svcName}>{svc.nombre_etiqueta || 'NACEX'}</span>
          <span style={S.svcCode}>({data.servicio})</span>
        </div>
      </div>
      <div style={S.hr} />

      {/* ── Info ── */}
      <div style={S.infoRow}>
        <span>Abonado: <b>{data.abonado}</b></span>
        <span>Fecha: <b>{data.fecha}</b></span>
      </div>
      <div style={S.infoRow}>
        <span>Ref: <b>{data.ref}</b></span>
        <span>Pedido: <b>#{data.ref_cms}</b></span>
      </div>
      <div style={S.hr} />

      {/* ── NacexShop ── */}
      {isShop && data.es_nacexshop && data.alias && (
        <>
          <div style={S.shopBox}>
            <span style={S.shopLabel}>📍 Punto NacexShop:</span>
            <span style={S.shopAlias}>{data.alias}</span>
          </div>
          <div style={S.hr} />
        </>
      )}

      {/* ── Destinatario ── */}
      <div style={S.destSection}>
        <div style={S.destTag}>DESTINATARIO</div>
        <div style={S.destName}>{(data.client || '').substring(0, 25).toUpperCase()}</div>
        <div style={S.destLine}>{data.address}</div>
        <div style={S.destLine}>{data.postcode} {(data.city_ent || '').toUpperCase()}</div>
        <div style={S.destLine}>Att: {data.per_ent}</div>
        <div style={S.destLine}>Tel: {data.phone}</div>
      </div>
      <div style={S.hr} />

      {/* ── Detalles ── */}
      <div style={S.detailsRow}>
        <span>Bultos: <b>{data.bultos}/{data.totalBultos}</b></span>
        <span>Portes: <b>{portName}</b></span>
        <span>Envase: <b>{envName}</b></span>
      </div>
      {data.reem && (
        <div style={S.reemRow}>
          💰 Reembolso: <b>{Number(data.amount).toFixed(2)}€</b>
        </div>
      )}
      <div style={S.hr} />

      {/* ── Ruta ── */}
      <div style={S.routeSection}>
        <div style={{ ...S.routeBox, backgroundColor: data.color }}>
          <span style={S.routeText}>{data.route}</span>
        </div>
        <div style={S.routeInfo}>
          <div>Cod. Destino: <b>{data.code}</b></div>
          <div>País: <b>{data.pais}</b></div>
          {svc.delay && <div style={S.delayText}>{svc.delay}</div>}
        </div>
      </div>

      {/* ── Internacional ── */}
      {isInt && (
        <>
          <div style={S.hr} />
          <div style={S.intSection}>
            <div style={S.intTitle}>DATOS ADUANEROS</div>
            <div style={S.intRow}>
              <span>Contenido: {data.contenido || '—'}</span>
              <span>Valor: {data.valor_declarado || '—'}€</span>
            </div>
          </div>
        </>
      )}

      {/* ── Observaciones ── */}
      {data.obs && (
        <>
          <div style={S.hr} />
          <div style={S.obsRow}>Obs: {data.obs}</div>
        </>
      )}
      <div style={S.hr} />

      {/* ── Barcode 1 ── */}
      <div style={S.barcodeArea}>
        <BarcodeCanvas value={data.barcode1} height={70} fontSize={12} />
      </div>

      {/* ── Barcode 2 ── */}
      <div style={S.barcodeArea2}>
        <BarcodeCanvas value={data.barcode2} height={40} fontSize={10} />
      </div>
      <div style={S.hr} />

      {/* ── Footer ── */}
      <div style={S.footer}>
        <span>Exp: {data.barcode1}</span>
        <span>Pedido: #{data.ref_cms}</span>
        <span>Ag: {data.abonado}</span>
      </div>
      <div style={S.footerCounter}>
        {data.contador} — {data.bultos}/{data.totalBultos}
      </div>
    </div>
  );
}

/* ═══ Estilos etiqueta (simula papel 4x6") ═══ */
const S = {
  label: {
    width: 384,
    minHeight: 576,
    background: '#ffffff',
    color: '#111',
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 11,
    padding: 16,
    borderRadius: 3,
    boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
  },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  logo: { fontSize: 28, fontWeight: 900, fontFamily: 'Helvetica, Arial, sans-serif', color: '#111', letterSpacing: -1 },
  svcBadge: { textAlign: 'right' },
  svcName: { fontSize: 13, fontWeight: 800, display: 'block' },
  svcCode: { fontSize: 10, color: '#666' },
  hr: { height: 1.5, background: '#111', margin: '5px 0' },
  infoRow: { display: 'flex', justifyContent: 'space-between', fontSize: 9, padding: '2px 0', color: '#333' },
  shopBox: { background: '#FFF3E0', border: '1px solid #FFB74D', borderRadius: 4, padding: '6px 8px', margin: '4px 0' },
  shopLabel: { fontSize: 9, fontWeight: 700, display: 'block' },
  shopAlias: { fontSize: 12, fontWeight: 800 },
  destSection: { padding: '6px 0' },
  destTag: { fontSize: 8, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: 1 },
  destName: { fontSize: 16, fontWeight: 900, fontFamily: 'Helvetica, Arial, sans-serif', marginTop: 2, lineHeight: 1.2 },
  destLine: { fontSize: 11, lineHeight: 1.5, color: '#222' },
  detailsRow: { display: 'flex', justifyContent: 'space-between', fontSize: 10, padding: '4px 0' },
  reemRow: { fontSize: 11, fontWeight: 700, background: '#FFFDE7', border: '1px solid #FDD835', borderRadius: 3, padding: '3px 8px', marginTop: 2 },
  routeSection: { display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' },
  routeBox: { width: 70, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 },
  routeText: { color: '#fff', fontWeight: 900, fontSize: 18, fontFamily: 'Helvetica, Arial, sans-serif' },
  routeInfo: { fontSize: 10, lineHeight: 1.6 },
  delayText: { fontSize: 9, color: '#888', fontStyle: 'italic' },
  intSection: { padding: '4px 0' },
  intTitle: { fontSize: 9, fontWeight: 800, color: '#333', letterSpacing: 1, marginBottom: 3 },
  intRow: { display: 'flex', justifyContent: 'space-between', fontSize: 10 },
  obsRow: { fontSize: 10, color: '#444', padding: '3px 0', fontStyle: 'italic' },
  barcodeArea: { display: 'flex', justifyContent: 'center', padding: '6px 0' },
  barcodeArea2: { display: 'flex', justifyContent: 'center', padding: '2px 0' },
  footer: { display: 'flex', justifyContent: 'space-between', fontSize: 8, color: '#555', padding: '3px 0 0' },
  footerCounter: { textAlign: 'center', fontSize: 8, color: '#999', marginTop: 2 },
};
