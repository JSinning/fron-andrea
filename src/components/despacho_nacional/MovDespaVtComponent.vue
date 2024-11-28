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
            <h1 class="title">Venta de Canales</h1>
          </div>
          <div class="pl-24 mt-2 mb-6 md:mb-0"></div>
        </div>

        <div class="flex flex-row flex-wrap mb-2 justify-end">
          <div class="pr-3 mt-1 md:mb-0">
            <button class="btn-save" @click="informatGuia()">
              Informacion de la Guia
            </button>
            <button class="btn-save" @click="clickSubConsDespa()">
              Consolidado Productos
            </button>
            <button class="btn-primary" @click="addRegister()">
              Adicionar Registro
            </button>
            <button class="btn-save" @click="saveRegister()">Guardar</button>
            <button class="btn-delete" @click="deleteRegister()">
              Eliminar
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
                    @change="afterUpdateTipoMov()"
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
                <label class="label">Documento(C-F):</label>
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
                <label class="label">
                  Tercero:
                  <select
                    class="bg-white border py-1 pr-2 shadow leading-tight select"
                    v-model="nitoCC"
                    :disabled="readonly"
                  >
                    <option
                      v-for="(item, index) in nitoCCSelec"
                      :key="index"
                      :value="item.CodiCliente"
                    >
                      {{ item.Expr2 }} | {{ item.Expr1 }} |
                      {{ item.CodiCliente }}
                    </option>
                  </select>
                </label>
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
                <label class="label">
                  Ciudad envio:
                  <select
                    class="bg-white border py-1 pr-2 shadow leading-tight select"
                    v-model="ciudadEnvio"
                    :disabled="readonly"
                  >
                    <option
                      v-for="(item, index) in ciudadSelec"
                      :key="index"
                      :value="item.idCiudad"
                    >
                      {{ item.descripcionCiu }} | {{ item.idCiudad }} |
                      {{ item.departamento }}
                    </option>
                  </select>
                </label>
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
                <label class="label">
                  Conductor:
                  <select
                    class="bg-white border py-1 pr-2 select"
                    v-model="cConduct"
                    :disabled="readonly"
                    @change="afterUpdateCConduct()"
                  >
                    <option
                      v-for="(item, index) in cConductSelc"
                      :key="index"
                      :value="item.nitConduc"
                    >
                      {{ item.nitConduc }}
                    </option>
                  </select>
                </label>
              </div>
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">
                  <div class="py-2"></div>
                  <select
                    class="bg-white border py-1 pr-2 select"
                    v-model="cConduct"
                    :disabled="readonly"
                    @change="afterUpdateCConduct()"
                  >
                    <option
                      v-for="(item, index) in cConductSelc"
                      :key="index"
                      :value="item.nitConduc"
                    >
                      {{ item.nombreCond }}
                    </option>
                  </select>
                </label>
              </div>
            </div>

            <div class="flex flex-row flex-wrap justify-center">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <button class="btn-primary" @click="openSubDespaVt()">
                  Guias a Procesar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="DDespa">
        <div class="flex flex-row flex-wrap mb-3">
          <div class="card">
            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">Etiqueta:</label>
                <input
                  type="text"
                  class="input"
                  v-model="etiqueta"
                  @change="afterEtiquta()"
                  :readonly="readonly"
                />
              </div>

              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Codigo</label>
                <input
                  type="text"
                  class="input"
                  v-model="idCodigo"
                  :readonly="readonly"
                />
              </div>

              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">
                  Descripcion:
                  <select
                    class="bg-white border py-1 pr-2 select"
                    v-model="idCodigo"
                    :disabled="readonly"
                  >
                    <option :value="idCodigo">{{ idCodigo }}</option>
                    <option
                      v-for="(item, index) in productSelec"
                      :key="index"
                      :value="item.IdCodigo"
                    >
                      {{ item.DescripciónMer }}
                    </option>
                  </select>
                </label>
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">Cant:</label>
                <input
                  type="number"
                  class="input"
                  v-model="cantidadUn"
                  :readonly="readonly"
                />
              </div>

              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Kilos CF:</label>
                <input
                  type="number"
                  class="input"
                  v-model="cantidad"
                  :readonly="readonly"
                />
              </div>

              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">Kilos CC:</label>
                <input
                  type="number"
                  class="input"
                  v-model="cantidad2"
                  :readonly="readonly"
                />
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">Diferencia:</label>
                <input
                  type="number"
                  class="input"
                  v-model="difer"
                  :readonly="readonly"
                />
              </div>

              <div class="px-3 mb-6 md:mb-0">
                <label class="label">PH:</label>
                <input
                  type="number"
                  class="input"
                  v-model="PH"
                  :readonly="readonly"
                />
              </div>

              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">Temperatura:</label>
                <input
                  type="number"
                  class="input"
                  v-model="temperatur"
                  :readonly="readonly"
                />
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">Guia No:</label>
                <input
                  type="number"
                  class="input"
                  v-model="guiaNo"
                  :readonly="readonly"
                />
              </div>

              <div class="px-3 mb-6 md:mb-0">
                <label class="label">N-Anim:</label>
                <input
                  type="number"
                  class="input"
                  v-model="nAnima"
                  :readonly="readonly"
                />
              </div>

              <div class="px-3 mb-6 md:mb-0 inline-block relative w-32">
                <label class="label">Lado:</label>
                <input
                  type="text"
                  class="input"
                  v-model="ladoAni"
                  :readonly="readonly"
                />
              </div>

              <div class="px-3 mb-6 md:mb-0">
                <label class="label">Anular:</label>
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="anular"
                  :disabled="readonly"
                />
              </div>
            </div>

            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">Motivo:</label>
                <input
                  type="text"
                  class="input"
                  v-model="motivoAnula"
                  :readonly="readonly"
                />
              </div>
            </div>

            <div class="flex flex-row flex-wrap justify-end">
              <div
                class="px-3 mb-6 md:mb-0 inline-block relative w-38 justify-end"
              >
                <div class="pr-3 mt-1 md:mb-0"></div>
                <button
                  class="btn-save"
                  @click="addTablainfo()"
                  :disabled="readonly"
                >
                  Guardar tabla
                </button>
              </div>
            </div>
          </div>
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
                  <th>Temperatura</th>
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
            <input type="text" class="input" v-model="idExport" />
          </div>
          <div class="flex flex-row flex-wrap">
            <label class="label">Toatal unidades y Kilos</label>
            <div class="px-3 mb-6 md:mb-0">
              <input type="text" class="input" v-model="sumaUnid" readonly />
            </div>
            <div class="px-3 mb-6 md:mb-0">
              <input
                type="text"
                class="input"
                v-model="SumaSubTotal"
                readonly
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
          <div class="pl-10">
            <button class="btn-save" @click="imprimirDocument()">
              Imprimir Documento
            </button>
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
    </div>

    <hr />

    <!-- modal SubConsoDespa -->
    <div>
      <div class="modal" v-if="isSubConsDespa">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <SubConsoDespaComponent
              v-bind:tipoMovS="tipoMov"
              v-bind:concecTipS="consecTip"
            />
            <button class="btn-delete" @click="closeSubConsDespa()">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->

    <!-- modal SubConsoDespa -->
    <div>
      <div class="modal" v-if="isSubRelaCanLot">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <SubRelaCanLotComponent v-bind:guiaNo="guiaGen" />
            <button class="btn-delete" @click="closeSubRelaCanLot()">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->

    <!-- modal SubConsoDespa -->
    <div>
      <div class="modal" v-if="isSubDespaVt">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <MovDespaVtGuiaComponent />
            <button class="btn-delete" @click="closeSubDespaVt()">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->
    <ModalPDFPreview
      :pdfData="pdfData"
      @close="closeModalPDF"
      v-if="showModalPDF"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import DespachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';
