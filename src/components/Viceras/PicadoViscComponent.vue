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
          <div class="pl-64 mb-6 md:mb-0">
            <label class="label">
              Relacion Picado Viscera No:
              <select
                class="select -ml-12"
                v-model="IdConcecutivo"
                @change="datosPicado()"
              >
                <option
                  v-for="(item, index) in PicadoVisNo"
                  :key="index"
                  :value="item.IdConsecutivo"
                >
                  {{ item.PicadoNo }} | {{ convertFecha(item.FechaPic) }} |
                  {{ item.Tercero }}
                </option>
              </select>
            </label>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-2 justify-end">
          <div class="pr-20 mt-1 md:mb-0">
            <button class="btn-primary" @click="adicionarReguistro()">
              Adicionar Registro
            </button>
            <button class="btn-save" @click="modificar()">Modificar</button>
            <button class="btn-save" @click="crearAcatulizar()">Guardar</button>
          </div>
        </div>

        <ul class="flex p-2 -mt-3">
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
                      :disabled="readonly"
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
                      :disabled="readonly"
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
                  :readonly="readonly"
                  @change="changeFecha()"
                />
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <PicadoViscTerceroSelect
                  v-model="tercero"
                  :isDisabled="readonly"
                  @expr2="changeTercero"
                  >Codigo:
                </PicadoViscTerceroSelect>
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
                <label class="label">Lote Ext:</label>
                <input
                  type="text"
                  class="input"
                  v-model="nLoteExt"
                  :readonly="readonly"
                  @change="changeLote()"
                />
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
                <label class="label">
                  Tipo Pic:
                  <select
                    class="bg-white border py-1 pr-2 shadow leading-tight select"
                    v-model="tipoPicado"
                    :disabled="readonly"
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
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
                <ViscTipoPesaTipoCnSelect
                  v-model="tipoCn"
                  :isDisabled="readonly"
                />
              </div>
            </div>

            <div class="border-b border-gray-500 mt-5 mb-2"></div>

            <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
              <label class="label">Etiqueta:</label>
              <input
                type="text"
                class="input"
                v-model="Etiqueta"
                @change="onChagerEtiqueTable()"
              />
            </div>

            <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
              <label class="label">Guia:</label>
              <input type="text" class="input" v-model="Guia" readonly />
            </div>

            <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
              <label class="label">Animal N°:</label>
              <input type="text" class="input" v-model="AnumalNo" readonly />
            </div>

            <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
              <label class="label">Peso Viseras:</label>
              <input type="text" class="input" v-model="PesadoVis" readonly />
            </div>

            <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
              <label class="label">Fecha Hora:</label>
              <input
                type="datetime-local"
                class="input"
                v-model="FehaHora"
                readonly
              />
            </div>

            <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
              <label class="label">Anulado:</label>
              <input type="checkbox" class="checkbox" v-model="Anulado" />
            </div>

            <br />

            <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
              <label class="label">Higado:</label>
              <input type="checkbox" class="checkbox" v-model="Higado" />
            </div>

            <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
              <label class="label">Pulmon:</label>
              <input type="checkbox" class="checkbox" v-model="pulmon" />
            </div>

            <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
              <label class="label">Pajarilla:</label>
              <input type="checkbox" class="checkbox" v-model="Pajarilla" />
              "
            </div>

            <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
              <label class="label">Riñon:</label>
              <input type="checkbox" class="checkbox" v-model="Rino" />
            </div>

            <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
              <label class="label">Lengua:</label>
              <input type="checkbox" class="checkbox" v-model="Lengua" />
            </div>

            <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
              <label class="label">Corazon:</label>
              <input type="checkbox" class="checkbox" v-model="Corazon" />
            </div>
          </div>

          <!-- table -->
          <div class="flex flex-row flex-wrap mb-3">
            <div class="card-table h-40">
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
                <tbody class="text-center">
                  <tr v-for="(item, index) in TabalPicado" :key="index">
                    <td>{{ item.tpCanas }}</td>
                    <td>
                      {{
                        item.idEtiqueta === undefined ||
                        item.idEtiqueta === null
                          ? ''
                          : item.idEtiqueta
                      }}
                    </td>
                    <td>{{ item.guiaAni }}</td>
                    <td>{{ item.animalNo }}</td>
                    <td>{{ item.pesoVis }}</td>
                    <td>{{ convertBoolStrin(item.anulaMov) }}</td>
                    <td>{{ item.fechaG }}</td>
                    <td>{{ convertBoolStrin(item.decoHiga) }}</td>
                    <td>{{ convertBoolStrin(item.decoPulm) }}</td>
                    <td>{{ convertBoolStrin(item.decoPaja) }}</td>
                    <td>{{ convertBoolStrin(item.decoVRin) }}</td>
                    <td>{{ convertBoolStrin(item.decoLeng) }}</td>
                    <td>{{ convertBoolStrin(item.decoCora) }}</td>
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
            <label class="label">Realizo: </label>
            <input
              type="text"
              class="input"
              v-model="realizo"
              :readonly="readonly"
            />
            <label class="label">Observaciones: </label>
            <input
              type="text"
              class="input"
              v-model="obsersiones"
              :readonly="readonly"
            />
          </div>
          <div class="flex flex-row flex-wrap mb-2 justify-center">
            <div class="pt-8">
              <button
                class="btn-save"
                @click="canastilla()"
                :disabled="readonly"
              >
                Canastillas
              </button>
            </div>
            <div class="pt-8">
              <button class="btn-save" @click="btnReportPreliminar()">
                Informe Preliminar
              </button>
            </div>
            <div class="pt-8">
              <button class="btn-save" @click="btnReportDefinitivo()">
                Informe Definitivo
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="Operari">
        <!-- table -->
        <div class="flex flex-row flex-wrap">
          <div>
            <button
              class="btn-save"
              @click="adicionarOperario()"
              :disabled="readonly"
            >
              Añadir Operario
            </button>
          </div>
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
      <div class="modal" v-if="isPicadoVisDt3">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col p-2">
            <PicadoViscDt3Component v-bind:idConcecutivo="idConDet3" />
            <button
              class="btn-delete w-3/12 m-auto mb-2"
              @click="isPicadoVisDt3 = !isPicadoVisDt3"
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

