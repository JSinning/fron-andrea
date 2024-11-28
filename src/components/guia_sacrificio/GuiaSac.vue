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
          <h1 class="title">Guia de Sacrificio</h1>
        </div>
      </div>
      <div class="flex flex-row flex-wrap justify-end">
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-save" @click="addNewReguister">
            Adicionar Registro
          </button>
        </div>
        <div class="mb-6 md:mb-0 mt-2">
          <button class="btn-primary" @click="addGuia">Guardar</button>
          <button class="btn-delete" @click="viewModalDelete">Eliminar</button>
        </div>
      </div>

      <div class="flex flex-row flex-wrap">
        <div class="mb-6 md:mb-0 mt-2">
          <label class="label px-2">
            <input
              type="checkbox"
              class="checkBox"
              v-model="verfiProgramacion"
              @change="verfiProgramacioAfterUpate"
            />
            Utiliza Programacion...
          </label>
        </div>
      </div>

      <input
        type="radio"
        name="tab"
        id="program"
        class="hidden"
        checked
        v-if="pgProgramacion"
      />
      <input
        type="radio"
        name="tab"
        id="datos-basicos-guia"
        class="hidden"
        v-if="pgDatos"
      />
      <input
        type="radio"
        name="tab"
        id="peso-anima"
        class="hidden"
        v-if="pgPeso"
      />

      <div class="mt-2 mb-0 nav">
        <label for="program">
          <span
            class="py-0 px-3 rounded-tl-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="pgProgramacion"
          >
            Programacion
          </span>
        </label>

        <label for="datos-basicos-guia">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="pgDatos"
          >
            Datos basicos Guia
          </span>
        </label>
        <label for="peso-anima">
          <span
            class="py-0 px-3 rounded-tr-lg inline-block italic mb-0 text-andrea font-semibold text-xs"
            v-if="pgPeso"
          >
            Peso y N° Animales
          </span>
        </label>
      </div>

      <div class="card mt-0 pt-3 px-10 hidden tab-progam" v-if="pgProgramacion">
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
                v-for="(nProgram, index) in nProgramation"
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
              type="text"
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

      <div class="card mt-0 pt-3 px-10 hidden tab-datos-guias" v-if="pgDatos">
        <div class="flex flex-row flex-wrap">
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Guia No:</label>
            <input
              type="number"
              class="input"
              v-model="guiaSac.nGuia"
              :readonly="readonlyDatos"
            />
          </div>
          <div class="md:w-2/5 px-3 mb-6 md:mb-0">
            <label class="label">Tipo:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiaSac.esRecepGanado"
              @change="esReceptoAfterUpdate"
              :disabled="readonlyDatos"
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
              v-model="guiaSac.nitTercero"
              @change="nitTercerosID(guiaSac.nitTercero)"
              :disabled="readonlyTerceros"
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
              v-model="guiaSac.nitTercero"
              @change="nitSuppliersID(guiaSac.nitTercero)"
              :disabled="readonlyTerceros"
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
              v-model="guiaSac.nitTercero"
              @change="supplierNamesID(guiaSac.nitTercero)"
              :disabled="readonlyTerceros"
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
              v-model="guiaSac.nitTercero"
              @change="nitCCUsersID(guiaSac.nitTercero)"
              :disabled="readonlyNitCC"
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
              v-model="guiaSac.nitTercero"
              @change="nitCCcodUsersID(guiaSac.nitTercero)"
              :disabled="readonlyNitCC"
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
              v-model="guiaSac.nitTercero"
              @change="nitCCppUsersID(guiaSac.nitTercero)"
              :disabled="readonlyNitCC"
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
            <input
              type="text"
              class="input"
              v-model="guiaSac.transportador"
              :readonly="readonlyDatos"
            />
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Lic.Ica:</label>
            <input
              type="number"
              class="input"
              v-model="guiaSac.lIca"
              :readonly="readonlyDatos"
            />
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Conductor:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiaSac.conductor"
              @change="driversCodID(guiaSac.conductor)"
              :disabled="readonlyDatos"
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
              v-model="guiaSac.conductor"
              @change="driversNameID(guiaSac.conductor)"
              :disabled="readonlyDatos"
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
            <input
              type="text"
              class="input"
              v-model="guiaSac.placaVeh"
              :readonly="readonlyDatos"
            />
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Hora y Fecha del Pesaje:</label>
            <input
              type="time"
              class="input"
              v-model="horaPesaje"
              :readonly="readonlyDatos"
            />
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <input
              type="date"
              class="input"
              v-model="guiaSac.fechaPes"
              :readonly="readonlyDatos"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Hora y Fecha Salida Finca:</label>
            <input
              type="time"
              class="input"
              v-model="horaSFinca"
              :readonly="readonlyDatos"
            />
          </div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label py-2"></label>
            <input
              type="date"
              class="input"
              v-model="guiaSac.fechaSFinca"
              :readonly="readonlyDatos"
            />
          </div>
          <div class="md:w-full px-3 py-2 mb-6 md:mb-0"></div>
          <div class="md:w-full px-3 mb-6 md:mb-0">
            <label class="label font-bold text-base">Clasificacion:</label>
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Clase:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiaSac.clase"
              :disabled="readonlyDatos"
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
              v-model="guiaSac.clase"
              :disabled="readonlyDatos"
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
              v-model="guiaSac.sexo"
              :disabled="readonlyDatos"
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
              v-model="guiaSac.sexo"
              :disabled="readonlyDatos"
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

      <div class="card mt-0 pt-3 px-10 hidden tab-peso-anima" v-if="pgPeso">
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
                :readonly="readonlyPeso"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Tara:</label>
              <input
                type="number"
                class="input"
                v-model="pesSali"
                @change="pesEntraSaliAfterUpdate"
                :readonly="readonlyPeso"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">No Animales Licencia :</label>
              <input
                type="number"
                class="input"
                v-model="guiaSac.noAnimalesLic"
                @change="noAnimalesLicAfterUpdate"
                :readonly="readonlyPeso"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Procedencia(Ciudad):</label>
              <select
                class="bg-white border py-1 pr-2 select"
                v-model="guiaSac.procedencia"
                :disabled="readonlyPeso"
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
                :readonly="readonlyPeso"
              />
            </div>
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="label">Peso Promedio:</label>
              <input
                type="number"
                class="input"
                v-model="pesoPromedio"
                :readonly="readonlyPeso"
              />
            </div>
          </div>
          <div class="md:w-full px-3 py-2 mb-6 md:mb-0"></div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Peso en Finca::</label>
            <input
              type="number"
              class="input"
              v-model="guiaSac.pesoProgram"
              :readonly="readonlyPeso"
            />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Lote Usuario:</label>
            <input
              type="text"
              class="input"
              v-model="guiaSac.loteUs"
              :readonly="readonlyPeso"
            />
          </div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="label">Nº Compra Usuario:</label>
            <input
              type="text"
              class="input"
              v-model="guiaSac.docum"
              :readonly="readonlyPeso"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">Finca:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiaSac.finca"
              :disabled="readonlyPeso"
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
              v-model="guiaSac.finca"
              :disabled="readonlyPeso"
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
            <input
              type="text"
              class="input"
              v-model="guiaSac.elaboro"
              :readonly="readonlyPeso"
            />
          </div>
          <div class="md:w-2/3 px-3 mb-6 md:mb-0">
            <label class="label">Observacion:</label>
            <input
              type="text"
              class="input"
              v-model="guiaSac.observacion"
              :readonly="readonlyPeso"
            />
          </div>
          <div class="w-full"></div>
          <div class="md:w-1/4 px-3 mb-6 md:mb-0">
            <label class="label">Tiquete</label>
            <input
              type="text"
              class="input"
              v-model="tiquete"
              :readonly="readonlyPeso"
            />
          </div>
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="label">T.Vehiculo:</label>
            <select
              class="bg-white border py-1 pr-2 select"
              v-model="guiaSac.tipoVeh"
              :disabled="readonlyPeso"
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
              v-model="guiaSac.nLote"
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

    <!-- Modal delete Guia -->
    <div
      class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-left items-center z-50"
      v-if="modaldelete"
    >
      <div class="relative mx-auto w-auto max-w-2xl">
        <div class="bg-white w-full rounded shadow-2xl flex flex-col">
          <div
            class="bg-white border border-andrea text-andrea px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="text-lg"
              >&#x1f6c8; Esta seguro que desea eliminar Al conductor?</strong
            >
            <div class="content-center mt-2">
              <div class="flex flex-row flex-wrap">
                <div
                  class="rounded bg-andrea text-white px-4 mt-1 py-2 w-4/1 m-auto mb-2"
                >
                  <button class="btn-succes" @click="acceptModalDelete()">
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
    <!-- End Modal delete Guia -->

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
import * as Sentry from '@sentry/browser';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { IGuiaSacrifico } from '@/remote/api/guia_sacrificio/type';
import moment from 'moment';
import ReportesGuiaSacrificio from '@/remote/api/guia_sacrificio/ReportesGuiaSacrificio';
import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';

