<template>
  <div>
    <div class="flex">
      <div
        v-if="togglesidebar"
        class="lateral-menu animate__animated animate__fadeInLeft"
      >
        <div class="flex flex-row pt-4 justify-center">
          <img src="@/assets/img/logo_andrea.svg" />
        </div>

        <div class="flex flex-col">
          <div class="flex items-center p-2">
            <img
              class="h-6 w-6 rounded-full"
              src="@/assets/img/menu/DespachoNacional.png"
            />
            <span
              class="text-white text-lg font-semibold ml-2 cursor-pointer select-none hover:bg-white hover:text-andrea"
              @click="toggleMenu()"
              >DESPACHO NACIONAL</span
            >
          </div>
          <div class="flex item-center ml-4 md:h-200 lg:h-400 overflow-auto">
            <transition
              enter-active-class="animate__fadeInLeft"
              leave-active-class="animate__fadeOutLeft"
            >
              <ul
                class="ul-menu-item animate__animated animate__fadeInLeft"
                v-if="hovertables"
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
          <ModalPDFPreview
            :pdfData="pdfData"
            @close="closeModalPDF"
            v-if="showModalPDF"
          />
          <div class="w-full h-full">
            <component
              v-bind:is="componentName"
              :pdfData="pdfData"
              v-bind:message="message"
            ></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import T_ConfInv1DespaNac from '@/classes/T_ConfInv1DespaNac';
import despachoNacionalApi from '@/remote/api/despacho_nacional/despachoNacionalApi';

import { Component, Vue } from 'vue-property-decorator';

import AvisosComponent from '@/components/despacho_nacional/AvisosComponent.vue';
import CambfechDespaComponent from '@/components/despacho_nacional/CambfechDespaComponent.vue';
import ConductoresDespaComponent from '@/components/despacho_nacional/ConductoresDespaComponent.vue';
import ConductoresDespaModComponent from '@/components/despacho_nacional/ConductoresDespaModComponent.vue';
import DNSubCan2DespaComponent from '@/components/despacho_nacional/DNSubCan2DespaComponent.vue';
import DNSubCan3DespaComponent from '@/components/despacho_nacional/DNSubCan3DespaComponent.vue';
import DNSubCan4DespaComponent from '@/components/despacho_nacional/DNSubCan4DespaComponent.vue';
import DNSubCanDespaComponent from '@/components/despacho_nacional/DNSubCanDespaComponent.vue';
import DNSubRelaCanGuia3RCDnComponent from '@/components/despacho_nacional/DNSubRelaCanGuia3RCDnComponent.vue';
import MovDespaNacCComponent from '@/components/despacho_nacional/MovDespaNacCComponent.vue';
import MovDespaNacCfAnComponent from '@/components/despacho_nacional/MovDespaNacCfAnComponent.vue';
import MovDespaNacComponent from '@/components/despacho_nacional/MovDespaNacComponent.vue';
import MovDespaNacModComponent from '@/components/despacho_nacional/MovDespaNacModComponent.vue';
import MovDespaVtComponent from '@/components/despacho_nacional/MovDespaVtComponent.vue';
import MovDespaVtGuiaComponent from '@/components/despacho_nacional/MovDespaVtGuiaComponent.vue';
import MovInforCanDespaComponent from '@/components/despacho_nacional/MovInforCanDespaComponent.vue';
import SubConsoDespaComponent from '@/components/despacho_nacional/SubConsoDespaComponent.vue';
import SubDespaNacGuia3Component from '@/components/despacho_nacional/SubDespaNacGuia3Component.vue';
import SubDespaNacGuia4Component from '@/components/despacho_nacional/SubDespaNacGuia4Component.vue';
import SubDetDesNacCComponent from '@/components/despacho_nacional/SubDetDesNacCComponent.vue';
import SubDetDesNacComponent from '@/components/despacho_nacional/SubDetDesNacComponent.vue';
import SubDetDesNacM2Component from '@/components/despacho_nacional/SubDetDesNacM2Component.vue';
import SubDetDesNacMComponent from '@/components/despacho_nacional/SubDetDesNacMComponent.vue';
import SubDetDesVtComponent from '@/components/despacho_nacional/SubDetDesVtComponent.vue';
import SubDetDesVtGuiaComponent from '@/components/despacho_nacional/SubDetDesVtGuiaComponent.vue';
import SubDetRelaCanMBorrComponent from '@/components/despacho_nacional/SubDetRelaCanMBorrComponent.vue';
import SubRelaCanLotComponent from '@/components/despacho_nacional/SubRelaCanLotComponent.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import moment from 'moment';

import * as Sentry from '@sentry/browser';

