/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
*/
import { IFriReprocTotGuia } from '.';
import { IGuiaSacrifico } from '../../guia_sacrificio/type';

export type ISubRelaCanGuia3Data = IFriReprocTotGuia & {
  proveedor: Pick<IGuiaSacrifico, 'nGuia'> & { expr1: string };
  licIca: Pick<IGuiaSacrifico, 'nGuia' | 'lIca'>;
};
