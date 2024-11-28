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
import {
  Clientes,
  DespachoLocalDet1Im,
  DespachoLocalDet2Im,
  IDespachoLocalDet1Im,
  IDespachoLocalDet2Im,
  IProductos,
  DespachoLocalDet1,
  DespachoLocalDet2,
  IConductores,
  IDLDespachoLc,
  IDespachoLocalDet1,
  IDespachoLocalDet2,
  Productos,
  TercClientes,
  ClientesTerc,
  ITercCliente,
  Conductores,
} from '@/remote/api/despacho_local/types';
import { BaseResponse } from '@/types';
import IPagination from '@/types/IPagination';
import { IAfterEtiqueta } from '@/remote/api/despacho_local/types/afterEtiqueta';
import IQuery from '@/types/query';

export default class DespachoLocalApi extends HttpClient {
  public authToken: string;

  //  DespachoLocalDet1Im
  public despachoLocalDet1Im = {
    get: (idDespachoLoc: IDespachoLocalDet1Im['idDespachoLoc']) =>
      this.instance.get<
        BaseResponse<{ rows: DespachoLocalDet1Im; total: number }>
      >(`/despacholocal/detalles/det1im/${idDespachoLoc}`),
  };

  //  DespachoLocalDet1Im
  public despachoLocalDet2Im = {
    get: (idDespachoLoc: IDespachoLocalDet2Im['idDespachoLoc']) =>
      this.instance.get<
        BaseResponse<{
          rows: DespachoLocalDet2Im;
          cantidad: number;
          total: number;
        }>
      >(`/despacholocal/detalles/det2im/${idDespachoLoc}`),
  };
  // DespachoLocalDt1 functions
  public despachoLocalDt1 = {
    get: (
      idDespachoLoc: IDespachoLocalDet1['idDespachoLoc'],
      params?: IPagination,
    ) =>
      this.instance.get<BaseResponse<DespachoLocalDet1>>(
        `/despacholocal/detalles/det1/${idDespachoLoc}`,
        {
          params,
        },
      ),
    post: (data: IDespachoLocalDet1) =>
      this.instance.post<BaseResponse>('/despacholocal/detalles/det1/', data),
    put: (
      data: IDespachoLocalDet1,
      idDespachoLoc: IDespachoLocalDet1['idDespachoLoc'],
      auton: IDespachoLocalDet1['auton'],
    ) =>
      this.instance.put<BaseResponse>(
        `/despacholocal/detalles/det1/${idDespachoLoc}/${auton}`,
        data,
      ),
  };

  // DespachoLocalDet2 functions
  public despachoLocalDt2 = {
    get: (
      idDespachoLoc: IDespachoLocalDet2['idDespachoLoc'],
      params?: IPagination,
    ) =>
      this.instance.get<BaseResponse<DespachoLocalDet2>>(
        `/despacholocal/detalles/det2/${idDespachoLoc}`,
        { params },
      ),
    post: (data: IDespachoLocalDet2) =>
      this.instance.post<BaseResponse>('/despacholocal/detalles/det2/', data),
    put: (
      data: IDespachoLocalDet2,
      idDespachoLoc: IDespachoLocalDet2['idDespachoLoc'],
      auton: IDespachoLocalDet2['auton'],
    ) =>
      this.instance.put<BaseResponse>(
        `/despacholocal/detalles/det2/${idDespachoLoc}/${auton}`,
        data,
      ),
  };
  // DLDespachoLcCs
  public DLDespachoLcCs = {
    getAfterBuscarCliente: (idDespachoLoc: IDLDespachoLc['idDespachoLoc']) =>
      this.instance.get<BaseResponse<IDLDespachoLc>>(
        `/despacholocal/consulta/afterUpdateBusClient/${idDespachoLoc}`,
      ),
    getBuscarCliente: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<Pick<IDLDespachoLc, 'idDespachoLoc' | 'fechaDL' | 'placaVeh'>>
        >
      >('/despacholocal/consulta/busClient', { params }),
    getBuscarClienteFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<Pick<IDLDespachoLc, 'idDespachoLoc' | 'fechaDL' | 'placaVeh'>>
        >
      >('/despacholocal/consulta/busClientByText', { params }),
    getConductores: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>>
      >('/despacholocal/consulta/conductores', { params }),
    getConductoresFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>>
      >('/despacholocal/consulta/conductoresByText', { params }),
  };

