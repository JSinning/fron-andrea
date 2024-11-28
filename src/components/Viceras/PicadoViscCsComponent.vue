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

    <div class="w-full h-full">
      <component
        v-bind:is="componentName"
        :pdfData="pdfData"
        v-bind:message="message"
      ></component>
    </div>

    <div class="main-div">
      <div>
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0">
            <h1 class="title">PICADO VISCERAS</h1>
          </div>
          <div class="pl-24 mt-2 mb-6 md:mb-0"></div>
          <div class="w-1/2 mb-6 md:mb-0">
            <PaginatedSelect
              v-model="IdConcecutivo"
              :fetch="fetch"
              @change="datosPicado"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-2 justify-end">
          <div class="pr-20 mt-2 md:mb-0"></div>
        </div>

        <ul class="flex p-2">
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
                <label class="label">Picado Visceras No:</label>
                <input type="text" class="input" v-model="picadoNo" readonly />
              </div>
              <div class="px-3 mb-6 md:mb-0">
                <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                  <label class="label">
                    Grupo:
                    <select
                      class="bg-white border py-1 pr-2 select"
                      v-model="grupoPicado"
                      disabled
                    >
                      <option :value="grupoPicado">{{ grupoPicado }}</option>
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
                      v-model="turnoPicado"
                      disabled
                    >
                      <option :value="turnoPicado">{{ turnoPicado }}</option>
                      <option
                        v-for="(item, index) in Turnos"
                        :key="index"
                        :value="item.turnoD"
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
                  v-model="fechaMov"
                  readonly
                  @change="changeFecha()"
                />
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">
                  Tercero:
                  <select
                    class="bg-white border py-1 pr-2 shadow leading-tight select"
                    v-model="tercero"
                    disabled
                    @change="changeTercero()"
                  >
                    <option :value="tercero">{{ tercero }}</option>
                    <option
                      v-for="(item, index) in NitTercero"
                      :key="index"
                      :value="item.CodiCliente"
                    >
                      <pre>
 {{ item.Expr2 }}  &nbsp;&nbsp;&nbsp;&nbsp;| &nbsp; {{
                          item.NitCliente
                        }} &nbsp;&nbsp;&nbsp;|&nbsp; {{
                          item.CodiCliente
                        }}  </pre
                      >
                    </option>
                  </select>
                </label>
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Numero Visceras a Picar:</label>
                <input
                  type="text"
                  class="input"
                  v-model="nVicerasPicado"
                  readonly
                />
              </div>
              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Lote Ext:</label>
                <input
                  type="text"
                  class="input"
                  v-model="nLoteExt"
                  readonly
                  @change="changeLote()"
                />
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">
                  Tipo Pic:
                  <select
                    class="bg-white border py-1 pr-2 shadow leading-tight select"
                    v-model="tipoPicado"
                    disabled
                  >
                    <option :value="tipoPicado">{{ tipoPicado }}</option>
                    <option
                      v-for="(item, index) in TipoPic"
                      :key="index"
                      :value="item.IdTpPicado"
                    >
                      {{ item.DescripTp }}
                    </option>
                  </select>
                </label>
              </div>

              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">
                  Tipo Cn:
                  <select
                    class="bg-white border py-1 pr-2 shadow leading-tight select"
                    v-model="tipoCn"
                    disabled
                  >
                    <option :value="tipoCn">{{ tipoCn }}</option>
                    <option
                      v-for="(item, index) in TipoCaja"
                      :key="index"
                      :value="item.idCaja"
                    >
                      {{ item.descripcionC }} | {{ item.pesoCaj }}
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
                    <th>Tp/Cn</th>
                    <th>Etiqueta</th>
                    <th>Guia</th>
                    <th>Animal No</th>
                    <th>Peso Viscera</th>
                    <th>Anulado</th>
                    <th>Fecha Hora</th>
                    <th>Higado</th>
                    <th>Pulmon</th>
                    <th>Pajarilla</th>
                    <th>Riñon</th>
                    <th>Lengua</th>
                    <th>Corazon</th>
                  </tr>
                </thead>
                <tbody
                  class="text-center"
                  v-for="(item, index) in TabalPicado"
                  :key="index"
                >
                  <tr>
                    <td>{{ item.tpCanas }}</td>
                    <td>{{ item.idEtiqueta }}</td>
                    <td>{{ item.guiaAni }}</td>
                    <td>{{ item.animalNo }}</td>
                    <td>{{ item.pesoVis }}</td>
                    <td>{{ convertboollandString(item.anulaMov) }}</td>
                    <td>{{ convertFecha(item.fechaG) }}</td>
                    <td>{{ convertboollandString(item.decoHiga) }}</td>
                    <td>{{ convertboollandString(item.decoPulm) }}</td>
                    <td>{{ convertboollandString(item.decoPaja) }}</td>
                    <td>{{ convertboollandString(item.decoVRin) }}</td>
                    <td>{{ convertboollandString(item.decoLeng) }}</td>
                    <td>{{ convertboollandString(item.decoCora) }}</td>
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
            <label class="label">Realozo: </label>
            <input type="text" class="input" v-model="realizo" />
            <label class="label">Observaciones: </label>
            <input type="text" class="input" v-model="obsersiones" />
          </div>
          <div class="flex flex-row flex-wrap mb-2 justify-center">
            <div class="pl-20 pt-2">
              <button class="btn-save p-4" @click="btnReprint()">
                Reimprimir
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="Operari">
        <!-- table -->
        <div class="flex flex-row flex-wrap">
          <div class="card-table">
            <table class="table-fixed w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th>Empleado</th>
                  <th>Tabajo</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="(item, index) in OperarioEmpl" :key="index">
                  <td>{{ item.Empleados }}</td>
                  <td>{{ item.Trabaj }}</td>
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
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import MovReportesApi from '@/remote/api/MovViseras/ReportesVisceras';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import PDFPreview from '@/components/reusable/PdfPreview.vue';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

