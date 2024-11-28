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
              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
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
          <div class="pr-3 mt-1 md:mb-0">
            <button class="btn-save" @click="informatGuia()">
              Informacion de la Guia
            </button>
            <button class="btn-save" @click="clickSubConsDespa()">
              Consolidado Productos
            </button>
            <button class="btn-save" @click="RelaBusca = !RelaBusca">
              Buscar Registro
            </button>
            <button class="btn-primary" @click="updateRegister()">
              Modificar Registro
            </button>
            <button class="btn-save" @click="guardar()">Guardar</button>
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
            <button class="rounded btn-save" @click="viewDataPHTemp()">
              PH Y TEMPERATURAS
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
          <div class="card">
            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">Etiqueta:</label>
                <input
                  type="text"
                  class="input"
                  v-model="etiqueta"
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
                <label class="label">Anualdar:</label>
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
                  type="number"
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
                  @click="updatDataTableDespa()"
                  :disabled="readonly"
                >
                  Actualizar Datos
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
                  <th class="w-1/6 px-4 py-2">Opciones</th>
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
                  <td>
                    <button
                      class="btn-save mb-2"
                      @click="
                        editTable(item.tipoMov, item.consecTip, item.etiqueta)
                      "
                    >
                      Editar
                    </button>
                  </td>
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
            <label class="label">Toatal unidades y Kilos</label>
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
          <div class="pl-10">
            <button class="btn-save" @click="imprimirDocument()">
              Imprimir Documento
            </button>
          </div>
        </div>
      </div>

      <div v-if="DPHTemp">
        <div class="flex flex-row flex-wrap mb-3">
          <div class="card">
            <div class="flex flex-row flex-wrap">
              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">PH:</label>
                <input type="number" class="input" v-model="PH" />
              </div>

              <div class="px-3 mb-6 md:mb-0 inline-block relative w-64">
                <label class="label">Temperatura:</label>
                <input type="number" class="input" v-model="temperatur" />
              </div>

              <div
                class="px-3 mb-6 md:mb-0 inline-block relative w-38 justify-end"
              >
                <div class="pr-3 mt-1 md:mb-0"></div>
                <button class="btn-save" @click="updatDataTable()">
                  Actualizar Datos
                </button>
              </div>
            </div>
          </div>

          <div class="card-table h-48">
            <table class="table-fixed w-full text-xs" id="tablaC">
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
                  <th class="w-1/6 px-4 py-2">Opciones</th>
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
                  <td>
                    <button
                      class="btn-save mb-2"
                      @click="
                        editTable(item.tipoMov, item.consecTip, item.etiqueta)
                      "
                    >
                      Editar
                    </button>
                  </td>
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
    <ModalPDFPreview
      :pdfData="pdfData"
      @close="closeModalPDF"
      v-if="showModalPDF"
    />
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Vue } from 'vue-property-decorator';

import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import PDFPreview from '@/components/reusable/PdfPreview.vue';

import SubConsoDespaComponent from '@/components/despacho_nacional/SubConsoDespaComponent.vue';
import DespachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';
import moment from 'moment';

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
    ModalPDFPreview,
    PDFPreview,
    PaginatedSelect,
    SubConsoDespaComponent,
  },
  name: 'MovDespaNacMod',
})
export default class MovDespaNacModComponent extends Vue {
  private ports: any[] = [];
  private isPortConnected: boolean = false;
  private isSubConsDespa: boolean = false;
  private isSubRelaCanLot: boolean = false;
  private portPath: string = '';
  private RelaBusca: boolean = false;
  private readonly: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private output = '';
  private isError: boolean = false;
  private isLoading: boolean = false;
  private DCliente: boolean = true;
  private DDespa: boolean = false;
  private DPHTemp: boolean = false;

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
  private imprim: string = '';

  private deshuse: number = 0;
  private despacho: number = 0;

  private guiaGen: number = 0;
  private sumaUnid: number = 0;
  private SumaSubTotal: number = 0;

  private PH: string = '';
  private anular: boolean = false;
  private autonum: number = 0;
  private cantidad: number = 0;
  private cantidad2: number = 0;
  private cantidadUn: number = 0;
  private consecTipTbl: number = 0;
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
  private tipoMovTbl: number = 0;

