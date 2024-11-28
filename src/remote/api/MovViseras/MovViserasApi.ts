/*
Copyright (©) Andrea.com.co - All Rights Reserved Unauthorized copying of this file, via any medium is strictly prohibited.
    Proprietary and confidential. Written and developed with ❤ by Andrea.com.co
2020 */
import { API_URL } from '@/consts';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../../HttpClient';
import IPagination from '@/types/IPagination';
import { BaseResponse } from '@/types';
import IQuery from '@/types/query';

export default class MovViserasApi extends HttpClient {
  public authToken: string;
  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getAvisoViseras = () => this.instance.get('/viceras/avisos/');
  public getAvisoCode = (codigo: number) =>
    this.instance.get(`/viceras/avisos/${codigo}`);
  public putAviso = (codigo: number, data: any) =>
    this.instance.put(`/viceras/avisos/${codigo}`, data);
  public postAviso = (data: any) => this.instance.post('/viceras/avisos', data);
  public deleteAviso = (codigo: number) =>
    this.instance.delete(`/viceras/avisos/${codigo}`);

  public putCamFecha = (data: any) =>
    this.instance.put('/viceras/cambfech', data);

  public getDecmisoInfo = (user: string) =>
    this.instance.get(`/viceras/deco_inf/${user}`);
  public deleteDecmisoinfo = (data: any) =>
    this.instance.delete('/viceras/deco_inf', data);

  public getMinAuton = () =>
    this.instance.get('/viceras/mov_viceras/getAutonMin');
  public getMovViseras = (auton: number) =>
    this.instance.get(`/viceras/mov_viceras/auton/${auton}`);
  public getNombrePre = (nguia: number) =>
    this.instance.get(`/viceras/mov_viceras/nombreByNGuia/${nguia}`);
  public getNumAnuila = (nguia: number) =>
    this.instance.get(`/viceras/mov_viceras/getByNGuia/${nguia}`);
  public getMovVicerasSiguiente = () =>
    this.instance.get('/viceras/mov_viceras/getMovViceraSFSiguien');
  public putMovVisceras = (auton: number, data: any) =>
    this.instance.put(`/viceras/mov_viceras/${auton}`, data);
  public getMovViseraPeso = () =>
    this.instance.get('/viceras/mov_viceras/getMovViceraSFPeso');
  public getMovViserasSf = () =>
    this.instance.get('/viceras/mov_viceras/getMovViceraSF');
  public getfriSacriOrdia = () =>
    this.instance.get('/viceras/mov_viceras/getOrdenDia');
  public getMovDia = () => this.instance.get('/viceras/mov_viceras/getMovDia');