import PicadoViscDt3Component from '@/components/Viceras/PicadoViscDt3Component.vue';

import Loader from '@/components/reusable/Loader.vue';

import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

import * as Sentry from '@sentry/browser';

import PDFPreview from '@/components/reusable/PdfPreview.vue';

import LocalReports from '../../classes/LocalReports';

import PicadoViscTerceroSelect from './PicadoViscTerceroSelect.vue';

import ViscTipoPesaTipoCnSelect from './ViscTipoPesaTipoCnSelect.vue';

const reports = new LocalReports();

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PDFPreview,
    PicadoViscDt3Component,
    PicadoViscTerceroSelect,
    ViscTipoPesaTipoCnSelect,
  },

  name: 'PicadoVisc',
})
export default class PicadoViscComponent extends Vue {
  public reports = new LocalReports();

  private Pesaje: boolean = true;
  private informes: boolean = false;
  private Operari: boolean = false;
  private isPicadoVisDt3: boolean = false;

  private output = '';
  private isError: boolean = false;

  private readonly: boolean = false;

  private IdConcecutivo: number = 0;

  private idConDet3: number = 0;

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

  private count: number = 0;
  private countPica: number = 0;

  private PicadoVisNo: any = [];
  private TabalPicado: any = [];
  private OperarioEmpl: any = [];

  private Turnos: any = [];
  private Grupos: any = [];
  private TipoPic: any = [];

