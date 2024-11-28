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
            <th style="visibility: collapse; display: none">Id pesaje</th>
            <th>Pedido</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="det in tblDCControlVehDPedCs"
            :key="det.auton"
            class="border-b border-gray-500"
          >
            <td style="visibility: collapse; display: none">
              {{ det.idPesaje }}
            </td>
            <td>
              <PaginatedSelect
                v-model="det.idPedido"
                :initData="idPedidos"
                :fetch="fetchIdPedidos"
                :disabled="true"
              />
            </td>
            <td>{{ det.observac }}</td>
          </tr>
        </tbody>
      </table>
      <ButtonPagination
        :key="idPesaje"
        :currentPagination="pagination"
        :currentDataLength="tblDCControlVehDPedCs.length"
        @clic="loadMore"
      >
        Cargar más
      </ButtonPagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import { ITblDCjControlVdPed } from '@/remote/api/despacho_caja/types/ITblDCjControlVdPed';
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
  name: 'DCControlVehDPedCs',
})
export default class DCControlVehDPedCs extends Vue {
  @Prop(Number) public readonly idPesaje: number;

  public isLoading: boolean = false;

  public pagination: IPagination = {
    limit: 100,
    skip: 0,
  };

  public output = {
    isError: false,
    message: '',
  };

  public tblDCControlVehDPedCs: ITblDCjControlVdPed[] = [];

  public idPedidos: IInterfaceSelect[] = [];

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );

  public async mounted(): Promise<void> {
    try {
      this.idPedidos = await this.fetchIdPedidos({ skip: 0, limit: 100 });
      await this.fetchDetallesPedido();
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: 'Error al obtener datos de formulario',
      };
    }
  }

  public async loadMore(): Promise<void> {
    this.pagination.limit += 100;
    await this.fetchDetallesPedido();
  }

  public async fetchDetallesPedido(): Promise<void> {
    try {
      this.isLoading = true;
      const res = await this.despachoCajaApi.ControlVeh.getDetallesPedido(
        this.idPesaje,
        this.pagination,
      );
      this.tblDCControlVehDPedCs = res.data;
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: 'Error al obtener detalles pedido',
      };
    } finally {
      this.isLoading = false;
    }
  }

  public async fetchIdPedidos(
    p?: IPagination,
    q?: IQuery,
  ): Promise<IInterfaceSelect[]> {
    let res: BaseResponse<
      Array<{
        idAuton: number;
        pedido: number;
        prefijoPed: string;
        usuario: string;
        codigo: string;
        sucursal: string;
        fechaDoc: string;
      }>
    >;
    if (q.query) {
      res = await this.despachoCajaApi.ControlVeh.getIdPedidosFind(q);
      return res.data.map<IInterfaceSelect>(({ idAuton, pedido }) => ({
        id: idAuton,
        item: pedido,
      }));
    }
    res = await this.despachoCajaApi.ControlVeh.getIdPedidos(p);
    return res.data.map<IInterfaceSelect>(({ idAuton, pedido }) => ({
      id: idAuton,
      item: pedido,
    }));
  }
}
</script>
