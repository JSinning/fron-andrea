<template>
  <div class="flex flex-col">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>

    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <div class="main-div">
      <div>
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0">
            <h1 class="title">Relacion de Canal Despacho</h1>
          </div>
        </div>

        <div class="flex-wrap">
          <div v-if="RelaBusca" class="flex flex-row flex-wrap mb-3">
            <div class="flex flex-row flex-wrap p-3 w-full justify-end">
              <div class="md:w-10/12 px-3 mb-6 md:mb-0">
                <label class="label">
                  Buscar Relacion Despacho:
                  <PaginatedSelect
                    v-model="idConcecutivo"
                    :fetch="searchSelect"
                    @change="changeSearchByIdConsec"
                  >
                  </PaginatedSelect>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-2 justify-end">
          <div class="pr-3 mt-1 md:mb-0">
            <button class="btn-save" @click="informatGuia()">
              Informacion de la Guia
            </button>
            <button class="btn-save" @click="clickSubConsDespa()">
              Consolidado Productos
            </button>
            <button class="btn-primary" @click="RelaBusca = !RelaBusca">
              Buscar Registro
            </button>
            <button class="btn-save" @click="reimprimir">
              Reimprimir Registro
            </button>
          </div>
        </div>

        <ul class="flex p-2 -mt-3">
          <li>
            <button class="rounded btn-save" @click="viewDataClient()">
              Datos Cliente
            </button>
          </li>

          <li>
            <button class="rounded btn-save" @click="viewDataDespa()">
              Detalle Despacho
            </button>
          </li>
        </ul>

        <div v-if="DCliente">
          <div class="card">
            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">
                  Tipos Movimiento:
                  <select
                    class="bg-white border py-1 pr-2 select"
                    v-model="tipoMov"
                    disabled
                  >
                    <option :value="tipoMov">{{ tipoMov }}</option>
                    <option
                      v-for="(item, index) in tipoMovSelec"
                      :key="index"
                      :value="item.IdMovimiento"
                    >
                      {{ item.Expr1 }}
                    </option>
                  </select>
                </label>
              </div>
              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Docuento(C-F):</label>
                <input type="text" class="input" v-model="document" readonly />
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">Relacion de canal No:</label>
                <input type="text" class="input" v-model="consecTip" readonly />
              </div>

              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Destino</label>
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="destino"
                  readonly
                />
              </div>

              <div class="px-3 mb-6 md:mb-0">
                <div class="border-solid border border-indigo-600">
                  <div class="flex flex-row flex-wrap">
                    <div class="px-3 mb-6 md:mb-0">
                      <label class="label">Despacho:</label>
                      <input type="checkbox" class="checkbox" readonly />
                    </div>
                    <div class="px-3 mb-6 md:mb-0">
                      <label class="label">Deshuese:</label>
                      <input type="checkbox" class="checkbox" readonly />
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
                <label class="label">Es propio:</label>
                <input
                  type="checkbox"
                  class="checkbox"
                  v-model="esPropio"
                  readonly
                />
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">
                  Tercero:
                  <select
                    class="bg-white border py-1 pr-2 shadow leading-tight select"
                    v-model="nitoCC"
                    disabled
                  >
                    <option :value="nitoCC">{{ nitoCC }}</option>
                    <option
                      v-for="(item, index) in nitoCCSelec"
                      :key="index"
                      :value="item.CodiCliente"
                    >
                      {{ item.Expr2 }} | {{ item.Expr1 }} |
                      {{ item.CodiCliente }}
                    </option>
                  </select>
                </label>
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">
                  Transportador:
                  <input
                    type="text"
                    class="input"
                    v-model="transportador"
                    readonly
                  />
                </label>
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">
                  ciudad envio:
                  <select
                    class="bg-white border py-1 pr-2 shadow leading-tight select"
                    v-model="ciudadEnvio"
                    disabled
                  >
                    <option :value="ciudadEnvio">{{ ciudadEnvio }}</option>
                    <option
                      v-for="(item, index) in ciudadSelec"
                      :key="index"
                      :value="item.idCiudad"
                    >
                      {{ item.descripcionCiu }} | {{ item.idCiudad }} |
                      {{ item.departamento }}
                    </option>
                  </select>
                </label>
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-32">
                <label class="label">
                  Pais Envio:
                  <select
                    class="bg-white border py-1 pr-2 shadow leading-tight select"
                    v-model="paisEnvio"
                    disabled
                  >
                    <option :value="paisEnvio">{{ paisEnvio }}</option>
                    <option
                      v-for="(item, index) in paisSelec"
                      :key="index"
                      :value="item.idPais"
                    >
                      {{ item.descripcionPais }}
                    </option>
                  </select>
                </label>
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">Fecha Movimiento:</label>
                <input type="date" class="input" v-model="fechaMov" readonly />
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">
                  Placa Vehiculo:
                  <input
                    type="text"
                    class="input"
                    v-model="placaVeh"
                    readonly
                  />
                </label>
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">Horometro:</label>
                <input type="text" class="input" v-model="horometro" readonly />
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label"> Conductor: </label>
                <PaginatedSelect
                  v-model="cConduct"
                  :disabled="true"
                  :fetch="conductoresNitSelect"
                />
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <PaginatedSelect
                  class="mt-4"
                  v-model="cConduct"
                  :disabled="true"
                  :fetch="conductoresNameSelect"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="DDespa">
        <div class="flex flex-row flex-wrap mb-3">
          <div class="card-table h-48">
            <table class="table-fixed w-full text-xs" id="tablaB">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th>Etiqueta</th>
                  <th>Codigo</th>
                  <th>Descripcion</th>
                  <th>Cant</th>
                  <th>Kilos CF</th>
                  <th>Kilos CC</th>
                  <th>Diferencia</th>
                  <th>PH</th>
                  <th>Temperatura</th>
                  <th>N-Anim</th>
                  <th>Lado</th>
                  <th>Anular</th>
                  <th>Movimiento</th>
                </tr>
              </thead>
              <tbody
                class="text-center"
                v-for="(item, index) in tableDespaDetall"
                :key="index"
              >
                <tr>
                  <td>{{ item.etiqueta }}</td>
                  <td>{{ item.idCodigo }}</td>
                  <td v-for="(desc, index) in item.descrip" :key="index">
                    {{ desc.DescripciónMer }}
                  </td>
                  <td>{{ item.cantidadUn }}</td>
                  <td>{{ item.cantidad }}</td>
                  <td>{{ item.cantidad2 }}</td>
                  <td>{{ item.difer }}</td>
                  <td>{{ item.ph }}</td>
                  <td>{{ item.temperatur }}</td>
                  <td>{{ item.nAnima }}</td>
                  <td>{{ item.ladoAni }}</td>
                  <td>{{ item.anular }}</td>
                  <td>{{ item.motivoAnula }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex flex-row flex-wrap mb-3 -mt-4">
          <div class="md:w-full">
            <button
              class="btn-primary w-full"
              @click="exporTable(`Detalle Despacho-${fechaTablas}.csv`)"
            >
              Exportar Csv Datos Pesaje
            </button>
          </div>
        </div>
        <div class="flex flex-row flex-wrap mb-3">
          <div class="px-3 mb-6 md:mb-0">
            <input type="text" class="input" readonly />
          </div>
          <div class="flex flex-row flex-wrap">
            <label class="label">Toatal unidades y Kilos</label>
            <div class="px-3 mb-6 md:mb-0">
              <input type="text" class="input" v-model="sumaUnid" readonly />
            </div>
            <div class="px-3 mb-6 md:mb-0">
              <input
                type="text"
                class="input"
                v-model="SumaSubTotal"
                readonly
              />
            </div>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-3">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">Despacho</label>
            <input type="text" class="input" v-model="entrego" readonly />
          </div>
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">Observaciones</label>
            <input type="text" class="input" v-model="observaciones" readonly />
          </div>
        </div>
      </div>

      <hr />
    </div>
    <!-- modal SubConsoDespa -->
    <div>
      <div class="modal" v-if="isSubConsDespa">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <SubConsoDespaComponent
              v-bind:tipoMovS="tipoMov"
              v-bind:concecTipS="consecTip"
            />
            <button class="btn-delete" @click="closeSubConsDespa()">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->

    <!-- modal SubConsoDespa -->
    <div>
      <div class="modal" v-if="isSubRelaCanLot">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <SubRelaCanLotComponent v-bind:guiaNo="guiaGen" />
            <button class="btn-delete" @click="closeSubRelaCanLot()">
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import SubConsoDespaComponent from '@/components/despacho_nacional/SubConsoDespaComponent.vue';
import SubRelaCanLotComponent from '@/components/despacho_nacional/SubRelaCanLotComponent.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import DespachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';
import moment from 'moment';

import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import PDFPreview from '@/components/reusable/PdfPreview.vue';
import * as Sentry from '@sentry/browser';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PDFPreview,
    PaginatedSelect,
    SubConsoDespaComponent,
    SubRelaCanLotComponent,
  },

  name: 'MovDespaNacC',
})
export default class MovDespaNacCComponent extends Vue {
  private isSubConsDespa: boolean = false;
  private isSubRelaCanLot: boolean = false;
  private RelaBusca: boolean = false;

