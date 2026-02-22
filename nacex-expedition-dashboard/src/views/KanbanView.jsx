import { useMemo } from 'react';
import { KANBAN_COLUMNS, ESTADOS } from '../data/constants';
import { StatusBadge } from '../components/UI';

export default function KanbanView({ expeditions, onSelect }) {
  const columns = useMemo(() => {
    return KANBAN_COLUMNS.map(col => ({
      ...col,
      items: expeditions.filter(e => e.estado === col.estado).slice(0, 20),
      total: expeditions.filter(e => e.estado === col.estado).length,
    }));
  }, [expeditions]);

  return (
    <div style={S.wrap}>
      <div style={S.header}>
        <h2 style={S.title}>📋 Kanban — Flujo de expediciones</h2>
        <span style={S.sub}>Mostrando máx. 20 por columna de {expeditions.length} totales</span>
      </div>
      <div style={S.board}>
        {columns.map(col => {
          const est = ESTADOS[col.estado];
          return (
            <div key={col.id} style={S.column}>
              <div style={S.colHeader}>
                <span style={{ ...S.colTitle, color: est.color }}>
                  {est.icon} {col.title}
                </span>
                <span style={S.colCount}>{col.total}</span>
              </div>
              <div style={S.colBody}>
                {col.items.map(e => (
                  <div key={e.id} style={S.card} onClick={() => onSelect(e)}>
                    <div style={S.cardTop}>
                      <span style={S.cardCode}>{e.cod_exp}</span>
                      <span style={S.cardTime}>{e.hora_str}</span>
                    </div>
                    <div style={S.cardName}>{e.nom_ent.substring(0, 24)}</div>
                    <div style={S.cardCity}>{e.pob_ent} · {e.cp_ent}</div>
                    <div style={S.cardBottom}>
                      <span style={S.cardSvc}>{e.servicio}</span>
                      <span style={S.cardBultos}>{e.bultos}b · {e.peso}kg</span>
                    </div>
                    {e.reem && <div style={S.reemTag}>💰 {e.importe_ree}€</div>}
                    {e.obs && <div style={S.obsTag}>💬 {e.obs.substring(0, 30)}</div>}
                  </div>
                ))}
                {col.items.length === 0 && (
                  <div style={S.empty}>Sin expediciones</div>
                )}
                {col.total > 20 && (
                  <div style={S.more}>+{col.total - 20} más</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const S = {
  wrap: { height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  header: { padding: '14px 20px', borderBottom: '1px solid var(--border)', flexShrink: 0 },
  title: { fontSize: 16, fontWeight: 700, margin: 0 },
  sub: { fontSize: 11, color: 'var(--text-secondary)' },
  board: { display: 'flex', gap: 12, padding: 16, flex: 1, overflow: 'auto' },
  column: {
    flex: 1, minWidth: 260, maxWidth: 340, display: 'flex', flexDirection: 'column',
    background: 'var(--bg-raised)', borderRadius: 'var(--radius)', border: '1px solid var(--border)',
    overflow: 'hidden',
  },
  colHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 14px', borderBottom: '1px solid var(--border)',
  },
  colTitle: { fontSize: 13, fontWeight: 800 },
  colCount: {
    fontSize: 12, fontWeight: 800, background: 'var(--card)', color: 'var(--text-secondary)',
    padding: '2px 10px', borderRadius: 20,
  },
  colBody: { flex: 1, overflowY: 'auto', padding: 8, display: 'flex', flexDirection: 'column', gap: 6 },
  card: {
    background: 'var(--card)', borderRadius: 'var(--radius-sm)', padding: '10px 12px',
    border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.15s',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardCode: { fontSize: 11, fontWeight: 700, fontFamily: 'var(--mono)', color: 'var(--nacex)' },
  cardTime: { fontSize: 10, color: 'var(--text-secondary)' },
  cardName: { fontSize: 12, fontWeight: 700, lineHeight: 1.3 },
  cardCity: { fontSize: 10, color: 'var(--text-secondary)', marginTop: 2 },
  cardBottom: { display: 'flex', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' },
  cardSvc: { fontSize: 9, fontWeight: 700, background: 'var(--nacex-glow)', color: 'var(--nacex)', padding: '1px 6px', borderRadius: 8 },
  cardBultos: { fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'var(--mono)' },
  reemTag: { fontSize: 10, fontWeight: 700, color: 'var(--yellow)', marginTop: 4 },
  obsTag: { fontSize: 9, color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: 3 },
  empty: { textAlign: 'center', padding: 30, color: 'var(--text-secondary)', fontSize: 12 },
  more: { textAlign: 'center', padding: 8, color: 'var(--text-secondary)', fontSize: 11, fontWeight: 600 },
};
