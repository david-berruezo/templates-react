/** Generate realistic mock expeditions matching plugin data structures */
import { ESTADOS, SERVICIOS } from './constants';

const NOMBRES = [
  'María García López', 'Juan Martínez Ruiz', 'Ana Fernández Torres', 'Carlos Rodríguez Sánchez',
  'Laura Pérez Moreno', 'Pablo Gómez Jiménez', 'Isabel Díaz Hernández', 'David López Muñoz',
  'Carmen Morales Navarro', 'Javier Romero Gil', 'Marta Alonso Serrano', 'Alejandro Ruiz Domínguez',
  'Patricia Molina Ortiz', 'Daniel Suárez Castro', 'Lucía Ramírez Blanco', 'Roberto Iglesias Medina',
  'Cristina Torres Vega', 'Alberto Castillo Marín', 'Andrea Herrera Crespo', 'Fernando Santos Prieto',
  'Beatriz Jiménez Aguilar', 'Miguel Vargas Calvo', 'Rosa Guerrero Peña', 'Sergio Delgado Rubio',
  'Pierre Dupont', 'Hans Mueller', 'Giovanni Rossi', 'Sophie Martin', 'Luigi Bianchi',
];

const EMPRESAS = [
  'Textiles del Sur SL', 'Electronica Moderna SA', 'Farmacia Central', 'Librería Cervantes',
  'Deportes Martín', 'Moda Express SL', 'TechStore BCN', 'Alimentación Sana',
  'Joyas y Relojes Preciados', 'Papelería García', 'Ropa Infantil Peques', 'Vinos Selectos DO',
  'Cosmetics Natural', 'Zapatería El Paso', 'Muebles del Hogar', 'Material Oficina Pro',
];

const CALLES = [
  'Calle Gran Vía', 'Avenida de la Constitución', 'Calle Mayor', 'Paseo de Gracia',
  'Calle Alcalá', 'Rambla Catalunya', 'Calle Serrano', 'Avenida Diagonal',
  'Calle Princesa', 'Calle Goya', 'Paseo de la Castellana', 'Calle del Carmen',
  'Rue de Rivoli', 'Friedrichstraße', 'Via Roma', 'Avenue des Champs-Élysées',
];

const CIUDADES_CP = [
  { city: 'MADRID', cp: '28', prov: 'Madrid' },
  { city: 'BARCELONA', cp: '08', prov: 'Barcelona' },
  { city: 'VALENCIA', cp: '46', prov: 'Valencia' },
  { city: 'SEVILLA', cp: '41', prov: 'Sevilla' },
  { city: 'ZARAGOZA', cp: '50', prov: 'Zaragoza' },
  { city: 'MÁLAGA', cp: '29', prov: 'Málaga' },
  { city: 'BILBAO', cp: '48', prov: 'Vizcaya' },
  { city: 'ALICANTE', cp: '03', prov: 'Alicante' },
  { city: 'MURCIA', cp: '30', prov: 'Murcia' },
  { city: 'PALMA DE MALLORCA', cp: '07', prov: 'Baleares' },
  { city: 'LAS PALMAS', cp: '35', prov: 'Las Palmas' },
  { city: 'VALLADOLID', cp: '47', prov: 'Valladolid' },
  { city: 'VIGO', cp: '36', prov: 'Pontevedra' },
  { city: 'GIJÓN', cp: '33', prov: 'Asturias' },
  { city: 'PARIS', cp: '75', prov: 'Île-de-France', pais: 'FR' },
  { city: 'BERLIN', cp: '10', prov: 'Berlin', pais: 'DE' },
];

const RUTAS = ['R001','R003','R005','R008','R010','R012','R015','R018','R020','R025','R030','INT-FR','INT-DE','INT-IT'];
const COLORES_RUTA = ['#E20613','#1565C0','#2E7D32','#FF8F00','#6A1B9A','#00838F','#C62828','#283593'];
const OBSERVACIONES = [
  '', '', '', 'Entregar en horario de mañana', 'Llamar antes de entregar',
  'Dejar en portería si ausente', 'Fragil - Manejar con cuidado', 'No dejar en buzón',
  'Entregar solo al destinatario', 'Segunda planta, puerta B',
];

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const padNum = (n, len) => String(n).padStart(len, '0');

function generateBarcode(servicio, agencia, exp) {
  const prefix = '840';
  return `${prefix}${padNum(1, 3)}${padNum(agencia, 4)}${padNum(exp, 8)}${rand(10, 99)}`;
}

function generateBarcodeNX(servicio, pais, cp) {
  return `NX${servicio}${pais}${cp.padEnd(7, '0')}`;
}

