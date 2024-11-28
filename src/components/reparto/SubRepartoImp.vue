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
      <table class="table-auto w-full text-xs">
        <thead>
          <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
            <th style="visibility: collapse; display: none">NReparto</th>
            <th class="px-5">cod</th>
            <th>Hora</th>
            <th>Pieles</th>
            <th>Usuario</th>
            <th>Sexo</th>
            <th class="px-5">MC1</th>
            <th class="px-5">MC2</th>
            <th class="px-5">NºVisc</th>
            <th class="px-5">M-Visc</th>
            <th>LP</th>
            <th>FRIO</th>
            <th>OT1</th>
            <th>OT2</th>
            <th class="px-20">Observacion</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-500">
            <td style="visibility: collapse; display: none">
              {{ ISubRepartoImpAdd.nReparto }}
            </td>
            <td>
              <input
                type="text"
                class="input"
                v-model="ISubRepartoImpAdd.codigoIndiv"
                @change="codigoIndiAfter"
              />
            </td>
            <td>
              <input
                type="datetime-local"
                class="input"
                v-model="ISubRepartoImpAdd.horaRep"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="ISubRepartoImpAdd.codPiel"
                :fetch="codigoPieles"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="ISubRepartoImpAdd.codVended"
                :fetch="codigoVendedor"
              />
            </td>
            <td>
              <PaginatedSelect v-model="ISubRepartoImpAdd.sexo" :fetch="sexo" />
            </td>
            <td>
              <input
                type="text"
                class="input"
                v-model="ISubRepartoImpAdd.mesas1"
                @change="afteMesa1Add"
              />
            </td>
            <td>
              <input
                type="text"
                class="input"
                v-model="ISubRepartoImpAdd.mesas2"
              />
            </td>
            <td>
              <input
                type="text"
                class="input"
                v-model="ISubRepartoImpAdd.nViscera"
              />
            </td>
            <td>
              <input
                type="text"
                class="input"
                v-model="ISubRepartoImpAdd.mesasVisc"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="checkBox"
                v-model="ISubRepartoImpAdd.lavPanz"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="checkBox"
                v-model="ISubRepartoImpAdd.frio"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="checkBox"
                v-model="ISubRepartoImpAdd.otros"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="checkBox"
                v-model="ISubRepartoImpAdd.otros1"
              />
            </td>
            <td class="text-center">
              <input
                type="text"
                class="input"
                v-model="ISubRepartoImpAdd.observa"
              />
            </td>
          </tr>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblSubRepartoImp"
            :key="d.auton"
            @click="selectElement(d)"
          >
            <template v-if="d.auton === ISubRepartoImpEdit.auton">
              <td style="visibility: collapse; display: none">
                {{ ISubRepartoImpEdit.nReparto }}
              </td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="ISubRepartoImpEdit.codigoIndiv"
                  @change="subRepartoUpdate"
                />
              </td>
              <td>
                <input
                  type="datetime-local"
                  class="input"
                  v-model="ISubRepartoImpEdit.horaRep"
                  @change="subRepartoUpdate"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="ISubRepartoImpEdit.codPiel"
                  :fetch="codigoPieles"
                  @change="subRepartoUpdate"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="ISubRepartoImpEdit.codVended"
                  :fetch="codigoVendedor"
                  @change="subRepartoUpdate"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="ISubRepartoImpEdit.sexo"
                  :fetch="sexo"
                  @change="subRepartoUpdate"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="ISubRepartoImpEdit.mesas1"
                  @change="afteMesa1"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="ISubRepartoImpEdit.mesas2"
                  @change="subRepartoUpdate"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="ISubRepartoImpEdit.nViscera"
                  @change="subRepartoUpdate"
                />
              </td>
              <td>
                <input
                  type="text"
                  class="input"
                  v-model="ISubRepartoImpEdit.mesasVisc"
                  @change="subRepartoUpdate"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="ISubRepartoImpEdit.lavPanz"
                  @change="subRepartoUpdate"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="ISubRepartoImpEdit.frio"
                  @change="subRepartoUpdate"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="ISubRepartoImpEdit.otros"
                  @change="subRepartoUpdate"
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="ISubRepartoImpEdit.otros1"
                  @change="subRepartoUpdate"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="ISubRepartoImpEdit.observa"
                  @change="subRepartoUpdate"
                />
              </td>
            </template>
            <template v-else>
              <td style="visibility: collapse; display: none">
                {{ d.nReparto }}
              </td>
              <td>{{ d.codigoIndiv }}</td>
              <td>{{ convertToTime(d.horaRep) }}</td>
              <td>
                <PaginatedSelect
                  v-model="d.codPiel"
                  :fetch="codigoPieles"
                  disabled
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="d.codVended"
                  :fetch="codigoVendedor"
                  disabled
                />
              </td>
              <td>
                <PaginatedSelect v-model="d.sexo" :fetch="sexo" disabled />
              </td>
              <td>{{ d.mesas1 }}</td>
              <td>{{ d.mesas2 }}</td>
              <td>{{ d.nViscera }}</td>
              <td>{{ d.mesasVisc }}</td>
              <td>{{ $booleanToString(d.lavPanz) }}</td>
              <td>{{ $booleanToString(d.frio) }}</td>
              <td>{{ $booleanToString(d.otros) }}</td>
              <td>{{ $booleanToString(d.otros1) }}</td>
              <td>{{ d.observa }}</td>
            </template>
          </tr>
        </tbody>
      </table>
      <ButtonPagination
        :key="nReparto"
        :currentPagination="pagination"
        :currentDataLength="tblSubRepartoImp.length"
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
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { captureException } from '@sentry/browser';
import { BaseResponse } from '@/types';
import IQuery from '@/types/query';
import RepartoAPI from '@/remote/api/reparto/repartoAPI';
import {
  ICodigoPiel,
  ICodigoVendedor,
  ISubRepartoImp,
} from '@/remote/api/reparto/types';
import moment from 'moment';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'SubRepartoImp',
})
export default class SubRepartoImp extends Vue {
  @Prop(Number) public nReparto: number;
  @Prop(Number) public nAnimal: number;
  @Prop(Number) public nGuia: number;
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

