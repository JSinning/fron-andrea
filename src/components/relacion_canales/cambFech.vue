<template>
  <div class="main-div">
    <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    <div class="flex-col min-w-full">
      <h1 class="title">Fecha de proceso</h1>
      <div class="flex flex-wrap mx-auto justify-center p-2">
        <div class="card mt-2">
          <div class="flex flex-wrap justify-center p-1 w-3/2">
            <label class="label">Nueva fecha de proceso:</label>
            <input type="date" v-model="Icambfech.fechaProceso" class="input" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col flex-wrap mx-auto text-sm md:text-base text-white"
    >
      <button class="flex-row">
        <button @click="procesar" class="btn-save">Procesar</button>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Loader from '@/components/reusable/Loader.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import { ICambFech } from '@/remote/api/relacion_canales/types/cambFech';
import RelaCanalApi from '@/remote/api/relacion_canales/RelacionCanalApi';
import * as Sentry from '@sentry/browser';
import convertDate from '@/utils/convertDate';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'cambFech',
})
export default class CambFech extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private Icambfech: ICambFech = {
    estacion: '',
    fechaProceso: '',
    idAuto: 0,
    idEmpresa: 0,
    idioma: false,
  };

  private api = new RelaCanalApi(this.$store.getters.getAuthToken);

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }
  private async mounted() {
    await this.listCambFecn();
  }

  private clearOutput() {
    this.output = '';
  }

  private async listCambFecn() {
    try {
      const response = await this.api.getCambFech();
      this.Icambfech = response.data;
      this.Icambfech.fechaProceso = convertDate(this.Icambfech.fechaProceso);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener fecha de proceso.');
    }
  }

  private async procesar() {
    try {
      const response = await this.api.putCamFech(this.Icambfech);
      if (response.statusCode === 200) {
        this.showOutput(false, 'Guardado corectamente');
        this.$store.dispatch(
          'addFechaProceso',
          convertDate(this.Icambfech.fechaProceso),
        );
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }
}
</script>
