import * as f from '../function.js';
import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

const state = f.local_event.get() || {
  event: [],
  count: 0,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
