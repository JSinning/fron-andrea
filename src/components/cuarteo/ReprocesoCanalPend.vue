<template>
  <div class="container mx-auto">
    <div class="flex-row w-full">
      <AlertBox
        :output="output.message"
        :isError="output.isError"
        @empty="output.message = ''"
      />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="flex w-full justify-between items-center">
        <h1 class="flex-1 title">Cuarteo de Canales</h1>
        <span class="flex-1 text-andrea font-bold text-2xl">{{ status }}</span>
        <div class="flex-1">
          <label class="label">Busqueda:</label>
          <PaginatedSelect
            v-model="reprocesoNo"
            :fetch="getBusClient"
            @change="afterUpdateBusClient"
          />
        </div>
      </div>
      <div class="flex justify-end py-4 gap-2">
        <button class="btn-save" @click="onModify">Modificar registro</button>
        <button class="btn-primary" @click="onSave">Guardar</button>
      </div>

      <tabs>
        <tab title="Datos">
          <div class="flex flex-row flex-wrap">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Cuarteo No:</label>
              <input
                type="number"
                class="input"
                v-model="reprocesoNo"
                readonly
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Fecha:</label>
              <input
                type="date"
                class="input"
                v-model="fechaMov"
                :disabled="!modify"
                ref="fechaMovRef"
              />
            </div>
          </div>
          <div class="card-table overflow-auto">
            <ReprocesoCanalDet1
              :reprocesoNo="reprocesoNo"
              :cuartoS="data.cuartoS"
              :readonly="!modify"
              :key="reprocesoNo"
            />
          </div>
          <div class="flex flex-wrap flex-row">
            <div class="md:w-1/4 px-3 mb-6 md:mb-0">
              <label class="label">Realizo:</label>
              <input
                type="text"
                class="input"
                v-model="data.realizo"
                :disabled="!modify"
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
                v-model="data.observacionR"
                :disabled="!modify"
              />
            </div>

            <div class="md:w-1/4 px-3 mb-6 md:mb-0"></div>
            <div class="md:w-1/5 px-3 mb-6 md:mb-0"></div>

            <div class="md:w-1/5 px-3 mb-6 md:mb-0">
              <button class="btn-save" @click="print">
                Imprimir Documento
              </button>
            </div>
          </div>
        </tab>
        <tab title="Detalles">
          <div class="card-table">
            <ReprocesoCanalDet3
              :reprocesoNo="reprocesoNo"
              :readonly="!modify"
              :key="reprocesoNo"
            />
          </div>
        </tab>
        <tab title="Relacion Canal">
          <div class="grid gap-4 grid-cols-4 text-right">
            <label class="label">Es propio:</label>
            <input class="col-span-3" type="checkbox" v-model="esPropio" />
            <label class="label">Tercero:</label>
            <PaginatedSelect
              class="col-span-3"
              v-model="data.nitoCC"
              :fetch="getNitoCC"
            />
            <label class="label">PH:</label>
            <input class="col-span-3 input" type="text" v-model="data.ph" />
            <label class="label">TEMPERATURA:</label>
            <input
              class="col-span-3 input"
              type="number"
              v-model="data.tempera"
            />
            <label class="label">Tipo:</label>
            <select class="select col-span-3" v-model.number="data.tipoR">
              <option value="1">DELANTEROS</option>
              <option value="2">TRASEROS</option>
              <option value="3">AMBOS</option>
            </select>
            <label class="label">Cuarto Frio al que Entra:</label>
            <PaginatedSelect
              class="col-span-3"
              v-model="data.cuartoS"
              :fetch="getCuartoS"
              :disabled="data.tipoR === 1 || data.tipoR === 2"
            />
            <span></span>
            <button
              class="btn-save"
              :disabled="reprocesoNo === 0"
              @click="showModalGenerarRelacion = true"
            >
              Generar relacion
            </button>
          </div>
        </tab>
      </tabs>
      <ports />
    </div>
    <ModalPDFPreview :pdfData="pdf" @close="pdf = ''" v-if="pdf.length > 0" />
    <BModal
      v-if="showModalGenerarRelacion"
      prompt="Esta Seguro de Generar esta Informacion? Al finalizar se cerrara esta pantalla"
      @on-yes="generarRelacion"
      @on-no="showModalGenerarRelacion = false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
import IPagination from '@/types/IPagination';
import InterfaceSelect from '@/models/interfaces/interfaceSelect';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import moment from 'moment';
import { ITblReproCanal } from '@/remote/api/cuarteo/types';
import { captureException } from '@sentry/browser';
import Tab from '@/components/reusable/Tab.vue';
import Tabs from '@/components/reusable/Tabs.vue';
import Ports from '@/components/reusable/Ports.vue';
import ReprocesoCanalDet1 from './ReprocesoCanalDet1.vue';
import ReprocesoCanalDet3 from './ReprocesoCanalDet3.vue';
import BModal from '@/components/reusable/BModal.vue';
import ReportesCuarteosApi from '@/remote/api/cuarteo/reportesCuarteos';

@Component({
  components: {
    AlertBox,
    BModal,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
    Ports,
    ReprocesoCanalDet1,
    ReprocesoCanalDet3,
    Tab,
    Tabs,
  },
  name: 'ReprocesoCanalPend',
})
export default class ReprocesoCanalPend extends Vue {
  @Ref('fechaMovRef') public readonly fechaMovRef: HTMLInputElement;

  public isLoading: boolean = false;