import moment from 'moment';

import MovDespaVtGuiaComponent from '@/components/despacho_nacional/MovDespaVtGuiaComponent.vue';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import PDFPreview from '@/components/reusable/PdfPreview.vue';

import SubConsoDespaComponent from '@/components/despacho_nacional/SubConsoDespaComponent.vue';
import SubRelaCanLotComponent from '@/components/despacho_nacional/SubRelaCanLotComponent.vue';
import * as Sentry from '@sentry/browser';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    MovDespaVtGuiaComponent,
    PDFPreview,
    SubConsoDespaComponent,
    SubRelaCanLotComponent,
  },
  name: 'MovDespaVt',
})
export default class MovDespaVtComponent extends Vue {
  private ports: any[] = [];
  private isPortConnected: boolean = false;
  private isSubConsDespa: boolean = false;
  private isSubRelaCanLot: boolean = false;
  private isSubDespaVt: boolean = false;
  private portPath: string = '';
  private readonly: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private output = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private DCliente: boolean = true;
  private DDespa: boolean = false;

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
  private deshuse: number = 0;
  private despacho: number = 0;
  private fecha: string = '';
  private estacion: string = '';
  private idExport: string = '';
  private anulada: boolean = false;
  private imprim: string = '';

  private PH: string = '';
  private anular: boolean = false;
  private autonum: number = 0;
  private cantidad: number = 0;
  private cantidad2: number = 0;
  private cantidadUn: number = 0;
  private cuarteo: boolean = false;
  private difer: number = 0;
  private etiqueta: string = '';
  private fechaG: string = '';
  private guiaNo: number = 0;
  private idCodigo: string = '';
  private idEti: number = 0;
  private ladoAni: string = '';
  private motivoAnula: string = '';
  private nAnima: number = 0;
  private temperatur: number = 0;

