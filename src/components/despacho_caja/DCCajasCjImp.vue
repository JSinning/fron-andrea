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
  <div class="container mx-auto">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="card mt-0 pt-3 px-10">
        <div class="flex flex-row flex-wrap w-full">
          <div class="flex flex-col flex-wrap w-8/12">
            <div class="px-3 mb-6 md:mb-0 inline-block relative">
              <label class="label">Busqueda:</label>
              <PaginatedSelect v-model="consecTip" :fetch="dCCajasCjImp" />
            </div>
          </div>
        </div>
        <div class="px-3 mb-6 md:mb-0 inline-block relative">
          <button class="btn-save p-5" @click="printConsolidado">
            Informe Consolidado
          </button>
          <button class="btn-save p-5" @click="printDetallado">
            Informe Detallado
          </button>
        </div>
      </div>

      <hr />

      <ModalPDFPreview
        :pdfData="rptDespachoCajasPdfBase64"
        @close="rptDespachoCajasPdfBase64 = ''"
        v-if="rptDespachoCajasPdfBase64.length > 0"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { IDcCajasCjImp } from '@/remote/api/despacho_caja/types';
import { captureException } from '@sentry/browser';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import convertDate from '@/utils/convertDate';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import ReportesDespachosCajasApi from '@/remote/api/despacho_caja/reportesDespachosCajas';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
  },
  name: 'DCCajasCjImp',
})
export default class DCCajasCjImp extends Vue {
  private output: string = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private consecTip: number = 0;

  private rptDespachoCajasPdfBase64: string = '';

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );

  private despachoCajasRerportesApi = new ReportesDespachosCajasApi(
    this.$store.getters.getAuthToken,
  );

  private clearOutput() {
    this.output = '';
  }

  private showOutput(isError: boolean, message: string) {
    this.output = message;
    this.isError = isError;
  }

  private async printConsolidado() {
    if (!this.consecTip) {
      this.showOutput(true, 'Debe Digitar No de despacho de la caja');
      return;
    }
    this.isLoading = true;
    try {
      const rptConsolidado = await this.despachoCajasRerportesApi.getDespachoCj(
        this.consecTip,
      );
      this.rptDespachoCajasPdfBase64 = rptConsolidado.data;
    } catch (err) {
      captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async printDetallado() {
    if (!this.consecTip) {
      this.showOutput(true, 'Debe Digitar No de despacho de la caja');
      return;
    }
    this.isLoading = true;
    try {
      const rptDetallado = await this.despachoCajasRerportesApi.getDespachoCj3E(
        this.consecTip,
      );
      this.rptDespachoCajasPdfBase64 = rptDetallado.data;
    } catch (err) {
      captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async dCCajasCjImp(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<IDcCajasCjImp, 'consecTip' | 'fechaMov' | 'tercero'>>
      >;
      if (q.query) {
        response = await this.despachoCajaApi.getDCCajasImpFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IDcCajasCjImp, 'consecTip' | 'fechaMov' | 'tercero'>) => ({
            id: e.consecTip,
            item: `${e.consecTip} - ${convertDate(e.fechaMov)} - ${e.tercero}`,
          }),
        );
      }
      response = await this.despachoCajaApi.getDCCajasImp(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IDcCajasCjImp, 'consecTip' | 'fechaMov' | 'tercero'>) => ({
          id: e.consecTip,
          item: `${e.consecTip} - ${convertDate(e.fechaMov)} - ${e.tercero}`,
        }),
      );
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }
}
</script>
