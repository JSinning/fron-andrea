<!-- */ Copyright (©) Andrea.com.co - All Rights Reserved * Unauthorized copying
of this file, via any medium is strictly prohibited. * Proprietary and
confidential. * Written and developed with ❤️ by Andrea.com.co * 2020 /* -->
<template>
  <div class="w-full flex flex-col gap-0">
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
    <div class="card-table">
      <table class="table-fixed w-full text-xs">
        <tbody>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblDCjDespacCajaDet4"
            :key="d.id"
          >
            <td>
              <PaginatedSelect v-model="d.idConce" :fetch="concepto" disabled />
            </td>
            <td class="text-center">{{ d.unidConc }}</td>
            <td class="text-center">{{ $convertToDecimal(d.pesoConc) }}</td>
          </tr>
        </tbody>
      </table>
      <ButtonPagination
        :currentPagination="pagination"
        :currentDataLength="tblDCjDespacCajaDet4.length"
        @click="loadMore"
      >
        Cargar más
      </ButtonPagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IPagination from '@/types/IPagination';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import {
  IConcepto,
  ITblDCjDespacCajaDet4,
  TblDCjDespacCajaDet4,
} from '@/remote/api/despacho_caja/types';
import { captureException } from '@sentry/browser';
import ButtonPagination from '../reusable/ButtonPagination.vue';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'DCCajasCjDet4',
})
export default class DCCajasCjDet4 extends Vue {
  private isLoading: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private output = {
    isError: false,
    message: '',
  };

  private tblDCjDespacCajaDet4: Array<ITblDCjDespacCajaDet4 & { id: string }> =
    [];

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.fetchData();
  }

  private async fetchData() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCCajaCjDet4.get(
        this.pagination,
      );
      this.tblDCjDespacCajaDet4 = response.data.map(
        (item: ITblDCjDespacCajaDet4, i) => ({
          ...item,
          id: [item.consecTip, i].join('.'),
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async concepto(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<IConcepto[]>;
      if (q.query) {
        response = await this.despachoCajaApi.getIdconcesDCCajaCjDet4Find(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IConcepto, 'idConcepDC' | 'descripcionDC'>) => ({
            id: e.idConcepDC,
            item: e.descripcionDC,
          }),
        );
      }
      response = await this.despachoCajaApi.getIdconcesDCCajaCjDet4(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IConcepto, 'idConcepDC' | 'descripcionDC'>) => ({
          id: e.idConcepDC,
          item: e.descripcionDC,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    }
  }

  private async loadMore() {
    this.pagination.limit += 100;
    await this.fetchData();
  }
}
</script>
