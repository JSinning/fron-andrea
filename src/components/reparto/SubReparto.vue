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
      <table class="table-fixed text-xs">
        <thead>
          <tr class="border-b border-gray-500 text-white bg-andrea font-bold">
            <th style="visibility: collapse; display: none">NReparto</th>
            <th>Cod Individual</th>
            <th>Hora</th>
            <th>Pieles</th>
            <th class="md:w-12">Usuario</th>
            <th>Sexo</th>
            <th class="md:w-16">Mesa MC1</th>
            <th class="md:w-16">Transp. MC1</th>
            <th class="md:w-16">Mesa MC2</th>
            <th class="md:w-16">Transp. MC2</th>
            <th>NºVisc</th>
            <th class="md:w-16">Mesa Visc</th>
            <th class="md:w-16">Transp. Visc</th>
            <th>LP</th>
            <th>FRIO</th>
            <th>a</th>
            <th>b</th>
            <th>Observacion</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-gray-500" v-if="!viewAddRegistro">
            <td style="visibility: collapse; display: none">{{ nReparto }}</td>
            <td>
              <input
                type="text"
                class="input"
                v-model="IsubRepartoadd.codigoIndiv"
                @change="codigoIndiAfter"
              />
            </td>
            <td>
              <input
                type="datetime-local"
                class="input"
                v-model="IsubRepartoadd.horaRep"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="IsubRepartoadd.codPiel"
                :fetch="codigoPieles"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="IsubRepartoadd.codVended"
                :fetch="codigoVendedor"
              />
            </td>
            <td>
              <PaginatedSelect v-model="IsubRepartoadd.sexo" :fetch="sexo" />
            </td>
            <td>
              <PaginatedSelect
                v-model="IsubRepartoadd.mesas1"
                :fetch="codigoMesa"
                @change="afterMesa1"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="IsubRepartoadd.transport1"
                :fetch="codigoTransportad"
                @change="afterTransportad1"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="IsubRepartoadd.mesas2"
                :fetch="codigoMesa"
                @change="afterMesa2"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="IsubRepartoadd.transport2"
                :fetch="codigoTransportad"
                @change="afterTransportad2"
              />
            </td>
            <td>
              <input
                type="number"
                class="input"
                v-model="IsubRepartoadd.nViscera"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="IsubRepartoadd.mesasVisc"
                :fetch="codigoMesa"
              />
            </td>
            <td>
              <PaginatedSelect
                v-model="IsubRepartoadd.transport3"
                :fetch="codigoTransportad"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="checkBox"
                v-model="IsubRepartoadd.lavPanz"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="checkBox"
                v-model="IsubRepartoadd.frio"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="checkBox"
                v-model="IsubRepartoadd.otros"
              />
            </td>
            <td>
              <input
                type="checkbox"
                class="checkBox"
                v-model="IsubRepartoadd.otros1"
              />
            </td>
            <td>
              <input
                type="text"
                class="input"
                v-model="IsubRepartoadd.observa"
              />
            </td>
          </tr>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblSubReprato"
            :key="d.auton"
            @click="selectElement(d)"
          >
            <template v-if="d.auton === IsubRepartoEdit.auton && !readonly">
              <td style="visibility: collapse; display: none">
                {{ IsubRepartoEdit.nReparto }}
              </td>
              <td class="text-center">
                <input
                  type="number"
                  class="input"
                  v-model="IsubRepartoEdit.codigoIndiv"
                  @change="subRepatoUpadte"
                />
              </td>
              <td class="text-center">
                <input
                  type="datetime-local"
                  class="input"
                  v-model="IsubRepartoEdit.horaRep"
                  @change="subRepatoUpadte"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="IsubRepartoEdit.codPiel"
                  :fetch="codigoPieles"
                  @change="subRepatoUpadte"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="IsubRepartoEdit.codVended"
                  :fetch="codigoVendedor"
                  @change="subRepatoUpadte"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="IsubRepartoEdit.sexo"
                  :fetch="sexo"
                  @change="subRepatoUpadte"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="IsubRepartoEdit.mesas1"
                  :fetch="codigoMesa"
                  @change="afterMesa1Update"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="IsubRepartoEdit.transport1"
                  :fetch="codigoTransportad"
                  @change="afterTransportad1Update"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="IsubRepartoEdit.mesas2"
                  :fetch="codigoMesa"
                  @change="afterMesa2Update"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="IsubRepartoEdit.transport2"
                  :fetch="codigoTransportad"
                  @change="afterMesa2Update"
                />
              </td>
              <td class="text-center">
                <input
                  type="number"
                  class="input"
                  v-model="IsubRepartoEdit.nViscera"
                  @change="subRepatoUpadte"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="IsubRepartoEdit.mesasVisc"
                  :fetch="codigoMesa"
                  @change="subRepatoUpadte"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="IsubRepartoEdit.transport3"
                  :fetch="codigoTransportad"
                  @change="subRepatoUpadte"
                />
              </td>
              <td class="text-center">
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="IsubRepartoEdit.lavPanz"
                  @change="subRepatoUpadte"
                />
              </td>
              <td class="text-center">
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="IsubRepartoEdit.frio"
                  @change="subRepatoUpadte"
                />
              </td>
              <td class="text-center">
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="IsubRepartoEdit.otros"
                  @change="subRepatoUpadte"
                />
              </td>
              <td class="text-center">
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="IsubRepartoEdit.otros1"
                  @change="subRepatoUpadte"
                />
              </td>
              <td class="text-center">
                <input
                  type="text"
                  class="input"
                  v-model="IsubRepartoEdit.observa"
                  @change="subRepatoUpadte"
                />
              </td>
            </template>
            <template v-else>
              <td style="visibility: collapse; display: none">
                {{ d.nReparto }}
              </td>
              <td class="text-center">{{ d.codigoIndiv }}</td>
              <td class="text-center">{{ convertToTime(d.horaRep) }}</td>
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
              <td>
                <PaginatedSelect
                  v-model="d.mesas1"
                  :fetch="codigoMesa"
                  disabled
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="d.transport1"
                  :fetch="codigoTransportad"
                  disabled
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="d.mesas2"
                  :fetch="codigoMesa"
                  disabled
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="d.transport2"
                  disabled
                  :fetch="codigoTransportad"
                />
              </td>
              <td class="text-center">{{ d.nViscera }}</td>
              <td>
                <PaginatedSelect
                  v-model="d.mesasVisc"
                  disabled
                  :fetch="codigoMesa"
                />
              </td>
              <td>
                <PaginatedSelect
                  v-model="d.transport3"
                  disabled
                  :fetch="codigoTransportad"
                />
              </td>
              <td class="text-center">{{ $booleanToString(d.lavPanz) }}</td>
              <td class="text-center">{{ $booleanToString(d.frio) }}</td>
              <td class="text-center">{{ $booleanToString(d.otros) }}</td>
              <td class="text-center">{{ $booleanToString(d.otros1) }}</td>
              <td class="text-center">{{ d.observa }}</td>
            </template>
          </tr>
        </tbody>
      </table>
      <ButtonPagination
        :key="nReparto"
        :currentPagination="pagination"
        :currentDataLength="tblSubReprato.length"
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
import RepartoAPI from '@/remote/api/reparto/repartoAPI';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';
import {
  ICodigoPiel,
  ICodigoVendedor,
  IMesa,
  ISexo,
  ISubReparto,
  ITransport,
} from '@/remote/api/reparto/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { captureException } from '@sentry/browser';
import moment from 'moment';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'SubReparto',
})
export default class SubReparto extends Vue {
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

