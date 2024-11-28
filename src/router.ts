/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
import Guia_Sacrificio from '@/views/guia_sacrificio.vue';
import Vue from 'vue';
import Router from 'vue-router';
import CaidaAnimal from './views/caida_animal.vue';
import CanalCaliente from './views/canal_caliente.vue';
import despacho_nacional from './views/despacho_nacional.vue';
import Menu from './views/menu_produccion.vue';
import Pieles from './views/pieles.vue';
import relacion_canales from './views/relacion_canales.vue';
import Viceras from './views/Viceras.vue';
import Cuarteo from './views/cuarteo.vue';
import despacho_local from './views/despacho_local.vue';
import despacho_caja from './views/despacho_caja.vue';
import Reparto from '@/views/reparto.vue';
import Reporte from '@/views/reporte.vue';

Vue.use(Router);
export default new Router({
  mode: 'hash',
  routes: [
    {
      component: Menu,
      name: 'menu',
      path: '/',
    },
    {
      component: Pieles,
      name: 'pieles',
      path: '/pieles',
    },
    {
      component: CanalCaliente,
      name: 'canalCaliente',
      path: '/canalCaliente',
    },
    {
      component: CaidaAnimal,
      name: 'CaidaAnimal',
      path: '/caidaAnimal',
    },
    {
      component: Viceras,
      name: 'Viceras',
      path: '/viceras',
    },
    {
      component: despacho_nacional,
      name: 'DespaNacio',
      path: '/DepaNacio',
    },
    {
      component: relacion_canales,
      name: 'RelacionCanales',
      path: '/relacionCanales',
    },
    {
      component: Guia_Sacrificio,
      name: 'GuiaSacrificio',
      path: '/guiaSacrificio',
    },
    {
      component: Cuarteo,
      name: 'Cuarteo',
      path: '/cuarteo',
    },
    {
      component: despacho_local,
      name: 'DespaLocal',
      path: '/DepaLocal',
    },
    {
      component: despacho_caja,
      name: 'DespaCaja',
      path: '/DepaCaja',
    },
    {
      component: Reparto,
      name: 'Reparto',
      path: '/reparto',
    },
    {
      component: Reporte,
      name: 'Reporte',
      path: '/reporte',
    },
  ],
});
