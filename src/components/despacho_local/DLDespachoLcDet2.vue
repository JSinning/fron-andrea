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
      <button class="btn-save" @click="addRegistroDet2" v-if="!viewAddRegistro">
        Adicionar a la tabla
      </button>
    </div>

    <div class="card-table">
      <table class="table-fixed w-full text-xs">
        <thead>
          <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
            <th style="visibility: collapse; display: none">IdDespachoLoc</th>
            <th style="visibility: collapse; display: none">Auton</th>
            <th style="visibility: collapse; display: none">IdEti</th>
            <th class="md:w-1/6">Etiqueta</th>
            <th>N-Guia</th>
            <th>No Animal</th>
            <th>M-C</th>
            <th>Producto</th>
            <th>Kilos</th>
            <th>Anular</th>
            <th>Motivo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblDlDespachoLocalDt2"
            :key="d.auton"
            @click="() => (IdespachoLocalDet2Edit = d)"
          >
            <template
              v-if="d.auton === IdespachoLocalDet2Edit.auton && !readonly"
            >
              <td style="visibility: collapse; display: none">
                {{ IdespachoLocalDet2Edit.idDespachoLoc }}
              </td>
              <td style="visibility: collapse; display: none">
                {{ IdespachoLocalDet2Edit.auton }}
              </td>
              <td style="visibility: collapse; display: none">
                {{ IdespachoLocalDet2Edit.idEti }}
              </td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="IdespachoLocalDet2Edit.etiqueta"
                  maxlength="35"
                  @change="afterUpdateEtiquetaEdit"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdespachoLocalDet2Edit.guiaNo"
                  @change="updateDet2"
                  disabled
                  maxlength="4"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdespachoLocalDet2Edit.nAnima"
                  @change="updateDet2"
                  disabled
                  maxlength="2"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdespachoLocalDet2Edit.ladoAni"
                  @change="updateDet2"
                  disabled
                  maxlength="1"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdespachoLocalDet2Edit.codigoProd"
                  @change="updateDet2"
                  disabled
                  maxlength="15"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdespachoLocalDet2Edit.pesoPro"
                  @change="updateDet2"
                />
              </td>
              <td class="text-center">
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="IdespachoLocalDet2Edit.anular"
                  @change="beforeUpdateDet2"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdespachoLocalDet2Edit.motivoAnula"
                  @change="beforeUpdateDet2"
                  maxlength="20"
                />
              </td>
            </template>
            <template v-else>
              <td style="visibility: collapse; display: none">
                {{ d.idDespachoLoc }}
              </td>
              <td style="visibility: collapse; display: none">{{ d.auton }}</td>
              <td style="visibility: collapse; display: none">{{ d.idEti }}</td>
              <td>{{ d.etiqueta }}</td>
              <td class="text-center">{{ d.guiaNo }}</td>
              <td class="text-center">{{ d.nAnima }}</td>
              <td class="text-center">{{ d.ladoAni }}</td>
              <td class="text-center">{{ d.codigoProd }}</td>
              <td class="text-center">{{ $convertToDecimal(d.pesoPro) }}</td>
              <td class="text-center">{{ $booleanToString(d.anular) }}</td>
              <td class="text-center">{{ d.motivoAnula }}</td>
            </template>
          </tr>
          <tr v-if="!viewAddRegistro">
            <td style="visibility: collapse; display: none">
              {{ IdespachoLocalDet2.idDespachoLoc }}
            </td>
            <td style="visibility: collapse; display: none">
              {{ IdespachoLocalDet2.auton }}
            </td>
            <td style="visibility: collapse; display: none">
              {{ IdespachoLocalDet2.idEti }}
            </td>
            <td>
              <input
                type="text"
                class="input"
                v-model="IdespachoLocalDet2.etiqueta"
                @change="afterUpdateEtiqueta"
                maxlength="35"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdespachoLocalDet2.guiaNo"
                maxlength="4"
                disabled
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdespachoLocalDet2.nAnima"
                maxlength="2"
                disabled
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdespachoLocalDet2.ladoAni"
                maxlength="1"
                disabled
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdespachoLocalDet2.codigoProd"
                maxlength="15"
                disabled
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdespachoLocalDet2.pesoPro"
              />
            </td>
            <td class="text-center">
              <input
                type="checkbox"
                class="checkBox"
                v-model="IdespachoLocalDet2.anular"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdespachoLocalDet2.motivoAnula"
                maxlength="20"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <ButtonPagination
        :key="idDespachoLoc"
        :currentPagination="pagination"
        :currentDataLength="tblDlDespachoLocalDt2.length"
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
import PaginatedSelect from '../reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import { captureException } from '@sentry/browser';
import DespachoLocalApi from '@/remote/api/despacho_local/despachoLocalApi';
import {
  DespachoLocalDet2,
  IDespachoLocalDet2,
} from '@/remote/api/despacho_local/types';
import convertDate from '@/utils/convertDate';
import moment from 'moment';
import ButtonPagination from '../reusable/ButtonPagination.vue';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'DLDespachoLcDet2',
})
export default class DLDespachoLcDet2 extends Vue {
  @Prop(Number) public idDespachoLoc: number;
  @Prop(Number) public cuartoS: number;
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

  private etiquetaN2: string = '';

  private tblDlDespachoLocalDt2: DespachoLocalDet2 = [];

  private IdespachoLocalDet2Edit: IDespachoLocalDet2 = {
    anular: false,
    auton: 0,
    codigoProd: '',
    etiqueta: '',
    fechaG: '',
    guiaNo: 0,
    idDespachoLoc: 0,
    idEti: 0,
    ladoAni: '',
    motivoAnula: '',
    nAnima: 0,
    pesoPro: 0,
  };

