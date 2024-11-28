<template>
  <div class="container mx-auto">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <ModalPDFPreview
      :pdfData="pdfData"
      @close="pdfData = ''"
      v-if="pdfData.length > 0"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ReportesRepartoAPI from '@/remote/api/reparto/reportesRepartoAPI';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import { captureException } from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
  },
  name: 'RepartoDiaCons',
})
export default class RepartoDiaCons extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private pdfData: string = '';

  private reporteRepartoApi = new ReportesRepartoAPI(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.reportReparto();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(isError: boolean, message: string) {
    this.output = message;
    this.isError = isError;
  }

  private async reportReparto() {
    this.isLoading = true;
    try {
      const pdf2 = await this.reporteRepartoApi.getRepartoDiaCons();
      this.pdfData = pdf2.data;
      this.isLoading = false;
    } catch (e) {
      captureException(e);
      this.showOutput(true, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }
}
</script>
