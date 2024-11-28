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
import { BaseResponse, ICambFech } from '@/types';
import {
  ICodigoPiel,
  ICodigoVendedor,
  IConductores,
  IMesa,
  ISexo,
  ISubReparto,
  ITransport,
  SubReparto,
  ISubRepartoImp,
  SubRepartoImp,
  ISubRepartoHt,
  BuscarClientesHist,
  IClientes,
  ICiudades,
  ITercMesa,
  TercMesa,
  TercTransport,
  ITercTransport,
  TercClientes,
  ITercClientes,
  IProveedor,
  TercPieles,
  ITercPieles,
  ITipoMoviento,
  INitoCod,
  INGuiaOptions,
  BuscarClientesMod,
  IRpReparto,
  IMovDespaPielDt1,
  MovDespaPielDt1,
  IMovDespaPielDt2,
  MovDespaPielDt2,
  IMovDespaPielGuia,
  MovDespaPielGuia,
  ICodigoPielDespa,
  IMovDespaPiel,
} from '@/remote/api/reparto/types';
import IPagination from '@/types/IPagination';
import IQuery from '@/types/query';

export default class RepartoAPI extends HttpClient {
  public authToken: string;

  //  ####### SubRepato ######################

  public subReparto = {
    getCodigoAnimal: (nGuia: number, codigoIndiv: number) =>
      this.instance.get<
        BaseResponse<
          Array<{
            nGuia: number;
            nReparto: number;
            codigoIndiv: number;
          }>
        >
      >(`/reparto/sub/getCodigoAnimal/${nGuia}/${codigoIndiv}`),
    getCodigoPiel: (params?: IPagination) =>
      this.instance.get<BaseResponse<ICodigoPiel[]>>(
        '/reparto/sub/getCodPielOptions',
        { params },
      ),
    getCodigoPielFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<ICodigoPiel[]>>(
        '/reparto/sub/searchCodPiel',
        { params },
      ),
    getCodigoVendedor: (params?: IPagination) =>
      this.instance.get<BaseResponse<ICodigoVendedor[]>>(
        '/reparto/sub/getCodVendedorOptions',
        { params },
      ),
    getCodigoVendedorFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<ICodigoVendedor[]>>(
        '/reparto/sub/searchCodVendedor',
        { params },
      ),
    getMesa: (params?: IPagination) =>
      this.instance.get<BaseResponse<IMesa[]>>('/reparto/sub/getMesaOptions', {
        params,
      }),
    getMesaFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<IMesa[]>>('/reparto/sub/searchMesa', {
        params,
      }),
    getSexo: (params?: IPagination) =>
      this.instance.get<BaseResponse<ISexo[]>>('/reparto/sub/getSexoOptions', {
        params,
      }),
    getSubReparto: (nReparto: ISubReparto['nReparto'], params?: IPagination) =>
      this.instance.get<BaseResponse<SubReparto>>(`/reparto/sub/${nReparto}`, {
        params,
      }),
    getSubRepatConst: (params?: IPagination) =>
      this.instance.get<BaseResponse<SubReparto>>('/reparto/sub', { params }),
    getTransport: (params?: IPagination) =>
      this.instance.get<BaseResponse<ITransport[]>>(
        '/reparto/sub/getTransportOptions',
        { params },
      ),
    getTransportFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<ITransport[]>>(
        '/reparto/sub/searchTransport',
        { params },
      ),
    postSubReparto: (data: ISubReparto) =>
      this.instance.post<BaseResponse>('/reparto/sub', data),
    putSubReparto: (
      data: ISubReparto,
      nReparto: ISubReparto['nReparto'],
      codigoIndiv: ISubReparto['codigoIndiv'],
    ) =>
      this.instance.put<BaseResponse>(
        `/reparto/sub/${nReparto}/${codigoIndiv}`,
        data,
      ),

    getReparCliente: (nGuia: number, codigoIndiv: number) =>
      this.instance.get<
        BaseResponse<{
          nGuia: number;
          nitTercero: string;
          codigoIndiv: number;
          esRecepGanado: number;
          codTerc: string;
          sexo: number;
        }>
      >(`/reparto/sub/getRepartoCliente/${nGuia}/${codigoIndiv}`),
  };

