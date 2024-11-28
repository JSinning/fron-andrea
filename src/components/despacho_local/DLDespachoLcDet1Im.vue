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
  <div class="w-full flex flex-col gap-2">
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
            <th style="visibility: collapse; display: none">IdDespachoLoc</th>
            <th style="visibility: collapse; display: none">Auton</th>
            <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody v-for="d in tblDlDespachoLocalDt1Im" :key="d.auton">
          <tr class="border-b border-gray-500">
            <td style="visibility: collapse; display: none">
              {{ d.idDespachoLoc }}
            </td>
            <td style="visibility: collapse; display: none">{{ d.auton }}</td>
            <td>
              <PaginatedSelect
                v-model="d.producto"
                :fetch="productosName"
                disabled
              />
            </td>
            <td class="text-center">{{ $convertToDecimal(d.cantidad) }}</td>
            <td>
              <PaginatedSelect v-model="d.tercero" :fetch="clientes" disabled />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="md:w-1/5 px-3 mb-6 md:mb-0">
      <input type="text" class="input" v-model="total" disabled />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import DespachoLocalApi from '@/remote/api/despacho_local/despachoLocalApi';
import { captureException } from '@sentry/browser';
import {
  Clientes,
  DespachoLocalDet1Im,
  IClientes,
  IProductos,
  Productos,
} from '@/remote/api/despacho_local/types';
import convertToDecimal from '@/utils/convertToDecimal';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { BaseResponse } from '@/types';
import IQuery from '@/types/query';

@Component({
  components: {
    AlertBox,
    Loader,
    PaginatedSelect,
  },
  name: 'DLDespachoLcDet1Im',
})
export default class DLDespachoLcDet1Im extends Vue {
  @Prop(Number) public idDespachoLoc: number;
  private isLoading: boolean = false;

  private output = {
    isError: false,
    message: '',
  };

  private tblDlDespachoLocalDt1Im: DespachoLocalDet1Im = [];
  private total: string = '0';

  private despachoLocalApi = new DespachoLocalApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    this.fetchData(this.idDespachoLoc);
  }

  private async fetchData(idDespachoLoc: number) {
    this.isLoading = true;
    try {
      const response =
        await this.despachoLocalApi.despachoLocalDet1Im.get(idDespachoLoc);

      this.tblDlDespachoLocalDt1Im = response.data.rows;
      this.total = convertToDecimal(response.data.total);
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: e.message,
      };
    } finally {
      this.isLoading = false;
    }
  }

  private async productosName(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<Productos>;
      if (q.query) {
        response =
          await this.despachoLocalApi.getDespachoLocalDt1ImProductosFind(q);

        return response.data.map<IInterfaceSelect>(
          (e: Pick<IProductos, 'idCodigo' | 'descripcionMer'>) => ({
            id: e.idCodigo,
            item: e.descripcionMer,
          }),
        );
      }
      response = await this.despachoLocalApi.getDespachoLocalDt1ImProductos(p);

      return response.data.map<IInterfaceSelect>(
        (e: Pick<IProductos, 'idCodigo' | 'descripcionMer'>) => ({
          id: e.idCodigo,
          item: e.descripcionMer,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: e.message,
      };
    }
  }

  private async clientes(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<Clientes>;
      if (q.query) {
        response =
          await this.despachoLocalApi.getDespachoLocalDt1ImClientesFind(q);

        return response.data.map<IInterfaceSelect>(
          (e: Pick<IClientes, 'codiCliente' | 'expr2'>) => ({
            id: e.codiCliente,
            item: e.expr2,
          }),
        );
      }
      response = await this.despachoLocalApi.getDespachoLocalDt1ImClientes(p);

      return response.data.map<IInterfaceSelect>(
        (e: Pick<IClientes, 'codiCliente' | 'expr2'>) => ({
          id: e.codiCliente,
          item: e.expr2,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: e.message,
      };
    }
  }
}
</script>
