/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    addToken(context: any, value: string) {
      context.commit('ADD_TOKEN', value);
    },
    addUser(context: any, value: string) {
      context.commit('ADD_USUARIO', value);
    },
    addTconfig(context: any, value: object) {
      context.commit('ADD_TCONFINV1', value);
    },
    addFechaProceso(context: any, value: string) {
      context.commit('ADD_FECHAPROCESO', value);
    },
  },
  getters: {
    getAuthToken(state: any) {
      return state.authToken;
    },
    getUsuario(state: any) {
      return state.usuario;
    },
    getTConfinv1(state: any) {
      return state.t_ConfInv;
    },
    getFechaProceso(state: any) {
      return state.fechaProceso;
    },
  },
  mutations: {
    ADD_TOKEN(state: any, payload: string) {
      state.authToken = payload;
    },
    ADD_USUARIO(state: any, payload: string) {
      state.usuario = payload;
    },
    ADD_TCONFINV1(state: any, payload: object) {
      state.t_ConfInv = payload;
    },
    ADD_FECHAPROCESO(state: any, payload: string) {
      state.fechaProceso = payload;
    },
  },
  state: {
    authToken: '',
    fechaProceso: '',
    t_ConfInv: Object,
    usuario: '',
  },
});
