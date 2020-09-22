export default {
  addEvent({ state, commit, rootState }, param) {
    commit('ADDEVENT', param);
  },
  moveEvent({ state, commit, rootState }, param) {
    commit('MOVEEVENT', param);
  },
  delEvent({ state, commit, rootState }, param) {
    console.log('[action]', param);
    commit('DELEVENT', param);
  },
  clearEvent({ state, commit, rootState }, param) {
    commit('CLEAREVENT', param);
  },
  editEvent({ state, commit, rootState }, param) {
    commit('EDITEVENT', param);
  },
  uploadEvent({ staet, commit, rootState }, param) {
    commit('UPLOADEVENT', param);
  },
};
