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
            <th>ID</th>
            <th>Descripcion</th>
            <th>Nombre Expendio</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Ciudad</th>
            <th>Anular</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-500">
            <td class="text-center">
              <input type="text" class="input" v-model="ItercMesaAdd.mesas" />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="ItercMesaAdd.descripcionM"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="ItercMesaAdd.nombreExpendio"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="ItercMesaAdd.direccionM"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="ItercMesaAdd.telefonoM"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="ItercMesaAdd.ciudad"
                :fetch="fetchCiudades"
              />
            </td>
            <td class="text-center">
              <input
                type="checkbox"
                class="checkBox"
                v-model="ItercMesaAdd.anulaM"
              />
            </td>
          </tr>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblTercMesa"
            :key="d.mesas"
            @click="ItercMesaEdit = d"
          >
            <template v-if="ItercMesaEdit.mesas === d.mesas">
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="ItercMesaEdit.mesas"
                  @change="updateTercMesa"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="ItercMesaEdit.descripcionM"
                  @change="updateTercMesa"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="ItercMesaEdit.nombreExpendio"
                  @change="updateTercMesa"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="ItercMesaEdit.direccionM"
                  @change="updateTercMesa"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="ItercMesaEdit.telefonoM"
                  @change="updateTercMesa"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="ItercMesaEdit.ciudad"
                  :fetch="fetchCiudades"
                  @change="updateTercMesa"
                />
              </td>
              <td class="text-center">
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="ItercMesaEdit.anulaM"
                  @change="updateTercMesa"
                />
              </td>
            </template>
            <template v-else>
              <td class="text-center">{{ d.mesas }}</td>
              <td class="text-center">{{ d.descripcionM }}</td>
              <td class="text-center">{{ d.nombreExpendio }}</td>
              <td class="text-center">{{ d.direccionM }}</td>
              <td class="text-center">{{ d.telefonoM }}</td>
              <td>
                <PaginatedSelect
                  v-model="d.ciudad"
                  :fetch="fetchCiudades"
                  disabled
                />
              </td>
              <td class="text-center">{{ $booleanToString(d.anulaM) }}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <ButtonPagination
      :key="0"
      :currentPagination="pagination"
      :currentDataLength="tblTercMesa.length"
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
import RepartoAPI from '@/remote/api/reparto/repartoAPI';
import IQuery from '@/types/query';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { captureException } from '@sentry/browser';
import { ICiudades } from '@/remote/api/reparto/types';
import { ITercMesa } from '@/remote/api/reparto/types/tercMesa';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'TercMesas',
})
export default class TercMesas extends Vue {
  private isLoading: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private output = {
    isError: false,
    message: '',
  };

  private tblTercMesa: ITercMesa[] = [];

  private ItercMesaEdit: ITercMesa = {
    anulaM: false,
    ciudad: '',
    descripcionM: '',
    direccionM: '',
    mesas: '',
    nombreExpendio: '',
    telefonoM: '',
  };

  private ItercMesaAdd: ITercMesa = {
    anulaM: false,
    ciudad: '',
    descripcionM: '',
    direccionM: '',
    mesas: '',
    nombreExpendio: '',
    telefonoM: '',
  };

  private repartoApi = new RepartoAPI(this.$store.getters.getAuthToken);

  private async mounted() {
    await this.fetchData();
  }

  private async save() {
    if (this.validateData(this.ItercMesaAdd)) {
      return;
    }

    await this.addTercMesa();
  }

  private async addTercMesa() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.tercMesas.postTercMes({
        ...this.ItercMesaAdd,
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

  private async updateTercMesa() {
    if (this.validateData(this.ItercMesaEdit)) {
      return;
    }

    this.isLoading = true;
    try {
      const responde = await this.repartoApi.tercMesas.putTercMesa(
        this.ItercMesaEdit.mesas,
        { ...this.ItercMesaEdit },
      );

      if (responde.statusCode === 200) {
        this.output = { isError: false, message: responde.message };
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
      const response = await this.repartoApi.tercMesas.getTercMesa(
        this.pagination,
      );
      this.tblTercMesa = response.data;
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchCiudades(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<ICiudades[]>;
      if (q.query) {
        response = await this.repartoApi.tercMesas.getCiudadesFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ICiudades, 'idCiudad' | 'descripcionCiu'>) => ({
            id: e.idCiudad,
            item: e.descripcionCiu,
          }),
        );
      }
      response = await this.repartoApi.tercMesas.getCiudades(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<ICiudades, 'idCiudad' | 'descripcionCiu'>) => ({
          id: e.idCiudad,
          item: e.descripcionCiu,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    }
  }

  private validateData(data: ITercMesa): boolean {
    if (!data.mesas) {
      this.output = { isError: true, message: 'El id no puede estar vacio' };
      return true;
    }
    if (!data.descripcionM) {
      this.output = {
        isError: true,
        message: 'La descripción no puede estar vacia',
      };
      return true;
    }
    if (!data.nombreExpendio) {
      this.output = {
        isError: true,
        message: 'El nombre no puede estar vacio',
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
