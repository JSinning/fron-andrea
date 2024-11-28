<!--
  */
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 /*
 -->
<template>
  <div class="flex flex-col">
    <div class="flex-row w-full">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
    </div>

    <div class="flex flex-col">
      <Loader v-show="isLoading" />
    </div>

    <!-- modal -->
    <div>
      <div class="modal" v-if="isConsolidado">
        <div class="relative mx-auto w-auto max-w-2xl">
          <div class="bg-white w-full rounded shadow-2xl flex flex-col">
            <SacrificioSub3 />
            <button
              class="rounded btn-delete px-6 mt-1 py-2 w-3/12 m-auto mb-2"
              @click="isConsolidado = false"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end modal -->
    <div class="main-div mb-2">
      <div class="flex-col min-w-full">
        <h1 class="title ml-8">SACRIFICIO</h1>
        <div class="flex flex-row flex-wrap mb-2">
          <div class="md:w-1/3 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/3 px-3 mb-6 md:mb-0"></div>
          <div class="md:w-1/3 px-10 md:mb-0">
            <button class="btn-primary" @click="saveRegister()">Guardar</button>
            <button class="btn-save" @click="isConsolidado = !isConsolidado">
              Consolidado
            </button>
          </div>
        </div>
        <div class="card">
          <div class="flex flex-row flex-wrap">
            <div class="px-3 mb-6 md:mb-0 inline-block relative w-1/2">
              <label class="label">Edad:</label>
              <PaginatedSelect v-model="EdadAni" :fetch="listEdades" />
            </div>
            <div class="md:w-1/4 px-3 mb-6 md:mb-0">
              <label class="label">Etiqueta:</label>
              <input
                type="text"
                v-model="Etiqueta"
                maxlength="9"
                @change="onChange()"
                class="input"
              />
            </div>
            <div class="md:w-1/4 px-3 mb-6 md:mb-0">
              <label class="label">Guia:</label>
              <input
                type="text"
                class="input"
                v-model="NGuia"
                readonly="readonly"
              />
            </div>
            <div class="md:w-1/6 px-3 mb-6 md:mb-0">
              <label class="label">Animal:</label>
              <input
                type="text"
                class="input"
                v-model="Animal"
                readonly="readonly"
              />
            </div>
          </div>

          <div class="flex flex-row flex-wrap py-2">
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <input
                type="text"
                class="input"
                v-model="TerceroG"
                readonly="readonly"
              />
            </div>
            <div class="md:w-1/4 px-3 mb-6 md:mb-0">
              <input
                type="text"
                class="input"
                v-model="ClaseAni"
                readonly="readonly"
              />
            </div>
            <div class="md:w-1/4 px-3 mb-6 md:mb-0">
              <input
                type="text"
                class="input"
                v-model="CategAni"
                readonly="readonly"
              />
            </div>
          </div>

          <div class="flex flex-row flex-wrap ml-60">
            <div class="md:w-1/3 px-3 mb-6 md:mb-0"></div>
            <div class="md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="label text-center text-xl -ml-2">PESO ANIMAL</label>
              <input
                type="text"
                placeholder="0"
                class="input py-0 -mt-2 border-transparent text-red-700 text-4xl text-center"
                v-model="pesoP"
                :canEditPeso="canEditPeso"
              />
            </div>
          </div>
        </div>

        <!-- table -->
        <div class="flex flex-row flex-wrap mb-3">
          <div class="card-table">
            <table class="table-fixed w-full text-xs" id="tableA">
              <thead>
                <tr
                  class="border-b border-gray-500 text-white bg-andrea font-bold"
                >
                  <th>N°Guia</th>
                  <th>Animal</th>
                  <th>Fecha</th>
                  <th>Peso</th>
                </tr>
              </thead>
              <tbody v-for="(item, index) in ListSacriOne" :key="index">
                <tr>
                  <td class="text-center">{{ item.nGuia }}</td>
                  <td
                    class="text-center"
                    @dblclick="doubleClickAnimal(item.nGuia, item.codigoIndiv)"
                  >
                    {{ item.codigoIndiv }}
                  </td>
                  <td class="text-center">
                    {{ convertDate(item.fechaMov) }}
                  </td>
                  <td class="text-center">{{ item.pesoP }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="flex flex-row flex-wrap mb-3 -mt-4">
          <div class="flex flex-col w-full">
            <button
              class="btn-primary w-full"
              @click="exportTableCaida(`Sacrificio_${fechaTablas}.csv`)"
            >
              Exportar Csv Sacrificio
            </button>
          </div>
        </div>

        <hr />

        <div class="flex flex-row flex-wrap justify-between">
          <div class="flex flex-row inline-block relative items-center">
            <button class="btn-save" @click="disconnectPort">
              Desconectar
            </button>
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
            <button class="btn-save ml-2 md:ml-1" @click="connectToPort">
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
    </div>
  </div>
</template>

<script lang="ts">
import SacrificioSub3 from '@/components/caida_animal/SacrificioSub3.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import MovCaidaAniApi from '@/remote/api/MovCaidaAnimal/MovCaidaAniApi.ts';

import Loader from '@/components/reusable/Loader.vue';

import * as Sentry from '@sentry/browser';

import moment from 'moment';
import { Component, Ref, Vue } from 'vue-property-decorator';
import PaginatedSelect from '@/components/reusable/PaginatedSelect.vue';
import IInterfaceSelect from '@/models/interfaces/interfaceSelect';
import { IConductores } from '@/remote/api/despacho_local/types';
import IQuery from '@/types/query';
import { BaseResponse } from '@/types';
import IPagination from '@/types/IPagination';

const { ipcRenderer } = window;

@Component({
  components: {
    AlertBox,
    Loader,
    PaginatedSelect,
    SacrificioSub3,
  },
  name: 'frmSacrificio',
})
export default class Sacrificio extends Vue {
  @Ref('connectPort') private readonly btnConnectPort!: HTMLButtonElement;
  private isConsolidado: boolean = false;
  private isPortConnected: boolean = false;
  private portPath: string = '';
  private pesoP: number = 0;
  private ports: any[] = [];
  private canEditPeso: boolean = false;
  private Etiqueta: string = '';
  private NGuia: number = 0;
  private Animal: number = 0;
  private output: string = '';
  private TerceroG: string = '';
  private ClaseAni: string = '';
  private CategAni: string = '';
  private EdadAni: number = 0;
  private nEtiCabe: number = 0;
  private ListSacriOne: any = [];
  private EdadesSac: any = [];

  private isLoading: boolean = false;

  private fechaTablas: string = moment().utc().format('YYYY-MM-DD');
  private isError: boolean = false;
  private MovCaidaApi = new MovCaidaAniApi(this.$store.getters.getAuthToken);

  public async mounted() {
    await this.keyDown();
    await this.listData();
    this.ports = await this.$serial.getCOMPorts();
    this._serialPortListener();
    // Tries to connect to port if exist on the local storage
    const portFromLocalDB = await this.$local.getCurrentBasculaConnectionPort();
    if (portFromLocalDB !== undefined && portFromLocalDB !== '') {
      this.portPath = portFromLocalDB;
      this.btnConnectPort.click();
    }
  }

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

  private keyDown() {
    window.addEventListener('keydown', (e) => {
      const eventos: string = `F3 = Guardar \nF5 = COGER PESO DE LA BASCULA \n`;
      switch (e.key) {
        case 'F1':
          this.showOutput(false, eventos);
          break;
        case 'F3':
          this.saveRegister();
          break;
      }
    });
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private async doubleClickAnimal(nGuia: number, Codind: number) {
    if (
      this.$store.getters.getFechaProceso <
        this.$store.getters.getTConfinv1.fechaProc1 ||
      this.$store.getters.getFechaProceso >
        this.$store.getters.getTConfinv1.fechaProc2
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }

    try {
      this.isLoading = true;
      const checkBool =
        confirm(`Se eliminaran Registros de Sacrificio,Canal Caliente,  Pieles y Visceras.
        Guia No  ${nGuia}  Animal No  ${Codind} Esta Seguro de Eliminar?`);

      if (!checkBool) {
        this.showOutput(false, 'Accion cancelada.');
        return;
      }

      await this.MovCaidaApi.DeleteSacrifico4(nGuia, Codind);
      await this.MovCaidaApi.DeleteSacrifico3(nGuia, Codind);
      await this.MovCaidaApi.DeleteSacrifico2(nGuia, Codind);

      const response = await this.MovCaidaApi.getSacriDetOne(nGuia, Codind);
      if (response.data.length === 0) {
        this.showOutput(
          true,
          `NO EXISTE LA GUIA No ${nGuia} CON EL ANIMAL ${Codind} EN SACRIFICIO`,
        );
      } else {
        await this.MovCaidaApi.DeleteSacrifico1(nGuia, Codind);
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error procesando informacion.');
    } finally {
      this.isLoading = false;
    }
  }
  private convertDate(fecha: string) {
    return moment(fecha).format('YYYY-MM-DD');
  }

  private async onChange() {
    if (this.Etiqueta.length < 6) {
      this.showOutput(true, 'Etiqueta no tiene los caracteres necesarios(6).');
      return;
    }
    if (this.Etiqueta.charAt(6) !== '.') {
      this.showOutput(true, 'El valor no tiene la mascara 000000.00');
      return;
    }
    this.NGuia = parseInt(this.Etiqueta.substring(0, 6), 10);
    this.Animal = parseInt(this.Etiqueta.substring(7, 9), 10);

    await this.etiquetaAfterUpdate(this.NGuia, this.Animal);
    await this.listData();
  }

  private downloadCSV(csv: any, filename: string) {
    let csvFile;
    let downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: 'text/csv' });
    downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  private exportTableCaida(file: string) {
    if (this.ListSacriOne.length === 0) {
      this.showOutput(false, 'Tablas vacias no hay datos que guardar');
      return;
    }
    const csv: any = [];
    const row = document.querySelectorAll('#tableA tr');

    for (const i of row) {
      const rows = [];
      const cols = i.querySelectorAll('td, th');
      for (const j of cols) {
        rows.push(j.innerHTML.replace('.', ','));
      }
      csv.push(rows.join(';'));
    }
    this.downloadCSV(csv.join('\n'), file);
  }

  private async etiquetaAfterUpdate(nGuia: number, codi: number) {
    this.isLoading = true;

    if (
      this.$store.getters.getFechaProceso <
        this.$store.getters.getTConfinv1.fechaProc1 ||
      this.$store.getters.getFechaProceso >
        this.$store.getters.getTConfinv1.fechaProc2
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      this.isLoading = false;
      this.clearForm();
      return;
    }

    try {
      const frivPda = await this.MovCaidaApi.getFriVistaPdae(nGuia);
      this.TerceroG = frivPda.data.nitTercero;
      const frivPda2 = await this.MovCaidaApi.getFriVistaPdae2(nGuia, codi);

      if (frivPda2.data.length !== 0) {
        this.ClaseAni = frivPda2.data[0].descrClase;
        if (frivPda2.data[0].descripcionC !== null) {
          this.CategAni = frivPda2.data[0].descripcionC;
        }
      } else {
        this.showOutput(true, `No Existe DETALLE CLASE de la Guia No ${nGuia}`);
        this.clearForm();
      }
      const SacrificeOne = await this.MovCaidaApi.gettSacrificioAnula(
        nGuia,
        codi,
      );
      if (SacrificeOne.data.length !== 0) {
        this.showOutput(
          true,
          `YA EXISTE LA GUIA No ${nGuia} CON EL ANIMAL ${codi} EN SACRIFICIO`,
        );
        this.clearForm();
      }
      const EntraCorr = await this.MovCaidaApi.getEntraCorr(nGuia, codi);
      if (EntraCorr.data.length === 0) {
        this.showOutput(
          true,
          `NO EXISTE LA GUIA No ${nGuia} CON EL ANIMAL ${codi} EN CORRAL`,
        );
        this.clearForm();
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'Error procesando informacion.');
    } finally {
      this.isLoading = false;
    }
  }

  private async listEdades(p?: IPagination, q?: IQuery) {
    try {
      let EdadeSac: BaseResponse<
        Array<{
          idEdad: string;
          descripcion1: string;
          descripcion2: string;
        }>
      >;
      if (q.query) {
        EdadeSac = await this.MovCaidaApi.getEdadesFind(q);
        return EdadeSac.data.map<IInterfaceSelect>((e) => ({
          id: e.idEdad,
          item: `${e.descripcion1} - ${e.descripcion2}`,
        }));
      }
      EdadeSac = await this.MovCaidaApi.getEdades();
      return EdadeSac.data.map<IInterfaceSelect>((e) => ({
        id: e.idEdad,
        item: `${e.descripcion1} - ${e.descripcion2}`,
      }));
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al listar Edades.');
    }
  }

  private async listData() {
    try {
      const SacrificeOne = await this.MovCaidaApi.gettSacridio1();
      this.ListSacriOne = SacrificeOne.data;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al listar informacion.');
    }
  }

  private async saveRegister() {
    if (
      this.$store.getters.getFechaProceso <
        this.$store.getters.getTConfinv1.fechaProc1 ||
      this.$store.getters.getFechaProceso >
        this.$store.getters.getTConfinv1.fechaProc2
    ) {
      this.showOutput(true, 'La fecha esta fuera del limite permitido');
      return;
    }

    if (this.EdadAni === null || this.EdadAni === 0) {
      this.showOutput(true, 'Debe Digitar la Edad');
      return;
    }

    if (this.pesoP === 0 || this.pesoP === 1) {
      this.showOutput(true, 'Falta Peso Bascula');
      return;
    }

    if ((await this.sacrificioOne(this.NGuia, this.Animal)) === 0) {
      await this.SaveData();
    } else {
      this.showOutput(
        true,
        `YA EXISTE LA GUIA No ${this.NGuia} CON EL ANIMAL ${this.Animal} EN SACRIFICIO`,
      );
      this.clearForm();
    }
  }

  private async SaveData() {
    const Guia = this.NGuia;
    const Codindv = this.Animal;
    const Anim = this.EdadAni;
    try {
      this.isLoading = true;
      const response = await this.MovCaidaApi.postGuardarCaida({
        actualizaW: 0,
        anulado: 0,
        codigoIndiv: Codindv,
        edadA: Anim,
        fechaMov: moment().format('YYYY-MM-DD h:mm:ss a'),
        motivoAnul: '',
        nGuia: Guia,
        pesoP: this.pesoP,
        usuario: this.$store.getters.getUsuario,
      });

      if (response.statusCode !== 201) {
        this.showOutput(true, 'Error al guardar registro');
        return;
      }

      if (this.$store.getters.getTConfinv1.imprimTiri) {
        this.nEtiCabe = this.EdadAni;
      }

      this.showOutput(false, 'REGISTRO GUARDADO EXITOSAMENTE');
      await this.listData();
      this.clearForm();
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al guardar informacion.');
    } finally {
      this.isLoading = false;
    }
  }

  private async sacrificioOne(nGuia: number, CodIndiv: number) {
    try {
      const SacrificeOne = await this.MovCaidaApi.gettSacrificioAnula(
        nGuia,
        CodIndiv,
      );
      return SacrificeOne.data.length;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error listando informacion');
      return -1;
    }
  }

  private connectToPort() {
    if (this.portPath === '') {
      this.showOutput(true, 'Debe selecccionar un puerto al cual conectarse.');
      return;
    }
    this.$serial.connectToPort(this.portPath);
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
      this.pesoP = data as unknown as number;
      this.saveRegister();
    });
  }

  private clearForm() {
    this.pesoP = 0;
    this.Etiqueta = '';
    this.NGuia = 0;
    this.Animal = 0;
    this.TerceroG = '';
    this.ClaseAni = '';
    this.CategAni = '';
    this.EdadAni = 0;
  }
}
</script>
