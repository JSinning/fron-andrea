<template>
  <div class="container mx-auto">
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 md:w-1/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Proceso generacion de lotes internos</h1>
        </div>
      </div>

      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-13 md:mb-0 mt-2">
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:btn-save': readonlyGenera,
            }"
            :disabled="readonlyGenera"
            @click="viewModalgenInfo"
          >
            Generar informacion a procesar
          </button>
        </div>
      </div>

      <div class="card-table mt-3">
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Guia No.</th>
              <th>Tercero G</th>
              <th>No. animales</th>
              <th>Generar</th>
              <th>Fecha Pes</th>
              <th>Lote No.</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in generaLotSubTable" :key="index">
            <tr class="border-b border-gray-500">
              <td>{{ item.guiaNo }}</td>
              <td>{{ item.terceroG }}</td>
              <td>{{ item.noAnimales }}</td>
              <td class="checkbox">
                <input type="checkbox" v-model="item.generarNo" />
              </td>
              <td>{{ convertDate(item.fechaPes) }}</td>
              <td>{{ item.loteNo }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex flex-row flex-wrap justify-center">
        <div class="mb-6 md:mb-0 mt-2 mr-4">
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:btn-save': readonlyGenera,
            }"
            :disabled="readonlyGenera"
            @click="viewModalgen"
          >
            Generar
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button
            @click="print"
            ref="imprimeRef"
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:btn-save': readonlyPrint,
            }"
            :disabled="readonlyPrint"
          >
            Reimprimir informes
          </button>
        </div>
      </div>

      <!-- Modal Genera infomacio -->
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="modalgenInfo"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <div
              class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="text-lg"
                >&#x1f6c8; Va a Realizar el Proceso Generacion de Lotes
                Internos</strong
              >
              <div class="content-center mt-2">
                <div class="flex flex-row flex-wrap">
                  <div
                    class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-succes" @click="acceptModalgenInfo()">
                      Si
                    </button>
                  </div>
                  <div
                    class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-danger" @click="closeModalgenInfo()">
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal Genera informacion -->

      <!-- Modal Genera -->
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="modalgen"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <div
              class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="text-lg">&#x1f6c8; Genera los Lotes?</strong>
              <div class="content-center mt-2">
                <div class="flex flex-row flex-wrap">
                  <div
                    class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-succes" @click="acceptModalgen()">
                      Si
                    </button>
                  </div>
                  <div
                    class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-danger" @click="closeModalgen()">
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal Genera -->
    </div>
    <ModalPDFPreview
      :pdfData="pdfData"
      @close="closeModalPDF"
      v-if="showModalPDF"
    />
    <ModalPDFPreview
      :pdfData="pdfData2"
      @close="closeModal2PDF"
      v-if="showModalPDF2"
    />
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Ref, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import moment from 'moment';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';
import { IGeneraLotSub } from '@/remote/api/guia_sacrificio/type';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
  },
  name: 'GeneraLot',
})
export default class GeneraLot extends Vue {
  @Ref('imprimeRef') public readonly imprimeRef: HTMLButtonElement;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private modalgenInfo: boolean = false;
  private modalgen: boolean = false;
  private readonlyPrint: boolean = true;
  private readonlyGenera: boolean = false;
  private pdfData: string = '';
  private pdfData2: string = '';
  private showModalPDF: boolean = false;
  private showModalPDF2: boolean = false;

  private generaLotSubTable: IGeneraLotSub[] = [];

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

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private closeModal2PDF() {
    this.showModalPDF2 = false;
  }

  private closeModalgenInfo() {
    this.modalgenInfo = false;
  }

  private viewModalgenInfo() {
    this.modalgenInfo = true;
  }

  private closeModalgen() {
    this.modalgen = false;
  }

  private viewModalgen() {
    this.modalgen = true;
  }

  private convertDate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private async print() {
    await this.generaLotPdf();
    await this.infrecGanadoPdf();
  }

  private async openForm() {
    await this.onOpen();
    await this.generaLotSub();
  }

  private async acceptModalgenInfo() {
    await this.genInfo();
    this.closeModalgenInfo();
  }

  private async acceptModalgen() {
    await this.genera();
    this.closeModalgen();
  }

  private async genera() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putgenerarGeneraLot();
      this.showOutput(false, 'Proceso Concluido con Exito');
      this.readonlyGenera = true;
      this.readonlyPrint = false;
      this.imprimeRef.focus();

      await this.generaLotPdf();
      await this.infrecGanadoPdf();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async genInfo() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getGeneraInfoGeneraLot();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async onOpen() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putOpenFormGeneraLot();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async generaLotSub() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getGeneraLotSub();
      this.generaLotSubTable = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async generaLotPdf() {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getGeneraLotPDF();
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async infrecGanadoPdf() {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getinfrecGanado2PDF();
      this.pdfData2 = pdf2.data;
      this.showModalPDF2 = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }
}
</script>

<style>
table,
td {
  padding: 10px;
}

.checkbox {
  text-align: center;
}
</style>
