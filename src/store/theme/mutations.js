import * as f from '../function.js';

export default {
  SWITCHTHEME(states, param) {
    console.log(param);
    states.theme = param.theme;
    f.local_theme.set(states);
  },
  UPLOADTHEME(state, param) {
    let jsonObj = JSON.parse(param).themeStorage;
    state.theme = jsonObj.theme;
    f.local_theme.set(state);
  },
};
