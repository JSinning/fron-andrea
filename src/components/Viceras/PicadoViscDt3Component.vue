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
  <div class="main-div">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>

    <div class="mb-2 pr-48">
      <div class="flex flex-row flex-wrap mb-2 justify-end"></div>
    </div>
    <!-- table -->
    <div class="flex flex-row flex-wrap mb-3">
      <div class="card-table">
        <table class="table-auto w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Producto</th>
              <th>Canastilla</th>
              <th>Peso</th>
              <th>Amaular</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr>
              <td>{{ TableDet3.CodProd }}</td>
              <td
                @dblclick="canastDblClick(TableDet3.CodProd, TableDet3.PesoCt)"
              >
                {{ TableDet3.Canasti }}
              </td>
              <td>{{ TableDet3.PesoCt }}</td>
              <td>{{ TableDet3.AnulaMov }}</td>
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
    <div class="w-full h-full">
      <component
        v-bind:is="componentName"
        :pdfData="pdfData"
        v-bind:message="message"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import { Component, Vue } from 'vue-property-decorator';

import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

import MovReportesApi from '@/remote/api/MovViseras/ReportesVisceras';

import PDFPreview from '@/components/reusable/PdfPreview.vue';

import * as Sentry from '@sentry/browser';

import LocalReports from '../../classes/LocalReports';

const reports = new LocalReports();

@Component({
  components: {
    AlertBox,
    ModalPDFPreview,
    PDFPreview,
  },
  name: 'PicasdoDet3',
  props: {
    idConcecutivo: Number,
  },
})
export default class PicadoViscDt3Component extends Vue {
  public reports = new LocalReports();

  private output = '';
  private isError: boolean = false;

  private TableDet3: any = [];

  private PicDet3 = new MovViserasApi(this.$store.getters.getAuthToken);

  private componentName: string = '';
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private MovReportesApi = new MovReportesApi(this.$store.getters.getAuthToken);

  private async mounted() {
    await this.picadoDt3(this.$props.idConcecutivo);
  }

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async picadoDt3(idConcecutivo: number) {
    try {
      const response = await this.PicDet3.getPicadoDet3(idConcecutivo);
      this.TableDet3 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async canastDblClick(codProd: string, kilos: number) {
    this.reports.descrProd = codProd;
    this.reports.pKilos = kilos;
    this.reports.unid = this.TableDet3.length;
    this.$local.saveLocalReportInfo(reports);

    const localDB = await this.$local.getLocalReportInfo();
    if (typeof localDB === 'string') {
      return;
    }

    const pdf = await this.MovReportesApi.getEtiqCanastVPDF({
      caja: localDB.caja,
      descTercCj: localDB.descTercCj,
      descrProd: localDB.descrProd,
      encEtiq1: localDB.encEtiq1,
      encEtiq4: localDB.encEtiq4,
      fechaP: localDB.fechaP,
      loteExt: localDB.loteExt,
      pKilos: localDB.pKilos,
      unid: localDB.unid,
    });
    this.pdfData = pdf.data;
    this.showModalPDF = true;
  }
}
</script>

<style scoped></style>