  private IdespachoLocalDet2: IDespachoLocalDet2 = {
    anular: false,
    auton: 0,
    codigoProd: '',
    etiqueta: '',
    fechaG: '',
    guiaNo: 0,
    idDespachoLoc: 0,
    idEti: 0,
    ladoAni: '',
    motivoAnula: '',
    nAnima: 0,
    pesoPro: 0,
  };

  private despachoLocalApi = new DespachoLocalApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.fetchData(this.idDespachoLoc);
  }

  private async beforeUpdateDet2() {
    this.isLoading = true;
    try {
      const response =
        await this.despachoLocalApi.postDespachoLocalDt2BeforeUpdate({
          ...this.IdespachoLocalDet2Edit,
        });
      await this.updateDet2();
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

  private async addRegistroDet2() {
    this.IdespachoLocalDet2.fechaG = moment().utc().format('YYYY-MM-DD');
    this.IdespachoLocalDet2.idDespachoLoc = this.idDespachoLoc;
    if (this.validateData(this.IdespachoLocalDet2)) {
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.despachoLocalApi.despachoLocalDt2.post({
        ...this.IdespachoLocalDet2,
      });
      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
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

  private async updateDet2() {
    this.IdespachoLocalDet2Edit.fechaG = convertDate(
      this.IdespachoLocalDet2Edit.fechaG,
    );
    this.isLoading = true;
    try {
      const response = await this.despachoLocalApi.despachoLocalDt2.put(
        { ...this.IdespachoLocalDet2Edit },
        this.IdespachoLocalDet2Edit.idDespachoLoc,
        this.IdespachoLocalDet2Edit.auton,
      );
      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }
      this.IdespachoLocalDet2Edit.auton = 0;
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

  private async afterUpdateEtiqueta() {
    this.isLoading = true;
    try {
      const response =
        await this.despachoLocalApi.postDespachoLocalDt2CheckEtiqueta({
          anular: this.IdespachoLocalDet2.anular,
          cuartoFrio: this.cuartoS,
          etiqueta: this.IdespachoLocalDet2.etiqueta,
          etiquetaN2: this.etiquetaN2,
          motivoAnula: this.IdespachoLocalDet2.motivoAnula,
          usuario: this.$store.getters.getUsuario,
        });
      this.etiquetaN2 = response.data.input.etiquetaN2;
      this.IdespachoLocalDet2.guiaNo = response.data.result.nGuia;
      this.IdespachoLocalDet2.nAnima = response.data.result.nAnimal;
      this.IdespachoLocalDet2.ladoAni = response.data.result.tMediaC;
      this.IdespachoLocalDet2.pesoPro = response.data.result.pesoPro;
      this.IdespachoLocalDet2.codigoProd = response.data.result.codigoProd;
      this.IdespachoLocalDet2.idEti = response.data.consec;
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: e.message,
      };
      this.IdespachoLocalDet2.etiqueta = '';
    } finally {
      this.isLoading = false;
    }
  }

  private async afterUpdateEtiquetaEdit() {
    this.isLoading = true;
    try {
      const response =
        await this.despachoLocalApi.postDespachoLocalDt2CheckEtiqueta({
          anular: this.IdespachoLocalDet2Edit.anular,
          cuartoFrio: this.cuartoS,
          etiqueta: this.IdespachoLocalDet2Edit.etiqueta,
          etiquetaN2: this.etiquetaN2,
          motivoAnula: this.IdespachoLocalDet2Edit.motivoAnula,
          usuario: this.$store.getters.getUsuario,
        });
      this.etiquetaN2 = response.data.input.etiquetaN2;
      this.IdespachoLocalDet2Edit.guiaNo = response.data.result.nGuia;
      this.IdespachoLocalDet2Edit.nAnima = response.data.result.nAnimal;
      this.IdespachoLocalDet2Edit.ladoAni = response.data.result.tMediaC;
      this.IdespachoLocalDet2Edit.pesoPro = response.data.result.pesoPro;
      this.IdespachoLocalDet2Edit.codigoProd = response.data.result.codigoProd;
      this.IdespachoLocalDet2Edit.idEti = response.data.consec;
      await this.updateDet2();
    } catch (e) {
      captureException(e);
      this.output = {
        isError: true,
        message: e.message,
      };
      this.IdespachoLocalDet2Edit.auton = 0;
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchData(idDespachoLoc: number) {
    this.isLoading = true;
    try {
      const response = await this.despachoLocalApi.despachoLocalDt2.get(
        idDespachoLoc,
        this.pagination,
      );
      this.tblDlDespachoLocalDt2 = response.data.map<IDespachoLocalDet2>(
        (e: IDespachoLocalDet2) => {
          return {
            ...e,
            codigoProd: !e.codigoProd ? '' : e.codigoProd.toLowerCase(),
          };
        },
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

  private async loadMore() {
    this.pagination.limit += 100;
    await this.fetchData(this.idDespachoLoc);
  }

  private clearData() {
    this.IdespachoLocalDet2 = {
      anular: false,
      auton: 0,
      codigoProd: '',
      etiqueta: '',
      fechaG: '',
      guiaNo: 0,
      idDespachoLoc: 0,
      idEti: 0,
      ladoAni: '',
      motivoAnula: '',
      nAnima: 0,
      pesoPro: 0,
    };
  }

  private validateData(data: IDespachoLocalDet2): boolean {
    if (!data.idDespachoLoc) {
      this.output = {
        isError: true,
        message: 'El Id del proceso no pude ser cero',
      };
      return true;
    }
    if (!data.etiqueta) {
      this.output = { isError: true, message: 'La etiqueta no pude ser vacia' };
      return true;
    }
    return false;
  }
}
</script>
