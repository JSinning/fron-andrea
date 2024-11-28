export interface IProductos {
  idCodigo: string;
  descripcionMer: string;
  tNivel: number;
  suspendido: boolean;
}

export type Productos = IProductos[];
