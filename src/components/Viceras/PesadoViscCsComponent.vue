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
              v-model="IdConcecitivo"
              :fetch="fetch"
              @change="datoRelaPesajeNo"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-2 justify-end">
          <div class="pr-20 md:mb-0"></div>
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
                <input type="text" class="input" v-model="PeajeNo" />
              </div>
              <div class="px-3 mb-6 md:mb-0">
                <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                  <label class="label">
                    Grupo:
                    <select
                      class="bg-white border py-1 pr-2 select"
                      v-model="GrupoPe"
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
                <input type="date" class="input" v-model="FechaMov" />
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 pt-4 mb-6 md:mb-0 inline-block relative w-1/2">
                <PaginatedSelect v-model="Tercero" :fetch="fetchTercero"
                  >Tercero:</PaginatedSelect
                >
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Numero Visceras a Pesar:</label>
                <input type="text" class="input" v-model="NViseras" />
              </div>
              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Lote Ext:</label>
                <input
                  type="text"
                  class="input"
                  v-model="LoteExt"
                  @change="changeLote()"
                />
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">
                  Tipo Pes:
                  <select
                    class="bg-white border py-1 pr-2 shadow leading-tight select"
                    v-model="TippPes"
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
            </div>
          </div>

          <!-- table -->
          <div class="flex flex-row flex-wrap mb-3">
            <div class="card-table">
              <table class="table-auto w-full text-xs" id="tablaB">
                <thead>
                  <tr
                    class="border-b border-gray-500 text-white bg-andrea font-bold"
                  >
                    <th>Tipo Cn</th>
                    <th>Codigo</th>
                    <th>Producto</th>
                    <th>Descripcion Cliente</th>
                    <th>Descripcion Temperatura</th>
                    <th>PesoxUnidad</th>
                    <th>Unid.Canastilla</th>
                    <th>Unid.Canastilla Real</th>
                    <th>Dias Vencimiento</th>
                    <th>Fecha de Generado</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr>
                    <td>{{ TabalCn.tpCanas }}</td>
                    <td
                      @dblclick="
                        dbleClikCodigo(
                          TabalCn.idConsecutivo,
                          TabalCn.codProducto,
                          TabalCn.autoNum,
                          TabalCn.descTemper,
                          TabalCn.nLoteExt,
                          TabalCn.fechaPes,
                          TabalCn.pesajeNo,
                          TabalCn.fechaVence,
                        )
                      "
                    >
                      {{ TabalCn.codProducto }}
                    </td>
                    <td></td>
                    <td>{{ TabalCn.descCliente }}</td>
                    <td>{{ TabalCn.descTemper }}</td>
                    <td>{{ convertirBolean(TabalCn.pesoxUnid) }}</td>
                    <td>{{ TabalCn.unidCanast }}</td>
                    <td>{{ TabalCn.unidCanastReal }}</td>
                    <td>{{ TabalCn.diasVenc }}</td>
                    <td>{{ fechaHora() }}</td>
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
            <input type="text" class="input" v-model="TextoEtiqueta" />
            <label class="label">Realizo: </label>
            <input type="text" class="input" v-model="Realizo" />
            <label class="label">Observaciones: </label>
            <input type="text" class="input" v-model="Observacion" />
          </div>
          <div class="flex flex-row flex-wrap mb-2 justify-center">
            <div class="pl-20 pt-8">
              <button class="btn-save p-4" @click="btnReport()">Informe</button>
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
              <tbody
                class="text-center"
                v-for="(item, index) in tablaEmpleados"
                :key="index"
              >
                <tr>
                  <td>{{ item }}</td>
                  <td>{{ item }}</td>
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
            <PesadoViscDet2EncCsComponent
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

import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import PDFPreview from '@/components/reusable/PdfPreview.vue';

import Loader from '@/components/reusable/Loader.vue';
import PesadoViscDet2EncCsComponent from '@/components/Viceras/PesadoViscDet2EncCsComponent.vue';

import * as Sentry from '@sentry/browser';

import LocalReports from '../../classes/LocalReports';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import IPagination from '@/types/IPagination';
import IQuery from '@/types/query';
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
    PesadoViscDet2EncCsComponent,
  },

  name: 'PesadoViscCS',
})
export default class PesadoViscCsComponent extends Vue {
  public reports = new LocalReports();

  private Pesaje: boolean = true;
  private informes: boolean = false;
  private Operari: boolean = false;
  private isPesadoDet2: boolean = false;

