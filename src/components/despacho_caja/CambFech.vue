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
  <div>
    <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    <div class="main-div">
      <div class="flex-col">
        <h1 class="title">Fecha de Proceso</h1>
        <div class="card">
          <div class="flex flex-row flex-wrap">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Nueva Fecha Proceso:</label>
              <input
                type="date"
                v-model="IcamFech.fechaProceso"
                class="input"
              />
            </div>
            <div class="md:w-1/2 px-3 mt-2 mb-6 md:mb-0">
              <button class="btn-save" @click="procesar">Procesar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import { ICambFech } from '@/types';
import { captureException } from '@sentry/browser';
import convertDate from '@/utils/convertDate';

@Component({
  components: {
    AlertBox,
  },
  name: 'CambFech',
})
export default class CambFech extends Vue {
  private output: string = '';
  private isError: boolean = false;

  private IcamFech: ICambFech = {
    estacion: '',
    fechaProceso: '',
    idAuto: 0,
    idEmpresa: 0,
    idioma: false,
  };

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.listChangeDate();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async listChangeDate() {
    try {
      const response = await this.despachoCajaApi.getCambFech();
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
      const response = await this.despachoCajaApi.getCamFechIdAuto(idAuto);
      this.IcamFech = response.data;
      this.IcamFech.fechaProceso = convertDate(this.IcamFech.fechaProceso);
    } catch (e) {
      captureException(e);
      this.showOutput(true, 'Error al obtener fecha de proceso.');
    }
  }

  private async procesar() {
    try {
      const response = await this.despachoCajaApi.putCamFech(this.IcamFech);
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
