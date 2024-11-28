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
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="modificarRegistro">
            Modificar Registro
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="save">Guardar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="anular">Anular</button>
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
        v-if="pgAnulado"
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
            v-if="pgAnulado"
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
              :disabled="readonly"
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
              @change="afterUpdataConductores(IdLDespachoLc.conductorVeh)"
              :disabled="readonly"
            />
          </div>
          <div class="px-0 mb-6 md:mb-0 inline-block relative w-64">
            <PaginatedSelect
              v-model="IdLDespachoLc.conductorVeh"
              :fetch="conducturesName"
              :disabled="readonly"
              @change="afterUpdataConductores(IdLDespachoLc.conductorVeh)"
              class="mt-4 px-3"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Fecha Despacho:</label>
            <input
              type="date"
              class="input"
              v-model="IdLDespachoLc.fechaDL"
              :disabled="readonly"
              maxlength="4"
            />
          </div>
        </div>

        <div class="p-4"></div>
        <div class="p-4"></div>

        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
            <label class="label">Dtalles Canales...</label>
          </div>

          <DLDespachoLcDet2
            :idDespachoLoc="idDespachoLoc"
            :key="idDespachoLoc"
            :cuartoS="0"
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
              :disabled="readonly"
              maxlength="70"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 w-1/2">
            <label class="label">Realizo:</label>
            <input
              type="text"
              class="input"
              v-model="IdLDespachoLc.realizo"
              :disabled="readonly"
              maxlength="25"
            />
          </div>

          <div class="md:w-2/12 px-3 mb-6 md:mb-0"></div>

          <div class="px-1 mb-6 md:mb-0 w-1/5">
            <button class="btn-save p-1" @click="onPrint">
              Imprimir Documento
            </button>
          </div>

          <div class="px-3 mb-6 md:mb-0 inline-block relative w-32">
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
            <label class="label">Placa Vehiculo:</label>
            <input
              type="text"
              class="input"
              v-model="IdLDespachoLc.placaVeh"
              disabled
            />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-anualar-DL" v-if="pgAnulado">
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap justify-center">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Anular:</label>
              <input
                class="checkBox"
                type="checkbox"
                v-model="anula"
                ref="anula"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Motivo:</label>
              <input
                type="text"
                class="input"
                v-model="IdLDespachoLc.motivoAnul"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <button
                class="btn-save"
                @click="
                  () => {
                    if (anula) {
                      viewModalAnular = true;
                    }
                  }
                "
              >
                Anular
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <!-- Modal Anular -->
    <Modals
      :open-modal="viewModalAnular"
      @Ok="aceptarAnulacion"
      @close="viewModalAnular = false"
    >
      Va Anular este Documento este proceso es irreversible
    </Modals>

    <!-- Modal view Pdf -->
    <ModalPDFPreview
      :pdfData="rptDespachoLocalPdfBase64"
      @close="rptDespachoLocalPdfBase64 = ''"
      v-if="rptDespachoLocalPdfBase64.length > 0"
    />
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import AlertBox from '../reusable/AlertBox.vue';
import DLDespachoLcDet1 from './DLDespachoLcDet1.vue';
import DLDespachoLcDet2 from './DLDespachoLcDet2.vue';
import Loader from '../reusable/Loader.vue';
import PaginatedSelect from '../reusable/PaginatedSelect.vue';
import Modals from '@/components/reusable/Modals.vue';
import '../../assets/tab.css';
import { captureException } from '@sentry/browser';
import IPagination from '@/types/IPagination';
import { IConductores, IDLDespachoLc } from '@/remote/api/despacho_local/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import DespachoLocalApi from '@/remote/api/despacho_local/despachoLocalApi';
import convertDate from '@/utils/convertDate';
import moment from 'moment';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import ReportesDespachosLocalApi from '@/remote/api/despacho_local/reportesDespachosLocal';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    DLDespachoLcDet1,
    DLDespachoLcDet2,
    Loader,
    ModalPDFPreview,
    Modals,
    PaginatedSelect,
  },
  name: 'DLDespachoLcMod',
})
export default class DLDespachoLcMod extends Vue {
  @Ref('anula') public readonly anulaRef: HTMLInputElement;
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private search: boolean = false;
  private viewAddRegistro: boolean = true;
  private readonly: boolean = true;
  private anula: boolean = false;
  private pgAnulado: boolean = false;
  private viewModalAnular: boolean = false;
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

  private get status() {
    return this.IdLDespachoLc.anulado
      ? 'ANULADO'
      : this.IdLDespachoLc.imprime === 'N'
      ? 'PENDIENTE'
      : 'CONFIRMADO';
  }

  private despachoLocalApi = new DespachoLocalApi(
    this.$store.getters.getAuthToken,
  );

  private despachoLocalRerportesApi = new ReportesDespachosLocalApi(
    this.$store.getters.getAuthToken,
  );

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