  private IsubRepartoEdit: ISubReparto = {
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

  private IsubRepartoadd: ISubReparto = {
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

  private tblSubReprato: ISubReparto[] = [];

  private repartoApi = new RepartoAPI(this.$store.getters.getAuthToken);

  private async mounted() {
    await this.fetchData(this.nReparto);
  }

  private selectElement(d: ISubReparto) {
    this.IsubRepartoEdit = {
      ...d,
      horaRep: moment(d.horaRep).utc().format('YYYY-MM-DDTHH:mm'),
    };
  }

  private convertToTime(data: string) {
    return moment(data).utc().format('LT');
  }

  private async afterMesa1Update() {
    if (!this.IsubRepartoEdit.mesas2) {
      this.IsubRepartoEdit.mesas2 = this.IsubRepartoEdit.mesas1;
    }
    if (!this.IsubRepartoEdit.mesasVisc) {
      this.IsubRepartoEdit.mesasVisc = this.IsubRepartoEdit.mesas1;
    }
    await this.subRepatoUpadte();
  }

  private async afterMesa2Update() {
    this.IsubRepartoEdit.mesasVisc = this.IsubRepartoEdit.mesas2;
    await this.subRepatoUpadte();
  }

  private async afterTransportad1Update() {
    if (!this.IsubRepartoEdit.transport2) {
      this.IsubRepartoEdit.transport2 = this.IsubRepartoEdit.transport1;
    }
    if (!this.IsubRepartoEdit.mesasVisc) {
      this.IsubRepartoEdit.transport3 = this.IsubRepartoEdit.transport1;
    }
    await this.subRepatoUpadte();
  }

  private async afterTransportad2Update() {
    this.IsubRepartoEdit.transport3 = this.IsubRepartoEdit.transport2;
    await this.subRepatoUpadte();
  }

  private async afterMesa1() {
    if (!this.IsubRepartoadd.mesas2) {
      this.IsubRepartoadd.mesas2 = this.IsubRepartoadd.mesas1;
    }
    if (!this.IsubRepartoadd.mesasVisc) {
      this.IsubRepartoadd.mesasVisc = this.IsubRepartoadd.mesas1;
    }
  }

  private async afterMesa2() {
    this.IsubRepartoadd.mesasVisc = this.IsubRepartoadd.mesas2;
  }

  private async afterTransportad1() {
    if (!this.IsubRepartoadd.transport2) {
      this.IsubRepartoadd.transport2 = this.IsubRepartoadd.transport1;
    }
    if (!this.IsubRepartoadd.mesasVisc) {
      this.IsubRepartoadd.transport3 = this.IsubRepartoadd.transport1;
    }
  }

  private async afterTransportad2() {
    this.IsubRepartoadd.transport3 = this.IsubRepartoadd.transport2;
  }

  private async codigoIndiAfter() {
    if (this.IsubRepartoadd.codigoIndiv > this.nAnimal) {
      this.output = {
        isError: true,
        message: 'Codigo Animal no puede ser mayor al total de animales',
      };
      return;
    }
    if ((await this.codigoAnimal(this.IsubRepartoadd.codigoIndiv)) > 0) {
      this.output = { isError: true, message: 'Codigo Animal ya Existe' };
      this.IsubRepartoadd.codigoIndiv = 0;
    }

    await this.reparCliente(this.IsubRepartoadd.codigoIndiv);

    if (!this.IsubRepartoadd.horaRep) {
      this.IsubRepartoadd.horaRep = moment().format('YYYY-MM-DDTHH:mm');
    }
  }

  private async codigoAnimal(codigoIndiv: number): Promise<number> {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.subReparto.getCodigoAnimal(
        this.nGuia,
        codigoIndiv,
      );

      return response.data.length;
    } catch (e) {
      this.output = { isError: true, message: e.message };
      this.IsubRepartoadd.codigoIndiv = 0;
    } finally {
      this.isLoading = false;
    }
  }

  private async reparCliente(codigoIndiv: number) {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.subReparto.getReparCliente(
        this.nGuia,
        codigoIndiv,
      );

      this.IsubRepartoadd.codVended = response.data.nitTercero;
      this.IsubRepartoadd.sexo = response.data.sexo.toString();
    } catch (e) {
      this.output = {
        isError: true,
        message: 'Codigo Cliente No Existe en Reparto',
      };
      this.IsubRepartoadd.codigoIndiv = 0;
    } finally {
      this.isLoading = false;
    }
  }

