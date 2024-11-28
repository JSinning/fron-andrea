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
            <th class="md:w-2/12">Guia No</th>
            <th>Codigo Individual</th>
            <th>Confirmado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-500" v-if="!viewAddRegistro">
            <td style="visibility: collapse; display: none">
              {{ ImovDespaPielDt1.idNDespacho }}
            </td>
            <td style="visibility: collapse; display: none">
              {{ ImovDespaPielDt1.auton }}
            </td>
            <td>
              <input
                type="text"
                class="input"
                v-model="ImovDespaPielDt1.guiaNo"
                maxlength="4"
              />
            </td>
            <td>
              <input
                type="text"
                class="input"
                v-model="ImovDespaPielDt1.codigoIndiv"
                maxlength="1"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="checkBox"
                v-model="ImovDespaPielDt1.confirmado"
              />
            </td>
            <td>
              <input
                type="date"
                class="input"
                v-model="ImovDespaPielDt1.fechaR"
              />
            </td>
          </tr>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblDespaPielDt1"
            :key="d.auton"
            @click="selectMovDespaPiel(d)"
          >
            <template
              v-if="d.auton === ImovDespaPielDt1Edit.auton && !readonly"
            >
              <td style="visibility: collapse; display: none">
                {{ ImovDespaPielDt1Edit.idNDespacho }}
              </td>
              <td style="visibility: collapse; display: none">
                {{ ImovDespaPielDt1Edit.auton }}
              </td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="ImovDespaPielDt1Edit.guiaNo"
                  maxlength="4"
                  @change="updateMovDespaPielDt1"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="ImovDespaPielDt1Edit.codigoIndiv"
                  maxlength="1"
                  @change="updateMovDespaPielDt1"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="ImovDespaPielDt1Edit.confirmado"
                  @change="updateMovDespaPielDt1"
                />
              </td>
              <td>
                <input
                  type="date"
                  class="input"
                  v-model="ImovDespaPielDt1Edit.fechaR"
                  @change="updateMovDespaPielDt1"
                />
              </td>
            </template>
            <template v-else>
              <td style="visibility: collapse; display: none">
                {{ d.idNDespacho }}
              </td>
              <td style="visibility: collapse; display: none">{{ d.auton }}</td>
              <td>{{ d.guiaNo }}</td>
              <td>{{ d.codigoIndiv }}</td>
              <td>{{ $booleanToString(d.confirmado) }}</td>
              <td>{{ $convertDate(d.fechaR) }}</td></template
            >
          </tr>
        </tbody>
      </table>
      <ButtonPagination
        :key="0"
        :currentPagination="pagination"
        :currentDataLength="0"
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
import IPagination from '@/types/IPagination';
import { captureException } from '@sentry/browser';
import RepartoAPI from '@/remote/api/reparto/repartoAPI';
import { IMovDespaPielDt1 } from '@/remote/api/reparto/types';
import convertDate from '@/utils/convertDate';
import moment from 'moment';
@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
  },
  name: 'MovDespaPielDt1',
})
export default class MovDespaPielDt1 extends Vue {
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

  private ImovDespaPielDt1: IMovDespaPielDt1 = {
    codigoIndiv: 0,
    confirmado: false,
    idNDespacho: 0,
  };

  private ImovDespaPielDt1Edit: IMovDespaPielDt1 = {
    codigoIndiv: 0,
    confirmado: false,
    idNDespacho: 0,
  };

  private tblDespaPielDt1: IMovDespaPielDt1[] = [];

  private repartoApi = new RepartoAPI(this.$store.getters.getAuthToken);

  private async mounted() {
    await this.movDespaPielDt1(this.idNDespacho);
  }

  private selectMovDespaPiel(d: IMovDespaPielDt1) {
    this.ImovDespaPielDt1Edit = d;
    this.ImovDespaPielDt1Edit.fechaR = convertDate(
      this.ImovDespaPielDt1Edit.fechaR,
    );
  }

  private async save() {
    this.ImovDespaPielDt1.idNDespacho = this.idNDespacho;
    if (this.validateData(this.ImovDespaPielDt1)) {
      return;
    }
    await this.addMovDespaPielDt1();
  }

  private async addMovDespaPielDt1() {
    this.isLoading = true;
    try {
      const response =
        await this.repartoApi.movDespaPielDt1.postMovDespaPielDt1({
          ...this.ImovDespaPielDt1,
          fechaR: moment().utc().format('YYYY-MM-DD'),
        });
      await this.movDespaPielDt1(this.idNDespacho);
      this.ImovDespaPielDt1 = {
        codigoIndiv: 0,
        confirmado: false,
        idNDespacho: 0,
      };
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async updateMovDespaPielDt1() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.movDespaPielDt1.putMovDespaPielDt1(
        {
          ...this.ImovDespaPielDt1Edit,
          fechaR: convertDate(this.ImovDespaPielDt1Edit.fechaR),
        },
        this.ImovDespaPielDt1Edit.idNDespacho,
        this.ImovDespaPielDt1Edit.auton,
      );
      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }
      await this.movDespaPielDt1(this.idNDespacho);
      this.ImovDespaPielDt1Edit.auton = 0;
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async movDespaPielDt1(idNDespacho: number) {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.movDespaPielDt1.getMovDespaPielDt1(
        idNDespacho,
        this.pagination,
      );
      this.tblDespaPielDt1 = response.data;
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

  private async loadMore() {
    this.pagination.limit += this.pagination.limit;
    await this.movDespaPielDt1(this.idNDespacho);
  }

  private validateData(data: IMovDespaPielDt1): boolean {
    if (!data.idNDespacho) {
      this.output = {
        isError: true,
        message: 'El id no puede ser vacio',
      };
      return true;
    }
    if (!data.confirmado) {
      this.output = { isError: true, message: 'seleccione el confirmado' };
      return true;
    }
    return false;
  }
}
</script>
