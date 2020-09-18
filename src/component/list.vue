<template>
  <div class="list">
    <div class="list-item">
      <div class="list-tab" @click="change(1)">
        <span>未完成{{ isToDoCallapse.state }}</span>
        <span class="arrow" :style="isToDoCallapse.arrowStyle"></span>
      </div>
      <div class="list-box" :style="isToDoCallapse.style">
        <div class="todo-item" v-for="item in listToDo" :key="item.id">
          <input type="checkbox" @click="moveEvent(item.id, 2)" />
          <span>{{ item.content }}</span>
          <button @click="moveEvent(item.id, 3)" class="btn">cancel</button>
        </div>
      </div>
    </div>
    <div class="list-item">
      <div class="list-tab" @click="change(2)">
        <span>已完成</span>
        <span class="arrow" :style="isDoneCallapse.arrowStyle"></span>
      </div>
      <div class="list-box" :style="isDoneCallapse.style">
        <div class="done-list-item" v-for="item in listDone" :key="item.id">
          <input type="checkbox" checked @click="moveEvent(item.id, 1)" />
          <span>{{ item.content }}</span>
          <span class="date">{{ item.time }}</span>
        </div>
      </div>
    </div>
    <div class="list-item">
      <div class="list-tab" @click="change(3)">
        <span>已取消</span>
        <span class="arrow" :style="isCancelCallapse.arrowStyle"></span>
      </div>
      <div class="list-box" :style="isCancelCallapse.style">
        <div class="cancel-list-item" v-for="item in listCancel" :key="item.id">
          <span>{{ item.content }}</span>
          <button class="btn" @click="moveEvent(item.id, 1)">resume</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'list',
  data() {
    return {
      isToDoCallapse: {
        state: false,
        style: {
          height: 'auto',
          overflow: 'hidden',
        },
        arrowStyle: {
          transform: 'rotate(135deg)',
        },
      },
      isDoneCallapse: {
        state: false,
        style: {
          height: 'auto',
          overflow: 'hidden',
        },
        arrowStyle: {
          transform: 'rotate(135deg)',
        },
      },
      isCancelCallapse: {
        state: false,
        style: {
          height: 'auto',
          overflow: 'hidden',
        },
        arrowStyle: {
          transform: 'rotate(135deg)',
        },
      },
    }
  },
  methods: {
    moveEvent(id, type) {
      this.$store.dispatch('moveEvent', { id, type })
    },
    change(index) {
      let type = null
      if (index == 1) type = 'ToDo'
      else if (index == 2) type = 'Done'
      else if (index == 3) type = 'Cancel'
      let stateStr = `is${type}Callapse`
      if (this[stateStr].state) {
        //state 为 true 折叠时 => false 未折叠 即将展开
        this[stateStr].style.height = this['list' + type].length * 50 + 'px'
        this[stateStr].arrowStyle.transform = 'rotate(135deg)'
        setTimeout(() => {
          this[stateStr].style.height = 'auto'
        }, 300)
      } else {
        this[stateStr].style.height = this['list' + type].length * 50 + 'px'
        this[stateStr].arrowStyle.transform = 'rotate(45deg)'
        setTimeout(() => {
          this[stateStr].style.height = '0px'
        }, 0)
      }
      this[stateStr].state = !this[stateStr].state
    },
  },
  computed: {
    listToDo() {
      let list = this.$store.getters.getListByType(1)
      return list
    },
    listDone() {
      let list = this.$store.getters.getListByType(2)
      return list
    },
    listCancel() {
      let list = this.$store.getters.getListByType(3)
      return list
    },
  },
}
</script>
<style lang="scss" ref="stylesheet/sass">
// .callapse {
//   height: auto;
// }
// .callapse-close {
//   height: 0px;
//   overflow: hidden;
// }
.list-item {
  .list-tab {
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #fff;
    box-sizing: border-box;
    cursor: pointer;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    span {
      color: #fff;
    }
    .arrow {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-top: 2px solid #fff;
      border-right: 2px solid #fff;
      transform: rotate(135deg);
      margin-top: 15px;
      margin-right: 10px;
      transition: all 0.3s linear;
    }
  }
  .list-box {
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    transition: all 0.3s ease-out;
    div {
      height: 45px;
      padding: 2px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      input {
        margin-left: 20px;
        // margin-top: 5px;
        width: 20px;
        height: 20px;
      }
      span:not(.date) {
        width: 80%;
        height: 20px;
        line-height: 20px;
        padding-left: 10px;
      }
      span.date {
        width: 20%;
        color: #aaa;
        font-size: 12px;
        max-width: 80px;
        min-width: 60px;
        padding-right: 5px;
      }
      .btn {
        margin-right: 10px;
        padding: 0 10px;
        line-height: 30px;
        color: #666;
        font-size: 12px;
        border: 1px solid #c0ccda;
        background: #fff;
      }
    }
  }
  .cancel-list-item {
    span {
      margin: 15px;
    }
  }
}
</style>
