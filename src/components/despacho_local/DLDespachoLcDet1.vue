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
      <button
        class="btn-save"
        @click="addDespachoLocalDt1"
        v-if="!viewAddRegistro"
      >
        Adicionar a la tabla
      </button>
    </div>
    <div class="card-table">
      <table class="table-fixed w-full text-xs">
        <thead>
          <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
            <th style="visibility: collapse; display: none">IdDespachoLoc</th>
            <th style="visibility: collapse; display: none">Auton</th>
            <th class="md:w-2/12">Codigo</th>
            <th>Descripcion</th>
            <th>Cantidad</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblDlDespachoLocalDt1"
            :key="d.auton"
            @click="() => (IdespachoLocalDt1Edit = d)"
          >
            <template
              v-if="d.auton === IdespachoLocalDt1Edit.auton && !readonly"
            >
              <td style="visibility: collapse; display: none">
                {{ IdespachoLocalDt1Edit.idDespachoLoc }}
              </td>
              <td style="visibility: collapse; display: none">
                {{ IdespachoLocalDt1Edit.auton }}
              </td>
              <td>
                <PaginatedSelect
                  v-model="IdespachoLocalDt1Edit.producto"
                  :fetch="productosID"
                  @change="updateDespachoLocalDt1"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="IdespachoLocalDt1Edit.producto"
                  :fetch="productosName"
                  @change="updateDespachoLocalDt1"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdespachoLocalDt1Edit.cantidad"
                  @change="updateDespachoLocalDt1"
                  maxlength="4"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="IdespachoLocalDt1Edit.tercero"
                  :fetch="clientes"
                  @change="updateDespachoLocalDt1"
                />
              </td>
            </template>
            <template v-else>
              <td style="visibility: collapse; display: none">
                {{ d.idDespachoLoc }}
              </td>
              <td style="visibility: collapse; display: none">{{ d.auton }}</td>
              <td>
                <PaginatedSelect
                  v-model="d.producto"
                  :fetch="productosID"
                  disabled
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="d.producto"
                  :fetch="productosName"
                  disabled
                />
              </td>
              <td class="text-center">{{ $convertToDecimal(d.cantidad) }}</td>
              <td>
                <PaginatedSelect
                  v-model="d.tercero"
                  :fetch="clientes"
                  disabled
                />
              </td>
            </template>
          </tr>
          <tr v-if="!viewAddRegistro">
            <td style="visibility: collapse; display: none">
              {{ IdespachoLocalDt1.idDespachoLoc }}
            </td>
            <td style="visibility: collapse; display: none">
              {{ IdespachoLocalDt1.auton }}
            </td>
            <td>
              <PaginatedSelect
                v-model="IdespachoLocalDt1.producto"
                :fetch="productosID"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="IdespachoLocalDt1.producto"
                :fetch="productosName"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdespachoLocalDt1.cantidad"
                maxlength="4"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="IdespachoLocalDt1.tercero"
                :fetch="clientes"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <ButtonPagination
        :key="idDespachoLoc"
        :currentPagination="pagination"
        :currentDataLength="tblDlDespachoLocalDt1.length"
        @click="loadMore"
      >
        Cargar más
      </ButtonPagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '../reusable/AlertBox.vue';
import Loader from '../reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import DespachoLocalApi from '@/remote/api/despacho_local/despachoLocalApi';
import {
  Clientes,
  DespachoLocalDet1,
  IClientes,
  IDespachoLocalDet1,
  IProductos,
} from '@/remote/api/despacho_local/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { captureException } from '@sentry/browser';
import ButtonPagination from '../reusable/ButtonPagination.vue';
import { BaseResponse } from '@/types';
import IQuery from '@/types/query';
import { Productos } from '@/remote/api/cuarteo/types';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'DLDespachoLcDet1',
})
export default class DLDespachoLcDet1 extends Vue {
  @Prop(Number) public idDespachoLoc: number;
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

  private tblDlDespachoLocalDt1: DespachoLocalDet1 = [];

  private IdespachoLocalDt1Edit: IDespachoLocalDet1 = {
    auton: 0,
    cantidad: 0,
    idDespachoLoc: 0,
    producto: '',
    tercero: '',
  };

  private IdespachoLocalDt1: IDespachoLocalDet1 = {
    auton: 0,
    cantidad: 0,
    idDespachoLoc: 0,
    producto: '',
    tercero: '',
  };

