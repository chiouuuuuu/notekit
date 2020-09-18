<template>
  <div class="add">
    <input
      type="text"
      class="add-input"
      v-model="content"
      @keyup.enter="submit"
    />
    <button class="add-btn" @click="submit">submit</button>
  </div>
</template>

<script>
export default {
  name: 'com-add',
  data() {
    return {
      content: '123',
    };
  },
  methods: {
    submit() {
      let params = {
        id: 0,
        type: 1,
        content: '',
        time: '',
        edit: false,
      };
      let content = this.content.trim();
      console.log(this.content);
      if (content) {
        params.content = content;
        this.$store.dispatch('addEvent', params);
        console.log('添加成功');
      }
      this.content = '';
    },
  },
};
</script>

<style lang="scss" ref="stylesheet/scss">
.add {
  padding: 30px 0;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  input.add-input {
    width: 90%;
    height: 40px;
    padding: 7px 10px;
    box-sizing: border-box;
    line-height: 26px;
    font-size: inherit;
    border: 1px solid #c0ccda;
    border-radius: 3px;
    transition: border-color 0.2s linear;
    &:focus {
      outline: none;
    }
  }
  .add-btn {
    width: 80px;
    height: 40px;
    line-height: 26px;
    // margin-left: 10px;
    color: #fff;
    background: #6495ed;
    // border: 1px solid #00d1b2;
  }
}
</style>
