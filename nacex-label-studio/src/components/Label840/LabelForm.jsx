import { useState } from 'react';
import { SERVICIOS, ENVASES, PORTES } from '../../constants/services';
import { Field, SelectField, Checkbox, SectionTitle, Separator, Hint, Row2, Row3 } from '../FormFields';

const TABS = [
  { id: 'destinatario', label: 'Destinatario', icon: '📬' },
  { id: 'envio', label: 'Envío', icon: '📦' },
  { id: 'ruta', label: 'Ruta', icon: '🗺️' },
  { id: 'barcode', label: 'Barcodes', icon: '⊞' },
  { id: 'extra', label: 'Extra', icon: '⚙️' },
];

export default function LabelForm({ data, update, zoom, setZoom }) {
  const [activeTab, setActiveTab] = useState('destinatario');
  const svc = SERVICIOS[data.servicio] || {};
  const isInt = svc.tipo === 'internacional';

  return (
    <aside style={styles.sidebar}>
      {/* Tabs */}
      <nav style={styles.tabNav}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              ...styles.tab,
              ...(activeTab === t.id ? styles.tabActive : {}),
            }}
          >
            <span style={{ fontSize: 14 }}>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </nav>

      <div style={styles.formArea}>
        <div style={styles.formGroup}>
          {/* ── Destinatario ── */}
          {activeTab === 'destinatario' && (
            <>
              <Field label="Nombre / Empresa" value={data.client} onChange={(v) => update('client', v)} />
              <Field label="Dirección" value={data.address} onChange={(v) => update('address', v)} />
              <Row2>
                <Field label="C.P." value={data.postcode} onChange={(v) => update('postcode', v)} />
                <Field label="Ciudad" value={data.city_ent} onChange={(v) => update('city_ent', v)} />
              </Row2>
              <Field label="Atención de" value={data.per_ent} onChange={(v) => update('per_ent', v)} />
              <Field label="Teléfono" value={data.phone} onChange={(v) => update('phone', v)} />
              <Row2>
                <Field label="País" value={data.pais} onChange={(v) => update('pais', v)} />
                <SelectField
                  label="Servicio"
                  value={data.servicio}
                  onChange={(v) => update('servicio', v)}
                  options={Object.entries(SERVICIOS).map(([k, s]) => ({
                    value: k,
                    label: `${s.nombre_etiqueta} (${k})`,
                  }))}
                />
              </Row2>
              <Field label="Observaciones" value={data.obs} onChange={(v) => update('obs', v)} />
            </>
          )}

          {/* ── Envío ── */}
          {activeTab === 'envio' && (
            <>
              <Row2>
                <Field label="Fecha" value={data.fecha} onChange={(v) => update('fecha', v)} />
                <Field label="Abonado" value={data.abonado} onChange={(v) => update('abonado', v)} />
              </Row2>
              <Row3>
                <SelectField
                  label="Portes"
                  value={data.portes}
                  onChange={(v) => update('portes', v)}
                  options={Object.entries(PORTES).map(([k, v]) => ({ value: k, label: `${k} - ${v}` }))}
                />
                <SelectField
                  label="Envase"
                  value={data.envase}
                  onChange={(v) => update('envase', v)}
                  options={Object.entries(ENVASES).map(([k, v]) => ({ value: k, label: v }))}
                />
                <Field label="Bultos" value={data.bultos} onChange={(v) => update('bultos', v)} type="number" />
              </Row3>
              <Field label="Total bultos" value={data.totalBultos} onChange={(v) => update('totalBultos', v)} type="number" />
              <Checkbox label="Reembolso" checked={data.reem} onChange={(v) => update('reem', v)} />
              {data.reem && (
                <Field label="Importe reembolso (€)" value={data.amount} onChange={(v) => update('amount', v)} type="number" />
              )}
              <Separator />
              <SectionTitle>Remitente</SectionTitle>
              <Field label="Nombre" value={data.remitente} onChange={(v) => update('remitente', v)} />
              <Field label="Dirección" value={data.dir_rec} onChange={(v) => update('dir_rec', v)} />
              <Row2>
                <Field label="C.P." value={data.cp_rec} onChange={(v) => update('cp_rec', v)} />
                <Field label="Ciudad" value={data.pob_rec} onChange={(v) => update('pob_rec', v)} />
              </Row2>
            </>
          )}

          {/* ── Ruta ── */}
          {activeTab === 'ruta' && (
            <>
              <Field label="Ruta" value={data.route} onChange={(v) => update('route', v)} />
              <Row2>
                <Field label="Color ruta" value={data.color} onChange={(v) => update('color', v)} type="color" />
                <Field label="Código destino" value={data.code} onChange={(v) => update('code', v)} />
              </Row2>
              <Hint>
                El color y la ruta se asignan automáticamente por el webservice Nacex según el C.P. destino.
              </Hint>
            </>
          )}

          {/* ── Barcodes ── */}
          {activeTab === 'barcode' && (
            <>
              <Field label="Barcode 1 (expedición)" value={data.barcode1} onChange={(v) => update('barcode1', v)} />
              <Hint>Formato: 840 + bultos + agencia + nº expedición + checksum</Hint>
              <Field label="Barcode 2 (NX)" value={data.barcode2} onChange={(v) => update('barcode2', v)} />
              <Hint>Formato: NX + servicio + país + CP destino (7 dígitos)</Hint>
              <Separator />
              <Field label="Referencia" value={data.ref} onChange={(v) => update('ref', v)} />
              <Field label="Ref. CMS / Pedido" value={data.ref_cms} onChange={(v) => update('ref_cms', v)} />
            </>
          )}

          {/* ── Extra ── */}
          {activeTab === 'extra' && (
            <>
              <Checkbox label="Es NacexShop" checked={data.es_nacexshop} onChange={(v) => update('es_nacexshop', v)} />
              {data.es_nacexshop && (
                <Field label="Alias punto entrega" value={data.alias} onChange={(v) => update('alias', v)} />
              )}
              {isInt && (
                <>
                  <SectionTitle>Datos Aduaneros</SectionTitle>
                  <Field label="Contenido" value={data.contenido} onChange={(v) => update('contenido', v)} />
                  <Field label="Valor declarado (€)" value={data.valor_declarado} onChange={(v) => update('valor_declarado', v)} />
                </>
              )}
              <Separator />
              <SectionTitle>Zoom preview</SectionTitle>
              <input
                type="range"
                min={50}
                max={150}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--nacex)' }}
              />
              <Hint>{zoom}%</Hint>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: 340,
    minWidth: 340,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid var(--border)',
    background: 'var(--surface)',
    overflow: 'hidden',
  },
  tabNav: {
    display: 'flex',
    borderBottom: '1px solid var(--border)',
    overflow: 'hidden',
    flexShrink: 0,
  },
  tab: {
    flex: 1,
    padding: '10px 4px',
    background: 'transparent',
    color: 'var(--muted)',
    border: 'none',
    borderBottom: '2px solid transparent',
    fontSize: 11,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    fontFamily: 'inherit',
  },
  tabActive: {
    color: 'var(--nacex)',
    borderBottomColor: 'var(--nacex)',
    background: 'rgba(255, 80, 0, 0.06)',
  },
  formArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '14px 16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
};
