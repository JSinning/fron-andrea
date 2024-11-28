<!-- */ Copyright (©) Andrea.com.co - All Rights Reserved * Unauthorized copying
of this file, via any medium is strictly prohibited. * Proprietary and
confidential. * Written and developed with ❤️ by Andrea.com.co * 2020 /* -->
<template>
  <div class="container mx-auto">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox
        :output="output.message"
        :isError="output.isError"
        @empty="output.message = ''"
      />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 md:w-1/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Entrada vehiculos</h1>
        </div>
      </div>

      <div class="flex-wrap">
        <div class="flex flex-row flex-wrap mb-3">
          <div class="flex flex-row flex-wrap p-3 w-full justify-end">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Buscar ID Entrada No:</label>
              <PaginatedSelect
                v-model="idPesaje"
                :fetch="fetchIdPesajes"
                @change="fetchFormData"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="onNewRecord">
            Adicionar registro
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="save" :disabled="isFormLocked">
            Guardar
          </button>
          <button
            class="btn-primary"
            @click="modify"
            :disabled="idPesaje === 0"
          >
            Modificar registro
          </button>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos-Vehiculo-DCJ"
        class="hidden"
        checked
      />
      <input type="radio" name="tab" id="imprimir-DCJ" class="hidden" />

      <div class="mt-2 mb-0 nav">
        <label for="datos-Vehiculo-DCJ">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos vehiculo
          </span>
        </label>

        <label for="imprimir-DCJ">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Imprimir
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-Vehiculo-DCJ">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Entrada Vehiculo No:</label>
            <input type="text" class="input" readonly v-model="idPesaje" />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Documento (C - F)</label>
            <input
              type="text"
              class="input"
              ref="documentRef"
              v-model="data.document"
              :readonly="isFormLocked"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha movimiento</label>
            <input
              type="date"
              class="input"
              v-model="data.fechaPes"
              :readonly="isFormLocked"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Placa vehiculo</label>
            <input
              type="text"
              class="input"
              v-model="data.placaVeh"
              :readonly="isFormLocked"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Tipo vehiculo</label>
            <PaginatedSelect
              v-model="data.tipoVeh"
              :fetch="fetchTiposVehiculos"
              :disabled="isFormLocked"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Tipo transporte</label>
            <select
              class="select"
              v-model="data.tipoTranspPoFs"
              :disabled="isFormLocked"
            >
              <option value="P">Cliente</option>
              <option value="F">Frigosinu</option>
            </select>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Transportador</label>
            <input
              type="text"
              class="input"
              v-model="data.transportador"
              :readonly="isFormLocked"
            />
          </div>

          <div class="w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Conductor:</label>
            <PaginatedSelectGroup
              class="flex gap-4 w-full"
              v-model="data.conductorV"
              @change="afterUpdateConductor"
            >
              <PaginatedSelectGroupItem
                class="flex-1"
                :fetch="fetchConductores1"
                :disabled="isFormLocked"
              />
              <PaginatedSelectGroupItem
                class="flex-1"
                :fetch="fetchConductores2"
                :disabled="isFormLocked"
              />
            </PaginatedSelectGroup>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Quien lo programo:</label>
            <input
              type="text"
              class="input"
              v-model="data.persProgramo"
              :readonly="isFormLocked"
            />
          </div>
        </div>
        <div class="flex-wrap">
          <div class="flex flex-row flex-wrap mb-3">
            <div class="flex flex-row flex-wrap p-3 w-full justify-center">
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base"
                  >Fecha y hora entrada pesaje</label
                >
                <input
                  type="datetime-local"
                  class="input p-1 text-base"
                  v-model="data.fechaHoraE"
                  :readonly="isFormLocked"
                />
              </div>
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base">Peso entrada</label>
                <input
                  type="text"
                  class="input p-1 text-base"
                  v-model="data.pesoEntr"
                  :readonly="isFormLocked"
                />
              </div>
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base">Estado</label>
                <select class="select text-base" v-model="data.estadoV">
                  <option value="E">En proceso</option>
                  <option value="F">Finalizado</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-imprimir-DCJ">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Realizo</label>
              <input
                type="text"
                class="input"
                v-model="data.realizo"
                :readonly="isFormLocked"
              />
            </div>

            <div class="md:w-80 px-3 mb-6 md:mb-0">
              <label class="label">Observaciones</label>
              <input
                type="text"
                class="input"
                v-model="data.observacion"
                :readonly="isFormLocked"
              />
            </div>

            <div>
              <button class="btn-save" @click="print">
                Imprimir preliminar
              </button>
              <button
                class="btn-primary"
                @click="showModalDefinitivePrint = true"
              >
                Imprimir definitiva
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap justify-between">
        <div class="flex flex-row relative items-center">
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
        <div>
          <label class="label text-center text-2xl -ml-2">BASCULA</label>
          <input
            type="number"
            class="input py-0 -mt-2 border-transparent text-red-700 text-2xl text-center"
            @change="onBasculaChange"
            placeholder=",00"
            v-model="pesoBascula"
            :disabled="!canEditPeso"
          />
        </div>
      </div>
    </div>
    <ModalPDFPreview
      :pdfData="pdfData"
      @close="showModalPDF = false"
      v-if="showModalPDF"
    />
    <BModal
      v-show="showModalDefinitivePrint"
      :prompt="`Esta Seguro de Confirmar la Impresion del ID Entrada No ${idPesaje}`"
      @on-yes="onDefinitivePrint"
      @on-no="showModalDefinitivePrint = false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import PaginatedSelectGroup from '@/components/reusable/PaginatedSelectGroup.vue';
import PaginatedSelectGroupItem from '@/components/reusable/PaginatedSelectGroupItem.vue';
import '../../assets/tab.css';
import { ITblDCjControlV } from '@/remote/api/despacho_caja/types/ITblDCjControlV';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import IPagination from '@/types/IPagination';
import { captureException } from '@sentry/core';
import moment from 'moment';
import BModal from '../reusable/BModal.vue';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import { BaseResponse } from '@/types';
import ReportesDespachosCajasApi from '@/remote/api/despacho_caja/reportesDespachosCajas';
import IQuery from '@/types/query';

const { ipcRenderer } = window;

@Component({
  components: {
    AlertBox,
    BModal,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
    PaginatedSelectGroup,
    PaginatedSelectGroupItem,
  },
  name: 'DCControlVeh',
})
export default class DCControlVehSalid extends Vue {
  @Ref('documentRef') public readonly documentRef: HTMLInputElement;
  @Ref('connectPort') public readonly btnConnectPort!: HTMLButtonElement;
  public idPesaje = 0;
  public output = {
    isError: false,
    message: '',
  };
  public isLoading = false;
  public isFormLocked = true;
  public pdfData = '';
  public showModalPDF = false;
  public showModalDefinitivePrint = false;
  public canEditPeso = false;
  public isNewRecord = false;
  public data: ITblDCjControlV = {
    anulado: false,
    ciudadDes: '',
    clienteUs: '',
    conductorV: '',
    document: '',
    estacion: '',
    estadoV: '',
    fechaG: '',
    fechaHoraE: '',
    fechaHoraS: '',
    fechaPes: '',
    idPesaje: this.idPesaje,
    motiAnul: '',
    observacion: '',
    persProgramo: '',
    pesoEntr: 0,
    pesoSali: 0,
    placaVeh: '',
    procesado: false,
    realizo: '',
    tipoProdu: 0,
    tipoTranspPoFs: '',
    tipoVeh: 0,
    transportador: '',
    usuarioV: '',
  };
  public ports: any[] = [];
  public portPath: string = '';
  public isPortConnected: boolean = false;
  public pesoBascula: number = 0.0;
  public peso: number = 0;
  public pesoEntr: string = '0';

  private despachoCajasRerportesApi = new ReportesDespachosCajasApi(
    this.$store.getters.getAuthToken,
  );

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );
  public async fetchIdPesajes(
    p?: IPagination,
    q?: IQuery,
  ): Promise<IInterfaceSelect[]> {
    let res: BaseResponse<
      Array<{
        idPesaje: number;
        placaVeh: string;
        fechaPes: string;
        nombreCond: string;
        procesado: boolean;
        anulado: boolean;
      }>
    >;
    if (q.query) {
      res = await this.despachoCajaApi.DCControlVeh.getFindIdPesajeDataFind(q);
      return res.data.map<IInterfaceSelect>((d) => ({
        id: d.idPesaje,
        item: [
          d.idPesaje,
          d.placaVeh,
          d.procesado ? 'Verdadero' : 'Falso',
        ].join(' | '),
      }));
    }
    res = await this.despachoCajaApi.DCControlVeh.getFindIdPesajeData(p);
    return res.data.map<IInterfaceSelect>((d) => ({
      id: d.idPesaje,
      item: [d.idPesaje, d.placaVeh, d.procesado ? 'Verdadero' : 'Falso'].join(
        ' | ',
      ),
    }));
  }
  public async fetchFormData(): Promise<void> {
    try {
      this.isLoading = true;
      const res = await this.despachoCajaApi.DCControlVeh.getFormData(
        this.idPesaje,
      );
      this.data = {
        ...res.data,
        fechaHoraE: res.data.fechaHoraE
          ? moment(res.data.fechaHoraE).utc().format('YYYY-MM-DDTHH:mm:ss')
          : '',
        fechaHoraS: res.data.fechaHoraS
          ? moment(res.data.fechaHoraS).utc().format('YYYY-MM-DDTHH:mm:ss')
          : '',
        fechaPes: res.data.fechaPes
          ? moment(res.data.fechaPes).utc().format('YYYY-MM-DD')
          : '',
      };
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: 'Error al obtener datos de formulario',
      };
    } finally {
      this.isLoading = false;
    }
  }
  public async fetchTiposVehiculos(
    p?: IPagination,
    q?: IQuery,
  ): Promise<IInterfaceSelect[]> {
    let res: BaseResponse<
      Array<{
        idTipo: number;
        descripTipo: string;
        capacidadKil: number;
      }>
    >;
    if (q.query) {
      res = await this.despachoCajaApi.ControlVehGenF.getTiposVehiculosFind(q);
      return res.data.map<IInterfaceSelect>((d) => ({
        id: d.idTipo,
        item: d.descripTipo,
      }));
    }
    res = await this.despachoCajaApi.ControlVehGenF.getTiposVehiculos(p);
    return res.data.map<IInterfaceSelect>((d) => ({
      id: d.idTipo,
      item: d.descripTipo,
    }));
  }
  public async fetchConductores1(
    p?: IPagination,
    q?: IQuery,
  ): Promise<IInterfaceSelect[]> {
    let res: BaseResponse<Array<{ nitConduc: string; nombreCond: string }>>;
    if (q.query) {
      res = await this.despachoCajaApi.ControlVehGenF.getConductoresFind(q);
      return res.data.map<IInterfaceSelect>((d) => ({
        id: d.nitConduc,
        item: d.nitConduc,
      }));
    }
    res = await this.despachoCajaApi.ControlVehGenF.getConductores(p);
    return res.data.map<IInterfaceSelect>((d) => ({
      id: d.nitConduc,
      item: d.nitConduc,
    }));
  }

  public async fetchConductores2(
    p?: IPagination,
    q?: IQuery,
  ): Promise<IInterfaceSelect[]> {
    let res: BaseResponse<Array<{ nitConduc: string; nombreCond: string }>>;
    if (q.query) {
      res = await this.despachoCajaApi.ControlVehGenF.getConductoresFind(q);
      return res.data.map<IInterfaceSelect>((d) => ({
        id: d.nitConduc,
        item: d.nombreCond,
      }));
    }
    res = await this.despachoCajaApi.ControlVehGenF.getConductores(p);
    return res.data.map<IInterfaceSelect>((d) => ({
      id: d.nitConduc,
      item: d.nombreCond,
    }));
  }
  public async print() {
    try {
      this.isLoading = true;
      const res = await this.despachoCajasRerportesApi.getDCControlVeh(
        this.idPesaje,
      );
      this.pdfData = res.data;
      this.showModalPDF = true;
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: `Error al obtener datos de reporte: ${e?.message}`,
      };
    } finally {
      this.isLoading = false;
    }
  }
  public async onDefinitivePrint() {
    try {
      this.isLoading = true;
      this.data.procesado = true;
      await this.despachoCajaApi.DCControlVeh.put(this.idPesaje, this.data);
      const pdf = await this.despachoCajasRerportesApi.getDCControlVeh(
        this.idPesaje,
      );
      this.pdfData = pdf.data;
      this.showModalPDF = true;
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: `Error al imprimir definitvamente ${e?.message}`,
      };
    } finally {
      this.isLoading = false;
      this.showModalDefinitivePrint = false;
    }
  }
  public modify() {
    this.isFormLocked = false;
    this.documentRef.focus();
  }
  public async save() {
    this.isLoading = true;
    if (!this.data.placaVeh || this.data.placaVeh === '') {
      this.output = {
        isError: true,
        message: 'La placa no puede ser nula',
      };
      this.isLoading = false;
      return;
    }
    const fechaPes = new Date(this.data.fechaPes).getTime();
    const fecha1 = new Date(this.$store.getters.getTConfinv1.fecha1).getTime();
    const fecha2 = new Date(this.$store.getters.getTConfinv1.fecha2).getTime();
    if (fechaPes < fecha1 || fechaPes > fecha2) {
      this.output = {
        isError: true,
        message: 'La fecha está fuera del límite permitido',
      };
      this.isLoading = false;
      return;
    }
    this.data.fechaG = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
      let res: BaseResponse<ITblDCjControlV>;

      if (this.isNewRecord) {
        res = await this.despachoCajaApi.DCControlVeh.post({
          ...this.data,
          idPesaje: this.idPesaje,
        });
        this.isNewRecord = false;
      } else {
        res = await this.despachoCajaApi.DCControlVeh.put(
          this.idPesaje,
          this.data,
        );
      }

      if (res.statusCode === 200) {
        this.output = {
          isError: false,
          message: res.message,
        };
      }

      this.isFormLocked = true;
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: `Error al guardar datos: ${e?.message}`,
      };
    } finally {
      this.isLoading = false;
      this.showModalDefinitivePrint = false;
    }
  }
  public async onNewRecord() {
    this.isLoading = true;
    this.isFormLocked = false;
    try {
      const res = await this.despachoCajaApi.DCControlVeh.getMaxIdPesaje();
      this.idPesaje = res.data;
      this.data = {
        anulado: false,
        ciudadDes: '',
        clienteUs: '',
        conductorV: '',
        document: '',
        estacion: '',
        estadoV: 'E',
        fechaG: '',
        fechaHoraE: moment().format('YYYY-MM-DDTHH:mm:ss'),
        fechaHoraS: '',
        fechaPes: '',
        idPesaje: this.idPesaje,
        motiAnul: '',
        observacion: '',
        persProgramo: '',
        pesoEntr: 0,
        pesoSali: 0,
        placaVeh: '',
        procesado: false,
        realizo: '',
        tipoProdu: 0,
        tipoTranspPoFs: '',
        tipoVeh: 0,
        transportador: '',
        usuarioV: '',
      };
      this.isNewRecord = true;
      this.documentRef.focus();
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: `Error al crear nuevo record: ${e?.message}`,
      };
    } finally {
      this.isLoading = false;
    }
  }
  public async afterUpdateConductor() {
    try {
      await this.despachoCajaApi.DCControlVeh.afterUpdateNitConduc(
        this.data.conductorV,
      );
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: `Error al revisar conductor: ${e?.message}`,
      };
    }
  }
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
  public async mounted() {
    this.canEditPeso = this.$store.getters.getTConfinv1.puedeMod;
    window.addEventListener('keydown', this.onKeydownEvent);
    this.ports = await this.$serial.getCOMPorts();
    this._serialPortListener();
    // Tries to connect to port if exist on the local storage
    const portFromLocalDB = await this.$local.getCurrentBasculaConnectionPort();
    if (portFromLocalDB !== undefined && portFromLocalDB !== '') {
      this.portPath = portFromLocalDB;
      this.btnConnectPort.click();
    }
  }
  public beforeDestroy() {
    window.removeEventListener('keydown', this.onKeydownEvent);
    ipcRenderer.removeAllListeners('port_connected');
    ipcRenderer.removeAllListeners('serial_data_utf8');
  }
  //  Implemet Functions for weighing
  public connectToPort() {
    if (this.portPath === '') {
      this.output = {
        isError: false,
        message: 'Debe seleccionar un puerto al cual conectarse.',
      };
      return;
    }
    this.$serial.connectToPort(this.portPath);
  }
  public onBasculaChange() {
    this.data.pesoEntr = this.pesoBascula;
  }
  private pesoKilosB(peso: number) {
    this.pesoBascula = peso;
    this.data.pesoEntr = peso;
  }
  // Listens to serialcom data stream
  private _serialPortListener() {
    ipcRenderer.on('port_connected', async () => {
      const isPortOpen = await this.$serial.isPortOpen();
      if (!isPortOpen) {
        this.output = {
          isError: true,
          message:
            'No se ha podido establecer comunicación con el puerto seleccionado.',
        };
        this.isPortConnected = false;
        return;
      }
      this.isPortConnected = true;
      this.$local.saveCurrentBasculaConnectionPort(this.portPath);
    });
    ipcRenderer.on('serial_data_utf8', (_, data: string) => {
      this.peso = data as unknown as number;
      this.pesoKilosB(this.peso);
    });
  }
  private onKeydownEvent(e: KeyboardEvent) {
    switch (e.key) {
      case 'F1':
        this.output = {
          isError: false,
          message: 'F5 = COGER PESO DE LA BASCULA',
        };
        break;

      case 'F5':
        this.onBasculaChange();
        break;
    }
  }
}
</script>
