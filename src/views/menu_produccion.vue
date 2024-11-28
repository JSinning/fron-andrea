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
    <div class="lateral-menu">
      <div class="flex flex-row pt-10 justify-center">
        <img src="@/assets/img/logo_andrea.svg" />
      </div>

      <form class="p-2 pt-4">
        <h2 class="font-bold text-2xl text-white text-center">BIENVENIDO(A)</h2>
        <h2
          class="font-bold text-2xl text-white text-center"
          v-if="razonsocial == ''"
        >
          Sin Conexión
        </h2>

        <div class="mt-2 pt-4">
          <input
            id="Username"
            type="text"
            placeholder="Usuario"
            class="input-menu"
            v-model="userName"
          />
        </div>

        <div class="mt-2">
          <input
            id="Password"
            type="password"
            placeholder="Contraseña"
            class="input-menu"
            v-model="password"
          />
        </div>

        <div class="mt-2">
          <input
            id="Serve"
            type="text"
            placeholder="Servidor"
            class="input-menu"
            hidden
            v-model="host"
          />
        </div>

        <div class="mt-2">
          <input
            id="DataBase"
            type="text"
            hidden
            placeholder="Base Datos"
            class="input-menu"
            v-model="database"
          />
        </div>

        <div class="mt-2">
          <input
            id="Date"
            type="Date"
            placeholder="Fecha Proceso"
            class="input-menu"
            v-model="fechaProc"
          />
        </div>

        <div class="mt-2">
          <button
            id="Aceptar"
            class="appearance-none border-b border-white w-full py-2 px-3 font-bold text-white btn-save hover:text-andrea hover:bg-white"
            @click="onLoginButtomClick"
            :disabled="isDoingLogin"
          >
            {{ !isDoingLogin ? 'Aceptar' : 'Verificando...' }}
          </button>
        </div>
      </form>
    </div>

    <div class="w-full flex flex-col">
      <AlertBox :output="output" :isError="isError" @empty="clearOutput" />

      <div class="flex flex-col">
        <Loader v-show="isLoading" />
      </div>

      <div class="w-full h-full">
        <MenuProduccion
          @errors="errorHandler"
          v-bind:authToken="$authToken"
          v-bind:isLoggedIn="isLoggedIn"
          v-bind:btnPermission="btnPermission"
          v-bind:userName="userName"
          v-bind:fechaProc="fechaProc"
          v-bind:idEmpresa="idEmpresa"
          v-bind:razonsocial="razonsocial"
          v-bind:menu="menu"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UserInfo from '../classes/UserInfo';

import moment from 'moment';
import { Component, Vue } from 'vue-property-decorator';

import MenuProduccion from '@/components/menu_produccion/MenuProduccion.vue';
import AlertBox from '@/components/reusable/AlertBox.vue';
import MenuApi from '@/remote/api/MenuApi';
import UsersApi from '@/remote/api/UsersApi';
import log from 'electron-log';

import * as Sentry from '@sentry/browser';

import Loader from '@/components/reusable/Loader.vue';

const api = new UsersApi();
const user = new UserInfo();

@Component({
  components: {
    AlertBox,
    Loader,
    MenuProduccion,
  },
  name: 'MenuProduccionView',
})
export default class MenuProduccionView extends Vue {
  public user = new UserInfo();

  private menu = new MenuApi(this.$authToken);
  private userName: string = '';
  private password: string = '';
  private host: string = '';
  private database: string = '';
  private fechaProc: string = moment().format('YYYY-MM-DD');
  private isLoggedIn: boolean = false;

  private isDoingLogin: boolean = false;
  private razonsocial: string = '';
  private idEmpresa: number = 0;
  private btnPermission: any = {};
  private output: string = '';
  private isError: boolean = false;

  private isLoading: boolean = false;

  private errorHandler(message: string) {
    this.output = message;
  }

  private clearOutput() {
    this.output = '';
  }

  private showOutput(flag: boolean, message: string) {
    this.output = message;
    this.isError = flag;
  }
  private async mounted() {
    const userDB = await this.$local.getUserInfo();
    if (typeof userDB === 'number' || userDB === undefined) {
      return;
    }
    this.userName = userDB.user;
    this.host = userDB.host;
    this.database = userDB.db;
    this.user = userDB;
    this.password = userDB.pass;
    this.fechaProc = this.$store.getters.getFechaProceso
      ? this.$store.getters.getFechaProceso
      : moment().format('YYYY-MM-DD');
    if (this.user.authToken === '') {
      return;
    }
    this.menu.setAuthToken(this.user.authToken);
    const isUserConnected = await this.menu.ping();
    if (isUserConnected.statusCode !== 200) {
      return;
    }
    this.Empresa();
    this.Otros();
    this.isLoggedIn = true;
  }

  private async onLoginButtomClick(event: any) {
    this.isLoading = true;
    event.preventDefault();

    this._toggleIsDoingLogin(true);

    this.user.user = this.userName;
    this.user.host = this.host;
    this.user.db = this.database;
    this.user.pass = this.password;
    this.user.dateProc = this.fechaProc;

    try {
      window.log.info('Users tries to login');
      // await api.validateUserInDB({
      //   data: {
      //     db: this.user.db,
      //     host: this.user.host,
      //     password: this.password,
      //     user: this.user.user,
      //   },
      // });
      this._loginUser();
      this._toggleIsDoingLogin(false);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(
        true,
        'Error al iniciar sesion, intente nuevamente o comuniquese con el administrador.',
      );
      this.$authToken = '';
      this._toggleIsDoingLogin(false);
      window.log.error('User couldnt log in');
    } finally {
      this.isLoading = false;
    }
  }

  private async _loginUser() {
    try {
      const response = await api.login({
        password: this.password,
        username: this.userName,
      });
      this.showOutput(false, response.message);
      this.$authToken = response.data;
      this.menu.setAuthToken(this.$authToken);
      this.$store.dispatch('addToken', response.data);
      this.$store.dispatch('addUser', this.userName);
      this.$store.dispatch('addFechaProceso', this.fechaProc);
      this.isLoggedIn = true;
      this.user.authToken = response.data;
      this.Empresa();
      this.Otros();
      this.$local.saveUserInfo(this.user);
      window.log.info('User logged in.');
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al iniciar sesion, intente nuevamente.');
      this.$authToken = '';
    }
  }

  private _toggleIsDoingLogin(state: boolean) {
    this.isDoingLogin = state;
  }

  private async Empresa() {
    try {
      const result = await this.menu.empresas();
      this.razonsocial = result.data[0].razonSocial;
      this.idEmpresa = result.data[0].idEmpresa;
      user.idEmpresa = result.data[0].idEmpresa;
      this.$local.saveUserInfo(this.user);
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener informacion de su empresa.');
    }
  }

  private async Otros() {
    try {
      const result = await this.menu.otros(this.userName);
      this.btnPermission = result.data[0];
    } catch (e) {
      Sentry.captureException(e);
      this.showOutput(true, 'Error al obtener sus permisos de usuario.');
    }
  }
}
</script>
