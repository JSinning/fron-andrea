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
        <thead>
          <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
            <th style="visibility: collapse; display: none">ConsecTip</th>
            <th>Codigo</th>
            <th>Descripción</th>
            <th>Kilos</th>
            <th>Unidades</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblDcjSubPrxCj"
            :key="d.id"
          >
            <td style="visibility: collapse; display: none">
              {{ d.consecTip }}
            </td>
            <td class="text-center">{{ d.codigoPro }}</td>
            <td class="text-center">{{ d.descripcionMer }}</td>
            <td class="text-center">{{ $convertToDecimal(d.pesoPr) }}</td>
            <td class="text-center">{{ d.unidades }}</td>
          </tr>
        </tbody>
      </table>
      <ButtonPagination
        :currentPagination="pagination"
        :currentDataLength="tblDcjSubPrxCj.length"
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
import {
  ITblDcjSubPrxCj,
  TblDcjSubPrxCj,
} from '@/remote/api/despacho_caja/types';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import { captureException } from '@sentry/browser';
import ButtonPagination from '../reusable/ButtonPagination.vue';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
  },
  name: 'DCCajasSubPrxCj',
})
export default class DCCajasSubPrxCj extends Vue {
  @Prop(Boolean) public readonly: boolean;
  private isLoading: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private output = {
    isError: false,
    message: '',
  };

  private tblDcjSubPrxCj: Array<ITblDcjSubPrxCj & { id: string }> = [];

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.fetchData();
  }

  private async fetchData() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.getDcajasSubPrxCjs(
        this.pagination,
      );
      this.tblDcjSubPrxCj = response.data.map((item: ITblDcjSubPrxCj, i) => ({
        ...item,
        id: [item.consecTip, i].join('.'),
      }));
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async loadMore() {
    this.pagination.limit += 100;
    await this.fetchData();
  }
}
</script>
