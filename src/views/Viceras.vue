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
    <!-- Logo de la empresa-->
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
            src="@/assets/img/menu/Viscerass.png"
          />
          <span
            class="text-white text-lg font-semibold ml-2 cursor-pointer select-none hover:bg-white hover:text-andrea"
            @click="Viceras()"
            >VISCERAS</span
          >
        </div>
        <!-- bara de busqueda-->
        <div class="flex item-center ml-4 md:h-200 lg:h-400 overflow-auto">
          <transition
            enter-active-class="animate__fadeInLeft"
            leave-active-class="animate__fadeOutLeft"
          >
            <ul
              class="ul-menu-item animate__animated animate__fadeInLeft"
              v-if="hoverTables"
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
                    :class="{ highlight: sub.Men1 == itemSelected }"
                    v-for="sub in item.submenu"
                    :key="sub.Men1"
                    @click="openModule(sub)"
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
    <div class="w-full flex flex-col">
      <div class="toogle-menu">
        <div class="flex flex-col justify-center ml-2">
          <button @click="toggle()">
            <img
              class="h-8"
              src="@/assets/img/menu_bars.svg"
              alt="Toggle Left"
            />
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
import AlertBox from '@/components/reusable/AlertBox.vue';
import AsistenciaEncComponent from '@/components/Viceras/AsistenciaEncComponent.vue';
import AvisosVicerasComponent from '@/components/Viceras/AvisosVicerasComponent.vue';
import CambfechVicerasComponet from '@/components/Viceras/CambfechVicerasComponet.vue';
import DecomisosViscerasComponet from '@/components/Viceras/DecomisosViscerasComponet.vue';
import Decomisos2ViscerasComponet from '@/components/Viceras/Descomisos2ViscerasComponet.vue';
import MovViceraDecoComponent from '@/components/Viceras/MovViceraDecoComponent.vue';
import MovVicerasComponent from '@/components/Viceras/MovVicerasComponent.vue';
import MovVicerasUnoComponent from '@/components/Viceras/MovVicerasUnoComponent.vue';
import PesadoViscComponent from '@/components/Viceras/PesadoViscComponent.vue';
import PesadoViscCsComponent from '@/components/Viceras/PesadoViscCsComponent.vue';
import PesadoViscDet2EncComponent from '@/components/Viceras/PesadoViscDet2EncComponent.vue';
import PesadoViscDet2EncCsComponent from '@/components/Viceras/PesadoViscDet2EncCsComponent.vue';
import PesadoViscDt1Component from '@/components/Viceras/PesadoViscDt1Component.vue';
import PesadoViscDt1CsComponent from '@/components/Viceras/PesadoViscDt1CsComponent.vue';
import PicadoViscComponent from '@/components/Viceras/PicadoViscComponent.vue';
import PicadoViscCsComponent from '@/components/Viceras/PicadoViscCsComponent.vue';
import PicadoViscCsxxComponent from '@/components/Viceras/PicadoViscCsxxComponent.vue';
import PicadoViscDet2PzComponenet from '@/components/Viceras/PicadoViscDet2PzComponenet.vue';
import PicadoViscDt2Component from '@/components/Viceras/PicadoViscDt2Component.vue';
import PicadoViscDt3Component from '@/components/Viceras/PicadoViscDt3Component.vue';
import PicadoViscPzComponent from '@/components/Viceras/PicadoViscPzComponent.vue';
import PicadoViscxxComponent from '@/components/Viceras/PicadoViscxxComponent.vue';
import SubDetRelaCCanDiaComponent from '@/components/Viceras/SubDetRelaCCanDiaComponent.vue';
import ViscerasSigteEncComponent from '@/components/Viceras/ViscerasSigteEncComponent.vue';
import ViscGruposEmp from '@/components/Viceras/ViscGruposEmp.vue';
import ViscTipoPesaComponent from '@/components/Viceras/ViscTipoPesaComponent.vue';
import ViscTipoPesaMComponent from '@/components/Viceras/ViscTipoPesaMComponent.vue';
import ViscTurnosComponent from '@/components/Viceras/ViscTurnosComponent.vue';
import VisicCatrgoriaEmpComponent from '@/components/Viceras/VisicCatrgoriaEmpComponent.vue';
import VisicEmpleadosGrEncComponent from '@/components/Viceras/VisicEmpleadosGrEncComponent.vue';

