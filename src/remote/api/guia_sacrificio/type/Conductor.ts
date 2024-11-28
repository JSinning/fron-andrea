export interface IConductor {
  idEmpresa: number;
  nitConduc: string;
  expedida: string;
  nombreCond: string;
  placaV: string;
  telefono1: string;
  telefono2: string;
  fecha: string;
  usuario: string;
  expr1?: string;
  expr2?: string;
}

export type Conductores = IConductor[];
