<template>
  <div class="w-full flex flex-col gap-2">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <table class="table-fixed w-full text-xs">
      <thead>
        <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
          <th class="md:w-1/6">Etiqueta</th>
          <th class="md:w-2/12">Codigo</th>
          <th class="md:w-3/12">Descripción</th>
          <th>Kilos</th>
          <th>Guia No</th>
          <th>N-Anim</th>
          <th>Lado</th>
          <th>Kilos CC</th>
          <th>Diferencia</th>
          <th>Anular</th>
          <th>Motivo</th>
          <th style="visibility: collapse; display: none">ID</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b border-gray-500"
          v-for="d in tblReprocesoCanalDt1"
          :key="d.autoNum"
          @click="
            () => {
              IreprocesoCanalDt1Edit = d;
              IreprocesoCanalDt1Edit.idCodigo.toLowerCase();
            }
          "
        >
          <template
            v-if="d.autoNum === IreprocesoCanalDt1Edit.autoNum && !readonly"
          >
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt1Edit.etiqueta"
                @change="checkToEtiqueta(IreprocesoCanalDt1Edit.etiqueta)"
              />
            </td>
            <td class="px-1">
              <select
                class="select appearance-none"
                v-model="IreprocesoCanalDt1Edit.idCodigo"
                @change="updateDt1"
              >
                <option
                  v-for="(item, index) in idCodeDt1"
                  :value="item.id"
                  :key="index"
                >
                  {{ item.item }}
                </option>
              </select>
            </td>
            <td class="px-1">
              <select
                class="select appearance-none"
                v-model="IreprocesoCanalDt1Edit.idCodigo"
                @change="updateDt1"
              >
                <option
                  v-for="(item, index) in descriptionDt1"
                  :value="item.id"
                  :key="index"
                >
                  {{ item.item }}
                </option>
              </select>
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt1Edit.cantidad"
                @change="updateDt1"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt1Edit.guiaNo"
                @change="updateDt1"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt1Edit.nAnima"
                @change="updateDt1"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt1Edit.ladoAni"
                @change="updateDt1"
              />
            </td>
            <td>
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt1Edit.cantidad2"
                @change="updateDt1"
              />
            </td>
            <td>
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt1Edit.difer"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="checkBox"
                v-model="IreprocesoCanalDt1Edit.anular"
                @change="updateDt1"
              />
            </td>
            <td>
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanalDt1Edit.motivoAnula"
                @change="updateDt1"
              />
            </td>
            <td style="visibility: collapse; display: none">
              {{ IreprocesoCanalDt1Edit.idEti }}
            </td>
          </template>
          <template v-else>
            <td class="text-center">
              {{ d.etiqueta }}
            </td>
            <td class="px-16">
              <select class="appearance-none" v-model="d.idCodigo" disabled>
                <option
                  v-for="(item, index) in idCodeDt1"
                  :value="item.id"
                  :key="index"
                >
                  {{ item.item }}
                </option>
              </select>
            </td>
            <td class="px-1">
              <select class="appearance-none" v-model="d.idCodigo" disabled>
                <option
                  v-for="(item, index) in descriptionDt1"
                  :value="item.id"
                  :key="index"
                >
                  {{ item.item }}
                </option>
              </select>
            </td>
            <td class="text-center">
              {{ $convertToDecimal(d.cantidad) }}
            </td>
            <td class="text-center">
              {{ d.guiaNo }}
            </td>
            <td class="text-center">
              {{ d.nAnima }}
            </td>
            <td class="text-center">
              {{ d.ladoAni }}
            </td>
            <td>
              {{ $convertToDecimal(d.cantidad2) }}
            </td>
            <td>
              {{ $convertToDecimal(d.difer) }}
            </td>
            <td>
              {{ $booleanToString(d.anular) }}
            </td>
            <td>
              {{ d.motivoAnula }}
            </td>
            <td style="visibility: collapse; display: none">
              {{ d.idEti }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <ButtonPagination
      :key="reprocesoNo"
      :currentPagination="pagination"
      :currentDataLength="tblReprocesoCanalDt1.length"
      @click="loadMore"
    >
      Cargar más
    </ButtonPagination>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import * as Sentry from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
import {
  IProductos,
  IReprocesoCanalDt1,
  reprocesoCanalDt1,
} from '@/remote/api/cuarteo/types';
import IPagination from '@/types/IPagination';
import ButtonPagination from '../reusable/ButtonPagination.vue';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
  },
  name: 'ReprocesoCanalDet1',
})
export default class ReprocesoCanalDet1 extends Vue {
  @Prop(Number) public reprocesoNo: number;
  @Prop(Number) public cuartoS: number;
  @Prop(Boolean) public readonly: boolean;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private etiquetaN2: string = '';

