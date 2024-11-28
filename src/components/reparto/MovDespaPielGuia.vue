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
            <th class="md:w-2/12">Guia No</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-500" v-if="!viewAddRegistro">
            <td style="visibility: collapse; display: none">
              {{ ImovDespaPielGuia.idNDespacho }}
            </td>
            <td>
              <PaginatedSelect
                v-model="ImovDespaPielGuia.nGuia"
                :fetch="fetchNGuia"
              />
            </td>
          </tr>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblMovDespaPielGuia"
            :key="d.auton"
            @click="ImovDespaPielGuiaEdit = d"
          >
            <template v-if="d.auton === ImovDespaPielGuiaEdit.auton">
              <td style="visibility: collapse; display: none">
                {{ d.idNDespacho }}
              </td>
              <td>
                <PaginatedSelect
                  v-model="ImovDespaPielGuiaEdit.nGuia"
                  :fetch="fetchNGuia"
                  @change="updateMovDespaPielGuia"
                />
              </td>
            </template>
            <template v-else>
              <td style="visibility: collapse; display: none">
                {{ d.idNDespacho }}
              </td>
              <td>
                <PaginatedSelect
                  v-model="d.nGuia"
                  :fetch="fetchNGuia"
                  disabled
                />
              </td>
            </template>
          </tr>
        </tbody>
      </table>
      <ButtonPagination
        :key="idNDespacho"
        :currentPagination="pagination"
        :currentDataLength="tblMovDespaPielGuia.length"
        @click="loadMore"
      >
        Cargar más
      </ButtonPagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import ButtonPagination from '@/components/reusable/ButtonPagination.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';
import { IMovDespaPielGuia, INGuiaOptions } from '@/remote/api/reparto/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { captureException } from '@sentry/browser';
import RepartoAPI from '@/remote/api/reparto/repartoAPI';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'MovDespaPielGuia',
})
export default class MovDespaPielGuia extends Vue {
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

  private ImovDespaPielGuia: IMovDespaPielGuia = {
    idNDespacho: 0,
    nGuia: 0,
  };

  private ImovDespaPielGuiaEdit: IMovDespaPielGuia = {
    auton: 0,
    idNDespacho: 0,
    nGuia: 0,
  };

  private tblMovDespaPielGuia: IMovDespaPielGuia[] = [];

  private repartoApi = new RepartoAPI(this.$store.getters.getAuthToken);

  private async mounted() {
    await this.fetchData(this.idNDespacho);
  }

  private async save() {
    this.ImovDespaPielGuia.idNDespacho = this.idNDespacho;
    if (this.validateData(this.ImovDespaPielGuia)) {
      return;
    }
    await this.addMovDespaPielGuia();
  }

  private async addMovDespaPielGuia() {
    this.isLoading = true;
    try {
      const response =
        await this.repartoApi.movDespaPielGuia.postMovDespaPielGuia({
          ...this.ImovDespaPielGuia,
        });
      if (response.data === 200) {
        this.output = { isError: false, message: response.message };
      }
      await this.fetchData(this.idNDespacho);
      this.ImovDespaPielGuia.nGuia = 0;
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async updateMovDespaPielGuia() {
    this.isLoading = true;
    try {
      const response =
        await this.repartoApi.movDespaPielGuia.putMovDespaPielGuia(
          { ...this.ImovDespaPielGuiaEdit },
          this.ImovDespaPielGuiaEdit.idNDespacho,
          this.ImovDespaPielGuiaEdit.auton,
        );

      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }
      this.ImovDespaPielGuiaEdit.auton = 0;
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
      const response =
        await this.repartoApi.movDespaPielGuia.getMovDespaPielGuia(
          idNDespacho,
          this.pagination,
        );
      this.tblMovDespaPielGuia = response.data;
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchNGuia(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<INGuiaOptions, 'nGuia' | 'tercero'>>
      >;
      if (q.query) {
        response =
          await this.repartoApi.movDespaPielGuia.getNGuiaOptionsFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<INGuiaOptions, 'nGuia' | 'tercero'>) => ({
            id: e.nGuia,
            item: e.nGuia,
          }),
        );
      }
      response = await this.repartoApi.movDespaPielGuia.getNGuiaOptions(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<INGuiaOptions, 'nGuia' | 'tercero'>) => ({
          id: e.nGuia,
          item: e.nGuia,
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

  private validateData(data: IMovDespaPielGuia): boolean {
    if (!this.idNDespacho) {
      this.output = { isError: true, message: 'El id no puede ser vacio' };
      return true;
    }
    if (!data.nGuia) {
      this.output = { isError: true, message: 'Elija un nguia para continuar' };
      return true;
    }
    return false;
  }
}
</script>
