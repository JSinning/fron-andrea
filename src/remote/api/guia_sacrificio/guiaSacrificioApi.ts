import { API_URL } from '@/consts';
import { BaseResponse } from '@/types';
import IPagination from '@/types/IPagination';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../../HttpClient';
import { Ciudades } from './type/Ciudad';
import { ICliente } from './type/Cliente';
import { Conductores } from './type/Conductor';
import { Proveedores } from './type/Proveedor';
import IQuery from '@/types/query';

export default class GuiaSacrificioApi extends HttpClient {
  public authToken: string;
  constructor(authToken: string) {
    super(API_URL);
    this.initializeRequestInterceptor();
    this.authToken = authToken;
  }

  public getTConfInv1 = () => this.instance.get('/guia_sacrificio/config/');
  public putTConfInv1 = (data: any) =>
    this.instance.get('/guia_sacrificio/config/', data);
  public getMenu1 = () => this.instance.get('/guia_sacrificio/menu/tmenu1');
  public getMenu2 = (tipo: number) =>
    this.instance.get(`/guia_sacrificio/menu/tmenu2/${tipo}`);
  public getChangeDate = () => this.instance.get('/guia_sacrificio/cambFech');
  public putChangeDate = (data: any) =>
    this.instance.put(`/guia_sacrificio/cambFech`, data);
  public getConductores = (nitConta: string) =>
    this.instance.get(`/guia_sacrificio/conductores/count_driver/${nitConta}`);
  public postConductores = (data: any) =>
    this.instance.post('/guia_sacrificio/conductores', data);
  public putConductores = (nitConta: string, data: any) =>
    this.instance.put(`/guia_sacrificio/conductores/${nitConta}`, data);
  public deleteConductores = (nitConta: string) =>
    this.instance.delete(`/guia_sacrificio/conductores/${nitConta}`);
  public getBuscarConductores = () =>
    this.instance.get('/guia_sacrificio/conductores_mod/bus_client');
  public getBuscarCoductoresNit = (nitConta: string) =>
    this.instance.get(
      `/guia_sacrificio/conductores_mod/after_update_busclient/${nitConta}`,
    );
  public getCiudadesFinca = () =>
    this.instance.get('/guia_sacrificio/fincas/ciudades');
  public getFincasID = (id: string) =>
    this.instance.get(`/guia_sacrificio/fincas/after_update/${id}`);
  public postFicas = (data: any) =>
    this.instance.post(`/guia_sacrificio/fincas`, data);
  public deleteFincas = (id: string) =>
    this.instance.delete(`/guia_sacrificio/fincas/${id}`);
  public getFincas = () =>
    this.instance.get('/guia_sacrificio/fincas/modificacion/busclient');
  public getFincaID = (id: string) =>
    this.instance.get(`/guia_sacrificio/fincas/${id}`);
  public putFincas = (id: string, data: any) =>
    this.instance.put(`/guia_sacrificio/fincas/${id}`, data);
  public getBuscarTransportad = () =>
    this.instance.get('/guia_sacrificio/transportad/modificacion/busclient');
  public getBuscarTransportadID = (id: string) =>
    this.instance.get(`/guia_sacrificio/transportad/${id}`);
  public getTransportad = (id: string) =>
    this.instance.get(`/guia_sacrificio/transportad/after_update/${id}`);
  public postTransportad = (data: any) =>
    this.instance.post('/guia_sacrificio/transportad/', data);
  public deleteTransportad = (id: string) =>
    this.instance.delete(`/guia_sacrificio/transportad/${id}`);
  public putTransportad = (id: string, data: any) =>
    this.instance.put(`/guia_sacrificio/transportad/${id}`, data);
  public getFacBursag = () => this.instance.get('/guia_sacrificio/fac_bursag');
  public getConfirmaWeb2 = (nGuia: number) =>
    this.instance.get(`/guia_sacrificio/confirma_web2/${nGuia}`);
  public putRecalcularPromedio = (nGuia: number, data: any) =>
    this.instance.put(
      `/guia_sacrificio/confirma_web/recalcular_promedio/${nGuia}`,
      data,
    );
  public putActualizarW = (nGuia: number) =>
    this.instance.put(`/guia_sacrificio/confirma_web/actualizar_w/${nGuia}`);
  public postOpenFrom = () =>
    this.instance.post('/guia_sacrificio/fac_bursag/param/on_open/form');
  public postAfterFechaG2 = (data: any) =>
    this.instance.post(
      '/guia_sacrificio/fac_bursag/param/after_update/fechag2',
      data,
    );
  public postFechaParam = (data: any) =>
    this.instance.post('/guia_sacrificio/fac_bursag/param', data);
  public getCofirmaWeb = () =>
    this.instance.get('/guia_sacrificio/confirma_web');
  public getConfirmaWebSacD1 = (nGuia: number) =>
    this.instance.get(`/guia_sacrificio/confirma_web_sac_dt1/${nGuia}`);
  public getConfirmaWebSacD2 = (nGuia: number) =>
    this.instance.get(`/guia_sacrificio/confirma_web_sac_dt2/${nGuia}`);
  public getConfirmaWebSacD3 = (nGuia: number) =>
    this.instance.get(`/guia_sacrificio/confirma_web_sac_dt3/${nGuia}`);
  public getConfirmaWebSacD4 = (nGuia: number) =>
    this.instance.get(`/guia_sacrificio/confirma_web_sac_dt4/${nGuia}`);
  public getConfirmaWebSac = () =>
    this.instance.get('/guia_sacrificio/confirma_web_sac/');
  public postConfirmainfo = (nGuia: number) =>
    this.instance.post(
      `/guia_sacrificio/confirma_web_sac/confirma_info/${nGuia}`,
    );

