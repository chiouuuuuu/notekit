<template>
  <header>
    <h1>
      <span>note kit</span>
      <slot></slot>
      <base-button class="b-btn" @click="showEditTable">{{ isShowEditTable ? '表格' : '列表' }}</base-button>
      <a class="t-btn" @click="showSidebar">
        <span class="desc"></span>
      </a>
    </h1>
  </header>
</template>
<script>
import baseButton from './base-button.vue'
export default {
  name: 'com-header',
  props: ['isShowEditTable'],
  components: {
    'base-button': baseButton,
  },
  methods: {
    showSidebar() {
      this.$emit('showSidebar')
    },
    showEditTable() {
      this.$emit('showEditTable')
    },
  },
}
</script>

<style lang="scss" ref="stylesheet/scss">
.b-btn {
  margin-right: 10px;
  border: 2px #0059ff solid;
}
header {
  width: 100%;
  height: 70px;
  background: #6495ed;
  min-width: 250px;
  position: relative;
  z-index: 10;
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
      line-height: 70px;
      text-align: center;
      color: #fff;
    }
    a.t-btn {
      width: 30px;
      height: 26px;
      cursor: pointer;
      background: #fff;
      display: inline-flex;
      // border: #000 solid 1px;
      padding: 2px;
      border-radius: 3px;
      float: right;
      margin-right: 5px;
      span.desc {
        width: 30px;
        height: 6px;
        background: #6495ed;
        align-self: center;
        position: relative;
        &:before,
        &:after {
          display: inline-block;
          background: #6495ed;
          width: 30px;
          height: 6px;
          content: '';
        }
        &:before {
          // transform: translateY(-55px);
          position: absolute;
          top: -10px;
          left: 0;
        }
        &:after {
          // transform: translateY(7px);
          position: absolute;
          top: 10px;
          left: 0;
        }
      }
    }
  }
}
</style>
