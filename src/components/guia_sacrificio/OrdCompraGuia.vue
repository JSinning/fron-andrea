<template>
  <div class="container mx-auto">
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 md:w-1/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Liquidacion compra de ganado</h1>
        </div>
      </div>

      <div class="flex-wrap">
        <div v-if="search" class="flex flex-row flex-wrap mb-3">
          <div class="flex flex-row flex-wrap p-3 w-full justify-end">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <Select
                :isItems="customerSearch"
                v-model="id"
                :value="id"
                :usePagination="false"
                @changed="ordCompraGuiaID(id)"
                >Busqueda:</Select
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="search = !search">Buscar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="adicionar">Adicionar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="modify">Modificar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="anular">Anular</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="rePrint">Reimprimir</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="ordCompraGuiaUpdate">
            Actualizar
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="ordCompraGuiaAdd">Guardar</button>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos_basicos"
        class="hidden"
        checked
      />

      <input type="radio" name="tab" id="guias" class="hidden" />
      <input type="radio" name="tab" id="pagos" class="hidden" />
      <input
        type="radio"
        name="tab"
        id="anular"
        class="hidden"
        v-if="pgAnulada"
        :checked="pgAnulada"
      />

      <div class="mt-2 mb-0 nav">
        <label for="datos_basicos">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos basicos
          </span>
        </label>

        <label for="guias">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Guias - Transporte
          </span>
        </label>

        <label for="pagos">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Informacion pagos cheques
          </span>
        </label>

        <label for="anular">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="pgAnulada"
          >
            Anular
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Consecutivo:</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraGuia.numeroDoc"
              readonly
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha movimiento:</label>
            <input
              type="date"
              class="input"
              v-model="ordCompraGuia.fechaMov"
              :readonly="readonlyFechaObser"
            />
          </div>

          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Liquida por Peso finca</label>
            <input
              type="checkbox"
              class="checkbox"
              v-model="ordCompraGuia.liqPesoFinca"
              @change="afterUpdateLiqPeso"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">No. planilla pesaje:</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraGuia.docPlanillaPes"
              :readonly="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">No. reses negociadas:</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraGuia.nResesNego"
              :readonly="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Peso finca:</label>
            <input
              type="text"
              class="input"
              v-model="pesoPotreros"
              :readonly="readonly"
              @change="pesoProteroAfter"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Peso promedio</label>
            <input
              type="text"
              class="input"
              v-model="pesoProm"
              :readonly="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Precio por kilo del ganado</label>
            <input
              type="text"
              class="input"
              v-model="precioKilo"
              :readonly="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0 h-8">
            <label class="label">Observacion</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraGuia.observacion"
              :readonly="readonlyFechaObser"
            />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-guias">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-5/6 mt-2 mb-6 md:mb-0">
            <label class="label">Liquidacion de precios</label>
          </div>
          <div class="flex flex-row flex-wrap justify-end">
            <div class="mb-6 md:mb-0">
              <button
                class="btn-save"
                v-bind:class="{
                  'opacity-50 cursor-not-allowed hover:btn-save':
                    readonlyFechaObser,
                }"
                :disabled="readonlyFechaObser"
                @click="viewModalPrint"
              >
                Imprimir documento
              </button>
            </div>
            <div class="mb-6 md:mb-0">
              <button
                class="btn-save"
                v-bind:class="{
                  'opacity-50 cursor-not-allowed hover:btn-save': readonly,
                }"
                @click="ordCompraGuiaSubAdd"
              >
                Adicionar informacion Reses
              </button>
            </div>
          </div>
          <div class="card-table">
            <table class="table-fixed w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th style="visibility: collapse; display: none">
                    Id Consecutivo
                  </th>
                  <th>Guia No.</th>
                  <th>Tipo Retefuente</th>
                  <th>Precio por kilo del ganado</th>
                  <th>Valor flete</th>
                  <th>#Reses</th>
                  <th>Total Kilos</th>
                  <th>Clase</th>
                  <th>Tercero</th>
                  <th>Finca</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b border-gray-500"
                  v-for="(item, index) in tblOrdCompraSub"
                  :key="index"
                  @click="selecOrdCompraSub(item)"
                >
                  <template v-if="item.autoNum === ordCompraSubEdit.autoNum">
                    <td style="visibility: collapse; display: none">
                      {{ item.idConsecutivo }}
                    </td>
                    <td class="text-center">
                      <select
                        class="appearance-none"
                        style="width: 40px"
                        v-model="item.nGuia"
                        @change="ordCompraGuiaSubUpdate"
                      >
                        <option
                          v-for="(item, index) in ordCompraSubNGuia"
                          :value="item.id"
                          :key="index"
                        >
                          {{ item.item }}
                        </option>
                      </select>
                    </td>
                    <td class="text-center">
                      <select
                        class="appearance-none"
                        style="width: 15px"
                        v-model="item.retefApli"
                        @change="ordCompraGuiaSubUpdate"
                      >
                        <option
                          v-for="(item, index) in ordCompraSubReteApli"
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
                        v-model="item.vlrKilo"
                        :readonly="readonlyValorKilo"
                        @change="ordCompraGuiaSubUpdate"
                      />
                    </td>
                    <td class="text-center">
                      <input
                        type="text"
                        class="input"
                        v-model="item.valorTrans"
                        :readonly="readonlyValorTrans"
                        @change="ordCompraGuiaSubUpdate"
                      />
                    </td>
                    <td class="text-center">
                      <input
                        type="text"
                        class="input"
                        v-model="item.nAnim"
                        :readonly="readonly"
                        @change="ordCompraGuiaSubUpdate"
                      />
                    </td>
                    <td class="text-center">
                      <input
                        type="text"
                        class="input"
                        v-model="item.totalKilosP"
                        :readonly="readonly"
                        @change="ordCompraGuiaSubUpdate"
                      />
                    </td>
                    <td class="text-center">
                      <input
                        type="text"
                        class="input"
                        v-model="item.descripcionCla"
                        :readonly="readonly"
                        @change="ordCompraGuiaSubUpdate"
                      />
                    </td>
                    <td class="text-center">
                      <input
                        type="text"
                        class="input"
                        v-model="item.tercero"
                        :readonly="readonly"
                        @change="ordCompraGuiaSubUpdate"
                      />
                    </td>
                    <td class="text-center">
                      <input
                        type="text"
                        class="input"
                        v-model="item.descripcionFin"
                        :readonly="readonly"
                        @change="ordCompraGuiaSubUpdate"
                      />
                    </td>
                  </template>
                  <template v-else>
                    <td style="visibility: collapse; display: none">
                      {{ item.idConsecutivo }}
                    </td>
                    <td class="text-center">
                      <select
                        class="appearance-none"
                        style="width: 40px"
                        v-model="item.nGuia"
                        disabled
                      >
                        <option
                          v-for="(item, index) in ordCompraSubNGuia"
                          :value="item.id"
                          :key="index"
                        >
                          {{ item.item }}
                        </option>
                      </select>
                    </td>
                    <td class="text-center">
                      <select
                        class="appearance-none"
                        style="width: 15px"
                        v-model="item.retefApli"
                        disabled
                      >
                        <option
                          v-for="(item, index) in ordCompraSubReteApli"
                          :value="item.id"
                          :key="index"
                        >
                          {{ item.item }}
                        </option>
                      </select>
                    </td>
                    <td class="text-center">
                      {{ convertToDecimal(item.vlrKilo) }}
                    </td>
                    <td class="text-center">
                      {{ convertToDecimal(item.valorTrans) }}
                    </td>
                    <td class="text-center">{{ item.nAnim }}</td>
                    <td class="text-center">
                      {{ convertToDecimal(item.totalKilosP) }}
                    </td>
                    <td class="text-center">
                      {{ item.descripcionCla }}
                    </td>
                    <td class="text-center">{{ item.tercero }}</td>
                    <td class="text-center">
                      {{ item.descripcionFin }}
                    </td>
                  </template>
                </tr>
                <tr>
                  <td style="visibility: collapse; display: none">
                    {{ ordCompraSubAdd.idConsecutivo }}
                  </td>
                  <td class="text-center">
                    <select
                      class="select"
                      style="width: 40px"
                      v-model="ordCompraSubAdd.nGuia"
                      @change="ordCompraNGuia(ordCompraSubAdd.nGuia)"
                    >
                      <option
                        v-for="(item, index) in ordCompraSubNGuia"
                        :value="item.id"
                        :key="index"
                      >
                        {{ item.item }}
                      </option>
                    </select>
                  </td>
                  <td class="text-center">
                    <select
                      class="select"
                      style="width: 15px"
                      v-model="ordCompraSubAdd.retefApli"
                    >
                      <option
                        v-for="(item, index) in ordCompraSubReteApli"
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
                      v-model="ordCompraSubAdd.vlrKilo"
                      :readonly="readonlyValorKilo"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="ordCompraSubAdd.valorTrans"
                      :readonly="readonlyValorTrans"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="ordCompraSubAdd.nAnim"
                      :readonly="readonly"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="ordCompraSubAdd.totalKilosP"
                      :readonly="readonly"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="ordCompraSubAdd.descripcionCla"
                      :readonly="readonly"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="ordCompraSubAdd.tercero"
                      :readonly="readonly"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="ordCompraSubAdd.descripcionFin"
                      :readonly="readonly"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex flex-row flex-wrap justify-end">
            <div class="mb-6 md:mb-0 mt-2">
              <button class="btn-save" @click="actualizarDatosTable">
                Actualizar datos estadisticos
              </button>
            </div>
          </div>
          <div class="card-table">
            <table class="table-fixed w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th style="visibility: collapse; display: none">
                    IdConsecutivo
                  </th>
                  <th>#Reses</th>
                  <th>Guia No.</th>
                  <th>Peso en F.S</th>
                  <th>Peso finca</th>
                  <th>Peso C. Caliente</th>
                  <th>Rend. C.Cte F.S</th>
                  <th>Rend. C.Cte Finca</th>
                  <th>Retef</th>
                  <th>Vr Kilo</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b border-gray-500"
                  v-for="(item, index) in tblOrdCompraSub2"
                  :key="index"
                >
                  <td style="visibility: collapse; display: none"></td>
                  <td>{{ item.nAnim }}</td>
                  <td>{{ item.nGuia }}</td>
                  <td>{{ item.totalKilosP }}</td>
                  <td>{{ item.pesoGuiaPot }}</td>
                  <td>{{ item.pesoCanal }}</td>
                  <td>{{ item.rendPotr }}</td>
                  <td>{{ item.rendPotr }}</td>
                  <td>{{ item.retefApli }}</td>
                  <td>{{ item.vlKiloRes }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-table">
            <table class="table-fixed w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th style="visibility: collapse; display: none">
                    IdConsecutivo
                  </th>
                  <th>Titulo</th>
                  <th>#Reses</th>
                  <th>Kilos</th>
                  <th>Prom. por Res</th>
                  <th>Porc. Merma</th>
                  <th>Merma Prom.por Animal</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b border-gray-500"
                  v-for="(item, index) in tblOrdCompraSub3"
                  :key="index"
                >
                  <td style="visibility: collapse; display: none">
                    {{ item.idConsecutivo }}
                  </td>
                  <td class="text-center">{{ item.titul }}</td>
                  <td class="text-center">{{ item.nResesNego }}</td>
                  <td class="text-center">
                    {{ convertToDecimal(item.pesoPotreros) }}
                  </td>
                  <td class="text-center">
                    {{ convertToDecimal(item.pesoProm) }}
                  </td>
                  <td class="text-center">
                    {{ convertToDecimal(item.dif) }}
                  </td>
                  <td class="text-center">
                    {{ convertToDecimal(item.dif2) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-pagos">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Beneficiarios del pago</label>
          </div>
        </div>
        <div class="card-table">
          <table class="table-fixed w-full text-xs">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th style="display: none">Id Consecutivo</th>
                <th>Guia No.</th>
                <th>Lote No.</th>
                <th>Tercero cheque</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b border-gray-500"
                v-for="(item, index) in tblOrdCompraSub5"
                :key="index"
              >
                <td style="visibility: collapse; display: none">
                  {{ item.idConsecutivo }}
                </td>
                <td class="text-center">{{ item.nGuia }}</td>
                <td class="text-center">{{ item.loteNo }}</td>
                <td class="text-center">{{ item.expr1 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-anular px-10" v-if="pgAnulada">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label">Anular</label>
            <input
              type="checkbox"
              class="checkbox"
              v-model="anula"
              ref="anuladoRef"
            />
          </div>

          <div class="md:w-full mb-2 md:mb-0 ml-2">
            <label class="label">Motivo:</label>
            <input type="text" class="input" v-model="motivoAnul1" />
          </div>

          <div class="md:w-full mb-2 md:mb-0 ml-8 mt-4">
            <button class="btn-save" @click="viewModalAnular">Anular</button>
          </div>
        </div>
      </div>

      <div class="mt-0 pt-3 px-10 flex flex-row flex-wrap">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label">Consecutivo No:</label>
          <input
            type="text"
            class="input"
            v-model="ordCompraGuia.numeroDoc"
            readonly
          />
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label">No Reses Negociadas</label>
          <input
            type="text"
            class="input"
            v-model="ordCompraGuia.nResesNego"
            readonly
          />
        </div>
      </div>
    </div>
    <!-- Modal Anualar -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="modalAnular"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8; Va Anular este Documento este proceso es
              irreversible</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-succes" @click="acceptModalAnular()">
                    Si
                  </button>
                </div>
                <div
                  class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-danger" @click="closeModalAnular()">
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal Anualar -->

    <!-- Modal Anualar -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="modalPrint"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8;Genera las Ordenes de Compra?</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-succes" @click="acceptModalPrint()">
                    Si
                  </button>
                </div>
                <div
                  class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-danger" @click="closeModalPrint()">
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal Anualar -->

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
import { Component, Ref, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import moment from 'moment';
import * as Sentry from '@sentry/browser';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import Select from '@/components/reusable/select.vue';
import {
  IOrdCompraGuia,
  IOrdCompraGuiaSub,
  IOrdCompraGuiaSub2,
  IOrdCompraGuiaSub3,
  IOrdCompraGuiaSub5,
} from '@/remote/api/guia_sacrificio/type';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    Select,
  },
  name: 'OrdCompraGuia',
})
export default class OrdCompraGuia extends Vue {
  @Ref('anuladoRef') public anuladoRef: HTMLInputElement;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private pgAnulada: boolean = false;
  private readonly: boolean = false;
  private readonlyValorKilo: boolean = false;
  private readonlyValorTrans: boolean = false;
  private readonlyFechaObser: boolean = true;
  private modalAnular: boolean = false;
  private modalPrint: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private search: boolean = false;
  private anula: boolean = false;
  private motivoAnul1: string = '';

  private id: number = null;
  private pesoProm: string = '';
  private pesoPotreros: string = '';
  private precioKilo: string = '';

  private customerSearch: IInterfaceSelect[] = [];
  private ordCompraSubNGuia: IInterfaceSelect[] = [];
  private ordCompraSubReteApli: IInterfaceSelect[] = [];
  private tblOrdCompraSub: IOrdCompraGuiaSub[] = [];
  private tblOrdCompraSub2: IOrdCompraGuiaSub2[] = [];
  private tblOrdCompraSub3: IOrdCompraGuiaSub3[] = [];
  private tblOrdCompraSub5: IOrdCompraGuiaSub5[] = [];

  private ordCompraSubAdd: IOrdCompraGuiaSub = {
    autoNum: 0,
    descripcionCla: '',
    descripcionFin: '',
    finca: '',
    idConsecutivo: 0,
    idCxPag: 0,
    idOcomp: 0,
    nAnim: 0,
    nGuia: 0,
    nitTercero: '',
    retefApli: '',
    tercero: '',
    totalKilosP: 0,
    valorTrans: 0,
    vlrKilo: 0,
  };
  private ordCompraSubEdit: IOrdCompraGuiaSub = {
    autoNum: 0,
    descripcionCla: '',
    descripcionFin: '',
    finca: '',
    idConsecutivo: 0,
    idCxPag: 0,
    idOcomp: 0,
    nAnim: 0,
    nGuia: 0,
    nitTercero: '',
    retefApli: '',
    tercero: '',
    totalKilosP: 0,
    valorTrans: 0,
    vlrKilo: 0,
  };

  private ordCompraGuia: IOrdCompraGuia = {
    anulada: false,
    docPlanillaPes: '',
    estacion: '',
    fechaMov: '',
    fechaReg: '',
    finca: '',
    idConsecutivo: 0,
    imprim: 'N',
    liqPesoFinca: false,
    motivoAnu: '',
    nLoteUsua: '',
    nResesNego: 0,
    numeroDoc: 0,
    observacion: '',
    pesoPotreros: 0,
    pesoProm: 0,
    precioKilo: 0,
    transporProvFs: '',
    usuarioReg: '',
  };

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );
  private guiaSacrificioReports = new ReportesGuiaSacrificio(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    this.openFrom();
    await this.ordCompraSubNguia();
    await this.ordCompraSubRetefApli();
    await this.searchCustomer();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private openFrom() {
    this.search = false;
    this.pgAnulada = false;
    if (this.ordCompraGuia.numeroDoc > 0) {
      this.afterUpdateLiqPeso();
    }
  }

  private convertDate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private convertHoras(date: string) {
    return moment(date).utc().format('hh:mm:ss');
  }

  private convertToDecimal(dato: number) {
    return new Intl.NumberFormat('en-GB', {
      currency: 'EUR',
      style: 'currency',
    })
      .format(dato)
      .replace(/[€]/g, '');
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private closeModalAnular() {
    this.modalAnular = false;
  }

  private viewModalAnular() {
    if (this.anula) {
      this.modalAnular = true;
    }
  }

  private closeModalPrint() {
    this.modalPrint = false;
  }

  private viewModalPrint() {
    this.modalPrint = true;
  }

  private selecOrdCompraSub(item: IOrdCompraGuiaSub) {
    this.ordCompraSubEdit = item;
  }

  private async rePrint() {
    if (this.ordCompraGuia.imprim === 'N') {
      this.showOutput(true, 'Utilize la opcion Imprimir Documento');
      return;
    }
    await this.ordcompraguiaPdf(this.ordCompraGuia.idConsecutivo);
  }

  private pesoProteroAfter() {
    if (this.ordCompraGuia.nResesNego > 0) {
      if (Number.parseFloat(this.pesoPotreros) > 0) {
        this.pesoProm = this.convertToDecimal(
          Number.parseFloat(this.pesoPotreros) / this.ordCompraGuia.nResesNego,
        );
      }
    }
  }

  private anular() {
    if (!this.ordCompraGuia.anulada) {
      this.pgAnulada = true;
      this.anula = false;
      this.anuladoRef.focus();
      return;
    }
    this.showOutput(false, 'Documento Anulado');
  }

  private afterUpdateLiqPeso() {
    if (!this.ordCompraGuia.liqPesoFinca) {
      this.readonly = true;
      this.pesoProm = '0.0';
      this.pesoPotreros = '0.0';
      this.precioKilo = '0.0';
      this.readonlyValorKilo = false;
      this.readonlyValorTrans = true;
      //  valor kilo 0 and ValorTrans 1 Table GuiaSub
      return;
    }

    this.readonly = false;
    this.readonlyValorKilo = true;
    this.readonlyValorTrans = false;
    //  valor kilo 1 and ValorTrans 0 Table GuiaSub
  }

  private modify() {
    this.readonlyFechaObser = false;
    this.afterUpdateLiqPeso();
  }

  private async adicionar() {
    this.readonlyFechaObser = false;
    this.clearData();
    await this.ordCompraGuiaNumDoc();
    this.afterUpdateLiqPeso();
  }

  private async actualizarDatosTable() {
    await this.ordCompraGuiaSub(this.ordCompraGuia.idConsecutivo);
    await this.ordCompraGuiaSub2(this.ordCompraGuia.idConsecutivo);
    await this.ordCompraGuiaSub3(this.ordCompraGuia.idConsecutivo);
    await this.ordCompraGuiaSub5(this.ordCompraGuia.idConsecutivo);
  }

  private async acceptModalAnular() {
    this.ordCompraGuia.anulada = this.anula;
    this.ordCompraGuia.motivoAnu = this.motivoAnul1;
    this.ordCompraGuia.estacion = this.$store.getters.getUsuario;
    await this.ordCompraGuiaAnualar(this.ordCompraGuia.idConsecutivo);
    this.modalAnular = false;
  }

  private async acceptModalPrint() {
    await this.ordCompraGuiaPrint(this.ordCompraGuia.idConsecutivo);
    this.modalPrint = false;
  }

  private async ordCompraGuiaAnualar(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putOrdCompraGuiaAnular(
        id,
        this.ordCompraGuia,
      );

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }

      this.ordCompraGuia.anulada = false;
      this.ordCompraGuia.motivoAnu = '';
      this.ordCompraGuia.estacion = '';

      this.pgAnulada = false;

      await this.searchCustomer();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaPrint(id: number) {
    const confInv1 = {
      comprobanG: this.$store.getters.getTConfinv1.comprobanG,
      cuentaNPag: this.$store.getters.getTConfinv1.cuentaNPag,
      fecPInv: this.$store.getters.getTConfinv1.fecPInv,
      idEmpresa: this.$store.getters.getTConfinv1.idEmpresa,
      movOcLt: this.$store.getters.getTConfinv1.movOcLt,
      subTipEgre: this.$store.getters.getTConfinv1.subTipEgre,
      tipoEgre: this.$store.getters.getTConfinv1.tipoEgre,
      tipoGas: this.$store.getters.getTConfinv1.tipoGas,
    };

    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postOrdCompraGuiaPrint(id, {
        config: confInv1,
        data: this.ordCompraGuia,
      });
      this.ordCompraGuia.imprim = 'S';
      this.ordCompraGuia.numeroDoc = response.data;

      await this.ordcompraguiaPdf(id);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaNumDoc() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraGuiaNumDoc();
      this.ordCompraGuia.numeroDoc = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaSubAdd() {
    this.ordCompraSubAdd.idConsecutivo = this.ordCompraGuia.idConsecutivo;
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postOrdCompraGuiaSub(
        this.ordCompraSubAdd,
      );

      await this.ordCompraGuiaSub(this.ordCompraGuia.idConsecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraNGuia(nGuia: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.postOrdCompraGuiaSubNGuia(nGuia);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      this.ordCompraSubEdit = {
        autoNum: 0,
        descripcionCla: '',
        descripcionFin: '',
        finca: '',
        idConsecutivo: 0,
        idCxPag: 0,
        idOcomp: 0,
        nAnim: 0,
        nGuia: 0,
        nitTercero: '',
        retefApli: '',
        tercero: '',
        totalKilosP: 0,
        valorTrans: 0,
        vlrKilo: 0,
      };
      this.ordCompraSubAdd = {
        autoNum: 0,
        descripcionCla: '',
        descripcionFin: '',
        finca: '',
        idConsecutivo: 0,
        idCxPag: 0,
        idOcomp: 0,
        nAnim: 0,
        nGuia: 0,
        nitTercero: '',
        retefApli: '',
        tercero: '',
        totalKilosP: 0,
        valorTrans: 0,
        vlrKilo: 0,
      };
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaSubUpdate() {
    await this.ordCompraNGuia(this.ordCompraSubEdit.nGuia);
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putOrdCompraGuiaSub(
        this.ordCompraSubEdit.idConsecutivo,
        this.ordCompraSubEdit.autoNum,
        this.ordCompraSubEdit,
      );

      await this.ordCompraGuiaSub(this.ordCompraGuia.idConsecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaSub(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraGuiaSub(id);
      if (response.data === null) {
        return;
      }
      this.tblOrdCompraSub = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaSub2(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraGuiaSub2(id);
      this.tblOrdCompraSub2 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaSub3(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraGuiaSub3(id);
      this.tblOrdCompraSub3 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaSub5(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraGuiaSub5(id);
      this.tblOrdCompraSub5 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaUpdate() {
    this.ordCompraGuia.fechaReg = '';
    try {
      const response = await this.guiaSacrificioApi.putOrdCompraGuia(
        this.ordCompraGuia.idConsecutivo,
        this.ordCompraGuia,
      );

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
      await this.searchCustomer();
      await this.ordCompraGuiaSub(response.data.idConsecutivo);
      await this.ordCompraGuiaSub2(response.data.idConsecutivo);
      await this.ordCompraGuiaSub3(response.data.idConsecutivo);
      await this.ordCompraGuiaSub5(response.data.idConsecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaAdd() {
    this.ordCompraGuia.fechaMov = this.convertDate(this.ordCompraGuia.fechaMov);
    this.ordCompraGuia.fechaReg = '';
    this.ordCompraGuia.pesoProm = Number.parseFloat(this.pesoProm);
    this.ordCompraGuia.pesoPotreros = Number.parseFloat(this.pesoPotreros);
    this.ordCompraGuia.precioKilo = Number.parseFloat(this.precioKilo);

    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postOrdCompraGuia(
        this.ordCompraGuia,
      );
      await this.searchCustomer();
      await this.ordCompraGuiaSub(response.data.idConsecutivo);
      await this.ordCompraGuiaSub2(response.data.idConsecutivo);
      await this.ordCompraGuiaSub3(response.data.idConsecutivo);
      await this.ordCompraGuiaSub5(response.data.idConsecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async searchCustomer() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getOrdCompraGuiaBuscarClient();
      this.customerSearch = response.data.map((e: any) => {
        return {
          id: e.idConsecutivo,
          item: `${e.numeroDoc} - ${this.convertDate(e.fecha)} - ${
            e.nLoteUsua !== null ? e.nLoteUsua : ''
          } - ${e.nResesNego} - ${e.pesoPotreros} - ${e.pesoProm} - ${
            e.precioKilo
          }`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraGuiaID(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraGuia(id);

      this.ordCompraGuia = response.data as IOrdCompraGuia;
      this.ordCompraGuia.fechaMov = this.convertDate(
        this.ordCompraGuia.fechaMov,
      );
      this.ordCompraGuia.fechaReg = this.convertDate(
        this.ordCompraGuia.fechaReg,
      );

      this.pesoProm = this.convertToDecimal(this.ordCompraGuia.pesoProm);
      this.pesoPotreros = this.convertToDecimal(
        this.ordCompraGuia.pesoPotreros,
      );
      this.precioKilo = this.convertToDecimal(this.ordCompraGuia.precioKilo);

      await this.ordCompraGuiaSub(this.ordCompraGuia.idConsecutivo);
      await this.ordCompraGuiaSub2(this.ordCompraGuia.idConsecutivo);
      await this.ordCompraGuiaSub3(this.ordCompraGuia.idConsecutivo);
      await this.ordCompraGuiaSub5(this.ordCompraGuia.idConsecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraSubNguia() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraGuiaSubNGuia();

      this.ordCompraSubNGuia = response.data.map((e: any) => {
        return {
          id: e.NGuia,
          item: `${e.NGuia} - ${e.NLote} - ${this.convertDate(e.FechaPes)} - ${
            e.Proveedor
          } - ${e.Reses} - ${e.Clase} - ${e.Peso}`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraSubRetefApli() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getOrdCompraGuiaSubRetefApli();

      this.ordCompraSubReteApli = response.data.map((e: any) => {
        return {
          id: e.idReteFu,
          item: `${e.idReteFu} - ${e.concepRete} - ${this.convertToDecimal(
            e.porRete,
          )}€`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordcompraguiaPdf(id: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getrptordcompraguiaPDF(id);
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private clearData() {
    this.ordCompraGuia = {
      anulada: false,
      docPlanillaPes: '',
      estacion: '',
      fechaMov: '',
      fechaReg: '',
      finca: '',
      idConsecutivo: 0,
      imprim: 'N',
      liqPesoFinca: false,
      motivoAnu: '',
      nLoteUsua: '',
      nResesNego: 0,
      numeroDoc: 0,
      observacion: '',
      pesoPotreros: 0,
      pesoProm: 0,
      precioKilo: 0,
      transporProvFs: '',
      usuarioReg: '',
    };

    this.pesoProm = '0.0';
    this.pesoPotreros = '0.0';
    this.precioKilo = '0.0';
  }
}
</script>
