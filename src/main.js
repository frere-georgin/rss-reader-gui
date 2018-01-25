// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Vuex);

let vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
