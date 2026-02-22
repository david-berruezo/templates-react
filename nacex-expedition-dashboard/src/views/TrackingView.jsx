import { ESTADOS, SERVICIOS, PORTES } from '../data/constants';
import { StatusBadge, Btn } from '../components/UI';

export default function TrackingView({ expedition, onBack }) {
  if (!expedition) return (
    <div style={S.empty}>
      <span style={{ fontSize: 48 }}>📍</span>
      <h3 style={{ margin: '12px 0 4px' }}>Selecciona una expedición</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
        Haz click en "Ver" en la tabla o en una tarjeta del Kanban
      </p>
    </div>
  );

  const e = expedition;
  const svc = SERVICIOS[e.tip_ser] || {};
  const est = ESTADOS[e.estado] || {};

  return (
    <div style={S.wrap}>
      {/* Header */}
      <div style={S.header}>
        <Btn variant="ghost" onClick={onBack}>← Volver</Btn>
        <div style={S.headerInfo}>
          <span style={S.expTitle}>Expedición {e.cod_exp}</span>
          <StatusBadge estado={e.estado} size="md" />
        </div>
      </div>

      <div style={S.body}>
        {/* Left: Timeline */}
        <div style={S.timelinePanel}>
          <h3 style={S.sectionTitle}>📍 Timeline de seguimiento</h3>
          <div style={S.timeline}>
            {e.timeline.map((step, i) => {
              const stepEst = ESTADOS[step.estado] || {};
              const isLast = i === e.timeline.length - 1;
              const date = new Date(step.fecha);
              return (
                <div key={i} style={S.timelineStep}>
                  <div style={S.timelineDot}>
                    <div style={{
                      ...S.dot,
                      background: isLast ? stepEst.color : 'var(--border)',
                      boxShadow: isLast ? `0 0 12px ${stepEst.color}` : 'none',
                    }}>
                      <span style={{ fontSize: 12 }}>{stepEst.icon}</span>
                    </div>
                    {i < e.timeline.length - 1 && <div style={S.line} />}
                  </div>
                  <div style={S.stepContent}>
                    <div style={S.stepHeader}>
                      <span style={{ ...S.stepTitle, color: isLast ? stepEst.color : 'var(--text)' }}>
                        {step.desc}
                      </span>
                      <span style={S.stepDate}>
                        {date.toLocaleDateString('es-ES')} {date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div style={S.stepDetail}>{step.detalle}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Details */}
        <div style={S.detailPanel}>
          {/* Destinatario */}
          <div style={S.detailCard}>
            <h4 style={S.cardTitle}>📬 Destinatario</h4>
            <div style={S.detailRow}><span style={S.detailLabel}>Nombre</span><span style={S.detailValue}>{e.nom_ent}</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Contacto</span><span style={S.detailValue}>{e.per_ent}</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Dirección</span><span style={S.detailValue}>{e.dir_ent}</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Ciudad</span><span style={S.detailValue}>{e.cp_ent} {e.pob_ent} ({e.pais_ent})</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Teléfono</span><span style={S.detailValue}>{e.tel_ent}</span></div>
          </div>

          {/* Envío */}
          <div style={S.detailCard}>
            <h4 style={S.cardTitle}>📦 Detalles del envío</h4>
            <div style={S.detailRow}><span style={S.detailLabel}>Servicio</span><span style={{ ...S.detailValue, color: 'var(--nacex)' }}>{svc.name} ({e.tip_ser})</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Bultos</span><span style={S.detailValue}>{e.bultos}</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Peso</span><span style={S.detailValue}>{e.peso} kg</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Portes</span><span style={S.detailValue}>{PORTES[e.portes]} ({e.portes})</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Ruta</span>
              <span style={S.detailValue}>
                <span style={{ ...S.routeBadge, background: e.color }}>{e.route}</span> Cod: {e.code}
              </span>
            </div>
            {e.reem && <div style={S.detailRow}><span style={S.detailLabel}>Reembolso</span><span style={{ ...S.detailValue, color: 'var(--yellow)' }}>💰 {e.importe_ree}€</span></div>}
          </div>

          {/* Remitente */}
          <div style={S.detailCard}>
            <h4 style={S.cardTitle}>🏢 Remitente</h4>
            <div style={S.detailRow}><span style={S.detailLabel}>Nombre</span><span style={S.detailValue}>{e.nom_rec}</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Dirección</span><span style={S.detailValue}>{e.dir_rec}</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Ciudad</span><span style={S.detailValue}>{e.cp_rec} {e.pob_rec}</span></div>
          </div>

          {/* Barcodes */}
          <div style={S.detailCard}>
            <h4 style={S.cardTitle}>⊞ Códigos</h4>
            <div style={S.detailRow}><span style={S.detailLabel}>Barcode</span><span style={{ ...S.detailValue, fontFamily: 'var(--mono)', fontSize: 12 }}>{e.barcode}</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Barcode NX</span><span style={{ ...S.detailValue, fontFamily: 'var(--mono)', fontSize: 12 }}>{e.barcode_nx}</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Referencia</span><span style={S.detailValue}>{e.ref_cli}</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Pedido</span><span style={S.detailValue}>#{e.id_order}</span></div>
            <div style={S.detailRow}><span style={S.detailLabel}>Fecha</span><span style={S.detailValue}>{e.fecha_str} {e.hora_str}</span></div>
          </div>

          {e.obs && (
            <div style={{ ...S.detailCard, borderLeft: '3px solid var(--yellow)' }}>
              <h4 style={S.cardTitle}>💬 Observaciones</h4>
              <div style={{ fontSize: 13, lineHeight: 1.6, fontStyle: 'italic' }}>{e.obs}</div>
            </div>
          )}

          {/* Tracking link */}
          <div style={S.trackingLink}>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Tracking Nacex:</span>
            <code style={S.trackingUrl}>
              nacex.com/seguimientoDetalle.do?agencia_origen=...&numero_albaran={e.expedicion}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

const S = {
  wrap: { height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  empty: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 4 },
  header: {
    display: 'flex', alignItems: 'center', gap: 16, padding: '12px 20px',
    borderBottom: '1px solid var(--border)', flexShrink: 0,
  },
  headerInfo: { display: 'flex', alignItems: 'center', gap: 12 },
  expTitle: { fontSize: 18, fontWeight: 800, fontFamily: 'var(--mono)' },
  body: { display: 'flex', flex: 1, overflow: 'hidden' },
  // Timeline
  timelinePanel: { width: 380, minWidth: 380, borderRight: '1px solid var(--border)', padding: 20, overflowY: 'auto' },
  sectionTitle: { fontSize: 14, fontWeight: 700, marginBottom: 20 },
  timeline: { display: 'flex', flexDirection: 'column' },
  timelineStep: { display: 'flex', gap: 14 },
  timelineDot: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: 28, flexShrink: 0 },
  dot: { width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' },
  line: { width: 2, flex: 1, background: 'var(--border)', minHeight: 30 },
  stepContent: { flex: 1, paddingBottom: 24 },
  stepHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  stepTitle: { fontSize: 13, fontWeight: 700 },
  stepDate: { fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'var(--mono)' },
  stepDetail: { fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 },
  // Details
  detailPanel: { flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 },
  detailCard: {
    background: 'var(--card)', borderRadius: 'var(--radius)', padding: '14px 16px',
    border: '1px solid var(--border)',
  },
  cardTitle: { fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 },
  detailRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0', borderBottom: '1px solid var(--border)' },
  detailLabel: { fontSize: 11, color: 'var(--text-secondary)', fontWeight: 600 },
  detailValue: { fontSize: 13, fontWeight: 600, textAlign: 'right' },
  routeBadge: { color: '#fff', padding: '1px 8px', borderRadius: 4, fontSize: 11, fontWeight: 800, marginRight: 6 },
  trackingLink: { display: 'flex', flexDirection: 'column', gap: 4, padding: '10px 0' },
  trackingUrl: { fontSize: 11, color: 'var(--blue)', fontFamily: 'var(--mono)', wordBreak: 'break-all' },
};
