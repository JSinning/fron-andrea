/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/
import { ITblReproCanal } from './TblReproCanal';
import { IGuiaSacrifico } from '../../guia_sacrificio/type';
import { IProductosSecund } from './productosSecund';
import { ITblReproCanalDet1 } from './ITblReproCanalDet1';

export interface IFriReprocTotGuia {
  reprocesoNo: ITblReproCanal['reprocesoNo'];
  guiaNo: ITblReproCanalDet1['guiaNo'];
  idCodigo: ITblReproCanalDet1['idCodigo'];
  cantiKil: ITblReproCanalDet1['cantidad'];
  nLote: IGuiaSacrifico['nLote'];
  descripcionMer: IProductosSecund['descripcionMer'];
}