const { ipcRenderer } = window;

@Component({
  components: {
    AlertBox,
    Loader,
    ModalPDFPreview,
  },
  name: 'GuiaSac',
})
export default class GuiaSac extends Vue {
  @Ref('connectPort') private readonly btnConnectPort!: HTMLButtonElement;
  private output: string = '';
  private isLoading: boolean = false;
  private isError: boolean = false;
  private pgProgramacion: boolean = false;
  private modaldelete = false;
  private pgDatos: boolean = false;
  private pgPeso: boolean = false;
  private readonlyCanModify: boolean = false;
  private readonlyProgramacion: boolean = false;
  private readonlyDatos: boolean = false;
  private readonlyPeso: boolean = false;
  private readonlyTerceros: boolean = false;
  private readonlyRePrint: boolean = false;
  private readonlyNLote: boolean = false;
  private readonlyNitCC: boolean = false;
  private verfiProgramacion: boolean = false;
  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private ports: any[] = [];
  private portPath: string = '';
  private isPortConnected: boolean = false;
  private pesoBascula: number = 0.0;
  private peso: number = 0;

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
  private duplicaI: string = '';
  private pesEntra: string = '';
  private pesSali: string = '';
  private totalKilosP: string = '';
  private pesoPromedio: string = '';
  private tiquete: string = '';
  private horaPesaje: string = '';
  private horaSFinca: string = '';

