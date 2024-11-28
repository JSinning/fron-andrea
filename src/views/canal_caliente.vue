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
  <div class="flex">
    <div
      v-if="toggleSidebar"
      class="lateral-menu animate__animated animate__fadeInLeft"
    >
      <div class="flex flex-row pt-4 justify-center">
        <img src="@/assets/img/logo_andrea.svg" />
      </div>

      <div class="flex flex-col">
        <div class="flex items-center p-2">
          <img
            class="h-6 w-6 rounded-full"
            src="@/assets/img/menu/CanalCaliente.png"
          />
          <span
            class="text-white text-lg font-semibold ml-2 cursor-pointer select-none hover:bg-white hover:text-andrea"
            @click="canalcaliente()"
            >CANAL CALIENTE</span
          >
        </div>
        <div class="flex item-center ml-4 md:h-200 lg:h-400 overflow-auto">
          <transition
            enter-active-class="animate__fadeInLeft"
            leave-active-class="animate__fadeOutLeft"
          >
            <ul
              v-if="hoverTables"
              class="ul-menu-item animate__animated animate__fadeInLeft"
              @animationend="animate = false"
            >
              <li
                v-for="(item, index) in menu"
                :key="index"
                @click="componentMenu(item)"
              >
                <div class="menu-item">
                  <img
                    class="h-6 w-6 rounded-full mr-1"
                    src="@/assets/img/keyboard_arrow_right.svg"
                  />
                  <span>{{ item.description }}</span>
                </div>
                <ul v-if="item.submenu.length > 0">
                  <li
                    class="hover:bg-white hover:text-andrea mb-2"
                    :class="{ highlight: subIndex == itemSelected }"
                    v-for="(sub, subIndex) in item.submenu"
                    :key="subIndex"
                    @click="
                      componentMenu(sub);
                      itemSelected = subIndex;
                    "
                  >
                    <span class="ml-8 cursor-pointer">{{
                      sub.DescripOpc
                    }}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </transition>
        </div>
      </div>
      <div class="profile">
        <div class="flex flex-row m-2">
          <img
            class="h-8 w-8 rounded-full mt-2 ml-2"
            src="@/assets/img/profile.svg"
          />
          <div class="flex flex-col w-full">
            <span class="text-white text-xs font-semibold ml-2 mt-1"
              >{{ msgProfile }}
            </span>
            <span class="text-white text-xs font-semibold ml-2"
              >{{ this.$store.getters.getUsuario }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- Space for the right content -->
    <div class="w-full flex flex-col">
      <!-- Utility navbar -->
      <div class="toogle-menu">
        <div class="flex flex-col justify-center ml-2">
          <button @click="toggle">
            <img class="h-8" src="../assets/img/menu_bars.svg" />
          </button>
        </div>
        <div class="flex flex-col items-center justify-center mb-2 mr-6">
          <button class="btn-primary" @click="back">Atras</button>
        </div>
      </div>
      <!-- Content Here -->
      <div class="w-full flex flex-col">
        <!-- output -->
        <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
        <div class="w-full h-full">
          <component
            v-bind:is="componentName"
            v-bind:message="message"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Avisos from '@/components/canal_caliente/Avisos.vue';
import CambFech from '@/components/canal_caliente/CambFech.vue';
import Mov from '@/components/canal_caliente/MovCanalCalien.vue';
import MovCanalCaluno from '@/components/canal_caliente/MovCanalCaluno.vue';
import MovPielesSfPeso from '@/components/canal_caliente/MovPielesSfPeso.vue';
import MovSfCFrioEnc from '@/components/canal_caliente/MovSfCFrioEnc.vue';
import PesSebo from '@/components/canal_caliente/PesSebo.vue';
import SubDetRelaCCanDia from '@/components/canal_caliente/SubDetRelaCCanDia.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import NotFound from '@/components/reusable/NotFound.vue';
import canalCaliente from '@/remote/api/CanalCaliente';
import MovCCalienteApi from '@/remote/api/ReportesCanalCaliente';

import moment from 'moment';

import * as Sentry from '@sentry/browser';

const { dialog } = window;

@Component({
  components: {
    AlertBox,
    Avisos,
    CambFech,
    Mov,
    MovCanalCaluno,
    MovPielesSfPeso,
    MovSfCFrioEnc,
    NotFound,
    PesSebo,
    SubDetRelaCCanDia,
  },
  name: 'CanalCaliente',
})
export default class CanalCaliente extends Vue {
  private hoverTables: boolean = false;
  private toggleSidebar: boolean = true;
  private componentName: string = '';
  private animate: boolean = false;
  private tipo: number = 0;
  private tipo2: number = 0;
  private modu: string = '';
  private modu2: string = '';
  private output: string = '';
  private message: string = '';
  private msgProfile: string = '';
  private Fecha1: string = '';
  private Fecha2: string = '';

  private isError: boolean = false;
  private menu: any = [];

  private itemSelected: any = null;

  private MovApi = new MovCCalienteApi(this.$store.getters.getAuthToken);
  private canalCaliente = new canalCaliente(this.$store.getters.getAuthToken);

  public toggle() {
    this.toggleSidebar = !this.toggleSidebar;
  }

  public canalcaliente() {
    this.hoverTables = !this.hoverTables;
    this.animate = true;
  }

  public async back() {
    const exitAnswer = await dialog.showMessageBox({
      buttons: ['Aceptar', 'Cancelar'],
      cancelId: -1,
      message:
        'Esta seguro/a de regresar al menu principal, los cambios pendientes se perderan.',
      title: 'Salir',
      type: 'warning',
    });
    if (exitAnswer.response !== 0) {
      return;
    }
    this.$router.push('/');
  }

  public fPesoCan() {
    this.componentName = 'Mov';
  }

  public async fPesoSeb() {
    this.componentName = 'PesSebo';
  }

  public fAvisos() {
    this.componentName = 'Avisos';
  }

  // Metodo para abrir menu izquierdo del modulo.
  public componentMenu(item: any) {
    if (item.submenu !== undefined && item.submenu.length > 0) {
      return;
    }
    const module = item.submenu === undefined ? item.Modu : item.modu;
    switch (module) {
      case 'fPesoCan()':
        this.fPesoCan();
        break;
      case 'fPesoSeb()':
        this.fPesoSeb();
        break;
      case 'favisos()':
        this.fAvisos();
        break;
      case 'GeneDiaT()':
        this.GeneDiaT();
        break;
      default:
        this.message = 'La opcion seleccionada no es valida';
        this.componentName = 'NotFound';
    }
  }

  public async mounted() {
    await this.menuOne();
    await this.configur1();
    this.profile();
  }

  public async configur1() {
    try {
      const response = await this.canalCaliente.getCofigurSacr();
      this.Fecha1 = moment(response.data.fechaProc1).utc().format('YYYY-MM-DD');
      this.Fecha2 = moment(response.data.fechaProc2).utc().format('YYYY-MM-DD');
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, e.message);
    }
  }

  public rFec1() {
    return this.Fecha1;
  }
  public rFec2() {
    return this.Fecha2;
  }

  public async GeneDiaT() {
    const message: string = `Va a Realizar el Proceso de Generacion de Nueva Fecha de Trabajo. Solo Podra Crear o Modificar Registros con esta Fecha: ${this.rFec2()}, Verifique que no Tenga Documentos Pendientes no Tendra mas Acceso a Ellos. Esta Seguro de Generar?`;
    const opcion = confirm(message);
    const opcion2 = confirm(message);
    try {
      if (opcion) {
        if (opcion2) {
          const response = await this.canalCaliente.putgetCofigSacr1({
            fechaProc1: this.rFec2(),
            fechaProc2: this.rFec2(),
            usuario: this.$store.getters.getUsuario,
          });
          if (response.statusCode === 200) {
            await this.configur1();
            this.showOutput(false, response.message);
          }
        }
        return;
      }
      return;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(
        true,
        'Error al generar nueva fecha de trabajo, error en el servidor.',
      );
    }
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  private profile() {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 0 && hour < 12) {
      this.msgProfile = 'Buenos Días,';
    }

    if (hour >= 12 && hour < 18) {
      this.msgProfile = 'Buenas tardes,';
    }

    if (hour >= 18 && hour < 24) {
      this.msgProfile = 'Buenas noches,';
    }
  }

  // Obtiene informacion del menu izquierdo del modulo.
  private async menuOne() {
    try {
      const response = await this.canalCaliente.getMenu1();
      if (response.statusCode !== 200) {
        this.showOutput(true, 'Error al obtener informacion del menu.');
        return;
      }

      for (const menuItem of response.data) {
        const menu2 = await this.canalCaliente.getMenu2(menuItem.Tipo2);

        this.menu.push({
          description: menuItem.DescripPrinc,
          modu: menuItem.Modu,
          submenu: menu2.data,
          tipo2: menuItem.Tipo2,
        });
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener informacion del menu.');
    }
  }
}
</script>
