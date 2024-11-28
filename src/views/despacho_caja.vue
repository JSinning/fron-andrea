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
            src="@/assets/img/menu/DespachoCajas.png"
          />
          <span
            class="text-white text-lg font-semibold ml-2 cursor-pointer select-none hover:bg-white hover:text-andrea"
            @click="hoverRelacionC()"
            >Despacho Caja</span
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
import DespachoCajaApi from '@/remote/api/despacho_caja/despachoCajaApi';
import T_ConfInv1DespaCaja from '@/classes/T_ConfInv1DespaCaja';
import ConductoresMod from '@/components/despacho_caja/ConductoresMod.vue';
import Conductores from '@/components/despacho_caja/Conductores.vue';
import CambFech from '@/components/despacho_caja/CambFech.vue';
import DCCajasCjDet from '@/components/despacho_caja/DCCajasCjDet.vue';
import DCCajasCjDet2 from '@/components/despacho_caja/DCCajasCjDet2.vue';
import DCCajasCjDet3 from '@/components/despacho_caja/DCCajasCjDet3.vue';
import DCCajasCjDet3Cs from '@/components/despacho_caja/DCCajasCjDet3Cs.vue';
import DCCajasCjDet4 from '@/components/despacho_caja/DCCajasCjDet4.vue';
import DCCajasCjDetCs from '@/components/despacho_caja/DCCajasCjDetCs.vue';
import Transportad from '@/components/despacho_caja/Transportad.vue';
import TransportadMod from '@/components/despacho_caja/TransportadMod.vue';
import DCCajasCj from '@/components/despacho_caja/DCCajasCj.vue';
import DCCajasCjCs from '@/components/despacho_caja/DCCajasCjCs.vue';
import DCCajasSubPrxDp from '@/components/despacho_caja/DCCajasSubPrxDp.vue';
import DCCajasSubPrxCj from '@/components/despacho_caja/DCCajasSubPrxCj.vue';
import DCCTSelecxDCjN from '@/components/despacho_caja/DCCTSelecxDCjN.vue';
import DCControlVehDPed from '@/components/despacho_caja/DCControlVehDPed.vue';
import DCControlVeh from '@/components/despacho_caja/DCControlVeh.vue';
import DCControlVehGenF from '@/components/despacho_caja/DCControlVehGenF.vue';
import DCControlVehSalid from '@/components/despacho_caja/DCControlVehSalid.vue';
import DCControlVehPdd from '@/components/despacho_caja/DCControlVehPdd.vue';
import DCCajasCjImp from '@/components/despacho_caja/DCCajasCjImp.vue';

const { dialog } = window;

@Component({
  components: {
    AlertBox,
    CambFech,
    Conductores,
    ConductoresMod,
    DCCTSelecxDCjN,
    DCCajasCj,
    DCCajasCjCs,
    DCCajasCjDet,
    DCCajasCjDet2,
    DCCajasCjDet3,
    DCCajasCjDet3Cs,
    DCCajasCjDet4,
    DCCajasCjDetCs,
    DCCajasCjImp,
    DCCajasSubPrxCj,
    DCCajasSubPrxDp,
    DCControlVeh,
    DCControlVehDPed,
    DCControlVehGenF,
    DCControlVehPdd,
    DCControlVehSalid,
    NotFound,
    Transportad,
    TransportadMod,
  },
  name: 'despachoCaja',
})
export default class DespachoCaja extends Vue {
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

  private despachoCajaApi = new DespachoCajaApi(
    this.$store.getters.getAuthToken,
  );