const { dialog } = window;
@Component({
  components: {
    AlertBox,
    AvisosComponent,
    CambfechDespaComponent,
    ConductoresDespaComponent,
    ConductoresDespaModComponent,
    DNSubCan2DespaComponent,
    DNSubCan3DespaComponent,
    DNSubCan4DespaComponent,
    DNSubCanDespaComponent,
    DNSubRelaCanGuia3RCDnComponent,
    MovDespaNacCComponent,
    MovDespaNacCfAnComponent,
    MovDespaNacComponent,
    MovDespaNacModComponent,
    MovDespaVtComponent,
    MovDespaVtGuiaComponent,
    MovInforCanDespaComponent,
    SubConsoDespaComponent,
    SubDespaNacGuia3Component,
    SubDespaNacGuia4Component,
    SubDetDesNacCComponent,
    SubDetDesNacComponent,
    SubDetDesNacM2Component,
    SubDetDesNacMComponent,
    SubDetDesVtComponent,
    SubDetDesVtGuiaComponent,
    SubDetRelaCanMBorrComponent,
    SubRelaCanLotComponent,
  },
  name: 'despacho_nacional',
})
export default class DespachoNacional extends Vue {
  private hovertables: boolean = false;
  private togglesidebar: boolean = true;
  private animate: boolean = false;
  private isError: boolean = false;

  private msgProfile: string = '';
  private output: string = '';
  private message: string = '';
  private componentName: string = '';

  private pdfData: string = '';
  private showModalPDF: boolean = false;

  private menu: any = [];
  private itemSelected: any = null;

  private tConfInv1Des = new T_ConfInv1DespaNac();
  private despaNaciApi = new despachoNacionalApi(
    this.$store.getters.getAuthToken,
  );

  public toggle() {
    this.animate = true;
    setTimeout(() => {
      this.togglesidebar = !this.togglesidebar;
    }, 500);
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

  public toggleMenu() {
    this.hovertables = !this.hovertables;
    this.animate = true;
  }

  public async mounted() {
    await this.menu1();
    this.profile();
    await this.tConfInv1();
  }

  private clearOutput() {
    this.output = '';
  }

  private async tConfInv1() {
    try {
      const response = await this.despaNaciApi.getTConfInv1();

      this.tConfInv1Des = response.data;
      this.$store.dispatch('addTconfig', this.tConfInv1Des);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener la configuracion del usuario.');
    }
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
    const message = `Va a Realizar el Proceso de Generacion de Nueva Fecha de Trabajo. Solo Podra Crear o Modificar Registros con esta Fecha: ${this.rFec2()}, Verifique que no Tenga Documentos Pendientes no Tendra mas Acceso a Ellos. Esta Seguro de Generar?`;
    const opcion = confirm(message);
    const opcion2 = confirm(message);
    try {
      if (opcion) {
        if (opcion2) {
          const response = await this.despaNaciApi.putTConfiInv1({
            fecha1: this.rFec2(),
            fecha2: this.rFec2(),
          });
          if (response.statusCode === 200) {
            await this.tConfInv1();
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

  private openModule(item: any) {
    if (item.submenu !== undefined && item.submenu.length > 0) {
      return;
    }
    this.itemSelected = item.Men1;
    const module = item.submenu === undefined ? item.Modu : item.modu;
    switch (module) {
      case 'fRCanalDN1()':
        this.fRCanalDN1();
        break;
      case 'fRCanalDN2()':
        this.fRCanalDN2();
        break;
      case 'fRCanalDN3()':
        this.fRCanalDN3();
        break;
      case 'fRCanalDN4()':
        this.fRCanalDN4();
        break;
      case 'fRCanalDN5()':
        this.fRCanalDN5();
        break;
      case 'GeneDiaT1()':
        this.geneDiaT();
        break;
      case 'fcambfec()':
        this.fcambfec();
        break;
      case 'favisos()':
        this.favisos();
        break;
      default:
        this.message = 'La opcion seleccionada no es valida';
        this.componentName = 'NotFound';
    }
  }

  private async menu1() {
    try {
      const response = await this.despaNaciApi.getMenu1();
      if (response.statusCode !== 200) {
        this.showOutput(
          true,
          'Error al traer información del menú, intente nuevamente.',
        );
        return;
      }

      for (const menuItem of response.data) {
        const menu2 = await this.despaNaciApi.getMenu2(menuItem.Tipo2);

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
  private fRCanalDN1() {
    this.componentName = 'MovDespaNacComponent';
  }
  private fRCanalDN2() {
    this.componentName = 'MovDespaNacCComponent';
  }
  private fRCanalDN3() {
    this.componentName = 'MovDespaNacModComponent';
  }
  private fRCanalDN4() {
    this.componentName = 'MovDespaNacCfAnComponent';
  }
  private fRCanalDN5() {
    this.componentName = 'MovInforCanDespaComponent';
  }
  private fcambfec() {
    this.componentName = 'CambfechDespaComponent';
  }
  private favisos() {
    this.componentName = 'AvisosComponent';
  }
}
</script>
