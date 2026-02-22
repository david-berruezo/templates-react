/**
 * ZPL Generator — genera código ZPL a partir de los datos de la etiqueta
 */
import { SERVICIOS, ENVASES, PORTES } from '../constants/services';

export function generateZPL840(d) {
  const svc = SERVICIOS[d.servicio] || {};
  const envName = ENVASES[d.envase] || 'PAQ';
  const portName = PORTES[d.portes] || 'Origen';
  const isInt = svc.tipo === 'internacional';

  return `^XA

^FX === NACEX ETIQUETA 840 ===
^FX Generado por Nacex Label Studio

^FX -- Header --
^CF0,50
^FO30,30^FDNACEX^FS
^CF0,20
^FO230,35^FD${svc.nombre_etiqueta || ''}^FS
^FO30,80^GB750,3,3^FS

^FX -- Abonado y fecha --
^CFA,20
^FO30,100^FDAbonado: ${d.abonado}^FS
^FO400,100^FDFecha: ${d.fecha}^FS
^FO30,130^FDServicio: ${svc.nombre || ''} (${d.servicio})^FS
^FO400,130^FDRef: ${d.ref}^FS
^FO30,160^GB750,3,3^FS

^FX -- Destinatario --
^CF0,35
^FO30,180^FDDestinatario:^FS
^CF0,30
^FO30,225^FD${(d.client || '').substring(0, 25).toUpperCase()}^FS
^CFA,24
^FO30,265^FD${d.address}^FS
^FO30,295^FD${d.postcode} ${(d.city_ent || '').toUpperCase()}^FS
^FO30,325^FDAtt: ${d.per_ent}^FS
^FO30,355^FDTel: ${d.phone}^FS
^FO30,385^GB750,3,3^FS

^FX -- Detalles --
^CFA,22
^FO30,405^FDBultos: ${d.bultos}/${d.totalBultos}^FS
^FO200,405^FDPortes: ${portName}^FS
^FO450,405^FDEnvase: ${envName}^FS
${d.reem ? `^FO30,435^FDReembolso: ${Number(d.amount).toFixed(2)}EUR^FS` : ''}

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
^FO30,610^FDValor declarado: ${d.valor_declarado} EUR^FS` : ''}

^FX -- Observaciones --
^FO30,${isInt ? '640' : '575'}^GB750,3,3^FS
^CFA,20
^FO30,${isInt ? '655' : '590'}^FDObs: ${d.obs}^FS

^FX -- Barcode 1 (Expedición) --
^FO30,${isInt ? '690' : '625'}^GB750,3,3^FS
^BY3,2,140
^FO100,${isInt ? '710' : '645'}^BC^FD${d.barcode1}^FS

^FX -- Barcode 2 (NX) --
^BY2,2,60
^FO200,${isInt ? '880' : '810'}^BC^FD${d.barcode2}^FS

^FX -- Footer --
^FO30,${isInt ? '960' : '895'}^GB750,3,3^FS
^CFA,18
^FO30,${isInt ? '975' : '910'}^FDExp: ${d.barcode1}^FS
^FO350,${isInt ? '975' : '910'}^FDPedido: #${d.ref_cms}^FS
^FO600,${isInt ? '975' : '910'}^FDAg: ${d.abonado}^FS

^XZ`;
}