  private anular() {
    if (
      convertDate(this.IdLDespachoLc.fechaDL) <
        convertDate(this.$store.getters.getTConfinv1.fechaProc1) ||
      convertDate(this.IdLDespachoLc.fechaDL) >
        convertDate(this.$store.getters.getTConfinv1.fechaProc2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }
    if (!this.IdLDespachoLc.anulado) {
      this.pgAnulado = true;
      this.anula = false;
      this.anulaRef.focus();
      return;
    }

    this.showOutput(true, 'Documento Anulado');
  }

  private modificarRegistro() {
    if (this.validateAfterModific()) {
      return;
    }
    this.IdLDespachoLc.imprime = 'N';
    this.readonly = false;
    this.viewAddRegistro = false;
  }

  private async aceptarAnulacion() {
    if (this.validateAfterAnula()) {
      return;
    }

    this.IdLDespachoLc.anulado = true;
    this.IdLDespachoLc.fechaUs = moment().utc().format('YYYY-MM-DD');

    await this.updatedDespachoLocal();
    await this.afterBuscarCliente();

    this.viewModalAnular = false;
    this.anula = false;
    this.pgAnulado = false;
  }

  private async save() {
    if (this.validateBeforeUpadate(this.IdLDespachoLc)) {
      return;
    }
    await this.updatedDespachoLocal();
  }

  private async onPrint() {
    if (!this.idDespachoLoc) {
      this.showOutput(true, 'Debe Digitar idDespachoLoc');
      return;
    }
    this.IdLDespachoLc.imprime = 'S';
    await this.updatedDespachoLocal();
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

  private async updatedDespachoLocal() {
    this.isLoading = true;
    try {
      const response = await this.despachoLocalApi.dLDespachoLcMod.put(
        {
          ...this.IdLDespachoLc,
          fechaDL: convertDate(this.IdLDespachoLc.fechaDL),
          fechaUs: convertDate(this.IdLDespachoLc.fechaUs),
        },
        this.idDespachoLoc,
      );

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async afterBuscarCliente() {
    this.isLoading = true;
    try {
      const response =
        await this.despachoLocalApi.dLDespachoLcMod.getAfterBuscarCliente(
          this.idDespachoLoc,
        );
      this.IdLDespachoLc = response.data;
      this.IdLDespachoLc.fechaDL = convertDate(this.IdLDespachoLc.fechaDL);
      this.IdLDespachoLc.fechaUs = convertDate(this.IdLDespachoLc.fechaUs);
      this.search = false;
      this.readonly = true;
      this.viewAddRegistro = true;
      this.pgAnulado = false;
      this.anula = false;
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async afterUpdataConductores(nit: string) {
    this.isLoading = true;
    try {
      const response =
        await this.despachoLocalApi.getAfterUpdateConductore(nit);
      this.IdLDespachoLc.placaVeh = response.data;
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async buscarCliente(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<IDLDespachoLc, 'idDespachoLoc' | 'fechaDL' | 'placaVeh'>>
      >;
      if (q.query) {
        response =
          await this.despachoLocalApi.dLDespachoLcMod.getBuscarClienteFind(q);
        return response.data.map<IInterfaceSelect>(
          (
            e: Pick<IDLDespachoLc, 'idDespachoLoc' | 'fechaDL' | 'placaVeh'>,
          ) => ({
            id: e.idDespachoLoc,
            item: `${e.idDespachoLoc} - ${convertDate(e.fechaDL)} - ${
              e.placaVeh
            }`,
          }),
        );
      }
      response =
        await this.despachoLocalApi.dLDespachoLcMod.getBuscarCliente(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IDLDespachoLc, 'idDespachoLoc' | 'fechaDL' | 'placaVeh'>) => ({
          id: e.idDespachoLoc,
          item: `${e.idDespachoLoc} - ${convertDate(e.fechaDL)} - ${
            e.placaVeh
          }`,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async conductoresNit(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>
      >;
      if (q.query) {
        response =
          await this.despachoLocalApi.getDespachoLocalModConductoresFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IConductores, 'nitConduc'>) => ({
            id: e.nitConduc,
            item: e.nitConduc,
          }),
        );
      }
      response = await this.despachoLocalApi.getDespachoLocalModConductores(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IConductores, 'nitConduc'>) => ({
          id: e.nitConduc,
          item: e.nitConduc,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async conducturesName(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<IConductores, 'nitConduc' | 'nombreCond'>>
      >;
      if (q.query) {
        response =
          await this.despachoLocalApi.getDespachoLocalModConductoresFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IConductores, 'nitConduc' | 'nombreCond'>) => ({
            id: e.nitConduc,
            item: e.nombreCond,
          }),
        );
      }
      response = await this.despachoLocalApi.getDespachoLocalModConductores(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IConductores, 'nitConduc' | 'nombreCond'>) => ({
          id: e.nitConduc,
          item: e.nombreCond,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private validateAfterAnula(): boolean {
    if (!this.anula) {
      this.showOutput(
        true,
        'Para anular el Documento debe hacer clik en anular',
      );
      return true;
    }
    if (!this.IdLDespachoLc.motivoAnul) {
      this.showOutput(true, 'Para anular el Documento debe digitar el motivo');
      return true;
    }
    return false;
  }

  private validateAfterModific(): boolean {
    if (
      convertDate(this.IdLDespachoLc.fechaDL) <
        convertDate(this.$store.getters.getTConfinv1.fechaProc1) ||
      convertDate(this.IdLDespachoLc.fechaDL) >
        convertDate(this.$store.getters.getTConfinv1.fechaProc2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }
    if (this.IdLDespachoLc.anulado) {
      this.showOutput(true, 'Documento Anulado');
      return true;
    }
    return false;
  }

  private validateBeforeUpadate(data: IDLDespachoLc): boolean {
    if (
      convertDate(this.IdLDespachoLc.fechaDL) <
        convertDate(this.$store.getters.getTConfinv1.fechaProc1) ||
      convertDate(this.IdLDespachoLc.fechaDL) >
        convertDate(this.$store.getters.getTConfinv1.fechaProc2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }

    if (!data.idDespachoLoc) {
      this.showOutput(true, 'No tiene ningun despacho seleccionado');
      return true;
    }

    if (!data.placaVeh) {
      this.showOutput(true, 'Digite la placa del vehiculo');
      return true;
    }

    if (!data.fechaDL) {
      this.showOutput(true, 'No hay niguna fecha seleccionada ');
      return true;
    }

    return false;
  }
}
</script>
