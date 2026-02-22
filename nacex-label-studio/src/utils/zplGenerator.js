/**
 * ZPL Generator — genera código ZPL a partir de los datos de la etiqueta
 */
import { SERVICIOS, ENVASES, PORTES } from '../constants/services';

const svcInfo = (d) => SERVICIOS[d.servicio] || {};
const envName = (d) => ENVASES[d.envase] || 'PAQ';
const portName = (d) => PORTES[d.portes] || 'Origen';

export function generateZPL840(d) {
  const svc = svcInfo(d);
  const isInt = svc.tipo === 'internacional';

  return `^XA
^FX === NACEX ETIQUETA 840 ===
^CF0,50
^FO30,30^FDNACEX^FS
^CF0,20
^FO230,35^FD${svc.nombre_etiqueta || ''}^FS
^FO30,80^GB750,3,3^FS
^CFA,20
^FO30,100^FDAbonado: ${d.abonado}^FS
^FO400,100^FDFecha: ${d.fecha}^FS
^FO30,130^FDServicio: ${svc.nombre || ''} (${d.servicio})^FS
^FO400,130^FDRef: ${d.ref}^FS
^FO30,160^GB750,3,3^FS
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
^CFA,22
^FO30,405^FDBultos: ${d.bultos}/${d.totalBultos}^FS
^FO200,405^FDPortes: ${portName(d)}^FS
^FO450,405^FDEnvase: ${envName(d)}^FS
${d.reem ? `^FO30,435^FDReembolso: ${Number(d.amount).toFixed(2)}EUR^FS` : ''}
^FO30,470^GB750,3,3^FS
^FO30,485^GB120,80,120^FS
^FR^CF0,50^FO45,498^FD${d.route}^FS^FR
^CF0,24
^FO170,495^FDCod: ${d.code}^FS
^FO170,525^FDPais: ${d.pais}^FS
${isInt ? `^FO30,570^GB750,3,3^FS
^CFA,20^FO30,585^FDContenido: ${d.contenido}^FS
^FO30,610^FDValor: ${d.valor_declarado} EUR^FS` : ''}
^FO30,${isInt ? '640' : '575'}^GB750,3,3^FS
^CFA,20^FO30,${isInt ? '655' : '590'}^FDObs: ${d.obs}^FS
^FO30,${isInt ? '690' : '625'}^GB750,3,3^FS
^BY3,2,140
^FO100,${isInt ? '710' : '645'}^BC^FD${d.barcode1}^FS
^BY2,2,60
^FO200,${isInt ? '880' : '810'}^BC^FD${d.barcode2}^FS
^FO30,${isInt ? '960' : '895'}^GB750,3,3^FS
^CFA,18
^FO30,${isInt ? '975' : '910'}^FDExp: ${d.barcode1}^FS
^FO350,${isInt ? '975' : '910'}^FDPedido: #${d.ref_cms}^FS
^FO600,${isInt ? '975' : '910'}^FDAg: ${d.abonado}^FS
^XZ`;
}

export function generateZPL841(d) {
  const svc = svcInfo(d);
  return `^XA
^FX === NACEX ETIQUETA 841 DIANA ===
^CF0,50
^FO30,30^FDNACEX^FS
^CF0,18
^FO230,40^FD841 - BULTO EXTRA^FS
^FO30,75^GB750,3,3^FS
^CFA,20
^FO30,90^FDAbonado: ${d.abonado}^FS
^FO400,90^FDFecha: ${d.fecha}^FS
^FO30,115^FDServicio: ${svc.nombre_etiqueta || ''} (${d.servicio})^FS
^FO30,145^GB750,3,3^FS
^FX -- Bulto destacado --
^FO200,160^GB360,90,90^FS
^FR^CF0,60^FO230,175^FDBULTO ${d.bultoActual} de ${d.totalBultos}^FS^FR
^FO30,270^GB750,3,3^FS
^CF0,30
^FO30,290^FD${(d.client || '').substring(0, 25).toUpperCase()}^FS
^CFA,24
^FO30,325^FD${d.address}^FS
^FO30,355^FD${d.postcode} ${(d.city_ent || '').toUpperCase()}^FS
^FO30,385^FDAtt: ${d.per_ent}^FS
^FO30,415^GB750,3,3^FS
^FO30,430^GB120,70,120^FS
^FR^CF0,45^FO42,440^FD${d.route}^FS^FR
^CF0,22^FO170,440^FDCod: ${d.code}^FS
^FO170,468^FDPais: ${d.pais}^FS
^FO30,520^GB750,3,3^FS
^CFA,18^FO30,535^FDExp. original: ${d.barcode1_original}^FS
^FO30,565^GB750,3,3^FS
^BY3,2,130
^FO100,580^BC^FD${d.barcode1}^FS
^BY2,2,55
^FO200,735^BC^FD${d.barcode2}^FS
^FO30,815^GB750,3,3^FS
^CFA,18
^FO30,830^FDRef: ${d.ref}^FS
^FO350,830^FDPedido: #${d.ref_cms}^FS
^XZ`;
}

