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
            <th class="md:w-2/12">Etiqueta</th>
            <th>Peso Neto Ant</th>
            <th>Peso Bruto Actual</th>
            <th>Difer</th>
            <th class="md:w-2/12">Pedido</th>
            <th class="md:w-2/12"></th>
            <th>Anular</th>
            <th>Motivo Anulacion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!viewAddRegistro">
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdcjDespacCajaDetAdd.etiquetaC"
                @change="afterEtiquetaC"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdcjDespacCajaDetAdd.peso1"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdcjDespacCajaDetAdd.peso2"
                ref="peso2"
              />
            </td>
            <td class="text-center">
              <input type="text" class="input" v-model="difer" disabled />
            </td>
            <td>
              <PaginatedSelect
                v-model="IdcjDespacCajaDetAdd.idPedido"
                :fetch="pedidos"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                v-model="IdcjDespacCajaDetAdd.descripcClien"
                class="input"
              />
            </td>
            <td class="text-center">
              <input
                type="checkbox"
                v-model="IdcjDespacCajaDetAdd.anulaCC"
                class="checkBox"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="IdcjDespacCajaDetAdd.motivoAnu"
              />
            </td>
          </tr>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblDCjDespacCajaDet"
            :key="d.autoNum"
            @click="() => (IdcjDespacCajaDetEdit = d)"
          >
            <template
              v-if="IdcjDespacCajaDetEdit.autoNum === d.autoNum && !readonly"
            >
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdcjDespacCajaDetEdit.etiquetaC"
                  @change="afterEtiquetaCEdit"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdcjDespacCajaDetEdit.peso1"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdcjDespacCajaDetEdit.peso2"
                  @change="updateDCCajasCjDet"
                  ref="peso2"
                />
              </td>
              <td class="text-center">
                <input type="text" class="input" v-model="difer2" disabled />
              </td>
              <td>
                <PaginatedSelect
                  v-model="IdcjDespacCajaDetEdit.idPedido"
                  @change="updateDCCajasCjDet"
                  :fetch="pedidos"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  v-model="IdcjDespacCajaDetEdit.descripcClien"
                  class="input"
                />
              </td>
              <td class="text-center">
                <input
                  type="checkbox"
                  v-model="IdcjDespacCajaDetEdit.anulaCC"
                  class="checkBox"
                  @change="updateDCCajasCjDet"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IdcjDespacCajaDetEdit.motivoAnu"
                  @change="updateDCCajasCjDet"
                />
              </td>
            </template>
            <template v-else>
              <td class="text-center">{{ d.etiquetaC }}</td>
              <td class="text-center">{{ d.peso1 }}</td>
              <td class="text-center">{{ d.peso2 }}</td>
              <td class="text-center">{{ $convertToDecimal(d.difer) }}</td>
              <td>
                <PaginatedSelect
                  v-model="d.idPedido"
                  :fetch="pedidos"
                  disabled
                />
              </td>
              <td class="text-center">{{ d.descripcClien }}</td>
              <td class="text-center">{{ d.anulaCC ? 'SI' : 'NO' }}</td>
              <td class="text-center">{{ d.motivoAnu }}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <ButtonPagination
      :key="consecTip"
      :currentPagination="pagination"
      :currentDataLength="tblDCjDespacCajaDet.length"
      @click="loadMore"
    >
      Cargar más
    </ButtonPagination>

    <!-- Modal Componet -->
    <transition name="modal" v-if="!viewModal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <DCCajasCjDet2
                :etiquetaC="etiquetaC"
                :PesoAc="IdcjDespacCajaDetAdd.peso2"
              />
            </div>
            <div class="modal-footer flex flex-row justify-center">
              <button
                @click="viewModal = true"
                class="flex justify-center btn-save w-32"
                name="footer"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <Modals
      :openModal="viewAnualar"
      @Ok="aceptarAnualdo"
      @close="() => (viewAnualar = false)"
    >
      Esta Seguro de Anular la Caja/Canastilla No
      {{ IdcjDespacCajaDetEdit.etiquetaC }}</Modals
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';
import AlertBox from '../reusable/AlertBox.vue';
import Loader from '../reusable/Loader.vue';
import PaginatedSelect from '../reusable/PaginatedSelect.vue';
import IPagination from '../../types/IPagination';
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import { captureException } from '@sentry/browser';
import {
  IEtiquetaC,
  IPedidos,
  ITblDCjDespacCajaDet,
} from '@/remote/api/despacho_caja/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import DCCajasCjDet2 from '@/components/despacho_caja/DCCajasCjDet2.vue';
import convertToDecimal from '@/utils/convertToDecimal';
import moment from 'moment';
import convertDate from '@/utils/convertDate';
import Modals from '@/components/reusable/Modals.vue';
import ButtonPagination from '../reusable/ButtonPagination.vue';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    DCCajasCjDet2,
    Loader,
    Modals,
    PaginatedSelect,
  },
  name: 'DCCajasCjDet',
})
export default class DCCajasCjDet extends Vue {
  @Prop(Number) public consecTip: number;
  @Prop(Boolean) public readonly: boolean;
  @Prop(Boolean) public viewAddRegistro: boolean;
  @Ref('peso2') public peso2: HTMLInputElement;
  private viewAnualar: boolean = false;
  private viewModal: boolean = true;
  private isLoading: boolean = false;
  private componentName = '';
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private output = {
    isError: false,
    message: '',
  };

