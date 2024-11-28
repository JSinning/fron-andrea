<template>
  <div>
    <div v-if="moduleFac">
      <!-- output -->
      <div class="flex-row w-full">
        <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
      </div>
      <div class="flex flex-col">
        <Loader v-show="isLoading" />
      </div>
      <div class="main-div mb-2">
        <div class="flex flex-row flex-wrap mb-2">
          <div class="px-3 md:w-2/3 mt-2 mb-0 md:mb-0">
            <h1 class="title">Digite rango de fechas a procesar</h1>
          </div>

          <div class="md:w-1/5 mb-2 md:mb-0 mt-2 mr-2 text-right">
            <button class="btn-save" @click="process">Procesar</button>
          </div>
        </div>

        <div class="md:w-1/8 px-3 py-3 mb-1 md:mb-0">
          <input
            type="date"
            class="input"
            placeholder="FechaG1"
            v-model="fechaG1"
          />
        </div>
        <div class="md:w-1/8 px-3 py-3 mb-1 md:mb-0">
          <input
            type="date"
            class="input"
            placeholder="FechaG2"
            v-model="fechaG2"
            @change="validateAfterFechaG2"
          />
        </div>
      </div>
    </div>
    <div v-if="moduleFacBursage">
      <FacBursag></FacBursag>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import FacBursag from '@/components/guia_sacrificio/FacBursag.vue';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    FacBursag,
    Loader,
  },
  name: 'FacBursagParam',
})
export default class FacBursagParam extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private moduleFacBursage: boolean = false;
  private moduleFac: boolean = true;
  private fechaG1: string = '';
  private fechaG2: string = '';

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.openFrom();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async process() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postFechaParam({
        fechaG1: this.fechaG1,
        fechaG2: this.fechaG2,
      });
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
        this.moduleFacBursage = true;
        this.moduleFac = false;
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async validateAfterFechaG2() {
    this.isLoading = true;
    try {
      await this.guiaSacrificioApi.postAfterFechaG2({
        fechaG1: this.fechaG1,
        fechaG2: this.fechaG2,
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      this.clearData();
    } finally {
      this.isLoading = false;
    }
  }

  private async openFrom() {
    this.isLoading = true;
    try {
      await this.guiaSacrificioApi.postOpenFrom();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private clearData() {
    this.fechaG1 = '';
    this.fechaG2 = '';
  }
}
</script>
