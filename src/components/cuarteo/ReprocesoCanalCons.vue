<template>
  <div class="container mx-auto">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
      <ModalPDFPreview
        :pdfData="rptReprocesoPdfBase64"
        @close="() => (rptReprocesoPdfBase64 = '')"
        v-if="rptReprocesoPdfBase64.length > 0"
      />
      <ModalPDFPreview
        :pdfData="rptDespacNacPdfBase64"
        @close="() => (rptDespacNacPdfBase64 = '')"
        v-if="rptDespacNacPdfBase64.length > 0"
      />
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
                :fetch="getBusClient"
                @change="getData"
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
          <button class="btn-primary" @click="onPrint">Reimprimir</button>
        </div>
      </div>

      <input type="radio" name="tab" id="datos" class="hidden" checked />
      <input type="radio" name="tab" id="detalles" class="hidden" />
      <input type="radio" name="tab" id="confirmar" class="hidden" />
      <input type="radio" name="tab" id="anular" class="hidden" />

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
        <label for="confirmar" v-show="false">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Confirmar
          </span>
        </label>
        <label for="anular" v-show="false">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            anular
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-cuarteo">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Cuarteo No:</label>
            <input type="number" class="input" v-model="reprocesoNo" disabled />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha:</label>
            <input type="date" class="input" v-model="data.fechaMov" disabled />
          </div>
        </div>
        <div class="card-table">
          <ReprocesoCanalDet1C
            :lazy="reprocesoNo === 0"
            :reprocesoNo="reprocesoNo"
            :key="reprocesoNo"
          />
        </div>
        <div class="flex flex-wrap flex-row">
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Realizo:</label>
            <input type="text" class="input" v-model="data.realizo" disabled />
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
              v-model="data.observacionR"
              disabled
            />
          </div>

          <div class="md:w-1/4 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/5 px-3 mb-6 md:mb-0"></div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-detalles-cuarteo">
        <div class="card-table">
          <ReprocesoCanalDet3
            :reprocesoNo="reprocesoNo"
            :key="reprocesoNo"
            :readonly="true"
          />
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-confirmar-cuarteo">
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap justify-center">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Confirmar:</label>
              <input
                class="checkBox"
                type="checkbox"
                v-model="data.procesado"
                disabled
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Observacion:</label>
              <input
                type="text"
                class="input"
                v-model="data.motivProce"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-anular-cuarteo">
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap justify-center">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Anular:</label>
              <input
                class="checkBox"
                type="checkbox"
                v-model="data.anulada"
                disabled
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Motivo:</label>
              <input
                type="text"
                class="input"
                v-model="data.motivoAnul"
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import '../../assets/tab.css';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import * as Sentry from '@sentry/browser';
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import moment from 'moment';
import { ITblReproCanal } from '@/remote/api/cuarteo/types';
import ReprocesoCanalDet1C from './ReprocesoCanalDet1C.vue';
import ReprocesoCanalDet3 from './ReprocesoCanalDet3.vue';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import ReportesCuarteosApi from '@/remote/api/cuarteo/reportesCuarteos';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
    ReprocesoCanalDet1C,
    ReprocesoCanalDet3,
  },
  name: 'ReprocesoCanalCons',
})
export default class ReprocesoCanalCons extends Vue {
  public reprocesoNo = 0;

  public rptReprocesoPdfBase64 = '';
  public rptDespacNacPdfBase64 = '';

  public data: Partial<ITblReproCanal> = {
    anulada: false,
    cuartoS: 0,
    fechaMov: '',
    fechaR: '',
    generado: false,
    imprim: '',
    motivProce: '',
    motivoAnul: '',
    nitoCC: '',
    observacionR: '',
    ph: '',
    procesado: false,
    realizo: '',
    reprocesoNo: this.reprocesoNo,
    tempera: 0,
    tipoR: 0,
    usuario: '',
  };

  public output: string = '';
  public isLoading: boolean = false;
  public isError: boolean = false;

  public search: boolean = false;

  public api = new CuarteoApi(this.$store.getters.getAuthToken);
  private cuarteoReportsApi = new ReportesCuarteosApi(
    this.$store.getters.getAuthToken,
  );
  public showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  public clearOutput() {
    this.output = '';
  }

  public get status() {
    return this.data.anulada
      ? 'ANULADO'
      : !this.data.procesado
      ? 'PENDIENTE'
      : 'CONFIRMADO';
  }

  public async getBusClient(
    p?: IPagination,
    q?: IQuery,
  ): Promise<IInterfaceSelect[]> {
    try {
      let res: BaseResponse<
        Array<Pick<ITblReproCanal, 'reprocesoNo' | 'fechaMov'>>
      >;
      if (q.query) {
        res = await this.api.reprocesoCanalCons.getBusClientFind(q);
        return res.data.map((d) => ({
          id: d.reprocesoNo,
          item: `${d.reprocesoNo} - ${moment(d.fechaMov)
            .utc()
            .locale('es')
            .format('DD-MMM-YYYY')}`,
        }));
      }
      res = await this.api.reprocesoCanalCons.getBusClient(p);
      return res.data.map((d) => ({
        id: d.reprocesoNo,
        item: `${d.reprocesoNo} - ${moment(d.fechaMov)
          .utc()
          .locale('es')
          .format('DD-MMM-YYYY')}`,
      }));
    } catch (err) {
      Sentry.captureException(err);
      this.showOutput(true, err.message);
    }
  }

  public async getData() {
    try {
      const res = await this.api.reprocesoCanalCons.afterUpdateBusClient(
        this.reprocesoNo,
      );
      res.data.fechaMov = moment(res.data.fechaMov)
        .utc()
        .locale('es')
        .format('YYYY-MM-DD');
      this.data = res.data;
    } catch (err) {
      Sentry.captureException(err);
      this.showOutput(true, err.message);
    }
  }

  public async onPrint() {
    if (this.data.imprim === 'N') {
      this.showOutput(false, 'Utilize la opción imprimir');
      return;
    }
    this.isLoading = true;
    try {
      const [rptReproceso, rptDespacNac] = await Promise.all([
        this.cuarteoReportsApi
          .rptReprocesopdf(this.reprocesoNo)
          .catch((e) => this.showOutput(true, e.message)),
        this.cuarteoReportsApi
          .rptDespacNacpdf(this.reprocesoNo)
          .catch((e) => this.showOutput(true, e.message)),
      ]);

      if (rptReproceso) {
        this.rptReprocesoPdfBase64 = String(rptReproceso.data);
      }

      if (rptDespacNac) {
        this.rptDespacNacPdfBase64 = String(rptDespacNac.data);
      }
    } catch (err) {
      Sentry.captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
