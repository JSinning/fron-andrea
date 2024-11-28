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
            src="@/assets/img/menu/CuarteoCanales.png"
          />
          <span
            class="text-white text-lg font-semibold ml-2 cursor-pointer select-none hover:bg-white hover:text-andrea"
            @click="hoverRelacionC()"
            >Cuarteo Canales</span
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
                  <span>{{ item.Description }}</span>
                </div>
                <ul v-if="item.submenu.length > 0">
                  <li
                    class="hover:bg-white hover:text-andrea mb-2"
                    :class="{ highlight: sub.Men1 === itemSelected }"
                    v-for="sub in item.submenu"
                    :key="sub.Men1"
                    @click="
                      openModule(sub);
                      itemSelected = sub.Men1;
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
import { Component, Vue } from 'vue-property-decorator';

import AlertBox from '@/components/reusable/AlertBox.vue';
import NotFound from '@/components/reusable/NotFound.vue';
import ReprocesoCanal from '@/components/cuarteo/ReprocesoCanal.vue';
import ReprocesoCanalCons from '@/components/cuarteo/ReprocesoCanalCons.vue';
import moment from 'moment';

import * as Sentry from '@sentry/browser';
import T_ConfInv1Cuarteo from '@/classes/T_ConfInv1Cuarteo';
import CuarteoApi from '@/remote/api/cuarteo/cuarteoApi';
import ReprocesoCanalMod from '@/components/cuarteo/ReprocesoCanalMod.vue';
import SubRelaCanLot from '@/components/cuarteo/SubRelaCanLot.vue';
import ReprocesoCanalDet1C from '@/components/cuarteo/ReprocesoCanalDet1C.vue';
import SubConsoDespa from '@/components/cuarteo/SubConsoDespa.vue';
import SubRelaCanGuia3 from '@/components/cuarteo/SubRelaCanGuia3.vue';
import ReprocesoCanalDet1 from '@/components/cuarteo/ReprocesoCanalDet1.vue';
import ReprocesoCanalDet3 from '@/components/cuarteo/ReprocesoCanalDet3.vue';
import ReprocesoCanalDet2 from '@/components/cuarteo/ReprocesoCanalDet2.vue';
import ReprocesoCanalPend from '@/components/cuarteo/ReprocesoCanalPend.vue';
import CambFech from '@/components/cuarteo/CambFech.vue';

const { dialog } = window;

@Component({
  components: {
    AlertBox,
    CambFech,
    NotFound,
    ReprocesoCanal,
    ReprocesoCanalCons,
    ReprocesoCanalDet1,
    ReprocesoCanalDet1C,
    ReprocesoCanalDet2,
    ReprocesoCanalDet3,
    ReprocesoCanalMod,
    ReprocesoCanalPend,
    SubConsoDespa,
    SubRelaCanGuia3,
    SubRelaCanLot,
  },
  name: 'cuarteo',
})
export default class Cuarteo extends Vue {
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

  private cuarteoApi = new CuarteoApi(this.$store.getters.getAuthToken);

  private tConfigCuarteo = new T_ConfInv1Cuarteo();

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
    await this.tConfigCuarteo1();
  }

  public fpuerto() {
    this.fPuerto = this.$store.getters.getTConfinv1.puerto;
  }

  public openModule(item: any) {
    if (item.submenu !== undefined && item.submenu.length > 0) {
      return;
    }
    const module = item.submenu === undefined ? item.Modu : item.Modu;
    switch (module) {
      case 'fCuarteo1()':
        this.reprocesoCanal();
        break;
      case 'fCuarteo2()':
        this.reprocesoCanalCons();
        break;
      case 'fCuarteo3()':
        this.reprocesoCanalMod();
        break;
      case 'fCuarteo4()':
        this.reprocesoCanalPend();
        break;
      case 'fcambfec()':
        this.camFech();
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
    return moment(this.$store.getters.getTConfinv1.fecha1)
      .utc()
      .format('YYYY-MM-DD');
  }

  // Obtiene fecha proceso 2
  private rFec2() {
    return moment(this.$store.getters.getTConfinv1.fecha2)
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
          const response = await this.cuarteoApi.putTConfInv1({
            fecha1: this.rFec2(),
            fecha2: this.rFec2(),
          });
          if (response.statusCode === 200) {
            await this.tConfigCuarteo1();
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

  private async tConfigCuarteo1() {
    try {
      const response = await this.cuarteoApi.getTConfInv1();
      this.tConfigCuarteo = response.data;
      this.$store.dispatch('addTconfig', this.tConfigCuarteo);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener la configuracion del usuario.');
    }
  }

  private async menu1() {
    try {
      const response = await this.cuarteoApi.getMenu1();
      if (response.statusCode !== 200) {
        this.showOutput(
          true,
          'Error al traer información del menú, intente nuevamente.',
        );
        return;
      }

      for (const menuItem of response.data) {
        const menu2 = await this.cuarteoApi.getMenu2(menuItem.Tipo2);

        this.menu.push({
          Description: menuItem.DescripPrinc,
          Modu: menuItem.Modu,
          Tipo2: menuItem.Tipo2,
          submenu: menu2.data,
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

  private camFech() {
    this.componentName = 'CambFech';
  }

  private reprocesoCanal() {
    this.componentName = 'ReprocesoCanal';
  }

  private reprocesoCanalCons() {
    this.componentName = 'ReprocesoCanalCons';
  }

  private reprocesoCanalMod() {
    this.componentName = 'ReprocesoCanalMod';
  }

  private subRelaCanLot() {
    this.componentName = 'SubRelaCanLot';
  }

  private reprocesoCanalDet1C() {
    this.componentName = 'ReprocesoCanalDet1C';
  }

  private reprocesoCanalDet2() {
    this.componentName = 'ReprocesoCanalDet2';
  }

  private reprocesoCanalDet3() {
    this.componentName = 'ReprocesoCanalDet3';
  }

  private subConsoDespa() {
    this.componentName = 'SubConsoDespa';
  }

  private SubRelaCanGuia3() {
    this.componentName = 'SubRelaCanGuia3';
  }

  private reprocesoCanalDet1() {
    this.componentName = 'ReprocesoCanalDet1';
  }

  private reprocesoCanalPend() {
    this.componentName = 'ReprocesoCanalPend';
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