import { Component, Vue } from 'vue-property-decorator';

import T_ConfInv1Viseras from '@/classes/T_ConfInv1Viseras';
import MovViserasApi from '@/remote/api/MovViseras/MovViserasApi';
import moment from 'moment';

import * as Sentry from '@sentry/browser';

const { dialog } = window;

@Component({
  components: {
    AlertBox,
    AsistenciaEncComponent,
    AvisosVicerasComponent,
    CambfechVicerasComponet,
    Decomisos2ViscerasComponet,
    DecomisosViscerasComponet,
    MovViceraDecoComponent,
    MovVicerasComponent,
    MovVicerasUnoComponent,
    PesadoViscComponent,
    PesadoViscCsComponent,
    PesadoViscDet2EncComponent,
    PesadoViscDet2EncCsComponent,
    PesadoViscDt1Component,
    PesadoViscDt1CsComponent,
    PicadoViscComponent,
    PicadoViscCsComponent,
    PicadoViscCsxxComponent,
    PicadoViscDet2PzComponenet,
    PicadoViscDt2Component,
    PicadoViscDt3Component,
    PicadoViscPzComponent,
    PicadoViscxxComponent,
    SubDetRelaCCanDiaComponent,
    ViscGruposEmp,
    ViscTipoPesaComponent,
    ViscTipoPesaMComponent,
    ViscTurnosComponent,
    ViscerasSigteEncComponent,
    VisicCatrgoriaEmpComponent,
    VisicEmpleadosGrEncComponent,
  },
  name: 'Viceras',
})
export default class Viiceras extends Vue {
  private hoverTables = false;
  private hoverAsientos = false;
  private toggleSidebar = true;
  private componentName = '';
  private animate = false;

  private message: string = '';
  private msgProfile: string = '';
  private output: string = '';
  private isError: boolean = false;

  private menu: any = [];

  private itemSelected: any = null;

