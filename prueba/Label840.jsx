import { useState, useRef, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   CONSTANTES (equivalentes a Constantes.php)
   ═══════════════════════════════════════════════════════ */
const SERVICIOS = {
  "01": { code: "01", nombre: "NACEX 10:00H", nombre_etiqueta: "NACEX 10:00H", delay: "Entrega antes de las 10:00H", tipo: "nacex" },
  "02": { code: "02", nombre: "NACEX 12:00H", nombre_etiqueta: "NACEX 12:00H", delay: "Entrega antes de las 12:00H", tipo: "nacex" },
  "04": { code: "04", nombre: "NACEX 19:00H", nombre_etiqueta: "NACEX 19:00H", delay: "Entrega antes de las 19:00H", tipo: "nacex" },
  "08": { code: "08", nombre: "PLUS BAG", nombre_etiqueta: "PLUS BAG", delay: "Entrega dia siguiente", tipo: "nacex" },
  "09": { code: "09", nombre: "E-NACEX", nombre_etiqueta: "E-NACEX", delay: "Entrega 24/48h", tipo: "nacex" },
  "31": { code: "31", nombre: "E-NACEXSHOP", nombre_etiqueta: "NACEXSHOP", delay: "Entrega en punto", tipo: "nacexshop" },
  "37": { code: "37", nombre: "NACEXSHOP PREMIUM", nombre_etiqueta: "NACEXSHOP PREM", delay: "Entrega en punto premium", tipo: "nacexshop" },
  A: { code: "A", nombre: "BUSINESS EUROPA", nombre_etiqueta: "INT EUROPA", delay: "2-5 dias", tipo: "internacional" },
  B: { code: "B", nombre: "E-COMMERCE EUROPA", nombre_etiqueta: "INT ECOMM", delay: "3-7 dias", tipo: "internacional" },
};

const ENVASES = { "0": "DOCS", "1": "BAG", "2": "PAQ" };
const PORTES = { O: "Origen", D: "Destino", T: "Tercera" };

const DEFAULT_DATA = {
  // Servicio
  servicio: "04",
  fecha: new Date().toLocaleDateString("es-ES"),
  // Remitente
  remitente: "MI TIENDA ONLINE SL",
  dir_rec: "Pol. Industrial Zona Franca, Nave 12",
  cp_rec: "08040",
  pob_rec: "Barcelona",
  tel_rec: "934 567 890",
  // Destinatario
  client: "JUAN GARCIA LOPEZ",
  address: "Calle Gran Via, 45 3o B",
  postcode: "28013",
  city_ent: "MADRID",
  per_ent: "Juan Garcia",
  phone: "+34 612 345 678",
  pais: "ES",
  // Envio
  portes: "O",
  envase: "2",
  bultos: "1",
  totalBultos: "1",
  // Ruta
  route: "R015",
  color: "#E20613",
  code: "0028",
  // Barcode
  barcode1: "840001000185453141",
  barcode2: "NX04ES0028013",
  // Reembolso
  reem: false,
  amount: "0.00",
  // Obs
  obs: "Entregar en horario de mañana",
  // Referencia
  ref: "pedido_1042",
  ref_cms: "1042",
  // NacexShop
  es_nacexshop: false,
  alias: "",
  // Internacional
  contenido: "",
  valor_declarado: "",
  // Abonado
  abonado: "0001/001",
  contador: "001",
};

/* ═══════════════════════════════════════════════════════
   SVG BARCODE (Code128 puro en canvas)
   ═══════════════════════════════════════════════════════ */
function BarcodeCanvas({ value, height = 60, fontSize = 11, showText = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !value) return;
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const encoded = encodeCode128(value);
      const barWidth = 1.5;
      const totalWidth = encoded.length * barWidth + 20;
      canvas.width = totalWidth;
      canvas.height = height + (showText ? fontSize + 8 : 0);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000";
      let x = 10;
      for (let i = 0; i < encoded.length; i++) {
        if (encoded[i] === "1") ctx.fillRect(x, 0, barWidth, height);
        x += barWidth;
      }
      if (showText) {
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.fillText(value, totalWidth / 2, height + fontSize + 2);
      }
    } catch (e) {
      /* silent */
    }
  }, [value, height, fontSize, showText]);

  return <canvas ref={canvasRef} style={{ display: "block", maxWidth: "100%" }} />;
}

