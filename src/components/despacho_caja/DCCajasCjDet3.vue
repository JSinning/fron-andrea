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

    <div class="md:w-1/2 px-3 mb-6 md:mb-0">
      <button class="btn-save" v-if="!viewAddRegistro" @click="save">
        Adicionar a la tabla
      </button>
    </div>
    <div class="card-table">
      <table class="table-fixed w-full text-xs">
        <thead>
          <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
            <th class="md:w-2/12">Concepto</th>
            <th>Unidades</th>
            <th>Peso</th>
            <th>Anular</th>
            <th>Motivo Anulacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!viewAddRegistro">
            <td>
              <PaginatedSelect
                v-model="IdCCajaCjDet3Add.idConce"
                :fetch="concepto"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdCCajaCjDet3Add.unidConc"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdCCajaCjDet3Add.pesoConc"
              />
            </td>
            <td class="text-center">
              <input
                type="checkbox"
                class="checkBox"
                v-model="IdCCajaCjDet3Add.anulaC"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdCCajaCjDet3Add.motivoAnu"
              />
            </td>
          </tr>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblDCjDespacCajaDet3"
            :key="d.autoNum"
            @click="IdCCajaCjDet3Edit = d"
          >
            <template
              v-if="IdCCajaCjDet3Edit.autoNum === d.autoNum && !readonly"
            >
              <td>
                <PaginatedSelect
                  v-model="IdCCajaCjDet3Edit.idConce"
                  @change="updateDCCajaCjDet3"
                  :fetch="concepto"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdCCajaCjDet3Edit.unidConc"
                  @change="updateDCCajaCjDet3"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdCCajaCjDet3Edit.pesoConc"
                  @change="updateDCCajaCjDet3"
                />
              </td>
              <td class="text-center">
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="IdCCajaCjDet3Edit.anulaC"
                  @change="updateDCCajaCjDet3"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdCCajaCjDet3Edit.motivoAnu"
                  @change="updateDCCajaCjDet3"
                />
              </td>
            </template>
            <template v-else>
              <td>
                <PaginatedSelect
                  v-model="d.idConce"
                  :fetch="concepto"
                  disabled
                />
              </td>
              <td class="text-center">{{ d.unidConc }}</td>
              <td class="text-center">{{ $convertToDecimal(d.pesoConc) }}</td>
              <td class="text-center">{{ $booleanToString(d.anulaC) }}</td>
              <td class="text-center">{{ d.motivoAnu }}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <ButtonPagination
      :key="consecTip"
      :currentPagination="pagination"
      :currentDataLength="tblDCjDespacCajaDet3.length"
      @click="loadMore"
    >
      Cargar más
    </ButtonPagination>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '../reusable/AlertBox.vue';
import Loader from '../reusable/Loader.vue';
import PaginatedSelect from '../reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import { captureException } from '@sentry/browser';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import {
  IConcepto,
  ITblDCjDespacCajaDet3,
  TblDCjDespacCajaDet3,
} from '@/remote/api/despacho_caja/types';
import moment from 'moment';
import convertDate from '@/utils/convertDate';
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
  name: 'DCCajasCjDet3',
})
export default class DCCajasCjDet3 extends Vue {
  @Prop(Number) public consecTip: number;
  @Prop(Boolean) public readonly: boolean;
  @Prop(Boolean) public viewAddRegistro: boolean;
  private isLoading: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private output = {
    isError: false,
    message: '',
  };

  private IdCCajaCjDet3Add: ITblDCjDespacCajaDet3 = {
    anulaC: false,
    consecTip: 0,
    fechaG: '',
    idConce: 0,
    pesoConc: 0.0,
    unidConc: 0,
  };

  private IdCCajaCjDet3Edit: ITblDCjDespacCajaDet3 = {
    anulaC: false,
    consecTip: 0,
    fechaG: '',
    idConce: 0,
    pesoConc: 0.0,
    unidConc: 0,
  };

  private tblDCjDespacCajaDet3: TblDCjDespacCajaDet3 = [];

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.fetchData(this.consecTip);
  }

  private async save() {
    if (this.validateData()) {
      return;
    }
    this.IdCCajaCjDet3Add.consecTip = this.consecTip;
    await this.addDCCajaCjDet3();
  }

  private async updateDCCajaCjDet3() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCCajaCjDet3.put(
        this.consecTip,
        this.IdCCajaCjDet3Edit.autoNum,
        {
          ...this.IdCCajaCjDet3Edit,
          fechaG: convertDate(this.IdCCajaCjDet3Edit.fechaG),
        },
      );

      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async addDCCajaCjDet3() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCCajaCjDet3.post({
        ...this.IdCCajaCjDet3Add,
        fechaG: moment().utc().format('YYYY-MM-DD'),
      });

      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }

      await this.fetchData(this.consecTip);

      this.IdCCajaCjDet3Add = {
        anulaC: false,
        consecTip: 0,
        fechaG: '',
        idConce: 0,
        pesoConc: 0.0,
        unidConc: 0,
      };
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchData(consecTip: number) {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCCajaCjDet3.get(
        consecTip,
        this.pagination,
      );
      this.tblDCjDespacCajaDet3 = response.data;
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
        response = await this.despachoCajaApi.getIdconcesDCCajaCjDet3(p);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IConcepto, 'idConcepDC' | 'descripcionDC'>) => ({
            id: e.idConcepDC,
            item: e.descripcionDC,
          }),
        );
      }
      response = await this.despachoCajaApi.getIdconcesDCCajaCjDet3(p);
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
    await this.fetchData(this.consecTip);
  }

  private validateData(): boolean {
    if (!this.consecTip) {
      this.output = {
        isError: true,
        message: 'Consectip no fue digitado',
      };
      return true;
    }
    return false;
  }
}
</script>
