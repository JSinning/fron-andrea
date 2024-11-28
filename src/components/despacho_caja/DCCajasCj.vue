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
                @change="dCCajasCj(consecTip)"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="addRegistro">
            Adicionar Registro
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="modificar">Modificar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="save">Guardar</button>
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
              v-model="tblDCCajasCj.consecTip"
              disabled
              maxlength="4"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Documento(C-F):</label>
            <input
              type="text"
              class="input"
              v-model="tblDCCajasCj.document"
              :disabled="readonly"
              maxlength="10"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Es Propio:</label>
            <input
              type="checkbox"
              class="checkBox"
              v-model="tblDCCajasCj.esPropio"
              :disabled="readonly"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative md:w-10/12">
            <label class="label">Tercero:</label>
            <PaginatedSelect
              v-model="tblDCCajasCj.nitoCC"
              :fetch="terceros"
              :disabled="readonly"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Placa Vehiculo:</label>
            <input
              type="text"
              class="input"
              v-model="tblDCCajasCj.placaVeh"
              :disabled="readonly"
              maxlength="8"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label"> Transportador:: </label>
            <PaginatedSelect
              v-model="tblDCCajasCj.transportador"
              :fetch="transportadorNit"
              :disabled="readonly"
              @change="afterTransportador(tblDCCajasCj.transportador)"
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/2">
            <PaginatedSelect
              class="mt-4 px-3"
              :fetch="transportadorName"
              v-model="tblDCCajasCj.transportador"
              :disabled="readonly"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-10/12">
            <label class="label">Ciudad Envio:</label>
            <PaginatedSelect
              v-model="tblDCCajasCj.ciudadEnvio"
              :fetch="ciudades"
              :disabled="readonly"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-10/12">
            <label class="label">Pais Envio:</label>
            <PaginatedSelect
              v-model="tblDCCajasCj.paisEnvio"
              :fetch="paises"
              :disabled="readonly"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label">Fecha de Movimiento:</label>
            <input
              type="date"
              class="input"
              v-model="tblDCCajasCj.fechaMov"
              :disabled="readonly"
              maxlength="4"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-1/2">
            <label class="label">Horometro:</label>
            <input
              type="text"
              class="input"
              v-model="tblDCCajasCj.horometro"
              :disabled="readonly"
              maxlength="10"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-56">
            <label class="label">Conductor: </label>
            <PaginatedSelect
              v-model="tblDCCajasCj.cCConduct"
              :fetch="conductoresNit"
              :disabled="readonly"
              @change="afterConductores(tblDCCajasCj.cCConduct)"
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/2">
            <PaginatedSelect
              v-model="tblDCCajasCj.cCConduct"
              :fetch="conductoresName"
              @change="afterConductores(tblDCCajasCj.cCConduct)"
              :disabled="readonly"
              class="mt-4 px-3"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap w-full">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label">Precinto Invima:: </label>
            <input
              type="text"
              class="input"
              v-model="tblDCCajasCj.precintoInv"
              :disabled="readonly"
              maxlength="12"
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-1/2">
            <label class="label">Precinto Frigosinu:</label>
            <input
              type="text"
              class="input"
              v-model="tblDCCajasCj.precintoFs"
              :disabled="readonly"
              maxlength="12"
            />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-detalles-DCJ">
        <DCCajasCjDet
          :consecTip="consecTip"
          :key="consecTip"
          :readonly="readonly"
          :viewAddRegistro="viewAddRegistro"
        />
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-otrosPesoVehiculos-DCJ">
        <DCCajasCjDet3
          :consecTip="consecTip"
          :key="consecTip"
          :readonly="readonly"
          :viewAddRegistro="viewAddRegistro"
        />
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-imprimir-DCJ">
        <div class="flex flex-row flex-wrap w-1/2">
          <div class="flex flex-col flex-wrap">
            <div class="px-3 mb-6 md:mb-0 inline-block relative">
              <label class="label">Despacho:</label>
              <input
                type="text"
                class="input"
                v-model="tblDCCajasCj.entrego"
                :disabled="readonly"
                maxlength="25"
              />
            </div>
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Observaciónes:</label>
              <input
                type="text"
                class="input"
                v-model="tblDCCajasCj.observaciones"
                :disabled="readonly"
                maxlength="100"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-row flex-wrap w-1/2">
          <button class="btn-save" @click="onPrintPreliminar">
            Informe Preliminar
          </button>
          <button class="btn-save" @click="printDefinitivo">
            Informe Definitivo
          </button>
        </div>

        <div class="pt-4"></div>
        <div class="pt-4"></div>

        <div
          class="flex flex-row flex-wrap"
          style="visibility: collapse; display: none"
        >
          <div class="px-3 mb-6 md:mb-0 inline-block relative">
            <button class="btn-save p-5" @click="onPrintControlIntreno">
              Informe Preliminar (Control Interno)
            </button>
          </div>
        </div>

        <div class="flex flex-row flex-wrap">
          <button class="btn-save p-5" @click="onPrintLotes">
            Informe por Lotes
          </button>
        </div>
      </div>

      <hr />

      <div class="flex flex-row flex-wrap justify-between">
        <div class="flex flex-row inline-block relative items-center">
          <button class="btn-save" @click="disconnectPort">Desconectar</button>
          <select
            class="select mt-1"
            v-model="portPath"
            @focus="discoverPorts()"
            @blur="discoverPorts"
          >
            <option
              v-for="(port, index) in ports"
              v-bind:value="port.path"
              v-bind:key="`port-${index}`"
            >
              {{ port.path }}
            </option>
          </select>
          <button
            ref="connectPort"
            class="btn-save ml-2 md:ml-1"
            @click="connectToPort"
          >
            Conectar
          </button>
          <input
            type="text"
            disabled
            class="input w-1/2 md:mt-1"
            v-model="connectedDisconnected"
          />
        </div>
      </div>
    </div>

    <Modals
      :openModal="viewPrintDefinitive"
      @Ok="aceptarPrint"
      @close="() => (viewPrintDefinitive = false)"
    >
      Esta Seguro de Confirmar el Despacho Caja No
      {{ tblDCCajasCj.consecTip }}</Modals
    >

    <!-- Modal view Pdf -->
    <ModalPDFPreview
      :pdfData="rptDespachoCajasPdfBase64"
      @close="rptDespachoCajasPdfBase64 = ''"
      v-if="rptDespachoCajasPdfBase64.length > 0"
    />
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import DCCajasCjDet from '@/components/despacho_caja/DCCajasCjDet.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import DCCajasCjDet3 from '@/components/despacho_caja/DCCajasCjDet3.vue';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
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
import { IConductor } from '@/remote/api/guia_sacrificio/type/Conductor';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { captureException } from '@sentry/browser';
import convertDate from '@/utils/convertDate';
import convertToDecimal from '@/utils/convertToDecimal';
import moment from 'moment';
import Modals from '@/components/reusable/Modals.vue';
import ReportesDespachosCajasApi from '@/remote/api/despacho_caja/reportesDespachosCajas';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