  private duplica: string = '';

  private tipoMovSelec: any = [];
  private paisSelec: any = [];
  private productSelec: any = [];
  private tableDespaDetall: any = [];

  private despaNacApi = new DespachoNacionalApi(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    this.formCurrent();
    await this.selectTipoMov();
    await this.selectPaises();
    await this.selectProduct();
  }

  private closeModalPDF() {
    this.showModalPDF = false;
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

  private formCurrent() {
    this.readonly = true;
  }

  private convertDate(date: string): string {
    return moment(date).utc().format('YYYY-MM-DD');
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

  private async selectPaises() {
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
      this.DPHTemp = false;
      this.DDespa = false;
      this.DCliente = true;
      return;
    }
  }

  private viewDataDespa() {
    if (!this.DDespa) {
      this.DPHTemp = false;
      this.DDespa = true;
      this.DCliente = false;
      return;
    }
  }

  private viewDataPHTemp() {
    if (!this.DPHTemp) {
      this.DDespa = false;
      this.DCliente = false;
      this.DPHTemp = true;
      return;
    }
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

  private async changeSearchByIdConsec() {
    this.isLoading = true;
    try {
      const idConcecuti = this.idConcecutivo;
      const response = await this.despaNacApi.getShearchDespaIDMod(idConcecuti);
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

      this.tableDespaDetall = [];
      await this.tableDespaDetale(this.tipoMov, this.consecTip);
      await this.totalKiloUni(this.tipoMov, this.consecTip);
      this.deshueseAndDespacho(this.destino);
      this.readonly = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e);
    } finally {
      this.isLoading = false;
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

  private updateRegister() {
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

    this.fecha = moment().utc().format('YYYY-MM-DD');
    this.estacion = this.$store.getters.getUsuario;

    this.readonly = false;
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

  private async editTable(tipoMov: number, compTip: number, etiqueta: string) {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.getEditTable(
        tipoMov,
        compTip,
        etiqueta,
      );

      this.PH = response.data[0].PH;
      this.anular = response.data[0].anular;
      this.autonum = response.data[0].autonum;
      this.cantidad = response.data[0].cantidad;
      this.cantidad2 = response.data[0].cantidad2;
      this.cantidadUn = response.data[0].cantidadUn;
      this.consecTipTbl = response.data[0].consecTip;
      this.cuarteo = response.data[0].cuarteo;
      this.difer = response.data[0].difer;
      this.etiqueta = response.data[0].etiqueta;
      this.fechaG = this.convertDate(response.data[0].fechaG);
      this.guiaNo = response.data[0].guiaNo;
      this.idCodigo = response.data[0].idCodigo;
      this.idEti = response.data[0].idEti;
      this.ladoAni = response.data[0].ladoAni;
      this.motivoAnula = response.data[0].motivoAnul;
      this.nAnima = response.data[0].nAnima;
      this.temperatur = response.data[0].temperatur;
      this.tipoMovTbl = response.data[0].tipoMov;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al ejecutrar la accion');
    } finally {
      this.isLoading = false;
    }
  }

  private async guardar() {
    if (this.validation()) {
      return;
    }
    await this.updateDespaNacMod(this.idConcecutivo);

    await this.changeSearchByIdConsec();

    this.readonly = true;
  }

  private async updatDataTableDespa() {
    if (this.etiqueta === null || this.etiqueta === '') {
      this.showOutput(true, 'El etiqueta no puede estar vacia');
      return;
    }
    if (this.idCodigo === null || this.idCodigo === '') {
      this.showOutput(true, 'La temperatura no puede estar vacio');
      return;
    }
    await this.updateTablesDepaNacMod(
      this.tipoMov,
      this.consecTip,
      this.etiqueta,
    );
    this.tableDespaDetall = [];
    await this.tableDespaDetale(this.tipoMov, this.consecTip);
  }

  private async updatDataTable() {
    if (this.PH === null || this.PH === '') {
      this.showOutput(true, 'El PH no puede esta vacio');
      return;
    }
    if (this.temperatur === 0) {
      this.showOutput(true, 'La temperatura no puede ser cero');
      return;
    }
    await this.updateTablesDepaNacMod(
      this.tipoMov,
      this.consecTip,
      this.etiqueta,
    );
    this.tableDespaDetall = [];
    await this.tableDespaDetale(this.tipoMov, this.consecTip);
  }

  private async updateDespaNacMod(idConsecutivo: number) {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.putMovDespaNac(idConsecutivo, {
        anulada: this.anulada,
        ccConduct: this.cConduct,
        ciudadEnvio: this.ciudadEnvio,
        concModEnv: 0,
        consecTip: this.consecTip,
        destino: this.destino,
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
        usuario: this.usuario,
      });

      if (response.statusCode === 201) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al actualiazar a informacion');
    } finally {
      this.isLoading = false;
    }
  }

  private async updateTablesDepaNacMod(
    tipoMov: number,
    concepTip: number,
    etiqueta: string,
  ) {
    this.isLoading = true;
    try {
      const response = await this.despaNacApi.puttableMovDesaMov(
        tipoMov,
        concepTip,
        etiqueta,
        {
          PH: this.PH,
          anular: this.anular,
          cantidad: this.cantidad,
          cantidad2: this.cantidad2,
          cantidadUn: this.cantidadUn,
          consecTip: this.consecTipTbl,
          cuarteo: this.cuarteo,
          difer: this.difer,
          etiqueta: this.etiqueta,
          fechaG: this.convertDate(this.fechaG),
          guiaNo: this.guiaNo,
          idCodigo: this.idCodigo,
          idEti: this.idEti,
          ladoAni: this.ladoAni,
          motivoAnula: this.motivoAnula,
          nAnima: this.nAnima,
          temperatur: this.temperatur,
          tipoMov: this.tipoMovTbl,
        },
      );
      if (response.data.statusCode === 201) {
        this.showOutput(true, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al actualiazar a informacion de las tablas');
    } finally {
      this.isLoading = false;
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
  }

  private async imprimirDocument() {
    if (this.nitoCC === null || this.nitoCC === '') {
      this.showOutput(true, 'Debe Escoger un Tercero');
      return;
    }

    if (this.fechaMov === null || this.fechaMov === '') {
      this.showOutput(true, 'Debe Digitar la Fecha');
      return;
    }

    if (this.anulada) {
      this.duplica = 'Anulada';
    }
    this.duplica = '';
    this.imprim = 'S';
    await this.updateImprimir(this.idConcecutivo);
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

  private async updateImprimir(idConcecutivo: number) {
    this.isLoading = true;
    try {
      await this.despaNacApi.putPrintDespaNac(
        {
          imprim: 'S',
        },
        idConcecutivo,
      );
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
    } finally {
      this.isLoading = true;
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
      response = await this.despaNacApi.getShearchDespaModFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.IdConcecutivo,
        item: `${d.ConsecTip} | ${this.convertDate(d.FechaMov)} | ${d.Terc}`,
      }));
    }
    response = await this.despaNacApi.getShearchDespaMod(pag);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.IdConcecutivo,
      item: `${d.ConsecTip} | ${this.convertDate(d.FechaMov)} | ${d.Terc}`,
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
      response = await this.despaNacApi.getConductoresFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.nitConduc,
        item: d.nitConduc,
      }));
    }
    response = await this.despaNacApi.getConductores(pagination);
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
      response = await this.despaNacApi.getConductoresFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.nitConduc,
        item: d.nombreCond,
      }));
    }
    response = await this.despaNacApi.getConductores(pagination);
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
      response = await this.despaNacApi.getTercetosFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.CodiCliente,
        item: `${d.Expr2} | ${d.Expr1} | ${d.CodiCliente}`,
      }));
    }
    response = await this.despaNacApi.getTercetos(pagination);
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
      response = await this.despaNacApi.getCiudadesFind(q);
      return response.data.map<IInterfaceSelect>((d) => ({
        id: d.idCiudad,
        item: `${d.descripcionCiu} | ${d.idCiudad} | ${d.departamento}`,
      }));
    }
    response = await this.despaNacApi.getCiudades(pagination);
    return response.data.map<IInterfaceSelect>((d) => ({
      id: d.idCiudad,
      item: `${d.descripcionCiu} | ${d.idCiudad} | ${d.departamento}`,
    }));
  }
}
</script>
