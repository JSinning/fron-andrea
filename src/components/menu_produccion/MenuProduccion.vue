<template>
  <div class="main-div m-10">
    <h2 class="font-bold text-3xl text-andrea text-center">
      {{ razonsocial }}
    </h2>
    <div class="card-menu lg:h-full">
      <div class="flex flex-row overflow-y-auto">
        <div class="p-2 lg:p-5">
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.superv,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.superv)"
          >
            <img class="h-24" src="@/assets/img/menu/Supervisor.png" />
          </button>
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.programac,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.programac)"
          >
            <img class="h-24" src="@/assets/img/menu/Programacionn.png" />
          </button>
          <button
            class="btn-save"
            @click="redirect('Guia_Sacrificio')"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.guiaS,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.guiaS)"
          >
            <img class="h-24" src="@/assets/img/menu/GuiaSacrificio.png" />
          </button>
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white cursor-not-allowed':
                isBtnEnabled(btnPermission.recepG),
            }"
            :disabled="isBtnEnabled(btnPermission.recepG)"
          >
            <img class="h-24" src="@/assets/img/menu/RecepcionGanado.png" />
          </button>
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white cursor-not-allowed':
                isBtnEnabled(btnPermission.desembar),
            }"
            :disabled="isBtnEnabled(btnPermission.desembar)"
          >
            <img class="h-24" src="@/assets/img/menu/Desembarcoo.png" />
          </button>
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.corral,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.corral)"
          >
            <img class="h-24" src="@/assets/img/menu/Corraless.png" />
          </button>
          <button
            @click="redirect('reparto')"
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.reparto,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.reparto)"
          >
            <img class="h-24" src="@/assets/img/menu/Repartoo.png" />
          </button>
          <button
            class="btn-save"
            @click="redirect('caidaAnimal')"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.sacrifi,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.sacrifi)"
          >
            <img class="h-24" src="@/assets/img/menu/Sacrificio.png" />
          </button>
          <button
            class="btn-save"
            @click="redirect('canalCaliente')"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.canalCal,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.canalCal)"
          >
            <img class="h-24" src="@/assets/img/menu/CanalCaliente.png" />
          </button>
          <button
            class="btn-save"
            @click="redirect('pieles')"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.pieles,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.pieles)"
          >
            <img class="h-24" src="@/assets/img/menu/PesoPieles2.png" />
          </button>
          <button
            class="btn-save"
            @click="redirect('viceras')"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.viscera,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.viscera)"
          >
            <img class="h-24" src="@/assets/img/menu/Viscerass.png" />
          </button>
          <button
            class="btn-save"
            @click="redirect('Cuarteo')"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.cuarteo,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.cuarteo)"
          >
            <img class="h-24" src="@/assets/img/menu/CuarteoCanales.png" />
          </button>
          <button
            class="btn-save"
            @click="redirect('despacho_nacional')"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.dNacional,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.dNacional)"
          >
            <img class="h-24" src="@/assets/img/menu/DespachoNacional.png" />
          </button>
          <button
            class="btn-save"
            @click="redirect('relacion_canales')"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.rCanal,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.rCanal)"
          >
            <img class="h-24" src="@/assets/img/menu/RelacionCanales.png" />
          </button>
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.deshuese,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.deshuese)"
          >
            <img class="h-24" src="@/assets/img/menu/Deshuesee.png" />
          </button>
          <button
            class="btn-save"
            @click="redirect('despacho_local')"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.dLocal,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.dLocal)"
          >
            <img class="h-24" src="@/assets/img/menu/DespachoLocal.png" />
          </button>
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.cFrio,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.cFrio)"
          >
            <img class="h-24" src="@/assets/img/menu/CuartosFrios.png" />
          </button>
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.zuncho,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.zuncho)"
          >
            <img class="h-24" src="@/assets/img/menu/Zunchoo.png" />
          </button>
          <button
            class="btn-save"
            @click="redirect('despacho_caja')"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.dCaja,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.dCaja)"
          >
            <img class="h-24" src="@/assets/img/menu/DespachoCajas.png" />
          </button>
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.iCarne,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.iCarne)"
          >
            <img class="h-24" src="@/assets/img/menu/InventarioCarnes.png" />
          </button>
          <button
            class="btn-save"
            @click="redirect('reporte')"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.repor,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.repor)"
          >
            <img class="h-24" src="@/assets/img/menu/Reportess.png" />
          </button>
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': isBtnEnabled(
                btnPermission.pedido,
              ),
            }"
            :disabled="isBtnEnabled(btnPermission.pedido)"
          >
            <img class="h-24" src="@/assets/img/menu/Pedidoss.png" />
          </button>
          <button
            class="btn-save"
            v-bind:class="{
              'opacity-50 cursor-not-allowed hover:bg-white': true,
            }"
            :disabled="true"
          >
            <img class="h-24" src="@/assets/img/menu/Costoss.png" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';