const { ipcRenderer } = window;

@Component({
  components: {
    AlertBox,
    DCCajasCjDet,
    DCCajasCjDet3,
    Loader,
    ModalPDFPreview,
    Modals,
    PaginatedSelect,
  },
  name: 'DCCajasCj',
})
export default class DCCajasCj extends Vue {
  @Ref('connectPort') private readonly btnConnectPort!: HTMLButtonElement;
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private viewAddRegistro: boolean = true;
  private readonly = true;
  private viewPrintDefinitive: boolean = false;

  private ports: any[] = [];
  private portPath: string = '';
  private isPortConnected: boolean = false;
  private pesoBascula: number = 0.0;
  private peso: number = 0;

  private pesoEntr: string = '0';

  private consecTip: number = 0;
  private rptDespachoCajasPdfBase64: string = '';

  private tblDCCajasCj: ITblDCjDespacCaja = {
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

  public disconnectPort() {
    this.$serial.disconnectPort();
    this.isPortConnected = false;
  }

  public async discoverPorts() {
    this.ports = await this.$serial.getCOMPorts();
  }

  public get connectedDisconnected() {
    return this.isPortConnected ? 'Conectado' : 'Desconectado';
  }

  private async mounted() {
    this.ports = await this.$serial.getCOMPorts();
    this._serialPortListener();
    // Tries to connect to port if exist on the local storage
    const portFromLocalDB = await this.$local.getCurrentBasculaConnectionPort();
    if (portFromLocalDB !== undefined && portFromLocalDB !== '') {
      this.portPath = portFromLocalDB;
      this.btnConnectPort.click();
    }
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(isError: boolean, message: string) {
    this.output = message;
    this.isError = isError;
  }

  private modificar() {
    if (
      convertDate(this.tblDCCajasCj.fechaMov) <
        convertDate(this.$store.getters.getTConfinv1.fecha1) ||
      convertDate(this.tblDCCajasCj.fechaMov) >
        convertDate(this.$store.getters.getTConfinv1.fecha2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }

    if (this.tblDCCajasCj.anulada) {
      this.showOutput(true, 'Documento Anulado');
      return;
    }

    if (this.tblDCCajasCj.procesado) {
      this.showOutput(true, 'Documento Procesado"');
      return;
    }

    this.readonly = false;
    this.viewAddRegistro = false;
  }

  private async aceptarPrint() {
    this.tblDCCajasCj.procesado = true;
    this.tblDCCajasCj.observaciones2 = 'Confirmado';

    await this.upadateDCCajasCj();

    this.viewPrintDefinitive = false;

    await this.onPrintDefinitivo();
  }

  private async printDefinitivo() {
    if (!this.tblDCCajasCj.consecTip) {
      this.showOutput(true, 'Debe Digitar No de despacho de la caja');
      return;
    }

    if (this.tblDCCajasCj.procesado) {
      await this.onPrintDefinitivo();
      return;
    }
    this.viewPrintDefinitive = true;
  }

  private async addRegistro() {
    this.clearData();
    this.readonly = false;
    this.viewAddRegistro = false;
    await this.maxNumbre();
    this.consecTip = 0;
  }

  private async maxNumbre() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCCajasCj.getMaxConsecTip();
      this.tblDCCajasCj.consecTip = response.data;
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async save() {
    if (this.validateData()) {
      return;
    }

    if (!this.consecTip) {
      this.tblDCCajasCj.fecha = moment().utc().format('YYYY-MM-DD');
      this.tblDCCajasCj.estacion = this.$store.getters.getUsuario;
      await this.addDCCajasCj();
      return;
    }

    await this.upadateDCCajasCj();
  }

  private async upadateDCCajasCj() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCCajasCj.putDCCajasCj(
        this.tblDCCajasCj,
        this.consecTip,
      );

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async addDCCajasCj() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCCajasCj.postDCCajasCj(
        this.tblDCCajasCj,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async dCCajasCj(consecTip: number) {
    this.isLoading = true;
    try {
      const response =
        await this.despachoCajaApi.dCCajasCj.getAfterBuscarCliente(consecTip);
      this.tblDCCajasCj = response.data;
      this.tblDCCajasCj.fechaMov = convertDate(this.tblDCCajasCj.fechaMov);

      this.readonly = true;
      this.viewAddRegistro = true;
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
          await this.despachoCajaApi.dCCajasCj.getBuscarClientesFind(q);
        return response.data.map<IInterfaceSelect>(
          (
            e: Pick<IBuscarClientesDCCj, 'consecTip' | 'fechaMov' | 'tercero'>,
          ) => ({
            id: e.consecTip,
            item: `${e.consecTip} - ${convertDate(e.fechaMov)} - ${e.tercero}`,
          }),
        );
      }
      response = await this.despachoCajaApi.dCCajasCj.getBuscarClientes(p);
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
          await this.despachoCajaApi.dCCajasCjSelects.getTrecerosFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ITerceros, 'codiCliente' | 'expr2'>) => ({
            id: e.codiCliente,
            item: `${e.expr2}`,
          }),
        );
      }
      response = await this.despachoCajaApi.dCCajasCjSelects.getTreceros(p);
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
          await this.despachoCajaApi.dCCajasCjSelects.getTransportadorFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ITransportad, 'idTransporta'>) => ({
            id: e.idTransporta,
            item: `${e.idTransporta}`,
          }),
        );
      }
      response =
        await this.despachoCajaApi.dCCajasCjSelects.getTransportador(p);
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

  private async transportadorName(p?: IPagination) {
    try {
      const response =
        await this.despachoCajaApi.dCCajasCjSelects.getTransportador(p);
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
          await this.despachoCajaApi.dCCajasCjSelects.getCiudadesFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ICiudades, 'idCiudad' | 'descripcionCiu'>) => ({
            id: e.idCiudad,
            item: `${e.descripcionCiu}`,
          }),
        );
      }
      response = await this.despachoCajaApi.dCCajasCjSelects.getCiudades(p);
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
        response = await this.despachoCajaApi.dCCajasCjSelects.getPaisesFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IPaises, 'idPais' | 'descripcionPais'>) => ({
            id: e.idPais.toString(),
            item: `${e.descripcionPais}`,
          }),
        );
      }
      response = await this.despachoCajaApi.dCCajasCjSelects.getPaises(p);
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
          await this.despachoCajaApi.dCCajasCjSelects.getConductoresFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IConductor, 'nitConduc' | 'nombreCond'>) => ({
            id: e.nitConduc,
            item: `${e.nitConduc}`,
          }),
        );
      }
      response = await this.despachoCajaApi.dCCajasCjSelects.getConductores(p);
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
          await this.despachoCajaApi.dCCajasCjSelects.getConductoresFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IConductor, 'nitConduc' | 'nombreCond'>) => ({
            id: e.nitConduc,
            item: `${e.nombreCond}`,
          }),
        );
      }
      response = await this.despachoCajaApi.dCCajasCjSelects.getConductores(p);
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

  private async afterTransportador(id: string) {
    try {
      await this.despachoCajaApi.dCCajasCjSelects.afterTransportador(id);
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async afterConductores(id: string) {
    try {
      await this.despachoCajaApi.dCCajasCjSelects.afterConductores(id);
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  //  Implemet Functions for weighing
  private connectToPort() {
    if (this.portPath === '') {
      this.showOutput(false, 'Debe seleccionar un puerto al cual conectarse.');
      return;
    }
    this.$serial.connectToPort(this.portPath);
  }

  private onBasculaChanged() {
    this.pesoEntr = convertToDecimal(this.pesoBascula);
  }

  private pesoKilosB(peso: number) {
    this.pesoBascula = peso;
    this.pesoEntr = convertToDecimal(peso);
  }

  // Listens to serialcom data stream
  private _serialPortListener() {
    ipcRenderer.on('port_connected', async () => {
      const isPortOpen = await this.$serial.isPortOpen();
      if (!isPortOpen) {
        this.showOutput(
          true,
          'No se ha podido establecer comunicación con el puerto seleccionado.',
        );
        this.isPortConnected = false;
        return;
      }

      this.isPortConnected = true;
      this.$local.saveCurrentBasculaConnectionPort(this.portPath);
    });

    ipcRenderer.on('serial_data_utf8', (event, data: string) => {
      this.peso = data as unknown as number;
      this.pesoKilosB(this.peso);
    });
  }

  private validateData(): boolean {
    if (!this.tblDCCajasCj.nitoCC) {
      this.showOutput(true, '"La Relacion no Tiene Tercero');
      return true;
    }
    if (!this.tblDCCajasCj.consecTip) {
      this.showOutput(
        true,
        'El Despacho Caja no puede ser Cero, Escoja Tipo de Movimiento y Presione Enter',
      );
      return true;
    }

    if (!this.tblDCCajasCj.fechaMov) {
      this.showOutput(true, 'La Relacion no tien fecha de Movimiento');
      return true;
    }
    if (
      convertDate(this.tblDCCajasCj.fechaMov) <
        convertDate(this.$store.getters.getTConfinv1.fecha1) ||
      convertDate(this.tblDCCajasCj.fechaMov) >
        convertDate(this.$store.getters.getTConfinv1.fecha2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }
    return false;
  }

  private clearData() {
    this.tblDCCajasCj = {
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
  }

  private async onPrintLotes() {
    if (!this.tblDCCajasCj.consecTip) {
      this.showOutput(true, 'Debe Digitar No de despacho de la caja');
      return;
    }
    this.isLoading = true;
    try {
      const rptReproceso = await this.despachoCajasRerportesApi.getDespachoCjLt(
        this.tblDCCajasCj.consecTip,
      );
      this.rptDespachoCajasPdfBase64 = rptReproceso.data;
    } catch (err) {
      captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async onPrintControlIntreno() {
    if (!this.tblDCCajasCj.consecTip) {
      this.showOutput(true, 'Debe Digitar No de despacho de la caja');
      return;
    }
    this.isLoading = true;
    try {
      const rptReproceso = await this.despachoCajasRerportesApi.getDespachoCj(
        this.tblDCCajasCj.consecTip,
      );
      this.rptDespachoCajasPdfBase64 = rptReproceso.data;
    } catch (err) {
      captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async onPrintDefinitivo() {
    this.isLoading = true;
    try {
      const rptReproceso = await this.despachoCajasRerportesApi.getDespachoCj2(
        this.tblDCCajasCj.consecTip,
      );
      this.rptDespachoCajasPdfBase64 = rptReproceso.data;
    } catch (err) {
      captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async onPrintPreliminar() {
    if (!this.tblDCCajasCj.consecTip) {
      this.showOutput(true, 'Debe Digitar No de despacho de la caja');
      return;
    }
    this.isLoading = true;
    try {
      const rptReproceso = await this.despachoCajasRerportesApi.getDespachoCj2(
        this.tblDCCajasCj.consecTip,
      );
      this.rptDespachoCajasPdfBase64 = rptReproceso.data;
    } catch (err) {
      captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
