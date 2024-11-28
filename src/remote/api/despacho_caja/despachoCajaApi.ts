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
  IConcepto,
  IDcCajasCjImp,
  IEtiquetaC,
  IPedidos,
  ITblDCjDespacCajaDet,
  ITransportad,
  TblDCjDespacCajaDet,
  TblDCjDespacCajaDet4,
  ITblDCjDespacCajaDet3,
  TblDCjDespacCajaDet3,
  IConductores,
  TblDcjSubPrxCj,
  TblDcjSubPrxDp,
  IPaises,
  ICiudades,
  ITransportador,
  ITerceros,
  IBuscarClientesDCCj,
  ITblDCjDespacCaja,
  ITblDCjDespacCajaDet4,
  IIdPedidoControlVeh,
} from '@/remote/api/despacho_caja/types';
import IPagination from '@/types/IPagination';
import { ITblDCjControlVdPed } from './types/ITblDCjControlVdPed';
import { IFriDCjControlVMd3 } from './types/IFriDCjControlVMd3';
import { ITblDCjControlV } from './types/ITblDCjControlV';
import IQuery from '@/types/query';

export default class DespachoCajaApi extends HttpClient {
  public authToken: string;

  // DCCajasCj
  public dCCajasCj = {
    getAfterBuscarCliente: (consecTip: ITblDCjDespacCaja['consecTip']) =>
      this.instance.get<BaseResponse<ITblDCjDespacCaja>>(
        `/despachocajas/dcajas/onAfterUpdateBusClient/${consecTip}`,
      ),
    getBuscarClientes: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<Pick<IBuscarClientesDCCj, 'consecTip' | 'fechaMov' | 'tercero'>>
        >
      >('/despachocajas/dcajas/busClient', { params }),
    getBuscarClientesFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<Pick<IBuscarClientesDCCj, 'consecTip' | 'fechaMov' | 'tercero'>>
        >
      >('/despachocajas/dcajas/busClientByText', { params }),
    getMaxConsecTip: () =>
      this.instance.get<BaseResponse<number>>(
        '/despachocajas/dcajas/getMaxConsecTip',
      ),

    postDCCajasCj: (data: ITblDCjDespacCaja) =>
      this.instance.post<BaseResponse>('/despachocajas/dcajas/', data),

    putDCCajasCj: (
      data: ITblDCjDespacCaja,
      consecTip: ITblDCjDespacCaja['consecTip'],
    ) =>
      this.instance.put<BaseResponse>(
        `/despachocajas/dcajas/${consecTip}`,
        data,
      ),
  };

  public dCCajasCjSelects = {
    afterConductores: (cCConduct: IConductores['nitConduc']) =>
      this.instance.get(
        `/despachocajas/dcajas/onAfterUpdateConductor/${cCConduct}`,
      ),
    afterTransportador: (idTransporta: ITransportador['idTransporta']) =>
      this.instance.get<BaseResponse>(
        `/despachocajas/dcajas/onAfterUpdateTransportador/${idTransporta}`,
      ),
    getCiudades: (params?: IPagination) =>
      this.instance.get<BaseResponse<ICiudades[]>>(
        '/despachocajas/dcajas/ciudades',
        { params },
      ),
    getCiudadesFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<ICiudades[]>>(
        '/despachocajas/dcajas/ciudadesByText',
        { params },
      ),
    getConductores: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<
            Pick<IConductores, 'nitConduc' | 'nombreCond'> & { expr1: string }
          >
        >
      >('/despachocajas/dcajas/conductores', { params }),
    getConductoresFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<
            Pick<IConductores, 'nitConduc' | 'nombreCond'> & { expr1: string }
          >
        >
      >('/despachocajas/dcajas/conductoresByText', { params }),
    getPaises: (params?: IPagination) =>
      this.instance.get<BaseResponse<IPaises[]>>(
        '/despachocajas/dcajas/paises',
        { params },
      ),
    getPaisesFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<IPaises[]>>(
        '/despachocajas/dcajas/paisesByText',
        { params },
      ),
    getTransportador: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<Pick<ITransportador, 'idTransporta' | 'desctransport'>>
        >
      >('/despachocajas/dcajas/transportadores', { params }),
    getTransportadorFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<Pick<ITransportador, 'idTransporta' | 'desctransport'>>
        >
      >('/despachocajas/dcajas/transportadoresByText', { params }),
    getTreceros: (params?: IPagination) =>
      this.instance.get<BaseResponse<ITerceros[]>>(
        '/despachocajas/dcajas/terceros',
        { params },
      ),
    getTrecerosFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<ITerceros[]>>(
        '/despachocajas/dcajas/tercerosByText',
        { params },
      ),
  };

