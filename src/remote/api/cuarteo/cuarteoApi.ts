/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
import { API_URL } from '@/consts';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../../HttpClient';
import IPagination from '@/types/IPagination';
import { BaseResponse, FriRCanaGuiasProd } from '@/types';
import {
  FriRCanaTotCanal,
  ITblReproCanal,
  ICuartoF,
  NitCCCuateo,
  ProductosSecund,
  Productos,
  reprocesoCanalDt1,
  reprocesoCanalDt3,
  subRelaCanGuia4,
  ISubRelaCanGuia3Data,
  ProductosDt2,
  reprocesoCanalDt2,
  IReprocesoCanal,
  IReprocesoCanalDt2,
  IReprocesoCanalDt1,
} from '@/remote/api/cuarteo/types';
import { IGuiaSacrifico } from '../guia_sacrificio/type';
import { ICambFech } from '@/remote/api/cuarteo/types/cambFech';
import IQuery from '@/types/query';

export default class CuarteoApi extends HttpClient {
  public authToken: string;

  public subRelaCanGuia3 = {
    get: (reprocesoNo: ITblReproCanal['reprocesoNo'], params?: IPagination) =>
      this.instance.get<
        BaseResponse<{
          data: ISubRelaCanGuia3Data[];
          cantidad: number;
          kilos: number;
        }>
      >(`/cuarteo/subRelaCanGuia3/${reprocesoNo}`, { params }),
    licIca: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<Array<Pick<IGuiaSacrifico, 'nGuia' | 'lIca'>>>
      >(`/cuarteo/subRelaCanGuia3/licIca`, { params }),
    proveedores: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<Array<{ nGuia: IGuiaSacrifico['nGuia']; expr1: string }>>
      >(`/cuarteo/subRelaCanGuia3/licIca`, { params }),
  };

  public reprocesoCanalMod = {
    afterUpdateBusClient: (reprocesoNo: number) =>
      this.instance.get<BaseResponse<ITblReproCanal>>(
        `/cuarteo/reprocesoCanalModificacion/afterUpdateBusClient/${reprocesoNo}`,
      ),
    anular: ({ reprocesoNo, ...rest }: Partial<ITblReproCanal>) =>
      this.instance.put<BaseResponse>(
        `/cuarteo/reprocesoCanalModificacion/anular/${reprocesoNo}`,
        rest,
      ),
    confirmar: ({ reprocesoNo, ...rest }: Partial<ITblReproCanal>) =>
      this.instance.put<BaseResponse>(
        `/cuarteo/reprocesoCanalModificacion/confirmar/${reprocesoNo}`,
        rest,
      ),
    getBusClient: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<Array<Pick<ITblReproCanal, 'reprocesoNo' | 'fechaMov'>>>
      >(`/cuarteo/reprocesoCanalModificacion/busClient`, { params }),
  };

  public reprocesoCanal = {
    put: (data: Partial<ITblReproCanal>) =>
      this.instance.put<BaseResponse<any>>(
        `/cuarteo/reprocesoCanal/${data.reprocesoNo}`,
        data,
      ),
  };

  public reprocesoCanalPend = {
    afterUpdateBusClient: (reprocesoNo: ITblReproCanal['reprocesoNo']) =>
      this.instance.get<BaseResponse<ITblReproCanal>>(
        `/cuarteo/reprocesoCanalPend/afterUpdateBusClient/${reprocesoNo}`,
      ),
    busClient: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<Array<Pick<ITblReproCanal, 'reprocesoNo' | 'fechaMov'>>>
      >(`/cuarteo/reprocesoCanalPend/busClient`, { params }),
    getCuartoS: () =>
      this.instance.get<BaseResponse<ICuartoF[]>>(
        `/cuarteo/reprocesoCanal/cuartoS`,
      ),
    getNitoCC: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<{
            nitCliente: string;
            expr2: string;
            expr1: string;
            codiCliente: string;
            habilitado: boolean;
          }>
        >
      >(`/cuarteo/reprocesoCanal/nitoCC`, { params }),
    onGenerarRelacion: (
      reprocesoNo: ITblReproCanal['reprocesoNo'],
      data: Partial<ITblReproCanal> & { esPropio: boolean },
    ) =>
      this.instance.put<BaseResponse<any>>(
        `/cuarteo/reprocesoCanal/onGenerarRelacion/${reprocesoNo}`,
        data,
      ),
  };

