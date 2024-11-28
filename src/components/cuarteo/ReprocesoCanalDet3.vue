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
          <th>Cod-Canal</th>
          <th>Cod-Cuarteo</th>
          <th class="md:w-3/12">Descripción</th>
          <th>Kilos Canal</th>
          <th>kilos Cuarteo</th>
          <th>Estado</th>
          <th>Guia No</th>
          <th>N-Anim</th>
          <th>L-Anim</th>
          <th style="visibility: collapse; display: none">Diferencia</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b border-gray-500"
          v-for="d in tblReprocesoCanalDt3"
          :key="d.id"
          @click="
            () => {
              IreprocesoCanalDt3Edit = d;
            }
          "
        >
          <template v-if="d.id === IreprocesoCanalDt3Edit.id && !readonly">
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt3Edit.princip"
                @change="updateReprocesoCanalDt3"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt3Edit.secund"
                @change="updateReprocesoCanalDt3"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="IreprocesoCanalDt3Edit.secund"
                :fetch="productosSecund"
                @change="updateReprocesoCanalDt3"
              ></PaginatedSelect>
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt3Edit.kPrinci"
                @change="updateReprocesoCanalDt3"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt3Edit.kSecund"
                @change="updateReprocesoCanalDt3"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt3Edit.estad"
                @change="updateReprocesoCanalDt3"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt3Edit.guiaNo"
                @change="updateReprocesoCanalDt3"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt3Edit.nAnima"
                @change="updateReprocesoCanalDt3"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt3Edit.ladoAni"
                @change="updateReprocesoCanalDt3"
              />
            </td>
          </template>
          <template v-else>
            <td class="text-center">{{ d.princip }}</td>
            <td class="text-center">{{ d.secund }}</td>
            <td class="text-center">
              <PaginatedSelect
                v-model="d.secund"
                :fetch="productosSecund"
                disabled
              ></PaginatedSelect>
            </td>
            <td class="text-center">{{ $convertToDecimal(d.kPrinci) }}</td>
            <td class="text-center">{{ $convertToDecimal(d.kSecund) }}</td>
            <td class="text-center">{{ d.estad }}</td>
            <td class="text-center">{{ d.guiaNo }}</td>
            <td class="text-center">{{ d.nAnima }}</td>
            <td class="text-center">{{ d.ladoAni }}</td>
          </template>
        </tr>
      </tbody>
    </table>
    <ButtonPagination
      @click="loadMore"
      :key="reprocesoNo"
      :currentPagination="pagination"
      :currentDataLength="tblReprocesoCanalDt3.length"
    >
      Cargar más
    </ButtonPagination>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import {
  IProductosSecund,
  IReprocesoCanalDt3,
  ProductosSecund,
} from '@/remote/api/cuarteo/types';
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
import IPagination from '@/types/IPagination';
import * as Sentry from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
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
  name: 'ReprocesoCanalDet3',
})
export default class ReprocesoCanalDet3 extends Vue {
  @Prop(Number) public reprocesoNo: number;
  @Prop(Boolean) public readonly: boolean;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };

  private tblReprocesoCanalDt3: Array<IReprocesoCanalDt3 & { id: string }> = [];

  private IreprocesoCanalDt3Edit: IReprocesoCanalDt3 & { id: string } = {
    autoNum: 0,
    difer: 0,
    estad: '',
    guiaNo: 0,
    id: '',
    kPrinci: 0,
    kSecund: 0,
    ladoAni: '',
    nAnima: 0,
    princip: '',
    reprocesoNo: 0,
    secund: '',
  };

  private cuarteoApi = new CuarteoApi(this.$store.getters.getAuthToken);

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private clearOutput() {
    this.output = '';
  }

  private async mounted() {
    await this.fetchData(this.reprocesoNo);
  }

  private async updateReprocesoCanalDt3() {
    if (!this.reprocesoNo) {
      this.showOutput(true, 'El No del proceso no pude ser cero');
      return;
    }
    this.IreprocesoCanalDt3Edit.kPrinci = Number.parseFloat(
      this.IreprocesoCanalDt3Edit.kPrinci.toString(),
    );
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.putReprocesoCanalDt3(
        this.IreprocesoCanalDt3Edit,
        this.IreprocesoCanalDt3Edit.reprocesoNo,
        this.IreprocesoCanalDt3Edit.autoNum,
      );
      this.IreprocesoCanalDt3Edit.id = '';
      await this.fetchData(this.reprocesoNo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, e.message);
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  private async productosSecund(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<ProductosSecund>;
    if (q.query) {
      response = await this.cuarteoApi.getProductosSecondFind(q);
      return response.data.map<IInterfaceSelect>((e: IProductosSecund) => ({
        id: e.idCodigo,
        item: e.descripcionMer,
      }));
    }
    response = await this.cuarteoApi.getProductosSecond(p);
    return response.data.map<IInterfaceSelect>((e: IProductosSecund) => ({
      id: e.idCodigo,
      item: e.descripcionMer,
    }));
  }

  private async fetchData(reprocesoNo: number) {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.getReprocesoCanalDt3(
        reprocesoNo,
        this.pagination,
      );
      this.tblReprocesoCanalDt3 = response.data.map((item, i) => ({
        ...item,
        id: [item.autoNum, i].join('.'),
      }));
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
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
