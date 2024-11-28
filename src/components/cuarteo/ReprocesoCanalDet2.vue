<template>
  <div class="w-full flex flex-col gap-2">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <table class="table-fixed w-full text-xs">
      <thead>
        <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
          <th style="visibility: collapse; display: none">ReprocesoNo</th>
          <th class="md:w-2/12">Codigo</th>
          <th class="md:w-3/12">Descripción</th>
          <th>Kilos</th>
          <th>Guia No</th>
          <th>N-Anim</th>
          <th>Lado</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b border-gray-500"
          v-for="d in tblReprocesoCanalDt2"
          :key="d.autoNum"
        >
          <td style="visibility: collapse; display: none">
            {{ d.reprocesoNo }}
          </td>
          <td>
            <PaginatedSelect
              v-model="d.idCodigo"
              :fetch="productosDt2Codigo"
              disabled
            ></PaginatedSelect>
          </td>
          <td>
            <PaginatedSelect
              v-model="d.idCodigo"
              :fetch="productosDt2Name"
              disabled
            ></PaginatedSelect>
          </td>
          <td class="text-center">{{ $convertToDecimal(d.cantidad) }}</td>
          <td class="text-center">{{ d.guiaNo }}</td>
          <td class="text-center">{{ d.nAnima }}</td>
          <td class="text-center">{{ d.ladoAni }}</td>
        </tr>
        <tr class="border-b border-gray-500" v-if="!reprocesoNo">
          <td style="visibility: collapse; display: none">
            {{ IreprocesoCanalDt2.reprocesoNo }}
          </td>
          <td>
            <PaginatedSelect
              v-model="IreprocesoCanalDt2.idCodigo"
              :fetch="productosDt2CodAgrupName(codigoAgrup)"
            ></PaginatedSelect>
          </td>
          <td>
            <PaginatedSelect
              v-model="IreprocesoCanalDt2.idCodigo"
              :fetch="productosDt2CodAgrup(codigoAgrup)"
            ></PaginatedSelect>
          </td>
          <td class="text-center">
            <input
              type="number"
              class="input"
              v-model="IreprocesoCanalDt2.cantidad"
            />
          </td>
          <td class="text-center">
            <input
              type="number"
              class="input"
              v-model="IreprocesoCanalDt2.guiaNo"
            />
          </td>
          <td class="text-center">
            <input
              type="number"
              class="input"
              v-model="IreprocesoCanalDt2.nAnima"
            />
          </td>
          <td class="text-center">
            <input
              type="number"
              class="input"
              v-model="IreprocesoCanalDt2.ladoAni"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <ButtonPagination
      :key="reprocesoNo"
      :currentPagination="pagination"
      :currentDataLength="tblReprocesoCanalDt2.length"
      @click="loadMore"
    >
      Cargar más
    </ButtonPagination>

    <ModalPDFPreview
      :pdfData="rptStickmcanPdfBase64"
      @close="rptStickmcanPdfBase64 = ''"
      v-if="rptStickmcanPdfBase64.length > 0"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import * as Sentry from '@sentry/browser';
import IPagination from '@/types/IPagination';
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
import {
  IProductosDt2,
  IReprocesoCanalDt2,
  ProductosDt2,
  reprocesoCanalDt2,
} from '@/remote/api/cuarteo/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import ReportesCuarteosApi from '@/remote/api/cuarteo/reportesCuarteos';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import ButtonPagination from '../reusable/ButtonPagination.vue';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
  },
  name: 'frmReprocesoCanalDet2',
})
export default class ReprocesoCanalDet2 extends Vue {
  @Prop(Number) public reprocesoNo: number;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private pagination: IPagination = {
    limit: 20,
    skip: 0,
  };
  private codigoAgrup: string = '';
  private rptStickmcanPdfBase64: string = '';
  private reproKil1: number = 0;
  private reproKil2: number = 0;

  private IreprocesoCanalDt2: IReprocesoCanalDt2 = {
    cantidad: 0,
    fechaG: '',
    guiaNo: 0,
    idCodigo: '',
    ladoAni: '',
    nAnima: 0,
    reprocesoNo: 0,
  };

  private tblReprocesoCanalDt2: reprocesoCanalDt2 = [];