  private output = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private DCliente: boolean = true;
  private DDespa: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private idConcecutivo: number = 0;
  private tipoMov: number = 0;
  private document: number = 0;
  private consecTip: number = 0;
  private esPropio: boolean = false;
  private destino: boolean = false;
  private nitoCC: string = '';
  private transportador: string = '';
  private ciudadEnvio: string = '';
  private paisEnvio: string = '';
  private fechaMov: string = '';
  private placaVeh: string = '';
  private horometro: string = '';
  private cConduct: string = '';
  private entrego: string = '';
  private observaciones: string = '';
  private imprim: string = '';

  private sumaUnid: number = 0;
  private SumaSubTotal: number = 0;
  private guiaGen: number = 0;

  private tipoMovSelec: any = [];
  private nitoCCSelec: any = [];
  private ciudadSelec: any = [];
  private paisSelec: any = [];
  private tableDespaDetall: any = [];
  private fechaTablas: string = moment().utc().format('YYYY-MM-DD');

  private despaNacApi = new DespachoNacionalApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.selectTipoMov();
    await this.selectNioCC();
    await this.selectCiudades();
    await this.selectPaises();
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private clickSubConsDespa() {
    this.isSubConsDespa = !this.isSubConsDespa;
  }

  private closeSubConsDespa() {
    this.isSubConsDespa = !this.isSubConsDespa;
  }

