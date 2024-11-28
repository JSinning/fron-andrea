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
          <h1 class="title">Entrada vehiculos</h1>
        </div>
      </div>

      <div class="flex-wrap">
        <div class="flex flex-row flex-wrap mb-3">
          <div class="flex flex-row flex-wrap p-3 w-full justify-end">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <Select
                :isItems="search"
                v-model="id"
                :value="id"
                @changed="dcControlVehIdPesaje(id)"
                >Busqueda ID entrada No:</Select
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="addRegister">
            Adicionar registro
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="addDCControlVeh">Guardar</button>
          <button class="btn-primary" @click="modifyRegister">
            Modificar registro
          </button>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos_basicos"
        class="hidden"
        checked
      />
      <input type="radio" name="tab" id="imprimir" class="hidden" />

      <div class="mt-2 mb-0 nav">
        <label for="datos_basicos">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos vehiculo
          </span>
        </label>

        <label for="imprimir">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Imprimir
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Entrada Vehiculo No:</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVeh.idPesaje"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Documento (C - F)</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVeh.document"
              :readonly="readonly"
              ref="documentRef"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha movimiento</label>
            <input
              type="date"
              class="input"
              v-model="dcControlVeh.fechaPes"
              :readonly="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Placa vehiculo</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVeh.placaVeh"
              :readonly="readonly"
            />
          </div>
          <div class="w-full px-3 mb-6 md:mb-0">
            <label class="label">Usuario:</label>
            <div class="flex gap-4">
              <div class="flex gap-4 w-1/2">
                <PaginatedSelect
                  class="flex-1"
                  v-model="dcControlVeh.clienteUs"
                  :fetch="itemClienteUs"
                />
                <PaginatedSelect
                  class="flex-1"
                  v-model="dcControlVeh.clienteUs"
                  :fetch="itemClienteUsCod"
                />
              </div>
              <PaginatedSelect
                class="w-1/2"
                v-model="dcControlVeh.clienteUs"
                :fetch="itemClienteUsName"
              />
            </div>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Tipo vehiculo</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="dcControlVeh.tipoVeh"
            >
              <option
                v-for="(tipoVeh, index) in itemTypeVeh"
                :value="tipoVeh.id"
                :key="index"
              >
                {{ tipoVeh.item }}
              </option>
            </select>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Tipo transporte</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="dcControlVeh.tipoTranspPoFs"
            >
              <option
                v-for="(transporte, index) in itemTypeTransport"
                :value="transporte.id"
                :key="index"
              >
                {{ transporte.item }}
              </option>
            </select>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Transportador</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVeh.transportador"
              :readonly="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Destino</label>
            <PaginatedSelect
              v-model="dcControlVeh.ciudadDes"
              :fetch="ciudades"
            />
          </div>

          <div class="w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Conductor:</label>
            <div class="flex gap-4 w-full">
              <PaginatedSelect
                class="flex-1"
                v-model="dcControlVeh.conductorV"
                :fetch="driverVeh"
                @change="afterUpdteDrivers"
              />
              <PaginatedSelect
                class="flex-1"
                v-model="dcControlVeh.conductorV"
                :fetch="driverVeh2"
                @change="afterUpdteDrivers"
              />
            </div>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Quien lo programo:</label>
            <input
              type="text"
              class="input"
              v-model="dcControlVeh.persProgramo"
              :readonly="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Producto</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="dcControlVeh.tipoProdu"
            >
              <option
                v-for="(tipoProduc, index) in itemTypeProduct"
                :key="index"
                :value="tipoProduc.id"
              >
                {{ tipoProduc.item }}
              </option>
            </select>
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
                  v-model="dcControlVeh.fechaHoraE"
                  readonly
                />
              </div>
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base">Peso entrada</label>
                <input
                  type="text"
                  class="input p-1 text-base"
                  v-model="pesoEntr"
                  :readonly="readonlyPes"
                />
              </div>
              <div class="md:w-full px-40 mb-6 md:mb-0">
                <label class="label text-base">Estado</label>
                <select
                  class="bg-white border py-1 pr-2 select text-base"
                  v-model="dcControlVeh.estadoV"
                >
                  <option
                    v-for="(estado, index) in itemState"
                    :value="estado.id"
                    :key="index"
                  >
                    {{ estado.item }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-imprimir">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Realizo</label>
              <input
                type="text"
                class="input"
                v-model="dcControlVeh.realizo"
                :readonly="readonly"
              />
            </div>

            <div class="md:w-80 px-3 mb-6 md:mb-0">
              <label class="label">Observaciones</label>
              <input
                type="text"
                class="input"
                v-model="dcControlVeh.observacion"
                :readonly="readonly"
              />
            </div>

            <div>
              <button class="btn-save" @click="print">
                Imprimir preliminar
              </button>
              <button class="btn-primary" @click="viewModalPrint">
                Imprimir definitiva
              </button>
            </div>
          </div>
        </div>
      </div>

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
        <div>
          <label class="label text-center text-2xl -ml-2">BASCULA</label>
          <input
            type="number"
            class="input py-0 -mt-2 border-transparent text-red-700 text-2xl text-center"
            @change="onBasculaChanged()"
            placeholder=",00"
            v-model="pesoBascula"
            disabled
            canEditPeso="canEditPeso"
          />
        </div>
      </div>

      <!-- Modal print definitivo -->
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="modalPrint"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <div
              class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="text-lg"
                >&#x1f6c8; Esta Seguro de Confirmar la Impresion del ID Entrada
                No {{ dcControlVeh.idPesaje }}</strong
              >
              <div class="content-center mt-2">
                <div class="flex flex-row flex-wrap">
                  <div
                    class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-succes" @click="acceptModalPrint()">
                      Si
                    </button>
                  </div>
                  <div
                    class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-danger" @click="closeModalPrint()">
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal Print Definitivo -->
      <ModalPDFPreview
        :pdfData="pdfData"
        @close="closeModalPDF"
        v-if="showModalPDF"
      />
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Ref, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import * as Sentry from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { IDcControlVeh } from '@/remote/api/guia_sacrificio/type/dcControlVeh';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import Select from '@/components/reusable/select.vue';
import moment from 'moment/moment';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import PaginatedSelectGroup from '@/components/reusable/PaginatedSelectGroup.vue';
import PaginatedSelectGroupItem from '@/components/reusable/PaginatedSelectGroupItem.vue';
import IPagination from '@/types/IPagination';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import convertToDecimal from '@/utils/convertToDecimal';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';
import { Conductores } from '@/remote/api/guia_sacrificio/type/Conductor';
import { Ciudades } from '@/remote/api/guia_sacrificio/type/Ciudad';

const { ipcRenderer } = window;

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
    PaginatedSelectGroup,
    PaginatedSelectGroupItem,
    Select,
  },
  name: 'DCControlVeh',
})
export default class DCControlVeh extends Vue {
  @Ref('documentRef') public readonly documentRef: HTMLInputElement;
  @Ref('connectPort') private readonly btnConnectPort!: HTMLButtonElement;

  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private readonly: boolean = false;
  private readonlyPes: boolean = false;
  private modalPrint: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private ports: any[] = [];
  private portPath: string = '';
  private isPortConnected: boolean = false;
  private pesoBascula: number = 0.0;
  private peso: number = 0;

