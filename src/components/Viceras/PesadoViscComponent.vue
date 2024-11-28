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

    <div class="main-div">
      <div>
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0">
            <h1 class="title">PESAJE VISCERAS</h1>
          </div>
          <div class="pl-24 mt-2 mb-6 md:mb-0"></div>
          <div class="w-1/2 mb-6 md:mb-0">
            <PaginatedSelect
              v-model="IdConcecutivo"
              :fetch="fetch"
              @change="datosPesaje"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-1 justify-end">
          <div class="pr-20 md:mb-0">
            <button class="btn-primary" @click="adicionarRegistro()">
              Adicionar Registro
            </button>
            <button class="btn-save" @click="modificar()">Modificar</button>
            <button class="btn-save" @click="actualizarCrearDatos()">
              Guardar
            </button>
          </div>
        </div>

        <ul class="flex p-2 -mt-2">
          <li>
            <button class="rounded btn-save" @click="ViewPesaje()">
              Datos Pesaje
            </button>
          </li>

          <li>
            <button class="rounded btn-save" @click="Viewinformes()">
              Informes
            </button>
          </li>
          <li>
            <button class="rounded btn-save" @click="Viewoperario()">
              Operarios
            </button>
          </li>
        </ul>

        <div v-if="Pesaje">
          <div class="card">
            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Pesaje Visceras No:</label>
                <input type="text" class="input" v-model="PeajeNo" readonly />
              </div>
              <div class="px-3 mb-6 md:mb-0">
                <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                  <label class="label">
                    Grupo:
                    <select
                      class="bg-white border py-1 pr-2 select"
                      v-model="GrupoPe"
                      :disabled="readonly"
                    >
                      <option :value="GrupoPe">{{ GrupoPe }}</option>
                      <option
                        v-for="(item, index) in Grupos"
                        :key="index"
                        :value="item.idGrupo"
                      >
                        {{ item.descripGrup }}
                      </option>
                    </select>
                  </label>
                </div>
              </div>
              <div class="px-3 mb-6 md:mb-0">
                <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                  <label class="label">
                    Turno:
                    <select
                      class="bg-white border py-1 pr-2 select"
                      v-model="Turno"
                      :disabled="readonly"
                    >
                      <option :value="Turno">{{ Turno }}</option>
                      <option
                        v-for="(item, index) in Turnos"
                        :key="index"
                        :value="item.turnoS"
                      >
                        {{ item.descripTurn }}
                      </option>
                    </select>
                  </label>
                </div>
              </div>
              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Fecha de Mov:</label>
                <input
                  type="date"
                  class="input"
                  v-model="FechaMov"
                  :readonly="readonly"
                  @change="changeFecha()"
                />
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 pt-4 mb-6 md:mb-0 inline-block relative w-1/2">
                <PaginatedSelect
                  v-model="Tercero"
                  :fetch="fetchTerceros"
                  :disabled="readonly"
                  >Tercero:</PaginatedSelect
                >
              </div>
              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Lote Ext:</label>
                <input
                  type="text"
                  class="input"
                  v-model="LoteExt"
                  :readonly="readonly"
                  @change="changeLote()"
                />
              </div>
              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Numero Visceras a Pesar:</label>
                <input
                  type="text"
                  class="input"
                  v-model="NViseras"
                  :readonly="readonly"
                />
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">
                  Tipo Pes:
                  <select
                    class="bg-white border py-1 pr-2 shadow leading-tight select"
                    v-model="TippPes"
                    :disabled="readonly"
                    @change="tipoPesageAfterUpdte()"
                  >
                    <option :value="TippPes">{{ TippPes }}</option>
                    <option
                      v-for="(item, index) in TiposPesdos"
                      :key="index"
                      :value="item.idTpPesado"
                    >
                      {{ item.descripIdTip }}
                    </option>
                  </select>
                </label>
              </div>
              <div class="pt-5 px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">
                  <input
                    class="mr-2 leading-tight"
                    type="checkbox"
                    v-model="Espropio"
                    :readonly="readonly"
                  />
                  Es propio:
                </label>
              </div>
              <div class="pt-2 px-3 mb-6 md:mb-0 inline-block relative w-48">
                <button class="btn-save" @click="guias()">Guia</button>
              </div>
            </div>
          </div>

          <!-- table -->
          <div class="flex flex-row flex-wrap mb-3">
            <div class="card-table h-48">
              <table class="table-auto w-full text-xs" id="tablaB">
                <thead>
                  <tr
                    class="border-b border-gray-500 text-white bg-andrea font-bold"
                  >
                    <th>Guia</th>
                    <th>No Animales</th>
                    <th>Clase</th>
                    <th>Codigo</th>
                    <th>Producto</th>
                    <th>Descripcion Cliente</th>
                    <th>Descripcion Temperatura</th>
                    <th>ControlxGuia</th>
                    <th>PesoxUnidad</th>
                    <th>Unid.Canastilla</th>
                    <th>Unid.Canastilla Real</th>
                    <th>Dias Vencimiento</th>
                    <th>Tipo Cn</th>
                    <th>Fecha de Generado</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr>
                    <td>{{ TablaPesado.nGuia }}</td>
                    <td></td>
                    <td></td>
                    <td
                      @click="
                        dbleClikCodigo(
                          TablaPesado.idConsecutivo,
                          TablaPesado.codProducto,
                          TablaPesado.autoNum,
                          TablaPesado.descTemper,
                          TablaPesado.encabeza1,
                          TablaPesado.nLoteExt,
                          TablaPesado.fechaPes,
                          TablaPesado.pesajeNo,
                          TablaPesado.fechaVence,
                        )
                      "
                    >
                      {{ TablaPesado.codProducto }}
                    </td>
                    <td>{{ TablaPesado.codProducto }}</td>
                    <td>{{ TablaPesado.descCliente }}</td>
                    <td @change="changeTemp(TablaPesado.descTemp)">
                      {{ TablaPesado.descTemper }}
                    </td>
                    <td>{{ TablaPesado.controlxGuia }}</td>
                    <td>{{ TablaPesado.pesoxUnid }}</td>
                    <td>{{ TablaPesado.unidCanast }}</td>
                    <td>{{ TablaPesado.unidCanastReal }}</td>
                    <td>{{ TablaPesado.diasVenc }}</td>
                    <td>{{ TablaPesado.tpCanas }}</td>
                    <td>{{ TablaPesado.fechaG }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="flex flex-row flex-wrap mb-3 -mt-4">
            <div class="md:w-full">
              <button
                class="btn-primary w-full"
                @click="exporTableDatoPesaje(`DatosPesaje_${fechaTablas}.csv`)"
              >
                Exportar Csv Datos Pesaje
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="informes">
        <div class="flex flex-row flex-wrap mt-4">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">Texto Etiqueta: </label>
            <input
              type="text"
              class="input"
              v-model="TextoEtiqueta"
              :readonly="readonly"
            />
            <label class="label">Realizo: </label>
            <input
              type="text"
              class="input"
              v-model="Realizo"
              :readonly="readonly"
            />
            <label class="label">Observaciones: </label>
            <input
              type="text"
              class="input"
              v-model="Observacion"
              :readonly="readonly"
            />
          </div>
          <div class="flex flex-row flex-wrap mb-2 justify-center">
            <div class="pl-20 pt-8">
              <button class="btn-save p-4" @click="btnReportPreliminar()">
                Informe preliminar
              </button>
            </div>
            <div class="pl-20 pt-8">
              <button class="btn-save p-4" @click="btnReportDefinitivo()">
                Informe definitivo
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="Operari">
        <!-- table -->
        <div class="flex flex-row flex-wrap">
          <div class="card-table">
            <table class="table-auto w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th>Empleado</th>
                  <th>Tabajo</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex flex-row flex-wrap mb-3 -mt-4">
          <div class="md:w-full">
            <button class="btn-primary w-full">Exportar Csv Operrario</button>
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
      <div class="modal" v-if="isPesadoDet2">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col p-2">
            <PesadoViscDet2EncComponent
              v-bind:idConcecutivo="idConPesoDet2"
              v-bind:codigoP="idCodPDet2"
              v-bind:automNum="idAutNumDet2"
            />
            <button
              class="btn-delete w-3/12 m-auto mb-2"
              @click="isPesadoDet2 = !isPesadoDet2"
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
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import MovReportesApi from '@/remote/api/MovViseras/ReportesVisceras';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import Loader from '@/components/reusable/Loader.vue';
import PesadoViscDet2EncComponent from '@/components/Viceras/PesadoViscDet2EncCsComponent.vue';

import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import PDFPreview from '@/components/reusable/PdfPreview.vue';

import * as Sentry from '@sentry/browser';

import LocalReports from '../../classes/LocalReports';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import IQuery from '@/types/query';
import IPagination from '@/types/IPagination';
import { BaseResponse } from '@/types';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';

const reports = new LocalReports();

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PDFPreview,
    PaginatedSelect,
    PesadoViscDet2EncComponent,
  },

  name: 'PesadoVisc',
})
export default class PesadoViscComponent extends Vue {
  public reports = new LocalReports();

