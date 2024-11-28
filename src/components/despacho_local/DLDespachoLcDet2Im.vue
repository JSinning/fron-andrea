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
            <th>N-Guia</th>
            <th>No Animal</th>
            <th>M-C</th>
            <th>Kilos</th>
            <th>Producto</th>
            <th>Usuarios</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblDlDespachoLocalDt2Im"
            :key="d.auton"
          >
            <td style="visibility: collapse; display: none">
              {{ d.idDespachoLoc }}
            </td>
            <td style="visibility: collapse; display: none">{{ d.auton }}</td>
            <td class="text-center">{{ d.guiaNo }}</td>
            <td class="text-center">{{ d.nAnima }}</td>
            <td class="text-center">{{ d.ladoAni }}</td>
            <td class="text-center">{{ $convertToDecimal(d.pesoPro) }}</td>
            <td>
              <PaginatedSelect
                v-model="d.codigoProd"
                :fetch="productosName"
                disabled
              />
            </td>
            <td class="text-center">{{ d.expr1 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-row flex-wrap">
      <div class="md:w-1/5 px-3 mb-6 md:mb-0">
        <input type="text" class="input" v-model="cantidad" disabled />
      </div>
      <div class="md:w-1/5 px-3 mb-6 md:mb-0">
        <input type="text" class="input" v-model="total" disabled />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import {
  DespachoLocalDet2Im,
  IDespachoLocalDet2Im,
  IProductos,
} from '@/remote/api/despacho_local/types';
import DespachoLocalApi from '@/remote/api/despacho_local/despachoLocalApi';
import convertToDecimal from '@/utils/convertToDecimal';
import { captureException } from '@sentry/browser';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    Loader,
    PaginatedSelect,
  },
  name: 'DLDespachoLcDet2Im',
})
export default class DLDespachoLcDet2Im extends Vue {
  @Prop(Number) public idDespachoLoc: number;
  private isLoading: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private output = {
    isError: false,
    message: '',
  };

  private cantidad: string = '0';
  private total: string = '0';
  private tblDlDespachoLocalDt2Im: DespachoLocalDet2Im = [];

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
        await this.despachoLocalApi.despachoLocalDet2Im.get(idDespachoLoc);

      this.tblDlDespachoLocalDt2Im =
        response.data.rows.map<IDespachoLocalDet2Im>(
          (e: IDespachoLocalDet2Im) => {
            return { ...e, codigoProd: e.codigoProd.toLowerCase() };
          },
        );
      this.cantidad = response.data.cantidad.toString();
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
      let response: BaseResponse<
        Array<Pick<IProductos, 'idCodigo' | 'descripcionMer'>>
      >;
      if (q.query) {
        response =
          await this.despachoLocalApi.getDespachoLocalDt2ImProductosFind(q);

        return response.data.map<IInterfaceSelect>(
          (e: Pick<IProductos, 'idCodigo' | 'descripcionMer'>) => ({
            id: e.idCodigo.toLowerCase(),
            item: e.descripcionMer,
          }),
        );
      }
      response = await this.despachoLocalApi.getDespachoLocalDt2ImProductos(p);

      return response.data.map<IInterfaceSelect>(
        (e: Pick<IProductos, 'idCodigo' | 'descripcionMer'>) => ({
          id: e.idCodigo.toLowerCase(),
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
}
</script>
