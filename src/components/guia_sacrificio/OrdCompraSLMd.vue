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

        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <div class="md:w-1 px-5 mb-6 md:mb-0 mt-5">
            <p class="text-andrea font-bold text-2xl">
              {{ validateAnulado(ordCompraSLMd.anulada) }}
            </p>
          </div>
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
                :enablePrev="readonlyPrev"
                :enableNext="readonlyNext"
                :usePagination="true"
                @changed="ordCompraSLMdID(id)"
                @prev="prev"
                @next="next"
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
          <button class="btn-primary" @click="ordCompraSLMdmodify">
            Modificar
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="anular">Anular</button>
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
        :checked="pgAnulada"
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
            Anular
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Tipos de movimiento:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ordCompraSLMd.tipoMov"
              @change="typeMovAfterupdate(ordCompraSLMd.tipoMov)"
              :disabled="readonly"
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
            <input
              type="text"
              class="input"
              v-model="ordCompraSLMd.consecTip"
              :disabled="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">No. compra usuario</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraSLMd.documento"
              :disabled="readonly"
              ref="refDocumet"
            />
          </div>
          <div class="md:w-full px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Proveedor</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ordCompraSLMd.nitoCc"
              :disabled="readonly"
            >
              <option
                v-for="(item, index) in nitCC"
                :key="index"
                :value="item.id"
              >
                {{ item.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ordCompraSLMd.nitoCc"
              :disabled="readonly"
            >
              <option
                v-for="(item, index) in nitCCcod"
                :key="index"
                :value="item.id"
              >
                {{ item.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ordCompraSLMd.nitoCc"
              :disabled="readonly"
            >
              <option
                v-for="(item, index) in nitCCpp"
                :key="index"
                :value="item.id"
              >
                {{ item.item }}
              </option>
            </select>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha de movimiento:</label>
            <input
              type="date"
              class="input"
              v-model="ordCompraSLMd.fechaMov"
              :disabled="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha de vencimiento:</label>
            <input
              type="date"
              class="input"
              v-model="ordCompraSLMd.fechaVenci"
              :disabled="readonly"
            />
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Transportador:</label>
            <input
              type="text"
              class="input"
              v-model="ordCompraSLMd.transportador"
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
                  'opacity-50 cursor-not-allowed hover:btn-save': readonly,
                }"
                @click="addOrdCompraSLSubDt"
                :disabled="readonly"
              >
                Adicionar OrdenCompra
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
                  <th>Codigo</th>
                  <th>Descripcion</th>
                  <th>Descrip. 2</th>
                  <th>Unidad</th>
                  <th>Kilos</th>
                  <th v-if="columVrUnitario">Vlr Unitario</th>
                  <th v-if="columPorcenIva">Iva</th>
                  <th>Subtotal</th>
                  <th
                    v-if="columDescuPF"
                    style="visibility: collapse; display: none"
                  >
                    DPF
                  </th>
                  <th style="visibility: collapse; display: none">TIva</th>
                  <th
                    v-if="columTotal"
                    style="visibility: collapse; display: none"
                  >
                    Total
                  </th>
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
                        :disabled="readonly"
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
                        :disabled="readonly"
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
                        :disabled="readonly"
                      />
                    </td>
                    <td>
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.cantidadUn"
                        @change="upDateOrdCompraSLSubDt"
                        ref="refCantidadUn"
                        :disabled="readonly"
                      />
                    </td>
                    <td>
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.cantidad"
                        @change="upDateOrdCompraSLSubDt"
                        ref="refCantidad"
                        :disabled="readonly"
                      />
                    </td>
                    <td v-if="columVrUnitario">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.vrUnitario"
                        @change="upDateOrdCompraSLSubDt"
                        :disabled="readonly"
                      />
                    </td>
                    <td v-if="columPorcenIva">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.porcenIva"
                        @change="upDateOrdCompraSLSubDt"
                        :disabled="readonly"
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
                        style="visibility: collapse; display: none"
                      />
                    </td>
                    <td>
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.tIva"
                        @change="upDateOrdCompraSLSubDt"
                        style="visibility: collapse; display: none"
                        disabled
                      />
                    </td>
                    <td v-if="columTotal">
                      <input
                        class="input"
                        type="text"
                        v-model="IordCompraSLSubDtEdit.total"
                        @change="upDateOrdCompraSLSubDt"
                        style="visibility: collapse; display: none"
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
                    <td
                      class="text-center"
                      v-if="columDescuPF"
                      style="visibility: collapse; display: none"
                    >
                      {{ convertToDecimal(item.descuPf) }}
                    </td>
                    <td
                      class="text-center"
                      style="visibility: collapse; display: none"
                    >
                      {{ convertToDecimal(item.tIva) }}
                    </td>
                    <td
                      class="text-center"
                      v-if="columTotal"
                      style="visibility: collapse; display: none"
                    >
                      {{ convertToDecimal(item.total) }}
                    </td>
                  </template>
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
                      :disabled="readonly"
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
                      :disabled="readonly"
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
                      :disabled="readonly"
                    />
                  </td>
                  <td>
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.cantidadUn"
                      ref="refCantidadUn"
                      :disabled="readonly"
                    />
                  </td>
                  <td>
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.cantidad"
                      ref="refCantidad"
                      :disabled="readonly"
                    />
                  </td>
                  <td v-if="columVrUnitario">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.vrUnitario"
                      :disabled="readonly"
                    />
                  </td>
                  <td v-if="columPorcenIva">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.porcenIva"
                      :disabled="readonly"
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
                      style="visibility: collapse; display: none"
                    />
                  </td>
                  <td>
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.tIva"
                      style="visibility: collapse; display: none"
                      disabled
                    />
                  </td>
                  <td v-if="columTotal">
                    <input
                      class="input"
                      type="text"
                      v-model="IordCompraSLSubDt.total"
                      style="visibility: collapse; display: none"
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="md:w-full mb-6 md:mb-0">
            <label class="label">Decomisos</label>
            <input
              type="checkbox"
              class="checkbox"
              v-model="ordCompraSLMd.pDejxUsuario"
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
                  'opacity-50 cursor-not-allowed hover:btn-save': readonly,
                }"
                :disabled="readonly"
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
                  readonly
                />
              </div>

              <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="label py-4"></label>
                <input type="text" class="input" v-model="totalUs" readonly />
              </div>
            </div>
          </div>

          <div class="flex flex-wrap flex-row w-1/2">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Subtotal</label>
              <input type="text" class="input" v-model="subtotal" readonly />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">IVA</label>
              <input type="text" class="input" v-model="iva" readonly />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Total</label>
              <input type="text" class="input" v-model="totalVenta" readonly />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Decomiso productos</label>
              <input
                type="text"
                class="input"
                v-model="valProdDUsua"
                readonly
              />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Total menos descuentos</label>
              <input type="text" class="input" v-model="valNetoRemi" readonly />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Tipo retefuente</label>
              <select
                class="bg-white border py-1 pr-2 select"
                :disabled="readonly"
                v-model="ordCompraSLMd.reteFu"
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
                v-model="ordCompraSLMd.observaciones"
                :disabled="readonly"
              />
            </div>

            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Elaboro:</label>
              <input
                type="text"
                class="input"
                v-model="ordCompraSLMd.entrego"
                :disabled="readonly"
              />
            </div>

            <div class="md:w-1/2 mt-2 px-3 mb-6 md:mb-0">
              <button
                class="btn-save"
                v-bind:class="{
                  'opacity-50 cursor-not-allowed hover:btn-save': readonly,
                }"
                @click="ordCompraSLMdPrint"
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
          <input
            type="text"
            class="input"
            v-model="ordCompraSLMd.consecTip"
            readonly
          />
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="label py-4"></label>
          <select
            class="bg-white border select"
            v-model="ordCompraSLMd.nitoCc"
            disabled
          >
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
    </div>

    <!-- Modal modify -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="modalModify"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8; Documento Confirmado. Desea Des-Confirmar</strong
            >
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
    <!-- End Modal Modify -->

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
</template>

<script lang="ts">
import AlertBox from '@/components/reusable/AlertBox.vue';
import Loader from '@/components/reusable/Loader.vue';
import { Component, Ref, Vue } from 'vue-property-decorator';
import '../../assets/tab.css';
import moment from 'moment';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import * as Sentry from '@sentry/browser';
import Select from '@/components/reusable/select.vue';
import {
  IOrdCompraSL,
  IOrdCompraSLSubDt,
  IOrdCompraSLSubDtUs,
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
  name: 'OrdCompraSLMd',
})
export default class OrdCompraSLMd extends Vue {
  @Ref('refDocumet') public refDocumet: HTMLInputElement;
  @Ref('anuladoRef') public anuladoRef: HTMLInputElement;
  @Ref('refCantidad') public refCantidad: HTMLInputElement;
  @Ref('refCantidadUn') public refCantidadUn: HTMLInputElement;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private readonly: boolean = false;
  private columDescuPF: boolean = false;
  private columVrUnitario: boolean = false;
  private columTotal: boolean = false;
  private columPorcenIva: boolean = false;
  private pgAnulada: boolean = false;
  private modalAnular: boolean = false;
  private pgOrdCompraSLDtUs: boolean = false;
  private modalModify: boolean = false;
  private skip: number = 0;
  private limt: number = 1000;
  private readonlyPrev: boolean = false;
  private readonlyNext: boolean = false;
  private anula: boolean = false;
  private motivoAnul1: string = '';
  private pdfData: string = '';
  private pdfData2: string = '';
  private pdfData3: string = '';
  private showModalPDF: boolean = false;
  private showModal2PDF: boolean = false;
  private showModal3PDF: boolean = false;

