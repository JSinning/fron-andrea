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
      <button class="btn-save" @click="save" v-if="!viewAddRegistro">
        Adicionar a la tabla
      </button>
    </div>
    <div class="card-table">
      <table class="table-fixed w-full text-xs">
        <thead>
          <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
            <th style="visibility: collapse; display: none">Id pesaje</th>
            <th>Pedido</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-500" v-if="!viewAddRegistro">
            <td style="visibility: collapse; display: none">
              {{ dCControlVehPdAdd.idPesaje }}
            </td>
            <td>
              <PaginatedSelect
                v-model="dCControlVehPdAdd.idPedido"
                :fetch="idPedido"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="dCControlVehPdAdd.observac"
              />
            </td>
          </tr>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblDCControlVeh"
            :key="d.id"
            @click="dCControlVehPdEdit = d"
          >
            <template v-if="dCControlVehPdEdit.id === d.id && !readonly">
              <td style="visibility: collapse; display: none">
                {{ dCControlVehPdEdit.idPesaje }}
              </td>
              <td>
                <PaginatedSelect
                  v-model="dCControlVehPdEdit.idPedido"
                  :fetch="idPedido"
                  @change="updateVehPed"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="dCControlVehPdEdit.observac"
                  @change="updateVehPed"
                />
              </td>
            </template>
            <template v-else>
              <td style="visibility: collapse; display: none">
                {{ d.idPesaje }}
              </td>
              <td>
                <PaginatedSelect v-model="d.idPedido" :fetch="idPedido" />
              </td>
              <td class="text-center">{{ d.observac }}</td>
            </template>
          </tr>
        </tbody>
      </table>
      <ButtonPagination
        :key="idPesaje"
        :currentPagination="pagination"
        :currentDataLength="tblDCControlVeh.length"
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
import Loader from '@/components/reusable/Loader.vue';
import Modals from '@/components/reusable/Modals.vue';
import IPagination from '@/types/IPagination';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import ButtonPagination from '../reusable/ButtonPagination.vue';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import { captureException } from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import {
  ICiudades,
  IIdPedidoControlVeh,
} from '@/remote/api/despacho_caja/types';
import { ITblDCjControlVdPed } from '@/remote/api/despacho_caja/types/ITblDCjControlVdPed';
import { BaseResponse } from '@/types';
import IQuery from '@/types/query';
@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'DCControlVehDPed',
})
export default class DCControlVehDPed extends Vue {
  @Prop(Number) public readonly idPesaje: number = 5;
  @Prop(Boolean) public readonly: boolean = false;
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

  private tblDCControlVeh: Array<ITblDCjControlVdPed & { id: string }> = [];

  private dCControlVehPdAdd: ITblDCjControlVdPed = {
    auton: 0,
    idPedido: 0,
    idPesaje: 0,
  };

  private dCControlVehPdEdit: ITblDCjControlVdPed & { id: string } = {
    auton: 0,
    id: '',
    idPedido: 0,
    idPesaje: 0,
  };

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.fetchData();
  }

  private async updateVehPed() {
    if (this.validateData(this.dCControlVehPdEdit)) {
      return;
    }

    await this.updateDCControlVehPed();
  }

  private async save() {
    this.dCControlVehPdAdd.idPesaje = this.idPesaje;
    if (this.validateData(this.dCControlVehPdAdd)) {
      return;
    }
    await this.addDCControlVehPed();
    this.dCControlVehPdAdd = {
      auton: 0,
      idPedido: 0,
      idPesaje: 0,
    };
  }

  private async updateDCControlVehPed() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCControlVehPed.put(
        { ...this.dCControlVehPdEdit },
        this.dCControlVehPdEdit.idPesaje,
        this.dCControlVehPdEdit.idPedido,
      );
      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }

      this.dCControlVehPdEdit = {
        auton: 0,
        id: '',
        idPedido: 0,
        idPesaje: 0,
      };
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async addDCControlVehPed() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCControlVehPed.post({
        ...this.dCControlVehPdAdd,
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

  private async fetchData() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCControlVehPed.get(
        this.idPesaje,
        this.pagination,
      );
      this.tblDCControlVeh = response.data.map(
        (item: ITblDCjControlVdPed, i) => ({
          ...item,
          id: [item.auton, i].join('.'),
        }),
      );
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

  private async idPedido(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<IIdPedidoControlVeh[]>;
      if (q.query) {
        response =
          await this.despachoCajaApi.dCControlVehPed.getIdPedidosFind(q);

        return response.data.map<IInterfaceSelect>(
          (e: Pick<IIdPedidoControlVeh, 'pedido'>) => ({
            id: e.pedido,
            item: `${e.pedido}`,
          }),
        );
      }
      response = await this.despachoCajaApi.dCControlVehPed.getIdPedido(p);

      return response.data.map<IInterfaceSelect>(
        (e: Pick<IIdPedidoControlVeh, 'pedido'>) => ({
          id: e.pedido,
          item: `${e.pedido}`,
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

  private validateData(data: ITblDCjControlVdPed): boolean {
    if (!data.idPesaje) {
      this.output = { isError: true, message: 'Digite el pesaje para guardar' };
      return true;
    }
    if (!data.idPedido) {
      this.output = {
        isError: true,
        message: 'Digite el pedido para continuar',
      };
      return true;
    }
    return false;
  }
}
</script>