  private tConfigVisc1 = new T_ConfInv1Viseras();
  private MovViscerasApi = new MovViserasApi(this.$store.getters.getAuthToken);

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
    this.profile();
    await this.menu1();
    await this.tConfigVisceras1();
  }

  private async tConfigVisceras1() {
    try {
      const response = await this.MovViscerasApi.getTCofInv1({
        usuario: this.$store.getters.getUsuario,
      });

      this.tConfigVisc1 = response.data;
      this.$store.dispatch('addTconfig', this.tConfigVisc1);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener la configuracion del usuario.');
    }
  }

  private toggle() {
    this.toggleSidebar = !this.toggleSidebar;
  }
  private Viceras() {
    this.hoverTables = !this.hoverTables;
    this.animate = true;
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

  // Metodo para abrir menu izquierdo del modulo.
  private openModule(item: any) {
    if (item.submenu !== undefined && item.submenu.length > 0) {
      return;
    }
    this.itemSelected = item.Men1;
    const module = item.submenu === undefined ? item.Modu : item.modu;
    switch (module) {
      case 'fTurnos()':
        this.fTurnos();
        break;
      case 'fCatego()':
        this.fCatego();
        break;
      case 'fGruEmplea()':
        this.fGruEmplea();
        break;
      case 'fAdicEmplea()':
        this.fAdicEmplea();
        break;
      case 'fAsisEmplea()':
        this.fAsisEmplea();
        break;
      case 'fTipoPesa()':
        this.fTipoPesa();
        break;
      case 'fTipoPesaM()':
        this.fTipoPesaM();
        break;
      case 'fPesoVisc()':
        this.fPesoVisc();
        break;
      case 'fPicaVisc()':
        this.fPicaVisc();
        break;
      case 'fPicaVisc2()':
        this.fPicaVisc2();
        break;
      case 'fPicaVisc3()':
        this.fPicaVisc3();
        break;
      case 'fPesaVisc1()':
        this.fPesaVisc1();
        break;
      case 'fPesaVisc2()':
        this.fPesaVisc2();
        break;
      case 'fInfDecom1()':
        this.fInfDecom1();
        break;
      case 'fInfDecom2()':
        this.fInfDecom2();
        break;
      case 'GeneDiaT()':
        this.geneDiaT();
        break;
      default:
        this.message = 'La opcion seleccionada no es valida';
        this.componentName = 'NotFound';
    }
  }

  // Obtiene fecha proceso 1
  private rFec1() {
    return moment(this.$store.getters.getTConfinv1.fechaProc1)
      .utc()
      .format('YYYY-MM-DD');
  }

  // Obtiene fecha proceso 2
  private rFec2() {
    return moment(this.$store.getters.getTConfinv1.fechaProc2)
      .utc()
      .format('YYYY-MM-DD');
  }

  private async geneDiaT() {
    const message = `Va a Realizar el Proceso de Generacion de Nueva Fecha de Trabajo. Solo Podra Crear o Modificar Registros con esta Fecha: ${this.rFec2()}
      Verifique que no Tenga Documentos Pendientes no Tendra mas Acceso a Ellos. Esta Seguro de Generar?`;
    const opcion = confirm(message);
    const opcion2 = confirm(message);
    try {
      if (opcion) {
        if (opcion2) {
          const response = await this.MovViscerasApi.putConfigur1({
            fechaProc1: this.rFec2(),
            fechaProc2: this.rFec2(),
            usuario: this.$store.getters.getUsuario,
          });
          if (response.statusCode === 200) {
            await this.tConfigVisceras1();
            this.showOutput(false, response.message);
          }
        }
        return;
      }
      return;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async menu1() {
    try {
      const response = await this.MovViscerasApi.getMenu1({
        Usuario: this.$store.getters.getUsuario,
      });
      if (response.statusCode !== 200) {
        this.showOutput(
          true,
          'Error al traer información del menú, intente nuevamente.',
        );
        return;
      }

      for (const menuItem of response.data) {
        const menu2 = await this.MovViscerasApi.getMenu2(menuItem.Tipo2, {
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
        'Error al traer información del menú, intente nuevamente.',
      );
    }
  }

  private fTurnos() {
    this.componentName = 'ViscTurnosComponent';
  }

  private fCatego() {
    this.componentName = 'VisicCatrgoriaEmpComponent';
  }

  private fGruEmplea() {
    this.componentName = 'ViscGruposEmp';
  }

  private fAdicEmplea() {
    this.componentName = 'VisicEmpleadosGrEncComponent';
  }

  private fAsisEmplea() {
    this.componentName = 'AsistenciaEncComponent';
  }

  private fTipoPesa() {
    this.componentName = 'ViscTipoPesaComponent';
  }

  private fTipoPesaM() {
    this.componentName = 'ViscTipoPesaMComponent';
  }

  private fPesoVisc() {
    this.componentName = 'MovVicerasComponent';
  }

  private fPicaVisc() {
    this.componentName = 'PicadoViscComponent';
  }

  private fPicaVisc2() {
    this.componentName = 'PicadoViscCsComponent';
  }

  private fPicaVisc3() {
    this.componentName = 'PicadoViscPzComponent';
  }

  private fPesaVisc1() {
    this.componentName = 'PesadoViscComponent';
  }

  private fPesaVisc2() {
    this.componentName = 'PesadoViscCsComponent';
  }

  private fInfDecom1() {
    this.componentName = 'DecomisosViscerasComponet';
  }

  private fInfDecom2() {
    this.componentName = 'Decomisos2ViscerasComponet';
  }
}
</script>