  private tConfigDespaCaja = new T_ConfInv1DespaCaja();

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
    await this.tConfigDespaCaja1();
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
      case 'fcambfec()':
        this.cambFecha();
        break;
      case 'fDespaCaj1()':
        this.dCCajasCj();
        break;
      case 'fDespaCaj2()':
        this.dCCajasCjCs();
        break;
      case 'fDespaCajCons()':
        this.dCCTSelecxDCjN();
        break;
      case 'Conductores':
        this.conductores();
        break;
      case 'ConductoresMod':
        this.conductoresMod();
        break;
      case 'DCCajasCjDet':
        this.dCCajasCjDet();
        break;
      case 'DCCajasCjDet2':
        this.dCCajasCjDet2();
        break;
      case 'DCCajasCjDet3':
        this.dCCajasCjDet3();
        break;
      case 'DCCajasCjDet3Cs':
        this.dCCajasCjDet3Cs();
        break;
      case 'DCCajasCjDet4':
        this.dCCajasCjDet4();
        break;
      case 'DCCajasCjDetCs':
        this.dCCajasCjDetCs();
        break;
      case 'Transportad':
        this.transportad();
        break;
      case 'TransportadMod':
        this.transportadMod();
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
    return convertDate(this.$store.getters.getTConfinv1.fecha1);
  }

  // Obtiene fecha proceso 2
  private rFec2() {
    return convertDate(this.$store.getters.getTConfinv1.fecha2);
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
      const response = await this.despachoCajaApi.putTConfInv1({
        fecha1: this.rFec2(),
        fecha2: this.rFec2(),
      });
      if (response.statusCode === 200) {
        await this.tConfigDespaCaja1();
        this.showOutput(false, response.message);
      }
    } catch (e) {
      captureException(e);
      this.showOutput(true, e.message);
    }
  }

  private async tConfigDespaCaja1() {
    try {
      const response = await this.despachoCajaApi.getTConfInv1();
      this.tConfigDespaCaja = response.data;
      this.$store.dispatch('addTconfig', this.tConfigDespaCaja);
    } catch (e) {
      captureException(e);
      this.showOutput(true, 'Error al obtener la configuracion del usuario.');
    }
  }

  private async menu1() {
    try {
      const response = await this.despachoCajaApi.getMenu1();
      if (response.statusCode !== 200) {
        this.showOutput(
          true,
          'Error al traer información del menú, intente nuevamente.',
        );
        return;
      }

      for (const menuItem of response.data) {
        const menu2 = await this.despachoCajaApi.getMenu2(menuItem.tipo2);

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

  private dCCajasCjDet() {
    this.componentName = 'DCCajasCjDet';
  }

  private dCCajasCjDet2() {
    this.componentName = 'DCCajasCjDet2';
  }

  private dCCajasCjDet3() {
    this.componentName = 'DCCajasCjDet3';
  }

  private dCCajasCjDet3Cs() {
    this.componentName = 'DCCajasCjDet3Cs';
  }

  private dCCajasCjDet4() {
    this.componentName = 'DCCajasCjDet4';
  }

  private dCCajasCjDetCs() {
    this.componentName = 'DCCajasCjDetCs';
  }

  private cambFecha() {
    this.componentName = 'CambFech';
  }

  private conductores() {
    this.componentName = 'Conductores';
  }

  private conductoresMod() {
    this.componentName = 'ConductoresMod';
  }

  private transportad() {
    this.componentName = 'Transportad';
  }

  private transportadMod() {
    this.componentName = 'TransportadMod';
  }

  private dCCTSelecxDCjN() {
    this.componentName = 'DCCTSelecxDCjN';
  }

  private dCCajasCj() {
    this.componentName = 'DCCajasCj';
  }

  private dCCajasCjCs() {
    this.componentName = 'DCCajasCjCs';
  }

  private dCCajasSubPrxDp() {
    this.componentName = 'DCCajasSubPrxDp';
  }

  private dCCajasSubPrxCj() {
    this.componentName = 'DCCajasSubPrxCj';
  }

  private dCControlVeh() {
    this.componentName = 'DCControlVeh';
  }

  private dCControlVehGenF() {
    this.componentName = 'DCControlVehGenF';
  }

  private dCControlVehSalid() {
    this.componentName = 'DCControlVehSalid';
  }

  private dCControlVehPdd() {
    this.componentName = 'DCControlVehPdd';
  }

  private dCCajasCjImp() {
    this.componentName = 'DCCajasCjImp';
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
