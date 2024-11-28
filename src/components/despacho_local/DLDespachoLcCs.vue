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
        <div class="px-3 md:w-1/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Despacho Local</h1>
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <div class="md:w-1 px-5 mb-6 md:mb-0 mt-5">
            <p class="text-andrea font-bold text-2xl">{{ status }}</p>
          </div>
        </div>
      </div>
      <div class="flex-wrap">
        <div v-if="search" class="flex flex-row flex-wrap mb-3">
          <div class="flex flex-row flex-wrap p-3 w-full justify-end">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Busqueda:</label>
              <PaginatedSelect
                v-model="idDespachoLoc"
                :fetch="buscarCliente"
                @change="afterBuscarCliente"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="search = !search">
            Buscar Registro
          </button>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos-Canales-DL"
        class="hidden"
        checked
      />
      <input type="radio" name="tab" id="visceras-DL" class="hidden" />
      <input
        type="radio"
        name="tab"
        id="anualar-DL"
        class="hidden"
        v-if="pgAnualado"
      />

      <div class="mt-2 mb-0 nav">
        <label for="datos-Canales-DL">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos Basicos y Canales
          </span>
        </label>

        <label for="visceras-DL">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Visceras
          </span>
        </label>
        <label for="anualar-DL">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="pgAnualado"
          >
            Anular
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-Canales-DL">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">ID Despacho:</label>
            <input
              type="text"
              class="input"
              v-model="IdLDespachoLc.idDespachoLoc"
              disabled
              maxlength="4"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Placa Vehiculo:</label>
            <input
              type="text"
              class="input"
              v-model="IdLDespachoLc.placaVeh"
              disabled
              maxlength="7"
            />
          </div>
        </div>

        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-36">
            <label class="label"> Conductor: </label>
            <PaginatedSelect
              v-model="IdLDespachoLc.conductorVeh"
              :fetch="conductoresNit"
              disabled
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-64">
            <PaginatedSelect
              v-model="IdLDespachoLc.conductorVeh"
              :fetch="conducturesName"
              disabled
              class="mt-4 px-3"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Fecha Despacho:</label>
            <input
              type="date"
              class="input"
              v-model="IdLDespachoLc.fechaDL"
              disabled
              maxlength="4"
            />
          </div>
        </div>

        <div class="p-4"></div>
        <div class="p-4"></div>

        <div class="flex flex-row flex-wrap mt-4">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
            <label class="label">Detalles Canales...</label>
          </div>

          <DLDespachoLcDet2
            :idDespachoLoc="idDespachoLoc"
            :key="idDespachoLoc"
            :readonly="readonly"
            :viewAddRegistro="viewAddRegistro"
          />
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-visceras-DL">
        <div class="px-3 pt-5 mb-6 md:mb-0 inline-block relative w-48">
          <label class="label">Otros Detalles...</label>
        </div>
        <DLDespachoLcDet1
          :idDespachoLoc="idDespachoLoc"
          :key="idDespachoLoc"
          :readonly="readonly"
          :viewAddRegistro="viewAddRegistro"
        />

        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-10/12">
            <label class="label">Observacion:</label>
            <input
              type="text"
              class="input"
              v-model="IdLDespachoLc.observacion"
              disabled
              maxlength="70"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-1/2">
            <label class="label">Realizo:</label>
            <input
              type="text"
              class="input"
              v-model="IdLDespachoLc.realizo"
              disabled
              maxlength="25"
            />
          </div>

          <div class="md:w-2/12 px-3 mb-6 md:mb-0"></div>

          <div class="px-1 mb-6 md:mb-0 w-1/5">
            <button class="btn-save p-1" @click="onPrint">
              Imprimir Documento
            </button>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-anualar-DL" v-if="pgAnualado">
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap justify-center">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Anular:</label>
              <input
                class="checkBox"
                type="checkbox"
                v-model="IdLDespachoLc.anulado"
                disabled
                maxlength="1"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Motivo:</label>
              <input
                type="text"
                class="input"
                v-model="IdLDespachoLc.motivoAnul"
                disabled
                maxlength="30"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />

      <!-- Modal view Pdf -->
      <ModalPDFPreview
        :pdfData="rptDespachoLocalPdfBase64"
        @close="rptDespachoLocalPdfBase64 = ''"
        v-if="rptDespachoLocalPdfBase64.length > 0"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '../reusable/AlertBox.vue';