  public reprocesoCanalCons = {
    afterUpdateBusClient: (reprocesoNo: ITblReproCanal['reprocesoNo']) =>
      this.instance.get<BaseResponse<ITblReproCanal>>(
        `/cuarteo/reprocesoCanalConsulta/afterUpdateBusClient/${reprocesoNo}`,
      ),
    getBusClient: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<Array<Pick<ITblReproCanal, 'reprocesoNo' | 'fechaMov'>>>
      >(`/cuarteo/reprocesoCanalConsulta/busClient`, { params }),
    getBusClientFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<Array<Pick<ITblReproCanal, 'reprocesoNo' | 'fechaMov'>>>
      >(`/cuarteo/reprocesoCanalConsulta/busClientByText`, { params }),
  };

  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getTConfInv1 = () => this.instance.get('/cuarteo/config/');
  public putTConfInv1 = (data: any) =>
    this.instance.put('/cuarteo/config/', data);
  public getMenu1 = () => this.instance.get('/cuarteo/menu/menu1');
  public getMenu2 = (tipo: number) =>
    this.instance.get(`/cuarteo/menu/menu1/desc?tipo2=${tipo}`);
  public getCamFech = () =>
    this.instance.get<BaseResponse<ICambFech[]>>('/cuarteo/cambFech/');
  public getCamFechIdAuto = (idAuto: ICambFech['idAuto']) =>
    this.instance.get<BaseResponse<ICambFech>>(`/cuarteo/cambFech/${idAuto}`);
  public putCamFech = (data: ICambFech) =>
    this.instance.put<BaseResponse>('/cuarteo/cambFech/', data);
  // Reproceso Canal
  public getNitoCC = (params?: IPagination) =>
    this.instance.get<BaseResponse<NitCCCuateo>>(
      '/cuarteo/reprocesoCanal/nitoCC',
      { params },
    );
  public getNitoCCFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<NitCCCuateo>>(
      '/cuarteo/reprocesoCanal/nitoCCByText',
      { params },
    );
  public getCuartoS = () =>
    this.instance.get('/cuarteo/reprocesoCanal/cuartoS');
  public getAddCuarteo = () =>
    this.instance.get('/cuarteo/reprocesoCanal/onNewRecord');
  public putGenerarRelacion = (reprocesoNo: number, data: any) =>
    this.instance.put(
      `/cuarteo/reprocesoCanal/onGenerarRelacion/${reprocesoNo}`,
      data,
    );
  public postReprocesoCanal = (data: IReprocesoCanal) =>
    this.instance.post('/cuarteo/reprocesoCanal/', data);
  public putReprocesoCanal = (reprocesoNo: number, data: IReprocesoCanal) =>
    this.instance.put<BaseResponse>(
      `/cuarteo/reprocesoCanal/${reprocesoNo}`,
      data,
    );
  public deleteReprocesoCanal = (reprocesoNo: number) =>
    this.instance.delete(`/cuarteo/reprocesoCanal/${reprocesoNo}`);

