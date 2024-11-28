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
  <div class="flex flex-col">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>

    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <div class="main-div">
      <div class="flex flex-row flex-wrap">
        <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0">
          <h1 class="title">TIPOS PESAJE VISCERAS</h1>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-2 justify-end">
        <div class="pr-24 mt-2 md:mb-0">
          <button class="btn-primary" @click="adicionarResgistro()">
            Adicionar Registro
          </button>
          <button class="btn-save" @click="guardarRegistro()">Guardar</button>
          <button class="btn-delete" @click="modaldelete = !modaldelete">
            Eliminar
          </button>
        </div>
      </div>

      <div class="flex flex-row flex-wrap mb-2">
        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Tipo Pesaje:</label>
          <input type="text" class="input" v-model="IdTipoPesa" readonly />
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Descripcion:</label>
          <input
            type="text"
            class="input"
            v-model="Descripcion"
            :readonly="readonly"
            @change="onChangDescrip()"
            ref="Descricion"
          />
        </div>
      </div>

      <div class="border-b border-gray-300"></div>
      <br />

      <div class="flex flex-row flex-wrap mb-2">
        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Codigo:</label>
          <PaginatedSelect
            v-model="tblCodigo"
            :disabled="readonly2"
            :fetch="codigos"
            @error="showOutput"
          />
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">DescripcionCliente:</label>
          <input
            type="text"
            class="input"
            v-model="DescripcionCliente"
            :readonly="readonly2"
          />
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Dias Vencidos:</label>
          <input
            type="text"
            class="input"
            v-model="DiasVenc"
            :readonly="readonly2"
          />
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Descripcion Temporal:</label>
          <input
            type="text"
            class="input"
            v-model="DescripcionTemp"
            :readonly="readonly2"
          />
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Unids/Visceras:</label>
          <input
            type="text"
            class="input"
            v-model="UnidaVisc"
            :readonly="readonly2"
          />
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Reango 1:</label>
          <input
            type="text"
            class="input"
            v-model="Rango1"
            :readonly="readonly2"
          />
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Rango 2:</label>
          <input
            type="text"
            class="input"
            v-model="Rango2"
            :readonly="readonly2"
          />
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Peso x Unidad:</label>
          <input
            type="checkbox"
            class="checkbox"
            v-model="pesoXUnid"
            :disabled="readonly2"
          />
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Unidad Canst:</label>
          <input
            type="text"
            class="input"
            v-model="undadCanst"
            :readonly="readonly2"
          />
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">
            Codigo_E_Vacio:
            <select class="select" v-model="CodBs" :disabled="readonly2">
              <option :value="CodBs">{{ CodBs }}</option>
              <option
                v-for="(item, index) in CodigoBs"
                :key="index"
                :value="item.IdCodigo"
              >
                {{ item.DescripciónMer }}
              </option>
            </select>
          </label>
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">
            Codigo_E_Canast:
            <select class="select" v-model="CosBsCn" :disabled="readonly2">
              <option :value="CosBsCn">{{ CosBsCn }}</option>
              <option
                v-for="(item, index) in CodigoBs"
                :key="index"
                :value="item.IdCodigo"
              >
                {{ item.DescripciónMer }}
              </option>
            </select>
          </label>
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Control x Guia:</label>
          <input
            type="checkbox"
            class="checkbox"
            v-model="ControlxGuia"
            :disabled="readonly2"
          />
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">
            Destino:
            <select class="select" v-model="Destino" :disabled="readonly2">
              <option :value="Destino">{{ Destino }}</option>
              <option value="R">REFRIGERADO</option>
              <option value="C">CONGELADO</option>
            </select>
          </label>
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Kilos Max/canas:</label>
          <input type="text" class="input" v-model="KileosMax" />
        </div>

        <div class="pl-10 mb-6 md:mb-0 inline-block relative w-64">
          <label class="label">Codigo:</label>
          <PaginatedSelect
            v-model="TipoCn"
            :fetch="tipoCns"
            @error="showOutput"
          />
        </div>
      </div>

      <!-- table -->
      <div class="flex flex-row flex-wrap mb-3">
        <div class="card-table h-48">
          <table class="table-auto w-full text-xs">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>Codigo</th>
                <th>Descripcion Propia</th>
                <th>Decripcion Cliente</th>
                <th>Dias Vencidos</th>
                <th>Unids/Viscera</th>
                <th>Rango 1</th>
                <th>Rango 2</th>
                <th>Peso Undad</th>
                <th>Control x Guia</th>
                <th>Unidads/Canast</th>
                <th>Codigo E_Vacio</th>
                <th>Destino</th>
                <th>Kilos Max/cana</th>
                <th>Tipo Cn</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(item, index) in TablaPesajes" :key="index">
                <td>{{ item.codProduc }}</td>
                <td>{{ item.descCliente }}</td>
                <td>{{ item.descCliente }}</td>
                <td>{{ item.diasVenc }}</td>
                <td>{{ item.unidVisceras }}</td>
                <td>{{ item.rang1 }}</td>
                <td>{{ item.rang2 }}</td>
                <td>{{ item.pesoxUnid }}</td>
                <td>{{ item.controlxGuia }}</td>
                <td>{{ item.unidCanast }}</td>
                <td>{{ item.codigoBs }}</td>
                <td>{{ item.codigoBsCn }}</td>
                <td>{{ item.kilxEmpa }}</td>
                <td>{{ item.tpCanas }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal delete TipoPes -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="modaldelete"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8; Esta seguro que desea eliminar este campo ?</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-succes" @click="buttonModalSi()">
                    Si
                  </button>
                </div>
                <div
                  class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-danger" @click="closeModalDelete()">
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal delete TipoPes -->
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import PaginatedSelect from '../reusable/PaginatedSelect.vue';
import { BaseResponse } from '@/types';
import IQuery from '@/types/query';

@Component({
  components: {
    AlertBox,
    Loader,
    PaginatedSelect,
  },
  name: 'VisTipoPes',
})
export default class ViscTipoPesaComponent extends Vue {
  private output = '';
  private isError: boolean = false;

  private modaldelete: boolean = false;

  private DirIdTipoPesa: any = [];
  private CodigoBs: any = [];
  private listIdTipoPesa: any = [];
  private FinalTipoPesa: number = 0;

  private TablaPesajes: any = [];

  private IdTipoPesa: number = 0;

  private tblCodigo: string = '';
  private TipoCn: number = 0;
  private Destino: string = '';
  private CodBs: string = '';
  private CosBsCn: string = '';
  private Descripcion: string = '';
  private DescripcionCliente: string = '';
  private DescripcionTemp: string = '';
  private DiasVenc: number = 0;
  private Rango1: number = 0;
  private Rango2: number = 0;
  private pesoXUnid: boolean = false;
  private ControlxGuia: boolean = false;
  private KileosMax: number = 0;
  private UnidaVisc: number = 0;
  private undadCanst: number = 0;

  private readonly = false;
  private readonly2 = false;

  private isLoading: boolean = false;

  private TipoPesaApi = new MovViserasApi(this.$store.getters.getAuthToken);

  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async mounted() {
    this.formCurrent();
    await this.productDH();
  }

  private formCurrent() {
    this.readonly = true;
    this.readonly2 = true;
  }

  private async adicionarResgistro() {
    const result: any = await this.tblVisPesTpConfEnc();

    result + 1 === null
      ? (this.IdTipoPesa = 1)
      : (this.IdTipoPesa = result + 1);

    this.readonly = false;
    this.readonly2 = false;

    const descro = this.$refs.Descricion as HTMLElement;

    descro.focus();
    this.Descripcion = '';
  }

  private async tblVisPesTpConfEnc() {
    this.isLoading = true;
    try {
      const response = await this.TipoPesaApi.getVisTipoPes();

      if (response.data.length === 0) {
        return null;
      }

      for (const i of response.data) {
        this.DirIdTipoPesa.push(i.idTpPesado);
      }

      return Math.max(...this.DirIdTipoPesa);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async productDH() {
    try {
      const response = await this.TipoPesaApi.getProductoDH();
      this.CodigoBs = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async tblTipoPesjes(idPesaje: number) {
    this.isLoading = true;
    try {
      const response = await this.TipoPesaApi.getTipoPesaDet(idPesaje);
      this.TablaPesajes = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async onChangeCodigo() {
    this.isLoading = true;
    try {
      const response = await this.TipoPesaApi.getCodigProducDes(this.tblCodigo);
      this.DescripcionCliente = response.data[0].DescripciónMer;
      this.UnidaVisc = 1;
      this.KileosMax = 1;
      this.undadCanst = 1;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private onChangDescrip() {
    if (this.Descripcion.length > 0) {
      this.readonly2 = false;
    }
  }

  private async guardarRegistro() {
    if (this.validation()) {
      return;
    }

    try {
      const response = await this.TipoPesaApi.getVisTipoPes();
      for (const i of response.data) {
        this.listIdTipoPesa.push(i.idTpPesado);
      }

      this.FinalTipoPesa = this.listIdTipoPesa.pop();

      if (this.IdTipoPesa === this.FinalTipoPesa) {
        await this.guardarTabla();
        return;
      }

      await this.guardarTipoPes();
      await this.guardarTabla();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.messege);
    }
  }

  private async guardarTabla() {
    try {
      const response = await this.TipoPesaApi.postVisTipoPes({
        codProduc: this.tblCodigo,
        codigoBs: this.CodBs,
        codigoBsCn: this.CosBsCn,
        controlxGuia: this.ControlxGuia,
        descCliente: this.DescripcionCliente,
        descTemper: this.DescripcionTemp,
        destinoPr: this.Destino,
        diasVenc: this.DiasVenc,
        idTpPesado: this.IdTipoPesa,
        imprimeEt: 1,
        kilxEmpa: this.KileosMax,
        pesoxUnid: this.pesoXUnid,
        rang1: this.Rango1,
        rang2: this.Rango2,
        tpCanas: this.TipoCn,
        unidCanast: this.undadCanst,
        unidVisceras: this.UnidaVisc,
      });

      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
      }

      await this.tblTipoPesjes(this.IdTipoPesa);
      this.clearFrom();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async guardarTipoPes() {
    try {
      const response = await this.TipoPesaApi.postTipoPes({
        descripIdTip: this.Descripcion,
        idTpPesado: this.IdTipoPesa,
      });
      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private validation() {
    if (this.tblCodigo === null || this.tblCodigo === '') {
      this.showOutput(true, 'El codigo no pude Ser vacion');
      return true;
    }

    if (this.DescripcionTemp === null || this.DescripcionTemp === '') {
      this.showOutput(true, 'La descripcion Temporal no pue estar vacio');
      return true;
    }

    if (this.DescripcionCliente === null || this.DescripcionCliente === '') {
      this.showOutput(true, 'la descrupcion del Cliente no puede ser vacio');
      return true;
    }

    return false;
  }

  private async eleinarReguitro(idTipoPesa: number) {
    await this.borrarTipoPesa(idTipoPesa);
    await this.borrartblTipoPesaDet(idTipoPesa);
    await this.tblTipoPesjes(idTipoPesa);
  }

  private async borrarTipoPesa(idTipoPes: number) {
    try {
      const response = await this.TipoPesaApi.deleteTipoPes(idTipoPes);

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async borrartblTipoPesaDet(idTipoPes: number) {
    try {
      const response = await this.TipoPesaApi.deleteTipoPesaDet(idTipoPes);

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async buttonModalSi() {
    if (this.IdTipoPesa === 0) {
      return;
    }
    await this.eleinarReguitro(this.IdTipoPesa);
    this.modaldelete = false;
    this.IdTipoPesa = 0;
  }

  private closeModalDelete() {
    this.modaldelete = false;
  }

  private clearFrom() {
    this.tblCodigo = '';
    this.CodBs = '';
    this.CosBsCn = '';
    this.ControlxGuia = false;
    this.DescripcionCliente = '';
    this.DescripcionTemp = '';
    this.Destino = '';
    this.DiasVenc = 0;
    this.KileosMax = 0;
    this.pesoXUnid = false;
    this.Rango1 = 0;
    this.Rango2 = 0;
    this.TipoCn = 0;
    this.UnidaVisc = 0;
    this.undadCanst = 0;
  }

  private async codigos(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        IdCodigo: number;
        DescripciónMer: string;
        TNivel: string;
        Suspendido: boolean;
      }>
    >;
    if (q.query) {
      response = await this.TipoPesaApi.getCodigoProductoFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.IdCodigo,
        item: d.DescripciónMer,
      }));
    }
    response = await this.TipoPesaApi.getCodigoProducto(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.IdCodigo,
      item: d.DescripciónMer,
    }));
  }

  private async tipoCns(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        idCaja: number;
        descripcionC: string;
        anchoC: number;
        altoC: number;
        fondoC: number;
        capacidadKl: number;
        pesoCaj: number;
      }>
    >;
    if (q.query) {
      response = await this.TipoPesaApi.getPicadoCajaFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.idCaja,
        item: `${d.descripcionC} | ${d.pesoCaj}`,
      }));
    }
    response = await this.TipoPesaApi.getPicadoCaja(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.idCaja,
      item: `${d.descripcionC} | ${d.pesoCaj}`,
    }));
  }
}
</script>
