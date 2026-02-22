import { useState, useMemo } from 'react';
import { ESTADOS, SERVICIOS } from '../data/constants';
import { StatusBadge, SearchInput, FilterSelect, Btn } from '../components/UI';

const PAGE_SIZE = 15;

export default function TableView({ expeditions, onSelect }) {
  const [search, setSearch] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [filterSvc, setFilterSvc] = useState('');
  const [sortField, setSortField] = useState('fecha_creacion');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let data = [...expeditions];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(e =>
        e.cod_exp.includes(q) || e.nom_ent.toLowerCase().includes(q) ||
        e.pob_ent.toLowerCase().includes(q) || e.ref_cli.toLowerCase().includes(q) ||
        String(e.id_order).includes(q)
      );
    }
    if (filterEstado) data = data.filter(e => String(e.estado) === filterEstado);
    if (filterSvc) data = data.filter(e => e.tip_ser === filterSvc);

    data.sort((a, b) => {
      let va = a[sortField], vb = b[sortField];
      if (sortField === 'fecha_creacion') { va = new Date(va); vb = new Date(vb); }
      if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return data;
  }, [expeditions, search, filterEstado, filterSvc, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
    setPage(0);
  };

  const SortIcon = ({ field }) => (
    <span style={{ marginLeft: 3, opacity: sortField === field ? 1 : 0.3, fontSize: 10 }}>
      {sortField === field ? (sortDir === 'asc' ? '▲' : '▼') : '⇅'}
    </span>
  );

  return (
    <div style={S.wrap}>
      {/* Toolbar */}
      <div style={S.toolbar}>
        <div style={S.toolLeft}>
          <SearchInput value={search} onChange={v => { setSearch(v); setPage(0); }} placeholder="Buscar expedición, cliente, ciudad..." />
          <FilterSelect value={filterEstado} onChange={v => { setFilterEstado(v); setPage(0); }}
            placeholder="Todos los estados"
            options={Object.entries(ESTADOS).map(([k, v]) => ({ value: k, label: `${v.icon} ${v.name}` }))} />
          <FilterSelect value={filterSvc} onChange={v => { setFilterSvc(v); setPage(0); }}
            placeholder="Todos los servicios"
            options={Object.entries(SERVICIOS).map(([k, v]) => ({ value: k, label: v.name }))} />
        </div>
        <span style={S.count}>{filtered.length} expediciones</span>
      </div>

      {/* Table */}
      <div style={S.tableWrap}>
        <table style={S.table}>
          <thead>
            <tr>
              {[
                { key: 'cod_exp', label: 'Expedición' },
                { key: 'estado', label: 'Estado' },
                { key: 'nom_ent', label: 'Destinatario' },
                { key: 'pob_ent', label: 'Ciudad' },
                { key: 'tip_ser', label: 'Servicio' },
                { key: 'bultos', label: 'Bultos' },
                { key: 'peso', label: 'Peso' },
                { key: 'fecha_creacion', label: 'Fecha' },
              ].map(col => (
                <th key={col.key} style={S.th} onClick={() => toggleSort(col.key)}>
                  {col.label}<SortIcon field={col.key} />
                </th>
              ))}
              <th style={S.th}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {paged.map(e => (
              <tr key={e.id} style={S.tr} onDoubleClick={() => onSelect(e)}>
                <td style={S.td}>
                  <div style={S.expCol}>
                    <span style={S.expCode}>{e.cod_exp}</span>
                    <span style={S.expRef}>#{e.id_order} · {e.ref_cli}</span>
                  </div>
                </td>
                <td style={S.td}><StatusBadge estado={e.estado} /></td>
                <td style={S.td}>
                  <div style={S.destCol}>
                    <span style={S.destName}>{e.nom_ent.substring(0, 22)}</span>
                    <span style={S.destSub}>{e.per_ent}</span>
                  </div>
                </td>
                <td style={S.td}>
                  <span>{e.pob_ent}</span>
                  <span style={S.subText}>{e.cp_ent} {e.pais_ent}</span>
                </td>
                <td style={S.td}><span style={S.svcBadge}>{e.servicio}</span></td>
                <td style={{ ...S.td, textAlign: 'center' }}>{e.bultos}</td>
                <td style={{ ...S.td, textAlign: 'right', fontFamily: 'var(--mono)', fontSize: 12 }}>{e.peso}kg</td>
                <td style={S.td}>
                  <span style={S.dateText}>{e.fecha_str}</span>
                  <span style={S.subText}>{e.hora_str}</span>
                </td>
                <td style={S.td}>
                  <Btn variant="soft" onClick={() => onSelect(e)}>📍 Ver</Btn>
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr><td colSpan={9} style={{ ...S.td, textAlign: 'center', padding: 40, color: 'var(--text-secondary)' }}>
                No se encontraron expediciones
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={S.pagination}>
          <Btn variant="ghost" onClick={() => setPage(Math.max(0, page - 1))} style={{ opacity: page === 0 ? 0.4 : 1 }}>← Anterior</Btn>
          <span style={S.pageInfo}>Página {page + 1} de {totalPages}</span>
          <Btn variant="ghost" onClick={() => setPage(Math.min(totalPages - 1, page + 1))} style={{ opacity: page >= totalPages - 1 ? 0.4 : 1 }}>Siguiente →</Btn>
        </div>
      )}
    </div>
  );
}

const S = {
  wrap: { display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' },
  toolbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 20px', borderBottom: '1px solid var(--border)', flexShrink: 0, flexWrap: 'wrap', gap: 8,
  },
  toolLeft: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' },
  count: { fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 },
  tableWrap: { flex: 1, overflow: 'auto', padding: '0 20px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 13 },
  th: {
    textAlign: 'left', padding: '10px 8px', fontSize: 11, fontWeight: 700,
    color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 0.3,
    borderBottom: '1px solid var(--border)', cursor: 'pointer', whiteSpace: 'nowrap',
    position: 'sticky', top: 0, background: 'var(--bg-raised)', zIndex: 2,
    userSelect: 'none',
  },
  tr: { borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.1s' },
  td: { padding: '10px 8px', verticalAlign: 'middle' },
  expCol: { display: 'flex', flexDirection: 'column', gap: 2 },
  expCode: { fontWeight: 700, fontFamily: 'var(--mono)', fontSize: 12 },
  expRef: { fontSize: 10, color: 'var(--text-secondary)' },
  destCol: { display: 'flex', flexDirection: 'column', gap: 1 },
  destName: { fontWeight: 600, fontSize: 12 },
  destSub: { fontSize: 10, color: 'var(--text-secondary)' },
  subText: { display: 'block', fontSize: 10, color: 'var(--text-secondary)' },
  svcBadge: { fontSize: 10, fontWeight: 700, background: 'var(--nacex-glow)', color: 'var(--nacex)', padding: '2px 8px', borderRadius: 12 },
  dateText: { fontSize: 12, fontWeight: 600 },
  pagination: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12,
    padding: '12px 20px', borderTop: '1px solid var(--border)', flexShrink: 0,
  },
  pageInfo: { fontSize: 12, color: 'var(--text-secondary)' },
};
