/**
 * Constantes del plugin Nacex — equivalente a Constantes.php
 */

export const SERVICIOS = {
  '01': { code: '01', nombre: 'NACEX 10:00H', nombre_etiqueta: 'NACEX 10:00H', delay: 'Entrega antes de las 10:00H del día siguiente', tipo: 'nacex' },
  '02': { code: '02', nombre: 'NACEX 12:00H', nombre_etiqueta: 'NACEX 12:00H', delay: 'Entrega antes de las 12:00H del día siguiente', tipo: 'nacex' },
  '04': { code: '04', nombre: 'PLUS BAG', nombre_etiqueta: 'PLUS BAG', delay: 'Entrega día siguiente', tipo: 'nacex' },
  '08': { code: '08', nombre: 'NACEX 19:00H', nombre_etiqueta: 'NACEX 19:00H', delay: 'Entrega antes de las 19:00H', tipo: 'nacex' },
  '11': { code: '11', nombre: 'NACEX 08:30H', nombre_etiqueta: 'NACEX 08:30H', delay: 'Entrega antes de las 08:30H', tipo: 'nacex' },
  '20': { code: '20', nombre: 'MALLORCA MARITIMO', nombre_etiqueta: 'MALLORCA MAR', delay: 'Transporte marítimo Mallorca', tipo: 'nacex' },
  '21': { code: '21', nombre: 'SÁBADO', nombre_etiqueta: 'SÁBADO', delay: 'Entrega en sábado', tipo: 'nacex' },
  '22': { code: '22', nombre: 'CANARIAS MARITIMO', nombre_etiqueta: 'CANARIAS MAR', delay: 'Transporte marítimo Canarias', tipo: 'nacex' },
  '24': { code: '24', nombre: '24 HORAS', nombre_etiqueta: '24 HORAS', delay: 'Entrega en 24 horas', tipo: 'nacex' },
  '26': { code: '26', nombre: 'PLUS PACK', nombre_etiqueta: 'PLUS PACK', delay: 'Paquetería económica', tipo: 'nacex' },
  '27': { code: '27', nombre: 'E-NACEX', nombre_etiqueta: 'E-NACEX', delay: 'Entrega 24/48h', tipo: 'nacex' },
  '40': { code: '40', nombre: 'E-NACEX ECONOMY', nombre_etiqueta: 'E-NACEX ECO', delay: 'Entrega 48/72h', tipo: 'nacex' },
  '48': { code: '48', nombre: '48 HORAS', nombre_etiqueta: '48 HORAS', delay: 'Entrega en 48 horas', tipo: 'nacex' },
  '31': { code: '31', nombre: 'E-NACEXSHOP', nombre_etiqueta: 'NACEXSHOP', delay: 'Entrega en punto NacexShop', tipo: 'nacexshop' },
  '37': { code: '37', nombre: 'NACEXSHOP PREMIUM', nombre_etiqueta: 'NXSHOP PREM', delay: 'Entrega en punto premium', tipo: 'nacexshop' },
  'A':  { code: 'A',  nombre: 'BUSINESS EUROPA', nombre_etiqueta: 'INT EUROPA', delay: 'Entrega en 2-5 días', tipo: 'internacional', id_codigo_barras: 'A' },
  'B':  { code: 'B',  nombre: 'E-COMMERCE EUROPA', nombre_etiqueta: 'INT ECOMM', delay: 'Entrega en 3-7 días', tipo: 'internacional', id_codigo_barras: 'B' },
};

export const ENVASES = {
  '0': 'DOCS',
  '1': 'BAG',
  '2': 'PAQ',
};

export const ENVASES_INT = {
  'M': 'MUESTRA',
  'D': 'DOCUMENTO',
};

export const PORTES = {
  'O': 'Origen',
  'D': 'Destino',
  'T': 'Tercera',
};

export const REEMBOLSO = {
  'O': 'Origen',
  'D': 'Destino',
};

/**
 * Servicios agrupados por tipo
 */
export const SERVICIOS_STANDARD = Object.fromEntries(
  Object.entries(SERVICIOS).filter(([, s]) => s.tipo === 'nacex')
);

export const SERVICIOS_SHOP = Object.fromEntries(
  Object.entries(SERVICIOS).filter(([, s]) => s.tipo === 'nacexshop')
);

export const SERVICIOS_INT = Object.fromEntries(
  Object.entries(SERVICIOS).filter(([, s]) => s.tipo === 'internacional')
);

/**
 * Base compartida de datos de ejemplo
 */
const SHARED_DEFAULTS = {
  fecha: new Date().toLocaleDateString('es-ES'),
  remitente: 'MI TIENDA ONLINE SL',
  dir_rec: 'Pol. Industrial Zona Franca, Nave 12',
  cp_rec: '08040',
  pob_rec: 'Barcelona',
  tel_rec: '934 567 890',
  client: 'JUAN GARCIA LOPEZ',
  address: 'Calle Gran Vía, 45 3º B',
  postcode: '28013',
  city_ent: 'MADRID',
  per_ent: 'Juan García',
  phone: '+34 612 345 678',
  pais: 'ES',
  portes: 'O',
  envase: '2',
  route: 'R015',
  color: '#E20613',
  code: '0028',
  obs: '',
  abonado: '0001/001',
};

/**
 * Datos de ejemplo realistas para la etiqueta 840
 */
export const DEFAULT_840 = {
  ...SHARED_DEFAULTS,
  servicio: '08',
  bultos: '1',
  totalBultos: '1',
  barcode1: '840001000185453141',
  barcode2: 'NX04ES0028013',
  reem: false,
  amount: '0.00',
  obs: 'Entregar en horario de mañana',
  ref: 'pedido_1042',
  ref_cms: '1042',
  es_nacexshop: false,
  alias: '',
  contenido: '',
  valor_declarado: '',
  contador: '001',
};

