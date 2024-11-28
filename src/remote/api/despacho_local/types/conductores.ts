export interface IConductores {
  idEmpresa: number;
  nitConduc: string;
  expedida: string;
  nombreCond: string;
  placaV: string;
  telefono1?: string;
  telefono2?: string;
  fecha: string;
  usuario: string;
}

export type Conductores = IConductores[];