  // DCCajasCjCs
  public dCCajasCjCs = {
    getAfterBuscarCliente: (consecTip: ITblDCjDespacCaja['consecTip']) =>
      this.instance.get<BaseResponse<ITblDCjDespacCaja>>(
        `/despachocajas/consulta/${consecTip}`,
      ),
    getBuscarClientes: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<Pick<IBuscarClientesDCCj, 'consecTip' | 'fechaMov' | 'tercero'>>
        >
      >('/despachocajas/consulta/busClient', { params }),
    getBuscarClientesFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<Pick<IBuscarClientesDCCj, 'consecTip' | 'fechaMov' | 'tercero'>>
        >
      >('/despachocajas/consulta/busClientByText', { params }),
  };
  public dCCajasCjCsSelects = {
    getCiudades: (params?: IPagination) =>
      this.instance.get<BaseResponse<ICiudades[]>>(
        '/despachocajas/consulta/ciudades',
        { params },
      ),
    getCiudadesFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<ICiudades[]>>(
        '/despachocajas/consulta/ciudadesByText',
        { params },
      ),
    getConductores: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<
            Pick<IConductores, 'nitConduc' | 'nombreCond'> & { expr1: string }
          >
        >
      >('/despachocajas/dcajas/conductores', { params }),
    getConductoresFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<
            Pick<IConductores, 'nitConduc' | 'nombreCond'> & { expr1: string }
          >
        >
      >('/despachocajas/dcajas/conductoresByText', { params }),
    getPaises: (params?: IPagination) =>
      this.instance.get<BaseResponse<IPaises[]>>(
        '/despachocajas/consulta/paises',
        { params },
      ),
    getPaisesFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<IPaises[]>>(
        '/despachocajas/consulta/paisesByText',
        { params },
      ),
    getTransportador: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<Pick<ITransportador, 'idTransporta' | 'desctransport'>>
        >
      >('/despachocajas/consulta/transportadores', { params }),
    getTransportadorFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<Pick<ITransportador, 'idTransporta' | 'desctransport'>>
        >
      >('/despachocajas/consulta/transportadoresByText', { params }),
    getTreceros: (params?: IPagination) =>
      this.instance.get<BaseResponse<ITerceros[]>>(
        '/despachocajas/consulta/terceros',
        { params },
      ),
    getTrecerosFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<ITerceros[]>>(
        '/despachocajas/consulta/tercerosByText',
        { params },
      ),
  };

  // DCCajaCjDet
  public dCCajasDet = {
    get: (consecTip: ITblDCjDespacCajaDet['consecTip'], params?: IPagination) =>
      this.instance.get<BaseResponse<TblDCjDespacCajaDet>>(
        `/despachocajas/detalles/det1/${consecTip}`,
        { params },
      ),

    post: (data: ITblDCjDespacCajaDet) =>
      this.instance.post<BaseResponse<object>>(
        '/despachocajas/detalles/det1',
        data,
      ),

    put: (
      consecTip: ITblDCjDespacCajaDet['consecTip'],
      autoNum: ITblDCjDespacCajaDet['autoNum'],
      data: ITblDCjDespacCajaDet,
    ) =>
      this.instance.put<BaseResponse<object>>(
        `/despachocajas/detalles/det1/${consecTip}/${autoNum}`,
        data,
      ),

    afterEtiquetaC: (etiquetaC: ITblDCjDespacCajaDet['etiquetaC']) =>
      this.instance.get<BaseResponse<IEtiquetaC>>(
        `/despachocajas/detalles/det1//afterUpdateEtiquetaC/${etiquetaC}`,
      ),
  };

  // DCCajaCjDet4
  public dCCajaCjDet4 = {
    get: (params?: IPagination) =>
      this.instance.get<BaseResponse<TblDCjDespacCajaDet4>>(
        '/despachocajas/detalles/det4',
        { params },
      ),
  };

