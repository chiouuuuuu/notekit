export default {
  getEventList(states) {
    return states.event;
  },
  getListByType(states, getters, rootStates) {
    return (type) => {
      // console.log(states);
      return states.event.filter((item) => {
        if (item.type == type) {
          return item;
        }
      });
    };
  },
};
