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
  <div class="flex flex-col">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap">
        <div class="md:w-1/2 px-3 mt-2 mb-6 md:mb-0">
          <h1 class="title">PIELES</h1>
        </div>
        <div class="md:w-1/2 px-36 mt-4 md:mb-0">
          <label class="label">
            <input
              class="mr-2 leading-tight"
              type="checkbox"
              v-model="imprimir"
            />
            Imprimir
          </label>
        </div>
      </div>

      <div class="flex flex-row flex-wrap px-20 mb-2">
        <div class="md:w-1/3 mb-6 md:mb-0"></div>
        <div class="md:w-1/8 mb-6 md:mb-0">
          <button @click="toggleModal = !toggleModal" class="btn-save">
            Proximas Guias
          </button>
        </div>
        <div class="md:w-1/8 mb-6 md:mb-0">
          <button class="btn-primary" @click="comenzarProceso()">
            Comenzar Proceso
          </button>
        </div>
        <div class="md:w-1/3 md:mb-0">
          <button class="btn-save" @click="siguienteRegistro()">
            Siguiente Registro
          </button>
          <button class="btn-save" @click="guardarRegistro()">Guardar</button>
        </div>
      </div>

      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">No Guia:</label>
            <input type="text" class="input" v-model="nGuia" readonly />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Codigo Individual:</label>
            <input type="text" class="input" v-model="codindv" readonly />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">No Animal:</label>
            <input type="text" class="input" v-model="nAnim" readonly />
          </div>
        </div>

        <div class="flex flex-row flex-wrap py-2">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label"> Codigo C.C ó Nit</label>
            <select class="select p-1" v-model="Nit">
              <option :value="Nit">{{ Nit }}</option>
            </select>
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Fecha y Hora Pesaje:</label>
            <input type="datetime-local" class="input p-1" v-model="fechaMov" />
          </div>
        </div>
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Observaciones:</label>
            <textarea
              type="text"
              class="input"
              @input="validateLengthObs(maxlength)"
              v-model="observa"
            ></textarea>
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label text-center text-2xl -ml-2">PESO PIEL</label>
            <input
              type="text"
              placeholder="0"
              class="input py-0 -mt-2 border-transparent text-red-700 text-4xl text-center"
              v-model="pesoPiel"
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
                <th>Peso</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody
              class="text-center"
              v-for="(item, index) in movPiesSf"
              :key="index"
            >
              <tr>
                <td @dblclick="dobleClickNGuiaMovPieles(item.Auton)">
                  {{ item.NGuia }}
                </td>
                <td>{{ item.CodigoIndiv }}</td>
                <td>{{ item.Pesopiel }}</td>
                <td>{{ convertirFecha(item.FechaMov) }}</td>
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
                <th>Guia</th>
                <th>Animales</th>
                <th>Peso Total</th>
              </tr>
            </thead>
            <tbody
              class="text-center"
              v-for="(item, index) in movPiesSfPeso"
              :key="index"
            >
              <tr>
                <td>{{ item.NGuia }}</td>
                <td>{{ item.NAnim }}</td>
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
            @click="exporTablePieles(`PielesPesadas_${fechaTablas}.csv`)"
          >
            Exportar Csv Pieles Pesadas
          </button>
        </div>
        <div class="md:w-1/2 flex flex-col">
          <button
            class="btn-primary w-full"
            @click="exporTable(`PesoTotal_${fechaTablas}.csv`)"
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
    </div>

    <!-- modal pielesUno -->
    <div>
      <div class="modal" v-if="isMovPilesUno">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <MovPielesUno v-bind:idAuton="autonUno" />
            <button class="btn-delete" @click="closeMovUno()">Cerrar</button>
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
            <SubDetRelaPielDia></SubDetRelaPielDia>
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

    <!-- modal proximas guias -->
    <div>
      <div class="modal" v-if="toggleModal">
        <div class="modal-container">
          <div class="modal-body">
            <div class="card-table">
              <table class="table">
                <thead>
                  <tr class="table-tr">
                    <th>Guia</th>
                    <th>M Canales</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody
                  class="text-center"
                  v-for="(item, index) in ProxiGuia"
                  :key="index"
                >
                  <tr class="border-b border-gray-500">
                    <td>{{ item.NGuia }}</td>
                    <td>{{ item.NMedia }}</td>
                    <td>{{ item.Expr1 }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="toggleModal = false"
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

    <!-- modal RptSticPiel -->
    <div>
      <div class="modal" v-if="isRptPielPie">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <component v-bind:is="ComponetName" />
            <button class="btn-delete" @click="isRptPielPie = !isRptPielPie">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->

    <!-- modal RptSticPiel -->
    <div>
      <div class="modal" v-if="isRptSticPiel">
        <div class="relative mx-auto w-auto max-w-2xl h-64">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <component
              v-bind:is="ComponetName"
              v-bind:idAuton="autonRptPieles"
            />
            <button class="btn-delete" @click="isRptSticPiel = !isRptSticPiel">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import { Component, Ref, Vue } from 'vue-property-decorator';

import MovPielesUno from '@/components/pieles/MovPielesUno.vue';
import SubDetRelaPielDia from '@/components/pieles/SubDetRelaPielDia.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovPileApi from '@/remote/api/MovPielesApi/MovPileApi';
import MovRepoPielApi from '@/remote/api/MovPielesApi/ReportesPileles';

import PDFPreview from '@/components/reusable/PdfPreview.vue';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';

const { ipcRenderer, log } = window;

@Component({
  components: {
    AlertBox,
    Loader,
    MovPielesUno,
    PDFPreview,
    SubDetRelaPielDia,
  },
  name: 'MovPieles',
})
export default class MovPieles extends Vue {
  @Ref('connectPort') private readonly btnConnectPort!: HTMLButtonElement;
  private toggleModal: boolean = false;
  private isMoviDia: boolean = false;
  private isMovPilesUno: boolean = false;
  private isRptSticPiel: boolean = false;
  private isRptPielPie: boolean = false;
  private output: string = '';
  private MinValue: number = 0;
  private nGuia: number = 0;
  private codindv: number = 0;
  private nAnim: number = 0;
  private Nit: string = '';
  private fechaMov: string = '';
  private observa: string = '';
  private pesoPiel: number = 0;
  private pesoBascula: number = 0.0;
  private movPiesSf = [];
  private movPiesSfPeso = [];
  private imprimir: boolean = false;
  private ProxiGuia = [];
  private auton: number = 0;
  private ports: any[] = [];
  private isPortConnected: boolean = false;
  private portPath: string = '';
  private canEditPeso: boolean = false;
  private autonUno: number = 0;
  private autonRptPieles: number = 0;
  private maxlength: number = 35;
  private fechaTablas: string = moment().utc().format('YYYY-MM-DD');
  private ComponetName: string = '';

  private isLoading: boolean = false;

  private isError: boolean = false;

  private MovApi = new MovPileApi(this.$store.getters.getAuthToken);
  private MovReports = new MovRepoPielApi(this.$store.getters.getAuthToken);

  public async mounted() {
    this.keyDown();
    this.ports = await this.$serial.getCOMPorts();
    this._serialPortListener();

    // Tries to connect to port if exist on the local storage
    const portFromLocalDB = await this.$local.getCurrentBasculaConnectionPort();
    if (portFromLocalDB !== undefined && portFromLocalDB !== '') {
      this.portPath = portFromLocalDB;
      this.btnConnectPort.click();
    }

    this.imprimir = true;
    this.openForm();
    await this.MovPiesSf();
    await this.MovPiesSfPeso();
    await this.proximasGuias();
  }

  public beforeDestroy() {
    // Remove listener to avoid duplication and memory leaks and then subscribe to them again
    ipcRenderer.removeAllListeners('port_connected');
    ipcRenderer.removeAllListeners('serial_data_utf8');
  }

  public async discoverPorts() {
    this.ports = await this.$serial.getCOMPorts();
  }

  public get connectedDisconnected() {
    return this.isPortConnected ? 'Conectado' : 'Desconectado';
  }

  public validateLengthObs(n: number) {
    if (this.observa.length < n) {
      return;
    }
    this.observa = this.observa.slice(0, n);
  }

  public async closeMovUno() {
    await this.MovPiesSf();
    await this.MovPiesSfPeso();
    this.isMovPilesUno = !this.isMovPilesUno;
  }

  public validar() {
    if (
      this.codindv === 0 ||
      this.fechaMov === '' ||
      this.observa === '' ||
      this.pesoPiel === 0
    ) {
      return false;
    }
    return true;
  }

  public disconnectPort() {
    this.$serial.disconnectPort();
    this.isPortConnected = false;
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private clickRptPielPie() {
    this.isRptPielPie = !this.isRptPielPie;
  }

  private keyDown() {
    window.addEventListener('keydown', async (e) => {
      const eventos: string = `F2 = SIGUIENTE REGISTRO \nF3 = Guardar \nF5 = OBTENER PESO DE LA BASCULA`;
      switch (e.key) {
        case 'F1':
          this.showOutput(false, eventos);
          break;
        case 'F2':
          this.siguienteRegistro();
          break;
        case 'F3': {
          this.guardarRegistro();
          // this.isLoading = true;
          // try {
          //   const pdf = await this.MovReports.getSticPielPDF(this.auton);
          //   ipcRenderer.send('save_pdf', pdf.data);
          //   this.isLoading = false;
          //   return;
          // } catch (e) {
          //   Sentry.captureException(e);
          //   this.showOutput(false, 'No hay datos que mostrar en el informe.');
          //   this.isLoading = false;
          // }
          break;
        }
        case 'F5':
          this.onBasculaChanged();
          break;
        // case 'F9':
        //   this.isLoading = true;
        //   try {
        //     if (
        //       this.$store.getters.getTConfinv1.ImprimirInf === true ||
        //       this.$store.getters.getTConfinv1.ImprimirInf === 1
        //     ) {
        //       // TODO: Impresion de enc (impresora de caja)
        //       this.isLoading = false;
        //       return;
        //     }
        //   } catch (e) {
        //     Sentry.captureException(e);
        //     this.showOutput(false, 'No se pudo procesar la informacion.');
        //     this.isLoading = false;
        //   }
        //   break;
        // case 'F10': {
        //   this.clickRptPielPie();
        //   this.isLoading = true;
        //   try {
        //     const pdf2 = await this.MovReports.getSticPielPiePDF();
        //     ipcRenderer.send('save_pdf', pdf2.data);
        //     this.isLoading = false;
        //     return;
        //   } catch (e) {
        //     Sentry.captureException(e);
        //     this.showOutput(false, 'No hay datos que mostrar en el informe.');
        //     this.isLoading = false;
        //   }
        //   break;
        // }
      }
    });
  }

  private downloadCSV(csv: any, filename: string) {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: 'text/csv' });
    downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  private exporTable(file: string) {
    if (this.movPiesSfPeso.length === 0) {
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

  private exporTablePieles(file: string) {
    if (this.movPiesSf.length === 0) {
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

  private connectToPort() {
    if (this.portPath === '') {
      this.showOutput(false, 'Debe seleccionar un puerto al cual conectarse.');
      return;
    }
    this.$serial.connectToPort(this.portPath);
  }

  private dobleClickNGuiaMovPieles(auton: number) {
    this.autonUno = auton;
    this.isMovPilesUno = !this.isMovPilesUno;
  }

  private RptSticPiel(Auton: number) {
    this.autonRptPieles = Auton;
    this.isRptSticPiel = !this.isRptSticPiel;
  }

  private onBasculaChanged() {
    this.pesoPiel = this.pesoBascula;
  }

  private convertirFecha(fecha: string) {
    return moment(fecha).format('YYYY-MM-DD');
  }

  private async minValue(): Promise<number> {
    try {
      const response = await this.MovApi.getMinValue();
      return response.data[0].min;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener numero de guia.');
      return -1;
    }
  }

  private async numAnimal() {
    try {
      const response = await this.MovApi.geNanimal(this.nGuia);
      this.nAnim = response.data[0].NoAnimales;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener numero de animal.');
    }
  }

  private async nomP() {
    try {
      const response = await this.MovApi.geNomP(this.nGuia);
      this.Nit = response.data[0].NombreP;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener nombre/nit del tercero.');
    }
  }

  private async comenzarProceso() {
    this.isLoading = true;
    try {
      const minVal = await this.minValue();

      if (minVal === null) {
        this.showOutput(false, 'No hay mas registros para modificar.');
        this.isLoading = false;
        return;
      }

      const response = await this.MovApi.getComenzarProceso(minVal);

      this.nGuia = response.data[0].NGuia;
      this.codindv = response.data[0].CodigoIndiv;
      this.fechaMov = moment(this.$store.getters.getFechaProceso).format(
        'YYYY-MM-DDThh:mm',
      );
      this.observa = response.data[0].Observac;
      this.pesoPiel = response.data[0].PesoPiel;
      this.auton = response.data[0].Auton;

      await this.numAnimal();
      await this.nomP();

      this.canEditPeso = this.$store.getters.getTConfinv1.puedeModPes;

      if (
        this.$store.getters.getTConfinv1.ImprimirInf === true ||
        this.$store.getters.getTConfinv1.ImprimirInf === 1
      ) {
        // TODO: Impresion de enc (impresora de caja)
        this.isLoading = false;
        return;
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al comenzar proceso.');
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  private async siguienteRegistro() {
    this.isLoading = true;
    this.pesoBascula = 0;

    try {
      const minVal = await this.minValue();
      if (minVal === null) {
        this.showOutput(true, 'No hay mas registros para modificar.');
        this.nGuia = 0;
        this.codindv = 0;
        this.nAnim = 0;
        this.observa = '';
        this.pesoPiel = 0;
        this.Nit = '';
        this.fechaMov = '';
        this.isLoading = false;
        return;
      }
      const response = await this.MovApi.getComenzarProceso(minVal);

      this.nGuia = response.data[0].NGuia;
      this.codindv = response.data[0].CodigoIndiv;
      this.fechaMov = moment().format('YYYY-MM-DDThh:mm');
      this.observa = response.data[0].Observac;
      this.pesoPiel = response.data[0].PesoPiel;
      this.auton = response.data[0].Auton;

      await this.numAnimal();
      await this.nomP();

      this.isLoading = false;
      const foco = this.$refs.pesoFocu as HTMLInputElement;
      if (foco) {
        foco.focus();
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener siguiente registro.');
    } finally {
      this.isLoading = false;
    }
    // foco.focus();
  }

  private async MovPiesSf() {
    try {
      const response = await this.MovApi.getMovPiesf();
      this.movPiesSf = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener pieles pesadas.');
    }
  }

  private async MovPiesSfPeso() {
    try {
      const response = await this.MovApi.getMovPiesfPeso();
      this.movPiesSfPeso = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener peso total de pieles.');
    }
  }

  private async proximasGuias() {
    try {
      const response = await this.MovApi.getMovSigte();
      this.ProxiGuia = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener proximas guias.');
    }
  }

  private async guardarRegistro() {
    const Auton: number = this.auton;
    const NAnin: number = this.codindv;
    if (await this.beforeUpdateForm()) {
      return;
    }
    if (this.validar() === false) {
      return;
    }
    try {
      this.isLoading = true;
      const response = await this.MovApi.putGuardar(Auton, NAnin, {
        actualiza: true,
        actualizaSeb: false,
        actualizaW: false,
        anulado: false,
        codigoIndiv: this.codindv,
        fechaMov: moment().format('YYYY-MM-DD h:mm:ss a'),
        fechaProc: this.$store.getters.getFechaProceso,
        fechaSeb: null,
        motivoAnul: '',
        nGuia: this.nGuia,
        observac: this.observa,
        pesoSeb: 0,
        pesopiel: this.pesoPiel,
        usuario: this.$store.getters.getUsuario,
      });
      if (response.statusCode !== 200) {
        this.showOutput(true, 'Error al guardar, revise los datos.');
        this.isLoading = false;
        return;
      }
      await this.MovPiesSfPeso();
      await this.MovPiesSf();

      // TODO: Se comenta la linea a petición, en pruebas de produccion, verificar si debe ir comentada.
      // await this.siguienteRegistro();
      this.ProxiGuia = [];
      await this.proximasGuias();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al guardar registro.');
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }
  private beforeUpdateForm() {
    const fecha: string = moment(this.fechaMov).utc().format('YYYY-MM-DD');
    const fechaProc1: string = moment(
      this.$store.getters.getTConfinv1.fechaProc1,
    )
      .utc()
      .format('YYYY-MM-DD');
    const fechaProc2: string = moment(
      this.$store.getters.getTConfinv1.fechaProc2,
    )
      .utc()
      .format('YYYY-MM-DD');
    if (this.nGuia === 0) {
      this.showOutput(true, 'No GUIA no puede ser cero.');
      return true;
    }
    if (this.pesoPiel === 0) {
      this.showOutput(true, 'El peso no puede ser cero.');
      return true;
    }

    if (fecha < fechaProc1 || fecha > fechaProc2) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido.');
      return true;
    }

    return false;
  }

  private openForm() {
    this.canEditPeso = this.$store.getters.getTConfinv1.puedeModPes;
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
      log.info(`Data received SerialCom Class: ${data}`);
      this.pesoBascula = Number(data);
      this.pesoPiel = this.pesoBascula;
      this.guardarRegistro();
    });
  }
}
</script>