  // DCCajaCjDet3
  public dCCajaCjDet3 = {
    get: (
      consecTip: ITblDCjDespacCajaDet3['consecTip'],
      params?: IPagination,
    ) =>
      this.instance.get<BaseResponse<TblDCjDespacCajaDet3>>(
        `/despachocajas/detalles/det3/${consecTip}`,
        { params },
      ),
    post: (data: ITblDCjDespacCajaDet3) =>
      this.instance.post<BaseResponse<ITblDCjDespacCajaDet3>>(
        '/despachocajas/detalles/det3',
        data,
      ),

    put: (
      consecTip: ITblDCjDespacCajaDet3['consecTip'],
      autoNum: ITblDCjDespacCajaDet3['autoNum'],
      data: ITblDCjDespacCajaDet3,
    ) =>
      this.instance.put<BaseResponse<ITblDCjDespacCajaDet3>>(
        `/despachocajas/detalles/det3/${consecTip}/${autoNum}`,
        data,
      ),
  };

  public ControlVeh = {
    getDetallesPedido: (idPesaje: number, params?: IPagination) =>
      this.instance.get<BaseResponse<ITblDCjControlVdPed[]>>(
        `/despachocajas/controlvehdped/${idPesaje}`,
        { params },
      ),
    getIdPedidos: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<{
            idAuton: number;
            pedido: number;
            prefijoPed: string;
            usuario: string;
            codigo: string;
            sucursal: string;
            fechaDoc: string;
          }>
        >
      >(`/despachocajas/controlvehdped/idPedido`, { params }),
    getIdPedidosFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<{
            idAuton: number;
            pedido: number;
            prefijoPed: string;
            usuario: string;
            codigo: string;
            sucursal: string;
            fechaDoc: string;
          }>
        >
      >(`/despachocajas/controlvehdped/idPedidoByText`, { params }),
  };

  public ControlVehGenF = {
    getConductores: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<Array<{ nitConduc: string; nombreCond: string }>>
      >(`/despachocajas/controlveh/conductores`, { params }),
    getConductoresFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<Array<{ nitConduc: string; nombreCond: string }>>
      >(`/despachocajas/controlveh/conductoresByText`, { params }),
    getFindIdPesajeData: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<{
            idPesaje: number;
            placaVeh: string;
            fechaPes: string;
            nombreCond: string;
            procesado: boolean;
            anulado: boolean;
          }>
        >
      >(`/despachocajas/controlvehgenf/findIdPesaje`, { params }),
    getFindIdPesajeDataFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<{
            idPesaje: number;
            placaVeh: string;
            fechaPes: string;
            nombreCond: string;
            procesado: boolean;
            anulado: boolean;
          }>
        >
      >(`/despachocajas/controlvehgenf/findIdPesajeByText`, { params }),
    getFormData: (idPesaje: number) =>
      this.instance.get<BaseResponse<IFriDCjControlVMd3>>(
        `/despachocajas/controlvehgenf/${idPesaje}`,
      ),
    getTiposVehiculos: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<{
            idTipo: number;
            descripTipo: string;
            capacidadKil: number;
          }>
        >
      >(`/despachocajas/controlveh/tipoVehic`, { params }),
    getTiposVehiculosFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<{
            idTipo: number;
            descripTipo: string;
            capacidadKil: number;
          }>
        >
      >(`/despachocajas/controlveh/tipoVehicByText`, { params }),
  };

  // DCControlVehDPED
  public dCControlVehPed = {
    get: (idPesaje: ITblDCjControlVdPed['idPesaje'], params?: IPagination) =>
      this.instance.get<BaseResponse<ITblDCjControlVdPed[]>>(
        `/despachocajas/controlvehdped/${idPesaje}`,
        { params },
      ),
    getIdPedido: (params?: IPagination) =>
      this.instance.get<BaseResponse<IIdPedidoControlVeh[]>>(
        '/despachocajas/controlvehdped/idPedido',
        { params },
      ),
    getIdPedidosFind: (params?: IQuery) =>
      this.instance.get<BaseResponse<IIdPedidoControlVeh[]>>(
        '/despachocajas/controlvehdped/idPedidoByText',
        { params },
      ),
    post: (data: ITblDCjControlVdPed) =>
      this.instance.post<BaseResponse<ITblDCjControlVdPed>>(
        '/despachocajas/controlvehdped',
        data,
      ),
    put: (
      data: ITblDCjControlVdPed,
      idPesaje: ITblDCjControlVdPed['idPesaje'],
      idPedido: ITblDCjControlVdPed['idPedido'],
    ) =>
      this.instance.put<BaseResponse>(
        `/despachocajas/controlvehdped/${idPesaje}/${idPedido}`,
        data,
      ),
  };

