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
  <div class="flex flex-col">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="w-full h-full">
      <component
        v-bind:is="componentName"
        :pdfData="pdfData"
        v-bind:message="message"
      ></component>
    </div>

    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <div class="main-div">
      <div class="flex-col">
        <h1 class="title">DECOMISOS</h1>
        <div class="flex flex-row flex-wrap justify-center">
          <button class="btn-save" @click="detalles()">Detallado</button>
          <button class="btn-save" @click="consolidado()">Consolidado</button>
        </div>
        <div class="flex flex-row flex-wrap justify-center m-5">
          <div class="m-3">
            <h1 class="title pt-4">Tipo:</h1>
          </div>
          <div class="m-3 pt-3">
            <select class="select text-sm" v-model="TUsuario">
              <option value="1">Sacrificios Locales</option>

              <option value="2">Sacrificios Nacional</option>

              <option value="3">Sacrificios Propiol</option>
            </select>
          </div>
        </div>
        <div class="flex flex-row flex-wrap justify-center">
          <h1 class="title">Fecha Decomiso</h1>
        </div>
        <div class="flex flex-row flex-wrap justify-center m-5">
          <div class="flex flex-row flex-wrap justify-center">
            <h1 class="title">Desde:</h1>
            <div class="mb-6 md:mb-0">
              <input
                type="date"
                class="input"
                v-model="Fecha1"
                ref="fechFocus"
              />
            </div>
          </div>
        </div>
      </div>
      <ModalPDFPreview
        :pdfData="pdfData"
        @close="closeModalPDF"
        v-if="showModalPDF"
      />
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import MovReportesApi from '@/remote/api/MovViseras/ReportesVisceras';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import Loader from '@/components/reusable/Loader.vue';

import * as Sentry from '@sentry/browser';

import PDFPreview from '@/components/reusable/PdfPreview.vue';

import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PDFPreview,
  },
  name: 'DesmisoAviso',
})
export default class DecomisosViscerasComponet extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private TUsuario: number = 0;
  private Fecha1: string = '';

  private componentName: string = '';
  private isLoading: boolean = false;
  private showModalPDF: boolean = false;

  private pdfData: string = '';
  private message: string = '';

  private DecomisoApi = new MovViserasApi(this.$store.getters.getAuthToken);
  private MovReportesApi = new MovReportesApi(this.$store.getters.getAuthToken);

  public closeModalPDF() {
    this.showModalPDF = false;
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async mounted() {
    await this.openForm();
    await this.decomisoList();
  }

  private async decomisoList() {
    this.isLoading = true;
    try {
      const response = await this.DecomisoApi.getDecmisoInfo(
        this.$store.getters.getUsuario,
      );

      if (response.statusCode !== 200) {
        this.showOutput(true, response.message);
        return;
      }
      this.TUsuario = response.data.tUsuario;
      this.Fecha1 =
        response.data.fecha1 === null
          ? ''
          : moment(response.data.fecha1).utc().format('YYYY-MM-DD');
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async detalles() {
    this.isLoading = true;
    const fechaFocus = this.$refs.fechFocus as HTMLImageElement;
    if (this.Fecha1 === null || this.Fecha1 === '') {
      this.showOutput(false, 'Debe esojer una Fecha');
      this.isLoading = false;
      fechaFocus.focus();
      return;
    }
    try {
      const pdf = await this.MovReportesApi.getDecoVisc2PDF();
      this.pdfData = pdf.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async consolidado() {
    this.isLoading = true;
    const fechaFocus = this.$refs.fechFocus as HTMLImageElement;
    if (this.Fecha1 === null || this.Fecha1 === '') {
      this.showOutput(false, 'Debe esojer una Fecha');
      this.isLoading = false;
      fechaFocus.focus();
      return;
    }
    try {
      const pdf = await this.MovReportesApi.getDecoViscPDF();
      this.pdfData = pdf.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async openForm() {
    this.isLoading = true;
    try {
      const response = await this.DecomisoApi.deleteDecmisoinfo({
        usuario: this.$store.getters.getUsuario,
      });

      this.showOutput(false, response.message);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style scoped></style>
