import * as type from './mutation_types.js';
import * as f from '../function.js';

export default {
  /**
   *
   * @param {Object} states 默认添加
   * @param {Object} param
   * 形如
   * {
        id: 0,
        type: 1,
        content: '',
        time: '',
      };
   */
  [type.ADDEVENT](states, param) {
    states.count++;
    param.id = states.count;
    states.event.unshift(param);
    f.local_event.set(states);
  },
  [type.EDITEVENT](states, param) {
    let targetID = param.id;
    let arr = states.event;
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i].id == targetID) {
        arr[i].content = param.content;
        break;
      }
    }
  },
  [type.MOVEEVENT](states, param) {
    let item = null;
    for (let i = 0; i < states.event.length; i++) {
      if (states.event[i].id === param.id) {
        states.event[i].type = param.type;
        states.event[i].time = f.getDate();

        item = states.event[i];
        states.event.splice(i, 1);
        break;
      }
    }
    states.event.unshift(item);
    f.local_event.set(states);
  },
  [type.DELEVENT](state, param) {
    console.log('[mutation]', param);
    for (let i = 0; i < state.event.length; i++) {
      if (state.event[i].id == param.id) {
        state.event.splice(i, 1);
      }
    }
  },
  [type.CLEAREVENT](state, param) {
    state.event = [];
    f.local_event.clear();
  },
  [type.UPLOADEVENT](state, param) {
    let jsonObj = JSON.parse(param).eventStorage;
    state.event = jsonObj.event;
    state.count = jsonObj.count;
    f.local_event.set(state);
  },
};