  private subtDesc: string = '';
  private tIva: string = '';
  private total: string = '';
  private subtDescUs: string = '';
  private totalUs: string = '';
  private nitCConSub: number = 0;

  private subtotal: string = '';
  private iva: string = '';
  private totalVenta: string = '';
  private valProdDUsua: string = '';
  private valNetoRemi: string = '';

  private search: boolean = false;

  private customerSearch: IInterfaceSelect[] = [];
  private typeMov: IInterfaceSelect[] = [];
  private reteFue: IInterfaceSelect[] = [];
  private nitCC: IInterfaceSelect[] = [];
  private nitCCcod: IInterfaceSelect[] = [];
  private nitCCpp: IInterfaceSelect[] = [];
  private nitCC22: IInterfaceSelect[] = [];
  private idCodigo: IInterfaceSelect[] = [];
  private idCodigo1: IInterfaceSelect[] = [];
  private tblOrdCompraSLSubDt: IOrdCompraSLSubDt[] = [];
  private tblOrdCompraSLSubDtUs: IOrdCompraSLSubDtUs[] = [];
  private ordCompraSLMd: IOrdCompraSL = {
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

  private id: number = null;

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );
  private guiaSacrificioReports = new ReportesGuiaSacrificio(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    this.block();
    await this.typeMovs();
    await this.nitoCC();
    await this.nitoCCcod();
    await this.nitoCCpp();
    await this.nitoCC22();
    await this.reteFuente();
    await this.idCodigosOrdCompraSLSubDt();
    await this.searchCustomer(this.skip, this.limt);
  }

