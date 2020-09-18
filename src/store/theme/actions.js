export default {
  switchTheme({ state, commit, rootState }, param) {
    console.log(param);
    commit('SWITCHTHEME', param);
  },
  uploadTheme({ state, commit, rootState }, param) {
    commit('UPLOADTHEME', param);
  },
};
