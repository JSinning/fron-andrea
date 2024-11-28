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
            <th>Transportador</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-500">
            <td>
              <input
                type="text"
                class="input"
                v-model="ItercTransportAdd.idTransport"
                maxlength="5"
              />
            </td>
            <td>
              <input
                type="text"
                class="input"
                v-model="ItercTransportAdd.descripTrans"
                maxlength="40"
              />
            </td>
          </tr>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblTercTransport"
            :key="d.idTransport"
            @click="
              () => {
                ItercTransportEdit = d;
                id = d.idTransport;
              }
            "
          >
            <template v-if="d.idTransport === ItercTransportEdit.idTransport">
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="ItercTransportEdit.idTransport"
                  maxlength="5"
                  @change="updateTercTransport"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="ItercTransportEdit.descripTrans"
                  maxlength="40"
                  @change="updateTercTransport"
                />
              </td>
            </template>
            <template v-else>
              <td class="text-center">{{ d.idTransport }}</td>
              <td class="text-center">{{ d.descripTrans }}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <ButtonPagination
      :key="0"
      :currentPagination="pagination"
      :currentDataLength="tblTercTransport.length"
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
import { captureException } from '@sentry/browser';
import RepartoAPI from '@/remote/api/reparto/repartoAPI';
import { ITercTransport } from '@/remote/api/reparto/types';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
  },
  name: 'TercTranspor',
})
export default class TercTranspor extends Vue {
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

  private ItercTransportEdit: ITercTransport = {
    descripTrans: '',
    idTransport: '',
  };

  private ItercTransportAdd: ITercTransport = {
    descripTrans: '',
    idTransport: '',
  };

  private tblTercTransport: ITercTransport[] = [];

  private repartoApi = new RepartoAPI(this.$store.getters.getAuthToken);

  private async mounted() {
    await this.fetchData();
  }

  private async save() {
    if (this.validateData(this.ItercTransportAdd)) {
      return;
    }
    await this.addTercTransport();
  }

  private async addTercTransport() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.tercTransport.postTransport({
        ...this.ItercTransportAdd,
      });
      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }
      await this.fetchData();
      this.ItercTransportAdd = {
        descripTrans: '',
        idTransport: '',
      };
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async updateTercTransport() {
    if (this.validateData(this.ItercTransportEdit)) {
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.repartoApi.tercTransport.puTercTransport(
        { ...this.ItercTransportEdit },
        this.id,
      );
      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }
      await this.fetchData();
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
      const response = await this.repartoApi.tercTransport.getTercTransport(
        this.pagination,
      );
      this.tblTercTransport = response.data;
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private validateData(data: ITercTransport): boolean {
    if (!data.idTransport) {
      this.output = {
        isError: true,
        message: 'El codigo de no puede ser vacio',
      };
      return true;
    }
    if (!data.descripTrans) {
      this.output = {
        isError: true,
        message: 'El Transportador no puede ser vacio',
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