  private sumaUnid: number = 0;
  private SumaSubTotal: number = 0;
  private guiaGen: number = 0;

  private duplica: string = '';

  private tipoMovSelec: any = [];
  private nitoCCSelec: any = [];
  private ciudadSelec: any = [];
  private paisSelec: any = [];
  private productSelec: any = [];
  private cConductSelc: any = [];
  private tableDespaDetall: any = [];
  private deleteRegi: any = [];

  private movimiento: any = {};
  private conductores: any = {};

  private despaNacApi = new DespachoNacionalApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    this.formCurrent();
    await this.selectTipoMov();
    await this.selectNioCC();
    await this.selectCiudades();
    await this.selectPises();
    await this.selecCConduct();
    await this.selectProduct();
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private formCurrent() {
    this.readonly = true;
    this.destino = true;
    this.deshueseAndDespacho(this.destino);
  }

  private deshueseAndDespacho(destino: boolean) {
    if (destino) {
      this.despacho = 1;
      this.deshuse = 0;
      return;
    }
    this.despacho = 0;
    this.deshuse = 1;
  }

  private clickSubConsDespa() {
    this.isSubConsDespa = !this.isSubConsDespa;
  }

  private closeSubConsDespa() {
    this.isSubConsDespa = !this.isSubConsDespa;
  }

  private openSubRelaCanLot(guiaGen: number) {
    this.guiaGen = guiaGen;
    this.isSubRelaCanLot = !this.isSubRelaCanLot;
  }

  private closeSubRelaCanLot() {
    this.isSubRelaCanLot = !this.isSubRelaCanLot;
  }

  private openSubDespaVt() {
    this.isSubDespaVt = !this.isSubDespaVt;
  }

  private closeSubDespaVt() {
    this.isSubDespaVt = !this.isSubDespaVt;
  }

  private convertDate(date: string): string {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private converBoolean(dato: boolean): number {
    if (!dato) {
      return 0;
    }
    return 1;
  }

  private addRegister() {
    this.readonly = false;
    if (this.tipoMov !== 0) {
      this.clearDespa();
    }
  }

  private async selectTipoMov() {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getTipoMov();
      this.tipoMovSelec = response.data[0];
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar tipo movimiento');
    } finally {
      this.isLoading = false;
    }
  }

