import * as f from '../function.js';
import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

const state = f.local_theme.get() || {
  theme: 'blue',
};

export default {
  state,
  getters,
  mutations,
  actions,
};