  private openSubRelaCanLot(guiaGen: number) {
    this.guiaGen = guiaGen;
    this.isSubRelaCanLot = !this.isSubRelaCanLot;
  }

  private closeSubRelaCanLot() {
    this.isSubRelaCanLot = !this.isSubRelaCanLot;
  }

  private convertDate(date: string): string {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private async selectTipoMov() {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getTipoMov();
      this.tipoMovSelec = response.data[0];
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar tipo movimiento');
    } finally {
      this.isLoading = false;
    }
  }

  private async selectNioCC() {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getTercetos();
      this.nitoCCSelec = response.data[0];
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar terceros');
    } finally {
      this.isLoading = false;
    }
  }

  private async selectCiudades() {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getCiudades();
      this.ciudadSelec = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar ciudades');
    } finally {
      this.isLoading = false;
    }
  }

  private async selectPaises() {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getPises();
      this.paisSelec = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar paises');
    } finally {
      this.isLoading = false;
    }
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private viewDataClient() {
    if (!this.DCliente) {
      this.DDespa = false;
      this.DCliente = true;
      return;
    }
  }

  private viewDataDespa() {
    if (!this.DDespa) {
      this.DDespa = true;
      this.DCliente = false;
      return;
    }
  }

  private async changeSearchByIdConsec() {
    this.isLoading = true;
    try {
      const idConcecuti = this.idConcecutivo;
      const response = await this.despaNacApi.getShearchDespaIDCon(idConcecuti);
      this.tipoMov = response.data.tipoMov;
      this.document = response.data.document;
      this.consecTip = response.data.consecTip;
      this.destino = response.data.destino;
      this.esPropio = response.data.esPropio;
      this.nitoCC = response.data.nitoCC;
      this.transportador = response.data.transportador;
      this.ciudadEnvio = response.data.ciudadEnvio;
      this.paisEnvio = response.data.paisEnvio;
      this.fechaMov = this.convertDate(response.data.fechaMov);
      this.placaVeh = response.data.placaVeh;
      this.horometro = response.data.horometro;
      this.cConduct = response.data.ccConduct;
      this.entrego = response.data.entrego;
      this.observaciones = response.data.observaciones;
      this.imprim = response.data.imprim;

      this.tableDespaDetall = [];

      await this.tableDetDespacho(this.tipoMov, this.consecTip);
      await this.totalKiloUni(this.tipoMov, this.consecTip);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e);
    } finally {
      this.isLoading = false;
    }
  }

  private async tableDetDespacho(tipoMov: number, consecTip: number) {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getTableDespaDeta(
        tipoMov,
        consecTip,
      );

      for (const tblDespaDeta of response.data) {
        const description = await this.despaNacApi.getProduct(
          tblDespaDeta.idCodigo,
        );

        this.tableDespaDetall.push({
          anular: tblDespaDeta.anular,
          autonum: tblDespaDeta.autonum,
          cantidad: tblDespaDeta.cantidad,
          cantidad2: tblDespaDeta.cantidad2,
          cantidadUn: tblDespaDeta.cantidadUn,
          consecTip: tblDespaDeta.consecTip,
          cuarteo: tblDespaDeta.cuarteo,
          descrip: description.data,
          difer: tblDespaDeta.difer,
          etiqueta: tblDespaDeta.etiqueta,
          fechaG: tblDespaDeta.fechaG,
          guiaNo: tblDespaDeta.guiaNo,
          idCodigo: tblDespaDeta.idCodigo,
          idEti: tblDespaDeta.idEti,
          ladoAni: tblDespaDeta.ladoAni,
          motivoAnula: tblDespaDeta.motivoAnula,
          nAnima: tblDespaDeta.nAnima,
          ph: tblDespaDeta.PH,
          temperatur: tblDespaDeta.temperatur,
          tipoMov: tblDespaDeta.tipoMov,
        });
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e);
    } finally {
      this.isLoading = false;
    }
  }

  private async totalKiloUni(tipoMov: number, compTip: number) {
    try {
      const response = await this.despaNacApi.getSumTable(tipoMov, compTip);
      this.sumaUnid = response.data.sumUnid;
      this.SumaSubTotal = response.data.sumSubTota;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e);
    }
  }

  private async informatGuia() {
    let guiaGen = 0;
    try {
      const response = await this.despaNacApi.getFriRCana(
        this.tipoMov,
        this.consecTip,
      );
      if (response.data.length === 0) {
        this.showOutput(true, 'No se encontro informacion.');
        return;
      }
      guiaGen = response.data[0].guiaNo;

      if (guiaGen !== 0) {
        this.openSubRelaCanLot(guiaGen);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error de consulta');
    }
  }

  private async reportDespacNac() {
    try {
      this.isLoading = true;
      const pdf2 = await this.despaNacApi.getDespachoNacPdf(this.idConcecutivo);
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async reimprimir() {
    if (this.imprim === 'N') {
      this.showOutput(false, 'Utilize la opcion Imprimir');
      return;
    }
    await this.reportDespacNac();
  }

  private async searchSelect(pag?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        IdConcecutivo: number;
        ConsecTip: number;
        FechaMov: string;
        Terc: string;
      }>
    >;
    if (q.query) {
      response = await this.despaNacApi.getShearchDespaFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.IdConcecutivo,
        item: `${d.ConsecTip} | ${this.convertDate(d.FechaMov)} | ${d.Terc}`,
      }));
    }

    response = await this.despaNacApi.getShearchDespa(pag);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.IdConcecutivo,
      item: `${d.ConsecTip} | ${this.convertDate(d.FechaMov)} | ${d.Terc}`,
    }));
  }

  private async conductoresNitSelect(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        idEmpresa: number;
        nitConduc: string;
        expedida: string;
        nombreCond: string;
        placaV: string;
        telefono1: string;
        telefono2: string;
        fecha: string;
        usuario: string;
      }>
    >;
    if (q.query) {
      response = await this.despaNacApi.getConductoresFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.nitConduc,
        item: d.nitConduc,
      }));
    }
    response = await this.despaNacApi.getConductores(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.nitConduc,
      item: d.nitConduc,
    }));
  }

  private async conductoresNameSelect(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        idEmpresa: number;
        nitConduc: string;
        expedida: string;
        nombreCond: string;
        placaV: string;
        telefono1: string;
        telefono2: string;
        fecha: string;
        usuario: string;
      }>
    >;
    if (q.query) {
      response = await this.despaNacApi.getConductoresFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.nitConduc,
        item: d.nombreCond,
      }));
    }
    response = await this.despaNacApi.getConductores(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.nitConduc,
      item: d.nombreCond,
    }));
  }

  private exporTable(file: string) {
    if (this.tableDespaDetall.length === 0) {
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
}
</script>
