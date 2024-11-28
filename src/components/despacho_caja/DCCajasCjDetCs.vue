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
            <th class="md:w-2/12">Etiqueta</th>
            <th>Peso Neto Ant</th>
            <th>Peso Bruto Actual</th>
            <th>Difer</th>
            <th class="md:w-2/12">Pedido</th>
            <th class="md:w-2/12"></th>
            <th>Anular</th>
            <th>Motivo Anulacion</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblDCjDespacCajaDet"
            :key="d.autoNum"
          >
            <td class="text-center">{{ d.etiquetaC }}</td>
            <td class="text-center">{{ d.peso1 }}</td>
            <td class="text-center">{{ d.peso2 }}</td>
            <td class="text-center">{{ $convertToDecimal(d.difer) }}</td>
            <td>
              <PaginatedSelect v-model="d.idPedido" :fetch="pedidos" disabled />
            </td>
            <td class="text-center">{{ d.descripcClien }}</td>
            <td class="text-center">{{ d.anulaCC ? 'SI' : 'NO' }}</td>
            <td class="text-center">{{ d.motivoAnu }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ButtonPagination
      :key="consecTip"
      :currentPagination="pagination"
      :currentDataLength="tblDCjDespacCajaDet.length"
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
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import {
  IPedidos,
  ITblDCjDespacCajaDet,
} from '@/remote/api/despacho_caja/types';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import convertToDecimal from '@/utils/convertToDecimal';
import { captureException } from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
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
  name: 'DCCajasCjDetCs',
})
export default class DCCajasCjDetCs extends Vue {
  @Prop(Number) public consecTip: number;
  private isLoading: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private output = {
    isError: false,
    message: '',
  };

  private tblDCjDespacCajaDet: Array<ITblDCjDespacCajaDet & { difer: string }> =
    [];

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.fetchData(this.consecTip);
  }

  private async fetchData(consecTip: number) {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCCajasDet.get(
        consecTip,
        this.pagination,
      );
      this.tblDCjDespacCajaDet = response.data.map(
        (e: ITblDCjDespacCajaDet) => {
          return {
            ...e,
            difer: convertToDecimal(e.peso2 - (e.peso1 + e.taraC)),
          };
        },
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async pedidos(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<Array<Pick<IPedidos, 'pedido' | 'usuario'>>>;
      if (q.query) {
        response = await this.despachoCajaApi.getPedidosDet(p);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IPedidos, 'pedido' | 'usuario'>) => ({
            id: e.pedido,
            item: e.usuario,
          }),
        );
      }
      response = await this.despachoCajaApi.getPedidosDet(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IPedidos, 'pedido' | 'usuario'>) => ({
          id: e.pedido,
          item: e.usuario,
        }),
      );
    } catch (e) {
      captureException(e);
    }
  }

  private async loadMore() {
    this.pagination.limit += 100;
    await this.fetchData(this.consecTip);
  }
}
</script>