  private itemNPrograc: any = [];
  private nProgramation: IInterfaceSelect[] = [];
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
  private guiaSac: IGuiaSacrifico = {
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

  public disconnectPort() {
    this.$serial.disconnectPort();
    this.isPortConnected = false;
  }

  public async discoverPorts() {
    this.ports = await this.$serial.getCOMPorts();
  }

  public get connectedDisconnected() {
    return this.isPortConnected ? 'Conectado' : 'Desconectado';
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private viewModalDelete() {
    this.modaldelete = true;
  }

  private closeModalDelete() {
    this.modaldelete = false;
  }

  private closeModalPDF() {
    this.showModalPDF = false;
  }

  private async acceptModalDelete() {
    if (this.guiaSac.nGuia === 0 || this.guiaSac.nGuia === null) {
      return;
    }

    await this.deleteGuia(this.guiaSac.nGuia);
    this.modaldelete = false;
  }

  private block() {
    this.readonlyDatos = true;
    this.readonlyProgramacion = true;
    this.readonlyPeso = true;
  }

  private desBlock() {
    this.readonlyDatos = false;
    this.readonlyProgramacion = false;
    this.readonlyPeso = false;
  }

  private convertDate(date: string) {
    return moment(date).utc().format('YYYY-MM-DD');
  }

  private convetBoleantoString(dato: boolean) {
    return !dato ? 'Falso' : 'Verdadero';
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

  private keyDown() {
    window.addEventListener('keydown', (e) => {
      const eventos: string = `F5 = COGER PESO DE LA BASCULA`;
      switch (e.key) {
        case 'F1':
          this.showOutput(false, eventos);
          break;
        case 'F5':
          this.onBasculaChanged();
          this.pesEntraSaliAfterUpdate();
          break;
      }
    });
  }

  private async mounted() {
    this.typeSacrificio();
    await this.openForm();
    await this.keyDown();
    await this.nProgramations();
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

    this.ports = await this.$serial.getCOMPorts();
    this._serialPortListener();
    // Tries to connect to port if exist on the local storage
    const portFromLocalDB = await this.$local.getCurrentBasculaConnectionPort();
    if (portFromLocalDB !== undefined && portFromLocalDB !== '') {
      this.portPath = portFromLocalDB;
      this.btnConnectPort.click();
    }
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

    if (this.guiaSac.noAnimales !== 0) {
      this.pesoPromedio = this.convertToDecimal(
        Number.parseFloat(this.totalKilosP) / this.guiaSac.noAnimales,
      );
    }
  }

  private noAnimalesLicAfterUpdate() {
    if (!this.guiaSac.noAnimales || this.guiaSac.noAnimales === 0) {
      return;
    }

    this.pesoPromedio = this.convertToDecimal(
      Number.parseFloat(this.totalKilosP) / this.guiaSac.noAnimales,
    );
  }

  private totalKilPAfterUpdate() {
    if (!this.guiaSac.noAnimales || this.guiaSac.noAnimales === 0) {
      return;
    }

    this.pesoPromedio = this.convertToDecimal(
      Number.parseFloat(this.totalKilosP) / this.guiaSac.noAnimales,
    );
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
    this.pesoProg = this.convetBoleantoString(this.itemNPrograc[0].pesoProgram);

    this.guiaSac.nitTercero = this.proveedor;
    this.guiaSac.finca = this.fincaProc;
    this.guiaSac.procedencia = this.ciudad;
    this.guiaSac.clase = Number.parseInt(this.clase1, 10);
    this.guiaSac.esRecepGanado = Number.parseInt(this.tipoSacrif, 10);
    this.guiaSac.pesoProgram = Number.parseFloat(this.pesoProg);
  }

  private openForm() {
    this.block();
    this.verfiProgramacion = true;
    this.verfiProgramacioAfterUpate();
    this.duplicaI = '';

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

    if (!this.$store.getters.getTConfinv1.puedModif) {
      this.readonlyCanModify = true;
      return;
    }
    this.readonlyCanModify = false;
  }

  private verfiProgramacioAfterUpate() {
    if (this.verfiProgramacion) {
      this.pgProgramacion = true;
      this.pgDatos = true;
      this.pgPeso = true;
      return;
    }

    this.pgProgramacion = false;
    this.pgDatos = true;
    this.pgPeso = true;
  }

  private esReceptoAfterUpdate() {
    if (this.guiaSac.nLote > 0) {
      this.showOutput(true, 'Ya se Genero El Lote, No se puede Modificar Tipo');
      return;
    }

    if (this.guiaSac.esRecepGanado === 3) {
      this.readonlyTerceros = true;
      this.readonlyRePrint = true;
      this.readonlyNLote = true;
      this.readonlyNitCC = false;
      return;
    }

    if (this.guiaSac.esRecepGanado === 2) {
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

  private validateSave() {
    if (
      this.guiaSac.fechaPes < this.$store.getters.getTConfinv1.fechaProc1 ||
      this.guiaSac.fechaPes > this.$store.getters.getTConfinv1.fechaProc2
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return true;
    }

    if (!this.guiaSac.nitTercero || this.guiaSac.nitTercero === null) {
      this.showOutput(true, 'Debe Escoger un Tercero');
      return true;
    }

    if (!this.horaSFinca || this.horaSFinca === null) {
      this.showOutput(true, 'La hora Salida de Finca no puede ser Nulo');
      return true;
    }

    if (this.verfiProgramacion) {
      if (this.nProgramac === 0) {
        this.showOutput(true, 'La Guia no Tiene Nº Programacion');
        return true;
      }
    }

    if (!this.verfiProgramacion) {
      if (this.nProgramac !== 0) {
        this.showOutput(true, 'La Guia Tiene Nº Programacion debe ser Cero');
        return true;
      }
    }

    return false;
  }

  private validatePrint() {
    if (!this.guiaSac.nitTercero || this.guiaSac.nitTercero === null) {
      this.showOutput(true, 'Debe Escoger un Tercero');
      return true;
    }

    if (!this.guiaSac.finca || this.guiaSac.finca === null) {
      this.showOutput(true, 'Debe Digitar la Finca');
      return true;
    }

    if (!this.guiaSac.procedencia || this.guiaSac.procedencia === null) {
      this.showOutput(true, 'Debe Digitar la Procedencia');
      return true;
    }

    if (this.guiaSac.clase === 0) {
      this.showOutput(true, 'Debe digitar la Clase');
      return true;
    }

    return false;
  }

  private async afterSave() {
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

  private async addGuia() {
    this.guiaSac.idEmpresa = this.$store.getters.getTConfinv1.idEmpresa;
    this.guiaSac.fechaPes = this.convertDate(this.guiaSac.fechaPes);
    this.guiaSac.fechaSFinca = this.convertDate(this.guiaSac.fechaSFinca);
    this.guiaSac.horaPesaje = moment(
      `${this.guiaSac.fechaPes} ${this.horaPesaje}`,
    )
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss');
    this.guiaSac.horaSFinca = moment(
      `${this.guiaSac.fechaSFinca} ${this.horaSFinca}`,
    )
      .utc()
      .format('YYYY-MM-DDTHH:mm:ss');
    this.guiaSac.pesEntra = Number.parseFloat(this.pesEntra);
    this.guiaSac.pesSali = Number.parseFloat(this.pesSali);
    this.guiaSac.totalKilosP = Number.parseFloat(this.totalKilosP);
    this.guiaSac.pesoPromedio = Number.parseFloat(this.pesoPromedio);
    this.guiaSac.tiquete = Number.parseInt(this.tiquete, 10);
    this.guiaSac.pesoProgram = Number.parseFloat(this.pesoProg);

    if (this.validateSave()) {
      return;
    }

    await this.afterSave();

    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.postGuia(this.guiaSac);
      if (response.statusCode === 200) {
        this.showOutput(false, response.message);
        this.guiaSac.nGuia = response.data;
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async deleteGuia(nGuia: number) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.deleteGuia(
        this.guiaSac.nGuia,
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

  private async addNewReguister() {
    this.desBlock();

    if (this.guiaSac.esRecepGanado === 3) {
      this.readonlyTerceros = true;
      this.readonlyRePrint = true;
      this.readonlyNLote = true;
      this.readonlyNitCC = false;
      return;
    }

    if (this.guiaSac.esRecepGanado === 2) {
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

    await this.newGuia();
  }

  private async newGuia() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNewGuia();
      this.guiaSac.nGuia = response.data;
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

    this.guiaSac.anulada
      ? (this.duplicaI = 'ANULADA')
      : (this.duplicaI = 'DUPLICADO');

    this.guiaSac.imprime = 'S';

    await this.guiaSacrifioEtiPdf(this.guiaSac.nGuia);

    this.isLoading = true;
    try {
      await this.guiaSacrificioApi.postOnPrint({
        config: confInv1,
        me: this.guiaSac,
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
        data: this.guiaSac,
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
        me: this.guiaSac,
      });

      this.guiaSac.nLote = response.data.nLote;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    } finally {
      this.isLoading = false;
    }
  }

  private async nProgramations() {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNProgramacion();
      this.nProgramation = response.data.map((e: any) => {
        return { id: e.nProgramac, item: e.nProgramac };
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

  private async nitTercerosID(cod: string) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitTerceroID(cod);
      this.guiaSac.transportador = `${response.data.nombresC} ${response.data.apellidosC}`;
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

  private async nitSuppliersID(cod: string) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitProveedorID(cod);
      this.guiaSac.transportador = `${response.data.nombresC} ${response.data.apellidosC}`;
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

  private async supplierNamesID(cod: string) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNombreProveedorID(cod);
      this.guiaSac.transportador = `${response.data.nombresC} ${response.data.apellidosC}`;
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

  private async nitCCUsersID(cod: string) {
    this.isLoading = true;
    try {
      await this.guiaSacrificioApi.getNitCCID(cod);
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

  private async nitCCcodUsersID(cod: string) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCCodID(cod);
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

  private async nitCCppUsersID(cod: string) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getNitCCppID(cod);
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

  private async driversCodID(cc: string) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getConductorCodID(cc);
      this.guiaSac.placaVeh = response.data.placaV;
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

  private async driversNameID(cc: string) {
    this.isLoading = true;
    try {
      const response = await this.guiaSacrificioApi.getConductorNameID(cc);
      this.guiaSac.placaVeh = response.data.placaV;
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

  //  Implemet Functions for weighing
  private connectToPort() {
    if (this.portPath === '') {
      this.showOutput(false, 'Debe seleccionar un puerto al cual conectarse.');
      return;
    }
    this.$serial.connectToPort(this.portPath);
  }

  private onBasculaChanged() {
    this.pesEntra = this.convertToDecimal(this.pesoBascula);
  }

  private pesoKilosB(peso: number) {
    this.pesoBascula = peso;
    this.pesEntra = this.convertToDecimal(peso);
    this.pesEntraSaliAfterUpdate();
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
}
</script>