import DLDespachoLcDet1 from './DLDespachoLcDet1.vue';
import DLDespachoLcDet2 from './DLDespachoLcDet2.vue';
import Loader from '../reusable/Loader.vue';
import PaginatedSelect from '../reusable/PaginatedSelect.vue';
import '../../assets/tab.css';
import DespachoLocalApi from '@/remote/api/despacho_local/despachoLocalApi';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { IConductores, IDLDespachoLc } from '@/remote/api/despacho_local/types';
import convertDate from '@/utils/convertDate';
import { captureException } from '@sentry/browser';
import ReportesDespachosLocalApi from '@/remote/api/despacho_local/reportesDespachosLocal';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    DLDespachoLcDet1,
    DLDespachoLcDet2,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
  },
  name: 'DLDespachoLcCs',
})
export default class DLDespachoLcCs extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private search: boolean = false;
  private pgAnualado: boolean = false;
  private viewAddRegistro: boolean = true;
  private readonly: boolean = true;
  private idDespachoLoc: number = 1;
  private rptDespachoLocalPdfBase64: string = '';

  private IdLDespachoLc: IDLDespachoLc = {
    anulado: false,
    conductorVeh: '',
    fechaDL: '',
    fechaUs: '',
    idDespachoLoc: 0,
    imprime: 'N',
    motivoAnul: '',
    observacion: '',
    placaVeh: '',
    realizo: '',
    usuario: '',
  };

  private despachoLocalApi = new DespachoLocalApi(
    this.$store.getters.getAuthToken,
  );

  private despachoLocalRerportesApi = new ReportesDespachosLocalApi(
    this.$store.getters.getAuthToken,
  );

  private get status() {
    return this.IdLDespachoLc.anulado
      ? 'ANULADO'
      : this.IdLDespachoLc.imprime === 'N'
      ? 'PENDIENTE'
      : 'CONFIRMADO';
  }

  private async mounted() {
    await this.afterBuscarCliente();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(isError: boolean, message: string) {
    this.output = message;
    this.isError = isError;
  }

  private async onPrint() {
    if (!this.idDespachoLoc) {
      this.showOutput(true, 'Debe Digitar idDespachoLoc');
      return;
    }
    this.isLoading = true;
    try {
      const rptReproceso =
        await this.despachoLocalRerportesApi.rptDespachoLocalpdf(
          this.idDespachoLoc,
        );
      this.rptDespachoLocalPdfBase64 = rptReproceso.data;
    } catch (err) {
      captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async afterBuscarCliente() {
    this.isLoading = true;
    try {
      const response =
        await this.despachoLocalApi.DLDespachoLcCs.getAfterBuscarCliente(
          this.idDespachoLoc,
        );
      this.IdLDespachoLc = response.data;
      this.IdLDespachoLc.fechaDL = convertDate(this.IdLDespachoLc.fechaDL);
      this.IdLDespachoLc.fechaUs = convertDate(this.IdLDespachoLc.fechaUs);
      this.search = false;
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async conductoresNit(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>
    >;
    if (q.query) {
      response =
        await this.despachoLocalApi.DLDespachoLcCs.getConductoresFind(q);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IConductores, 'nitConduc'>) => ({
          id: e.nitConduc,
          item: e.nitConduc,
        }),
      );
    }
    response = await this.despachoLocalApi.DLDespachoLcCs.getConductores(p);
    return response.data.map<IInterfaceSelect>(
      (e: Pick<IConductores, 'nitConduc'>) => ({
        id: e.nitConduc,
        item: e.nitConduc,
      }),
    );
  }

  private async conducturesName(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>
    >;
    if (q.query) {
      response =
        await this.despachoLocalApi.DLDespachoLcCs.getConductoresFind(q);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IConductores, 'nitConduc' | 'nombreCond'>) => ({
          id: e.nitConduc,
          item: e.nombreCond,
        }),
      );
    }
    response = await this.despachoLocalApi.DLDespachoLcCs.getConductores(p);
    return response.data.map<IInterfaceSelect>(
      (e: Pick<IConductores, 'nitConduc' | 'nombreCond'>) => ({
        id: e.nitConduc,
        item: e.nombreCond,
      }),
    );
  }

  private async buscarCliente(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<Pick<IDLDespachoLc, 'idDespachoLoc' | 'fechaDL' | 'placaVeh'>>
    >;
    if (q.query) {
      response =
        await this.despachoLocalApi.DLDespachoLcCs.getBuscarClienteFind(q);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IDLDespachoLc, 'idDespachoLoc' | 'fechaDL' | 'placaVeh'>) => ({
          id: e.idDespachoLoc,
          item: `${e.idDespachoLoc} - ${convertDate(e.fechaDL)} - ${
            e.placaVeh
          }`,
        }),
      );
    }
    response = await this.despachoLocalApi.DLDespachoLcCs.getBuscarCliente(p);
    return response.data.map<IInterfaceSelect>(
      (e: Pick<IDLDespachoLc, 'idDespachoLoc' | 'fechaDL' | 'placaVeh'>) => ({
        id: e.idDespachoLoc,
        item: `${e.idDespachoLoc} - ${convertDate(e.fechaDL)} - ${e.placaVeh}`,
      }),
    );
  }
}
</script>
