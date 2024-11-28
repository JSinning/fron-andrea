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
      <div>
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/3 px-3 mt-2 mb-6 md:mb-0">
            <h1 class="title">Relacion de Canal Despacho</h1>
          </div>
        </div>

        <div class="flex-wrap">
          <div v-if="RelaBusca" class="flex flex-row flex-wrap mb-3">
            <div class="flex flex-row flex-wrap p-3 w-full justify-end">
              <div class="md:w-10/12 px-3 mb-6 md:mb-0">
                <label class="label">
                  Buscar Relacion Despacho:
                  <PaginatedSelect
                    v-model="idConcecutivo"
                    :fetch="searchSelect"
                    @change="changeSearchByIdConsec"
                  >
                  </PaginatedSelect>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-2 justify-end">
          <div class="pr-48 mt-1 md:mb-0">
            <h2 class="title">{{ cofirmado }}</h2>
          </div>
          <div class="pr-3 mt-1 md:mb-0">
            <button class="btn-save" @click="RelaBusca = !RelaBusca">
              Buscar Registro
            </button>
            <button class="btn-primary" @click="confirmarRegistro()">
              Confirmar Registro
            </button>
            <button class="btn-save" @click="anularRegistro()">
              Anular Registro
            </button>
          </div>
        </div>

        <ul class="flex p-2 -mt-3">
          <li>
            <button class="rounded btn-save" @click="viewDataClient()">
              Datos Cliente
            </button>
          </li>

          <li>
            <button class="rounded btn-save" @click="viewDataDespa()">
              Detalle Despacho
            </button>
          </li>

          <li>
            <button
              class="rounded btn-save"
              @click="viewCDeConf()"
              :disabled="disableConfir"
            >
              Confirmar
            </button>
          </li>

          <li>
            <button
              class="rounded btn-save"
              @click="viewDesAnula()"
              :disabled="disbaleAnu"
            >
              Anular
            </button>
          </li>
        </ul>

        <div v-if="DCliente">
          <div class="card">
            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">
                  Tipos Movimiento:
                  <select
                    class="bg-white border py-1 pr-2 select"
                    v-model="tipoMov"
                    :disabled="readonly"
                  >
                    <option
                      v-for="(item, index) in tipoMovSelec"
                      :key="index"
                      :value="item.IdMovimiento"
                    >
                      {{ item.Expr1 }}
                    </option>
                  </select>
                </label>
              </div>
              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Docuento(C-F):</label>
                <input
                  type="text"
                  class="input"
                  v-model="document"
                  :readonly="readonly"
                />
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">Relacion de canal No:</label>
                <input
                  type="text"
                  class="input"
                  v-model="consecTip"
                  :readonly="readonly"
                />
              </div>

              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Destino</label>
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="destino"
                  disabled
                />
              </div>

              <div class="px-3 mb-6 md:mb-0">
                <div class="border-solid border border-indigo-600">
                  <div class="flex flex-row flex-wrap">
                    <div class="px-3 mb-6 md:mb-0">
                      <label class="label">Despacho:</label>
                      <input
                        type="checkbox"
                        class="checkbox"
                        v-model="despacho"
                        disabled
                      />
                    </div>
                    <div class="px-3 mb-6 md:mb-0">
                      <label class="label">Deshuese:</label>
                      <input
                        type="checkbox"
                        class="checkbox"
                        v-model="deshuse"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-40">
                <label class="label">Es propio:</label>
                <input
                  type="checkbox"
                  class="checkbox"
                  v-model="esPropio"
                  :disabled="readonly"
                />
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label"> Tercero: </label>
                <PaginatedSelect
                  v-model="nitoCC"
                  :disabled="readonly"
                  :fetch="nitoCCSelec"
                  @error="showOutput"
                />
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">
                  Transportador:
                  <input
                    type="text"
                    class="input"
                    v-model="transportador"
                    :readonly="readonly"
                  />
                </label>
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label"> ciudad envio: </label>
                <PaginatedSelect
                  v-model="ciudadEnvio"
                  :disabled="readonly"
                  :fetch="ciudades"
                  @error="showOutput"
                />
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-32">
                <label class="label">
                  Pais Envio:
                  <select
                    class="bg-white border py-1 pr-2 shadow leading-tight select"
                    v-model="paisEnvio"
                    :disabled="readonly"
                  >
                    <option
                      v-for="(item, index) in paisSelec"
                      :key="index"
                      :value="item.idPais"
                    >
                      {{ item.descripcionPais }}
                    </option>
                  </select>
                </label>
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">Fecha Movimiento:</label>
                <input
                  type="date"
                  class="input"
                  v-model="fechaMov"
                  :readonly="readonly"
                />
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">
                  Placa Vehiculo:
                  <input
                    type="text"
                    class="input"
                    v-model="placaVeh"
                    :readonly="readonly"
                  />
                </label>
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-48">
                <label class="label">Horometro:</label>
                <input
                  type="text"
                  class="input"
                  v-model="horometro"
                  :readonly="readonly"
                />
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label"> Conductor: </label>
                <PaginatedSelect
                  v-model="cConduct"
                  :disabled="readonly"
                  :fetch="conductoresNitSelect"
                />
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <PaginatedSelect
                  class="mt-4"
                  v-model="cConduct"
                  :disabled="readonly"
                  :fetch="conductoresNameSelect"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="DDespa">
        <div class="flex flex-row flex-wrap mb-3">
          <div class="card-table h-48">
            <table class="table-fixed w-full text-xs" id="tablaB">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th>Etiqueta</th>
                  <th>Codigo</th>
                  <th>Descripcion</th>
                  <th>Cant</th>
                  <th>Kilos CF</th>
                  <th>Kilos CC</th>
                  <th>Diferencia</th>
                  <th>PH</th>
                  <th>Temp</th>
                  <th>Guia No</th>
                  <th>N-Anim</th>
                  <th>Lado</th>
                  <th>Anular</th>
                  <th>Movimiento</th>
                </tr>
              </thead>
              <tbody
                class="text-center"
                v-for="(item, index) in tableDespaDetall"
                :key="index"
              >
                <tr>
                  <td>{{ item.etiqueta }}</td>
                  <td>{{ item.idCodigo }}</td>
                  <td v-for="(desc, index) in item.descrip" :key="index">
                    {{ desc.DescripciónMer }}
                  </td>
                  <td>{{ item.cantidadUn }}</td>
                  <td>{{ item.cantidad }}</td>
                  <td>{{ item.cantidad2 }}</td>
                  <td>{{ item.difer }}</td>
                  <td>{{ item.ph }}</td>
                  <td>{{ item.temperatur }}</td>
                  <td>{{ item.guiaNo }}</td>
                  <td>{{ item.nAnima }}</td>
                  <td>{{ item.ladoAni }}</td>
                  <td>{{ item.anular }}</td>
                  <td>{{ item.motivoAnula }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex flex-row flex-wrap mb-3 -mt-4">
          <div class="md:w-full">
            <button class="btn-primary w-full">
              Exportar Csv Datos Pesaje
            </button>
          </div>
        </div>
        <div class="flex flex-row flex-wrap mb-3">
          <div class="px-3 mb-6 md:mb-0">
            <input type="text" class="input" :readonly="readonly" />
          </div>
          <div class="flex flex-row flex-wrap">
            <label class="label">Total unidades y Kilos</label>
            <div class="px-3 mb-6 md:mb-0">
              <input
                type="text"
                class="input"
                v-model="sumaUnid"
                :readonly="readonly"
              />
            </div>
            <div class="px-3 mb-6 md:mb-0">
              <input
                type="text"
                class="input"
                v-model="SumaSubTotal"
                :readonly="readonly"
              />
            </div>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-3">
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">Despacho</label>
            <input
              type="text"
              class="input"
              v-model="entrego"
              :readonly="readonly"
            />
          </div>
          <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">Observaciones</label>
            <input
              type="text"
              class="input"
              v-model="observaciones"
              :readonly="readonly"
            />
          </div>
        </div>
      </div>

      <div v-if="DConfir">
        <div class="flex flex-row flex-wrap mb-3">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">Confirmar: </label>
            <input type="checkbox" class="checkBox" v-model="confirmar" />
            <label class="label">Observaciones: </label>
            <input type="text" class="input" v-model="observaciones2" />
            <button class="btn-save" @click="configProceso()">Confirmar</button>
          </div>
        </div>
      </div>
      <div v-if="DAnular">
        <div class="flex flex-row flex-wrap mb-3">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0 inline-block relative w-64">
            <label class="label">Anular: </label>
            <input type="checkbox" class="checkBox" v-model="anula" />
            <label class="label">Motivo: </label>
            <input type="text" class="input" v-model="motivoAnul" />
            <button class="btn-save" @click="anulaProceso()">Anular</button>
          </div>
        </div>
      </div>

      <hr />

      <div class="flex flex-row flex-wrap justify-between">
        <div class="flex flex-row inline-block relative items-center">
          <button class="btn-save" @click="disconnectPort">Desconectar</button>
          <select
            class="select mt-1"
            v-model="portPath"
            @focus="discoverPorts()"
            @blur="discoverPorts"
          >
            <option
              v-for="(port, index) in ports"
              v-bind:value="port.path"
              v-bind:key="`port-${index}`"
            >
              {{ port.path }}
            </option>
          </select>
          <button
            ref="connectPort"
            class="btn-save ml-2 md:ml-1"
            @click="connectToPort"
          >
            Conectar
          </button>
          <input
            type="text"
            disabled
            class="input w-1/2 md:mt-1"
            v-model="connectedDisconnected"
          />
        </div>
      </div>

      <!-- Modal delete Confirmar -->
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="modalConfirmar"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <div
              class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="text-lg"
                >Va a confirmar este documento, este proceso es
                irreversible</strong
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
      <!-- End Modal delete Confirmar -->

      <!-- Modal delete Confirmar -->
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="modalAnula"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <div
              class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="text-lg"
                >Va a anular este documento, este proceso es
                irreversible</strong
              >
              <div class="content-center mt-2">
                <div class="flex flex-row flex-wrap">
                  <div
                    class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-succes" @click="buttonModalAnulaSi()">
                      Si
                    </button>
                  </div>
                  <div
                    class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-danger" @click="closeModalDeletAnula()">
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal delete Confirmar -->
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import DespachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import PaginatedSelect from '../reusable/PaginatedSelect.vue';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    Loader,
    PaginatedSelect,
  },
  name: 'MovDespaNacCfAn',
})
export default class MovDespaNacCfAnComponent extends Vue {
  private ports: any[] = [];
  private isPortConnected: boolean = false;
  private portPath: string = '';
  private RelaBusca: boolean = false;
  private readonly: boolean = false;
  private modalConfirmar: boolean = false;
  private modalAnula: boolean = false;
  private disableConfir: boolean = false;
  private disbaleAnu: boolean = false;