  private output = '';
  private isError: boolean = false;

  private IdConcecitivo: number = 0;

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

  private idConPesoDet2: number = 0;
  private idCodPDet2: string = '';
  private idAutNumDet2: number = 0;

  private TabalCn: any = [];

  private tablaEmpleados: any = [];

  private Turnos: any = [];
  private Grupos: any = [];
  private TiposPesdos: any = [];

  private fechaTablas: string = moment().utc().format('YYYY-MM-DD');
  private showModalPDF: boolean = false;
  private showModalPDF2: boolean = false;

  private componentName: string = '';
  private isLoading: boolean = false;
  private pdfData: string = '';
  private pdfData2: string = '';
  private message: string = '';

  private PesadiVisCs = new MovViserasApi(this.$store.getters.getAuthToken);
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

  private changeLote() {
    this.reports.loteExt = this.LoteExt;
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

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private convertFecha(fech: string) {
    return moment(fech).format('YYYY-MM-DD');
  }

  private convertirBolean(dato: boolean) {
    return dato ? 'NO' : 'SI';
  }

  private fechaHora() {
    return moment(this.TabalCn.fechaG).format('YYYY-MM-DD hh:mm');
  }

  private async btnReport() {
    try {
      this.isLoading = true;
      const pdf2 = await this.MovReportesApi.getPesViscCanasPDF(
        this.IdConcecitivo,
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
      const pdf = await this.MovReportesApi.getPesViscPDF(this.IdConcecitivo);
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
      const response = await this.PesadiVisCs.getTurnos();

      this.Turnos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async grupos() {
    try {
      const response = await this.PesadiVisCs.getGrupos();
      this.Grupos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async tipoPesado() {
    try {
      const response = await this.PesadiVisCs.getTiipoPes();
      this.TiposPesdos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async mounted() {
    await this.grupos();
    await this.turnos();
    await this.tipoPesado();

    if (this.IdConcecitivo !== 0) {
      await this.tablaPesadoCs(this.IdConcecitivo);
    }
  }

  private dbleClikCodigo(
    idConcecutivo: number,
    codigoP: string,
    autoNum: number,
    temp: string,
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
    this.reports.encEtiq4 = temp;
    this.reports.loteExt = lote;
    this.reports.fechaP = fecha;
    this.reports.consecTip = consecTip;
    this.reports.fechaVence = fechaVence;
    this.$local.saveLocalReportInfo(reports);
  }

  private async datoRelaPesajeNo() {
    this.isLoading = true;
    const idContinuo: number = this.IdConcecitivo;
    try {
      const response = await this.PesadiVisCs.getPesadoVisCsID(idContinuo);
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

      await this.tablaPesadoCs(idContinuo);

      await this.emplados(idContinuo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async tablaPesadoCs(idConcexutivo: number) {
    this.isLoading = true;
    try {
      const response = await this.PesadiVisCs.getPesadoVisDet(idConcexutivo);
      this.TabalCn = response.data;

      if (this.TabalCn !== null) {
        this.reports.descTercCj = this.TabalCn.descCliente;
        this.$local.saveLocalReportInfo(reports);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async emplados(idConcesutivo: number) {
    try {
      const response = await this.PesadiVisCs.getPesdoDet3(idConcesutivo);

      this.tablaEmpleados = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
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

  private async exporTableDatoPesaje(file: string) {
    if (this.TabalCn.length === 0) {
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
      response = await this.PesadiVisCs.getPesadoVisCsFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.IdConsecutivo,
        item: `${d.PesajeNo} | ${moment(d.FechaPes).format('YYYY-MM-DD')} | ${
          d.Tercero
        }`,
      }));
    }
    response = await this.PesadiVisCs.getPesadoVisCs(p);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.IdConsecutivo,
      item: `${d.PesajeNo} | ${moment(d.FechaPes).format('YYYY-MM-DD')} | ${
        d.Tercero
      }`,
    }));
  }

  private async fetchTercero(p?: IPagination, q?: IQuery) {
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
      response = await this.PesadiVisCs.getClientPicadoAndPesadoFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.CodiCliente,
        item: `${d.Expr2} | ${d.NitCliente} | ${d.CodiCliente}`,
      }));
    }
    response = await this.PesadiVisCs.getClientPicadoAndPesado(p);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.CodiCliente,
      item: `${d.Expr2} | ${d.NitCliente} | ${d.CodiCliente}`,
    }));
  }
}
</script>
