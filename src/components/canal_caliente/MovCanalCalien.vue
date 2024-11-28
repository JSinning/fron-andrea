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
    <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
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

    <!-- modal Proximas Guias-->
    <div>
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="isModalVisible"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <div class="main-div mb-2">
              <div class="card-table">
                <h1 class="ml-5 mb-3 title">Canales Por Pesar</h1>
                <table class="table-fixed w-full text-xs">
                  <thead>
                    <tr
                      class="border-b border-gray-500 text-white bg-andrea font-bold"
                    >
                      <th>Guia</th>
                      <th>M - Canales</th>
                      <th>Tipo</th>
                    </tr>
                  </thead>
                  <tbody class="text-center">
                    <tr
                      class="border-b border-gray-500"
                      v-for="data in nextGuides"
                      v-bind:key="data.NGuia"
                    >
                      <td @dblclick="guiaSfDoubleClick(data.NGuia)">
                        {{ data.NGuia }}
                      </td>
                      <td>{{ data.NMedia }}</td>
                      <td>{{ data.Expr1 }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button
              class="rounded btn-delete px-6 mt-1 py-2 w-3/12 m-auto mb-2"
              @click="toggleModal()"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal Proximas Guias -->

    <!-- modal Cuartos Frios -->
    <div>
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="modalCuartoFrio"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <CanalFrio></CanalFrio>
            <button
              class="rounded btn-delete px-6 mt-1 py-2 w-3/12 m-auto mb-2"
              @click="toggleModalCanalFrio()"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal Cuartos Frios -->

    <!-- modal Peso Pieles -->
    <div>
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="modalPesoPiel"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <PesoPiel></PesoPiel>
            <button
              class="rounded btn-delete px-6 mt-1 py-2 w-3/12 m-auto mb-2"
              @click="toggleModalPesoPiel()"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal Peso Pieles -->

    <!-- modal Movimiento del dia -->
    <div>
      <div class="modal" v-if="modalMovimientoDia">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col p-2">
            <MovimientoDia></MovimientoDia>
            <button
              class="btn-delete w-3/12 m-auto mb-2"
              @click="modalMovimientoDia = false"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal Movimiento del dia -->

    <!-- modal Doble Click Nguia Canales Pesadas -->
    <div>
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="modalCanalesPesadas"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <CanalesPesadas
              v-bind:idAuton="idAuton"
              v-bind:modalCanalesPesadas="modalCanalesPesadas"
            />
            <button
              class="rounded btn-delete px-6 mt-1 py-2 w-3/12 m-auto mb-2"
              @click="toggleModalCanalesPesadas()"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal Doble Click Nguia Canales Pesadas -->

    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap">
        <div class="px-3 md:w-1/3 mt-2 mb-6 md:mb-0">
          <h1 class="title">CANAL CALIENTE</h1>
        </div>
        <div class="px-3 md:w-1/2 mb-6 md:mb-0">
          <button @click="toggleModal()" class="btn-save">
            Proximas Guias
          </button>
          <button @click="toggleModalCanalFrio()" class="btn-save">
            Cuartos Frios
          </button>
          <button @click="toggleModalPesoPiel()" class="btn-save">
            Peso Pieles
          </button>
        </div>
        <div class="md:w-full -mt-3 md:mb-0" style="margin-left: 380px">
          <button @click="startProcess()" class="btn-primary">
            Comenzar Proceso
          </button>
          <button @click="nextRegister()" class="btn-save">
            Siguiente Registro
          </button>
          <button @click="beforeUpdateEvent()" class="btn-save">Guardar</button>
          <button @click="informes()" class="btn-link">
            <img src="@/assets/img/impresora.png" class="mt-4" />
          </button>
        </div>
      </div>

      <div class="card mt-5">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">No Guia:</label>
            <input type="text" class="input" v-model="nGuia" />
          </div>
          <div class="md:w-1/6 px-3 mb-6 md:mb-0">
            <label class="label">Codigo Individual:</label>
            <input type="text" class="input" v-model="codigoIndiv" />
          </div>
          <div class="md:w-1/8 px-3 mb-6 md:mb-0">
            <label class="label"> Mitad : </label>
            <select class="select-rounded">
              <option :value="mitadAn">{{ mitadAn }}</option>
            </select>
          </div>
          <div class="md:w-1/6 px-3 mb-6 md:mb-0">
            <label class="label">No Animal:</label>
            <input type="text" class="input" v-model="nAnimal" />
          </div>
          <div class="md:w-1/6 px-3 mb-6 md:mb-0">
            <label class="label"> Cuarto Frio : </label>
            <select class="select-rounded" v-model="cuartoFr">
              <option
                v-for="value in cuartoFrio"
                :value="value.IdCuartoF"
                :key="value.IdCuartoF"
              >
                {{ value.DescripcionCF }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mt-3 mb-3">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label"> Codigo C.C ó Nit : </label>
            <select class="select-rounded">
              <option>{{ nit }}</option>
            </select>
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Fecha y Hora Pesaje:</label>
            <input type="datetime-local" class="input" v-model="fechaMov" />
          </div>
          <div class="md:w-1/6 px-1 mb-6 md:mb-0">
            <label class="label"> Conformacion de la Canal: </label>
            <select class="select-rounded" v-model="conformacionC">
              <option value="E">EXCELENTE</option>
              <option value="B">BUENO</option>
              <option value="R">REGULAR</option>
              <option value="I">INFERIOR</option>
            </select>
          </div>
          <div class="md:w-1/6 px-1 mb-6 md:mb-0">
            <label class="label"> Grado de Acabado: </label>
            <select class="select-rounded" v-model="gAcabado">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-3">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Observaciones:</label>
            <input type="text" class="input" v-model="observac" />
          </div>
          <div class="md:w-1/6 px-3 mt-4 mb-6 md:mb-0">
            <label class="label">
              Posee Rabo :
              <input
                class="mr-2 py-1 pr-2 mt-1 leading-tight"
                type="checkbox"
                v-model="poseeRab"
              />
            </label>
          </div>
          <div class="md:w-1/3 px-20 mt-4 mb-6 md:mb-0">
            <label class="label">
              Exportacion :
              <input
                class="mr-2 leading-tight"
                type="checkbox"
                v-model="exportacion"
              />
            </label>
          </div>
        </div>

        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mt-2 mb-6 md:mb-0">
            <label class="label text-center text-xl -ml-2"
              >Peso Media Canal:</label
            >
            <input
              type="text"
              placeholder="0"
              v-bind:class="{
                'opacity-50 cursor-not-allowed hover:bg-white': lookPesoCanal,
              }"
              :disabled="lookPesoCanal"
              class="input py-0 -mt-2 border-transparent text-red-700 text-3xl text-center"
              v-model="pesoCanal"
            />
          </div>

          <div class="md:w-1/2 px-3 mt-2 mb-6 md:mb-0">
            <label class="label text-center text-xl -ml-2">Bascula:</label>
            <input
              type="number"
              v-model="bascula"
              @change="onBasculaChanged()"
              class="input py-0 -mt-2 border-transparent text-red-700 text-3xl text-center"
              placeholder=",00"
              disabled
            />
          </div>
        </div>
      </div>

      <!-- table -->
      <div class="flex flex-row flex-wrap mb-3">
        <div class="md:w-1/2 h-40 card-table">
          <table class="table-auto w-full text-xs" id="tablaB">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>Guia</th>
                <th>Cod</th>
                <th>Mitad</th>
                <th>Peso</th>
                <th>Impreso</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="data in heavyCanal" v-bind:key="data.Auton">
                <td @dblclick="dblClickNguia(data.Auton)">{{ data.NGuia }}</td>
                <td>{{ data.CodigoIndiv }}</td>
                <td @dblclick="mitadAnDoubleClick(data.NGuia, data.Auton)">
                  {{ data.MitadAn }}
                </td>
                <td>{{ data.PesoCanal }}</td>
                <td>{{ data.Imprime }}</td>
                <td>{{ data.Fech }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="md:w-1/2 h-40 card-table">
          <table class="table-auto w-full text-xs" id="tablaA">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>Guia</th>
                <th>M - Canales</th>
                <th>Peso Total</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="data in totalWeight" v-bind:key="data.Auton">
                <td>{{ data.NGuia }}</td>
                <td>{{ data.NMedi }}</td>
                <td>{{ data.PesoGuia }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-3 -mt-4">
        <div class="md:w-1/2 flex flex-col">
          <button
            class="btn-primary w-full"
            @click="exportTableCPesadas(`CanalesPesadas_${fechaTablas}.csv`)"
          >
            Exportar Csv Canales Pesadas
          </button>
        </div>
        <div class="md:w-1/2 flex flex-col">
          <button
            class="btn-primary w-full"
            @click="exportTotalPeso(`PesoTotalCanales_${fechaTablas}.csv`)"
          >
            Exportar Csv Total Canales
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
          <button class="btn-save" @click="toggleModalMovimientoDia()">
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

    <!-- modal movimiento del dia-->
    <div>
      <div class="modal" v-if="isRepots">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col p-2">
            <component
              v-bind:is="componentName"
              v-bind:idNGuia="NGuiaUno"
              v-bind:idAuton="autonUno"
            />
            <button
              class="btn-delete w-3/12 m-auto mb-2"
              @click="isRepots = !isRepots"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->

    <!-- modal movCanalCalUno -->
    <div>
      <div class="modal" v-if="modalCanalCalUno">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col p-2">
            <MovCanalCaluno v-bind:idAuton="idAutoUno" />
            <button
              class="btn-delete w-3/12 m-auto mb-2"
              @click="closeMovCanaCalUno()"
            >
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

import MovCanalCaluno from '@/components/canal_caliente/MovCanalCaluno.vue';
import CanalesPesadas from './MovCanalCaluno.vue';
import PesoPiel from './MovPielesSfPeso.vue';
import CanalFrio from './MovSfCFrioEnc.vue';

import AlertBox from '@/components/reusable/AlertBox.vue';
import CanalCaliente from '@/remote/api/CanalCaliente';
import MovCCalienteApi from '@/remote/api/ReportesCanalCaliente';
import MovimientoDia from './SubDetRelaCCanDia.vue';

import Loader from '@/components/reusable/Loader.vue';

import * as Sentry from '@sentry/browser';

import PDFPreview from '@/components/reusable/PdfPreview.vue';

import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

const { ipcRenderer } = window;

@Component({
  components: {
    AlertBox,
    CanalFrio,
    CanalesPesadas,
    Loader,
    ModalPDFPreview,
    MovCanalCaluno,
    MovimientoDia,
    PDFPreview,
    PesoPiel,
  },
  name: 'Mov',
})
export default class MovCanalCalien extends Vue {
  @Ref('connecuarctPort') private readonly btnConnectPort!: HTMLButtonElement;
  private isModalVisible: boolean = false;
  private modalCuartoFrio: boolean = false;
  private modalPesoPiel: boolean = false;
  private modalMovimientoDia: boolean = false;
  private modalCanalesPesadas: boolean = false;
  private modalCanalCalUno: boolean = false;
  private isRepots: boolean = false;

  private isError: boolean = false;

  private isLoading: boolean = false;

  private output: string = '';
  private minAuton: number = 0;
  private nGuia: number = 0;
  private codigoIndiv: number = 0;
  private fechaMov: string = '';
  private pesoCanal: number = 0;
  private bascula: number = 0.0;
  private poseeRab: boolean = false;
  private mitadAn: string = '';
  private observac: string = '';
  private exportacion: boolean = false;
  private cuartoFr: number = 0;
  private nAnimal: number = 0;
  private nit: string = '';
  private auton: number = 0;
  private actualiza: boolean = false;
  private actualizaW: boolean = false;
  private imprime: string = '';
  private motivoAnul: string = '';
  private anulado: boolean = false;
  private conformacionC: string = '';
  private clasificacionC: string = '';
  private gAcabado: string = '';
  private edadA: string = '';
  private ordenDia: number = 0;
  private fechaMod: string = '';
  private fechaProc: string = '';
  private usuario: string = '';

  private message: string = '';
  private nextGuides: any = [];
  private heavyCanal: any = [];
  private totalWeight: any = [];
  private cuartoFrio: any = [];

  private fechaProc1: string = '';
  private fechaProc2: string = '';
  private puedeMod: boolean = false;
  private fechaTablas: string = moment().utc().format('YYYY-MM-DD');
  private componentName: string = '';
  private autonUno: number = 0;
  private NGuiaUno: number = 0;

  private idAuton: number = 0;
  private pesoC1: number = 0;
  private pesoC2: number = 0;

  private categoriaA: string = '';
  private LTipoRecep: number = 0;

  private ports: any[] = [];
  private isPortConnected: boolean = false;
  private portPath: string = '';

  private lookPesoCanal: boolean = false;

  private idAutoUno: number = 0;

  private DataFri: any = [];

  private pdfData: string = '';
  private pdfData2: string = '';
  private showModalPDF: boolean = false;
  private showModalPDF2: boolean = false;

  private canalCaliente = new CanalCaliente(this.$store.getters.getAuthToken);
  private MovApi = new MovCCalienteApi(this.$store.getters.getAuthToken);

  public toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  public toggleModalCanalFrio() {
    this.modalCuartoFrio = !this.modalCuartoFrio;
  }

  public toggleModalCanalUno() {
    this.modalCanalCalUno = !this.modalCanalCalUno;
  }

  public toggleModalPesoPiel() {
    this.modalPesoPiel = !this.modalPesoPiel;
  }

  public toggleModalMovimientoDia() {
    this.modalMovimientoDia = !this.modalMovimientoDia;
  }

  public toggleModalCanalesPesadas() {
    this.modalCanalesPesadas = !this.modalCanalesPesadas;
  }

  public closeModalPDF() {
    this.showModalPDF = false;
  }

  public closeModalPDF2() {
    this.showModalPDF2 = false;
  }

  public clearForm() {
    this.nGuia = 0;
    this.codigoIndiv = 0;
    this.nAnimal = 0;
    this.nit = '';
    this.cuartoFr = 0;
    this.mitadAn = '';
    this.fechaMov = '';
    this.poseeRab = false;
    this.exportacion = false;
    this.observac = '';
    this.gAcabado = '';
    this.conformacionC = '';
    this.pesoCanal = 0;
  }

  public created() {
    this.openView();
    this.nextGuide();
    this.listCanales();
    this.totalWeights();
    this.listCuartoFrio();
    this.keyDown();
  }

  public async mounted() {
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
    ipcRenderer.removeAllListeners('port_connected');
    ipcRenderer.removeAllListeners('serial_data_utf8');
  }

  public async discoverPorts() {
    this.ports = await this.$serial.getCOMPorts();
  }

  public get connectedDisconnected() {
    return this.isPortConnected ? 'Conectado' : 'Desconectado';
  }

  public async closeMovCanaCalUno() {
    await this.listCanales();
    this.modalCanalCalUno = !this.modalCanalCalUno;
  }

  private async guiaSfDoubleClick(nguia: number) {
    try {
      this.isLoading = true;
      const pdf = await this.MovApi.getStickMCan1PDF(nguia);
      this.pdfData = pdf.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
    }

    try {
      this.isLoading = true;
      const pdf2 = await this.MovApi.getStickMCan2PDF(nguia);
      this.pdfData2 = pdf2.data;
      this.showModalPDF2 = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
    }
  }

  private downloadCSV(csv: any, filename: string) {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: 'text/csv;' });
    downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  private exportTotalPeso(file: string) {
    if (this.totalWeight.length === 0) {
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

  private exportTableCPesadas(file: string) {
    if (this.heavyCanal.length === 0) {
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

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private convertDate(fecha: string) {
    return moment(fecha).format('YYYY-MM-DD');
  }

  private async listCuartoFrio() {
    try {
      const result = await this.canalCaliente.getCuartosFrios();
      this.cuartoFrio = result.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener cuartos frios.');
    }
  }

  private async nextGuide() {
    try {
      const result = await this.canalCaliente.getMovPielesSfSgte();
      this.nextGuides = result.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener proximas guias.');
    }
  }

  private async listCanales() {
    try {
      const result = await this.canalCaliente.getMovCanalCalienSf();
      this.heavyCanal = result.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener canales pesadas.');
    }
  }

  private async totalWeights() {
    try {
      const result = await this.canalCaliente.getMovCanalCalienSfPeso();
      this.totalWeight = result.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener total de canales pesadas.');
    }
  }

  private async processByAuton() {
    try {
      const result = await this.canalCaliente.minAuton();
      this.minAuton = result.data[0].Auton;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener minima guia correspondiente.');
    }
  }

  private async startProcess() {
    this.isLoading = true;
    await this.processByAuton();
    const id = this.minAuton;
    if (id === null) {
      this.showOutput(false, 'No hay mas registros para modificar.');
      return;
    }
    try {
      const result = await this.canalCaliente.getbyidAuto(id);
      const values = result.data;
      this.auton = values.auton;
      this.nGuia = values.nGuia;
      this.codigoIndiv = values.codigoIndiv;
      this.fechaMov = moment().format('YYYY-MM-DDThh:mm');
      this.pesoCanal = values.pesoCanal;
      this.poseeRab = values.poseeRab;
      this.mitadAn = values.mitadAn;
      this.observac = values.observac;
      this.exportacion = values.exportacion;
      this.cuartoFr = values.cuartoFr;
      this.actualiza = values.actualiza;
      this.actualizaW = values.actualizaW;
      this.imprime = values.imprime;
      this.motivoAnul = values.motivoAnul;
      this.anulado = values.anulado;
      this.conformacionC = values.conformacionC;
      this.clasificacionC = values.clasificacionC;
      this.gAcabado = values.gAcabado;
      this.edadA = values.edadA;
      this.ordenDia = values.ordenDia;
      this.fechaMod = this.$store.getters.getFechaProceso;
      this.fechaProc = this.$store.getters.getFechaProceso;
      this.usuario = values.usuario;
      this.numberAnimal(this.nGuia);
      this.valueNit(this.nGuia);
      this.pesoCanal = values.pesoCanal;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al comenzar proceso.');
    } finally {
      this.isLoading = false;
    }
  }

  private async nextRegister() {
    this.isLoading = true;
    await this.processByAuton();
    const id = this.minAuton;
    if (id === null) {
      this.showOutput(true, 'No hay mas registros para modificar.');
      this.isLoading = false;
      return;
    }

    try {
      const result = await this.canalCaliente.getbyidAuto(id);
      const values = result.data;
      this.auton = values.auton;
      this.nGuia = values.nGuia;
      this.codigoIndiv = values.codigoIndiv;
      this.fechaMov = moment().format('YYYY-MM-DDThh:mm');
      this.pesoCanal = values.pesoCanal;
      this.poseeRab = values.poseeRab;
      this.mitadAn = values.mitadAn;
      this.observac = values.observac;
      this.exportacion = values.exportacion;
      this.cuartoFr = values.cuartoFr;
      this.actualiza = values.actualiza;
      this.actualizaW = values.actualizaW;
      this.imprime = values.imprime;
      this.motivoAnul = values.motivoAnul;
      this.anulado = values.anulado;
      this.conformacionC = values.conformacionC;
      this.clasificacionC = values.clasificacionC;
      this.gAcabado = values.gAcabado;
      this.edadA = values.edadA;
      this.ordenDia = values.ordenDia;
      this.fechaMod = this.$store.getters.getFechaProceso;
      this.fechaProc = this.$store.getters.getFechaProceso;
      this.usuario = values.usuario;
      this.numberAnimal(this.nGuia);
      this.valueNit(this.nGuia);
      this.pesoCanal = values.pesoCanal;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al comenzar proceso.');
    } finally {
      this.isLoading = false;
    }
  }

  private clearOutput() {
    this.output = '';
  }

  private async numberAnimal(id: number) {
    try {
      const result = await this.canalCaliente.getByNGuia(id);
      this.nAnimal = result.data[0].NoAnimales;
      this.categoriaA = result.data[0].CategoriaA.toString();
      this.LTipoRecep = result.data[0].EsRecepGanado;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener numero animal.');
    }
  }

  private async valueNit(id: number) {
    try {
      const result = await this.canalCaliente.getNombreByNGuia(id);
      this.nit = result.data[0].NombreP;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener nombre/nit del tercero.');
    }
  }

  private async beforeUpdateEvent() {
    const fecha: string = moment(this.fechaProc).format('YYYY-MM-DD');
    try {
      const result = await this.canalCaliente.getCofigurSacr();
      this.fechaProc1 = moment(result.data.fechaProc1)
        .utc()
        .format('YYYY-MM-DD');
      this.fechaProc2 = moment(result.data.fechaProc2)
        .utc()
        .format('YYYY-MM-DD');
      this.puedeMod = result.data.puedeMod;

      if (fecha < this.fechaProc1 || fecha > this.fechaProc2) {
        this.showOutput(true, 'La fecha esta fuera del limite permitido.');
        return;
      }
      if (
        this.nGuia === 0 &&
        this.mitadAn === '' &&
        !this.poseeRab &&
        this.cuartoFr === 0 &&
        this.pesoCanal === 0 &&
        this.conformacionC === ''
      ) {
        this.showOutput(false, 'Ingrese todos los datos correspondientes.');
        return;
      }
      await this.addMov();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al procesar informacion.');
    }
  }

  private async addMov() {
    const id = this.auton;
    if (await this.eventNextUpdatePeso()) {
      return;
    }

    try {
      this.isLoading = true;
      const result = await this.canalCaliente.putMov(id, {
        actualiza: 1,
        actualizaW: this.actualizaW,
        anulado: this.anulado,
        clasificacionC: this.clasificacionC,
        codigoIndiv: this.codigoIndiv,
        conformacionC: this.conformacionC,
        cuartoFr: this.cuartoFr,
        edadA: this.edadA,
        exportacion: this.exportacion,
        fechaMod: this.$store.getters.getFechaProceso,
        fechaMov: moment().format('YYYY-MM-DD h:mm:ss a'),
        fechaProc: this.$store.getters.getFechaProceso,
        gAcabado: this.gAcabado,
        imprime: this.imprime,
        mitadAn: this.mitadAn,
        motivoAnul: this.motivoAnul,
        nGuia: this.nGuia,
        observac: this.observac,
        ordenDia: this.ordenDia,
        pesoCanal: this.pesoCanal,
        poseeRab: this.poseeRab,
        usuario: this.$store.getters.getUsuario,
      });
      if (result.statusCode !== 200) {
        this.showOutput(true, 'Error al guardar datos, intente nuevamente.');
      }
      await this.clearForm();
      await this.processByAuton();
      this.totalWeight = [];
      await this.totalWeights();
      await this.listCanales();
      await this.startProcess();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al añadir registro.');
    } finally {
      this.isLoading = false;
    }
  }

  private async dblClickNguia(id: number) {
    const result = await this.canalCaliente.getCofigurSacr();
    this.puedeMod = result.data.puedeMod;
    if (!this.puedeMod) {
      this.showOutput(true, 'Usted no esta autorizado para realizar cambios.');
      return;
    }
    this.idAutoUno = id;
    this.toggleModalCanalUno();
  }

  private async eventNextUpdatePeso() {
    try {
      const result = await this.canalCaliente.getByCategoria(
        parseInt(this.categoriaA, 10),
      );
      this.pesoC1 = result.data[0].pesoC1;
      this.pesoC2 = result.data[0].pesoC2;
      if (this.pesoCanal < this.pesoC1 || this.pesoCanal > this.pesoC2) {
        this.showOutput(true, 'El peso esta fuera de limite.');
        return true;
      }
      await this.ordenDias();
      return false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al procesar informacion.');
    }
  }

  private async ordenDias() {
    const result: any = await this.friSacriOrdenDia();

    if (this.ordenDia === null || this.ordenDia === 0) {
      if ((await this.friSacriOrdenDia()) === null) {
        this.ordenDia = 1;
      }

      result + 1 === null ? (this.ordenDia = 1) : (this.ordenDia = result + 1);
    }
  }
  private async friSacriOrdenDia() {
    try {
      const response = await this.canalCaliente.getfriSacriOrdia();
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

  private async openView() {
    const result = await this.canalCaliente.getCofigurSacr();
    if (result.data.puedeModPes === false) {
      this.lookPesoCanal = false;
      return;
    }
    this.lookPesoCanal = true;
  }

  private async informes() {
    if (this.minAuton === 0) {
      this.showOutput(
        false,
        'No hay informacion que imprimir, favor comienzar proceso',
      );
      return;
    }
    try {
      this.isLoading = true;
      const response = await this.canalCaliente.getCofigurSacr();
      if (!response.data.vPrelimin) {
        this.imprime = 'S';
        this.autonUno = this.minAuton;
        this.NGuiaUno = this.nGuia;

        try {
          const pdf = await this.MovApi.getStickMCanPDF(this.autonUno);
          this.pdfData = pdf.data;
          this.showModalPDF = true;
          this.isLoading = false;
          return;
        } catch (e) {
          Sentry.captureException(e);
          this.showOutput(false, 'No hay datos que mostrar en el informe.');
          this.isLoading = false;
        }
      } else {
        this.imprime = 'S';
        this.autonUno = this.minAuton;
        this.NGuiaUno = this.nGuia;

        try {
          const pdf = await this.MovApi.getSticCanal(this.autonUno);
          this.pdfData = pdf.data;
          this.showModalPDF = true;
          this.isLoading = false;
          return;
        } catch (e) {
          Sentry.captureException(e);
          this.showOutput(false, 'No hay datos que mostrar en el informe.');
          this.isLoading = false;
        }
      }

      if (!response.data.imprimTiri) {
        if (this.LTipoRecep === 1) {
          this.autonUno = this.minAuton;
          this.NGuiaUno = this.nGuia;
          try {
            const pdf = await this.MovApi.getSticCanal(this.autonUno);
            ipcRenderer.send('save_pdf', pdf.data);
            this.isLoading = false;
            return;
          } catch (e) {
            Sentry.captureException(e);
            this.showOutput(false, 'No hay datos que mostrar en el informe.');
            this.isLoading = false;
          }
        }
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async mitadAnDoubleClick(nGuia: number, auton: number) {
    if (auton === 0) {
      this.showOutput(true, 'Eroror al buascar el archivo');
      return;
    }
    try {
      this.isLoading = true;
      const response = await this.canalCaliente.getCofigurSacr();
      if (!response.data.vPrelimin) {
        this.autonUno = auton;
        this.NGuiaUno = nGuia;
        try {
          const pdf = await this.MovApi.getStickMCanPDF(this.autonUno);
          this.pdfData = pdf.data;
          this.showModalPDF = true;
          this.isLoading = false;
        } catch (e) {
          Sentry.captureException(e);
          this.showOutput(false, 'No hay datos que mostrar en el informe.');
          this.isLoading = false;
        }
      } else {
        this.autonUno = auton;
        this.NGuiaUno = nGuia;
        try {
          const pdf = await this.MovApi.getStickMCanPDF(this.autonUno);
          this.pdfData = pdf.data;
          this.showModalPDF = true;
          this.isLoading = false;
        } catch (e) {
          Sentry.captureException(e);
          this.showOutput(false, 'No hay datos que mostrar en el informe.');
          this.isLoading = false;
        }
      }

      if (!response.data.imprimTiri) {
        if (this.LTipoRecep === 1) {
          this.autonUno = auton;
          this.NGuiaUno = nGuia;
          try {
            const pdf = await this.MovApi.getSticCanal(this.autonUno);
            ipcRenderer.send('save_pdf', pdf.data);
            this.isLoading = false;
            return;
          } catch (e) {
            Sentry.captureException(e);
            this.showOutput(false, 'No hay datos que mostrar en el informe.');
            this.isLoading = false;
          }
        }
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private keyDown() {
    window.addEventListener('keydown', (e) => {
      const eventos: string =
        'F2 = SIGUIENTE REGISTRO\nF3 = GUARDAR\n F8 = Imprimir Etiqueta';
      if (e.key === 'F1') {
        this.showOutput(false, eventos);
      }
      if (e.key === 'F2') {
        this.nextRegister();
      }
      if (e.key === 'F3') {
        this.beforeUpdateEvent();
      }
      if (e.key === 'F8') {
        this.informes();
      }
    });
  }

  private onBasculaChanged() {
    this.pesoCanal = this.bascula;
  }

  private disconnectPort() {
    this.$serial.disconnectPort();
    this.isPortConnected = false;
  }
  private connectToPort() {
    if (this.portPath === '') {
      this.showOutput(false, 'Debe seleccionar un puerto al cual conectarse.');
      return;
    }
    this.$serial.connectToPort(this.portPath);
  }
  private _serialPortListener() {
    ipcRenderer.on('port_connected', async () => {
      const isPortOpen = await this.$serial.isPortOpen();
      if (!isPortOpen) {
        this.showOutput(
          true,
          'No se ha podido establecer comunicacion con el puerto seleccionado.',
        );
        this.isPortConnected = false;
        return;
      }

      this.isPortConnected = true;
      this.$local.saveCurrentBasculaConnectionPort(this.portPath);
    });

    ipcRenderer.on('serial_data_utf8', async (event, data: string) => {
      this.bascula = data as unknown as number;
      this.pesoCanal = this.bascula;
      await this.beforeUpdateEvent();
    });
  }
}
</script>