  private despachoLocalApi = new DespachoLocalApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.fetchData(this.idDespachoLoc);
  }

  private async addDespachoLocalDt1() {
    this.IdespachoLocalDt1.idDespachoLoc = this.idDespachoLoc;
    if (this.validateData(this.IdespachoLocalDt1)) {
      return;
    }
    this.IdespachoLocalDt1.cantidad = Number.parseFloat(
      this.IdespachoLocalDt1.cantidad.toString(),
    );
    this.isLoading = true;
    try {
      const response = await this.despachoLocalApi.despachoLocalDt1.post({
        ...this.IdespachoLocalDt1,
      });
      if (response.statusCode === 200) {
        this.output = {
          isError: false,
          message: response.message,
        };
      }
      this.clearData();
      await this.fetchData(this.idDespachoLoc);
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

  private async updateDespachoLocalDt1() {
    if (!this.IdespachoLocalDt1Edit.idDespachoLoc) {
      this.output = {
        isError: true,
        message: 'El Id del proceso no pude ser cero',
      };
      return;
    }
    this.IdespachoLocalDt1Edit.cantidad = Number.parseFloat(
      this.IdespachoLocalDt1Edit.cantidad.toString(),
    );
    this.isLoading = true;
    try {
      const response = await this.despachoLocalApi.despachoLocalDt1.put(
        { ...this.IdespachoLocalDt1Edit },
        this.IdespachoLocalDt1Edit.idDespachoLoc,
        this.IdespachoLocalDt1Edit.auton,
      );
      if (response.statusCode === 200) {
        this.output = {
          isError: false,
          message: response.message,
        };
      }
      this.IdespachoLocalDt1Edit.auton = 0;
      await this.fetchData(this.idDespachoLoc);
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

  private async fetchData(idDespachoLoc: number) {
    this.isLoading = true;
    try {
      const response = await this.despachoLocalApi.despachoLocalDt1.get(
        idDespachoLoc,
        this.pagination,
      );
      this.tblDlDespachoLocalDt1 = response.data;
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

  private async productosID(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<Productos>;
      if (q.query) {
        response =
          await this.despachoLocalApi.getDespachoLocalDt1ProductosFind(q);

        return response.data.map<IInterfaceSelect>(
          (e: Pick<IProductos, 'idCodigo'>) => ({
            id: e.idCodigo,
            item: e.idCodigo,
          }),
        );
      }
      response = await this.despachoLocalApi.getDespachoLocalDt1Productos(p);

      return response.data.map<IInterfaceSelect>(
        (e: Pick<IProductos, 'idCodigo'>) => ({
          id: e.idCodigo,
          item: e.idCodigo,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: e.message,
      };
    }
  }

  private async productosName(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<Productos>;
      if (q.query) {
        response =
          await this.despachoLocalApi.getDespachoLocalDt1ProductosFind(q);

        return response.data.map<IInterfaceSelect>(
          (e: Pick<IProductos, 'idCodigo' | 'descripcionMer'>) => ({
            id: e.idCodigo,
            item: e.descripcionMer,
          }),
        );
      }
      response = await this.despachoLocalApi.getDespachoLocalDt1Productos(p);

      return response.data.map<IInterfaceSelect>(
        (e: Pick<IProductos, 'idCodigo' | 'descripcionMer'>) => ({
          id: e.idCodigo,
          item: e.descripcionMer,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: e.message,
      };
    }
  }

  private async clientes(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<Clientes>;
      if (q.query) {
        response =
          await this.despachoLocalApi.getDespachoLocalDt1ClientesFind(q);

        return response.data.map<IInterfaceSelect>(
          (e: Pick<IClientes, 'codiCliente' | 'expr2'>) => ({
            id: e.codiCliente,
            item: e.expr2,
          }),
        );
      }
      response = await this.despachoLocalApi.getDespachoLocalDt1Clientes(p);

      return response.data.map<IInterfaceSelect>(
        (e: Pick<IClientes, 'codiCliente' | 'expr2'>) => ({
          id: e.codiCliente,
          item: e.expr2,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: e.message,
      };
    }
  }

  private async loadMore() {
    this.pagination.limit += 100;
    await this.fetchData(this.idDespachoLoc);
  }

  private clearData() {
    this.IdespachoLocalDt1 = {
      auton: 0,
      cantidad: 0,
      idDespachoLoc: 0,
      producto: '',
      tercero: '',
    };
  }

  private validateData(data: IDespachoLocalDet1): boolean {
    if (!data.idDespachoLoc) {
      this.output = {
        isError: true,
        message: 'No tiene ningun despacho seleccionado',
      };
      return true;
    }
    if (!data.producto) {
      this.output = { isError: true, message: 'Seleccione un producto' };
      return true;
    }
    if (!data.cantidad) {
      this.output = {
        isError: true,
        message: 'La cantidad no puede ser cero',
      };
      return true;
    }
    if (!data.tercero) {
      this.output = { isError: true, message: 'Seleccione un cliente ' };
      return true;
    }
    return false;
  }
}
</script>