  // ##### SubRepartoHist
  public subRepartoHist = {
    getCodigoPiel: (params: IPagination) =>
      this.instance.get<BaseResponse<ICodigoPiel[]>>(
        '/reparto/subht/getCodPielOptions',
        { params },
      ),
    getCodigoPielFind: (params: IQuery) =>
      this.instance.get<BaseResponse<ICodigoPiel[]>>(
        '/reparto/subht/searchCodPiel',
        { params },
      ),
    getCodigoVendedor: (params: IPagination) =>
      this.instance.get<BaseResponse<ICodigoVendedor[]>>(
        '/reparto/subht/getCodVendedorOptions',
        { params },
      ),
    getCodigoVendedorFind: (params: IQuery) =>
      this.instance.get<BaseResponse<ICodigoVendedor[]>>(
        '/reparto/subht/searchCodVendedor',
        { params },
      ),
    getMesa: (params: IPagination) =>
      this.instance.get<BaseResponse<IMesa[]>>(
        '/reparto/subht/getMesaOptions',
        {
          params,
        },
      ),
    getMesaFind: (params: IQuery) =>
      this.instance.get<BaseResponse<IMesa[]>>('/reparto/subht/searchMesa', {
        params,
      }),
    getSubRepartoHt: (
      nReparto: ISubRepartoHt['nReparto'],
      params?: IPagination,
    ) =>
      this.instance.get<BaseResponse<ISubRepartoHt[]>>(
        `/reparto/subht/${nReparto}`,
        { params },
      ),
  };

  public subRepartoImp = {
    getCodigoAnimal: (nGuia: number, codigoIndiv: number) =>
      this.instance.get<
        BaseResponse<
          Array<{
            nGuia: number;
            nReparto: number;
            codigoIndiv: number;
          }>
        >
      >(`/reparto/subimp/getCodigoAnimal/${nGuia}/${codigoIndiv}`),
    getCodigoPiel: (params?: IPagination) =>
      this.instance.get<BaseResponse<ICodigoPiel[]>>(
        '/reparto/subimp/getCodPielOptions',
        { params },
      ),
    getCodigoPielFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<ICodigoPiel[]>>(
        '/reparto/subimp/searchCodPiel',
        { params },
      ),
    getCodigoVendedor: (params?: IPagination) =>
      this.instance.get<BaseResponse<ICodigoVendedor[]>>(
        '/reparto/subimp/getCodVendedorOptions',
        { params },
      ),
    getCodigoVendedorFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<ICodigoVendedor[]>>(
        '/reparto/subimp/searchCodVendedor',
        { params },
      ),
    getSubRepartoImp: (
      nReparto: ISubRepartoImp['nReparto'],
      params?: IPagination,
    ) =>
      this.instance.get<BaseResponse<SubRepartoImp>>(
        `/reparto/subimp/${nReparto}`,
        { params },
      ),
    postSubImp: (data: ISubRepartoImp) =>
      this.instance.post<BaseResponse>('/reparto/subimp', data),
    putSubRepartoImp: (
      nReparto: ISubRepartoImp['nReparto'],
      codigoIndiv: ISubRepartoImp['codigoIndiv'],
      data: ISubRepartoImp,
    ) =>
      this.instance.put<BaseResponse>(
        `/reparto/subimp/${nReparto}/${codigoIndiv}`,
        data,
      ),
  };

