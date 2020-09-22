<template>
  <div class="themebar" :class="{ close: !isShowThemeProp }">
    <button class="close-btn" @click="closeTheme">
      <span class="icon-close"></span>
    </button>
    <ul>
      <li v-for="item in colors">
        <button class="btn" @click="setColor(item.name)">
          <span class="color-rect" :style="{ background: item.color }"></span>
          <!-- {{ item.color }} -->
          <span class="text">{{ item.color }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'themebar',
  props: ['isShowThemeProp'],
  data() {
    return {
      colors: [
        {
          name: 'cornflowerBlue',
          color: '#6495ed',
        },
        {
          name: 'blue',
          color: '#00b0f0',
        },
        {
          name: 'pink',
          color: '#f39894',
        },
        {
          name: 'green',
          color: '#00d1b2',
        },
        {
          name: 'orange',
          color: '#f4b976',
        },
        {
          name: 'cyan',
          color: '#26b6be',
        },
      ],
    };
  },
  methods: {
    setColor(color) {
      console.log('setcolor');
      this.$store.dispatch('switchTheme', { theme: color });
    },
    closeTheme() {
      // console.log('get close');
      this.$emit('closeTheme');
    },
  },
};
</script>
<style lang="scss" ref="stylesheet/scss">
.themebar {
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 100px 20px 30px;
  background: #f8f8f8;
  z-index: 0;
  transition: all 0.3s ease-out;
  li {
    list-style: none;
    .btn {
      width: auto;
      border: 1px solid #999;
      border-radius: 5px;
      margin: 10px 0;
      padding: 10px;
      background: #fff;
      display: flex;
      justify-content: center;
      span.color-rect {
        display: inline-block;
        width: 20px;
        height: 20px;
      }
      span.text {
        margin-left: 5px;
        margin-top: 2px;
        font-size: 16px;
      }
    }
  }
  &.close {
    transform: translateX(-290px);
  }
  .close-btn {
    border: 0;
    background: transparent;
    position: absolute;
    right: 20px;
    top: 80px;
  }
  .icon-close {
    // position: absolute;
    // right: 20px;
    display: inline-block;
    width: 15px;
    height: 2px;
    background: #333;
    transform: rotate(45deg);
  }
  .icon-close::after {
    content: '';
    display: block;
    width: 15px;
    height: 2px;
    background: #333;
    transform: rotate(-90deg);
  }
}
</style>
