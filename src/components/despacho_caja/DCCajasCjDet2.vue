<!-- */ Copyright (©) Andrea.com.co - All Rights Reserved * Unauthorized copying
of this file, via any medium is strictly prohibited. * Proprietary and
confidential. * Written and developed with ❤️ by Andrea.com.co * 2020 /* -->
<template>
  <div class="w-full flex flex-col gap-0 main-div">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox
        :output="output.message"
        :isError="output.isError"
        @empty="output.message = ''"
      />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="p-4"></div>
    <div class="card">
      <div class="flex flex-row flex-wrap">
        <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Codigo:</label>
          <input
            type="text"
            class="input"
            v-model="etiquetaC.codProduc"
            disabled
          />
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Producto:</label>
          <input
            type="text"
            class="input"
            v-model="etiquetaC.descripcClien"
            disabled
          />
        </div>
      </div>
      <div class="flex flex-row flex-wrap">
        <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Unidades:</label>
          <input
            type="text"
            class="input"
            v-model="etiquetaC.unidadesC"
            disabled
          />
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Kilos Bruto:</label>
          <input type="text" class="input" v-model="etiquetaC.peso1" disabled />
        </div>
      </div>
      <div class="flex flex-row flex-wrap">
        <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Tara:</label>
          <input type="text" class="input" v-model="etiquetaC.taraC" disabled />
        </div>
        <div class="px-3 mb-6 md:mb-0">
          <label class="label">Kilos Neto:</label>
          <input type="text" class="input" v-model="kilNeto" disabled />
        </div>
      </div>
      <div class="flex flex-row flex-wrap">
        <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
          <label class="label">Peso Actual:</label>
          <input type="text" class="input" v-model="PesoAc" disabled />
        </div>
      </div>
    </div>

    <!-- Modal view Pdf -->
    <ModalPDFPreview
      :pdfData="rptEtuquetaCrPdfBase64"
      @close="rptEtuquetaCrPdfBase64 = ''"
      v-if="rptEtuquetaCrPdfBase64.length > 0"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '../reusable/AlertBox.vue';
import Loader from '../reusable/Loader.vue';
import PaginatedSelect from '../reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import { IEtiquetaC } from '@/remote/api/despacho_caja/types';
import convertToDecimal from '@/utils/convertToDecimal';
import ReportesDespachosCajasApi from '@/remote/api/despacho_caja/reportesDespachosCajas';
import { captureException } from '@sentry/browser';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
  },
  name: 'DCCajasCjDet2',
})
export default class DCCajasCjDet2 extends Vue {
  @Prop(Object) public etiquetaC?: IEtiquetaC;
  @Prop(String) public PesoAc: string;
  private kilNeto: string = '';
  private isLoading: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private output = {
    isError: false,
    message: '',
  };

  private rptEtuquetaCrPdfBase64: string = '';

  private despachoCajasRerportesApi = new ReportesDespachosCajasApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    let kilosNeto: number = 0;
    kilosNeto = this.etiquetaC.peso1 - this.etiquetaC.taraC;
    this.kilNeto = convertToDecimal(kilosNeto);

    if (this.validatePesoAc()) {
      return;
    }
    await this.pesoActualAfter();
  }

  private async pesoActualAfter() {
    this.isLoading = true;
    try {
      const reportActual = await this.despachoCajasRerportesApi.getEtiquetaCr();
      this.rptEtuquetaCrPdfBase64 = reportActual.data;
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private validatePesoAc(): boolean {
    if (!this.PesoAc) {
      this.output = {
        isError: true,
        message: 'ERROR KILOS NO PUEDEN ESTAR EN CERO',
      };
      return true;
    }

    return false;
  }
}
</script>