/* Code128B encoder */
function encodeCode128(data) {
  const START_B = 104;
  const STOP = 106;
  const patterns = [
    "11011001100","11001101100","11001100110","10010011000","10010001100",
    "10001001100","10011001000","10011000100","10001100100","11001001000",
    "11001000100","11000100100","10110011100","10011011100","10011001110",
    "10111001100","10011101100","10011100110","11001110010","11001011100",
    "11001001110","11011100100","11001110100","11100101100","11100100110",
    "11101100100","11100110100","11100110010","11011011000","11011000110",
    "11000110110","10100011000","10001011000","10001000110","10110001000",
    "10001101000","10001100010","11010001000","11000101000","11000100010",
    "10110111000","10110001110","10001101110","10111011000","10111000110",
    "10001110110","11101110110","11010001110","11000101110","11011101000",
    "11011100010","11011101110","11101011000","11101000110","11100010110",
    "11101101000","11101100010","11100011010","11101111010","11001000010",
    "11110001010","10100110000","10100001100","10010110000","10010000110",
    "10000101100","10000100110","10110010000","10110000100","10011010000",
    "10011000010","10000110100","10000110010","11000010010","11001010000",
    "11110111010","11000010100","10001111010","10100111100","10010111100",
    "10010011110","10111100100","10011110100","10011110010","11110100100",
    "11110010100","11110010010","11011011110","11011110110","11110110110",
    "10101111000","10100011110","10001011110","10111101000","10111100010",
    "11110101000","11110100010","10111011110","10111101110","11101011110",
    "11110101110","11010000100","11010010000","11010011100","1100011101011",
  ];

  let checksum = START_B;
  let result = patterns[START_B];
  for (let i = 0; i < data.length; i++) {
    const code = data.charCodeAt(i) - 32;
    if (code >= 0 && code < 95) {
      result += patterns[code];
      checksum += code * (i + 1);
    }
  }
  result += patterns[checksum % 103];
  result += patterns[STOP];
  return result;
}

/* ═══════════════════════════════════════════════════════
   ZPL GENERATOR
   ═══════════════════════════════════════════════════════ */