  public search: boolean = false;

  public reprocesoNo = 0;

  public fechaMov = '';

  public pdf = '';

  public data: Partial<ITblReproCanal> = {
    anulada: false,
    cuartoS: 0,
    fechaMov: this.fechaMov,
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

  public esPropio = false;

  public modify = false;

  public output = {
    isError: false,
    message: '',
  };

  public showModalGenerarRelacion = false;

  public api = new CuarteoApi(this.$store.getters.getAuthToken);
  private cuarteoReportsApi = new ReportesCuarteosApi(
    this.$store.getters.getAuthToken,
  );

  get status() {
    return this.data.anulada
      ? 'ANULADO'
      : !this.data.procesado
      ? 'PENDIENTE'
      : 'CONFIRMADO';
  }

  public async getBusClient(p?: IPagination): Promise<InterfaceSelect[]> {
    try {
      const res = await this.api.reprocesoCanalPend.busClient(p);
      return res.data.map((d) => ({
        id: d.reprocesoNo,
        item: `${d.reprocesoNo}, ${moment(d.fechaMov)
          .utc()
          .locale('es')
          .format('DD-MMM-YYYY')}`,
      }));
    } catch (err) {
      captureException(err);
      this.output = {
        isError: true,
        message: err.message,
      };
    }
  }

  public async getNitoCC(p?: IPagination): Promise<InterfaceSelect[]> {
    try {
      const res = await this.api.reprocesoCanalPend.getNitoCC(p);
      return res.data.map((d) => ({
        id: d.nitCliente,
        item: d.expr2,
      }));
    } catch (err) {
      captureException(err);
      this.output = {
        isError: true,
        message: err.message,
      };
    }
  }

  public async getCuartoS(): Promise<InterfaceSelect[]> {
    try {
      const res = await this.api.reprocesoCanalPend.getCuartoS();
      return res.data.map((d) => ({
        id: d.idCuartoF,
        item: d.descripcionCf,
      }));
    } catch (err) {
      captureException(err);
      this.output = {
        isError: true,
        message: err.message,
      };
    }
  }

  public async afterUpdateBusClient() {
    try {
      this.isLoading = true;
      const response = await this.api.reprocesoCanalPend.afterUpdateBusClient(
        this.reprocesoNo,
      );
      this.fechaMov = moment(response.data.fechaMov)
        .utc()
        .locale('es')
        .format('YYYY-MM-DD');
      this.data = response.data;
    } catch (err) {
      captureException(err);
      this.output = {
        isError: true,
        message: err.message,
      };
    } finally {
      this.isLoading = false;
      this.modify = false;
    }
  }

  public async generarRelacion() {
    try {
      this.showModalGenerarRelacion = false;
      this.isLoading = true;
      const response = await this.api.reprocesoCanalPend.onGenerarRelacion(
        this.reprocesoNo,
        {
          ...this.data,
          esPropio: this.esPropio,
          fechaMov: this.fechaMov,
        },
      );
      if (response.statusCode === 200) {
        this.output = {
          isError: false,
          message: response.message,
        };
      }
    } catch (err) {
      captureException(err);
      this.output = {
        isError: true,
        message: err.message,
      };
    } finally {
      this.isLoading = false;
    }
  }

  public async print() {
    if (!this.fechaMov) {
      this.output = {
        isError: true,
        message: 'Debe digitar la fecha',
      };
      this.fechaMovRef.focus();
      return;
    }
    try {
      this.isLoading = true;
      this.data.imprim = 'S';
      let response = await this.api.reprocesoCanal.put({
        fechaMov: this.fechaMov,
        imprim: 'S',
        reprocesoNo: this.reprocesoNo,
      });
      if (response.statusCode === 200) {
        this.output = {
          isError: false,
          message: response.message,
        };
      }
      response = await this.cuarteoReportsApi.rptReprocesopdf(this.reprocesoNo);
      this.pdf = response.data;
    } catch (err) {
      captureException(err);
      this.output = {
        isError: true,
        message: err.message,
      };
    } finally {
      this.isLoading = false;
    }
  }

  public onModify() {
    if (!this.reprocesoNo) {
      this.output = {
        isError: true,
        message: 'Debes seleccionar un reproceso',
      };
      return;
    }
    this.modify = true;
    this.fechaMovRef.focus();
  }

  public async onSave() {
    if (!this.fechaMov) {
      this.output = {
        isError: true,
        message: 'Debe digitar la fecha',
      };
      this.fechaMovRef.focus();
      return;
    }
    if (
      moment(this.fechaMov).get('milliseconds') <
        moment(this.$store.getters.getTConfinv1.fecha1).get('milliseconds') ||
      moment(this.fechaMov).get('milliseconds') >
        moment(this.$store.getters.getTConfinv1.fecha2).get('milliseconds')
    ) {
      this.output = {
        isError: true,
        message: 'La fecha esta fuera del limite permitido',
      };
      return;
    }
    try {
      this.isLoading = true;
      let response = await this.api.reprocesoCanal.put({
        ...this.data,
        fechaMov: this.fechaMov,
        fechaR: new Date().toISOString(),
        reprocesoNo: this.reprocesoNo,
      });
      if (response.statusCode === 200) {
        this.output = {
          isError: false,
          message: response.message,
        };
      }
    } catch (err) {
      captureException(err);
      this.output = {
        isError: true,
        message: err.message,
      };
    } finally {
      this.isLoading = false;
      this.modify = false;
    }
  }
}
</script>
