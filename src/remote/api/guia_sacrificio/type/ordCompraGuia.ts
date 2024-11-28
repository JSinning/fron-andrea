export interface IOrdCompraGuia {
  idConsecutivo: number;
  numeroDoc: number;
  docPlanillaPes: string;
  fechaMov: string;
  liqPesoFinca: boolean;
  nLoteUsua: string;
  nResesNego: number;
  pesoPotreros: number;
  pesoProm: number;
  precioKilo: number;
  finca: string;
  transporProvFs: string;
  observacion: string;
  imprim: string;
  anulada: boolean;
  motivoAnu: string;
  fechaReg: string;
  usuarioReg: string;
  estacion: string;
}