import MenuNavigation from '@/classes/MenuNavigation';
import MenuApi from '@/remote/api/MenuApi';

@Component({
  name: 'MenuProduccion',
  props: {
    btnPermission: Object,
    fechaProc: String,
    idEmpresa: Number,
    isLoggedIn: Boolean,
    menu: MenuApi,
    razonsocial: String,
    userName: String,
  },
})
export default class MenuProduccion extends Vue {
  public errorHandler(message: string) {
    this.$emit('errors', message);
  }

  public isBtnEnabled(permission: boolean) {
    return !this.$props.isLoggedIn || !permission;
  }

  public async redirect(path: string) {
    const navigator = new MenuNavigation(this.$props.menu);
    try {
      switch (path) {
        case 'pieles': {
          const result = await navigator.updatePieles(
            this.$props.userName,
            this.$props.fechaProc,
            this.$props.idEmpresa,
          );
          if (typeof result !== 'boolean') {
            this.errorHandler('Ha ocurrido un error');
            return;
          }
          this.$router.push('pieles');
          break;
        }
        case 'canalCaliente': {
          await navigator.updateCanalCaliente(
            this.$props.userName,
            this.$props.fechaProc,
            this.$props.idEmpresa,
          );
          this.$router.push('canalCaliente');
          break;
        }
        case 'caidaAnimal': {
          await navigator.updateSacrificio(
            this.$props.userName,
            this.$props.fechaProc,
            this.$props.idEmpresa,
          );
          this.$router.push('caidaAnimal');
          break;
        }
        case 'viceras': {
          await navigator.updateVisceras(
            this.$props.userName,
            this.$props.fechaProc,
            this.$props.idEmpresa,
          );
          this.$router.push('viceras');
          break;
        }
        case 'despacho_nacional': {
          await navigator.updateDNacial(
            this.$props.userName,
            this.$props.fechaProc,
            this.$props.idEmpresa,
          );
          this.$router.push('DepaNacio');
          break;
        }
        case 'relacion_canales': {
          await navigator.updateRelacionCanales(
            this.$props.userName,
            this.$props.fechaProc,
            this.$props.idEmpresa,
          );
          this.$router.push('relacionCanales');
          break;
        }
        case 'Guia_Sacrificio':
          {
            await navigator.updateGuiaSacrificio(
              this.$props.userName,
              this.$props.fechaProc,
              this.$props.idEmpresa,
            );
            this.$router.push('guiaSacrificio');
          }
          break;
        case 'Cuarteo':
          {
            await navigator.updateCuarteo(
              this.$props.userName,
              this.$props.fechaProc,
              this.$props.idEmpresa,
            );
            this.$router.push('cuarteo');
          }
          break;
        case 'despacho_local':
          {
            await navigator.updateDepachoLocal(
              this.$props.userName,
              this.$props.fechaProc,
              this.$props.idEmpresa,
            );
            this.$router.push('DepaLocal');
          }
          break;
        case 'despacho_caja':
          {
            await navigator.updateDepachoCaja(
              this.$props.userName,
              this.$props.fechaProc,
              this.$props.idEmpresa,
            );
            this.$router.push('DepaCaja');
          }
          break;
        case 'reparto':
          {
            await navigator.updateReparto(
              this.$props.userName,
              this.$props.fechaProc,
              this.$props.idEmpresa,
            );
            this.$router.push('reparto');
          }
          break;
        case 'reporte':
          {
            await navigator.updateReporte(
              this.$props.userName,
              this.$props.fechaProc,
              this.$props.idEmpresa,
            );
            this.$router.push('reporte');
          }
          break;
      }
    } catch (e) {
      Sentry.captureException(e);
      this.errorHandler(e.message);
    }
  }
}
</script>