  private idCodeDt1: IInterfaceSelect[] = [];
  private descriptionDt1: IInterfaceSelect[] = [];
  private tblReprocesoCanalDt1: reprocesoCanalDt1 = [];
  private IreprocesoCanalDt1Edit: IReprocesoCanalDt1 = {
    anular: false,
    autoNum: 0,
    cantidad: 0,
    cantidad2: 0,
    difer: 0,
    etiqueta: '',
    fechaG: '',
    guiaNo: 0,
    idCodigo: '',
    idEti: 0,
    ladoAni: '',
    motivoAnula: '',
    nAnima: 0,
    reprocesoNo: 0,
  };

  private cuarteoApi = new CuarteoApi(this.$store.getters.getAuthToken);

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private clearOutput() {
    this.output = '';
  }

  private async mounted() {
    await this.idCodigoReprocesoCanalDt1();
    await this.fetchData(this.reprocesoNo);
  }

  private async updateDt1() {
    await this.updateBeforeReprocesoCanalDt1();
  }

  private async updateBeforeReprocesoCanalDt1() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.putBeforeUpdateReprocesoCanalDt1({
        ...this.IreprocesoCanalDt1Edit,
        cuartoFrio: this.cuartoS,
        etiquetaN2: this.etiquetaN2,
      });
      await this.updateReprocesoCanalDt1();
      this.etiquetaN2 = this.IreprocesoCanalDt1Edit.etiqueta;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async updateReprocesoCanalDt1() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.putReprocesoCanalDt1(
        this.IreprocesoCanalDt1Edit,
        this.IreprocesoCanalDt1Edit.reprocesoNo,
        this.IreprocesoCanalDt1Edit.autoNum,
      );

      await this.fetchData(this.reprocesoNo);
      this.IreprocesoCanalDt1Edit.autoNum = 0;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async checkToEtiqueta(etiqueta: string) {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.getEtiquetaCheck(etiqueta);
      if (!response.data) {
        this.showOutput(true, 'No existe esta guia');
        return;
      }

      let splitted = etiqueta.split(/\.|ñ|Ñ|,/g);

      this.IreprocesoCanalDt1Edit.guiaNo = Number(splitted[0]);
      this.IreprocesoCanalDt1Edit.nAnima = Number(splitted[1]);
      this.IreprocesoCanalDt1Edit.ladoAni = splitted[2];
      this.IreprocesoCanalDt1Edit.cantidad2 = Number.parseFloat(
        `${splitted[3]},${splitted[4]}`,
      );
      this.IreprocesoCanalDt1Edit.idCodigo = splitted[5];
      await this.updateDt1();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(
        true,
        'La etiqueta no coincide favor verificar e intentar de nuevo',
      );
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchData(reprocesoNo: number) {
    try {
      const response = await this.cuarteoApi.getReprocesoCanalDt1(
        reprocesoNo,
        this.pagination,
      );

      this.tblReprocesoCanalDt1 = response.data.map<IReprocesoCanalDt1>(
        (e: IReprocesoCanalDt1) => {
          return { ...e, idCodigo: e.idCodigo.toLowerCase() };
        },
      );
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async idCodigoReprocesoCanalDt1() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.getIdCodigoDt1();

      this.idCodeDt1 = response.data.map((e: IProductos) => {
        return {
          id: e.idCodigo.toLowerCase(),
          item: e.idCodigo,
        };
      });
      this.descriptionDt1 = response.data.map((e: IProductos) => {
        return {
          id: e.idCodigo.toLowerCase(),
          item: e.descripcionMer,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, e.message);
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  private async loadMore() {
    this.pagination.limit += 100;
    await this.fetchData(this.reprocesoNo);
  }
}
</script>
