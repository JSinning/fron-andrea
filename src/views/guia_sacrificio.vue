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
            src="@/assets/img/menu/GuiaSacrificio.png"
          />
          <span
            class="text-white text-lg font-semibold ml-2 cursor-pointer select-none hover:bg-white hover:text-andrea"
            @click="hoverRelacionC()"
            >Guia de Sacrificios</span
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
import CambFech from '@/components/guia_sacrificio/CambFech.vue';
import Conductores from '@/components/guia_sacrificio/Conductores.vue';
import ConductoresMod from '@/components/guia_sacrificio/ConductoresMod.vue';
import ConfirmaWeb from '@/components/guia_sacrificio/ConfirmaWeb.vue';
import ConfirmaWeb2 from '@/components/guia_sacrificio/ConfirmaWeb2.vue';
import ConfirmaWebSac from '@/components/guia_sacrificio/ConfirmaWebSac.vue';
import ConfirmaWebSacDt1 from '@/components/guia_sacrificio/ConfirmaWebSacDt1.vue';
import ConfirmaWebSacDt2 from '@/components/guia_sacrificio/ConfirmaWebSacDt2.vue';
import ConfirmaWebSacDt3 from '@/components/guia_sacrificio/ConfirmaWebSacDt3.vue';
import ConfirmaWebSacDt4 from '@/components/guia_sacrificio/ConfirmaWebSacDt4.vue';
import CpCanalProp from '@/components/guia_sacrificio/CpCanalProp.vue';
import CpCanalPropDet from '@/components/guia_sacrificio/CpCanalPropDet.vue';
import DCControlVeh from '@/components/guia_sacrificio/DCControlVeh.vue';
import DCControlVehGenF from '@/components/guia_sacrificio/DCControlVehGenF.vue';
import DCControlVehMod from '@/components/guia_sacrificio/DCControlVehMod.vue';
import DCControlVehPdd from '@/components/guia_sacrificio/DCControlVehPdd.vue';
import DCControlVehSalid from '@/components/guia_sacrificio/DCControlVehSalid.vue';
import FacBursag from '@/components/guia_sacrificio/FacBursag.vue';
import FacBursagParam from '@/components/guia_sacrificio/FacBursagParam.vue';
import Fincas from '@/components/guia_sacrificio/Fincas.vue';
import FincasMod from '@/components/guia_sacrificio/FincasMod.vue';
import GenOC from '@/components/guia_sacrificio/GenOC.vue';
import GeneraLot from '@/components/guia_sacrificio/GeneraLot.vue';
import GeneraRendLt from '@/components/guia_sacrificio/GeneraRendLt.vue';
import GenPrecPieLote from '@/components/guia_sacrificio/GenPrecPieLote.vue';
import GenPrecPieLote2 from '@/components/guia_sacrificio/GenPrecPieLote2.vue';
import GuiaSac from '@/components/guia_sacrificio/GuiaSac.vue';
import GuiaSacCons from '@/components/guia_sacrificio/GuiaSacCons.vue';
import GuiaSacMod from '@/components/guia_sacrificio/GuiaSacMod.vue';
import GuiaSacModSP from '@/components/guia_sacrificio/GuiaSacModSP.vue';
import GuiaSacTara from '@/components/guia_sacrificio/GuiaSacTara.vue';
import OrdCompra from '@/components/guia_sacrificio/OrdCompra.vue';
import OrdCompraCs from '@/components/guia_sacrificio/OrdCompraCs.vue';
import OrdCompraGuia from '@/components/guia_sacrificio/OrdCompraGuia.vue';
import OrdCompraGuiaCs from '@/components/guia_sacrificio/OrdCompraGuiaCs.vue';
import OrdComprasSL from '@/components/guia_sacrificio/OrdCompraSL.vue';
import OrdCompraSLMd from '@/components/guia_sacrificio/OrdCompraSLMd.vue';
import OrdCompraSLCS from '@/components/guia_sacrificio/OrdCompraSLCs.vue';
import RecepcionMod from '@/components/guia_sacrificio/RecepcionMod.vue';
import Transportad from '@/components/guia_sacrificio/Transportad.vue';
import TransportadMod from '@/components/guia_sacrificio/TransportadMod.vue';
import ISubDetMoviAjus from '@/components/guia_sacrificio/i SubDetMoviAjus.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import NotFound from '@/components/reusable/NotFound.vue';
import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';
import GuiaSacrificioApi from '@/remote/api/guia_sacrificio/guiaSacrificioApi';
import * as Sentry from '@sentry/browser';
import T_ConfInv1GuiaSacrificio from '@/classes/T_ConfInv1GuiaSacrificio';
import OrdCompraSubLote from '@/components/guia_sacrificio/OrdCompraSubLote.vue';
import OrdCompraSubDt from '@/components/guia_sacrificio/OrdCompraSubDt.vue';
import DCControlVehDPed from '@/components/guia_sacrificio/DCControlVehDPed.vue';
import OrdComprasSubImCta from '@/components/guia_sacrificio/OrdComprasSubImCta.vue';
import OrdCompraSubImpr from '@/components/guia_sacrificio/OrdCompraSubImpr.vue';