  private IdcjDespacCajaDetAdd: ITblDCjDespacCajaDet = {
    anulaCC: false,
    codProduc: '',
    consecTip: 0,
    descripcClien: '',
    etiNCaja: 0,
    etiTex: '',
    etiquetaC: '',
    fechaG: '',
    idPedido: 0,
    motivoAnu: '',
    peso1: 0,
    peso2: 0,
    taraC: 0,
    unidadesC: 0,
    usuarioCr: '',
  };

  private IdcjDespacCajaDetEdit: ITblDCjDespacCajaDet = {
    anulaCC: false,
    codProduc: '',
    consecTip: 0,
    descripcClien: '',
    etiNCaja: 0,
    etiTex: '',
    etiquetaC: '',
    fechaG: '',
    idPedido: 0,
    motivoAnu: '',
    peso1: 0,
    peso2: 0,
    taraC: 0,
    unidadesC: 0,
    usuarioCr: '',
  };

  private etiquetaC: IEtiquetaC = {
    codProduc: '',
    descripcClien: '',
    etiNCaja: 0,
    etiTex: '',
    idPedido: 0,
    peso1: 0.0,
    taraC: 0,
    unidadesC: 0,
  };

  private tblDCjDespacCajaDet: Array<ITblDCjDespacCajaDet & { difer: string }> =
    [];

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );

  public get difer() {
    return convertToDecimal(
      this.IdcjDespacCajaDetAdd.peso2 -
        this.IdcjDespacCajaDetAdd.peso1 +
        this.IdcjDespacCajaDetAdd.taraC,
    );
  }

  public get difer2() {
    return convertToDecimal(
      this.IdcjDespacCajaDetEdit.peso2 -
        (this.IdcjDespacCajaDetEdit.peso1 + this.IdcjDespacCajaDetEdit.taraC),
    );
  }

  private async mounted() {
    await this.keyDown();
    await this.fetchData(this.consecTip);
  }

  private async keyDown() {
    window.addEventListener('keydown', (e) => {
      const eventos: string = `F3 = ANULAR`;
      switch (e.key) {
        case 'F1':
          this.output = { isError: false, message: eventos };
          break;
        case 'F3':
          if (!this.IdcjDespacCajaDetEdit.etiquetaC) {
            return;
          }
          this.viewAnualar = true;
          break;
      }
    });
  }

  private async aceptarAnualdo() {
    if (this.IdcjDespacCajaDetEdit.anulaCC) {
      this.output = { isError: true, message: 'Ya esta anulado ...' };
      this.viewAnualar = false;
      return;
    }
    this.IdcjDespacCajaDetEdit.anulaCC = true;
    await this.updateDCCajasCjDet();
    this.viewAnualar = false;
  }

  private async afterEtiquetaC() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCCajasDet.afterEtiquetaC(
        this.IdcjDespacCajaDetAdd.etiquetaC,
      );

      this.etiquetaC = response.data;

      this.viewModal = false;

      this.IdcjDespacCajaDetAdd.codProduc = this.etiquetaC.codProduc;
      this.IdcjDespacCajaDetAdd.unidadesC = this.etiquetaC.unidadesC;
      this.IdcjDespacCajaDetAdd.descripcClien = this.etiquetaC.descripcClien;
      this.IdcjDespacCajaDetAdd.idPedido = this.etiquetaC.idPedido;
      this.IdcjDespacCajaDetAdd.peso1 = this.etiquetaC.peso1;
      this.IdcjDespacCajaDetAdd.taraC = this.etiquetaC.taraC;
      this.IdcjDespacCajaDetAdd.etiNCaja = this.etiquetaC.etiNCaja;
      this.IdcjDespacCajaDetAdd.etiTex = this.etiquetaC.etiTex;

      this.peso2.focus();
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

  private async afterEtiquetaCEdit() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCCajasDet.afterEtiquetaC(
        this.IdcjDespacCajaDetEdit.etiquetaC,
      );

      this.etiquetaC = response.data;

      this.viewModal = false;

      this.IdcjDespacCajaDetEdit.codProduc = this.etiquetaC.codProduc;
      this.IdcjDespacCajaDetEdit.unidadesC = this.etiquetaC.unidadesC;
      this.IdcjDespacCajaDetEdit.descripcClien = this.etiquetaC.descripcClien;
      this.IdcjDespacCajaDetEdit.idPedido = this.etiquetaC.idPedido;
      this.IdcjDespacCajaDetEdit.peso1 = this.etiquetaC.peso1;
      this.IdcjDespacCajaDetEdit.taraC = this.etiquetaC.taraC;
      this.IdcjDespacCajaDetEdit.etiNCaja = this.etiquetaC.etiNCaja;
      this.IdcjDespacCajaDetEdit.etiTex = this.etiquetaC.etiTex;
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

  private async save() {
    if (this.validateData()) {
      return;
    }
    this.IdcjDespacCajaDetAdd.consecTip = this.consecTip;
    this.IdcjDespacCajaDetAdd.fechaG = moment().utc().format('YYYY-MM-DD');
    await this.addDCCajaCjDet();
  }

  private async addDCCajaCjDet() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCCajasDet.post({
        ...this.IdcjDespacCajaDetAdd,
      });

      if (response.statusCode) {
        this.output = { isError: false, message: response.message };
      }
      this.tblDCjDespacCajaDet = [];
      await this.fetchData(this.consecTip);
      this.IdcjDespacCajaDetAdd = {
        anulaCC: false,
        codProduc: '',
        consecTip: 0,
        descripcClien: '',
        etiNCaja: 0,
        etiTex: '',
        etiquetaC: '',
        fechaG: '',
        idPedido: 0,
        motivoAnu: '',
        peso1: 0,
        peso2: 0,
        taraC: 0,
        unidadesC: 0,
        usuarioCr: '',
      };
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async updateDCCajasCjDet() {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCCajasDet.put(
        this.consecTip,
        this.IdcjDespacCajaDetEdit.autoNum,
        {
          ...this.IdcjDespacCajaDetEdit,
          fechaG: convertDate(this.IdcjDespacCajaDetEdit.fechaG),
        },
      );

      if (response.statusCode) {
        this.output = { isError: false, message: response.message };
      }
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchData(consecTip: number) {
    this.isLoading = true;
    try {
      const response = await this.despachoCajaApi.dCCajasDet.get(
        consecTip,
        this.pagination,
      );
      this.tblDCjDespacCajaDet = response.data.map(
        (e: ITblDCjDespacCajaDet) => {
          return {
            ...e,
            difer: convertToDecimal(e.peso2 - (e.peso1 + e.taraC)),
          };
        },
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async pedidos(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<Array<Pick<IPedidos, 'pedido' | 'usuario'>>>;
      if (q.query) {
        response = await this.despachoCajaApi.getPedidosDetFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IPedidos, 'pedido' | 'usuario'>) => ({
            id: e.pedido,
            item: e.usuario,
          }),
        );
      }
      response = await this.despachoCajaApi.getPedidosDet(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IPedidos, 'pedido' | 'usuario'>) => ({
          id: e.pedido,
          item: e.usuario,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    }
  }

  private async loadMore() {
    this.pagination.limit += 100;
    await this.fetchData(this.consecTip);
  }

  private validateData(): boolean {
    if (!this.IdcjDespacCajaDetAdd.etiquetaC) {
      this.output = {
        isError: true,
        message: 'Por favor digite la etiqueta',
      };
      return true;
    }

    if (!this.consecTip) {
      this.output = {
        isError: true,
        message: 'Consectip no fue digitado',
      };
      return true;
    }

    return false;
  }
}
</script>
