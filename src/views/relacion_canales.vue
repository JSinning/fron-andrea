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
  <Layout
    name="Relación Canales"
    :components="components"
    :exception="exception"
    :key="exception.output"
  ></Layout>
</template>

<script lang="ts">
import Layout from '@/components/reusable/Layout.vue';
import { Menu, MenuOption } from '@/types';
import RelacionCanalApi from '@/remote/api/relacion_canales/RelacionCanalApi';

import CambFech from '@/components/relacion_canales/cambFech.vue';
import MovRelaCanal from '@/components/relacion_canales/MovRelaCanal.vue';
import MovRelaCanalC from '@/components/relacion_canales/MovRelaCanalC.vue';
import MovRelaCanalMod from '@/components/relacion_canales/MovRelaCanalMod.vue';

import NotFound from '@/components/reusable/NotFound.vue';

import { Component, Vue } from 'vue-property-decorator';

import * as Sentry from '@sentry/browser';
import TConfInv1RelacionCanales from '@/classes/T_ConfInv1RelacionCanales';
import moment from 'moment';

@Component({
  components: {
    Layout,
  },
  name: 'relacionCanales',
})
export default class RelacionCanales extends Vue {
  public components: Menu = [];

  public exception: { isError: boolean; output: string } = {
    isError: false,
    output: '',
  };

  public modules = {
    'fRCanal1()': MovRelaCanal,
    'fRCanal2()': MovRelaCanalC,
    'fRCanal3()': MovRelaCanalMod,
    'fcambfec()': CambFech,
  };

  public functions = {
    'GeneDiaT1()': this.geneDiaT,
  };

  private tConfigRelCan = new TConfInv1RelacionCanales();
  private relaCanalApi = new RelacionCanalApi(this.$store.getters.getAuthToken);

  public async mounted() {
    await this.menu1();
    await this.tConfigRelCanal1();
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
          const response = await this.relaCanalApi.putConfigur1({
            fecha1: this.rFec1(),
            fecha2: this.rFec2(),
          });
          if (response.statusCode === 200) {
            await this.tConfigRelCanal1();
            this.exception = {
              isError: false,
              output: response.message,
            };
          }
        }
        return;
      }
      return;
    } catch (e) {
      this.exception = { isError: true, output: e.message };
      Sentry.captureException(e);
    }
  }

  private async tConfigRelCanal1() {
    try {
      const response = await this.relaCanalApi.getTCofInv1();
      this.tConfigRelCan = response.data;
      this.$store.dispatch('addTconfig', this.tConfigRelCan);
    } catch (e) {
      this.exception = {
        isError: true,
        output: 'Error al obtener la configuracion del usuario.',
      };
      Sentry.captureException(e);
    }
  }

  private async menu1() {
    try {
      const response = await this.relaCanalApi.getMenu1();
      if (response.statusCode !== 200) {
        this.exception = {
          isError: true,
          output: 'Error al traer información del menú, intente nuevamente.',
        };
        return;
      }

      for (const menuItem of response.data) {
        const menu2 = await this.relaCanalApi.getMenu2(menuItem.Tipo2);

        let component: MenuOption = {
          component: this.modules[menuItem.Modu]
            ? this.modules[menuItem.Modu]
            : menuItem.Modu,
          description: menuItem.DescripPrinc,
          onLoad: this.functions[menuItem.Modu],
          submenu: menu2.data.map(
            (sub: { DescripOpc: string; Modu: string }) => ({
              component: this.modules[sub.Modu],
              description: sub.DescripOpc,
            }),
          ),
        };

        if (component.onLoad) {
          component.component = undefined;
        }

        if (component.component === undefined) {
          component.message = 'La opcion seleccionada no es valida';
          component.component = NotFound;
        }

        this.components.push(component);
      }
    } catch (e) {
      this.exception = {
        isError: true,
        output: 'Error al traer información del menú, intente nuevamente.',
      };
      Sentry.captureException(e);
    }
  }
}
</script>