  private openForm() {
    this.block();
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
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

  private block() {
    this.readonly = true;
  }

  private desBlock() {
    this.readonly = false;
  }

  private validateAnulado(anulado: boolean) {
    return anulado ? 'Anulado' : '';
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

  private decomisosafterupdate() {
    if (!this.ordCompraSLMd.pDejxUsuario) {
      this.pgOrdCompraSLDtUs = false;
      return;
    }
    this.pgOrdCompraSLDtUs = true;
  }

  private closeModalAnular() {
    this.modalAnular = false;
  }

  private viewModalAnular() {
    if (this.anula) {
      this.modalAnular = true;
    }
  }

  private viewModalModify() {
    this.modalModify = true;
  }

  private closeModalModify() {
    this.modalModify = false;
  }

  private acceptModalModify() {
    this.ordCompraSLMd.imprim = 'N';
    this.desBlock();
    this.decomisosafterupdate();
    this.refDocumet.focus();
    this.closeModalModify();
  }

  private async rePrint() {
    if (this.ordCompraSLMd.imprim === 'N') {
      this.showOutput(true, 'Utilize la opcion Imprimir Documento');
      return;
    }
    await this.infcxPdf(this.ordCompraSLMd.idConcecutivo);
    await this.comprocompraSLpdf(this.ordCompraSLMd.idConcecutivo);
    await this.ordcompraSLPdf(this.ordCompraSLMd.idConcecutivo);
  }

  private anular() {
    if (!this.ordCompraSLMd.anulada) {
      this.pgAnulada = true;
      this.anula = false;
      this.anuladoRef.focus();
      return;
    }
    this.showOutput(false, 'Documento Anulado');
  }

  private selectOrdCompraSLSubDt(item: any) {
    this.IordCompraSLSubDtEdit = item as IOrdCompraSLSubDt;
  }

  private selectOrdCompraSLSubDtUs(item: any) {
    this.IordCompraSLSubDtUsEdit = item as IOrdCompraSLSubDtUs;
  }

  private async acceptModalAnular() {
    this.ordCompraSLMd.anulada = this.anula;
    this.ordCompraSLMd.motivoAnul = this.motivoAnul1;
    await this.ordCompraSLMdAnular();
  }

  private async prev() {
    if (this.skip <= 0) {
      this.readonlyPrev = true;
      return;
    }
    this.readonlyNext = false;
    this.skip = this.skip - this.limt;
    await this.searchCustomer(this.skip, this.limt);
  }

  private async next() {
    this.readonlyPrev = false;
    this.skip = this.skip + this.limt;
    await this.searchCustomer(this.skip, this.limt);
  }

  private transporterObtener(expr: string) {
    if (expr.length > 30) {
      this.ordCompraSLMd.transportador = expr.substr(0, 29);
      return;
    }
    this.ordCompraSLMd.transportador = expr;
  }

  private dateOutLimt() {
    if (
      this.ordCompraSLMd.fechaMov <
        this.convertDate(this.$store.getters.getTConfinv1.fechaProc3) ||
      this.ordCompraSLMd.fechaMov >
        this.convertDate(this.$store.getters.getTConfinv1.fechaProc4)
    ) {
      this.showOutput(true, '"La fecha esta fuera del limite permitido');
      return true;
    }
    return false;
  }

  private async nitoCCAfterupdate(nitoCC: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCcOrdCompraSLCs();
      for (const nitCC of response.data) {
        if (nitoCC === parseInt(nitCC.codProveedor, 10)) {
          this.transporterObtener(nitCC.expr1);
          this.ordCompraSLMd.plazoDia = nitCC.plazoPactado;
          this.ordCompraSLMd.fechaVenci = moment(this.ordCompraSLMd.fechaMov)
            .add(this.ordCompraSLMd.plazoDia, 'day')
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

  private async addOrdCompraSLSubDt() {
    await this.ordCompraSLSubDtCreate();
    await this.createOrdCompraSLSubDt();
    await this.ordCompraSLSubDt(this.ordCompraSLMd.idConcecutivo);
    await this.countOrdCompraSLSubDt();
  }

  private async upDateOrdCompraSLSubDt() {
    await this.updateordCompraSLSubDtCreate();
    await this.updateOrdCompraSLSubDt();
    await this.ordCompraSLSubDt(this.ordCompraSLMd.idConcecutivo);
    await this.countOrdCompraSLSubDt();
  }

  private async onexitOrdCompraSLSubDt() {
    if (!this.ordCompraSLMd.idConcecutivo) {
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putonExitOrdCompraSLSubDt(
        this.ordCompraSLMd,
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
      this.ordCompraSLMd.iva = Math.round(Number.parseFloat(iva));
      return;
    }
    this.ordCompraSLMd.iva = 0;
  }

  private async countOrdCompraSLSubDt() {
    if (!this.ordCompraSLMd.idConcecutivo) {
      return;
    }
    this.IordCompraSLSubDt.idConcecutivo = this.ordCompraSLMd.idConcecutivo;
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getCountOrdCompraSLDt(
        this.IordCompraSLSubDt.idConcecutivo,
      );
      if (response.data > 0) {
        this.ordCompraSLMd.subtotal = Number.parseFloat(this.subtDesc);
        this.ordCompraSLMd.subtotal = Math.round(this.ordCompraSLMd.subtotal);
        this.ivaOnsubCount(this.tIva);
        this.ordCompraSLMd.totalVenta =
          this.ordCompraSLMd.subtotal + this.ordCompraSLMd.iva;
        this.ordCompraSLMd.valNetoRemi =
          this.ordCompraSLMd.totalVenta - this.ordCompraSLMd.valProdDUsua;
      }
      await this.onexitOrdCompraSLSubDt();
      this.subtotal = this.convertToDecimal(this.ordCompraSLMd.subtotal);
      this.iva = this.convertToDecimal(this.ordCompraSLMd.iva);
      this.totalVenta = this.convertToDecimal(this.ordCompraSLMd.totalVenta);
      this.valNetoRemi = this.convertToDecimal(this.ordCompraSLMd.valNetoRemi);
      this.valProdDUsua = this.convertToDecimal(
        this.ordCompraSLMd.valProdDUsua,
      );
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
        this.showOutput(false, response.message);
      }
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
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async createOrdCompraSLSubDt() {
    if (!this.ordCompraSLMd.idConcecutivo) {
      return;
    }
    this.IordCompraSLSubDt.idConcecutivo = this.ordCompraSLMd.idConcecutivo;
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
    if (!this.ordCompraSLMd.idConcecutivo) {
      return;
    }
    this.IordCompraSLSubDt.idConcecutivo = this.ordCompraSLMd.idConcecutivo;
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
    if (!this.ordCompraSLMd.idConcecutivo) {
      return;
    }
    this.IordCompraSLSubDtEdit.idConcecutivo = this.ordCompraSLMd.idConcecutivo;
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

  private async addOrdCompraSLSubDtUs() {
    await this.createOrdCompraSLSubDtUs();
    await this.ordCompraSLSubDtUs(this.ordCompraSLMd.idConcecutivo);
    await this.countOrdCompraSLSubDtUs();
  }
  private async updateOrdCompraSLSubDtUs() {
    await this.upDataOrdCompraSLSubDtUs();
    await this.ordCompraSLSubDtUs(this.ordCompraSLMd.idConcecutivo);
    await this.countOrdCompraSLSubDtUs();
  }
  private async onexitOrdCompraSLSubDtUs() {
    if (!this.ordCompraSLMd.idConcecutivo) {
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putonExitOrdCompraSLSubDtUs(
        {
          idConcecutivo: this.ordCompraSLMd.idConcecutivo,
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
    if (!this.ordCompraSLMd.idConcecutivo) {
      return;
    }
    this.IordCompraSLSubDtUs.idConcecutivo = this.ordCompraSLMd.idConcecutivo;
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
    if (!this.ordCompraSLMd.idConcecutivo) {
      return;
    }
    this.IordCompraSLSubDtUs.idConcecutivo = this.ordCompraSLMd.idConcecutivo;
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
  private async save() {
    if (this.dateOutLimt()) {
      return;
    }
    if (!this.ordCompraSLMd.nitoCc || this.ordCompraSLMd.nitoCc === null) {
      this.showOutput(true, 'La O.Compra no Tiene Tercero');
      return;
    }
    this.ordCompraSLMd.fecha = moment().utc().format('YYYY-MM-DD');
    this.ordCompraSLMd.estacion = this.$store.getters.getUsuario;
    await this.updateordCompraSLMd(this.ordCompraSLMd.idConcecutivo);
  }
  private async ordCompraSLMdAnular() {
    this.ordCompraSLMd.fecha = this.convertDate(this.ordCompraSLMd.fecha);
    this.ordCompraSLMd.fechaProc = this.convertDate(
      this.ordCompraSLMd.fechaProc,
    );
    this.ordCompraSLMd.fechaVenci = this.convertDate(
      this.ordCompraSLMd.fechaVenci,
    );
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postOrdCompraSLMdAnular(
        this.ordCompraSLMd,
      );
      if (response.status === 200) {
        this.showOutput(false, response.message);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
      this.modalAnular = false;
    } finally {
      this.isLoading = false;
    }
  }
  private async ordCompraSLMdPrint() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postOrdCompraMdPrint(
        this.ordCompraSLMd,
      );

      await this.infcxPdf(this.ordCompraSLMd.idConcecutivo);
      await this.comprocompraSLpdf(this.ordCompraSLMd.idConcecutivo);
      await this.ordcompraSLPdf(this.ordCompraSLMd.idConcecutivo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
  private async updateordCompraSLMd(idCosecutivo: number) {
    console.log(this.ordCompraSLMd);
    this.ordCompraSLMd.fecha = this.convertDate(this.ordCompraSLMd.fecha);
    this.ordCompraSLMd.subtotal = Number.parseFloat(this.subtotal);
    this.ordCompraSLMd.iva = Number.parseFloat(this.iva);
    this.ordCompraSLMd.totalVenta = Number.parseFloat(this.totalVenta);
    this.ordCompraSLMd.valProdDUsua = Number.parseFloat(this.valProdDUsua);
    this.ordCompraSLMd.valNetoRemi = Number.parseFloat(this.valNetoRemi);
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putOrdCompraSLMd(
        idCosecutivo,
        this.ordCompraSLMd,
      );
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
  private async ordCompraSLMdmodify() {
    if (this.dateOutLimt()) {
      return;
    }
    this.ordCompraSLMd.fecha = this.convertDate(this.ordCompraSLMd.fecha);
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postOrdCompraSLMdModify(
        this.ordCompraSLMd,
      );
      if (this.ordCompraSLMd.imprim === 'N') {
        this.desBlock();
        this.decomisosafterupdate();
        this.refDocumet.focus();
        return;
      }
      this.viewModalModify();
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
  private async searchCustomer(skip: number, limt: number) {
    this.isLoading = true;
    try {
      const response =
        await this.guiaSacrificioApi.getBuscarClienteOrdCompraSLMd(skip, limt);
      if (response.data.length === 0 || response.data === null) {
        this.showOutput(true, 'no hay mas datos');
        this.readonlyNext = true;
      }
      this.customerSearch = response.data.map((e: any) => {
        return {
          id: e.IdConcecutivo,
          item: `${e.ConsecTip} - ${e.Tercero} -${this.convertDate(
            e.FechaMov,
          )}`,
        };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
  private async ordCompraSLMdID(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOrdCompraSLMd(id);
      this.ordCompraSLMd = response.data as IOrdCompraSL;
      this.subtotal = this.convertToDecimal(response.data.subtotal);
      this.iva = this.convertToDecimal(response.data.iva);
      this.totalVenta = this.convertToDecimal(response.data.totalVenta);
      this.valProdDUsua = this.convertToDecimal(response.data.valProdDUsua);
      this.valNetoRemi = this.convertToDecimal(response.data.valNetoRemi);
      this.ordCompraSLMd.fechaMov = this.convertDate(response.data.fechaMov);
      this.ordCompraSLMd.fechaVenci = this.convertDate(
        response.data.fechaVenci,
      );
      await this.ordCompraSLSubDt(this.ordCompraSLMd.idConcecutivo);
      await this.ordCompraSLSubDtUs(this.ordCompraSLMd.idConcecutivo);
      this.pgAnulada = false;
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
      this.ordCompraSLMd.consecTip = response.data.consecTip;
      this.ordCompraSLMd.prefijo = response.data.prefijo;
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
  private async nitoCC() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCcOrdCompraSLCs();
      this.nitCC = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.codProveedor };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
  private async nitoCCcod() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCCodOrdCompraSLCs();
      this.nitCCcod = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.nitoCC };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }
  private async nitoCCpp() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCCPPOrdCompraSLCs();
      this.nitCCpp = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.expr2 };
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
