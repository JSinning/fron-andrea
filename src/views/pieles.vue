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
            src="@/assets/img/menu/PesoPieles2.png"
          />
          <span
            class="text-white text-lg font-semibold ml-2 cursor-pointer select-none hover:bg-white hover:text-andrea"
            @click="toggleMenu()"
            >PESO PIELES</span
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import T_ConfInv1 from '@/classes/T_ConfInv1';
import Avisos from '@/components/pieles/Avisos.vue';
import CambFech from '@/components/pieles/CambFech.vue';
import MovPieles from '@/components/pieles/MovPieles.vue';
import MovPielesSigEnc from '@/components/pieles/MovPielesSigEnc.vue';
import MovPielesUno from '@/components/pieles/MovPielesUno.vue';
import SubDetRelaPielDia from '@/components/pieles/SubDetRelaPielDia.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import NotFound from '@/components/reusable/NotFound.vue';

import ModalPDFPreview from '@/components/reusable/ModalPdfPreview.vue';
import MovPileApi from '@/remote/api/MovPielesApi/MovPileApi';
import MovRepoPielApi from '@/remote/api/MovPielesApi/ReportesPileles';
import moment from 'moment';

import * as Sentry from '@sentry/browser';

import PDFPreview from '@/components/reusable/PdfPreview.vue';

const { dialog } = window;

@Component({
  components: {
    AlertBox,
    Avisos,
    CambFech,
    ModalPDFPreview,
    MovPieles,
    MovPielesSigEnc,
    MovPielesUno,
    NotFound,
    PDFPreview,
    SubDetRelaPielDia,
  },
  name: 'Pieles',
})
export default class Pieles extends Vue {
  private hovertables: boolean = false;
  private hoverasientos: boolean = false;
  private togglesidebar: boolean = true;
  private componentName: string = '';
  private animate: boolean = false;
  private tipo: number = 0;
  private tipo2: number = 0;
  private output: string = '';
  private message: string = '';
  private isError: boolean = false;
  private menu: any = [];
  private msgProfile: string = '';

  private isLoading: boolean = false;

  private itemSelected: any = null;

  private pielesApi = new MovPileApi(this.$store.getters.getAuthToken);
  private MovReports = new MovRepoPielApi(this.$store.getters.getAuthToken);
  private tConfig1 = new T_ConfInv1();

  private pdfData: string = '';
  private showModalPDF: boolean = false;

  public toggle() {
    this.animate = true;
    setTimeout(() => {
      this.togglesidebar = !this.togglesidebar;
    }, 500);
  }

  public toggleMenu() {
    this.hovertables = !this.hovertables;
    this.animate = true;
  }

  public closeModalPDF() {
    this.showModalPDF = false;
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

  // Obtiene fecha proceso 1
  public rFec1() {
    return moment(this.$store.getters.getTConfinv1.fechaProc1)
      .utc()
      .format('YYYY-MM-DD');
  }

  // Obtiene fecha proceso 2
  public rFec2() {
    return moment(this.$store.getters.getTConfinv1.fechaProc2)
      .utc()
      .format('YYYY-MM-DD');
  }

  // Metodo para abrir menu izquierdo del modulo.
  public openModule(item: any) {
    if (item.submenu !== undefined && item.submenu.length > 0) {
      return;
    }
    const module = item.submenu === undefined ? item.Modu : item.modu;
    switch (module) {
      case 'fPieles()':
        this.fPieles();
        break;
      case 'GeneDiaT()':
        this.geneDiaT();
        break;
      case 'favisos()':
        this.favisos();
        break;
      case 'fPieles2()':
        this.fPieles2();
        break;
      default:
        this.message = 'La opcion seleccionada no es valida';
        this.componentName = 'NotFound';
    }
  }

  public favisos() {
    this.componentName = 'Avisos';
  }

  public async fPieles2() {
    try {
      const pdf = await this.MovReports.getPesoPielesPDF();
      this.pdfData = pdf.data;
      this.showModalPDF = true;
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(false, 'No hay datos que mostrar en el informe.');
    }
  }

  public fPieles() {
    this.componentName = 'MovPieles';
  }

  public async geneDiaT() {
    const message = `Va a Realizar el Proceso de Generacion de Nueva Fecha de Trabajo. Solo Podra Crear o Modificar Registros con esta Fecha: ${this.rFec2()}, Verifique que no Tenga Documentos Pendientes no Tendra mas Acceso a Ellos. Esta Seguro de Generar?`;
    const opcion = confirm(message);
    const opcion2 = confirm(message);
    try {
      if (opcion) {
        if (opcion2) {
          const response = await this.pielesApi.putConfigur1({
            fechaProc1: this.rFec2(),
            fechaProc2: this.rFec2(),
            usuario: this.$store.getters.getUsuario,
          });
          if (response.statusCode === 200) {
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

  public async mounted() {
    await this.menu1();
    await this.configuration1();
    this.profile();
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

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }

  // Obtiene informacion del menu izquierdo del modulo.
  private async menu1() {
    try {
      const response = await this.pielesApi.getMenu1({
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
        const menu2 = await this.pielesApi.getMenu2(menuItem.Tipo2, {
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

  // Obtiene la configuracion predeterminada del usuario.
  private async configuration1() {
    try {
      const response = await this.pielesApi.getConfigur1({
        usuario: this.$store.getters.getUsuario,
      });

      this.tConfig1 = response.data[0];
      this.$store.dispatch('addTconfig', this.tConfig1);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener la configuracion del usuario.');
    }
  }
}
</script>