  private itemsSexo: IInterfaceSelect[] = [];

  private tblSubRepartoImp: ISubRepartoImp[] = [];

  private ISubRepartoImpEdit: ISubRepartoImp = {
    actualiza: false,
    auton: 0,
    codPiel: '',
    codVended: '',
    codigoIndiv: 0,
    fechaR: '',
    frio: false,
    horaRep: '',
    lavPanz: false,
    mesas1: '',
    mesas2: '',
    mesasVisc: '',
    nReparto: 0,
    nViscera: 0,
    observa: '',
    otros: false,
    otros1: false,
    sexo: '',
    transport1: '',
    transport2: '',
    transport3: '',
  };

  private ISubRepartoImpAdd: ISubRepartoImp = {
    actualiza: false,
    codPiel: '',
    codVended: '',
    codigoIndiv: 0,
    fechaR: '',
    frio: false,
    horaRep: '',
    lavPanz: false,
    mesas1: '',
    mesas2: '',
    mesasVisc: '',
    nReparto: 0,
    nViscera: 0,
    observa: '',
    otros: false,
    otros1: false,
    sexo: '',
    transport1: '',
    transport2: '',
    transport3: '',
  };

  private repartoApi = new RepartoAPI(this.$store.getters.getAuthToken);

  private async mounted() {
    await this.fetchData(this.nReparto);
  }

  private convertToTime(data: string) {
    return moment(data).utc().format('LT');
  }

  private selectElement(d: ISubRepartoImp) {
    this.ISubRepartoImpEdit = {
      ...d,
      horaRep: moment(d.horaRep).utc().format('YYYY-MM-DDTHH:mm'),
    };
  }

  private async afteMesa1() {
    this.ISubRepartoImpEdit.mesas2 = this.ISubRepartoImpEdit.mesas1;
    this.ISubRepartoImpEdit.mesasVisc = this.ISubRepartoImpEdit.mesas1;
    await this.subRepartoUpdate();
  }
  private afteMesa1Add() {
    this.ISubRepartoImpAdd.mesas2 = this.ISubRepartoImpAdd.mesas1;
    this.ISubRepartoImpAdd.mesasVisc = this.ISubRepartoImpAdd.mesas1;
  }

  private async save() {
    if (this.validationData(this.ISubRepartoImpAdd)) {
      return;
    }
    if (!this.ISubRepartoImpAdd.horaRep) {
      this.ISubRepartoImpAdd.horaRep = moment().format('YYYY-MM-DDTHH:mm');
      return;
    }
    await this.subRepratoImpAdd();
  }

  private async codigoIndiAfter() {
    if (this.ISubRepartoImpAdd.codigoIndiv > this.nAnimal) {
      this.output = {
        isError: true,
        message: 'Codigo Animal no puede ser mayor al total de animales',
      };
      return;
    }
    if ((await this.codigoAnimal(this.ISubRepartoImpAdd.codigoIndiv)) > 0) {
      this.output = { isError: true, message: 'Codigo Animal ya Existe' };
      this.ISubRepartoImpAdd.codigoIndiv = 0;
      return;
    }
  }