  // endpoints table reprocesoCanalDt1
  public getIdCodigoDt1 = () =>
    this.instance.get<BaseResponse<Productos>>(
      '/cuarteo/reprocesoCanalDet1/idCodigoSelect',
    );
  public getEtiquetaCheck = (etiqueta: string) =>
    this.instance.get(
      `/cuarteo/reprocesoCanalDet1/checkExportacion/${etiqueta}`,
    );
  public getReprocesoCanalDt1 = (reprocesoNo: number, params?: IPagination) =>
    this.instance.get<BaseResponse<reprocesoCanalDt1>>(
      `/cuarteo/reprocesoCanalDet1/${reprocesoNo}`,
      { params },
    );
  public postReprocesoCanalDt1 = (data: any) =>
    this.instance.post('/cuarteo/reprocesoCanalDet1', data);
  public putBeforeUpdateReprocesoCanalDt1 = (data: any) =>
    this.instance.put('/cuarteo/reprocesoCanalDet1/beforeUpdate', data);
  public putReprocesoCanalDt1 = (
    data: any,
    reprocesoNo: number,
    autoNum: number,
  ) =>
    this.instance.put(
      `/cuarteo/reprocesoCanalDet1/${reprocesoNo}/${autoNum}`,
      data,
    );

  // endpoints table reprocesoCanalDt2
  public getProductosDt2 = (params?: IPagination) =>
    this.instance.get<BaseResponse<ProductosDt2>>(
      '/cuarteo/reprocesoCanalDet2/productos',
      { params },
    );
  public getProductosDt2Find = (params?: IQuery) =>
    this.instance.get<BaseResponse<ProductosDt2>>(
      '/cuarteo/reprocesoCanalDet2/productosByText',
      { params },
    );
  public getProductosDt2CodAgrup = (
    codigoAgrup: string,
    params?: IPagination,
  ) =>
    this.instance.get<BaseResponse<ProductosDt2>>(
      `/cuarteo/reprocesoCanalDet2/productos/${codigoAgrup}`,
      { params },
    );
  public getProductosDt2CodAgrupFind = (codigoAgrup: string, params?: IQuery) =>
    this.instance.get<BaseResponse<ProductosDt2>>(
      `/cuarteo/reprocesoCanalDet2/productosByText/${codigoAgrup}`,
      { params },
    );

  public postOnOpenReprocesoCanalDt2 = (
    data: Pick<IReprocesoCanalDt2, 'guiaNo' | 'nAnima' | 'ladoAni'>,
  ) =>
    this.instance.post<BaseResponse<reprocesoCanalDt2>>(
      '/cuarteo/reprocesoCanalDet2/onOpen',
      data,
    );
  public postOnBeforeInsertReprocesoCanalDt2 = (
    data: Pick<
      IReprocesoCanalDt2,
      'guiaNo' | 'nAnima' | 'ladoAni' | 'reprocesoNo'
    >,
  ) => this.instance.post('/cuarteo/reprocesoCanalDet2/onBeforeInsert', data);
  public postOnAfterInsertReprocesoCanalDt2 = (
    data: any,
    params?: IPagination,
  ) =>
    this.instance.post('/cuarteo/reprocesoCanalDet2/onAfterInsert', data, {
      params,
    });
  public postOnAfterUpdateReprocesoCanalDt2 = (
    data: any,
    params?: IPagination,
  ) =>
    this.instance.post('/cuarteo/reprocesoCanalDet2/onAfterUpdate', data, {
      params,
    });
  public getReprocesoCanalDt2 = (reprocesoNo: number, params?: IPagination) =>
    this.instance.get<BaseResponse<reprocesoCanalDt2>>(
      `/cuarteo/reprocesoCanalDet2/${reprocesoNo}`,
      { params },
    );

  // endpoints table reprocesoCanalDt3
  public getProductosSecond = (params?: IPagination) =>
    this.instance.get<BaseResponse<ProductosSecund>>(
      '/cuarteo/reprocesoCanalDet3/productos',
      { params },
    );
  public getProductosSecondFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<ProductosSecund>>(
      '/cuarteo/reprocesoCanalDet3/productosByText',
      { params },
    );
  public getReprocesoCanalDt3 = (reprocesoNo: number, params?: IPagination) =>
    this.instance.get<BaseResponse<reprocesoCanalDt3>>(
      `/cuarteo/reprocesoCanalDet3/${reprocesoNo}`,
      { params },
    );
  public postReprocesoCanalDt3 = (data: any) =>
    this.instance.post('/cuarteo/reprocesoCanalDet3/', data);
  public putReprocesoCanalDt3 = (
    data: any,
    reprocesoNo: number,
    autoNum: number,
  ) =>
    this.instance.put(
      `/cuarteo/reprocesoCanalDet3/${reprocesoNo}/${autoNum}`,
      data,
    );

