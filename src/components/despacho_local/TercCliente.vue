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
  <div>
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
    <div class="main-div mb-2">
      <div class="md:w-1/2 px-3 mb-6 md:mb-0">
        <button class="btn-save" @click="save">Adicionar a la tabla</button>
      </div>
      <div class="card-table">
        <table class="table-fixed w-full text-xs">
          <thead>
            <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
              <th>Codigo</th>
              <th>Cliente</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="ItercCliente.codTerc"
                  maxlength="3"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="ItercCliente.codCliente"
                  :fetch="clientes"
                />
              </td>
            </tr>
            <tr
              class="border-b border-gray-500"
              v-for="d in tblTercCliente"
              :key="d.id"
              @click="ItercClienteEdit = d"
            >
              <template v-if="d.id === ItercClienteEdit.id">
                <td class="text-center">
                  <input
                    type="text"
                    class="input"
                    v-model="ItercClienteEdit.codTerc"
                    @change="updateTercCliente"
                    maxlength="3"
                  />
                </td>
                <td>
                  <PaginatedSelect
                    v-model="ItercClienteEdit.codCliente"
                    :fetch="clientes"
                    @change="updateTercCliente"
                  />
                </td>
              </template>
              <template v-else>
                <td class="text-center">{{ d.codTerc }}</td>
                <td>
                  <PaginatedSelect
                    v-model="d.codCliente"
                    :fetch="clientes"
                    disabled
                  />
                </td>
              </template>
            </tr>
          </tbody>
        </table>
        <ButtonPagination
          :currentPagination="pagination"
          :currentDataLength="tblTercCliente.length"
          @click="loadMore"
        >
          Cargar más
        </ButtonPagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '../reusable/AlertBox.vue';
import Loader from '../reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import { captureException } from '@sentry/browser';
import DespachoLocalApi from '@/remote/api/despacho_local/despachoLocalApi';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import {
  ClientesTerc,
  IClientesTerc,
  ITercCliente,
} from '@/remote/api/despacho_local/types';
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
  name: 'TercCliente',
})
export default class TercCliente extends Vue {
  private isLoading: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private output = {
    isError: false,
    message: '',
  };

  private tblTercCliente: Array<ITercCliente & { id: string }> = [];

  private ItercClienteEdit: ITercCliente & { id: string } = {
    codCliente: '',
    codTerc: '',
    id: '',
  };
  private ItercCliente: ITercCliente = {
    codCliente: '',
    codTerc: '',
  };
  private despachoLocalApi = new DespachoLocalApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.fetchData();
  }

  private async save() {
    if (this.validateData(this.ItercCliente)) {
      return;
    }

    await this.addTercCliente();
    this.ItercCliente = {
      codCliente: '',
      codTerc: '',
    };
  }

  private async addTercCliente() {
    this.isLoading = true;
    try {
      const response = await this.despachoLocalApi.tercCliente.post({
        ...this.ItercCliente,
      });

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

  private async updateTercCliente() {
    this.isLoading = true;
    try {
      let splitted = this.ItercClienteEdit.id.split(/\.|-|,/g);
      const response = await this.despachoLocalApi.tercCliente.put(
        {
          ...this.ItercClienteEdit,
        },
        splitted[0],
        splitted[1],
      );

      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }
      await this.fetchData();
      this.ItercClienteEdit.id = '';
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

  private async fetchData() {
    this.isLoading = true;
    try {
      const response = await this.despachoLocalApi.tercCliente.get(
        this.pagination,
      );
      this.tblTercCliente = response.data.map((item, i) => ({
        ...item,
        id: [`${item.codTerc}-${item.codCliente}`, i].join('.'),
      }));
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async clientes(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<ClientesTerc>;
      if (q.query) {
        response = await this.despachoLocalApi.getClientesTercClientFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IClientesTerc, 'codiCliente' | 'expr2'>) => ({
            id: e.codiCliente,
            item: e.expr2,
          }),
        );
      }
      response = await this.despachoLocalApi.getClientesTercClient(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IClientesTerc, 'codiCliente' | 'expr2'>) => ({
          id: e.codiCliente,
          item: e.expr2,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    }
  }

  private async loadMore() {
    this.pagination.limit += 100;
    await this.fetchData();
  }

  private validateData(data: ITercCliente): boolean {
    if (!data.codTerc) {
      this.output = {
        isError: true,
        message: 'El codigo del cliente no puede estar vacion',
      };
      return true;
    }
    if (!data.codCliente) {
      this.output = { isError: true, message: 'Seleccione un cliente' };
      return true;
    }
    return false;
  }
}
</script>