  public getPesadoVisc = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          IdConsecutivo: number;
          PesajeNo: number;
          FechaPes: string;
          Tercero: string;
        }>
      >
    >('/viceras/pesado_visc', {
      params,
    });

  public getPesadoViscFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          IdConsecutivo: number;
          PesajeNo: number;
          FechaPes: string;
          Tercero: string;
        }>
      >
    >('/viceras/pesado_visc/ByText', {
      params,
    });
  public getPesadoViscUno = (nPesado: number) =>
    this.instance.get(`/viceras/pesado_visc/${nPesado}`);
  public postPesadoVisc = (data: any) =>
    this.instance.post('/viceras/pesado_visc', data);
  public putPesadoVisc = (nPesado: number, data: any) =>
    this.instance.put(`/viceras/pesado_visc/${nPesado}`, data);
  public getPesadoViscDet = () => this.instance.get('/viceras/pesado_visc_det');
  public deletePesadoDet = (idConsecutivo: number) =>
    this.instance.delete(`/viceras/pesado_visc_det/${idConsecutivo}`);
  public getPesadoVisDet = (idConcecutivo: number) =>
    this.instance.get(`/viceras/pesado_visc_det/${idConcecutivo}`);
  public postPesadoVisDet = (data: any) =>
    this.instance.post('/viceras/pesado_visc_det', data);
  public getPesadoVisDet2 = (
    idConcecutivo: number,
    codigoP: string,
    autonNum: number,
  ) =>
    this.instance.get(
      `/viceras/pesado_visc_det/getVisPesadoDet2/${idConcecutivo}/${codigoP}/${autonNum}`,
    );
  public deletePesadiViscDet2 = (idConcecutivo: number) =>
    this.instance.delete(
      `/viceras/pesado_visc/deleteByConsecutivo/${idConcecutivo}`,
    );
  public deletePesadoDet3 = (idConcecutivo: number) =>
    this.instance.delete(`/viceras/pesado_visc_det3/${idConcecutivo}`);
  public getPesdoDet3 = (idConcecutivo: number) =>
    this.instance.get(`/viceras/pesado_visc_det3/${idConcecutivo}`);
  public getFiriViscPesNGuia = () =>
    this.instance.get('/viceras/pesado_visc/get/friViscPesNGuia');
  public getFriViscPesNGuiaTrecero = (tercero: string) =>
    this.instance.get(`/viceras/pesado_visc/getByNitTercero/${tercero}`);
  public getClientPicadoAndPesado = (params?: IPagination) =>
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
    >('/viceras/pesado_visc/clientsActive', { params });
  public getClientPicadoAndPesadoFind = (params?: IQuery) =>
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
    >('/viceras/pesado_visc/clientsActiveByText', { params });

  public getTurnos = () => this.instance.get('/viceras/visc_turno/');
  public getTurnosId = (idTurnos: string) =>
    this.instance.get(`/viceras/visc_turno/${idTurnos}`);
  public postTurnos = (data: any) =>
    this.instance.post('/viceras/visc_turno/', data);
  public putTurnos = (idTurno: string, data: any) =>
    this.instance.put(`/viceras/visc_turno/${idTurno}`, data);
  public deleteTurnos = (idTurnod: string) =>
    this.instance.delete(`/viceras/visc_turno/${idTurnod}`);

  public getEmpleado = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<Array<{ Nombre: string; IDEmpleado: number }>>
    >('/viceras/visc_catego_emp/getTerceros', { params });
  public getEmpleadosByID = (idEmpleado: number) =>
    this.instance.get(
      `/viceras/visc_catego_emp/getTEmpleadosByActId/${idEmpleado}`,
    );
  public getEmpleTem = (idEmpleado: number) =>
    this.instance.get(
      `/viceras/visc_catego_emp/getEmpleadosByIdNom/${idEmpleado}`,
    );
  public getEmpleFech = (idEmpleado: number) =>
    this.instance.get(
      `/viceras/visc_catego_emp/getEmpleadosById/${idEmpleado}`,
    );
  public getEmplTodo = (idGrupo: number) =>
    this.instance.get(`/viceras/visc_catego_emp/getEmpleadosByGrup/${idGrupo}`);
  public postEmpleado = (data: any) =>
    this.instance.post('/viceras/visc_catego_emp/createEmpleado', data);
  public getEmpleadoID = (idEmpleado: number) =>
    this.instance.get(
      `/viceras/visc_catego_emp/getTEmpleadosById/${idEmpleado}`,
    );
  public putEmpleado = (idEmpleado: number, data: any) =>
    this.instance.put(
      `/viceras/visc_catego_emp/putEmpleado/${idEmpleado}`,
      data,
    );
  public deleteEmpleado = (idEmpleado: number) =>
    this.instance.delete(
      `/viceras/visc_catego_emp/deleteEmpleado/${idEmpleado}`,
    );

  public getGrupos = () => this.instance.get('/viceras/visc_grupos_emp/');
  public getGruposID = (idGrupos: number) =>
    this.instance.get(`/viceras/visc_grupos_emp/${idGrupos}`);
  public getJefeGrupo = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<Array<{ Nombre: string; IDEmpleado: number }>>
    >('/viceras/visc_catego_emp/getEmployeeByActivity', {
      params,
    });
  public getJefeGrupoFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<Array<{ Nombre: string; IDEmpleado: number }>>
    >('/viceras/visc_catego_emp/getEmployeeByActivityByText', {
      params,
    });
  public getJefeGrupoID = (idEmpleado: number) =>
    this.instance.get(`/viceras/visc_grupos_emp/getByEmpleado/${idEmpleado}`);
  public postGrupos = (data: any) =>
    this.instance.post('/viceras/visc_grupos_emp', data);
  public putGrupos = (idGrupo: number, data: any) =>
    this.instance.put(`/viceras/visc_grupos_emp/${idGrupo}`, data);
  public deleteGrupos = (idGrupos: number) =>
    this.instance.delete(`/viceras/visc_grupos_emp/${idGrupos}`);

  public getTiipoPes = () => this.instance.get('/viceras/visc_tipo_pesa/');
  public getCategoriaEmp = () => this.instance.get('/viceras/visc_catego_emp');
  public getCategoriaEmpID = (idEmpleado: string) =>
    this.instance.get(`/viceras/visc_catego_emp/${idEmpleado}`);
  public postCategriaEmp = (data: any) =>
    this.instance.post('/viceras/visc_catego_emp/', data);
  public putCategoriaEmp = (idEmpleado: string, data: any) =>
    this.instance.put(`/viceras/visc_catego_emp/${idEmpleado}`, data);
  public deleteCategoriaEmp = (idEmpleado: string) =>
    this.instance.delete(`/viceras/visc_catego_emp/${idEmpleado}`);

  public getPesadoVisCs = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          IdConsecutivo: number;
          PesajeNo: number;
          FechaPes: string;
          Tercero: string;
        }>
      >
    >('/viceras/pesado_visc_cs', { params });
  public getPesadoVisCsFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          IdConsecutivo: number;
          PesajeNo: number;
          FechaPes: string;
          Tercero: string;
        }>
      >
    >('/viceras/pesado_visc_cs/ByText', { params });
  public getPesadoVisCsID = (idContinuo: number) =>
    this.instance.get(`/viceras/pesado_visc_cs/${idContinuo}`);

  public getPicacoVis = () =>
    this.instance.get('/viceras/picado_visc/relacionPicado');
  public getPicacdoVisUno = (idConcecutivo: number) =>
    this.instance.get(`/viceras/picado_visc/${idConcecutivo}`);
  public putPicadoVisc = (idConcecutivo: number, data: any) =>
    this.instance.put(`/viceras/picado_visc/${idConcecutivo}`, data);
  public potPicadoVisc = (data: any) =>
    this.instance.post('/viceras/picado_visc', data);
  public getPicadoViscIdC = () => this.instance.get('/viceras/picado_visc');
  public putPicadoViscAutom = (Autom: number, data: any) =>
    this.instance.put(`/viceras/picado_visc_dt/${Autom}`, data);
  public getPicadoDetID = (idConcecutivo: number) =>
    this.instance.get(`/viceras/picado_visc_dt/getByIdConse/${idConcecutivo}`);
  public getPicadoDet = () => this.instance.get('/viceras/picado_visc_dt');
  public postPicadoDet = (data: any) =>
    this.instance.post('/viceras/picado_visc_dt', data);
  public getPicado = () => this.instance.get('/viceras/picado_visc/');
  public getPicadoCs = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          IdConsecutivo: number;
          PicadoNo: number;
          FechaPic: string;
          Tercero: string;
        }>
      >
    >('/viceras/picado_visc_cs', {
      params,
    });
  public getPicadoCsFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          IdConsecutivo: number;
          PicadoNo: number;
          FechaPic: string;
          Tercero: string;
        }>
      >
    >('/viceras/picado_visc_cs', {
      params,
    });
  public getPicadoCsUno = (idConcecutivo: number) =>
    this.instance.get(`/viceras/picado_visc_cs/${idConcecutivo}`);
  public getPicadoSacriDet4 = (nGuia: number, codigoInd: number) =>
    this.instance.get(
      `/viceras/picado_visc_dt/getByNGuiaCodigoIndiv/${nGuia}/${codigoInd}`,
    );
  public getPicaIdEtiqueta = (idEtiquta: string) =>
    this.instance.get(`/viceras/picado_visc_dt/get/ByEtiqueta/${idEtiquta}`);
  public getPicadoTipoPic = (tipoPic: number) =>
    this.instance.get(`/viceras/picado_visc_dt/getByTpPicado/${tipoPic}`);
  public getPicadoDte2 = (idConccutivo: number) =>
    this.instance.get(
      `/viceras/picado_visc_dt/getVisPicadoVcraDt2/${idConccutivo}`,
    );
  public getPicadoPz = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          idConsecutivo: number;
          picadoNo: number;
          fechaPic: string;
          idTpPicado: number;
          clientePic: string;
          nviscPic: number;
          grupoPica: number;
          turnoPic: string;
          realizo: string;
          nLoteExt: string;
          tpCanas: number;
          procesado: boolean;
          procesado2: boolean;
          observacion: string;
          observacion2: string;
          anulada: boolean;
          motivoAnul: string;
          usuarioP: string;
          fechaP: string;
        }>
      >
    >('/viceras/picado_visc_pz', { params });
  public getPicadoPzFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          idConsecutivo: number;
          picadoNo: number;
          fechaPic: string;
          idTpPicado: number;
          clientePic: string;
          nviscPic: number;
          grupoPica: number;
          turnoPic: string;
          realizo: string;
          nLoteExt: string;
          tpCanas: number;
          procesado: boolean;
          procesado2: boolean;
          observacion: string;
          observacion2: string;
          anulada: boolean;
          motivoAnul: string;
          usuarioP: string;
          fechaP: string;
        }>
      >
    >('/viceras/picado_visc_pz/ByText', { params });
  public getPicadoPzUno = (idConcecutivo: number) =>
    this.instance.get(`/viceras/picado_visc_pz/${idConcecutivo}`);
  public getPicadoPzDt = (idConcecutivo: number) =>
    this.instance.get(`/viceras/picado_visc_pzdt/${idConcecutivo}`);

  public getPicadoTurnoD = () =>
    this.instance.get('/viceras/visc_turno/DHTurnos');
  public getPicadoCaja = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          idCaja: number;
          descripcionC: string;
          anchoC: number;
          altoC: number;
          fondoC: number;
          capacidadKl: number;
          pesoCaj: number;
        }>
      >
    >('/viceras/mov_viceras/cajas', {
      params,
    });
  public getPicadoCajaFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          idCaja: number;
          descripcionC: string;
          anchoC: number;
          altoC: number;
          fondoC: number;
          capacidadKl: number;
          pesoCaj: number;
        }>
      >
    >('/viceras/mov_viceras/cajasByText', {
      params,
    });
  public getPicadoTipPic = () =>
    this.instance.get('/viceras/picado_visc/VisTpPicParam');
  public getPicadoDet3 = (idConcecuativo: number) =>
    this.instance.get(
      `/viceras/picado_visc/getVisPicadoVcraDt3/${idConcecuativo}`,
    );
  public getPicadoDet4 = () => this.instance.get('/viceras/picado_visc_dt4');
  public getPicadoDet4ID = (idConcecutivo: number) =>
    this.instance.get(`/viceras/picado_visc_dt4/${idConcecutivo}`);
  public deletePicadoDet4 = (idConcecutivo: number) =>
    this.instance.delete(`/viceras/picado_visc_dt4/${idConcecutivo}`);
  public putPicadoDet4 = (idConcecutivo: number, data: any) =>
    this.instance.put(
      `/viceras/picado_visc/putByConsecutivoAndFecha/${idConcecutivo}`,
      data,
    );
  public getPicadoVisVcra = () =>
    this.instance.get('/viceras/picado_visc/visPicadoVcra');
  public getVisTipoPes = () => this.instance.get('/viceras/visc_tipo_pesa');
  public getVisTipoPesID = (idTipoPes: number) =>
    this.instance.get(`/viceras/visc_tipo_pesa/${idTipoPes}`);
  public getCodigoProducto = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          IdCodigo: number;
          DescripciónMer: string;
          TNivel: string;
          Suspendido: boolean;
        }>
      >
    >('/viceras/pesado_visc/productsActive', { params });
  public getCodigoProductoFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          IdCodigo: number;
          DescripciónMer: string;
          TNivel: string;
          Suspendido: boolean;
        }>
      >
    >('/viceras/pesado_visc/productsActiveByText', { params });
  public getCodigProducDes = (codigo: string) =>
    this.instance.get(`/viceras/pesado_visc/productsActiveByCode/${codigo}`);
  public getProductoDH = () =>
    this.instance.get('/viceras/visc_tipo_pesa/productsDH');
  public getTipoPesaDet = (idTipoPes: number) =>
    this.instance.get(`/viceras/visc_tipo_pesa_det/${idTipoPes}`);
  public getTipoPesaDet1 = (idTipoPes: number, codigo: string) =>
    this.instance.get(`/viceras/visc_tipo_pesa_det/${idTipoPes}/${codigo}`);
  public postVisTipoPes = (data: any) =>
    this.instance.post('/viceras/visc_tipo_pesa_det', data);
  public postTipoPes = (data: any) =>
    this.instance.post('/viceras/visc_tipo_pesa', data);
  public putVisTipoPesDet = (idTipoPes: number, codigo: string, data: any) =>
    this.instance.put(
      `/viceras/visc_tipo_pesa_det/${idTipoPes}/${codigo}`,
      data,
    );
  public putTipoPes = (idTipoPes: number, data: any) =>
    this.instance.put(`/viceras/visc_tipo_pesa/${idTipoPes}`, data);
  public deleteTipoPes = (idTipoPes: number) =>
    this.instance.delete(`/viceras/visc_tipo_pesa/${idTipoPes}`);
  public deleteTipoPesaDet = (idTipoPes: number) =>
    this.instance.delete(`/viceras/visc_tipo_pesa/${idTipoPes}`);

  public getTCofInv1 = (data: any) =>
    this.instance.get('/viceras/menu/configurVisc', data);
  public putConfigur1 = (data: any) =>
    this.instance.put('/viceras/menu/putConfigurVisc', data);

  public putFechaGrup = (idGrupo: number, data: any) =>
    this.instance.put(
      `/viceras/picado_visc_pzdt/putByFechaGrupo/${idGrupo}`,
      data,
    );
  public deleteFechaGrup = (idGrupo: number, data: any) =>
    this.instance.post(
      `/viceras/picado_visc_pzdt/deleteByFechaGrupo/${idGrupo}`,
      data,
    );
  public getVisLab = (idGrupo: number, data: any) =>
    this.instance.post(
      `viceras/picado_visc_pzdt/getByFechaGrupo/${idGrupo}`,
      data,
    );
  public getEditAistem = (idEmpleado: number) =>
    this.instance.get(`/viceras/picado_visc_pzdt/byEmpleado/${idEmpleado}`);
  public putEdiitAsistem = (idEmpleado: number, data: any) =>
    this.instance.put(
      `/viceras/picado_visc_pzdt/putByIdEmpleado/${idEmpleado}`,
      data,
    );

  public getMenu1 = (data: any) =>
    this.instance.get('/viceras/menu/getTMenu1', data);
  public getMenu2 = (tipo: number, data: any) =>
    this.instance.get(`/viceras/menu/getTMenu2/${tipo}`, data);

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