  private Pesaje: boolean = true;
  private informes: boolean = false;
  private Operari: boolean = false;
  private isPesadoDet2: boolean = false;
  private count: number = 0;

  private output = '';
  private isError: boolean = false;

  private idConPesoDet2: number = 0;
  private idCodPDet2: string = '';
  private idAutNumDet2: number = 0;

  private ports: any[] = [];
  private isPortConnected: boolean = false;
  private portPath: string = '';

  private IdConcecutivo: number = 0;
  private PeajeNo: number = 0;
  private GrupoPe: number = 0;
  private Turno: string = '';
  private FechaMov: string = '';
  private Tercero: string = '';
  private Espropio: string = '';
  private NViseras: number = 0;
  private LoteExt: number = 0;
  private TippPes: number = 0;
  private TextoEtiqueta: string = '';
  private Realizo: string = '';
  private Observacion: string = '';
  private Procesado: boolean = false;

  private CodigoProducto: string = '';
  private DescripcionCliente: string = '';
  private DescripcionTempre: string = '';
  private ControlXGuia: boolean = false;
  private Nguia: number = 0;
  private UnidadViceras: number = 0;
  private PesoxUnidad: boolean = false;
  private UnidadCanast: number = 0;
  private UnidadCanstReal: number = 0;
  private DiasVenc: number = 0;
  private CodigoBs: string = '';
  private CodigobsCn: string = '';
  private KilosIt: number = 0;
  private UnidIt: number = 0;
  private TpCanas: number = 0;
  private AnuladoMov: boolean = false;
  private FechaG: string = '';