  private output = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private DCliente: boolean = true;
  private DDespa: boolean = false;
  private DConfir: boolean = false;
  private DAnular: boolean = false;

  private idConcecutivo: number = 0;
  private tipoMov: number = 0;
  private document: number = 0;
  private consecTip: number = 0;
  private esPropio: boolean = false;
  private destino: boolean = false;
  private nitoCC: string = '';
  private transportador: string = '';
  private ciudadEnvio: string = '';
  private paisEnvio: string = '';
  private fechaMov: string = '';
  private placaVeh: string = '';
  private horometro: string = '';
  private cConduct: string = '';
  private entrego: string = '';
  private observaciones: string = '';
  private anulada: boolean = false;
  private usuario: string = '';
  private estacion: string = '';
  private fecha: string = '';
  private procesado: boolean = false;
  private observaciones2: string = '';
  private motivoAnul: string = '';

  private deshuse: number = 0;
  private despacho: number = 0;

  private cofirmado: string = '';
  private confirmar: boolean = false;
  private anula: boolean = false;

  private sumaUnid: number = 0;
  private SumaSubTotal: number = 0;

  private tipoMovSelec: any = [];
  private paisSelec: any = [];
  private tableDespaDetall: any = [];

  private despaNacCfAnApi = new DespachoNacionalApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    this.formCurrent();
    await this.selectTipoMov();
    await this.selectPaises();
  }

  private convertDate(date: string): string {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private formCurrent() {
    this.readonly = true;
  }
  private clearOutput() {
    this.output = '';
  }
  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private viewDataClient() {
    if (!this.DCliente) {
      this.DConfir = false;
      this.DAnular = false;
      this.DDespa = false;
      this.DCliente = true;
      return;
    }
  }

  private viewDataDespa() {
    if (!this.DDespa) {
      this.DConfir = false;
      this.DAnular = false;
      this.DDespa = true;
      this.DCliente = false;
      return;
    }
  }

  private viewCDeConf() {
    if (!this.DConfir) {
      this.DDespa = false;
      this.DCliente = false;
      this.DConfir = true;
      this.DAnular = false;
      return;
    }
  }

  private viewDesAnula() {
    if (!this.DAnular) {
      this.DDespa = false;
      this.DCliente = false;
      this.DConfir = false;
      this.DAnular = true;
      return;
    }
  }

  private confimacion(anulado: boolean) {
    if (!anulado) {
      this.cofirmado = 'Sin Confirmar';
      return;
    }
    this.cofirmado = 'Anulado';
  }

  private async selectTipoMov() {
    this.isLoading = true;
    try {
      const response = await this.despaNacCfAnApi.getTipoMov();
      this.tipoMovSelec = response.data[0];
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar tipo movimiento');
    } finally {
      this.isLoading = false;
    }
  }

  private async selectPaises() {
    this.isLoading = true;
    try {
      const response = await this.despaNacCfAnApi.getPises();
      this.paisSelec = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar paises');
    } finally {
      this.isLoading = false;
    }
  }

  private deshDespacho(destino: boolean) {
    if (destino) {
      this.despacho = 1;
      this.deshuse = 0;
      return;
    }
    this.despacho = 0;
    this.deshuse = 1;
  }

  private async changeSearchByIdConsec() {
    this.isLoading = true;
    try {
      const idConcecuti = this.idConcecutivo;
      const response =
        await this.despaNacCfAnApi.getShearchDespaIDMod(idConcecuti);
      this.tipoMov = response.data.tipoMov;
      this.document = response.data.document;
      this.consecTip = response.data.consecTip;
      this.destino = response.data.destino;
      this.esPropio = response.data.esPropio;
      this.nitoCC = response.data.nitoCC;
      this.transportador = response.data.transportador;
      this.ciudadEnvio = response.data.ciudadEnvio;
      this.paisEnvio = response.data.paisEnvio;
      this.fechaMov = this.convertDate(response.data.fechaMov);
      this.placaVeh = response.data.placaVeh;
      this.horometro = response.data.horometro;
      this.cConduct = response.data.ccConduct;
      this.entrego = response.data.entrego;
      this.observaciones = response.data.observaciones;
      this.anulada = response.data.anulada;
      this.usuario = response.data.usuario;
      this.estacion = response.data.estacion;
      this.procesado = response.data.procesado;
      this.motivoAnul = response.data.motivoAnul;
      this.observaciones2 = response.data.observaciones2;

      await this.tableDetDespacho(this.tipoMov, this.consecTip);
      await this.totalKiloUni(this.tipoMov, this.consecTip);
      this.deshDespacho(this.destino);
      this.confimacion(this.anulada);
      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e);
    } finally {
      this.isLoading = false;
    }
  }

  private async tableDetDespacho(tipoMov: number, consecTip: number) {
    this.isLoading = true;
    try {
      const response = await this.despaNacCfAnApi.getTableDespaDeta(
        tipoMov,
        consecTip,
      );

      for (const tblDespaDeta of response.data) {
        const description = await this.despaNacCfAnApi.getProduct(
          tblDespaDeta.idCodigo,
        );

        this.tableDespaDetall.push({
          anular: tblDespaDeta.anular,
          autonum: tblDespaDeta.autonum,
          cantidad: tblDespaDeta.cantidad,
          cantidad2: tblDespaDeta.cantidad2,
          cantidadUn: tblDespaDeta.cantidadUn,
          consecTip: tblDespaDeta.consecTip,
          cuarteo: tblDespaDeta.cuarteo,
          descrip: description.data,
          difer: tblDespaDeta.difer,
          etiqueta: tblDespaDeta.etiqueta,
          fechaG: tblDespaDeta.fechaG,
          guiaNo: tblDespaDeta.guiaNo,
          idCodigo: tblDespaDeta.idCodigo,
          idEti: tblDespaDeta.idEti,
          ladoAni: tblDespaDeta.ladoAni,
          motivoAnula: tblDespaDeta.motivoAnula,
          nAnima: tblDespaDeta.nAnima,
          ph: tblDespaDeta.PH,
          temperatur: tblDespaDeta.temperatur,
          tipoMov: tblDespaDeta.tipoMov,
        });
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e);
    } finally {
      this.isLoading = false;
    }
  }

  private async totalKiloUni(tipoMov: number, compTip: number) {
    try {
      const response = await this.despaNacCfAnApi.getSumTable(tipoMov, compTip);
      this.sumaUnid = response.data.sumUnid;
      this.SumaSubTotal = response.data.sumSubTota;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e);
    }
  }

  private configProceso() {
    if (this.validarConfirmar()) {
      return;
    }

    if (this.confirmar) {
      this.modalConfirmar = true;
    }
  }

  private validarConfirmar() {
    if (!this.confirmar) {
      this.showOutput(
        true,
        '"Para Confirmar el Documento debe hacer clik en Confirmar',
      );
      return true;
    }

    if (this.observaciones2 === '' || this.observaciones2 === null) {
      this.showOutput(
        true,
        'Para Confirmar el Documento debe digitar Observacion',
      );
      return true;
    }

    return false;
  }

  private async buttonModalSi() {
    if (this.idConcecutivo === 0) {
      this.showOutput(true, 'No ha selecionado un Registro');
      this.modalConfirmar = false;
      return;
    }
    this.procesado = true;
    this.fecha = moment().utc().format('YYYY-MM-DD');
    this.estacion = this.$store.getters.getUsuario;
    await this.updateConfirmar(this.idConcecutivo);
    this.viewDataClient();
    this.disableConfir = true;
    this.modalConfirmar = false;
  }

  private closeModalDelete() {
    this.modalConfirmar = false;
  }

  private async updateConfirmar(idConcecutivo: number) {
    try {
      const response = await this.despaNacCfAnApi.putConfrimar(idConcecutivo);
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al confirmar registro');
    }
  }

  private confirmarRegistro() {
    const fech1: string = this.convertDate(
      this.$store.getters.getTConfinv1.fecha1,
    );
    const fech2: string = this.convertDate(
      this.$store.getters.getTConfinv1.fecha2,
    );
    const fech: string = this.convertDate(this.fechaMov);
    if (fech < fech1 || fech > fech2) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }
    if (this.anulada) {
      this.showOutput(true, 'Documento Anulado');
      return;
    }
    if (!this.procesado) {
      this.viewCDeConf();
      this.disableConfir = false;
      this.confirmar = false;
      this.observaciones2 = '';
      return;
    }
    this.showOutput(false, 'Documento Confirmado');
  }

  private anulaProceso() {
    if (this.validaAnular()) {
      return;
    }

    if (this.anula) {
      this.modalAnula = true;
    }
  }

  private validaAnular() {
    if (!this.anula) {
      this.showOutput(
        true,
        '"Para anular el Documento debe hacer clik en anular',
      );
      return true;
    }

    if (this.motivoAnul === '' || this.motivoAnul === null) {
      this.showOutput(true, 'Para anular el Documento debe digitar el motivo');
      return true;
    }

    return false;
  }

  private async buttonModalAnulaSi() {
    if (this.idConcecutivo === 0) {
      this.showOutput(true, ' No ha seleccionado un registro');
      this.modalAnula = false;
      return;
    }
    this.anulada = true;
    this.fecha = moment().utc().format('YYYY-MM-DD');
    this.estacion = this.$store.getters.getUsuario;
    await this.updateAnula(this.idConcecutivo, this.motivoAnul);
    this.viewDataClient();
    this.disbaleAnu = true;
    this.modalAnula = false;
  }

  private closeModalDeletAnula() {
    this.modalConfirmar = false;
  }

  private async updateAnula(idConcecutivo: number, movtiAnula: string) {
    try {
      const response = await this.despaNacCfAnApi.putAnulada(idConcecutivo, {
        motivoAnul: movtiAnula,
      });

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al Anular registro');
    }
  }

  private anularRegistro() {
    const fech1: string = this.convertDate(
      this.$store.getters.getTConfinv1.fecha1,
    );
    const fech2: string = this.convertDate(
      this.$store.getters.getTConfinv1.fecha2,
    );
    const fech: string = this.convertDate(this.fechaMov);
    if (fech < fech1 || fech > fech2) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }
    if (this.anulada) {
      this.showOutput(true, 'Documento Anulado');
      return;
    }
    this.anula = false;
    this.viewDesAnula();
    this.disbaleAnu = false;
    this.motivoAnul = '';
  }

  private disconnectPort() {
    this.$serial.disconnectPort();
    this.isPortConnected = false;
  }

  private async discoverPorts() {
    this.ports = await this.$serial.getCOMPorts();
  }

  private connectToPort() {
    if (this.portPath === '') {
      this.showOutput(false, 'Debe seleccionar un puerto al cual conectarse.');
      return;
    }
    this.$serial.connectToPort(this.portPath);
  }

  private get connectedDisconnected() {
    return this.isPortConnected ? 'Conectado' : 'Desconectado';
  }

  private async searchSelect(pag?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        IdConcecutivo: number;
        ConsecTip: number;
        FechaMov: string;
        Terc: string;
        Procesado: boolean;
        Anulada: boolean;
      }>
    >;
    if (q.query) {
      response = await this.despaNacCfAnApi.getShearchDespaModFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.IdConcecutivo,
        item: `${d.IdConcecutivo} | ${this.convertDate(d.FechaMov)} | ${
          d.Terc
        }`,
      }));
    }
    response = await this.despaNacCfAnApi.getShearchDespaMod(pag);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.IdConcecutivo,
      item: `${d.IdConcecutivo} | ${this.convertDate(d.FechaMov)} | ${d.Terc}`,
    }));
  }

  private async conductoresNitSelect(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        idEmpresa: number;
        nitConduc: string;
        expedida: string;
        nombreCond: string;
        placaV: string;
        telefono1: string;
        telefono2: string;
        fecha: string;
        usuario: string;
      }>
    >;
    if (q.query) {
      response = await this.despaNacCfAnApi.getConductoresFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.nitConduc,
        item: d.nitConduc,
      }));
    }
    response = await this.despaNacCfAnApi.getConductores(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.nitConduc,
      item: d.nitConduc,
    }));
  }

  private async conductoresNameSelect(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        idEmpresa: number;
        nitConduc: string;
        expedida: string;
        nombreCond: string;
        placaV: string;
        telefono1: string;
        telefono2: string;
        fecha: string;
        usuario: string;
      }>
    >;
    if (q.query) {
      response = await this.despaNacCfAnApi.getConductoresFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.nitConduc,
        item: d.nombreCond,
      }));
    }
    response = await this.despaNacCfAnApi.getConductores(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.nitConduc,
      item: d.nombreCond,
    }));
  }

  private async nitoCCSelec(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        NitCliente: string;
        Expr2: string;
        Expr1: string;
        CodiCliente: string;
        Habilitado: boolean;
      }>
    >;
    if (q.query) {
      response = await this.despaNacCfAnApi.getTercetosFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.CodiCliente,
        item: `${d.Expr2} | ${d.Expr1} | ${d.CodiCliente}`,
      }));
    }
    response = await this.despaNacCfAnApi.getTercetos(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.CodiCliente,
      item: `${d.Expr2} | ${d.Expr1} | ${d.CodiCliente}`,
    }));
  }

  private async ciudades(pagination?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        idCiudad: string;
        descripcionCiu: string;
        departamento: string;
      }>
    >;
    if (q.query) {
      response = await this.despaNacCfAnApi.getCiudadesFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.idCiudad,
        item: `${d.descripcionCiu} | ${d.idCiudad} | ${d.departamento}`,
      }));
    }
    response = await this.despaNacCfAnApi.getCiudades(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.idCiudad,
      item: `${d.descripcionCiu} | ${d.idCiudad} | ${d.departamento}`,
    }));
  }
}
</script>