  private async selectNioCC() {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getTercetos();
      this.nitoCCSelec = response.data[0];
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar terceros');
    } finally {
      this.isLoading = false;
    }
  }

  private async selectCiudades() {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getCiudades();
      this.ciudadSelec = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar ciudades');
    } finally {
      this.isLoading = false;
    }
  }

  private async selectPises() {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getPises();
      this.paisSelec = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar paises');
    } finally {
      this.isLoading = false;
    }
  }

  private async selecCConduct() {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getConductores();
      this.cConductSelc = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al cargar conductores');
    } finally {
      this.isLoading = false;
    }
  }

  private async selectProduct() {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getPoductos();
      this.productSelec = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'Error al cargar productos');
    } finally {
      this.isLoading = false;
    }
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
      this.DDespa = false;
      this.DCliente = true;
      return;
    }
  }

  private viewDataDespa() {
    if (!this.DDespa) {
      this.DDespa = true;
      this.DCliente = false;
      return;
    }
  }

  private validation(): boolean {
    const fech1: string = this.convertDate(
      this.$store.getters.getTConfinv1.fecha1,
    );
    const fech2: string = this.convertDate(
      this.$store.getters.getTConfinv1.fecha2,
    );
    const fech: string = this.convertDate(this.fechaMov);

    if (this.nitoCC === null || this.nitoCC === '') {
      this.showOutput(true, 'La Relacion no Tiene Tercero');
      return true;
    }
    if (this.consecTip === 0) {
      this.showOutput(
        true,
        'La Relación de Canal no puede ser Cero, Escoja Tipo de Movimiento y Presione Enter',
      );
      return true;
    }
    if (fech < fech1 || fech > fech2) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }
    this.fecha = moment().utc().format('YYYY-MM-DD');
    this.estacion = this.$store.getters.getUsuario;
  }

  private async saveRegister() {
    if (this.validation()) {
      return;
    }
    try {
      const response = await this.despaNacApi.postDespacho({
        anulada: false,
        ccConduct: this.cConduct,
        ciudadEnvio: this.ciudadEnvio,
        concModEnv: 0,
        consecTip: this.consecTip,
        destino: this.converBoolean(this.destino),
        dirEnvio: '',
        document: this.document,
        entrego: this.entrego,
        esPropio: this.esPropio,
        estacion: this.estacion,
        fecha: this.fecha,
        fechaMov: this.convertDate(this.fechaMov),
        grupoDesp: 0,
        horometro: this.horometro,
        imprim: 'S',
        motivoAnul: '',
        nitoCC: this.nitoCC,
        observaciones: this.observaciones,
        observaciones2: '',
        paisEnvio: this.paisEnvio,
        placaVeh: this.placaVeh,
        prefijo: '',
        procesado: false,
        recibio: '',
        tipoMov: this.tipoMov,
        transportador: this.transportador,
        turnoD: 'D',
        usuario: this.$store.getters.getUsuario,
      });

      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al guardar informacion');
    }
  }

  private async addTablainfo() {
    try {
      const response = await this.despaNacApi.postTableDespa({
        PH: this.PH,
        anular: this.anular,
        cantidad: this.cantidad,
        cantidad2: this.cantidad2,
        cantidadUn: this.cantidadUn,
        consecTip: this.consecTip,
        cuarteo: this.cuarteo,
        etiqueta: this.etiqueta,
        fechaG: moment().utc().format('YYYY-MM-DD'),
        guiaNo: this.guiaNo,
        idCodigo: this.idCodigo,
        idEti: this.idEti,
        ladoAni: this.ladoAni,
        motivoAnula: this.motivoAnula,
        nAnima: this.nAnima,
        temperatur: this.temperatur,
        tipoMov: this.tipoMov,
      });

      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
      }

      this.tableDespaDetall = [];
      await this.tableDespaDetale(this.tipoMov, this.consecTip);
      await this.totalKiloUni(this.tipoMov, this.consecTip);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al guardar registro');
    }
  }

  private async tableDespaDetale(tipoMov: number, consecTip: number) {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getTableDespaDeta(
        tipoMov,
        consecTip,
      );

      for (const tblDespaDeta of response.data) {
        const description = await this.despaNacApi.getProduct(
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
      const response = await this.despaNacApi.getSumTable(tipoMov, compTip);
      this.sumaUnid = response.data.sumUnid;
      this.SumaSubTotal = response.data.sumSubTota;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e);
    }
  }

  private async deleteRegister() {
    if (this.consecTip === 0) {
      this.showOutput(true, 'La relacion no pude ser 0');
      return;
    }

    if (!(await this.searchRegister())) {
      this.showOutput(true, 'El dato que desa borrar no existe');
      return;
    }

    await this.deleteDespaBac(this.idConcecutivo);
    await this.deleteTableDespa(this.tipoMov, this.consecTip);

    this.tableDespaDetall = [];
    this.clearDespa();
  }

  private async searchRegister() {
    try {
      const response = await this.despaNacApi.getShearchDespa();
      this.deleteRegi = response.data[0];
      for (const dato of this.deleteRegi) {
        if (dato.ConsecTip === this.consecTip) {
          this.idConcecutivo = dato.IdConcecutivo;
          return true;
        }
      }
      return false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al ejecutar');
    }
  }

  private async informatGuia() {
    let guiaGen = 0;
    try {
      const response = await this.despaNacApi.getFriRCana(
        this.tipoMov,
        this.consecTip,
      );
      if (response.data.length === 0) {
        this.showOutput(true, 'No se encontro informacion.');
        return;
      }
      guiaGen = response.data[0].guiaNo;

      if (guiaGen !== 0) {
        this.openSubRelaCanLot(guiaGen);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error de consulta');
    }
  }

  private async movimientos(tipoMov: number) {
    try {
      const response = await this.despaNacApi.getMoviento(tipoMov);
      if (response.statusCode !== 200) {
        return true;
      }
      this.movimiento = response.data;
      return false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al buscar movimiento');
    }
  }

  private async afterUpdateCConduct() {
    try {
      if (await this.cConductore(this.cConduct)) {
        this.showOutput(true, 'El conductor no existe');
        return;
      }

      if (this.placaVeh === null || this.placaVeh === '') {
        this.placaVeh = this.conductores.placaV;
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al generar placa del vehiculo ');
    }
  }

  private async afterEtiquta() {
    const coantidad1 = this.etiqueta.substring(12, 15);
    const coantidad2 = this.etiqueta.substring(16, 18);
    const x = await this.countGuia(parseInt(this.etiqueta.substring(0, 6), 10));
    if (x === 0) {
      this.showOutput(true, 'No existe esta guia');
      return;
    }

    this.guiaNo = parseInt(this.etiqueta.substring(0, 6), 10);
    this.nAnima = parseInt(this.etiqueta.substring(7, 9), 10);
    this.ladoAni = this.etiqueta.substring(10, 11);
    this.cantidad2 = parseFloat(`${coantidad1}.${coantidad2}`);
    this.idCodigo = this.etiqueta.substring(20, 27);

    await this.exportValidation(this.guiaNo, this.nAnima);
  }

  private async countGuia(nomGuia: number) {
    try {
      const response = await this.despaNacApi.getCountGuia(nomGuia);

      return response.data.guiaCount;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'No se encontro guia');
    }
  }

  private async exportValidation(noGuia: number, codigoIndv: number) {
    try {
      const response = await this.despaNacApi.getExportGuiaAnim(
        noGuia,
        codigoIndv,
      );

      if (response.data.length === 0) {
        this.idExport = 'Exportacion';
        return;
      }
      this.idExport = '';
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al buscar informacion');
    }
  }

  private async imprimirDocument() {
    if (this.nitoCC === null || this.nitoCC === '') {
      this.showOutput(true, 'Debe escoger un tercero');
      return;
    }
    if (this.fechaMov === null || this.fechaMov === '') {
      this.showOutput(true, 'Debe digitar la fecha');
      return;
    }
    if (this.anulada) {
      this.duplica = 'Anulada';
    }
    this.duplica = '';
    this.imprim = 'S';
    await this.updateImprimir();
    await this.reportDespacNac();
  }

  private async reportDespacNac() {
    try {
      this.isLoading = true;
      const pdf2 = await this.despaNacApi.getDespachoNacPdf(this.idConcecutivo);
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async updateImprimir() {
    this.isLoading = true;
    try {
      await this.despaNacApi.putPrintVtDespaNac(
        {
          imprim: 'S',
        },
        this.consecTip,
        this.tipoMov,
      );
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
    } finally {
      this.isLoading = true;
    }
  }

  private async cConductore(cconduc: string) {
    try {
      const response = await this.despaNacApi.getCConductor(cconduc);

      if (response.statusCode !== 200) {
        return true;
      }
      this.conductores = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al buscar informacion del conductor');
    }
  }

  private async afterUpdateTipoMov() {
    if (this.tipoMov === 0) {
      return;
    }
    if (this.consecTip !== 0) {
      return;
    }
    if (await this.movimientos(this.tipoMov)) {
      this.showOutput(true, '"El tipo de movimiento no existe');
      return;
    }
    try {
      const response = await this.despaNacApi.getMaxConsecTrip(this.tipoMov);

      if (response.data === null) {
        this.consecTip = this.movimiento.consecDesde;
        return;
      }
      this.consecTip = response.data.max;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al generar la relacion de canal');
    }
  }

  private clearDespa() {
    this.tipoMov = 0;
    this.document = 0;
    this.consecTip = 0;
    this.esPropio = false;
    this.nitoCC = '';
    this.transportador = '';
    this.ciudadEnvio = '';
    this.paisEnvio = '';
    this.fechaMov = '';
    this.placaVeh = '';
    this.horometro = '';
    this.cConduct = '';
    this.entrego = '';
    this.observaciones = '';
    this.fecha = '';
    this.estacion = '';
    this.idExport = '';

    this.PH = '';
    this.anular = false;
    this.autonum = 0;
    this.cantidad = 0;
    this.cantidad2 = 0;
    this.cantidadUn = 0;
    this.cuarteo = false;
    this.difer = 0;
    this.etiqueta = '';
    this.fechaG = '';
    this.guiaNo = 0;
    this.idCodigo = '';
    this.idEti = 0;
    this.ladoAni = '';
    this.motivoAnula = '';
    this.nAnima = 0;
    this.temperatur = 0;

    this.sumaUnid = 0;
    this.SumaSubTotal = 0;
  }

  private async deleteDespaBac(idConcecutivo: number) {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.deleteDespaNac(idConcecutivo);

      if (response.statusCode) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al eliminar registro');
    } finally {
      this.isLoading = false;
    }
  }

  private async deleteTableDespa(tipoMov: number, consecTip: number) {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.deleteTableDet(
        tipoMov,
        consecTip,
      );

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al eliminar registro de la tabla');
    } finally {
      this.isLoading = false;
    }
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
}
</script>
