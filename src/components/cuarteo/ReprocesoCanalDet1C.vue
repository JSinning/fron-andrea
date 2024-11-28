<template>
  <div class="w-full flex flex-col gap-2">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <table class="table-fixed w-full text-xs">
      <thead>
        <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
          <th class="md:w-2/12">Etiqueta</th>
          <th>Codigo</th>
          <th>Descripción</th>
          <th>Kilos</th>
          <th>Guia No</th>
          <th>N-Anim</th>
          <th>Lado</th>
        </tr>
      </thead>
      <tbody v-for="d in tblReprocesoCanalDt1C" :key="d.autoNum">
        <tr class="border-b border-gray-500">
          <td class="text-center">{{ d.etiqueta }}</td>
          <td>
            <PaginatedSelect
              v-model="d.idCodigo"
              :fetch="productos"
              disabled
            ></PaginatedSelect>
          </td>
          <td>
            <PaginatedSelect
              v-model="d.idCodigo"
              :fetch="productosName"
              disabled
            ></PaginatedSelect>
          </td>
          <td class="text-center">{{ d.cantidad }}</td>
          <td class="text-center">{{ d.guiaNo }}</td>
          <td class="text-center">{{ d.nAnima }}</td>
          <td class="text-center">{{ d.ladoAni }}</td>
        </tr>
      </tbody>
    </table>
    <ButtonPagination
      :key="reprocesoNo"
      :currentPagination="pagination"
      :currentDataLength="tblReprocesoCanalDt1C.length"
      @click="loadMore"
    >
      Cargar más
    </ButtonPagination>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { BaseResponse } from '@/types';
import {
  IProductos,
  Productos,
  reprocesoCanalDt1,
} from '@/remote/api/cuarteo/types';
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
import * as Sentry from '@sentry/browser';

import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import InterfaceSelect from '@/models/interfaces/interfaceSelect';
import ButtonPagination from '../reusable/ButtonPagination.vue';
import IQuery from '@/types/query';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'ReprocesoCanalDet1C',
})
export default class ReprocesoCanalDet1C extends Vue {
  @Prop(Number) public readonly reprocesoNo?: number;
  @Prop(Boolean) public readonly lazy?: boolean;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };

  private tblReprocesoCanalDt1C: reprocesoCanalDt1 = [];

  private cuarteoApi = new CuarteoApi(this.$store.getters.getAuthToken);

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private clearOutput() {
    this.output = '';
  }

  private async mounted() {
    if (this.lazy) {
      return;
    }

    if (!this.reprocesoNo) {
      await this.fetchData();
      return;
    }

    await this.fetchOne();
  }

  private async fetchData() {
    this.isLoading = true;
    try {
      let response: BaseResponse<reprocesoCanalDt1>;
      response = await this.cuarteoApi.getReprocesoCanalDt1C(this.pagination);
      this.tblReprocesoCanalDt1C = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchOne() {
    this.isLoading = true;
    if (this.reprocesoNo === 0) {
      return;
    }
    try {
      const response = await this.cuarteoApi.getOneReprocesoCanalDt1C(
        this.reprocesoNo,
      );
      this.tblReprocesoCanalDt1C = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async productos(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<Productos>;
    if (q.query) {
      response = await this.cuarteoApi.getProductosFind(q);
      return response.data.map<InterfaceSelect>((e: IProductos) => ({
        id: e.idCodigo,
        item: e.idCodigo,
      }));
    }
    response = await this.cuarteoApi.getProductos(p);
    return response.data.map<InterfaceSelect>((e: IProductos) => ({
      id: e.idCodigo,
      item: e.idCodigo,
    }));
  }

  private async productosName(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<Productos>;
    if (q.query) {
      response = await this.cuarteoApi.getProductosFind(q);
      return response.data.map<InterfaceSelect>((e: IProductos) => ({
        id: e.idCodigo,
        item: e.descripcionMer,
      }));
    }
    response = await this.cuarteoApi.getProductos(p);
    return response.data.map<InterfaceSelect>((e: IProductos) => ({
      id: e.idCodigo,
      item: e.descripcionMer,
    }));
  }

  private async loadMore() {
    this.pagination.limit += 100;
    await this.fetchData();
  }
}
</script>
