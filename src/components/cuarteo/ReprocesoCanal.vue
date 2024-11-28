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
        <div class="px-3 md:w-2/3 mt-2 mb-3 md:mb-0">
          <h1 class="title">Cuarteo de Canales</h1>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="addRegister">
            Adicionar Registro
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="save">Guardar</button>
          <button class="btn-delete" @click="modalReprocesoCanal">
            Eliminar
          </button>
        </div>
      </div>

      <input type="radio" name="tab" id="datos" class="hidden" checked />
      <input type="radio" name="tab" id="detalles" class="hidden" />
      <input type="radio" name="tab" id="relacion-canal" class="hidden" />

      <div class="mt-2 mb-0 nav">
        <label for="datos">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos
          </span>
        </label>

        <label for="detalles">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Detalles
          </span>
        </label>
        <label for="relacion-canal">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Relacion Canal
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-cuarteo">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Cuarteo No:</label>
            <input
              type="number"
              class="input"
              v-model="IreprocesoCanal.reprocesoNo"
              disabled
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha:</label>
            <input
              type="date"
              class="input"
              v-model="IreprocesoCanal.fechaMov"
              :disabled="readonly"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <button class="btn-save" @click="addDt1">
              Adicionar a la tabla
            </button>
          </div>
        </div>
        <div class="card-table">
          <table class="table-fixed w-full text-xs">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th class="md:w-1/5">Etiqueta</th>
                <th class="md:w-2/12">Codigo</th>
                <th class="md:w-2/12">Descripción</th>
                <th>Kilos</th>
                <th>Guia No</th>
                <th>N-Anim</th>
                <th>Lado</th>
                <th>Kilos CC</th>
                <th>Diferencia</th>
                <th>Anular</th>
                <th>Motivo</th>
                <th style="visibility: collapse; display: none">ID</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b border-gray-500"
                v-for="(item, index) in tblReprocesoCanalDt1"
                :key="index"
                @click="selectReprocesoCanalDt1(item)"
              >
                <template
                  v-if="item.autoNum === IreprocesoCanalDt1Edit.autoNum"
                >
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt1Edit.etiqueta"
                      @change="checktoEiqueta(IreprocesoCanalDt1Edit.etiqueta)"
                    />
                  </td>
                  <td>
                    <select
                      class="select appearance-none"
                      v-model="IreprocesoCanalDt1Edit.idCodigo"
                    >
                      <option
                        v-for="(item, index) in idCodeDt1"
                        :value="item.id"
                        :key="index"
                      >
                        {{ item.item }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <select
                      class="select appearance-none"
                      v-model="IreprocesoCanalDt1Edit.idCodigo"
                    >
                      <option
                        v-for="(item, index) in descriptionDt1"
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
                      v-model="IreprocesoCanalDt1Edit.cantidad"
                      @change="updateDt1"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt1Edit.guiaNo"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt1Edit.nAnima"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt1Edit.ladoAni"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt1Edit.cantidad2"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt1Edit.difer"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      class="checkBox"
                      v-model="IreprocesoCanalDt1Edit.anular"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt1Edit.motivoAnula"
                    />
                  </td>
                  <td style="visibility: collapse; display: none">
                    {{ IreprocesoCanalDt1Edit.idEti }}
                  </td>
                </template>
                <template v-else>
                  <td class="text-center">
                    {{ item.etiqueta }}
                  </td>
                  <td>
                    <select
                      class="appearance-none"
                      v-model="item.idCodigo"
                      disabled
                    >
                      <option
                        v-for="(item, index) in idCodeDt1"
                        :value="item.id"
                        :key="index"
                      >
                        {{ item.item }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <select
                      class="appearance-none"
                      v-model="item.idCodigo"
                      disabled
                    >
                      <option
                        v-for="(item, index) in descriptionDt1"
                        :value="item.id"
                        :key="index"
                      >
                        {{ item.item }}
                      </option>
                    </select>
                  </td>
                  <td class="text-center">
                    {{ item.cantidad }}
                  </td>
                  <td class="text-center">
                    {{ item.guiaNo }}
                  </td>
                  <td class="text-center">
                    {{ item.nAnima }}
                  </td>
                  <td class="text-center">
                    {{ item.ladoAni }}
                  </td>
                  <td>
                    {{ item.cantidad2 }}
                  </td>
                  <td>
                    {{ item.difer }}
                  </td>
                  <td>
                    {{ booleanToString(item.anular) }}
                  </td>
                  <td>
                    {{ item.motivoAnula }}
                  </td>
                  <td style="visibility: collapse; display: none">
                    {{ item.idEti }}
                  </td>
                </template>
              </tr>
              <tr class="border-b border-gray-500">
                <td class="text-center">
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt1.etiqueta"
                    @change="checktoEiqueta(IreprocesoCanalDt1.etiqueta)"
                    :disabled="readonly"
                  />
                </td>
                <td>
                  <select
                    class="select appearance-none"
                    v-model="IreprocesoCanalDt1.idCodigo"
                    :disabled="readonly"
                  >
                    <option
                      v-for="(item, index) in idCodeDt1"
                      :value="item.id"
                      :key="index"
                    >
                      {{ item.item }}
                    </option>
                  </select>
                </td>
                <td>
                  <select
                    class="select appearance-none"
                    v-model="IreprocesoCanalDt1.idCodigo"
                    :disabled="readonly"
                  >
                    <option
                      v-for="(item, index) in descriptionDt1"
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
                    v-model="IreprocesoCanalDt1.cantidad"
                    :disabled="readonly"
                  />
                </td>
                <td class="text-center">
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt1.guiaNo"
                    :disabled="readonly"
                  />
                </td>
                <td class="text-center">
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt1.nAnima"
                    :disabled="readonly"
                  />
                </td>
                <td class="text-center">
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt1.ladoAni"
                    :disabled="readonly"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt1.cantidad2"
                    :disabled="readonly"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt1.difer"
                    :disabled="readonly"
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    class="checkBox"
                    v-model="IreprocesoCanalDt1.anular"
                    :disabled="readonly"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt1.motivoAnula"
                    :disabled="readonly"
                  />
                </td>
                <td style="visibility: collapse; display: none">
                  {{ IreprocesoCanalDt1.idEti }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-wrap flex-row">
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Realizo:</label>
            <input
              type="text"
              class="input"
              v-model="IreprocesoCanal.realizo"
              :disabled="readonly"
            />
          </div>

          <div class="md:w-1/12 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/12 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/12 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/12 px-3 mb-6 md:mb-0"></div>

          <div class="md:w-1/5 px-3 mb-6 md:mb-0">
            <input type="text" class="input" disabled />
          </div>

          <div class="md:w-1/5 px-3 mb-6 md:mb-0">
            <input type="text" class="input" disabled />
          </div>

          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Observacion:</label>
            <input
              type="text"
              class="input"
              v-model="IreprocesoCanal.observacionR"
              :disabled="readonly"
            />
          </div>

          <div class="md:w-1/4 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/5 px-3 mb-6 md:mb-0"></div>

          <div class="md:w-1/5 px-3 mb-6 md:mb-0">
            <button class="btn-save" @click="print">Imprimir documento</button>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-detalles-cuarteo">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <button class="btn-save" @click="addReprocesoCanalDt3">
            Adicionar a la tabla
          </button>
        </div>
        <div class="card-table">
          <table class="table-fixed w-full text-xs">
            <thead>
              <tr
                class="border-b border-gray-500 text-white bg-andrea font-bold"
              >
                <th>Cod-Canal</th>
                <th>Cod-Cuarteo</th>
                <th class="md:w-3/12">Descripción</th>
                <th>Kilos Canal</th>
                <th>kilos Cuarteo</th>
                <th>Estado</th>
                <th>Guia No</th>
                <th>N-Anim</th>
                <th>L-Anim</th>
                <th style="visibility: collapse; display: none">Diferencia</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b border-gray-500"
                v-for="(item, index) in tblReprocesoCanalDt3"
                :key="index"
                @click="selectReprocesoCanalDt3(item)"
              >
                <template
                  v-if="item.autoNum === IreprocesoCanalDt3Edit.autoNum"
                >
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt3Edit.princip"
                      @change="updateReprocesoCanalDt3"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt3Edit.secund"
                      @change="updateReprocesoCanalDt3"
                    />
                  </td>
                  <td>
                    <PaginatedSelect
                      v-model="IreprocesoCanalDt3Edit.secund"
                      :fetch="productosSecund"
                      @change="updateReprocesoCanalDt3"
                    ></PaginatedSelect>
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt3Edit.kPrinci"
                      @change="updateReprocesoCanalDt3"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt3Edit.kSecund"
                      @change="updateReprocesoCanalDt3"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt3Edit.estad"
                      @change="updateReprocesoCanalDt3"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt3Edit.guiaNo"
                      @change="updateReprocesoCanalDt3"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt3Edit.nAnima"
                      @change="updateReprocesoCanalDt3"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      type="text"
                      class="input"
                      v-model="IreprocesoCanalDt3Edit.ladoAni"
                      @change="updateReprocesoCanalDt3"
                    />
                  </td>
                </template>
                <template v-else>
                  <td class="text-center">{{ item.princip }}</td>
                  <td class="text-center">{{ item.secund }}</td>
                  <td class="text-center">{{ item.secund }}</td>
                  <td class="text-center">{{ item.kPrinci }}</td>
                  <td class="text-center">{{ item.kSecund }}</td>
                  <td class="text-center">{{ item.estad }}</td>
                  <td class="text-center">{{ item.guiaNo }}</td>
                  <td class="text-center">{{ item.nAnima }}</td>
                  <td class="text-center">{{ item.ladoAni }}</td>
                </template>
              </tr>
              <tr class="border-b border-gray-500">
                <td class="text-center">
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt3.princip"
                    :disabled="readonly"
                  />
                </td>
                <td class="text-center">
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt3.secund"
                    :disabled="readonly"
                  />
                </td>
                <td>
                  <PaginatedSelect
                    v-model="IreprocesoCanalDt3.secund"
                    :fetch="productosSecund"
                    :disabled="readonly"
                  ></PaginatedSelect>
                </td>
                <td class="text-center">
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt3.kPrinci"
                    :disabled="readonly"
                  />
                </td>
                <td class="text-center">
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt3.kSecund"
                    :disabled="readonly"
                  />
                </td>
                <td class="text-center">
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt3.estad"
                    :disabled="readonly"
                  />
                </td>
                <td class="text-center">
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt3.guiaNo"
                    :disabled="readonly"
                  />
                </td>
                <td class="text-center">
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt3.nAnima"
                    :disabled="readonly"
                  />
                </td>
                <td class="text-center">
                  <input
                    type="text"
                    class="input"
                    v-model="IreprocesoCanalDt3.ladoAni"
                    :disabled="readonly"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-relacion-canal-cuarteo">
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-row flex-wrap justify-start">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Es Propio:</label>
              <input class="checkBox" type="checkbox" v-model="esPropio" />
            </div>
            <div class="md:w-2/3 px-3 mb-6 md:mb-0">
              <label class="label">Tercero:</label>
              <PaginatedSelect
                v-model="IreprocesoCanal.nitoCC"
                :fetch="nitoCC"
              ></PaginatedSelect>
            </div>
            <div class="md:w-2/3 px-3 mb-6 md:mb-0">
              <label class="label">PH:</label>
              <input type="text" class="input" v-model="IreprocesoCanal.ph" />
            </div>
            <div class="md:w-2/3 px-3 mb-6 md:mb-0">
              <label class="label">Temperatura:</label>
              <input
                type="text"
                class="input"
                v-model="IreprocesoCanal.tempera"
              />
            </div>
            <div class="md:w-2/3 px-3 mb-6 md:mb-0">
              <label class="label">Tipo:</label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="IreprocesoCanal.tipoR"
                @change="tipoRBeforeUpdata"
              >
                <option
                  v-for="(item, index) in typeReProceso"
                  :value="item.id"
                  :key="index"
                >
                  {{ item.id }}
                </option>
              </select>
            </div>
            <div class="md:w-2/3 px-3 mb-6 md:mb-0">
              <label class="label">Cuarto Frio al que Entra:</label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="IreprocesoCanal.cuartoS"
                :disabled="readonlyCuartoS"
              >
                <option
                  v-for="(item, index) in cuartoS"
                  :value="item.id"
                  :key="index"
                >
                  {{ item.item }}
                </option>
              </select>
            </div>
          </div>
          <div class="md:w-full md:ml-0 px-3 mb-6 md:mb-0">
            <button class="btn-save p-2" @click="modalGeneratRelacion">
              Generar Relacion
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
        <div>
          <label class="label text-center text-2xl -ml-2">BASCULA</label>
          <input
            type="number"
            class="input py-0 -mt-2 border-transparent text-red-700 text-2xl text-center"
            @change="onBasculaChanged()"
            placeholder=",00"
            v-model="pesoBascula"
            disabled
            canEditPeso="canEditPeso"
          />
        </div>
      </div>
    </div>
    <!-- Modal Anualar -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="generarRelacion"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8; Esta Seguro de Generar esta Informacion? Al finalizar
              se cerrara esta pantalla</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button
                    class="btn-succes"
                    @click="acceptModalGenerarRelacion()"
                  >
                    Si
                  </button>
                </div>
                <div
                  class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button
                    class="btn-danger"
                    @click="closeModalGenerarRelacion()"
                  >
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
    <!-- Modal Eliminar reprocesoCanal  -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="reprocesoCanal"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8; Esta Seguro desea Eliminar reproceso Canal?</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button
                    class="btn-succes"
                    @click="acceptModalReprocesoCanal()"
                  >
                    Si
                  </button>
                </div>
                <div
                  class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button
                    class="btn-danger"
                    @click="closeModalReprocesoCanal()"
                  >
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
      :pdfData="rptReprocesoPdfBase64"
      @close="rptReprocesoPdfBase64 = ''"
      v-if="rptReprocesoPdfBase64.length > 0"
    />
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import '../../assets/tab.css';
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
import {
  INitCCCuateo,
  IProductosSecund,
  IReprocesoCanal,
  IReprocesoCanalDt1,
  IReprocesoCanalDt3,
  NitCCCuateo,
  ProductosSecund,
  reprocesoCanalDt1,
  reprocesoCanalDt3,
} from '@/remote/api/cuarteo/types';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import * as Sentry from '@sentry/browser';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import moment from 'moment';
import ReportesCuarteosApi from '@/remote/api/cuarteo/reportesCuarteos';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

const { ipcRenderer } = window;
@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
  },
  name: 'ReprocesoCanal',
})
export default class ReprocesoCanal extends Vue {
  @Ref('connectPort') private readonly btnConnectPort!: HTMLButtonElement;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private readonly: boolean = true;
  private readonlyCuartoS: boolean = false;
  private generarRelacion: boolean = false;
  private reprocesoCanal: boolean = false;
  private rptReprocesoPdfBase64: string = '';