import LocalReports from '../../classes/LocalReports';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import IPagination from '@/types/IPagination';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

const reports = new LocalReports();

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PDFPreview,
    PaginatedSelect,
  },

  name: 'PicadoViscCs',
})
export default class PicadoViscCsComponent extends Vue {
  public reports = new LocalReports();

  private Pesaje: boolean = true;
  private informes: boolean = false;
  private Operari: boolean = false;

  private output = '';
  private isError: boolean = false;

  private IdConcecutivo: number = 0;

  private picadoNo: number = 0;
  private grupoPicado: number = 0;
  private turnoPicado: string = '';
  private fechaMov: string = '';
  private tercero: string = '';
  private nVicerasPicado: number = 0;
  private nLoteExt: number = 0;
  private tipoPicado: number = 0;
  private tipoCn: number = 0;
  private realizo: string = '';
  private obsersiones: string = '';
  private procesado: boolean = false;
  private anulado: boolean = false;

  private TabalPicado: any = [];
  private OperarioEmpl: any = [];

  private Turnos: any = [];
  private Grupos: any = [];
  private TipoPic: any = [];
  private TipoCaja: any = [];
  private NitTercero: any = [];

  private fechaTablas: string = moment().utc().format('YYYY-MM-DD');
  private showModalPDF: boolean = false;
  private showModalPDF2: boolean = false;

  private componentName: string = '';
  private isLoading: boolean = false;
  private pdfData: string = '';
  private pdfData2: string = '';
  private message: string = '';

  private PicacdoViscCsApi = new MovViserasApi(
    this.$store.getters.getAuthToken,
  );
  private MovReportesApi = new MovReportesApi(this.$store.getters.getAuthToken);

  public closeModalPDF() {
    this.showModalPDF = false;
  }

  public closeModalPDF2() {
    this.showModalPDF2 = false;
  }

  private changeTercero() {
    if (this.nVicerasPicado > 0) {
      this.reports.descTercCj = this.NitTercero.Expr2;
      this.$local.saveLocalReportInfo(reports);
    }
  }

  private changeLote() {
    this.reports.loteExt = this.nLoteExt;
    this.$local.saveLocalReportInfo(reports);
  }

