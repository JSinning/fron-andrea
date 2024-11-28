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
  <div>
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="w-full h-full">
      <component
        v-bind:is="componentName"
        :pdfData="pdfData"
        v-bind:message="message"
      ></component>
    </div>

    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <!-- modal proximas guias -->
    <div>
      <div class="modal" v-if="isModalVisible">
        <div class="modal-container">
          <div class="modal-body">
            <div class="card-table">
              <table class="table">
                <thead>
                  <tr class="table-tr">
                    <th>Guia</th>
                    <th>#Visceras</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody
                  class="text-center"
                  v-for="(item, index) in ProximaGuias"
                  :key="index"
                >
                  <tr class="border-b border-gray-500">
                    <td @dblclick="nGuiaDoubleClick()">{{ item.NGuia }}</td>
                    <td>{{ item.NAnim }}</td>
                    <td>{{ item.Expr1 }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="isModalVisible = false"
              class="btn-delete"
              name="footer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->

    <!-- modal movimiento del dia-->
    <div>
      <div class="modal" v-if="isMoviDia">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col p-2">
            <SubDetRelaCCanDiaComponent></SubDetRelaCCanDiaComponent>
            <button
              class="btn-delete w-3/12 m-auto mb-2"
              @click="isMoviDia = false"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->

    <!-- Mov Viceras-->
    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap">
        <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0">
          <h1 class="title">VISCERAS</h1>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-2">
        <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0"></div>
        <div class="md:w-1/6 px-3 mb-6 md:mb-0">
          <button class="btn-primary" @click="comenzarProceso()">
            Comenzar Proceso
          </button>
        </div>
        <div class="md:w-1/2 md:mb-0">
          <button class="btn-save" @click="siguienteReguitro()">
            Siguiente Registro
          </button>
          <button class="btn-save" @click="guardarRegistro()">Guardar</button>
          <button @click="isModalVisible = !isModalVisible" class="btn-save">
            Proximas Guias
          </button>
        </div>
      </div>

      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/6 px-3 mb-6 md:mb-0">
            <label class="label">No Guia:</label>
            <input type="text" class="input" v-model="NGuia" />
          </div>
          <div class="md:w-1/6 px-3 mb-6 md:mb-0">
            <label class="label">Codigo Individual:</label>
            <input type="text" class="input" v-model="Codindv" />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">No Animal:</label>
            <input type="text" class="input" v-model="NAnima" />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Fecha y Hora Pesaje:</label>
            <input type="datetime-local" class="input" v-model="FechaMov" />
          </div>
          <div class="mt-2 px-3 mb-6 md:mb-0">
            <button class="btn-save">Imprimir</button>
          </div>
        </div>

        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label"> Codigo C.C ó Nit </label>
            <select class="select-rounded" v-model="Nit">
              <option :value="Nit">{{ Nit }}</option>
            </select>
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Observaciones:</label>
            <input type="text" class="input" v-model="observac" />
          </div>
          <div class="px-5 pt-5">
            <label class="label">
              <input
                class="mr-2 leading-tight"
                type="checkbox"
                v-model="Retoma"
              />
              Retoma
            </label>
          </div>
          <div class="md:w-1/8 pt-2 px-3 mb-6 md:mb-0">
            <button class="btn-save" @click="btnPatas()">Patas</button>
          </div>
        </div>

        <div class="flex flex-row px-20 flex-wrap justify-end">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label text-center text-2xl -ml-2">PESO VISCERA</label>
            <input
              type="text"
              placeholder="0"
              class="input py-0 -mt-2 border-transparent text-red-700 text-4xl text-center"
              v-model="PesoVisec"
              ref="pesoFocu"
              :canEditPeso="canEditPeso"
            />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label text-center text-2xl -ml-2">BASCULA</label>
            <input
              type="number"
              class="input py-0 -mt-2 border-transparent text-red-700 text-4xl text-center"
              @change="onBasculaChanged()"
              placeholder=",00"
              v-model="pesoBascula"
              disabled
              canEditPeso="canEditPeso"
            />
          </div>
        </div>
      </div>

      <!-- table -->
      <div class="flex flex-row flex-wrap mb-3">
        <div class="md:w-1/2 h-48 card-table">
          <table class="table-auto w-full text-xs" id="tablaB">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>Guia</th>
                <th>Cod</th>
                <th>Peso Visc</th>
                <th>Fecha</th>
                <th>Retoma</th>
              </tr>
            </thead>
            <tbody
              class="text-center"
              v-for="(item, index) in MovViseraSf"
              :key="index"
            >
              <tr>
                <td>{{ item.NGuia }}</td>
                <td>{{ item.CodigoIndiv }}</td>
                <td>{{ item.PesoViscera }}</td>
                <td>{{ convetFecha(item.FechaMov) }}</td>
                <td>{{ converRetoma(item.Retoma) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="md:w-1/2 h-48 card-table">
          <table class="table-auto w-full text-xs" id="tablaA">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th># Guia</th>
                <th># Visceras</th>
                <th># Peso Total</th>
              </tr>
            </thead>
            <tbody
              class="text-center"
              v-for="(item, index) in MovViserasPeso"
              :key="index"
            >
              <tr>
                <td>{{ item.NGuia }}</td>
                <td>{{ item.NVisc }}</td>
                <td>{{ item.PesoGuia }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-3 -mt-4">
        <div class="md:w-1/2 flex flex-col">
          <button
            class="btn-primary w-full"
            @click="exporTableViseras(`PielesPesadas_${fechaTablas}.csv`)"
          >
            Exportar Csv Pieles Pesadas
          </button>
        </div>
        <div class="md:w-1/2 flex flex-col">
          <button
            class="btn-primary w-full"
            @click="exporTablePesoTotal(`PesoTotal_${fechaTablas}.csv`)"
          >
            Exportar Csv Peso Total
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
        <div>
          <button class="btn-save" @click="isMoviDia = !isMoviDia">
            Movimientos del dia
          </button>
        </div>
      </div>
      <ModalPDFPreview
        :pdfData="pdfData"
        @close="closeModalPDF"
        v-if="showModalPDF"
      />
      <ModalPDFPreview
        :pdfData="pdfData2"
        @close="closeModalPDF2"
        v-if="showModalPDF2"
      />
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import SubDetRelaCCanDiaComponent from '@/components/Viceras/SubDetRelaCCanDiaComponent.vue';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import MovReportesApi from '@/remote/api/MovViseras/ReportesVisceras';
import moment from 'moment';
import { Component, Ref, Vue } from 'vue-property-decorator';

import Loader from '@/components/reusable/Loader.vue';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

import * as Sentry from '@sentry/browser';

import PDFPreview from '@/components/reusable/PdfPreview.vue';

const { ipcRenderer } = window;

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PDFPreview,
    SubDetRelaCCanDiaComponent,
  },
  name: 'MovVisceras',
})
export default class MovVicerasComponent extends Vue {
  @Ref('connectPort') private readonly btnConnectPort!: HTMLButtonElement;
  private isModalVisible: boolean = false;
  private isMoviDia: boolean = false;

  private isLoading: boolean = false;

  private ports: any[] = [];
  private isPortConnected: boolean = false;
  private portPath: string = '';
  private canEditPeso: boolean = false;

  private output = '';
  private isError: boolean = false;

  private NGuia: number = 0;
  private Codindv: number = 0;
  private NAnima: number = 0;
  private Nit: string = '';
  private FechaMov: string = '';
  private Retoma: boolean = false;
  private PesoVisec: number = 0;
  private pesoBascula: number = 0.0;
  private observac: string = '';
  private auton: number = 0;
  private OrdenDia: number = 0;
  private tieneDecomiso: boolean = false;

  private componentName: string = '';
  private ProximaGuias: any = [];
  private message: string = '';
  private MovViseraSf: any = [];
  private MovViserasPeso: any = [];

  private DataFri: any = [];
  private showModalPDF: boolean = false;
  private showModalPDF2: boolean = false;

  private fechaTablas: string = moment().utc().format('YYYY-MM-DD');
  private pdfData: string = '';
  private pdfData2: string = '';

  private MovViseras = new MovViserasApi(this.$store.getters.getAuthToken);
  private MovReportesApi = new MovReportesApi(this.$store.getters.getAuthToken);

  public closeModalPDF() {
    this.showModalPDF = false;
  }

  public closeModalPDF2() {
    this.showModalPDF2 = false;
  }

  private connectToPort() {
    if (this.portPath === '') {
      this.showOutput(false, 'Debe seleccionar un puerto al cual conectarse.');
      return;
    }
    this.$serial.connectToPort(this.portPath);
  }

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
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

    await this.proximaGuias();
    await this.movViserasSf();
    await this.movViserPeso();
  }

  private validar() {
    if (
      this.Codindv === 0 ||
      this.FechaMov === '' ||
      this.observac === '' ||
      this.PesoVisec === 0
    ) {
      return false;
    }
    return true;
  }

  private convetFecha(fecha: string) {
    return moment(fecha).format('YYYY-MM-DD');
  }

  private async btnPatas() {
    try {
      this.isLoading = true;
      const pdf = await this.MovReportesApi.getEtiqCanastPataPDF(this.auton);
      this.pdfData = pdf.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async nGuiaDoubleClick() {
    try {
      this.isLoading = true;
      const pdf = await this.MovReportesApi.getStickMCan1PDF(this.NGuia);
      this.pdfData = pdf.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
    try {
      this.isLoading = true;
      const pdf2 = await this.MovReportesApi.getStickMCan2PDF(this.NGuia);
      this.pdfData2 = pdf2.data;
      this.showModalPDF2 = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private converRetoma(retoma: boolean) {
    return retoma === false ? 'No' : 'Si';
  }

  private beforeDestroy() {
    // Remove listener to avoid duplication and memory leaks and then subscribe to them again
    ipcRenderer.removeAllListeners('port_connected');
    ipcRenderer.removeAllListeners('serial_data_utf8');
  }

  private async discoverPorts() {
    this.ports = await this.$serial.getCOMPorts();
  }

  private get connectedDisconnected() {
    return this.isPortConnected ? 'Conectado' : 'Desconectado';
  }

  private disconnectPort() {
    this.$serial.disconnectPort();
    this.isPortConnected = false;
  }

  private onBasculaChanged() {
    this.PesoVisec = this.pesoBascula;
  }

  private async minValue(): Promise<number> {
    try {
      const response = await this.MovViseras.getMinAuton();
      return response.data[0].Auton;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener numero de guia.');
      return -1;
    }
  }

  private async numAnimal() {
    try {
      const response = await this.MovViseras.getNumAnuila(this.NGuia);
      this.NAnima = response.data[0].NoAnimales;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener numero de animal.');
    }
  }

  private async nomP() {
    try {
      const response = await this.MovViseras.getNombrePre(this.NGuia);
      this.Nit = response.data[0].NombreP;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener nomnbre/nit del tercero.');
    }
  }

  private async proximaGuias() {
    try {
      const response = await this.MovViseras.getMovVicerasSiguiente();
      this.ProximaGuias = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async movViserPeso() {
    try {
      const response = await this.MovViseras.getMovViseraPeso();

      this.MovViserasPeso = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async movViserasSf() {
    try {
      const response = await this.MovViseras.getMovViserasSf();
      this.MovViseraSf = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async comenzarProceso() {
    try {
      const minVal = await this.minValue();

      if (minVal === null) {
        this.showOutput(false, 'No hay mas registros para modificar.');
        this.NGuia = 0;
        this.Codindv = 0;
        this.observac = '';
        this.FechaMov = '';
        this.PesoVisec = 0;
        this.auton = 0;
        return;
      }

      const response = await this.MovViseras.getMovViseras(minVal);

      this.NGuia = response.data.nGuia;
      this.Codindv = response.data.codigoIndiv;
      this.FechaMov = moment().format('YYYY-MM-DDThh:mm');
      this.observac = response.data.observac;
      this.Retoma = response.data.retoma;
      this.PesoVisec = response.data.pesoViscera;
      this.auton = response.data.auton;
      this.OrdenDia = response.data.ordenDia;
      this.tieneDecomiso = response.data.tieneDecom;

      await this.numAnimal();
      await this.nomP();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al comenzar proceso.');
    }
  }

  private async siguienteReguitro() {
    try {
      const minVal = await this.minValue();

      if (minVal === null) {
        this.showOutput(false, 'No hay mas registros para modificar.');
        return;
      }

      const response = await this.MovViseras.getMovViseras(minVal);

      this.NGuia = response.data.nGuia;
      this.Codindv = response.data.codigoIndiv;
      this.FechaMov = moment().format('YYYY-MM-DDThh:mm');
      this.observac = response.data.observac;
      this.Retoma = response.data.retoma;
      this.PesoVisec = response.data.pesoViscera;
      this.auton = response.data.auton;
      this.OrdenDia = response.data.ordenDia;
      this.tieneDecomiso = response.data.tieneDecom;

      await this.numAnimal();
      await this.nomP();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al Sieguiente registro.');
    }
  }

  private async guardarRegistro() {
    const Auton: number = this.auton;
    const Retom: number = this.Retoma === false ? 0 : 1;

    if (this.beforeUpdateForm()) {
      return;
    }

    if (!this.validar()) {
      return;
    }

    await this.ordenDias();

    try {
      const response = await this.MovViseras.putMovVisceras(Auton, {
        actualiza: true,
        actualizaW: false,
        anulado: false,
        codigoIndiv: this.Codindv,
        fechaMod: moment(this.FechaMov).format('YYYY-MM-DD'),
        fechaMov: moment(this.FechaMov).format('YYYY-MM-DD'),
        fechaProc: moment(this.FechaMov).format('YYYY-MM-DD'),
        motivoAnul: '0',
        nGuia: this.NGuia,
        observac: this.observac,
        ordenDia: this.OrdenDia,
        pesoViscera: this.PesoVisec,
        retoma: Retom,
        tieneDecom: this.tieneDecomiso,
        usuario: this.$store.getters.getUsuario,
      });
      if (response.statusCode !== 200) {
        this.showOutput(true, 'Error al guardar, revise los datos.');
        return;
      }

      await this.movViserPeso();
      await this.movViserasSf();
      await this.siguienteReguitro();
      this.ProximaGuias = [];
      this.pesoBascula = 0;
      await this.proximaGuias();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private beforeUpdateForm() {
    if (this.NGuia === 0) {
      this.showOutput(true, 'No GUIA no puede ser cero.');
      return true;
    }
    if (this.PesoVisec === 0) {
      this.showOutput(true, 'PESO no puede ser cero.');
      return true;
    }

    return false;
  }

  private async ordenDias() {
    const result: any = await this.friSacriOrdenDia();
    if (this.OrdenDia === null || this.OrdenDia === 0) {
      if ((await this.friSacriOrdenDia()) === null) {
        this.OrdenDia = 1;
      }
      result + 1 === null ? (this.OrdenDia = 1) : (this.OrdenDia = result + 1);
    }
  }

  private async friSacriOrdenDia() {
    try {
      const response = await this.MovViseras.getfriSacriOrdia();
      if (response.data.length === 0) {
        return null;
      }
      for (const i of response.data) {
        this.DataFri.push(i.ordenDia);
      }
      return Math.max(...this.DataFri);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
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
      this.pesoBascula = data as unknown as number;
      this.PesoVisec = this.pesoBascula;
      this.guardarRegistro();
    });
  }

  // Exportar Tabla a CVS
  private downloadCSV(csv: any, filename: string) {
    let csvFile;
    let downloadLink;
    // CSV file
    csvFile = new Blob([csv], { type: 'text/csv' });
    // Download link
    downloadLink = document.createElement('a');
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = 'none';
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
  }

  private exporTablePesoTotal(file: string) {
    if (this.MovViserasPeso.length === 0) {
      this.showOutput(false, 'Tablas vacias, no hay datos que guardar');
      return;
    }
    const csv: any = [];
    const row = document.querySelectorAll('#tablaA tr');
    for (const i of row) {
      const rows = [];
      const cols = i.querySelectorAll('td, th');
      for (const j of cols) {
        rows.push(j.innerHTML.replace('.', ','));
      }
      csv.push(rows.join(';'));
    }
    this.downloadCSV(csv.join('\n'), file);
  }

  private exporTableViseras(file: string) {
    if (this.MovViseraSf.length === 0) {
      this.showOutput(false, 'Tablas vacias, no hay datos que guardar');
      return;
    }
    const csv: any = [];
    const row = document.querySelectorAll('#tablaB tr');
    for (const i of row) {
      const rows = [];
      const cols = i.querySelectorAll('td, th');
      for (const j of cols) {
        rows.push(j.innerHTML.replace('.', ','));
      }
      csv.push(rows.join(';'));
    }
    this.downloadCSV(csv.join('\n'), file);
  }
}
</script>

<style scoped></style>
