<template>
  <div class="flex flex-col">
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
          <h1 class="title">Guia de Sacrificio</h1>
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <div class="md:w-1 px-5 mb-6 md:mb-0 mt-5">
            <p class="text-andrea font-bold text-2xl">
              {{ validateAnulado(guiSac.anulada) }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex-wrap">
        <div class="flex flex-row flex-wrap mb-3">
          <div class="flex flex-row flex-wrap p-3 w-full justify-end">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <Select
                :isItems="customerSearch"
                v-model="id"
                :value="id"
                :usePagination="false"
                @changed="guiasTaraNGuia(id)"
                >Busqueda:</Select
              >
            </div>
          </div>
        </div>
      </div>
      <div class="p-5"></div>

      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="card w-full flex flex-row flex-wrap">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label font-bold text-base">Datos del Peso:</label>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Total Bruto:</label>
              <input type="number" class="input" v-model="pesEntra" />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Tara:</label>
              <input
                type="number"
                class="input"
                v-model="pesSali"
                @change="pesoSaliAfterUpdate"
                :readonly="readonlyCanModify"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">No Animales Licencia :</label>
              <input
                type="number"
                class="input"
                v-model="guiSac.noAnimalesLic"
                @change="noAnimalesLicAfterUpdate"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Procedencia(Ciudad):</label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="guiSac.procedencia"
              >
                <option
                  v-for="(procedencia, index) in ciudades"
                  :key="index"
                  :value="procedencia.id"
                >
                  {{ procedencia.item }}
                </option>
              </select>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Total Kilos de Peso :</label>
              <input type="number" class="input" v-model="totalKilosP" />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Peso Promedio:</label>
              <input type="number" class="input" v-model="pesoPromedio" />
            </div>
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Proveedor:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.nitTercero"
            >
              <option
                v-for="(tercero, index) in nitTercero"
                :key="index"
                :value="tercero.id"
              >
                {{ tercero.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.nitTercero"
            >
              <option
                v-for="(nitProveedo, index) in nitSupplier"
                :key="index"
                :value="nitProveedo.id"
              >
                {{ nitProveedo.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.nitTercero"
            >
              <option
                v-for="(nameProveedo, index) in nameSupplier"
                :key="index"
                :value="nameProveedo.id"
              >
                {{ nameProveedo.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Usuario:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.nitTercero"
            >
              <option
                v-for="(nitUser, index) in nitCC"
                :key="index"
                :value="nitUser.id"
              >
                {{ nitUser.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.nitTercero"
            >
              <option
                v-for="(nitcodUser, index) in nitCCcod"
                :key="index"
                :value="nitcodUser.id"
              >
                {{ nitcodUser.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.nitTercero"
            >
              <option
                v-for="(nitppUser, index) in nitCCpp"
                :key="index"
                :value="nitppUser.id"
              >
                {{ nitppUser.item }}
              </option>
            </select>
          </div>
          <div class="md:w-full px-64 mb-6 md:mb-0">
            <button class="btn-save p-5" @click="print">
              Imprimir Documento
            </button>
          </div>
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
    </div>

    <ModalPDFPreview
      :pdfData="pdfData"
      @close="closeModalPDF"
      v-if="showModalPDF"
    />
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Ref, Vue } from 'vue-property-decorator';
import Select from '@/components/reusable/select.vue';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import * as Sentry from '@sentry/browser';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import moment from 'moment/moment';
import { IGuiaSacrifico } from '@/remote/api/guia_sacrificio/type';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';

const { ipcRenderer } = window;

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    Select,
  },
  name: 'GuiaSacTara',
})
export default class GuiaSacTara extends Vue {
  @Ref('connectPort') private readonly btnConnectPort!: HTMLButtonElement;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private readonlyCanModify: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private ports: any[] = [];
  private portPath: string = '';
  private isPortConnected: boolean = false;
  private pesoBascula: number = 0.0;
  private peso: number = 0;

  private id: number = 0;

  private pesEntra: string = '';
  private pesSali: string = '';
  private totalKilosP: string = '';
  private pesoPromedio: string = '';

  private customerSearch: IInterfaceSelect[] = [];
  private nitTercero: IInterfaceSelect[] = [];
  private nitSupplier: IInterfaceSelect[] = [];
  private nameSupplier: IInterfaceSelect[] = [];
  private nitCC: IInterfaceSelect[] = [];
  private nitCCcod: IInterfaceSelect[] = [];
  private nitCCpp: IInterfaceSelect[] = [];
  private ciudades: IInterfaceSelect[] = [];
  private guiSac: IGuiaSacrifico = {
    actualizaW: false,
    anulada: false,
    clase: 0,
    commUt: '',
    commUt2: '',
    conductor: '',
    confirma: false,
    docum: '',
    elaboro: '',
    esRecepGanado: 0,
    estado: '',
    fecha: '',
    fechaPes: '',
    fechaSFinca: '',
    finca: '',
    horaPesaje: '',
    horaSFinca: '',
    idConcecutiv: '',
    idEmpresa: 0,
    imprime: 'N',
    lIca: '',
    loteUs: '',
    motivoAnula: '',
    motivoEstado: '',
    nGuia: 0,
    nLote: 0,
    nLoteSub: 0,
    nProgramac: 0,
    nSubasta: 0,
    nitTercero: '',
    noAnimales: 0,
    noAnimalesLic: 0,
    observacion: '',
    pesEntra: 0,
    pesSali: 0,
    pesoProgram: 0,
    pesoPromedio: 0,
    placaVeh: '',
    procedencia: '',
    sexo: 0,
    tipoVeh: 0,
    tiquete: 0,
    totalKilosP: 0,
    transportador: '',
    usuario: '',
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

  public get connectedDisconnected() {
    return this.isPortConnected ? 'Conectado' : 'Desconectado';
  }

  public async discoverPorts() {
    this.ports = await this.$serial.getCOMPorts();
  }

  private async mounted() {
    await this.openForm();
    await this.keyDown();
    await this.searchCustomer();
    await this.nitTerceros();
    await this.nitSuppliers();
    await this.supplierNames();
    await this.nitCCUsers();
    await this.nitCCcodUsers();
    await this.nitCCppUsers();
    await this.ciudadesProce();

    this.ports = await this.$serial.getCOMPorts();
    this._serialPortListener();
    // Tries to connect to port if exist on the local storage
    const portFromLocalDB = await this.$local.getCurrentBasculaConnectionPort();
    if (portFromLocalDB !== undefined && portFromLocalDB !== '') {
      this.portPath = portFromLocalDB;
      this.btnConnectPort.click();
    }
  }
  private connectToPort() {
    if (this.portPath === '') {
      this.showOutput(false, 'Debe seleccionar un puerto al cual conectarse.');
      return;
    }
    this.$serial.connectToPort(this.portPath);
  }

  private onBasculaChanged() {
    this.pesSali = this.convertToDecimal(this.pesoBascula);
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
          this.pesoSaliAfterUpdate();
          break;
      }
    });
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private validateAnulado(anulado: boolean) {
    return anulado ? 'Anulado' : '';
  }

  private convertDate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private convertToDecimal(dato: number) {
    return Number(Math.round((dato + Number.EPSILON) * 100) / 100).toFixed(2);
  }

  private pesoSaliAfterUpdate() {
    if (!this.pesEntra || Number.parseFloat(this.pesEntra) === 0) {
      return;
    }

    this.totalKilosP = this.convertToDecimal(
      Number.parseFloat(this.pesEntra) - Number.parseFloat(this.pesSali),
    );

    if (this.guiSac.noAnimales !== 0) {
      this.pesoPromedio = this.convertToDecimal(
        Number.parseFloat(this.totalKilosP) / this.guiSac.noAnimales,
      );
    }
  }

  private noAnimalesLicAfterUpdate() {
    if (!this.guiSac.noAnimales || this.guiSac.noAnimales === 0) {
      return;
    }

    this.pesoPromedio = this.convertToDecimal(
      Number.parseFloat(this.totalKilosP) / this.guiSac.noAnimales,
    );
  }

  private async openForm() {
    if (!this.$store.getters.getTConfinv1.puedModif) {
      this.readonlyCanModify = true;
      return;
    }
    this.readonlyCanModify = false;

    await this.modify();
  }

  private async modify() {
    this.guiSac.pesEntra = Number.parseFloat(this.pesEntra);
    this.guiSac.pesSali = Number.parseFloat(this.pesSali);
    this.guiSac.totalKilosP = Number.parseFloat(this.totalKilosP);
    this.guiSac.pesoPromedio = Number.parseFloat(this.pesoPromedio);
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putModify(this.guiSac);

      if (!response.data) {
        return;
      }

      this.guiSac.imprime = response.data.imprime;
      this.guiSac.noAnimales = response.data.noAnimales;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitTerceros() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitTerceros();
      this.nitTercero = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.expr1 };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitSuppliers() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitProveedor();
      this.nitSupplier = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.nitoCC };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async supplierNames() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNombreProveedor();
      this.nameSupplier = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.expr2 };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitCCUsers() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCC();
      this.nitCC = response.data.map((e: any) => {
        return { id: e.codiCliente, item: e.codiCliente };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitCCcodUsers() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCCCod();
      this.nitCCcod = response.data.map((e: any) => {
        return { id: e.codiCliente, item: e.nitCliente };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitCCppUsers() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCCpp();
      this.nitCCpp = response.data.map((e: any) => {
        return { id: e.codiCliente, item: e.expr2 };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ciudadesProce() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getCiudad();
      this.ciudades = response.data.map((e: any) => {
        return { id: e.idCiudad, item: e.descripcionCiu };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async searchCustomer() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getGuiaModBuscarClientes();
      this.customerSearch = response.data.map((e: any) => {
        return {
          id: e.NGuia,
          item: `${e.NGuia} - ${e.Expr1} -${this.convertDate(e.FechaPes)}`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private validateAfterSearchGuia() {
    if (this.guiSac.anulada) {
      this.showOutput(true, 'Movimiento Anulado');
      return true;
    }

    if (!this.$store.getters.getTConfinv1.puedModif) {
      this.readonlyCanModify = true;
      return true;
    }

    this.readonlyCanModify = false;
    return false;
  }

  private async guiasTaraNGuia(nGuia: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getGuiasToNGuia(nGuia);
      this.guiSac = response.data as IGuiaSacrifico;
      this.pesEntra = this.convertToDecimal(this.guiSac.pesEntra);
      this.pesSali = this.convertToDecimal(this.guiSac.pesSali);
      this.totalKilosP = this.convertToDecimal(this.guiSac.totalKilosP);
      this.pesoPromedio = this.convertToDecimal(this.guiSac.pesoPromedio);

      this.validateAfterSearchGuia();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private pesoKilosB(peso: number) {
    this.pesoBascula = peso;
    this.pesSali = this.convertToDecimal(peso);
    this.pesoSaliAfterUpdate();
  }

  private async print() {
    await this.guiaSacrifioPdf(this.guiSac.nGuia);
  }

  private async guiaSacrifioPdf(nGuia: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getGuiaSacrificoPDF(nGuia);
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
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
}
</script>
