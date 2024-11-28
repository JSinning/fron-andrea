<template>
  <div class="container mx-auto">
    <!-- output -->
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>
    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>
    <div class="main-div mb-2">
      <div class="flex flex-row flex-wrap mb-2">
        <div class="px-3 md:w-1/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Recepción de Ganado</h1>
        </div>
        <div class="md:w-1 px-5 mb-6 md:mb-0 mt-5">
          <p class="text-andrea font-bold text-2xl">
            {{ validateAnulado(recepcion.anulada) }}
          </p>
        </div>
        <div class="flex flex-row flex-wrap px-5 justify-end">
          <div class="md:w-3/5 mb-6 md:mb-0 mt-2" v-if="search">
            <label class="label">Busqueda:</label>
            <select class="select" v-model="id" @change="reception(id)">
              <option
                v-for="(item, index) in customerSearch"
                :key="index"
                :value="item.Lote"
              >
                {{ item.Lote }} - {{ item.Guia }} - {{ item.Tercero }} -
                {{ convertDate(item.Fecha) }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="search = !search">Buscar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="modify">Modificar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="anular" v-if="visbleAnualar">
            Anular
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button
            class="btn-primary"
            @click="changeEstado"
            v-if="visibleEstado"
          >
            Cambiar Estado
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="reOnPrint">Reimprimir</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="update">Guardar</button>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos-basicos-guia"
        class="hidden"
        checked
      />
      <input type="radio" name="tab" id="datos-adicionales" class="hidden" />
      <input
        type="radio"
        name="tab"
        id="anular"
        class="hidden"
        v-if="pgAnuala"
      />
      <input
        type="radio"
        name="tab"
        id="estado"
        class="hidden"
        v-if="pgMoEstado"
      />

      <div class="mt-2 mb-0 nav">
        <label for="datos-basicos-guia">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos basicos
          </span>
        </label>
        <label for="datos-adicionales">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos Adicionales
          </span>
        </label>
        <label for="anular">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="pgAnuala"
          >
            Anular
          </span>
        </label>
        <label for="estado">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="pgMoEstado"
          >
            Cambiar Estado
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-guias">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Lote No:</label>
            <input
              type="number"
              class="input"
              v-model="recepcion.loteNo"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-2/5 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/4"></div>

          <div class="w-full px-3">
            <label class="label">Proveedor:</label>
            <div class="flex gap-4">
              <div class="w-1/2 flex gap-4">
                <PaginatedSelect
                  class="flex-1"
                  :fetch="terceros"
                  v-model="recepcion.nitProveedor"
                  @change="terceroCod"
                  :disabled="readonly"
                ></PaginatedSelect>
                <PaginatedSelect
                  class="flex-1"
                  v-model="recepcion.nitProveedor"
                  @change="terceroCod"
                  :fetch="suppliers"
                  :disabled="readonly"
                ></PaginatedSelect>
              </div>
              <PaginatedSelect
                class="w-1/2"
                :fetch="namesuppliers"
                v-model="recepcion.nitProveedor"
                @change="terceroCod"
                :disabled="readonly"
              ></PaginatedSelect>
            </div>
          </div>
          <div class="md:w-3/4 px-3 mb-6 md:mb-0">
            <label class="label">Transportador:</label>
            <input
              type="text"
              class="input"
              v-model="recepcion.transportador"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Lic.Ica</label>
            <input
              type="text"
              class="input"
              v-model="recepcion.lIca"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Hora y Fecha del Pesaje:</label>
            <input
              type="time"
              class="input"
              v-model="recepcion.horaPesaje"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-4/12 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <input
              type="date"
              class="input"
              v-model="recepcion.fechaPes"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Destino:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="recepcion.destino"
              :disabled="readonly"
            >
              <option
                v-for="(item, index) in destiny"
                :key="index"
                :value="item.id"
              >
                {{ item.item }}
              </option>
            </select>
          </div>
        </div>
        <div class="p-2"></div>
        <div class="flex flex-row flex-wrap">
          <div class="card w-full flex flex-row flex-wrap">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label font-bold text-base">Clasificacion:</label>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Clase:</label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="recepcion.clase"
                :disabled="readonly"
              >
                <option
                  v-for="(item, index) in clase"
                  :key="index"
                  :value="item.idClase"
                >
                  {{ item.idClase }}
                </option>
              </select>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label py-2"></label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="recepcion.clase"
                :disabled="readonly"
              >
                <option
                  v-for="(item, index) in nameclass"
                  :key="index"
                  :value="item.idClase"
                >
                  {{ item.descripcionCla }}
                </option>
              </select>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Sexo:</label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="recepcion.sexo"
                :disabled="readonly"
              >
                <option
                  v-for="(item, index) in sex"
                  :key="index"
                  :value="item.idSexo"
                >
                  {{ item.idSexo }}
                </option>
              </select>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label py-2"></label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="recepcion.sexo"
                :disabled="readonly"
              >
                <option
                  v-for="(item, index) in nameSex"
                  :key="index"
                  :value="item.idSexo"
                >
                  {{ item.descripcionSex }}
                </option>
              </select>
            </div>
          </div>
          <div class="p-2"></div>
          <div class="card w-full flex">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label font-bold text-base">Datos del Peso:</label>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">No Animales:</label>
              <input
                type="number"
                class="input"
                v-model="recepcion.noAnimales"
                :readonly="readonly"
              />
            </div>
            <div class="md:w-1/2 px-3 py-5 mb-6 md:mb-0">
              <label class="label">
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="recepcion.liqPesoFinca"
                  @change="afterLiquidation(recepcion.liqPesoFinca)"
                  :disabled="readonly"
                />
                Liquida por Peso Finca:
              </label>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Procedencia(Ciudad):</label>
              <PaginatedSelect
                v-model="recepcion.procedencia"
                :fetch="cities"
                :disabled="readonly"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Total Kilos de Peso :</label>
              <input
                type="number"
                class="input"
                v-model="totalKilosP"
                :readonly="readonlyDatosPeso"
                @change="afterTotalKilosP"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Peso Promedio:</label>
              <input
                type="number"
                class="input"
                v-model="pesoPromedio"
                :readonly="readonly"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Peso Finca:</label>
              <input
                type="number"
                class="input"
                v-model="pesoProgram"
                :readonly="readonly"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Documento Flete:</label>
              <input
                type="number"
                class="input"
                v-model="recepcion.docFlete"
                :readonly="readonlyDatosPeso"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Valor Flete:</label>
              <input
                type="number"
                class="input"
                v-model="vlrFlete"
                :readonly="readonlyDatosPeso"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-adicionales">
        <div class="flex flex-row flex-wrap">
          <div class="card w-1/2 flex flex-row flex-wrap">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label font-bold text-base"
                >Datos Ord. Compra:</label
              >
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Nº Compra Usuario:</label>
              <input
                type="number"
                class="input"
                v-model="recepcion.docum"
                :readonly="readonly"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Valor Kilo:</label>
              <input
                type="number"
                class="input"
                v-model="vlrKilo"
                :readonly="readonlyVlrPrint"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Tipo Retefuente:</label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="recepcion.reteFu"
                :disabled="readonly"
              >
                <option
                  v-for="(item, index) in retencion"
                  :key="index"
                  :value="item.idReteFu"
                >
                  {{ item.concepRete }}
                </option>
              </select>
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">No Dias:</label>
              <input
                type="text"
                class="input"
                v-model="nDia"
                :readonly="readonly"
              />
            </div>
            <div class="md:w-full px-3 py-2 mb-6 md:mb-0">
              <label class="label">
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="recepcion.esCanal"
                  :readonly="readonly"
                />
                Es canal caliente:</label
              >
            </div>
          </div>
          <div class="card w-1/2 flex flex-row flex-wrap">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label font-bold text-base">Datos Sacrificio:</label>
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Peso Canal CTE:</label>
              <input
                type="number"
                class="input"
                v-model="pesoCanalC"
                :readonly="readonly"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Peso Pieles:</label>
              <input
                type="number"
                class="input"
                v-model="pesoPieles"
                :readonly="readonly"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">% Rendimiento CTE:</label>
              <input
                type="number"
                class="input"
                v-model="proCTE"
                :readonly="readonly"
              />
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">% Rendimiento Pieles:</label>
              <input
                type="number"
                class="input"
                v-model="proPieles"
                :readonly="readonly"
              />
            </div>
          </div>

          <div class="md:w-full px-3 py-2 mb-6 md:mb-0"></div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Finca:</label>
            <input
              type="text"
              class="input"
              v-model="recepcion.finca"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-2/3 px-3 mb-6 md:mb-0">
            <label class="label">Elaboro :</label>
            <input
              type="text"
              class="input"
              v-model="recepcion.elaboro"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-2/3 px-3 mb-6 md:mb-0">
            <label class="label">Observaciones:</label>
            <input
              type="text"
              class="input"
              v-model="recepcion.observacion"
              :readonly="readonly"
            />
          </div>
          <div class="w-full"></div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Orden de Compra:</label>
            <input
              type="text"
              class="input"
              v-model="recepcion.cOrdenCp"
              :readonly="readonly"
            />
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <button
              class="btn-save"
              v-bind:class="{
                'opacity-50 cursor-not-allowed hover:bt-save': readonlyVlrPrint,
              }"
              @click="viewModalOrdenCp"
              :disabled="readonlyVlrPrint"
            >
              Generar Ord. Compra
            </button>
          </div>
          <div class="md:w-1/4 px-0 mb-6 md:mb-0">
            <button
              class="btn-save"
              v-bind:class="{
                'opacity-50 cursor-not-allowed hover:btn-save': readonly,
              }"
              @click="onPrint()"
              :disabled="readonly"
            >
              Imprimir Documento
            </button>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-anular" v-if="pgAnuala">
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label px-2">
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="recepcion.anulada"
                  :readonly="readonly"
                />
                Anular
              </label>
            </div>
            <div class="md:w-full px-3 py-2 mb-6 md:mb-0">
              <label class="label">Motivo:</label>
              <input
                type="number"
                class="input"
                v-model="recepcion.motivoAnula"
                :readonly="readonly"
              />
            </div>
            <div class="w-full"></div>
            <div class="md:w-1/2 px-3 py-2 ml-6 mb-6 md:mb-0">
              <button class="btn-save p-2" :disabled="readonly">Anular</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden px-10 tab-estado" v-if="pgMoEstado">
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap justify-center">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Estado:</label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="recepcion.estado"
                :disabled="readonly"
              >
                <option
                  v-for="(item, index) in estate"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.item }}
                </option>
              </select>
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Motivo Estado:</label>
              <input
                type="text"
                class="input"
                v-model="recepcion.motivoEstado"
                :readonly="readonly"
              />
            </div>
            <div class="md:w-full md:ml-0 px-3 mb-6 md:mb-0">
              <button class="btn-save p-2" :disabled="readonly">
                Cambiar Estado
              </button>
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Estado:</label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="estado1"
                :disabled="readonly"
              >
                <option
                  v-for="(item, index) in estate"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.item }}
                </option>
              </select>
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Motivo Estado:</label>
              <input
                type="text"
                class="input"
                v-model="motiEstado1"
                :readonly="readonly"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />

      <!-- Modal orden Compras  -->
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="modalOrdenCp"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <div
              class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="text-lg"
                >&#x1f6c8; Esta Seguro de Generar o Realizar Cambios a la Orden
                de Compra {{ recepcion.cOrdenCp }}</strong
              >
              <div class="content-center mt-2">
                <div class="flex flex-row flex-wrap">
                  <div
                    class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-succes" @click="acceptModalOrdenCp()">
                      Si
                    </button>
                  </div>
                  <div
                    class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-danger" @click="closeModalOrdenCp()">
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal Orden Compras -->

      <!-- Modal Modify  -->
      <div
        class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
        v-if="modalModfiy"
      >
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <div
              class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="text-lg"
                >&#x1f6c8; Desea Generar Pesos (Canal Caliente y Pieles) al
                Lote: {{ recepcion.loteNo }}
              </strong>
              <div class="content-center mt-2">
                <div class="flex flex-row flex-wrap">
                  <div
                    class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-succes" @click="acceptModalModify()">
                      Si
                    </button>
                  </div>
                  <div
                    class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                  >
                    <button class="btn-danger" @click="closeModalModify()">
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Modal Modify-->
      <ModalPDFPreview
        :pdfData="pdfData"
        @close="closeModalPDF"
        v-if="showModalPDF"
      />
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import { IRecepcion } from '@/remote/api/guia_sacrificio/type';
import * as Sentry from '@sentry/browser';
import moment from 'moment/moment';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import PaginatedSelectGroup from '@/components/reusable/PaginatedSelectGroup.vue';
import PaginatedSelectGroupItem from '@/components/reusable/PaginatedSelectGroupItem.vue';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';
import IQuery from '@/types/query';
import { Proveedores } from '@/remote/api/guia_sacrificio/type/Proveedor';
import { BaseResponse } from '@/types';
import { Ciudades } from '@/remote/api/guia_sacrificio/type/Ciudad';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
    PaginatedSelectGroup,
    PaginatedSelectGroupItem,
  },
  name: 'RecepcionMod',
})
export default class RecepcionMod extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private search: boolean = false;
  private readonlyDatosPeso: boolean = false;
  private readonlyVlrPrint: boolean = false;
  private readonly: boolean = false;
  private pgAnuala: boolean = false;
  private pgMoEstado: boolean = false;
  private visbleAnualar: boolean = false;
  private visibleEstado: boolean = false;
  private modalOrdenCp: boolean = false;
  private modalModfiy: boolean = false;
  private aceptChange: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private id: number = 0;
  private proCTE: string = '';
  private proPieles: string = '';
  private vlrKilo: string = '';
  private nDia: string = '';
  private pesoCanalC: string = '';
  private pesoPieles: string = '';
  private totalKilosP: string = '';
  private pesoPromedio: string = '';
  private pesoProgram: string = '';
  private vlrFlete: string = '';
  private anual: boolean = false;
  private estado1: string = '';
  private motiEstado1: string = '';

  private customerSearch: any = [];
  private destiny: any = [];
  private clase: any = [];
  private nameclass: any = [];
  private sex: any = [];
  private nameSex: any = [];
  private retencion: any = [];
  private estate: any = [];
  private city: any = [];
  private recepcion: IRecepcion = {
    anulada: false,
    cOrdenCp: 0,
    clase: 0,
    confirma: false,
    destino: 0,
    docFlete: '',
    docum: '',
    elaboro: '',
    esCanal: false,
    estado: '',
    fecha: '',
    fechaPes: '',
    finca: '',
    horaPesaje: '',
    idConcecutiv: 0,
    imprime: 'N',
    lIca: '',
    liqPesoFinca: false,
    loteNo: 0,
    motivoAnula: '',
    motivoEstado: '',
    nDia: 0,
    nGuia: 0,
    nitProveedor: '',
    noAnimales: 0,
    observacion: '',
    pesoCanalC: 0,
    pesoPieles: 0,
    pesoProgram: 0,
    pesoPromedio: 0,
    procedencia: '',
    procesado: false,
    reteFu: '',
    sexo: 0,
    totalKilosP: 0,
    transportador: '',
    usuario: '',
    vlrFlete: 0,
    vlrKilo: 0,
    vlrKiloSug: 0,
  };

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );
  private guiaSacrificioReports = new ReportesGuiaSacrificio(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.searchCustomer();
    await this.classes();
    await this.nameClasses();
    await this.sexs();
    await this.nameSexs();
    await this.retencions();
    this.destinys();
    this.estates();
    this.openForm();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private openForm() {
    this.readonly = true;
    this.readonlyDatosPeso = true;
    this.readonlyVlrPrint = true;
    if (this.recepcion.confirma) {
      this.readonlyVlrPrint = true;
      return;
    }
    this.readonlyDatosPeso = false;
  }

  private viewModalOrdenCp() {
    this.modalOrdenCp = true;
  }

  private viewModalmodify() {
    this.modalModfiy = true;
  }

  private closeModalOrdenCp() {
    this.modalOrdenCp = false;
  }

  private closeModalModify() {
    this.modalModfiy = false;
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private acceptModalModify() {
    this.aceptChange = true;
    this.modalModfiy = false;
  }

  private convertDate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private convertHoras(date: string) {
    return moment(date).utc().format('hh:mm:ss');
  }

  private convertToDecimal(dato: number) {
    return Number(Math.round((dato + Number.EPSILON) * 100) / 100).toFixed(2);
  }

  private validateAnulado(anulado: boolean) {
    return anulado ? 'Anualdo' : '';
  }

  private afterTotalKilosP() {
    if (this.recepcion.noAnimales !== 0) {
      this.pesoPromedio = this.convertToDecimal(
        Number.parseFloat(this.totalKilosP) / this.recepcion.noAnimales,
      );
      this.pesoProgram = this.pesoPromedio;
      return;
    }

    this.pesoProgram = this.pesoPromedio;
  }

  private afterLiquidation(lqui: boolean) {
    if (!lqui) {
      this.readonlyDatosPeso = false;
      return;
    }
    this.readonlyDatosPeso = true;
  }

  private anular() {
    if (
      this.recepcion.fechaPes < this.$store.getters.getTConfinv1.fechaProc3 ||
      this.recepcion.fechaPes > this.$store.getters.getTConfinv1.fechaProc4
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }

    if (!this.recepcion.anulada) {
      this.pgAnuala = true;
      this.anual = false;
      return;
    }
    this.showOutput(false, 'Documento Anulado');
  }

  private changeEstado() {
    if (
      this.recepcion.fechaPes < this.$store.getters.getTConfinv1.fechaProc3 ||
      this.recepcion.fechaPes > this.$store.getters.getTConfinv1.fechaProc4
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }

    if (!this.recepcion.anulada) {
      this.pgMoEstado = true;
      this.estado1 = this.recepcion.estado;
      this.motiEstado1 = this.recepcion.motivoEstado;
      return;
    }
    this.showOutput(false, 'Documento Anulado');
  }

  private destinys() {
    this.destiny.push(
      { id: 1, item: 'SACRIFICIO' },
      { id: 2, item: 'POTRERO' },
      { id: 3, item: 'COMERCIAL' },
    );
  }

  private estates() {
    this.estate.push(
      { id: 1, item: 'GENERADA' },
      { id: 2, item: 'EN ESPERA' },
      { id: 3, item: 'APLAZADA' },
      { id: 4, item: 'CUMPLIDA' },
      { id: 9, item: 'ANULADA' },
    );
  }

  private async acceptModalOrdenCp() {
    await this.ordenbuy();
  }

  private async searchCustomer() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getBuscarClienteRecepcion();
      this.customerSearch = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async classes() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getClasesRecepcion();
      this.clase = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nameClasses() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getClasesDecripcionRecepcion();
      this.nameclass = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async sexs() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getSexoRecepcion();
      this.sex = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nameSexs() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getSexoDescripcionRecepcion();
      this.nameSex = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async retencions() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getRetefuenteRecepcion();
      this.retencion = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async reception(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getRecepcion(id);
      this.recepcion = response.data as IRecepcion;
      this.recepcion.horaPesaje = this.convertHoras(this.recepcion.horaPesaje);
      this.recepcion.fechaPes = this.convertDate(this.recepcion.fechaPes);
      this.vlrKilo = this.convertToDecimal(this.recepcion.vlrKilo);
      this.nDia = this.convertToDecimal(this.recepcion.nDia);
      this.pesoCanalC = this.convertToDecimal(this.recepcion.pesoCanalC);
      this.pesoPieles = this.convertToDecimal(this.recepcion.pesoPieles);
      this.totalKilosP = this.convertToDecimal(this.recepcion.totalKilosP);
      this.pesoPromedio = this.convertToDecimal(this.recepcion.pesoPromedio);
      this.pesoProgram = this.convertToDecimal(this.recepcion.pesoProgram);
      this.vlrFlete = this.convertToDecimal(this.recepcion.vlrFlete);
      this.proCTE = this.convertToDecimal(
        (this.recepcion.pesoCanalC / this.recepcion.totalKilosP) * 100,
      );
      this.proPieles = this.convertToDecimal(
        (this.recepcion.pesoPieles / this.recepcion.totalKilosP) * 100,
      );

      this.pgAnuala = false;
      this.pgMoEstado = false;
      this.openForm();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async terceroCod(cod: string) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getTerceroCodRecepcion(cod);
      this.recepcion.transportador = `${response.data.nombresC} ${response.data.apellidosC}`;
      this.recepcion.nDia = response.data.plazoPactado;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async suppliersCod(cod: string) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getProvedorCodRecepcion(cod);
      this.recepcion.transportador = `${response.data.nombresC} ${response.data.apellidosC}`;
      this.recepcion.nDia = response.data.plazoPactado;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async namesuppliersCod(cod: string) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getNombreProvedorCodRecepcion(cod);
      this.recepcion.transportador = `${response.data.nombresC} ${response.data.apellidosC}`;
      this.recepcion.nDia = response.data.plazoPactado;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async modify() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postRecepcionModify({
        anulada: this.recepcion.anulada,
        loteNo: this.recepcion.loteNo,
        procesado: this.recepcion.procesado,
      });

      if (response.data === null) {
        this.showOutput(
          true,
          `No se Encuentran los Pesos (Canal Caliente y Pieles) del Lote: ${this.recepcion.loteNo} en el Sistema`,
        );
      }

      if (response.data !== null) {
        this.viewModalmodify();
        if (this.aceptChange) {
          this.recepcion.pesoCanalC = response.data.pesoCanal;
          this.recepcion.pesoPieles = response.data.pesopiel;
        }
      }

      this.readonly = false;
      this.readonlyDatosPeso = false;
      this.readonlyVlrPrint = false;
      if (this.recepcion.confirma) {
        this.readonlyVlrPrint = true;
        return;
      }
      this.readonlyDatosPeso = false;
      this.aceptChange = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordenbuy() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postRecepcionOrdenCompra({
        cOrdenCp: this.recepcion.cOrdenCp,
        docum: this.recepcion.docum,
        fechaPes: this.recepcion.fechaPes,
        lIca: this.recepcion.lIca,
        liqPesoFinca: this.recepcion.liqPesoFinca,
        loteNo: this.recepcion.loteNo,
        nDia: this.recepcion.nDia,
        nGuia: this.recepcion.nGuia,
        nitProveedor: this.recepcion.nitProveedor,
        reteFu: this.recepcion.reteFu,
        transportador: this.recepcion.transportador,
      });
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
        this.modalOrdenCp = false;
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async onPrint() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postImprimirRecepcion({
        clase: this.recepcion.clase,
        fechaPes: this.recepcion.fechaPes,
        nitProveedor: this.recepcion.nitProveedor,
        pesoCanalC: this.recepcion.pesoCanalC,
        pesoPromedio: this.recepcion.pesoPromedio,
        sexo: this.recepcion.sexo,
        totalKilosP: this.recepcion.totalKilosP,
      });

      await this.validateData(response.data);

      await this.infrecGanadoByIdPdf(this.recepcion.idConcecutiv);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async update() {
    if (this.validate()) {
      return;
    }

    this.recepcion.horaPesaje = moment(
      `${this.recepcion.fechaPes} ${this.recepcion.horaPesaje}`,
    )
      .utc()
      .format('YYYY-MM-DD hh:mm:ss');
    this.recepcion.vlrKilo = Number.parseFloat(this.vlrKilo);
    this.recepcion.nDia = Number.parseFloat(this.nDia);
    this.recepcion.pesoCanalC = Number.parseFloat(this.pesoCanalC);
    this.recepcion.pesoPieles = Number.parseFloat(this.pesoPieles);
    this.recepcion.totalKilosP = Number.parseFloat(this.totalKilosP);
    this.recepcion.pesoPromedio = Number.parseFloat(this.pesoPromedio);
    this.recepcion.pesoProgram = Number.parseFloat(this.pesoProgram);
    this.recepcion.vlrFlete = Number.parseFloat(this.vlrFlete);
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putRecepcion(
        this.recepcion.loteNo,
        this.recepcion,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
      await this.reception(this.recepcion.loteNo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private validate() {
    if (!this.recepcion.loteNo || this.recepcion.loteNo === null) {
      this.showOutput(true, 'no exite lote que acualizar escoja uno');
      return true;
    }
    return false;
  }

  private async reOnPrint() {
    await this.infrecGanadoByLotePdf(this.recepcion.loteNo);
  }

  private async validateData(data: any) {
    if (data !== null) {
      this.recepcion.vlrKiloSug = data.vlrKiloSug;
      await this.update();
      return;
    }
    this.recepcion.vlrKiloSug = 0;
  }

  private async terceros(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<Proveedores>;
    if (q.query) {
      response = await this.guiaSacrificioApi.getTerceroRecepcionFind(q);
      return response.data.map<IInterfaceSelect>((e) => ({
        id: e.codProveedor,
        item: e.codProveedor,
      }));
    }
    response = await this.guiaSacrificioApi.getTerceroRecepcion(p);
    return response.data.map<IInterfaceSelect>((e) => ({
      id: e.codProveedor,
      item: e.codProveedor,
    }));
  }

  private async suppliers(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<Proveedores>;
    if (q.query) {
      response = await this.guiaSacrificioApi.getProvedorRecepcionFind(q);
      return response.data.map<IInterfaceSelect>((e) => ({
        id: e.codProveedor,
        item: e.nitoCC,
      }));
    }
    response = await this.guiaSacrificioApi.getProvedorRecepcion(p);
    return response.data.map<IInterfaceSelect>((e) => ({
      id: e.codProveedor,
      item: e.nitoCC,
    }));
  }

  private async namesuppliers(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<Proveedores>;
    if (q.query) {
      response =
        await this.guiaSacrificioApi.getNombreProvedoreRecepcionFind(q);
      return response.data.map<IInterfaceSelect>((e) => ({
        id: e.codProveedor,
        item: e.expr2,
      }));
    }
    response = await this.guiaSacrificioApi.getNombreProvedoreRecepcion(p);
    return response.data.map<IInterfaceSelect>((e) => ({
      id: e.codProveedor,
      item: e.expr2,
    }));
  }

  private async cities(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<Ciudades>;
    if (q.query) {
      response = await this.guiaSacrificioApi.getProcedenciaRecepcion(p);
      this.city = response.data;
      return response.data.map<IInterfaceSelect>((e) => ({
        id: e.idCiudad,
        item: e.descripcionCiu,
      }));
    }
    response = await this.guiaSacrificioApi.getProcedenciaRecepcion(p);
    this.city = response.data;
    return response.data.map<IInterfaceSelect>((e) => ({
      id: e.idCiudad,
      item: e.descripcionCiu,
    }));
  }

  private async infrecGanadoByIdPdf(id: number) {
    try {
      this.isLoading = true;
      const pdf2 =
        await this.guiaSacrificioReports.getinfrecGanadoByIdConsecutuvPDF(id);
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async infrecGanadoByLotePdf(lote: number) {
    try {
      this.isLoading = true;
      const pdf2 =
        await this.guiaSacrificioReports.getinfrecGanadoByLotePDF(lote);
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }
}
</script>