  public tercMesas = {
    getCiudades: (params?: IPagination) =>
      this.instance.get<BaseResponse<ICiudades[]>>(
        '/reparto/tercmesas/getCiudadOptions',
        { params },
      ),
    getCiudadesFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<ICiudades[]>>(
        '/reparto/tercmesas/getCiudadOptionsByText',
        { params },
      ),
    getTercMesa: (params?: IPagination) =>
      this.instance.get<BaseResponse<TercMesa>>('/reparto/tercmesas/', {
        params,
      }),
    postTercMes: (data: ITercMesa) =>
      this.instance.post<BaseResponse>('/reparto/tercmesas', data),
    putTercMesa: (id: ITercMesa['mesas'], data: ITercMesa) =>
      this.instance.put<BaseResponse>(`/reparto/tercmesas/${id}`, data),
  };

  // #######TercTransport
  public tercTransport = {
    getTercTransport: (params?: IPagination) =>
      this.instance.get<BaseResponse<TercTransport>>('/reparto/terctranspor', {
        params,
      }),
    postTransport: (data: ITercTransport) =>
      this.instance.post<BaseResponse>('/reparto/terctranspor', data),
    puTercTransport: (
      data: ITercTransport,
      id: ITercTransport['idTransport'],
    ) => this.instance.put<BaseResponse>(`/reparto/terctranspor/${id}`, data),
  };

  // ############ TercCliente
  public tercCliente = {
    getClientes: (params?: IPagination) =>
      this.instance.get<BaseResponse<IClientes[]>>(
        '/reparto/terccliente/getClienteOptions',
        { params },
      ),
    getClientesFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<IClientes[]>>(
        '/reparto/terccliente/searchCliente',
        { params },
      ),
    getTercClientes: (params?: IPagination) =>
      this.instance.get<BaseResponse<TercClientes>>('/reparto/terccliente', {
        params,
      }),
    postTercCliente: (
      data: ITercClientes,
      codTerc: ITercClientes['codTerc'],
      codCliente: ITercClientes['codCliente'],
    ) =>
      this.instance.post<BaseResponse>(
        `/reparto/terccliente/${codTerc}/${codCliente}`,
        data,
      ),
    putTercCliente: (
      data: ITercClientes,
      codTerc: ITercClientes['codTerc'],
      codCliente: ITercClientes['codCliente'],
    ) =>
      this.instance.put<BaseResponse>(
        `/reparto/terccliente/${codTerc}/${codCliente}`,
        data,
      ),
  };
  // ############  TercPieles ##############
  public tercPieles = {
    getProveedores: (params?: IPagination) =>
      this.instance.get<BaseResponse<IProveedor[]>>(
        '/reparto/tercpieles/getProveedorOptions',
        { params },
      ),
    getProveedoresFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<IProveedor[]>>(
        '/reparto/tercpieles/searchProveedor',
        { params },
      ),
    getTercPieles: (params?: IPagination) =>
      this.instance.get<BaseResponse<TercPieles>>('/reparto/tercpieles', {
        params,
      }),
    postTercPieles: (data: ITercPieles) =>
      this.instance.post<BaseResponse>('/reparto/tercpieles', data),
    putTercPieles: (data: ITercPieles, id: ITercPieles['codPieles']) =>
      this.instance.put<BaseResponse>(`/reparto/tercpieles/${id}`, data),
  };

  public RepartoReports = {
    reparto: (nReparto: number) =>
      this.instance.get<BaseResponse<string>>(
        `/reparto/informes/reparto/${nReparto}/pdf`,
      ),
  };

  public RepartoMovCons = {
    afterUpdateBusClient: (nReparto: number) =>
      this.instance.get<BaseResponse<IRpReparto>>(
        `/reparto/movcons/afterUpdateBusClient/${nReparto}`,
      ),
    getBusClientOptions: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<{ nReparto: number; expr1: string; fechaMov: string }>
        >
      >('/reparto/movcons/busClient', { params }),
    getBusClientOptionsByQuery: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<{ nReparto: number; expr1: string; fechaMov: string }>
        >
      >('/reparto/movcons/busClientByText', { params }),
  };