function generateTrackingTimeline(estado, fechaCreacion) {
  const timeline = [];
  const base = new Date(fechaCreacion);
  
  timeline.push({
    estado: 1, desc: 'Expedición registrada', fecha: base.toISOString(),
    detalle: 'Datos recibidos del cliente',
  });

  if (estado >= 2) {
    const t2 = new Date(base.getTime() + rand(2, 8) * 3600000);
    timeline.push({
      estado: 2, desc: 'En tránsito', fecha: t2.toISOString(),
      detalle: 'Recogido en origen. En camino a plataforma',
    });
  }
  if (estado >= 3) {
    const t3 = new Date(base.getTime() + rand(12, 28) * 3600000);
    timeline.push({
      estado: 3, desc: 'En reparto', fecha: t3.toISOString(),
      detalle: 'Salida de plataforma destino. En reparto',
    });
  }
  if (estado === 4) {
    const t4 = new Date(base.getTime() + rand(16, 36) * 3600000);
    timeline.push({
      estado: 4, desc: 'Entregado', fecha: t4.toISOString(),
      detalle: 'Entregado al destinatario. Firma: ' + pick(NOMBRES).split(' ')[0],
    });
  }
  if (estado === 5) {
    const t5 = new Date(base.getTime() + rand(16, 36) * 3600000);
    timeline.push({
      estado: 5, desc: 'Solicitud sin confirmar', fecha: t5.toISOString(),
      detalle: 'Ausente. Se deja aviso',
    });
  }
  if (estado === 9) {
    const t9 = new Date(base.getTime() + rand(1, 4) * 3600000);
    timeline.push({
      estado: 9, desc: 'Anulada', fecha: t9.toISOString(),
      detalle: 'Expedición anulada por el cliente',
    });
  }
  return timeline;
}

export function generateExpeditions(count = 80) {
  const now = Date.now();
  const expeditions = [];
  const agencia = rand(1, 50);
  const servicioKeys = Object.keys(SERVICIOS);
  const estadoKeys = [1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 9]; // weighted

  for (let i = 0; i < count; i++) {
    const svcKey = pick(servicioKeys);
    const svc = SERVICIOS[svcKey];
    const ciudad = pick(CIUDADES_CP);
    const pais = ciudad.pais || 'ES';
    const estado = pick(estadoKeys);
    const cp = ciudad.cp + padNum(rand(0, 999), 3);
    const expNum = rand(10000000, 99999999);
    const daysAgo = rand(0, 30);
    const fechaCreacion = new Date(now - daysAgo * 86400000 - rand(0, 86400000));
    const bultos = rand(1, 4);
    const peso = (Math.random() * 15 + 0.3).toFixed(1);
    const reem = Math.random() < 0.2;
    const esNacexShop = svc.tipo === 'nacexshop';

    expeditions.push({
      id: i + 1,
      cod_exp: padNum(expNum, 8),
      expedicion: expNum,
      barcode: generateBarcode(svcKey, agencia, expNum),
      barcode_nx: generateBarcodeNX(svcKey, pais, cp),
      // Servicio
      tip_ser: svcKey,
      servicio: svc.name,
      tipo_servicio: svc.tipo,
      // Estado
      estado,
      estado_nombre: ESTADOS[estado]?.name || 'DESCONOCIDO',
      estado_com: rand(0, 2),
      // Fechas
      fecha_creacion: fechaCreacion.toISOString(),
      fecha_str: fechaCreacion.toLocaleDateString('es-ES'),
      hora_str: fechaCreacion.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      // Destinatario
      nom_ent: Math.random() < 0.3 ? pick(EMPRESAS) : pick(NOMBRES),
      per_ent: pick(NOMBRES),
      dir_ent: `${pick(CALLES)}, ${rand(1, 120)}`,
      cp_ent: cp,
      pob_ent: ciudad.city,
      prov_ent: ciudad.prov,
      pais_ent: pais,
      tel_ent: `+34 6${padNum(rand(10000000, 99999999), 8)}`,
      // Remitente
      nom_rec: pick(EMPRESAS),
      dir_rec: `${pick(CALLES)}, ${rand(1, 50)}`,
      cp_rec: '08' + padNum(rand(0, 999), 3),
      pob_rec: 'Barcelona',
      // Detalles
      bultos,
      peso: parseFloat(peso),
      portes: pick(['O', 'O', 'O', 'D', 'T']),
      envase: pick(['0', '1', '2', '2', '2']),
      // Ruta
      route: pick(RUTAS),
      color: pick(COLORES_RUTA),
      code: padNum(rand(1, 99), 4),
      // Financiero
      reem,
      importe_ree: reem ? (Math.random() * 200 + 10).toFixed(2) : '0.00',
      // Referencia
      ref_cli: `pedido_${rand(1000, 9999)}`,
      id_order: rand(1000, 9999),
      // Observaciones
      obs: pick(OBSERVACIONES),
      // NacexShop
      es_nacexshop: esNacexShop,
      alias: esNacexShop ? pick(['PAPELERÍA GARCÍA', 'KIOSKO CENTRAL', 'ESTANCO PLAZA', 'BAZAR TODO']) : '',
      // Tracking
      timeline: generateTrackingTimeline(estado, fechaCreacion),
    });
  }

  return expeditions.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
}
