<template>
  <div class="sidebar" :class="{ close: !isShowSidebarProp }">
    <p :style="{ color: '#fff' }">{{ isShowSidebarProp }}</p>
    <ul>
      <li>
        <button class="btn" @click="showTheme">切换主题</button>
      </li>
      <li>
        <button class="btn" @click="download">下载数据</button>
      </li>
      <li>
        <button class="btn" @click="updata">导入数据</button>
      </li>
      <li>
        <button class="btn" @click="table">编辑数据</button>
      </li>
      <li>
        <button class="btn" @click="clear">清空数据</button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'sidebar',
  props: ['isShowSidebarProp'],
  data() {
    return {}
  },
  methods: {
    showTheme() {
      this.$emit('showTheme')
    },
    download() {
      let domA = document.createElement('a')
      let blob = new Blob([JSON.stringify(this.$store.state)])
      console.log(blob)
      domA.download = 'nodepad.json'
      domA.href = URL.createObjectURL(blob)
      domA.click()
      domA = null
      URL.revokeObjectURL(blob)
    },
    updata() {
      this.$emit('updataDialog')
    },
    table() {
      this.$emit('table')
    },
    clear() {
      console.log('clear')
      this.$emit('clear')
    },
  },
}
</script>
<style lang="scss" ref="stylesheet/scss">
.sidebar {
  width: 250px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 100px 20px 30px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
  transform: translateX(0px);
  transition: all 0.3s ease-out;
  li {
    list-style: none;
    .btn {
      width: 100px;
      height: 40px;
      color: #fff;
      border: 1px solid #eee;
      border-radius: 5px;
      margin: 10px 0;
    }
  }
  &.close {
    transform: translateX(-290px);
  }
}
</style>