  public RepartoMov = {
    getNGuiaOptions: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<{
            nGuia: number;
            tercero: string;
            fechaPes: string;
            nLote: number;
            nitTercero: string;
            noAnimales: number;
            lIca: number;
            anulada: boolean;
          }>
        >
      >('/reparto/mov/getNGuiaOptions', { params }),
    getTipoMovOptions: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<{
            idMovimiento: number;
            expr1: string;
          }>
        >
      >('/reparto/mov/getTipoMovOptions', { params }),
  };

  // ############# MOVREPARTOHIST #############
  public movRepartoHist = {
    getAfterBuscarCliente: (id: IRpReparto['nReparto']) =>
      this.instance.get<BaseResponse<IRpReparto>>(
        `/reparto/movhist/afterUpdateBusClient/${id}`,
      ),
    getBuscarClientes: (params?: IPagination) =>
      this.instance.get<BaseResponse<BuscarClientesHist>>(
        '/reparto/movhist/busClient',
        { params },
      ),
    getBuscarClientesFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<BuscarClientesHist>>(
        '/reparto/movhist/busClientByText',
        { params },
      ),
  };

  // ############## MovReparto ################
  public repartoMov = {
    getCountAnim: (nGuia: IRpReparto['nGuia']) =>
      this.instance.get<BaseResponse<number>>(
        `/reparto/mov/getCountOfAnimals/${nGuia}`,
      ),
    getCountOfNotUpdatedRecords: (nReparto: number) =>
      this.instance.get<BaseResponse<number>>(
        `/reparto/mov/getCountOfNotUpdatedRecords/${nReparto}`,
      ),
    getNGuiaOptions: (params?: IPagination) =>
      this.instance.get<BaseResponse<INGuiaOptions[]>>(
        '/reparto/mov/getNGuiaOptions',
        { params },
      ),
    getNGuiaOptionsFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<INGuiaOptions[]>>(
        '/reparto/mov/searchNGuia',
        { params },
      ),
    getNitoCodOptions: (params?: IPagination) =>
      this.instance.get<BaseResponse<INitoCod[]>>(
        '/reparto/mov/getNitoCCodOptions',
        { params },
      ),
    getNitoCodOptionsFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<INitoCod[]>>(
        '/reparto/mov/searchNitoCCod',
        { params },
      ),
    getOnExitTipoMov: (tipoMov: IRpReparto['tipoMov']) =>
      this.instance.get<BaseResponse<{ nReparto: number; prefijo: string }>>(
        `/reparto/mov/onExitTipoMov/${tipoMov}`,
      ),
    getTipoMovOptions: (params?: IPagination) =>
      this.instance.get<BaseResponse<ITipoMoviento[]>>(
        '/reparto/mov/getTipoMovOptions',
        { params },
      ),
    postMovReparto: (data: IRpReparto) =>
      this.instance.post<BaseResponse>('/reparto/mov', data),
    putMovReparto: (data: IRpReparto, id: IRpReparto['nReparto']) =>
      this.instance.put<BaseResponse>(`/reparto/mov/${id}`, data),
    putOnAfterUpdateForm: (
      nReparto: IRpReparto['nReparto'],
      nGuia: IRpReparto['nGuia'],
    ) =>
      this.instance.put<BaseResponse>(
        `/reparto/mov/onAfterUpdateForm/${nReparto}/${nGuia}`,
      ),

    deleteMovReparto: (id: IRpReparto['nReparto']) =>
      this.instance.delete<BaseResponse>(`/reparto/mov/${id}`),
  };