  private ports: any[] = [];
  private portPath: string = '';
  private isPortConnected: boolean = false;
  private pesoBascula: number = 0.0;
  private peso: number = 0;

  private esPropio: boolean = false;
  private reproConsec: number = 0;
  private reproKil1: number = 0;
  private reproKil2: number = 0;
  private etiquetaN2: string = '';

  private idCodeDt1: IInterfaceSelect[] = [];
  private descriptionDt1: IInterfaceSelect[] = [];
  private cuartoS: IInterfaceSelect[] = [];
  private typeReProceso: IInterfaceSelect[] = [];
  private tblReprocesoCanalDt1: reprocesoCanalDt1 = [];
  private tblReprocesoCanalDt3: reprocesoCanalDt3 = [];

  private pesKilo: string = '';
  private IreprocesoCanal: IReprocesoCanal = {
    anulada: false,
    cuartoS: 0,
    fechaMov: '',
    fechaR: '',
    generado: false,
    imprim: 'N',
    motivProce: '',
    motivoAnul: '',
    nitoCC: '',
    observacionR: '',
    ph: '',
    procesado: false,
    realizo: '',
    reprocesoNo: 0,
    tempera: 0,
    tipoR: 0,
    usuario: '',
  };
  private IreprocesoCanalDt1: IReprocesoCanalDt1 = {
    anular: false,
    autoNum: 0,
    cantidad: 0,
    cantidad2: 0,
    difer: 0,
    etiqueta: '',
    fechaG: '',
    guiaNo: 0,
    idCodigo: '',
    idEti: 0,
    ladoAni: '',
    motivoAnula: '',
    nAnima: 0,
    reprocesoNo: 0,
  };
  private IreprocesoCanalDt1Edit: IReprocesoCanalDt1 = {
    anular: false,
    autoNum: 0,
    cantidad: 0,
    cantidad2: 0,
    difer: 0,
    etiqueta: '',
    fechaG: '',
    guiaNo: 0,
    idCodigo: '',
    idEti: 0,
    ladoAni: '',
    motivoAnula: '',
    nAnima: 0,
    reprocesoNo: 0,
  };
  private IreprocesoCanalDt3: IReprocesoCanalDt3 = {
    autoNum: 0,
    difer: 0,
    estad: '',
    guiaNo: 0,
    kPrinci: 0,
    kSecund: 0,
    ladoAni: '',
    nAnima: 0,
    princip: '',
    reprocesoNo: 0,
    secund: '',
  };
  private IreprocesoCanalDt3Edit: IReprocesoCanalDt3 = {
    autoNum: 0,
    difer: 0,
    estad: '',
    guiaNo: 0,
    kPrinci: 0,
    kSecund: 0,
    ladoAni: '',
    nAnima: 0,
    princip: '',
    reprocesoNo: 0,
    secund: '',
  };

