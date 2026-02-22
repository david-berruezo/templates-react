/** Nacex constants — matching Constantes.php */

export const ESTADOS = {
  1: { code: 1, name: 'NOTIFICADO', color: 'var(--yellow)', bg: 'var(--yellow-bg)', icon: '📋' },
  2: { code: 2, name: 'TRÁNSITO', color: 'var(--blue)', bg: 'var(--blue-bg)', icon: '🚛' },
  3: { code: 3, name: 'REPARTO', color: 'var(--cyan)', bg: 'var(--cyan-bg)', icon: '📦' },
  4: { code: 4, name: 'ENTREGADO', color: 'var(--green)', bg: 'var(--green-bg)', icon: '✅' },
  5: { code: 5, name: 'SOL SIN OK', color: 'var(--purple)', bg: 'var(--purple-bg)', icon: '⚠️' },
  9: { code: 9, name: 'ANULADA', color: 'var(--red)', bg: 'var(--red-bg)', icon: '❌' },
};

export const ESTADOS_COM = {
  0: 'Pendiente de comunicar',
  1: 'Pendiente de validar',
  2: 'Comunicación correcta',
  3: 'Error operativo',
};

export const SERVICIOS = {
  '01': { code: '01', name: 'NACEX 10:00H', tipo: 'nacex' },
  '02': { code: '02', name: 'NACEX 12:00H', tipo: 'nacex' },
  '08': { code: '08', name: 'NACEX 19:00H', tipo: 'nacex' },
  '11': { code: '11', name: 'NACEX 08:30H', tipo: 'nacex' },
  '24': { code: '24', name: '24 HORAS', tipo: 'nacex' },
  '26': { code: '26', name: 'PLUS PACK', tipo: 'nacex' },
  '27': { code: '27', name: 'E-NACEX', tipo: 'nacex' },
  '40': { code: '40', name: 'E-NACEX ECO', tipo: 'nacex' },
  '48': { code: '48', name: '48 HORAS', tipo: 'nacex' },
  '31': { code: '31', name: 'NACEXSHOP', tipo: 'nacexshop' },
  'A':  { code: 'A', name: 'INT EUROPA', tipo: 'internacional' },
  'B':  { code: 'B', name: 'INT ECOMM', tipo: 'internacional' },
};

export const PORTES = { O: 'Origen', D: 'Destino', T: 'Tercera' };

export const ZONAS = [
  'NCX - España Peninsular',
  'NCX - Baleares',
  'NCX - Canarias',
  'NCX - Portugal',
  'NCX - Ceuta y Melilla',
  'NCX - Europa',
];

export const KANBAN_COLUMNS = [
  { id: 1, title: 'Notificado', estado: 1 },
  { id: 2, title: 'En tránsito', estado: 2 },
  { id: 3, title: 'En reparto', estado: 3 },
  { id: 4, title: 'Entregado', estado: 4 },
];