  // DespachoLoccalMod
  public dLDespachoLcMod = {
    getAfterBuscarCliente: (idDespachoLoc: IDLDespachoLc['idDespachoLoc']) =>
      this.instance.get<BaseResponse<IDLDespachoLc>>(
        `/despacholocal/consulta/afterUpdateBusClient/${idDespachoLoc}`,
      ),
    getBuscarCliente: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<Pick<IDLDespachoLc, 'idDespachoLoc' | 'fechaDL' | 'placaVeh'>>
        >
      >('/despacholocal/modificacion/busClient', { params }),
    getBuscarClienteFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<Pick<IDLDespachoLc, 'idDespachoLoc' | 'fechaDL' | 'placaVeh'>>
        >
      >('/despacholocal/modificacion/busClientByText', { params }),
    put: (data: IDLDespachoLc, idDespachoLoc: IDLDespachoLc['idDespachoLoc']) =>
      this.instance.put<BaseResponse<IDLDespachoLc>>(
        `/despacholocal/dl/${idDespachoLoc}`,
        data,
      ),
  };

  // Despacho Local
  public despachoLocal = {
    delete: (idDespachoLoc: IDLDespachoLc['idDespachoLoc']) =>
      this.instance.delete<BaseResponse>(`/despacholocal/dl/${idDespachoLoc}`),
    get: (idDespachoLoc: IDLDespachoLc['idDespachoLoc']) =>
      this.instance.get<BaseResponse<IDLDespachoLc>>(
        `/despacholocal/dl/${idDespachoLoc}`,
      ),
    getIdMaxDespachoLocal: () =>
      this.instance.get<BaseResponse<number>>(
        '/despacholocal/dl/getMaxIdDespachoLocal/',
      ),
    post: (data: IDLDespachoLc) =>
      this.instance.post<BaseResponse>('/despacholocal/dl/', data),
    put: (data: IDLDespachoLc, idDespachoLoc: IDLDespachoLc['idDespachoLoc']) =>
      this.instance.put<BaseResponse<IDLDespachoLc>>(
        `/despacholocal/dl/${idDespachoLoc}`,
        data,
      ),
  };

  // TercCliente
  public tercCliente = {
    get: (params?: IPagination) =>
      this.instance.get<BaseResponse<TercClientes>>(
        '/despacholocal/terccliente',
        { params },
      ),
    post: (data: ITercCliente) =>
      this.instance.post<BaseResponse>(
        `/despacholocal/terccliente/${data.codTerc}/${data.codCliente}`,
        data,
      ),
    put: (
      data: ITercCliente,
      codTerc: ITercCliente['codTerc'],
      codCliente: ITercCliente['codCliente'],
    ) =>
      this.instance.put<BaseResponse>(
        `/despacholocal/terccliente/${codTerc}/${codCliente}`,
        data,
      ),
  };

  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getTConfInv1 = () => this.instance.get('/despacholocal/config');
  public putTConfInv1 = (data: any) =>
    this.instance.put('/despacholocal/config/', data);
  public getMenu1 = () => this.instance.get('/despacholocal/menu/getTMenu1');
  public getMenu2 = (tipo: number) =>
    this.instance.get(`/despacholocal/menu/getTMenu1WithTipo2/${tipo}`);

