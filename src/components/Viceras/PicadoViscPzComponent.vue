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
        <div class="pr-20 mt-2 md:mb-0">
          <button class="btn-primary" @click="modificardata()">
            Modificar
          </button>
          <button class="btn-save">Guardar</button>
        </div>
      </div>

      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Picado Visceras No:</label>
            <input type="text" class="input" v-model="picadoNo" readonly />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-60">
              <label class="label">
                Grupo:
                <select
                  class="bg-white border py-1 pr-2 select"
                  v-model="grupoPicado"
                  :disabled="readonly"
                >
                  <option :value="grupoPicado">{{ grupoPicado }}</option>
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
                  :disabled="readonly"
                >
                  <option :value="turnoPicado">{{ turnoPicado }}</option>
                </select>
              </label>
            </div>
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">
                Tipo Pic:
                <select
                  class="bg-white border py-1 pr-2 select"
                  v-model="tipoPicado"
                  :disabled="readonly"
                >
                  <option :value="tipoPicado">{{ tipoPicado }}</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">
              Tercero:
              <select
                class="bg-white border py-1 pr-2 shadow leading-tight select"
                v-model="tercero"
                :disabled="readonly"
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
                    }} &nbsp;&nbsp;&nbsp;|&nbsp; {{ item.CodiCliente }}  </pre
                  >
                </option>
              </select>
            </label>
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Numero Visceras a Picar:</label>
            <input
              type="text"
              class="input"
              v-model="nVicerasPicado"
              :readonly="readonly"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Fecha de Movimiento:</label>
            <input
              type="date"
              class="input"
              v-model="fechaMov"
              :readonly="readonly"
              @change="changeFecha()"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Lote Ext:</label>
            <input
              type="text"
              class="input"
              v-model="nLoteExt"
              :readonly="readonly"
              @change="changeLote()"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap">
          <div class="mb-6 md:mb-0">
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">
                Tipo Cn:
                <select
                  class="bg-white border py-1 pr-2 select"
                  v-model="tipoCn"
                  :disabled="readonly"
                >
                  <option :value="tipoCn">{{ tipoCn }}</option>
                </select>
              </label>
            </div>
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
              <button class="btn-save p-2">Canastilla</button>
            </div>
          </div>
        </div>
      </div>

      <!-- table -->
      <div class="flex flex-row flex-wrap mb-3">
        <div class="card-table h-48">
          <table class="table-fixed w-full text-xs" id="tablaB">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>Producto</th>
                <th>Guia No</th>
                <th>Animal</th>
                <th>Canastilla</th>
                <th>Decomiso</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr>
                <td>{{ tabalPicadoPzDt.descripcionMer }}</td>
                <td>{{ tabalPicadoPzDt.guiaNo }}</td>
                <td>{{ tabalPicadoPzDt.animalNo }}</td>
                <td>{{ tabalPicadoPzDt.canasti }}</td>
                <td>{{ tabalPicadoPzDt.anulaMov }}</td>
                <td>{{ tabalPicadoPzDt.fechaG }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex flex-row flex-wrap mb-3 -mt-4">
        <div class="md:w-full">
          <button
            class="btn-primary w-full"
            @click="exporTablePaza(`DatosPanza_${fechaTablas}.csv`)"
          >
            Exportar Csv Datos Pesaje
          </button>
        </div>
      </div>

      <hr />

      <div class="flex flex-row flex-wrap">
        <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Realizo</label>
          <input
            type="text"
            class="input"
            v-model="realizo"
            :readonly="readonly"
          />
        </div>
        <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Observaciones</label>
          <input
            type="text"
            class="input"
            v-model="obsersiones"
            :readonly="readonly"
          />
        </div>
        <div class="pl-10">
          <button class="btn-save p-5" @click="btnReportPreliminar()">
            Informe Preliminar
          </button>
        </div>

        <div class="pl-10">
          <button class="btn-save p-5" @click="btnReportDefinitivo()">
            Imforme Definitivo
          </button>
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
      <div class="w-full h-full">
        <component
          v-bind:is="componentName"
          :pdfData="pdfData"
          v-bind:message="message"
        ></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import MovReportesApi from '@/remote/api/MovViseras/ReportesVisceras';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import Loader from '@/components/reusable/Loader.vue';

import PDFPreview from '@/components/reusable/PdfPreview.vue';

import * as Sentry from '@sentry/browser';

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
export default class PicadoViscPzComponent extends Vue {
  public reports = new LocalReports();

  private output = '';
  private isError: boolean = false;

  private IdConcecutivo: number = 0;

  private PicadoVisCsNo: any = [];

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
  private procesado2: boolean = false;
  private anulado: boolean = false;

  private readonly = false;

  private tabalPicadoPzDt: any = [];
  private NitTercero: any = [];

  private ports: any[] = [];
  private isPortConnected: boolean = false;
  private portPath: string = '';

  private fechaTablas: string = moment().utc().format('YYYY-MM-DD');
  private showModalPDF: boolean = false;
  private showModalPDF2: boolean = false;

  private componentName: string = '';
  private isLoading: boolean = false;
  private pdfData: string = '';
  private pdfData2: string = '';
  private message: string = '';

  private PicacdoVisPzApi = new MovViserasApi(this.$store.getters.getAuthToken);
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

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async mounted() {
    await this.nitTercero();
    await this.realPicadoNoCs();
  }

  private async nitTercero() {
    try {
      const response = await this.PicacdoVisPzApi.getClientPicadoAndPesado();

      this.NitTercero = response.data[0];
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }
  private convertFecha(fech: string) {
    return moment(fech).format('YYYY-MM-DD');
  }

  private async btnReportDefinitivo() {
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

  private async btnReportPreliminar() {
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

  private async realPicadoNoCs() {
    this.isLoading = true;
    try {
      const response = await this.PicacdoVisPzApi.getPicadoPz();

      this.PicadoVisCsNo = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async datosPicado() {
    this.isLoading = true;
    const idConcecutivo: number = this.IdConcecutivo;
    try {
      const response = await this.PicacdoVisPzApi.getPicadoPzUno(idConcecutivo);
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
      this.procesado2 = response.data.procesado2;
      this.anulado = response.data.anulada;

      this.readonly = true;

      this.tabalPicadoPzDt = [];
      await this.picadoVisPzDt(idConcecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private modificardata() {
    if (!this.anulado) {
      this.showOutput(false, 'Documento Anulado');
      return;
    }

    if (!this.procesado2) {
      this.showOutput(false, 'Documento Procesado');
      return;
    }

    this.reports.fechaP = this.fechaMov;
    this.$local.saveLocalReportInfo(reports);
    this.readonly = false;
  }

  private async picadoVisPzDt(idConcecutivo: number) {
    this.isLoading = true;
    try {
      const response = await this.PicacdoVisPzApi.getPicadoPzDt(idConcecutivo);
      this.tabalPicadoPzDt = response.data;
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

  private exporTablePaza(file: string) {
    if (this.tabalPicadoPzDt.length === 0) {
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

  private get connectedDisconnected() {
    return this.isPortConnected ? 'Conectado' : 'Desconectado';
  }

  private async fetch(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        idConsecutivo: number;
        picadoNo: number;
        fechaPic: string;
        idTpPicado: number;
        clientePic: string;
        nviscPic: number;
        grupoPica: number;
        turnoPic: string;
        realizo: string;
        nLoteExt: string;
        tpCanas: number;
        procesado: boolean;
        procesado2: boolean;
        observacion: string;
        observacion2: string;
        anulada: boolean;
        motivoAnul: string;
        usuarioP: string;
        fechaP: string;
      }>
    >;
    if (q.query) {
      response = await this.PicacdoVisPzApi.getPicadoPzFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.idConsecutivo,
        item: `${d.picadoNo} | ${moment(d.fechaPic).format('YYYY-MM-DD')} | ${
          d.clientePic
        }`,
      }));
    }
    response = await this.PicacdoVisPzApi.getPicadoPz(p);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.idConsecutivo,
      item: `${d.picadoNo} | ${moment(d.fechaPic).format('YYYY-MM-DD')} | ${
        d.clientePic
      }`,
    }));
  }
}
</script>
