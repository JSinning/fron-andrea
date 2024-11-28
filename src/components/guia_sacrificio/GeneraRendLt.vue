<template>
  <div class="main-div">
    <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    <div class="flex-col">
      <div class="card">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Digite fecha a procesar:</label>
            <input type="date" class="input" v-model="fechaG1" />
          </div>
          <div class="md:w-1/2 px-3 mt-2 mb-6 md:mb-0">
            <button class="btn-save" @click="presentar">Procesar</button>
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
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';
import moment from 'moment/moment';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
  },
  name: 'GeneraRendLt',
})
export default class GeneraRendLt extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private fechaG1: string = '';

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );
  private guiaSacrificioReports = new ReportesGuiaSacrificio(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.openForm();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private convertDate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private async openForm() {
    await this.onOpen();
  }

  private async onOpen() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putOnOpenForm();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async presentar() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postGeneraRendLt({
        fechaG1: this.convertDate(this.fechaG1),
        fechaG2: this.convertDate(this.fechaG1),
      });

      await this.generaLot2Pdf();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async generaLot2Pdf() {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getGeneraLot2PDF();
      this.pdfData = pdf2.data;
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