  // endpints from SubRelaCanLot
  public getSubRelaCanLotAllData(params?: IPagination) {
    return this.instance.get<BaseResponse<FriRCanaTotCanal>>(
      `/cuarteo/subRelaCanLot`,
      { params },
    );
  }

  public getSubRelaCanLotData(nGuia: number, params?: IPagination) {
    return this.instance.get<BaseResponse<FriRCanaTotCanal>>(
      `/cuarteo/subRelaCanLot/${nGuia}`,
      { params },
    );
  }

  // endpoints to from ReprocesoCanalDet1C
  public getProductos = (params?: IPagination) =>
    this.instance.get<BaseResponse<Productos>>(
      '/cuarteo/reprocesoCanalDet1/consulta/productos',
      { params },
    );
  public getProductosFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Productos>>(
      '/cuarteo/reprocesoCanalDet1/consulta/productosByText',
      { params },
    );

  public getReprocesoCanalDt1C = (params?: IPagination) =>
    this.instance.get<BaseResponse<reprocesoCanalDt1>>(
      '/cuarteo/reprocesoCanalDet1/consulta',
      { params },
    );

  public getOneReprocesoCanalDt1C = (reprocesoNo: number) =>
    this.instance.get<BaseResponse<reprocesoCanalDt1>>(
      `/cuarteo/reprocesoCanalDet1/consulta/${reprocesoNo}`,
    );

  // imeplement endpoints SubRelaCanGuia4
  public getSubRelaCanGuia4 = (reprocesoNo: number, params?: IPagination) =>
    this.instance.get<BaseResponse<subRelaCanGuia4>>(
      `/cuarteo/subRelaCanGuia4/${reprocesoNo}`,
      { params },
    );

  public getSubConsoDespaData({
    consecTip,
    tipoMov,
  }: Pick<FriRCanaGuiasProd, 'consecTip' | 'tipoMov'>) {
    return this.instance.get<BaseResponse<FriRCanaGuiasProd>>(
      `/cuarteo/subConsoDespa/${consecTip}/${tipoMov}`,
    );
  }

  // endpoint reprocesoCanalMod
  public getReprocesoCanalBusClient = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<Array<Pick<ITblReproCanal, 'reprocesoNo' | 'fechaMov'>>>
    >('/cuarteo/reprocesoCanalModificacion/busClient', {
      params,
    });
  public getReprocesoCanalBusClientFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<Array<Pick<ITblReproCanal, 'reprocesoNo' | 'fechaMov'>>>
    >('/cuarteo/reprocesoCanalModificacion/busClientByText', {
      params,
    });

  public getReprocesoCanalMod = (reprocesoNo: number) =>
    this.instance.get<BaseResponse<IReprocesoCanal>>(
      `/cuarteo/reprocesoCanalModificacion/afterUpdateBusClient/${reprocesoNo}`,
    );
  public putReprocesoCanalModConfimar = (
    reprocesoNo: number,
    data: IReprocesoCanal,
  ) =>
    this.instance.put<BaseResponse>(
      `/cuarteo/reprocesoCanalModificacion/confirmar/${reprocesoNo}`,
      data,
    );
  public putReprocesoCanalModAnualar = (
    reprocesoNo: number,
    data: IReprocesoCanal,
  ) =>
    this.instance.put<BaseResponse>(
      `/cuarteo/reprocesoCanalModificacion/anular/${reprocesoNo}`,
      data,
    );

  private handleRequest = (config: AxiosRequestConfig) => {
    config.headers.Authorization = 'Bearer ' + this.authToken;

    return config;
  };

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this.handleRequest,
      this.handleError,
    );
  };
}
