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

    <div class="card-table">
      <table class="table-auto w-full text-xs">
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
            <th>Actualiza</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b border-gray-500"
            v-for="d in tblSubRepratoCons"
            :key="d.auton"
          >
            <td style="visibility: collapse; display: none">
              {{ d.nReparto }}
            </td>
            <td class="text-center">{{ d.codigoIndiv }}</td>
            <td class="text-center">{{ d.horaRep }}</td>
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
            <td class="text-center">{{ $booleanToString(d.actualiza) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ButtonPagination
      :key="0"
      :currentPagination="pagination"
      :currentDataLength="tblSubRepratoCons.length"
      @click="loadMore"
    >
      Cargar más
    </ButtonPagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import ButtonPagination from '@/components/reusable/ButtonPagination.vue';
import Loader from '@/components/reusable/Loader.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import RepartoAPI from '@/remote/api/reparto/repartoAPI';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { captureException } from '@sentry/browser';
import {
  ICodigoPiel,
  ICodigoVendedor,
  IMesa,
  ISexo,
  ISubReparto,
  ITransport,
  SubReparto,
} from '@/remote/api/reparto/types';
import moment from 'moment';

@Component({
  components: {
    AlertBox,
    ButtonPagination,
    Loader,
    PaginatedSelect,
  },
  name: 'SubRepartoCons',
})
export default class SubRepartoCons extends Vue {
  private isLoading: boolean = false;
  private pagination: IPagination = {
    limit: 100,
    skip: 0,
  };
  private output = {
    isError: false,
    message: '',
  };

  private tblSubRepratoCons: SubReparto = [];

  private repartoApi = new RepartoAPI(this.$store.getters.getAuthToken);

  private async mounted() {
    await this.fetchData();
  }

  private async fetchData() {
    this.isLoading = true;
    try {
      const response = await this.repartoApi.subReparto.getSubRepatConst(
        this.pagination,
      );
      this.tblSubRepratoCons = response.data.map<ISubReparto>(
        (e: ISubReparto) => {
          return { ...e, horaRep: moment(e.horaRep).utc().format('LT') };
        },
      );
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
          id: e.idSexo,
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

  private async loadMore() {
    this.pagination.skip += this.pagination.limit;
    await this.fetchData();
  }
}
</script>