  private TablaPesado: any = [];
  private Turnos: any = [];
  private Grupos: any = [];
  private TiposPesdos: any = [];

  private message: string = '';
  private NuevoPesadoCrea: boolean = false;

  private DiTblPesado: any = [];

  private readonly: boolean = false;

  private fechaTablas: string = moment().utc().format('YYYY-MM-DD');

  private componentName: string = '';
  private isLoading: boolean = false;
  private pdfData: string = '';
  private pdfData2: string = '';
  private showModalPDF: boolean = false;
  private showModalPDF2: boolean = false;

  private PesadoApi = new MovViserasApi(this.$store.getters.getAuthToken);
  private MovReportesApi = new MovReportesApi(this.$store.getters.getAuthToken);

  public closeModalPDF() {
    this.showModalPDF = false;
  }

  public closeModalPDF2() {
    this.showModalPDF2 = false;
  }

  private changeTercero(expr2: string) {
    this.reports.descTercCj = expr2;
    this.$local.saveLocalReportInfo(reports);
  }

  private changeTemp(temp: string) {
    this.reports.encEtiq4 = temp;
    this.$local.saveLocalReportInfo(reports);
  }

  private changeLote() {
    this.reports.loteExt = this.LoteExt;
    this.$local.saveLocalReportInfo(reports);
  }

  private changeFecha() {
    this.reports.fechaP = this.FechaMov;
    this.$local.saveLocalReportInfo(reports);
  }

  private ViewPesaje() {
    if (!this.Pesaje) {
      this.Operari = false;
      this.Pesaje = true;
      this.informes = false;
    }
  }

  private Viewinformes() {
    if (!this.informes) {
      this.Operari = false;
      this.Pesaje = false;
      this.informes = true;
    }
  }

  private Viewoperario() {
    if (!this.Operari) {
      this.Operari = true;
      this.Pesaje = false;
      this.informes = false;
      return;
    }
  }

  private dbleClikCodigo(
    idConcecutivo: number,
    codigoP: string,
    autoNum: number,
    descTemp: string,
    enc1: string,
    lote: number,
    fecha: string,
    consecTip: string,
    fechaVence: string,
  ) {
    this.isPesadoDet2 = true;
    this.idConPesoDet2 = idConcecutivo;
    this.idCodPDet2 = codigoP;
    this.idAutNumDet2 = autoNum;

    this.reports.descrProd = codigoP;
    this.reports.encEtiq4 = descTemp;
    this.reports.encEtiq1 = enc1;
    this.reports.loteExt = lote;
    this.reports.fechaP = fecha;
    this.reports.consecTip = consecTip;
    this.reports.fechaVence = fechaVence;
    this.$local.saveLocalReportInfo(reports);
  }

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private disconnectPort() {
    this.$serial.disconnectPort();
    this.isPortConnected = false;
  }