  private cuarteoApi = new CuarteoApi(this.$store.getters.getAuthToken);
  private cuarteoReportsApi = new ReportesCuarteosApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    document.querySelector('#tableDt2').addEventListener('scroll', async () => {
      if (
        document.querySelector('#tableDt2').scrollTop +
          document.querySelector('#tableDt2').clientHeight >=
        document.querySelector('#tableDt2').scrollHeight
      ) {
        await this.loadMore();
      }
    });
    this.keyDown();
    if (!this.reprocesoNo) {
      await this.onOpen();
      return;
    }
    await this.fetchData(this.reprocesoNo);
  }

  private keyDown() {
    window.addEventListener('keydown', (e) => {
      const eventos: string = `F2 = CERRAR PANTALLA  F8 = IMPRIMIR ETIQUETA`;
      switch (e.key) {
        case 'F1':
          this.showOutput(false, eventos);
          break;
        case 'F6':
          this.productosDt2CodAgrup(this.codigoAgrup);
          this.productosDt2CodAgrupName(this.codigoAgrup);
          break;
        case 'F8':
          this.onPrint();
          break;
      }
    });
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private clearOutput() {
    this.output = '';
  }

  private async onOpen() {
    await this.fetchDataOnOpen();
    await this.productosDt2CodAgrup(this.codigoAgrup);
    await this.productosDt2CodAgrupName(this.codigoAgrup);
  }

  private async onBeforeInsert() {
    try {
      const response =
        await this.cuarteoApi.postOnBeforeInsertReprocesoCanalDt2(
          this.IreprocesoCanalDt2,
        );
      const intX: number = response.data;
      if (intX === 1) {
        this.IreprocesoCanalDt2.cantidad = this.reproKil1 - this.reproKil2;
        return;
      }
      this.showOutput(true, 'Supera Tope Maximo de Registros');
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async onAfterInsert() {
    try {
      const response = await this.cuarteoApi.postOnAfterInsertReprocesoCanalDt2(
        { ...this.IreprocesoCanalDt2, reproKil1: this.reproKil1 },
      );
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async onAfterUpadate() {
    try {
      await this.cuarteoApi.postOnAfterUpdateReprocesoCanalDt2({
        ...this.IreprocesoCanalDt2,
        codigoAgrup: this.codigoAgrup,
      });
      await this.onPrint();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchDataOnOpen() {
    try {
      const response = await this.cuarteoApi.postOnOpenReprocesoCanalDt2(
        this.IreprocesoCanalDt2,
      );
      this.tblReprocesoCanalDt2 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchData(reprocesoNo: number) {
    try {
      const response = await this.cuarteoApi.getReprocesoCanalDt2(
        reprocesoNo,
        this.pagination,
      );
      this.tblReprocesoCanalDt2 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async productosDt2Codigo(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<ProductosDt2>;
    if (q.query) {
      response = await this.cuarteoApi.getProductosDt2Find(q);
      return response.data.map<IInterfaceSelect>((e: IProductosDt2) => ({
        id: e.idCodigo,
        item: e.idCodigo,
      }));
    }
    response = await this.cuarteoApi.getProductosDt2(p);
    return response.data.map<IInterfaceSelect>((e: IProductosDt2) => ({
      id: e.idCodigo,
      item: e.idCodigo,
    }));
  }

  private async productosDt2Name(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<ProductosDt2>;
    if (q.query) {
      response = await this.cuarteoApi.getProductosDt2Find(q);
      return response.data.map<IInterfaceSelect>((e: IProductosDt2) => ({
        id: e.idCodigo,
        item: e.descripcionMer,
      }));
    }
    response = await this.cuarteoApi.getProductosDt2(p);
    return response.data.map<IInterfaceSelect>((e: IProductosDt2) => ({
      id: e.idCodigo,
      item: e.descripcionMer,
    }));
  }

  private async productosDt2CodAgrup(
    codigoAgrup: string,
    p?: IPagination,
    q?: IQuery,
  ) {
    let response: BaseResponse<ProductosDt2>;
    if (q.query) {
      response = await this.cuarteoApi.getProductosDt2CodAgrupFind(
        codigoAgrup,
        q,
      );
      response.data.map<IInterfaceSelect>((e: IProductosDt2) => ({
        id: e.idCodigo,
        item: e.idCodigo,
      }));
    }
    response = await this.cuarteoApi.getProductosDt2CodAgrup(codigoAgrup, p);
    return response.data.map<IInterfaceSelect>((e: IProductosDt2) => ({
      id: e.idCodigo,
      item: e.idCodigo,
    }));
  }

  private async productosDt2CodAgrupName(
    codigoAgrup: string,
    p?: IPagination,
    q?: IQuery,
  ) {
    let response: BaseResponse<ProductosDt2>;
    if (q.query) {
      response = await this.cuarteoApi.getProductosDt2CodAgrupFind(
        codigoAgrup,
        q,
      );
      return response.data.map<IInterfaceSelect>((e: IProductosDt2) => ({
        id: e.idCodigo,
        item: e.descripcionMer,
      }));
    }
    response = await this.cuarteoApi.getProductosDt2CodAgrup(codigoAgrup, p);
    return response.data.map<IInterfaceSelect>((e: IProductosDt2) => ({
      id: e.idCodigo,
      item: e.descripcionMer,
    }));
  }

  private async onPrint() {
    this.isLoading = true;
    try {
      const rptReproceso = await this.cuarteoReportsApi.rptstickmcanpdf(
        this.IreprocesoCanalDt2.autoNum,
      );
      this.rptStickmcanPdfBase64 = rptReproceso.data;
    } catch (err) {
      Sentry.captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async loadMore() {
    this.pagination.limit += 100;
    await this.fetchData(this.reprocesoNo);
  }
}
</script>
