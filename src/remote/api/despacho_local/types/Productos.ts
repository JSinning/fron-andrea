export interface IProductos {
  idCodigo: string;
  descripcionMer: string;
  tNivel: number;
  suspendido: boolean;
  idCategoria: number;
}

export type Productos = IProductos[];
