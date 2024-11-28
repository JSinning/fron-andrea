/*
  Copyright (©) Andrea.com.co - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited.
 * Proprietary and confidential.
 * Written and developed with  ❤️ by Andrea.com.co
 * 2020
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import pdf from 'vue-pdf';
import vSelect from 'vue-select';

import './assets/main.css';
import 'vue-select/dist/vue-select.css';
const { ipcRenderer } = window;
import { SerialComClient } from './classes/SerialComClient';
import DBClient from './localdb/DBClient';

import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import convertToDecimal from '@/utils/convertToDecimal';
import concvertBooleanToString from '@/utils/convertBooleanToString';
import convertDate from '@/utils/convertDate';

const local = new DBClient(ipcRenderer);
const serial = new SerialComClient(ipcRenderer);

Vue.component(pdf);
Vue.component('v-select', vSelect);

Vue.config.productionTip = false;
Vue.prototype.$local = local;
Vue.prototype.$authToken = '';
Vue.prototype.$serial = serial;
Vue.prototype.$convertToDecimal = (dato: number) => {
  return convertToDecimal(dato);
};
Vue.prototype.$booleanToString = (dato: boolean) => {
  return concvertBooleanToString(dato);
};
Vue.prototype.$convertDate = (date: string) => {
  return convertDate(date);
};
Sentry.init({
  autoSessionTracking: true,
  dsn: 'https://8ed50e796b5341a08cb4a377bff23241@o472454.ingest.sentry.io/5579000',
  integrations: [
    // @ts-ignore
    new Integrations.BrowserTracing(),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