  private DitblAdicionar: any = [];
  private DitTblInicio: any = [];
  private DitTblGuarder: any = [];

  private ports: any[] = [];
  private isPortConnected: boolean = false;
  private portPath: string = '';

  private Etiqueta: string = '';
  private Guia: number = 0;
  private AnumalNo: number = 0;
  private PesadoVis: number = 0;
  private Anulado: boolean = false;
  private FehaHora: string = '';
  private Higado: boolean = false;
  private pulmon: boolean = false;
  private Pajarilla: boolean = false;
  private Rino: boolean = false;
  private Lengua: boolean = false;
  private Corazon: boolean = false;
  private autonum: number = 0;

  private fechaTablas: string = moment().utc().format('YYYY-MM-DD');

  private message: string = '';
  private nuevoPicado: boolean = false;

  private componentName: string = '';
  private isLoading: boolean = false;
  private pdfData: string = '';
  private pdfData2: string = '';

  private showModalPDF: boolean = false;
  private showModalPDF2: boolean = false;

  private PicacdoViscApi = new MovViserasApi(this.$store.getters.getAuthToken);
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

  private canastilla() {
    this.isPicadoVisDt3 = true;
    this.idConDet3 = this.IdConcecutivo;
  }

  private convertFecha(fech: string) {
    return moment(fech).utc().format('YYYY-MM-DD');
  }

  private convertBoolStrin(status: boolean) {
    return status ? 'SI' : 'NO';
  }