  // Conductores
  public getBuscarClienteConductores = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>>
    >('/despacholocal/conductoresmod/busClient', { params });
  public getFindClientesConductores = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>>
    >('/despacholocal/conductoresmod/searchConductor', {
      params,
    });
  public getAfterBuscarClienteConductore = (
    nitConduc: IConductores['nitConduc'],
  ) =>
    this.instance.get<BaseResponse<IConductores>>(
      `/despacholocal/conductoresmod/afterUpdateBusClient/${nitConduc}`,
    );
  public postAfterUpdateConductores = ({
    nitConduc,
  }: Pick<IConductores, 'nitConduc'>) =>
    this.instance.post<BaseResponse<IConductores>>(
      `/despacholocal/conductores/afterUpdateNitConduc/${nitConduc}`,
    );
  public postConductores = (data: IConductores) =>
    this.instance.post<BaseResponse>('/despacholocal/conductores', data);
  public putConductores = (
    data: IConductores,
    nitConduc: IConductores['nitConduc'],
  ) => this.instance.put(`/despacholocal/conductores/${nitConduc}`, data);
  public deleteConductores = ({ nitConduc }: Pick<IConductores, 'nitConduc'>) =>
    this.instance.delete(`/despacholocal/conductores/${nitConduc}`);

  // DespachoLocalDet1Im
  public getDespachoLocalDt1ImProductos = (params?: IPagination) =>
    this.instance.get<BaseResponse<Productos>>(
      '/despacholocal/detalles/det1im/productos',
      { params },
    );
  public getDespachoLocalDt1ImProductosFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Productos>>(
      '/despacholocal/detalles/det1im/productosByText',
      { params },
    );
  public getDespachoLocalDt1ImClientes = (params?: IPagination) =>
    this.instance.get<BaseResponse<Clientes>>(
      '/despacholocal/detalles/det1im/clientes',
      { params },
    );
  public getDespachoLocalDt1ImClientesFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Clientes>>(
      '/despacholocal/detalles/det1im/clientesByText',
      { params },
    );

  // DespachoLocalDet2Im
  public getDespachoLocalDt2ImProductos = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<Array<Pick<IProductos, 'idCodigo' | 'descripcionMer'>>>
    >('/despacholocal/detalles/det2im/productos', { params });
  public getDespachoLocalDt2ImProductosFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<Array<Pick<IProductos, 'idCodigo' | 'descripcionMer'>>>
    >('/despacholocal/detalles/det2im/productosByText', { params });

  // DespachosLocalDt1
  public getDespachoLocalDt1Productos = (params?: IPagination) =>
    this.instance.get<BaseResponse<Productos>>(
      '/despacholocal/detalles/det1/productos',
      { params },
    );
  public getDespachoLocalDt1ProductosFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Productos>>(
      '/despacholocal/detalles/det1/productosByText',
      { params },
    );
  public getDespachoLocalDt1Clientes = (params?: IPagination) =>
    this.instance.get<BaseResponse<Clientes>>(
      '/despacholocal/detalles/det1/clientes',
      { params },
    );
  public getDespachoLocalDt1ClientesFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Clientes>>(
      '/despacholocal/detalles/det1/clientesByText',
      { params },
    );

  // DespachosLocalDet2
  public postDespachoLocalDt2CheckEtiqueta = (data: IAfterEtiqueta) =>
    this.instance.post<BaseResponse<any>>(
      '/despacholocal/detalles/det2/afterUpdateEtiqueta',
      data,
    );
  public postDespachoLocalDt2BeforeUpdate = (data: IDespachoLocalDet2) =>
    this.instance.post('/despacholocal/detalles/det2/beforeUpdateForm', data);

  // despachoLocal
  public getDespachoLocalConductores = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>>
    >('/despacholocal/dl/conductores', { params });
  public getDespachoLocalConductoresFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>>
    >('/despacholocal/dl/conductoresByText', { params });
  public getAfterUpdateConductore = (nitConduc: IConductores['nitConduc']) =>
    this.instance.get<BaseResponse<string>>(
      `/despacholocal/dl/afterUpdateConductorVeh/${nitConduc}`,
    );

  // DespachoLocalMod
  public getDespachoLocalModConductores = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>>
    >('/despacholocal/modificacion/conductores', { params });
  public getDespachoLocalModConductoresFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>>
    >('/despacholocal/modificacion/conductoresByText', { params });

  // TercCliente
  public getClientesTercClient = (params?: IPagination) =>
    this.instance.get<BaseResponse<ClientesTerc>>(
      '/despacholocal/terccliente/clientes',
      { params },
    );
  public getClientesTercClientFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<ClientesTerc>>(
      '/despacholocal/terccliente/clientesByText',
      { params },
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
