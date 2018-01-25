/* eslint-disable */

import Vue from 'vue';
import Router from 'vue-router';
import Draggable from 'vuedraggable';
import VeeValidate from 'vee-validate';
import VueSocketio from 'vue-socket.io';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';

import Button from '@/components/Button';
import Modal from '@/components/Modal';

import Dashboard from '@/components/Dashboard';
import Welcome from '@/components/Welcome';

import ConfigEdit from '@/components/ConfigEdit';
import Nav from '@/components/Nav';
import Board from '@/components/Board';
import BoardAdd from '@/components/BoardAdd';
import BoardDelete from '@/components/BoardDelete';
import FeedEdit from '@/components/FeedEdit';

import List from '@/components/List';
import FeedAdd from '@/components/FeedAdd';
import TitleEdit from '@/components/TitleEdit';
import Item from '@/components/Item';

Vue.use(Router);
Vue.component('Draggable', Draggable);
Vue.use(VueSocketio, 'http://localhost:5001');

const validateConfig = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'en',
  dictionary: null,
  strict: true,
  enableAutoClasses: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input|blur',
  inject: true
};

Vue.use(VeeValidate, validateConfig);

Vue.component('VuePerfectScrollbar', VuePerfectScrollbar);
Vue.component('Button', Button);
Vue.component('Modal', Modal);

Vue.component('Welcome', Welcome);
Vue.component('ConfigEdit', ConfigEdit);

Vue.component('Nav', Nav);
Vue.component('Board', Board);
Vue.component('BoardAdd', BoardAdd);
Vue.component('BoardDelete', BoardDelete);
Vue.component('FeedEdit', FeedEdit);

Vue.component('List', List);
Vue.component('FeedAdd', FeedAdd);
Vue.component('TitleEdit', TitleEdit);

Vue.component('Item', Item);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    }
  ],
});

export default router;
