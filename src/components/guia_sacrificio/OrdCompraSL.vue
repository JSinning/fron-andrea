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
          <h1 class="title">Ordenes de compra</h1>
        </div>
      </div>

      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" v-if="false">Buscar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="addReguister">Adicionar</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="anular" v-if="pgAnulada">
            Anular
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="rePrint">Reimprimir</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="save">Guardar</button>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="datos_basicos"
        class="hidden"
        checked
      />

      <input type="radio" name="tab" id="detalles" class="hidden" />
      <input
        type="radio"
        name="tab"
        id="anular"
        class="hidden"
        v-if="pgAnulada"
      />
      <div class="mt-2 mb-0 nav">
        <label for="datos_basicos">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos basicos O. compra
          </span>
        </label>

        <label for="detalles">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Detalles O. compra
          </span>
        </label>

        <label for="anular">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="pgAnulada"
          >
            > Anular
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Tipos de movimiento:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ordCompraSL.tipoMov"
              @change="typeMovAfterupdate(ordCompraSL.tipoMov)"
            >
              <option
                v-for="(item, index) in typeMov"
                :key="index"
                :value="item.id"
              >
                {{ item.item }}
              </option>
            </select>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Orden de compra:</label>
            <input type="text" class="input" v-model="ordCompraSL.consecTip" />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">No. compra usuario</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraSL.documento"
              :disabled="readonly"
            />
          </div>
          <div class="md:w-full px-3 mb-6 md:mb-0"></div>
          <div class="w-full px-3">
            <label class="label">Proveedor:</label>
            <div class="flex gap-4">
              <div class="w-1/2 flex gap-4">
                <PaginatedSelect
                  class="flex-1"
                  :fetch="nitoCC"
                  v-model="ordCompraSL.nitoCc"
                  @change="nitoCCAfterupdate"
                  :disabled="readonly"
                ></PaginatedSelect>
                <PaginatedSelect
                  class="flex-1"
                  :fetch="nitoCCcod"
                  v-model="ordCompraSL.nitoCc"
                  @change="nitoCCAfterupdate"
                  :disabled="readonly"
                ></PaginatedSelect>
              </div>
              <PaginatedSelect
                class="w-1/2"
                :fetch="nitoCCpp"
                v-model="ordCompraSL.nitoCc"
                @change="nitoCCAfterupdate"
                :disabled="readonly"
              ></PaginatedSelect>
            </div>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha de movimiento:</label>
            <input
              type="date"
              class="input"
              v-model="ordCompraSL.fechaMov"
              @change="fechaMovAfterupdate()"
              :disabled="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha de vencimiento:</label>
            <input
              type="date"
              class="input"
              v-model="ordCompraSL.fechaVenci"
              :disabled="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Transportador:</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraSL.transportador"
              :disabled="readonly"
            />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-detalles">
        <div class="flex flex-row flex-wrap">
          <div class="px-1 mb-6 md:mb-0">
            <div class="md:w-full px-0 mb-6 md:mb-0">
              <button
                class="btn-save"
                v-bind:class="{
                  'opacity-50 cursor-not-allowed hover:btn-save':
                    readonlyButton,
                }"
                @click="addOrdCompraSLSubDt"
                :disabled="readonlyButton"
              >
                Adicionar OrdenCompra
              </button>
            </div>
          </div>

          <div class="card-table">
            <table class="table-auto w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th style="visibility: collapse; display: none">
                    Id Consecutivo
                  </th>
                  <th>Codigo</th>
                  <th>Descripcion</th>
                  <th>Descrip. 2</th>
                  <th>Unidad</th>
                  <th>Kilos</th>
                  <th v-if="columVrUnitario">Vlr Unitario</th>
                  <th v-if="columPorcenIva">Iva</th>
                  <th>Subtotal</th>
                  <th v-if="columDescuPF">DPF</th>
                  <th>TIva</th>
                  <th v-if="columTotal">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b border-gray-500"
                  v-for="(item, index) in tblOrdCompraSLSubDt"
                  :key="index"
                  @click="selectOrdCompraSLSubDt(item)"
                >
                  <template
                    v-if="item.autoNum === IordCompraSLSubDtEdit.autoNum"
                  >
                    <td style="visibility: collapse; display: none">
                      {{ IordCompraSLSubDtEdit.idConcecutivo }}
                    </td>
                    <td>
                      <select
                        class="select"
                        v-model="IordCompraSLSubDtEdit.idCodigo"
                        @change="upDateOrdCompraSLSubDt"
                      >
                        <option
                          v-for="(item, index) in idCodigo"
                          :key="index"
                          :value="item.id"
                        >
                          {{ item.item }}
                        </option>
                      </select>
                    </td>
                    <td>
                      <select
                        class="select"
                        v-model="IordCompraSLSubDtEdit.idCodigo"
                        @change="upDateOrdCompraSLSubDt"
                      >
                        <option
                          v-for="(item, index) in idCodigo1"
                          :key="index"
                          :value="item.id"
                        >
                          {{ item.item }}
                        </option>
                      </select>
                    </td>
                    <td>
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.descripcionPro"
                        @change="upDateOrdCompraSLSubDt"
                      />
                    </td>
                    <td>
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.cantidadUn"
                        @change="upDateOrdCompraSLSubDt"
                        ref="refCantidadUn"
                      />
                    </td>
                    <td>
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.cantidad"
                        @change="upDateOrdCompraSLSubDt"
                        ref="refCantidad"
                      />
                    </td>
                    <td v-if="columVrUnitario">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.vrUnitario"
                        @change="upDateOrdCompraSLSubDt"
                      />
                    </td>
                    <td v-if="columPorcenIva">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.porcenIva"
                        @change="upDateOrdCompraSLSubDt"
                      />
                    </td>
                    <td>
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.subtDesc"
                        @change="upDateOrdCompraSLSubDt"
                        disabled
                      />
                    </td>
                    <td v-if="columDescuPF">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.descuPf"
                        @change="upDateOrdCompraSLSubDt"
                      />
                    </td>
                    <td>
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.tIva"
                        @change="upDateOrdCompraSLSubDt"
                        disabled
                      />
                    </td>
                    <td v-if="columTotal">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.total"
                        @change="upDateOrdCompraSLSubDt"
                        disabled
                      /></td
                  ></template>

                  <template v-else>
                    <td style="visibility: collapse; display: none">
                      {{ item.idConcecutivo }}
                    </td>
                    <td>
                      <select
                        class="appearance-none"
                        v-model="item.idCodigo"
                        disabled
                      >
                        <option
                          v-for="(item, index) in idCodigo"
                          :key="index"
                          :value="item.id"
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
                          v-for="(item, index) in idCodigo1"
                          :key="index"
                          :value="item.id"
                        >
                          {{ item.item }}
                        </option>
                      </select>
                    </td>
                    <td>{{ item.descripcionPro }}</td>
                    <td class="text-center">
                      {{ convertToDecimal(item.cantidadUn) }}
                    </td>
                    <td class="text-center">
                      {{ convertToDecimal(item.cantidad) }}
                    </td>
                    <td class="text-center" v-if="columVrUnitario">
                      {{ convertToDecimal(item.vrUnitario) }}
                    </td>
                    <td class="text-center" v-if="columPorcenIva">
                      {{ convertToDecimal(item.porcenIva) }}
                    </td>
                    <td class="text-center">
                      {{ convertToDecimal(item.subtDesc) }}
                    </td>
                    <td class="text-center" v-if="columDescuPF">
                      {{ item.descuPf }}
                    </td>
                    <td class="text-center">
                      {{ item.tIva }}
                    </td>
                    <td class="text-center" v-if="columTotal">
                      {{ item.total }}
                    </td></template
                  >
                </tr>

                <tr class="border-b border-gray-500">
                  <td style="visibility: collapse; display: none">
                    {{ IordCompraSLSubDt.idConcecutivo }}
                  </td>
                  <td>
                    <select
                      class="select"
                      v-model="IordCompraSLSubDt.idCodigo"
                      @change="afterupdateidCodigosOrdCompraSLSubDt"
                    >
                      <option
                        v-for="(item, index) in idCodigo"
                        :key="index"
                        :value="item.id"
                      >
                        {{ item.item }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <select
                      class="select"
                      v-model="IordCompraSLSubDt.idCodigo"
                      @change="afterupdateidCodigosOrdCompraSLSubDt"
                    >
                      <option
                        v-for="(item, index) in idCodigo1"
                        :key="index"
                        :value="item.id"
                      >
                        {{ item.item }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.descripcionPro"
                    />
                  </td>
                  <td>
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.cantidadUn"
                      ref="refCantidadUn"
                    />
                  </td>
                  <td>
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.cantidad"
                      ref="refCantidad"
                    />
                  </td>
                  <td v-if="columVrUnitario">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.vrUnitario"
                    />
                  </td>
                  <td v-if="columPorcenIva">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.porcenIva"
                    />
                  </td>
                  <td>
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.subtDesc"
                      disabled
                    />
                  </td>
                  <td v-if="columDescuPF">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.descuPf"
                    />
                  </td>
                  <td>
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.tIva"
                      disabled
                    />
                  </td>
                  <td v-if="columTotal">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.total"
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex flex-row flex-wrap">
              <div class="md:w-1/4 px-3 mb-6 md:mb-0">
                <label class="label py-2">Subtotal</label>
                <input type="text" class="input" v-model="subtDesc" disabled />
              </div>

              <div class="md:w-1/4 px-3 mb-6 md:mb-0">
                <label class="label py-4"></label>
                <input type="text" class="input" v-model="tIva" disabled />
              </div>

              <div class="md:w-1/4 px-3 mb-6 md:mb-0">
                <label class="label py-4"></label>
                <input type="text" class="input" v-model="total" disabled />
              </div>
            </div>
          </div>

          <div class="md:w-full mb-6 md:mb-0">
            <label class="label">Decomisos</label>
            <input
              type="checkbox"
              class="checkbox"
              v-model="ordCompraSL.pDejxUsuario"
              @change="decomisosafterupdate"
              :disabled="readonly"
            />
          </div>
          <div class="md:w-5/6 mt-2 mb-6 md:mb-0" v-if="pgOrdCompraSLDtUs">
            <label class="label">Decomisos productos</label>
          </div>
          <div class="md:w-5/6 mt-2 mb-6 md:mb-0" v-if="pgOrdCompraSLDtUs">
            <div class="md:w-full px-64 mb-6 md:mb-0">
              <button
                class="btn-save"
                v-bind:class="{
                  'opacity-50 cursor-not-allowed hover:btn-save':
                    readonlyButton,
                }"
                :disabled="readonlyButton"
                @click="addOrdCompraSLSubDtUs"
              >
                Adicionar Decomisos
              </button>
            </div>
          </div>

          <div class="card-table flex-wrap w-1/2" v-if="pgOrdCompraSLDtUs">
            <table class="table-fixed w-full text-xs">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th style="visibility: collapse; display: none">
                    Id Consecutivo
                  </th>
                  <th>Codigo</th>
                  <th>Descripcion</th>
                  <th>Unidad</th>
                  <th>Kilos</th>
                  <th>Vlr Unitario</th>
                  <th>Iva</th>
                  <th>Subtotal</th>
                  <th style="visibility: collapse; display: none">DPF</th>
                  <th style="visibility: collapse; display: none">TIva</th>
                  <th style="visibility: collapse; display: none">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-b border-gray-500"
                  v-for="(item, index) in tblOrdCompraSLSubDtUs"
                  :key="index"
                  @click="selectOrdCompraSLSubDtUs(item)"
                >
                  <template
                    v-if="item.autoNum === IordCompraSLSubDtUsEdit.autoNum"
                  >
                    <td style="visibility: collapse; display: none">
                      {{ IordCompraSLSubDtUsEdit.idConcecutivo }}
                    </td>
                    <td>
                      <select
                        class="select"
                        v-model="IordCompraSLSubDtUsEdit.idCodigo"
                        @change="updateOrdCompraSLSubDtUs"
                      >
                        <option
                          v-for="(item, index) in idCodigo"
                          :key="index"
                          :value="item.id"
                        >
                          {{ item.item }}
                        </option>
                      </select>
                    </td>
                    <td>
                      <select
                        class="select"
                        v-model="IordCompraSLSubDtUsEdit.idCodigo"
                        @change="updateOrdCompraSLSubDtUs"
                      >
                        <option
                          v-for="(item, index) in idCodigo1"
                          :key="index"
                          :value="item.id"
                        >
                          {{ item.item }}
                        </option>
                      </select>
                    </td>
                    <td class="text-center">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtUsEdit.cantidadUn"
                        @change="updateOrdCompraSLSubDtUs"
                      />
                    </td>
                    <td class="text-center">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtUsEdit.cantidad"
                        @change="updateOrdCompraSLSubDtUs"
                      />
                    </td>
                    <td class="text-center">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtUsEdit.vrUnitario"
                        @change="updateOrdCompraSLSubDtUs"
                      />
                    </td>
                    <td class="text-center">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtUsEdit.porcenIva"
                        @change="updateOrdCompraSLSubDtUs"
                      />
                    </td>
                    <td class="text-center">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtUsEdit.subtDesc"
                        @change="updateOrdCompraSLSubDtUs"
                      />
                    </td>
                    <td style="visibility: collapse; display: none">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtUsEdit.descuPf"
                        @change="updateOrdCompraSLSubDtUs"
                      />
                    </td>
                    <td style="visibility: collapse; display: none">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtUsEdit.tIva"
                        @change="updateOrdCompraSLSubDtUs"
                      />
                    </td>
                    <td style="visibility: collapse; display: none">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtUsEdit.total"
                        @change="updateOrdCompraSLSubDtUs"
                      />
                    </td>
                  </template>
                  <template v-else>
                    <td style="visibility: collapse; display: none">
                      {{ item.idConcecutivo }}
                    </td>
                    <td>
                      <select
                        class="appearance-none"
                        v-model="item.idConcecutivo"
                        disabled
                      >
                        <option
                          v-for="(item, index) in idCodigo"
                          :key="index"
                          :value="item.id"
                        >
                          {{ item.item }}
                        </option>
                      </select>
                    </td>
                    <td>
                      <select class="appearance-none" v-model="item.idCodigo">
                        <option
                          v-for="(item, index) in idCodigo1"
                          disabled
                          :key="index"
                          :value="item.id"
                        >
                          {{ item.item }}
                        </option>
                      </select>
                    </td>
                    <td class="text-center">{{ item.cantidadUn }}</td>
                    <td class="text-center">
                      {{ convertToDecimal(item.cantidad) }}
                    </td>
                    <td class="text-center">
                      {{ convertToDecimal(item.vrUnitario) }}
                    </td>
                    <td class="text-center">
                      {{ convertToDecimal(item.porcenIva) }}
                    </td>
                    <td class="text-center">
                      {{ convertToDecimal(item.subtDesc) }}
                    </td>
                    <td style="visibility: collapse; display: none">
                      {{ item.descuPf }}
                    </td>
                    <td style="visibility: collapse; display: none">
                      {{ item.tIva }}
                    </td>
                    <td style="visibility: collapse; display: none">
                      {{ item.total }}
                    </td>
                  </template>
                </tr>

                <tr class="border-b border-gray-500">
                  <td style="visibility: collapse; display: none">
                    {{ IordCompraSLSubDtUs.idConcecutivo }}
                  </td>
                  <td>
                    <select
                      class="select"
                      v-model="IordCompraSLSubDtUs.idCodigo"
                      @change="afterupdateidCodigosOrdCompraSLSubDtUs"
                    >
                      <option
                        v-for="(item, index) in idCodigo"
                        :key="index"
                        :value="item.id"
                      >
                        {{ item.item }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <select
                      class="select"
                      v-model="IordCompraSLSubDtUs.idCodigo"
                      @change="afterupdateidCodigosOrdCompraSLSubDtUs"
                    >
                      <option
                        v-for="(item, index) in idCodigo1"
                        :key="index"
                        :value="item.id"
                      >
                        {{ item.item }}
                      </option>
                    </select>
                  </td>
                  <td class="text-center">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDtUs.cantidadUn"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDtUs.cantidad"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDtUs.vrUnitario"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDtUs.porcenIva"
                    />
                  </td>
                  <td class="text-center">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDtUs.subtDesc"
                    />
                  </td>
                  <td style="visibility: collapse; display: none">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDtUs.descuPf"
                    />
                  </td>
                  <td style="visibility: collapse; display: none">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDtUs.tIva"
                    />
                  </td>
                  <td style="visibility: collapse; display: none">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDtUs.total"
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="flex flex-row flex-wrap">
              <div class="md:w-1/4 px-3 mb-6 md:mb-0">
                <label class="label py-2">Subtotal</label>
                <input
                  type="text"
                  class="input"
                  v-model="subtDescUs"
                  disabled
                />
              </div>

              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="label py-4"></label>
                <input type="text" class="input" v-model="totalUs" disabled />
              </div>
            </div>
          </div>

          <div class="flex flex-wrap flex-row w-1/2">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Subtotal</label>
              <input type="text" class="input" v-model="subtotal" />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">IVA</label>
              <input type="text" class="input" v-model="iva" />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Total</label>
              <input type="text" class="input" v-model="totalVenta" />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Decomiso productos</label>
              <input type="text" class="input" v-model="valProdDUsua" />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Total menos descuentos</label>
              <input type="text" class="input" v-model="valNetoRemi" />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Tipo retefuente</label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="ordCompraSL.reteFu"
                :disabled="readonly"
              >
                <option
                  v-for="(item, index) in reteFue"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.item }}
                </option>
              </select>
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Observacion:</label>
              <input
                type="text"
                class="input"
                v-model="ordCompraSL.observaciones"
                :disabled="readonly"
              />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Elaboro:</label>
              <input
                type="text"
                class="input"
                v-model="ordCompraSL.entrego"
                :disabled="readonly"
              />
            </div>

            <div class="md:w-1/2 mt-2 px-3 mb-6 md:mb-0">
              <button
                class="btn-save"
                v-bind:class="{
                  'opacity-50 cursor-not-allowed hover:btn-save': readonly,
                }"
                @click="ordCompraSLPrint"
                :disabled="readonly"
              >
                Imprimir documento
              </button>
            </div>
          </div>
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
          <label class="label py-2">Compra No:</label>
          <input type="text" class="input" v-model="ordCompraSL.consecTip" />
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label py-4"></label>
          <select class="bg-white border select" v-model="ordCompraSL.nitoCc">
            <option
              v-for="(item, index) in nitCC22"
              :key="index"
              :value="item.id"
            >
              {{ item.item }}
            </option>
          </select>
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
      <ModalPDFPreview
        :pdfData="pdfData"
        @close="closeModalPDF"
        v-if="showModalPDF"
      />
      <ModalPDFPreview
        :pdfData="pdfData2"
        @close="closeModal2PDF"
        v-if="showModal2PDF"
      />
      <ModalPDFPreview
        :pdfData="pdfData3"
        @close="closeModal3PDF"
        v-if="showModal3PDF"
      />
    </div>
  </div>
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Ref, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import * as Sentry from '@sentry/browser';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import {
  IOrdCompraSL,
  IOrdCompraSLSubDt,
  IOrdCompraSLSubDtUs,
} from '@/remote/api/guia_sacrificio/type';
import moment from 'moment';
import IPagination from '@/types/IPagination';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import PaginatedSelectGroup from '@/components/reusable/PaginatedSelectGroup.vue';
import PaginatedSelectGroupItem from '@/components/reusable/PaginatedSelectGroupItem.vue';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
    PaginatedSelectGroup,
    PaginatedSelectGroupItem,
  },
  name: 'OrdCompraSL',
})
export default class OrdComprasSL extends Vue {
  @Ref('refCantidad') public refCantidad: HTMLInputElement;
  @Ref('refCantidadUn') public refCantidadUn: HTMLInputElement;
  @Ref('anuladoRef') public anuladoRef: HTMLInputElement;

  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private readonly: boolean = true;
  private readonlyButton: boolean = true;

