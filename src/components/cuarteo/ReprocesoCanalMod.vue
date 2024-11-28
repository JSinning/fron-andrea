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
          <h1 class="title">Cuarteo de Canales</h1>
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
                v-model="reprocesoNo"
                :fetch="buscarCliente"
                @change="reprocesoCanal(reprocesoNo)"
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
          <button class="btn-save" @click="modifcar">Modificar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="save">Guardar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="rePrint">Reimprimir</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="confirmarCuarteo">
            Confirmar Cuarteo
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="anularRegistro">
            Anular Registro
          </button>
        </div>
      </div>

      <input type="radio" name="tab" id="datos" class="hidden" checked />
      <input type="radio" name="tab" id="detalles" class="hidden" />
      <input
        type="radio"
        name="tab"
        id="confirmar"
        class="hidden"
        v-if="confirmarView"
      />
      <input
        type="radio"
        name="tab"
        id="anualar"
        class="hidden"
        v-if="anualdoView"
      />

      <div class="mt-2 mb-0 nav">
        <label for="datos">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos
          </span>
        </label>

        <label for="detalles">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Detalles
          </span>
        </label>
        <label for="confirmar">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="confirmarView"
          >
            Confirmar
          </span>
        </label>
        <label for="anualar">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="anualdoView"
          >
            Anular
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-cuarteo">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Cuarteo No:</label>
            <input
              type="number"
              class="input"
              v-model="IreprocesoCanal.reprocesoNo"
              disabled
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha:</label>
            <input
              type="date"
              class="input"
              v-model="IreprocesoCanal.fechaMov"
              :disabled="readonly"
            />
          </div>
        </div>
        <div class="card-table">
          <ReprocesoCanalDet1
            :reproceso-no="reprocesoNo"
            :key="reprocesoNo"
            :cuarto-s="IreprocesoCanal.cuartoS"
            :readonly="readonly"
          />
        </div>
        <div class="flex flex-wrap flex-row">
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Realizo:</label>
            <input
              type="text"
              class="input"
              v-model="IreprocesoCanal.realizo"
              :disabled="readonly"
            />
          </div>

          <div class="md:w-1/12 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/12 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/12 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/12 px-3 mb-6 md:mb-0"></div>

          <div class="md:w-1/5 px-3 mb-6 md:mb-0">
            <input type="text" class="input" disabled />
          </div>

          <div class="md:w-1/5 px-3 mb-6 md:mb-0">
            <input type="text" class="input" disabled />
          </div>

          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Observacion:</label>
            <input
              type="text"
              class="input"
              v-model="IreprocesoCanal.observacionR"
              :disabled="readonly"
            />
          </div>

          <div class="md:w-1/4 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/5 px-3 mb-6 md:mb-0"></div>

          <div class="md:w-1/5 px-3 mb-6 md:mb-0">
            <button class="btn-save" @click="onPrint">
              Imprimir documento
            </button>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-detalles-cuarteo">
        <div class="card-table">
          <ReprocesoCanalDet3
            :reproceso-no="reprocesoNo"
            :key="reprocesoNo"
            :readonly="readonly"
          />
        </div>
      </div>

      <div
        class="card mt-0 pt-3 px-10 hidden tab-confirmar-cuarteo"
        v-if="confirmarView"
      >
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap justify-center">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Confirmar:</label>
              <input class="checkBox" type="checkbox" v-model="confirma" />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Observacion:</label>
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanal.motivProce"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <button class="btn-save" @click="viewModalConfirmar = true">
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-anular-cuarteo">
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap justify-center">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Anular:</label>
              <input class="checkBox" type="checkbox" v-model="anula" />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Motivo:</label>
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanal.motivoAnul"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <button class="btn-save" @click="viewModalAnular = true">
                Anular
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <!-- Modal confirmar -->
      <Modals
        :open-modal="viewModalConfirmar"
        @Ok="aceptarConfirmacion"
        @close="viewModalConfirmar = false"
      >
        Va Confirmar este Documento este proceso es irreversible
      </Modals>
      <!-- end Modal confirmar -->
      <!-- Modal Anualar -->
      <Modals
        :open-modal="viewModalAnular"
        @Ok="aceptarAnulacion"
        @close="viewModalAnular = false"
      >
        Va Anular este Documento este proceso es irreversible
      </Modals>
      <!-- end Modal Anualar -->

      <ModalPDFPreview
        :pdfData="rptReprocesoPdfBase64"
        @close="() => (rptReprocesoPdfBase64 = '')"
        v-if="rptReprocesoPdfBase64.length > 0"
      />
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import { Component, Vue } from 'vue-property-decorator';
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { IReprocesoCanal, ITblReproCanal } from '@/remote/api/cuarteo/types';
import IPagination from '@/types/IPagination';
import convertDate from '@/utils/convertDate';
import * as Sentry from '@sentry/browser';
import ReprocesoCanalDet3 from '@/components/cuarteo/ReprocesoCanalDet3.vue';
import ReprocesoCanalDet1 from '@/components/cuarteo/ReprocesoCanalDet1.vue';
import Modals from '@/components/reusable/Modals.vue';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import moment from 'moment';
import ReportesCuarteosApi from '@/remote/api/cuarteo/reportesCuarteos';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    Modals,
    PaginatedSelect,
    ReprocesoCanalDet1,
    ReprocesoCanalDet3,
  },
  name: 'ReprocesoCanalMod',
})
export default class ReprocesoCanalMod extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private readonly: boolean = true;
  private search: boolean = false;
  private reprocesoNo: number = 0;
  private confirma: boolean = false;
  private anula: boolean = false;
  private viewModalConfirmar: boolean = false;
  private viewModalAnular: boolean = false;

  private confirmarView: boolean = false;
  private anualdoView: boolean = false;
  private rptReprocesoPdfBase64 = '';

  private IreprocesoCanal: IReprocesoCanal = {
    anulada: false,
    cuartoS: 0,
    fechaMov: '',
    fechaR: '',
    generado: false,
    imprim: 'N',
    motivProce: '',
    motivoAnul: '',
    nitoCC: '',
    observacionR: '',
    ph: '',
    procesado: false,
    realizo: '',
    reprocesoNo: 0,
    tempera: 0,
    tipoR: 0,
    usuario: '',
  };

  private cuarteoApi = new CuarteoApi(this.$store.getters.getAuthToken);
  private cuarteoReportsApi = new ReportesCuarteosApi(
    this.$store.getters.getAuthToken,
  );
  private async mounted() {
    await this.buscarCliente();
  }

  private get status() {
    return this.IreprocesoCanal.anulada
      ? 'ANULADO'
      : !this.IreprocesoCanal.procesado
      ? 'PENDIENTE'
      : 'CONFIRMADO';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private clearOutput() {
    this.output = '';
  }

  private async aceptarConfirmacion() {
    if (!this.confirma) {
      this.showOutput(
        true,
        'Para Confirmar el Documento debe hacer clik en Confirmar',
      );
      return;
    }
    await this.confirmar(this.reprocesoNo);
  }

  private async aceptarAnulacion() {
    if (!this.anula) {
      this.showOutput(
        true,
        'Para anular el Registro debe hacer clik en anular',
      );
      return;
    }
    await this.anular(this.reprocesoNo);
  }

  private async save() {
    if (!this.validateBeforeUpdatae()) {
      return;
    }
    this.IreprocesoCanal.fechaR = moment().utc().format('YYYY-MM-DD');
    await this.updateReprocesoCanal();
    this.readonly = true;
  }

  private async updateReprocesoCanal() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.putReprocesoCanal(
        this.reprocesoNo,
        this.IreprocesoCanal,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async buscarCliente(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<Pick<ITblReproCanal, 'reprocesoNo' | 'fechaMov'>>
    >;
    if (q.query) {
      response = await this.cuarteoApi.getReprocesoCanalBusClientFind(q);
      return response.data.map<IInterfaceSelect>((e: IReprocesoCanal) => ({
        id: e.reprocesoNo,
        item: `${e.reprocesoNo} | ${convertDate(e.fechaMov)}`,
      }));
    }
    response = await this.cuarteoApi.getReprocesoCanalBusClient(p);
    return response.data.map<IInterfaceSelect>((e: IReprocesoCanal) => ({
      id: e.reprocesoNo,
      item: `${e.reprocesoNo} | ${convertDate(e.fechaMov)}`,
    }));
  }

  private async reprocesoCanal(reprocesoNo: number) {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.getReprocesoCanalMod(reprocesoNo);

      this.IreprocesoCanal = response.data as IReprocesoCanal;
      this.IreprocesoCanal.fechaMov = convertDate(
        this.IreprocesoCanal.fechaMov,
      );
      this.readonly = true;
      this.confirmarView = false;
      this.anualdoView = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async confirmar(reprocesoNo: number) {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.putReprocesoCanalModConfimar(
        reprocesoNo,
        this.IreprocesoCanal,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
        this.IreprocesoCanal = response.data as IReprocesoCanal;
      }
      this.viewModalConfirmar = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async anular(reprocesoNo: number) {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.putReprocesoCanalModAnualar(
        reprocesoNo,
        this.IreprocesoCanal,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
        this.IreprocesoCanal = response.data as IReprocesoCanal;
      }
      this.viewModalAnular = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
  private async rePrint() {
    if (this.IreprocesoCanal.imprim === 'N') {
      this.showOutput(true, 'Utilize la opción imprimir');
      return;
    }

    this.isLoading = true;
    try {
      const rptReproceso = await this.cuarteoReportsApi.rptReprocesopdf(
        this.reprocesoNo,
      );
      this.rptReprocesoPdfBase64 = rptReproceso.data;
    } catch (err) {
      Sentry.captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async onPrint() {
    if (!this.IreprocesoCanal.fechaMov) {
      this.showOutput(true, 'Debe Digitar la Fecha');
      return;
    }
    this.IreprocesoCanal.imprim = 'S';
    await this.updateReprocesoCanal();
    this.isLoading = true;
    try {
      const rptReproceso = await this.cuarteoReportsApi.rptReprocesopdf(
        this.reprocesoNo,
      );
      this.rptReprocesoPdfBase64 = rptReproceso.data;
    } catch (err) {
      Sentry.captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private confirmarCuarteo() {
    if (
      convertDate(this.IreprocesoCanal.fechaMov) <
        convertDate(this.$store.getters.getTConfinv1.fecha1) ||
      convertDate(this.IreprocesoCanal.fechaMov) >
        convertDate(this.$store.getters.getTConfinv1.fecha2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }

    if (this.IreprocesoCanal.anulada) {
      this.showOutput(true, 'Documento Anulado');
      return;
    }
    if (!this.IreprocesoCanal.procesado) {
      this.confirmarView = true;
      this.confirma = false;
    }
  }
  private anularRegistro() {
    if (
      convertDate(this.IreprocesoCanal.fechaMov) <
        convertDate(this.$store.getters.getTConfinv1.fecha1) ||
      convertDate(this.IreprocesoCanal.fechaMov) >
        convertDate(this.$store.getters.getTConfinv1.fecha2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }

    if (!this.IreprocesoCanal.anulada) {
      this.anualdoView = true;
      this.anula = false;
    }
  }

  private modifcar() {
    if (this.IreprocesoCanal.anulada) {
      this.showOutput(
        true,
        'Este Documento se Encuentra Anulado. No se Puede Modificar',
      );
      return;
    }

    if (this.IreprocesoCanal.procesado) {
      this.showOutput(
        true,
        'Este Documento se Encuentra Confirmado. No se Puede Modificar',
      );
      return;
    }

    if (
      convertDate(this.IreprocesoCanal.fechaMov) <
        convertDate(this.$store.getters.getTConfinv1.fecha1) ||
      convertDate(this.IreprocesoCanal.fechaMov) >
        convertDate(this.$store.getters.getTConfinv1.fecha2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }

    this.readonly = false;
  }

  private validateBeforeUpdatae(): boolean {
    if (
      convertDate(this.IreprocesoCanal.fechaMov) <
        convertDate(this.$store.getters.getTConfinv1.fecha1) ||
      convertDate(this.IreprocesoCanal.fechaMov) >
        convertDate(this.$store.getters.getTConfinv1.fecha2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }

    if (!this.IreprocesoCanal.fechaMov) {
      this.showOutput(true, 'Digite la Fecha');
      return true;
    }

    return false;
  }
}
</script>
