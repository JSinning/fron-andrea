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
            <th style="visibility: collapse; display: none">IDNDespacho</th>
            <th style="visibility: collapse; display: none">Auton</th>
            <th class="md:w-2/12">Terceros</th>
            <th>Unidades</th>
            <th>Kilos</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-500" v-if="!viewAddRegistro">
            <td style="visibility: collapse; display: none">
              {{ ImovDespaPielDt2.idNDespacho }}
            </td>
            <td style="visibility: collapse; display: none">
              {{ ImovDespaPielDt2.auton }}
            </td>
            <td>
              <PaginatedSelect
                v-model="ImovDespaPielDt2.codPiel"
                :fetch="codigoPieles"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="ImovDespaPielDt2.cantPiel"
                maxlength="2"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="ImovDespaPielDt2.cantPielKl"
                maxlength="4"
              />
            </td>
            <td class="text-center">
              <input
                type="date"
                class="input"
                v-model="ImovDespaPielDt2.fechaR"
              />
            </td>
          </tr>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblDespaPielDt2"
            :key="d.auton"
            @click="selectMovDespaPiel(d)"
          >
            <template
              v-if="d.auton === ImovDespaPielDt2Edit.auton && !readonly"
            >
              <td style="visibility: collapse; display: none">
                {{ ImovDespaPielDt2Edit.idNDespacho }}
              </td>
              <td style="visibility: collapse; display: none">
                {{ ImovDespaPielDt2Edit.auton }}
              </td>
              <td>
                <PaginatedSelect
                  v-model="ImovDespaPielDt2Edit.codPiel"
                  :fetch="codigoPieles"
                  @change="updateMovDespaPielDt2"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="ImovDespaPielDt2Edit.cantPiel"
                  maxlength="2"
                  @change="updateMovDespaPielDt2"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="ImovDespaPielDt2Edit.cantPielKl"
                  @change="updateMovDespaPielDt2"
                  maxlength="4"
                />
              </td>
              <td class="text-center">
                <input
                  type="date"
                  class="input"
                  v-model="ImovDespaPielDt2Edit.fechaR"
                  @change="updateMovDespaPielDt2"
                />
              </td>
            </template>
            <template v-else>
              <td style="visibility: collapse; display: none">
                {{ d.idNDespacho }}
              </td>
              <td style="visibility: collapse; display: none">{{ d.auton }}</td>
              <td>
                <PaginatedSelect
                  v-model="d.codPiel"
                  :fetch="codigoPieles"
                  disabled
                />
              </td>
              <td class="text-center">{{ $convertToDecimal(d.cantPiel) }}</td>
              <td class="text-center">{{ $convertToDecimal(d.cantPielKl) }}</td>
              <td class="text-center">{{ $convertDate(d.fechaR) }}</td>
            </template>
          </tr>
        </tbody>
      </table>
      <ButtonPagination
        :key="idNDespacho"
        :currentPagination="pagination"
        :currentDataLength="tblDespaPielDt2.length"
        @click="loadMore"
      >
        Cargar más
      </ButtonPagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IPagination from '../../types/IPagination';
import AlertBox from '@/components/reusable/AlertBox.vue';
import ButtonPagination from '@/components/reusable/ButtonPagination.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import RepartoAPI from '@/remote/api/reparto/repartoAPI';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';
import { ICodigoPiel, IMovDespaPielDt2 } from '@/remote/api/reparto/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { captureException } from '@sentry/browser';
import convertDate from '@/utils/convertDate';
import moment from 'moment';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'MovDespaPielDt2',
})
export default class MovDespaPielDt2 extends Vue {
  @Prop(Number) public idNDespacho: number;
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

  private ImovDespaPielDt2: IMovDespaPielDt2 = {
    cantPiel: 0,
    cantPielKl: 0,
    codPiel: '',
    idNDespacho: 0,
  };

  private ImovDespaPielDt2Edit: IMovDespaPielDt2 = {
    cantPiel: 0,
    cantPielKl: 0,
    codPiel: '',
    idNDespacho: 0,
  };

  private tblDespaPielDt2: IMovDespaPielDt2[] = [];

  private repartoApi = new RepartoAPI(this.$store.getters.getAuthToken);

  private async mounted() {
    await this.fetchData(this.idNDespacho);
  }

  private selectMovDespaPiel(d: IMovDespaPielDt2) {
    this.ImovDespaPielDt2Edit = d;
    this.ImovDespaPielDt2Edit.fechaR = convertDate(
      this.ImovDespaPielDt2Edit.fechaR,
    );
  }

  private async save() {
    this.ImovDespaPielDt2.idNDespacho = this.idNDespacho;
    if (this.validateData(this.ImovDespaPielDt2)) {
      return;
    }
    await this.addMovDespaPielDt2();
    await this.fetchData(this.idNDespacho);
  }

  private async addMovDespaPielDt2() {
    this.isLoading = true;
    try {
      const response =
        await this.repartoApi.movDespaPielDt2.postMovDespaPielDt2({
          ...this.ImovDespaPielDt2,
          fechaR: moment().utc().format('YYYY-MM-DD'),
        });
      this.ImovDespaPielDt2 = {
        cantPiel: 0,
        cantPielKl: 0,
        codPiel: '',
        idNDespacho: 0,
      };
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async updateMovDespaPielDt2() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.movDespaPielDt2.putMovDespaPielDt2(
        this.ImovDespaPielDt2Edit.idNDespacho,
        this.ImovDespaPielDt2Edit.auton,
        {
          ...this.ImovDespaPielDt2Edit,
          fechaR: convertDate(this.ImovDespaPielDt2Edit.fechaR),
        },
      );
      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }
      this.ImovDespaPielDt2Edit.auton = 0;
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchData(idNDespacho: number) {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.movDespaPielDt2.getMovDespaPielDt2(
        idNDespacho,
        this.pagination,
      );

      this.tblDespaPielDt2 = response.data;
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async codigoPieles(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<ICodigoPiel, 'codProve' | 'codPieles'>>
      >;
      if (q.query) {
        response = await this.repartoApi.movDespaPielDt2.getCodigoPielFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ICodigoPiel, 'codProve' | 'codPieles'>) => ({
            id: e.codProve,
            item: e.codPieles,
          }),
        );
      }
      response = await this.repartoApi.movDespaPielDt2.getCodigoPiel(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<ICodigoPiel, 'codProve' | 'codPieles'>) => ({
          id: e.codProve,
          item: e.codPieles,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    }
  }

  private async loadMore() {
    this.pagination.limit += this.pagination.limit;
    await this.fetchData(this.idNDespacho);
  }

  private validateData(data: IMovDespaPielDt2): boolean {
    if (!this.idNDespacho) {
      this.output = { isError: true, message: 'El id no puede ser vacio' };
      return true;
    }
    if (!data.codPiel) {
      this.output = {
        isError: true,
        message: 'El codigo Piel no puede ser vacio',
      };
      return true;
    }
    if (!data.cantPiel) {
      this.output = { isError: true, message: 'La  cantidad no puede vacia' };
      return true;
    }
    if (!data.cantPielKl) {
      this.output = { isError: true, message: 'el kilo no puede ser vacio' };
      return true;
    }
    return false;
  }
}
</script>
