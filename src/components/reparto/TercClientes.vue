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
            <th>Cliente</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-500">
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="ItercClienteAdd.codTerc"
                maxlength="3"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="ItercClienteAdd.codCliente"
                :fetch="clientes"
              />
            </td>
          </tr>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblTercCliente"
            :key="d.id"
            @click="
              () => {
                ItercClienteEdit = d;
                codTerc = d.codTerc;
                codCliente = d.codCliente;
              }
            "
          >
            <template v-if="d.id === ItercClienteEdit.id">
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="ItercClienteEdit.codTerc"
                  maxlength="3"
                  @change="updateTercCliente"
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
            <template v-else
              ><td class="text-center">{{ d.codTerc }}</td>
              <td>
                <PaginatedSelect
                  v-model="d.codCliente"
                  :fetch="clientes"
                  disabled
                /></td
            ></template>
          </tr>
        </tbody>
      </table>
    </div>
    <ButtonPagination
      :key="0"
      :currentPagination="pagination"
      :currentDataLength="tblTercCliente.length"
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
import { BaseResponse } from '@/types';
import { IClientes, IMesa, ITercClientes } from '@/remote/api/reparto/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import RepartoAPI from '@/remote/api/reparto/repartoAPI';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'TercClientes',
})
export default class TercClientes extends Vue {
  private isLoading: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private output = {
    isError: false,
    message: '',
  };

  private codCliente: string = '';
  private codTerc: string = '';

  private ItercClienteEdit: ITercClientes & { id: string } = {
    codCliente: '',
    codTerc: '',
    id: '',
  };

  private ItercClienteAdd: ITercClientes = {
    codCliente: '',
    codTerc: '',
  };

  private tblTercCliente: Array<ITercClientes & { id: string }> = [];

  private repartoApi = new RepartoAPI(this.$store.getters.getAuthToken);

  private async mounted() {
    await this.fetchData();
  }

  private async save() {
    if (this.validateData(this.ItercClienteAdd)) {
      return;
    }
    await this.addTercCliente();
  }

  private async addTercCliente() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.tercCliente.postTercCliente(
        { ...this.ItercClienteAdd },
        this.ItercClienteAdd.codTerc,
        this.ItercClienteAdd.codCliente,
      );

      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }
      this.ItercClienteAdd = {
        codCliente: '',
        codTerc: '',
      };
      await this.fetchData();
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async updateTercCliente() {
    if (this.validateData(this.ItercClienteEdit)) {
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.repartoApi.tercCliente.putTercCliente(
        { ...this.ItercClienteEdit },
        this.codTerc,
        this.codCliente,
      );

      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }
      await this.fetchData();
      this.codCliente = '';
      this.codTerc = '';
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
      const response = await this.repartoApi.tercCliente.getTercClientes(
        this.pagination,
      );
      this.tblTercCliente = response.data.map((item, i) => ({
        ...item,
        id: [item.codTerc, i].join('.'),
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
      let response: BaseResponse<
        Array<Pick<IClientes, 'codiCliente' | 'expr2' | 'nitCliente'>>
      >;
      if (q.query) {
        response = await this.repartoApi.tercCliente.getClientesFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IClientes, 'codiCliente' | 'expr2' | 'nitCliente'>) => ({
            id: e.codiCliente,
            item: [e.expr2, e.codiCliente, e.nitCliente].join(' - '),
          }),
        );
      }
      response = await this.repartoApi.tercCliente.getClientes(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IClientes, 'codiCliente' | 'expr2' | 'nitCliente'>) => ({
          id: e.codiCliente,
          item: [e.expr2, e.codiCliente, e.nitCliente].join(' - '),
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    }
  }

  private validateData(data: ITercClientes): boolean {
    if (!data.codTerc) {
      this.output = {
        isError: true,
        message: 'El codigo del usuario no puede ser vacio',
      };
      return true;
    }
    if (!data.codCliente) {
      this.output = {
        isError: true,
        message: 'El codigo del cliente no puede ser vacio',
      };
      return;
    }
    return false;
  }

  private async loadMore() {
    this.pagination.limit += this.pagination.limit;
    await this.fetchData();
  }
}
</script>
