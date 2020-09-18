import Vue from 'vue';
import Vuex from 'vuex';

import event from './event/index.js';
import theme from './theme/index.js';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { eventStorage: event, themeStorage: theme },
});