  private changeFecha() {
    this.reports.fechaP = this.fechaMov;
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

  private async mounted() {
    await this.nitTercero();
    await this.turnoD();
    await this.grupoPic();
    await this.tipoPic();
    await this.tipocaja();
  }

  private async btnReprint() {
    try {
      this.isLoading = true;
      const pdf2 = await this.MovReportesApi.getPicViscPDF(this.IdConcecutivo);
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
      const pdf = await this.MovReportesApi.getPicViscSub2PDF(
        this.IdConcecutivo,
      );
      this.pdfData2 = pdf.data;
      this.showModalPDF2 = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async nitTercero() {
    try {
      const response = await this.PicacdoViscCsApi.getClientPicadoAndPesado();

      this.NitTercero = response.data[0];
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private convertFecha(fech: string) {
    return moment(fech).format('YYYY-MM-DD');
  }

  private convertboollandString(statusLaboral: boolean) {
    return statusLaboral ? 'SI' : 'No';
  }

  private async turnoD() {
    try {
      const response = await this.PicacdoViscCsApi.getPicadoTurnoD();

      this.Turnos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.messege);
    }
  }

  private async grupoPic() {
    try {
      const response = await this.PicacdoViscCsApi.getGrupos();

      this.Grupos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async tipoPic() {
    try {
      const respose = await this.PicacdoViscCsApi.getPicadoTipPic();

      this.TipoPic = respose.data[0];
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async tipocaja() {
    try {
      const response = await this.PicacdoViscCsApi.getPicadoCaja();
      this.TipoCaja = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async datosPicado() {
    this.isLoading = true;
    const idConcecutivo: number = this.IdConcecutivo;
    try {
      const response =
        await this.PicacdoViscCsApi.getPicadoCsUno(idConcecutivo);
      this.picadoNo = response.data.picadoNo;
      this.grupoPicado = response.data.grupoPica;
      this.turnoPicado = response.data.turnoPic;
      this.fechaMov = moment(response.data.fechaPic).format('YYYY-MM-DD');
      this.tercero = response.data.clientePic;
      this.nVicerasPicado = response.data.nviscPic;
      this.nLoteExt = response.data.nLoteExt;
      this.tipoPicado = response.data.idTpPicado;
      this.tipoCn = response.data.tpCanas;
      this.realizo = response.data.realizo;
      this.obsersiones = response.data.observacion;
      this.procesado = response.data.procesado;
      this.anulado = response.data.anulada;

      this.TabalPicado = [];
      this.OperarioEmpl = [];
      await this.tablaPicasoDet(idConcecutivo);
      await this.operarioLit(idConcecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async tablaPicasoDet(idComcecutivo: number) {
    this.isLoading = true;
    try {
      const response =
        await this.PicacdoViscCsApi.getPicadoDetID(idComcecutivo);
      this.TabalPicado = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
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
  private exporTableDatoPesaje(file: string) {
    if (this.TabalPicado.length === 0) {
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

  private async operarioLit(idConcecutivo: number) {
    try {
      const response =
        await this.PicacdoViscCsApi.getPicadoDet4ID(idConcecutivo);

      if (response.statusCode !== 200) {
        this.showOutput(
          true,
          'Error al traer información del menú, intente nuevamente.',
        );
        return;
      }

      for (const Empleados of response.data) {
        const responseName = await this.PicacdoViscCsApi.getEmpleadosByID(
          Empleados.idEmpleado,
        );

        this.OperarioEmpl.push({
          Empleados: responseName.data[0][0].Nombre,
          Trabaj: response.data[0].trabaj,
        });
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async fetch(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        IdConsecutivo: number;
        PicadoNo: number;
        FechaPic: string;
        Tercero: string;
      }>
    >;
    if (q.query) {
      response = await this.PicacdoViscCsApi.getPicadoCsFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.IdConsecutivo,
        item: `${d.PicadoNo} | ${moment(d.FechaPic).format('YYYY-MM-DD')} | ${
          d.Tercero
        }`,
      }));
    }
    response = await this.PicacdoViscCsApi.getPicadoCs(p);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.IdConsecutivo,
      item: `${d.PicadoNo} | ${moment(d.FechaPic).format('YYYY-MM-DD')} | ${
        d.Tercero
      }`,
    }));
  }
}
</script>
