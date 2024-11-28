export interface ITercMesa {
  mesas: string;
  descripcionM: string;
  nombreExpendio: string;
  direccionM?: string;
  telefonoM?: string;
  ciudad?: string;
  anulaM?: boolean;
}
export type TercMesa = ITercMesa[];