  public ControlVehPdd = {
    gedIdPesajes: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<{
            idPesaje: any;
            placaVeh: any;
            fechaPes: any;
            nombreCond: any;
            procesado: any;
            anulado: any;
          }>
        >
      >(`/despachocajas/controlvehpdd/findIdPesaje`, { params }),
    gedIdPesajesFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<{
            idPesaje: any;
            placaVeh: any;
            fechaPes: any;
            nombreCond: any;
            procesado: any;
            anulado: any;
          }>
        >
      >(`/despachocajas/controlvehpdd/findIdPesajeByText`, { params }),
    getData: (idPesaje: number) =>
      this.instance.get<BaseResponse<ITblDCjControlV>>(
        `/despachocajas/controlvehpdd/${idPesaje}`,
      ),
    post: (data: ITblDCjControlV) =>
      this.instance.post<BaseResponse<ITblDCjControlV>>(
        `/despachocajas/controlvehpdd/`,
        data,
      ),
    put: (idPesaje: number, data: Partial<ITblDCjControlV>) =>
      this.instance.put<BaseResponse<ITblDCjControlV>>(
        `/despachocajas/controlvehpdd/${idPesaje}`,
        data,
      ),
  };

  public DCControlVeh = {
    afterUpdateNitConduc: (nitConduc: string) =>
      this.instance.get<BaseResponse>(
        `/despachocajas/controlveh/onAfterUpdateConductor/${nitConduc}`,
      ),
    getBase64PdfReport: (idPesaje: number) =>
      this.instance.get<BaseResponse<string>>(
        `/despachocajas/informes/controlveh/${idPesaje}/pdf`,
      ),
    getConductores: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<Array<{ nitConduc: string; nombreCond: string }>>
      >(`/despachocajas/controlveh/conductores`, { params }),
    getFindIdPesajeData: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<{
            idPesaje: number;
            placaVeh: string;
            fechaPes: string;
            nombreCond: string;
            procesado: boolean;
            anulado: boolean;
          }>
        >
      >(`/despachocajas/controlveh/findId`, { params }),
    getFindIdPesajeDataFind: (params?: IQuery) =>
      this.instance.get<
        BaseResponse<
          Array<{
            idPesaje: number;
            placaVeh: string;
            fechaPes: string;
            nombreCond: string;
            procesado: boolean;
            anulado: boolean;
          }>
        >
      >(`/despachocajas/controlveh/findIdByText`, { params }),
    getFormData: (idPesaje: number) =>
      this.instance.get<BaseResponse<ITblDCjControlV>>(
        `/despachocajas/controlveh/${idPesaje}`,
      ),
    getMaxIdPesaje: () =>
      this.instance.get<BaseResponse<number>>(
        `/despachocajas/controlveh/getMaxIdPesaje`,
      ),
    getTiposVehiculos: (params?: IPagination) =>
      this.instance.get<
        BaseResponse<
          Array<{ idTipo: number; descripTipo: string; capacidadKil: number }>
        >
      >(`/despachocajas/controlveh/tipoVehic`, { params }),
    post: (data: ITblDCjControlV) =>
      this.instance.post<BaseResponse<ITblDCjControlV>>(
        `/despachocajas/controlveh`,
        data,
      ),
    put: (idPesaje: number, data: Partial<ITblDCjControlV>) =>
      this.instance.put<BaseResponse<ITblDCjControlV>>(
        `/despachocajas/controlveh/${idPesaje}`,
        data,
      ),
  };

  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getTConfInv1 = () => this.instance.get('/despachocajas/config/');
  public putTConfInv1 = (data: any) =>
    this.instance.put('/despachocajas/config/', data);
  public getMenu1 = () => this.instance.get('/despachocajas/menu/getTMenu1');
  public getMenu2 = (tipo: number) =>
    this.instance.get(`/despachocajas/menu/getTMenu1WithTipo2/${tipo}`);

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

  // Conductores
  public getBuscarClienteConductores = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>>
    >('/despachocajas/conductoresmod/busClient', { params });
  public getBuscarClienteConductoresFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>>
    >('/despachocajas/conductoresmod/busClientByText', { params });
  public getAfterBuscarClienteConductore = (
    nitConduc: IConductores['nitConduc'],
  ) =>
    this.instance.get<BaseResponse<IConductores>>(
      `/despachocajas/conductoresmod/afterUpdateBusClient/${nitConduc}`,
    );
  public postAfterUpdateConductores = ({
    nitConduc,
  }: Pick<IConductores, 'nitConduc'>) =>
    this.instance.post<BaseResponse<IConductores>>(
      `/despachocajas/conductores/afterUpdateNitConduc/${nitConduc}`,
    );
  public postConductores = (data: IConductores) =>
    this.instance.post<BaseResponse>('/despachocajas/conductores', data);
  public putConductores = (
    data: IConductores,
    nitConduc: IConductores['nitConduc'],
  ) => this.instance.put(`/despachocajas/conductores/${nitConduc}`, data);
  public deleteConductores = ({ nitConduc }: Pick<IConductores, 'nitConduc'>) =>
    this.instance.delete(`/despachocajas/conductores/${nitConduc}`);