export const DEFAULT_841 = {
  ...SHARED_DEFAULTS,
  servicio: '08',
  bultos: '2',
  totalBultos: '3',
  bultoActual: '2',
  barcode1: '841002000185453141',
  barcode1_original: '840001000185453141',
  barcode2: 'NX04ES0028013',
  ref: 'pedido_1042',
  ref_cms: '1042',
  obs: '',
  contador: '002',
};

export const DEFAULT_CAMBIO = {
  ...SHARED_DEFAULTS,
  servicio: '08',
  bultos: '1',
  totalBultos: '1',
  barcode1: '840001000185453141',
  barcode2: 'NX04ES0028013',
  ref: 'pedido_1042',
  ref_cms: '1042',
  obs: 'CAMBIO - Recoger artículo anterior',
  motivo_cambio: 'Talla incorrecta',
  // Datos del artículo de cambio
  articulo_original: 'Camiseta Talla M - Ref: CAM-001',
  articulo_nuevo: 'Camiseta Talla L - Ref: CAM-001',
  contador: '001',
};

export const DEFAULT_DEVOLUCION = {
  ...SHARED_DEFAULTS,
  servicio: '27',
  bultos: '1',
  totalBultos: '1',
  // En devolución el remitente es el cliente y el destino es el almacén
  client: 'MI TIENDA ONLINE SL',
  address: 'Pol. Industrial Zona Franca, Nave 12',
  postcode: '08040',
  city_ent: 'BARCELONA',
  per_ent: 'Almacén Devoluciones',
  phone: '934 567 890',
  remitente: 'JUAN GARCIA LOPEZ',
  dir_rec: 'Calle Gran Vía, 45 3º B',
  cp_rec: '28013',
  pob_rec: 'Madrid',
  tel_rec: '+34 612 345 678',
  barcode1: 'RET840001000185453141',
  barcode2: 'NX27ES0008040',
  ref: 'DEV-1042',
  ref_cms: '1042',
  obs: 'DEVOLUCIÓN - No abrir, producto precintado',
  motivo_devolucion: 'Producto defectuoso',
  route: 'R003',
  color: '#1565C0',
  code: '0008',
  contador: '001',
};

export const DEFAULT_DOCUMENTAR = {
  ...SHARED_DEFAULTS,
  servicio: '08',
  bultos: '1',
  totalBultos: '1',
  barcode1: '840001000185453141',
  barcode2: 'NX04ES0028013',
  ref: 'pedido_1042',
  ref_cms: '1042',
  obs: '',
  cod_expedicion: '85453141',
  estado_expedicion: 'Pendiente de documentar',
  peso: '2.5',
  largo: '30',
  ancho: '20',
  alto: '15',
  contenido_doc: 'Ropa y complementos',
  contador: '001',
};

export const DEFAULT_NACEXSHOP = {
  ...SHARED_DEFAULTS,
  servicio: '31',
  bultos: '1',
  totalBultos: '1',
  barcode1: '840001000185453141',
  barcode2: 'NX31ES0028013',
  ref: 'pedido_1042',
  ref_cms: '1042',
  obs: '',
  es_nacexshop: true,
  alias: 'PAPELERÍA GARCÍA',
  punto_id: 'ES-MAD-00142',
  punto_direccion: 'Calle Alcalá, 120',
  punto_cp: '28009',
  punto_ciudad: 'MADRID',
  punto_horario: 'L-V 9:00-20:00, S 10:00-14:00',
  reem: false,
  amount: '0.00',
  route: 'R015',
  color: '#2E7D32',
  code: '0028',
  contador: '001',
};

export const DEFAULT_INTERNACIONAL = {
  ...SHARED_DEFAULTS,
  servicio: 'A',
  client: 'PIERRE DUPONT',
  address: '15 Rue de Rivoli',
  postcode: '75001',
  city_ent: 'PARIS',
  per_ent: 'Pierre Dupont',
  phone: '+33 6 12 34 56 78',
  pais: 'FR',
  bultos: '1',
  totalBultos: '1',
  barcode1: '840001000185453141',
  barcode2: 'NXAFR0075001',
  ref: 'pedido_1042',
  ref_cms: '1042',
  obs: 'Fragile / Frágil',
  reem: false,
  amount: '0.00',
  contenido: 'Artículos textiles',
  valor_declarado: '89.90',
  hs_code: '6109.10',
  peso: '1.2',
  num_articulos: '3',
  route: 'INT-FR',
  color: '#1565C0',
  code: 'FR75',
  contador: '001',
};

/**
 * Tipos de etiquetas disponibles
 */
export const LABEL_TYPES = [
  { id: '840', name: 'Etiqueta 840', desc: 'Estándar Nacex', icon: '🏷️', status: 'ready' },
  { id: '841', name: 'Etiqueta 841 Diana', desc: 'Bultos adicionales', icon: '🎯', status: 'ready' },
  { id: 'cambio', name: 'Cambio', desc: 'Etiqueta de cambio', icon: '🔄', status: 'ready' },
  { id: 'devolucion', name: 'Devolución', desc: 'Etiqueta de devolución', icon: '↩️', status: 'ready' },
  { id: 'documentar', name: 'Documentar Envío', desc: 'Documentar envío', icon: '📄', status: 'ready' },
  { id: 'nacexshop', name: 'NacexShop', desc: 'Punto de entrega', icon: '🏪', status: 'ready' },
  { id: 'internacional', name: 'Internacional', desc: 'Envíos Europa', icon: '🌍', status: 'ready' },
];