export function generateZPLCambio(d) {
  const svc = svcInfo(d);
  return `^XA
^FX === NACEX ETIQUETA CAMBIO ===
^CF0,50
^FO30,30^FDNACEX^FS
^FO250,25^GB510,55,55^FS
^FR^CF0,40^FO300,32^FDCAMBIO^FS^FR
^FO30,85^GB750,3,3^FS
^CFA,20
^FO30,100^FDAbonado: ${d.abonado}^FS
^FO400,100^FDFecha: ${d.fecha}^FS
^FO30,125^FDServicio: ${svc.nombre_etiqueta || ''}^FS
^FO30,155^GB750,3,3^FS
^CF0,28
^FO30,175^FD${(d.client || '').substring(0, 25).toUpperCase()}^FS
^CFA,22
^FO30,210^FD${d.address}^FS
^FO30,238^FD${d.postcode} ${(d.city_ent || '').toUpperCase()}^FS
^FO30,266^FDAtt: ${d.per_ent} Tel: ${d.phone}^FS
^FO30,296^GB750,3,3^FS
^FO30,310^GB120,65,120^FS
^FR^CF0,42^FO42,318^FD${d.route}^FS^FR
^CF0,20^FO170,318^FDCod: ${d.code} Pais: ${d.pais}^FS
^FO30,390^GB750,3,3^FS
^CFA,20
^FO30,408^FDMotivo: ${d.motivo_cambio}^FS
^FO30,435^FDOriginal: ${d.articulo_original}^FS
^FO30,460^FDNuevo: ${d.articulo_nuevo}^FS
^FO30,490^GB750,3,3^FS
^CFA,18^FO30,505^FDObs: ${d.obs}^FS
^FO30,535^GB750,3,3^FS
^BY3,2,130
^FO100,550^BC^FD${d.barcode1}^FS
^BY2,2,55
^FO200,705^BC^FD${d.barcode2}^FS
^FO30,785^GB750,3,3^FS
^CFA,18
^FO30,800^FDRef: ${d.ref}^FS
^FO400,800^FDPedido: #${d.ref_cms}^FS
^XZ`;
}

export function generateZPLDevolucion(d) {
  return `^XA
^FX === NACEX ETIQUETA DEVOLUCION ===
^CF0,50
^FO30,30^FDNACEX^FS
^FO200,20^GB560,65,65^FS
^FR^CF0,48^FO240,28^FDDEVOLUCION^FS^FR
^FO30,95^GB750,3,3^FS
^CFA,20
^FO30,110^FDAbonado: ${d.abonado}^FS
^FO400,110^FDFecha: ${d.fecha}^FS
^FO30,140^GB750,3,3^FS
^FX -- Remitente (cliente que devuelve) --
^CFA,18^FO30,155^FDREMITENTE (Cliente):^FS
^CF0,26
^FO30,180^FD${(d.remitente || '').substring(0, 30).toUpperCase()}^FS
^CFA,20
^FO30,212^FD${d.dir_rec}^FS
^FO30,238^FD${d.cp_rec} ${(d.pob_rec || '').toUpperCase()}^FS
^FO30,268^GB750,3,3^FS
^FX -- Destino (almacen) --
^CFA,18^FO30,283^FDDESTINO (Almacen):^FS
^CF0,28
^FO30,310^FD${(d.client || '').substring(0, 25).toUpperCase()}^FS
^CFA,22
^FO30,345^FD${d.address}^FS
^FO30,373^FD${d.postcode} ${(d.city_ent || '').toUpperCase()}^FS
^FO30,401^FDAtt: ${d.per_ent}^FS
^FO30,431^GB750,3,3^FS
^FO30,445^GB120,65,120^FS
^FR^CF0,42^FO42,453^FD${d.route}^FS^FR
^CF0,20^FO170,453^FDCod: ${d.code} Pais: ${d.pais}^FS
^FO30,525^GB750,3,3^FS
^CFA,18^FO30,540^FDMotivo: ${d.motivo_devolucion}^FS
^FO30,565^FDObs: ${d.obs}^FS
^FO30,590^GB750,3,3^FS
^BY3,2,120
^FO100,605^BC^FD${d.barcode1}^FS
^BY2,2,50
^FO200,750^BC^FD${d.barcode2}^FS
^FO30,825^GB750,3,3^FS
^CFA,18
^FO30,840^FDRef: ${d.ref}^FS
^FO400,840^FDPedido: #${d.ref_cms}^FS
^XZ`;
}

