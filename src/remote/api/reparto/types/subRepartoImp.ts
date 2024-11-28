export interface ISubRepartoImp {
  nReparto: number;
  auton?: number;
  codigoIndiv: number;
  horaRep: string;
  codPiel: string;
  codVended: string;
  sexo: string;
  mesas1: string;
  mesas2: string;
  nViscera: number;
  mesasVisc: string;
  transport1: string;
  transport2: string;
  transport3: string;
  lavPanz: boolean;
  frio: boolean;
  otros: boolean;
  otros1: boolean;
  observa: string;
  actualiza: boolean;
  fechaR: string;
}
export type SubRepartoImp = ISubRepartoImp[];