  private async turnoD() {
    try {
      const response = await this.PicacdoViscApi.getPicadoTurnoD();

      this.Turnos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.messege);
    }
  }

  private async grupoPic() {
    try {
      const response = await this.PicacdoViscApi.getGrupos();

      this.Grupos = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async tipoPic() {
    try {
      const respose = await this.PicacdoViscApi.getPicadoTipPic();

      this.TipoPic = respose.data[0];
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async mounted() {
    await this.turnoD();
    await this.grupoPic();
    await this.tipoPic();
    await this.realPicadoNo();
    await this.inicoPicdo();
    await this.datosPicado();
  }

  private async inicoPicdo() {
    const result: any = await this.ultimoPicado();
    this.IdConcecutivo = result;
  }

  private async realPicadoNo() {
    try {
      const response = await this.PicacdoViscApi.getPicacoVis();

      this.PicadoVisNo = response.data[0];
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async datosPicado() {
    this.isLoading = true;
    const idConcecutivo: number = this.IdConcecutivo;
    this.clearItemsTable();
    try {
      const response =
        await this.PicacdoViscApi.getPicacdoVisUno(idConcecutivo);
      this.picadoNo = response.data.picadoNo;
      this.grupoPicado = response.data.grupoPica;
      this.turnoPicado = response.data.turnoPic;
      this.fechaMov = moment(response.data.fechaPic).utc().format('YYYY-MM-DD');
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
      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async crearAcatulizar() {
    if (!this.nuevoPicado) {
      await this.actualizarPicado(this.IdConcecutivo);
      return;
    }
    await this.crearPicado();

    this.reports.fechaP = this.fechaMov;
    this.$local.saveLocalReportInfo(reports);
  }

  private modificar() {
    this.readonly = false;
    this.nuevoPicado = false;
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

  private async crearPicado() {
    if (this.beforeUpdatefrom()) {
      return;
    }

    try {
      const response = await this.PicacdoViscApi.potPicadoVisc({
        anulada: this.anulado,
        clientePic: this.tercero,
        fechaP: moment().format('YYYY-MM-DD hh:mm'),
        fechaPic: moment(this.fechaMov).format('YYYY-MM-DD'),
        grupoPica: this.grupoPicado,
        idTpPicado: this.tipoPicado,
        motivoAnul: null,
        nLoteExt: this.nLoteExt,
        nviscPic: this.nVicerasPicado,
        observacion: this.obsersiones,
        observacion2: null,
        picadoNo: this.picadoNo,
        procesado: this.procesado,
        realizo: this.realizo,
        tpCanas: this.tipoCn,
        turnoPic: this.turnoPicado,
        usuarioP: this.$store.getters.getUsuario,
      });

      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
      }
      this.PicadoVisNo = [];
      this.DitTblGuarder = [];

      await this.utitmoIdConcecutivo();
      await this.realPicadoNo();

      this.nuevoPicado = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async utitmoIdConcecutivo() {
    try {
      const response = await this.PicacdoViscApi.getPicadoViscIdC();

      for (const i of response.data) {
        this.DitTblGuarder.push(i.idConsecutivo);
      }

      const id: number = Math.max(...this.DitTblGuarder);

      await this.createTable(id);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async actualizarPicado(idConcecutivo: number) {
    if (this.beforeUpdatefrom()) {
      return;
    }
    try {
      const response = await this.PicacdoViscApi.putPicadoVisc(idConcecutivo, {
        anulada: this.anulado,
        clientePic: this.tercero,
        fechaP: moment().format('YYYY-MM-DD hh:mm'),
        fechaPic: moment(this.fechaMov).format('YYYY-MM-DD'),
        grupoPica: this.grupoPicado,
        idTpPicado: this.tipoPicado,
        motivoAnul: null,
        nLoteExt: this.nLoteExt,
        nviscPic: this.nVicerasPicado,
        observacion: this.obsersiones,
        observacion2: null,
        picadoNo: this.picadoNo,
        procesado: this.procesado,
        realizo: this.realizo,
        tpCanas: this.tipoCn,
        turnoPic: this.turnoPicado,
        usuarioP: this.$store.getters.getUsuario,
      });
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
      this.PicadoVisNo = [];

      await this.actulizarTabla(this.autonum);
      await this.realPicadoNo();

      this.nuevoPicado = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async actulizarTabla(autoNum: number) {
    try {
      const response = await this.PicacdoViscApi.putPicadoViscAutom(autoNum, {
        animalNo: this.AnumalNo,
        anulaMov: this.Anulado,
        decoCora: this.Corazon,
        decoGali: 0,
        decoHiga: this.Higado,
        decoLeng: this.Lengua,
        decoLomo: 0,
        decoPaja: this.Pajarilla,
        decoPulm: this.pulmon,
        decoSebo: 0,
        decoVRin: this.Rino,
        fechaG: moment(this.FehaHora).utc().format('YYYY-MM-DD HH:mm'),
        guiaAni: this.Guia,
        idConsecutivo: this.IdConcecutivo,
        idEtiqueta:
          this.Etiqueta === undefined || this.Etiqueta === null
            ? ''
            : this.Etiqueta,
        pesoVis: this.PesadoVis,
        tpCanas: this.tipoCn,
      });

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async createTable(idConcecutivo: number) {
    try {
      const response = await this.PicacdoViscApi.postPicadoDet({
        animalNo: this.AnumalNo,
        anulaMov: this.Anulado,
        decoCora: this.Corazon,
        decoGali: 0,
        decoHiga: this.Higado,
        decoLeng: this.Lengua,
        decoLomo: 0,
        decoPaja: this.Pajarilla,
        decoPulm: this.pulmon,
        decoSebo: 0,
        decoVRin: this.Rino,
        fechaG: moment(this.FehaHora).utc().format('YYYY-MM-DD HH:mm'),
        guiaAni: this.Guia,
        idConsecutivo: idConcecutivo,
        idEtiqueta:
          this.Etiqueta === undefined || this.Etiqueta === null
            ? ''
            : this.Etiqueta,
        pesoVis: this.PesadoVis,
        tpCanas: this.tipoCn,
      });

      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private beforeUpdatefrom() {
    const DatePic = moment(this.fechaMov).utc().format('YYYY-MM-DD');
    const fech1 = moment(this.$store.getters.getTConfinv1.fechaProc1)
      .utc()
      .format('YYYY-MM-DD');
    const fech2 = moment(this.$store.getters.getTConfinv1.fechaProc2)
      .utc()
      .format('YYYY-MM-DD');

    if (this.tercero === null || this.tercero === '') {
      this.showOutput(true, 'La Relacion no Tiene Tercero');
      return true;
    }

    if (this.picadoNo === 0) {
      this.showOutput(
        true,
        'El Picado de Viscera no puede ser Cero, Escoja Adicionar Registro',
      );
      return true;
    }

    if (DatePic < fech1 || DatePic > fech2) {
      this.showOutput(true, 'La fecha esta fuera de limite');
      return true;
    }

    return false;
  }

  private async adicionarReguistro() {
    const result: any = await this.frimTblPicdo();
    this.clearFrom();
    this.nuevoPicado = true;
    result + 1 === null ? (this.picadoNo = 1) : (this.picadoNo = result + 1);

    this.readonly = false;
  }

  private async frimTblPicdo() {
    try {
      const response = await this.PicacdoViscApi.getPicadoVisVcra();
      if (response.data.length === 0) {
        return null;
      }

      for (const i of response.data) {
        this.DitblAdicionar.push(i.picadoNo);
      }

      return Math.max(...this.DitblAdicionar);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async tablaPicasoDet(idComcecutivo: number) {
    this.isLoading = true;
    try {
      const response = await this.PicacdoViscApi.getPicadoDetID(idComcecutivo);

      if (response.data.length === 0) {
        return;
      }

      this.TabalPicado = response.data;
      this.Etiqueta =
        response.data[0].idEtiqueta === null ||
        response.data[0].idEtiqueta === undefined
          ? ''
          : response.data[0].idEtiqueta;
      this.Guia = response.data[0].guiaAni;
      this.AnumalNo = response.data[0].animalNo;
      this.PesadoVis = response.data[0].pesoVis;
      this.Anulado = response.data[0].anulaMov;
      this.FehaHora = moment(response.data[0].fechaG)
        .utc()
        .format('YYYY-MM-DDTHH:mm');
      this.Higado = response.data[0].decoHiga;
      this.pulmon = response.data[0].decoPulm;
      this.Pajarilla = response.data[0].decoPaja;
      this.Rino = response.data[0].decoVRin;
      this.Lengua = response.data[0].decoLeng;
      this.Corazon = response.data[0].decoCora;
      this.autonum = response.data[0].autoNum;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private clearItemsTable() {
    this.Etiqueta = '';
    this.Guia = 0;
    this.AnumalNo = 0;
    this.PesadoVis = 0;
    this.Anulado = false;
    this.FehaHora = '';
    this.Higado = false;
    this.pulmon = false;
    this.Pajarilla = false;
    this.Rino = false;
    this.Lengua = false;
    this.Corazon = false;
  }

  private clearFrom() {
    this.IdConcecutivo = 0;
    this.picadoNo = 0;
    this.grupoPicado = 0;
    this.turnoPicado = '';
    this.fechaMov = '';
    this.tercero = '';
    this.nVicerasPicado = 0;
    this.nLoteExt = 0;
    this.tipoPicado = 0;
    this.tipoCn = 0;
    this.realizo = '';
    this.obsersiones = '';
    this.procesado = false;
    this.anulado = false;

    this.Etiqueta = '';
    this.Guia = 0;
    this.AnumalNo = 0;
    this.PesadoVis = 0;
    this.Anulado = false;
    this.FehaHora = '';
    this.Higado = false;
    this.pulmon = false;
    this.Pajarilla = false;
    this.Rino = false;
    this.Lengua = false;
    this.Corazon = false;
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

  private async adicionarOperario() {
    try {
      const response = await this.PicacdoViscApi.getPicadoDet4();
      for (const i of response.data) {
        if (i.idConsecutivo === this.IdConcecutivo) {
          this.count = this.count + 1;
        }
      }

      if (this.count >= 1) {
        const opcion = confirm(
          'Va a ELIMINAR los Operarios Ingresados al Sistema',
        );
        if (!opcion) {
          return;
        }
        this.deletePicadoDet4(this.IdConcecutivo);
      }

      await this.crearOperario(this.IdConcecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async deletePicadoDet4(idConcecutivo: number) {
    try {
      const response =
        await this.PicacdoViscApi.deletePicadoDet4(idConcecutivo);

      if (response.statusCode !== 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async crearOperario(idConcecutivo: number) {
    if (this.fechaMov === '' || this.fechaMov === null) {
      this.showOutput(true, 'no hay fecha para crear operario');
      return;
    }
    try {
      const response = await this.PicacdoViscApi.putPicadoDet4(idConcecutivo, {
        fechaAsis: moment(this.fechaMov).format('YYYY-MM-DD'),
      });

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async operarioLit(idConcecutivo: number) {
    try {
      const response = await this.PicacdoViscApi.getPicadoDet4ID(idConcecutivo);

      if (response.statusCode !== 200) {
        this.showOutput(
          true,
          'Error al traer información del menú, intente nuevamente.',
        );
        return;
      }

      for (const Empleados of response.data) {
        const responseName = await this.PicacdoViscApi.getEmpleadosByID(
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

  private async ultimoPicado() {
    try {
      const response = await this.PicacdoViscApi.getPicado();

      if (response.data.length === 0) {
        return null;
      }

      for (const i of response.data) {
        this.DitTblInicio.push(i.idConsecutivo);
      }

      return Math.max(...this.DitTblInicio);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message());
    }
  }

  private async onChagerEtiqueTable() {
    this.isLoading = true;
    if (this.Etiqueta.length !== 21) {
      this.showOutput(true, '"Etiqueta no Corresponde a Visceras');
      return;
    }
    this.Guia = parseInt(this.Etiqueta.substring(0, 6), 10);
    this.AnumalNo = parseInt(this.Etiqueta.substring(7, 9), 10);
    this.PesadoVis = parseInt(this.Etiqueta.substring(10, 15), 10);
    this.FehaHora = moment().utc().format('YYYY-MM-DDTHH:mm');

    try {
      const response = await this.PicacdoViscApi.getPicadoDet();

      for (const i of response.data) {
        if (i.idConsecutivo === this.IdConcecutivo && i.anulaMov === false) {
          this.countPica = this.countPica + 1;
        }
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }

    if (this.countPica >= this.nVicerasPicado) {
      this.showOutput(true, 'Error Numero de Visceras a Picar');
      return;
    }

    if (await this.bucarSacrificio(this.Guia, this.AnumalNo)) {
      return;
    }

    if (await this.existeEtiqueta(this.Etiqueta)) {
      return;
    }

    try {
      const response = await this.PicacdoViscApi.getPicadoTipoPic(
        this.tipoPicado,
      );
      this.showOutput(false, response.message);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }

    try {
      const response = await this.PicacdoViscApi.getPicadoDte2(0);
      this.showOutput(false, response.message);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async bucarSacrificio(nGuia: number, animal: number) {
    try {
      const response = await this.PicacdoViscApi.getPicadoSacriDet4(
        nGuia,
        animal,
      );
      if (response.data.length === 0) {
        this.showOutput(true, 'No Existe esta Viscera en la Base de Datos');
        return true;
      }

      return false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  private async existeEtiqueta(idEtiqueta: string) {
    try {
      const response = await this.PicacdoViscApi.getPicaIdEtiqueta(idEtiqueta);

      if (response.data.length !== 0) {
        this.showOutput(
          true,
          `Ya Existe esta Viscera con Fecha ${response.data.fechaG}`,
        );
        return true;
      }

      return false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);

      return false;
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style scoped></style>