export function generateZPLDocumentar(d) {
  const svc = svcInfo(d);
  return `^XA
^FX === NACEX DOCUMENTAR ENVIO ===
^CF0,50
^FO30,30^FDNACEX^FS
^CF0,18^FO230,40^FDDOCUMENTAR ENVIO^FS
^FO30,75^GB750,3,3^FS
^CFA,20
^FO30,90^FDAbonado: ${d.abonado}^FS
^FO400,90^FDFecha: ${d.fecha}^FS
^FO30,115^FDServicio: ${svc.nombre_etiqueta || ''}^FS
^FO400,115^FDExp: ${d.cod_expedicion}^FS
^FO30,145^GB750,3,3^FS
^CF0,28
^FO30,165^FD${(d.client || '').substring(0, 25).toUpperCase()}^FS
^CFA,22
^FO30,200^FD${d.address}^FS
^FO30,228^FD${d.postcode} ${(d.city_ent || '').toUpperCase()}^FS
^FO30,256^FDAtt: ${d.per_ent} Tel: ${d.phone}^FS
^FO30,286^GB750,3,3^FS
^FO30,300^GB120,65,120^FS
^FR^CF0,42^FO42,308^FD${d.route}^FS^FR
^CF0,20^FO170,308^FDCod: ${d.code}^FS
^FO170,336^FDPais: ${d.pais}^FS
^FO30,380^GB750,3,3^FS
^FX -- Datos documentación --
^CFA,22^FO30,398^FDDatos del envio:^FS
^CFA,20
^FO30,428^FDPeso: ${d.peso} kg^FS
^FO250,428^FDMedidas: ${d.largo}x${d.ancho}x${d.alto} cm^FS
^FO30,455^FDContenido: ${d.contenido_doc}^FS
^FO30,482^FDBultos: ${d.bultos}/${d.totalBultos}  Portes: ${portName(d)}  Envase: ${envName(d)}^FS
^FO30,512^FDEstado: ${d.estado_expedicion}^FS
^FO30,542^GB750,3,3^FS
${d.obs ? `^CFA,18^FO30,555^FDObs: ${d.obs}^FS\n^FO30,580^GB750,3,3^FS` : ''}
^BY3,2,120
^FO100,${d.obs ? '595' : '555'}^BC^FD${d.barcode1}^FS
^BY2,2,50
^FO200,${d.obs ? '740' : '700'}^BC^FD${d.barcode2}^FS
^FO30,${d.obs ? '815' : '775'}^GB750,3,3^FS
^CFA,18
^FO30,${d.obs ? '830' : '790'}^FDRef: ${d.ref}^FS
^FO400,${d.obs ? '830' : '790'}^FDPedido: #${d.ref_cms}^FS
^XZ`;
}

export function generateZPLNacexShop(d) {
  return `^XA
^FX === NACEX ETIQUETA NACEXSHOP ===
^CF0,50
^FO30,30^FDNACEX^FS
^CF0,20^FO230,35^FDNACEXSHOP^FS
^FO30,75^GB750,3,3^FS
^CFA,20
^FO30,90^FDAbonado: ${d.abonado}^FS
^FO400,90^FDFecha: ${d.fecha}^FS
^FO30,120^GB750,3,3^FS
^FX -- Punto de entrega --
^FO30,135^GB750,120,4^FS
^CF0,28^FO45,145^FDPunto NacexShop:^FS
^CF0,32^FO45,180^FD${(d.alias || '').toUpperCase()}^FS
^CFA,20^FO45,218^FD${d.punto_direccion} - ${d.punto_cp} ${d.punto_ciudad}^FS
^FO30,270^GB750,3,3^FS
^FX -- Destinatario final --
^CFA,18^FO30,285^FDDESTINATARIO FINAL:^FS
^CF0,28
^FO30,310^FD${(d.client || '').substring(0, 25).toUpperCase()}^FS
^CFA,22
^FO30,345^FDAtt: ${d.per_ent}  Tel: ${d.phone}^FS
^FO30,375^GB750,3,3^FS
^FO30,390^GB120,65,120^FS
^FR^CF0,42^FO42,398^FD${d.route}^FS^FR
^CF0,20^FO170,398^FDCod: ${d.code}^FS
^FO170,426^FDPais: ${d.pais}^FS
^CFA,18^FO400,398^FDPunto ID: ${d.punto_id}^FS
^FO400,426^FDHorario: ${d.punto_horario}^FS
^FO30,470^GB750,3,3^FS
${d.obs ? `^CFA,18^FO30,485^FDObs: ${d.obs}^FS\n^FO30,510^GB750,3,3^FS` : ''}
^BY3,2,130
^FO100,${d.obs ? '525' : '485'}^BC^FD${d.barcode1}^FS
^BY2,2,55
^FO200,${d.obs ? '680' : '640'}^BC^FD${d.barcode2}^FS
^FO30,${d.obs ? '760' : '720'}^GB750,3,3^FS
^CFA,18
^FO30,${d.obs ? '775' : '735'}^FDRef: ${d.ref}^FS
^FO400,${d.obs ? '775' : '735'}^FDPedido: #${d.ref_cms}^FS
^XZ`;
}

