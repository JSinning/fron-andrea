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
        <div class="px-3 md:w-2/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Relacion canal deshuese</h1>
        </div>
      </div>
      <div>
        <div class="md:w-15 pl-64 mb-6 md:mb-0" v-if="buscarRegistro">
          <label class="label">Busqueda relacion de canal:</label>
          <PaginatedSelect
            v-model="idConcecutivo"
            :fetch="clientes"
            @change="buscarCliente"
            @error="showOutput"
          />
        </div>
      </div>
      <div class="flex flex-row flex-wrap">
        <div class="md:w-1/3 px-3 mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="reportGuide">Info guia</button>
          <button class="btn-save" @click="consolidadoProducto">
            Consolidado productos
          </button>
        </div>
        <div class="md:w-1/3 px-5 mb-6 md:mb-0 mt-5">
          <p class="text-andrea font-bold text-2xl">{{ infoProcess }}</p>
        </div>
        <div class="md:w-1/3 px-3 mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="buscarRegistro = !buscarRegistro">
            Buscar registro
          </button>
          <button class="btn-primary" @click="reimprimir">
            Reimprimir registro
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
      <input type="radio" name="tab" id="anular" class="hidden" />

      <div class="mt-2 mb-0 nav">
        <label for="datos_basicos">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block mb-0 text-andrea font-semibold text-xs"
          >
            Datos Basicos
          </span>
        </label>

        <label for="anular">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block mb-0 text-andrea font-semibold text-xs"
          >
            Anular
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 hidden tab-datos">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Tipo movimiento</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="tipoMov"
              disabled
            >
              <option
                v-for="(item, index) in tipoMovimimiento"
                :key="index"
                :value="item.idMovimiento"
              >
                {{ item.descripcion }}
              </option>
            </select>
          </div>
          <div class="px-1 mb-6 md:mb-0">
            <label class="label">Relacion canal</label>
            <input type="text" class="input" v-model="consecTip" readonly />
          </div>
          <div class="px-3 py-3">
            <label class="label">Destino : </label>
          </div>
          <div class="px-1 py-3 mb-6 md:mb-0">
            <div class="border-solid border border-indigo-600">
              <div class="flex flex-row flex-wrap">
                <div class="px-3 mb-6 md:mb-0">
                  <label class="label">
                    <input
                      type="radio"
                      class="checkbox"
                      :value="1"
                      v-model="destino"
                      disabled
                    />
                    Despacho:
                  </label>
                </div>
                <div class="px-3 mb-6 md:mb-0">
                  <label class="label">
                    <input
                      type="radio"
                      class="checkbox"
                      :value="2"
                      v-model="destino"
                      disabled
                    />
                    Deshuese:</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Es propio:</label>
            <input
              type="checkbox"
              class="checkbox"
              v-model="esPropio"
              disabled
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/8 px-3 py-3 mb-1 md:mb-0">
            <label class="label">Terceros:</label>
            <PaginatedSelect
              v-model="nitoCC"
              :fetch="terceros"
              :disabled="true"
              @error="showOutput"
            />
          </div>
          <div class="md:w-4/12 px-3 py-3 mb-1 md:mb-0">
            <label class="label">Documento (C - F)</label>
            <input type="text" class="input" v-model="document" readonly />
          </div>
          <div class="md:w-1/8 px-3 py-3 mb-6 md:mb-0">
            <label class="label">Fecha movimiento</label>
            <input type="date" class="input p-1" v-model="fechaMov" readonly />
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-3">
          <div class="card-table">
            <div class="overflow-x-hidden">
              <table class="table-auto w-full text-sm" id="tableA">
                <thead>
                  <tr
                    class="border-b border-gray-500 text-white bg-andrea font-bold"
                  >
                    <th>Etiqueta</th>
                    <th>Cod</th>
                    <th>Guias</th>
                    <th>N-Ani</th>
                    <th>Lado</th>
                    <th>Cant</th>
                    <th>Kilos</th>
                    <th>PH</th>
                    <th>Temperatura</th>
                    <th>Descripcion</th>
                    <th>Kilos CC</th>
                    <th>Diferencia</th>
                    <th>Motivo</th>
                    <th>Anular</th>
                  </tr>
                </thead>
                <tbody
                  class="text-center"
                  v-for="(item, index) in tableDetails"
                  :key="index"
                >
                  <tr>
                    <td>{{ item.etiqueta }}</td>
                    <td>{{ item.idCodigo }}</td>
                    <td>{{ item.guiaNo }}</td>
                    <td>{{ item.nAnima }}</td>
                    <td>{{ item.ladoAni }}</td>
                    <td>{{ item.cantidadUn }}</td>
                    <td>{{ convertRoundDecimal(item.cantidad) }}</td>
                    <td>{{ item.ph }}</td>
                    <td>{{ item.temperatura }}</td>
                    <td>
                      {{ item.idCodigo }}
                    </td>
                    <td>{{ item.cantidad2 }}</td>
                    <td>{{ convertRoundDecimal(item.difer) }}</td>
                    <td>{{ item.motivoAnula }}</td>
                    <td>
                      {{ converBoleanString(item.anular) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-2">
          <div class="md:w-1/8 px-3 mb-2 md:mb-0">
            <input
              type="text"
              class="input"
              v-model="independienteMov"
              readonly
            />
          </div>

          <div class="md:w-7 px-3 mb-2 md:mb-0">
            <label class="label">Total Unidades y Kilos :</label>
          </div>

          <div class="md:w-7 px-3 mb-2 md:mb-0">
            <input
              type="text"
              class="input"
              v-model="unidades"
              placeholder="unidades"
              readonly
            />
          </div>

          <div class="md:w-2/12 mb-2 md:mb-0">
            <input
              type="text"
              class="input"
              v-model="kilos"
              placeholder="kilos"
              readonly
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-3">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">Realio: </label>
            <input type="text" class="input" v-model="entrego" readonly />
            <div class="mb-6 md:mb-0 inline-block relative w-64">
              <label class="label">Observaciones: </label>
              <textarea
                type="text"
                class="input"
                v-model="observaciones"
                readonly
              />
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-anular">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Anulado</label>
            <input
              type="checkbox"
              class="checkbox"
              readonly
              v-model="anulada"
              disabled
            />
          </div>

          <div class="md:w-7 mb-2 md:mb-0">
            <label class="label">Motivo:</label>
            <input type="text" class="input" v-model="motivoAnul" readonly />
          </div>
        </div>
      </div>

      <hr />

      <!-- modal SubConsoDespa-->
      <div>
        <div class="modal" v-if="modalSubConsoDespa">
          <div class="relative mx-auto w-auto max-w-2xl">
            <div class="bg-white w-full rounded shadow-2xl flex flex-col p-2">
              <FrmSubConsoDespa
                v-bind:tipoMovG="tipoMovG"
                v-bind:consecTipG="consecTipG"
              />
              <button
                class="btn-delete w-3/12 m-auto mb-2"
                @click="modalSubConsoDespa = !modalSubConsoDespa"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- end modal -->
      <!-- modal SubRelaCanLot-->
      <div>
        <div class="modal" v-if="modalSubRelaCanLot">
          <div class="relative mx-auto w-auto max-w-2xl">
            <div class="bg-white w-full rounded shadow-2xl flex flex-col p-2">
              <FrmSubRelaCanLot v-bind:guiaGen="guiaGen" />
              <button
                class="btn-delete w-3/12 m-auto mb-2"
                @click="modalSubRelaCanLot = !modalSubRelaCanLot"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- end modal -->
      <ModalPDFPreview
        :pdfData="pdfData"
        @close="closeModalPDF"
        v-if="showModalPDF"
      />
    </div>
  </div>
</template>

<script lang="ts">
import FrmSubConsoDespa from '@/components/relacion_canales/frmSubConsoDespa.vue';
import FrmSubRelaCanLot from '@/components/relacion_canales/frmSubRelaCanLot.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import PDFPreview from '@/components/reusable/PdfPreview.vue';
import RelacionCanalApi from '@/remote/api/relacion_canales/RelacionCanalApi';
import RelacionReportesApi from '@/remote/api/relacion_canales/RelacionReportesApi';
import * as Sentry from '@sentry/browser';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import PaginatedSelect from '../reusable/PaginatedSelect.vue';
import IQuery from '@/types/query';
import { BaseResponse, Customer } from '@/types';
import { TMovimientos } from '@/remote/api/relacion_canales/types/TMovimiento';

@Component({
  components: {
    AlertBox,
    FrmSubConsoDespa,
    FrmSubRelaCanLot,
    Loader,
    ModalPDFPreview,
    PDFPreview,
    PaginatedSelect,
  },
  name: 'MovRelaCanalC',
})
export default class MovRelaCanalC extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private buscarRegistro: boolean = false;
  private modalSubConsoDespa: boolean = false;
  private modalSubRelaCanLot: boolean = false;
  private idConcecutivo: number = 0;
  private tipoMov: number = 0;
  private anulada: boolean = false;
  private procesado: boolean = false;
  private esPropio: boolean = false;
  private document: string = '';
  private consecTip: number = 0;
  private nitoCC: string = '';
  private fechaMov: string = '';
  private entrego: string = '';
  private observaciones: string = '';
  private motivoAnul: string = '';
  private destino: number = 0;
  private imprimir: string = '';
  private infoProcess: string = '';
  private unidades: number = 0;
  private kilos: number = 0;
  private tipoMovG: number = 0;
  private consecTipG: number = 0;
  private independienteMov: number = 0;
  private guiaGen: number = 0;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private tipoMovimimiento: any = [];
  private tableDetails: any = [];

  private relaCanalApi = new RelacionCanalApi(this.$store.getters.getAuthToken);
  private relaReportesApi = new RelacionReportesApi(
    this.$store.getters.getAuthToken,
  );

  public async mounted() {
    await this.selectTipoMov();
  }

  public closeModalPDF() {
    this.showModalPDF = false;
  }

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private convertFecha(fech: string) {
    return moment(fech).utc().format('YYYY-MM-DD');
  }

  private converBoleanString(dato: boolean) {
    return dato ? 'SI' : 'NO';
  }

  private convertRoundDecimal(dato: number) {
    return Math.round((dato + Number.EPSILON) * 100) / 100;
  }

  private anuladaProcesado() {
    if (this.anulada) {
      this.infoProcess = 'ANULADO';
      return;
    }
    !this.procesado
      ? (this.infoProcess = 'PENDIENTE')
      : (this.infoProcess = 'CONFIRMADO');
  }

  private async selectTipoMov() {
    this.isLoading = true;
    try {
      const response = await this.relaCanalApi.getTipoMov();
      this.tipoMovimimiento = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar Tipo Movimiento');
    } finally {
      this.isLoading = false;
    }
  }

  private async buscarCliente() {
    this.isLoading = true;
    const idConcecutivo: number = this.idConcecutivo;
    try {
      const response = await this.relaCanalApi.getBusCliente(idConcecutivo);
      this.tipoMov = response.data.tipoMov;
      this.consecTip = response.data.consecTip;
      this.esPropio = response.data.esPropio;
      this.nitoCC = response.data.nitoCC;
      this.document = response.data.document;
      this.entrego = response.data.entrego;
      this.observaciones = response.data.observaciones;
      this.fechaMov = moment(response.data.fechaMov).utc().format('YYYY-MM-DD');
      this.destino = response.data.destino;
      this.anulada = response.data.anulada;
      this.procesado = response.data.procesado;
      this.motivoAnul = response.data.motivoAnul;
      this.imprimir = response.data.imprim;
      this.tableDetails = [];
      this.anuladaProcesado();
      await this.tableDetalle(this.consecTip);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar Datos Cliente');
    } finally {
      this.isLoading = false;
    }
  }

  private async tableDetalle(consecTip: number) {
    this.isLoading = true;
    try {
      const response = await this.relaCanalApi.getDetalles(consecTip);
      this.tableDetails = response.data;
      this.unidadKilos();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar Table Detalle');
    } finally {
      this.isLoading = false;
    }
  }

  private async unidadKilos() {
    let sum: number = 0;
    for (const items of this.tableDetails) {
      sum = sum + items.cantidad;
    }
    this.unidades = this.tableDetails.length;
    this.kilos = this.convertRoundDecimal(sum);
  }

  private async reimprimir() {
    if (this.imprimir === 'N') {
      this.showOutput(false, 'Utilize la opcion Imprimir');
      return;
    }

    await this.report();
  }
  private consolidadoProducto() {
    this.tipoMovG = this.tipoMov;
    this.consecTipG = this.consecTip;
    this.modalSubConsoDespa = true;
  }

  private async reportGuide() {
    let guiaGen: number = 0;
    this.isLoading = true;
    try {
      const response = await this.relaCanalApi.getInfo(
        this.consecTip,
        this.tipoMov,
      );
      if (response.data !== null) {
        guiaGen = response.data.guiaNo;
      }

      if (guiaGen !== 0) {
        this.guiaGen = guiaGen;
        this.modalSubRelaCanLot = true;
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar informacion Guia');
    } finally {
      this.isLoading = false;
    }
  }

  private async report() {
    try {
      this.isLoading = true;
      const pdf2 = await this.relaReportesApi.getRelaCanPDF(this.idConcecutivo);
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async clientes(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<TMovimientos[]>;
    if (q.query) {
      response = await this.relaCanalApi.getClienteFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.idConsecutivo,
        item: `${d.consecTip} | ${moment(d.fechaMov)
          .utc()
          .format('YYYY-MM-DD')} | ${d.nombreCliente}`,
      }));
    }
    response = await this.relaCanalApi.getCliente(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.idConsecutivo,
      item: `${d.consecTip} | ${moment(d.fechaMov)
        .utc()
        .format('YYYY-MM-DD')} | ${d.nombreCliente}`,
    }));
  }

  private async terceros(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<Customer[]>;
    if (q.query) {
      response = await this.relaCanalApi.customersFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.codiCliente,
        item: `${d.nombreCliente} - ${d.nitCliente} - ${d.codiCliente}`,
      }));
    }
    response = await this.relaCanalApi.customers(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.codiCliente,
      item: `${d.nombreCliente} - ${d.nitCliente} - ${d.codiCliente}`,
    }));
  }
}
</script>
