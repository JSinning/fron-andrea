export interface IOrdCompraSubLote {
  idConcecutiv: number;
  loteNo: number;
  nGuia: number;
  nitProveedor: string;
  transportador: string;
  lIca: string;
  horaPesaje: string;
  fechaPes: string;
  sexo: number;
  clase: number;
  noAnimales: number;
  procedencia: string;
  finca: string;
  destino: number;
  totalKilosP: number;
  pesoPromedio: number;
  pesoPieles: number;
  pesoCanalC: number;
  pesoProgram: number;
  liqPesoFinca: boolean;
  docum: string;
  vlrKilo: number;
  vlrKiloSug: number;
  docFlete: string;
  vlrFlete: number;
  observacion: string;
  elaboro: string;
  esCanal: boolean;
  confirma: boolean;
  procesado: boolean;
  reteFu: string;
  nDia: number;
  imprime: string;
  cOrdenCp: number;
  anulada: boolean;
  motivoAnula: string;
  estado: string;
  motivoEstado: string;
  fecha: string;
  usuario: string;
}