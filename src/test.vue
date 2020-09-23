<template>
  <div class="container">
    <!-- <div class="btn-box"> -->
    <base-button type="primary" radius size="large"
      >test base button
      sssssssssssssssssssssssssssssssssssssssssssssssss</base-button
    ><base-button type="primary" radius size="medium"
      >test base button
      sssssssssssssssssssssssssssssssssssssssssssssssss</base-button
    ><base-button type="primary" radius size="small"
      >test base button
      sssssssssssssssssssssssssssssssssssssssssssssssss</base-button
    >
    <!-- </div> -->
    <button @click="isShowDialog = !isShowDialog">btn</button>
    <com-dialog
      :isShowDialog="isShowDialog"
      @closeDialog="isShowDialog = false"
    ></com-dialog>
  </div>
</template>
<script>
import baseButton from './component/base-button.vue';
import comDialog from './component/com-dialog.vue';

export default {
  components: { 'com-dialog': comDialog, 'base-button': baseButton },
  data() {
    return {
      isShowDialog: false,
    };
  },
};
</script>
<style scoped>
.btn-box {
  width: 100px;
}
</style>
