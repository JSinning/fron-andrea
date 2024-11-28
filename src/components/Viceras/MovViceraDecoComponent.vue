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
    <div class="flex flex-row flex-wrap mb-2">
      <div class="px-3 mb-6 md:mb-0">
        <label>No Guia</label>
        <input type="text" class="input" />
      </div>
      <div class="px-3 mb-6 md:mb-0">
        <label>No Guia</label>
        <input type="text" class="input" />
      </div>
      <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0"></div>
      <div class="md:w-1/3 pl-48 mt-2 md:mb-0">
        <button class="btn-delete">Salir</button>
      </div>
    </div>

    <!-- table -->
    <div class="flex flex-row flex-wrap mb-3">
      <div class="card-table">
        <table class="table-auto w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Producto</th>
              <th>Causal</th>
              <th>Dictamen</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
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
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import PDFPreview from '@/components/reusable/PdfPreview.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import MovReportesApi from '@/remote/api/MovViseras/ReportesVisceras';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PDFPreview,
  },
  name: 'MovViceraDecoComponent',
})
export default class MovViceraDecoComponent extends Vue {
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

  private async codigoProdClick() {
    try {
      this.isLoading = true;
      const pdf = await this.MovReportesApi.getEtiqCanastPata2PDF(this.auton);
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
