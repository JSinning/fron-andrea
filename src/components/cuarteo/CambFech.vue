<template>
  <div class="main-div">
    <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    <div class="flex-col min-w-full">
      <h1 class="title">Fecha de proceso</h1>
      <div class="flex flex-wrap mx-auto justify-center p-2">
        <div class="card mt-2">
          <div class="flex flex-wrap justify-center p-1 w-3/2">
            <label class="label">Nueva fecha de proceso:</label>
            <input type="date" v-model="IcamFech.fechaProceso" class="input" />
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
import { ICambFech } from '@/remote/api/cuarteo/types/cambFech';
import { captureException } from '@sentry/browser';
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
import convertDate from '@/utils/convertDate';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';

@Component({
  components: {
    AlertBox,
    Loader,
  },
  name: 'CambFech',
})
export default class CambFech extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;

  private IcamFech: ICambFech = {
    estacion: '',
    fechaProceso: '',
    idAuto: 0,
    idEmpresa: 0,
    idioma: false,
  };

  private cuarteoApi = new CuarteoApi(this.$store.getters.getAuthToken);

  private showOutput(isError: boolean, message: string) {
    this.output = message;
    this.isError = isError;
  }

  private async mounted() {
    await this.listChangeDate();
  }

  private clearOutput() {
    this.output = '';
  }

  private async listChangeDate() {
    try {
      const response = await this.cuarteoApi.getCamFech();
      response.data.map(async (e: ICambFech) => {
        if (e.estacion === this.$store.getters.getUsuario) {
          await this.changeDateIdAuto(e.idAuto);
        }
      });
    } catch (e) {
      captureException(e);
      this.showOutput(true, 'Error al obtener fecha de proceso.');
    }
  }

  private async changeDateIdAuto(idAuto: number) {
    try {
      const response = await this.cuarteoApi.getCamFechIdAuto(idAuto);
      this.IcamFech = response.data;
      this.IcamFech.fechaProceso = convertDate(this.IcamFech.fechaProceso);
    } catch (e) {
      captureException(e);
      this.showOutput(true, 'Error al obtener fecha de proceso.');
    }
  }

  private async procesar() {
    try {
      const response = await this.cuarteoApi.putCamFech(this.IcamFech);
      if (response.statusCode === 200) {
        this.showOutput(false, 'Guardado corectamente');
        this.$store.dispatch(
          'addFechaProceso',
          convertDate(this.IcamFech.fechaProceso),
        );
      }
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }
}
</script>