export function generateZPLInternacional(d) {
  const svc = svcInfo(d);
  return `^XA
^FX === NACEX ETIQUETA INTERNACIONAL ===
^CI28
^CF0,50
^FO30,30^FDNACEX^FS
^FO230,25^GB530,50,50^FS
^FR^CF0,35^FO260,30^FDINTERNACIONAL^FS^FR
^FO30,85^GB750,3,3^FS
^CFA,20
^FO30,100^FDAbonado: ${d.abonado}^FS
^FO400,100^FDFecha: ${d.fecha}^FS
^FO30,125^FDServicio: ${svc.nombre_etiqueta || ''} (${d.servicio})^FS
^FO30,155^GB750,3,3^FS
^FX -- Remitente --
^CFA,18^FO30,170^FDREMITENTE:^FS
^CFA,22
^FO30,195^FD${(d.remitente || '').substring(0, 30)}^FS
^FO30,222^FD${d.dir_rec}^FS
^FO30,249^FD${d.cp_rec} ${(d.pob_rec || '').toUpperCase()} - ${d.pais === 'ES' ? 'SPAIN' : d.pais}^FS
^FO30,279^GB750,3,3^FS
^FX -- Destinatario --
^CFA,18^FO30,294^FDDESTINATARIO:^FS
^CF0,28
^FO30,320^FD${(d.client || '').substring(0, 25).toUpperCase()}^FS
^CFA,22
^FO30,355^FD${d.address}^FS
^FO30,383^FD${d.postcode} ${(d.city_ent || '').toUpperCase()} - ${d.pais}^FS
^FO30,411^FDAtt: ${d.per_ent}  Tel: ${d.phone}^FS
^FO30,441^GB750,3,3^FS
^FO30,455^GB120,65,120^FS
^FR^CF0,42^FO42,463^FD${d.route}^FS^FR
^CF0,20^FO170,463^FDCod: ${d.code}^FS
^FO170,491^FDPais destino: ${d.pais}^FS
^FO30,535^GB750,3,3^FS
^FX -- Datos aduaneros --
^FO30,548^GB750,130,4^FS
^CF0,22^FO45,558^FDDATOS ADUANEROS^FS
^CFA,20
^FO45,588^FDContenido: ${d.contenido}^FS
^FO45,615^FDValor declarado: ${d.valor_declarado} EUR^FS
^FO400,588^FDHS Code: ${d.hs_code || '-'}^FS
^FO400,615^FDPeso: ${d.peso} kg  Arts: ${d.num_articulos}^FS
^FO45,645^FDBultos: ${d.bultos}/${d.totalBultos}  Portes: ${portName(d)}^FS
^FO30,695^GB750,3,3^FS
${d.obs ? `^CFA,18^FO30,710^FDObs: ${d.obs}^FS\n^FO30,735^GB750,3,3^FS` : ''}
^BY3,2,110
^FO100,${d.obs ? '750' : '710'}^BC^FD${d.barcode1}^FS
^BY2,2,50
^FO200,${d.obs ? '885' : '845'}^BC^FD${d.barcode2}^FS
^FO30,${d.obs ? '960' : '920'}^GB750,3,3^FS
^CFA,18
^FO30,${d.obs ? '975' : '935'}^FDRef: ${d.ref}^FS
^FO400,${d.obs ? '975' : '935'}^FDPedido: #${d.ref_cms}^FS
^XZ`;
}