  private id: number = 0;
  private pesoEntr: string = '0';
  private pesoSali: string = '0';

  private search: IInterfaceSelect[] = [];
  private itemTypeVeh: IInterfaceSelect[] = [];
  private itemTypeProduct: IInterfaceSelect[] = [];
  private itemTypeTransport: IInterfaceSelect[] = [];
  private itemState: IInterfaceSelect[] = [];
  private dcControlVeh: IDcControlVeh = {
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
    idPesaje: 0,
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

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private guiaSacrificioReports = new ReportesGuiaSacrificio(
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
    this.openFrom();
    this.keyDown();
    this.typeTranport();
    this.typeState();
    await this.typeveh();
    await this.tipoProducto();
    await this.searchID();

    this.ports = await this.$serial.getCOMPorts();
    this._serialPortListener();
    // Tries to connect to port if exist on the local storage
    const portFromLocalDB = await this.$local.getCurrentBasculaConnectionPort();
    if (portFromLocalDB !== undefined && portFromLocalDB !== '') {
      this.portPath = portFromLocalDB;
      this.btnConnectPort.click();
    }
  }

  private openFrom() {
    this.readonly = true;
    this.documentRef.focus();

    if (!this.$store.getters.getTConfinv1.puedModifPVh) {
      this.readonlyPes = true;
      return;
    }

    this.readonlyPes = false;
  }

  private keyDown() {
    window.addEventListener('keydown', (e) => {
      const eventos: string = `F5 = COGER PESO DE LA BASCULA`;
      switch (e.key) {
        case 'F1':
          this.showOutput(false, eventos);
          break;

        case 'F5':
          this.onBasculaChanged();
          break;
      }
    });
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private closeModalPrint() {
    this.modalPrint = false;
  }

  private viewModalPrint() {
    this.modalPrint = true;
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }
  private convertDateHours(date: string) {
    return moment(date).utc().format('YYYY-MM-DDThh:mm:ss');
  }

  private convertDate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private afterUpdateVeh() {
    if (!this.dcControlVeh.placaVeh || this.dcControlVeh.placaVeh === null) {
      this.showOutput(true, 'La Placa no Puede Ser Null');
      return true;
    }
    if (
      this.dcControlVeh.fechaPes <
        this.$store.getters.getTConfinv1.fechaProc1 ||
      this.dcControlVeh.fechaPes > this.$store.getters.getTConfinv1.fechaProc2
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }
    return false;
  }

  private async print() {
    await this.dcControlVehPdf(this.dcControlVeh.idPesaje);
  }

  private async acceptModalPrint() {
    if (!this.dcControlVeh.idPesaje || this.dcControlVeh === null) {
      return;
    }
    await this.printDifinitive(this.dcControlVeh.idPesaje);
    await this.dcControlVehPdf(this.dcControlVeh.idPesaje);
    this.modalPrint = false;
  }

  private modifyRegister() {
    if (this.dcControlVeh.procesado) {
      this.showOutput(
        true,
        'Documento con Impresion Definitiva no se puede Modificar',
      );
      return;
    }

    this.readonly = false;

    this.documentRef.focus();
  }

  private async printDifinitive(idPesaje: number) {
    this.dcControlVeh.fechaHoraS = null;
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putPrintDCControlVeh(
        idPesaje,
        this.dcControlVeh,
      );

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
      await this.searchID();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async addDCControlVeh() {
    if (this.afterUpdateVeh()) {
      return;
    }
    this.dcControlVeh.anulado = false;
    this.dcControlVeh.procesado = false;
    this.dcControlVeh.pesoEntr = Number.parseFloat(this.pesoEntr);
    this.dcControlVeh.pesoSali = Number.parseFloat(this.pesoSali);
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postDCControlVeh(
        this.dcControlVeh,
      );

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
      await this.searchID();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async addRegister() {
    this.clearData();
    this.readonly = false;

    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getAddPesajeDCControlVeh();
      this.dcControlVeh.idPesaje = response.data;
      this.dcControlVeh.fechaHoraE = moment()
        .utc()
        .format('YYYY-MM-DDThh:mm:ss');
      this.dcControlVeh.estadoV = 'E';
      this.documentRef.focus();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async dcControlVehIdPesaje(idPesaje: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getDCControlVehIdPesaje(idPesaje);

      this.dcControlVeh = response.data as IDcControlVeh;
      this.dcControlVeh.fechaHoraE = this.convertDateHours(
        response.data.fechaHoraE,
      );
      this.dcControlVeh.fechaHoraS = this.convertDateHours(
        response.data.fechaHoraS,
      );
      this.dcControlVeh.fechaPes = this.convertDate(response.data.fechaPes);
      this.pesoEntr = convertToDecimal(response.data.pesoEntr);
      this.pesoSali = convertToDecimal(response.data.pesoSali);
      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async searchID() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getBuscarDCControlVeh();
      this.search = response.data.map((e: any) => {
        return {
          id: e.idPesaje,
          item: `${e.idPesaje} - ${e.placaVeh} - ${e.anulado}`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async typeveh() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getTipoVehDcControlVeh();
      this.itemTypeVeh = response.data.map((e: any) => {
        return {
          id: e.idTipo,
          item: e.descripTipo,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async afterUpdteDrivers(nitCoductor: string) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getAfterCoductorDcControlVeh(nitCoductor);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async tipoProducto() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getTipoProducDcControlVeh();
      this.itemTypeProduct = response.data.map((e: any) => {
        return {
          id: e.idTipoProd,
          item: e.descTipoProd,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private typeTranport() {
    this.itemTypeTransport.push(
      { id: 'P', item: 'CLIENTE' },
      { id: 'F', item: 'FRIGOSINU' },
    );
  }

  private typeState() {
    this.itemState.push(
      { id: 'E', item: 'En Proceso' },
      { id: 'F', item: 'Finalizado' },
    );
  }

  private async dcControlVehPdf(idPesaje: number) {
    try {
      this.isLoading = true;
      const pdf2 =
        await this.guiaSacrificioReports.getDCControlVehPDF(idPesaje);
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
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

  private clearData() {
    this.dcControlVeh = {
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
      idPesaje: 0,
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
    this.pesoEntr = '0';
    this.pesoSali = '0';
  }

  private async itemClienteUs(pag?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        codiCliente: string;
        expr1: string;
        nitCliente: string;
      }>
    >;
    if (q.query) {
      response = await this.guiaSacrificioApi.getClienteUsDcControlVehFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.nitCliente,
          item: e.nitCliente,
        };
      });
    }
    response = await this.guiaSacrificioApi.getClienteUsDcControlVeh(pag);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.nitCliente,
        item: e.nitCliente,
      };
    });
  }
  private async itemClienteUsCod(pag?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        codiCliente: string;
        expr1: string;
        nitCliente: string;
      }>
    >;
    if (q.query) {
      response = await this.guiaSacrificioApi.getClienteUsDcControlVehFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.nitCliente,
          item: e.codiCliente,
        };
      });
    }
    response = await this.guiaSacrificioApi.getClienteUsDcControlVeh(pag);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.nitCliente,
        item: e.codiCliente,
      };
    });
  }

  private async itemClienteUsName(pag?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        codiCliente: string;
        expr1: string;
        nitCliente: string;
      }>
    >;
    if (q.query) {
      response = await this.guiaSacrificioApi.getClienteUsDcControlVehFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.nitCliente,
          item: e.expr1,
        };
      });
    }
    response = await this.guiaSacrificioApi.getClienteUsDcControlVeh(pag);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.nitCliente,
        item: e.expr1,
      };
    });
  }

  private async driverVeh(p: IPagination, q?: IQuery) {
    let response: BaseResponse<Conductores>;
    if (q.query) {
      response =
        await this.guiaSacrificioApi.getConductoresVDcControlVehFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.nitConduc,
          item: e.nitConduc,
        };
      });
    }
    response = await this.guiaSacrificioApi.getConductoresVDcControlVeh(p);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.nitConduc,
        item: e.nitConduc,
      };
    });
  }

  private async driverVeh2(p: IPagination, q?: IQuery) {
    let response: BaseResponse<Conductores>;
    if (q.query) {
      response =
        await this.guiaSacrificioApi.getConductoresV2DcControlVehFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.nitConduc,
          item: e.nombreCond,
        };
      });
    }
    response = await this.guiaSacrificioApi.getConductoresV2DcControlVeh(p);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.nitConduc,
        item: e.nombreCond,
      };
    });
  }

  private async ciudades(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<Ciudades>;
    if (q.query) {
      response = await this.guiaSacrificioApi.getCiudadDesDcControlVehFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.idCiudad,
          item: e.descripcionCiu,
        };
      });
    }
    response = await this.guiaSacrificioApi.getCiudadDesDcControlVeh(p);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.idCiudad,
        item: e.descripcionCiu,
      };
    });
  }
}
</script>