  // ############### MovDespaPiel #############
  public movDepaPiel = {
    deleteMovDespaPiel: (id: IMovDespaPiel['idNDespacho']) =>
      this.instance.delete<BaseResponse>(`/reparto/movDespaPiel/${id}`),
    getAfterCliPiel: (codPiel: IMovDespaPiel['codPiel']) =>
      this.instance.get(
        `/reparto/movDespaPiel/onAfterUpdateCodPiel/${codPiel}`,
      ),
    getAfterConcuctores: (nitConduc: IMovDespaPiel['ccConduct']) =>
      this.instance.get<BaseResponse<string>>(
        `/reparto/movDespaPiel/onAfterUpdateConductor/${nitConduc}`,
      ),
    getAfterTipoMov: (tipoMov: number) =>
      this.instance.get<BaseResponse<number>>(
        `/reparto/movDespaPiel/onAfterUpdateTipoMov/${tipoMov}`,
      ),
    getCiudad: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<{
            idCiudad: string;
            descripcionCiu: string;
            departamento: string;
          }>
        >
      >('/reparto/movDespaPiel/getCiudadOptions', { params }),
    getCodigoPiel: (params?: IPagination) =>
      this.instance.get<BaseResponse<ICodigoPielDespa[]>>(
        '/reparto/movDespaPiel/getCodPielOptions',
        { params },
      ),
    getPaises: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<Array<{ idPais: number; descripcionPais: string }>>
      >('/reparto/movDespaPiel/getPaisOptions', { params }),
    getTipoMovOptions: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<{
            idMovimiento: number;
            expr1: string;
          }>
        >
      >('/reparto/movDespaPiel/getTipoMovOptions', { params }),
    getcConductores: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<Array<{ nitConduc: string; nombreCond: string }>>
      >('/reparto/movDespaPiel/getConductorOptions', { params }),
    postMovDespaPiel: (data: IMovDespaPiel) =>
      this.instance.post<BaseResponse>('/reparto/movDespaPiel', data),
  };
  // ############## MovDespaPielGuia ##########
  public movDespaPielGuia = {
    getMovDespaPielGuia: (
      idNDespacho: IMovDespaPielGuia['idNDespacho'],
      params?: IPagination,
    ) =>
      this.instance.get<BaseResponse<MovDespaPielGuia>>(
        `/reparto/movDespaPielGuia/${idNDespacho}`,
        { params },
      ),
    getNGuiaOptions: (params?: IPagination) =>
      this.instance.get<BaseResponse<INGuiaOptions[]>>(
        '/reparto/movDespaPielGuia/getNGuiaOptions',
        { params },
      ),
    getNGuiaOptionsFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<INGuiaOptions[]>>(
        '/reparto/movDespaPielGuia/searchNGuia',
        { params },
      ),
    postMovDespaPielGuia: (data: IMovDespaPielGuia) =>
      this.instance.post<BaseResponse>('/reparto/movDespaPielGuia', data),
    putMovDespaPielGuia: (
      data: IMovDespaPielGuia,
      idNDespacho: IMovDespaPielGuia['idNDespacho'],
      auton: IMovDespaPielGuia['auton'],
    ) =>
      this.instance.put<BaseResponse>(
        `/reparto/movDespaPielGuia/${idNDespacho}/${auton}`,
        data,
      ),
  };

  // ############### MOVDESPAPielDt2 ##########

  public movDespaPielDt2 = {
    getCodigoPiel: (params?: IPagination) =>
      this.instance.get<BaseResponse<ICodigoPiel[]>>(
        '/reparto/movDespaPielDt2/getCodPielOptions',
        { params },
      ),
    getCodigoPielFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<ICodigoPiel[]>>(
        '/reparto/movDespaPielDt2/searchCodPiel',
        { params },
      ),
    getMovDespaPielDt2: (
      idNDespacho: IMovDespaPielDt2['idNDespacho'],
      params?: IPagination,
    ) =>
      this.instance.get<BaseResponse<MovDespaPielDt2>>(
        `/reparto/movDespaPielDt2/${idNDespacho}`,
        { params },
      ),
    postMovDespaPielDt2: (data: IMovDespaPielDt2) =>
      this.instance.post('/reparto/movDespaPielDt2', data),
    putMovDespaPielDt2: (
      idNDespacho: IMovDespaPielDt2['idNDespacho'],
      auton: IMovDespaPielDt2['auton'],
      data: IMovDespaPielDt2,
    ) =>
      this.instance.put<BaseResponse>(
        `/reparto/movDespaPielDt2/${idNDespacho}/${auton}`,
        data,
      ),
  };

