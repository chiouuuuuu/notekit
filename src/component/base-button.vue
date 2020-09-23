<template>
  <button :class="calcClassList" @click="handleClick">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'base-button',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    disable: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
    },
  },
  computed: {
    calcClassList() {
      let res = [
        'btn',
        'btn-style' + '-' + this.type,
        this.size,
        {
          'is-disable': this.disable,
          'is-radius': this.radius,
          'is-plain': this.plain,
        },
      ];
      return res;
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>
<style scoped>
.btn {
  min-height: 30px;
  min-width: 38px;
  border-radius: 3px;
  border: 1px solid #eee;
  outline: none;
}
.btn-style-default {
  color: #6495ed;
  background: #fff;
}
.btn-style-primary {
  color: #fff;
  background: #6495ed;
}
.is-radius {
  border-radius: 5px;
}
.large {
  padding: 12px 20px;
  font-size: 16px;
}
.medium {
  padding: 8px 18px;
  font-size: 14px;
}
.small {
  padding: 8 px 20px;
  font-size: 12px;
}
</style>
