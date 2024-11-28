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
    <!-- Space for the left toolbar -->
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
            src="@/assets/img/menu/Sacrificio.png"
          />
          <span
            class="text-white text-lg font-semibold ml-2 cursor-pointer select-none hover:bg-white hover:text-andrea"
            @click="hoverCaida()"
            >CAIDA ANIMAL</span
          >
        </div>
        <div class="flex item-center ml-4 md:h-200 lg:h-400 overflow-auto">
          <transition
            enter-active-class="animate__fadeInLeft"
            leave-active-class="animate__fadeOutLeft"
          >
            <ul
              class="ul-menu-item animate__animated animate__fadeInLeft"
              v-if="hoverTables"
              @animationend="animate = false"
            >
              <li
                v-for="(item, index) in menu"
                :key="index"
                @click="openModule(item)"
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
                      openModule(sub);
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
            <img
              class="h-8"
              src="../assets/img/menu_bars.svg"
              alt="Toggle Left"
            />
          </button>
        </div>
        <div class="flex flex-col items-center justify-center mb-2 mr-6">
          <button class="btn-primary" @click="back">Atras</button>
        </div>
      </div>
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />
      <!-- Content Here -->
      <div class="w-full h-full">
        <component
          v-bind:is="componentName"
          v-bind:message="message"
        ></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import T_ConfInv1CaidaAni from '@/classes/T_ConfInv1CaidaAni';
import Avisos from '@/components/caida_animal/Avisos.vue';
import CambFech from '@/components/caida_animal/CambFech.vue';
import Sacrificio from '@/components/caida_animal/Sacrificio.vue';
import SacrificioSub1 from '@/components/caida_animal/SacrificioSub1.vue';
import SacrificioSub2 from '@/components/caida_animal/SacrificioSub2.vue';
import SacrificioSub3 from '@/components/caida_animal/SacrificioSub3.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import NotFound from '@/components/reusable/NotFound.vue';
import MovCaidaAniApi from '@/remote/api/MovCaidaAnimal/MovCaidaAniApi.ts';

import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

import moment from 'moment';

const { dialog } = window;

@Component({
  components: {
    AlertBox,
    Avisos,
    CambFech,
    NotFound,
    Sacrificio,
    SacrificioSub1,
    SacrificioSub2,
    SacrificioSub3,
  },
  name: 'caidaAnimal',
})
export default class CaidaAnimal extends Vue {
  private toggleSidebar: boolean = true;
  private componentName: string = '';
  private animate: boolean = false;
  private hoverAsientos: boolean = false;
  private hoverTables: boolean = false;
  private output: string = '';
  private tipo: number = 0;
  private tipo2: number = 0;
  private modu: string = '';
  private modu2: string = '';
  private fPuerto: string = '';
  private menu: any = [];
  private message: string = '';
  private msgProfile: string = '';

  private itemSelected: any = null;

  private isError: boolean = false;
  private MoVCaidaApi = new MovCaidaAniApi(this.$store.getters.getAuthToken);
  private tconfind1 = new T_ConfInv1CaidaAni();

  public toggle() {
    this.toggleSidebar = !this.toggleSidebar;
  }

  public hoverCaida() {
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

  public async mounted() {
    await this.menu1();
    await this.configuration1();
    this.profile();
  }

  public fpuerto() {
    this.fPuerto = this.$store.getters.getTConfinv1.puerto;
  }

  public rFec1() {
    return moment(this.$store.getters.getTConfinv1.fechaProc1).format(
      'YYYY-MM-DD',
    );
  }

  public rFec2() {
    return moment(this.$store.getters.getTConfinv1.fechaProc2).format(
      'YYYY-MM-DD',
    );
  }

  public fSacrif() {
    this.componentName = 'Sacrificio';
  }

  public async GeneDiaT1() {
    const message = `Va a Realizar el Proceso de Generacion de Nueva Fecha de Trabajo. Solo Podra Crear o Modificar Registros con esta Fecha: ${this.rFec2()}, Verifique que no Tenga Documentos Pendientes no Tendra mas Acceso a Ellos. Esta Seguro de Generar?`;
    const opcion = confirm(message);
    const opcion2 = confirm(message);
    try {
      if (opcion) {
        if (opcion2) {
          const response = await this.MoVCaidaApi.putCofigureSacrCaida1({
            fechaProc1: this.rFec2(),
            fechaProc2: this.rFec2(),
            usuario: this.$store.getters.getUsuario,
          });
          if (response.statusCode === 200) {
            await this.configuration1();
            this.showOutput(false, response.message);
          }
        }
        return;
      }
      return;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al generar fecha de trabajo.');
    }
  }

  public openModule(item: any) {
    if (item.submenu !== undefined && item.submenu.length > 0) {
      return;
    }
    const module = item.submenu === undefined ? item.Modu : item.modu;
    switch (module) {
      case 'fSacrif()':
        this.fSacrif();
        break;
      case 'GeneDiaT1()':
        this.GeneDiaT1();
        break;
      default:
        this.message = 'La opcion seleccionada no es valida';
        this.componentName = 'NotFound';
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

  private async menu1() {
    try {
      const response = await this.MoVCaidaApi.getMenu1({
        Usuario: this.$store.getters.getUsuario,
      });
      if (response.statusCode !== 200) {
        this.showOutput(
          true,
          'Error al traer informacion del menu, intente nuevamente.',
        );
        return;
      }

      for (const menuItem of response.data) {
        const menu2 = await this.MoVCaidaApi.getMenu2(menuItem.Tipo2, {
          Usuario: this.$store.getters.getUsuario,
        });

        this.menu.push({
          description: menuItem.DescripPrinc,
          modu: menuItem.Modu,
          submenu: menu2.data,
          tipo2: menuItem.Tipo2,
        });
      }
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(
        true,
        'Error al traer informacion del menu, intente nuevamente.',
      );
    }
  }

  private async configuration1() {
    try {
      const response = await this.MoVCaidaApi.getCofigureSacrCaida1({
        usuario: this.$store.getters.getUsuario,
      });
      this.tconfind1 = response.data[0];
      this.$store.dispatch('addTconfig', this.tconfind1);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(
        true,
        'Error al obtener informacion predeterminada para el usuario.',
      );
    }
  }
}
</script>