  private async discoverPorts() {
    this.ports = await this.$serial.getCOMPorts();
  }

  private connectToPort() {
    if (this.portPath === '') {
      this.showOutput(false, 'Debe seleccionar un puerto al cual conectarse.');
      return;
    }
    this.$serial.connectToPort(this.portPath);
  }

  private async btnReportDefinitivo() {
    try {
      this.isLoading = true;
      const pdf2 = await this.MovReportesApi.getPesViscCanasPDF(
        this.IdConcecutivo,
      );
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
    try {
      this.isLoading = true;
      const pdf = await this.MovReportesApi.getPesViscPDF(this.IdConcecutivo);
      this.pdfData2 = pdf.data;
      this.showModalPDF2 = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async btnReportPreliminar() {
    try {
      this.isLoading = true;
      const pdf2 = await this.MovReportesApi.getPesViscCanasPDF(
        this.IdConcecutivo,
      );
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
    try {
      this.isLoading = true;
      const pdf = await this.MovReportesApi.getPesViscPDF(this.IdConcecutivo);
      this.pdfData2 = pdf.data;
      this.showModalPDF2 = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async turnos() {
    try {
      const response = await this.PesadoApi.getTurnos();

      this.Turnos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async grupos() {
    try {
      const response = await this.PesadoApi.getGrupos();
      this.Grupos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async tipoPesado() {
    try {
      const response = await this.PesadoApi.getTiipoPes();
      this.TiposPesdos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private get connectedDisconnected() {
    return this.isPortConnected ? 'Conectado' : 'Desconectado';
  }

  private convertFecha(fech: string) {
    return moment(fech).format('YYYY-MM-DD');
  }

  private async mounted() {
    await this.grupos();
    await this.turnos();
    await this.tipoPesado();
  }

  private async datosPesaje() {
    this.isLoading = true;
    try {
      const nPesado = this.IdConcecutivo;
      const response = await this.PesadoApi.getPesadoViscUno(nPesado);
      this.PeajeNo = response.data.pesajeNo;
      this.GrupoPe = response.data.grupoPes;
      this.Turno = response.data.turnoPes;
      this.FechaMov = moment(response.data.fechaPes).format('YYYY-MM-DD');
      this.Tercero = response.data.clientePes;
      this.Espropio = response.data.esPropio;
      this.NViseras = response.data.nviscPes;
      this.LoteExt = response.data.nLoteExt;
      this.TippPes = response.data.idTpPesaje;
      this.TextoEtiqueta = response.data.encabeza1;
      this.Realizo = response.data.realizo;
      this.Observacion = response.data.observacion;
      this.Procesado = response.data.procesado;

      await this.tablaPesasdoVisDet1(nPesado);

      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async actualizarCrearDatos() {
    if (this.beforeFromUpdate()) {
      return;
    }

    if (!this.NuevoPesadoCrea) {
      await this.actalizarDatos();
    } else {
      await this.guardarDatos();
    }

    this.reports.fechaP = this.FechaMov;
    this.$local.saveLocalReportInfo(reports);
  }

  private beforeFromUpdate() {
    const fecha1: string = moment(
      this.$store.getters.getTConfinv1.fechaProc1,
    ).format('YYYY-MM-DD');
    const fecha2: string = moment(
      this.$store.getters.getTConfinv1.fechaProc2,
    ).format('YYYY-MM-DD');

    if (this.Tercero === null || this.Tercero === '') {
      this.showOutput(true, 'La relacion no tienen tercero');
      return true;
    }

    if (this.PeajeNo === null || this.PeajeNo === 0) {
      this.showOutput(
        true,
        'El Pesaje de Viscera no puede ser Cero, Escoja Adicionar Registro',
      );
      return true;
    }

    if (this.FechaMov < fecha1 || this.FechaMov > fecha2) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }

    return false;
  }

  private async adicionarRegistro() {
    const result: any = await this.tblVisPesado();

    this.readonly = false;

    this.NuevoPesadoCrea = true;

    this.clearFrom();

    result + 1 === null ? (this.PeajeNo = 1) : (this.PeajeNo = result + 1);
  }

  private modificar() {
    this.readonly = false;
    this.NuevoPesadoCrea = false;
  }

  private async tblVisPesado() {
    try {
      const response = await this.PesadoApi.getPesadoVisCs();
      if (response.data.length === 0) {
        return null;
      }

      for (const i of response.data) {
        this.DiTblPesado.push(i.PesajeNo);
      }

      return Math.max(...this.DiTblPesado);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async guardarDatos() {
    try {
      const response = await this.PesadoApi.postPesadoVisc({
        anulada: false,
        clientePes: this.Tercero,
        encabeza1: this.TextoEtiqueta,
        esPropio: this.Espropio,
        fechaP: moment(this.FechaMov).format('YYYY-MM-DD'),
        fechaPes: moment(this.FechaMov).format('YYYY-MM-DD'),
        grupoPes: this.GrupoPe,
        idTpPesaje: this.TippPes,
        motivoAnul: null,
        nLoteExt: this.LoteExt,
        nviscPes: this.NViseras,
        observacion: this.Observacion,
        observacion2: null,
        pesajeNo: this.PeajeNo,
        procesado: this.Procesado,
        realizo: this.Realizo,
        turnoPes: this.Turno,
        usuarioP: this.$store.getters.getUsuario,
      });
      if (response.statusCode !== 201) {
        this.showOutput(true, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      this.clearFrom();
    }
  }

  private async actalizarDatos() {
    const nPesado = this.IdConcecutivo;
    try {
      const response = await this.PesadoApi.putPesadoVisc(nPesado, {
        anulada: false,
        clientePes: this.Tercero,
        encabeza1: this.TextoEtiqueta,
        esPropio: this.Espropio,
        fechaP: moment(this.FechaMov).format('YYYY-MM-DD'),
        fechaPes: moment(this.FechaMov).format('YYYY-MM-DD'),
        grupoPes: this.GrupoPe,
        idTpPesaje: this.TippPes,
        motivoAnul: null,
        nLoteExt: this.LoteExt,
        nviscPes: this.NViseras,
        observacion: this.Observacion,
        observacion2: null,
        pesajeNo: this.PeajeNo,
        procesado: this.Procesado,
        realizo: this.Realizo,
        turnoPes: this.Turno,
        usuarioP: this.$store.getters.getUsuario,
      });
      this.showOutput(false, response.message);
      this.NuevoPesadoCrea = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async borrarPesadoDet1(idConsecutivo: number) {
    try {
      const response = await this.PesadoApi.deletePesadoDet(idConsecutivo);
      if (response.statusCode !== 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async borrarPesadoDet2(idConsecutivo: number) {
    try {
      const response = await this.PesadoApi.deletePesadiViscDet2(idConsecutivo);
      if (response.statusCode !== 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async borrarPesadoDet3(idConsecutivo: number) {
    try {
      const response = await this.PesadoApi.deletePesadoDet3(idConsecutivo);
      if (response.statusCode !== 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async tablaPesasdoVisDet1(idConcecutivo: number) {
    this.isLoading = true;
    try {
      const respose = await this.PesadoApi.getPesadoVisDet(idConcecutivo);

      this.TablaPesado = respose.data;

      if (this.TablaPesado !== null) {
        this.reports.descTercCj = this.TablaPesado.descCliente;
        this.$local.saveLocalReportInfo(reports);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async tipoPesageAfterUpdte() {
    try {
      const response = await this.PesadoApi.getPesadoViscDet();

      for (const i of response.data) {
        if (i.idConsecutivo === this.IdConcecutivo) {
          this.count = this.count + 1;
        }
      }

      if (this.count >= 1) {
        const opcion = confirm(
          'Al Cambiar de Tipo de Pesado se ELIMINARAN los Kilos Ingresados al Sistema',
        );
        if (!opcion) {
          return;
        }

        await this.borrarPesadoDet1(this.IdConcecutivo);
        await this.borrarPesadoDet2(this.IdConcecutivo);
        await this.borrarPesadoDet3(this.IdConcecutivo);
      }

      if ((await this.pesadoViisDet1(this.IdConcecutivo)) !== 200) {
        return;
      }
      await this.addPesadoVisDet1(this.IdConcecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async addPesadoVisDet1(idConscutivo: number) {
    try {
      const response = await this.PesadoApi.postPesadoVisDet({
        anulaMov: this.AnuladoMov,
        codProducto: this.CodigoProducto,
        codigoBs: this.CodigoBs,
        codigoBsCn: this.CodigobsCn,
        controlxGuia: this.ControlXGuia,
        descCliente: this.DescripcionCliente,
        descTemper: this.DescripcionTempre,
        diasVenc: this.DiasVenc,
        fechaG: this.FechaG,
        idConsecutivo: idConscutivo,
        kilosIt: this.KilosIt,
        nGuia: this.Nguia,
        pesoxUnid: this.PesoxUnidad,
        tpCanas: this.TpCanas,
        unidCanast: this.UnidadCanast,
        unidCanastReal: this.UnidadCanstReal,
        unidIt: this.UnidIt,
        unidVisceras: this.UnidadViceras,
      });

      if (response.statusCode !== 201) {
        this.showOutput(true, 'error al guardar registro');
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async pesadoViisDet1(idConsecutivo: number) {
    try {
      const response = await this.PesadoApi.getPesadoVisDet(idConsecutivo);

      this.CodigoProducto = response.data.codProducto;
      this.DescripcionCliente = response.data.descCliente;
      this.DescripcionTempre = response.data.descTemper;
      this.ControlXGuia = response.data.controlxGuia;
      this.Nguia = response.data.nGuia;
      this.UnidadViceras = response.data.unidVisceras;
      this.PesoxUnidad = response.data.pesoxUnid;
      this.UnidadCanast = response.data.unidCanast;
      this.UnidadCanstReal = response.data.unidCanastReal;
      this.DiasVenc = response.data.diasVenc;
      this.CodigoBs = response.data.codigoBs;
      this.CodigobsCn = response.data.codigoBsCn;
      this.KilosIt = response.data.kilosIt;
      this.UnidIt = response.data.unidIt;
      this.TpCanas = response.data.tpCanas;
      this.AnuladoMov = response.data.anulaMov;
      this.FechaG = moment(response.data.fechaG).format('YYYY-MM-DDThh:mm');

      return response.statusCode;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async guias() {
    this.Espropio
      ? await this.friViscPesNGuia()
      : await this.frivViscPesNGuiaTercero(this.Tercero);
  }

  private async friViscPesNGuia() {
    try {
      const response = await this.PesadoApi.getFiriViscPesNGuia();

      if (response.statusCode !== 200) {
        this.showOutput(true, response.messege);
        return;
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async frivViscPesNGuiaTercero(tercero: string) {
    try {
      const response = await this.PesadoApi.getFriViscPesNGuiaTrecero(tercero);

      if (response.statusCode !== 200) {
        this.showOutput(true, response.messege);
        return;
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private clearFrom() {
    this.GrupoPe = 0;
    this.Turno = '';
    this.FechaMov = '';
    this.Tercero = '';
    this.Espropio = '';
    this.NViseras = 0;
    this.LoteExt = 0;
    this.TippPes = 0;
    this.TextoEtiqueta = '';
    this.Realizo = '';
    this.Observacion = '';
    this.Procesado = false;
  }

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

  private exporTable(file: string) {
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
  private exporTableDatoPesaje(file: string) {
    if (this.TablaPesado.length === 0) {
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

  private async fetch(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        IdConsecutivo: number;
        PesajeNo: number;
        FechaPes: string;
        Tercero: string;
      }>
    >;
    if (q.query) {
      response = await this.PesadoApi.getPesadoViscFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.IdConsecutivo,
        item: `${d.PesajeNo} | ${moment(d.FechaPes).format('YYYY-MM-DD')} | ${
          d.Tercero
        }`,
      }));
    }
    response = await this.PesadoApi.getPesadoVisc(p);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.IdConsecutivo,
      item: `${d.PesajeNo} | ${moment(d.FechaPes).format('YYYY-MM-DD')} | ${
        d.Tercero
      }`,
    }));
  }

  private async fetchTerceros(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        NitCliente: string;
        Expr2: string;
        Expr1: string;
        CodiCliente: string;
        Habilitado: boolean;
      }>
    >;
    if (q.query) {
      response = await this.PesadoApi.getClientPicadoAndPesadoFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.CodiCliente,
        item: `${d.Expr2} | ${d.NitCliente} | ${d.CodiCliente}`,
      }));
    }
    response = await this.PesadoApi.getClientPicadoAndPesado(p);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.CodiCliente,
      item: `${d.Expr2} | ${d.NitCliente} | ${d.CodiCliente}`,
    }));
  }
}
</script>