  private cuarteoApi = new CuarteoApi(this.$store.getters.getAuthToken);
  private cuarteoReportsApi = new ReportesCuarteosApi(
    this.$store.getters.getAuthToken,
  );

  public async discoverPorts() {
    this.ports = await this.$serial.getCOMPorts();
  }

  public get connectedDisconnected() {
    return this.isPortConnected ? 'Conectado' : 'Desconectado';
  }

  public disconnectPort() {
    this.$serial.disconnectPort();
    this.isPortConnected = false;
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private clearOutput() {
    this.output = '';
  }

  private convertToDecimal(dato: number) {
    return Number(Math.round((dato + Number.EPSILON) * 100) / 100).toFixed(2);
  }

  private convertDate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private booleanToString(data: boolean) {
    return !data ? 'NO' : 'SI';
  }

  private async mounted() {
    this.keyDown();
    this.typeReprocesoCanal();
    await this.cuarteoS();
    await this.idCodigoReprocesoCanalDt1();

    this.ports = await this.$serial.getCOMPorts();
    this._serialPortListener();
    // Tries to connect to port if exist on the local storage
    const portFromLocalDB = await this.$local.getCurrentBasculaConnectionPort();
    if (portFromLocalDB !== undefined && portFromLocalDB !== '') {
      this.portPath = portFromLocalDB;
      this.btnConnectPort.click();
    }
  }

  private keyDown() {
    window.addEventListener('keydown', (e) => {
      const eventos: string = `F2 = SIGUIENTE REGISTRO  F3 = GUARDAR  F8 = IMPRIMIR ETIQUETA`;
      switch (e.key) {
        case 'F1':
          this.showOutput(false, eventos);
          break;
        case 'F5':
          this.onBasculaChanged();
          // No forgot catidas is peKilo
          break;
      }
    });
  }

  private closeModalGenerarRelacion() {
    this.generarRelacion = false;
  }

  private closeModalReprocesoCanal() {
    this.reprocesoCanal = false;
  }

  private modalGeneratRelacion() {
    this.generarRelacion = true;
  }

  private modalReprocesoCanal() {
    this.reprocesoCanal = true;
  }

  private selectReprocesoCanalDt1(item: IReprocesoCanalDt1) {
    this.IreprocesoCanalDt1Edit = item;
    this.IreprocesoCanalDt1Edit.idCodigo = item.idCodigo.toUpperCase();
  }

  private selectReprocesoCanalDt3(item: IReprocesoCanalDt3) {
    this.IreprocesoCanalDt3Edit = item;
  }

  private typeReprocesoCanal() {
    this.typeReProceso.push(
      { id: 1, item: 'DELANTEROS' },
      { id: 2, item: 'TRASEROS' },
      { id: 3, item: 'AMBOS' },
    );
  }

  private tipoRBeforeUpdata() {
    if (this.IreprocesoCanal.tipoR === 1 || this.IreprocesoCanal.tipoR === 2) {
      this.readonlyCuartoS = true;
      return;
    }
    this.readonlyCuartoS = false;
  }

  private async print() {
    if (!this.IreprocesoCanal.fechaMov) {
      this.showOutput(true, 'Debe Digitar la Fecha');
      return;
    }

    this.IreprocesoCanal.imprim = 'S';
    await this.updateReprocesoCanal();
    await this.onPrint();
  }

  private async acceptModalGenerarRelacion() {
    await this.generaRelacion();
    this.closeModalGenerarRelacion();
  }

  private async acceptModalReprocesoCanal() {
    await this.deleteReprocesoCanal();
    this.reprocesoCanal = false;
  }

  private async generaRelacion() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.putGenerarRelacion(
        this.IreprocesoCanal.reprocesoNo,
        { ...this.IreprocesoCanal, esPropio: this.esPropio },
      );

      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async save() {
    if (this.validateData()) {
      return;
    }
    this.IreprocesoCanal.fechaR = moment().utc().format('YYYY-MM-DD');
    await this.createReprocesoCanal();
    await this.reprocesoCanalDt1(this.IreprocesoCanal.reprocesoNo);
  }

  private async updateReprocesoCanal() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.putReprocesoCanal(
        this.IreprocesoCanal.reprocesoNo,
        this.IreprocesoCanal,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async createReprocesoCanal() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.postReprocesoCanal(
        this.IreprocesoCanal,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async deleteReprocesoCanal() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.deleteReprocesoCanal(
        this.IreprocesoCanal.reprocesoNo,
      );
      this.clearData();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async addRegister() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.getAddCuarteo();

      this.IreprocesoCanal.reprocesoNo = response.data;
      this.reproConsec = this.IreprocesoCanal.reprocesoNo;
      this.reproKil1 = 0;
      this.reproKil2 = 0;

      this.readonly = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async cuarteoS() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.getCuartoS();

      this.cuartoS = response.data.map((e: any) => {
        return {
          id: e.idCuartoF,
          item: e.descripcionCf,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, e.message);
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  private async nitoCC(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<NitCCCuateo>;
    if (q.query) {
      response = await this.cuarteoApi.getNitoCCFind(q);
      return response.data.map<IInterfaceSelect>((e: INitCCCuateo) => ({
        id: e.nitCliente,
        item: e.expr2,
      }));
    }
    response = await this.cuarteoApi.getNitoCC(p);
    return response.data.map<IInterfaceSelect>((e: INitCCCuateo) => ({
      id: e.nitCliente,
      item: e.expr2,
    }));
  }

  private validateData() {
    if (
      this.IreprocesoCanal.fechaMov <
        this.convertDate(this.$store.getters.getTConfinv1.fecha1) ||
      this.IreprocesoCanal.fechaMov >
        this.convertDate(this.$store.getters.getTConfinv1.fecha2)
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }

    if (!this.IreprocesoCanal.fechaMov) {
      this.showOutput(true, 'Digite la Fecha');
      return true;
    }

    return false;
  }

  // this implement functgion for table 1

  private async addDt1() {
    await this.addBeforeReprocesoCanalDt1();
  }

  private async updateDt1() {
    await this.updateBeforeReprocesoCanalDt1();
  }

  private async addBeforeReprocesoCanalDt1() {
    this.IreprocesoCanalDt1.reprocesoNo = this.IreprocesoCanal.reprocesoNo;
    if (!this.IreprocesoCanalDt1.reprocesoNo) {
      this.showOutput(true, 'El reprocesoNo no puede sere vacio ');
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.putBeforeUpdateReprocesoCanalDt1({
        ...this.IreprocesoCanalDt1,
        cuartoFrio: this.IreprocesoCanal.cuartoS,
        etiquetaN2: this.etiquetaN2,
      });
      await this.addReprocesoCanalDt1();
      this.etiquetaN2 = this.IreprocesoCanalDt1.etiqueta;
      this.IreprocesoCanalDt1 = {
        anular: false,
        autoNum: 0,
        cantidad: 0,
        cantidad2: 0,
        difer: 0,
        etiqueta: '',
        fechaG: '',
        guiaNo: 0,
        idCodigo: '',
        idEti: 0,
        ladoAni: '',
        motivoAnula: '',
        nAnima: 0,
        reprocesoNo: 0,
      };
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      this.IreprocesoCanalDt1 = {
        anular: false,
        autoNum: 0,
        cantidad: 0,
        cantidad2: 0,
        difer: 0,
        etiqueta: this.IreprocesoCanalDt1.etiqueta,
        fechaG: '',
        guiaNo: 0,
        idCodigo: '',
        idEti: 0,
        ladoAni: '',
        motivoAnula: '',
        nAnima: 0,
        reprocesoNo: 0,
      };
    } finally {
      this.isLoading = false;
    }
  }
  private async updateBeforeReprocesoCanalDt1() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.putBeforeUpdateReprocesoCanalDt1({
        ...this.IreprocesoCanalDt1Edit,
        cuartoFrio: this.IreprocesoCanal.cuartoS,
        etiquetaN2: this.etiquetaN2,
      });
      await this.updateReprocesoCanalDt1();
      this.etiquetaN2 = this.IreprocesoCanalDt1.etiqueta;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async updateReprocesoCanalDt1() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.putReprocesoCanalDt1(
        this.IreprocesoCanalDt1Edit,
        this.IreprocesoCanalDt1Edit.reprocesoNo,
        this.IreprocesoCanalDt1Edit.autoNum,
      );

      await this.reprocesoCanalDt1(this.IreprocesoCanal.reprocesoNo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async addReprocesoCanalDt1() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.postReprocesoCanalDt1(
        this.IreprocesoCanalDt1,
      );

      await this.reprocesoCanalDt1(this.IreprocesoCanal.reprocesoNo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      this.IreprocesoCanalDt1 = {
        anular: false,
        autoNum: 0,
        cantidad: 0,
        cantidad2: 0,
        difer: 0,
        etiqueta: this.IreprocesoCanalDt1.etiqueta,
        fechaG: '',
        guiaNo: 0,
        idCodigo: '',
        idEti: 0,
        ladoAni: '',
        motivoAnula: '',
        nAnima: 0,
        reprocesoNo: 0,
      };
    } finally {
      this.isLoading = false;
    }
  }

  private async reprocesoCanalDt1(reprocesoNo: number) {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.getReprocesoCanalDt1(reprocesoNo);
      this.tblReprocesoCanalDt1 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async checktoEiqueta(etiqueta: string) {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.getEtiquetaCheck(etiqueta);
      if (response.data !== true) {
        this.showOutput(true, 'No existe esta guia');
        return;
      }

      let splitted = etiqueta.split(/\.|ñ|Ñ|,/g);

      this.IreprocesoCanalDt1.guiaNo = Number(splitted[0]);
      this.IreprocesoCanalDt1.nAnima = Number(splitted[1]);
      this.IreprocesoCanalDt1.ladoAni = splitted[2];
      this.IreprocesoCanalDt1.cantidad2 = Number.parseFloat(
        `${splitted[3]},${splitted[4]}`,
      );
      this.IreprocesoCanalDt1.idCodigo = splitted[5].toUpperCase();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(
        true,
        'La etiqueta no coincide favor verificar e intentar de nuevo',
      );
    } finally {
      this.isLoading = false;
    }
  }

  private async idCodigoReprocesoCanalDt1() {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.getIdCodigoDt1();

      this.idCodeDt1 = response.data.map((e: any) => {
        return {
          id: e.idCodigo,
          item: e.idCodigo,
        };
      });
      this.descriptionDt1 = response.data.map((e: any) => {
        return {
          id: e.idCodigo,
          item: e.descripcionMer,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, e.message);
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  // implement function reprocesoCanalDt3
  private async updateReprocesoCanalDt3() {
    if (!this.IreprocesoCanal.reprocesoNo) {
      this.showOutput(true, 'El No del proceso no pude ser cero');
      return;
    }
    this.IreprocesoCanalDt3Edit.kPrinci = Number.parseFloat(
      this.IreprocesoCanalDt3Edit.kPrinci.toString(),
    );
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.putReprocesoCanalDt3(
        this.IreprocesoCanalDt3Edit,
        this.IreprocesoCanalDt3Edit.reprocesoNo,
        this.IreprocesoCanalDt3Edit.autoNum,
      );
      await this.reprocesoCanalDt3(this.IreprocesoCanal.reprocesoNo);
      this.IreprocesoCanalDt3Edit.autoNum = 0;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, e.message);
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  private async addReprocesoCanalDt3() {
    if (!this.IreprocesoCanal.reprocesoNo) {
      this.showOutput(true, 'El No del proceso no pude ser cero');
      return;
    }
    this.IreprocesoCanalDt3.reprocesoNo = this.IreprocesoCanal.reprocesoNo;
    this.IreprocesoCanalDt3.kPrinci = Number.parseFloat(
      this.IreprocesoCanalDt3.kPrinci.toString(),
    );
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.postReprocesoCanalDt3(
        this.IreprocesoCanalDt3,
      );
      await this.reprocesoCanalDt3(this.IreprocesoCanal.reprocesoNo);
      this.IreprocesoCanalDt3 = {
        autoNum: 0,
        difer: 0,
        estad: '',
        guiaNo: 0,
        kPrinci: 0,
        kSecund: 0,
        ladoAni: '',
        nAnima: 0,
        princip: '',
        reprocesoNo: 0,
        secund: '',
      };
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  private async reprocesoCanalDt3(reprocesoNo: number) {
    this.isLoading = true;
    try {
      const response = await this.cuarteoApi.getReprocesoCanalDt3(reprocesoNo);
      this.tblReprocesoCanalDt3 = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, e.message);
      this.isLoading = false;
    } finally {
      this.isLoading = false;
    }
  }

  private async productosSecund(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<ProductosSecund>;
    if (q.query) {
      response = await this.cuarteoApi.getProductosSecondFind(q);
      return response.data.map<IInterfaceSelect>((e: IProductosSecund) => ({
        id: e.idCodigo,
        item: e.descripcionMer,
      }));
    }
    response = await this.cuarteoApi.getProductosSecond(p);
    return response.data.map<IInterfaceSelect>((e: IProductosSecund) => ({
      id: e.idCodigo,
      item: e.descripcionMer,
    }));
  }

  private async onPrint() {
    this.isLoading = true;
    try {
      const rptReproceso = await this.cuarteoReportsApi.rptReprocesopdf(
        this.IreprocesoCanal.reprocesoNo,
      );
      this.rptReprocesoPdfBase64 = rptReproceso.data;
    } catch (err) {
      Sentry.captureException(err);
      this.showOutput(true, err.message);
    } finally {
      this.isLoading = false;
    }
  }

  // Implemet Functions for weighing
  private connectToPort() {
    if (this.portPath === '') {
      this.showOutput(false, 'Debe seleccionar un puerto al cual conectarse.');
      return;
    }
    this.$serial.connectToPort(this.portPath);
  }

  private onBasculaChanged() {
    this.pesKilo = this.convertToDecimal(this.pesoBascula);
  }

  private pesoKilosB(peso: number) {
    this.pesoBascula = peso;
    this.pesKilo = this.convertToDecimal(peso);
    // --- if you will have use some method before of something ---> this.pesEntraSaliAfterUpdate();
  }

  // Listens to serialcom data stream
  private _serialPortListener() {
    ipcRenderer.on('port_connected', async () => {
      const isPortOpen = await this.$serial.isPortOpen();
      if (!isPortOpen) {
        this.showOutput(
          true,
          'No se ha podido establecer comunicación con el puerto seleccionado.',
        );
        this.isPortConnected = false;
        return;
      }

      this.isPortConnected = true;
      this.$local.saveCurrentBasculaConnectionPort(this.portPath);
    });

    ipcRenderer.on('serial_data_utf8', (event, data: string) => {
      this.peso = data as unknown as number;
      this.pesoKilosB(this.peso);
    });
  }

  private clearData() {
    this.esPropio = false;
    this.IreprocesoCanal = {
      anulada: false,
      cuartoS: 0,
      fechaMov: '',
      fechaR: '',
      generado: false,
      imprim: 'N',
      motivProce: '',
      motivoAnul: '',
      nitoCC: '',
      observacionR: '',
      ph: '',
      procesado: false,
      realizo: '',
      reprocesoNo: 0,
      tempera: 0,
      tipoR: 0,
      usuario: '',
    };
  }
}
</script>
