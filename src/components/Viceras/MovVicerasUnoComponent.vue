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
  <div class="main-div mb-2">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>

    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="flex flex-row flex-wrap mb-2 justify-end">
      <div class="md:w-1/3 pl-48 mt-2 md:mb-0"></div>
    </div>

    <div class="card">
      <div class="flex flex-row flex-wrap">
        <div class="md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="label">No Guia:</label>
          <input type="text" class="input" />
        </div>
        <div class="md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="label">Codigo Individual:</label>
          <input type="text" class="input" @dblclick="codigoIndivClick()" />
        </div>
        <div class="mt-2 px-3 mb-6 md:mb-0">
          <button class="btn-save">Imprimir</button>
        </div>

        <div class="mt-2 mb-6 md:mb-0">
          <button class="btn-save">Guardar</button>
        </div>
      </div>

      <div class="flex flex-row flex-wrap">
        <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">
            Codigo C.C ó Nit
            <select class="bg-white border py-1 pr-2 shadow leading-tight">
              <option></option>
            </select>
          </label>
        </div>
      </div>

      <div class="flex flex-row flex-wrap">
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Fecha y Hora Pesaje:</label>
          <input type="datetime-local" class="input" />
        </div>

        <div class="pt-5">
          <label class="label">
            <input class="mr-2 leading-tight" type="checkbox" />
            Retoma
          </label>
        </div>
      </div>

      <div class="flex flex-row flex-wrap">
        <div class="md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="label">Observaciones:</label>
          <input type="text" class="input" />
        </div>
        <div class="md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="label">Peso Viscera:</label>
          <input type="text" placeholder="0" class="input" />
        </div>
      </div>
    </div>
    <ModalPDFPreview
      :pdfData="pdfData"
      @close="closeModalPDF"
      v-if="showModalPDF"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as Sentry from '@sentry/browser';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import PDFPreview from '@/components/reusable/PdfPreview.vue';
import MovReportesApi from '@/remote/api/MovViseras/ReportesVisceras';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PDFPreview,
  },
  name: 'MovVicerasUnoComponent',
})
export default class MovVicerasUnoComponent extends Vue {
  private output = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private showModalPDF: boolean = false;
  private pdfData: string = '';
  private auton: number = 0;

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

  private async codigoIndivClick() {
    try {
      this.isLoading = true;
      const pdf = await this.MovReportesApi.getEtiqCanastPataPDF(this.auton);
      this.pdfData = pdf.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }
}
</script>