const { dialog } = window;

@Component({
  components: {
    AlertBox,
    CambFech,
    Conductores,
    ConductoresMod,
    ConfirmaWeb,
    ConfirmaWeb2,
    ConfirmaWebSac,
    ConfirmaWebSacDt1,
    ConfirmaWebSacDt2,
    ConfirmaWebSacDt3,
    ConfirmaWebSacDt4,
    CpCanalProp,
    CpCanalPropDet,
    DCControlVeh,
    DCControlVehDPed,
    DCControlVehGenF,
    DCControlVehMod,
    DCControlVehPdd,
    DCControlVehSalid,
    FacBursag,
    FacBursagParam,
    Fincas,
    FincasMod,
    GenOC,
    GenPrecPieLote,
    GenPrecPieLote2,
    GeneraLot,
    GeneraRendLt,
    GuiaSac,
    GuiaSacCons,
    GuiaSacMod,
    GuiaSacModSP,
    GuiaSacTara,
    ISubDetMoviAjus,
    NotFound,
    OrdCompra,
    OrdCompraCs,
    OrdCompraGuia,
    OrdCompraGuiaCs,
    OrdCompraSLCS,
    OrdCompraSLMd,
    OrdCompraSubDt,
    OrdCompraSubImpr,
    OrdCompraSubLote,
    OrdComprasSL,
    OrdComprasSubImCta,
    RecepcionMod,
    Transportad,
    TransportadMod,
  },
  name: 'Guia_Sacrificio',
})
export default class Guiasacrificio extends Vue {
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

  private guiaSacrificioApi = new GuiaSacrificioApi(
    this.$store.getters.getAuthToken,
  );

