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
            src="@/assets/img/menu/Repartoo.png"
          />
          <span
            class="text-white text-lg font-semibold ml-2 cursor-pointer select-none hover:bg-white hover:text-andrea"
            @click="hoverRelacionC()"
            >Reparto</span
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
                    :class="{ highlight: sub.men1 === itemSelected }"
                    v-for="sub in item.submenu"
                    :key="sub.men1"
                    @click="
                      openModule(sub);
                      itemSelected = sub.men1;
                    "
                  >
                    <span class="ml-8 cursor-pointer">{{
                      sub.descripOpc
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
import { Component, Vue } from 'vue-property-decorator';

import AlertBox from '@/components/reusable/AlertBox.vue';
import NotFound from '@/components/reusable/NotFound.vue';

import { captureException } from '@sentry/browser';
import convertDate from '@/utils/convertDate';
import T_ConfInv1Reparto from '@/classes/T_ConfInv1Reparto';
import RepartoAPI from '@/remote/api/reparto/repartoAPI';
import Conductores from '@/components/reparto/Conductores.vue';
import ConductoresMod from '@/components/reparto/ConductoresMod.vue';
import MovDespaPielDt1 from '@/components/reparto/MovDespaPielDt1.vue';
import MovDespaPielDt2 from '@/components/reparto/MovDespaPielDt2.vue';
import MovDespaPielGuia from '@/components/reparto/MovDespaPielGuia.vue';
import MovDespaPiel from '@/components/reparto/MovDespaPiel.vue';
import SubRepartoImp from '@/components/reparto/SubRepartoImp.vue';
import MovRepartoCons from '@/components/reparto/MovRepartoCons.vue';
import MovReparto from '@/components/reparto/MovReparto.vue';
import SubRepartoHt from '@/components/reparto/SubRepartoHt.vue';
import MovRepartoMod from '@/components/reparto/MovRepartoMod.vue';
import MovRepartoHist from '@/components/reparto/MovRepartoHist.vue';
import TercClientes from '@/components/reparto/TercClientes.vue';
import TercMesas from '@/components/reparto/TercMesas.vue';
import TercTranspor from '@/components/reparto/TercTranspor.vue';
import TercPieles from '@/components/reparto/TercPieles.vue';
import SubRepartoCons from '@/components/reparto/SubRepartoCons.vue';
import RepartoDiaCons2 from '@/components/reparto/RepartoDiaCons2.vue';
import RepartoDiaCons from '@/components/reparto/RepartoDiaCons.vue';

const { dialog } = window;

@Component({
  components: {
    AlertBox,
    Conductores,
    ConductoresMod,
    MovDespaPiel,
    MovDespaPielDt1,
    MovDespaPielDt2,
    MovDespaPielGuia,
    MovReparto,
    MovRepartoCons,
    MovRepartoHist,
    MovRepartoMod,
    NotFound,
    RepartoDiaCons,
    RepartoDiaCons2,
    SubRepartoCons,
    SubRepartoHt,
    SubRepartoImp,
    TercClientes,
    TercMesas,
    TercPieles,
    TercTranspor,
  },
  name: 'reparto',
})
export default class Reparto extends Vue {
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

  private repartoApi = new RepartoAPI(this.$store.getters.getAuthToken);

  private tConfigReparto = new T_ConfInv1Reparto();

  public toggle() {
    this.toggleSidebar = !this.toggleSidebar;
  }

  public hoverRelacionC() {
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
    this.profile();
    await this.menu1();
    await this.tConfigReparto1();
  }

  public fpuerto() {
    this.fPuerto = this.$store.getters.getTConfinv1.puerto;
  }

  public openModule(item: any) {
    if (item.submenu && item.submenu.length > 0) {
      return;
    }
    const module = !item.submenu ? item.modu : item.modu;
    switch (module) {
      case 'Conductores':
        this.conductores();
        break;
      case 'ConductoresMod':
        this.conductoresMod();
        break;
      case 'MovDespaPielDt1':
        this.movDespaPielDt1();
        break;
      case 'MovDespaPielDt2':
        this.movDespaPielDt2();
        break;
      case 'MovDespaPielGuia':
        this.movDespaPielGuia();
        break;
      case 'MovDespaPiel':
        this.movDespaPiel();
        break;
      case 'fInforme1()':
        this.informe1();
        break;
      case 'fInforme2()':
        this.informe2();
        break;
      case 'fReparto()':
        this.movReparto();
        break;
      case 'fRepartoCons()':
        this.movRepartoCons();
        break;
      case 'fRepartoMod()':
        this.movRepartoMod();
        break;
      case 'fRepartoHist()':
        this.movRepartoHist();
        break;
      case 'fTercero1()':
        this.tercPieles();
        break;
      case 'fTercero2()':
        this.tercClientes();
        break;
      case 'fTercero3()':
        this.tercMesas();
        break;
      case 'fTercero4()':
        this.tercTranspor();
        break;
      case 'GeneDiaT1()':
        this.geneDiaT();
        break;
      default:
        this.message = 'La opcion seleccionada no es valida';
        this.componentName = 'NotFound';
    }
  }

  // Obtiene fecha proceso 1
  private rFec1() {
    return convertDate(this.$store.getters.getTConfinv1.fechaProc1);
  }

  // Obtiene fecha proceso 2
  private rFec2() {
    return convertDate(this.$store.getters.getTConfinv1.fechaProc2);
  }

  private async geneDiaT() {
    const message = `Va a Realizar el Proceso de Generacion de Nueva Fecha de Trabajo. Solo Podra Crear o Modificar Registros con esta Fecha: ${this.rFec2()}
      Verifique que no Tenga Documentos Pendientes no Tendra mas Acceso a Ellos. Esta Seguro de Generar?`;
    const opcion = confirm(message);
    const opcion2 = confirm(message);
    try {
      if (!opcion) {
        return;
      }
      if (!opcion2) {
        return;
      }
      const response = await this.repartoApi.putTConfInv1({
        fechaProc1: this.rFec2(),
        fechaProc2: this.rFec2(),
      });
      if (response.statusCode === 200) {
        await this.tConfigReparto1();
        this.showOutput(false, response.message);
      }
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async tConfigReparto1() {
    try {
      const response = await this.repartoApi.getTConfInv1();
      this.tConfigReparto = response.data;
      this.$store.dispatch('addTconfig', this.tConfigReparto);
    } catch (e) {
      captureException(e);
      this.showOutput(true, 'Error al obtener la configuracion del usuario.');
    }
  }

  private async menu1() {
    try {
      const response = await this.repartoApi.getMenu1();
      if (response.statusCode !== 200) {
        this.showOutput(
          true,
          'Error al traer información del menú, intente nuevamente.',
        );
        return;
      }

      for (const menuItem of response.data) {
        const menu2 = await this.repartoApi.getMenu2(menuItem.tipo2);

        this.menu.push({
          description: menuItem.descripPrinc,
          modu: menuItem.modu,
          submenu: menu2.data,
          tipo2: menuItem.tipo2,
        });
      }
    } catch (e) {
      captureException(e);
      this.showOutput(
        true,
        'Error al traer información del menú, intente nuevamente.',
      );
    }
  }

  private conductores() {
    this.componentName = 'Conductores';
  }

  private conductoresMod() {
    this.componentName = 'ConductoresMod';
  }

  private movDespaPielDt1() {
    this.componentName = 'MovDespaPielDt1';
  }

  private movDespaPielDt2() {
    this.componentName = 'MovDespaPielDt2';
  }

  private movDespaPielGuia() {
    this.componentName = 'MovDespaPielGuia';
  }
  private movDespaPiel() {
    this.componentName = 'MovDespaPiel';
  }

  private subRepartoImp() {
    this.componentName = 'SubRepartoImp';
  }

  private subRepartoHt() {
    this.componentName = 'SubRepartoHt';
  }

  private movRepartoCons() {
    this.componentName = 'MovRepartoCons';
  }

  private movReparto() {
    this.componentName = 'MovReparto';
  }

  private movRepartoMod() {
    this.componentName = 'MovRepartoMod';
  }

  private movRepartoHist() {
    this.componentName = 'MovRepartoHist';
  }

  private tercClientes() {
    this.componentName = 'TercClientes';
  }

  private tercTranspor() {
    this.componentName = 'TercTranspor';
  }

  private tercMesas() {
    this.componentName = 'TercMesas';
  }

  private tercPieles() {
    this.componentName = 'TercPieles';
  }

  private informe1() {
    this.componentName = 'RepartoDiaCons';
  }
  private informe2() {
    this.componentName = 'RepartoDiaCons2';
  }

  private subRepartoCons() {
    this.componentName = 'SubRepartoCons';
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
}
</script>
