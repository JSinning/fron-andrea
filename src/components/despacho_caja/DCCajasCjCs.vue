<!--
  */
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 /*
 -->
<template>
  <div class="container mx-auto">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 md:w-1/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Despacho Cajas</h1>
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>
      </div>
      <div class="flex-wrap">
        <div class="flex flex-row flex-wrap mb-3">
          <div class="flex flex-row flex-wrap p-3 w-full justify-end">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Busqueda:</label>
              <PaginatedSelect
                v-model="consecTip"
                :fetch="buscarClientes"
                @change="dCCajasCjCs(consecTip)"
              />
            </div>
          </div>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos-Clientes-DCJ"
        class="hidden"
        checked
      />
      <input type="radio" name="tab" id="detalles-DCJ" class="hidden" />
      <input
        type="radio"
        name="tab"
        id="otrosPesoVehiculos-DCJ"
        class="hidden"
      />
      <input type="radio" name="tab" id="imprimir-DCJ" class="hidden" />

      <div class="mt-2 mb-0 nav">
        <label for="datos-Clientes-DCJ">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos Cliente
          </span>
        </label>

        <label for="detalles-DCJ">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Detalles Despacho Caja
          </span>
        </label>
        <label for="otrosPesoVehiculos-DCJ">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Otros Pesos Vehiculo
          </span>
        </label>
        <label for="imprimir-DCJ">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Imprimir
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-Clientes-DCJ">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0 inline-block relative">
            <label class="label">Despacho de Caja No:</label>
            <input
              type="text"
              class="input"
              v-model="tblDCCajasCjCs.consecTip"
              disabled
              maxlength="4"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Documento(C-F):</label>
            <input
              type="text"
              class="input"
              v-model="tblDCCajasCjCs.document"
              disabled
              maxlength="7"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Es Propio:</label>
            <input
              type="checkbox"
              class="checkBox"
              v-model="tblDCCajasCjCs.esPropio"
              disabled
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative md:w-10/12">
            <label class="label">Tercero:</label>
            <PaginatedSelect
              v-model="tblDCCajasCjCs.nitoCC"
              :fetch="terceros"
              disabled
            />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Placa Vehiculo:</label>
            <input
              type="text"
              class="input"
              v-model="tblDCCajasCjCs.placaVeh"
              disabled
              maxlength="4"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label"> Transportador:: </label>
            <PaginatedSelect
              v-model="tblDCCajasCjCs.transportador"
              :fetch="transportadorNit"
              disabled
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/2">
            <PaginatedSelect
              class="mt-4 px-3"
              v-model="tblDCCajasCjCs.transportador"
              :fetch="transportadorName"
              disabled
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-10/12">
            <label class="label">Ciudad Envio:</label>
            <PaginatedSelect
              v-model="tblDCCajasCjCs.ciudadEnvio"
              :fetch="ciudades"
              disabled
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-10/12">
            <label class="label">Pais Envio:</label>
            <PaginatedSelect
              v-model="tblDCCajasCjCs.paisEnvio"
              :fetch="paises"
              disabled
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label">Fecha de Movimiento:</label>
            <input
              type="date"
              class="input"
              v-model="tblDCCajasCjCs.fechaMov"
              disabled
              maxlength="4"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-1/2">
            <label class="label">Horometro:</label>
            <input
              type="text"
              class="input"
              v-model="tblDCCajasCjCs.horometro"
              disabled
              maxlength="7"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-56">
            <label class="label">Conductor: </label>
            <PaginatedSelect
              v-model="tblDCCajasCjCs.cCConduct"
              :fetch="conductoresNit"
              disabled
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/2">
            <PaginatedSelect
              class="mt-4 px-3"
              v-model="tblDCCajasCjCs.cCConduct"
              :fetch="conductoresName"
              disabled
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label">Precinto Invima:: </label>
            <input
              type="text"
              class="input"
              v-model="tblDCCajasCjCs.precintoInv"
              disabled
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label">Precinto Frigosinu:</label>
            <input
              type="text"
              class="input"
              v-model="tblDCCajasCjCs.precintoFs"
              disabled
            />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-detalles-DCJ">
        <DCCajasCjDetCs :consecTip="consecTip" :key="consecTip" />
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-otrosPesoVehiculos-DCJ">
        <DCCajasCjDet3Cs :consecTip="consecTip" />
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-imprimir-DCJ">
        <div class="flex flex-row flex-wrap w-1/2">
          <div class="flex flex-col flex-wrap">
            <div class="px-3 mb-6 md:mb-0 inline-block relative">
              <label class="label">Despacho:</label>
              <input
                type="text"
                class="input"
                v-model="tblDCCajasCjCs.entrego"
                disabled
                maxlength="4"
              />
            </div>
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Observaciónes:</label>
              <input
                type="text"
                class="input"
                v-model="tblDCCajasCjCs.observaciones"
                disabled
                maxlength="4"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-row flex-wrap w-1/2">
          <button class="btn-save" @click="rePrint">Reimprimir</button>
        </div>

        <div class="pt-4"></div>
        <div class="pt-4"></div>

        <div
          class="flex flex-row flex-wrap"
          style="visibility: collapse; display: none"
        >
          <div class="px-3 mb-6 md:mb-0 inline-block relative">
            <button class="btn-save p-5" @click="printPreliminar">
              Informe Preliminar (Control Interno)
            </button>
          </div>
        </div>

        <div
          class="flex flex-row flex-wrap"
          style="visibility: collapse; display: none"
        >
          <button class="btn-save p-5" @click="printLotes">
            Informe por Lotes
          </button>
        </div>
      </div>

      <hr />
    </div>

    <!-- Modal view Pdf -->
    <ModalPDFPreview
      :pdfData="rptDespachoCajasPdfBase64"
      @close="rptDespachoCajasPdfBase64 = ''"
      v-if="rptDespachoCajasPdfBase64.length > 0"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import '../../assets/tab.css';
import DCCajasCjDetCs from '@/components/despacho_caja/DCCajasCjDetCs.vue';
import DCCajasCjDet3Cs from '@/components/despacho_caja/DCCajasCjDet3Cs.vue';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import IPagination from '@/types/IPagination';
import { captureException } from '@sentry/browser';
import {
  IBuscarClientesDCCj,
  ICiudades,
  IConductores,
  IPaises,
  ITblDCjDespacCaja,
  ITerceros,
  ITransportad,
  ITransportador,
} from '@/remote/api/despacho_caja/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import convertDate from '@/utils/convertDate';
import { IConductor } from '@/remote/api/guia_sacrificio/type/Conductor';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import ReportesDespachosCajasApi from '@/remote/api/despacho_caja/reportesDespachosCajas';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    DCCajasCjDet3Cs,
    DCCajasCjDetCs,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
  },
  name: 'DCCajasCjCs',
})
export default class DCCajasCjCs extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private viewPrintDefinitive: boolean = false;
  private consecTip: number = 0;

  private rptDespachoCajasPdfBase64: string = '';

  private tblDCCajasCjCs: ITblDCjDespacCaja = {
    anulada: false,
    consecTip: 0,
    esPropio: false,
    fechaMov: '',
    grupoDesp: 0,
    idConcecutivo: 0,
    idPesajeV: 0,
    imprim: 'N',
    nitoCC: '',
    pedidoN: 0,
    placaVeh: '',
    procesado: false,
    turnoD: '',
  };

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );

  private despachoCajasRerportesApi = new ReportesDespachosCajasApi(
    this.$store.getters.getAuthToken,
  );

  private clearOutput() {
    this.output = '';
  }

  private showOutput(isError: boolean, message: string) {
    this.output = message;
    this.isError = isError;
  }

  private async rePrint() {
    if (!this.tblDCCajasCjCs.consecTip) {
      this.showOutput(true, 'Debe Digitar No de despacho de la caja');
      return;
    }
    this.isLoading = true;
    try {
      const rptReproceso = await this.despachoCajasRerportesApi.getDespachoCj2(
        this.tblDCCajasCjCs.consecTip,
      );
      this.rptDespachoCajasPdfBase64 = rptReproceso.data;
    } catch (err) {
      captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async printPreliminar() {
    if (!this.tblDCCajasCjCs.consecTip) {
      this.showOutput(true, 'Debe Digitar No de despacho de la caja');
      return;
    }
    this.isLoading = true;
    try {
      const rptReproceso = await this.despachoCajasRerportesApi.getDespachoCj(
        this.tblDCCajasCjCs.consecTip,
      );
      this.rptDespachoCajasPdfBase64 = rptReproceso.data;
    } catch (err) {
      captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async printLotes() {
    if (!this.tblDCCajasCjCs.consecTip) {
      this.showOutput(true, 'Debe Digitar No de despacho de la caja');
      return;
    }
    this.isLoading = true;
    try {
      const rptReproceso = await this.despachoCajasRerportesApi.getDespachoCjLt(
        this.tblDCCajasCjCs.consecTip,
      );
      this.rptDespachoCajasPdfBase64 = rptReproceso.data;
    } catch (err) {
      captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async dCCajasCjCs(consecTip: number) {
    this.isLoading = true;
    try {
      const response =
        await this.despachoCajaApi.dCCajasCjCs.getAfterBuscarCliente(consecTip);
      this.tblDCCajasCjCs = response.data;
      this.tblDCCajasCjCs.fechaMov = convertDate(this.tblDCCajasCjCs.fechaMov);
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async buscarClientes(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<IBuscarClientesDCCj, 'consecTip' | 'fechaMov' | 'tercero'>>
      >;
      if (q.query) {
        response =
          await this.despachoCajaApi.dCCajasCjCs.getBuscarClientesFind(q);
        return response.data.map<IInterfaceSelect>(
          (
            e: Pick<IBuscarClientesDCCj, 'consecTip' | 'fechaMov' | 'tercero'>,
          ) => ({
            id: e.consecTip,
            item: `${e.consecTip} - ${convertDate(e.fechaMov)} - ${e.tercero}`,
          }),
        );
      }
      response = await this.despachoCajaApi.dCCajasCjCs.getBuscarClientes(p);
      return response.data.map<IInterfaceSelect>(
        (
          e: Pick<IBuscarClientesDCCj, 'consecTip' | 'fechaMov' | 'tercero'>,
        ) => ({
          id: e.consecTip,
          item: `${e.consecTip} - ${convertDate(e.fechaMov)} - ${e.tercero}`,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async terceros(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<ITerceros[]>;
      if (q.query) {
        response =
          await this.despachoCajaApi.dCCajasCjCsSelects.getTrecerosFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ITerceros, 'codiCliente' | 'expr2'>) => ({
            id: e.codiCliente,
            item: `${e.expr2}`,
          }),
        );
      }
      response = await this.despachoCajaApi.dCCajasCjCsSelects.getTreceros(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<ITerceros, 'codiCliente' | 'expr2'>) => ({
          id: e.codiCliente,
          item: `${e.expr2}`,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async transportadorNit(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<ITransportador, 'idTransporta' | 'desctransport'>>
      >;
      if (q.query) {
        response =
          await this.despachoCajaApi.dCCajasCjCsSelects.getTransportadorFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ITransportad, 'idTransporta'>) => ({
            id: e.idTransporta,
            item: `${e.idTransporta}`,
          }),
        );
      }
      response =
        await this.despachoCajaApi.dCCajasCjCsSelects.getTransportador(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<ITransportad, 'idTransporta'>) => ({
          id: e.idTransporta,
          item: `${e.idTransporta}`,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async transportadorName(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<ITransportador, 'idTransporta' | 'desctransport'>>
      >;
      if (q.query) {
        response =
          await this.despachoCajaApi.dCCajasCjCsSelects.getTransportadorFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ITransportad, 'idTransporta' | 'desctransport'>) => ({
            id: e.idTransporta,
            item: `${e.desctransport}`,
          }),
        );
      }
      response =
        await this.despachoCajaApi.dCCajasCjCsSelects.getTransportador(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<ITransportad, 'idTransporta' | 'desctransport'>) => ({
          id: e.idTransporta,
          item: `${e.desctransport}`,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async ciudades(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<ICiudades[]>;
      if (q.query) {
        response =
          await this.despachoCajaApi.dCCajasCjCsSelects.getCiudadesFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ICiudades, 'idCiudad' | 'descripcionCiu'>) => ({
            id: e.idCiudad,
            item: `${e.descripcionCiu}`,
          }),
        );
      }
      response = await this.despachoCajaApi.dCCajasCjCsSelects.getCiudades(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<ICiudades, 'idCiudad' | 'descripcionCiu'>) => ({
          id: e.idCiudad,
          item: `${e.descripcionCiu}`,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async paises(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<IPaises[]>;
      if (q.query) {
        response =
          await this.despachoCajaApi.dCCajasCjCsSelects.getPaisesFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IPaises, 'idPais' | 'descripcionPais'>) => ({
            id: e.idPais.toString(),
            item: `${e.descripcionPais}`,
          }),
        );
      }
      response = await this.despachoCajaApi.dCCajasCjCsSelects.getPaises(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IPaises, 'idPais' | 'descripcionPais'>) => ({
          id: e.idPais.toString(),
          item: `${e.descripcionPais}`,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async conductoresNit(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<
          Pick<IConductores, 'nitConduc' | 'nombreCond'> & { expr1: string }
        >
      >;
      if (q.query) {
        response =
          await this.despachoCajaApi.dCCajasCjCsSelects.getConductoresFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IConductor, 'nitConduc' | 'nombreCond'>) => ({
            id: e.nitConduc,
            item: `${e.nitConduc}`,
          }),
        );
      }
      response =
        await this.despachoCajaApi.dCCajasCjCsSelects.getConductores(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IConductor, 'nitConduc' | 'nombreCond'>) => ({
          id: e.nitConduc,
          item: `${e.nitConduc}`,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async conductoresName(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<
          Pick<IConductores, 'nitConduc' | 'nombreCond'> & { expr1: string }
        >
      >;
      if (q.query) {
        response =
          await this.despachoCajaApi.dCCajasCjCsSelects.getConductoresFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IConductor, 'nitConduc' | 'nombreCond'>) => ({
            id: e.nitConduc,
            item: `${e.nombreCond}`,
          }),
        );
      }
      response =
        await this.despachoCajaApi.dCCajasCjCsSelects.getConductores(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IConductor, 'nitConduc' | 'nombreCond'>) => ({
          id: e.nitConduc,
          item: `${e.nombreCond}`,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }
}
</script>