  private async save() {
    if (this.validation()) {
      return;
    }
    if (!this.IsubRepartoadd.horaRep) {
      this.IsubRepartoadd.horaRep = moment().format('YYYY-MM-DDTHH:mm');
      return;
    }
    if (!this.IsubRepartoadd.codPiel) {
      this.output = { isError: true, message: 'Pieles no puede ser nula' };
      return;
    }
    this.IsubRepartoadd.actualiza = true;
    this.IsubRepartoadd.fechaR = moment().utc().format('YYYY-MM-DD');
    await this.subRepratoAdd();
  }

  private async subRepratoAdd() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.subReparto.postSubReparto({
        ...this.IsubRepartoadd,
        fechaR: moment().utc().format('YYYY-MM-DD'),
        nReparto: this.nReparto,
      });

      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }

      await this.fetchData(this.nReparto);

      this.IsubRepartoadd = {
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

  private async subRepatoUpadte() {
    this.isLoading = true;
    try {
      if (!this.IsubRepartoEdit.horaRep) {
        return;
      }
      if (!this.IsubRepartoEdit.codPiel) {
        this.output = { isError: true, message: 'Pieles no puede ser nula' };
        return;
      }
      this.IsubRepartoEdit.actualiza = true;
      const response = await this.repartoApi.subReparto.putSubReparto(
        this.IsubRepartoEdit,
        this.IsubRepartoEdit.nReparto,
        this.IsubRepartoEdit.codigoIndiv,
      );
      if (response.statusCode === 200) {
        this.output = { isError: false, message: response.message };
      }
      await this.fetchData(this.nReparto);
      this.IsubRepartoEdit.auton = null;
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
      const response = await this.repartoApi.subReparto.getSubReparto(
        nReparto,
        this.pagination,
      );
      this.tblSubReprato = response.data;
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    } finally {
      this.isLoading = false;
    }
  }

  private async codigoPieles(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<ICodigoPiel, 'codProve' | 'codPieles'>>
      >;
      if (q.query) {
        response = await this.repartoApi.subReparto.getCodigoPielFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ICodigoPiel, 'codProve' | 'codPieles'>) => ({
            id: e.codProve,
            item: e.codPieles,
          }),
        );
      }
      response = await this.repartoApi.subReparto.getCodigoPiel(p);
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
        response = await this.repartoApi.subReparto.getCodigoVendedorFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ICodigoVendedor, 'codCliente' | 'codTerc'>) => ({
            id: e.codCliente,
            item: e.codTerc,
          }),
        );
      }
      response = await this.repartoApi.subReparto.getCodigoVendedor(p);
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

  private async sexo(p?: IPagination, q?: IQuery) {
    try {
      const response = await this.repartoApi.subReparto.getSexo(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<ISexo, 'idSexo' | 'descripcionSex'>) => ({
          id: e.idSexo.toString(),
          item: e.descripcionSex,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    }
  }

  private async codigoMesa(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<Array<Pick<IMesa, 'mesas' | 'descripcionM'>>>;
      if (q.query) {
        response = await this.repartoApi.subReparto.getMesaFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<IMesa, 'mesas' | 'descripcionM'>) => ({
            id: e.mesas,
            item: e.mesas,
          }),
        );
      }
      response = await this.repartoApi.subReparto.getMesa(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<IMesa, 'mesas' | 'descripcionM'>) => ({
          id: e.mesas,
          item: e.mesas,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    }
  }

  private async codigoTransportad(p?: IPagination, q?: IQuery) {
    try {
      let response: BaseResponse<
        Array<Pick<ITransport, 'idTransport' | 'descripTrans'>>
      >;
      if (q.query) {
        response = await this.repartoApi.subReparto.getTransportFind(q);
        return response.data.map<IInterfaceSelect>(
          (e: Pick<ITransport, 'idTransport' | 'descripTrans'>) => ({
            id: e.idTransport,
            item: e.idTransport,
          }),
        );
      }
      response = await this.repartoApi.subReparto.getTransport(p);
      return response.data.map<IInterfaceSelect>(
        (e: Pick<ITransport, 'idTransport' | 'descripTrans'>) => ({
          id: e.idTransport,
          item: e.idTransport,
        }),
      );
    } catch (e) {
      captureException(e);
      this.output = { isError: true, message: e.message };
    }
  }

  private validation(): boolean {
    if (!this.nReparto) {
      this.output = {
        isError: true,
        message: 'El reparto no puede estar vacio',
      };
      return true;
    }

    if (!this.IsubRepartoadd.codigoIndiv) {
      this.output = {
        isError: true,
        message: 'El codigo individual no puede estar vacio',
      };
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