  private tConfigGuiaSacrificio = new T_ConfInv1GuiaSacrificio();

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
    await this.tConfigGuiaSacrificio1();
  }

  public fpuerto() {
    this.fPuerto = this.$store.getters.getTConfinv1.puerto;
  }

  public openModule(item: any) {
    if (item.submenu !== undefined && item.submenu.length > 0) {
      return;
    }
    const module = item.submenu === undefined ? item.modu : item.modu;
    switch (module) {
      case 'fGuiaSacrif()':
        this.guiaSac();
        break;
      case 'fGuiaSacrifCons()':
        this.guiaSacCons();
        break;
      case 'fGuiaSacrifMod2()':
        this.guiaSacMod();
        break;
      case 'fGuiaSacrifMod3()':
        this.guiaSacModSP();
        break;
      case 'Taras()':
        this.guiaSacTara();
        break;
      case 'fGeneLot2()':
        this.recepcionMod();
        break;
      case 'fGeneOrdCp6()':
        this.facBursagWithParam();
        break;
      case 'fGeneOrdCp()':
        this.GenOC();
        break;
      case 'fGeneOrdCp1()':
        this.OrdCompra();
        break;
      case 'fGeneOrdCp2()':
        this.OrdCompraCs();
        break;
      case 'fControlVeh1()':
        this.DCControlVeh();
        break;
      case 'fControlVeh4()':
        this.DCControlVehGenF();
        break;
      case 'fControlVeh5()':
        this.DCControlVehMod();
        break;
      case 'fControlVeh3()':
        this.DCControlVehPdd();
        break;
      case 'fControlVeh2()':
        this.DCControlVehSalid();
        break;
      case 'fGeneLot()':
        this.GeneraLot();
        break;
      case 'fGeneRendLot()':
        this.generaRendLt();
        break;
      case 'fGeneOrdCp3()':
        this.OrdComprasSL();
        break;
      case 'fGeneOrdCp5()':
        this.OrdCompraSLCS();
        break;
      case 'fGeneOrdCp7()':
        this.OrdCompraGuia();
        break;
      case 'fGeneOrdCp9()':
        this.OrdCompraGuiaCs();
        break;
      case 'fGeneOrdCp4()':
        this.OrdCompraSLMd();
        break;
      case 'GeneDiaT1()':
        this.geneDiaT();
        break;
      case 'ConfimaWebSac':
        this.confirmaWebSac();
        break;
      case 'OrdCompraGuiaCs':
        this.OrdCompraGuiaCs();
        break;
      case 'OrdCompraGuia':
        this.OrdCompraGuia();
        break;
      case 'OrdComprasSL':
        this.OrdComprasSL();
        break;
      case 'OrdCompraSLMd':
        this.OrdCompraSLMd();
        break;
      case 'GenPrecPieLote2':
        this.GenPrecPieLote2();
        break;
      case 'i_SubDetMoviAjus':
        this.i_SubDetMoviAjus();
        break;
      case 'OrdCompraSubDt':
        this.OrdCompraSubDt();
        break;
      case 'OrdCompraSubLote':
        this.ordnCopraLote();
        break;
      case 'DCControlVehDPed':
        this.DCControlVehDPed();
        break;
      case 'OrdCompraSubImpr':
        this.OrdCompraSubImpr();
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
          const response = await this.guiaSacrificioApi.putTConfInv1({
            fecha1: this.rFec2(),
            fecha2: this.rFec2(),
          });
          if (response.statusCode === 200) {
            await this.tConfigGuiaSacrificio1();
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

  private async tConfigGuiaSacrificio1() {
    try {
      const response = await this.guiaSacrificioApi.getTConfInv1();

      this.tConfigGuiaSacrificio = response.data[0];
      this.$store.dispatch('addTconfig', this.tConfigGuiaSacrificio);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener la configuracion del usuario.');
    }
  }

  private subConfirmaWeb() {
    this.componentName = 'ConfirmaWeb';
  }

  private subConfirmaWeb2() {
    this.componentName = 'ConfirmaWeb2';
  }

  private conductores() {
    this.componentName = 'Conductores';
  }

  private conductoresMod() {
    this.componentName = 'ConductoresMod';
  }

  private cambFech() {
    this.componentName = 'CambFech';
  }

  private confirmaWebSac() {
    this.componentName = 'ConfirmaWebSac';
  }

  private confirmaWebSacDt1() {
    this.componentName = 'ConfirmaWebSacDt1';
  }

  private confirmaWebSacDt2() {
    this.componentName = 'ConfirmaWebSacDt2';
  }

  private confirmaWebSacDt3() {
    this.componentName = 'ConfirmaWebSacDt3';
  }

  private confirmaWebSacDt4() {
    this.componentName = 'ConfirmaWebSacDt4';
  }

  private GenPrecPieLote() {
    this.componentName = 'GenPrecPieLote';
  }

  private GenPrecPieLote2() {
    this.componentName = 'GenPrecPieLote2';
  }

  private guiaSac() {
    this.componentName = 'GuiaSac';
  }

  private guiaSacCons() {
    this.componentName = 'GuiaSacCons';
  }

  private TransportadMod() {
    this.componentName = 'TransportadMod';
  }

  private Transportad() {
    this.componentName = 'Transportad';
  }

  private GeneraLot() {
    this.componentName = 'GeneraLot';
  }

  private generaRendLt() {
    this.componentName = 'GeneraRendLt';
  }

  private guiaSacMod() {
    this.componentName = 'GuiaSacMod';
  }

  private guiaSacModSP() {
    this.componentName = 'GuiaSacModSP';
  }

  private guiaSacTara() {
    this.componentName = 'GuiaSacTara';
  }

  private GenOC() {
    this.componentName = 'GenOC';
  }

  private OrdCompraCs() {
    this.componentName = 'OrdCompraCs';
  }

  private OrdCompra() {
    this.componentName = 'OrdCompra';
  }

  private OrdCompraGuiaCs() {
    this.componentName = 'OrdCompraGuiaCs';
  }

  private OrdCompraGuia() {
    this.componentName = 'OrdCompraGuia';
  }

  private OrdCompraSLCS() {
    this.componentName = 'OrdCompraSLCS';
  }

  private OrdCompraSLMd() {
    this.componentName = 'OrdCompraSLMd';
  }

  private OrdComprasSL() {
    this.componentName = 'OrdComprasSL';
  }

  private cpCanalPropDet() {
    this.componentName = 'CpCanalPropDet';
  }

  private DCControlVeh() {
    this.componentName = 'DCControlVeh';
  }

  private DCControlVehGenF() {
    this.componentName = 'DCControlVehGenF';
  }

  private DCControlVehMod() {
    this.componentName = 'DCControlVehMod';
  }

  private DCControlVehPdd() {
    this.componentName = 'DCControlVehPdd';
  }

  private DCControlVehSalid() {
    this.componentName = 'DCControlVehSalid';
  }

  private cpCanalProp() {
    this.componentName = 'CpCanalProp';
  }

  private fincas() {
    this.componentName = 'Fincas';
  }

  private recepcionMod() {
    this.componentName = 'RecepcionMod';
  }

  private fincasMod() {
    this.componentName = 'FincasMod';
  }

  private facBursagWithParam() {
    this.componentName = 'FacBursagParam';
  }

  private facBursag() {
    this.componentName = 'FacBursag';
  }

  private i_SubDetMoviAjus() {
    this.componentName = 'ISubDetMoviAjus';
  }

  private OrdCompraSubDt() {
    this.componentName = 'OrdCompraSubDt';
  }

  private ordnCopraLote() {
    this.componentName = 'OrdCompraSubLote';
  }

  private DCControlVehDPed() {
    this.componentName = 'DCControlVehDPed';
  }

  private OrdComprasSubImCta() {
    this.componentName = 'OrdComprasSubImCta';
  }

  private OrdCompraSubImpr() {
    this.componentName = 'OrdCompraSubImpr';
  }

  private async menu1() {
    try {
      const response = await this.guiaSacrificioApi.getMenu1();
      if (response.statusCode !== 200) {
        this.showOutput(
          true,
          'Error al traer información del menú, intente nuevamente.',
        );
        return;
      }

      for (const menuItem of response.data) {
        const menu2 = await this.guiaSacrificioApi.getMenu2(menuItem.tipo2);

        this.menu.push({
          description: menuItem.descripPrinc,
          modu: menuItem.modu,
          submenu: menu2.data,
          tipo2: menuItem.tipo2,
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