  private columDescuPF: boolean = false;
  private columVrUnitario: boolean = false;
  private columTotal: boolean = false;
  private columPorcenIva: boolean = false;
  private modalAnular: boolean = false;
  private pgOrdCompraSLDtUs: boolean = false;
  private pgAnulada: boolean = false;
  private pdfData: string = '';
  private pdfData2: string = '';
  private pdfData3: string = '';
  private showModalPDF: boolean = false;
  private showModal2PDF: boolean = false;
  private showModal3PDF: boolean = false;

  private anula: boolean = false;
  private motivoAnul1: string = '';

  private subtotal: string = '0.0';
  private iva: string = '0.0';
  private totalVenta: string = '0.0';
  private valProdDUsua: string = ' 0.0';
  private valNetoRemi: string = '0.0';

  private subtDesc: string = '';
  private tIva: string = '';
  private total: string = '';
  private subtDescUs: string = '';
  private totalUs: string = '';
  private nitCConSub: number = 0;

  private typeMov: IInterfaceSelect[] = [];
  private reteFue: IInterfaceSelect[] = [];
  private nitCC22: IInterfaceSelect[] = [];
  private idCodigo: IInterfaceSelect[] = [];
  private idCodigo1: IInterfaceSelect[] = [];
  private tblOrdCompraSLSubDt: IOrdCompraSLSubDt[] = [];
  private tblOrdCompraSLSubDtUs: IOrdCompraSLSubDtUs[] = [];
  private ordCompraSL: IOrdCompraSL = {
    anulada: false,
    cambioM: 0,
    concFactur: 0,
    consecTip: 0,
    descuento: 0,
    document: '',
    documento: '',
    entrego: '',
    estacion: '',
    fecha: '',
    fechaMov: '',
    fechaProc: '',
    fechaVenci: '',
    guiaSac: 0,
    idConcecutivo: 0,
    idEmpresa: 0,
    idMoneda: 0,
    imprim: 'N',
    iva: 0,
    lIca: '',
    liqPesoFinca: false,
    loteNo: 0,
    motivoAnul: '',
    nitoCc: '',
    observaciones: '',
    observaciones2: '',
    pDejxUsuario: false,
    plazoDia: 0,
    prefijo: '',
    procesado: false,
    reteFu: '',
    subtotal: 0,
    tipoMov: 0,
    tipoTransac: 0,
    totalVenta: 0,
    transportador: '',
    usuario: '',
    valNetoRemi: 0,
    valProdDUsua: 0,
    vrFondo: 0,
    vrRetefuente: 0,
  };
  private IordCompraSLSubDt: IOrdCompraSLSubDt = {
    autoNum: 0,
    cCosto: '',
    cCostoPr: '',
    cantidad: 0,
    cantidadUn: 0,
    cuentaCont: '',
    descripPro: '',
    descripcionMer: '',
    descripcionPro: '',
    descuPf: 0,
    fechaG: '',
    idCategoria: 0,
    idCodigo: '',
    idConcecutivo: 0,
    porcenIva: 0,
    subtDesc: 0,
    tIva: 0,
    total: 0,
    vrUnitario: 0,
  };
  private IordCompraSLSubDtEdit: IOrdCompraSLSubDt = {
    autoNum: 0,
    cCosto: '',
    cCostoPr: '',
    cantidad: 0,
    cantidadUn: 0,
    cuentaCont: '',
    descripPro: '',
    descripcionMer: '',
    descripcionPro: '',
    descuPf: 0,
    fechaG: '',
    idCategoria: 0,
    idCodigo: '',
    idConcecutivo: 0,
    porcenIva: 0,
    subtDesc: 0,
    tIva: 0,
    total: 0,
    vrUnitario: 0,
  };
  private IordCompraSLSubDtUs: IOrdCompraSLSubDtUs = {
    autoNum: 0,
    cCosto: '',
    cCostoPr: '',
    cantidad: 0,
    cantidadUn: 0,
    cuentaCont: '',
    descripcionMer: '',
    descuPf: 0,
    fechaG: '',
    idCategoria: 0,
    idCodigo: '',
    idConcecutivo: 0,
    porcenIva: 0,
    subtDesc: 0,
    tIva: 0,
    total: 0,
    vrUnitario: 0,
  };
  private IordCompraSLSubDtUsEdit: IOrdCompraSLSubDtUs = {
    autoNum: 0,
    cCosto: '',
    cCostoPr: '',
    cantidad: 0,
    cantidadUn: 0,
    cuentaCont: '',
    descripcionMer: '',
    descuPf: 0,
    fechaG: '',
    idCategoria: 0,
    idCodigo: '',
    idConcecutivo: 0,
    porcenIva: 0,
    subtDesc: 0,
    tIva: 0,
    total: 0,
    vrUnitario: 0,
  };

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );
  private guiaSacrificioReports = new ReportesGuiaSacrificio(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    await this.typeMovs();
    await this.nitoCC22();
    await this.reteFuente();
    await this.idCodigosOrdCompraSLSubDt();
  }

  private closeModalAnular() {
    this.modalAnular = false;
  }

  private viewModalAnular() {
    if (this.anula) {
      this.modalAnular = true;
    }
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private closeModal2PDF() {
    this.showModal2PDF = false;
  }

  private closeModal3PDF() {
    this.showModal3PDF = false;
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private convertToDecimal(dato: number) {
    return new Intl.NumberFormat('en-GB', {
      currency: 'EUR',
      style: 'currency',
    })
      .format(dato)
      .replace(/[€]/g, '');
  }

  private selectOrdCompraSLSubDt(item: any) {
    this.IordCompraSLSubDtEdit = item as IOrdCompraSLSubDt;
  }

  private selectOrdCompraSLSubDtUs(item: any) {
    this.IordCompraSLSubDtUsEdit = item as IOrdCompraSLSubDtUs;
  }

  private async decomisosafterupdate() {
    if (!this.ordCompraSL.pDejxUsuario) {
      this.pgOrdCompraSLDtUs = false;
      return;
    }
    this.pgOrdCompraSLDtUs = true;
  }

  private async rePrint() {
    if (this.ordCompraSL.imprim === 'N') {
      this.showOutput(true, 'Utilize la opcion Imprimir Documento');
      return;
    }
    await this.infcxPdf(this.ordCompraSL.idConcecutivo);
    await this.comprocomprapdf(this.ordCompraSL.idConcecutivo);
    await this.ordcompraPdf(this.ordCompraSL.idConcecutivo);
  }

  private anular() {
    if (!this.ordCompraSL.anulada) {
      this.pgAnulada = true;
      this.anula = false;
      this.anuladoRef.focus();
      return;
    }
    this.showOutput(false, 'Documento Anulado');
  }

  private addReguister() {
    this.readonly = false;
  }

  private fechaMovAfterupdate() {
    this.ordCompraSL.fechaVenci = moment(this.ordCompraSL.fechaMov)
      .add(this.ordCompraSL.plazoDia, 'day')
      .format('YYYY-MM-DD');
  }

  private transporterObtener(expr: string) {
    if (expr.length > 30) {
      this.ordCompraSL.transportador = expr.substr(0, 29);
      return;
    }
    this.ordCompraSL.transportador = expr;
  }

  private validateBeforeuptdate() {
    if (
      this.ordCompraSL.fechaMov < this.$store.getters.getTConfinv1.fechaProc3 ||
      this.ordCompraSL.fechaMov > this.$store.getters.getTConfinv1.fechaProc4
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }
    if (!this.ordCompraSL.nitoCc || this.ordCompraSL.nitoCc === null) {
      this.showOutput(true, 'La O.Compra no Tiene Tercero');
      return true;
    }

    return false;
  }

  private async acceptModalAnular() {
    this.ordCompraSL.anulada = this.anula;
    this.ordCompraSL.motivoAnul = this.motivoAnul1;
    await this.ordCompraSLAnualar();
  }

  private async save() {
    await this.addOrdCompraSL();
  }

  private async ordCompraSLPrint() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postPrintOrdCompraSL(
        this.ordCompraSL,
      );

      await this.infcxPdf(this.ordCompraSL.idConcecutivo);
      await this.comprocompraSLpdf(this.ordCompraSL.idConcecutivo);
      await this.ordcompraSLPdf(this.ordCompraSL.idConcecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraSLAnualar() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postAnularOrdCompraSL(
        this.ordCompraSL,
      );
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async addOrdCompraSLSubDt() {
    await this.ordCompraSLSubDtCreate();
    await this.createOrdCompraSLSubDt();
    await this.ordCompraSLSubDt(this.ordCompraSL.idConcecutivo);
    await this.countOrdCompraSLSubDt();
  }

  private async upDateOrdCompraSLSubDt() {
    await this.updateordCompraSLSubDtCreate();
    await this.updateOrdCompraSLSubDt();
    await this.ordCompraSLSubDt(this.ordCompraSL.idConcecutivo);
    await this.countOrdCompraSLSubDt();
  }

  private async onexitOrdCompraSLSubDt() {
    if (!this.ordCompraSL.idConcecutivo) {
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putonExitOrdCompraSLSubDt(
        this.ordCompraSL,
      );
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private ivaOnsubCount(iva: string) {
    if (this.nitCConSub !== 1) {
      this.ordCompraSL.iva = Math.round(Number.parseFloat(iva));
      return;
    }
    this.ordCompraSL.iva = 0;
  }

  private async countOrdCompraSLSubDt() {
    if (!this.ordCompraSL.idConcecutivo) {
      return;
    }
    this.IordCompraSLSubDt.idConcecutivo = this.ordCompraSL.idConcecutivo;
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getCountOrdCompraSLDt(
        this.IordCompraSLSubDt.idConcecutivo,
      );
      if (response.data > 0) {
        this.ordCompraSL.subtotal = Number.parseFloat(this.subtDesc);
        this.ordCompraSL.subtotal = Math.round(this.ordCompraSL.subtotal);
        this.ivaOnsubCount(this.tIva);
        this.ordCompraSL.totalVenta =
          this.ordCompraSL.subtotal + this.ordCompraSL.iva;
        this.ordCompraSL.valNetoRemi =
          this.ordCompraSL.totalVenta - this.ordCompraSL.valProdDUsua;
      }
      await this.onexitOrdCompraSLSubDt();
      this.subtotal = this.convertToDecimal(this.ordCompraSL.subtotal);
      this.iva = this.convertToDecimal(this.ordCompraSL.iva);
      this.totalVenta = this.convertToDecimal(this.ordCompraSL.totalVenta);
      this.valNetoRemi = this.convertToDecimal(this.ordCompraSL.valNetoRemi);
      this.valProdDUsua = this.convertToDecimal(this.ordCompraSL.valProdDUsua);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async updateOrdCompraSLSubDt() {
    this.IordCompraSLSubDtEdit.fechaG = moment(
      this.IordCompraSLSubDtEdit.fechaG,
    )
      .utc()
      .format('YYYY-MM-DD');
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postOrdCompraSLSubDt(
        this.IordCompraSLSubDtEdit,
      );
      if (response.status === 200) {
        this.IordCompraSLSubDtEdit = {
          autoNum: 0,
          cCosto: '',
          cCostoPr: '',
          cantidad: 0,
          cantidadUn: 0,
          cuentaCont: '',
          descripPro: '',
          descripcionMer: '',
          descripcionPro: '',
          descuPf: 0,
          fechaG: '',
          idCategoria: 0,
          idCodigo: '',
          idConcecutivo: 0,
          porcenIva: 0,
          subtDesc: 0,
          tIva: 0,
          total: 0,
          vrUnitario: 0,
        };
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async createOrdCompraSLSubDt() {
    if (!this.ordCompraSL.idConcecutivo) {
      return;
    }
    this.IordCompraSLSubDt.idConcecutivo = this.ordCompraSL.idConcecutivo;
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postOrdCompraSLSubDt(
        this.IordCompraSLSubDt,
      );
      this.IordCompraSLSubDt = {
        autoNum: 0,
        cCosto: '',
        cCostoPr: '',
        cantidad: 0,
        cantidadUn: 0,
        cuentaCont: '',
        descripPro: '',
        descripcionMer: '',
        descripcionPro: '',
        descuPf: 0,
        fechaG: '',
        idCategoria: 0,
        idCodigo: '',
        idConcecutivo: 0,
        porcenIva: 0,
        subtDesc: 0,
        tIva: 0,
        total: 0,
        vrUnitario: 0,
      };
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraSLSubDtCreate() {
    if (!this.ordCompraSL.idConcecutivo) {
      return;
    }
    this.IordCompraSLSubDt.idConcecutivo = this.ordCompraSL.idConcecutivo;
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postOrdCompraSLDtCreate(
        this.IordCompraSLSubDt,
      );
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async updateordCompraSLSubDtCreate() {
    if (!this.ordCompraSL.idConcecutivo) {
      return;
    }
    this.IordCompraSLSubDtEdit.idConcecutivo = this.ordCompraSL.idConcecutivo;
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postOrdCompraSLDtCreate(
        this.IordCompraSLSubDtEdit,
      );
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async addOrdCompraSL() {
    if (this.validateBeforeuptdate()) {
      return;
    }
    this.ordCompraSL.fecha = moment().utc().format('YYYY-MM-DD');
    this.ordCompraSL.estacion = this.$store.getters.getUsuario;
    this.ordCompraSL.subtotal = Number.parseFloat(this.subtotal);
    this.ordCompraSL.iva = Number.parseFloat(this.iva);
    this.ordCompraSL.totalVenta = Number.parseFloat(this.totalVenta);
    this.ordCompraSL.valProdDUsua = Number.parseFloat(this.valProdDUsua);
    this.ordCompraSL.valNetoRemi = Number.parseFloat(this.valNetoRemi);

    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postOrdCompraSL(
        this.ordCompraSL,
      );
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
      }
      this.ordCompraSL.idConcecutivo = response.data.idConcecutivo;
      this.readonlyButton = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitoCCAfterupdate(nitoCC: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCcOrdCompraSLCs();
      for (const nitCC of response.data) {
        if (nitoCC === parseInt(nitCC.codProveedor, 10)) {
          this.transporterObtener(nitCC.expr1);
          this.ordCompraSL.plazoDia = nitCC.plazoPactado;
          this.ordCompraSL.fechaVenci = moment(this.ordCompraSL.fechaMov)
            .add(this.ordCompraSL.plazoDia, 'day')
            .utc()
            .format('YYYY-MM-DD');
          this.nitCConSub = parseInt(nitCC.nitoCC, 10);
        }
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async addOrdCompraSLSubDtUs() {
    await this.createOrdCompraSLSubDtUs();
    await this.ordCompraSLSubDtUs(this.ordCompraSL.idConcecutivo);
    await this.countOrdCompraSLSubDtUs();
  }

  private async updateOrdCompraSLSubDtUs() {
    await this.upDataOrdCompraSLSubDtUs();
    await this.ordCompraSLSubDtUs(this.ordCompraSL.idConcecutivo);
    await this.countOrdCompraSLSubDtUs();
  }

  private async onexitOrdCompraSLSubDtUs() {
    if (!this.ordCompraSL.idConcecutivo) {
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putonExitOrdCompraSLSubDtUs(
        {
          idConcecutivo: this.ordCompraSL.idConcecutivo,
          totalVenta: this.totalVenta,
          valProdDUsua: this.valProdDUsua,
        },
      );
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async countOrdCompraSLSubDtUs() {
    if (!this.ordCompraSL.idConcecutivo) {
      return;
    }
    this.IordCompraSLSubDtUs.idConcecutivo = this.ordCompraSL.idConcecutivo;
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getCountOrdCompraSLDtUs(
        this.IordCompraSLSubDtUs.idConcecutivo,
      );
      if (response.data > 0) {
        this.valProdDUsua = this.convertToDecimal(
          Math.round(Number.parseFloat(this.totalUs)),
        );
        this.valNetoRemi = this.convertToDecimal(
          Math.abs(
            Math.round(
              Number.parseFloat(this.totalVenta) -
                Number.parseFloat(this.valProdDUsua),
            ),
          ),
        );
        await this.onexitOrdCompraSLSubDtUs();
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async upDataOrdCompraSLSubDtUs() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postOrdCompraSLSubDtUs(
        this.IordCompraSLSubDtUsEdit,
      );

      this.IordCompraSLSubDtUsEdit = {
        autoNum: 0,
        cCosto: '',
        cCostoPr: '',
        cantidad: 0,
        cantidadUn: 0,
        cuentaCont: '',
        descripcionMer: '',
        descuPf: 0,
        fechaG: '',
        idCategoria: 0,
        idCodigo: '',
        idConcecutivo: 0,
        porcenIva: 0,
        subtDesc: 0,
        tIva: 0,
        total: 0,
        vrUnitario: 0,
      };
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async createOrdCompraSLSubDtUs() {
    if (!this.ordCompraSL.idConcecutivo) {
      return;
    }

    this.IordCompraSLSubDtUs.idConcecutivo = this.ordCompraSL.idConcecutivo;
    this.IordCompraSLSubDtUs.descripcionMer = '';
    this.IordCompraSLSubDtUs.idCategoria = 0;
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postOrdCompraSLSubDtUs(
        this.IordCompraSLSubDtUs,
      );
      this.IordCompraSLSubDtUs = {
        autoNum: 0,
        cCosto: '',
        cCostoPr: '',
        cantidad: 0,
        cantidadUn: 0,
        cuentaCont: '',
        descripcionMer: '',
        descuPf: 0,
        fechaG: '',
        idCategoria: 0,
        idCodigo: '',
        idConcecutivo: 0,
        porcenIva: 0,
        subtDesc: 0,
        tIva: 0,
        total: 0,
        vrUnitario: 0,
      };
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraSLSubDtUs(idConsecutivo: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getOrdCompraSLSubDtUs(idConsecutivo);
      this.tblOrdCompraSLSubDtUs = response.data.data;
      this.subtDescUs = this.convertToDecimal(response.data.subtotal.subtDesc);
      this.totalUs = this.convertToDecimal(response.data.subtotal.total);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ordCompraSLSubDt(idConsecutivo: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getOrdCompraSLSubDt(idConsecutivo);
      this.tblOrdCompraSLSubDt = response.data.data;
      this.subtDesc = this.convertToDecimal(response.data.subtotal.subtDesc);
      this.tIva = this.convertToDecimal(response.data.subtotal.tIva);
      this.total = this.convertToDecimal(response.data.subtotal.total);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private validaDataTable(item: any) {
    if (!item.manDescPF) {
      this.columDescuPF = true;
    }

    if (item.manValores) {
      this.columVrUnitario = true;
      this.columPorcenIva = true;
      this.columTotal = true;
    }
  }

  private async typeMovAfterupdate(tipoMov: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getTipoMovAfterOrdComprasSL(tipoMov);
      this.ordCompraSL.consecTip = response.data.consecTip;
      this.ordCompraSL.prefijo = response.data.prefijo;

      this.validaDataTable(response.data);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async typeMovs() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getTipoMovOrdCompraSLCs();
      this.typeMov = response.data.map((e: any) => {
        return { id: e.idMovimiento, item: e.descripcion };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
  private async nitoCC22() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCC22OrdCompraSLCs();
      this.nitCC22 = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.expr2 };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
  private async reteFuente() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getReteFuenteOrdCompraSLCs();
      this.reteFue = response.data.map((e: any) => {
        return {
          id: e.IdReteFu,
          item: `${e.IdReteFu} - ${e.ConcepRete} - ${this.convertToDecimal(
            e.PorRete,
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

  private async idCodigosOrdCompraSLSubDt() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getIdCodigoOrdCompraSLSubDt();
      this.idCodigo = response.data.map((e: any) => {
        return {
          id: e.idCodigo,
          item: e.idCodigo,
        };
      });
      this.idCodigo1 = response.data.map((e: any) => {
        return {
          id: e.idCodigo,
          item: e.descripcionMer,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async afterupdateidCodigosOrdCompraSLSubDtUs() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getIdCodigoOrdCompraSLSubDtAfter(
          this.IordCompraSLSubDt.idCodigo,
        );
      this.IordCompraSLSubDtUs.porcenIva = response.data.porcenIva;
      this.IordCompraSLSubDtUs.vrUnitario = response.data.vrUnitario;
      this.validateOrdCompraSLDt(response.data);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async afterupdateidCodigosOrdCompraSLSubDt() {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getIdCodigoOrdCompraSLSubDtAfter(
          this.IordCompraSLSubDt.idCodigo,
        );
      this.IordCompraSLSubDt.porcenIva = response.data.porcenIva;
      this.IordCompraSLSubDt.vrUnitario = response.data.vrUnitario;
      this.validateOrdCompraSLDt(response.data);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private validateOrdCompraSLDt(item: any) {
    if (!item.tiPriorUnid) {
      if (!this.IordCompraSLSubDt.cantidad) {
        this.showOutput(true, 'Cantidad Kilos debe ser Mayor de Cero');
        this.refCantidad.focus();
        return;
      }
    }
    if (!this.IordCompraSLSubDt.cantidadUn) {
      this.showOutput(true, 'Cantidad Unidades debe ser Mayor de Cero');
      this.refCantidadUn.focus();
      return;
    }
  }

  private async nitoCC(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        codProveedor: string;
        expr1: string;
        nitoCC: string;
        plazoPactado: number;
        regimenTrib: number;
        esAutoretenedor: boolean;
      }>
    >;
    if (q.query) {
      response = await this.guiaSacrificioApi.getNitCcOrdCompraSLCsFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return { id: e.codProveedor, item: e.codProveedor };
      });
    }
    response = await this.guiaSacrificioApi.getNitCcOrdCompraSLCs(p);
    return response.data.map<IInterfaceSelect>((e) => {
      return { id: e.codProveedor, item: e.codProveedor };
    });
  }

  private async nitoCCcod(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        codProveedor: string;
        expr1: string;
        nitoCC: string;
      }>
    >;
    if (q.query) {
      response = await this.guiaSacrificioApi.getNitCCodOrdCompraSLCsFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return { id: e.codProveedor, item: e.nitoCC };
      });
    }
    response = await this.guiaSacrificioApi.getNitCCodOrdCompraSLCs(p);
    return response.data.map<IInterfaceSelect>((e) => {
      return { id: e.codProveedor, item: e.nitoCC };
    });
  }

  private async nitoCCpp(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        codProveedor: number;
        expr1: string;
        expr2: string;
      }>
    >;
    if (q.query) {
      response = await this.guiaSacrificioApi.getNitCCPPOrdCompraSLCsFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return { id: e.codProveedor, item: e.expr2 };
      });
    }
    response = await this.guiaSacrificioApi.getNitCCPPOrdCompraSLCs(p);
    return response.data.map<IInterfaceSelect>((e) => {
      return { id: e.codProveedor, item: e.expr2 };
    });
  }

  private async infcxPdf(id: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getinfcxPDF(id);
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async comprocomprapdf(id: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getrptcomprocompraPDF(id);
      this.pdfData2 = pdf2.data;
      this.showModal2PDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }
  private async ordcompraPdf(id: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getrptordcompraPDF(id);
      this.pdfData3 = pdf2.data;
      this.showModal3PDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async comprocompraSLpdf(id: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getrptcomprocompraslPDF(id);
      this.pdfData2 = pdf2.data;
      this.showModal2PDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }
  private async ordcompraSLPdf(id: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getrptordcompraslPDF(id);
      this.pdfData3 = pdf2.data;
      this.showModal3PDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }
}
</script>
