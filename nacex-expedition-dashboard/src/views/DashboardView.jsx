import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, CartesianGrid } from 'recharts';
import { ESTADOS, SERVICIOS } from '../data/constants';
import { StatCard, StatusBadge } from '../components/UI';

export default function DashboardView({ expeditions }) {
  const stats = useMemo(() => {
    const total = expeditions.length;
    const byEstado = {};
    const bySvc = {};
    const byCity = {};
    const byDay = {};
    let totalPeso = 0;
    let totalReem = 0;
    let countReem = 0;

    expeditions.forEach(e => {
      byEstado[e.estado] = (byEstado[e.estado] || 0) + 1;
      bySvc[e.tip_ser] = (bySvc[e.tip_ser] || 0) + 1;
      byCity[e.pob_ent] = (byCity[e.pob_ent] || 0) + 1;
      totalPeso += e.peso;
      if (e.reem) { totalReem += parseFloat(e.importe_ree); countReem++; }

      const day = new Date(e.fecha_creacion).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
      byDay[day] = (byDay[day] || 0) + 1;
    });

    const estadoData = Object.entries(byEstado).map(([k, v]) => ({
      name: ESTADOS[k]?.name || k, value: v, color: ESTADOS[k]?.color?.replace('var(--', '').replace(')', '') || 'gray',
    }));

    const svcData = Object.entries(bySvc)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([k, v]) => ({ name: SERVICIOS[k]?.name || k, value: v }));

    const cityData = Object.entries(byCity)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([k, v]) => ({ name: k, value: v }));

    const dayData = Object.entries(byDay)
      .sort((a, b) => {
        const [dA, mA] = a[0].split('/'); const [dB, mB] = b[0].split('/');
        return (parseInt(mA) * 100 + parseInt(dA)) - (parseInt(mB) * 100 + parseInt(dB));
      })
      .slice(-14)
      .map(([k, v]) => ({ day: k, expediciones: v }));

    return {
      total, byEstado, estadoData, svcData, cityData, dayData,
      entregados: byEstado[4] || 0,
      enTransito: (byEstado[2] || 0) + (byEstado[3] || 0),
      pendientes: byEstado[1] || 0,
      incidencias: (byEstado[5] || 0) + (byEstado[9] || 0),
      pesoMedio: total ? (totalPeso / total).toFixed(1) : 0,
      totalReem: totalReem.toFixed(2),
      countReem,
    };
  }, [expeditions]);

  const PIE_COLORS = ['#eab308', '#3b82f6', '#06b6d4', '#22c55e', '#a855f7', '#ef4444'];

  const recent = expeditions.slice(0, 5);

  return (
    <div style={S.wrap}>
      {/* Stats row */}
      <div style={S.statsRow}>
        <StatCard label="Total expediciones" value={stats.total} icon="📊" color="var(--nacex)" sub="Últimos 30 días" />
        <StatCard label="Entregados" value={stats.entregados} icon="✅" color="var(--green)" sub={`${stats.total ? ((stats.entregados / stats.total) * 100).toFixed(0) : 0}% del total`} />
        <StatCard label="En tránsito" value={stats.enTransito} icon="🚛" color="var(--blue)" />
        <StatCard label="Pendientes" value={stats.pendientes} icon="📋" color="var(--yellow)" />
        <StatCard label="Incidencias" value={stats.incidencias} icon="⚠️" color="var(--red)" />
      </div>

      {/* Charts row */}
      <div style={S.chartsRow}>
        {/* Area chart - volume */}
        <div style={S.chartCard}>
          <h3 style={S.chartTitle}>Expediciones / día</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={stats.dayData}>
              <defs>
                <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF5000" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF5000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
              <XAxis dataKey="day" tick={{ fill: '#9898b0', fontSize: 10 }} />
              <YAxis tick={{ fill: '#9898b0', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#1c1c28', border: '1px solid #2a2a3a', borderRadius: 8, color: '#e8e8f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="expediciones" stroke="#FF5000" strokeWidth={2} fill="url(#colorExp)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie - estados */}
        <div style={S.chartCard}>
          <h3 style={S.chartTitle}>Por estado</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={stats.estadoData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={45} paddingAngle={3} strokeWidth={0}>
                {stats.estadoData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1c1c28', border: '1px solid #2a2a3a', borderRadius: 8, color: '#e8e8f0', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={S.legendRow}>
            {stats.estadoData.map((e, i) => (
              <span key={i} style={S.legendItem}>
                <span style={{ ...S.legendDot, background: PIE_COLORS[i % PIE_COLORS.length] }} />
                {e.name} ({e.value})
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={S.chartsRow}>
        {/* Bar - by service */}
        <div style={S.chartCard}>
          <h3 style={S.chartTitle}>Por servicio</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={stats.svcData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
              <XAxis type="number" tick={{ fill: '#9898b0', fontSize: 10 }} />
              <YAxis type="category" dataKey="name" tick={{ fill: '#9898b0', fontSize: 10 }} width={110} />
              <Tooltip contentStyle={{ background: '#1c1c28', border: '1px solid #2a2a3a', borderRadius: 8, color: '#e8e8f0', fontSize: 12 }} />
              <Bar dataKey="value" fill="#FF5000" radius={[0, 4, 4, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent list */}
        <div style={S.chartCard}>
          <h3 style={S.chartTitle}>Últimas expediciones</h3>
          <div style={S.recentList}>
            {recent.map(e => (
              <div key={e.id} style={S.recentItem}>
                <div style={S.recentLeft}>
                  <span style={S.recentCode}>{e.cod_exp}</span>
                  <span style={S.recentName}>{e.nom_ent}</span>
                </div>
                <div style={S.recentRight}>
                  <StatusBadge estado={e.estado} />
                  <span style={S.recentDate}>{e.fecha_str} {e.hora_str}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={S.extraStats}>
            <div style={S.extraStat}>
              <span style={S.extraLabel}>Peso medio</span>
              <span style={S.extraValue}>{stats.pesoMedio} kg</span>
            </div>
            <div style={S.extraStat}>
              <span style={S.extraLabel}>Reembolsos</span>
              <span style={S.extraValue}>{stats.countReem} ({stats.totalReem}€)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const S = {
  wrap: { padding: 20, overflowY: 'auto', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 },
  statsRow: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  chartsRow: { display: 'flex', gap: 12, flex: 1, minHeight: 0 },
  chartCard: {
    flex: 1, background: 'var(--card)', borderRadius: 'var(--radius)', padding: 18,
    border: '1px solid var(--border)', minWidth: 0, display: 'flex', flexDirection: 'column',
  },
  chartTitle: { fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
  legendRow: { display: 'flex', flexWrap: 'wrap', gap: '6px 14px', marginTop: 8 },
  legendItem: { display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--text-secondary)' },
  legendDot: { width: 8, height: 8, borderRadius: '50%', flexShrink: 0 },
  recentList: { display: 'flex', flexDirection: 'column', gap: 6, flex: 1 },
  recentItem: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 10px', background: 'var(--bg-raised)', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
  },
  recentLeft: { display: 'flex', flexDirection: 'column', gap: 2 },
  recentCode: { fontSize: 12, fontWeight: 700, fontFamily: 'var(--mono)' },
  recentName: { fontSize: 11, color: 'var(--text-secondary)' },
  recentRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 },
  recentDate: { fontSize: 10, color: 'var(--text-secondary)' },
  extraStats: { display: 'flex', gap: 12, marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border)' },
  extraStat: { flex: 1, display: 'flex', flexDirection: 'column', gap: 2 },
  extraLabel: { fontSize: 10, color: 'var(--text-secondary)', textTransform: 'uppercase' },
  extraValue: { fontSize: 16, fontWeight: 700 },
};
