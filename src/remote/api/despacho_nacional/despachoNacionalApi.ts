import { API_URL } from '@/consts';
import { BaseResponse } from '@/types';
import IPagination from '@/types/IPagination';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../../HttpClient';
import IQuery from '@/types/query';

export default class DespachoNacionalApi extends HttpClient {
  public authToken: string;
  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getMenu1 = () => this.instance.get('/despachonacional/menu/getMenu1');
  public getMenu2 = (tipo: number) =>
    this.instance.get(`/despachonacional/menu/getMenu2/${tipo}`);
  public getTConfInv1 = () =>
    this.instance.get('/despachonacional/menu/cofigurDNac');
  public putTConfiInv1 = (data: any) =>
    this.instance.put('/despachonacional/menu/putConfigurDNac', data);
  public getCambFecha = () => this.instance.get('/despachonacional/cambfech');
  public putCamFecha = (data: any) =>
    this.instance.put('/despachonacional/cambfech', data);
  public getShearchDespa = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          IdConcecutivo: number;
          ConsecTip: number;
          FechaMov: string;
          Terc: string;
        }>
      >
    >('/despachonacional/consulta/searchDespacho', { params });
  public getShearchDespaFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          IdConcecutivo: number;
          ConsecTip: number;
          FechaMov: string;
          Terc: string;
        }>
      >
    >('/despachonacional/consulta/searchDespachoByText', { params });
  public getShearchDespaIDCon = (idConcecutivo: number) =>
    this.instance.get(
      `/despachonacional/consulta/searchDespachoById/${idConcecutivo}`,
    );
  public getTableDespaDeta = (tipoMov: number, concepTip: number) =>
    this.instance.get(
      `/despachonacional/detalles/getMovDespaDet/${tipoMov}/${concepTip}`,
    );
  public getSumTable = (tipoMov: number, concepTip: number) =>
    this.instance.get(
      `/despachonacional/detalles/getSumData/${concepTip}/${tipoMov}`,
    );
  public getProduct = (idCodigo: string) =>
    this.instance.get(`/despachonacional/detalles/productos/${idCodigo}`);
  public getTipoMov = () => this.instance.get('/despachonacional/tipoMov');
  public getTercetos = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          NitCliente: string;
          Expr2: string;
          Expr1: string;
          CodiCliente: string;
          Habilitado: boolean;
        }>
      >
    >('/despachonacional/terceros', { params });
  public getTercetosFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          NitCliente: string;
          Expr2: string;
          Expr1: string;
          CodiCliente: string;
          Habilitado: boolean;
        }>
      >
    >('/despachonacional/tercerosByText', { params });
  public getCiudades = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          idCiudad: string;
          descripcionCiu: string;
          departamento: string;
        }>
      >
    >('/despachonacional/ciudades', {
      params,
    });
  public getCiudadesFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          idCiudad: string;
          descripcionCiu: string;
          departamento: string;
        }>
      >
    >('/despachonacional/ciudadesByText', {
      params,
    });
  public getPises = () => this.instance.get('/despachonacional/paises');
  public getConductores = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          idEmpresa: number;
          nitConduc: string;
          expedida: string;
          nombreCond: string;
          placaV: string;
          telefono1: string;
          telefono2: string;
          fecha: string;
          usuario: string;
        }>
      >
    >('/despachonacional/conductores', { params });
  public getConductoresFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          idEmpresa: number;
          nitConduc: string;
          expedida: string;
          nombreCond: string;
          placaV: string;
          telefono1: string;
          telefono2: string;
          fecha: string;
          usuario: string;
        }>
      >
    >('/despachonacional/conductoresByText', { params });
  public getTableSubConso = (tipoMov: number, concepTip: number) =>
    this.instance.get(
      `/despachonacional/other/consoDespa/${concepTip}/${tipoMov}`,
    );
  public getFriRCana = (tipoMov: number, concepTip: number) =>
    this.instance.get(`/despachonacional/getGuideInfo/${concepTip}/${tipoMov}`);
  public getGuiaNLot = (guiaNo: number) =>
    this.instance.get(`/despachonacional/other/relaCanLot/${guiaNo}`);
  public getShearchDespaMod = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          IdConcecutivo: number;
          ConsecTip: number;
          FechaMov: string;
          Terc: string;
          Procesado: boolean;
          Anulada: boolean;
        }>
      >
    >('/despachonacional/modificacion/searchDespachoMod', { params });
  public getShearchDespaModFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          IdConcecutivo: number;
          ConsecTip: number;
          FechaMov: string;
          Terc: string;
          Procesado: boolean;
          Anulada: boolean;
        }>
      >
    >('/despachonacional/modificacion/searchDespachoModByText', { params });
  public getShearchDespaIDMod = (idConcecutivo: number) =>
    this.instance.get(
      `/despachonacional/modificacion/searchDespachoById/${idConcecutivo}`,
    );
  public getEditTable = (tipoMov: number, concepTip: number, etiqueta) =>
    this.instance.get(
      `/despachonacional/detalles/getMovDespaDet/${tipoMov}/${concepTip}/${etiqueta}`,
    );
  public getPoductos = () =>
    this.instance.get('/despachonacional/detalles/productos');
  public putMovDespaNac = (idConcecutivo: number, data: any) =>
    this.instance.put(
      `/despachonacional/putMovDespacho/${idConcecutivo}`,
      data,
    );
  public puttableMovDesaMov = (
    tipoMov: number,
    concepTip: number,
    etiqueta: string,
    data: any,
  ) =>
    this.instance.put(
      `/despachonacional/detalles/putMovDespachoDet/${tipoMov}/${concepTip}/${etiqueta}`,
      data,
    );
  public getMoviento = (tipoMov: number) =>
    this.instance.get(`/despachonacional/movimientos/${tipoMov}`);
  public getMaxConsecTrip = (tipoMov: number) =>
    this.instance.get(`/despachonacional/getMaxConsecTip/${tipoMov}`);
  public getCConductor = (cConduct: string) =>
    this.instance.get(`/despachonacional/conductores/${cConduct}`);
  public postDespacho = (data: any) =>
    this.instance.post('/despachonacional', data);
  public getCountGuia = (noGuia: number) =>
    this.instance.get(`/despachonacional/detalles/getCountGuiaDet/${noGuia}`);
  public getAvisoDespa = () => this.instance.get('/despachonacional/avisos');
  public getCodigoAvisosDespa = (coigoAviso: number) =>
    this.instance.get(`/despachonacional/avisos/${coigoAviso}`);
  public putAvisosDespa = (codAviso: number, data: any) =>
    this.instance.put(`/despachonacional/avisos/${codAviso}`, data);
  public postAvisosDespa = (data: any) =>
    this.instance.post('/despachonacional/avisos', data);
  public deletAvisosDespa = (codAviso: number) =>
    this.instance.delete(`/despachonacional/avisos/${codAviso}`);

  public getExportGuiaAnim = (noGuia: number, codigoInv: number) =>
    this.instance.get(
      `/despachonacional/detalles/getSacriDet2/${noGuia}/${codigoInv}`,
    );
  public postTableDespa = (data: any) =>
    this.instance.post('/despachonacional/detalles/postMovDespaDet', data);

  public deleteDespaNac = (idConcecutivo: number) =>
    this.instance.delete(`/despachonacional/${idConcecutivo}`);
  public deleteTableDet = (tipoMov: number, consecTip: number) =>
    this.instance.delete(
      `/despachonacional/detalles/deleteMovDespaDet/${tipoMov}/${consecTip}`,
    );

  public postConduct = (data: any) =>
    this.instance.post('/despachonacional/conductores', data);

  public putConduct = (nitConduc: string, data: any) =>
    this.instance.put(`/despachonacional/conductores/${nitConduc}`, data);
  public deleteConduct = (nitConduct: string) =>
    this.instance.delete(`/despachonacional/conductores/${nitConduct}`);

  public getDespaVtGuias = () =>
    this.instance.get('/despachonacional/vt/getMovDespVtGuias');
  public getProvedores = () =>
    this.instance.get('/despachonacional/proveedores');

  public getSubCan = () => this.instance.get('/despachonacional/other/subRCan');
  public getSub2Can = () =>
    this.instance.get('/despachonacional/other/subRCan2');
  public getSub3Can = () =>
    this.instance.get('/despachonacional/other/subRCan3');
  public getSub4Can = () =>
    this.instance.get('/despachonacional/other/subRCan4');
  public getSub3CanGuia = (concepTip: number, tipoMov: number) =>
    this.instance.get(
      `/despachonacional/other/relaCanGuia3/${concepTip}/${tipoMov}`,
    );

  public putConfrimar = (idConcecutivo: number) =>
    this.instance.put(`/despachonacional/anularc/confirmar/${idConcecutivo}`);
  public putAnulada = (idConcecutivo: number, data: any) =>
    this.instance.put(
      `/despachonacional/anularc/anular/${idConcecutivo}`,
      data,
    );
  public getDespaNacGuia3 = (concepTip: number, tipoMov: number) =>
    this.instance.get(
      `/despachonacional/other/despaNacGuia3/${concepTip}/${tipoMov}`,
    );
  public getDespaNacGuia4 = (concepTip: number, tipoMov: number) =>
    this.instance.get(
      `/despachonacional/other/despaNacGuia4/${concepTip}/${tipoMov}`,
    );
  public putPrintDespaNac = (data: any, idConcecutivo: number) =>
    this.instance.put(
      `/despachonacional/putPrintMovDespacho/${idConcecutivo}`,
      data,
    );
  public putPrintVtDespaNac = (data: any, concepTip: number, tipoMov: number) =>
    this.instance.put(
      `/despachonacional/vt/putPrintMovDespachoVt/${tipoMov}/${concepTip}`,
      data,
    );

  public getDespachoNacPdf = (idConcecutivo: number) =>
    this.instance.get(
      `/despachonacional/informes/DespacNac/${idConcecutivo}/pdf`,
    );
  public getSearch1 = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          ConsecTip: number;
          FechaMov: string;
          Tercero: string;
        }>
      >
    >('/despachonacional/cdespachadas/search1', { params });
  public getSearch1Find = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          ConsecTip: number;
          FechaMov: string;
          Tercero: string;
        }>
      >
    >('/despachonacional/cdespachadas/search1ByText', { params });
  public getSearch2 = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          ConsecTip: number;
          FechaMov: string;
          Tercero: string;
        }>
      >
    >('/despachonacional/cdespachadas/search2', { params });
  public getSearch2Find = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          ConsecTip: number;
          FechaMov: string;
          Tercero: string;
        }>
      >
    >('/despachonacional/cdespachadas/search2ByText', { params });
  public getDNTemp = () =>
    this.instance.get('/despachonacional/cdespachadas/DNTemp');
  public postDNTemp = (data: any) =>
    this.instance.post('/despachonacional/cdespachadas', data);
  public postRelacCanaDN = (data: any) =>
    this.instance.post('/despachonacional/informes/RelacCanaDN/pdf', data);
  public deleteDNTemp = () =>
    this.instance.delete('/despachonacional/cdespachadas/delete');

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
