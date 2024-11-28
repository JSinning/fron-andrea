<template>
  <div class="w-full flex flex-col gap-2">
    <AlertBox
      :output="output.message"
      :isError="output.isError"
      @empty="() => (output.message = '')"
    />
    <table class="table-fixed w-full text-xs">
      <thead>
        <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
          <th>Guia No</th>
          <th>Proveedor</th>
          <th>Codigo</th>
          <th>Unid</th>
          <th>Kilos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in data" :key="d.nGuia" class="border-b border-gray-500">
          <td class="text-center">{{ d.nGuia }}</td>
          <td class="text-center">{{ d.expr1 }}</td>
          <td class="text-center">{{ d.descripcionCla }}</td>
          <td class="text-center">{{ d.unidaC }}</td>
          <td class="text-center">{{ d.pesoC }}</td>
        </tr>
      </tbody>
      <ButtonPagination
        :key="nGuia"
        :currentPagination="pagination"
        :currentDataLength="data.length"
        @click="loadMore"
      >
        Cargar más
      </ButtonPagination>
    </table>
  </div>
</template>

<script lang="ts">
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
import { FriRCanaTotCanal } from '@/remote/api/cuarteo/types';
import { BaseResponse } from '@/types';
import IPagination from '@/types/IPagination';
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import * as Sentry from '@sentry/browser';
import ButtonPagination from '../reusable/ButtonPagination.vue';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
  },
  name: 'SubRelaCanLot',
})
export default class SubRelaCanLot extends Vue {
  @Prop(Number) public readonly nGuia: number;
  private data: FriRCanaTotCanal = [];
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private output = {
    isError: false,
    message: '',
  };

  private api = new CuarteoApi(this.$store.getters.getAuthToken);

  private async mounted() {
    await this.fetchData();
  }

  private async fetchData() {
    try {
      let response: BaseResponse<FriRCanaTotCanal>;
      if (!this.nGuia) {
        response = await this.api.getSubRelaCanLotAllData(this.pagination);
      } else {
        response = await this.api.getSubRelaCanLotData(
          this.nGuia,
          this.pagination,
        );
      }
      this.data = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.output = {
        isError: true,
        message: e.message,
      };
    }
  }

  private async loadMore() {
    this.pagination.limit += 100;
    await this.fetchData();
  }
}
</script>