  private async codigoAnimal(codigoIndiv: number): Promise<number> {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.subRepartoImp.getCodigoAnimal(
        this.nGuia,
        codigoIndiv,
      );

      return response.data.length;
    } catch (e) {
      this.output = { isError: true, message: e.message };
      this.ISubRepartoImpAdd.codigoIndiv = 0;
    } finally {
      this.isLoading = false;
    }
  }

  private async subRepratoImpAdd() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.subRepartoImp.postSubImp({
        ...this.ISubRepartoImpAdd,
        actualiza: true,
        fechaR: moment().utc().format('YYYY-MM-DD'),
        nReparto: this.nReparto,
      });

      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }

      await this.fetchData(this.nReparto);

      this.ISubRepartoImpAdd = {
        actualiza: false,
        codPiel: '',
        codVended: '',
        codigoIndiv: 0,
        fechaR: '',
        frio: false,
        horaRep: '',
        lavPanz: false,
        mesas1: '',
        mesas2: '',
        mesasVisc: '',
        nReparto: 0,
        nViscera: 0,
        observa: '',
        otros: false,
        otros1: false,
        sexo: '',
        transport1: '',
        transport2: '',
        transport3: '',
      };
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async subRepartoUpdate() {
    this.isLoading = true;
    try {
      if (this.validationData(this.ISubRepartoImpEdit)) {
        return;
      }
      if (!this.ISubRepartoImpEdit.horaRep) {
        this.ISubRepartoImpEdit.horaRep = moment()
          .utc()
          .format('YYYY-MM-DDTHH:mm');
      }
      const response = await this.repartoApi.subRepartoImp.putSubRepartoImp(
        this.ISubRepartoImpEdit.nReparto,
        this.ISubRepartoImpEdit.codigoIndiv,
        { ...this.ISubRepartoImpEdit, actualiza: true },
      );
      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }
      await this.fetchData(this.nReparto);
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async fetchData(nReparto: number) {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.subRepartoImp.getSubRepartoImp(
        nReparto,
        this.pagination,
      );

      this.tblSubRepartoImp = response.data;
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private sexo(p?: IPagination, q?: IQuery) {
    this.itemsSexo.push(
      { id: 'M', item: 'Macho' },
      { id: 'H', item: 'Hembra' },
    );

    return this.itemsSexo.map<IInterfaceSelect>((e: any) => ({
      id: e.id,
      item: e.item,
    }));
  }

  private async codigoPieles(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<ICodigoPiel, 'codProve' | 'codPieles'>>
      >;
      if (q.query) {
        response = await this.repartoApi.subRepartoImp.getCodigoPielFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ICodigoPiel, 'codProve' | 'codPieles'>) => ({
            id: e.codProve,
            item: e.codPieles,
          }),
        );
      }
      response = await this.repartoApi.subRepartoImp.getCodigoPiel(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<ICodigoPiel, 'codProve' | 'codPieles'>) => ({
          id: e.codProve,
          item: e.codPieles,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    }
  }

  private async codigoVendedor(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<ICodigoVendedor, 'codCliente' | 'codTerc'>>
      >;
      if (q.query) {
        response = await this.repartoApi.subRepartoImp.getCodigoVendedorFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ICodigoVendedor, 'codCliente' | 'codTerc'>) => ({
            id: e.codCliente,
            item: e.codTerc,
          }),
        );
      }
      response = await this.repartoApi.subRepartoImp.getCodigoVendedor(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<ICodigoVendedor, 'codCliente' | 'codTerc'>) => ({
          id: e.codCliente,
          item: e.codTerc,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    }
  }

  private validationData(data: ISubRepartoImp): boolean {
    if (!data.codPiel) {
      this.output = { isError: true, message: 'Pieles no puede ser nula' };
      return true;
    }
    if (!data.codVended) {
      this.output = { isError: true, message: 'Vendedor no puede ser nulo' };
      return true;
    }
    if (!data.mesas1) {
      this.output = { isError: true, message: 'Mesa MC1 no puede ser nula' };
      return true;
    }
    if (!data.mesas2) {
      this.output = { isError: true, message: 'Mesa MC2 no puede ser nula' };
      return true;
    }
    return false;
  }

  private async loadMore() {
    this.pagination.limit += this.pagination.limit;
    await this.fetchData(this.nReparto);
  }
}
</script>