function generateZPL(d) {
  const svc = SERVICIOS[d.servicio] || {};
  const envName = ENVASES[d.envase] || "PAQ";
  const portName = PORTES[d.portes] || "Origen";
  const isInt = svc.tipo === "internacional";

  return `^XA

^FX === NACEX ETIQUETA 840 ===

^FX -- Header --
^CF0,50
^FO30,30^FDNACEX^FS
^CF0,20
^FO230,35^FD${svc.nombre_etiqueta || ""}^FS
^FO30,80^GB750,3,3^FS

^FX -- Abonado y fecha --
^CFA,20
^FO30,100^FDAbonado: ${d.abonado}^FS
^FO400,100^FDFecha: ${d.fecha}^FS
^FO30,130^FDServicio: ${svc.nombre || ""} (${d.servicio})^FS
^FO400,130^FDRef: ${d.ref}^FS
^FO30,160^GB750,3,3^FS

^FX -- Destinatario --
^CF0,35
^FO30,180^FDDestinatario:^FS
^CF0,30
^FO30,225^FD${d.client.substring(0, 25).toUpperCase()}^FS
^CFA,24
^FO30,265^FD${d.address}^FS
^FO30,295^FD${d.postcode} ${d.city_ent.toUpperCase()}^FS
^FO30,325^FDAtt: ${d.per_ent}^FS
^FO30,355^FDTel: ${d.phone}^FS
^FO30,385^GB750,3,3^FS

^FX -- Detalles --
^CFA,22
^FO30,405^FDBultos: ${d.bultos}/${d.totalBultos}^FS
^FO200,405^FDPortes: ${portName}^FS
^FO450,405^FDEnvase: ${envName}^FS
${d.reem ? `^FO30,435^FDReembolso: ${Number(d.amount).toFixed(2)}€^FS` : ""}

^FX -- Ruta --
^FO30,470^GB750,3,3^FS
^FO30,485^GB120,80,120^FS
^FR
^CF0,50
^FO45,498^FD${d.route}^FS
^FR
^CF0,24
^FO170,495^FDCod. Destino: ${d.code}^FS
^FO170,525^FDPais: ${d.pais}^FS
${isInt ? `^FO30,570^GB750,3,3^FS
^CFA,20
^FO30,585^FDContenido: ${d.contenido}^FS
^FO30,610^FDValor declarado: ${d.valor_declarado}^FS` : ""}

^FX -- Observaciones --
^FO30,${isInt ? "640" : "575"}^GB750,3,3^FS
^CFA,20
^FO30,${isInt ? "655" : "590"}^FDObs: ${d.obs}^FS

^FX -- Barcode 1 --
^FO30,${isInt ? "690" : "625"}^GB750,3,3^FS
^BY3,2,140
^FO100,${isInt ? "710" : "645"}^BC^FD${d.barcode1}^FS

^FX -- Barcode 2 --
^BY2,2,60
^FO200,${isInt ? "880" : "810"}^BC^FD${d.barcode2}^FS

^FX -- Footer --
^FO30,${isInt ? "960" : "895"}^GB750,3,3^FS
^CFA,18
^FO30,${isInt ? "975" : "910"}^FDExp: ${d.barcode1}^FS
^FO350,${isInt ? "975" : "910"}^FDPedido: #${d.ref_cms}^FS
^FO600,${isInt ? "975" : "910"}^FDAg: ${d.abonado}^FS

^XZ`;
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Label840() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState("destinatario");
  const [showZpl, setShowZpl] = useState(false);
  const [zoom, setZoom] = useState(100);
  const labelRef = useRef(null);

  const svc = SERVICIOS[data.servicio] || {};
  const isInt = svc.tipo === "internacional";
  const isShop = svc.tipo === "nacexshop";
  const envName = ENVASES[data.envase] || "PAQ";
  const portName = PORTES[data.portes] || "Origen";

  const update = useCallback((field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const copyZpl = () => {
    navigator.clipboard.writeText(generateZPL(data));
  };

  const downloadZpl = () => {
    const blob = new Blob([generateZPL(data)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nacex-840-${data.ref_cms}.zpl`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* Tabs config */
  const tabs = [
    { id: "destinatario", label: "Destinatario", icon: "📬" },
    { id: "envio", label: "Envío", icon: "📦" },
    { id: "ruta", label: "Ruta", icon: "🗺️" },
    { id: "barcode", label: "Barcodes", icon: "⊞" },
    { id: "extra", label: "Extra", icon: "⚙️" },
  ];

  return (
    <div style={styles.app}>
      {/* ═══ HEADER ═══ */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <span style={styles.logo}>
            NACEX<span style={styles.logoAccent}>Label</span>
          </span>
          <span style={styles.headerBadge}>840 — Etiqueta Estándar</span>
        </div>
        <div style={styles.headerRight}>
          <button
            style={{ ...styles.btn, ...styles.btnGhost }}
            onClick={() => setShowZpl(!showZpl)}
          >
            {showZpl ? "◀ Editor" : "ZPL ▸"}
          </button>
          <button style={{ ...styles.btn, ...styles.btnAccent }} onClick={downloadZpl}>
            ⬇ Descargar ZPL
          </button>
        </div>
      </header>

      <div style={styles.layout}>
        {/* ═══ LEFT: FORM ═══ */}
        <aside style={styles.sidebar}>
          {/* Tabs */}
          <nav style={styles.tabNav}>
            {tabs.map((t) => (
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
            {/* ── Destinatario ── */}
            {activeTab === "destinatario" && (
              <div style={styles.formGroup}>
                <Field label="Nombre / Empresa" value={data.client} onChange={(v) => update("client", v)} />
                <Field label="Dirección" value={data.address} onChange={(v) => update("address", v)} />
                <div style={styles.row2}>
                  <Field label="C.P." value={data.postcode} onChange={(v) => update("postcode", v)} />
                  <Field label="Ciudad" value={data.city_ent} onChange={(v) => update("city_ent", v)} />
                </div>
                <Field label="Atención de" value={data.per_ent} onChange={(v) => update("per_ent", v)} />
                <Field label="Teléfono" value={data.phone} onChange={(v) => update("phone", v)} />
                <div style={styles.row2}>
                  <Field label="País" value={data.pais} onChange={(v) => update("pais", v)} />
                  <SelectField label="Servicio" value={data.servicio} onChange={(v) => update("servicio", v)}
                    options={Object.entries(SERVICIOS).map(([k, s]) => ({ value: k, label: `${s.nombre_etiqueta} (${k})` }))} />
                </div>
                <Field label="Observaciones" value={data.obs} onChange={(v) => update("obs", v)} />
              </div>
            )}

            {/* ── Envío ── */}
            {activeTab === "envio" && (
              <div style={styles.formGroup}>
                <div style={styles.row2}>
                  <Field label="Fecha" value={data.fecha} onChange={(v) => update("fecha", v)} />
                  <Field label="Abonado" value={data.abonado} onChange={(v) => update("abonado", v)} />
                </div>
                <div style={styles.row3}>
                  <SelectField label="Portes" value={data.portes} onChange={(v) => update("portes", v)}
                    options={Object.entries(PORTES).map(([k, v]) => ({ value: k, label: `${k} - ${v}` }))} />
                  <SelectField label="Envase" value={data.envase} onChange={(v) => update("envase", v)}
                    options={Object.entries(ENVASES).map(([k, v]) => ({ value: k, label: v }))} />
                  <Field label="Bultos" value={data.bultos} onChange={(v) => update("bultos", v)} type="number" />
                </div>
                <Field label="Total bultos" value={data.totalBultos} onChange={(v) => update("totalBultos", v)} type="number" />
                <div style={styles.checkRow}>
                  <label style={styles.checkLabel}>
                    <input type="checkbox" checked={data.reem} onChange={(e) => update("reem", e.target.checked)} style={styles.check} />
                    <span>Reembolso</span>
                  </label>
                </div>
                {data.reem && (
                  <Field label="Importe reembolso (€)" value={data.amount} onChange={(v) => update("amount", v)} type="number" />
                )}
                <div style={styles.separator} />
                <h4 style={styles.sectionTitle}>Remitente</h4>
                <Field label="Nombre" value={data.remitente} onChange={(v) => update("remitente", v)} />
                <Field label="Dirección" value={data.dir_rec} onChange={(v) => update("dir_rec", v)} />
                <div style={styles.row2}>
                  <Field label="C.P." value={data.cp_rec} onChange={(v) => update("cp_rec", v)} />
                  <Field label="Ciudad" value={data.pob_rec} onChange={(v) => update("pob_rec", v)} />
                </div>
              </div>
            )}

            {/* ── Ruta ── */}
            {activeTab === "ruta" && (
              <div style={styles.formGroup}>
                <Field label="Ruta" value={data.route} onChange={(v) => update("route", v)} />
                <div style={styles.row2}>
                  <Field label="Color ruta" value={data.color} onChange={(v) => update("color", v)} type="color" />
                  <Field label="Código destino" value={data.code} onChange={(v) => update("code", v)} />
                </div>
                <p style={styles.hint}>
                  El color y la ruta se asignan automáticamente por el webservice Nacex según el C.P. destino.
                </p>
              </div>
            )}

            {/* ── Barcodes ── */}
            {activeTab === "barcode" && (
              <div style={styles.formGroup}>
                <Field label="Barcode 1 (expedición)" value={data.barcode1} onChange={(v) => update("barcode1", v)} />
                <p style={styles.hint}>Formato: 840 + bultos + agencia + nº expedición + checksum</p>
                <Field label="Barcode 2 (NX)" value={data.barcode2} onChange={(v) => update("barcode2", v)} />
                <p style={styles.hint}>Formato: NX + servicio + país + CP destino (7 dígitos)</p>
                <div style={styles.separator} />
                <Field label="Referencia" value={data.ref} onChange={(v) => update("ref", v)} />
                <Field label="Ref. CMS / Pedido" value={data.ref_cms} onChange={(v) => update("ref_cms", v)} />
              </div>
            )}

            {/* ── Extra ── */}
            {activeTab === "extra" && (
              <div style={styles.formGroup}>
                <div style={styles.checkRow}>
                  <label style={styles.checkLabel}>
                    <input type="checkbox" checked={data.es_nacexshop} onChange={(e) => update("es_nacexshop", e.target.checked)} style={styles.check} />
                    <span>Es NacexShop</span>
                  </label>
                </div>
                {data.es_nacexshop && (
                  <Field label="Alias punto entrega" value={data.alias} onChange={(v) => update("alias", v)} />
                )}
                {isInt && (
                  <>
                    <h4 style={styles.sectionTitle}>Datos Aduaneros</h4>
                    <Field label="Contenido" value={data.contenido} onChange={(v) => update("contenido", v)} />
                    <Field label="Valor declarado (€)" value={data.valor_declarado} onChange={(v) => update("valor_declarado", v)} />
                  </>
                )}
                <div style={styles.separator} />
                <h4 style={styles.sectionTitle}>Zoom preview</h4>
                <input type="range" min={50} max={150} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} style={{ width: "100%" }} />
                <span style={styles.hint}>{zoom}%</span>
              </div>
            )}
          </div>
        </aside>

        {/* ═══ RIGHT: PREVIEW ═══ */}
        <main style={styles.main}>
          {!showZpl ? (
            <div style={styles.previewWrap}>
              <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}>
                {/* ══════════════════════════════════════
                     THE LABEL
                   ══════════════════════════════════════ */}
                <div ref={labelRef} style={styles.label}>
                  {/* -- Header -- */}
                  <div style={styles.labelHeader}>
                    <div style={styles.labelLogo}>NACEX</div>
                    <div style={styles.labelServiceBadge}>
                      <span style={styles.serviceName}>{svc.nombre_etiqueta || "NACEX"}</span>
                      <span style={styles.serviceCode}>({data.servicio})</span>
                    </div>
                  </div>
                  <div style={styles.hr} />

                  {/* -- Info row -- */}
                  <div style={styles.infoRow}>
                    <span>Abonado: <b>{data.abonado}</b></span>
                    <span>Fecha: <b>{data.fecha}</b></span>
                  </div>
                  <div style={styles.infoRow}>
                    <span>Ref: <b>{data.ref}</b></span>
                    <span>Pedido: <b>#{data.ref_cms}</b></span>
                  </div>
                  <div style={styles.hr} />

                  {/* -- NacexShop alias -- */}
                  {isShop && data.es_nacexshop && data.alias && (
                    <>
                      <div style={styles.shopBox}>
                        <span style={styles.shopLabel}>📍 Punto NacexShop:</span>
                        <span style={styles.shopAlias}>{data.alias}</span>
                      </div>
                      <div style={styles.hr} />
                    </>
                  )}

                  {/* -- Destinatario -- */}
                  <div style={styles.destSection}>
                    <div style={styles.destLabel}>DESTINATARIO</div>
                    <div style={styles.destName}>{data.client.substring(0, 25).toUpperCase()}</div>
                    <div style={styles.destLine}>{data.address}</div>
                    <div style={styles.destLine}>
                      {data.postcode} {data.city_ent.toUpperCase()}
                    </div>
                    <div style={styles.destLine}>Att: {data.per_ent}</div>
                    <div style={styles.destLine}>Tel: {data.phone}</div>
                  </div>
                  <div style={styles.hr} />

                  {/* -- Detalles envío -- */}
                  <div style={styles.detailsRow}>
                    <span>
                      Bultos: <b>{data.bultos}/{data.totalBultos}</b>
                    </span>
                    <span>
                      Portes: <b>{portName}</b>
                    </span>
                    <span>
                      Envase: <b>{envName}</b>
                    </span>
                  </div>
                  {data.reem && (
                    <div style={styles.reemRow}>
                      💰 Reembolso: <b>{Number(data.amount).toFixed(2)}€</b>
                    </div>
                  )}
                  <div style={styles.hr} />

                  {/* -- Ruta -- */}
                  <div style={styles.routeSection}>
                    <div style={{ ...styles.routeBox, backgroundColor: data.color }}>
                      <span style={styles.routeText}>{data.route}</span>
                    </div>
                    <div style={styles.routeInfo}>
                      <div>
                        Cod. Destino: <b>{data.code}</b>
                      </div>
                      <div>
                        País: <b>{data.pais}</b>
                      </div>
                      {svc.delay && <div style={styles.delayText}>{svc.delay}</div>}
                    </div>
                  </div>

                  {/* -- Internacional -- */}
                  {isInt && (
                    <>
                      <div style={styles.hr} />
                      <div style={styles.intSection}>
                        <div style={styles.intTitle}>DATOS ADUANEROS</div>
                        <div style={styles.intRow}>
                          <span>Contenido: {data.contenido || "—"}</span>
                          <span>Valor: {data.valor_declarado || "—"}€</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* -- Observaciones -- */}
                  {data.obs && (
                    <>
                      <div style={styles.hr} />
                      <div style={styles.obsRow}>Obs: {data.obs}</div>
                    </>
                  )}
                  <div style={styles.hr} />

                  {/* -- Barcode 1 -- */}
                  <div style={styles.barcodeArea}>
                    <BarcodeCanvas value={data.barcode1} height={70} fontSize={12} />
                  </div>

                  {/* -- Barcode 2 -- */}
                  <div style={styles.barcodeArea2}>
                    <BarcodeCanvas value={data.barcode2} height={40} fontSize={10} />
                  </div>
                  <div style={styles.hr} />

                  {/* -- Footer -- */}
                  <div style={styles.footer}>
                    <span>Exp: {data.barcode1}</span>
                    <span>Pedido: #{data.ref_cms}</span>
                    <span>Ag: {data.abonado}</span>
                  </div>
                  <div style={styles.footerCounter}>
                    {data.contador} — {data.bultos}/{data.totalBultos}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ═══ ZPL VIEW ═══ */
            <div style={styles.zplWrap}>
              <div style={styles.zplHeader}>
                <span style={styles.zplTitle}>Código ZPL generado</span>
                <button style={{ ...styles.btn, ...styles.btnSmall }} onClick={copyZpl}>
                  📋 Copiar
                </button>
              </div>
              <pre style={styles.zplCode}>{generateZPL(data)}</pre>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FORM COMPONENTS
   ═══════════════════════════════════════════════════════ */
function Field({ label, value, onChange, type = "text" }) {
  return (
    <label style={styles.field}>
      <span style={styles.fieldLabel}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...styles.input,
          ...(type === "color" ? { height: 36, padding: 2, cursor: "pointer" } : {}),
        }}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label style={styles.field}>
      <span style={styles.fieldLabel}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={styles.input}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

/* ═══════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════ */
const C = {
  bg: "#0f0f13",
  surface: "#1a1a22",
  card: "#22222e",
  border: "#2e2e3e",
  text: "#e4e4ef",
  muted: "#8888a0",
  nacex: "#FF5000",
  nacexLight: "#FF7733",
  white: "#ffffff",
  green: "#34c759",
  radius: 8,
};

const styles = {
  app: {
    fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, sans-serif",
    background: C.bg,
    color: C.text,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    height: 52,
    background: C.surface,
    borderBottom: `1px solid ${C.border}`,
    flexShrink: 0,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  headerRight: { display: "flex", alignItems: "center", gap: 8 },
  logo: { fontSize: 20, fontWeight: 800, letterSpacing: -0.5, color: C.text },
  logoAccent: { color: C.nacex },
  headerBadge: {
    fontSize: 11,
    background: C.card,
    color: C.muted,
    padding: "3px 10px",
    borderRadius: 20,
    fontWeight: 500,
  },
  btn: {
    padding: "6px 14px",
    borderRadius: C.radius,
    border: "none",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    transition: "all 0.15s",
  },
  btnAccent: { background: C.nacex, color: C.white },
  btnGhost: {
    background: "transparent",
    color: C.muted,
    border: `1px solid ${C.border}`,
  },
  btnSmall: {
    padding: "4px 10px",
    fontSize: 12,
    background: C.card,
    color: C.text,
    border: `1px solid ${C.border}`,
  },
  layout: { display: "flex", flex: 1, overflow: "hidden" },
  sidebar: {
    width: 340,
    minWidth: 340,
    display: "flex",
    flexDirection: "column",
    borderRight: `1px solid ${C.border}`,
    background: C.surface,
    overflow: "hidden",
  },
  tabNav: {
    display: "flex",
    borderBottom: `1px solid ${C.border}`,
    overflow: "hidden",
    flexShrink: 0,
  },
  tab: {
    flex: 1,
    padding: "10px 4px",
    background: "transparent",
    color: C.muted,
    border: "none",
    borderBottom: "2px solid transparent",
    fontSize: 11,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    transition: "all 0.15s",
  },
  tabActive: { color: C.nacex, borderBottomColor: C.nacex, background: `${C.nacex}10` },
  formArea: { flex: 1, overflowY: "auto", padding: "14px 16px" },
  formGroup: { display: "flex", flexDirection: "column", gap: 10 },
  field: { display: "flex", flexDirection: "column", gap: 3, flex: 1 },
  fieldLabel: { fontSize: 11, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.3 },
  input: {
    background: C.card,
    color: C.text,
    border: `1px solid ${C.border}`,
    borderRadius: 6,
    padding: "7px 10px",
    fontSize: 13,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  },
  row2: { display: "flex", gap: 10 },
  row3: { display: "flex", gap: 8 },
  checkRow: { display: "flex", alignItems: "center", gap: 8, padding: "4px 0" },
  checkLabel: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.text, cursor: "pointer" },
  check: { accentColor: C.nacex, width: 16, height: 16 },
  separator: { height: 1, background: C.border, margin: "6px 0" },
  sectionTitle: { fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: -4, textTransform: "uppercase" },
  hint: { fontSize: 11, color: C.muted, fontStyle: "italic", margin: 0 },
  main: {
    flex: 1,
    overflow: "auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 24,
    background: `repeating-conic-gradient(${C.bg} 0% 25%, #141418 0% 50%) 50% / 20px 20px`,
  },
  previewWrap: { display: "flex", justifyContent: "center" },

  /* ═══ LABEL STYLES ═══ */
  label: {
    width: 384,
    minHeight: 576,
    background: C.white,
    color: "#111",
    fontFamily: "'Courier New', Courier, monospace",
    fontSize: 11,
    padding: 16,
    borderRadius: 3,
    boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
  },
  labelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  labelLogo: { fontSize: 28, fontWeight: 900, fontFamily: "Helvetica, Arial, sans-serif", color: "#111", letterSpacing: -1 },
  labelServiceBadge: { textAlign: "right" },
  serviceName: { fontSize: 13, fontWeight: 800, display: "block" },
  serviceCode: { fontSize: 10, color: "#666" },
  hr: { height: 1.5, background: "#111", margin: "5px 0" },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 9,
    padding: "2px 0",
    color: "#333",
  },
  shopBox: {
    background: "#FFF3E0",
    border: "1px solid #FFB74D",
    borderRadius: 4,
    padding: "6px 8px",
    margin: "4px 0",
  },
  shopLabel: { fontSize: 9, fontWeight: 700, display: "block" },
  shopAlias: { fontSize: 12, fontWeight: 800 },
  destSection: { padding: "6px 0" },
  destLabel: { fontSize: 8, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 1 },
  destName: { fontSize: 16, fontWeight: 900, fontFamily: "Helvetica, Arial, sans-serif", marginTop: 2, lineHeight: 1.2 },
  destLine: { fontSize: 11, lineHeight: 1.5, color: "#222" },
  detailsRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 10,
    padding: "4px 0",
  },
  reemRow: {
    fontSize: 11,
    fontWeight: 700,
    background: "#FFFDE7",
    border: "1px solid #FDD835",
    borderRadius: 3,
    padding: "3px 8px",
    marginTop: 2,
  },
  routeSection: { display: "flex", alignItems: "center", gap: 12, padding: "6px 0" },
  routeBox: {
    width: 70,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  routeText: { color: "#fff", fontWeight: 900, fontSize: 18, fontFamily: "Helvetica, Arial, sans-serif" },
  routeInfo: { fontSize: 10, lineHeight: 1.6 },
  delayText: { fontSize: 9, color: "#888", fontStyle: "italic" },
  intSection: { padding: "4px 0" },
  intTitle: { fontSize: 9, fontWeight: 800, color: "#333", letterSpacing: 1, marginBottom: 3 },
  intRow: { display: "flex", justifyContent: "space-between", fontSize: 10 },
  obsRow: { fontSize: 10, color: "#444", padding: "3px 0", fontStyle: "italic" },
  barcodeArea: { display: "flex", justifyContent: "center", padding: "6px 0" },
  barcodeArea2: { display: "flex", justifyContent: "center", padding: "2px 0" },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#555",
    padding: "3px 0 0",
  },
  footerCounter: { textAlign: "center", fontSize: 8, color: "#999", marginTop: 2 },

  /* ═══ ZPL VIEW ═══ */
  zplWrap: { flex: 1, display: "flex", flexDirection: "column", maxWidth: 800 },
  zplHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  zplTitle: { fontSize: 16, fontWeight: 700, color: C.text },
  zplCode: {
    flex: 1,
    background: C.card,
    color: "#a6e3a1",
    padding: 16,
    borderRadius: C.radius,
    fontSize: 12,
    fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace",
    overflow: "auto",
    lineHeight: 1.6,
    border: `1px solid ${C.border}`,
    whiteSpace: "pre-wrap",
    margin: 0,
  },
};