  public getBuscarClienteRecepcion = () =>
    this.instance.get('/guia_sacrificio/recepcion/mod/busclient');
  public getTerceroRecepcion = (params?: IPagination) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/recepcion/mod/nit_tercero',
      { params },
    );
  public getTerceroRecepcionFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/recepcion/mod/nit_terceroByText',
      { params },
    );
  public getProvedorRecepcion = (params?: IPagination) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/recepcion/mod/nit_proveedor',
      { params },
    );
  public getProvedorRecepcionFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/recepcion/mod/nit_proveedorByText',
      { params },
    );
  public getNombreProvedoreRecepcion = (params?: IPagination) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/recepcion/mod/nombre_proveedor',
      { params },
    );
  public getNombreProvedoreRecepcionFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/recepcion/mod/nombre_proveedorByText',
      { params },
    );
  public getClasesRecepcion = () =>
    this.instance.get('/guia_sacrificio/recepcion/mod/clase');
  public getClasesDecripcionRecepcion = () =>
    this.instance.get('/guia_sacrificio/recepcion/mod/claseOrderDescripcion');
  public getSexoRecepcion = () =>
    this.instance.get('/guia_sacrificio/recepcion/mod/sexo');
  public getSexoDescripcionRecepcion = () =>
    this.instance.get('/guia_sacrificio/recepcion/mod/sexoOrderDescripcion');
  public getProcedenciaRecepcion = (params?: IPagination) =>
    this.instance.get<BaseResponse<Ciudades>>(
      '/guia_sacrificio/recepcion/mod/procedencia',
      { params },
    );
  public getProcedenciaRecepcionFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Ciudades>>(
      '/guia_sacrificio/recepcion/mod/procedenciaByText',
      { params },
    );
  public getRetefuenteRecepcion = () =>
    this.instance.get('/guia_sacrificio/recepcion/mod/retefuente');
  public getRecepcion = (id: number) =>
    this.instance.get(`/guia_sacrificio/recepcion/mod/${id}`);
  public getTerceroCodRecepcion = (cod: string) =>
    this.instance.get(
      `/guia_sacrificio/recepcion/mod/after_update/nit_tercero/${cod}`,
    );
  public getProvedorCodRecepcion = (cod: string) =>
    this.instance.get(
      `/guia_sacrificio/recepcion/mod/after_update/nit_proveedor/${cod}`,
    );
  public getNombreProvedorCodRecepcion = (cod: string) =>
    this.instance.get(
      `/guia_sacrificio/recepcion/mod/after_update/nombre_proveedor/${cod}`,
    );
  public postRecepcionModify = (data: any) =>
    this.instance.post('/guia_sacrificio/recepcion/mod/before_modify', data);
  public postRecepcionOrdenCompra = (data: any) =>
    this.instance.post('/guia_sacrificio/recepcion/mod/gen_ord_compra', data);
  public postImprimirRecepcion = (data: any) =>
    this.instance.post('/guia_sacrificio/recepcion/mod/print', data);
  public putRecepcion = (id: number, data: any) =>
    this.instance.put(`/guia_sacrificio/recepcion/mod/${id}`, data);
  // --Programacion
  public getNProgramacion = () =>
    this.instance.get('/guia_sacrificio/guia/programacion/nprogramacion');
  public getProveedor = () =>
    this.instance.get('/guia_sacrificio/guia/programacion/proveedor');
  public getProcedencia = () =>
    this.instance.get('/guia_sacrificio/guia/programacion/fincaproc');
  public getCiudades = () =>
    this.instance.get('/guia_sacrificio/guia/programacion/ciudad');
  public getClases = () =>
    this.instance.get('/guia_sacrificio/guia/programacion/clases');
  // --end Programacion
  // -- Basicos
  public getNitTerceros = (params?: IPagination) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/guia/basicos/nit_tercero',
      { params },
    );
  public getNitTercerosFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/guia/basicos/nit_terceroByText',
      { params },
    );
  public getNitTerceroID = (cod: string) =>
    this.instance.get(
      `/guia_sacrificio/guia/basicos/after_update/nit_tercero/${cod}`,
    );
  public getNitProveedor = () =>
    this.instance.get('/guia_sacrificio/guia/basicos/nit_proveedor');
  public getNitProveedorID = (cod: string) =>
    this.instance.get(
      `/guia_sacrificio/guia/basicos/after_update/nit_proveedor/${cod}`,
    );
  public getNombreProveedor = (params?: IPagination) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/guia/basicos/nombre_proveedor',
      { params },
    );
  public getNombreProveedorFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/guia/basicos/nombre_proveedorByText',
      { params },
    );
  public getNombreProveedorID = (cod: string) =>
    this.instance.get(
      `/guia_sacrificio/guia/basicos/after_update/nombre_proveedor/${cod}`,
    );
  public getNitCC = (params?: IPagination) =>
    this.instance.get<BaseResponse<Array<Partial<ICliente>>>>(
      '/guia_sacrificio/guia/basicos/nitocc',
      { params },
    );
  public getNitCCFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Array<Partial<ICliente>>>>(
      '/guia_sacrificio/guia/basicos/nitoccByText',
      { params },
    );
  public getNitCCID = (cod: string) =>
    this.instance.get(
      `/guia_sacrificio/guia/basicos/after_update/nitocc/${cod}`,
    );
  public getNitCCCod = (params?: IPagination) =>
    this.instance.get<BaseResponse<Array<Partial<ICliente>>>>(
      '/guia_sacrificio/guia/basicos/nitoccod',

      { params },
    );
  public getNitCCCodFind = (params?: IPagination) =>
    this.instance.get<BaseResponse<Array<Partial<ICliente>>>>(
      '/guia_sacrificio/guia/basicos/nitoccodByText',

      { params },
    );
  public getNitCCodID = (cod: string) =>
    this.instance.get(
      `/guia_sacrificio/guia/basicos/after_update/nitoccod/${cod}`,
    );
  public getNitCCpp = (params?: IPagination) =>
    this.instance.get<BaseResponse<Array<Partial<ICliente>>>>(
      '/guia_sacrificio/guia/basicos/nitoccpp',

      { params },
    );
  public getNitCCppFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Array<Partial<ICliente>>>>(
      '/guia_sacrificio/guia/basicos/nitoccppByText',
      { params },
    );
  public getNitCCppID = (cod: string) =>
    this.instance.get(
      `/guia_sacrificio/guia/basicos/after_update/nitoccpp/${cod}`,
    );
  public getConductorCod = (params?: IPagination) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/guia/basicos/ccconductor',
      { params },
    );
  public getConductorCodFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/guia/basicos/ccconductorByText',
      { params },
    );
  public getConductorCodID = (cc: string) =>
    this.instance.get(
      `/guia_sacrificio/guia/basicos/after_update/ccconductor/${cc}`,
    );
  public getConductorName = (params?: IPagination) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/guia/basicos/ccconductoral',
      { params },
    );
  public getConductorNameFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Proveedores>>(
      '/guia_sacrificio/guia/basicos/ccconductoralByText',
      { params },
    );
  public getConductorNameID = (cc: string) =>
    this.instance.get(
      `/guia_sacrificio/guia/basicos/after_update/ccconductoral/${cc}`,
    );
  public getClase = () =>
    this.instance.get('/guia_sacrificio/guia/basicos/clase');
  public getClaseDescripcion = () =>
    this.instance.get('/guia_sacrificio/guia/basicos/claseOrderDescripcion');
  public getSexo = () =>
    this.instance.get('/guia_sacrificio/guia/basicos/sexo');
  public getSexoDescripcion = () =>
    this.instance.get('/guia_sacrificio/guia/basicos/sexoOrderDescripcion');
  // -- end Basicos
  // -- Peso
  public getCiudad = () =>
    this.instance.get('/guia_sacrificio/guia/peso/ciudades');
  public getFinca = () => this.instance.get('/guia_sacrificio/guia/peso/finca');
  public getFincaDescrip = () =>
    this.instance.get('/guia_sacrificio/guia/peso/fincaOrderDescripcion');
  public getTipoVeh = () =>
    this.instance.get('/guia_sacrificio/guia/peso/tipoveh');
  // -- end Peso

  public getGuiaConsBuscarClientes = (skip: number, limit: number) =>
    this.instance.get<
      BaseResponse<
        Array<{
          NGuia: number;
          Expr1: string;
          FechaPes: string;
        }>
      >
    >(`/guia_sacrificio/consulta/busclient?skip=${skip}&limit=${limit}`);
  public getGuiaConsBuscarClientesFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          NGuia: number;
          Expr1: string;
          FechaPes: string;
        }>
      >
    >(`/guia_sacrificio/consulta/busclientByText`, { params });
  public getNitTerceroConsulta = () =>
    this.instance.get('/guia_sacrificio/consulta/nit_tercero');
  public getGuiaConsClientesID = (nGuia: number) =>
    this.instance.get(
      `/guia_sacrificio/consulta/after_update/busclient/${nGuia}`,
    );
  public getOnLoad = (nProgramac: number) =>
    this.instance.get(`/guia_sacrificio/consulta/on_load/form/${nProgramac}`);
  public getGuiaModBuscarClientes = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<Array<{ NGuia: number; Expr1: string; FechaPes: string }>>
    >('/guia_sacrificio/modificacion/busclient', { params });
  public getGuiaModBuscarClientesFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<Array<{ NGuia: number; Expr1: string; FechaPes: string }>>
    >('/guia_sacrificio/modificacion/busclientByText', { params });
  public getGuiasToNGuia = (nGuia: number) =>
    this.instance.get(`/guia_sacrificio/guia/${nGuia}`);
  public putModify = (data: any) =>
    this.instance.put('/guia_sacrificio/modificacion/modify', data);
  public postModSPPrint = (data: any) =>
    this.instance.post('/guia_sacrificio/modificacionsp/print', data);
  public postModNumeroLote = (data: any) =>
    this.instance.post('/guia_sacrificio/guia/peso/gen_numero_lote', data);
  public postValidatNumeroLote = (data: any) =>
    this.instance.post(
      '/guia_sacrificio/guia/peso/before_create/numero_lote',
      data,
    );
  public putAnular = (data: any) =>
    this.instance.put('/guia_sacrificio/modificacion/anular', data);
  public putAfterForm = (id: number) =>
    this.instance.put(`/guia_sacrificio/guia/after_update/form/${id}`);
  public putGuiaSac = (nGuia: number, data: any) =>
    this.instance.put(`/guia_sacrificio/guia/${nGuia}`, data);
  public getNewGuia = () => this.instance.get('/guia_sacrificio/guia/nguia');
  public postGuia = (data: any) =>
    this.instance.post('/guia_sacrificio/guia', data);
  public postOnPrint = (data: any) =>
    this.instance.post('/guia_sacrificio/guia/peso/print', data);
  public deleteGuia = (nGuia: number) =>
    this.instance.delete(`/guia_sacrificio/guia/${nGuia}`);
  public getSubDetMoviajusIdCodigo1 = () =>
    this.instance.get('/guia_sacrificio/subdetmoviajus/idCodigo1');
  public getSubDetMoviajus = (idConsecutivo: number) =>
    this.instance.get(`/guia_sacrificio/subdetmoviajus/${idConsecutivo}`);
  public getOrdCompraSubdtIdCodigo = () =>
    this.instance.get('/guia_sacrificio/ordcomprasubdt/idCodigo');
  public getOrdCompraSubdtIdCodigo1 = () =>
    this.instance.get('/guia_sacrificio/ordcomprasubdt/idCodigo1');
  public getOrdcomprasubdtID = (idConcecutivo: number) =>
    this.instance.get(`/guia_sacrificio/ordcomprasubdt/${idConcecutivo}`);
  public getOrdeCompraLoteClase = () =>
    this.instance.get('/guia_sacrificio/ordcomprasublote/clases');
  public getOrdCompraSubLote = (loteNo: number) =>
    this.instance.get(`/guia_sacrificio/ordcomprasublote/${loteNo}`);
  public getBuscarClientOrdcompraCs = (skip: number, limit: number) =>
    this.instance.get(
      `/guia_sacrificio/ordcompra/cons/busClient?skip=${skip}&limit=${limit}`,
    );
  public getOrdenCompraID = (idConcecutivo: number) =>
    this.instance.get(`/guia_sacrificio/ordcompra/${idConcecutivo}`);
  public getTipoMovOrdCompra = () =>
    this.instance.get('/guia_sacrificio/ordcompra/tipoMovs');
  public getNitCCOrdCompra = () =>
    this.instance.get('/guia_sacrificio/ordcompra/nitoCC');
  public getNitCCodOrdCompra = () =>
    this.instance.get('/guia_sacrificio/ordcompra/nitoCCod');
  public getNitCCppOrdCompra = () =>
    this.instance.get('/guia_sacrificio/ordcompra/nitoCCPP');
  public getNitCC22OrdCompra = () =>
    this.instance.get('/guia_sacrificio/ordcompra/nitoCC22');
  public getRefuenteOrdCompra = () =>
    this.instance.get('/guia_sacrificio/ordcompra/retefuente');

  public getBuscarClienteOrdCompra = () =>
    this.instance.get('/guia_sacrificio/ordcompra/busClient');
  public postAnualOrdCompra = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcompra/anular', data);
  public postPrintOrdCompra = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcompra/print/', data);
  public postModifyOrdCompra = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcompra/modify/', data);
  public putOrdCompra = (idConcecutivo: number, data: any) =>
    this.instance.put(`/guia_sacrificio/ordcompra/${idConcecutivo}`, data);
  public getIdPedidoDetpedido = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          idAuton: string;
          pedido: string;
          prefijoPed: string;
          usuario: string;
          codigo: string;
          sucursal: string;
          fechaDoc: string;
        }>
      >
    >('/guia_sacrificio/dccontrolveh/detpedido/idPedido', { params });
  public getIdPedidoDetpedidoFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          idAuton: string;
          pedido: string;
          prefijoPed: string;
          usuario: string;
          codigo: string;
          sucursal: string;
          fechaDoc: string;
        }>
      >
    >('/guia_sacrificio/dccontrolveh/detpedido/idPedidoByText', { params });
  public getDccontrolvehIdPesajeIdPedido = (
    idPesaje: number,
    idPedido: number,
  ) =>
    this.instance.get(
      `/guia_sacrificio/dccontrolveh/detpedido/${idPesaje}/${idPedido}`,
    );
  public getDccontrolvehIdPesaje = (idPesaje: number) =>
    this.instance.get(`/guia_sacrificio/dccontrolveh/detpedido/${idPesaje}`);
  public putDccontrolvehIdPesajeIdPedido = (
    idPesaje: number,
    idPedido: number,
    data: any,
  ) =>
    this.instance.put(
      `/guia_sacrificio/dccontrolveh/detpedido/${idPesaje}/${idPedido}`,
      data,
    );
  public postDccontrolvehIdPesajeIdPedido = (data: any) =>
    this.instance.post(`/guia_sacrificio/dccontrolveh/detpedido/`, data);
  public getTipoVehDcControlVeh = () =>
    this.instance.get('/guia_sacrificio/dccontrolveh/tipoVeh');
  public getConductoresVDcControlVeh = (params?: IPagination) =>
    this.instance.get<BaseResponse<Conductores>>(
      '/guia_sacrificio/dccontrolveh/conductorV',
      { params },
    );
  public getConductoresVDcControlVehFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Conductores>>(
      '/guia_sacrificio/dccontrolveh/conductorVByText',
      { params },
    );
  public getConductoresV2DcControlVeh = (params?: IPagination) =>
    this.instance.get<BaseResponse<Conductores>>(
      '/guia_sacrificio/dccontrolveh/conductorV2',
      { params },
    );
  public getConductoresV2DcControlVehFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Conductores>>(
      '/guia_sacrificio/dccontrolveh/conductorV2ByText',
      { params },
    );
  public getBuscarIdPesajeDcControlVehPdd = () =>
    this.instance.get('/guia_sacrificio/dccontrolvehpdd/findId');
  public getIdPesajeDcControlVehPdd = (idPesaje: number) =>
    this.instance.get(`/guia_sacrificio/dccontrolvehpdd/${idPesaje}`);
  public putDcControlVehPdd = (idPesaje: number, data: any) =>
    this.instance.put(`/guia_sacrificio/dccontrolvehpdd/${idPesaje}`, data);
  public getBuscarIdPesajeDcControlVehGenF = () =>
    this.instance.get('/guia_sacrificio/dccontrolveh/genf/findIdPesaje');
  public getIdPesajeDcControlVehGenF = (idPesaje: number) =>
    this.instance.get(`/guia_sacrificio/dccontrolveh/genf/${idPesaje}`);
  public getAfterCoductorDcControlVeh = (nitConduc: string) =>
    this.instance.get(
      `/guia_sacrificio/dccontrolveh/afterUpdateConductor/${nitConduc}`,
    );
  public getClienteUsDcControlVeh = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          codiCliente: string;
          expr1: string;
          nitCliente: string;
        }>
      >
    >('/guia_sacrificio/dccontrolveh/clienteUs', { params });
  public getClienteUsDcControlVehFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          codiCliente: string;
          expr1: string;
          nitCliente: string;
        }>
      >
    >('/guia_sacrificio/dccontrolveh/clienteUsByText', { params });
  public getCiudadDesDcControlVeh = (params?: IPagination) =>
    this.instance.get<BaseResponse<Ciudades>>(
      '/guia_sacrificio/dccontrolveh/ciudades',
      { params },
    );
  public getCiudadDesDcControlVehFind = (params?: IQuery) =>
    this.instance.get<BaseResponse<Ciudades>>(
      '/guia_sacrificio/dccontrolveh/ciudadesByText',
      { params },
    );
  public getTipoProducDcControlVeh = () =>
    this.instance.get('/guia_sacrificio/dccontrolveh/tipoProdu');
  public getBuscarClienteDcControlVehMod = () =>
    this.instance.get('/guia_sacrificio/dccontrolveh/mod/findId');
  public getDCControlVehMod = (idPesaje: number) =>
    this.instance.get(`/guia_sacrificio/dccontrolveh/mod/${idPesaje}`);
  public putDCControlVehMod = (idPesaje: number, data: any) =>
    this.instance.put(`/guia_sacrificio/dccontrolveh/mod/${idPesaje}`, data);
  public putAnularDCControlVehMod = (idPesaje: number, data: any) =>
    this.instance.put(
      `/guia_sacrificio/dccontrolveh/mod/anular/${idPesaje}`,
      data,
    );
  public getBuscarDCControlVeh = () =>
    this.instance.get('/guia_sacrificio/dccontrolveh/findId');
  public getDCControlVehIdPesaje = (idPesaje: number) =>
    this.instance.get(`/guia_sacrificio/dccontrolveh/${idPesaje}`);
  public getAddPesajeDCControlVeh = () =>
    this.instance.get('/guia_sacrificio/dccontrolveh/idPesaje');
  public postDCControlVeh = (data: any) =>
    this.instance.post('/guia_sacrificio/dccontrolveh/', data);
  public putPrintDCControlVeh = (idPesaje: number, data: any) =>
    this.instance.put(`/guia_sacrificio/dccontrolveh/print/${idPesaje}`, data);
  public getGeneraLotSub = () =>
    this.instance.get('/guia_sacrificio/generalotsub/');
  public getGeneraInfoGeneraLot = () =>
    this.instance.get('/guia_sacrificio/generalot/genInfo');
  public putOpenFormGeneraLot = () =>
    this.instance.put('/guia_sacrificio/generalot/onOpen');
  public putgenerarGeneraLot = () =>
    this.instance.put('/guia_sacrificio/generalot/gen');
  public putOnOpenForm = () =>
    this.instance.put('/guia_sacrificio/generarendlt/onOpen');
  public postGeneraRendLt = (data: any) =>
    this.instance.post('/guia_sacrificio/generarendlt/', data);
  public getLoteGenOc = () =>
    this.instance.get('/guia_sacrificio/genoc/loteNo');
  public getGenOC = () => this.instance.get('/guia_sacrificio/genoc');
  public getGenOCID = (loteNo: number) =>
    this.instance.get(`/guia_sacrificio/genoc/${loteNo}`);
  public getGenOCSub = (nLote: number) =>
    this.instance.get(`/guia_sacrificio/genocsub/${nLote}`);
  public postGenOC = (data: any) =>
    this.instance.post('/guia_sacrificio/genoc/', data);
  public putGenOC = (loteNo: number, data: any) =>
    this.instance.put(`/guia_sacrificio/genoc/${loteNo}`, data);
  public putOnLoadGenOC = () =>
    this.instance.put('/guia_sacrificio/genoc/onLoad');
  public putGeneraGenOC = (data: any) =>
    this.instance.put('/guia_sacrificio/genoc/gen', data);
  public getGenPrecPieLot2 = () =>
    this.instance.get('/guia_sacrificio/genprecpielote2/');
  public putActualizarWGenPrecPieLot2 = (nGuia: number) =>
    this.instance.put(`/guia_sacrificio/genprecpielote2/actualizaW/${nGuia}`);
  public putRecalcualarGenPrecPieLot2 = (nGuia: number, data: any) =>
    this.instance.put(
      `/guia_sacrificio/genprecpielote2/recalcularPromedio/${nGuia}`,
      data,
    );
  public getBuscarClienteOrdCompraSLCs = (skip: number, limit: number) =>
    this.instance.get(
      `/guia_sacrificio/ordcomprasl/cons/busClient?skip=${skip}&limit=${limit}`,
    );
  public getOrdCompraSLCs = (idConsecutivo: number) =>
    this.instance.get(
      `/guia_sacrificio/ordcomprasl/cons/afterUpdateBusClient/${idConsecutivo}`,
    );
  public getIdCodigoOrdCompraSLSubDt = () =>
    this.instance.get('/guia_sacrificio/ordcompraslsubdt/idCodigo');
  public getOrdCompraSLSubDt = (idConcecutivo: number) =>
    this.instance.get(`/guia_sacrificio/ordcompraslsubdt/${idConcecutivo}`);
  public getOrdCompraSLSubDtUs = (idConcecutivo: number) =>
    this.instance.get(`/guia_sacrificio/ordcompraslsubdtus/${idConcecutivo}`);
  public getTipoMovOrdCompraSLCs = () =>
    this.instance.get('/guia_sacrificio/ordcomprasl/tipoMovs');
  public getReteFuenteOrdCompraSLCs = () =>
    this.instance.get('/guia_sacrificio/ordcomprasl/retefuente');
  public getNitCcOrdCompraSLCs = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          codProveedor: string;
          expr1: string;
          nitoCC: string;
          plazoPactado: number;
          regimenTrib: number;
          esAutoretenedor: boolean;
        }>
      >
    >('/guia_sacrificio/ordcomprasl/nitoCC', { params });
  public getNitCcOrdCompraSLCsFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          codProveedor: string;
          expr1: string;
          nitoCC: string;
          plazoPactado: number;
          regimenTrib: number;
          esAutoretenedor: boolean;
        }>
      >
    >('/guia_sacrificio/ordcomprasl/nitoCCByText', { params });
  public getNitCCodOrdCompraSLCs = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          codProveedor: string;
          expr1: string;
          nitoCC: string;
        }>
      >
    >('/guia_sacrificio/ordcomprasl/nitoCCod', { params });
  public getNitCCodOrdCompraSLCsFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          codProveedor: string;
          expr1: string;
          nitoCC: string;
        }>
      >
    >('/guia_sacrificio/ordcomprasl/nitoCCodByText', { params });
  public getNitCCPPOrdCompraSLCs = (params?: IPagination) =>
    this.instance.get<
      BaseResponse<
        Array<{
          codProveedor: number;
          expr1: string;
          expr2: string;
        }>
      >
    >('/guia_sacrificio/ordcomprasl/nitoCCPP', { params });
  public getNitCCPPOrdCompraSLCsFind = (params?: IQuery) =>
    this.instance.get<
      BaseResponse<
        Array<{
          codProveedor: number;
          expr1: string;
          expr2: string;
        }>
      >
    >('/guia_sacrificio/ordcomprasl/nitoCCPPByText', { params });
  public getNitCC22OrdCompraSLCs = () =>
    this.instance.get('/guia_sacrificio/ordcomprasl/nitoCC22');
  public getCountOrdCompraSLDt = (idConcecutivo: number) =>
    this.instance.get(
      `/guia_sacrificio/ordcomprasl/countMovMercanciaCpDet/${idConcecutivo}`,
    );
  public getCountOrdCompraSLDtUs = (idConcecutivo: number) =>
    this.instance.get(
      `/guia_sacrificio/ordcomprasl/countMovMercanciaCpDetUs/${idConcecutivo}`,
    );
  public getIdCodigoOrdCompraSLSubDtAfter = (id: string) =>
    this.instance.get(
      `/guia_sacrificio/ordcompraslsubdt/afterUpdateIdCodigo/${id}`,
    );
  public getTipoMovAfterOrdComprasSL = (tipoMov: number) =>
    this.instance.get(
      `/guia_sacrificio/ordcomprasl/afterUpdateTipoMov/${tipoMov}`,
    );
  public postOrdCompraSL = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcomprasl/', data);
  public postOrdCompraSLSubDt = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcompraslsubdt/', data);
  public postOrdCompraSLSubDtUs = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcompraslsubdtus', data);
  public postOrdCompraSLDtCreate = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcompraslsubdt/create', data);
  public postAnularOrdCompraSL = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcomprasl/anular', data);
  public postPrintOrdCompraSL = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcomprasl/print', data);
  public putonExitOrdCompraSLSubDt = (data: any) =>
    this.instance.put('/guia_sacrificio/ordcomprasl/onSubDtExit', data);
  public putonExitOrdCompraSLSubDtUs = (data: any) =>
    this.instance.put('/guia_sacrificio/ordcomprasl/onSubDtUsExit', data);
  public getOrdCompraSubImpr = (idConcecutivo: number) =>
    this.instance.get(`/guia_sacrificio/ordcomprasubimpr/${idConcecutivo}`);
  public getOrdCompraSubImpCta = (idConcecutivo: number) =>
    this.instance.get(`/guia_sacrificio/ordcomprasubimcta/${idConcecutivo}`);
  public getBuscarClienteOrdCompraSLMd = (skip: number, limit: number) =>
    this.instance.get(
      `/guia_sacrificio/ordcomprasl/mod/busClient?skip=${skip}&limit=${limit}`,
    );
  public getOrdCompraSLMd = (idConsecutivo: number) =>
    this.instance.get(
      `/guia_sacrificio/ordcomprasl/mod/afterUpdateBusClient/${idConsecutivo}`,
    );
  public putOrdCompraSLMd = (idConsecutivo: number, data: any) =>
    this.instance.put(`/guia_sacrificio/ordcomprasl/${idConsecutivo}`, data);
  public postOrdCompraSLMdModify = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcomprasl/mod/before_modify/', data);
  public postOrdCompraMdPrint = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcomprasl/mod/print/', data);
  public postOrdCompraSLMdAnular = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcomprasl/mod/anular', data);

  // ---OrdCompraGuia ---
  public getOrdCompraGuiaBuscarClient = () =>
    this.instance.get('/guia_sacrificio/ordcompraguia/busclient');
  public getOrdCompraGuia = (idConsecutivo: number) =>
    this.instance.get(`/guia_sacrificio/ordcompraguia/${idConsecutivo}`);
  public getOrdCompraGuiaNumDoc = () =>
    this.instance.get('/guia_sacrificio/ordcompraguia/numerodoc');
  public putOrdCompraGuiaAnular = (idConsecutivo: number, data: any) =>
    this.instance.put(
      `/guia_sacrificio/ordcompraguia/anular/${idConsecutivo}`,
      data,
    );
  public postOrdCompraGuiaPrint = (idConsecutivo: number, data: any) =>
    this.instance.post(
      `/guia_sacrificio/ordcompraguia/print/${idConsecutivo}`,
      data,
    );
  public postOrdCompraGuiaSub = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcompraguiasub/', data);
  public postOrdCompraGuiaSubNGuia = (nGuia: number) =>
    this.instance.post(
      `/guia_sacrificio/ordcompraguiasub/after_update/nguia/${nGuia}`,
    );
  public putOrdCompraGuiaSub = (
    idconsecutivo: number,
    autonum: number,
    data: any,
  ) =>
    this.instance.put(
      `/guia_sacrificio/ordcompraguiasub/${idconsecutivo}/${autonum}`,
      data,
    );
  public postOrdCompraGuia = (data: any) =>
    this.instance.post('/guia_sacrificio/ordcompraguia', data);
  public putOrdCompraGuia = (idConsecutivo: number, data: any) =>
    this.instance.put(`/guia_sacrificio/ordcompraguia/${idConsecutivo}`, data);

  // -- OrdCompraGuiaCs
  public getOrdCompraGuiaCsBuscarClient = () =>
    this.instance.get(`/guia_sacrificio/ordcompraguiacs/busclient`);
  public getOrdCompraGuiaCs = (idConsecutivo: number) =>
    this.instance.get(`/guia_sacrificio/ordcompraguia/${idConsecutivo}`);
  public getOrdCompraGuiaSubNGuia = () =>
    this.instance.get('/guia_sacrificio/ordcompraguiasub/nguia');
  public getOrdCompraGuiaSubRetefApli = () =>
    this.instance.get('/guia_sacrificio/ordcompraguiasub/retefapli');
  public getOrdCompraGuiaSub = (idconsecutivo: number) =>
    this.instance.get(`/guia_sacrificio/ordcompraguiasub/${idconsecutivo}`);
  public getOrdCompraGuiaSub2 = (idConsecutivo: number) =>
    this.instance.get(`/guia_sacrificio/ordcompraguiasub2/${idConsecutivo}`);
  public getOrdCompraGuiaSub3 = (idConsecutivo: number) =>
    this.instance.get(`/guia_sacrificio/ordcompraguiasub3/${idConsecutivo}`);
  public getOrdCompraGuiaSub4 = () =>
    this.instance.get('/guia_sacrificio/ordcompraguiasub4/');
  public getOrdCompraGuiaSub5 = (idConsecutivo: number) =>
    this.instance.get(`/guia_sacrificio/ordcompraguiasub5/${idConsecutivo}`);

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
