<template>
  <transition name="dialog">
    <div class="dialog" v-if="isShowDialog">
      <div class="dialog-box">
        <div class="dialog-header">{{ title }}</div>
        <div class="dialog-content">
          <slot>
            <div v-html="content"></div>
          </slot>
        </div>
        <div class="dialog-btn-group">
          <button class="conf" v-if="isShowConfBtn" @click="conf">确定</button>
          <button class="cancel">取消</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    isShowDialog: { type: Boolean, default: false },
    title: { type: String },
    content: { type: String },
    isShowConfBtn: Boolean,
  },
  data() {
    return {};
  },
  methods: {
    conf() {
      this.$emit('confEvent');
      this.$emit('closeDialog');
    },
  },
  mounted() {
    console.log('[dialog]', this.title);
    document.addEventListener('click', (e) => {
      let targetClass = e.target.className;
      if (targetClass == 'dialog' || targetClass == 'cancel') {
        this.$emit('closeDialog');
      }
    });
  },
};
</script>
<style lang="scss" ref="stylesheet/scss">
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s;
}
.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}

.dialog {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 900;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  .dialog-box {
    width: 100%;
    max-width: 400px;
    // height: 200px;
    background: #fff;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    animation: showdialog 0.5s;

    .dialog-header {
      padding: 20px;
      border-bottom: 1px solid #eee;
    }
    .dialog-content {
      padding: 20px;
      padding-bottom: 0;
    }
    .dialog-btn-group {
      padding-top: 20px;
      padding-right: 20px;
      padding-bottom: 20px;
      display: flex;
      justify-content: flex-end;
      button {
        width: 50px;
        padding: 5px;
        color: #fff;
        border: 1px solid #c0ccda;
      }
      .conf {
        margin-right: 5px;
        // background: #00b0f0;
      }
      .cancel {
        color: #000;
        background: #fff;
      }
    }
  }
}
@keyframes showdialog {
  from {
    top: 15%;
  }
}
</style>