  // ################ MovDespaPielDt1 ########

  public movDespaPielDt1 = {
    getMovDespaPielDt1: (
      idNDespacho: IMovDespaPielDt1['idNDespacho'],
      params?: IPagination,
    ) =>
      this.instance.get<BaseResponse<MovDespaPielDt1>>(
        `/reparto/movDespaPielDt1/${idNDespacho}`,
        { params },
      ),
    postMovDespaPielDt1: (data: IMovDespaPielDt1) =>
      this.instance.post<BaseResponse>('/reparto/movDespaPielDt1', data),
    putMovDespaPielDt1: (
      data: IMovDespaPielDt1,
      idNDespacho: IMovDespaPielDt1['idNDespacho'],
      auton: IMovDespaPielDt1['auton'],
    ) =>
      this.instance.put<BaseResponse>(
        `/reparto/movDespaPielDt1/${idNDespacho}/${auton}`,
        data,
      ),
  };

  // ############# MovRepartoMod ##############
  public movRepartoMod = {
    getAfterBuscarCliente: (id: IRpReparto['nReparto']) =>
      this.instance.get<BaseResponse<IRpReparto>>(
        `/reparto/movmod/afterUpdateBusClient/${id}`,
      ),
    getBuscarClientes: (params?: IPagination) =>
      this.instance.get<BaseResponse<BuscarClientesMod>>(
        '/reparto/movmod/busClient',
        { params },
      ),
    getBuscarClientesFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<BuscarClientesMod>>(
        '/reparto/movmod/busClientByText',
        { params },
      ),
    getCountAnim: (nGuia: IRpReparto['nGuia']) =>
      this.instance.get<BaseResponse<number>>(
        `/reparto/mov/getCountOfAnimals/${nGuia}`,
      ),
    putMovRepartoMod: (data: IRpReparto, id: IRpReparto['nReparto']) =>
      this.instance.put<BaseResponse>(`/reparto/mov/${id}`, data),
  };

  // ############### Conductores ##############
  public conductores = {
    deleteConductores: ({ nitConduc }: Pick<IConductores, 'nitConduc'>) =>
      this.instance.delete(`/reparto/conductores/${nitConduc}`),
    postAfterNitConduc: ({ nitConduc }: Pick<IConductores, 'nitConduc'>) =>
      this.instance.post(
        `/reparto/conductores/afterUpdateNitConduc/${nitConduc}`,
      ),
    postConductores: (data: IConductores) =>
      this.instance.post<BaseResponse>('/reparto/conductores', data),
    putConductores: (
      data: IConductores,
      nitConduc: IConductores['nitConduc'],
    ) => this.instance.put(`/reparto/conductores/${nitConduc}`, data),
  };

  public conductoresMod = {
    getAfterBuscarClienteConductore: (nitConduc: IConductores['nitConduc']) =>
      this.instance.get<BaseResponse<IConductores>>(
        `/reparto/conductoresmod/afterUpdateBusClient/${nitConduc}`,
      ),
    getBuscarClienteConductores: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>>
      >('/reparto/conductoresmod/busClient', { params }),
  };

  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getTConfInv1 = () => this.instance.get('/reparto/config/');
  public putTConfInv1 = (data: any) =>
    this.instance.put('/reparto/config/', data);
  public getMenu1 = () => this.instance.get('/reparto/menu/getTMenu1');
  public getMenu2 = (tipo: number) =>
    this.instance.get(`/reparto/menu/getTMenu1WithTipo2/${tipo}`);

  public getCambFech = () =>
    this.instance.get<BaseResponse<ICambFech[]>>('/despachocajas/cambFech/');
  public getCamFechIdAuto = (idAuto: ICambFech['idAuto']) =>
    this.instance.get<BaseResponse<ICambFech>>(
      `/despachocajas/cambFech/${idAuto}`,
    );
  public putCamFech = (data: ICambFech) =>
    this.instance.put<BaseResponse>(
      `/despachocajas/cambFech/${data.idAuto}`,
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
