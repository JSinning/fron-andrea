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
          <h1 class="title">Guia de Sacrificio</h1>
        </div>
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <div class="md:w-1 px-5 mb-6 md:mb-0 mt-5">
            <p class="text-andrea font-bold text-2xl">
              {{ validateAnulado(guiSac.anulada) }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex-wrap">
        <div v-if="search" class="flex flex-row flex-wrap mb-3">
          <div class="flex flex-row flex-wrap p-3 w-full justify-end">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Busqueda:</label>
              <PaginatedSelect
                v-model="id"
                :fetch="customerSearch"
                @change="guiasNGuia(id)"
              />
            </div>
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
          <button class="btn-save" @click="anulada">Anular</button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="changeEstado">
            Cambiar Estado
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:btn-save': readonlyRePrint,
            }"
            :disabled="readonlyRePrint"
            @click="rePrint"
          >
            Reimprimir
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="save">Guardar</button>
        </div>
      </div>

      <div class="flex flex-row flex-wrap">
        <div class="mb-6 md:mb-0 mt-2">
          <label class="label px-2">
            <input
              type="checkbox"
              class="checkBox"
              v-model="verfiProgramacion"
            />
            Utiliza Programacion...
          </label>
        </div>
      </div>

      <input type="radio" name="tab" id="program" class="hidden" checked />
      <input type="radio" name="tab" id="datos-basicos-guia" class="hidden" />
      <input type="radio" name="tab" id="peso-anima" class="hidden" />
      <input
        type="radio"
        name="tab"
        id="anular"
        class="hidden"
        v-if="pgAnula"
      />
      <input
        type="radio"
        name="tab"
        id="estado"
        class="hidden"
        v-if="pgMoEstado"
      />

      <div class="mt-2 mb-0 nav">
        <label for="program">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Programacion
          </span>
        </label>

        <label for="datos-basicos-guia">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Datos basicos Guia
          </span>
        </label>
        <label for="peso-anima">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Peso y N° Animales
          </span>
        </label>
        <label for="anular">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="pgAnula"
          >
            Anular
          </span>
        </label>
        <label for="estado">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="pgMoEstado"
          >
            Estado
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-progam">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">N.Programacion:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="nProgramac"
              @change="nProgramationAfterUpdate"
              :disabled="readonlyProgramacion"
            >
              <option
                v-for="(nProgram, index) in nPorgramation"
                :key="index"
                :value="nProgram.id"
              >
                {{ nProgram.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha Programacion:</label>
            <input
              type="number"
              class="input"
              v-model="fechaProgr"
              :readonly="readonlyProgramacion"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Proveedor:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="proveedor"
              :disabled="readonlyProgramacion"
            >
              <option
                v-for="(provedor, index) in supplier"
                :key="index"
                :value="provedor.id"
              >
                {{ provedor.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Finca Procedencia:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="fincaProc"
              :disabled="readonlyProgramacion"
            >
              <option
                v-for="(fincaProg, index) in origin"
                :key="index"
                :value="fincaProg.id"
              >
                {{ fincaProg.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Ciudad:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="ciudad"
              :disabled="readonlyProgramacion"
            >
              <option
                v-for="(ciudad, index) in city"
                :key="index"
                :value="ciudad.id"
              >
                {{ ciudad.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Clase:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="clase1"
              :disabled="readonlyProgramacion"
            >
              <option
                v-for="(clase, index) in clasesProgracion"
                :key="index"
                :value="clase.id"
              >
                {{ clase.id }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Cantidad:</label>
            <input
              type="number"
              class="input"
              v-model="cantidad"
              :readonly="readonlyProgramacion"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha llegada a la Planta:</label>
            <input
              type="date"
              class="input"
              v-model="fechallegplanta"
              :readonly="readonlyProgramacion"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Hora llegada a la Planta:</label>
            <input
              type="time"
              class="input"
              v-model="horallegplanta"
              :readonly="readonlyProgramacion"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha Sacrificio:</label>
            <input
              type="date"
              class="input"
              v-model="fechaSacrif"
              :readonly="readonlyProgramacion"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Hora Sacrificio:</label>
            <input
              type="time"
              class="input"
              v-model="horaSacrif"
              :readonly="readonlyProgramacion"
            />
          </div>
          <div class="md:w-2/3 px-3 mb-6 md:mb-0">
            <label class="label">Peso Programado:</label>
            <input
              type="number"
              class="input"
              v-model="pesoProg"
              :readonly="readonlyProgramacion"
            />
          </div>
          <div class="md:w-4/5 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Tipo Sacrificio:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="tipoSacrif"
              :disabled="readonlyProgramacion"
            >
              <option
                v-for="(tipoSacrif, index) in typeSacri"
                :key="index"
                :value="tipoSacrif.id"
              >
                {{ tipoSacrif.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha Despacho:</label>
            <input
              type="date"
              class="input"
              v-model="fechaDespac"
              :readonly="readonlyProgramacion"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Observaciones</label>
            <textarea
              type="text"
              class="input"
              v-model="observac"
              :readonly="readonlyProgramacion"
            />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-guias">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Guia No:</label>
            <input type="number" class="input" v-model="guiSac.nGuia" />
          </div>
          <div class="md:w-2/5 px-3 mb-6 md:mb-0">
            <label class="label">Tipo:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.esRecepGanado"
              @change="esReceptoAfterUpdate"
            >
              <option
                v-for="(tipoSacrif, index) in typeSacri"
                :key="index"
                :value="tipoSacrif.id"
              >
                {{ tipoSacrif.item }}
              </option>
            </select>
          </div>
          <div class="py-10"></div>
          <div class="md:w-1/4"></div>
          <div class="w-full px-3 py-3 mb-6">
            <label class="label">Proveedor:</label>
            <div class="flex gap-4">
              <PaginatedSelect
                class="flex-auto"
                :fetch="nitTerceros"
                v-model="guiSac.nitTercero"
                @change="nitTercerosID"
                :disabled="readonlyTerceros"
              ></PaginatedSelect>
              <PaginatedSelect
                class="flex-auto"
                v-model="guiSac.nitTercero"
                @change="nitTercerosID"
                :fetch="nitSuppliers"
                :disabled="readonlyTerceros"
              ></PaginatedSelect>
              <PaginatedSelect
                class="flex-auto"
                v-model="guiSac.nitTercero"
                @change="nitTercerosID"
                :fetch="supplierNames"
                :disabled="readonlyTerceros"
              ></PaginatedSelect>
            </div>
          </div>
          <div class="w-full px-3 py-3 mb-6">
            <label class="label">Usuario:</label>
            <div class="flex gap-4">
              <PaginatedSelect
                class="flex-auto"
                v-model="guiSac.nitTercero"
                @change="nitCCppUsersID"
                :fetch="nitcc"
                :disabled="readonlyNitCC"
              ></PaginatedSelect>
              <PaginatedSelect
                class="flex-auto"
                v-model="guiSac.nitTercero"
                @change="nitCCppUsersID"
                :fetch="nitcccod"
                :disabled="readonlyNitCC"
              ></PaginatedSelect>
              <PaginatedSelect
                class="flex-auto"
                v-model="guiSac.nitTercero"
                @change="nitCCppUsersID"
                :fetch="nitccpp"
                :disabled="readonlyNitCC"
              ></PaginatedSelect>
            </div>
          </div>
          <div class="py-10"></div>
          <div class="md:w-3/4 px-3 mb-6 md:mb-0">
            <label class="label">Transportador:</label>
            <input type="text" class="input" v-model="guiSac.transportador" />
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Lic.Ica:</label>
            <input type="number" class="input" v-model="guiSac.lIca" />
          </div>
          <div class="w-full px-3 mb-6 md:mb-0 flex gap-4">
            <div class="w-3/4">
              <label class="label">Conductor:</label>
              <div class="flex gap-4">
                <PaginatedSelect
                  class="flex-1 text-xs"
                  v-model="guiSac.conductor"
                  @change="driversCodID"
                  :fetch="driversCod"
                />
                <PaginatedSelect
                  class="flex-1 text-xs"
                  v-model="guiSac.conductor"
                  @change="driversCodID"
                  :fetch="driversName"
                />
              </div>
            </div>
            <div class="w-1/4">
              <label class="label">Placa:</label>
              <input type="text" class="input" v-model="guiSac.placaVeh" />
            </div>
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Hora y Fecha del Pesaje:</label>
            <input type="time" class="input" v-model="guiSac.horaPesaje" />
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <input type="date" class="input" v-model="guiSac.fechaPes" />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Hora y Fecha Salida Finca:</label>
            <input type="time" class="input" v-model="guiSac.horaSFinca" />
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <input type="date" class="input" v-model="guiSac.fechaSFinca" />
          </div>
          <div class="md:w-full px-3 py-2 mb-6 md:mb-0"></div>
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label font-bold text-base">Clasificacion:</label>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Clase:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.clase"
            >
              <option
                v-for="(claseCod, index) in clase"
                :key="index"
                :value="claseCod.id"
              >
                {{ claseCod.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.clase"
            >
              <option
                v-for="(claseDes, index) in claseDescripcion"
                :key="index"
                :value="claseDes.id"
              >
                {{ claseDes.item }}
              </option>
            </select>
          </div>

          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Sexo:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.sexo"
            >
              <option v-for="(sex, index) in sexo" :key="index" :value="sex.id">
                {{ sex.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.sexo"
            >
              <option
                v-for="(sexDes, index) in sexoDescripcion"
                :key="index"
                :value="sexDes.id"
              >
                {{ sexDes.item }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-peso-anima">
        <div class="flex flex-row flex-wrap">
          <div class="card w-full flex flex-row flex-wrap">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label font-bold text-base">Datos del Peso:</label>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Total Bruto:</label>
              <input
                type="number"
                class="input"
                v-model="pesEntra"
                @change="pesEntraSaliAfterUpdate"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Tara:</label>
              <input
                type="number"
                class="input"
                v-model="pesSali"
                @change="pesEntraSaliAfterUpdate"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">No Animales Licencia :</label>
              <input
                type="number"
                class="input"
                v-model="guiSac.noAnimalesLic"
                @change="noAnimalesLicAfterUpdate"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Procedencia(Ciudad):</label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="guiSac.procedencia"
              >
                <option
                  v-for="(procedencia, index) in ciudades"
                  :key="index"
                  :value="procedencia.id"
                >
                  {{ procedencia.item }}
                </option>
              </select>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Total Kilos de Peso :</label>
              <input
                type="number"
                class="input"
                v-model="totalKilosP"
                @change="totalKilPAfterUpdate"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Peso Promedio:</label>
              <input type="number" class="input" v-model="pesoPromedio" />
            </div>
          </div>
          <div class="md:w-full px-3 py-2 mb-6 md:mb-0"></div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Peso en Finca::</label>
            <input type="number" class="input" v-model="guiSac.pesoProgram" />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Lote Usuario:</label>
            <input type="text" class="input" v-model="guiSac.loteUs" />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Nº Compra Usuario:</label>
            <input type="text" class="input" v-model="guiSac.docum" />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Finca:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.finca"
            >
              <option
                v-for="(fincas, index) in finca"
                :key="index"
                :value="fincas.id"
              >
                {{ fincas.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.finca"
            >
              <option
                v-for="(fincasD, index) in fincaDesC"
                :key="index"
                :value="fincasD.id"
              >
                {{ fincasD.item }}
              </option>
            </select>
          </div>
          <div class="md:w-2/3 px-3 mb-6 md:mb-0">
            <label class="label">Elaboro :</label>
            <input type="number" class="input" v-model="guiSac.elaboro" />
          </div>
          <div class="md:w-2/3 px-3 mb-6 md:mb-0">
            <label class="label">Observacion:</label>
            <input type="text" class="input" v-model="guiSac.observacion" />
          </div>
          <div class="w-full"></div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Tiquete</label>
            <input type="text" class="input" v-model="tiquete" />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">T.Vehiculo:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.tipoVeh"
            >
              <option
                v-for="(tipoVeh, index) in typeVeh"
                :key="index"
                :value="tipoVeh.id"
              >
                {{ tipoVeh.item }}
              </option>
            </select>
          </div>
          <div class="w-full"></div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Lote No :</label>
            <input
              type="text"
              class="input"
              v-model="guiSac.nLote"
              :readonly="readonlyNLote"
            />
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <button class="btn-save" @click="validateNumLote">
              Generar Numero Lote
            </button>
          </div>
          <div class="md:w-1/4 px-0 mb-6 md:mb-0">
            <button class="btn-save" @click="onPrint">
              Imprimir Documento
            </button>
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-anular" v-if="pgAnula">
        <div class="flex flex-row flex-wrap">
          <div class="flex flex-col flex-wrap">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label px-2">
                <input
                  type="checkbox"
                  class="checkBox"
                  v-model="guiSac.anulada"
                />
                Anulado
              </label>
            </div>
            <div class="md:w-full px-3 py-2 mb-6 md:mb-0">
              <label class="label">Motivo:</label>
              <input type="number" class="input" v-model="guiSac.motivoAnula" />
            </div>
            <div class="w-full"></div>
            <div class="md:w-1/2 px-3 py-2 ml-6 mb-6 md:mb-0">
              <button class="btn-save p-2" @click="viewModalAnular">
                Anular
              </button>
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
                v-model="guiSac.estado"
              >
                <option
                  v-for="(estado, index) in estate"
                  :key="index"
                  :value="estado.id"
                >
                  {{ estado.item }}
                </option>
              </select>
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Motivo Estado:</label>
              <input type="text" class="input" v-model="guiSac.motivoEstado" />
            </div>
            <div class="md:w-full md:ml-0 px-3 mb-6 md:mb-0">
              <button class="btn-save p-2" @click="viewModalEstado">
                Cambiar Estado
              </button>
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Estado:</label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="estado1"
              >
                <option
                  v-for="(estado, index) in estate"
                  :key="index"
                  :value="estado.id"
                >
                  {{ estado.item }}
                </option>
              </select>
            </div>
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label">Motivo Estado:</label>
              <input type="text" class="input" v-model="estado1" />
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div class="flex flex-row flex-wrap py-2">
        <div class="md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="label">Estado:</label>
          <select
            class="bg-white border py-1 pr-2 select"
            v-model="guiSac.estado"
          >
            <option
              v-for="(estado, index) in estate"
              :key="index"
              :value="estado.id"
            >
              {{ estado.item }}
            </option>
          </select>
        </div>
        <div class="md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="label">Guia N°:</label>
          <input type="number" class="input" v-model="guiSac.nGuia" />
        </div>
        <div class="md:w-1/3 px-1 mb-6 md:mb-0">
          <label class="label py-2"></label>
          <select
            class="bg-white border py-1 pr-2 select"
            v-model="guiSac.nitTercero"
          >
            <option
              v-for="(consultTercero, index) in nitTerceroConsult"
              :key="index"
              :value="consultTercero.id"
            >
              {{ consultTercero.item }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <hr />

    <!-- Modal Anular -->
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
    <!-- End Modal Anular -->

    <!-- Modal Estado -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="modalEstado"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8; Va a Cambiar el Estado del Documento</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-succes" @click="acceptModalEstado()">
                    Si
                  </button>
                </div>
                <div
                  class="rounded bg-red-700 border border-andrea text-white px-3 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-danger" @click="closeModalEstado()">
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal Estado -->

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
import '../../assets/tab.css';
import { IGuiaSacrifico } from '@/remote/api/guia_sacrificio/type';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import * as Sentry from '@sentry/browser';
import moment from 'moment';
import Select from '@/components/reusable/select.vue';
import IPagination from '@/types/IPagination';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import PaginatedSelectGroup from '@/components/reusable/PaginatedSelectGroup.vue';
import PaginatedSelectGroupItem from '@/components/reusable/PaginatedSelectGroupItem.vue';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';
import { ICliente } from '@/remote/api/guia_sacrificio/type/Cliente';
import { Proveedores } from '@/remote/api/guia_sacrificio/type/Proveedor';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
    PaginatedSelectGroup,
    PaginatedSelectGroupItem,
    Select,
  },
  name: 'GuiaSacMod',
})
export default class GuiaSacMod extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private search: boolean = false;
  private readonlyProgramacion: boolean = false;
  private readonlyTerceros: boolean = false;
  private readonlyRePrint: boolean = false;
  private readonlyNLote: boolean = false;
  private readonlyNitCC: boolean = false;
  private verfiProgramacion: boolean = false;
  private modalAnular: boolean = false;
  private modalEstado: boolean = false;
  private pgAnula: boolean = false;
  private pgMoEstado: boolean = false;
  private anula: boolean = false;
  private estado1: string = '';
  private motiEstado1: string = '';

  private id: number = 0;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private nProgramac: number = 0;
  private fechaProgr: string = '';
  private proveedor: string = '';
  private fincaProc: string = '';
  private ciudad: string = '';
  private clase1: string = '';
  private cantidad: string = '';
  private fechallegplanta: string = '';
  private horallegplanta: string = '';
  private fechaSacrif: string = '';
  private horaSacrif: string = '';
  private tipoSacrif: string = '';
  private fechaDespac: string = '';
  private observac: string = '';
  private pesoProg: string = '';
  private pesEntra: string = '';
  private pesSali: string = '';
  private totalKilosP: string = '';
  private pesoPromedio: string = '';
  private tiquete: string = '';
  private duplicaI: string = '';

  private itemNPrograc: any = [];
  private nPorgramation: IInterfaceSelect[] = [];
  private supplier: IInterfaceSelect[] = [];
  private origin: IInterfaceSelect[] = [];
  private city: IInterfaceSelect[] = [];
  private clasesProgracion: IInterfaceSelect[] = [];
  private typeSacri: IInterfaceSelect[] = [];
  private clase: IInterfaceSelect[] = [];
  private claseDescripcion: IInterfaceSelect[] = [];
  private sexo: IInterfaceSelect[] = [];
  private sexoDescripcion: IInterfaceSelect[] = [];
  private ciudades: IInterfaceSelect[] = [];
  private typeVeh: IInterfaceSelect[] = [];
  private finca: IInterfaceSelect[] = [];
  private fincaDesC: IInterfaceSelect[] = [];
  private estate: IInterfaceSelect[] = [];
  private nitTerceroConsult: IInterfaceSelect[] = [];

  private guiSac: IGuiaSacrifico = {
    actualizaW: false,
    anulada: false,
    clase: 0,
    commUt: '',
    commUt2: '',
    conductor: '',
    confirma: false,
    docum: '',
    elaboro: '',
    esRecepGanado: 0,
    estado: '',
    fecha: '',
    fechaPes: '',
    fechaSFinca: '',
    finca: '',
    horaPesaje: '',
    horaSFinca: '',
    idConcecutiv: '',
    idEmpresa: 0,
    imprime: 'N',
    lIca: '',
    loteUs: '',
    motivoAnula: '',
    motivoEstado: '',
    nGuia: 0,
    nLote: 0,
    nLoteSub: 0,
    nProgramac: 0,
    nSubasta: 0,
    nitTercero: '',
    noAnimales: 0,
    noAnimalesLic: 0,
    observacion: '',
    pesEntra: 0,
    pesSali: 0,
    pesoProgram: 0,
    pesoPromedio: 0,
    placaVeh: '',
    procedencia: '',
    sexo: 0,
    tipoVeh: 0,
    tiquete: 0,
    totalKilosP: 0,
    transportador: '',
    usuario: '',
  };

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );
  private guiaSacrificioReports = new ReportesGuiaSacrificio(
    this.$store.getters.getAuthToken,
  );

  private async mounted() {
    this.typeSacrificio();
    this.estates();
    await this.openForm();
    await this.nPorgramitions();
    await this.suppliers();
    await this.origns();
    await this.cities();
    await this.classes();
    await this.clases();
    await this.claseDescrip();
    await this.sex();
    await this.sexDescrip();
    await this.ciudadesProce();
    await this.fincas();
    await this.fincasDescrip();
    await this.tipoVeh();
    await this.nitTerceroConsults();
  }

  private clearOutput() {
    this.output = '';
  }

  private viewModalAnular() {
    this.modalAnular = true;
  }

  private viewModalEstado() {
    this.modalEstado = true;
  }

  private closeModalAnular() {
    this.modalAnular = false;
  }

  private closeModalEstado() {
    this.modalEstado = false;
  }

  private acceptModalEstado() {
    if (!this.estado1 || this.estado1 === null) {
      this.showOutput(true, 'Para Cambiar el Estado debe escoger uno');
      return;
    }

    if (!this.motiEstado1 || this.motiEstado1 === null) {
      this.showOutput(true, 'Para Cambiar el Estado debe digitar el motivo');
      return;
    }
    this.estado();

    this.pgMoEstado = false;
  }

  private estado() {
    this.guiSac.estado = this.estado1;
    this.guiSac.motivoEstado = this.motiEstado1;
    this.guiSac.usuario = this.$store.getters.getUsuario;
    this.guiSac.fecha = moment().utc().format('YYYY-MM-DD');
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
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

  private zeroLent(dato: number, len: number) {
    len -= dato.toString().length;
    if (len > 0) {
      return (
        new Array(len + (/\./.test(dato.toString()) ? 2 : 1)).join('0') + dato
      );
    }
    return `${dato} `; // siempre devuelve tipo cadena
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private validateAnulado(anulado: boolean) {
    return anulado ? 'Anulado' : '';
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

  private typeSacrificio() {
    this.typeSacri.push(
      { id: 1, item: 'Sacrificio Local' },
      { id: 2, item: 'Sacrificio Nacional' },
      { id: 3, item: 'Sacrificio Propio' },
    );
  }

  private pesEntraSaliAfterUpdate() {
    if (!this.pesEntra || Number.parseFloat(this.pesEntra) === 0) {
      return;
    }

    this.totalKilosP = this.convertToDecimal(
      Number.parseFloat(this.pesEntra) - Number.parseFloat(this.pesSali),
    );

    if (this.guiSac.noAnimales !== 0) {
      this.pesoPromedio = this.convertToDecimal(
        Number.parseFloat(this.totalKilosP) / this.guiSac.noAnimales,
      );
    }
  }

  private changeEstado() {
    if (
      this.guiSac.fechaPes < this.$store.getters.getTConfinv1.fechaProc1 ||
      this.guiSac.fechaPes > this.$store.getters.getTConfinv1.fechaProc2
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }

    if (!this.guiSac.anulada) {
      this.pgMoEstado = true;
      this.estado1 = this.guiSac.estado;
      this.motiEstado1 = this.guiSac.motivoEstado;
      return;
    }
    this.showOutput(false, 'Documento Anulado');
  }

  private anulada() {
    if (
      this.guiSac.fechaPes < this.$store.getters.getTConfinv1.fechaProc1 ||
      this.guiSac.fechaPes > this.$store.getters.getTConfinv1.fechaProc2
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }

    if (!this.guiSac.anulada) {
      this.pgAnula = true;
      this.anula = false;
      return;
    }
    this.showOutput(false, 'Documento Anulado');
  }

  private noAnimalesLicAfterUpdate() {
    if (!this.guiSac.noAnimales || this.guiSac.noAnimales === 0) {
      return;
    }

    this.pesoPromedio = this.convertToDecimal(
      Number.parseFloat(this.totalKilosP) / this.guiSac.noAnimales,
    );
  }

  private totalKilPAfterUpdate() {
    if (!this.guiSac.noAnimales || this.guiSac.noAnimales === 0) {
      return;
    }

    this.pesoPromedio = this.convertToDecimal(
      Number.parseFloat(this.totalKilosP) / this.guiSac.noAnimales,
    );
  }

  private esReceptoAfterUpdate() {
    if (this.guiSac.nLote > 0) {
      this.showOutput(true, 'Ya se Genero El Lote, No se puede Modificar Tipo');
      return;
    }

    if (this.guiSac.esRecepGanado === 3) {
      this.readonlyTerceros = true;
      this.readonlyRePrint = true;
      this.readonlyNLote = true;
      this.readonlyNitCC = false;
      return;
    }

    if (this.guiSac.esRecepGanado === 2) {
      this.readonlyTerceros = false;
      this.readonlyRePrint = false;
      this.readonlyNLote = false;
      this.readonlyNitCC = true;
      return;
    }

    this.readonlyTerceros = false;
    this.readonlyRePrint = false;
    this.readonlyNLote = false;
    this.readonlyNitCC = true;
  }

  private async rePrint() {
    if (this.guiSac.imprime === 'N') {
      this.showOutput(true, 'Utilize la opcion Imprimir Documento');
      return;
    }

    this.guiSac.anulada
      ? (this.duplicaI = 'ANULADA')
      : (this.duplicaI = 'DUPLICADO');

    await this.guiaSacrifioPdf(this.guiSac.nGuia);
  }

  private validatePrint() {
    if (this.guiSac.imprime === 'S') {
      this.showOutput(true, 'Utilize la opcion Reimprimir');
      return true;
    }

    if (!this.guiSac.nitTercero || this.guiSac.nitTercero === null) {
      this.showOutput(true, 'Debe Escoger un Tercero');
      return true;
    }

    if (!this.guiSac.finca || this.guiSac.finca === null) {
      this.showOutput(true, 'Debe Digitar la Finca');
      return true;
    }

    if (!this.guiSac.procedencia || this.guiSac.procedencia === null) {
      this.showOutput(true, 'Debe Digitar la Procedencia');
      return true;
    }

    if (this.guiSac.clase === 0) {
      this.showOutput(true, 'Debe digitar la Clase');
      return true;
    }

    return false;
  }

  private validation() {
    if (
      this.guiSac.fechaPes < this.$store.getters.getTConfinv1.fechaProc1 ||
      this.guiSac.fechaPes > this.$store.getters.getTConfinv1.fechaProc2
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }

    if (this.guiSac.anulada) {
      this.showOutput(true, 'Documento Anulado');
      return true;
    }

    return false;
  }

  private validationUpdate() {
    if (
      this.guiSac.fechaPes < this.$store.getters.getTConfinv1.fechaProc1 ||
      this.guiSac.fechaPes > this.$store.getters.getTConfinv1.fechaProc2
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }

    if (!this.guiSac.nitTercero) {
      this.showOutput(true, 'La Guia no Tiene Tercero');
      return true;
    }

    if (!this.guiSac.horaSFinca) {
      this.showOutput(true, 'La hora Salida de Finca no puede ser Nulo');
      return true;
    }

    if (!this.verfiProgramacion) {
      if (this.nProgramac === 0) {
        this.showOutput(true, 'La Guia no Tiene Nº Programacion');
        return true;
      }
    }

    if (this.nProgramac !== 0) {
      this.showOutput(true, 'La Guia Tiene Nº Programacion debe ser Cero');
      return true;
    }

    return false;
  }

  private nProgramationAfterUpdate() {
    this.fechaProgr = this.convertDate(this.itemNPrograc[0].fechaProgr);
    this.proveedor = this.itemNPrograc[0].proveedor;
    this.fincaProc = this.itemNPrograc[0].fincaProc;
    this.ciudad = this.itemNPrograc[0].ciudad;
    this.clase1 = this.itemNPrograc[0].clase;
    this.cantidad = this.itemNPrograc[0].cantidad;
    this.fechallegplanta = this.convertDate(
      this.itemNPrograc[0].fechallegplanta,
    );
    this.horallegplanta = this.convertHoras(
      this.itemNPrograc[0].horallegplanta,
    );
    this.fechaSacrif = this.convertDate(this.itemNPrograc[0].fechaSacrif);
    this.horaSacrif = this.convertHoras(this.itemNPrograc[0].horaSacrif);
    this.tipoSacrif = this.itemNPrograc[0].tipoSacrif;
    this.fechaDespac = this.convertDate(this.itemNPrograc[0].fechaDespac);
    this.observac = this.itemNPrograc[0].observac;
    this.pesoProg = this.itemNPrograc[0].pesoProgram;

    this.guiSac.nitTercero = this.proveedor;
    this.guiSac.finca = this.fincaProc;
    this.guiSac.procedencia = this.ciudad;
    this.guiSac.clase = Number.parseInt(this.clase1, 10);
    this.guiSac.esRecepGanado = Number.parseInt(this.tipoSacrif, 10);
    this.guiSac.pesoProgram = Number.parseFloat(this.pesoProg);
  }

  private async nPorgramitions() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNProgramacion();
      this.nPorgramation = response.data.map((e: any) => {
        return { id: e.nProgramac, item: e.Expr1 };
      });
      this.itemNPrograc = response.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async suppliers() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getProveedor();
      this.supplier = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.expr1 };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async origns() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getProcedencia();
      this.origin = response.data.map((e: any) => {
        return { id: e.idFinca, item: e.descripcionFin };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async cities() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getCiudades();
      this.city = response.data.map((e: any) => {
        return { id: e.idCiudad, item: e.descripcionCiu };
      });
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
      const response = await this.guiaSacrificioApi.getClases();
      this.clasesProgracion = response.data.map((e: any) => {
        return { id: e.idClase, item: e.descripcionCla };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitTercerosID() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitTerceroID(
        this.guiSac.nitTercero,
      );
      this.guiSac.transportador = `${response.data.nombresC} ${response.data.apellidosC}`;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitCCppUsersID() {
    this.isLoading = true;
    try {
      await this.guiaSacrificioApi.getNitCCID(this.guiSac.nitTercero);
      await this.guiaSacrificioApi.getNitCCodID(this.guiSac.nitTercero);
      await this.guiaSacrificioApi.getNitCCppID(this.guiSac.nitTercero);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async driversCodID() {
    this.isLoading = true;
    try {
      await this.guiaSacrificioApi.getConductorNameID(this.guiSac.conductor);
      const response = await this.guiaSacrificioApi.getConductorCodID(
        this.guiSac.conductor,
      );
      this.guiSac.placaVeh = response.data.placaV;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async clases() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getClase();
      this.clase = response.data.map((e: any) => {
        return { id: e.idClase, item: e.idClase };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async claseDescrip() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getClaseDescripcion();
      this.claseDescripcion = response.data.map((e: any) => {
        return { id: e.idClase, item: e.descripcionCla };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async sex() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getSexo();
      this.sexo = response.data.map((e: any) => {
        return { id: e.idSexo, item: e.idSexo };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async sexDescrip() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getSexoDescripcion();
      this.sexoDescripcion = response.data.map((e: any) => {
        return { id: e.idSexo, item: e.descripcionSex };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ciudadesProce() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getCiudad();
      this.ciudades = response.data.map((e: any) => {
        return { id: e.idCiudad, item: e.descripcionCiu };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async fincas() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getFinca();
      this.finca = response.data.map((e: any) => {
        return { id: e.idFinca, item: e.idFinca };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async fincasDescrip() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getFincaDescrip();
      this.fincaDesC = response.data.map((e: any) => {
        return { id: e.idFinca, item: e.descripcionFin };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async tipoVeh() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getTipoVeh();
      this.typeVeh = response.data.map((e: any) => {
        return { id: e.idTipo, item: e.descripTipo };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitTerceroConsults() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitTerceroConsulta();
      this.nitTerceroConsult = response.data.map((e: any) => {
        return { id: e.CodProveedor, item: e.Expr1 };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async acceptModalAnular() {
    await this.anular();
  }

  private async openForm() {
    this.verfiProgramacion = true;
    this.nProgramac === 0
      ? (this.readonlyProgramacion = true)
      : (this.readonlyProgramacion = false);
    this.fechaProgr = '';
    this.proveedor = '';
    this.fincaProc = '';
    this.ciudad = '';
    this.clase1 = '';
    this.cantidad = '';
    this.fechallegplanta = '';
    this.horallegplanta = '';
    this.fechaSacrif = '';
    this.horaSacrif = '';
    this.tipoSacrif = '';
    this.fechaDespac = '';
    this.observac = '';

    await this.openLoad();
  }

  private async openLoad() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getOnLoad(this.nProgramac);
      if (response.data === null) {
        return;
      }
      this.fechaProgr = this.convertDate(response.data.fechaProgr);
      this.proveedor = response.data.proveedor;
      this.fincaProc = response.data.fincaProc;
      this.ciudad = response.data.ciudad;
      this.clase1 = response.data.clase;
      this.cantidad = response.data.cantidad;
      this.fechallegplanta = this.convertDate(response.data.fechallegplanta);
      this.horallegplanta = this.convertHoras(response.data.horallegplanta);
      this.fechaSacrif = this.convertDate(response.data.fechaSacrif);
      this.horaSacrif = this.convertHoras(response.data.horaSacrif);
      this.tipoSacrif = response.data.tipoSacrif;
      this.fechaDespac = this.convertDate(response.data.fechaDespac);
      this.observac = response.data.observac;
      this.pesoProg = response.data.pesoProgram;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async guiasNGuia(nGuia: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getGuiasToNGuia(nGuia);
      this.guiSac = response.data as IGuiaSacrifico;
      this.guiSac.horaPesaje = this.convertHoras(this.guiSac.horaPesaje);
      this.guiSac.horaSFinca = this.convertHoras(this.guiSac.horaSFinca);
      this.guiSac.fechaPes = this.convertDate(this.guiSac.fechaPes);
      this.guiSac.fechaSFinca = this.convertDate(this.guiSac.fechaSFinca);
      this.pesEntra = this.convertToDecimal(this.guiSac.pesEntra);
      this.pesSali = this.convertToDecimal(this.guiSac.pesSali);
      this.totalKilosP = this.convertToDecimal(this.guiSac.totalKilosP);
      this.pesoPromedio = this.convertToDecimal(this.guiSac.pesoPromedio);
      this.tiquete = this.zeroLent(this.guiSac.tiquete, 3);

      if (this.guiSac.anulada) {
        this.showOutput(true, 'Movimiento Anulado');
        return;
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async anular() {
    const confInv1: object = {
      comprobanG: this.$store.getters.getTConfinv1.comprobanG,
      enviaTerc: this.$store.getters.getTConfinv1.enviaTerc,
      envioAut: this.$store.getters.getTConfinv1.envioAut,
      idEmpresa: this.$store.getters.getTConfinv1.idEmpresa,
    };
    this.isLoading = true;
    try {
      await this.guiaSacrificioApi.putAnular({
        config: confInv1,
        me: this.guiSac,
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async onPrint() {
    const confInv1: object = {
      comprobanG: this.$store.getters.getTConfinv1.comprobanG,
      enviaTerc: this.$store.getters.getTConfinv1.enviaTerc,
      envioAut: this.$store.getters.getTConfinv1.envioAut,
      idEmpresa: this.$store.getters.getTConfinv1.idEmpresa,
    };

    if (this.validatePrint()) {
      return;
    }

    this.guiSac.anulada
      ? (this.duplicaI = 'ANULADA')
      : (this.duplicaI = 'DUPLICADO');

    this.guiSac.imprime = 'S';

    await this.guiaSacrifioEtiPdf(this.guiSac.nGuia);

    this.isLoading = true;
    try {
      await this.guiaSacrificioApi.postModSPPrint({
        config: confInv1,
        me: this.guiSac,
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async validateNumLote() {
    const confInv1: object = {
      gLote: this.$store.getters.getTConfinv1.gLote,
    };
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postValidatNumeroLote({
        config: confInv1,
        data: this.guiSac,
      });

      if (response.statusCode === 200) {
        await this.crearNumLote();
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async crearNumLote() {
    const confInv1: object = {
      diasPred: this.$store.getters.getTConfinv1.diasPred,
      gLote: this.$store.getters.getTConfinv1.gLote,
      retefPred: this.$store.getters.getTConfinv1.retefPred,
    };
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postModNumeroLote({
        config: confInv1,
        me: this.guiSac,
      });

      this.guiSac.nLote = response.data.nLote;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async modify() {
    if (this.validation()) {
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putModify(this.guiSac);

      if (!response.data) {
        return;
      }

      this.guiSac.imprime = response.data.imprime;
      this.guiSac.noAnimales = response.data.noAnimales;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async afterForm() {
    if (this.validation()) {
      return;
    }
    this.isLoading = true;
    try {
      await this.guiaSacrificioApi.putAfterForm(this.nProgramac);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async save() {
    if (this.validationUpdate()) {
      return;
    }
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.putGuiaSac(
        this.guiSac.nGuia,
        this.guiSac,
      );

      if (response.statusCode === 200) {
        await this.afterForm();
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async customerSearch(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        NGuia: number;
        Expr1: string;
        FechaPes: string;
      }>
    >;
    if (q.query) {
      response = await this.guiaSacrificioApi.getGuiaModBuscarClientesFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.NGuia,
          item: `${e.NGuia} - ${e.Expr1} - ${this.convertDate(e.FechaPes)}`,
        };
      });
    }
    response = await this.guiaSacrificioApi.getGuiaModBuscarClientes(p);
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.NGuia,
        item: `${e.NGuia} - ${e.Expr1} - ${this.convertDate(e.FechaPes)}`,
      };
    });
  }

  private async nitcc(pag?: IPagination, q?: IQuery) {
    let result: BaseResponse<Array<Partial<ICliente>>>;
    if (q.query) {
      result = await this.guiaSacrificioApi.getNitCCFind(q);
      return result.data.map<IInterfaceSelect>((d) => ({
        id: d.codiCliente,
        item: d.codiCliente,
      }));
    }
    result = await this.guiaSacrificioApi.getNitCC(pag);
    return result.data.map<IInterfaceSelect>((d) => ({
      id: d.codiCliente,
      item: d.codiCliente,
    }));
  }

  private async nitcccod(pag: IPagination) {
    const result = await this.guiaSacrificioApi.getNitCCCod(pag);
    return result.data.map<IInterfaceSelect>((d) => ({
      id: d.codiCliente,
      item: d.nitCliente,
    }));
  }

  private async nitccpp(pag?: IPagination, q?: IQuery) {
    let result: BaseResponse<Array<Partial<ICliente>>>;
    if (q.query) {
      result = await this.guiaSacrificioApi.getNitCCppFind(q);
      return result.data.map<IInterfaceSelect>((d) => ({
        id: d.codiCliente,
        item: d.expr2,
      }));
    }
    result = await this.guiaSacrificioApi.getNitCCpp(pag);
    return result.data.map<IInterfaceSelect>((d) => ({
      id: d.codiCliente,
      item: d.expr2,
    }));
  }

  private async nitTerceros(pag?: IPagination, q?: IQuery) {
    let response: BaseResponse<Proveedores>;
    if (q.query) {
      response = await this.guiaSacrificioApi.getNitTercerosFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return { id: e.codProveedor, item: e.expr1 };
      });
    }
    response = await this.guiaSacrificioApi.getNitTerceros(pag);
    return response.data.map<IInterfaceSelect>((e) => {
      return { id: e.codProveedor, item: e.expr1 };
    });
  }

  private async nitSuppliers(pag?: IPagination, q?: IQuery) {
    let response: BaseResponse<Proveedores>;
    if (q.query) {
      response = await this.guiaSacrificioApi.getNitTercerosFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return { id: e.codProveedor, item: e.nitoCC };
      });
    }
    response = await this.guiaSacrificioApi.getNitTerceros(pag);
    return response.data.map<IInterfaceSelect>((e) => {
      return { id: e.codProveedor, item: e.nitoCC };
    });
  }

  private async supplierNames(pag?: IPagination, q?: IQuery) {
    let response: BaseResponse<Proveedores>;
    if (q.query) {
      response = await this.guiaSacrificioApi.getNombreProveedorFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return { id: e.codProveedor, item: e.expr2 };
      });
    }
    response = await this.guiaSacrificioApi.getNombreProveedor(pag);
    return response.data.map<IInterfaceSelect>((e) => {
      return { id: e.codProveedor, item: e.expr2 };
    });
  }

  private async driversCod(pag?: IPagination, q?: IQuery) {
    let response: BaseResponse<Proveedores>;
    if (q.query) {
      response = await this.guiaSacrificioApi.getConductorCodFind(q);
      return response.data.map((e: any) => {
        return { id: e.nitConduc, item: e.nitConduc };
      });
    }
    response = await this.guiaSacrificioApi.getConductorCod(pag);
    return response.data.map((e: any) => {
      return { id: e.nitConduc, item: e.nitConduc };
    });
  }

  private async driversName(pag?: IPagination, q?: IQuery) {
    let response: BaseResponse<Proveedores>;
    if (q.query) {
      response = await this.guiaSacrificioApi.getConductorNameFind(q);
      return response.data.map((e: any) => {
        return { id: e.nitConduc, item: e.nombreCond };
      });
    }
    response = await this.guiaSacrificioApi.getConductorName(pag);
    return response.data.map((e: any) => {
      return { id: e.nitConduc, item: e.nombreCond };
    });
  }

  private async guiaSacrifioPdf(nGuia: number) {
    try {
      this.isLoading = true;
      const pdf2 = await this.guiaSacrificioReports.getGuiaSacrificoPDF(nGuia);
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async guiaSacrifioEtiPdf(nGuia: number) {
    try {
      this.isLoading = true;
      const pdf2 =
        await this.guiaSacrificioReports.getGuiaSacrificioEtiPDF(nGuia);
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
