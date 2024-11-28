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
      <button class="btn-save" @click="save">Adicionar a la tabla</button>
    </div>
    <div class="card-table">
      <table class="table-fixed w-full text-xs">
        <thead>
          <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
            <th>Codigo</th>
            <th>Proveedor</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-500">
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="ItercPielesAdd.codPieles"
                maxlength="2"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="ItercPielesAdd.codProve"
                :fetch="fetchPorveedor"
              />
            </td>
          </tr>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblTercPieles"
            :key="d.codPieles"
            @click="
              () => {
                ItercPielesEdit = d;
                id = d.codPieles;
              }
            "
          >
            <template v-if="d.codPieles === ItercPielesEdit.codPieles">
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="ItercPielesEdit.codPieles"
                  maxlength="2"
                  @change="updateTercPieles"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="ItercPielesEdit.codProve"
                  :fetch="fetchPorveedor"
                  @change="updateTercPieles"
                />
              </td>
            </template>
            <template v-else>
              <td class="text-center">{{ d.codPieles }}</td>
              <td>
                <PaginatedSelect
                  v-model="d.codProve"
                  :fetch="fetchPorveedor"
                  disabled
                />
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <ButtonPagination
      :key="0"
      :currentPagination="pagination"
      :currentDataLength="tblTercPieles.length"
      @click="loadMore"
    >
      Cargar más
    </ButtonPagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import IPagination from '@/types/IPagination';
import AlertBox from '@/components/reusable/AlertBox.vue';
import ButtonPagination from '@/components/reusable/ButtonPagination.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IQuery from '@/types/query';
import { captureException } from '@sentry/browser';
import RepartoAPI from '@/remote/api/reparto/repartoAPI';
import { IProveedor, ITercPieles } from '@/remote/api/reparto/types';
import { BaseResponse } from '@/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'TercPieles',
})
export default class TercPieles extends Vue {
  private isLoading: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private output = {
    isError: false,
    message: '',
  };

  private id: string = '';

  private ItercPielesEdit: ITercPieles = {
    codPieles: '',
    codProve: '',
  };

  private ItercPielesAdd: ITercPieles = {
    codPieles: '',
    codProve: '',
  };

  private tblTercPieles: ITercPieles[] = [];

  private repartoApi = new RepartoAPI(this.$store.getters.getAuthToken);

  private async mounted() {
    await this.fetchData();
  }

  private async save() {
    if (this.validateData(this.ItercPielesAdd)) {
      return;
    }

    await this.addTercPieles();
  }

  private async addTercPieles() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.tercPieles.postTercPieles({
        ...this.ItercPielesAdd,
      });
      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }
      await this.fetchData();
      this.ItercPielesAdd = {
        codPieles: '',
        codProve: '',
      };
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async updateTercPieles() {
    if (this.validateData(this.ItercPielesEdit)) {
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.repartoApi.tercPieles.putTercPieles(
        { ...this.ItercPielesEdit },
        this.id,
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

  private async fetchData() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.tercPieles.getTercPieles(
        this.pagination,
      );
      this.tblTercPieles = response.data;
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchPorveedor(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<IProveedor, 'codProveedor' | 'expr1' | 'nit'>>
      >;
      if (q.query) {
        response = await this.repartoApi.tercPieles.getProveedoresFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IProveedor, 'codProveedor' | 'expr1' | 'nit'>) => ({
            id: e.codProveedor,
            item: [e.expr1, e.codProveedor, e.nit].join(' - '),
          }),
        );
      }
      response = await this.repartoApi.tercPieles.getProveedores(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IProveedor, 'codProveedor' | 'expr1' | 'nit'>) => ({
          id: e.codProveedor,
          item: [e.expr1, e.codProveedor, e.nit].join(' - '),
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    }
  }

  private validateData(data: ITercPieles): boolean {
    if (!data.codPieles) {
      this.output = {
        isError: true,
        message: 'El codigo del proveedor no puede ser vacío',
      };
      return true;
    }
    if (!data.codProve) {
      this.output = {
        isError: true,
        message: 'El proveedor no puede estar vacío',
      };
      return true;
    }
    return false;
  }

  private async loadMore() {
    this.pagination.limit += this.pagination.limit;
    await this.fetchData();
  }
}
</script>