  // Transportad
  public getBuscarClienteTransportad = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<Array<Pick<ITransportad, 'idTransporta' | 'desctransport'>>>
    >('/despachocajas/transportad/busClient', { params });
  public getBuscarClienteTransportadFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<Array<Pick<ITransportad, 'idTransporta' | 'desctransport'>>>
    >('/despachocajas/transportad/busClientByText', { params });
  public getAfterBuscarClienteTransportad = (
    id: ITransportad['idTransporta'],
  ) =>
    this.instance.get<BaseResponse<ITransportad>>(
      `/despachocajas/transportad/onAfterUpdateBusClient/${id}`,
    );
  public getAfterUpdateTransportad = ({
    idTransporta,
  }: Pick<ITransportad, 'idTransporta'>) =>
    this.instance.get<BaseResponse<ITransportad>>(
      `/despachocajas/transportad/onAfterUpdateIdTransporta/${idTransporta}`,
    );
  public postTransportad = (data: ITransportad) =>
    this.instance.post<BaseResponse<ITransportad>>(
      '/despachocajas/transportad/',
      data,
    );
  public putTransportad = (
    data: ITransportad,
    id: ITransportad['idTransporta'],
  ) =>
    this.instance.put<BaseResponse<ITransportad>>(
      `/despachocajas/transportad/${id}`,
      data,
    );
  public deleteTransportad = ({
    idTransporta,
  }: Pick<ITransportad, 'idTransporta'>) =>
    this.instance.delete<BaseResponse>(
      `/despachocajas/transportad/${idTransporta}`,
    );

  // DCCajaCjDet
  public getPedidosDet = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<Array<Pick<IPedidos, 'pedido' | 'usuario'>>>
    >('/despachocajas/detalles/det1/pedidos', { params });
  public getPedidosDetFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<Array<Pick<IPedidos, 'pedido' | 'usuario'>>>
    >('/despachocajas/detalles/det1/pedidosByText', { params });

  // DCCajaCjDet4
  public getIdconcesDCCajaCjDet4 = (params?: IPagination) =>
    this.instance.get<BaseResponse<IConcepto[]>>(
      '/despachocajas/detalles/det4/conceptos',
      { params },
    );
  public getIdconcesDCCajaCjDet4Find = (params?: IQuery) =>
    this.instance.get<BaseResponse<IConcepto[]>>(
      '/despachocajas/detalles/det4/conceptosByText',
      { params },
    );

  // DCCajaCjDet3
  public getIdconcesDCCajaCjDet3 = (params?: IPagination) =>
    this.instance.get<BaseResponse<IConcepto[]>>(
      '/despachocajas/detalles/det3/idConces',
      { params },
    );
  public getIdconcesDCCajaCjDet3Find = (params?: IQuery) =>
    this.instance.get<BaseResponse<IConcepto[]>>(
      '/despachocajas/detalles/det3/idConcesByText',
      { params },
    );

  // DCCajasSubPrxCj
  public getDcajasSubPrxCjs = (params?: IPagination) =>
    this.instance.get<BaseResponse<TblDcjSubPrxCj>>(
      '/despachocajas/prod/getXCaja',
      { params },
    );

  // DcjSubPrxDp
  public getDcjSubPrxDp = (params?: IPagination) =>
    this.instance.get<BaseResponse<TblDcjSubPrxDp>>(
      '/despachocajas/prod/getXDesp',
      { params },
    );

  // DCCajasCjImp
  public getDCCajasImp = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<Pick<IDcCajasCjImp, 'consecTip' | 'fechaMov' | 'tercero'>>
      >
    >('/despachocajas/imp/despcaj', { params });
  public getDCCajasImpFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<Pick<IDcCajasCjImp, 'consecTip' | 'fechaMov' | 'tercero'>>
      >
    >('/despachocajas/imp/despcajByText', { params });

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
