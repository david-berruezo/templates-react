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
 * Datos de ejemplo realistas para la etiqueta 840
 */
export const DEFAULT_840 = {
  servicio: '08',
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
  bultos: '1',
  totalBultos: '1',
  route: 'R015',
  color: '#E20613',
  code: '0028',
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
  abonado: '0001/001',
  contador: '001',
};

/**
 * Tipos de etiquetas disponibles
 */
export const LABEL_TYPES = [
  { id: '840', name: 'Etiqueta 840', desc: 'Estándar Nacex', icon: '🏷️', status: 'ready' },
  { id: '841', name: 'Etiqueta 841 Diana', desc: 'Bultos adicionales', icon: '🎯', status: 'soon' },
  { id: 'cambio', name: 'Cambio', desc: 'Etiqueta de cambio', icon: '🔄', status: 'soon' },
  { id: 'devolucion', name: 'Devolución', desc: 'Etiqueta de devolución', icon: '↩️', status: 'soon' },
  { id: 'documentar', name: 'Documentar Envío', desc: 'Documentar envío', icon: '📄', status: 'soon' },
  { id: 'nacexshop', name: 'NacexShop', desc: 'Punto de entrega', icon: '🏪', status: 'soon' },
  { id: 'internacional', name: 'Internacional', desc: 'Envíos Europa', icon: '🌍', status: 'soon' },
];
