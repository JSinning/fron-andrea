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
                @change="guiaSacCons(id)"
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
          <button class="btn-primary" @click="rePrint">Reimprimir</button>
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
      <input type="radio" name="tab" id="anular" class="hidden" />
      <input type="radio" name="tab" id="estado" class="hidden" />

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
          >
            Anular
          </span>
        </label>
        <label for="estado">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
          >
            Estado
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-progam">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">N.Programacion:</label>
            <input
              type="number"
              class="input"
              v-model="nPogramac"
              :readonly="readonlyProgramacion"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Fecha Programacion:</label>
            <input
              type="date"
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
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Proveedor:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.nitTercero"
            >
              <option
                v-for="(tercero, index) in nitTercero"
                :key="index"
                :value="tercero.id"
              >
                {{ tercero.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.nitTercero"
            >
              <option
                v-for="(nitProveedo, index) in nitSupplier"
                :key="index"
                :value="nitProveedo.id"
              >
                {{ nitProveedo.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.nitTercero"
            >
              <option
                v-for="(nameProveedo, index) in nameSupplier"
                :key="index"
                :value="nameProveedo.id"
              >
                {{ nameProveedo.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Usuario:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.nitTercero"
            >
              <option
                v-for="(nitUser, index) in nitCC"
                :key="index"
                :value="nitUser.id"
              >
                {{ nitUser.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.nitTercero"
            >
              <option
                v-for="(nitcodUser, index) in nitCCcod"
                :key="index"
                :value="nitcodUser.id"
              >
                {{ nitcodUser.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.nitTercero"
            >
              <option
                v-for="(nitppUser, index) in nitCCpp"
                :key="index"
                :value="nitppUser.id"
              >
                {{ nitppUser.item }}
              </option>
            </select>
          </div>
          <div class="py-10"></div>
          <div class="md:w-3/4 px-3 mb-6 md:mb-0">
            <label class="label">Transportador:</label>
            <input type="number" class="input" v-model="guiSac.transportador" />
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Lic.Ica:</label>
            <input type="number" class="input" v-model="guiSac.lIca" />
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Conductor:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.conductor"
            >
              <option
                v-for="(driver, index) in driverCod"
                :key="index"
                :value="driver.id"
              >
                {{ driver.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiSac.conductor"
            >
              <option
                v-for="(driveName, index) in driverName"
                :key="index"
                :value="driveName.id"
              >
                {{ driveName.item }}
              </option>
            </select>
          </div>
          <div class="md:w-1/5 px-3 mb-6 md:mb-0">
            <label class="label">Placa:</label>
            <input type="text" class="input" v-model="guiSac.placaVeh" />
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
            <label class="label font-bold text-base">clasificacion:</label>
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

      <div class="card mt-0 pt-3 hidden px-10 tab-peso-anima">
        <div class="flex flex-row flex-wrap">
          <div class="card w-full flex flex-row flex-wrap">
            <div class="md:w-full px-3 mb-6 md:mb-0">
              <label class="label font-bold text-base">Datos del Peso:</label>
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Total Bruto:</label>
              <input type="number" class="input" v-model="pesEntra" />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Tara:</label>
              <input type="number" class="input" v-model="pesSali" />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">No Animales Licencia :</label>
              <input
                type="number"
                class="input"
                v-model="guiSac.noAnimalesLic"
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
              <input type="number" class="input" v-model="totalKilosP" />
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
            <input type="text" class="input" v-model="guiSac.elaboro" />
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
            <input type="text" class="input" v-model="guiSac.nLote" />
          </div>
          <div class="md:w-1/2 px-20 mb-6 md:mb-0">
            <button class="btn-save p-2" @click="ticketweight">
              Tiquete con Peso
            </button>
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Comm:</label>
            <input type="text" class="input" v-model="guiSac.commUt" />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <input type="text" class="input" v-model="guiSac.commUt2" />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-anular">
        <div class="flex flex-row flex-wrap">
          <div class="px-3 mb-6 md:mb-0">
            <label class="label">Anulado</label>
            <input type="checkbox" class="checkbox" v-model="guiSac.anulada" />
          </div>

          <div class="md:w-7 mb-2 md:mb-0">
            <label class="label">Motivo:</label>
            <input
              type="text"
              class="input"
              v-model="guiSac.motivoAnula"
              readonly
            />
          </div>
        </div>
      </div>

      <div class="card mt-0 pt-3 hidden tab-estado">
        <div class="flex flex-row flex-wrap">
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
            <input
              type="text"
              class="input"
              v-model="guiSac.motivoEstado"
              readonly
            />
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
import * as Sentry from '@sentry/browser';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import { IGuiaSacrifico } from '@/remote/api/guia_sacrificio/type';
import moment from 'moment';
import Select from '@/components/reusable/select.vue';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IPagination from '@/types/IPagination';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
    PaginatedSelect,
    Select,
  },
  name: 'GuiaSacCons',
})
export default class GuiaSacCons extends Vue {
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private skip: number = 0;
  private limt: number = 1000;
  private readonlyPrev: boolean = false;
  private readonlyNext: boolean = false;

  private search: boolean = false;
  private readonlyProgramacion: boolean = false;
  private verfiProgramacion: boolean = false;

  private id: number = null;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private nPogramac: number = 0;
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

  private supplier: IInterfaceSelect[] = [];
  private origin: IInterfaceSelect[] = [];
  private city: IInterfaceSelect[] = [];
  private clasesProgracion: IInterfaceSelect[] = [];
  private typeSacri: IInterfaceSelect[] = [];
  private nitTercero: IInterfaceSelect[] = [];
  private nitSupplier: IInterfaceSelect[] = [];
  private nameSupplier: IInterfaceSelect[] = [];
  private nitCC: IInterfaceSelect[] = [];
  private nitCCcod: IInterfaceSelect[] = [];
  private nitCCpp: IInterfaceSelect[] = [];
  private driverCod: IInterfaceSelect[] = [];
  private driverName: IInterfaceSelect[] = [];
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
    this.estates();
    this.typeSacrificio();
    await this.openForm();
    await this.suppliers();
    await this.origns();
    await this.cities();
    await this.classes();
    await this.nitTerceros();
    await this.nitSuppliers();
    await this.supplierNames();
    await this.nitCCUsers();
    await this.nitCCcodUsers();
    await this.nitCCppUsers();
    await this.driversCod();
    await this.driversName();
    await this.clases();
    await this.claseDescrip();
    await this.sex();
    await this.sexDescrip();
    await this.ciudadesProce();
    await this.fincas();
    await this.fincasDescrip();
    await this.tipoVeh();
    await this.nitTerceroConsults();
    await this.customerSearch({ skip: this.skip, limit: this.limt });
  }

  private clearOutput() {
    this.output = '';
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

  private validateAnulado(anulado: boolean) {
    return anulado ? 'Anulado' : '';
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private async prev() {
    if (this.skip <= 0) {
      this.readonlyPrev = true;
      return;
    }
    this.readonlyNext = false;
    this.skip = this.skip - this.limt;
    await this.customerSearch({ skip: this.skip, limit: this.limt });
  }

  private async next() {
    this.readonlyPrev = false;
    this.skip = this.skip + this.limt;
    await this.customerSearch({ skip: this.skip, limit: this.limt });
  }

  private async openForm() {
    this.verfiProgramacion = true;
    this.nPogramac === 0
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
      const response = await this.guiaSacrificioApi.getOnLoad(this.nPogramac);
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

  private typeSacrificio() {
    this.typeSacri.push(
      { id: 1, item: 'Sacrificio Local' },
      { id: 2, item: 'Sacrificio Nacional' },
      { id: 3, item: 'Sacrificio Propio' },
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

  private async nitTerceros() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitTerceros();
      this.nitTercero = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.expr1 };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitSuppliers() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitProveedor();
      this.nitSupplier = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.nitoCC };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async supplierNames() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNombreProveedor();
      this.nameSupplier = response.data.map((e: any) => {
        return { id: e.codProveedor, item: e.expr2 };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitCCUsers() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCC();
      this.nitCC = response.data.map((e: any) => {
        return { id: e.codiCliente, item: e.codiCliente };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitCCcodUsers() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCCCod();
      this.nitCCcod = response.data.map((e: any) => {
        return { id: e.codiCliente, item: e.nitCliente };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nitCCppUsers() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCCpp();
      this.nitCCpp = response.data.map((e: any) => {
        return { id: e.codiCliente, item: e.expr2 };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async driversCod() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getConductorCod();
      this.driverCod = response.data.map((e: any) => {
        return { id: e.nitConduc, item: e.nitConduc };
      });
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async driversName() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getConductorName();
      this.driverName = response.data.map((e: any) => {
        return { id: e.nitConduc, item: e.nombreCond };
      });
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

  private async guiaSacCons(id: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getGuiaConsClientesID(id);
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
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async ticketweight() {
    try {
      this.isLoading = true;
      const pdf2 =
        await this.guiaSacrificioReports.getGuiaSacrificioTiquePesoPDF(
          this.guiSac.nGuia,
        );
      this.pdfData = pdf2.data;
      this.showModalPDF = true;
      this.isLoading = false;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
      this.isLoading = false;
    }
  }

  private async rePrint() {
    if (this.guiSac.imprime === 'N') {
      this.showOutput(true, 'Utilize la opcion Imprimir Documento');
      return;
    }

    this.validateAnualada(this.guiSac.anulada);
    await this.guiaSacrifioPdf(this.guiSac.nGuia);
  }

  private validateAnualada(anualda: boolean) {
    if (anualda) {
      this.duplicaI = 'ANULADA';
      return;
    }
    this.duplicaI = 'DUPLICADO';
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

  private async customerSearch(p?: IPagination, q?: IQuery) {
    let response: BaseResponse<
      Array<{
        NGuia: number;
        Expr1: string;
        FechaPes: string;
      }>
    >;
    if (q.query) {
      response = await this.guiaSacrificioApi.getGuiaConsBuscarClientesFind(q);
      return response.data.map<IInterfaceSelect>((e) => {
        return {
          id: e.NGuia,
          item: `${e.NGuia} - ${e.Expr1} -${this.convertDate(e.FechaPes)}`,
        };
      });
    }
    response = await this.guiaSacrificioApi.getGuiaConsBuscarClientes(
      p.skip,
      p.limit,
    );
    return response.data.map<IInterfaceSelect>((e) => {
      return {
        id: e.NGuia,
        item: `${e.NGuia} - ${e.Expr1} -${this.convertDate(e.FechaPes)}`,
      };
    });
  }
}
</script>
